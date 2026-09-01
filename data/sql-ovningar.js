/* =========================================================================
   sql-ovningar.js – övningarna i SQL-verkstaden.

   Fält per övning:
     id        unikt
     niva      1–9, se sqlNivaer nedan
     fraga     uppgiften i klartext
     losning   referenslösning. Ditt svar jämförs mot vad DEN returnerar,
               inte mot hur den är skriven — alla vägar till rätt svar duger
     ordning   true om raderna måste komma i en viss ordning (ORDER BY krävs)
     kontroll  för uppgifter som ÄNDRAR data: frågan som körs efteråt för att
               se om ändringen blev rätt
     ledtrad   visas på begäran innan facit
     forklaring visas tillsammans med facit

   Alla lösningar körs mot databasen i data/sql-databas.js vid varje
   ändring — se verktyget i README. Ändras datan måste facit räknas om.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.sqlNivaer = [
  { n: 1, namn: 'SELECT, FROM, WHERE',        intro: 'Att välja kolumner och filtrera rader. Grunden allt annat vilar på.' },
  { n: 2, namn: 'Predikat och NULL',          intro: 'BETWEEN, LIKE, IN — och den vanligaste fällan i hela kursen.' },
  { n: 3, namn: 'Aggregatfunktioner',         intro: 'COUNT, SUM, AVG, MIN, MAX. Att räkna på en hel tabell.' },
  { n: 4, namn: 'GROUP BY och HAVING',        intro: 'Att räkna per grupp, och skillnaden mellan att filtrera före och efter.' },
  { n: 5, namn: 'Joins',                      intro: 'Att kombinera tabeller. Inner, outer, självjoin.' },
  { n: 6, namn: 'Underfrågor',                intro: 'En fråga inuti en annan. Okorrelerad och korrelerad.' },
  { n: 7, namn: 'EXISTS och mängdoperationer', intro: 'Frånvaro, existens och att lägga ihop resultat.' },
  { n: 8, namn: 'Att ändra data och vyer',    intro: 'INSERT, UPDATE, DELETE och CREATE VIEW.' },
  { n: 9, namn: 'Division',                   intro: 'Kursens svåraste konstruktion: dubbelt NOT EXISTS.' }
];

window.SYSB23.sqlOvningar = [

  /* ===================== Nivå 1 — SELECT, FROM, WHERE ===================== */
  {
    id: 'sq1-1', niva: 1,
    fraga: 'Visa alla kolumner för samtliga enheter på sjukhuset.',
    losning: 'SELECT * FROM Unit;',
    ledtrad: 'SELECT * hämtar alla kolumner. Tabellen heter Unit.',
    forklaring: 'SELECT * är praktiskt när man snabbt vill titta på en tabell. I skarpa frågor räknar man hellre upp kolumnerna, så att frågan inte ändrar beteende när tabellen får en ny kolumn.'
  },
  {
    id: 'sq1-2', niva: 1,
    fraga: 'Visa namnen på alla anställda.',
    losning: 'SELECT EmpName FROM Employee;',
    ledtrad: 'Bara en kolumn behövs. Kolumnen heter EmpName.',
    forklaring: 'Frågan efterfrågar namn, alltså väljer man EmpName — inte SELECT *. Att svara med mer än det som efterfrågas räknas som fel på tentan.'
  },
  {
    id: 'sq1-3', niva: 1,
    fraga: 'Visa namn och adress för de patienter som bor i Lund. Adresserna slutar på ", Lund".',
    losning: "SELECT PatientName, PatientAddress FROM Patient WHERE PatientAddress LIKE '%Lund';",
    ledtrad: 'Adressen är en hel sträng. Använd LIKE med % för att matcha slutet.',
    forklaring: 'LIKE med % matchar noll eller flera tecken. Ett rent likhetstest hade krävt att man visste hela adressen.'
  },
  {
    id: 'sq1-4', niva: 1,
    fraga: 'Visa varje adress som förekommer bland de anställda, men bara en gång per adress.',
    losning: 'SELECT DISTINCT EmpAddress FROM Employee;',
    ledtrad: 'DISTINCT tar bort dubbletter.',
    forklaring: 'Två anställda delar adress på Bredgatan och två på Kyrkogatan. DISTINCT slår ihop dem. Notera att NULL kommer med som ett eget värde — DISTINCT tar inte bort NULL.'
  },
  {
    id: 'sq1-5', niva: 1, ordning: true,
    fraga: 'Visa namn och lön för alla anställda, sorterade med högst lön först.',
    losning: 'SELECT EmpName, Salary FROM Employee ORDER BY Salary DESC;',
    ledtrad: 'ORDER BY sorterar. DESC ger fallande ordning.',
    forklaring: 'ASC är standard och behöver inte skrivas ut. DESC måste skrivas ut. Här spelar ordningen roll för rättningen.'
  },
  {
    id: 'sq1-6', niva: 1,
    fraga: 'Visa varje anställds namn som Namn och lönen delad med 12 som Manadslon.',
    losning: 'SELECT EmpName AS Namn, Salary / 12 AS Manadslon FROM Employee;',
    ledtrad: 'AS ger ett alias. Ett uttryck utan alias får inget kolumnnamn alls.',
    forklaring: 'AS byter namn bara i resultatmängden — schemat är oförändrat. Ge alltid uträknade uttryck ett alias, annars blir kolumnen namnlös.'
  },
  {
    id: 'sq1-7', niva: 1, ordning: true,
    fraga: 'Visa märke och pris för alla bilar, sorterade på märke i bokstavsordning och inom varje märke med dyrast först.',
    losning: 'SELECT Brand, Price FROM Car ORDER BY Brand ASC, Price DESC;',
    ledtrad: 'ORDER BY klarar flera kolumner, separerade med komma.',
    forklaring: 'Sorteringen sker i den ordning kolumnerna anges: först märke, sedan pris inom varje märke.'
  },
  {
    id: 'sq1-8', niva: 1,
    fraga: "Visa namnen på de anställda vars namn kommer efter 'Max Berg' i bokstavsordning.",
    losning: "SELECT EmpName FROM Employee WHERE EmpName > 'Max Berg';",
    ledtrad: 'Text kan jämföras med > precis som tal.',
    forklaring: 'Text jämförs lexikografiskt, tecken för tecken. "Mary Sue" faller bort: de två första tecknen är lika, och på tredje positionen kommer r före x, så Mary är mindre än Max. Kvar blir Nils Ek och Sara Holm.'
  },

  /* ===================== Nivå 2 — Predikat och NULL ===================== */
  {
    id: 'sq2-1', niva: 2,
    fraga: 'Visa namn och lön för de anställda som tjänar mer än 40 000.',
    losning: 'SELECT EmpName, Salary FROM Employee WHERE Salary > 40000;',
    ledtrad: 'Ett enkelt jämförelseoperator räcker.',
    forklaring: 'Notera att > är strikt: exakt 40 000 kommer inte med.'
  },
  {
    id: 'sq2-2', niva: 2,
    fraga: 'Visa registreringsnummer, märke och pris för de bilar som kostar mellan 100 000 och 200 000 kronor, gränserna inräknade.',
    losning: 'SELECT CarNo, Brand, Price FROM Car WHERE Price BETWEEN 100000 AND 200000;',
    ledtrad: 'BETWEEN tar med båda gränsvärdena.',
    forklaring: 'BETWEEN är inklusivt i båda ändar. Skriver man Price > 100000 AND Price < 200000 utesluter man gränsvärdena — det är skillnaden.'
  },
  {
    id: 'sq2-3', niva: 2,
    fraga: 'Visa namnen på alla patienter vars namn börjar på bokstaven A eller D.',
    losning: "SELECT PatientName FROM Patient WHERE PatientName LIKE 'A%' OR PatientName LIKE 'D%';",
    ledtrad: 'Två LIKE-villkor med OR emellan.',
    forklaring: 'Mönstret A% betyder "A följt av vad som helst". Jämför med _ som matchar exakt ett tecken.'
  },
  {
    id: 'sq2-4', niva: 2,
    fraga: 'Visa namnen på de patienter som ligger på enhet 1 eller 3. Använd IN.',
    losning: 'SELECT PatientName FROM Patient WHERE UnitID IN (1, 3);',
    ledtrad: 'IN tar en lista av värden.',
    forklaring: 'IN är kortare och läsbarare än UnitID = 1 OR UnitID = 3, och blir mycket tydligare när listan växer.'
  },
  {
    id: 'sq2-5', niva: 2,
    fraga: 'Visa namnen på de patienter som saknar adress i registret.',
    losning: 'SELECT PatientName FROM Patient WHERE PatientAddress IS NULL;',
    ledtrad: 'NULL kan inte jämföras med =.',
    forklaring: 'Kursens vanligaste fälla. WHERE PatientAddress = NULL returnerar alltid noll rader, hur många NULL som än finns — jämförelse med NULL evalueras aldrig till sant. Man måste använda IS NULL.'
  },
  {
    id: 'sq2-6', niva: 2,
    fraga: 'Visa namn och adress för de anställda som HAR en adress registrerad.',
    losning: 'SELECT EmpName, EmpAddress FROM Employee WHERE EmpAddress IS NOT NULL;',
    ledtrad: 'Motsatsen till IS NULL.',
    forklaring: 'IS NOT NULL är det enda sättet att fråga efter "har ett värde". NOT (kolumn = NULL) fungerar inte.'
  },
  {
    id: 'sq2-7', niva: 2,
    fraga: 'Visa namn och adress för de patienter som INTE bor i Lund. Patienter utan adress ska inte komma med.',
    losning: "SELECT PatientName, PatientAddress FROM Patient WHERE PatientAddress NOT LIKE '%Lund';",
    ledtrad: 'NOT LIKE. Fundera på vad som händer med NULL-raden.',
    forklaring: 'Patienten utan adress kommer inte med, eftersom NULL NOT LIKE något också blir okänt — och okänt räcker inte för att en rad ska tas med. Vill man ha med dem måste man skriva OR PatientAddress IS NULL.'
  },
  {
    id: 'sq2-8', niva: 2,
    fraga: 'Visa en kolumn Etikett som slår ihop varje anställds nummer och namn med ett bindestreck emellan, till exempel "E1 - Eva Lind".',
    losning: "SELECT EmpNo || ' - ' || EmpName AS Etikett FROM Employee;",
    ledtrad: 'I SQLite slår || ihop text. I SQL Server används + i stället.',
    forklaring: 'Här skiljer sig dialekterna. SQLite och standard-SQL använder ||, medan SQL Server använder +. Samma fråga i SQL Server skulle bli EmpNo + \' - \' + EmpName.'
  },

  /* ===================== Nivå 3 — Aggregatfunktioner ===================== */
  {
    id: 'sq3-1', niva: 3,
    fraga: 'Hur många patienter finns registrerade? Svara med en enda siffra i kolumnen Antal.',
    losning: 'SELECT COUNT(*) AS Antal FROM Patient;',
    ledtrad: 'COUNT(*) räknar rader. Ingen GROUP BY behövs.',
    forklaring: 'När ett aggregat står ensamt i SELECT utgör hela tabellen en enda grupp — därför behövs ingen GROUP BY.'
  },
  {
    id: 'sq3-2', niva: 3,
    fraga: 'Hur många patienter har en adress registrerad? Kalla kolumnen Antal.',
    losning: 'SELECT COUNT(PatientAddress) AS Antal FROM Patient;',
    ledtrad: 'COUNT på en kolumn hoppar över NULL.',
    forklaring: 'Här syns skillnaden mellan COUNT(*) och COUNT(kolumn) svart på vitt: den ena ger 5, den andra 4. Alla aggregat utom COUNT(*) ignorerar NULL.'
  },
  {
    id: 'sq3-3', niva: 3,
    fraga: 'Vad är medellönen bland de anställda? Kalla kolumnen Medellon.',
    losning: 'SELECT AVG(Salary) AS Medellon FROM Employee;',
    ledtrad: 'AVG räknar medelvärdet.',
    forklaring: 'Observera att Salary är en heltalskolumn. I SQL Server hade AVG då returnerat ett heltal och kapat decimalerna — man måste casta för att få dem. Det är en klassisk tentafråga.'
  },
  {
    id: 'sq3-4', niva: 3,
    fraga: 'Visa den lägsta och den högsta lönen på samma resultatrad, som Lagst och Hogst.',
    losning: 'SELECT MIN(Salary) AS Lagst, MAX(Salary) AS Hogst FROM Employee;',
    ledtrad: 'Flera aggregat får stå i samma SELECT.',
    forklaring: 'Båda aggregaten räknar på samma grupp — hela tabellen — och hamnar därför på samma rad.'
  },
  {
    id: 'sq3-5', niva: 3,
    fraga: 'Vad kostar sjukhusets bilpark totalt? Kalla kolumnen Totalvarde.',
    losning: 'SELECT SUM(Price) AS Totalvarde FROM Car;',
    ledtrad: 'SUM lägger ihop.',
    forklaring: 'SUM ignorerar NULL, men här har alla bilar ett pris så det spelar ingen roll.'
  },

  /* ===================== Nivå 4 — GROUP BY och HAVING ===================== */
  {
    id: 'sq4-1', niva: 4,
    fraga: 'Visa varje bilmärke tillsammans med antalet bilar av det märket. Kalla antalskolumnen Antal.',
    losning: 'SELECT Brand, COUNT(*) AS Antal FROM Car GROUP BY Brand;',
    ledtrad: 'GROUP BY den kolumn du vill ha en rad per.',
    forklaring: 'Regeln: allt i SELECT måste antingen vara grupperingsnyckel eller inkapslat i ett aggregat. Här är Brand nyckeln och COUNT(*) aggregatet.'
  },
  {
    id: 'sq4-2', niva: 4,
    fraga: 'Visa varje enhets UnitID tillsammans med antalet anställda på enheten. Kalla kolumnen Antal.',
    losning: 'SELECT UnitID, COUNT(*) AS Antal FROM Employee GROUP BY UnitID;',
    ledtrad: 'Gruppera på UnitID i Employee-tabellen.',
    forklaring: 'Notera att det här bara ger enheter som faktiskt har anställda. Vill man ha med tomma enheter behövs en outer join — det kommer i nivå 5.'
  },
  {
    id: 'sq4-3', niva: 4,
    fraga: 'Visa de bilmärken som det finns fler än en bil av, tillsammans med antalet. Kalla kolumnen Antal.',
    losning: 'SELECT Brand, COUNT(*) AS Antal FROM Car GROUP BY Brand HAVING COUNT(*) > 1;',
    ledtrad: 'Villkoret gäller grupper, inte rader.',
    forklaring: 'HAVING filtrerar grupper efter aggregeringen. Samma villkor i WHERE hade gett ett felmeddelande, eftersom WHERE körs innan grupperna finns.'
  },
  {
    id: 'sq4-4', niva: 4,
    fraga: 'Visa varje enhets UnitID tillsammans med medellönen på enheten, men bara för enheter där medellönen överstiger 38 000. Kalla kolumnen Medellon.',
    losning: 'SELECT UnitID, AVG(Salary) AS Medellon FROM Employee GROUP BY UnitID HAVING AVG(Salary) > 38000;',
    ledtrad: 'Aggregatet får stå både i SELECT och i HAVING.',
    forklaring: 'Ett aggregat i HAVING är helt normalt. Det är i WHERE det inte får stå.'
  },
  {
    id: 'sq4-5', niva: 4,
    fraga: 'Visa antalet bilar per märke, men räkna bara bilar som kostar över 100 000. Kalla kolumnerna Brand och Antal.',
    losning: 'SELECT Brand, COUNT(*) AS Antal FROM Car WHERE Price > 100000 GROUP BY Brand;',
    ledtrad: 'Här ska enskilda rader bort innan grupperingen.',
    forklaring: 'Skillnaden mot förra uppgiften: här filtrerar man bort rader före grupperingen, alltså WHERE. Saab försvinner helt eftersom den enda Saaben kostar under gränsen.'
  },
  {
    id: 'sq4-6', niva: 4,
    fraga: 'Visa varje students StudentID tillsammans med antalet lästa kurser och det högsta betyget. Kalla kolumnerna StudentID, Antal och Hogst.',
    losning: 'SELECT StudentID, COUNT(*) AS Antal, MAX(Grade) AS Hogst FROM HasStudied GROUP BY StudentID;',
    ledtrad: 'Två aggregat i samma fråga, grupperade på student.',
    forklaring: 'Det här är exakt mönstret i en vanlig tentafråga: räkna förekomster per nyckel och plocka ut ett extremvärde i samma svep.'
  },

  /* ===================== Nivå 5 — Joins ===================== */
  {
    id: 'sq5-1', niva: 5,
    fraga: 'Visa varje anställds namn tillsammans med namnet på den enhet personen arbetar på. Kalla kolumnerna EmpName och UnitName.',
    losning: 'SELECT Employee.EmpName, Unit.UnitName FROM Employee JOIN Unit ON Employee.UnitID = Unit.UnitID;',
    ledtrad: 'Koppla ihop på UnitID.',
    forklaring: 'JOIN utan prefix betyder INNER JOIN. Den motsvarar en kartesisk produkt följd av en selektion på joinvillkoret.'
  },
  {
    id: 'sq5-2', niva: 5,
    fraga: 'Visa namnen på de patienter som ligger på enheten Trauma.',
    losning: "SELECT Patient.PatientName FROM Patient JOIN Unit ON Patient.UnitID = Unit.UnitID WHERE Unit.UnitName = 'Trauma';",
    ledtrad: 'Joina först, filtrera sedan på enhetens namn.',
    forklaring: 'Man skulle kunna slå upp UnitID för Trauma först och hårdkoda siffran, men då går frågan sönder om id:t ändras. Joina hellre på namnet.'
  },
  {
    id: 'sq5-3', niva: 5,
    fraga: 'Visa registreringsnummer och märke för ALLA bilar, tillsammans med ägarens namn. Bilar utan ägare ska också komma med. Kalla kolumnerna CarNo, Brand och EmpName.',
    losning: 'SELECT Car.CarNo, Car.Brand, Employee.EmpName FROM Car LEFT JOIN Employee ON Car.EmployeeID = Employee.EmployeeID;',
    ledtrad: 'Alla rader från Car ska behållas — vilken sida står Car på?',
    forklaring: 'LEFT JOIN behåller alla rader från tabellen till vänster om JOIN. Teslan saknar ägare och får NULL i namnkolumnen. En INNER JOIN hade tappat den helt.'
  },
  {
    id: 'sq5-4', niva: 5,
    fraga: 'Visa registreringsnummer och märke för de bilar som INTE har någon ägare. Använd en outer join.',
    losning: 'SELECT Car.CarNo, Car.Brand FROM Car LEFT JOIN Employee ON Car.EmployeeID = Employee.EmployeeID WHERE Employee.EmployeeID IS NULL;',
    ledtrad: 'Gör en LEFT JOIN och behåll bara raderna där matchningen saknas.',
    forklaring: 'LEFT JOIN plus IS NULL är standardmönstret för att hitta rader utan matchning. Det är värt att kunna utantill — det dyker upp i varje SQL-tenta.'
  },
  {
    id: 'sq5-5', niva: 5,
    fraga: 'Visa vilka anställda som undersöker vilka patienter. Två kolumner: EmpName och PatientName.',
    losning: 'SELECT Employee.EmpName, Patient.PatientName FROM Examines JOIN Employee ON Examines.EmployeeID = Employee.EmployeeID JOIN Patient ON Examines.PatientID = Patient.PatientID;',
    ledtrad: 'Tre tabeller: kopplingstabellen i mitten och en tabell på varje sida.',
    forklaring: 'En M:N-relation läses alltid genom kopplingstabellen. Mönstret är detsamma varje gång: joina kopplingstabellen mot båda entitetstabellerna.'
  },
  {
    id: 'sq5-6', niva: 5,
    fraga: 'Visa vilka sjukdomar patienten med patientnummer PP1 lider av. En kolumn: DiseaseName.',
    losning: "SELECT Disease.DiseaseName FROM Patient JOIN SuffersFrom ON Patient.PatientID = SuffersFrom.PatientID JOIN Disease ON SuffersFrom.DiseaseID = Disease.DiseaseID WHERE Patient.PatientNo = 'PP1';",
    ledtrad: 'Samma trevägsmönster som förra uppgiften, plus ett WHERE.',
    forklaring: 'Att filtrera på PatientNo i stället för PatientID gör frågan läsbar för någon som kan verksamheten men inte databasen.'
  },
  {
    id: 'sq5-7', niva: 5,
    fraga: 'Visa varje enhets namn tillsammans med antalet patienter på enheten. Enheter utan patienter ska visas med noll. Kalla kolumnerna UnitName och Antal.',
    losning: 'SELECT Unit.UnitName, COUNT(Patient.PatientID) AS Antal FROM Unit LEFT JOIN Patient ON Unit.UnitID = Patient.UnitID GROUP BY Unit.UnitID, Unit.UnitName;',
    ledtrad: 'LEFT JOIN plus GROUP BY. Tänk på vad du räknar — COUNT(*) skulle ge fel.',
    forklaring: 'Detta är den klassiska fällan: COUNT(*) räknar raderna, och en enhet utan patienter har ändå en rad efter en LEFT JOIN — den skulle alltså få 1 i stället för 0. COUNT(Patient.PatientID) räknar bara rader där patienten faktiskt finns.'
  },
  {
    id: 'sq5-8', niva: 5,
    fraga: 'Visa varje anställds namn tillsammans med chefens namn. Kalla kolumnerna Anstalld och Chef. Bara anställda som har en chef ska visas.',
    losning: 'SELECT emp.EmpName AS Anstalld, chef.EmpName AS Chef FROM Employee AS emp JOIN Employee AS chef ON emp.ManagerID = chef.EmployeeID;',
    ledtrad: 'Samma tabell två gånger. Den måste få två olika alias.',
    forklaring: 'En självjoin kräver alias — annars vet databasen inte vilken kopia man menar. Eva Lind saknar chef och faller bort, eftersom en INNER JOIN inte matchar NULL.'
  },
  {
    id: 'sq5-9', niva: 5,
    fraga: 'Visa alla par av anställda som bor på samma adress. Varje par ska bara visas en gång, och ingen ska paras ihop med sig själv. Kalla kolumnerna Person1 och Person2.',
    losning: 'SELECT a.EmpName AS Person1, b.EmpName AS Person2 FROM Employee AS a JOIN Employee AS b ON a.EmpAddress = b.EmpAddress WHERE a.EmployeeID < b.EmployeeID;',
    ledtrad: 'Villkoret som utesluter identiteten kan också hindra att paret dyker upp i båda riktningarna.',
    forklaring: 'Kursens mest lärorika bugg. Utan villkoret matchar varje person sig själv. Med a.EmployeeID <> b.EmployeeID får man varje par två gånger. Med < får man varje par exakt en gång — ett villkor som löser båda problemen.'
  },
  {
    id: 'sq5-10', niva: 5,
    fraga: 'Hur många rader ger den kartesiska produkten av Unit och Patient? Svara med en fråga som räknar dem. Kalla kolumnen Antal.',
    losning: 'SELECT COUNT(*) AS Antal FROM Unit, Patient;',
    ledtrad: 'Två tabeller utan joinvillkor ger den kartesiska produkten.',
    forklaring: 'Fyra enheter gånger fem patienter blir tjugo rader. Kartesisk produkt: rader multipliceras, kolumner adderas. Det är utgångspunkten som varje join börjar i.'
  },

  /* ===================== Nivå 6 — Underfrågor ===================== */
  {
    id: 'sq6-1', niva: 6,
    fraga: 'Visa namn och lön för de anställda som tjänar mer än medellönen. Kalla kolumnerna EmpName och Salary.',
    losning: 'SELECT EmpName, Salary FROM Employee WHERE Salary > (SELECT AVG(Salary) FROM Employee);',
    ledtrad: 'Räkna ut medellönen i en underfråga.',
    forklaring: 'En okorrelerad underfråga: den inre frågan är oberoende av den yttre och körs en enda gång. Man kan inte skriva WHERE Salary > AVG(Salary) — aggregat får inte stå i WHERE.'
  },
  {
    id: 'sq6-2', niva: 6,
    fraga: 'Visa namnen på de patienter som ligger på samma enhet som patienten med patientnummer PP1. Patienten själv ska inte komma med.',
    losning: "SELECT PatientName FROM Patient WHERE UnitID = (SELECT UnitID FROM Patient WHERE PatientNo = 'PP1') AND PatientNo <> 'PP1';",
    ledtrad: 'Slå upp enheten i en underfråga och uteslut sedan personen själv.',
    forklaring: 'Underfrågan returnerar exakt ett värde, så = fungerar. Hade den kunnat returnera flera rader hade man fått felet "Subquery returned more than 1 value" och behövt IN i stället.'
  },
  {
    id: 'sq6-3', niva: 6,
    fraga: 'Visa namnen på de anställda som äger minst en bil. Använd IN.',
    losning: 'SELECT EmpName FROM Employee WHERE EmployeeID IN (SELECT EmployeeID FROM Car WHERE EmployeeID IS NOT NULL);',
    ledtrad: 'IN klarar en lista av värden från en underfråga.',
    forklaring: 'Notera IS NOT NULL i den inre frågan. Den är inte nödvändig här, men den blir livsviktig i nästa uppgift — NOT IN med NULL i listan returnerar aldrig några rader.'
  },
  {
    id: 'sq6-4', niva: 6,
    fraga: 'Visa namnen på de anställda som INTE äger någon bil. Använd NOT IN — och tänk på NULL.',
    losning: 'SELECT EmpName FROM Employee WHERE EmployeeID NOT IN (SELECT EmployeeID FROM Car WHERE EmployeeID IS NOT NULL);',
    ledtrad: 'Utan IS NOT NULL i underfrågan får du noll rader. Fundera på varför.',
    forklaring: 'Teslan har NULL som ägare. NOT IN jämför mot varje värde i listan, och en jämförelse med NULL blir okänd — vilket gör hela villkoret okänt och inga rader kommer med. NOT EXISTS hade varit NULL-säkert utan extra villkor.'
  },
  {
    id: 'sq6-5', niva: 6,
    fraga: 'Visa namn och lön för den anställd som tjänar mest. Kalla kolumnerna EmpName och Salary.',
    losning: 'SELECT EmpName, Salary FROM Employee WHERE Salary = (SELECT MAX(Salary) FROM Employee);',
    ledtrad: 'Jämför mot maxvärdet från en underfråga.',
    forklaring: 'Fördelen mot att sortera och ta första raden: om två personer delar högsta lönen kommer båda med, vilket oftast är vad man vill.'
  },
  {
    id: 'sq6-6', niva: 6,
    fraga: 'Visa namnen på de studenter som har fått minst ett betyg över 7.',
    losning: 'SELECT StudentName FROM Student WHERE StudentID IN (SELECT StudentID FROM HasStudied WHERE Grade > 7);',
    ledtrad: 'Underfrågan plockar ut de StudentID som uppfyller villkoret.',
    forklaring: 'Man kan lösa samma sak med en join plus DISTINCT. Underfrågan är ofta läsbarare när man bara vill filtrera och inte visa något ur den andra tabellen.'
  },

  /* ============= Nivå 7 — EXISTS och mängdoperationer ============= */
  {
    id: 'sq7-1', niva: 7,
    fraga: 'Visa namnen på de patienter som inte lider av någon sjukdom. Använd NOT EXISTS.',
    losning: 'SELECT PatientName FROM Patient p WHERE NOT EXISTS (SELECT 1 FROM SuffersFrom sf WHERE sf.PatientID = p.PatientID);',
    ledtrad: 'Den inre frågan ska referera till den yttre raden.',
    forklaring: 'En korrelerad underfråga: den körs en gång per patient och kollar om det finns någon matchande rad. SELECT 1 räcker — EXISTS bryr sig bara om huruvida rader returneras, inte om vad de innehåller.'
  },
  {
    id: 'sq7-2', niva: 7,
    fraga: 'Visa namnen på de sjukdomar som ingen patient lider av.',
    losning: 'SELECT DiseaseName FROM Disease d WHERE NOT EXISTS (SELECT 1 FROM SuffersFrom sf WHERE sf.DiseaseID = d.DiseaseID);',
    ledtrad: 'Samma mönster som förra, men från andra hållet.',
    forklaring: 'Malaria finns i registret men ingen har den. Samma fråga kan skrivas med LEFT JOIN plus IS NULL eller med NOT IN — tre mönster för frånvaro, alla lika giltiga.'
  },
  {
    id: 'sq7-3', niva: 7,
    fraga: 'Visa namnen på de anställda som undersöker minst en patient. Använd EXISTS.',
    losning: 'SELECT EmpName FROM Employee e WHERE EXISTS (SELECT 1 FROM Examines x WHERE x.EmployeeID = e.EmployeeID);',
    ledtrad: 'EXISTS utan NOT.',
    forklaring: 'EXISTS slutar leta så snart den hittat en rad, vilket gör den effektiv. Den bryr sig aldrig om hur många rader det fanns.'
  },
  {
    id: 'sq7-4', niva: 7,
    fraga: 'Visa alla adresser som förekommer bland både anställda och patienter. Kalla kolumnen Adress.',
    losning: 'SELECT EmpAddress AS Adress FROM Employee INTERSECT SELECT PatientAddress FROM Patient;',
    ledtrad: 'INTERSECT ger snittet av två resultatmängder.',
    forklaring: 'Union-kompatibilitet krävs: lika många kolumner och kompatibla datatyper. Kolumnrubrikerna hämtas från den första SELECT-satsen — aliaset i den andra vore kosmetiskt. Notera att NULL kommer med: i mängdoperationer betraktas två NULL som lika, till skillnad från i en vanlig jämförelse.'
  },
  {
    id: 'sq7-5', niva: 7,
    fraga: 'Visa alla adresser som förekommer antingen bland anställda eller bland patienter, utan dubbletter. Kalla kolumnen Adress.',
    losning: 'SELECT EmpAddress AS Adress FROM Employee UNION SELECT PatientAddress FROM Patient;',
    ledtrad: 'UNION tar bort dubbletter automatiskt.',
    forklaring: 'UNION gör resultatet längre, JOIN gör det bredare. UNION ALL hade behållit dubbletterna och varit snabbare, men här vill vi ha unika adresser.'
  },
  {
    id: 'sq7-6', niva: 7,
    fraga: 'Visa de adresser som finns bland anställda men INTE bland patienter. Kalla kolumnen Adress.',
    losning: 'SELECT EmpAddress AS Adress FROM Employee EXCEPT SELECT PatientAddress FROM Patient;',
    ledtrad: 'EXCEPT drar bort den andra mängden från den första.',
    forklaring: 'I SQL Server heter operatorn också EXCEPT. I Oracle heter den MINUS — ett av få ställen där dialekterna skiljer sig i namnet på en mängdoperation.'
  },

  /* ============= Nivå 8 — Att ändra data och vyer ============= */
  {
    id: 'sq8-1', niva: 8,
    fraga: 'Lägg till en ny enhet med UnitID 5, enhetsnummer U5 och namnet Neurologi.',
    losning: "INSERT INTO Unit (UnitID, UnitNo, UnitName) VALUES (5, 'U5', 'Neurologi');",
    kontroll: 'SELECT UnitID, UnitNo, UnitName FROM Unit ORDER BY UnitID;',
    ledtrad: 'INSERT INTO tabell (kolumner) VALUES (värden);',
    forklaring: 'Att räkna upp kolumnnamnen är inte obligatoriskt men starkt rekommenderat — annars går satsen sönder den dag tabellen får en ny kolumn.'
  },
  {
    id: 'sq8-2', niva: 8,
    fraga: 'Höj lönen med 2 000 kronor för alla anställda på enhet 3.',
    losning: 'UPDATE Employee SET Salary = Salary + 2000 WHERE UnitID = 3;',
    kontroll: 'SELECT EmpNo, Salary FROM Employee ORDER BY EmpNo;',
    ledtrad: 'SET kan räkna på kolumnens nuvarande värde.',
    forklaring: 'Glömmer man WHERE höjs lönen för alla i hela företaget. Det är den vanligaste och dyraste miss man gör med UPDATE — kör alltid villkoret som en SELECT först.'
  },
  {
    id: 'sq8-3', niva: 8,
    fraga: 'Radera alla bilar som inte tillhör någon anställd.',
    losning: 'DELETE FROM Car WHERE EmployeeID IS NULL;',
    kontroll: 'SELECT CarNo, Brand FROM Car ORDER BY CarNo;',
    ledtrad: 'Samma NULL-regel som i SELECT gäller här.',
    forklaring: 'WHERE EmployeeID = NULL hade inte raderat någonting alls — och det hade sett ut som att satsen fungerade. Tyst att göra ingenting är det farligaste beteendet en DELETE kan ha.'
  },
  {
    id: 'sq8-4', niva: 8,
    fraga: 'Skapa en vy som heter HighEarner och som visar namn och lön för alla anställda som tjänar över 40 000. Kolumnerna ska heta EmpName och Salary.',
    losning: 'CREATE VIEW HighEarner AS SELECT EmpName, Salary FROM Employee WHERE Salary > 40000;',
    kontroll: 'SELECT EmpName, Salary FROM HighEarner ORDER BY EmpName;',
    ledtrad: 'CREATE VIEW namn AS följt av en vanlig SELECT.',
    forklaring: 'En vy är en sparad fråga, inte en kopia av datan. Den förenklar komplexa frågor, döljer underliggande tabeller och kan begränsa åtkomsten både till kolumner och till rader.'
  },
  {
    id: 'sq8-5', niva: 8,
    fraga: 'Sätt adressen "Okand adress" på alla patienter som saknar adress.',
    losning: "UPDATE Patient SET PatientAddress = 'Okand adress' WHERE PatientAddress IS NULL;",
    kontroll: 'SELECT PatientNo, PatientAddress FROM Patient ORDER BY PatientNo;',
    ledtrad: 'IS NULL i villkoret.',
    forklaring: 'Att ersätta NULL med en platshållartext är vanligt men inte alltid klokt: man förlorar skillnaden mellan "vet inte" och "har faktiskt den här adressen".'
  },

  /* ===================== Nivå 9 — Division ===================== */
  {
    id: 'sq9-1', niva: 9,
    fraga: 'Visa namnen på de studenter som har läst SAMTLIGA kurser i Course-tabellen. Använd dubbelt NOT EXISTS.',
    losning: 'SELECT StudentName FROM Student s WHERE NOT EXISTS (SELECT 1 FROM Course c WHERE NOT EXISTS (SELECT 1 FROM HasStudied hs WHERE hs.StudentID = s.StudentID AND hs.CourseID = c.CourseID));',
    ledtrad: 'Vänd på frågan: en student har läst alla kurser om det INTE finns någon kurs som hen INTE har läst.',
    forklaring: 'Kursens svåraste konstruktion. Läs den inifrån och ut: innersta frågan svarar "har den här studenten läst den här kursen?". Mellersta letar efter en kurs där svaret är nej. Yttersta behåller de studenter där ingen sådan kurs finns. Det är relationsalgebrans division.'
  },
  {
    id: 'sq9-2', niva: 9,
    fraga: 'Visa namnen på de anställda som undersöker samtliga patienter på enhet 1.',
    losning: 'SELECT EmpName FROM Employee e WHERE NOT EXISTS (SELECT 1 FROM Patient p WHERE p.UnitID = 1 AND NOT EXISTS (SELECT 1 FROM Examines x WHERE x.EmployeeID = e.EmployeeID AND x.PatientID = p.PatientID));',
    ledtrad: 'Samma mönster som förra, men mängden man dividerar med är begränsad med ett villkor.',
    forklaring: 'Skillnaden mot förra uppgiften är att den mellersta frågan har ett extra villkor som avgränsar "alla" till "alla på enhet 1". Mönstret är annars identiskt — det är därför det är värt att lära sig som en form och inte som en enskild fråga.'
  },
  {
    id: 'sq9-3', niva: 9,
    fraga: 'Visa varje anställds namn tillsammans med antalet patienter personen undersöker, även de som inte undersöker någon. Kalla kolumnerna EmpName och Antal, sorterat på namn.',
    losning: 'SELECT e.EmpName, COUNT(x.PatientID) AS Antal FROM Employee e LEFT JOIN Examines x ON e.EmployeeID = x.EmployeeID GROUP BY e.EmployeeID, e.EmpName ORDER BY e.EmpName;',
    ordning: true,
    ledtrad: 'LEFT JOIN, gruppera, och räkna rätt kolumn.',
    forklaring: 'Avslutningen knyter ihop nivå 4 och 5: outer join för att behålla alla anställda, gruppering för att räkna per person, och COUNT på en kolumn från den högra tabellen så att den som inte undersöker någon får 0 i stället för 1.'
  }
];
