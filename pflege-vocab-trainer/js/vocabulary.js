/**
 * Vocabulary data for "Deutsch für die Pflege".
 * Each entry: unique id, category id, article (null for verbs/phrases),
 * German term, plural (nouns only), English translation, German example sentence.
 */

const CATEGORIES = [
  { id: 'koerper', name: 'Körper & Anatomie', icon: '🫀' },
  { id: 'taetigkeiten', name: 'Pflegetätigkeiten', icon: '🤲' },
  { id: 'hilfsmittel', name: 'Hilfsmittel & Geräte', icon: '🦽' },
  { id: 'medikamente', name: 'Medikamente & Therapie', icon: '💊' },
  { id: 'vitalzeichen', name: 'Vitalzeichen & Messungen', icon: '🌡️' },
  { id: 'krankheiten', name: 'Krankheiten & Symptome', icon: '🤒' },
  { id: 'hygiene', name: 'Hygiene & Sicherheit', icon: '🧼' },
  { id: 'kommunikation', name: 'Kommunikation & Dokumentation', icon: '🗣️' }
]

const VOCABULARY = [
  // --- Körper & Anatomie ---
  { id: 'koerper-01', category: 'koerper', article: 'der', term: 'Kopf', plural: 'die Köpfe', english: 'head', example: 'Die Patientin hat sich am Kopf gestoßen.' },
  { id: 'koerper-02', category: 'koerper', article: 'das', term: 'Herz', plural: 'die Herzen', english: 'heart', example: 'Das Herz schlägt regelmäßig.' },
  { id: 'koerper-03', category: 'koerper', article: 'die', term: 'Lunge', plural: 'die Lungen', english: 'lung', example: 'Der Arzt hört die Lunge ab.' },
  { id: 'koerper-04', category: 'koerper', article: 'der', term: 'Magen', plural: 'die Mägen', english: 'stomach', example: 'Der Patient klagt über Schmerzen im Magen.' },
  { id: 'koerper-05', category: 'koerper', article: 'die', term: 'Niere', plural: 'die Nieren', english: 'kidney', example: 'Die linke Niere ist vergrößert.' },
  { id: 'koerper-06', category: 'koerper', article: 'die', term: 'Leber', plural: 'die Lebern', english: 'liver', example: 'Die Leberwerte werden im Labor kontrolliert.' },
  { id: 'koerper-07', category: 'koerper', article: 'die', term: 'Haut', plural: 'die Häute', english: 'skin', example: 'Die Haut am Rücken ist gerötet.' },
  { id: 'koerper-08', category: 'koerper', article: 'der', term: 'Knochen', plural: 'die Knochen', english: 'bone', example: 'Der Knochen ist gebrochen.' },
  { id: 'koerper-09', category: 'koerper', article: 'das', term: 'Gelenk', plural: 'die Gelenke', english: 'joint', example: 'Das Gelenk ist geschwollen und schmerzt.' },
  { id: 'koerper-10', category: 'koerper', article: 'der', term: 'Muskel', plural: 'die Muskeln', english: 'muscle', example: 'Bewegung stärkt die Muskeln.' },
  { id: 'koerper-11', category: 'koerper', article: 'die', term: 'Wirbelsäule', plural: 'die Wirbelsäulen', english: 'spine', example: 'Beim Lagern muss die Wirbelsäule gerade bleiben.' },
  { id: 'koerper-12', category: 'koerper', article: 'die', term: 'Blase', plural: 'die Blasen', english: 'bladder', example: 'Die Patientin kann die Blase nicht vollständig entleeren.' },
  { id: 'koerper-13', category: 'koerper', article: 'der', term: 'Darm', plural: 'die Därme', english: 'intestine, bowel', example: 'Der Darm wurde vor der Operation entleert.' },
  { id: 'koerper-14', category: 'koerper', article: 'das', term: 'Gehirn', plural: 'die Gehirne', english: 'brain', example: 'Nach dem Schlaganfall ist ein Teil des Gehirns geschädigt.' },
  { id: 'koerper-15', category: 'koerper', article: 'die', term: 'Schulter', plural: 'die Schultern', english: 'shoulder', example: 'Heben Sie bitte den Arm über die Schulter.' },

  // --- Pflegetätigkeiten ---
  { id: 'taetig-01', category: 'taetigkeiten', article: null, term: 'waschen', plural: null, english: 'to wash', example: 'Ich wasche der Patientin den Rücken.' },
  { id: 'taetig-02', category: 'taetigkeiten', article: null, term: 'lagern', plural: null, english: 'to position (a patient)', example: 'Wir lagern den Patienten alle zwei Stunden um.' },
  { id: 'taetig-03', category: 'taetigkeiten', article: null, term: 'mobilisieren', plural: null, english: 'to mobilize', example: 'Nach der Operation mobilisieren wir den Patienten früh.' },
  { id: 'taetig-04', category: 'taetigkeiten', article: null, term: 'füttern', plural: null, english: 'to feed', example: 'Herr Meier kann nicht selbst essen, ich füttere ihn.' },
  { id: 'taetig-05', category: 'taetigkeiten', article: null, term: 'verbinden', plural: null, english: 'to bandage, to dress (a wound)', example: 'Die Pflegekraft verbindet die Wunde am Bein.' },
  { id: 'taetig-06', category: 'taetigkeiten', article: 'die', term: 'Grundpflege', plural: null, english: 'basic care', example: 'Zur Grundpflege gehören Waschen, Anziehen und Essen anreichen.' },
  { id: 'taetig-07', category: 'taetigkeiten', article: 'die', term: 'Körperpflege', plural: null, english: 'personal hygiene care', example: 'Die Körperpflege findet morgens am Waschbecken statt.' },
  { id: 'taetig-08', category: 'taetigkeiten', article: 'der', term: 'Verbandswechsel', plural: 'die Verbandswechsel', english: 'dressing change', example: 'Der Verbandswechsel erfolgt einmal täglich steril.' },
  { id: 'taetig-09', category: 'taetigkeiten', article: 'die', term: 'Dekubitusprophylaxe', plural: 'die Dekubitusprophylaxen', english: 'pressure ulcer prevention', example: 'Regelmäßiges Umlagern ist wichtig für die Dekubitusprophylaxe.' },
  { id: 'taetig-10', category: 'taetigkeiten', article: null, term: 'umlagern', plural: null, english: 'to reposition', example: 'Bitte helfen Sie mir, die Patientin umzulagern.' },
  { id: 'taetig-11', category: 'taetigkeiten', article: 'die', term: 'Übergabe', plural: 'die Übergaben', english: 'handover, shift report', example: 'In der Übergabe besprechen wir alle Patienten.' },
  { id: 'taetig-12', category: 'taetigkeiten', article: 'die', term: 'Schicht', plural: 'die Schichten', english: 'shift', example: 'Ich arbeite heute in der Nachtschicht.' },
  { id: 'taetig-13', category: 'taetigkeiten', article: null, term: 'absaugen', plural: null, english: 'to suction', example: 'Der Patient muss regelmäßig abgesaugt werden.' },
  { id: 'taetig-14', category: 'taetigkeiten', article: null, term: 'anreichen', plural: null, english: 'to assist with eating/drinking', example: 'Ich reiche Frau Schulz das Essen an.' },
  { id: 'taetig-15', category: 'taetigkeiten', article: 'die', term: 'Visite', plural: 'die Visiten', english: 'ward round', example: 'Bei der Visite bespricht der Arzt die Therapie.' },

  // --- Hilfsmittel & Geräte ---
  { id: 'hilfs-01', category: 'hilfsmittel', article: 'der', term: 'Rollstuhl', plural: 'die Rollstühle', english: 'wheelchair', example: 'Der Patient sitzt im Rollstuhl am Fenster.' },
  { id: 'hilfs-02', category: 'hilfsmittel', article: 'der', term: 'Rollator', plural: 'die Rollatoren', english: 'walker, rollator', example: 'Mit dem Rollator kann Frau Krause allein gehen.' },
  { id: 'hilfs-03', category: 'hilfsmittel', article: 'das', term: 'Pflegebett', plural: 'die Pflegebetten', english: 'nursing bed', example: 'Das Pflegebett lässt sich elektrisch verstellen.' },
  { id: 'hilfs-04', category: 'hilfsmittel', article: 'der', term: 'Katheter', plural: 'die Katheter', english: 'catheter', example: 'Der Katheter wird unter sterilen Bedingungen gelegt.' },
  { id: 'hilfs-05', category: 'hilfsmittel', article: 'die', term: 'Infusion', plural: 'die Infusionen', english: 'infusion, IV drip', example: 'Die Infusion läuft über die Vene am Unterarm.' },
  { id: 'hilfs-06', category: 'hilfsmittel', article: 'die', term: 'Spritze', plural: 'die Spritzen', english: 'syringe, injection', example: 'Die Spritze wird in den Oberarm gegeben.' },
  { id: 'hilfs-07', category: 'hilfsmittel', article: 'die', term: 'Kanüle', plural: 'die Kanülen', english: 'cannula, needle', example: 'Die Kanüle wird in die Vene eingeführt.' },
  { id: 'hilfs-08', category: 'hilfsmittel', article: 'das', term: 'Stethoskop', plural: 'die Stethoskope', english: 'stethoscope', example: 'Mit dem Stethoskop hört die Ärztin das Herz ab.' },
  { id: 'hilfs-09', category: 'hilfsmittel', article: 'das', term: 'Blutdruckmessgerät', plural: 'die Blutdruckmessgeräte', english: 'blood pressure monitor', example: 'Das Blutdruckmessgerät zeigt 120 zu 80 an.' },
  { id: 'hilfs-10', category: 'hilfsmittel', article: 'die', term: 'Bettpfanne', plural: 'die Bettpfannen', english: 'bedpan', example: 'Ich bringe Ihnen die Bettpfanne ans Bett.' },
  { id: 'hilfs-11', category: 'hilfsmittel', article: 'der', term: 'Lifter', plural: 'die Lifter', english: 'patient lift, hoist', example: 'Mit dem Lifter heben wir den Patienten aus dem Bett.' },
  { id: 'hilfs-12', category: 'hilfsmittel', article: 'die', term: 'Gehhilfe', plural: 'die Gehhilfen', english: 'walking aid', example: 'Ohne Gehhilfe ist der Patient sturzgefährdet.' },
  { id: 'hilfs-13', category: 'hilfsmittel', article: 'das', term: 'Hörgerät', plural: 'die Hörgeräte', english: 'hearing aid', example: 'Bitte setzen Sie Ihr Hörgerät ein.' },
  { id: 'hilfs-14', category: 'hilfsmittel', article: 'die', term: 'Sauerstoffbrille', plural: 'die Sauerstoffbrillen', english: 'nasal cannula (oxygen)', example: 'Der Patient bekommt zwei Liter Sauerstoff über die Sauerstoffbrille.' },
  { id: 'hilfs-15', category: 'hilfsmittel', article: 'das', term: 'Inkontinenzmaterial', plural: 'die Inkontinenzmaterialien', english: 'incontinence products', example: 'Das Inkontinenzmaterial wird nach Bedarf gewechselt.' },

  // --- Medikamente & Therapie ---
  { id: 'medi-01', category: 'medikamente', article: 'das', term: 'Medikament', plural: 'die Medikamente', english: 'medication, drug', example: 'Das Medikament wird dreimal täglich eingenommen.' },
  { id: 'medi-02', category: 'medikamente', article: 'die', term: 'Tablette', plural: 'die Tabletten', english: 'tablet, pill', example: 'Nehmen Sie die Tablette bitte mit Wasser ein.' },
  { id: 'medi-03', category: 'medikamente', article: 'die', term: 'Salbe', plural: 'die Salben', english: 'ointment', example: 'Die Salbe wird dünn auf die Haut aufgetragen.' },
  { id: 'medi-04', category: 'medikamente', article: 'das', term: 'Schmerzmittel', plural: 'die Schmerzmittel', english: 'painkiller', example: 'Der Patient bekommt bei Bedarf ein Schmerzmittel.' },
  { id: 'medi-05', category: 'medikamente', article: 'das', term: 'Antibiotikum', plural: 'die Antibiotika', english: 'antibiotic', example: 'Das Antibiotikum muss bis zum Ende eingenommen werden.' },
  { id: 'medi-06', category: 'medikamente', article: 'die', term: 'Dosierung', plural: 'die Dosierungen', english: 'dosage', example: 'Die Dosierung steht auf dem Medikamentenplan.' },
  { id: 'medi-07', category: 'medikamente', article: 'die', term: 'Nebenwirkung', plural: 'die Nebenwirkungen', english: 'side effect', example: 'Übelkeit ist eine häufige Nebenwirkung.' },
  { id: 'medi-08', category: 'medikamente', article: 'das', term: 'Rezept', plural: 'die Rezepte', english: 'prescription', example: 'Der Arzt stellt ein Rezept für die Tropfen aus.' },
  { id: 'medi-09', category: 'medikamente', article: 'die', term: 'Tropfen', plural: null, english: 'drops', example: 'Die Tropfen werden in Wasser gegeben.' },
  { id: 'medi-10', category: 'medikamente', article: 'das', term: 'Insulin', plural: null, english: 'insulin', example: 'Das Insulin wird vor dem Essen gespritzt.' },
  { id: 'medi-11', category: 'medikamente', article: null, term: 'verabreichen', plural: null, english: 'to administer', example: 'Die Pflegekraft verabreicht die Medikamente nach Plan.' },
  { id: 'medi-12', category: 'medikamente', article: null, term: 'einnehmen', plural: null, english: 'to take (medication)', example: 'Haben Sie Ihre Tabletten schon eingenommen?' },
  { id: 'medi-13', category: 'medikamente', article: 'der', term: 'Medikamentenplan', plural: 'die Medikamentenpläne', english: 'medication schedule', example: 'Im Medikamentenplan steht die genaue Uhrzeit.' },
  { id: 'medi-14', category: 'medikamente', article: 'das', term: 'Zäpfchen', plural: 'die Zäpfchen', english: 'suppository', example: 'Das Zäpfchen wirkt gegen das Fieber.' },
  { id: 'medi-15', category: 'medikamente', article: 'die', term: 'Wechselwirkung', plural: 'die Wechselwirkungen', english: 'drug interaction', example: 'Zwischen den beiden Medikamenten gibt es eine Wechselwirkung.' },

  // --- Vitalzeichen & Messungen ---
  { id: 'vital-01', category: 'vitalzeichen', article: 'der', term: 'Blutdruck', plural: null, english: 'blood pressure', example: 'Ich messe jetzt Ihren Blutdruck.' },
  { id: 'vital-02', category: 'vitalzeichen', article: 'der', term: 'Puls', plural: 'die Pulse', english: 'pulse', example: 'Der Puls liegt bei 72 Schlägen pro Minute.' },
  { id: 'vital-03', category: 'vitalzeichen', article: 'die', term: 'Temperatur', plural: 'die Temperaturen', english: 'temperature', example: 'Die Temperatur wird im Ohr gemessen.' },
  { id: 'vital-04', category: 'vitalzeichen', article: 'das', term: 'Fieber', plural: null, english: 'fever', example: 'Der Patient hat seit gestern Abend Fieber.' },
  { id: 'vital-05', category: 'vitalzeichen', article: 'die', term: 'Atmung', plural: null, english: 'breathing, respiration', example: 'Die Atmung ist flach und schnell.' },
  { id: 'vital-06', category: 'vitalzeichen', article: 'die', term: 'Sauerstoffsättigung', plural: null, english: 'oxygen saturation', example: 'Die Sauerstoffsättigung liegt bei 96 Prozent.' },
  { id: 'vital-07', category: 'vitalzeichen', article: 'der', term: 'Blutzucker', plural: null, english: 'blood sugar', example: 'Der Blutzucker wird vor jeder Mahlzeit gemessen.' },
  { id: 'vital-08', category: 'vitalzeichen', article: null, term: 'messen', plural: null, english: 'to measure', example: 'Ich messe morgens und abends den Blutdruck.' },
  { id: 'vital-09', category: 'vitalzeichen', article: 'das', term: 'Gewicht', plural: 'die Gewichte', english: 'weight', example: 'Das Gewicht wird einmal pro Woche kontrolliert.' },
  { id: 'vital-10', category: 'vitalzeichen', article: 'der', term: 'Wert', plural: 'die Werte', english: 'value, reading', example: 'Die Werte sind heute alle im Normalbereich.' },
  { id: 'vital-11', category: 'vitalzeichen', article: 'die', term: 'Bewusstlosigkeit', plural: null, english: 'unconsciousness', example: 'Bei Bewusstlosigkeit sofort den Notruf wählen.' },
  { id: 'vital-12', category: 'vitalzeichen', article: 'die', term: 'Ausscheidung', plural: 'die Ausscheidungen', english: 'excretion, output', example: 'Die Ausscheidung wird im Protokoll dokumentiert.' },
  { id: 'vital-13', category: 'vitalzeichen', article: 'die', term: 'Flüssigkeitsbilanz', plural: 'die Flüssigkeitsbilanzen', english: 'fluid balance', example: 'Bei Herzschwäche führen wir eine Flüssigkeitsbilanz.' },
  { id: 'vital-14', category: 'vitalzeichen', article: null, term: 'kontrollieren', plural: null, english: 'to check, to monitor', example: 'Bitte kontrollieren Sie stündlich die Vitalzeichen.' },
  { id: 'vital-15', category: 'vitalzeichen', article: 'der', term: 'Normalbereich', plural: 'die Normalbereiche', english: 'normal range', example: 'Der Puls ist im Normalbereich.' },

  // --- Krankheiten & Symptome ---
  { id: 'krank-01', category: 'krankheiten', article: 'der', term: 'Schmerz', plural: 'die Schmerzen', english: 'pain', example: 'Auf einer Skala von 1 bis 10 – wie stark ist der Schmerz?' },
  { id: 'krank-02', category: 'krankheiten', article: 'der', term: 'Schwindel', plural: null, english: 'dizziness', example: 'Beim Aufstehen hat die Patientin Schwindel.' },
  { id: 'krank-03', category: 'krankheiten', article: 'die', term: 'Übelkeit', plural: null, english: 'nausea', example: 'Nach der Narkose klagt er über Übelkeit.' },
  { id: 'krank-04', category: 'krankheiten', article: 'der', term: 'Durchfall', plural: 'die Durchfälle', english: 'diarrhea', example: 'Bei Durchfall ist viel Trinken wichtig.' },
  { id: 'krank-05', category: 'krankheiten', article: 'die', term: 'Verstopfung', plural: 'die Verstopfungen', english: 'constipation', example: 'Gegen die Verstopfung bekommt sie ein Abführmittel.' },
  { id: 'krank-06', category: 'krankheiten', article: 'die', term: 'Wunde', plural: 'die Wunden', english: 'wound', example: 'Die Wunde heilt gut und ist nicht entzündet.' },
  { id: 'krank-07', category: 'krankheiten', article: 'der', term: 'Dekubitus', plural: 'die Dekubitus', english: 'pressure ulcer, bedsore', example: 'Am Steißbein hat sich ein Dekubitus gebildet.' },
  { id: 'krank-08', category: 'krankheiten', article: 'der', term: 'Schlaganfall', plural: 'die Schlaganfälle', english: 'stroke', example: 'Nach dem Schlaganfall ist die rechte Seite gelähmt.' },
  { id: 'krank-09', category: 'krankheiten', article: 'der', term: 'Herzinfarkt', plural: 'die Herzinfarkte', english: 'heart attack', example: 'Brustschmerzen können ein Zeichen für einen Herzinfarkt sein.' },
  { id: 'krank-10', category: 'krankheiten', article: 'die', term: 'Demenz', plural: 'die Demenzen', english: 'dementia', example: 'Frau Berger hat eine fortgeschrittene Demenz.' },
  { id: 'krank-11', category: 'krankheiten', article: 'der', term: 'Diabetes', plural: null, english: 'diabetes', example: 'Bei Diabetes muss der Blutzucker regelmäßig gemessen werden.' },
  { id: 'krank-12', category: 'krankheiten', article: 'die', term: 'Entzündung', plural: 'die Entzündungen', english: 'inflammation, infection', example: 'Die Wunde zeigt Zeichen einer Entzündung.' },
  { id: 'krank-13', category: 'krankheiten', article: 'die', term: 'Atemnot', plural: null, english: 'shortness of breath', example: 'Bei Atemnot den Oberkörper hoch lagern.' },
  { id: 'krank-14', category: 'krankheiten', article: 'der', term: 'Sturz', plural: 'die Stürze', english: 'fall', example: 'Nach dem Sturz wird ein Sturzprotokoll geschrieben.' },
  { id: 'krank-15', category: 'krankheiten', article: 'die', term: 'Allergie', plural: 'die Allergien', english: 'allergy', example: 'Der Patient hat eine Allergie gegen Penicillin.' },

  // --- Hygiene & Sicherheit ---
  { id: 'hygiene-01', category: 'hygiene', article: 'die', term: 'Hygiene', plural: null, english: 'hygiene', example: 'Hygiene ist die wichtigste Maßnahme gegen Infektionen.' },
  { id: 'hygiene-02', category: 'hygiene', article: 'die', term: 'Händedesinfektion', plural: 'die Händedesinfektionen', english: 'hand disinfection', example: 'Vor jedem Patientenkontakt ist eine Händedesinfektion nötig.' },
  { id: 'hygiene-03', category: 'hygiene', article: 'das', term: 'Desinfektionsmittel', plural: 'die Desinfektionsmittel', english: 'disinfectant', example: 'Das Desinfektionsmittel muss 30 Sekunden einwirken.' },
  { id: 'hygiene-04', category: 'hygiene', article: 'die', term: 'Handschuhe', plural: null, english: 'gloves', example: 'Beim Verbandswechsel trage ich sterile Handschuhe.' },
  { id: 'hygiene-05', category: 'hygiene', article: 'der', term: 'Mundschutz', plural: 'die Mundschutze', english: 'face mask', example: 'Im Isolierzimmer ist ein Mundschutz Pflicht.' },
  { id: 'hygiene-06', category: 'hygiene', article: 'der', term: 'Kittel', plural: 'die Kittel', english: 'gown, coat', example: 'Bitte ziehen Sie einen frischen Kittel an.' },
  { id: 'hygiene-07', category: 'hygiene', article: null, term: 'desinfizieren', plural: null, english: 'to disinfect', example: 'Ich desinfiziere die Arbeitsfläche nach jedem Gebrauch.' },
  { id: 'hygiene-08', category: 'hygiene', article: null, term: 'steril', plural: null, english: 'sterile', example: 'Das Material für den Verbandswechsel ist steril verpackt.' },
  { id: 'hygiene-09', category: 'hygiene', article: 'die', term: 'Infektion', plural: 'die Infektionen', english: 'infection', example: 'Durch Händewaschen können Infektionen vermieden werden.' },
  { id: 'hygiene-10', category: 'hygiene', article: 'die', term: 'Isolierung', plural: 'die Isolierungen', english: 'isolation', example: 'Der Patient mit dem Keim liegt in Isolierung.' },
  { id: 'hygiene-11', category: 'hygiene', article: 'der', term: 'Abfall', plural: 'die Abfälle', english: 'waste', example: 'Spitzer Abfall gehört in den gelben Behälter.' },
  { id: 'hygiene-12', category: 'hygiene', article: 'die', term: 'Schutzkleidung', plural: null, english: 'protective clothing', example: 'Im OP tragen alle Schutzkleidung.' },
  { id: 'hygiene-13', category: 'hygiene', article: 'die', term: 'Sturzgefahr', plural: 'die Sturzgefahren', english: 'risk of falling', example: 'Bei Sturzgefahr bleibt das Bettgitter oben.' },
  { id: 'hygiene-14', category: 'hygiene', article: 'der', term: 'Notruf', plural: 'die Notrufe', english: 'emergency call', example: 'Die Klingel für den Notruf liegt neben dem Kissen.' },
  { id: 'hygiene-15', category: 'hygiene', article: 'der', term: 'Keim', plural: 'die Keime', english: 'germ, pathogen', example: 'Multiresistente Keime sind ein großes Problem im Krankenhaus.' },

  // --- Kommunikation & Dokumentation ---
  { id: 'komm-01', category: 'kommunikation', article: 'die', term: 'Pflegedokumentation', plural: 'die Pflegedokumentationen', english: 'nursing documentation', example: 'Alle Maßnahmen werden in der Pflegedokumentation festgehalten.' },
  { id: 'komm-02', category: 'kommunikation', article: 'der', term: 'Pflegebericht', plural: 'die Pflegeberichte', english: 'nursing report', example: 'Im Pflegebericht steht, wie die Nacht verlaufen ist.' },
  { id: 'komm-03', category: 'kommunikation', article: 'die', term: 'Patientenakte', plural: 'die Patientenakten', english: 'patient file', example: 'Die Befunde werden in der Patientenakte abgelegt.' },
  { id: 'komm-04', category: 'kommunikation', article: 'der', term: 'Angehörige', plural: 'die Angehörigen', english: 'relative, family member', example: 'Die Angehörigen kommen heute Nachmittag zu Besuch.' },
  { id: 'komm-05', category: 'kommunikation', article: 'die', term: 'Schweigepflicht', plural: null, english: 'confidentiality', example: 'Alle Pflegekräfte unterliegen der Schweigepflicht.' },
  { id: 'komm-06', category: 'kommunikation', article: 'das', term: 'Einverständnis', plural: 'die Einverständnisse', english: 'consent', example: 'Ohne Einverständnis darf nicht behandelt werden.' },
  { id: 'komm-07', category: 'kommunikation', article: null, term: 'dokumentieren', plural: null, english: 'to document', example: 'Bitte dokumentieren Sie die Vitalzeichen sofort.' },
  { id: 'komm-08', category: 'kommunikation', article: null, term: 'beraten', plural: null, english: 'to advise, to counsel', example: 'Wir beraten die Angehörigen zur Pflege zu Hause.' },
  { id: 'komm-09', category: 'kommunikation', article: 'das', term: 'Anliegen', plural: 'die Anliegen', english: 'concern, request', example: 'Haben Sie noch ein Anliegen, Frau Weber?' },
  { id: 'komm-10', category: 'kommunikation', article: 'die', term: 'Beschwerde', plural: 'die Beschwerden', english: 'complaint; (pl.) ailments', example: 'Welche Beschwerden haben Sie heute Morgen?' },
  { id: 'komm-11', category: 'kommunikation', article: 'der', term: 'Befund', plural: 'die Befunde', english: 'finding, result', example: 'Der Befund aus dem Labor liegt noch nicht vor.' },
  { id: 'komm-12', category: 'kommunikation', article: 'die', term: 'Anamnese', plural: 'die Anamnesen', english: 'medical history', example: 'Bei der Aufnahme wird eine Anamnese erhoben.' },
  { id: 'komm-13', category: 'kommunikation', article: 'die', term: 'Aufnahme', plural: 'die Aufnahmen', english: 'admission', example: 'Die Aufnahme neuer Patienten erfolgt auf Station 3.' },
  { id: 'komm-14', category: 'kommunikation', article: 'die', term: 'Entlassung', plural: 'die Entlassungen', english: 'discharge', example: 'Die Entlassung ist für Freitag geplant.' },
  { id: 'komm-15', category: 'kommunikation', article: null, term: 'zuhören', plural: null, english: 'to listen', example: 'In der Pflege ist es wichtig, gut zuzuhören.' }
]

if (typeof module !== 'undefined') {
  module.exports = { CATEGORIES, VOCABULARY }
}
