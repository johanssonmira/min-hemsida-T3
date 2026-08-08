/* =========================================================================
   Frågebank – Databaser: introduktion + SQL
   Ämnen: db-intro, db-sql-grund, db-sql-aggregat
   -------------------------------------------------------------------------
   Se README.md för fältbeskrivning. Lägg gärna till egna frågor här.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ============================ db-intro ============================ */
{
  id: 'db-intro-01',
  delkurs: 'databaser',
  amne: 'db-intro',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vad är ett RDBMS?',
  alternativ: [
    'Ett program för att rita ER-diagram',
    'Ett system som hanterar lagring, hämtning och skydd av data organiserad i relationer (tabeller)',
    'En virtuell maskin som hostar ett operativsystem',
    'Ett filformat för att spara kalkylblad'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Modelleringsverktyg som Visual Paradigm ritar ER-diagram, men de lagrar inte verksamhetens data. RDBMS:et är den körande programvaran (t.ex. SQL Server) som faktiskt hanterar data.',
    'Rätt. Ett Relational Database Management System är programvaran som lagrar, skyddar och hämtar data strukturerad enligt relationsmodellen. SQL Server, PostgreSQL och SQLite är exempel.',
    'Fel. Det beskriver en virtuell maskin (t.ex. i Microsoft Azure). VM:en är bara den dator som RDBMS:et *körs på* – det är två olika saker.',
    'Fel. Kalkylblad är en av flera tekniker för persistent datalagring, men saknar relationsmodellens integritetsregler, frågespråk och fleranvändarhantering.'
  ],
  forklaring: 'RDBMS = programvaran som implementerar relationsmodellen och står för lagring, skydd och hämtning av data. Skilj det från (a) servern/VM:en det körs på och (b) modelleringsverktygen som används vid design.',
  kalla: '01introduction.pdf'
},
{
  id: 'db-intro-02',
  delkurs: 'databaser',
  amne: 'db-intro',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'I vilken ordning genomförs databasdesignprocessen enligt kursmaterialet?',
  alternativ: [
    'Fysisk design → logisk design → konceptuell design',
    'Konceptuell design (ER) → logisk design (relationer + normalisering) → fysisk design (DDL)',
    'Normalisering → ER-modellering → DDL',
    'DDL → ER-modellering → normalisering'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Detta är processen baklänges. Man kan inte skriva CREATE TABLE innan man vet vilka entiteter och samband verksamheten behöver.',
    'Rätt. Verksamhetskrav → konceptuell datamodell (ER-diagram) → logisk datamodell (relationer i textform, normaliserade vid behov) → fysisk datamodell (SQL DDL).',
    'Fel. Normalisering sker på den logiska datamodellen, alltså *efter* att ER-modellen transformerats till relationer – inte före ER-modelleringen.',
    'Fel. DDL-koden är slutprodukten i processen, inte startpunkten.'
  ],
  forklaring: 'De tre abstraktionsnivåerna hänger ihop: ER-diagram (konceptuell) → relationsschema R(attribut, …) (logisk) → CREATE TABLE-satser (fysisk). Normalisering görs på den logiska nivån om transformationen gett relationer som inte uppfyller 3NF.',
  kalla: '01introduction.pdf, 04conceptualdatabasedesign.pdf'
},
{
  id: 'db-intro-03',
  delkurs: 'databaser',
  amne: 'db-intro',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför beskrivs SQL som ett *deklarativt* språk?',
  alternativ: [
    'För att det bara kan användas för att deklarera tabeller, inte för att hämta data',
    'För att användaren anger *vad* för data som önskas, inte *hur* den ska hämtas',
    'För att alla satser måste avslutas med semikolon',
    'För att nyckelord måste skrivas med versaler'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. SQL innehåller både DDL (deklarera strukturer) och DML/DQL (manipulera och hämta data). "Deklarativt" syftar inte på DDL-delen.',
    'Rätt. Du skriver SELECT … FROM … WHERE … och beskriver önskat resultat. Frågeoptimeraren i RDBMS:et bestämmer själv exekveringsplanen – vilka index som används, i vilken ordning tabeller läses osv.',
    'Fel. Semikolon är ren syntax och har inget med paradigmet att göra.',
    'Fel. Versaler för nyckelord är en kodstandard (läsbarhet), inte en egenskap hos språkparadigmet.',
  ],
  forklaring: 'Deklarativt ⇔ du beskriver målet, inte vägen. Det är motsatsen till imperativt (t.ex. Java), där du steg för steg talar om hur något ska göras. Praktisk konsekvens: användaren behöver inte känna till databasens interna komplexitet.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-intro-04',
  delkurs: 'databaser',
  amne: 'db-intro',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande är INTE en av SQL:s delmängder som används i delkursen Databaser?',
  alternativ: [
    'DDL – Data Definition Language',
    'DML – Data Manipulation Language',
    'DCL – Data Control Language',
    'TCL – Transaction Control Language'
  ],
  ratt: 3,
  forklaringar: [
    'Fel svar på frågan – DDL används. CREATE, ALTER, DROP och TRUNCATE tas upp i föreläsningen om fysisk databasdesign.',
    'Fel svar på frågan – DML används. INSERT, UPDATE, DELETE (och SELECT via DQL) genomsyrar hela SQL-materialet.',
    'Fel svar på frågan – DCL används. GRANT/behörighetshantering är en del av SQL-uppgiftens Task 2 om läsrättigheter för en annan grupp.',
    'Rätt. Kursmaterialet listar TCL (transaktionshantering) som en delmängd av SQL men anger uttryckligen att delkursen använder DDL, DML, DQL och DCL – transaktioner ligger utanför kursens omfång.'
  ],
  forklaring: 'SQL delas in i DDL, DML, DQL, DCL och TCL. Delkursen använder de fyra första; transaktionsstyrning (TCL) nämns men är utanför scope – vilket också sägs explicit i avsnittet om att droppa/återskapa FK-constraints.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-intro-05',
  delkurs: 'databaser',
  amne: 'db-intro',
  typ: 'oppen',
  svarighet: 2,
  fraga: 'Förklara skillnaden mellan en databas, ett RDBMS, en databasserver och en virtuell maskin. Använd gärna ett exempel från kursens labbmiljö.',
  modellsvar:
    'En **databas** är en strukturerad samling data som lagras och nås elektroniskt, t.ex. databasen Hospital med tabellerna Unit, Employee, Patient, Illness och Car.\n\n' +
    'Ett **RDBMS** (t.ex. Microsoft SQL Server) är programvaran som hostar databasen: den tar emot SQL-frågor, kör dem via query processor och storage engine, upprätthåller constraints och hanterar behörigheter. Ett och samma RDBMS kan hosta flera databaser samtidigt.\n\n' +
    'En **databasserver** är den dator som RDBMS:et körs på – "en dator som aldrig stängs av". Fysiskt kan det vara ett server blade i ett rack i ett datacenter, med helt annan profil än en laptop (t.ex. flera TB RAM, upp till 32 CPU-socklar, ingen skärm eller tangentbord).\n\n' +
    'En **virtuell maskin** är en logisk dator som delar en fysisk dators resurser. Med molnplattformar som Microsoft Azure skapas en VM med ett klick och hyrs per timme. I kursens labbmiljö skapar man en Windows Server-VM i Azure, installerar SQL Server på den och får därmed en databasserver i molnet, som man ansluter till från sin egen laptop via VS Code med mssql-tillägget.\n\n' +
    'Kedjan blir alltså: laptop (klient) → nätverk → virtuell maskin (server) → SQL Server (RDBMS) → databasen Hospital (data).',
  nyckelpunkter: [
    'Databas = den strukturerade datasamlingen',
    'RDBMS = programvaran som hanterar databaser (SQL Server)',
    'Server = datorn som RDBMS:et körs på ("aldrig avstängd")',
    'VM = logisk dator som delar fysiska resurser; skapas på begäran i molnet',
    'Ett RDBMS kan hosta flera databaser; klienten kommunicerar över nätverk'
  ],
  kalla: '01introduction.pdf'
},

/* ========================= db-sql-grund ========================= */
{
  id: 'db-sqlg-01',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vad gör nyckelordet AS i en SELECT-sats?',
  alternativ: [
    'Byter permanent namn på kolumnen i tabellen',
    'Byter namn på kolumnen enbart i resultatmängden',
    'Skapar en ny kolumn i tabellen',
    'Sorterar resultatet efter den angivna kolumnen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ett permanent namnbyte kräver DDL (ALTER TABLE / sp_rename). AS påverkar aldrig schemat.',
    'Rätt. AS ger ett alias som bara syns i resultatmängden. Underliggande kolumnnamn i databasen är oförändrat. AS tillhör DML, inte DDL.',
    'Fel. Nya kolumner skapas med ALTER TABLE … ADD. AS namnger bara det som redan hämtas (eller resultatet av ett uttryck).',
    'Fel. Sortering görs med ORDER BY. Notera dock att ORDER BY kan referera till aliaset som AS har satt.'
  ],
  forklaring: 'AS = temporärt alias i resultatmängden. Två användningar: (1) läsbarare kolumnnamn, (2) namnge resultatet av ett uttryck – utan alias visas uttryckskolumner som "(No column name)".',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-02',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför returnerar frågan nedan noll rader trots att Chloe saknar adress?',
  kod: "SELECT StudentNo, StudentName\nFROM Student\nWHERE StudentAddress = NULL;",
  alternativ: [
    'Därför att NULL måste skrivas med gemener',
    'Därför att jämförelse med NULL aldrig evalueras till sant – man måste använda IS NULL',
    'Därför att WHERE-satsen saknar semikolon',
    'Därför att StudentAddress är en VARCHAR och inte kan jämföras'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. SQL är inte skiftlägeskänsligt för nyckelord, och NULL/null beter sig identiskt.',
    'Rätt. NULL betyder "okänt värde". Ett uttryck som "okänt = NULL" blir varken sant eller falskt, utan okänt, och WHERE släpper bara igenom rader där predikatet är sant. Korrekt syntax är WHERE StudentAddress IS NULL.',
    'Fel. Semikolonet påverkar inte resultatet här; satsen körs ändå.',
    'Fel. VARCHAR-kolumner kan mycket väl jämföras med =. Problemet är enbart NULL-semantiken.'
  ],
  forklaring: 'NULL är avsaknad av värde, inte ett värde. Använd IS NULL / IS NOT NULL. Detta är också anledningen till att COUNT(kolumn) hoppar över NULL medan COUNT(*) räknar alla rader.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-03',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket villkor matchar kursnamn som består av exakt fyra tecken och slutar på "ath"?',
  alternativ: [
    "CourseName LIKE '%ath'",
    "CourseName LIKE '_ath'",
    "CourseName LIKE 'ath_'",
    "CourseName LIKE '____ath'"
  ],
  ratt: 1,
  forklaringar: [
    "Fel. % matchar noll eller flera tecken, så '%ath' matchar både 'Math', 'ath' och 'Aftermath'. Längden låses inte till fyra tecken.",
    "Rätt. _ matchar exakt ett tecken. '_ath' ger alltså precis fyra tecken där de tre sista är 'ath' – t.ex. 'Math'.",
    "Fel. Detta matchar strängar som *börjar* med 'ath' följt av ett tecken, t.ex. 'athX'.",
    "Fel. Fyra understreck plus 'ath' ger sju tecken totalt, t.ex. 'Photoath'."
  ],
  forklaring: 'Wildcards i LIKE: % = noll eller flera tecken, _ = exakt ett tecken. Kombinera dem för att låsa både mönster och längd.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-04',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan BETWEEN 5 AND 10 och > 5 AND < 10?',
  alternativ: [
    'Ingen skillnad, de är helt likvärdiga',
    'BETWEEN är inklusivt och tar med både 5 och 10, medan > / < utesluter gränsvärdena',
    'BETWEEN fungerar bara på datum',
    'BETWEEN kräver att kolumnen är indexerad'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Skillnaden gäller just gränsvärdena, vilket ofta ger olika antal rader.',
    'Rätt. BETWEEN 5 AND 10 motsvarar >= 5 AND <= 10. Med Course-tabellen i materialet ger BETWEEN 5 AND 10 träff på Math (7), Science (10) och Databases (5), medan > 5 AND < 10 bara ger Math.',
    'Fel. BETWEEN fungerar på alla ordnade domäner: tal, datum och även strängar (lexikografiskt).',
    'Fel. Index påverkar prestanda, inte semantik. BETWEEN fungerar oavsett indexering.'
  ],
  forklaring: 'BETWEEN är alltid inklusivt i båda ändar. Ett klassiskt fel på tentan är att glömma gränsvärdena när man översätter mellan formerna.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-05',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad gör DISTINCT när flera kolumner anges i SELECT-satsen?',
  alternativ: [
    'Tar bort dubbletter enbart baserat på den första kolumnen',
    'Tar bort rader där kombinationen av samtliga listade kolumner är identisk',
    'Tar bort alla rader som innehåller NULL',
    'Tillämpas separat på varje kolumn för sig'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. DISTINCT gäller aldrig bara en kolumn när flera är listade – det vore inte heller väldefinierat, eftersom övriga kolumner då kunde ha olika värden.',
    'Rätt. DISTINCT utvärderar alla kolumner i SELECT tillsammans. I materialets exempel ger DISTINCT StudentName, StudentPhoneNo tre rader trots att namnet "Max" förekommer två gånger – telefonnumren skiljer sig.',
    'Fel. DISTINCT filtrerar inte bort NULL. Två rader med NULL i samma kolumn betraktas tvärtom som dubbletter av DISTINCT.',
    'Fel. Det skulle ge kolumner med olika radantal, vilket inte är en giltig relation.'
  ],
  forklaring: 'DISTINCT verkar på hela raden i resultatmängden, dvs. på kombinationen av alla kolumner i SELECT-listan.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-06',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad returnerar frågan nedan, givet Student-tabellen med namnen Max, Chloe och Rachel?',
  kod: "SELECT StudentNo, StudentName\nFROM Student\nWHERE StudentName > 'Mary Sue';",
  alternativ: [
    'Inga rader, eftersom ingen heter Mary Sue',
    'Max och Rachel',
    'Endast Rachel',
    'Alla tre raderna'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. > på strängar kräver inte att värdet finns i tabellen – det är en lexikografisk jämförelse mot konstanten.',
    'Rätt. Jämförelsen sker tecken för tecken från vänster. "Max" > "Mary Sue" eftersom x kommer efter r i tredje positionen. "Rachel" > "Mary Sue" eftersom R kommer efter M. "Chloe" < "Mary Sue" eftersom C kommer före M.',
    'Fel. Det missar Max. Jämförelsen "Max" vs "Mary Sue" avgörs först i tredje tecknet (x vs r), där x är större.',
    'Fel. Chloe faller bort eftersom C kommer före M i alfabetet.'
  ],
  forklaring: 'För VARCHAR jämför > lexikografiskt (ordboksordning) baserat på teckenkoder, tecken för tecken från vänster tills en skillnad hittas.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-07',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken sats tar bort alla rader ur tabellen Course men behåller själva tabellen?',
  alternativ: [
    'DROP TABLE Course;',
    'DELETE FROM Course;',
    'TRUNCATE COLUMN Course;',
    'ALTER TABLE Course DROP COLUMN;'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. DROP TABLE tar bort hela tabellen inklusive dess definition ur databasen – ingen struktur blir kvar.',
    'Rätt. DELETE utan WHERE tar bort alla rader men lämnar tabellstrukturen intakt. (I SQL Server fungerar även den kortare formen DELETE Course.)',
    'Fel. TRUNCATE tillämpas på TABLE, inte COLUMN. Syntaxen är felaktig.',
    'Fel. Detta är ofullständig DDL för att ta bort en kolumn, inte rader.'
  ],
  forklaring: 'DELETE är DML och tar bort rader; DROP är DDL och tar bort objektet. Praktisk minnesregel: DELETE tömmer lådan, DROP slänger lådan.',
  kalla: '02-03-sql.pdf, 07-physical-database-design.pdf'
},
{
  id: 'db-sqlg-08',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad händer om du använder ORDER BY med ett kolumnalias som satts med AS?',
  alternativ: [
    'Det ger ett syntaxfel – ORDER BY måste använda originalkolumnnamnet',
    'Det fungerar; ORDER BY kan referera både till aliaset och till originalnamnet',
    'Det fungerar bara om aliaset skrivs inom hakparenteser',
    'Sorteringen ignoreras tyst'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. ORDER BY utvärderas logiskt sist av alla klausuler, efter SELECT, och ser därför aliasen.',
    'Rätt. Kursmaterialet visar båda varianterna sida vid sida: ORDER BY CourseCode ASC (aliaset) respektive ORDER BY CourseID ASC (originalnamnet) ger samma resultat.',
    'Fel. Hakparenteser behövs bara om aliaset innehåller mellanslag eller reserverade ord.',
    'Fel. SQL Server ignorerar aldrig en giltig ORDER BY tyst.'
  ],
  forklaring: 'Logisk exekveringsordning: FROM → WHERE → GROUP BY → aggregat → HAVING → SELECT → ORDER BY. Eftersom ORDER BY kommer efter SELECT är aliasen redan definierade – det är också därför WHERE *inte* kan använda alias.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlg-09',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Hospital-databasen: skriv en SQL-fråga som hämtar namnen på alla patienter som bor i Malmö. Använd tabellen Patient (PatientID, PatientNo, PatientName, PatientAddress, PatientPhoneNumber, UnitID).',
  modellsvar:
    "SELECT\n    PatientName AS Name\nFROM\n    Patient\nWHERE\n    PatientAddress = 'Malmö';",
  steg: [
    'Identifiera vilken tabell som innehåller efterfrågad data: adressen finns i Patient.PatientAddress.',
    'Bestäm SELECT-listan. Frågan efterfrågar bara namn, så välj PatientName – inte SELECT *.',
    'Lägg till filtret i WHERE. Strängkonstanter omges av enkelfnuttar: PatientAddress = \'Malmö\'.',
    'Ge kolumnen ett läsbart alias med AS enligt kursens kodstandard.',
    'Formatera med en klausul per rad och versaler på nyckelord (SQL-standarden i codingstandards.pdf).'
  ],
  forklaring: 'Notera att den medföljande testdatan i hospital-ddl.sql inte innehåller någon patient i Malmö (adresserna är Lund, Dalby, London och Berlin) – frågan är ändå korrekt och returnerar då en tom resultatmängd. En korrekt fråga behöver inte returnera rader.',
  kalla: 'databasessqlassignment.pdf fråga 3, hospital-ddl.sql'
},
{
  id: 'db-sqlg-10',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Hospital-databasen: hämta all information om patienter som heter Ann, Anne eller Anna. Ge minst två olika lösningar.',
  modellsvar:
    "-- Lösning 1: IN\nSELECT *\nFROM\n    Patient\nWHERE\n    PatientName IN ('Ann', 'Anne', 'Anna');\n\n" +
    "-- Lösning 2: OR\nSELECT *\nFROM\n    Patient\nWHERE\n    PatientName = 'Ann'\n    OR PatientName = 'Anne'\n    OR PatientName = 'Anna';\n\n" +
    "-- Lösning 3: LIKE med wildcard\nSELECT *\nFROM\n    Patient\nWHERE\n    PatientName LIKE 'Ann%';",
  steg: [
    'Alla tre namnen börjar på "Ann" och skiljer sig bara i ändelsen – det öppnar för flera lösningar.',
    'IN-operatorn är den mest läsbara när man har en explicit, avgränsad lista av värden.',
    'OR ger exakt samma resultat men blir längre; det är den form IN är en förkortning av.',
    'LIKE \'Ann%\' är kortast men *inte* helt likvärdig: den träffar även t.ex. "Annika" och "Annabelle". Använd den bara om uppgiften tillåter prefixmatchning.',
    'Eftersom uppgiften säger "all information" är SELECT * motiverat här, trots att kursmaterialet annars avråder från det.'
  ],
  forklaring: 'Poängen med uppgiften är att se att flera SQL-konstruktioner kan besvara samma affärsfråga – men att de inte alltid är semantiskt identiska. IN och OR ger identiska resultat; LIKE-varianten är bredare.',
  kalla: 'databasessqlassignment.pdf fråga 4'
},
{
  id: 'db-sqlg-11',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Hospital-databasen: sänk priset på alla bilar med 5 %. Använd UPDATE.',
  modellsvar:
    "UPDATE Car\nSET\n    Price = Price * 0.95;",
  steg: [
    'UPDATE anger tabellen som ska ändras: Car.',
    'SET anger vilken kolumn som får ett nytt värde. Uttrycket får referera till kolumnens nuvarande värde.',
    'En sänkning med 5 % innebär att 95 % blir kvar: Price * 0.95. Alternativt Price - (Price * 0.05).',
    'Ingen WHERE-sats behövs eftersom *alla* bilar ska uppdateras – men var medveten om att UPDATE utan WHERE alltid påverkar hela tabellen.',
    'Kontrollera efteråt med SELECT * FROM Car; att värdena blivit som förväntat.'
  ],
  forklaring: 'Vanligt fel: att skriva SET Price = 0.95 (vilket sätter alla priser till 0,95) istället för SET Price = Price * 0.95. Uttrycket på höger sida om likhetstecknet utvärderas per rad med radens nuvarande värden.',
  kalla: 'databasessqlassignment.pdf fråga 14'
},
{
  id: 'db-sqlg-12',
  delkurs: 'databaser',
  amne: 'db-sql-grund',
  typ: 'oppen',
  svarighet: 2,
  fraga: 'Kursmaterialet visar en "felaktig" lösning där man först kör en fråga för att ta reda på E2:s lön och sedan en andra fråga med det värdet inskrivet. Varför underkänns den lösningen?',
  modellsvar:
    'Affärsfrågan är "Vem har samma lön som E2?" – inte "Vem tjänar 55000?". Tvåstegslösningen besvarar den andra frågan, inte den första.\n\n' +
    'Problemen är:\n\n' +
    '1. **Man får inte anta att man känner till värdet.** Lönen är data i databasen och kan ändras när som helst. En hårdkodad 55000 blir fel så fort E2 får löneförhöjning.\n\n' +
    '2. **Affärsfrågan ska besvaras med en (1) fråga.** Kursmaterialet är uttryckligt på denna punkt. Två separata frågor kräver att en människa manuellt för över värdet däremellan, vilket inte går att bygga in i en applikation.\n\n' +
    '3. **Lösningen är inte generell.** Den fungerar bara för just den ögonblicksbild av datan som råkade gälla när frågan skrevs.\n\n' +
    'Korrekt lösning använder en subquery som hämtar lönen dynamiskt:\n\n' +
    "SELECT\n    EmpNo AS No,\n    EmpName AS Name,\n    EmpSalary AS Salary\nFROM\n    Employee\nWHERE\n    EmpSalary = (\n        SELECT EmpSalary\n        FROM Employee\n        WHERE EmpNo = 'E2'\n    )\n    AND EmpNo != 'E2';\n\n" +
    'Den avslutande raden AND EmpNo != \'E2\' behövs om E2 själv inte ska ingå i svaret – annars matchar E2 alltid sig själv.',
  nyckelpunkter: [
    'En affärsfråga ska besvaras med en enda SQL-fråga',
    'Man får inte anta att man känner till ett värde som ligger i databasen',
    'Hårdkodade värden gör lösningen ogeneraliserbar och skör för dataändringar',
    'Subquery hämtar värdet dynamiskt vid körning',
    'Uteslut vid behov raden man jämför med (EmpNo != \'E2\')'
  ],
  kalla: '01introduction.pdf'
},

/* ======================== db-sql-aggregat ======================== */
{
  id: 'db-sqla-01',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan COUNT(*) och COUNT(StudentAddress)?',
  alternativ: [
    'Ingen – båda räknar antalet rader',
    'COUNT(*) räknar alla rader; COUNT(StudentAddress) räknar bara rader där kolumnen inte är NULL',
    'COUNT(*) är snabbare men ger samma resultat',
    'COUNT(StudentAddress) räknar antalet unika adresser'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. De ger olika resultat så snart kolumnen innehåller NULL-värden.',
    'Rätt. I materialets exempel har Chloe NULL som adress: COUNT(*) ger 3 medan COUNT(StudentAddress) ger 2. Aggregatfunktioner hoppar över NULL.',
    'Fel. Prestandaskillnaden är inte poängen – resultaten skiljer sig semantiskt när NULL förekommer.',
    'Fel. Unika värden kräver COUNT(DISTINCT StudentAddress). Utan DISTINCT räknas dubbletter var för sig.'
  ],
  forklaring: 'Alla aggregatfunktioner (SUM, AVG, MIN, MAX, COUNT(kolumn)) ignorerar NULL. Endast COUNT(*) räknar rader oavsett innehåll. Detta påverkar t.ex. AVG, där NULL-rader inte drar ner medelvärdet.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqla-02',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken är den centrala skillnaden mellan WHERE och HAVING?',
  alternativ: [
    'WHERE används i SELECT, HAVING i UPDATE',
    'WHERE filtrerar rader före gruppering, HAVING filtrerar grupper efter aggregering',
    'HAVING är en föråldrad synonym för WHERE',
    'WHERE kan innehålla aggregatfunktioner, det kan inte HAVING'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Båda hör hemma i SELECT-satser. HAVING förekommer inte i UPDATE.',
    'Rätt. WHERE eliminerar enskilda rader innan GROUP BY körs; HAVING eliminerar hela grupper efter att aggregaten beräknats. Därför kan HAVING innehålla aggregatfunktioner men inte WHERE.',
    'Fel. De har olika betydelse och kan användas i samma fråga samtidigt.',
    'Fel. Det är precis tvärtom – aggregatfunktioner är tillåtna i HAVING, inte i WHERE.'
  ],
  forklaring: 'Minnesregel från kursmaterialet: i alfabetet kommer H efter G – HAVING körs efter GROUP BY. Logisk ordning: FROM → WHERE → GROUP BY → aggregat → HAVING → SELECT → ORDER BY.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqla-03',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Varför ger frågan nedan felmeddelandet "Column \'HasStudied.Grade\' is invalid in the select list…"?',
  kod: "SELECT\n    StudentID,\n    Grade\nFROM\n    HasStudied\nGROUP BY\n    StudentID;",
  alternativ: [
    'Därför att Grade är av typen INTEGER',
    'Därför att varje kolumn i SELECT måste finnas i GROUP BY eller vara inkapslad i en aggregatfunktion',
    'Därför att GROUP BY måste komma före FROM',
    'Därför att tabellen saknar primärnyckel'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Datatypen är irrelevant; felet uppstår oavsett om kolumnen är INTEGER eller VARCHAR.',
    'Rätt. När raderna grupperas per StudentID kan en grupp innehålla flera olika Grade-värden. Databasen kan inte veta vilket av dem den ska visa, så den vägrar. Antingen lägger man till Grade i GROUP BY, eller så aggregerar man den, t.ex. MAX(Grade).',
    'Fel. GROUP BY kommer alltid efter FROM (och efter WHERE) i syntaxen – frågan är korrekt ordnad.',
    'Fel. Primärnycklar har inget med regeln att göra.'
  ],
  forklaring: 'Grundregeln: allt i SELECT måste antingen vara grupperingsnyckel eller aggregerat. Notera att det omvända *inte* gäller – man får gruppera på kolumner som inte finns i SELECT.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqla-04',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Betrakta HasStudied med betygen (1,6) (1,7) (1,8) (1,6) (2,7) (2,9) (2,7) (3,6) angivna som (StudentID, Grade). Vad returnerar frågan?',
  kod: "SELECT\n    StudentID AS ID,\n    COUNT(*) AS Count,\n    MAX(Grade) AS Highest\nFROM\n    HasStudied\nGROUP BY\n    StudentID\nHAVING\n    MAX(Grade) > 6;",
  alternativ: [
    'ID 1 med Count 2, samt ID 2 med Count 3',
    'ID 1 med Count 4 och Highest 8, samt ID 2 med Count 3 och Highest 9',
    'Alla tre studenterna',
    'Endast ID 2'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Count 2 för ID 1 skulle uppstå om filtret vore WHERE Grade > 6, som tar bort rader *före* grupperingen. Här filtrerar HAVING på grupper, inte rader.',
    'Rätt. Grupperingen sker först och räknar alla rader per student: ID 1 får Count 4 (Highest 8), ID 2 får Count 3 (Highest 9), ID 3 får Count 1 (Highest 6). Därefter tar HAVING MAX(Grade) > 6 bort hela gruppen ID 3.',
    'Fel. ID 3 har enbart betyget 6, så MAX(Grade) = 6 vilket inte uppfyller > 6. Gruppen faller bort.',
    'Fel. Även ID 1 kvalificerar sig, eftersom dess högsta betyg är 8.'
  ],
  forklaring: 'Detta är kursmaterialets nyckelexempel på skillnaden mellan WHERE och HAVING. Med WHERE Grade > 6 hade ID 1 fått Count 2 (bara raderna med 7 och 8 räknats). Med HAVING räknas alla fyra raderna, och först därefter avgörs om gruppen ska vara kvar.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqla-05',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'AVG(Grade) returnerar 6 trots att det faktiska medelvärdet är 6,75. Varför?',
  alternativ: [
    'AVG avrundar alltid nedåt till närmaste heltal',
    'Grade är av typen INTEGER, och heltalsaritmetik ger ett heltalsresultat',
    'AVG ignorerar det högsta värdet',
    'Det är en bugg i SQL Server'
  ],
  ratt: 1,
  forklaringar: [
    'Fel som förklaring. AVG avrundar inte – den utför divisionen i kolumnens datatyp, vilket i heltalsfallet trunkerar decimaldelen.',
    'Rätt. När AVG appliceras på en INTEGER-kolumn sker beräkningen med heltalsaritmetik och decimaldelen försvinner. Vill man ha decimaler måste man casta, t.ex. AVG(CAST(Grade AS DECIMAL(4,2))).',
    'Fel. AVG använder samtliga icke-NULL-värden i gruppen.',
    'Fel. Beteendet är dokumenterat och konsekvent – resultattypen följer indatatypen.'
  ],
  forklaring: 'Resultattypen hos aggregatet ärvs från kolumnens datatyp. Klassisk fallgrop: heltalskolumner ger heltalsmedelvärden. Lös det genom explicit typkonvertering.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqla-06',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Hospital-databasen: beräkna den totala lönekostnaden för alla anställda, samt vad den skulle bli vid en löneökning på 10 %.',
  modellsvar:
    "-- Total lönekostnad\nSELECT\n    SUM(EmpSalary) AS TotalSalaryCost\nFROM\n    Employee;\n\n" +
    "-- Total lönekostnad efter 10 % höjning\nSELECT\n    SUM(EmpSalary * 1.1) AS TotalSalaryCostAfterRaise\nFROM\n    Employee;",
  steg: [
    'SUM är aggregatfunktionen för summering av en numerisk kolumn.',
    'Ingen GROUP BY behövs – hela tabellen utgör en enda grupp när aggregatet står ensamt i SELECT.',
    'För höjningen multipliceras varje lön med 1,1 (100 % + 10 %) innan summeringen.',
    'SUM(EmpSalary * 1.1) och SUM(EmpSalary) * 1.1 ger matematiskt samma svar här, eftersom multiplikation distribuerar över addition.',
    'Ge alltid resultatkolumnen ett alias – annars visas "(No column name)".'
  ],
  forklaring: 'Notera skillnaden mot uppgift 14 i SQL-uppgiften: här *beräknas* ett hypotetiskt värde med SELECT, tabellen ändras inte. Ska datan faktiskt ändras krävs UPDATE.',
  kalla: 'databasessqlassignment.pdf frågorna 9–10'
},
{
  id: 'db-sqla-07',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namnen på alla sjukdomar som fler än en patient just nu lider av. Använd Illness (IllnessID, IllnessName) och Suffers (IllnessID, PatientID, StartDate).',
  modellsvar:
    "SELECT\n    Illness.IllnessName AS Illness,\n    COUNT(*) AS NumberOfPatients\nFROM\n    Suffers\nINNER JOIN\n    Illness\n    ON Suffers.IllnessID = Illness.IllnessID\nGROUP BY\n    Illness.IllnessName\nHAVING\n    COUNT(*) > 1;",
  steg: [
    'Suffers innehåller kopplingen patient–sjukdom, men bara IllnessID. Sjukdomens namn finns i Illness, så en JOIN behövs.',
    'Joina på den gemensamma kolumnen IllnessID.',
    'Gruppera per sjukdom: GROUP BY Illness.IllnessName (eller på IllnessID, som är säkrare om två sjukdomar kunde ha samma namn – här hindras det av UQ_Illness_IllnessName).',
    'COUNT(*) räknar antalet patienter per sjukdom, eftersom varje rad i Suffers är en patient–sjukdom-koppling.',
    'Villkoret "fler än en patient" gäller ett aggregat och måste därför stå i HAVING, inte i WHERE.'
  ],
  forklaring: 'Med testdatan blir svaret Insomnia (3 patienter: PP1, PP2, PP3), Love sickness (2: PP1, PP2) och Cough (2: PP3, PP4). Amnesia och Incontinence har bara en patient var och filtreras bort av HAVING.',
  kalla: 'databasessqlassignment.pdf fråga 21'
},
{
  id: 'db-sqla-08',
  delkurs: 'databaser',
  amne: 'db-sql-aggregat',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namnen på alla anställda vars lön ligger över medellönen.',
  modellsvar:
    "SELECT\n    EmpName AS Name,\n    EmpSalary AS Salary\nFROM\n    Employee\nWHERE\n    EmpSalary > (\n        SELECT AVG(EmpSalary)\n        FROM Employee\n    );",
  steg: [
    'Medellönen är ett enda skalärt värde och beräknas med AVG(EmpSalary).',
    'Detta värde kan inte beräknas i samma WHERE-sats direkt – WHERE EmpSalary > AVG(EmpSalary) ger fel, eftersom aggregatfunktioner inte är tillåtna i WHERE.',
    'Lösningen är en subquery som returnerar ett skalärt värde, vilket får jämföras med >.',
    'Den inre frågan är oberoende av den yttre och beräknas därför en enda gång.',
    'Alternativ lösning: HAVING fungerar inte här eftersom vi vill filtrera enskilda rader, inte grupper.'
  ],
  forklaring: 'Klassiskt mönster: skalär subquery som jämförelsevärde. Med testdatan (25000, 55000, 37500, 18000, 279000, 32000) blir medellönen 74416,67 och endast Eva med 279000 hamnar över.',
  kalla: 'databasessqlassignment.pdf fråga 29'
}

);
