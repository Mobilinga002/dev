# Deutsch für die Pflege – Vokabeltrainer

Ein leichtgewichtiger Vokabeltrainer für Deutschlernende in Pflegeberufen.
Die App läuft komplett im Browser – ohne Build-Schritt, ohne Server, ohne
Abhängigkeiten.

## Starten

Einfach `index.html` im Browser öffnen, oder lokal ausliefern:

```bash
cd pflege-vocab-trainer
python3 -m http.server 8080
# dann http://localhost:8080 öffnen
```

## Funktionen

- **120 Fachbegriffe** in 8 Kategorien: Körper & Anatomie, Pflegetätigkeiten,
  Hilfsmittel & Geräte, Medikamente & Therapie, Vitalzeichen & Messungen,
  Krankheiten & Symptome, Hygiene & Sicherheit, Kommunikation & Dokumentation.
  Jeder Eintrag enthält Artikel, Plural, englische Übersetzung und einen
  Beispielsatz aus dem Pflegealltag.
- **🃏 Karteikarten** – Lernen mit Wiederholung nach dem Leitner-System
  (5 Boxen, Intervalle von 0 bis 14 Tagen). Fällige Wörter werden bevorzugt
  abgefragt.
- **❓ Quiz** – Multiple-Choice in beide Richtungen (Deutsch → Englisch und
  Englisch → Deutsch) mit Beispielsatz als Feedback.
- **🔤 Artikel-Training** – der, die oder das? Nur für Nomen.
- **Fortschritt** wird im `localStorage` des Browsers gespeichert und auf der
  Startseite pro Kategorie angezeigt. Über „Fortschritt zurücksetzen" kann er
  gelöscht werden.

## Technik

- Vanilla HTML/CSS/JavaScript, keine Frameworks
- `js/vocabulary.js` – Wortschatz als einfache Datenliste (leicht erweiterbar)
- `js/app.js` – Anwendungslogik (Ansichten, Leitner-Logik, Speicherung)
- `css/styles.css` – Layout, responsiv bis Smartphone-Breite

## Wortschatz erweitern

Neue Wörter werden in `js/vocabulary.js` ergänzt:

```js
{
  id: 'koerper-16',          // eindeutige ID (Kategorie + Nummer)
  category: 'koerper',       // ID einer Kategorie aus CATEGORIES
  article: 'die',            // 'der' | 'die' | 'das' | null (Verben/Adjektive)
  term: 'Hüfte',
  plural: 'die Hüften',      // null, wenn kein Plural
  english: 'hip',
  example: 'Die Patientin hat eine neue Hüfte bekommen.'
}
```
