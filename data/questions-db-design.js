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
  fraga: 'Vad är en entitetstyp i ER-modellering?',
  alternativ: [
    'En kolumn i en databastabell',
    'En mängd saker med samma egenskaper som av användaren eller organisationen identifieras som havande en oberoende existens',
    'Ett samband mellan två tabeller',
    'Ett villkor som begränsar vilka värden ett attribut får anta'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. En kolumn motsvarar ett *attribut* på den konceptuella nivån. Entiteten är det som attributen beskriver.',
    'Rätt. Detta är kursens definition. Nyckelordet är "oberoende existens": Address är ett attribut till Student så länge vi inte behöver lagra data om adresser oberoende av studenter – först då blir Address en egen entitet.',
    'Fel. Ett samband är en *relationship*, ritad som en romb i Chen-notation.',
    'Fel. Det beskriver ett constraint, vilket hör hemma på den fysiska nivån (t.ex. CHECK).'
  ],
  forklaring: 'Entiteter kan ha fysisk existens (Student) eller konceptuell existens (Course). Testet för om något ska vara entitet eller attribut är just den oberoende existensen – behöver verksamheten lagra data om saken för sin egen skull?',
  kalla: '04conceptualdatabasedesign.pdf'
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
    'Med en fylld pilspets'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Romben är själva symbolen för en relation och säger inget om deltagande.',
    'Rätt. Dubbla linjer indikerar att entiteten måste delta i relationen. En vanlig enkel linje betyder frivilligt (icke-obligatoriskt) deltagande.',
    'Fel. Understrykning används för identifierande attribut (nyckelattribut), inte för multiplicitet.',
    'Fel. Pilspetsar tillhör inte Chen-notationen; de förekommer i vissa andra notationer.'
  ],
  forklaring: 'Två oberoende dimensioner beskriver ett samband: (1) multiplicitet – 1:1, 1:M eller M:N, och (2) deltagande – obligatoriskt eller frivilligt per sida. I UML uttrycks båda samtidigt av multiplicitetsintervallet, t.ex. 1..1 mot 0..*.',
  kalla: '04conceptualdatabasedesign.pdf'
},
{
  id: 'db-kon-03',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför ska man skriva M:N och inte M:M för ett många-till-många-samband?',
  alternativ: [
    'Det är bara en stilfråga utan betydelse',
    'M:M skulle innebära att båda sidorna har exakt samma multiplicitet, vilket är en annan (och felaktig) utsaga',
    'M:N krävs av SQL Server',
    'M:M är reserverat för unära relationer'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kursmaterialet är uttryckligt: "Using M:M would be incorrect".',
    'Rätt. Samma bokstav på båda sidor säger att antalet är detsamma i båda riktningarna. Två olika bokstäver, M och N, markerar att multipliciteterna är oberoende av varandra – en student kan läsa 5 kurser medan en kurs har 200 studenter.',
    'Fel. ER-notation är en modelleringskonvention, inte något SQL Server har åsikter om.',
    'Fel. Unära (rekursiva) relationer använder samma notationsregler som binära.'
  ],
  forklaring: 'M och N är fristående variabler för "många". Att använda samma symbol två gånger vore att påstå att värdena alltid är lika.',
  kalla: '04conceptualdatabasedesign.pdf'
},
{
  id: 'db-kon-04',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Ett universitet har unikt namn. En kurs har kurskod, namn och poäng, men kurskoden är unik endast inom det universitet som ger kursen. Hur modelleras kursen?',
  alternativ: [
    'Som en vanlig entitet med CourseCode som identifierande attribut',
    'Som en svag entitet med CourseCode som partiell identifierare, kopplad till University via en svag (identifierande) relation',
    'Som ett multivärt attribut på University',
    'Som en härledd entitet'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. CourseCode ensam identifierar inte en kurs – Lunds SYSB23 och Uppsalas SYSB23 är olika kurser med samma kod.',
    'Rätt. En svag entitet kan inte identifieras av sina egna attribut ensamma, utan behöver ägarentitetens nyckel. Kursen ritas med dubbel ram, relationen Offer med dubbel ram, och CourseCode markeras som partiell identifierare (streckad understrykning).',
    'Fel. Ett multivärt attribut kan inte i sin tur ha egna attribut som namn och poäng. Kursen behöver vara en entitet.',
    'Fel. "Härledd" gäller attribut som kan beräknas ur andra attribut, t.ex. Age ur DateOfBirth.'
  ],
  forklaring: 'Testet för svag entitet: räcker entitetens egna attribut för att unikt identifiera en förekomst? Om inte – och identifieringen kräver ägarens nyckel – är entiteten svag. Vid transformationen blir ägarens primärnyckel en del av den svaga entitetens sammansatta primärnyckel.',
  kalla: '04conceptualdatabasedesign.pdf'
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
    'Ett attribut som är primärnyckel i båda entiteterna',
    'Ett attribut som alltid måste vara NULL'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Attribut som beskriver entiteten hör till entiteten, oavsett var de ritas.',
    'Rätt. Relationsattribut representerar data som uppstår genom sambandet: bara en student som *har läst* en kurs kan tilldelas ett betyg. Grade hör alltså varken till Student eller Course utan till relationen HasStudied. Används mest vid M:N men kan förekomma vid 1:M och 1:1.',
    'Fel. Det beskriver hur en kopplingstabells sammansatta primärnyckel bildas vid transformationen, inte vad ett relationsattribut är.',
    'Fel. Relationsattribut har normala värden; NULL har inget med saken att göra.'
  ],
  forklaring: 'Vid transformationen av M:N hamnar relationsattributet i kopplingsrelationen – men det blir INTE en del av primärnyckeln. Exempel: Work(EmployeeNo, ProjectNo, Hours) där bara de två första är understrukna.',
  kalla: '04conceptualdatabasedesign.pdf, 05logicaldatabasedesign.pdf'
},
{
  id: 'db-kon-06',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka modelleringselement saknas i Crow’s foot-notation (Visual Paradigm) jämfört med Chen-notation?',
  alternativ: [
    'Entiteter och relationer',
    'Multivärda attribut, härledda attribut och sammansatta attribut',
    'Primärnycklar och främmande nycklar',
    'Multiplicitet och obligatoriskt deltagande'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Entiteter och relationer är just kärnan i Crow’s foot-notationen.',
    'Rätt. Materialet påpekar att multivärda attribut är ett konceptuellt element som saknas i Crow’s foot – man måste lösa det med en egen entitet. Härledda attribut går inte heller att visa, och Visual Paradigm kan inte visa sammansatta attribut.',
    'Fel. Visual Paradigm markerar tvärtom nycklar med en nyckelsymbol.',
    'Fel. Multiplicitet och obligatoriskt deltagande är just vad "kråkfoten" och linjerna uttrycker.'
  ],
  forklaring: 'Notationsval har konsekvenser för vad som går att uttrycka. Crow’s foot saknar dessutom ett standardiserat sätt att visa svaga entiteter – Visual Paradigm använder en heldragen linje för identifierande relation istället för streckad.',
  kalla: '04conceptualdatabasedesign.pdf'
},
{
  id: 'db-kon-07',
  delkurs: 'databaser',
  amne: 'db-konceptuell',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande går INTE att uttrycka i en ER-modell?',
  alternativ: [
    'Att en student måste läsa minst en kurs',
    'Att en students e-postadress måste sluta på @student.lu.se',
    'Att en student kan ha flera adresser',
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
  kalla: '04conceptualdatabasedesign.pdf'
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
  kalla: '05logicaldatabasedesign.pdf'
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
  kalla: '05logicaldatabasedesign.pdf'
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
  kalla: '05logicaldatabasedesign.pdf'
},
{
  id: 'db-log-03',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan en kandidatnyckel och en primärnyckel?',
  alternativ: [
    'Ingen skillnad, det är synonymer',
    'En kandidatnyckel kan unikt identifiera en tupel; primärnyckeln är den kandidatnyckel databasarkitekten valt',
    'Kandidatnyckeln är alltid sammansatt, primärnyckeln alltid enkel',
    'Primärnyckeln får innehålla NULL, kandidatnyckeln får inte det'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. En relation kan ha flera kandidatnycklar men bara en primärnyckel.',
    'Rätt. Alla attribut eller attributmängder som unikt identifierar en tupel är kandidatnycklar. Databasarkitekten väljer en av dem till primärnyckel – helst en som är stabil, minimal och semantiskt meningsfull.',
    'Fel. Båda kan vara enkla eller sammansatta. Employee(EmployeeNo, FirstName, LastName, Email) kan t.ex. ha kandidatnycklarna EmployeeNo (enkel) och {FirstName, LastName} (sammansatt).',
    'Fel. Primärnyckeln får aldrig innehålla NULL – det är entitetsintegritet. Inte heller någon delmängd av en sammansatt primärnyckel får vara NULL.'
  ],
  forklaring: 'Kandidatnyckel = kan vara nyckel. Primärnyckel = är vald till nyckel. Övriga kandidatnycklar bör i den fysiska designen få UNIQUE- och NOT NULL-constraints så att deras unikhet bevaras.',
  kalla: '05logicaldatabasedesign.pdf'
},
{
  id: 'db-log-04',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur transformeras ett 1:M-samband till ett relationsschema?',
  alternativ: [
    'Skapa en ny relation för sambandet med båda primärnycklarna',
    'Lägg primärnyckeln från ett-sidan som främmande nyckel i relationen på många-sidan',
    'Lägg primärnyckeln från många-sidan som främmande nyckel i relationen på ett-sidan',
    'Slå ihop entiteterna till en enda relation'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. En egen relation för sambandet är regeln för M:N, inte för 1:M.',
    'Rätt. Ett-sidans primärnyckel förs in som främmande nyckel på många-sidan. Eventuella enkla relationsattribut hamnar i samma relation. Exempel: Employee(EmployeeNo, Name, Address, Salary, Hours, ProjectNo) med ProjectNo som FK.',
    'Fel. Det skulle kräva att ett-sidan lagrar många värden i en cell, vilket bryter mot 1NF.',
    'Fel. Sammanslagning är ett alternativ endast vid 1:1 med obligatoriskt deltagande på båda sidor.'
  ],
  forklaring: 'Minnesregel: FK hamnar alltid på "många"-sidan. Skälet är atomaritet – många-sidan har exakt ett värde att peka på, medan ett-sidan skulle behöva peka på flera.',
  kalla: '05logicaldatabasedesign.pdf'
},
{
  id: 'db-log-05',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Ett 1:1-samband där båda sidorna har obligatoriskt deltagande och inget annat samband finns mellan entiteterna. Vilka transformationsalternativ finns?',
  alternativ: [
    'Endast att slå ihop de två entiteterna till en relation',
    'Antingen slå ihop dem till en relation, eller använda främmande nyckel-metoden där arkitekten väljer riktning',
    'Endast att skapa en separat kopplingsrelation',
    'Det går inte att transformera ett sådant samband'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Sammanslagning är tillåtet, men inte det enda alternativet.',
    'Rätt. Materialet listar tre alternativ: (1) en gemensam relation EmployeeProject(…), (2) ProjectNo som FK i Employee, eller (3) EmployeeNo som FK i Project. Databasarkitekten väljer – båda FK-riktningarna fungerar.',
    'Fel. En separat kopplingsrelation är M:N-mönstret och skulle här ge onödig komplexitet.',
    'Fel. Sambandet är fullt transformerbart, med flera giltiga alternativ.'
  ],
  forklaring: 'Regeln om sammanslagning gäller bara när båda sidorna är obligatoriska OCH inget annat samband (t.ex. en 1:N-relation) finns mellan entiteterna. Vid 1:1 med obligatorisk sida på bara en av entiteterna placeras FK:n hos den obligatoriska sidan.',
  kalla: '05logicaldatabasedesign.pdf'
},
{
  id: 'db-log-06',
  delkurs: 'databaser',
  amne: 'db-logisk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför införs INTE surrogatnycklar redan i den logiska databasdesignen?',
  alternativ: [
    'De stöds inte av relationsmodellen',
    'Den logiska modellen ska bevara ER-modellens semantik och naturliga identifierare; surrogatnycklar är en fysisk optimering',
    'De skulle bryta mot 3NF',
    'De kan bara skapas efter att data har lagts in'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Relationsmodellen har inga invändningar mot artificiella nycklar – de är fullt giltiga kandidatnycklar.',
    'Rätt. Materialet motiverar detta med tre skäl: konceptuell klarhet (naturliga identifierare från ER-modellen), bevarad mening (naturliga nycklar speglar verkliga verksamhetsregler), och att surrogatnycklar är en fysisk optimering för implementation, indexering och joins.',
    'Fel. Surrogatnycklar bryter inte mot någon normalform.',
    'Fel. IDENTITY-kolumner definieras i DDL, alltså innan någon data finns.'
  ],
  forklaring: 'Surrogatnycklar introduceras i den fysiska designen, valda utifrån nyckelstabilitet, prestanda och enkelhet. Semantiskt är surrogatnyckeln en "surrogat" (ställföreträdare) för den naturliga nyckeln, som behålls med UNIQUE + NOT NULL.',
  kalla: '05logicaldatabasedesign.pdf, 07-physical-database-design.pdf'
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
  kalla: '05logicaldatabasedesign.pdf, sysb23databaseexercises.pdf övning 7'
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
  kalla: '05logicaldatabasedesign.pdf'
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
  kalla: '06normalformsnormalization.pdf'
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
  kalla: '06normalformsnormalization.pdf'
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
  kalla: '06normalformsnormalization.pdf'
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
  kalla: '06normalformsnormalization.pdf, sysb23databaseexercises.pdf'
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
  fraga: 'Vad innebär att en dekomposition har egenskapen lossless join?',
  alternativ: [
    'Att inga rader går förlorade vid en DELETE',
    'Att en naturlig join av de mindre relationerna återskapar den ursprungliga relationen',
    'Att alla funktionella beroenden bevaras',
    'Att alla resulterande relationer är i 3NF'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Egenskapen gäller schemadesign, inte DML-operationer.',
    'Rätt. Lossless join (non-additive join) betyder att man kan joina ihop delrelationerna och få tillbaka exakt originalrelationen. Bryter man R(A,B,C,D,E,F) i R1(A,B,C) och R2(D,E,F) saknas gemensamma attribut helt – de går inte att joina, och kopplingen mellan delarna är förlorad.',
    'Fel. Det är dependency preservation, en separat egenskap. En dekomposition kan ha den ena utan den andra.',
    'Fel. Delrelationerna kan mycket väl vara i 3NF var för sig och ändå sakna lossless join – vilket är precis poängen i materialets exempel.'
  ],
  forklaring: 'I exemplet med Employee och Project är båda relationerna i 3NF, men efter dekompositionen vet man inte längre vem som arbetar i vilket projekt. Lösningen är en kopplingsrelation Work(EmployeeNo, ProjectNo), som återställer lossless join.',
  kalla: '06normalformsnormalization.pdf'
},
{
  id: 'db-norm-07',
  delkurs: 'databaser',
  amne: 'db-normalisering',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'När är ett funktionellt beroende bevarat (dependency preservation) efter en dekomposition?',
  alternativ: [
    'När båda de ingående attributen finns i samma relation',
    'När attributen finns någonstans i schemat, oavsett relation',
    'När beroendet gäller mellan primärnycklar',
    'När relationen är i 3NF'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Kursmaterialets formulering: "A functional dependency is preserved if its two constituent attributes exist in the same relation." Splittras X och Y i olika relationer kan beroendet X → Y inte längre upprätthållas lokalt.',
    'Fel. Det räcker inte att attributen finns kvar någonstans – de måste finnas i samma relation för att beroendet ska kunna kontrolleras.',
    'Fel. Beroendet kan gälla vilka attribut som helst, inte bara nycklar.',
    'Fel. 3NF och dependency preservation är oberoende egenskaper.'
  ],
  forklaring: 'I materialets exempel förloras EmployeeNo → ProjectName vid dekompositionen, eftersom EmployeeNo hamnar i Employee och ProjectName i Project. Konsekvensen är att beroendet måste upprätthållas av applikationen istället för av databasen.',
  kalla: '06normalformsnormalization.pdf'
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
    'Kontrollera lossless join: R1 delar A med R2 och B med R3, så relationerna kan joinas tillbaka. Kontrollera dependency preservation: alla tre beroendena har båda sina attribut inom samma relation. ✔'
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
    'Verifiera: R1 och R2 delar C, R2 och R3 delar D ⇒ lossless join. Alla tre beroendena är intakta inom var sin relation ⇒ dependency preservation. ✔'
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
  fraga: 'Förklara vad update- och deletionsanomalier är, och varför normalisering minskar risken för dem. Använd relationen EmployeeProject(EmployeeNo, Name, Address, ProjectNo, ProjectName, Budget) som exempel.',
  modellsvar:
    'Anomalierna uppstår därför att relationen blandar information om två olika entiteter – anställda och projekt – i samma tabell. Det gör att uppgifter om ett projekt upprepas på varje rad där någon arbetar i projektet.\n\n' +
    '**Uppdateringsanomali:** Om budgeten för projekt P3 ska höjas måste flera celler ändras, eftersom P3 förekommer på raderna för både E4 och E5. Ändras bara en av dem blir datan inkonsistent – databasen påstår då två olika budgetar för samma projekt.\n\n' +
    '**Borttagningsanomali:** Om projekt P3 tas bort försvinner även raderna för E4 och E5, alltså all information om två anställda. Att radera information om en entitet ska normalt inte medföra att information om en helt annan entitet går förlorad.\n\n' +
    '**Varför normalisering hjälper:** Anomalierna orsakas av redundans, som i sin tur orsakas av att attribut är funktionellt beroende av något annat än hela kandidatnyckeln. Genom dekomposition till\n\n' +
    'Employee(EmployeeNo, Name, Address, ProjectNo)\n' +
    'Project(ProjectNo, ProjectName, Budget)\n\n' +
    'lagras varje projektfaktum på exakt ett ställe. En budgetändring blir en cell, och att ta bort ett projekt påverkar inte de anställdas grunddata. Ju högre normalform, desto mindre redundans och desto mindre utrymme för anomalier.\n\n' +
    'Man bör dock kontrollera att dekompositionen har lossless join – annars har man bytt en anomali mot informationsförlust.',
  nyckelpunkter: [
    'Uppdateringsanomali: samma faktum lagrat på flera ställen ⇒ risk för inkonsistens',
    'Borttagningsanomali: radering av en entitet raderar oavsiktligt data om en annan',
    'Grundorsaken är redundans, som beror på beroenden av annat än hela kandidatnyckeln',
    'Dekomposition ger ett faktum på exakt ett ställe',
    'Dekompositionen måste bevara lossless join för att inte skapa nya problem'
  ],
  kalla: '06normalformsnormalization.pdf'
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
    'Sätter kolumnen till primärnyckel',
    'Gör att databasen automatiskt genererar värden, med startvärde 1 och ökning med 1',
    'Kräver att värdet är unikt men inte automatiskt genererat',
    'Anger att kolumnen är en främmande nyckel'
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
    'Den bevaras automatiskt av surrogatnyckeln',
    'Genom att sätta både UNIQUE och NOT NULL på den naturliga nyckelns kolumn(er)',
    'Genom en CHECK-constraint',
    'Genom att lägga till ett index'
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
    'Att alla tabeller måste ha en primärnyckel',
    'Att en främmande nyckels värde måste matcha ett kandidatnyckelvärde i föräldrarelationen, eller vara NULL',
    'Att alla kolumner måste ha NOT NULL',
    'Att inga dubbletter får förekomma i någon kolumn'
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
    'Sätter barnradernas främmande nyckel till NULL',
    'Skapar en säkerhetskopia innan raderingen'
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
    'Med ON DELETE CASCADE',
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
