/* global CATEGORIES, VOCABULARY */

/**
 * Vokabeltrainer "Deutsch für die Pflege"
 *
 * Modes:
 *  - Karteikarten (flashcards) with Leitner spaced repetition (5 boxes)
 *  - Quiz (multiple choice, DE→EN and EN→DE)
 *  - Artikel-Training (der/die/das, nouns only)
 *
 * Progress is stored in localStorage.
 */

const STORAGE_KEY = 'pflege-vocab-progress-v1'

// Leitner box review intervals in days (box 0 = new/again, box 4 = mastered)
const BOX_INTERVALS = [0, 1, 3, 7, 14]
const MAX_BOX = BOX_INTERVALS.length - 1
const DAY_MS = 24 * 60 * 60 * 1000

// ---------------------------------------------------------------------------
// Progress storage
// ---------------------------------------------------------------------------

function loadProgress () {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}
  } catch (e) {
    return {}
  }
}

function saveProgress (progress) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
}

function getCard (progress, id) {
  return progress[id] || { box: 0, due: 0, correct: 0, wrong: 0 }
}

function recordAnswer (id, isCorrect) {
  const progress = loadProgress()
  const card = getCard(progress, id)

  if (isCorrect) {
    card.box = Math.min(card.box + 1, MAX_BOX)
    card.correct++
  } else {
    card.box = 0
    card.wrong++
  }
  card.due = Date.now() + BOX_INTERVALS[card.box] * DAY_MS

  progress[id] = card
  saveProgress(progress)
}

function isDue (card) {
  return card.due <= Date.now()
}

// ---------------------------------------------------------------------------
// Word selection
// ---------------------------------------------------------------------------

function wordsForCategory (categoryId) {
  if (categoryId === 'all') return VOCABULARY.slice()
  return VOCABULARY.filter(word => word.category === categoryId)
}

function shuffle (list) {
  const result = list.slice()
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[result[i], result[j]] = [result[j], result[i]]
  }
  return result
}

/**
 * Builds a learning queue: due words first (lowest box first), then the rest.
 */
function buildQueue (words, limit) {
  const progress = loadProgress()
  const due = []
  const rest = []

  for (const word of shuffle(words)) {
    const card = getCard(progress, word.id)
    if (isDue(card)) {
      due.push({ word, box: card.box })
    } else {
      rest.push({ word, box: card.box })
    }
  }
  due.sort((a, b) => a.box - b.box)

  return due.concat(rest).slice(0, limit).map(entry => entry.word)
}

function withArticle (word) {
  return word.article ? `${word.article} ${word.term}` : word.term
}

// ---------------------------------------------------------------------------
// App state and rendering
// ---------------------------------------------------------------------------

const ROUND_SIZE = 10

const state = {
  view: 'home',
  category: 'all',
  queue: [],
  index: 0,
  flipped: false,
  // current quiz/article question
  question: null,
  answered: false,
  // round results
  correctCount: 0,
  wrongCount: 0
}

const app = document.getElementById('app')

function render () {
  switch (state.view) {
    case 'home': renderHome(); break
    case 'flashcards': renderFlashcards(); break
    case 'quiz': renderQuiz(); break
    case 'articles': renderArticles(); break
    case 'results': renderResults(); break
  }
}

function el (tag, className, html) {
  const node = document.createElement(tag)
  if (className) node.className = className
  if (html !== undefined) node.innerHTML = html
  return node
}

function button (label, className, onClick) {
  const node = el('button', className, label)
  node.addEventListener('click', onClick)
  return node
}

// ---------------------------------------------------------------------------
// Home view
// ---------------------------------------------------------------------------

function overallStats () {
  const progress = loadProgress()
  let started = 0
  let mastered = 0
  let due = 0

  for (const word of VOCABULARY) {
    const card = progress[word.id]
    if (!card) continue
    started++
    if (card.box === MAX_BOX) mastered++
    if (isDue(card)) due++
  }
  return { total: VOCABULARY.length, started, mastered, due }
}

function categoryStats (categoryId) {
  const progress = loadProgress()
  const words = wordsForCategory(categoryId)
  const mastered = words.filter(word => {
    const card = progress[word.id]
    return card && card.box === MAX_BOX
  }).length
  return { total: words.length, mastered }
}

function renderHome () {
  app.innerHTML = ''

  const header = el('header', 'app-header')
  header.appendChild(el('h1', null, '🏥 Deutsch für die Pflege'))
  header.appendChild(el('p', 'subtitle', 'Vokabeltrainer für Pflegeberufe'))
  app.appendChild(header)

  const stats = overallStats()
  const statsBar = el('section', 'stats-bar')
  statsBar.appendChild(statBox(stats.total, 'Wörter'))
  statsBar.appendChild(statBox(stats.started, 'Begonnen'))
  statsBar.appendChild(statBox(stats.mastered, 'Gemeistert'))
  statsBar.appendChild(statBox(stats.due, 'Fällig'))
  app.appendChild(statsBar)

  app.appendChild(el('h2', 'section-title', 'Kategorie wählen'))

  const grid = el('div', 'category-grid')
  const allCategories = [{ id: 'all', name: 'Alle Kategorien', icon: '📚' }].concat(CATEGORIES)
  for (const category of allCategories) {
    const cStats = categoryStats(category.id)
    const card = el('div', 'category-card' + (state.category === category.id ? ' selected' : ''))
    card.appendChild(el('div', 'category-icon', category.icon))
    card.appendChild(el('div', 'category-name', category.name))
    card.appendChild(el('div', 'category-progress', `${cStats.mastered} / ${cStats.total} gemeistert`))
    const fill = el('div', 'progress-track')
    const pct = cStats.total ? Math.round(100 * cStats.mastered / cStats.total) : 0
    fill.appendChild(el('div', 'progress-fill')).style.width = pct + '%'
    card.appendChild(fill)
    card.addEventListener('click', () => {
      state.category = category.id
      render()
    })
    grid.appendChild(card)
  }
  app.appendChild(grid)

  app.appendChild(el('h2', 'section-title', 'Modus wählen'))

  const modes = el('div', 'mode-grid')
  modes.appendChild(modeCard('🃏', 'Karteikarten', 'Lernen mit Wiederholung nach dem Leitner-System', startFlashcards))
  modes.appendChild(modeCard('❓', 'Quiz', 'Multiple-Choice: Deutsch ↔ Englisch', startQuiz))
  modes.appendChild(modeCard('🔤', 'Artikel-Training', 'der, die oder das?', startArticles))
  app.appendChild(modes)

  const footer = el('footer', 'app-footer')
  footer.appendChild(button('Fortschritt zurücksetzen', 'btn btn-link', () => {
    if (window.confirm('Möchten Sie wirklich den gesamten Lernfortschritt löschen?')) {
      localStorage.removeItem(STORAGE_KEY)
      render()
    }
  }))
  app.appendChild(footer)
}

function statBox (value, label) {
  const box = el('div', 'stat-box')
  box.appendChild(el('div', 'stat-value', String(value)))
  box.appendChild(el('div', 'stat-label', label))
  return box
}

function modeCard (icon, title, description, onClick) {
  const card = el('div', 'mode-card')
  card.appendChild(el('div', 'mode-icon', icon))
  card.appendChild(el('div', 'mode-title', title))
  card.appendChild(el('div', 'mode-description', description))
  card.addEventListener('click', onClick)
  return card
}

// ---------------------------------------------------------------------------
// Shared trainer chrome
// ---------------------------------------------------------------------------

function trainerHeader (title) {
  const header = el('header', 'trainer-header')
  header.appendChild(button('← Zurück', 'btn btn-back', goHome))
  header.appendChild(el('h2', null, title))
  const counter = el('div', 'trainer-counter',
    `${Math.min(state.index + 1, state.queue.length)} / ${state.queue.length}`)
  header.appendChild(counter)
  return header
}

function goHome () {
  state.view = 'home'
  render()
}

// Remembered so "Noch eine Runde" on the results screen repeats the same mode
let lastTrainerView = 'flashcards'

function startRound (view, words) {
  lastTrainerView = view
  state.queue = buildQueue(words || wordsForCategory(state.category), ROUND_SIZE)
  state.index = 0
  state.flipped = false
  state.question = null
  state.answered = false
  state.correctCount = 0
  state.wrongCount = 0
  state.view = view
  render()
}

function advance () {
  state.index++
  state.flipped = false
  state.question = null
  state.answered = false
  if (state.index >= state.queue.length) {
    state.view = 'results'
  }
  render()
}

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

function startFlashcards () {
  startRound('flashcards')
}

function renderFlashcards () {
  app.innerHTML = ''
  app.appendChild(trainerHeader('🃏 Karteikarten'))

  const word = state.queue[state.index]
  const card = el('div', 'flashcard' + (state.flipped ? ' flipped' : ''))

  const front = el('div', 'flashcard-face flashcard-front')
  front.appendChild(el('div', 'flashcard-term', withArticle(word)))
  if (word.plural) front.appendChild(el('div', 'flashcard-plural', `Plural: ${word.plural}`))
  front.appendChild(el('div', 'flashcard-hint', 'Tippen zum Umdrehen'))

  const back = el('div', 'flashcard-face flashcard-back')
  back.appendChild(el('div', 'flashcard-translation', word.english))
  back.appendChild(el('div', 'flashcard-example', `„${word.example}“`))

  card.appendChild(front)
  card.appendChild(back)
  card.addEventListener('click', () => {
    state.flipped = !state.flipped
    render()
  })
  app.appendChild(card)

  const actions = el('div', 'flashcard-actions')
  if (state.flipped) {
    actions.appendChild(button('✗ Nochmal lernen', 'btn btn-wrong', () => {
      recordAnswer(word.id, false)
      state.wrongCount++
      advance()
    }))
    actions.appendChild(button('✓ Gewusst', 'btn btn-correct', () => {
      recordAnswer(word.id, true)
      state.correctCount++
      advance()
    }))
  } else {
    actions.appendChild(el('p', 'flashcard-prompt', 'Kennen Sie die Übersetzung? Drehen Sie die Karte um.'))
  }
  app.appendChild(actions)
}

// ---------------------------------------------------------------------------
// Quiz (multiple choice)
// ---------------------------------------------------------------------------

function startQuiz () {
  startRound('quiz')
}

function buildQuizQuestion (word) {
  // Randomly ask DE→EN or EN→DE
  const direction = Math.random() < 0.5 ? 'de-en' : 'en-de'
  const correctAnswer = direction === 'de-en' ? word.english : withArticle(word)

  const distractors = shuffle(VOCABULARY.filter(other => other.id !== word.id))
    .slice(0, 3)
    .map(other => (direction === 'de-en' ? other.english : withArticle(other)))

  return {
    direction,
    prompt: direction === 'de-en' ? withArticle(word) : word.english,
    promptLabel: direction === 'de-en'
      ? 'Was bedeutet dieses Wort auf Englisch?'
      : 'Wie heißt dieses Wort auf Deutsch?',
    correctAnswer,
    options: shuffle(distractors.concat(correctAnswer))
  }
}

function renderQuiz () {
  app.innerHTML = ''
  app.appendChild(trainerHeader('❓ Quiz'))

  const word = state.queue[state.index]
  if (!state.question) state.question = buildQuizQuestion(word)
  const question = state.question

  const panel = el('div', 'question-panel')
  panel.appendChild(el('div', 'question-label', question.promptLabel))
  panel.appendChild(el('div', 'question-term', question.prompt))
  app.appendChild(panel)

  const options = el('div', 'option-list')
  for (const option of question.options) {
    let className = 'btn btn-option'
    if (state.answered) {
      if (option === question.correctAnswer) className += ' option-correct'
      else if (option === question.chosen) className += ' option-wrong'
      else className += ' option-disabled'
    }
    const optionButton = button(option, className, () => {
      if (state.answered) return
      state.answered = true
      question.chosen = option
      const isCorrect = option === question.correctAnswer
      recordAnswer(word.id, isCorrect)
      if (isCorrect) state.correctCount++
      else state.wrongCount++
      render()
    })
    options.appendChild(optionButton)
  }
  app.appendChild(options)

  if (state.answered) {
    const feedback = el('div', 'feedback')
    const isCorrect = question.chosen === question.correctAnswer
    feedback.appendChild(el('p', isCorrect ? 'feedback-correct' : 'feedback-wrong',
      isCorrect ? '✓ Richtig!' : `✗ Leider falsch. Richtig ist: <strong>${question.correctAnswer}</strong>`))
    feedback.appendChild(el('p', 'feedback-example', `„${word.example}“`))
    feedback.appendChild(button('Weiter →', 'btn btn-primary', advance))
    app.appendChild(feedback)
  }
}

// ---------------------------------------------------------------------------
// Article training (der/die/das)
// ---------------------------------------------------------------------------

function startArticles () {
  const nouns = wordsForCategory(state.category)
    .filter(word => ['der', 'die', 'das'].includes(word.article))
  if (nouns.length === 0) {
    window.alert('In dieser Kategorie gibt es keine Nomen für das Artikel-Training.')
    return
  }
  startRound('articles', nouns)
}

function renderArticles () {
  app.innerHTML = ''
  app.appendChild(trainerHeader('🔤 Artikel-Training'))

  const word = state.queue[state.index]

  const panel = el('div', 'question-panel')
  panel.appendChild(el('div', 'question-label', 'Welcher Artikel ist richtig?'))
  panel.appendChild(el('div', 'question-term', `___ ${word.term}`))
  panel.appendChild(el('div', 'question-translation', `(${word.english})`))
  app.appendChild(panel)

  const options = el('div', 'option-list option-list-articles')
  for (const article of ['der', 'die', 'das']) {
    let className = 'btn btn-option btn-article'
    if (state.answered) {
      if (article === word.article) className += ' option-correct'
      else if (article === state.question?.chosen) className += ' option-wrong'
      else className += ' option-disabled'
    }
    options.appendChild(button(article, className, () => {
      if (state.answered) return
      state.answered = true
      state.question = { chosen: article }
      const isCorrect = article === word.article
      recordAnswer(word.id, isCorrect)
      if (isCorrect) state.correctCount++
      else state.wrongCount++
      render()
    }))
  }
  app.appendChild(options)

  if (state.answered) {
    const feedback = el('div', 'feedback')
    const isCorrect = state.question.chosen === word.article
    feedback.appendChild(el('p', isCorrect ? 'feedback-correct' : 'feedback-wrong',
      isCorrect
        ? `✓ Richtig: <strong>${withArticle(word)}</strong>`
        : `✗ Leider falsch. Richtig ist: <strong>${withArticle(word)}</strong>`))
    if (word.plural) feedback.appendChild(el('p', 'feedback-example', `Plural: ${word.plural}`))
    feedback.appendChild(button('Weiter →', 'btn btn-primary', advance))
    app.appendChild(feedback)
  }
}

// ---------------------------------------------------------------------------
// Results
// ---------------------------------------------------------------------------

function renderResults () {
  app.innerHTML = ''

  const total = state.correctCount + state.wrongCount
  const pct = total ? Math.round(100 * state.correctCount / total) : 0

  const panel = el('div', 'results-panel')
  panel.appendChild(el('div', 'results-icon', pct >= 80 ? '🎉' : pct >= 50 ? '💪' : '📖'))
  panel.appendChild(el('h2', null, 'Runde abgeschlossen!'))
  panel.appendChild(el('p', 'results-score', `${state.correctCount} von ${total} richtig (${pct} %)`))
  panel.appendChild(el('p', 'results-message',
    pct >= 80
      ? 'Sehr gut! Weiter so!'
      : pct >= 50
        ? 'Gut gemacht – Wiederholung hilft beim Merken.'
        : 'Nicht aufgeben! Üben Sie die Wörter noch einmal mit den Karteikarten.'))

  const actions = el('div', 'results-actions')
  const starters = { flashcards: startFlashcards, quiz: startQuiz, articles: startArticles }
  actions.appendChild(button('Noch eine Runde', 'btn btn-primary', starters[lastTrainerView]))
  actions.appendChild(button('Zur Übersicht', 'btn btn-secondary', goHome))
  panel.appendChild(actions)

  app.appendChild(panel)
}

render()
