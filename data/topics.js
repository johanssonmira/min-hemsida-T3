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
      'Tentan täcker fyra områden: ER-modellering, transformation av konceptuell ' +
      'datamodell till fysisk datamodell, normalformer/normalisering samt SQL.'
  },
  {
    id: 'strategi',
    namn: 'Strategi och ekonomistyrning',
    beskrivning:
      'Ekonomistyrningens utgångspunkter, företags mål, effektivitet, ' +
      'organisationsformer, Balanced Scorecard, strategiperspektiv och hållbarhet.',
    examination:
      'Skriftlig salstentamen 2,0 hp (individuell). Betygsskala U–A.',
    tentaInfo:
      'Tentaformat enligt HT24: 10 flervalsfrågor à 6 p (fel svar ger −1 p, obesvarad 0 p) ' +
      '+ 2 essäfrågor à 20 p = 100 p. Inga hjälpmedel.'
  }
];

window.SYSB23.amnen = [
  /* ---------------------------- DATABASER ---------------------------- */
  {
    id: 'db-intro',
    delkurs: 'databaser',
    namn: 'Introduktion till relationsdatabaser',
    kapitel: 'Föreläsning 1',
    kalla: '01introduction.pdf',
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
    kalla: '04conceptualdatabasedesign.pdf',
    beskrivning:
      'Chen- och Crow’s foot-notation, entitetstyper, attributtyper (enkla, ' +
      'sammansatta, multivärda, härledda), binära/unära relationer, multiplicitet, ' +
      'obligatoriskt deltagande, svag entitet och svag relation.'
  },
  {
    id: 'db-logisk',
    delkurs: 'databaser',
    namn: 'Logisk databasdesign (transformation)',
    kapitel: 'Föreläsning 5',
    kalla: '05logicaldatabasedesign.pdf',
    beskrivning:
      'Relationsmodellen, relationsegenskaper, primärnyckel, kandidatnyckel, ' +
      'främmande nyckel samt transformationsreglerna från ER-modell till relationsschema.'
  },
  {
    id: 'db-normalisering',
    delkurs: 'databaser',
    namn: 'Normalformer och normalisering',
    kapitel: 'Föreläsning 6',
    kalla: '06normalformsnormalization.pdf',
    beskrivning:
      'Funktionella beroenden, kandidatnycklar, primära/icke-primära attribut, ' +
      '1NF–3NF, transitiva beroenden, dekomposition, lossless join och ' +
      'dependency preservation.'
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
    kalla: '10dbclientapplicationsecurity.pdf',
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
    kalla: '11metadatainrelationaldbs.pdf',
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
  }
];

/* Snabb uppslagning: amne-id -> ämnesobjekt */
window.SYSB23.amneMap = window.SYSB23.amnen.reduce(function (acc, a) {
  acc[a.id] = a;
  return acc;
}, {});
