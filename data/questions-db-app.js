/* =========================================================================
   Frågebank – Databaser: klientutveckling, säkerhet och metadata
   Ämnen: db-klient, db-sakerhet, db-metadata
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ============================ db-klient ============================ */
{
  id: 'db-kli-01',
  delkurs: 'databaser',
  amne: 'db-klient',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är DAO-mönstrets huvudsakliga syfte i kursens exempelapplikation?',
  alternativ: [
    'Att göra SQL-frågorna snabbare',
    'Att kapsla in all databasåtkomst i ett eget lager, så att controllerlagret slipper känna till SQL och JDBC',
    'Att ersätta behovet av en databas',
    'Att automatiskt generera användargränssnittet'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Prestandan avgörs av frågorna och databasen, inte av hur koden är organiserad i klassser.',
    'Rätt. Data Access Object samlar all databasåtkomst på ett ställe. EmployeeDao har metoder som findAll(), findByEmpNo() och save(); controllern anropar dem utan att veta något om SQL, Connection eller ResultSet. Det ger lös koppling mellan lagren.',
    'Fel. DAO:t är tvärtom just den kod som pratar med databasen.',
    'Fel. Gränssnittet definieras i FXML och kopplas ihop av controllern.'
  ],
  forklaring: 'Arkitekturen i exempelappen: GUI i FXML → Controller (MVC) → Data Access Layer (DAO) → JDBC → databas. Den egna undantagsklassen DaoException ger dessutom lös koppling: controllern behöver inte fånga SQLException och därmed inte känna till att det är just en SQL-databas bakom.',
  kalla: '08-09-db-client-application-development.pdf, 10dbclientapplicationsecurity.pdf'
},
{
  id: 'db-kli-02',
  delkurs: 'databaser',
  amne: 'db-klient',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är den viktigaste fördelen med try-with-resources i JDBC-kod?',
  alternativ: [
    'Koden körs snabbare',
    'Connection, PreparedStatement och ResultSet stängs automatiskt, även om ett undantag kastas',
    'SQL-frågan valideras vid kompilering',
    'Databasanslutningen blir krypterad'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Konstruktionen handlar om resurshantering, inte om exekveringshastighet.',
    'Rätt. Resurser som deklareras i try-parentesen stängs automatiskt när blocket lämnas, oavsett om det sker normalt eller genom ett undantag. Utan detta krävs manuella close()-anrop i ett finally-block, och glöms de bort läcker anslutningar tills anslutningspoolen tar slut.',
    'Fel. SQL-strängar är just strängar för Java-kompilatorn; syntaxfel upptäcks först vid körning.',
    'Fel. Kryptering styrs av connection-URL:ens parameter encrypt=true.'
  ],
  forklaring: 'Mönstret ur materialet: try (Connection connection = connectionHandler.getConnection(); PreparedStatement statement = connection.prepareStatement(query); ResultSet resultSet = statement.executeQuery()) { … }. Resurserna stängs i omvänd ordning mot deklarationen.',
  kalla: '08-09-db-client-application-development.pdf'
},
{
  id: 'db-kli-03',
  delkurs: 'databaser',
  amne: 'db-klient',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken metod används för att köra en SELECT-fråga via en PreparedStatement, och vad returnerar den?',
  alternativ: [
    'executeUpdate(), som returnerar antalet påverkade rader',
    'executeQuery(), som returnerar ett ResultSet',
    'execute(), som returnerar en boolean',
    'runQuery(), som returnerar en List'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. executeUpdate() används för INSERT, UPDATE och DELETE och returnerar antalet påverkade rader – inte data.',
    'Rätt. executeQuery() returnerar ett ResultSet, en markörbaserad vy över resultatraderna. Man stegar igenom den med while (resultSet.next()) och läser kolumner med getString(), getInt(), getDouble() osv.',
    'Fel. execute() finns i JDBC-API:t och returnerar en boolean som anger om resultatet är ett ResultSet, men det är inte den metod materialet använder för SELECT.',
    'Fel. Någon metod runQuery() finns inte i JDBC.'
  ],
  forklaring: 'Minnesregel: Query ⇒ frågar efter data ⇒ ResultSet. Update ⇒ ändrar data ⇒ antal rader. Kolumner kan läsas antingen med namn (resultSet.getString("EmpNo")) eller index.',
  kalla: '08-09-db-client-application-development.pdf'
},
{
  id: 'db-kli-04',
  delkurs: 'databaser',
  amne: 'db-klient',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad kännetecknar "total separation of concerns" i exempelapplikationens arkitektur?',
  alternativ: [
    'All kod ligger i en enda klass för att minimera antalet filer',
    'Presentationslagret, affärslogiken och dataåtkomstlagret är åtskilda, och varje lager känner bara till nästa',
    'Varje SQL-fråga har en egen klass',
    'Databasen och applikationen körs på samma dator'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är motsatsen – "poor separation of concerns", där GUI-kod, affärslogik och SQL blandas i samma klass och blir omöjliga att testa eller byta ut var för sig.',
    'Rätt. Vy (FXML) → Controller → DAO → databas. Controllern hanterar användarhändelser och känner bara till DAO:ts metoder; DAO:t känner bara till JDBC och databasen. Byts databasen ut behöver bara DAO-lagret skrivas om.',
    'Fel. Frågor grupperas per entitet i ett DAO (EmployeeDao), inte en klass per fråga.',
    'Fel. Det handlar om fysisk driftsättning (trelagersarkitektur), inte om kodens interna struktur.'
  ],
  forklaring: 'Materialet visar tre nivåer: poor, partial och total separation of concerns. Den egna undantagsklassen DaoException är central för den totala separationen – controllern behöver aldrig importera java.sql.',
  kalla: '08-09-db-client-application-development.pdf'
},
{
  id: 'db-kli-05',
  delkurs: 'databaser',
  amne: 'db-klient',
  typ: 'oppen',
  svarighet: 2,
  fraga: 'Förklara vad en connection URL i JDBC innehåller och varför den inte bör hårdkodas i källkoden.',
  modellsvar:
    'En JDBC connection URL för SQL Server har formen:\n\n' +
    'jdbc:sqlserver://<server>:<port>;database=<db>;user=<användare>;password=<lösenord>;encrypt=true;trustServerCertificate=true;\n\n' +
    'Den innehåller alltså: protokoll och drivrutin (jdbc:sqlserver), serverns adress och port (t.ex. 74.241.165.119:1433), databasnamn, inloggningsuppgifter samt krypteringsparametrar (encrypt och trustServerCertificate krävs från JDBC-drivrutin v10.2 och senare).\n\n' +
    '**Varför inte hårdkoda:**\n\n' +
    '1. **Säkerhet.** Källkod hamnar i versionshantering. Görs ett repository av misstag publikt har alla på internet de uppgifter som krävs för att ansluta till databasen. Materialet ger verkliga exempel: Toyota exponerade en hemlig nyckel på GitHub i fem år.\n\n' +
    '2. **Praktiska problem.** Man kan inte klistra in kod på Stack Overflow eller MSDN för att ställa frågor utan att först sanera den.\n\n' +
    '3. **Utvecklingsmiljöer.** Varje teammedlem kan behöva egna anslutningsuppgifter. Med hårdkodning måste koden ändras lokalt och sedan ändras tillbaka före push, annars förstörs andras miljöer.\n\n' +
    '**Två föreslagna lösningar:**\n\n' +
    '- Systemmiljövariabler, lästa med System.getenv("DATABASE_USER_PASSWORD"). Uppgifterna ligger då i operativsystemet, inte i koden.\n' +
    '- En properties-fil (key=value) som undantas från versionshantering, läst via Properties och getResourceAsStream. Lägg till filen i .gitignore och committa en .env.example eller motsvarande med enbart nyckelnamnen.\n\n' +
    'I båda fallen byggs URL:en ihop i en ConnectionHandler-klass, så att resten av applikationen aldrig ser uppgifterna.',
  nyckelpunkter: [
    'Innehåll: drivrutin, server, port, databasnamn, användare, lösenord, krypteringsparametrar',
    'Hårdkodning läcker hemligheter via versionshantering (Toyota-exemplet)',
    'Försvårar kodutbyte och delning mellan utvecklingsmiljöer',
    'Lösning 1: systemmiljövariabler via System.getenv()',
    'Lösning 2: properties-fil utanför versionshanteringen; dokumentera nycklarna i README'
  ],
  kalla: '10dbclientapplicationsecurity.pdf, codingstandards.pdf'
},

/* =========================== db-sakerhet =========================== */
{
  id: 'db-sak-01',
  delkurs: 'databaser',
  amne: 'db-sakerhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är det grundläggande felet i koden nedan?',
  kod: 'String query = "INSERT INTO Employee (EmpNo, EmpName, EmpSalary) VALUES ("\n    + "\'" + employee.getEmployeeNumber() + "\', "\n    + "\'" + employee.getName() + "\', "\n    + employee.getSalary() + ")";\nPreparedStatement statement = connection.prepareStatement(query);\nstatement.executeUpdate();',
  alternativ: [
    'PreparedStatement används inte alls',
    'Användarindata konkateneras direkt in i SQL-strängen istället för att skickas som parametrar',
    'Frågan saknar semikolon på slutet',
    'executeUpdate() ska vara executeQuery()'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. PreparedStatement används – men helt utan effekt, eftersom strängen redan är färdigbyggd när den skickas in. Materialet kallar det uttryckligen "misuse of PreparedStatement".',
    'Rätt. Eftersom värdena konkateneras in i strängen tolkas de som SQL-kod. En användare som skriver namnet "lol pwned\', 1337); DELETE Employee; --" får sin text inbakad i satsen: fnutten avslutar strängvärdet, semikolonet avslutar satsen, DELETE Employee körs och -- kommenterar bort resten. Hela tabellen töms.',
    'Fel. Semikolon behövs inte i JDBC-frågesträngar.',
    'Fel. executeUpdate() är korrekt för INSERT.'
  ],
  forklaring: 'Skyddet är att använda platshållare och sättermetoder: prepareStatement("INSERT … VALUES (?, ?, ?)") följt av statement.setString(1, …), setString(2, …), setDouble(3, …). Då behandlas indata alltid som *värden*, aldrig som kod – injektionssträngen sparas som ett kuriöst men ofarligt namn.',
  kalla: '10dbclientapplicationsecurity.pdf'
},
{
  id: 'db-sak-02',
  delkurs: 'databaser',
  amne: 'db-sakerhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken roll spelar de dubbla bindestrecken (--) i en SQL-injektionssträng?',
  alternativ: [
    'De avslutar den injicerade satsen',
    'De kommenterar bort resten av den ursprungliga frågan så att inget syntaxfel uppstår',
    'De escapear enkelfnuttar',
    'De byter databas'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Satser avslutas med semikolon (;).',
    'Rätt. Efter den injicerade koden finns rester av den ursprungliga frågan kvar, i exemplet ", 99999)". Utan -- skulle det ge ett syntaxfel och hela satsen avvisas. Kommentaren gör att resten ignoreras och attacken kan lyckas.',
    'Fel. Enkelfnuttar escapeas genom fördubbling (\'\'), inte med bindestreck.',
    'Fel. Byte av databas görs med USE, som dessutom inte kan förekomma mitt i en INSERT.'
  ],
  forklaring: 'Anatomin i en injektion: (1) fnutt som bryter ut ur strängvärdet, (2) semikolon som avslutar den legitima satsen, (3) den skadliga koden, (4) -- som kommenterar bort resten. Parametriserade frågor omintetgör alla fyra stegen, eftersom indata aldrig tolkas som SQL.',
  kalla: '10dbclientapplicationsecurity.pdf'
},
{
  id: 'db-sak-03',
  delkurs: 'databaser',
  amne: 'db-sakerhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad menas med en attack mot beroenden (supply chain-attack) i föreläsningens exempel?',
  alternativ: [
    'Att angriparen fysiskt tar sig in i datacentret',
    'Att en tredjepartsbibliotek som applikationen använder komprometteras och får skadlig kod injicerad',
    'Att databasservern överbelastas med förfrågningar',
    'Att användaren luras att lämna ut sitt lösenord'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är ett fysiskt intrång, en annan kategori av hot.',
    'Rätt. Moderna projekt drar in många beroenden – i materialets pom.xml t.ex. mssql-jdbc, OkHttp och JavaFX. Kompromissas ett sådant paket i sin källa (som i de omtalade npm-fallen med debug och chalk) körs angriparens kod i alla applikationer som hämtar den nya versionen. Exempelkoden i föreläsningen läser av användarens Ethereum-plånbok.',
    'Fel. Det beskriver en överbelastningsattack.',
    'Fel. Det är nätfiske (phishing).'
  ],
  forklaring: 'Poängen är att applikationens säkerhet inte bara beror på den egna koden. Varje beroende är en förtroendelänk. Motmedel: lås versioner, granska nya beroenden och håll antalet nere.',
  kalla: '10dbclientapplicationsecurity.pdf'
},
{
  id: 'db-sak-04',
  delkurs: 'databaser',
  amne: 'db-sakerhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'I SQL-uppgiftens Task 2 ska varje grupp ge en annan grupp läsåtkomst. Vilken behörighetsnivå ska kontot ha?',
  alternativ: [
    'Administratörsrättigheter, så att den andra gruppen kan felsöka',
    'Ett SQL Server-inloggningskonto med rollen public och enbart läsrättigheter – inte RDP-åtkomst till operativsystemet',
    'Ett Windows-konto med fjärrskrivbordsåtkomst',
    'Samma konto som gruppen själv använder'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det bryter mot principen om minsta möjliga behörighet, och uppgiften går uttryckligen ut på att inte ge för höga rättigheter.',
    'Rätt. Uppgiften specificerar ett SQL Server-inloggningskonto (inte ett Windows-konto) med starkt lösenord, serverrollen public och läsåtkomst till databasen – "but not more!". Den andra gruppen får inte RDP-ansluta till operativsystemet.',
    'Fel. RDP ger åtkomst till servern som helhet och är uttryckligen förbjudet i uppgiften.',
    'Fel. Det egna kontot har högre behörighet och delade inloggningar omöjliggör spårbarhet.'
  ],
  forklaring: 'Uppgiften låter grupperna verifiera varandras konfiguration genom att testa destruktiva kommandon (DELETE Employee, DROP TABLE Car, DROP DATABASE Hospital). Lyckas något av dem har behörigheterna satts fel. Detta är principen om minsta möjliga behörighet i praktiken.',
  kalla: 'databasessqlassignment.pdf Task 2'
},
{
  id: 'db-sak-05',
  delkurs: 'databaser',
  amne: 'db-sakerhet',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Beskriv hur en SQL-injektionsattack fungerar och vilka motmedel som finns. Utgå från exempelapplikationen i föreläsningen.',
  modellsvar:
    '**Förutsättningen** är att applikationen bygger sina SQL-frågor genom strängkonkatenering av användarindata. En angripare kan gissa att det som skrivs i formuläret hamnar i en fråga till databasen.\n\n' +
    '**Angreppet:** I fältet för namn skrivs istället för ett namn strängen\n\n' +
    "lol pwned', 1337); DELETE Employee; --\n\n" +
    'Den färdigbyggda frågan blir då:\n\n' +
    "INSERT INTO Employee (EmpNo, EmpName, EmpSalary) VALUES (\'E9\', \'lol pwned\', 1337); DELETE Employee; --, 99999)\n\n" +
    'Fyra delar samverkar: enkelfnutten avslutar strängvärdet i förtid, semikolonet avslutar den legitima satsen, DELETE Employee är angriparens egna kod, och de dubbla bindestrecken kommenterar bort resten så att inget syntaxfel uppstår. Resultatet är att hela Employee-tabellen töms.\n\n' +
    '**Huvudmotmedlet – parametriserade frågor:**\n\n' +
    'String query = "INSERT INTO Employee (EmpNo, EmpName, EmpSalary) VALUES (?, ?, ?)";\n' +
    'statement.setString(1, employee.getEmployeeNumber());\n' +
    'statement.setString(2, employee.getName());\n' +
    'statement.setDouble(3, employee.getSalary());\n\n' +
    'Nu skickas frågans struktur och dess värden separat till databasen. Injektionssträngen behandlas som ett textvärde och sparas som ett underligt namn – ingen godtycklig kodexekvering är längre möjlig.\n\n' +
    '**Kompletterande skyddsåtgärder:**\n\n' +
    '- Minsta möjliga behörighet: applikationens databaskonto ska inte ha rätt att droppa tabeller eller databaser.\n' +
    '- Validering av indata i applikationslagret (kompletterar, ersätter aldrig, parametrisering).\n' +
    '- CHECK-constraints och andra integritetsvillkor i databasen som ett extra skyddsnät.\n' +
    '- Felmeddelanden som inte avslöjar databasstruktur för slutanvändaren.\n\n' +
    'Notera särskilt att enbart *använda* PreparedStatement inte skyddar. Konkateneras strängen ihop innan den skickas till prepareStatement() är sårbarheten kvar – det är platshållarna och sättermetoderna som gör jobbet.',
  nyckelpunkter: [
    'Orsak: strängkonkatenering av användarindata till SQL-kod',
    'Injektionens fyra delar: fnutt, semikolon, skadlig kod, kommentar (--)',
    'Huvudmotmedel: platshållare (?) plus setString/setInt/setDouble',
    'PreparedStatement i sig skyddar inte – platshållarna måste faktiskt användas',
    'Djupförsvar: minsta behörighet, indatavalidering, constraints, återhållsamma felmeddelanden'
  ],
  kalla: '10dbclientapplicationsecurity.pdf'
},

/* =========================== db-metadata =========================== */
{
  id: 'db-met-01',
  delkurs: 'databaser',
  amne: 'db-metadata',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken systemdatabas fungerar som mall för alla nya databaser som skapas i en SQL Server-instans?',
  alternativ: ['master', 'model', 'msdb', 'tempdb'],
  ratt: 1,
  forklaringar: [
    'Fel. master lagrar systeminformation om själva instansen: inloggningskonton, endpoints, länkade servrar, systeminställningar och vilka databaser som finns.',
    'Rätt. model är mallen. När CREATE DATABASE körs skapas delar av den nya databasen utifrån models innehåll. Ändras model ärver alla databaser som skapas *därefter* ändringarna.',
    'Fel. msdb används av SQL Server Agent och SSMS för schemaläggningsinformation samt backup- och återställningshistorik.',
    'Fel. tempdb är en global resurs för tillfälliga tabeller och procedurer. Den återskapas från grunden varje gång SQL Server startar – ingenting där sparas mellan sessioner.'
  ],
  forklaring: 'De fyra systemdatabaserna har database_id 1–4. Därför kan man lista användarskapade databaser med WHERE database_id > 4. Materialet påminner om att alltid säkerhetskopiera model och msdb innan man ändrar dem.',
  kalla: '11metadatainrelationaldbs.pdf'
},
{
  id: 'db-met-02',
  delkurs: 'databaser',
  amne: 'db-metadata',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan sys-vyerna och INFORMATION_SCHEMA?',
  alternativ: [
    'Ingen skillnad, de är synonymer',
    'sys-vyerna används främst för metadata på instansnivå, INFORMATION_SCHEMA för metadata på databasnivå',
    'sys innehåller data, INFORMATION_SCHEMA innehåller metadata',
    'INFORMATION_SCHEMA finns bara i master-databasen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. De har olika omfattning och delvis olika innehåll – sys.default_constraints har t.ex. ingen motsvarighet i INFORMATION_SCHEMA.',
    'Rätt. Materialets uppdelning: instansnivå via sys-vyer (sys.databases, sys.sql_logins, sys.server_principals) och databasnivå via INFORMATION_SCHEMA (COLUMNS, TABLES, TABLE_CONSTRAINTS). Det finns dock även sys-vyer på databasnivå, t.ex. sys.tables och sys.objects.',
    'Fel. Båda innehåller metadata – data om data, inte verksamhetsdata.',
    'Fel. Varje användardatabas har sina egna INFORMATION_SCHEMA-vyer.'
  ],
  forklaring: 'Bakgrunden är att master lagrar det mesta i skyddade, dolda systemtabeller. Vyerna är det publika gränssnittet mot dem – användaren behöver då inte känna till de dolda tabellernas struktur.',
  kalla: '11metadatainrelationaldbs.pdf'
},
{
  id: 'db-met-03',
  delkurs: 'databaser',
  amne: 'db-metadata',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad returnerar ResultSetMetaData.getColumnName() för frågan nedan?',
  kod: "SELECT\n    EmpNo AS No,\n    EmpName AS Name,\n    'Test' AS TestColumn\nFROM Employee;",
  alternativ: [
    'EmpNo, EmpName och TestColumn',
    'No, Name och TestColumn – alltså aliasen, inte de underliggande kolumnnamnen',
    'Endast EmpNo och EmpName, eftersom TestColumn inte finns i tabellen',
    'Tabellens samtliga kolumnnamn'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Metadatan hämtas från resultatmängden, inte från tabelldefinitionen, och där gäller aliasen.',
    'Rätt. ResultSetMetaData beskriver *resultatmängden*. Kolumnerna heter därför No, Name och TestColumn, med kolumnantalet 3. Notera att TestColumn får typen varchar och isNullable 0, trots att den bara är en konstant.',
    'Fel. Litteralen bildar en fullvärdig kolumn i resultatmängden med egen metadata.',
    'Fel. Endast de kolumner som SELECT-satsen faktiskt producerar ingår.'
  ],
  forklaring: 'Skillnaden är viktig: ResultSetMetaData beskriver resultatet av just den frågan och ändras när SELECT-satsen ändras. Vill man ha den faktiska tabelldefinitionen måste man fråga INFORMATION_SCHEMA.COLUMNS – då får man med EmployeeID, EmpNo, EmpName och EmpSalary oavsett hur frågan såg ut.',
  kalla: '11metadatainrelationaldbs.pdf'
},
{
  id: 'db-met-04',
  delkurs: 'databaser',
  amne: 'db-metadata',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Skriv en metadatafråga som listar alla nullbara kolumner av typen varchar i den aktuella databasen. Visa kolumnens position, namn, tabell, datatyp och nullbarhet.',
  modellsvar:
    "SELECT\n" +
    "    ORDINAL_POSITION,\n" +
    "    COLUMN_NAME,\n" +
    "    TABLE_NAME,\n" +
    "    DATA_TYPE,\n" +
    "    IS_NULLABLE\n" +
    "FROM\n" +
    "    INFORMATION_SCHEMA.COLUMNS\n" +
    "WHERE\n" +
    "    DATA_TYPE = 'varchar'\n" +
    "    AND IS_NULLABLE = 'YES';",
  steg: [
    'Kolumnmetadata på databasnivå finns i vyn INFORMATION_SCHEMA.COLUMNS.',
    'Vyn har många kolumner, så räkna upp de intressanta istället för att köra SELECT *.',
    "Filtrera på datatyp: DATA_TYPE = 'varchar'. Värdet lagras med gemener.",
    "Filtrera på nullbarhet: IS_NULLABLE är en sträng med värdet 'YES' eller 'NO' – inte en boolean eller en bit.",
    'Kör vid behov USE <databasnamn> först, eftersom INFORMATION_SCHEMA alltid avser den aktuella databasen.'
  ],
  forklaring: 'Klassisk fallgrop: att skriva IS_NULLABLE = 1 eller IS_NULLABLE = true. Kolumnen är en textsträng. Detsamma gäller DATA_TYPE, som jämförs mot gemena typnamn.',
  kalla: '11metadatainrelationaldbs.pdf'
},
{
  id: 'db-met-05',
  delkurs: 'databaser',
  amne: 'db-metadata',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Skriv en fråga som listar alla användarskapade tabeller i databaserna Company och Hospital i samma resultatmängd, med en kolumn som visar vilken databas varje tabell tillhör.',
  modellsvar:
    "SELECT\n" +
    "    object_id,\n" +
    "    name,\n" +
    "    type,\n" +
    "    type_desc,\n" +
    "    'Company' AS dbname\n" +
    "FROM\n" +
    "    Company.sys.objects\n" +
    "WHERE\n" +
    "    type = 'U'\n" +
    "UNION\n" +
    "SELECT\n" +
    "    object_id,\n" +
    "    name,\n" +
    "    type,\n" +
    "    type_desc,\n" +
    "    'Hospital' AS dbname\n" +
    "FROM\n" +
    "    Hospital.sys.objects\n" +
    "WHERE\n" +
    "    type = 'U';",
  steg: [
    'sys.objects innehåller metadata om databasobjekt av många slag; typkoden U betyder User Table.',
    'Det finns ingen instansövergripande motsvarighet till sys.objects, så varje databas måste frågas separat.',
    'Trepartsnamn (databas.schema.objekt) gör att man kan nå en annan databas vy utan att byta kontext med USE.',
    'Eftersom sys.objects inte innehåller något databasnamn måste det läggas till som en strängliteral med alias.',
    'UNION staplar de två resultatmängderna. Kolumnerna är union-kompatibla eftersom de har samma antal, ordning och typer.'
  ],
  forklaring: 'Mönstret "strängliteral som ursprungsmarkör + UNION" är standardlösningen när man ska slå ihop likadana resultat från flera källor och behöva veta varifrån varje rad kom.',
  kalla: '11metadatainrelationaldbs.pdf'
}

);
