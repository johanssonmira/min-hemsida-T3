/* =========================================================================
   Kompendium – Databaser, kapitel 1–5 (introduktion och SQL)
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.databaser = {
  delkurs: 'databaser',
  titel: 'Databaser',
  intro:
    'Delkursen har två halvor. Den första handlar om att **fråga, designa och driftsätta** ' +
    'relationsdatabaser — det är den som salstentan examinerar. Den andra handlar om att ' +
    '**bygga applikationer** som pratar med databasen, och examineras genom projektuppgiften.\n\n' +
    'Kompendiet följer föreläsningsordningen. Kapitel 1–5 ger SQL, kapitel 6–8 ger designkedjan ' +
    'från verksamhetskrav till normaliserat schema, kapitel 9 ger DDL och kapitel 10 ger ' +
    'applikationsdelen.\n\n' +
    '> **Tentan täcker fyra områden:** ER-modellering, transformation av konceptuell datamodell ' +
    'till fysisk, normalformer och normalisering, samt SQL. Kapitel 2–9 är alltså tentapensum. ' +
    'Kapitel 10 hör till projektuppgiften.\n\n' +
    'Det här ämnet lär man sig inte genom att läsa. Ha en fråga öppen i VS Code medan du läser, ' +
    'och kör exemplen mot Hospital-databasen.',
  kapitel: []
};

window.SYSB23.kompendium.databaser.kapitel.push(

/* ====================== KAPITEL 1 ====================== */
{
  id: 'db-k1',
  nr: 1,
  titel: 'Databaser, servrar och molnet',
  ingress: 'Vad en databas faktiskt är, hur den skiljer sig från servern den ligger på, och varför designprocessen har tre nivåer.',
  lastid: 7,
  amnen: ['db-intro'],
  avsnitt: [
    {
      rubrik: 'Affärsfrågan som startar allt',
      text:
        'Föreläsningen börjar med ett exempel värt att ta på allvar:\n\n' +
        '> "Jag vill ha namn och telefonnummer på alla kunder som lagt fler än två ordrar de senaste ' +
        'tre månaderna, där en av dem innehöll minst åtta produkter ur kategorin Lyx."\n\n' +
        'Hur lång tid skulle det ta en kontorist att svara på den frågan för hand? Och hur lång tid ' +
        'tar det med en databas? Skillnaden är hela poängen med ämnet.\n\n' +
        'Notera också att frågan innehåller fem separata kriterier: kundnamn, telefonnummer, fler än ' +
        'två ordrar, senaste tre månaderna, och minst åtta produkter ur en viss kategori i en av ' +
        'ordrarna. Att bryta ned en affärsfråga i sådana beståndsdelar är första steget i varje ' +
        'SQL-uppgift du kommer att möta.'
    },
    {
      rubrik: 'Fyra begrepp som ofta blandas ihop',
      text:
        '**Databas** — en strukturerad samling data som lagras och nås elektroniskt, utformad för att ' +
        'effektivt lagra, hämta och hantera information. Exempel: databasen `Hospital` med tabellerna ' +
        'Unit, Employee, Patient, Illness och Car.\n\n' +
        '**RDBMS** (Relational Database Management System) — programvaran som hostar databaser. ' +
        'Microsoft SQL Server, PostgreSQL, SQLite. Den tar emot SQL-frågor, kör dem via query processor ' +
        'och storage engine, upprätthåller constraints och hanterar behörigheter. **Ett RDBMS kan hosta ' +
        'flera databaser samtidigt.**\n\n' +
        '**Server** — datorn som RDBMS:et körs på. Enklaste definitionen från föreläsningen: *"en dator ' +
        'som aldrig stängs av"*. En laptop duger inte. Ett server blade väger 20+ kilo, är relativt fult, ' +
        'låter mycket, blir varmt och saknar både skärm och tangentbord — men har upp till 6 TB RAM och ' +
        'plats för 32 CPU-socklar. Server blades sitter i server racks, och racks står i datacenter. Det ' +
        'är vad "molnet" faktiskt är.\n\n' +
        '**Virtuell maskin** — en logisk dator som delar en fysisk dators resurser. I det gamla ' +
        'paradigmet var en fysisk dator lika med en server. Med virtualisering kunde en server köra flera ' +
        'operativsystem samtidigt. Med molnplattformar som Microsoft Azure skapas en VM med ett klick, ' +
        'och man hyr den per timme.\n\n' +
        'Kedjan i kursens labbmiljö blir alltså: **din laptop (klient) → nätverk → virtuell maskin i ' +
        'Azure (server) → SQL Server (RDBMS) → databasen Hospital (data)**.\n\n' +
        'LADOK och TimeEdit är inte databaser i sig — de är applikationer som kommunicerar med databaser, ' +
        'oftast över internet.'
    },
    {
      rubrik: 'Varför inte bara spara i en ArrayList?',
      text:
        'Föreläsningen ställer frågan genom ett Java-exempel: en `EmployeeRegister` med en ' +
        '`ArrayList<Employee>`. Problemet är att listan ligger i **RAM-minnet**, som är flyktig lagring. ' +
        'Stängs programmet är datan borta.\n\n' +
        'Tekniker för **persistent** datalagring:\n\n' +
        '- Filer\n' +
        '- Kalkylblad\n' +
        '- Relationsdatabaser (RDBMS)\n' +
        '- Dokumentorienterade databaser (NoSQL)\n\n' +
        'Alla i tjänst av samma sak: *"storing, protecting, and retrieving data"*. Relationsdatabasernas ' +
        'fördel är integritetsregler, ett flexibelt frågespråk och hantering av många samtidiga användare.'
    },
    {
      rubrik: 'Designprocessens tre nivåer',
      text:
        'Detta är kursens ryggrad. Lär dig den nu, så hänger allt annat på plats.\n\n' +
        '**Verksamhetskrav** i text, till exempel:\n\n' +
        '- En anställd har ett unikt anställningsnummer, ett namn och en lön\n' +
        '- En anställd måste arbeta på exakt en avdelning\n' +
        '- En avdelning har ett unikt namn och en budget\n' +
        '- En avdelning kan ha flera anställda\n\n' +
        '**1. Konceptuell databasdesign** — ER-modellering. Resultatet är ett **ER-diagram**: entiteter, ' +
        'attribut, samband och multipliciteter. Här tänker man inte på tabeller och kolumner.\n\n' +
        '**2. Logisk databasdesign** — transformation av den konceptuella modellen, plus normalisering om ' +
        'det behövs. Resultatet är en **textuell representation av relationer**:\n\n' +
        '`Employee(EmpNo, Name, Salary, DepartmentName)`\n' +
        '`Department(Name, Budget)`\n\n' +
        '**3. Fysisk databasdesign** — implementering av den logiska modellen. Resultatet är **SQL ' +
        'DDL-kod**: `CREATE TABLE`-satser med datatyper och constraints.\n\n' +
        'Notera var normaliseringen sitter: på den **logiska** nivån, alltså efter att ER-modellen ' +
        'transformerats till relationer, inte före ER-modelleringen. Det är en vanlig tentafälla.'
    },
    {
      rubrik: 'Verktygen i delkursen',
      text:
        '- **Microsoft Azure** — molnplattform där du skapar den virtuella maskin som blir din databasserver\n' +
        '- **SQL Server** — RDBMS:et som hostar databaserna\n' +
        '- **SSMS** — serverside-verktyg för administration: skapa konton, tilldela behörigheter, skapa ' +
        'databaser, starta och stoppa tjänster. Endast Windows.\n' +
        '- **VS Code** med mssql-tillägget — för att köra SQL-frågor mot servern, och för Java-utveckling\n' +
        '- **GitHub** — versionshantering och inlämning av kod\n\n' +
        'Två rekommenderade uppsättningar: antingen VS Code lokalt på laptopen med SQL Server i Azure ' +
        '(utnyttjar din dators prestanda), eller allt installerat på den virtuella maskinen (inget att ' +
        'installera lokalt, men begränsad prestanda).\n\n' +
        'Delkursens flöde: kursintro → labbuppgifter → SQL-uppgiften → plugga till tentan → presentera ' +
        'SQL-uppgiften → **skriftlig tenta** → projektuppgiften → presentera den.'
    }
  ],
  nyckelbegrepp: [
    'Databas = strukturerad datasamling; RDBMS = programvaran; server = datorn; VM = logisk dator',
    'Ett RDBMS kan hosta flera databaser samtidigt',
    'Persistent lagring kontra flyktig (RAM)',
    'Tre nivåer: konceptuell (ER) → logisk (relationer) → fysisk (DDL)',
    'Normalisering sker på den logiska nivån'
  ],
  tentakoppling:
    'Detta kapitel ger inga direkta tentafrågor, men designprocessens tre nivåer är ramen för tre ' +
    'av tentans fyra områden. Kan du dem vet du alltid vilken sorts svar en uppgift efterfrågar.'
},

/* ====================== KAPITEL 2 ====================== */
{
  id: 'db-k2',
  nr: 2,
  titel: 'SQL: att ställa frågor till en databas',
  ingress: 'SQL:s delmängder, SELECT–FROM–WHERE, operatorer, NULL-hantering, sortering och de satser som ändrar data.',
  lastid: 12,
  amnen: ['db-sql-grund'],
  avsnitt: [
    {
      rubrik: 'Varför ett frågespråk?',
      text:
        'Fyra egenskaper motiverar SQL:\n\n' +
        '- **Flexibelt.** Det finns ett närmast oändligt antal affärsfrågor man kan ställa. SQL låter ' +
        'användaren uttrycka just sin fråga.\n' +
        '- **Standardiserat.** Används i stort sett överallt, även om dialekter som T-SQL och Oracle SQL ' +
        'skiljer sig i detaljer.\n' +
        '- **Deklarativt.** Användaren anger **vad** för data hen vill ha, inte **hur** den ska hämtas. ' +
        'Frågeoptimeraren avgör exekveringsplanen. Du behöver ingen kunskap om databasens interna ' +
        'komplexitet.\n' +
        '- **Täcker både definition och manipulation** av data.\n\n' +
        'Teoretisk grund är **relationsalgebran**, som bygger på mängdlära. Operationerna är selektion, ' +
        'projektion, mängdoperationer (kartesisk produkt, union, snitt, differens), division och de olika ' +
        'joinformerna. In: mängder. Ut: mängder.'
    },
    {
      rubrik: 'SQL:s delmängder',
      text:
        '- **DDL** — Data Definition Language. `CREATE`, `ALTER`, `DROP`, `TRUNCATE`. Definierar strukturer.\n' +
        '- **DML** — Data Manipulation Language. `SELECT`, `INSERT`, `UPDATE`, `DELETE`. Arbetar med datan.\n' +
        '- **DQL** — Data Query Language. `SELECT`. Räknas som en delmängd av DML.\n' +
        '- **DCL** — Data Control Language. Behörighetsstyrning.\n' +
        '- **TCL** — Transaction Control Language. Transaktionshantering.\n\n' +
        'Delkursen använder DDL, DML, DQL och DCL. **TCL ligger utanför kursen** — det sägs uttryckligen, ' +
        'bland annat i avsnittet om att droppa och återskapa FK-constraints.\n\n' +
        'Formatering enligt kursens kodstandard: nyckelord i **VERSALER**, en klausul per rad, satsen ' +
        'avslutas med semikolon. Enradskommentar: `-- så här`. Flerradskommentar: `/* så här */`.'
    },
    {
      rubrik: 'SELECT, FROM och AS',
      text:
        'Grundformen består av klausuler:\n\n' +
        '```\nSELECT\n    StudentNo,\n    StudentName\nFROM\n    Student;\n```\n\n' +
        '`SELECT` innehåller kolumnnamn och uttryck. `FROM` innehåller tabellnamn.\n\n' +
        '**`AS` byter namn på kolumnen enbart i resultatmängden.** Det är ett temporärt alias — det ' +
        'underliggande kolumnnamnet i databasen är oförändrat. AS tillhör DML, inte DDL.\n\n' +
        'Två användningar: läsbarare rubriker (`StudentPhoneNo AS Phone`), och att namnge resultatet av ' +
        'ett uttryck. Utan alias visas uttryckskolumner som `(No column name)`.\n\n' +
        '`SELECT *` hämtar alla kolumner. Kursmaterialet avråder: räkna hellre upp kolumnerna explicit. ' +
        'Med `SELECT *` kan man inte heller använda AS, och man får med surrogatnycklar som saknar ' +
        'affärsmening.\n\n' +
        'Uttryck är tillåtna i SELECT: `CourseCredits / 2 AS HalfCredits`.'
    },
    {
      rubrik: 'WHERE och operatorerna',
      text:
        '`WHERE` filtrerar rader genom att utvärdera ett predikat och returnera de rader där det blir sant.\n\n' +
        '**Relationsoperatorer:** `=`, `!=` eller `<>`, `>`, `<`, `>=`, `<=`. Notera att `!=` är ' +
        'T-SQL-specifikt medan `<>` är standard.\n\n' +
        '**Logiska operatorer:**\n\n' +
        '- `AND` — båda uttrycken sanna\n' +
        '- `OR` — minst ett sant\n' +
        '- `NOT` — inverterar\n' +
        '- `BETWEEN` — inom intervallet, **inklusive gränsvärdena**\n' +
        '- `IN` — matchar något värde i listan\n' +
        '- `LIKE` — matchar ett mönster\n' +
        '- `EXISTS` — sant om en subquery returnerar minst en rad\n\n' +
        '`BETWEEN 5 AND 10` motsvarar `>= 5 AND <= 10`. Att glömma inklusiviteten är en klassisk miss.\n\n' +
        '**LIKE-wildcards:**\n\n' +
        '- `%` matchar noll eller flera tecken\n' +
        '- `_` matchar **exakt ett** tecken\n\n' +
        'Så `\'Data%\'` matchar allt som börjar med Data, `\'%at%\'` allt som innehåller at, och `\'_ath\'` ' +
        'exakt fyra tecken där de tre sista är ath.\n\n' +
        '**Lexikografisk jämförelse.** För VARCHAR jämför `>` i ordboksordning, tecken för tecken från ' +
        'vänster tills en skillnad hittas. `\'Max\' > \'Mary Sue\'` är sant eftersom x kommer efter r i ' +
        'tredje positionen.'
    },
    {
      rubrik: 'NULL — den vanligaste fällan',
      text:
        'NULL representerar ett **saknat, odefinierat eller okänt värde**. Till skillnad från `null` i ' +
        'Java, som är en referens till ett objekt som inte finns, betyder NULL i SQL att inget värde ' +
        'matats in för kolumnen i den raden.\n\n' +
        'Konsekvensen är avgörande:\n\n' +
        '```\n-- Returnerar ALLTID noll rader\nWHERE StudentAddress = NULL;\n\n' +
        '-- Korrekt\nWHERE StudentAddress IS NULL;\nWHERE StudentAddress IS NOT NULL;\n```\n\n' +
        'Varför? "Okänt = NULL" evalueras varken till sant eller falskt utan till *okänt*, och WHERE ' +
        'släpper bara igenom rader där predikatet är sant.\n\n' +
        'Samma logik ger att alla aggregatfunktioner utom `COUNT(*)` **ignorerar NULL** — mer om det i ' +
        'nästa kapitel.\n\n' +
        '`ISNULL(kolumn, ersättning)` byter ut NULL mot ett angivet värde i resultatet: ' +
        '`ISNULL(StudentAddress, \'Unknown\')`.'
    },
    {
      rubrik: 'DISTINCT och ORDER BY',
      text:
        '**DISTINCT** tar bort dubblettrader. Viktigt: när flera kolumner listas utvärderas **alla ' +
        'tillsammans**. Två rader räknas som dubbletter bara om samtliga listade kolumner är lika.\n\n' +
        'I materialets exempel ger `DISTINCT StudentName, StudentPhoneNo` tre rader trots att namnet ' +
        '"Max" förekommer två gånger — telefonnumren skiljer sig.\n\n' +
        '**ORDER BY** sorterar resultatet. `ASC` är standard (stigande), `DESC` ger fallande. Flera ' +
        'kolumner kan anges: den andra sorterar inom varje grupp av den första.\n\n' +
        'ORDER BY kan referera **både till aliaset och till originalnamnet**. Det beror på den logiska ' +
        'exekveringsordningen, där ORDER BY kommer sist:\n\n' +
        '1. `FROM` — bygger radmängden\n' +
        '2. `WHERE` — filtrerar rader\n' +
        '3. `GROUP BY` — samlar rader i grupper\n' +
        '4. Aggregat beräknas per grupp\n' +
        '5. `HAVING` — filtrerar grupper\n' +
        '6. `SELECT` — producerar projektionen\n' +
        '7. `ORDER BY` — sorterar\n\n' +
        'Eftersom SELECT körs före ORDER BY finns aliasen redan. Och eftersom WHERE körs **före** SELECT ' +
        'kan WHERE *inte* använda alias. Lär dig ordningen — den förklarar flera annars förvirrande ' +
        'felmeddelanden.\n\n' +
        'Att sortera på kolumnindex (`ORDER BY 3`) fungerar men avråds: läggs en kolumn till ändras ' +
        'beteendet oväntat.'
    },
    {
      rubrik: 'Att ändra data',
      text:
        '**INSERT** — kolumnerna räknas upp och värdena i VALUES måste komma i samma ordning. ' +
        'IDENTITY-kolumner utelämnas, eftersom databasen genererar dem.\n\n' +
        '```\nINSERT INTO Student (StudentNo, StudentName)\nVALUES\n    (\'S1\', \'Max\'),\n    (\'S2\', \'Chloe\');\n```\n\n' +
        'Subqueries kan användas för att slå upp främmande nycklar vid insättning:\n\n' +
        '```\nINSERT INTO HasStudied (StudentID, CourseID, Grade)\nVALUES\n' +
        '    ((SELECT StudentID FROM Student WHERE StudentNo = \'S1\'),\n' +
        '     (SELECT CourseID FROM Course WHERE CourseCode = \'C1\'), 6);\n```\n\n' +
        '**UPDATE** — uttrycket på höger sida om likhetstecknet utvärderas per rad med radens nuvarande ' +
        'värden:\n\n' +
        '```\nUPDATE Car\nSET\n    Price = Price * 0.95;\n```\n\n' +
        'Vanligt fel: `SET Price = 0.95`, som sätter alla priser till 95 öre.\n\n' +
        '`CASE` gör villkorade uppdateringar möjliga:\n\n' +
        '```\nUPDATE Employee\nSET Salary = CASE\n    WHEN Salary = 50000 THEN Salary + 10000\n' +
        '    WHEN Salary < 50000 THEN Salary + 20000\n    ELSE Salary + 5000\nEND;\n```\n\n' +
        '**DELETE** tar bort rader men behåller tabellen. `DELETE FROM Course;` utan WHERE tömmer hela ' +
        'tabellen. Jämför `DROP TABLE Course;`, som tar bort själva tabellen ur databasen.\n\n' +
        '> Minnesregel: DELETE tömmer lådan, DROP slänger lådan.\n\n' +
        '**SELECT INTO** skapar en ny tabell och fyller den i ett steg. Notera att den nya tabellen ärver ' +
        'kolumnernas datatyper men **inga constraints** — varken primärnyckel eller UNIQUE följer med.'
    },
    {
      rubrik: 'En affärsfråga, en SQL-fråga',
      text:
        'Materialet är uttryckligt på en punkt som återkommer i SQL-uppgiften. På frågan *"Vem har samma ' +
        'lön som E2?"* är följande lösning **underkänd**:\n\n' +
        '1. Kör en fråga som visar allas löner\n' +
        '2. Läs av att E2 tjänar 55000\n' +
        '3. Kör `WHERE EmpSalary = 55000`\n\n' +
        'Tre skäl:\n\n' +
        '- Du får inte anta att du känner till ett värde som ligger i databasen. Lönen kan ändras.\n' +
        '- Affärsfrågan ska besvaras med **en (1)** fråga. Två frågor kräver att en människa manuellt för ' +
        'över värdet emellan, vilket inte går att bygga in i en applikation.\n' +
        '- Lösningen är inte generell — den fungerar bara för just den ögonblicksbild datan hade.\n\n' +
        'Korrekt lösning använder en subquery som hämtar värdet dynamiskt:\n\n' +
        '```\nSELECT EmpNo, EmpName, EmpSalary\nFROM Employee\nWHERE EmpSalary = (\n' +
        '    SELECT EmpSalary FROM Employee WHERE EmpNo = \'E2\'\n)\nAND EmpNo <> \'E2\';\n```'
    }
  ],
  nyckelbegrepp: [
    'DDL definierar strukturer, DML arbetar med data, DQL frågar, DCL styr behörigheter',
    'AS ger temporärt alias i resultatmängden, ändrar inte schemat',
    'BETWEEN är inklusivt i båda ändar',
    'LIKE: % = noll eller flera tecken, _ = exakt ett tecken',
    'NULL jämförs med IS NULL / IS NOT NULL, aldrig med =',
    'DISTINCT verkar på hela raden i SELECT-listan',
    'Logisk ordning: FROM → WHERE → GROUP BY → aggregat → HAVING → SELECT → ORDER BY',
    'En affärsfråga ska besvaras med en enda SQL-fråga'
  ],
  tentakoppling:
    'SQL är ett av tentans fyra områden. NULL-hanteringen och LIKE-wildcards är de detaljer som ' +
    'oftast avgör om en fråga blir rätt.'
},

/* ====================== KAPITEL 3 ====================== */
{
  id: 'db-k3',
  nr: 3,
  titel: 'Att räkna och gruppera',
  ingress: 'Aggregatfunktioner, GROUP BY, HAVING och den regel som orsakar flest felmeddelanden.',
  lastid: 8,
  amnen: ['db-sql-aggregat'],
  avsnitt: [
    {
      rubrik: 'Aggregatfunktionerna',
      text:
        'En aggregatfunktion beräknar ett enda värde ur en mängd rader:\n\n' +
        '- `COUNT()` — antal\n' +
        '- `SUM()` — summa\n' +
        '- `AVG()` — medelvärde\n' +
        '- `MIN()` — minsta värde\n' +
        '- `MAX()` — största värde\n\n' +
        'Står ett aggregat ensamt i SELECT behandlas hela tabellen som en enda grupp — ingen GROUP BY ' +
        'behövs.\n\n' +
        '**COUNT(\\*) kontra COUNT(kolumn).** Detta är skillnaden att kunna:\n\n' +
        '- `COUNT(*)` räknar **alla rader**, oavsett innehåll\n' +
        '- `COUNT(StudentAddress)` räknar bara rader där kolumnen **inte är NULL**\n\n' +
        'I materialets exempel har Chloe NULL som adress: COUNT(*) ger 3, COUNT(StudentAddress) ger 2.\n\n' +
        'Regeln gäller alla aggregat: SUM, AVG, MIN och MAX ignorerar NULL. Det påverkar särskilt AVG, ' +
        'där NULL-rader inte drar ner medelvärdet.\n\n' +
        '**Datatypfällan.** `AVG(Grade)` på en INTEGER-kolumn ger ett heltal. Materialets exempel visar ' +
        'AVG = 6 trots att det faktiska medelvärdet är 6,75 — beräkningen sker i kolumnens datatyp och ' +
        'decimaldelen trunkeras. Vill du ha decimaler måste du typkonvertera: ' +
        '`AVG(CAST(Grade AS DECIMAL(4,2)))`.'
    },
    {
      rubrik: 'GROUP BY',
      text:
        'GROUP BY samlar rader som delar ett värde i grupper, och aggregaten beräknas per grupp.\n\n' +
        '```\nSELECT\n    StudentID AS ID,\n    AVG(Grade) AS AverageGrade,\n' +
        '    COUNT(Grade) AS GradeCount\nFROM\n    HasStudied\nGROUP BY\n    StudentID;\n```\n\n' +
        'Har HasStudied åtta rader fördelade på tre studenter blir resultatet tre rader.\n\n' +
        '**Regeln som orsakar flest felmeddelanden:**\n\n' +
        '> Varje kolumn i SELECT måste antingen finnas i GROUP BY eller vara inkapslad i en ' +
        'aggregatfunktion.\n\n' +
        'Annars får du: *"Column \'HasStudied.Grade\' is invalid in the select list because it is not ' +
        'contained in either an aggregate function or the GROUP BY clause."*\n\n' +
        'Logiken är enkel när man ser den: grupperar man per StudentID kan en grupp innehålla flera ' +
        'olika betyg. Databasen kan inte veta vilket den ska visa, så den vägrar. Antingen lägger du ' +
        'till Grade i GROUP BY, eller så aggregerar du den, till exempel `MAX(Grade)`.\n\n' +
        'Det **omvända gäller inte** — du får gruppera på kolumner som inte finns i SELECT.\n\n' +
        'En bieffekt: GROUP BY eliminerar dubbletter på samma sätt som DISTINCT, men låter dig också ' +
        'räkna hur många det var i varje grupp.'
    },
    {
      rubrik: 'WHERE kontra HAVING',
      text:
        'Detta är kapitlets viktigaste distinktion.\n\n' +
        '**WHERE** filtrerar **rader före** gruppering. Får inte innehålla aggregatfunktioner.\n\n' +
        '**HAVING** filtrerar **grupper efter** att aggregaten beräknats. Får innehålla aggregatfunktioner.\n\n' +
        '> Minnesregel ur materialet: i alfabetet kommer H efter G. HAVING körs efter GROUP BY.\n\n' +
        'Skillnaden syns tydligast i ett exempel. Betrakta betygen (1,6) (1,7) (1,8) (1,6) (2,7) (2,9) ' +
        '(2,7) (3,6) angivna som (StudentID, Grade).\n\n' +
        'Med **WHERE Grade > 6** tas rader bort *före* grupperingen. Student 1 har bara två rader kvar ' +
        '(7 och 8), så COUNT blir 2.\n\n' +
        'Med **HAVING MAX(Grade) > 6** grupperas allt först. Student 1 får COUNT 4 och MAX 8, student 2 ' +
        'får COUNT 3 och MAX 9, student 3 får COUNT 1 och MAX 6. Därefter tar HAVING bort hela gruppen ' +
        'student 3.\n\n' +
        'Samma tal, helt olika svar. Fråga dig alltid: ska jag ta bort **rader** eller **grupper**?'
    },
    {
      rubrik: 'Typiska affärsfrågor',
      text:
        '"Vilka sjukdomar lider fler än en patient av?" — filtret gäller ett aggregat och måste därför ' +
        'stå i HAVING:\n\n' +
        '```\nSELECT\n    Illness.IllnessName,\n    COUNT(*) AS NumberOfPatients\nFROM\n    Suffers\n' +
        'INNER JOIN\n    Illness ON Suffers.IllnessID = Illness.IllnessID\nGROUP BY\n' +
        '    Illness.IllnessName\nHAVING\n    COUNT(*) > 1;\n```\n\n' +
        '"Vilka anställda tjänar över medellönen?" — medellönen är ett skalärt värde som måste beräknas ' +
        'i en subquery, eftersom aggregatfunktioner inte får stå i WHERE:\n\n' +
        '```\nSELECT EmpName, EmpSalary\nFROM Employee\nWHERE EmpSalary > (\n' +
        '    SELECT AVG(EmpSalary) FROM Employee\n);\n```\n\n' +
        'Notera skillnaden mot HAVING: här vill vi filtrera enskilda **rader**, inte grupper, så HAVING ' +
        'vore fel verktyg.'
    }
  ],
  nyckelbegrepp: [
    'COUNT(*) räknar alla rader; COUNT(kolumn) hoppar över NULL',
    'Alla aggregat utom COUNT(*) ignorerar NULL',
    'AVG på INTEGER-kolumn ger heltal — casta för decimaler',
    'Allt i SELECT måste vara grupperingsnyckel eller aggregerat',
    'WHERE filtrerar rader före gruppering, HAVING filtrerar grupper efter',
    'Aggregat får inte stå i WHERE — använd subquery'
  ],
  tentakoppling:
    'WHERE kontra HAVING är den enskilt vanligaste SQL-frågan på tentor i ämnet. Kan du förklara ' +
    'skillnaden med ett räkneexempel sitter den.'
},

/* ====================== KAPITEL 4 ====================== */
{
  id: 'db-k4',
  nr: 4,
  titel: 'Att kombinera tabeller: joins',
  ingress: 'Kartesisk produkt, inner join, de tre outer join-varianterna, tetajoin och självjoin.',
  lastid: 11,
  amnen: ['db-sql-join'],
  avsnitt: [
    {
      rubrik: 'Problemet joins löser',
      text:
        'Affärsfråga: *"Jag vill veta namnen på alla patienter och adresserna till de avdelningar de ' +
        'ligger på."*\n\n' +
        'Namnen finns i Patient, adresserna i Unit. En fråga mot bara Patient ger felet ' +
        '*"Invalid column name \'UnitAddress\'"*. Data från två tabeller kräver en join.\n\n' +
        'Nyckelfrågan att ställa: **vilken kolumn finns i båda tabellerna?** Det är joinkolumnen, och ' +
        'den är i regel en primärnyckel i den ena tabellen och en främmande nyckel i den andra.'
    },
    {
      rubrik: 'Kartesisk produkt',
      text:
        'Grunden för alla joins. Varje rad i den ena tabellen paras ihop med varje rad i den andra.\n\n' +
        '```\nSELECT *\nFROM Student, HasStudied;\n```\n\n' +
        'Räkneregeln:\n\n' +
        '- **Rader multipliceras:** m × n\n' +
        '- **Kolumner adderas:** p + q\n\n' +
        'Tre rader och fem kolumner mot tre rader och tre kolumner ger 9 rader och 8 kolumner.\n\n' +
        'En **INNER JOIN är formellt en kartesisk produkt följd av en selektion** på joinvillkoret. Det ' +
        'förklarar varför en glömd ON-sats är så förödande: du får produkten av alla rader, vilket i en ' +
        'verklig databas kan bli miljontals rader.'
    },
    {
      rubrik: 'INNER JOIN',
      text:
        '```\nSELECT\n    Patient.PatientNo AS No,\n    Patient.PatientName AS Name,\n' +
        '    Unit.UnitAddress AS Address\nFROM\n    Patient\nINNER JOIN\n    Unit\n' +
        '    ON Patient.UnitID = Unit.UnitID;\n```\n\n' +
        'Bara rader som matchar på båda sidor kommer med. Rader utan matchning försvinner.\n\n' +
        '`JOIN` utan prefix betyder samma sak som `INNER JOIN` — INNER är standardvärdet. Skriv gärna ut ' +
        'det ändå, så syns det att rader utan matchning avsiktligt utesluts.\n\n' +
        'Joinvillkoret kräver att kolumnerna är **join-kompatibla**, alltså av samma datatyp.\n\n' +
        '**Varför UnitID syns två gånger i `SELECT *`.** Joinen bygger en bred rad av samtliga kolumner ' +
        'från båda tabellerna. Patient har en UnitID (FK) och Unit har en UnitID (PK) — båda följer med. ' +
        'Ännu ett skäl att räkna upp kolumnerna explicit.\n\n' +
        'Det finns även en äldre, **implicit** joinsyntax där tabellerna kommaseparas och villkoret ' +
        'ligger i WHERE. Den är tillåten och används i materialet för att demonstrera teta- och ' +
        'självjoins, men den explicita ON-syntaxen är tydligare.'
    },
    {
      rubrik: 'OUTER JOIN',
      text:
        'Outer join behåller rader **utan** matchning och fyller ut med NULL.\n\n' +
        'Använd tabellen Car med tre bilar, varav C3 (Tesla) saknar ägare, och Student med tre studenter, ' +
        'varav S3 (Rachel) saknar bil.\n\n' +
        '**LEFT OUTER JOIN** behåller alla rader från tabellen till **vänster** om JOIN:\n\n' +
        '```\nFROM Car\nLEFT OUTER JOIN Student\n    ON Car.StudentID = Student.StudentID;\n```\n\n' +
        'Ger tre rader — alla bilar. Tesla får NULL i studentkolumnerna. Rachel syns inte alls.\n\n' +
        '**RIGHT OUTER JOIN** behåller alla rader från tabellen till **höger**. Samma fråga med RIGHT ger ' +
        'tre rader — alla studenter. Rachel får NULL i bilkolumnerna, Tesla syns inte.\n\n' +
        '**FULL OUTER JOIN** behåller allt från båda sidor. Fyra rader: tre matchningar plus både Tesla ' +
        'och Rachel med NULL på sin tomma sida.\n\n' +
        '> Minnesregel ur materialet: titta bokstavligt på vad som står till vänster respektive höger om ' +
        'JOIN-nyckelordet.\n\n' +
        '**Det viktigaste användningsområdet** är att hitta rader *utan* matchning. Kombinationen ' +
        'LEFT JOIN + IS NULL är ett av de tre standardmönstren:\n\n' +
        '```\nSELECT Employee.EmpName\nFROM Employee\nLEFT OUTER JOIN Car\n' +
        '    ON Employee.EmployeeID = Car.EmployeeID\nWHERE Car.CarID IS NULL;\n```\n\n' +
        'Testa alltid mot en kolumn som aldrig kan vara NULL i den bevarade tabellen — helst ' +
        'primärnyckeln.'
    },
    {
      rubrik: 'Tetajoin',
      text:
        'En join där villkoret använder någon annan operator än likhet:\n\n' +
        '```\nSELECT\n    Student.StudentNo,\n    HasStudied.StudentID\nFROM\n    Student,\n' +
        '    HasStudied\nWHERE\n    Student.StudentID > HasStudied.StudentID;\n```\n\n' +
        'Det är fortfarande en kartesisk produkt följd av en selektion — bara att selektionen använder ' +
        '`>` istället för `=`. Notera att kartesiska produkter inte tar bort dubbletter; lägg till ' +
        'DISTINCT om det behövs.'
    },
    {
      rubrik: 'Självjoin — och hur man misslyckas med den',
      text:
        'En självjoin joinar en tabell med sig själv. Den kräver **alias**, annars får du felet *"The ' +
        'objects Employee and Employee in the FROM clause have the same exposed names."*\n\n' +
        'Materialet visar två sätt att misslyckas innan den korrekta lösningen.\n\n' +
        '**Misslyckande 1:** `WHERE StudentAddress = StudentAddress` — kolumnen jämförs med sig själv, ' +
        'villkoret är alltid sant och alla rader returneras.\n\n' +
        '**Misslyckande 2:**\n\n' +
        '```\nFROM Student AS Student1, Student AS Student2\nWHERE Student1.StudentAddress = Student2.StudentAddress;\n```\n\n' +
        'Ser rimligt ut, men **varje rad matchar sig själv**. Chloes adress är förstås lika med Chloes ' +
        'adress, så alla studenter kommer med — även de som bor ensamma.\n\n' +
        '**Korrekt lösning** — lägg till ett villkor som utesluter identiteten:\n\n' +
        '```\nSELECT\n    Student1.StudentNo,\n    Student1.StudentName,\n    Student1.StudentAddress\n' +
        'FROM\n    Student AS Student1\nINNER JOIN\n    Student AS Student2\n' +
        '    ON Student1.StudentAddress = Student2.StudentAddress\n' +
        '    AND Student1.StudentNo <> Student2.StudentNo;\n```\n\n' +
        '**Rekursiv självjoin** används när en tabell refererar till sig själv, till exempel via ' +
        'ManagerID. Bestäm först vilken roll varje alias har:\n\n' +
        '```\nSELECT\n    emp.EmpNo AS EmployeeNo,\n    man.EmpNo AS ManagerNo\nFROM\n' +
        '    Employee AS emp\nINNER JOIN\n    Employee AS man\n' +
        '    ON emp.ManagerID = man.EmployeeID\nWHERE\n    emp.Salary > man.Salary;\n```\n\n' +
        'Här är `emp` den anställde och `man` chefen. Villkoret plockar ut de anställda som tjänar mer än ' +
        'sin chef. Notera att den som saknar chef (ManagerID är NULL) aldrig kan komma med i en inner join.'
    },
    {
      rubrik: 'Trevägsjoin',
      text:
        'Kopplingstabeller kräver ofta tre tabeller för att bli läsbara. `HasStudied` innehåller bara ' +
        'StudentID, CourseID och Grade — inga namn.\n\n' +
        '```\nSELECT\n    Student.StudentNo AS No,\n    Student.StudentName AS Name,\n' +
        '    Course.CourseCode AS Code,\n    Course.CourseName AS Title,\n    HasStudied.Grade\n' +
        'FROM\n    HasStudied\nINNER JOIN\n    Student ON HasStudied.StudentID = Student.StudentID\n' +
        'INNER JOIN\n    Course ON HasStudied.CourseID = Course.CourseID;\n```\n\n' +
        'Surrogatnycklarna används för att joina men väljs inte ut — de saknar affärsmening.'
    },
    {
      rubrik: 'JOIN eller UNION?',
      text:
        'En vanlig förväxling. Frågan "namn och adress för alla anställda **och** alla patienter" löses ' +
        '**inte** med en join.\n\n' +
        '- **JOIN** kombinerar kolumner från olika tabeller på **samma rad** — den gör resultatet bredare\n' +
        '- **UNION** staplar rader från olika frågor **under varandra** — den gör resultatet längre\n\n' +
        '```\nSELECT EmpName AS Name, EmpAddress AS Address\nFROM Employee\nUNION\n' +
        'SELECT PatientName, PatientAddress\nFROM Patient;\n```\n\n' +
        'Mer om union-kompatibilitet i nästa kapitel.'
    }
  ],
  nyckelbegrepp: [
    'Kartesisk produkt: rader multipliceras, kolumner adderas',
    'INNER JOIN = kartesisk produkt + selektion; JOIN betyder INNER JOIN',
    'LEFT/RIGHT behåller alla rader från tabellen till vänster/höger om JOIN',
    'LEFT JOIN + IS NULL hittar rader utan matchning',
    'Tetajoin = joinvillkor med annan operator än likhet',
    'Självjoin kräver alias OCH ett villkor som utesluter identiteten',
    'JOIN gör resultatet bredare, UNION gör det längre'
  ],
  tentakoppling:
    'Joins genomsyrar SQL-delen av tentan. Självjoinens identitetsfälla och skillnaden mellan de tre ' +
    'outer join-varianterna är de vanligaste stötestenarna.'
},

/* ====================== KAPITEL 5 ====================== */
{
  id: 'db-k5',
  nr: 5,
  titel: 'Subqueries och mängdoperationer',
  ingress: 'Korrelerade och okorrelerade subqueries, IN, EXISTS, "alla"-frågan, UNION-familjen och vyer.',
  lastid: 10,
  amnen: ['db-sql-subquery'],
  avsnitt: [
    {
      rubrik: 'Okorrelerade subqueries',
      text:
        'En **okorrelerad** (vanlig) subquery är oberoende av den yttre frågan. Den utvärderas **en gång**, ' +
        'och resultatet skickas till den yttre frågan.\n\n' +
        '```\nSELECT StudentNo, StudentAddress\nFROM Student\nWHERE StudentAddress = (\n' +
        '    SELECT StudentAddress FROM Student WHERE StudentNo = \'S1\'\n);\n```\n\n' +
        '**Välj operator efter hur många värden subqueryn kan ge:**\n\n' +
        '- `=`, `!=`, `<`, `<=`, `>`, `>=` kräver **exakt ett** värde\n' +
        '- `IN` klarar en **lista**\n' +
        '- `EXISTS` bryr sig bara om **existensen**\n\n' +
        'Använder du `=` mot en subquery som ger flera rader får du: *"Subquery returned more than 1 ' +
        'value. This is not permitted when the subquery follows =, !=, <, <=, >, >= or when the subquery ' +
        'is used as an expression."* Felmeddelandet räknar självt upp de operatorer som kräver ett ' +
        'skalärt värde.\n\n' +
        '`IN` motsvarar mängdoperationen **snitt**. Frågan\n\n' +
        '```\nWHERE StudentID IN (SELECT StudentID FROM HasStudied)\n```\n\n' +
        'expanderas i praktiken till `WHERE StudentID IN (1, 1, 1, 1, 2, 2, 2, 3)`.'
    },
    {
      rubrik: 'Korrelerade subqueries',
      text:
        'En **korrelerad** subquery innehåller en referens till den yttre frågan och kan därför inte köras ' +
        'fristående. Den utvärderas **en gång per kandidatrad** i den yttre frågan.\n\n' +
        '```\nSELECT StudentNo\nFROM Student\nWHERE 6 IN (\n    SELECT Grade\n    FROM HasStudied\n' +
        '    WHERE StudentID = Student.StudentID\n);\n```\n\n' +
        'Referensen `Student.StudentID` gör den korrelerad. Materialet expanderar den till en iteration ' +
        'per student:\n\n' +
        '- StudentID = 1 ⇒ betygen (6,7,8,6) ⇒ `6 IN (6,7,8,6)` ⇒ SANT\n' +
        '- StudentID = 2 ⇒ betygen (7,9,7) ⇒ `6 IN (7,9,7)` ⇒ FALSKT\n' +
        '- StudentID = 3 ⇒ betyget (6) ⇒ SANT\n\n' +
        'Testet för att avgöra vilken sort du har: **innehåller den inre frågan en referens till den ' +
        'yttre?**'
    },
    {
      rubrik: 'EXISTS och NOT EXISTS',
      text:
        '`EXISTS` returnerar sant om subqueryn ger minst en rad. Innehållet spelar ingen roll, därför ' +
        'skrivs `SELECT 1` — den returnerar konstanten 1 för varje matchande rad.\n\n' +
        '`NOT EXISTS` är standardverktyget för **frånvaro**:\n\n' +
        '```\nSELECT StudentNo\nFROM Student\nWHERE NOT EXISTS (\n    SELECT 1\n    FROM HasStudied\n' +
        '    WHERE HasStudied.StudentID = Student.StudentID\n);\n```\n\n' +
        'Materialet går igenom den iteration för iteration. Studenterna 1, 2 och 3 har rader i HasStudied, ' +
        'så NOT EXISTS blir falskt för dem. Student 4 (Nathan) har inga rader alls — noll rader ⇒ ' +
        'NOT EXISTS blir sant ⇒ S4 är enda svaret.\n\n' +
        '**De tre mönstren för "hitta rader utan matchning":**\n\n' +
        '1. `LEFT JOIN` + `IS NULL`\n' +
        '2. `NOT IN` med subquery\n' +
        '3. `NOT EXISTS` (korrelerad)\n\n' +
        '> **Viktig fälla:** `NOT IN` mot en lista som innehåller NULL returnerar **aldrig några rader**, ' +
        'eftersom jämförelsen blir okänd. Filtrera bort NULL i subqueryn, eller använd NOT EXISTS som är ' +
        'NULL-säker.'
    },
    {
      rubrik: '"Alla"-frågan: division',
      text:
        'Frågan *"Vem har läst samtliga kurser?"* motsvarar relationsalgebrans **division** och har två ' +
        'standardlösningar.\n\n' +
        '**Med COUNT** — jämför antalet kurser studenten läst med totala antalet kurser:\n\n' +
        '```\nSELECT\n    Student.StudentNo,\n    Student.StudentName,\n    COUNT(*) AS Nbr\nFROM\n' +
        '    Student\nJOIN\n    HasStudied ON Student.StudentID = HasStudied.StudentID\nGROUP BY\n' +
        '    Student.StudentNo, Student.StudentName\nHAVING COUNT(HasStudied.CourseID) = (\n' +
        '    SELECT COUNT(CourseID) FROM Course\n);\n```\n\n' +
        '**Med dubbelt NOT EXISTS** — den formulering du bör kunna läsa:\n\n' +
        '```\nSELECT StudentNo, StudentName\nFROM Student s\nWHERE NOT EXISTS (\n' +
        '    SELECT CourseCode\n    FROM Course c\n    WHERE NOT EXISTS (\n        SELECT *\n' +
        '        FROM HasStudied hs\n        WHERE hs.StudentID = s.StudentID\n' +
        '          AND hs.CourseID = c.CourseID))\n```\n\n' +
        'Läs den **inifrån och ut**:\n\n' +
        '- Innersta frågan: har studenten läst just den här kursen?\n' +
        '- Mellersta: hämta de kurser studenten **inte** har läst\n' +
        '- Yttersta: välj de studenter för vilka det **inte finns** någon sådan oläst kurs\n\n' +
        'Alltså: *"studenter för vilka det inte existerar någon kurs de inte läst"* — de som läst alla.'
    },
    {
      rubrik: 'Mängdoperationer',
      text:
        '**UNION** slår ihop två resultatmängder och **tar bort dubbletter**. **UNION ALL** behåller dem. ' +
        'UNION gör extra arbete och är därför långsammare — använd UNION ALL när dubbletter antingen inte ' +
        'kan uppstå eller faktiskt ska behållas.\n\n' +
        '**INTERSECT** ger rader som finns i båda. **EXCEPT** ger rader som finns i den första men inte i ' +
        'den andra.\n\n' +
        '**Union-kompatibilitet** kräver två saker:\n\n' +
        '1. **Lika många kolumner.** Annars: *"All queries combined using a UNION, INTERSECT or EXCEPT ' +
        'operator must have an equal number of expressions in their target lists."*\n' +
        '2. **Kompatibla datatyper** i motsvarande position. Annars: *"Error converting data type varchar ' +
        'to numeric."*\n\n' +
        'Kolumnrubrikerna hämtas från den **första** SELECT-satsen; alias i den andra är kosmetiska.\n\n' +
        '> Farlig fälla: byter du plats på två kolumner av samma typ får du **inget felmeddelande** — ' +
        'bara fel data. Kontrollera alltid att kolumnerna matchar semantiskt, inte bara typmässigt.'
    },
    {
      rubrik: 'När ska man undvika subqueries?',
      text:
        'Kursmaterialet avråder från subqueries **i de fall där en JOIN kan ersätta dem**. Motiveringen är ' +
        'läsbarhet: subqueries kan nästlas i det oändliga och gör frågor svåra och tidsödande att förstå.\n\n' +
        'Men det är en riktlinje, inte ett förbud — *"in some scenarios you may need to use them"*. ' +
        'Exempel där subquery är svårt att undvika:\n\n' +
        '- Jämförelse mot ett aggregat: `WHERE lön > (SELECT AVG(lön) …)`\n' +
        '- "Alla"-frågor med dubbelt NOT EXISTS\n' +
        '- Uppslagning av surrogatnycklar vid INSERT\n\n' +
        'Dessa två frågor ger identiskt resultat — den nedre är lättare att läsa:\n\n' +
        '```\n-- Med subquery\nSELECT StudentNo FROM Student\nWHERE StudentID IN (SELECT StudentID FROM HasStudied);\n\n' +
        '-- Med join\nSELECT DISTINCT s.StudentNo\nFROM Student s\nJOIN HasStudied hs ON s.StudentID = hs.StudentID;\n```\n\n' +
        'Notera att joinvarianten behöver `DISTINCT`, eftersom en student med flera kurser annars ger ' +
        'flera rader.'
    },
    {
      rubrik: 'Vyer',
      text:
        'En vy är en **sparad fråga**. Den lagrar ingen egen data.\n\n' +
        '```\nCREATE VIEW TopStudents AS\nSELECT\n    Student.StudentNo,\n    Student.StudentName AS Name,\n' +
        '    HasStudied.Grade\nFROM\n    Student\nINNER JOIN\n    HasStudied\n' +
        '    ON Student.StudentID = HasStudied.StudentID\nWHERE\n    HasStudied.Grade > 6;\n```\n\n' +
        'Tre syften enligt materialet:\n\n' +
        '- **Förenkla komplexa frågor** och dölja underliggande databasobjekt\n' +
        '- **Begränsa åtkomst** vertikalt (vilka kolumner som syns) och horisontellt (vilka rader)\n' +
        '- **Aggregera tupler**\n\n' +
        'Exemplet ovan illustrerar alla tre: den kapslar in en join, visar bara utvalda kolumner och ' +
        'filtrerar bort rader. Vyn används sedan som vore den en tabell: `SELECT * FROM TopStudents;`'
    }
  ],
  nyckelbegrepp: [
    'Okorrelerad subquery körs en gång; korrelerad körs en gång per kandidatrad',
    '= kräver ett värde, IN klarar en lista, EXISTS bryr sig bara om existens',
    'NOT IN med NULL i listan returnerar aldrig rader — NOT EXISTS är NULL-säker',
    'Tre mönster för frånvaro: LEFT JOIN + IS NULL, NOT IN, NOT EXISTS',
    'Dubbelt NOT EXISTS = "det finns ingen X som inte …" = division',
    'Union-kompatibilitet: lika många kolumner och kompatibla datatyper',
    'Vyer: förenkla, begränsa åtkomst vertikalt och horisontellt, aggregera'
  ],
  tentakoppling:
    'Dubbelt NOT EXISTS är kursens svåraste SQL-konstruktion. Kan du förklara den inifrån och ut ' +
    'klarar du de flesta subquery-frågor.'
}

);
