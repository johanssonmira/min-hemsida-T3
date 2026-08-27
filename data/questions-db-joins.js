/* =========================================================================
   Frågebank – Databaser: joins, subqueries och mängdoperationer
   Ämnen: db-sql-join, db-sql-subquery
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ========================== db-sql-join ========================== */
{
  id: 'db-sqlj-01',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'En kartesisk produkt mellan en tabell med 3 rader/5 kolumner och en med 3 rader/3 kolumner ger:',
  alternativ: [
    '3 rader och 8 kolumner',
    '9 rader och 8 kolumner',
    '6 rader och 15 kolumner',
    '9 rader och 15 kolumner'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Radantalet multipliceras, det behålls inte. Endast kolumnantalet (8) stämmer.',
    'Rätt. Kartesisk produkt parar ihop varje rad i den ena tabellen med varje rad i den andra: 3 × 3 = 9 rader. Kolumnerna läggs ihop: 5 + 3 = 8.',
    'Fel. Både rad- och kolumnberäkningen är felaktig – kolumnerna adderas (5+3=8), de multipliceras inte.',
    'Fel. Radantalet stämmer, men kolumnerna adderas till 8, inte multipliceras till 15.'
  ],
  forklaring: 'Regel: rader multipliceras (m × n), kolumner adderas (p + q). En INNER JOIN är formellt en kartesisk produkt följd av en selektion på join-villkoret – därför blir en glömd ON-sats så förödande.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlj-02',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan JOIN och INNER JOIN i SQL Server?',
  alternativ: [
    'JOIN inkluderar rader utan matchning, INNER JOIN gör det inte',
    'Ingen skillnad – JOIN är en förkortning av INNER JOIN',
    'JOIN kräver en WHERE-sats, INNER JOIN kräver ON',
    'JOIN fungerar bara mellan två tabeller, INNER JOIN mellan flera'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Att inkludera rader utan matchning är just vad en OUTER JOIN gör (LEFT, RIGHT eller FULL).',
    'Rätt. Kursmaterialet visar de två varianterna sida vid sida med kommentaren "same as inner join". INNER är standardvärdet om inget annat anges.',
    'Fel. Båda formerna använder ON. WHERE-varianten är den äldre, implicita join-syntaxen (FROM A, B WHERE …).',
    'Fel. Båda formerna kan kedjas för trevägsjoins och fler.'
  ],
  forklaring: 'INNER är default. Skriv gärna ut INNER JOIN för tydlighet – det gör det uppenbart för läsaren att rader utan matchning avsiktligt utesluts.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlj-03',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad returnerar frågan nedan? Car innehåller tre bilar varav C3 (Tesla) saknar ägare, och Student innehåller tre studenter varav S3 (Rachel) saknar bil.',
  kod: "SELECT\n    Student.StudentNo,\n    Student.StudentName AS Name,\n    Car.CarNo,\n    Car.Brand\nFROM\n    Car\nLEFT OUTER JOIN\n    Student\n    ON Car.StudentID = Student.StudentID;",
  alternativ: [
    'Två rader – bara de bilar som faktiskt har en ägare kommer med',
    'Tre rader – alla bilar, där Tesla får NULL i studentkolumnerna',
    'Fyra rader – alla bilar plus alla studenter som saknar bil',
    'Tre rader – alla studenter, där Rachel får NULL i bilkolumnerna'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det vore resultatet av en INNER JOIN, som kastar bort rader utan matchning.',
    'Rätt. LEFT OUTER JOIN behåller alla rader från tabellen till vänster om JOIN – här Car. Tesla (C3) har StudentID NULL och får därför NULL i StudentNo och Name. Rachel syns inte alls, eftersom Student står till höger.',
    'Fel. Att få med både obemannade bilar och bilfria studenter kräver FULL OUTER JOIN.',
    'Fel. Det beskriver RIGHT OUTER JOIN i denna fråga, eftersom Student står till höger om JOIN.'
  ],
  forklaring: 'Minnesregel från kursmaterialet: titta på vad som står till *vänster* respektive *höger* om JOIN-nyckelordet. FROM Car LEFT OUTER JOIN Student ⇒ alla rader från Car behålls.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlj-04',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Varför ger frågan nedan ett felaktigt svar på affärsfrågan "Vilka studenter bor på samma adress som varandra?"',
  kod: "SELECT\n    Student1.StudentNo,\n    Student1.StudentName,\n    Student1.StudentAddress\nFROM\n    Student AS Student1,\n    Student AS Student2\nWHERE\n    Student1.StudentAddress = Student2.StudentAddress;",
  alternativ: [
    'Aliasen Student1 och Student2 är inte tillåtna eftersom det är samma tabell',
    'Varje student matchar sig själv, så alla studenter kommer med – även de som bor ensamma',
    'WHERE-satsen borde ha använt LIKE i stället för = vid jämförelse av adresser',
    'Man måste använda INNER JOIN, eftersom kommaseparerade tabeller är otillåtna'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Alias är tvärtom nödvändigt vid självjoin – utan dem får man felet "The objects … have the same exposed names".',
    'Rätt. Eftersom både Student1 och Student2 är samma tabell matchar varje rad alltid sig själv (Chloes adress = Chloes adress). Resultatet blir därför alla studenter, oavsett om någon annan delar adressen. Fixen är ett extra villkor: AND Student1.StudentNo <> Student2.StudentNo.',
    'Fel. LIKE utan wildcards beter sig som =; problemet är logiskt, inte syntaktiskt.',
    'Fel. Kommaseparerad syntax är tillåten (implicit join). Kursmaterialet använder den medvetet för att demonstrera teta- och självjoins.',
    ],
  forklaring: 'Klassisk fallgrop i självjoins: raden matchar sig själv. Lägg alltid till ett villkor som utesluter identiteten, t.ex. AND A.PK <> B.PK. Kursmaterialet visar samma fel två gånger ("How to Fail at Self Join") innan den korrekta lösningen presenteras.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlj-05',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'I den rekursiva självjoinen nedan – vad besvarar frågan?',
  kod: "SELECT\n    emp.EmpNo AS EmployeeNo,\n    man.EmpNo AS ManagerNo\nFROM\n    Employee AS emp\nINNER JOIN\n    Employee AS man\n    ON emp.ManagerID = man.EmployeeID\nWHERE\n    emp.Salary > man.Salary;",
  alternativ: [
    'Vilka chefer som tjänar mer än sina anställda',
    'Vilka anställda som tjänar mer än sin egen chef',
    'Vilka anställda som saknar chef',
    'Den genomsnittliga lönen per chef'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det vore villkoret man.Salary > emp.Salary, alltså omvänt.',
    'Rätt. emp representerar den anställde och man dess chef (kopplade via emp.ManagerID = man.EmployeeID). Villkoret emp.Salary > man.Salary plockar ut de anställda vars lön överstiger chefens. Med materialets data blir svaret E2 (20000 > 10000) och E5 (8000 > 5000).',
    'Fel. Anställda utan chef har ManagerID = NULL och faller bort helt i en INNER JOIN, eftersom NULL aldrig matchar.',
    'Fel. Ingen aggregering förekommer i frågan – ingen AVG och ingen GROUP BY.'
  ],
  forklaring: 'Vid självjoin: bestäm först vilken roll varje alias har. Här är emp "den anställde" och man "chefen". Läs sedan villkoren utifrån rollerna. Notera att Bob (E1), som saknar chef, aldrig kan komma med i en INNER JOIN.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqlj-06',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför förekommer kolumnen UnitID två gånger i resultatet av SELECT * FROM Patient JOIN Unit ON Patient.UnitID = Unit.UnitID?',
  alternativ: [
    'Det är en känd bugg i SQL Server som visar join-kolumnen dubbelt i resultatet',
    'SELECT * hämtar alla kolumner från båda tabellerna, som båda har UnitID',
    'JOIN duplicerar alltid join-kolumnen som en kontroll av att villkoret stämmer',
    'Därför att UnitID är en främmande nyckel och sådana visas alltid två gånger'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Beteendet är förväntat och följer direkt av vad SELECT * betyder.',
    'Rätt. Joinen bygger en bred rad av samtliga kolumner från båda tabellerna. Patient har en UnitID (främmande nyckel) och Unit har en UnitID (primärnyckel) – båda följer med. Anger man explicita kolumner i SELECT försvinner dubbletten.',
    'Fel. Ingen kontrollmekanism duplicerar kolumner; det är bara summan av båda tabellernas kolumner.',
    'Fel. Att kolumnen är en FK förklarar varför den *finns* i båda tabellerna, men det är SELECT * som gör att båda *visas*.'
  ],
  forklaring: 'Ännu ett skäl att undvika SELECT *: dubbletter av join-kolumner och onödig datamängd. Kursmaterialet rekommenderar att alltid räkna upp kolumnerna explicit, gärna med tabellprefix och AS-alias.',
  kalla: '01introduction.pdf, 02-03-sql.pdf'
},
{
  id: 'db-sqlj-07',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Hospital-databasen: hämta namnen på alla anställda som arbetar på avdelningen General Surgery. Tabeller: Employee (…, UnitID) och Unit (UnitID, UnitNo, UnitName, UnitAddress).',
  modellsvar:
    "SELECT\n    Employee.EmpName AS Name\nFROM\n    Employee\nINNER JOIN\n    Unit\n    ON Employee.UnitID = Unit.UnitID\nWHERE\n    Unit.UnitName = 'General Surgery';",
  steg: [
    'Namnet på den anställde finns i Employee, men avdelningens namn finns i Unit – två tabeller behövs.',
    'Kopplingen går via surrogatnyckeln UnitID, som är primärnyckel i Unit och främmande nyckel i Employee.',
    'INNER JOIN är rätt val: anställda utan avdelning ska inte med, och avdelningar utan anställda är irrelevanta här.',
    "Filtrera på avdelningens namn i WHERE: Unit.UnitName = 'General Surgery'.",
    'Prefixa kolumnerna med tabellnamn för läsbarhet, särskilt eftersom UnitID finns i båda tabellerna.'
  ],
  forklaring: 'Med testdatan tillhör E1 (Anna), E2 (Eva) och E6 (Peter) enheten U1 General Surgery. Alternativt kan man filtrera på Unit.UnitNo = \'U1\', men att filtrera på namnet är närmare affärsfrågans formulering.',
  kalla: 'databasessqlassignment.pdf fråga 16'
},
{
  id: 'db-sqlj-08',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: skriv ut registreringsnumren på alla bilar som saknar ägare, med texten "No owner!" i en extra kolumn.',
  modellsvar:
    "SELECT\n    LicenseNo AS License,\n    'No owner!' AS Status\nFROM\n    Car\nWHERE\n    EmployeeID IS NULL;",
  steg: [
    'Kolumnen Car.EmployeeID är nullbar – NULL betyder att bilen saknar ägare.',
    'Filtrera med IS NULL. Skriv aldrig = NULL, det returnerar alltid tomt.',
    "Den extra kolumnen skapas genom att välja en strängkonstant: 'No owner!' AS Status.",
    'Konstanten upprepas för varje returnerad rad – precis som i materialets exempel med \'Test\' AS Name.',
    'Ge konstanten ett alias, annars visas kolumnrubriken som "(No column name)".'
  ],
  forklaring: 'Två tekniker kombineras: NULL-hantering med IS NULL och literaler i SELECT-listan. Med testdatan blir svaret C1 och C6, som båda har EmployeeID NULL.',
  kalla: 'databasessqlassignment.pdf fråga 8'
},
{
  id: 'db-sqlj-09',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namnen på alla anställda som INTE har någon bil, med texten "No car" i en extra kolumn. Ge minst tre olika lösningar.',
  modellsvar:
    "-- Lösning 1: LEFT OUTER JOIN + IS NULL\nSELECT\n    Employee.EmpName AS Name,\n    'No car' AS CarStatus\nFROM\n    Employee\nLEFT OUTER JOIN\n    Car\n    ON Employee.EmployeeID = Car.EmployeeID\nWHERE\n    Car.CarID IS NULL;\n\n" +
    "-- Lösning 2: NOT IN med subquery\nSELECT\n    EmpName AS Name,\n    'No car' AS CarStatus\nFROM\n    Employee\nWHERE\n    EmployeeID NOT IN (\n        SELECT EmployeeID\n        FROM Car\n        WHERE EmployeeID IS NOT NULL\n    );\n\n" +
    "-- Lösning 3: NOT EXISTS (korrelerad subquery)\nSELECT\n    EmpName AS Name,\n    'No car' AS CarStatus\nFROM\n    Employee\nWHERE\n    NOT EXISTS (\n        SELECT 1\n        FROM Car\n        WHERE Car.EmployeeID = Employee.EmployeeID\n    );",
  steg: [
    'Affärsfrågan handlar om frånvaro av en koppling – det utesluter en ren INNER JOIN.',
    'LEFT OUTER JOIN behåller alla anställda; de utan bil får NULL i Car-kolumnerna, vilket fångas av WHERE Car.CarID IS NULL.',
    'NOT IN jämför mot en lista av EmployeeID hämtade ur Car. VIKTIGT: filtrera bort NULL i subqueryn – NOT IN med NULL i listan returnerar aldrig några rader alls.',
    'NOT EXISTS är korrelerad: den inre frågan körs en gång per anställd och kollar om det finns någon matchande bil. SELECT 1 räcker eftersom endast existensen spelar roll.',
    'Med testdatan blir svaret Peter (E6), som är den enda anställd utan bil.'
  ],
  forklaring: 'De tre mönstren för "hitta rader utan matchning" är LEFT JOIN + IS NULL, NOT IN och NOT EXISTS. NOT EXISTS är oftast säkrast eftersom den hanterar NULL korrekt utan extra villkor.',
  kalla: 'databasessqlassignment.pdf fråga 7'
},
{
  id: 'db-sqlj-10',
  delkurs: 'databaser',
  amne: 'db-sql-join',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namn och adress för samtliga anställda OCH samtliga patienter i en och samma resultatmängd.',
  modellsvar:
    "SELECT\n    EmpName AS Name,\n    EmpAddress AS Address\nFROM\n    Employee\nUNION\nSELECT\n    PatientName AS Name,\n    PatientAddress AS Address\nFROM\n    Patient;",
  steg: [
    'Detta är inte en join – vi vill lägga resultatmängderna *under* varandra, inte bredvid.',
    'UNION kräver union-kompatibilitet: samma antal kolumner i samma ordning och med kompatibla datatyper.',
    'Här matchar VARCHAR mot VARCHAR i båda kolumnerna, så kompatibiliteten är uppfylld.',
    'Kolumnrubrikerna hämtas från den *första* SELECT-satsen; aliasen i den andra är kosmetiska.',
    'UNION tar bort dubbletter. Vill man behålla dem (t.ex. om samma person är både anställd och patient med samma adress) används UNION ALL.'
  ],
  forklaring: 'Skillnaden mot JOIN är avgörande: JOIN kombinerar kolumner från olika tabeller på samma rad, UNION staplar rader från olika frågor. Ett vanligt fel är att försöka lösa "både A och B"-frågor med en join.',
  kalla: 'databasessqlassignment.pdf fråga 34, 02-03-sql.pdf'
},

/* ======================== db-sql-subquery ======================== */
{
  id: 'db-sqls-01',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad kännetecknar en KORRELERAD subquery jämfört med en vanlig subquery?',
  alternativ: [
    'Den är alltid snabbare eftersom resultatet kan cachas mellan raderna',
    'Den refererar till en kolumn i den yttre frågan och körs en gång per kandidatrad',
    'Den får bara returnera ett enda värde, aldrig en hel kolumn med rader',
    'Den måste stå i SELECT-satsen och får aldrig förekomma i WHERE-satsen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är snarare tvärtom – korrelerade subqueries kan vara långsammare, eftersom den inre frågan körs upprepade gånger istället för en enda gång.',
    'Rätt. En vanlig (oberoende) subquery utvärderas en gång och skickar sitt resultat till den yttre frågan. En korrelerad subquery innehåller en referens till den yttre frågan, t.ex. WHERE StudentID = Student.StudentID, och måste därför köras om för varje rad den yttre frågan överväger.',
    'Fel. Det gäller skalära subqueries (de som används med =, <, > osv.), oavsett om de är korrelerade eller inte.',
    'Fel. Korrelerade subqueries förekommer typiskt just i WHERE, ofta tillsammans med EXISTS eller NOT EXISTS.'
  ],
  forklaring: 'Testet: innehåller den inre frågan en referens till den yttre tabellen? Då är den korrelerad och kan inte köras fristående. Kursmaterialet illustrerar detta genom att expandera den korrelerade frågan till en iteration per StudentID (1, 2, 3, 4).',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-02',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför ger frågan nedan felet "Subquery returned more than 1 value"?',
  kod: "SELECT *\nFROM Student\nWHERE StudentAddress = (\n    SELECT StudentAddress\n    FROM Student\n    WHERE StudentAddress LIKE '%street'\n);",
  alternativ: [
    'Därför att man inte får använda samma tabell i både yttre och inre frågan',
    'Därför att = kräver ett enda värde, men subqueryn returnerar flera rader',
    'Därför att LIKE inte får användas tillsammans med en subquery i WHERE',
    'Därför att SELECT * inte är tillåtet tillsammans med subqueries'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Att referera till samma tabell i båda nivåerna är fullt tillåtet och används ofta.',
    'Rätt. Jämförelseoperatorerna =, !=, <, <=, > och >= förutsätter ett skalärt värde på höger sida. Här matchar flera studenter mönstret \'%street\', så subqueryn returnerar flera rader. Lösningen är att byta = mot IN.',
    'Fel. LIKE fungerar utmärkt i subqueries; det är operatorn på den yttre nivån som är problemet.',
    'Fel. SELECT * är tillåtet här – felet uppstår oavsett vilka kolumner som väljs.'
  ],
  forklaring: 'Välj operator efter hur många värden subqueryn kan ge: = för exakt ett värde, IN för en lista, EXISTS när bara existensen spelar roll. Felmeddelandet räknar självt upp de operatorer som kräver ett skalärt värde.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-03',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför avråder kursmaterialet från subqueries när en JOIN kan användas istället?',
  alternativ: [
    'Subqueries ger alltid fel resultat när de kombineras med aggregatfunktioner',
    'Subqueries kan nästlas obegränsat och gör frågor svåra och tidsödande att läsa och förstå',
    'Subqueries stöds inte av SQL Server utan bara av andra databashanterare',
    'Subqueries kräver administratörsbehörighet i databasen för att få köras'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Subqueries ger korrekta resultat när de används rätt – materialet påpekar dessutom att de ibland är nödvändiga.',
    'Rätt. Motiveringen i materialet är läsbarhet och underhållbarhet: subqueries kan nästlas i det oändliga och blir då svåra och tidsödande att förstå. En JOIN är oftast plattare och lättare att följa.',
    'Fel. SQL Server har fullt stöd för subqueries på alla nivåer.',
    'Fel. Behörigheter påverkar inte vilka frågekonstruktioner som är tillåtna.'
  ],
  forklaring: 'Rekommendationen är en riktlinje, inte ett förbud: "in some scenarios you may need to use them". Exempel där subquery är svårt att undvika: jämförelse mot ett aggregat (WHERE lön > (SELECT AVG(lön) …)) eller "alla"-frågor med dubbelt NOT EXISTS.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-04',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vilken affärsfråga besvarar konstruktionen med dubbelt NOT EXISTS nedan?',
  kod: "SELECT StudentNo, StudentName\nFROM Student s\nWHERE NOT EXISTS (\n    SELECT CourseCode\n    FROM Course c\n    WHERE NOT EXISTS (\n        SELECT *\n        FROM HasStudied hs\n        WHERE hs.StudentID = s.StudentID\n          AND hs.CourseID = c.CourseID))",
  alternativ: [
    'Vilka studenter som inte läst någon kurs alls',
    'Vilka studenter som har läst samtliga kurser',
    'Vilka kurser som ingen student har läst',
    'Vilka studenter som läst exakt en kurs'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det kräver ett enkelt NOT EXISTS mot HasStudied, utan den inre kursloopen.',
    'Rätt. Den inre frågan letar efter kurser som studenten INTE har läst. Den yttre kräver att det inte finns någon sådan kurs. Alltså: studenter för vilka det inte existerar någon oläst kurs = studenter som läst alla kurser.',
    'Fel. Då hade den yttre frågan gått över Course, inte över Student.',
    'Fel. Ett exakt antal kräver aggregering, t.ex. GROUP BY … HAVING COUNT(*) = 1.'
  ],
  forklaring: 'Detta är relationsalgebrans DIVISION uttryckt i SQL. Läs den inifrån och ut: "det finns ingen kurs som studenten inte har läst". Alternativ lösning med COUNT: GROUP BY student HAVING COUNT(kurser studenten läst) = (SELECT COUNT(*) FROM Course).',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-05',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan UNION och UNION ALL?',
  alternativ: [
    'UNION ALL kräver att tabellerna har samma namn',
    'UNION tar bort dubbletter, UNION ALL behåller dem',
    'UNION ALL fungerar bara på numeriska kolumner',
    'UNION sorterar alltid resultatet, UNION ALL gör aldrig det'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ingen av dem ställer krav på tabellnamn, bara på union-kompatibilitet (antal kolumner och datatyper).',
    'Rätt. UNION eliminerar dubblettrader, precis som mängdunionen i matematiken. UNION ALL behåller alla rader. I materialets exempel ger UNION fyra distinkta StudentID (NULL, 1, 2, 3) medan UNION ALL ger sex rader.',
    'Fel. Båda fungerar på alla datatyper så länge kolumnerna är kompatibla.',
    'Fel. Sorteringen som ofta syns vid UNION är en bieffekt av dubbletteliminering och får aldrig förlitas på – vill man ha en garanterad ordning krävs ORDER BY.'
  ],
  forklaring: 'UNION gör extra arbete (dubbletteliminering) och är därför långsammare. Använd UNION ALL när du vet att dubbletter antingen inte kan uppstå eller faktiskt ska behållas.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-06',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka två fel bryter mot union-kompatibiliteten?',
  alternativ: [
    'Olika antal kolumner respektive inkompatibla datatyper i motsvarande kolumner',
    'Olika tabellnamn i de två frågorna respektive olika primärnycklar i tabellerna',
    'Olika antal rader i de två resultaten respektive olika ordning på kolumnerna',
    'Saknad ORDER BY i den första frågan respektive saknad WHERE-sats i den andra'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Materialet visar båda felen: SELECT * FROM Student UNION SELECT * FROM HasStudied ger "must have an equal number of expressions", och att unionera StudentName (varchar) med CourseCredits (numeric) ger "Error converting data type varchar to numeric".',
    'Fel. Tabellnamn och primärnycklar spelar ingen roll för UNION – det är resultatmängdernas form som räknas.',
    'Fel. Olika radantal är helt normalt och tillåtet. Kolumnordningen måste dock stämma semantiskt, annars unioneras "fel" kolumner ihop utan felmeddelande.',
    'Fel. Varken ORDER BY eller WHERE är obligatoriska i en UNION.'
  ],
  forklaring: 'Union-kompatibilitet = (1) lika många kolumner och (2) kompatibla datatyper i varje position. Notera fallgropen: byter man plats på två kolumner av samma typ får man inget felmeddelande – bara fel data.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-07',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka är syftena med en VIEW enligt kursmaterialet?',
  alternativ: [
    'Att snabba upp INSERT-operationer genom att skriva till en förberäknad tabell',
    'Att förenkla frågor, dölja objekt och begränsa åtkomst till data',
    'Att skapa en fysisk kopia av tabellen som uppdateras vid varje förändring',
    'Att automatiskt normalisera ett schema till tredje normalformen vid körning'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Vyer är främst en läsabstraktion; de snabbar inte upp insättningar.',
    'Rätt. Materialet anger tre syften: förenkla komplexa frågor och dölja underliggande databasobjekt, begränsa åtkomst vertikalt (kolumner) och horisontellt (rader), samt aggregera tupler.',
    'Fel. En vanlig vy lagrar ingen data – den är en sparad fråga. (Materialiserade vyer är en annan sak och ligger utanför kursen.)',
    'Fel. Normalisering är ett designbeslut som görs på den logiska datamodellen, inte något en vy utför.'
  ],
  forklaring: 'Vyn CREATE VIEW TopStudents AS SELECT … WHERE Grade > 6 i materialet illustrerar alla tre syftena: den kapslar in en join, visar bara utvalda kolumner och filtrerar bort rader.',
  kalla: '02-03-sql.pdf'
},
{
  id: 'db-sqls-08',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namnen på alla patienter som lider av samma sjukdom som patient PP4.',
  modellsvar:
    "SELECT DISTINCT\n    Patient.PatientName AS Name\nFROM\n    Patient\nINNER JOIN\n    Suffers\n    ON Patient.PatientID = Suffers.PatientID\nWHERE\n    Suffers.IllnessID IN (\n        SELECT Suffers.IllnessID\n        FROM Suffers\n        INNER JOIN Patient\n            ON Suffers.PatientID = Patient.PatientID\n        WHERE Patient.PatientNo = 'PP4'\n    )\n    AND Patient.PatientNo <> 'PP4';",
  steg: [
    'Först måste vi ta reda på vilka sjukdomar PP4 har – men vi får inte anta att vi vet vilka de är. Det kräver en subquery.',
    'Den inre frågan joinar Suffers med Patient för att kunna filtrera på PatientNo = \'PP4\' och returnerar PP4:s IllnessID.',
    'Eftersom PP4 kan ha flera sjukdomar kan subqueryn returnera flera rader – därför IN och inte =.',
    'Den yttre frågan hämtar alla patienter som lider av någon av dessa sjukdomar.',
    'DISTINCT behövs eftersom en patient som delar flera sjukdomar med PP4 annars skulle listas flera gånger. Villkoret <> \'PP4\' utesluter patienten själv.'
  ],
  forklaring: 'Med testdatan lider PP4 av Cough. Även PP3 lider av Cough, så svaret blir Bo (PP3). Notera samma princip som i "vem har samma lön som E2" – värdet måste hämtas dynamiskt, inte hårdkodas.',
  kalla: 'databasessqlassignment.pdf fråga 17'
},
{
  id: 'db-sqls-09',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: hämta namnen på alla avdelningar som inte har några anställda.',
  modellsvar:
    "-- Lösning 1: NOT EXISTS\nSELECT\n    UnitName AS Unit\nFROM\n    Unit\nWHERE\n    NOT EXISTS (\n        SELECT 1\n        FROM Employee\n        WHERE Employee.UnitID = Unit.UnitID\n    );\n\n" +
    "-- Lösning 2: LEFT OUTER JOIN\nSELECT\n    Unit.UnitName AS Unit\nFROM\n    Unit\nLEFT OUTER JOIN\n    Employee\n    ON Unit.UnitID = Employee.UnitID\nWHERE\n    Employee.EmployeeID IS NULL;",
  steg: [
    'Frågan handlar om frånvaro av kopplade rader – samma mönster som "anställda utan bil".',
    'NOT EXISTS är korrelerad: för varje avdelning kontrolleras om det finns någon anställd med det UnitID.',
    'SELECT 1 i den inre frågan är idiomatiskt – EXISTS bryr sig bara om huruvida rader returneras, inte om deras innehåll.',
    'LEFT OUTER JOIN-varianten behåller alla avdelningar och filtrerar sedan på att Employee-sidan är NULL.',
    'Använd en kolumn som aldrig kan vara NULL i den bevarade tabellen (t.ex. primärnyckeln EmployeeID) i IS NULL-testet.'
  ],
  forklaring: 'Med testdatan har alla tre avdelningarna anställda, så resultatet blir tomt. Frågan är ändå korrekt – och det är just en sådan här kontroll man vill kunna köra när datan förändras.',
  kalla: 'databasessqlassignment.pdf fråga 30'
},
{
  id: 'db-sqls-10',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Hospital-databasen: kopiera PatientID, telefonnummer och namn för alla patienter som lider av "Love sickness" till en ny tabell som ska heta LoveTable.',
  modellsvar:
    "SELECT\n    Patient.PatientID,\n    Patient.PatientPhoneNumber,\n    Patient.PatientName\nINTO\n    LoveTable\nFROM\n    Patient\nINNER JOIN\n    Suffers\n    ON Patient.PatientID = Suffers.PatientID\nINNER JOIN\n    Illness\n    ON Suffers.IllnessID = Illness.IllnessID\nWHERE\n    Illness.IllnessName = 'Love sickness';",
  steg: [
    'SELECT … INTO ny_tabell skapar tabellen och fyller den i ett steg (T-SQL-specifikt).',
    'Tre tabeller behövs: Patient (uppgifterna), Suffers (kopplingen) och Illness (sjukdomens namn).',
    'Trevägsjoin: Patient → Suffers på PatientID, Suffers → Illness på IllnessID.',
    "Filtrera på Illness.IllnessName = 'Love sickness'.",
    'Alternativ i två steg: först CREATE TABLE LoveTable (…) och sedan INSERT INTO LoveTable (…) SELECT … – samma mönster som StudentCopy i föreläsningsmaterialet.'
  ],
  forklaring: 'Med testdatan lider PP1 (Anna) och PP2 (Hans) av Love sickness. Notera att SELECT INTO ärver kolumnernas datatyper men inte constraints – den nya tabellen får varken primärnyckel eller UNIQUE-villkor.',
  kalla: 'databasessqlassignment.pdf fråga 25, 02-03-sql.pdf'
},
{
  id: 'db-sqls-11',
  delkurs: 'databaser',
  amne: 'db-sql-subquery',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Förklara skillnaden mellan IN, EXISTS och INNER JOIN. När passar respektive konstruktion bäst?',
  modellsvar:
    '**IN** jämför ett värde mot en lista av värden som en subquery returnerar. Den inre frågan körs en gång, materialiseras till en lista, och den yttre frågan kontrollerar medlemskap. Motsvarar mängdoperationen snitt. Passar när du har ett tydligt värdeuttryck att matcha mot en avgränsad lista.\n\n' +
    'Viktig fallgrop: NOT IN mot en lista som innehåller NULL returnerar aldrig några rader, eftersom jämförelsen blir okänd.\n\n' +
    '**EXISTS** returnerar sant eller falskt beroende på om subqueryn ger minst en rad. Den är typiskt korrelerad och körs en gång per kandidatrad i den yttre frågan. Innehållet spelar ingen roll, därför skrivs SELECT 1. Passar särskilt bra för existens- och frånvarofrågor (NOT EXISTS) samt för "alla"-frågor med dubbelt NOT EXISTS, och hanterar NULL korrekt utan extra villkor.\n\n' +
    '**INNER JOIN** kombinerar kolumner från flera tabeller på samma rad. Den är det enda alternativet när du faktiskt behöver *visa* data från båda tabellerna. Den kan dock ge dubbletter när en rad matchar flera rader i den andra tabellen, vilket ofta måste hanteras med DISTINCT.\n\n' +
    '**Rekommendation enligt kursen:** använd JOIN när en JOIN kan ersätta subqueryn, eftersom nästlade subqueries snabbt blir svårlästa. Välj EXISTS när frågan handlar om existens eller frånvaro. Välj IN när listan är kort och tydlig.',
  nyckelpunkter: [
    'IN: medlemskap i en lista; inre frågan körs en gång; akta NULL vid NOT IN',
    'EXISTS: sant/falskt om rader finns; ofta korrelerad; SELECT 1 räcker; NULL-säker',
    'INNER JOIN: kombinerar kolumner; enda valet om data från båda tabellerna ska visas; kan ge dubbletter',
    'Kursens rekommendation: föredra JOIN framför subquery när det går, av läsbarhetsskäl',
    'EXISTS/NOT EXISTS är standardverktyget för frånvaro- och "alla"-frågor'
  ],
  kalla: '02-03-sql.pdf'
}

);
