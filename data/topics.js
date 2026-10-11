/* =========================================================================
   SYSB23 – Delkurser och ämnen (taggar)
   -------------------------------------------------------------------------
   Varje fråga i data/questions-*.js taggas med "delkurs" och "amne".
   Nycklarna nedan måste matcha de värden som används i frågefilerna.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.delkurser = [
  {
    id: 'databaser',
    namn: 'Databaser',
    beskrivning:
      'SQL, konceptuell/logisk/fysisk databasdesign, normalisering, ' +
      'klientapplikationsutveckling, säkerhet och metadata.',
    examination:
      'Skriftlig salstentamen 3,0 hp (individuell) + uppgifter 4,0 hp (grupp). Betygsskala U–A.',
    tentaInfo:
      'Tentan HT26 knyter ihop fem områden: ER-modellering, transformation från konceptuell ' +
      'till fysisk datamodell, normalformer och normalisering, SQL samt applikationsutveckling ' +
      '(kod mot relationsdatabaser). Den ligger sist i delkursen. HT25-tentorna hade fyra ' +
      'uppgifter: ER-diagram med påståenden (25 p, +5 per rätt markerat, −3 per fel), DDL med ' +
      'surrogatnycklar (25 p), normalisering (20 p: fem sant/falskt à 2 p med −1 för fel, två ' +
      'normaliseringar à 5 p) och en enda SQL-fråga (30 p). Applikationsutveckling fanns inte ' +
      'med där, så hur den delen ser ut vet ingen än. Betyg: A 85 %, B 75, C 65, D 55, E 50. ' +
      'Hjälpmedel: utskrivna föreläsningsslides och kursboken i fysiskt format.'
  },
  {
    id: 'strategi',
    namn: 'Strategi och ekonomistyrning',
    avslutad: true,   /* tentan 21 sep är skriven; omtenta 6 nov */
    beskrivning:
      'Ekonomistyrningens utgångspunkter, företags mål, effektivitet, ' +
      'organisationsformer, Balanced Scorecard, strategiperspektiv och hållbarhet.',
    examination:
      'Skriftlig salstentamen 2,0 hp (individuell). Betygsskala U–A.',
    tentaInfo:
      'Tentaformat enligt HT24: 10 flervalsfrågor à 6 p (fel svar ger −1 p, obesvarad 0 p) ' +
      '+ 2 essäfrågor à 20 p = 100 p. Inga hjälpmedel.'
  },
  {
    id: 'processer',
    namn: 'Processorienterad verksamhetsutveckling',
    beskrivning:
      'Business Process Management (BPM): historia och drivkrafter, BPM-livscykeln, ' +
      'Jestons 7FE-ramverk för att driva BPM-initiativ, samt BPMN — notationen för att ' +
      'rita och läsa processdiagram.',
    examination:
      'Digital salstentamen 3,0 hp (individuell) + gruppuppgift i BPMN/DMN 3,0 hp. Betygsskala U–A.',
    tentaInfo:
      'Digital salstenta 13 november, inga hjälpmedel. 2–3 kortare essäfrågor à max 15 p ' +
      '(inte om BPMN, max 300 ord) och 10–15 flervalsfrågor. I BPM-delen ger rätt svar 5 p; ' +
      'i BPMN-delen anges poängen per fråga, och där finns diagram att köra. Fel svar ger ' +
      '−1 p, obesvarad 0 p. Betyg: A 85 %, B 75, C 65, D 55, E 50. Omtenta 7 januari.'
  }
];

window.SYSB23.amnen = [
  /* ---------------------------- DATABASER ---------------------------- */
  {
    id: 'db-intro',
    delkurs: 'databaser',
    namn: 'Introduktion till relationsdatabaser',
    kapitel: 'Föreläsning 1',
    kalla: '01-introduction.pdf',
    beskrivning:
      'Vad en databas är, RDBMS, server/klient, virtuella maskiner och molnplattformar, ' +
      'persistent datalagring samt databasdesignprocessens tre nivåer.'
  },
  {
    id: 'db-sql-grund',
    delkurs: 'databaser',
    namn: 'SQL – grunder',
    kapitel: 'Föreläsning 2–3',
    kalla: '02-03-sql.pdf',
    beskrivning:
      'DDL/DML/DQL/DCL, SELECT, FROM, WHERE, AS, relationsoperatorer, logiska operatorer, ' +
      'LIKE, NULL-hantering, DISTINCT, ORDER BY, UPDATE och DELETE.'
  },
  {
    id: 'db-sql-aggregat',
    delkurs: 'databaser',
    namn: 'SQL – aggregatfunktioner och gruppering',
    kapitel: 'Föreläsning 2–3',
    kalla: '02-03-sql.pdf',
    beskrivning:
      'COUNT, SUM, AVG, MIN, MAX, GROUP BY, HAVING, WHERE kontra HAVING samt ' +
      'SQL:s logiska exekveringsordning.'
  },
  {
    id: 'db-sql-join',
    delkurs: 'databaser',
    namn: 'SQL – joins',
    kapitel: 'Föreläsning 2–3',
    kalla: '02-03-sql.pdf',
    beskrivning:
      'Kartesisk produkt, INNER JOIN, LEFT/RIGHT/FULL OUTER JOIN, tetajoin, ' +
      'självjoin (self join) och trevägsjoin.'
  },
  {
    id: 'db-sql-subquery',
    delkurs: 'databaser',
    namn: 'SQL – subqueries och mängdoperationer',
    kapitel: 'Föreläsning 2–3',
    kalla: '02-03-sql.pdf',
    beskrivning:
      'Subqueries, korrelerade subqueries, IN, EXISTS/NOT EXISTS, division ' +
      '("alla"-frågor), UNION, UNION ALL, INTERSECT, EXCEPT samt vyer.'
  },
  {
    id: 'db-konceptuell',
    delkurs: 'databaser',
    namn: 'Konceptuell databasdesign (ER-modellering)',
    kapitel: 'Föreläsning 4',
    kalla: '04-conceptual-database-design.pdf',
    beskrivning:
      'Chen- och Crow’s foot-notation, entitetstyper, attributtyper (enkla, ' +
      'sammansatta, multivärda, härledda), identifierare, binära/unära samband, ' +
      'kardinalitet och deltagande (även min–max), svag entitet och associativ entitet.'
  },
  {
    id: 'db-logisk',
    delkurs: 'databaser',
    namn: 'Logisk databasdesign (transformation)',
    kapitel: 'Föreläsning 5',
    kalla: '05-logical-database-design.pdf',
    beskrivning:
      'Relationsmodellen, relationsegenskaper, kandidatnyckel (unik och minimal), ' +
      'primärnyckel, främmande nyckel samt transformationsreglerna från ER-modell till relationsschema.'
  },
  {
    id: 'db-normalisering',
    delkurs: 'databaser',
    namn: 'Normalformer och normalisering',
    kapitel: 'Föreläsning 6',
    kalla: '06-normalization-and-normal-forms-new.pdf',
    beskrivning:
      'Anomalier, funktionella beroenden, attributslutning, supernyckel och kandidatnyckel, ' +
      'primära/icke-primära attribut, 1NF–3NF, partiella och transitiva beroenden, ' +
      'dekomposition, lossless join och dependency preservation.'
  },
  {
    id: 'db-fysisk',
    delkurs: 'databaser',
    namn: 'Fysisk databasdesign (DDL)',
    kapitel: 'Föreläsning 7',
    kalla: '07-physical-database-design.pdf',
    beskrivning:
      'CREATE/ALTER/DROP TABLE, constraints (PK, FK, UNIQUE, NOT NULL, CHECK, DEFAULT, ' +
      'ON DELETE CASCADE), datatyper i SQL Server, surrogatnycklar kontra naturliga ' +
      'nycklar, IDENTITY och namnkonventioner.'
  },
  {
    id: 'db-klient',
    delkurs: 'databaser',
    namn: 'Databasklientutveckling (JDBC)',
    kapitel: 'Föreläsning 8–9',
    kalla: '08-09-db-client-application-development.pdf',
    beskrivning:
      'JDBC, connection URL, PreparedStatement, ResultSet, try-with-resources, ' +
      'trelagersarkitektur, MVC, DAO-mönstret och felhantering (SQLException).'
  },
  {
    id: 'db-sakerhet',
    delkurs: 'databaser',
    namn: 'Databas- och klientapplikationssäkerhet',
    kapitel: 'Föreläsning 10',
    kalla: '10-db-client-application-security.pdf',
    beskrivning:
      'SQL-injektion och motmedel, hantering av anslutningsuppgifter ' +
      '(miljövariabler och properties-filer), versionshantering av hemligheter ' +
      'samt attacker mot beroenden (supply chain).'
  },
  {
    id: 'db-metadata',
    delkurs: 'databaser',
    namn: 'Metadata i relationsdatabaser',
    kapitel: 'Föreläsning 11',
    kalla: '11-metadata-in-relational-dbs.pdf',
    beskrivning:
      'Systemdatabaserna master, model, msdb och tempdb, sys-vyer på instansnivå, ' +
      'INFORMATION_SCHEMA på databasnivå samt ResultSetMetaData i JDBC.'
  },

  /* ------------------- STRATEGI OCH EKONOMISTYRNING ------------------- */
  {
    id: 'str-ekonomistyrning',
    delkurs: 'strategi',
    namn: 'Ekonomistyrningens utgångspunkter och styrmedel',
    kapitel: 'Ekonomistyrning kap. 1 & 3',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Definition av ekonomistyrning, ekonomistyrningens uppgifter, de tre slagen ' +
      'av styrmedel (formella, organisationsstruktur, mindre formaliserade) samt ' +
      'strategisk ekonomistyrning.'
  },
  {
    id: 'str-vision',
    delkurs: 'strategi',
    namn: 'Vision, affärsidé, strategi och verksamhetsplaner',
    kapitel: 'Ekonomistyrning kap. 1',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Visionens tre funktioner, affärsidéns innehåll och uppgifter, strategins ' +
      'innehåll, strateginivåer samt nedbrytning till verksamhetsplaner och delmål.'
  },
  {
    id: 'str-mal',
    delkurs: 'strategi',
    namn: 'Företags mål – teorier och modeller',
    kapitel: 'Ekonomistyrning kap. 1',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Vinstmaximeringsmodellen (neoklassisk teori), företagsledarmodeller (Baumol, ' +
      'Williamson), satisfieringsmodellen (Simon), intressentmodellen, ' +
      'kassaflödesbaserade modeller och symboliska mål.'
  },
  {
    id: 'str-effektivitet',
    delkurs: 'strategi',
    namn: 'Effektivitet, produktivitet och lönsamhet',
    kapitel: 'Ekonomistyrning kap. 2',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Effektivitet som måluppfyllelse, inre och yttre effektivitet, produktivitet, ' +
      'begreppsparen inbetalning/utbetalning, inkomst/utgift och intäkt/kostnad samt ' +
      'resultat kontra lönsamhet och räntabilitet.'
  },
  {
    id: 'str-organisation',
    delkurs: 'strategi',
    namn: 'Organisationsformer och ansvarsfördelning',
    kapitel: 'Ekonomistyrning kap. 3',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Funktions-, divisions- och matrisorganisation, det vertikala perspektivet ' +
      '(hierarki) och det horisontella (värdekedja), de fyra slagen av ekonomiskt ' +
      'ansvar samt belöningssystem.'
  },
  {
    id: 'str-mjuk',
    delkurs: 'strategi',
    namn: 'Mindre formaliserad styrning',
    kapitel: 'Ekonomistyrning kap. 3',
    kalla: 'EkonomistyrningAJK_Kap13.pdf',
    beskrivning:
      'Företagskultur, lärande organisation (enkel- och dubbelkretslärande), ' +
      'medarbetarskap (empowerment) samt gapet mellan teori och praktik.'
  },
  {
    id: 'str-bsc',
    delkurs: 'strategi',
    namn: 'Balanced Scorecard',
    kapitel: 'Kaplan & Norton (1993)',
    kalla: 'Kaplan_Norton_1993.pdf',
    beskrivning:
      'De fyra perspektiven, styrkortet som lednings- snarare än mätsystem, ' +
      'process- kontra utfallsmått, fallen Rockwater, Apple, AMD och FMC samt ' +
      'byggprocessen i åtta steg.'
  },
  {
    id: 'str-ickefinansiella',
    delkurs: 'strategi',
    namn: 'Icke-finansiella prestationsmått',
    kapitel: 'Ittner & Larcker (2003)',
    kalla: 'Ittner_and_Larcker_2003.pdf',
    beskrivning:
      'De fyra vanliga misstagen, orsaksmodeller (value driver maps), validering ' +
      'av samband, målsättning, validitet och reliabilitet samt sexstegsmetoden ' +
      '"doing it right".'
  },
  {
    id: 'str-perspektiv',
    delkurs: 'strategi',
    namn: 'Strategiperspektiv och konkurrensfördelar',
    kapitel: 'Herrmann (2005), Barney (2024)',
    kalla: 'Herrmann_2005__Evolution_of_strategic_management.pdf',
    beskrivning:
      'Porters Five Forces och generiska strategier, Mintzbergs emergent strategy, ' +
      'resursbaserad teori (RBV), kunskaps- och lärandeperspektivet samt ' +
      'strategisk ledning som evolution av dominanta designer.'
  },
  {
    id: 'str-enterprise',
    delkurs: 'strategi',
    namn: 'Enterprise IT och vägen till strategisk alignment',
    kapitel: 'Föreläsning 1',
    kalla: '01_SYSB23_BWHT2026.pdf',
    beskrivning:
      'Den historiska linjen från tidiga räknemaskiner till dagens AI: ' +
      'produktivitetsparadoxen, IT-kaoset på 80- och 90-talet, ' +
      '90-talets managementmetoder, Clinger-Cohen Act och kumulativ komplexitet.'
  },
  {
    id: 'str-data',
    delkurs: 'strategi',
    namn: 'Datastrategi och AI-anpassad verksamhet',
    kapitel: 'Föreläsning 1',
    kalla: '01_SYSB23_BWHT2026.pdf',
    beskrivning:
      'AI-fabriken, data defense mot data offense, single source of truth ' +
      'mot multiple versions of the truth, samt hur reglering avgör hur ' +
      'offensiv en datastrategi kan vara.'
  },
  {
    id: 'str-it',
    delkurs: 'strategi',
    namn: 'IT, AI och strategisk alignment',
    kapitel: 'Barney & Reeves (2024)',
    kalla: 'Barney_2024_HBR.pdf',
    beskrivning:
      'Strategic Alignment Model, produktivitetsparadoxen samt varför generativ AI ' +
      'i sig sällan ger uthålliga konkurrensfördelar men kan förstärka befintliga.'
  },
  {
    id: 'str-hallbarhet',
    delkurs: 'strategi',
    namn: 'Hållbarhet, Triple Bottom Line och ESG',
    kapitel: 'Rogers & Hudson (2011)',
    kalla: 'Rogers_Hudson_2011.pdf',
    beskrivning:
      'Triple Bottom Line (people, planet, profit), Brundtlandrapportens definition ' +
      'av hållbar utveckling, ESG, CSR-debatten, Porter & van der Linde samt ' +
      'push- och pull-mekanismer.'
  },

  /* ------------------- PROCESSORIENTERAD VERKSAMHETSUTVECKLING ------------------- */
  {
    id: 'proc-intro',
    delkurs: 'processer',
    namn: 'BPM: definition, historia och drivkrafter',
    kapitel: 'Kapitel 1 · F1',
    kalla: '01_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Vad BPM är enligt Jeston, BPM och Enterprise Architecture, produktivitetsparadoxen, BPR, Petri-nät, SOX och utvecklingen mot RPA och agentisk AI.'
  },
  {
    id: 'proc-livscykel',
    delkurs: 'processer',
    namn: 'BPM-livscykeln och normativ litteratur',
    kapitel: 'Kapitel 2 · F1',
    kalla: '01_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'BPM-livscykeln, as-is och to-be, normativ litteratur mot forskningslitteratur, och Jestons avmystifiering av BPM.'
  },
  {
    id: 'proc-start',
    delkurs: 'processer',
    namn: 'Att starta BPM: vem, när och hur',
    kapitel: 'Kapitel 3 · F2',
    kalla: '02_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Projekttyper, de sex framgångsfaktorerna, drivers och triggers, top-down och bottom-up, tre sätt att initiera BPM och fyra implementeringsscenarier.'
  },
  {
    id: 'proc-teknik',
    delkurs: 'processer',
    namn: 'Improve before automate: teknik och perspektiv',
    kapitel: 'Kapitel 4 · F2, F4a',
    kalla: '02_SYSB23_BPM_HT26.pdf; 04a_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Förbättra före automatisering, spreadsheet-testet, BPMS och BOAT, processoptimeringslösningar och RPA, samt customer- och employee-centric BPM.'
  },
  {
    id: 'proc-7fe',
    delkurs: 'processer',
    namn: '7FE-ramverket och BPM-huset',
    kapitel: 'Kapitel 5 · F2',
    kalla: '02_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Husmetaforen, 7FE:s tio faser i fyra F och tre essentials, framgångspallen, styrkor och svagheter, och BPM-mognad.'
  },
  {
    id: 'proc-foundations',
    delkurs: 'processer',
    namn: 'Foundations och Enablement',
    kapitel: 'Kapitel 6 · F3',
    kalla: '03_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Strategy execution void, Red Wine Test, Target Operating Model, processnivåer, processtyrning, processarkitektur och process asset.'
  },
  {
    id: 'proc-understand',
    delkurs: 'processer',
    namn: 'Launch och Understand',
    kapitel: 'Kapitel 7 · F3, F4a',
    kalla: '03_SYSB23_BPM_HT26.pdf; 04a_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Launch-fasens steg, processmål och Process Selection Matrix, Understand-workshops, FMEA, Process Worth Matrix och quick wins.'
  },
  {
    id: 'proc-innovate',
    delkurs: 'processer',
    namn: 'Innovate, People, Develop och Implement',
    kapitel: 'Kapitel 8 · F4a',
    kalla: '04a_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Innovate-workshops och to-be, People-fasens rolldesign, Develop och Implement med UAT, piloter och handover.'
  },
  {
    id: 'proc-realize',
    delkurs: 'processer',
    namn: 'Realize, Sustainability och de tre essentials',
    kapitel: 'Kapitel 9 · F4a',
    kalla: '04a_SYSB23_BPM_HT26.pdf',
    beskrivning:
      'Nyttorealisering och benefits register, Sustainability som uthållig konkurrensfördel, projektledning, förändringsledning (60 %) och ledarskap.'
  },
  {
    id: 'proc-perspektiv',
    delkurs: 'processer',
    namn: 'Andra perspektiv: Green BPM, process mining och AI',
    kapitel: 'Kapitel 10 · F4b',
    kalla: '04b_SYSB23_BPM_HT26.pdf; Houy (2012); Rosemann (2024); Reijers (2021)',
    beskrivning:
      'Green BPM och varför det inte slog igenom, process mining, Rosemanns tre drifts, agentisk AI och Large Process Models.'
  },
  {
    id: 'bpmn-grund',
    delkurs: 'processer',
    namn: 'BPMN-grunder: pooler, roller och aktiviteter',
    kapitel: 'Kapitel 11 · BPMN Walkthrough',
    kalla: 'BPMN Walkthrough (Silver 2017)',
    beskrivning:
      'Vad BPMN är till för, instansbegreppet, namnkonventioner, pooler och lanes, ' +
      'black-box-pooler, samt skillnaden mellan user task, service task och script task.'
  },
  {
    id: 'bpmn-gateways',
    delkurs: 'processer',
    namn: 'Gateways: förgrening och sammanslagning',
    kapitel: 'Kapitel 12 · BPMN Walkthrough',
    kalla: 'BPMN Walkthrough (Silver 2017)',
    beskrivning:
      'Exclusive (XOR), parallel (AND), inclusive (OR) och event-based gateway, ' +
      'split kontra join, samt varför OR-join används för att undvika deadlock.'
  },
  {
    id: 'bpmn-events',
    delkurs: 'processer',
    namn: 'Events: starta, vänta och reagera',
    kapitel: 'Kapitel 13 · BPMN Walkthrough',
    kalla: 'BPMN Walkthrough (Silver 2017)',
    beskrivning:
      'Start-, intermediate- och end-event, kastande kontra fångande händelser, ' +
      'boundary events (interrupting/non-interrupting), event-baserad gateway och ' +
      'event-subprocesser.'
  },
  {
    id: 'bpmn-avancerat',
    delkurs: 'processer',
    namn: 'Subprocesser, återanvändning och dataflöden',
    kapitel: 'Kapitel 14 · BPMN Walkthrough',
    kalla: 'BPMN Walkthrough (Silver 2017)',
    beskrivning:
      'Vanlig subprocess kontra event-subprocess, call activities för återanvändning, ' +
      'meddelandeflöden mot sekvensflöden, samt data stores och associationer.'
  },
  {
    id: 'bpmn-dmn',
    delkurs: 'processer',
    namn: 'Beslutsregler: business rule task och DMN',
    kapitel: 'Kapitel 14 · BPMN Walkthrough',
    kalla: 'DMN/DRD',
    beskrivning:
      'Hur en business rule task i BPMN länkar till en DMN-beslutstabell (DRD), och ' +
      'varför BPMN och DMN tillsammans stödjer förklarbarhet i automatiserat beslutsfattande.'
  }
];

/* Snabb uppslagning: amne-id -> ämnesobjekt */
window.SYSB23.amneMap = window.SYSB23.amnen.reduce(function (acc, a) {
  acc[a.id] = a;
  return acc;
}, {});
