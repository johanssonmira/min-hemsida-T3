/* =========================================================================
   Frågebank – Databaser: databasdesign
   Ämnen: db-konceptuell, db-logisk, db-normalisering, db-fysisk
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ========================= db-konceptuell ========================= */
{
  id: 'db-kon-01',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Hur definierar föreläsningen (efter Chen 1976) en entitet?',
  alternativ: [
    'En enskild kolumn i en databastabell, alltså en egenskap hos en tabellrad',
    'En "sak" som kan identifieras distinkt, skild från varje annan entitet',
    'Ett samband mellan två tabeller, alltså kopplingen dem emellan i modellen',
    'Ett villkor som begränsar vilka värden ett attribut får anta i modellen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. En kolumn motsvarar ett *attribut*. Entiteten är det som attributen beskriver.',
    'Rätt. Chens definition: "a thing which can be distinctly identified". Distinkt identifierad betyder att modellen kan skilja den från varje annan entitet. Entitetstypen (rektangeln) grupperar entiteter med samma relevanta egenskaper.',
    'Fel. Ett samband är en *relationship type*, ritad som en romb i Chen-notation.',
    'Fel. Det beskriver en domän eller ett constraint, inte en entitet.'
  ],
  forklaring: 'Håll isär tre nivåer: entitetstypen (Employee), entitetsmängden (alla anställda just nu) och entiteten (Mary, E-104). En entitet är en informationsabstraktion — personalverksamheten lagrar namn och jobbmejl, inte längd och vikt. En stark entitetstyp kan identifiera sina entiteter utan hjälp av en annan entitetstyp.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-02',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur visas obligatoriskt deltagande (mandatory participation) i Chen-notation?',
  alternativ: [
    'Med en romb runt relationens namn',
    'Med dubbla linjer mellan entiteten och relationen',
    'Med en understruken multiplicitet',
    'Med en fylld pilspets riktad mot entiteten'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Romben är själva symbolen för en relation och säger inget om deltagande.',
    'Rätt. Dubbla linjer indikerar att entiteten måste delta i relationen. En vanlig enkel linje betyder frivilligt (icke-obligatoriskt) deltagande.',
    'Fel. Understrykning används för identifierande attribut (nyckelattribut), inte för multiplicitet.',
    'Fel. Pilspetsar tillhör inte Chen-notationen; de förekommer i vissa andra notationer.'
  ],
  forklaring: 'Två oberoende dimensioner beskriver ett samband: (1) multiplicitet – 1:1, 1:M eller M:N, och (2) deltagande – obligatoriskt eller frivilligt per sida. Chen har också en alternativ skrivning med min–max-par intill varje entitet, t.ex. (1,1) och (0,N) — men blanda aldrig min–max-par med dubbla linjer i samma diagram.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-03',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'I ett Chen-diagram står 1 intill Employee och N intill Project på sambandet Leads. Vad säger 1:an?',
  alternativ: [
    'Att varje anställd måste leda exakt ett projekt',
    'Att varje projekt har högst en ledande anställd',
    'Att varje projekt måste ha exakt en ledande anställd',
    'Att en anställd kan leda högst ett projekt'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kardinaliteten läses tvärs över sambandet, och den säger inget om "måste".',
    'Rätt. Siffran läses tvärs över: för ett fast projekt får högst en anställd delta. Och den anger ett tak — 1 betyder högst en, inte exakt en.',
    'Fel. "Måste" avgörs av deltagandet (dubbel linje vid Project), inte av kardinaliteten. Utan dubbel linje får ett projekt sakna ledare.',
    'Fel. Det är N:et intill Project som säger hur många projekt en anställd får leda — många.'
  ],
  forklaring: 'Kardinalitet och deltagande är oberoende. Kardinaliteten (1:1, 1:N, M:N) är ett maxantal och läses tvärs över; deltagandet (enkel eller dubbel linje) läses vid sin egen ände. I M:N betyder både M och N "många" — de olika bokstäverna skiljer bara de två positionerna åt.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-04',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Ett universitet har unikt namn. En kurs har kurskod, namn och poäng, men kurskoden är unik endast inom det universitet som ger kursen. Hur modelleras kursen?',
  alternativ: [
    'Som en vanlig entitet där CourseCode ensam räcker som identifierande attribut',
    'Som en svag entitet med CourseCode som partiell identifierare',
    'Som ett multivärt attribut på University, där varje värde är en kurs',
    'Som en härledd entitet vars innehåll räknas fram ur University vid behov'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. CourseCode ensam identifierar inte en kurs – Lunds SYSB23 och Uppsalas SYSB23 är olika kurser med samma kod.',
    'Rätt. En svag entitet kan inte identifieras av sina egna attribut ensamma, utan behöver ägarentitetens nyckel. Kursen ritas med dubbel ram, relationen Offer med dubbel ram, och CourseCode markeras som partiell identifierare (streckad understrykning).',
    'Fel. Ett multivärt attribut kan inte i sin tur ha egna attribut som namn och poäng. Kursen behöver vara en entitet.',
    'Fel. "Härledd" gäller attribut som kan beräknas ur andra attribut, t.ex. Age ur DateOfBirth.'
  ],
  forklaring: 'Testet för svag entitet: räcker entitetens egna attribut för att unikt identifiera en förekomst? Om inte – och identifieringen kräver ägarens nyckel – är entiteten svag. Vid transformationen blir ägarens primärnyckel en del av den svaga entitetens sammansatta primärnyckel.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-05',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är ett relationsattribut (relationship attribute) och när används det typiskt?',
  alternativ: [
    'Ett attribut som beskriver entiteten, placerat närmast relationen i diagrammet',
    'Data som uppstår som ett resultat av själva sambandet, typiskt vid M:N-relationer',
    'Ett attribut som fungerar som primärnyckel i båda de kopplade entiteterna',
    'Ett attribut som alltid måste vara NULL tills relationen har skapats'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Attribut som beskriver entiteten hör till entiteten, oavsett var de ritas.',
    'Rätt. Relationsattribut representerar data som uppstår genom sambandet: bara en student som *har läst* en kurs kan tilldelas ett betyg. Grade hör alltså varken till Student eller Course utan till relationen HasStudied. Används mest vid M:N men kan förekomma vid 1:M och 1:1.',
    'Fel. Det beskriver hur en kopplingstabells sammansatta primärnyckel bildas vid transformationen, inte vad ett relationsattribut är.',
    'Fel. Relationsattribut har normala värden; NULL har inget med saken att göra.'
  ],
  forklaring: 'Vid transformationen av M:N hamnar relationsattributet i kopplingsrelationen – men det blir INTE en del av primärnyckeln. Exempel: Work(EmployeeNo, ProjectNo, Hours) där bara de två första är understrukna.',
  kalla: '04-conceptual-database-design.pdf, 05-logical-database-design.pdf'
},
{
  id: 'db-kon-06',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande kan kursens Crow’s foot-notation INTE uttrycka direkt, utan måste lösa indirekt?',
  alternativ: [
    'Entitetstyper och deras identifierande attribut',
    'Multivärda attribut och attribut på ett samband',
    'Om deltagandet är frivilligt eller obligatoriskt',
    'Unära samband med två rollnamn'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Entitetsrutor med ID-markerade identifierare är kärnan i notationen.',
    'Rätt. Ett multivärt attribut blir en egen entitet i ett 1:N-samband (PHONE NUMBER), och eftersom linjen saknar plats för attribut blir ett samband med attribut en associativ entitet (ASSIGNMENT).',
    'Fel. Det är precis vad ändpunkterna gör: yttre cirkel = frivilligt, yttre streck = obligatoriskt.',
    'Fel. En självlinje med rollerna supervisor och report går att rita direkt.'
  ],
  forklaring: 'Föreläsningen listar det som bara representeras indirekt eller dokumenteras separat: multivärda attribut, sammansatta, härledda och frivilliga attribut, domäner, svag identitet (blir upprepade ID-markeringar, alltså en sammansatt identifierare) och attribut på samband. Notationen är inte standardiserad — läs alltid legenden.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-07',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande går INTE att uttrycka i en ER-modell?',
  alternativ: [
    'Att en student måste läsa minst en kurs för att få finnas i modellen',
    'Att en students e-postadress måste sluta på @student.lu.se',
    'Att en student kan ha flera adresser registrerade samtidigt',
    'Att en kurs erbjuds av exakt ett universitet'
  ],
  ratt: 1,
  forklaringar: [
    'Fel svar – det går. Obligatoriskt deltagande på studentsidan i M:N-relationen uttrycker precis detta.',
    'Rätt. Domänvillkor på värdenivå kan inte uttryckas i ER-notation. Kursmaterialet listar detta bland "Notational Limitations" tillsammans med maxgränser (högst 500 poäng, högst 100 studenter per kurs) och regler som "en student får inte läsa en kurs hen redan läst". Sådant implementeras med CHECK-constraints eller i applikationslogiken.',
    'Fel svar – det går. Multivärt attribut i Chen-notation.',
    'Fel svar – det går. En M:1-relation med obligatoriskt deltagande på kurssidan.'
  ],
  forklaring: 'ER-modellen fångar struktur (entiteter, samband, kardinalitet) men inte alla verksamhetsregler. Värdebegränsningar hanteras senare i den fysiska designen, t.ex. CONSTRAINT CK_… CHECK(…).',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-08',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Förklara skillnaden mellan att modellera Address som ett multivärt attribut på Employee och att modellera Address som en egen entitet med en 1:M-relation till Employee. Vilken verksamhetsregel skiljer dem åt?',
  modellsvar:
    'Båda lösningarna tillåter att en anställd har flera adresser, men de skiljer sig i om adresser kan **delas** mellan anställda.\n\n' +
    '**Multivärt attribut** ger vid transformationen:\n' +
    'Employee(EmployeeNo, Name, Salary)\n' +
    'EmployeeAddress(EmployeeNo, Address)\n\n' +
    'Primärnyckeln är kombinationen av främmande nyckeln och det multivärda attributet. Två olika anställda kan då mycket väl ha samma adressträng – t.ex. kan både E1 och E2 ha "456 Market St.". Adressen har ingen egen existens; den är bara ett värde knutet till en anställd.\n\n' +
    '**Egen entitet med 1:M** ger:\n' +
    'Employee(EmployeeNo, Name, Salary)\n' +
    'Address(AddressId, Street, …, EmployeeNo)\n\n' +
    'Här är varje adress en egen förekomst med en främmande nyckel till exakt en anställd. Eftersom en adressrad bara kan peka på en anställd kan adresser **inte** delas – vill man registrera samma gata för två personer måste man skapa två separata adressförekomster.\n\n' +
    '**Verksamhetsregeln som avgör valet** är alltså: får två anställda dela på samma adressförekomst? Ja ⇒ multivärt attribut. Nej ⇒ egen entitet med 1:M-relation.\n\n' +
    'Materialet ställer också den kritiska följdfrågan om det är *avsiktligt* att E1 och E2 kan dela adress – det är precis den sortens fråga som måste ställas till verksamhetssidan innan modellen fastställs.',
  nyckelpunkter: [
    'Båda tillåter flera adresser per anställd',
    'Multivärt attribut ⇒ adresser kan delas mellan anställda',
    'Egen entitet med 1:M ⇒ varje adressförekomst tillhör exakt en anställd, delning omöjlig',
    'Multivärt attribut transformeras till egen relation med sammansatt PK (FK + attributet)',
    'Valet ska styras av en uttalad verksamhetsregel, inte av modelleringsvana'
  ],
  kalla: '05-logical-database-design.pdf'
},

/* ============================ db-logisk ============================ */
{
  id: 'db-log-01',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilken formell term motsvarar det informella "rad"?',
  alternativ: ['Relation', 'Attribut', 'Tupel', 'Domän'],
  ratt: 2,
  forklaringar: [
    'Fel. Relation motsvarar informellt "tabell" (eller "fil" i den äldre terminologin).',
    'Fel. Attribut motsvarar "kolumn" (eller "fält").',
    'Rätt. Tupel = rad = post. På svenska: tupel/rad/post.',
    'Fel. Domän är mängden av alla tillåtna värden för ett dataelement, ungefär som en datatyp.'
  ],
  forklaring: 'Terminologitabellen: Relation/Tabell/Fil, Attribut/Kolumn/Fält, Tupel/Rad/Post. Antalet attribut kallas relationens *grad* (degree) och antalet tupler dess *kardinalitet*.',
  kalla: '05-logical-database-design.pdf'
},
{
  id: 'db-log-02',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande är INTE en egenskap hos en relation?',
  alternativ: [
    'Varje cell innehåller ett atomärt värde',
    'Ordningen på tuplerna spelar roll',
    'Det får inte finnas duplicerade tupler',
    'Alla värden i ett attribut har samma datatyp och domän'
  ],
  ratt: 1,
  forklaringar: [
    'Fel svar på frågan – detta ÄR en relationsegenskap, och just den som 1NF kodifierar.',
    'Rätt. Ordningen på tuplerna spelar INTE någon roll. En relation är matematiskt en mängd, och mängder är oordnade. Samma sak gäller ordningen på attributen. Det är därför man behöver ORDER BY för att få en garanterad sorteringsordning i resultatet.',
    'Fel svar på frågan – detta ÄR en relationsegenskap. Mängder kan inte innehålla dubbletter.',
    'Fel svar på frågan – detta ÄR en relationsegenskap.'
  ],
  forklaring: 'Relationsegenskaperna: unikt namn, atomära värden, distinkta attributnamn, samma datatyp/domän per attribut, attributordning irrelevant, tupelordning irrelevant, inga dubbletter.',
  kalla: '05-logical-database-design.pdf'
},
{
  id: 'db-log-03',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka två villkor måste en kandidatnyckel K uppfylla?',
  alternativ: [
    'Den ska vara ett heltal och genereras automatiskt av databasen',
    'Unikhet i varje giltigt relationsvärde, och minimalitet',
    'Den ska vara vald av arkitekten och stå först i relationen',
    'Den ska vara unik i den data som finns lagrad just nu'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det beskriver en surrogatnyckel med IDENTITY, inte vad en kandidatnyckel är.',
    'Rätt. Unikhet: inga två tupler har samma värden på K, i varje giltigt relationsvärde. Minimalitet: inget attribut kan tas bort utan att unikheten går förlorad. {EmployeeNo, Name} är unik men inte minimal.',
    'Fel. Den valda är primärnyckeln. Övriga kandidatnycklar finns kvar och måste fortfarande vara unika.',
    'Fel. Unikheten måste vara en verksamhetsregel för alla framtida populationer. Dagens data kan motbevisa en nyckel men aldrig bevisa den.'
  ],
  forklaring: 'Primärnyckeln är en vald kandidatnyckel. EMPLOYEE med CK₁ = {EmployeeNo} och CK₂ = {WorkEmail}: väljs EmployeeNo som PK måste WorkEmail ändå vara unik — i DDL med UNIQUE och NOT NULL.',
  kalla: '05-logical-database-design.pdf'
},
{
  id: 'db-log-04',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur transformeras ett 1:M-samband till ett relationsschema?',
  alternativ: [
    'Skapa en ny relation för själva sambandet som innehåller båda primärnycklarna',
    'Lägg primärnyckeln från ett-sidan som främmande nyckel i relationen på många-sidan',
    'Lägg primärnyckeln från många-sidan som främmande nyckel i relationen på ett-sidan',
    'Slå ihop de båda entiteterna till en enda relation med alla attributen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. En egen relation för sambandet är regeln för M:N, inte för 1:M.',
    'Rätt. Ett-sidans primärnyckel förs in som främmande nyckel på många-sidan. Eventuella enkla relationsattribut hamnar i samma relation. Exempel: Employee(EmployeeNo, Name, Address, Salary, Hours, ProjectNo) med ProjectNo som FK.',
    'Fel. Det skulle kräva att ett-sidan lagrar många värden i en cell, vilket bryter mot 1NF.',
    'Fel. Sammanslagning är ett alternativ endast vid 1:1 med obligatoriskt deltagande på båda sidor.'
  ],
  forklaring: 'Minnesregel: FK hamnar alltid på "många"-sidan. Skälet är atomaritet – många-sidan har exakt ett värde att peka på, medan ett-sidan skulle behöva peka på flera.',
  kalla: '05-logical-database-design.pdf'
},
{
  id: 'db-log-05',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Varje projekt har exakt en ansvarig anställd, och en anställd är ansvarig för högst ett projekt. Du lägger ResponsibleEmployeeNo som FK i PROJECT. Vad mer krävs för att 1:1 ska hållas?',
  alternativ: [
    'Ingenting — främmande nyckeln räcker',
    'ResponsibleEmployeeNo måste också vara en kandidatnyckel (UNIQUE)',
    'EMPLOYEE måste få en FK tillbaka till PROJECT',
    'Sambandet måste få en egen relation'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. FK:n garanterar bara att den anställde finns. Två projekt kan då peka på samma person, och sambandet är 1:N.',
    'Rätt. Föreläsningen: gör den kopierade FK:n till en kandidatnyckel så att varje refererad tupel förekommer högst en gång. NOT NULL på den ger dessutom det totala deltagandet för projekten.',
    'Fel. En FK åt varje håll är onödig dubbellagring; en räcker.',
    'Fel. En separat sambandsrelation är ett tillåtet men sällan föredraget alternativ — och även där krävs att nycklarna är kandidatnycklar.'
  ],
  forklaring: 'Regeln för 1:1: lägg FK:n helst hos sidan med totalt deltagande, och gör den till kandidatnyckel. Är deltagandet totalt för båda kan relationerna också slås ihop, med båda identifierarna som kandidatnycklar — men FK-metoden fungerar alltid.',
  kalla: '05-logical-database-design.pdf'
},
{
  id: 'db-log-06',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Var i designprocessen dyker surrogatnycklar (som EmployeeId) upp enligt HT26-materialet?',
  alternativ: [
    'Redan i ER-modellen, som ett extra understruket attribut på varje entitet',
    'I logisk och fysisk design — ER-modellen har bara verksamhetens identifierare',
    'Först när data har lagts in, eftersom värdena genereras vid INSERT',
    'Aldrig — kursen använder bara naturliga nycklar'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Introduktionsföreläsningen: på den konceptuella nivån är employeeNo och departmentName identifierare; surrogat-ID förekommer bara i logisk och fysisk design.',
    'Rätt. Introduktionsföreläsningen visar en logisk modell med DepartmentId och EmployeeId, där EmployeeNo ligger kvar som extra kandidatnyckel. I fysisk design används surrogatnycklar genomgående.',
    'Fel. IDENTITY-kolumnen definieras i DDL, innan någon data finns.',
    'Fel. Tentans DDL-uppgift kräver tvärtom automatiskt inkrementerande surrogatnycklar för vanliga och svaga entiteter.'
  ],
  forklaring: 'Transformationsföreläsningen räknar med naturliga nycklar för att reglerna ska synas, och det är så du bör lära dig dem. När du skriver DDL byter du till surrogatnyckel som PK och behåller den naturliga nyckeln med UNIQUE + NOT NULL.',
  kalla: '01-introduction.pdf, 05-logical-database-design.pdf, 07-physical-database-design.pdf'
},
{
  id: 'db-log-07',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Transformera följande ER-modell till ett relationsschema: Hotel(Name, Rating) och den svaga entiteten Room(RoomNo, Price), kopplade med en svag M:1-relation Has (många rum till ett hotell). Använd kursens notation R(nyckel, attribut, …).',
  modellsvar:
    'Hotel(Name, Rating)\n' +
    'Room(RoomNumber, HotelName, Price)\n\n' +
    'I Room är den sammansatta primärnyckeln {RoomNumber, HotelName}, där HotelName också är främmande nyckel mot Hotel(Name).',
  steg: [
    'Skapa först en relation för den vanliga (icke-svaga) entiteten Hotel med dess egna attribut. Name är identifierande och blir primärnyckel.',
    'Skapa en relation för den svaga entiteten Room med dess enkla, envärda attribut.',
    'Lägg in ägarentitetens primärnyckel (Hotel.Name) i Room som främmande nyckel – här under namnet HotelName.',
    'Bilda Rooms primärnyckel som kombinationen av den främmande nyckeln och den partiella identifieraren: {RoomNumber, HotelName}.',
    'Kontrollera resultatet mot verkligheten: rumsnummer 101 kan finnas på både Hilton och Grand Hotel, men kombinationen är unik – precis vad den sammansatta nyckeln uttrycker.'
  ],
  forklaring: 'Regeln för svaga entiteter: PK = ägarens PK (som FK) + den partiella identifieraren. Notera att varken RoomNumber eller HotelName är unika var för sig – bara kombinationen.',
  kalla: '05-logical-database-design.pdf, sysb23databaseexercises.pdf övning 7'
},
{
  id: 'db-log-08',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Transformera en unär M:N-relation: entiteten Employee(EmployeeNo, Name, Address, Salary) har relationen Manage med rollnamnen "manage" (M) och "has_manager" (N) mot sig själv. Ange relationsschemat.',
  modellsvar:
    'Employee(EmployeeNo, Name, Address, Salary)\n' +
    'Manage(EmployeeNo, ManagerEmployeeNo)\n\n' +
    'I Manage är {EmployeeNo, ManagerEmployeeNo} sammansatt primärnyckel, och båda attributen är främmande nycklar mot Employee(EmployeeNo).',
  steg: [
    'Behandla den unära relationen precis som en binär – tänk dig två kopior av Employee bredvid varandra.',
    'M:N-regeln gäller: skapa en ny relation för själva sambandet.',
    'Ta med primärnyckeln från båda de deltagande "entiteterna" – men eftersom det är samma entitet måste attributen få olika namn, t.ex. EmployeeNo och ManagerEmployeeNo.',
    'Båda attributen bildar tillsammans den sammansatta primärnyckeln, och båda är samtidigt främmande nycklar mot Employee.',
    'Jämför med den unära 1:M-varianten, som istället bara ger Employee(EmployeeNo, Name, Address, Salary, ManagerNo) med ManagerNo som FK mot samma relation.'
  ],
  forklaring: 'Nyckeln till unära relationer är att rita ut dem som binära med två kopior av entiteten. Skillnaden mot binära fall är bara att attributen måste ges rollspecifika namn för att undvika namnkollision.',
  kalla: '05-logical-database-design.pdf'
},

/* ======================== db-normalisering ======================== */
{
  id: 'db-norm-01',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vad innebär att en relation är i första normalform (1NF)?',
  alternativ: [
    'Att relationen har en primärnyckel',
    'Att värdena i varje attribut är atomära',
    'Att inga transitiva beroenden finns',
    'Att alla attribut är beroende av hela kandidatnyckeln'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Primärnyckel är ett fysiskt designbeslut och ingår inte i 1NF-definitionen.',
    'Rätt. "A relation is in first normal form if the values of each attribute are atomic." En cell med värdet "P1, P5" bryter mot 1NF – varje kombination måste stå på en egen rad.',
    'Fel. Frånvaro av transitiva beroenden är 3NF-kravet.',
    'Fel. Fullständigt beroende av hela kandidatnyckeln är 2NF-kravet.'
  ],
  forklaring: 'Normalformerna bygger på varandra: 3NF förutsätter 2NF, som förutsätter 1NF. 1NF = atomära värden, 2NF = inget icke-primärt attribut beror på en äkta delmängd av en kandidatnyckel, 3NF = inga transitiva beroenden.',
  kalla: '06-normal-forms-normalization.pdf'
},
{
  id: 'db-norm-02',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är ett primärattribut (prime attribute)?',
  alternativ: [
    'Ett attribut som ingår i primärnyckeln',
    'Ett attribut som är medlem i någon kandidatnyckel',
    'Det första attributet i relationen',
    'Ett attribut som aldrig får vara NULL'
  ],
  ratt: 1,
  forklaringar: [
    'Fel – eller åtminstone för snävt. Definitionen utgår från kandidatnycklar, inte bara den valda primärnyckeln. Ett attribut som ingår i en annan kandidatnyckel är också primärt.',
    'Rätt. "An attribute that is a member of some candidate key." I EmployeeProject med kandidatnyckeln {EmployeeNo, ProjectNo} är båda dessa primärattribut, medan Name, Address, ProjectName och Budget är icke-primära.',
    'Fel. Attributordningen saknar betydelse i relationsmodellen.',
    'Fel. NOT NULL är ett constraint på den fysiska nivån.'
  ],
  forklaring: 'Att identifiera primära och icke-primära attribut är det avgörande steget innan man bedömer 2NF och 3NF – båda definitionerna handlar uttryckligen om *icke-primära* attribut.',
  kalla: '06-normal-forms-normalization.pdf'
},
{
  id: 'db-norm-03',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'I vilken normalform är R1(A,B,C,D) med beroendena A → {B,C} och C → D?',
  alternativ: ['1NF', '2NF', '3NF', 'Relationen är inte ens i 1NF'],
  ratt: 1,
  forklaringar: [
    'Fel. Relationen uppfyller 2NF-kravet, så den är i minst 2NF.',
    'Rätt. Kandidatnyckeln är A (A bestämmer B och C, och via C även D). Eftersom kandidatnyckeln inte är sammansatt kan 2NF inte brytas – det finns ingen äkta delmängd att bero på. Men D är transitivt beroende av A: A → C och C → D, utan att C → A. Alltså 2NF, ej 3NF.',
    'Fel. 3NF kräver att inget icke-primärt attribut är transitivt beroende av någon kandidatnyckel, och här är D transitivt beroende av A.',
    'Fel. Inget tyder på icke-atomära värden.'
  ],
  forklaring: 'Arbetsgång: (1) bestäm kandidatnyckel/-nycklar, (2) lista primära och icke-primära attribut, (3) är kandidatnyckeln sammansatt? Om nej kan 2NF inte brytas. (4) Finns transitiva beroenden? Normalisering ger R1(A,B,C) och R2(C,D).',
  kalla: '06-normal-forms-normalization.pdf'
},
{
  id: 'db-norm-04',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'I vilken normalform är R2(A,B,C,D) med beroendena {A,B} → C och B → D?',
  alternativ: ['1NF', '2NF', '3NF', 'Ingen av dem'],
  ratt: 0,
  forklaringar: [
    'Rätt. Kandidatnyckeln är {A,B}. B är en äkta delmängd av kandidatnyckeln och bestämmer det icke-primära attributet D. Det bryter direkt mot 2NF, så relationen är endast i 1NF.',
    'Fel. 2NF kräver att inget icke-primärt attribut beror på en äkta delmängd av en kandidatnyckel – och B → D är precis ett sådant partiellt beroende.',
    'Fel. 3NF förutsätter 2NF, som inte är uppfyllt.',
    'Fel. Relationen är i 1NF; värdena är atomära.'
  ],
  forklaring: 'Nyckelinsikt: 2NF kan bara brytas när kandidatnyckeln är sammansatt. Är kandidatnyckeln ett enda attribut finns inga äkta delmängder att bero på. Normalisering här ger R1(A,B,C) och R2(B,D).',
  kalla: '06-normal-forms-normalization.pdf, sysb23databaseexercises.pdf'
},
{
  id: 'db-norm-05',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'I vilken normalform är R(A,B,C) med beroendena {A,B} → C och C → A?',
  alternativ: ['1NF', '2NF', '3NF', 'Ingen av dem'],
  ratt: 2,
  forklaringar: [
    'Fel. Inga icke-atomära värden och inga partiella beroenden finns.',
    'Fel. Relationen uppfyller även 3NF-kravet, så svaret är för lågt.',
    'Rätt. Kandidatnycklarna är {A,B} och {C,B} (eftersom C → A ger att C och B tillsammans bestämmer allt). Därmed är A, B och C alla primärattribut – det finns inga icke-primära attribut alls. Både 2NF och 3NF handlar uteslutande om icke-primära attribut, så inget av kraven kan brytas.',
    'Fel. Relationen är i 3NF.'
  ],
  forklaring: 'Detta är övningshäftets Exercise 13:2 med facit "3NF (C is a primary attribute and a member of CK {C, B})". Generell regel: saknas icke-primära attribut är relationen automatiskt i 3NF. Missa inte att leta efter *flera* kandidatnycklar.',
  kalla: 'sysb23databaseexercises.pdf övning 13:2'
},
{
  id: 'db-norm-06',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'R(A, B, C) med A → B delas upp i R₁(A, B) och R₂(A, C). Är uppdelningen förlustfri (lossless join)?',
  alternativ: [
    'Ja, eftersom delarna har ett gemensamt attribut',
    'Ja, eftersom de gemensamma attributen {A} bestämmer hela R₁',
    'Nej, eftersom C inte bestäms av någonting',
    'Nej, eftersom B och C hamnat i olika relationer'
  ],
  ratt: 1,
  forklaringar: [
    'Fel skäl. Ett gemensamt attribut räcker inte — det måste bestämma alla attribut i minst en av delarna.',
    'Rätt. Binära testet: R₁ ∩ R₂ = {A}, och {A}⁺ = {A, B} innehåller hela R₁. Då återskapar joinen exakt originalet.',
    'Fel. Att C saknar beroende hindrar inte förlustfrihet; testet handlar om de gemensamma attributen.',
    'Fel. Att attribut hamnar i olika delar är själva poängen med en uppdelning.'
  ],
  forklaring: 'Lossless join: originalrelationen återskapas exakt genom join, för varje population som följer beroendena. Testet för två delar: (R₁ ∩ R₂) → R₁ eller (R₁ ∩ R₂) → R₂, uträknat med de ursprungliga beroendena. Misslyckas det uppstår falska tupler (spurious tuples) — rader som aldrig fanns.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-07',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'R(A, B, C) med A → B, B → C och A → C delas upp i R₁(A, B) och R₂(B, C). Är uppdelningen beroendebevarande?',
  alternativ: [
    'Nej, A → C går förlorat eftersom A och C inte står i samma relation',
    'Ja, de lokala beroendena A → B och B → C implicerar A → C',
    'Nej, eftersom B förekommer i båda relationerna',
    'Det går inte att avgöra utan exempeldata'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. "Samma relation" är ett tillräckligt test, inte ett nödvändigt. A → C följer av de två lokala beroendena genom transitivitet.',
    'Rätt. Definitionen: de beroenden som kan kontrolleras inom varje relation ska tillsammans implicera alla ursprungliga. A → B (i R₁) och B → C (i R₂) ger A → C.',
    'Fel. Ett gemensamt attribut är normalt och behövs dessutom för lossless join.',
    'Fel. Beroendebevarande avgörs ur beroendena, inte ur data.'
  ],
  forklaring: 'Förra årets föreläsning sa bara att ett beroende är bevarat "om dess attribut finns i samma relation". HT26-föreläsningen ger den fullständiga definitionen. Ett beroende är verkligen förlorat först när det inte går att härleda ur de lokala — som i exemplet EmployeeNo → Email när EMPLOYEE delas i (EmployeeNo, Office) och (Email, Office).',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-08',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Ange kandidatnyckel/-nycklar, primära och icke-primära attribut, normalform samt normalisera vid behov till 3NF:\n\nR(A, B, C, D, E)\n{A, B} → C\nA → D\nB → E',
  modellsvar:
    '**Kandidatnyckel:** {A, B}\n' +
    '**Primärattribut:** A, B\n' +
    '**Icke-primära attribut:** C, D, E\n' +
    '**Normalform:** 1NF\n' +
    '**Motivering:** Den äkta delmängden A av kandidatnyckeln {A,B} bestämmer funktionellt det icke-primära attributet D, och delmängden B bestämmer E. Två partiella beroenden bryter alltså mot 2NF.\n\n' +
    '**Normalisering till 3NF:**\n' +
    'R1(A, B, C)  – PK {A, B}\n' +
    'R2(A, D)     – PK A\n' +
    'R3(B, E)     – PK B',
  steg: [
    'Bestäm kandidatnyckel: vilket attribut eller vilken attributmängd bestämmer alla övriga? A ensamt ger bara D, B ensamt bara E – men {A,B} ger C, D och E. Alltså är {A,B} kandidatnyckel.',
    'Klassificera attributen: A och B är primära (ingår i kandidatnyckeln), C, D och E är icke-primära.',
    'Kontrollera 2NF: är kandidatnyckeln sammansatt? Ja ⇒ 2NF kan brytas. Finns beroenden från en äkta delmängd till ett icke-primärt attribut? Ja, både A → D och B → E. ⇒ 1NF.',
    'Normalisera genom dekomposition: bryt ut varje partiellt beroende i en egen relation, med determinanten som primärnyckel.',
    'Kontrollera lossless join med det binära testet, två delar i taget: R1 ∩ R2 = {A} och A → D bestämmer hela R2; den sammanslagna delen ∩ R3 = {B} och B → E bestämmer hela R3. Kontrollera dependency preservation: alla tre beroendena kan kontrolleras inom en enda relation. ✔'
  ],
  forklaring: 'Detta är övningshäftets Exercise 11:3 respektive 12:6, med facit R1(A,B,C), R2(A,D), R3(B,E). Mönstret "sammansatt nyckel där varje del bestämmer sitt eget attribut" är ett av de vanligaste på tentan.',
  kalla: 'sysb23databaseexercises.pdf övning 11:3, 12:6'
},
{
  id: 'db-norm-09',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Ange kandidatnyckel/-nycklar, normalform samt normalisera vid behov till 3NF:\n\nR(A, B, C, D, E, F)\n{A, B} → C\nC → D\nD → {E, F}',
  modellsvar:
    '**Kandidatnyckel:** {A, B}\n' +
    '**Primärattribut:** A, B\n' +
    '**Icke-primära attribut:** C, D, E, F\n' +
    '**Normalform:** 2NF\n' +
    '**Motivering:** Kandidatnyckeln är sammansatt, men varken A eller B ensamt bestämmer något icke-primärt attribut – 2NF är alltså uppfyllt. Däremot finns en kedja av transitiva beroenden: {A,B} → C → D → {E,F}. D är transitivt beroende av {A,B} via C, och E och F via D. Det bryter mot 3NF.\n\n' +
    '**Normalisering till 3NF:**\n' +
    'R1(A, B, C)  – PK {A, B}\n' +
    'R2(C, D)     – PK C\n' +
    'R3(D, E, F)  – PK D',
  steg: [
    'Kandidatnyckel: {A,B} är det enda som (via kedjan) bestämmer samtliga övriga attribut.',
    'Kontrollera 2NF: bestämmer A eller B ensamt något icke-primärt attribut? Nej. ⇒ minst 2NF.',
    'Kontrollera 3NF: leta efter kedjor X → Y → Z där Y inte bestämmer X. Här: {A,B} → C → D, alltså är D transitivt beroende av kandidatnyckeln. ⇒ endast 2NF.',
    'Dekomponera vid varje "led" i kedjan: determinanten blir primärnyckel i sin egen relation tillsammans med det den bestämmer.',
    'Verifiera lossless join två delar i taget: R1 ∩ R2 = {C} och C → D bestämmer hela R2; sedan är gemensamt {D} och D → {E,F} bestämmer hela R3. Alla tre beroendena kan kontrolleras inom var sin relation ⇒ dependency preservation. ✔'
  ],
  forklaring: 'Detta är övningshäftets Exercise 11:8 (facit R1(A,B,C), R2(C,D), R3(D,E,F)). Kedjemönstret {A,B} → C → D → E löses alltid genom att bryta upp kedjan i länkar.',
  kalla: 'sysb23databaseexercises.pdf övning 11:8'
},
{
  id: 'db-norm-10',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'oppen',
  svarighet: 2,
  fraga: 'Förklara uppdaterings-, insättnings- och borttagningsanomali med ASSIGNMENT_REGISTER(EmployeeNo, EmployeeName, DepartmentNo, DepartmentName, ProjectNo, ProjectTitle, AllocationPercentage), där en tupel är ett uppdrag. Varför minskar normalisering risken för dem?',
  modellsvar:
    'Relationen lagrar fyra sorters fakta i samma tupel: om den anställde, om avdelningen, om projektet och om uppdraget. Kandidatnyckeln är {EmployeeNo, ProjectNo}.\n\n' +
    '**Uppdateringsanomali:** P-10 byter titel från Atlas till Atlas Renewal. Titeln står på varje rad där någon arbetar i P-10. Missas en rad har projektet två motstridiga titlar.\n\n' +
    '**Insättningsanomali:** Ett nytt projekt, P-40 Orion, kan inte läggas in innan någon arbetar i det. EmployeeNo ingår i primärnyckeln och kan varken utelämnas eller hittas på.\n\n' +
    '**Borttagningsanomali:** Garys uppdrag på Beacon avslutas. Var det den enda raden som nämnde Beacon försvinner projektet ur databasen, fast det fortfarande finns.\n\n' +
    '**Gemensam orsak:** projektfakta lagras bara inuti uppdragstupler, fast ett projekt kan finnas utan uppdrag. Samma faktum ("P-10 heter Atlas") lagras flera gånger — det är redundans. Att P-10 som referens står på flera rader är däremot inget problem.\n\n' +
    '**Varför normalisering hjälper:** EmployeeName, DepartmentNo och ProjectTitle beror på en del av nyckeln (2NF-brott), och DepartmentName beror på nyckeln via DepartmentNo (3NF-brott). Delas relationen upp i\n\n' +
    'EMPLOYEE(EmployeeNo, EmployeeName, DepartmentNo)\n' +
    'DEPARTMENT(DepartmentNo, DepartmentName)\n' +
    'PROJECT(ProjectNo, ProjectTitle)\n' +
    'WORKS_ON(EmployeeNo, ProjectNo, AllocationPercentage)\n\n' +
    'får varje händelse ett enda mål: namnbytet ändrar en PROJECT-tupel, Orion läggs in i PROJECT utan uppdrag, och Garys uppdrag tas bort ur WORKS_ON medan Beacon finns kvar.\n\n' +
    'Uppdelningen måste dessutom vara förlustfri (lossless join) — annars byter man anomalier mot falska tupler.',
  nyckelpunkter: [
    'Uppdateringsanomali: ett faktum på flera ställen ⇒ risk för motstridiga värden',
    'Insättningsanomali: ett faktum får ingen plats utan ett annat (projekt utan uppdrag)',
    'Borttagningsanomali: att ta bort ett faktum raderar oavsiktligt ett annat',
    'Gemensam orsak: redundans — upprepade fakta, inte upprepade referenser',
    'Normalisering ger varje faktum en egen plats; uppdelningen måste vara lossless'
  ],
  kalla: '06-normalization-and-normal-forms-new.pdf'
},

/* ------------ Tillagt efter HT26-föreläsningarna (4, 5 och 6) ------------ */
{
  id: 'db-kon-09',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'projectNo är ett sammansatt attribut med delarna registrationYear och sequenceNo, och det är helheten som är unik. Hur markeras identifieraren i Chen?',
  alternativ: [
    'Både registrationYear och sequenceNo stryks under',
    'Det sammansatta attributet projectNo stryks under, inte delarna',
    'Delarna stryks under med streckad linje',
    'Ingenting stryks under — sammansatta attribut kan inte identifiera'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Separata understrykningar betyder separata identifierare — att vart och ett av attributen är unikt för sig. Här får både år och löpnummer upprepas.',
    'Rätt. Föreläsningen: "Underline the composite parent." Delarna får upprepas (2026-1 och 2026-2 delar år), bara det fullständiga värdet är unikt.',
    'Fel. Streckad understrykning betyder partiell identifierare hos en svag entitet.',
    'Fel. Ett sammansatt attribut kan mycket väl vara identifierande.'
  ],
  forklaring: 'Jämför med employeeNo och workEmail, som identifierar en anställd var för sig: då stryks båda under, och det är två identifierare — inte en gemensam. Vid transformationen blir en sammansatt identifierare en kandidatnyckel med alla delarna.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-10',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'I ett Chen-diagram med min–max-notation står (1,1) intill Project på sambandet Leads. Vad betyder det, och hur ritas samma sak i kursens standardnotation?',
  alternativ: [
    'Varje projekt deltar exakt en gång; standard: 1 tvärs över och dubbel linje vid Project',
    'Varje projekt har minst en och högst en anställd; standard: (1,1) plus dubbel linje',
    'En anställd leder exakt ett projekt; standard: N vid Project och enkel linje',
    'Projektet är en svag entitet; standard: dubbel ram'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Min–max läses vid sin egen entitet: varje projekt deltar minst 1 och högst 1 gång — leds av exakt en anställd. I standardnotationen blir det 1 intill Employee (läst tvärs över) plus dubbel linje vid Project.',
    'Fel. Min–max-par och dubbla linjer får aldrig blandas i samma diagram.',
    'Fel. Paret står intill Project och beskriver alltså projektens deltagande, inte de anställdas.',
    'Fel. Deltagande och svaghet är olika saker. Obligatoriskt deltagande gör inte en entitet svag.'
  ],
  forklaring: 'Motsvarigheterna: N tvärs över + enkel linje ⇔ (0,N); 1 tvärs över + dubbel linje ⇔ (1,1). I min–max-diagram är alla linjer enkla, eftersom första talet redan bär deltagandekravet.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-11',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Påstående: Project har dubbel linje mot sambandet Leads — varje projekt måste ledas av en anställd — och är därför en svag entitet.',
  alternativ: ['Sant', 'Falskt'],
  ratt: 1,
  forklaringar: [
    'Fel. Obligatoriskt deltagande säger bara att projektet måste delta, inte att det behöver en ägare för att identifieras.',
    'Rätt. Project identifieras av projectNo och är därför stark. Svaghet kräver identitetsberoende: att entitetens fullständiga identitet innehåller ägarens nyckel.'
  ],
  forklaring: 'En svag entitet beror på sin ägare på två sätt: identitet (projectNo + taskNo) och existens (ingen uppgift utan projekt). Den ritas med dubbel ram, det identifierande sambandet med dubbel romb och den partiella identifieraren med streckad understrykning. Kardinaliteten ensam avslöjar inte vilken entitet som är ägare.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-kon-12',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'WorksOn mellan Employee och Project har attributen allocationPercentage och assignmentStartDate. När bör sambandet reifieras till entitetstypen Assignment?',
  alternativ: [
    'Alltid när ett samband har attribut',
    'När parningen måste kunna refereras, delta i andra samband eller ha egen identitet',
    'Aldrig — Chen tillåter inte att samband blir entiteter',
    'Bara när sambandet är 1:1'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Föreläsningen: relationsattribut ensamma tvingar inte fram reifiering. Attributen kan ägas av sambandet.',
    'Rätt. Behåll sambandet så länge modellen bara behöver beskriva parningen. Reifiera när den blir en "sak" i sig — då blir Assignment en vanlig entitet med sambanden Holds och Concerns.',
    'Fel. Reifiering görs med helt vanliga Chen-former: en rektangel och två romber.',
    'Fel. Exemplet är M:N, och det är där reifiering oftast blir aktuell.'
  ],
  forklaring: 'Får Assignment en identifierare som assignmentNo blir det ett nytt åtagande för verksamheten: någon måste dela ut och bevara ett unikt nummer per uppdrag. I Crow’s foot, där linjer saknar plats för attribut, blir ett samband med attribut alltid en associativ entitet.',
  kalla: '04-conceptual-database-design.pdf'
},
{
  id: 'db-norm-11',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'R(A, B, C, D, E) med A → B, B → C och {A, D} → E. Vilken är relationens enda kandidatnyckel?',
  alternativ: ['{A}', '{A, D}', '{A, B, D}', '{D, E}'],
  ratt: 1,
  forklaringar: [
    'Fel. {A}⁺ = {A, B, C}. D och E nås inte, så A är ingen supernyckel.',
    'Rätt. A och D står aldrig på någon högersida och måste därför ingå i varje nyckel. {A, D}⁺ = {A, D, B, C, E} — alla attribut. Paret är minimalt: varken {A}⁺ eller {D}⁺ räcker.',
    'Fel. Det är en supernyckel men inte minimal — B kan strykas eftersom A → B.',
    'Fel. {D, E}⁺ = {D, E}. Ingen av dem bestämmer något.'
  ],
  forklaring: 'Attributslutning: börja med startmängden, använd varje beroende vars hela vänsterled finns i mängden, och fortsätt tills inget nytt tillkommer. Supernyckel = slutningen innehåller alla attribut. Kandidatnyckel = minimal supernyckel.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-12',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad skiljer en kandidatnyckel från en supernyckel?',
  alternativ: [
    'Ingenting, begreppen är synonymer',
    'En kandidatnyckel är en minimal supernyckel — inget attribut kan tas bort',
    'En supernyckel är den valda kandidatnyckeln',
    'En supernyckel består alltid av ett enda attribut'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Varje kandidatnyckel är en supernyckel, men inte tvärtom.',
    'Rätt. En supernyckel bestämmer alla attribut i relationen. En kandidatnyckel gör det också, men slutar göra det om något attribut tas bort. {EmployeeNo, ProjectNo, EmployeeName} är supernyckel; {EmployeeNo, ProjectNo} är kandidatnyckel.',
    'Fel. Den valda kandidatnyckeln är primärnyckeln.',
    'Fel. Supernycklar kan ha hur många attribut som helst, och innehåller ofta onödiga.'
  ],
  forklaring: 'Minimal betyder att inget kan tas bort — inte att alla kandidatnycklar är lika stora. EMPLOYEE kan ha kandidatnycklarna {EmployeeNo} och {WorkEmail}, och en annan relation kan ha en tvådelad.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-13',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'I ASSIGNMENT_REGISTER, där en tupel är ett uppdrag med nyckeln {EmployeeNo, ProjectNo}, går det inte att lägga in ett nytt projekt innan någon arbetar i det. Vilken anomali är det?',
  alternativ: ['Uppdateringsanomali', 'Insättningsanomali', 'Borttagningsanomali', 'Ingen anomali — det är ett nyckelbrott'],
  ratt: 1,
  forklaringar: [
    'Fel. Uppdateringsanomali är när ett faktum står på flera ställen och bara några ändras.',
    'Rätt. Projektet är giltigt men får ingen plats: EmployeeNo ingår i primärnyckeln och kan varken utelämnas eller hittas på.',
    'Fel. Borttagningsanomali är när ett projekt försvinner för att dess sista uppdrag tas bort.',
    'Fel. Nyckeln fungerar som den ska — problemet är att projektfakta bara kan lagras inuti uppdragstupler.'
  ],
  forklaring: 'Alla tre anomalierna har samma orsak: fakta om projekt lagras bara i tupler om uppdrag, fast ett projekt kan finnas utan uppdrag. En egen PROJECT-relation ger projektet en egen plats.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-14',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'R(A, B, C, D) med A → B och C → D delas upp i R₁(A, B) och R₂(B, C, D).\n\nPåstående: uppdelningen har egenskapen lossless join.',
  alternativ: ['Sant', 'Falskt'],
  ratt: 1,
  forklaringar: [
    'Fel. Delarna har ett gemensamt attribut, men det räcker inte.',
    'Rätt. R₁ ∩ R₂ = {B}, och {B}⁺ = {B} — B bestämmer ingenting. Slutningen täcker varken hela R₁ eller hela R₂, så joinen kan ge falska tupler.'
  ],
  forklaring: 'Binära testet: uppdelningen är förlustfri om och endast om (R₁ ∩ R₂)⁺ innehåller alla attribut i minst en av delarna. Hade uppdelningen i stället varit (A, B) och (A, C, D) hade de delat A, och A → B täcker hela den första delen.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-15',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'R(A, B, C, D) med A → B, B → C och C → D delas upp i R₁(A, B), R₂(B, C) och R₃(A, D).\n\nPåstående: samtliga funktionella beroenden från R är bevarade.',
  alternativ: ['Sant', 'Falskt'],
  ratt: 1,
  forklaringar: [
    'Fel. A → B och B → C finns lokalt, men C och D står aldrig i samma relation.',
    'Rätt. De lokala beroendena är A → B, B → C och (i R₃) A → D. Ur dem går C → D inte att härleda, så det beroendet är förlorat.'
  ],
  forklaring: 'Ett splittrat beroende är bara förlorat om det inte följer av de lokala. Här följer A → D av originalet och kan kontrolleras i R₃ — men åt andra hållet hjälper det inte: C → D kan inte härledas ur A → B, B → C och A → D.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},
{
  id: 'db-norm-16',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'R(A, B, C, D) med A → B, B → A och {A, C} → D. Primärnyckeln är {A, C}.\n\nPåstående: B är ett primärattribut.',
  alternativ: ['Sant', 'Falskt'],
  ratt: 0,
  forklaringar: [
    'Rätt. Kandidatnycklarna är {A, C} och {B, C}: C står aldrig på någon högersida, och {B, C}⁺ = {B, C, A, D}. B ingår alltså i en kandidatnyckel och är primärt — att {A, C} valts till primärnyckel ändrar ingenting.',
    'Fel. Primärattribut avgörs av alla kandidatnycklar, inte bara den som valts till primärnyckel.'
  ],
  forklaring: 'Hitta alltid alla kandidatnycklar innan du klassificerar attributen. Här är bara D icke-primärt, och eftersom D beror på hela {A, C} (och på hela {B, C}) är relationen i 3NF.',
  kalla: '06-normalization-and-normal-forms-new.pdf'
},

/* ============================ db-fysisk ============================ */
{
  id: 'db-fys-01',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilken namnkonvention gäller för tabeller enligt kursens kodstandard?',
  alternativ: [
    'camelCase och plural, t.ex. hasStudieds',
    'PascalCase och singular, t.ex. HasStudied',
    'SCREAMING_SNAKE_CASE, t.ex. HAS_STUDIED',
    'snake_case och plural, t.ex. has_studieds'
  ],
  ratt: 1,
  forklaringar: [
    'Fel på båda punkterna. Kodstandarden anger uttryckligen "Incorrect: hasStudied" och "Incorrect: Employees".',
    'Rätt. "Table names should be written in Pascal case and use singular form." Alltså Employee, Patient, Illness, Car – inte Employees eller Patients.',
    'Fel. SCREAMING_SNAKE_CASE reserveras för konstanter och miljövariabler, inte databasobjekt.',
    'Fel. snake_case används i standarden endast för filnamn på SQL-skript, aldrig för tabeller.'
  ],
  forklaring: 'Sammanfattning av SQL-standarden: databas, schema, tabell och kolumn i PascalCase; tabeller i singular; SQL-nyckelord i VERSALER; constraints prefixade PK_/FK_/UQ_/CK_/DF_.',
  kalla: 'codingstandards.pdf, 07-physical-database-design.pdf'
},
{
  id: 'db-fys-02',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad gör IDENTITY(1,1) i en kolumndefinition?',
  alternativ: [
    'Sätter kolumnen till primärnyckel med start på 1 och steg om 1',
    'Gör att databasen automatiskt genererar värden, med startvärde 1 och ökning med 1',
    'Kräver att värdet är unikt, men värdet måste fortfarande anges manuellt',
    'Anger att kolumnen är en främmande nyckel mot en annan tabells primärnyckel'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Primärnyckeln måste deklareras separat med en PRIMARY KEY-constraint. IDENTITY och PRIMARY KEY är två oberoende saker som ofta – men inte alltid – kombineras.',
    'Rätt. Första argumentet är seed (värdet för den allra första raden), andra är increment (vad som läggs till föregående rads värde). Kolumnen utelämnas därför ur INSERT-satsens kolumnlista.',
    'Fel. Unikhet utan autogenerering ges av en UNIQUE-constraint.',
    'Fel. Främmande nycklar deklareras med FOREIGN KEY … REFERENCES. Notera särskilt att FK-kolumner i kopplingstabeller *inte* ska ha IDENTITY – deras värden kommer från de refererade tabellerna.'
  ],
  forklaring: 'IDENTITY(seed, increment) är mekanismen för surrogatnycklar i SQL Server. Namnkonventionen för surrogatnyckelkolumner är tabellnamn + "ID", t.ex. EmployeeID.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-03',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka tre huvudproblem med naturliga nycklar som primärnycklar tar kursmaterialet upp?',
  alternativ: [
    'Kostnad, säkerhet och läsbarhet',
    'Stabilitet, komplexitet och prestanda',
    'Normalisering, indexering och redundans',
    'Integritet, tillgänglighet och konfidentialitet'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Läsbarhet är tvärtom en *fördel* med naturliga nycklar – materialet nämner minskad läsbarhet som en nackdel med surrogatnycklar.',
    'Rätt. (1) Stabilitet: naturliga nycklar ändras ibland (personnummer vid könsbyte eller vid 100-årsdagen, registreringsnummer vid stöld, felinmatade värden) och kräver då ändringar i alla FK-referenser. (2) Komplexitet: sammansatta nycklar måste replikeras i varje refererande tabell. (3) Prestanda: joins på flera VARCHAR- och DATE-kolumner är långsammare än på ett heltal.',
    'Fel. Det är begrepp från normaliseringsteorin, inte från nyckelvalsdiskussionen.',
    'Fel. CIA-triaden hör hemma i informationssäkerhet.'
  ],
  forklaring: 'Konkret exempel ur materialet: Employee med PK {FirstName, LastName, DateOfBirth} kräver att alla tre kolumnerna upprepas i Work-tabellen, och varje join behöver då tre jämförelser av varchar och date istället för en jämförelse av heltal.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-04',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vid användning av surrogatnyckel som primärnyckel – hur bevaras entitetsintegriteten för den naturliga nyckeln?',
  alternativ: [
    'Den bevaras automatiskt eftersom surrogatnyckeln redan garanterar unikhet',
    'Genom att sätta både UNIQUE och NOT NULL på den naturliga nyckelns kolumn(er)',
    'Genom en CHECK-constraint som kontrollerar den naturliga nyckelns värden',
    'Genom att lägga ett vanligt index på den naturliga nyckelns kolumner'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Surrogatnyckeln garanterar bara att *raden* är unik. Utan ytterligare constraints kan man infoga två rader med identiskt EmpNo – de får ju olika EmployeeID.',
    'Rätt. PRIMARY KEY-constraint ger automatiskt både unikhet och NOT NULL, men bara för surrogatnyckeln. För att skydda affärsdatan måste den naturliga nyckeln explicit få UNIQUE (mot dubbletter) och NOT NULL (mot tomma värden).',
    'Fel. CHECK används för domän- och verksamhetsregler, t.ex. att lönen ligger mellan 20000 och 90000, inte för unikhet.',
    'Fel. Ett vanligt index påverkar prestanda men upprätthåller inte unikhet (till skillnad från ett unikt index, som i praktiken är en UNIQUE-constraint).'
  ],
  forklaring: 'Materialet visar exakt vilka insert-satser som annars blir möjliga: en rad med enbart NULL-värden, eller två identiska rader med samma EmpNo. Mönstret blir alltså: PK på surrogatnyckeln + UNIQUE + NOT NULL på varje naturlig nyckel.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-05',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad innebär referensintegritet (referential integrity)?',
  alternativ: [
    'Att varje tabell i databasen måste ha en primärnyckel definierad',
    'Att en främmande nyckel måste matcha ett kandidatnyckelvärde eller vara NULL',
    'Att samtliga kolumner i en relation måste vara satta till NOT NULL',
    'Att inga dubblettvärden får förekomma i någon av tabellens kolumner'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är entitetsintegritet, en annan (om än närbesläktad) regel.',
    'Rätt. "If a relation contains a foreign key then that foreign key must match a candidate key value in its parent relation or be null." Kort sagt: om B refererar till A måste A existera – man får inte arbeta på ett projekt som inte finns.',
    'Fel. NOT NULL är ett domänvillkor på enskilda kolumner.',
    'Fel. Unikhet regleras av UNIQUE- och PRIMARY KEY-constraints.'
  ],
  forklaring: 'NULL i en FK-kolumn är tillåtet och betyder "ingen koppling" – t.ex. en anställd utan avdelning eller en bil utan ägare. Vill man förbjuda det (obligatoriskt deltagande i ER-modellen) sätter man NOT NULL på FK-kolumnen.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-06',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'När ska CHAR användas istället för VARCHAR?',
  alternativ: [
    'När strängarna alltid har samma längd, t.ex. landskoder',
    'När strängarna varierar i längd, t.ex. namn och adresser',
    'När strängarna kan innehålla kinesiska tecken',
    'Alltid – CHAR är snabbare i samtliga fall'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. CHAR reserverar ett fast antal byte oavsett faktisk innehållslängd. Det passar för värden med känd, konstant längd: landskoder (SE, GB, US), delstatskoder (CA, NY, TX).',
    'Fel. Varierande längd är precis vad VARCHAR är till för. CHAR skulle slösa utrymme – CHAR(11) lagrar värdet "1" som 11 byte.',
    'Fel. För tecken utanför latinska alfabetet används NCHAR eller NVARCHAR, eller CHAR/VARCHAR med explicit UTF-8-kollation.',
    'Fel. Valet handlar om lagringseffektivitet och semantik, inte om en generell hastighetsvinst.'
  ],
  forklaring: 'Viktig detalj: argumentet i CHAR(2) och VARCHAR(40) anger antal **byte**, inte antal tecken. Missuppfattningen är vanlig eftersom latinska tecken normalt tar en byte – men N\'张伟\' tar 3 byte per tecken och får inte plats i CHAR(2).',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-07',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad gör ON DELETE CASCADE i en främmande nyckel-constraint?',
  alternativ: [
    'Förhindrar att föräldraraden raderas så länge barnrader finns',
    'Raderar automatiskt de refererande barnraderna när föräldraraden raderas',
    'Sätter barnradernas främmande nyckel till NULL när föräldraraden raderas',
    'Skapar en säkerhetskopia av barnraderna innan föräldraraden raderas'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är standardbeteendet *utan* CASCADE – då blockeras raderingen av FK-constraintet.',
    'Rätt. I materialets exempel har HasStudied ON DELETE CASCADE mot Student. När studenten S1 raderas försvinner automatiskt alla dennes rader i HasStudied. Utan CASCADE hade DELETE-satsen avvisats.',
    'Fel. Det beteendet heter ON DELETE SET NULL och är en annan referensåtgärd.',
    'Fel. Säkerhetskopiering är en helt separat administrativ funktion.'
  ],
  forklaring: 'ON UPDATE CASCADE fungerar analogt vid ändring av föräldrarens nyckelvärde. Materialet påpekar dock att CASCADE inte är att föredra framför surrogatnycklar – en kaskadering kan behöva uppdatera miljontals rader.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-08',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur upprätthålls obligatoriskt deltagande från ER-modellen i den fysiska designen?',
  alternativ: [
    'Med en CHECK-constraint på primärnyckeln',
    'Med NOT NULL på den främmande nyckelns kolumn',
    'Med ON DELETE CASCADE på den främmande nyckeln',
    'Med en UNIQUE-constraint på den främmande nyckeln'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. CHECK används för värdebaserade regler, t.ex. att EmpNo börjar med E eller att lönen ligger inom ett intervall.',
    'Rätt. "An employee must work at exactly one department" implementeras som DepartmentID INTEGER NOT NULL. Ett försök att infoga en anställd med NULL i DepartmentID avvisas då av databasen.',
    'Fel. CASCADE styr vad som händer vid radering, inte om kopplingen måste finnas.',
    'Fel. UNIQUE på FK-kolumnen skulle tvinga fram ett 1:1-samband – varje avdelning skulle bara kunna ha en enda anställd.'
  ],
  forklaring: 'Översättningstabell: obligatoriskt deltagande ⇒ NOT NULL på FK. Frivilligt deltagande ⇒ FK får vara NULL. 1:1-samband ⇒ UNIQUE på FK-kolumnen.',
  kalla: '07-physical-database-design.pdf'
},
{
  id: 'db-fys-09',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Skriv DDL för följande modell: entiteten A med det unika attributet A1 och attributet A2, entiteten B med det unika attributet B1, samt en M:N-relation R mellan A och B med relationsattributet Ra. Alla kolumner är INTEGER. Använd surrogatnycklar och kursens namnkonventioner.',
  modellsvar:
    "CREATE TABLE A (\n" +
    "    AID INTEGER IDENTITY(1,1), -- Surrogatnyckel\n" +
    "    A1 INTEGER NOT NULL,       -- Naturlig nyckel: NOT NULL + UNIQUE\n" +
    "    A2 INTEGER,\n" +
    "    CONSTRAINT PK_A_AID PRIMARY KEY (AID),\n" +
    "    CONSTRAINT UQ_A_A1 UNIQUE (A1)\n" +
    ");\n\n" +
    "CREATE TABLE B (\n" +
    "    BID INTEGER IDENTITY(1,1), -- Surrogatnyckel\n" +
    "    B1 INTEGER NOT NULL,\n" +
    "    CONSTRAINT PK_B_BID PRIMARY KEY (BID),\n" +
    "    CONSTRAINT UQ_B_B1 UNIQUE (B1)\n" +
    ");\n\n" +
    "CREATE TABLE R (\n" +
    "    AID INTEGER,               -- FK, INTE IDENTITY\n" +
    "    BID INTEGER,\n" +
    "    Ra INTEGER,                -- Relationsattribut, ej del av PK\n" +
    "    CONSTRAINT PK_R_AID_BID PRIMARY KEY (AID, BID),\n" +
    "    CONSTRAINT FK_R_A_AID FOREIGN KEY (AID) REFERENCES A(AID),\n" +
    "    CONSTRAINT FK_R_B_BID FOREIGN KEY (BID) REFERENCES B(BID)\n" +
    ");",
  steg: [
    'Skapa en tabell per vanlig entitet. Varje sådan tabell får en surrogatnyckel enligt konventionen tabellnamn + ID, deklarerad som INTEGER IDENTITY(1,1).',
    'Skydda den naturliga nyckeln med NOT NULL + UNIQUE så att entitetsintegriteten bevaras trots att surrogatnyckeln är PK.',
    'M:N-relationen får en egen kopplingstabell med de båda surrogatnycklarna som kolumner.',
    'Kopplingstabellens primärnyckel är kombinationen av de två främmande nycklarna. Relationsattributet Ra står utanför primärnyckeln.',
    'Kopplingstabellens FK-kolumner ska INTE ha IDENTITY – deras värden hämtas från de refererade tabellerna. Namnge alla constraints med prefix PK_/FK_/UQ_ enligt kodstandarden.'
  ],
  forklaring: 'Detta är mönstret från övningshäftets facit (Exercise 18–22). Notera att kopplingstabeller normalt inte får en egen surrogatnyckel – det behövs bara om något annat i sin tur ska referera till kopplingsraderna, vilket ligger utanför kursen.',
  kalla: 'sysb23databaseexercises.pdf övning 18–22, 07-physical-database-design.pdf'
},
{
  id: 'db-fys-10',
  delkurs: 'databaser',
  amne: 'db-fysisk',
  typ: 'praktisk',
  svarighet: 2,
  fraga: 'Skriv DDL för tabellen Employee som uppfyller verksamhetsreglerna: unikt anställningsnummer som måste börja med bokstaven E, adressen måste vara antingen "Lund" eller "New York", och lönen får inte understiga 20000 eller överstiga 90000.',
  modellsvar:
    "CREATE TABLE Employee (\n" +
    "    EmployeeID INTEGER IDENTITY(1,1), -- Surrogatnyckel\n" +
    "    EmpNo VARCHAR(10) NOT NULL,\n" +
    "    EmpName VARCHAR(100),\n" +
    "    EmpAddress VARCHAR(100),\n" +
    "    EmpSalary DECIMAL(10, 2),\n" +
    "    CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY (EmployeeID),\n" +
    "    CONSTRAINT UQ_Employee_EmpNo UNIQUE (EmpNo),\n" +
    "    CONSTRAINT CK_Employee_EmpNo CHECK (EmpNo LIKE 'E__'),\n" +
    "    CONSTRAINT CK_Employee_Address CHECK (EmpAddress IN ('Lund', 'New York')),\n" +
    "    CONSTRAINT CK_Employee_Salary CHECK (EmpSalary BETWEEN 20000 AND 90000)\n" +
    ");",
  steg: [
    'Surrogatnyckel + PK-constraint enligt standardmönstret.',
    'Regeln "unikt anställningsnummer" ger UNIQUE + NOT NULL på EmpNo.',
    "Regeln om begynnelsebokstav uttrycks med CHECK och LIKE: 'E__' kräver E följt av exakt två tecken. Vill man bara låsa begynnelsebokstaven utan längdkrav används 'E%'.",
    "Regeln om tillåtna adresser blir CHECK med IN-operatorn: EmpAddress IN ('Lund', 'New York').",
    'Regeln om löneintervall blir CHECK med BETWEEN, som är inklusivt i båda ändar – 20000 och 90000 är alltså tillåtna värden.'
  ],
  forklaring: 'CHECK-constraints är verktyget för sådana verksamhetsregler som ER-modellen inte kan uttrycka. Namnge dem med prefixet CK_ och beskrivande namn – annars genererar SQL Server obegripliga namn som CK__Employee__AF2D66D3, vilket gör felmeddelanden svårtolkade.',
  kalla: '07-physical-database-design.pdf'
}

);
