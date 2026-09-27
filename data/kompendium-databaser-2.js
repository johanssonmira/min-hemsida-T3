/* =========================================================================
   Kompendium – Databaser, kapitel 6–10 (design, DDL och applikation)
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.databaser.kapitel.push(

/* ====================== KAPITEL 6 ====================== */
{
  id: 'db-k6',
  nr: 6,
  titel: 'Konceptuell design: ER-modellering',
  ingress: 'Entiteter, attribut och identifierare, kardinalitet och deltagande, svaga och associativa entiteter — och vad notationen inte klarar.',
  lastid: 16,
  amnen: ['db-konceptuell'],
  avsnitt: [
    {
      rubrik: 'Vem bestämmer vad databasen ska innehålla?',
      text:
        'Frågan besvaras inte av databasadministratören ensam. Man utgår från: *"Vad behöver vår ' +
        'verksamhet lagra data om för att fungera?"*\n\n' +
        '- Vilken data kräver våra affärsprocesser?\n' +
        '- Vilken data behövs för kvalitetssäkring?\n' +
        '- Vilken data behövs för regelefterlevnad?\n' +
        '- Vilken data behövs för intern rapportering?\n\n' +
        '**Verksamhetssidan måste alltid konsulteras.** Resultatet av dialogen är ofta en lista av saker — ' +
        'och det är den listan man modellerar.\n\n' +
        'En **konceptuell datamodell är en abstraktion av verkligheten**. Den är en abstraktion just ' +
        'därför att vi medvetet tagit med vissa attribut och uteslutit andra. En verklig student har ett ' +
        'närmast oändligt antal egenskaper man skulle kunna lagra.'
    },
    {
      rubrik: 'Entiteter',
      text:
        'Föreläsningen utgår från Peter Chens egen definition från 1976:\n\n' +
        '> **Entitet:** *en "sak" som kan identifieras distinkt* — modellen kan skilja den från varje ' +
        'annan entitet.\n\n' +
        'Håll isär tre nivåer:\n\n' +
        '- **Entitetstyp** — kategorin, till exempel Employee. Den grupperar entiteter med samma ' +
        'relevanta egenskaper och ritas som en rektangel. Namnet är ett substantiv i singular.\n' +
        '- **Entitetsmängd** — alla entiteter av typen som finns just nu. Den kan växa, krympa eller ' +
        'vara tom.\n' +
        '- **Entitet** — en enskild medlem, till exempel Mary med nummer E-104.\n\n' +
        'En entitet är en **informationsabstraktion**, inte en fullständig beskrivning. En verklig ' +
        'person har längd och vikt, men personalverksamheten behöver bara namn, anställningsdatum och ' +
        'jobbmejl — resten lämnas utanför modellen.\n\n' +
        'En **stark entitetstyp** kan identifiera varje entitet utan att vara beroende av en entitet av ' +
        'en annan typ. Den ritas med en enkel rektangel.\n\n' +
        'Samma test som förr gäller när du tvekar mellan attribut och entitet: Address är ett attribut ' +
        'till Student så länge verksamheten inte behöver lagra data om adresser **för deras egen ' +
        'skull**. Gör den det blir Address en egen entitetstyp.' +
        '\n\n[[diagram:chen-grund]]'
    },
    {
      rubrik: 'Attributtyper',
      text:
        'Ett **attribut** är en namngiven egenskap hos en entitetstyp — eller hos en sambandstyp. I Chen ' +
        'ritas det som en oval kopplad till sin ägare. Varje attribut rymmer flera beslut:\n\n' +
        '| Fråga | Val | Chen-symbol |\n' +
        '|---|---|---|\n' +
        '| Kan det delas upp? | **Enkelt** eller **sammansatt** (address = gata, nummer, postnr, ort) | Sammansatt: ovaler för delarna hänger på ovalen |\n' +
        '| Hur många värden? | **Envärt** eller **multivärt** (flera telefonnummer) | Multivärt: **dubbel oval** |\n' +
        '| Hur fås det? | **Lagrat** eller **härlett** (yearsEmployed ur hireDate) | Härlett: **streckad oval** |\n' +
        '| Måste det finnas? | **Obligatoriskt** eller **frivilligt** | Ingen gemensam symbol — skriv ut regeln |\n' +
        '| Vilka värden är giltiga? | En **domän** (värdemängd) | Dokumenteras utanför diagrammet |\n\n' +
        'Ett härlett attribut kan bero på ett samband, inte bara på entitetens egna attribut: ' +
        'numberOfEmployees för ett projekt räknas fram ur hur många anställda som är kopplade via WorksOn.\n\n' +
        '**Identifierare.** Ett attribut, eller en kombination, vars värden skiljer varje entitet i ' +
        'mängden från alla andra — i **varje** giltig population, inte bara i dagens data. I Chen ' +
        'markeras det med **understrykning**. Tre fall att hålla isär:\n\n' +
        '- **Ett enkelt identifierande attribut:** projectNo understruket.\n' +
        '- **Ett sammansatt identifierande attribut:** projectNo består av registrationYear och ' +
        'sequenceNo. Då stryks **det sammansatta attributet** under, **inte** delarna. Delarna får ' +
        'upprepas (2026-1 och 2026-2 delar år), bara helheten är unik.\n' +
        '- **Flera identifierande attribut:** både employeeNo och workEmail identifierar en anställd var ' +
        'för sig. Då stryks **båda** under — **separata understrykningar betyder separata ' +
        'identifierare**, inte en gemensam.\n\n' +
        'Varje identifierare blir en **kandidatnyckel** i nästa steg.' +
        '\n\n[[diagram:attribut]]'
    },
    {
      rubrik: 'Samband: multiplicitet och deltagande',
      text:
        'En **binär sambandstyp** har exakt två deltagande roller och ritas som en romb. Ett ' +
        '**sambandsförekomst** är ett par av entiteter, till exempel ⟨Mary, Atlas⟩ i WorksOn, och ' +
        '**sambandsmängden** är alla sådana par just nu. Rollnamn (worker, project) behövs först när ' +
        'samma entitetstyp deltar mer än en gång.\n\n' +
        'Två frågor beskriver varje samband, och de är **oberoende** av varandra:\n\n' +
        '**Kardinalitet (maxantal)** — 1:1, 1:N eller M:N. Läses **tvärs över**: 1 intill Employee ' +
        'betyder att varje projekt har *högst en* anställd i sambandet. Siffran är ett tak — **1 betyder ' +
        'högst en, inte exakt en**. Kursen skriver M:N; M och N betyder båda "många", och de olika ' +
        'bokstäverna skiljer bara de två positionerna åt.\n\n' +
        '**Deltagande** — måste varje entitet delta minst en gång? Läses vid **sin egen ände**. ' +
        '**Dubbel linje** betyder totalt (obligatoriskt) deltagande, **enkel linje** partiellt (frivilligt). ' +
        'Att byta linje ändrar aldrig kardinaliteten.\n\n' +
        '**Två Chen-varianter.** Kursens standard är kardinalitetssiffror plus enkla/dubbla linjer. ' +
        'Alternativet är **min–max-par** intill varje entitet, till exempel `(0,N)` och `(1,1)` — då läses ' +
        'siffrorna vid *sin egen* entitet och alla linjer är enkla. N tvärs över plus enkel linje motsvarar ' +
        '(0,N); 1 tvärs över plus dubbel linje motsvarar (1,1). **Blanda aldrig** min–max-par med dubbla ' +
        'linjer i samma diagram.\n\n' +
        '**Relationsattribut** ägs av sambandstypen, inte av någon av entiteterna, eftersom värdet ' +
        'beskriver *parningen*. allocationPercentage hör till WorksOn: samma anställd kan ha 60 % på ett ' +
        'projekt och 40 % på ett annat. Vanligast vid M:N men förekommer även vid 1:N och 1:1.\n\n' +
        '**Unära (rekursiva) samband** har en enda deltagande entitetstyp som spelar båda rollerna, till ' +
        'exempel Supervises med rollerna supervisor och report. Rollnamnen är nödvändiga — utan dem går ' +
        'det inte att läsa vilken ände som är vilken. Varje roll har sin egen kardinalitet: 1 vid ' +
        'supervisor och N vid report betyder att en chef kan ha många underställda och varje anställd ' +
        'högst en chef.\n\n' +
        'Notationen släpper ändå igenom konstiga populationer: någon kan vara sin egen chef, eller två ' +
        'personer kan vara varandras. Regler som "ingen chefar över sig själv" och "inga cykler" har ' +
        'Chen ingen symbol för — de skrivs som textuella verksamhetsregler.' +
        '\n\n[[diagram:kardinalitet]]\n\n[[diagram:deltagande]]'
    },
    {
      rubrik: 'Svaga entiteter',
      text:
        'Betrakta verksamhetsreglerna:\n\n' +
        '- Ett universitet har ett unikt namn och en budget, och kan erbjuda kurser\n' +
        '- En kurs har en kurskod, ett namn och poäng\n' +
        '- **Kurskoden är unik inom det universitet som ger kursen** — två universitet kan ha kurser med ' +
        'samma kod\n\n' +
        'Lunds SYSB23 och Uppsalas SYSB23 är olika kurser. Kurskoden ensam räcker inte för att ' +
        'identifiera en kurs; man behöver även universitetets namn.\n\n' +
        'Det modelleras som en **svag entitet**:\n\n' +
        '- Kursen ritas med **dubbel ram**\n' +
        '- Sambandet Offer ritas med **dubbel ram** (svag eller identifierande relation)\n' +
        '- CourseCode markeras som **partiell identifierare** (streckad understrykning)\n\n' +
        'Testet: **räcker entitetens egna attribut för att unikt identifiera en förekomst?** Om inte, och ' +
        'identifieringen kräver ägarens nyckel, är entiteten svag.\n\n' +
        'En svag entitet beror på sin ägare på **två** sätt:\n\n' +
        '- **Identitetsberoende** — den fullständiga identiteten innehåller ägaren (projectNo + taskNo)\n' +
        '- **Existensberoende** — den kan inte finnas i modellen utan sin ägare\n\n' +
        'Två fällor föreläsningen pekar ut:\n\n' +
        '- **Obligatoriskt deltagande gör inte en entitet svag.** Varje projekt måste ha en ledare ' +
        '(dubbel linje), men Project är ändå stark eftersom projectNo identifierar det. Svaghet kräver ' +
        'identitetsberoende.\n' +
        '- **Kardinaliteten avslöjar inte ägaren.** Två samband kan ha exakt samma siffror; bara den ' +
        'dubbla romben och den streckade understrykningen visar vilket som identifierar.\n\n' +
        'Kedjan kan vara längre. Med University → Department → Course kan två institutioner vid samma ' +
        'universitet ha kurser med samma kod, eftersom kursen är unik inom institutionen och ' +
        'institutionen unik inom universitetet.' +
        '\n\n[[diagram:svag-entitet]]'
    },
    {
      rubrik: 'Associativ entitet: när parningen blir en sak',
      text:
        'Ett samband med attribut är fortfarande ett samband. WorksOn med allocationPercentage och ' +
        'assignmentStartDate behöver inte göras om till något annat — attributen beskriver parningen, ' +
        'och det räcker.\n\n' +
        '**Reifiera** (gör parningen till en entitetstyp) först när den måste:\n\n' +
        '- kunna refereras som ett eget begrepp\n' +
        '- delta i **andra** samband\n' +
        '- ha en **egen identitet** eller livscykel\n\n' +
        'Då blir WorksOn entitetstypen **Assignment**, kopplad med två vanliga samband (Holds mot ' +
        'Employee, Concerns mot Project). Ingen särskild symbol behövs — det är en vanlig rektangel. ' +
        'Attributen flyttar till Assignment, och identifieraren assignmentNo blir ett nytt åtagande: ' +
        'verksamheten måste dela ut och bevara ett unikt nummer per uppdrag.' +
        '\n\n[[diagram:reifiering]]'
    },
    {
      rubrik: 'Chen kontra Crow\'s foot',
      text:
        'ER-modellen och notationen är olika saker. Entitetstyper, sambandstyper och constraints är ' +
        'ER-begrepp; rektanglar, romber och ändpunktssymboler är notationens val. Föreläsningen ' +
        'illustrerar det med en tunnelbana: samma fem fakta kan skrivas som text, XML eller karta utan ' +
        'att modellen ändras. ER föreslogs av Peter Chen 1975–76 och blev en familj av varianter — det ' +
        'finns ingen enda specifikation som låser varje symbol.\n\n' +
        '**Crow\'s foot** härstammar från Gordon Everests "inverterade pil" 1976 och spreds via ' +
        'Information Engineering (Finkelstein, CACI, James Martin). Den är **inte standardiserad**, så ' +
        'läs alltid legenden. Kursen använder en konceptuell IE-variant:\n\n' +
        '- **Entitetsruta** med namnet överst, identifieraren markerad **ID**, övriga attribut under ' +
        'strecket. Namn skrivs project_no i stället för projectNo.\n' +
        '- **Namngiven linje** i stället för romb.\n' +
        '- **Ändpunkterna**: det yttre märket säger om deltagandet är frivilligt (**cirkel**) eller ' +
        'obligatoriskt (**streck**); märket närmast rutan säger en (**streck**) eller många (**kråkfot**). ' +
        'Märkena sitter vid den ände vars förekomster de räknar.\n\n' +
        'Vissa verktyg ger linjestilen en annan betydelse — heldragen och streckad för identifierande ' +
        'och icke-identifierande samband — och i Barker/Oracle-varianten betyder den *may* och *must*.\n\n' +
        '**Det Crow\'s foot inte uttrycker direkt**, utan löser indirekt:\n\n' +
        '- **Multivärda attribut** — blir en egen entitet i ett 1:N-samband (PHONE NUMBER)\n' +
        '- **Relationsattribut** — linjen har ingen plats för attribut, så parningen blir en ' +
        '**associativ entitet** (ASSIGNMENT)\n' +
        '- **Svag identitet** — ingen dubbelram; i stället **upprepade ID-markeringar** som bildar en ' +
        'sammansatt identifierare (project_no + task_no)\n' +
        '- **Sammansatta, härledda och frivilliga attribut** samt **domäner** — dokumenteras separat' +
        '\n\n[[diagram:chen-crow]]\n\n[[diagram:crow-andpunkter]]'
    },
    {
      rubrik: 'Vad notationen inte klarar',
      text:
        'Följande regler går **inte** att uttrycka i ett ER-diagram:\n\n' +
        '- Studenters e-postadresser måste sluta på @student.lu.se\n' +
        '- En student får inte läsa mer än 500 poäng\n' +
        '- En kurs får ha högst 100 studenter samtidigt\n' +
        '- En student får inte läsa en kurs hen redan läst\n\n' +
        'ER-modellen fångar **struktur** — entiteter, samband, kardinalitet — men inte alla ' +
        'verksamhetsregler. Värdebaserade regler hanteras senare med `CHECK`-constraints, och mer ' +
        'komplexa regler i applikationslogiken.\n\n' +
        '**Generalisering/specialisering** (Person → Student/Teacher) tillhör Enhanced ER-modellering och ' +
        'ligger **utanför kursens omfång**. Notationen använder D för disjoint och O för överlappande.'
    }
  ],
  nyckelbegrepp: [
    'Entitet (Chen): en "sak" som kan identifieras distinkt. Håll isär typ, mängd och förekomst',
    'Attribut: enkelt/sammansatt, envärt/multivärt (dubbel oval), lagrat/härlett (streckad oval)',
    'Sammansatt identifierare: stryk under helheten, inte delarna. Separata understrykningar = separata identifierare',
    'Kardinalitet (1:1, 1:N, M:N) är ett tak och läses tvärs över; 1 = högst en',
    'Deltagande läses vid egen ände: dubbel linje = totalt, enkel = partiellt',
    'Min–max (0,N)/(1,1) är ett alternativ — blanda det aldrig med dubbla linjer',
    'Relationsattribut ägs av sambandet eftersom de beskriver parningen',
    'Svag entitet: identitets- och existensberoende; dubbel ram, dubbel romb, streckad understrykning',
    'Obligatoriskt deltagande gör inte en entitet svag',
    'Reifiera ett samband till associativ entitet bara när parningen behöver egen identitet eller egna samband',
    'ER-modellen kan inte uttrycka värdebaserade verksamhetsregler'
  ],
  tentakoppling:
    'ER-modellering är ett av tentans fem områden. På alla tre HT25-tentorna var uppgift 1 ett ' +
    'Chen-diagram med tio–elva påståenden att markera (+5 per rätt, −3 per fel). Påståendena prövar ' +
    'exakt det här kapitlet: vad som identifierar vad, om deltagandet är obligatoriskt, och om två ' +
    'förekomster får ha samma värde.'
},

/* ====================== KAPITEL 7 ====================== */
{
  id: 'db-k7',
  nr: 7,
  titel: 'Logisk design: från ER till relationer',
  ingress: 'Relationsmodellen, nyckelbegreppen och samtliga transformationsregler du behöver kunna utantill.',
  lastid: 15,
  amnen: ['db-logisk'],
  avsnitt: [
    {
      rubrik: 'Relationsmodellen',
      text:
        'Teorin bakom relationsdatabaser, formulerad av **Edgar F. Codd** (1923–2003) och baserad på ' +
        'mängdlära och första ordningens logik.\n\n' +
        '- **Relation** — en mängd tupler där varje element tillhör en domän. Visuellt en tabell.\n' +
        '- **Attribut** — ett namn parat med en domän. Informellt en kolumn.\n' +
        '- **Tupel** — en mängd attributvärden. Informellt en rad.\n' +
        '- **Domän** — alla värden ett dataelement får innehålla. Kan liknas vid en datatyp.\n' +
        '- **Grad** (degree) — antalet attribut\n' +
        '- **Kardinalitet** — antalet tupler\n\n' +
        '**Terminologi:**\n\n' +
        '| Formell | Alternativ 1 | Alternativ 2 |\n' +
        '|---|---|---|\n' +
        '| Relation | Tabell | Fil |\n' +
        '| Attribut | Kolumn | Fält |\n' +
        '| Tupel | Rad | Post |\n\n' +
        'Notationen för ett relationsschema är `Employee(EmpNo, Name, Salary)` där nyckelattributen ' +
        'understryks.'
    },
    {
      rubrik: 'Relationsegenskaper',
      text:
        'En relation måste uppfylla följande:\n\n' +
        '- Unikt namn\n' +
        '- **Varje cell innehåller ett atomärt värde**\n' +
        '- Varje attribut har ett distinkt namn\n' +
        '- Alla värden i ett attribut har samma datatyp och domän\n' +
        '- **Ordningen på attributen spelar ingen roll**\n' +
        '- **Ordningen på tuplerna spelar ingen roll**\n' +
        '- **Inga duplicerade tupler**\n\n' +
        'De tre understrukna följer direkt av att en relation matematiskt är en **mängd** — mängder är ' +
        'oordnade och innehåller inga dubbletter.\n\n' +
        'Det är därför du behöver `ORDER BY` för att få en garanterad sorteringsordning: utan den finns ' +
        'ingen definierad ordning att förlita sig på.\n\n' +
        'Kravet på atomära värden är precis vad **första normalformen** kodifierar. En cell med värdet ' +
        '"Alice, Bob" är inte tillåten.'
    },
    {
      rubrik: 'Nyckelbegreppen',
      text:
        '**Kandidatnyckel (CK)** — en mängd attribut K som uppfyller **båda** villkoren:\n\n' +
        '- **Unikhet:** i varje giltigt relationsvärde har inga två olika tupler samma värden på K\n' +
        '- **Minimalitet:** inget attribut kan tas bort ur K utan att unikheten går förlorad\n\n' +
        '{EmployeeNo, Name} är unik om EmployeeNo är det — men inte minimal, eftersom Name kan strykas. ' +
        'Unikheten måste vara en **verksamhetsregel** som gäller alla framtida populationer. Dagens data ' +
        'kan motbevisa en tänkt nyckel, men aldrig bevisa den.\n\n' +
        '**Sammansatt kandidatnyckel** — ibland krävs två attribut tillsammans. I ' +
        'WORKS_ON(EmployeeNo, ProjectNo) upprepas både E-104 och P-10, men paret är unikt och minimalt.\n\n' +
        '**Primärnyckel (PK)** — en **vald** kandidatnyckel. Skrivs `PK = CK₁`. En relation kan ha flera ' +
        'kandidatnycklar men bara en primärnyckel: EMPLOYEE(EmployeeNo, Name, WorkEmail) har ' +
        'CK₁ = {EmployeeNo} och CK₂ = {WorkEmail}. Att välja EmployeeNo **tar inte bort** kravet att ' +
        'WorkEmail är unik — CK₂ finns kvar. Välj helst en nyckel som är stabil, minimal och meningsfull.\n\n' +
        '**Främmande nyckel (FK)** — attribut vars värden måste matcha en refererad kandidatnyckel. ' +
        'Kursens skrivsätt:\n\n' +
        '`PROJECT(ProjectNo, Title, LeaderEmployeeNo)`\n' +
        '`FK: (LeaderEmployeeNo) REF EMPLOYEE(EmployeeNo)`\n\n' +
        'Två saker att hålla isär. Ett FK-värde **får upprepas** — Mary kan leda både Atlas och Nova. ' +
        'Och ett värde som passar domänen (E-999 har rätt form) är **inte** automatiskt en giltig ' +
        'referens; den refererade tupeln måste finnas.\n\n' +
        '**Referensintegritet:** värdet i en främmande nyckel måste finnas i den refererade kolumnen, ' +
        'eller vara NULL om det är tillåtet. I klartext: *du får inte arbeta i ett projekt som inte finns*.'
    },
    {
      rubrik: 'Naturliga nycklar i reglerna, surrogat-ID senare',
      text:
        'Transformationsföreläsningen räknar genomgående med **naturliga nycklar** — EmployeeNo, ' +
        'ProjectNo — så att reglerna syns tydligt. Det betyder inte att surrogat-ID är förbjudna i den ' +
        'logiska modellen. Introduktionsföreläsningen HT26 säger tvärtom att **surrogat-ID dyker upp ' +
        'först i logisk och fysisk design**, och visar en logisk modell med DepartmentId och EmployeeId ' +
        'där EmployeeNo ligger kvar som en extra kandidatnyckel.\n\n' +
        'Det som gäller oavsett:\n\n' +
        '- **ER-modellen** har aldrig surrogat-ID, bara verksamhetens identifierare\n' +
        '- I **fysisk design** (kapitel 9) används surrogatnycklar genomgående, och den naturliga ' +
        'nyckeln behålls med UNIQUE + NOT NULL\n' +
        '- **Tentans DDL-uppgift** kräver automatiskt inkrementerande surrogatnycklar för tabeller som ' +
        'motsvarar vanliga och svaga entiteter\n\n' +
        'Lär dig alltså reglerna med naturliga nycklar, och byt till surrogat när du skriver DDL.'
    },
    {
      rubrik: 'Transformationsreglerna',
      text:
        'Detta är kapitlets kärna. Föreläsningen går igenom sex regler i en bestämd ordning — vanliga ' +
        'entiteter, svaga entiteter, 1:1, 1:N, M:N, multivärda attribut — och använder dem som en ' +
        'checklista: varje konstruktion och varje constraint i modellen ska vara omhändertagen.\n\n' +
        '**1. Vanlig (stark) entitet.** Skapa en relation med alla enkla attribut. Sammansatta attribut ' +
        'tas **inte** med som sådana — bara deras enkla delar (projectPeriod blir StartDate och EndDate). ' +
        '**Varje** identifierare blir en kandidatnyckel; välj en till primärnyckel. Är den valda ' +
        'identifieraren sammansatt bildar alla dess delar primärnyckeln tillsammans.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary)`\n\n' +
        '**2. Svag entitet.** Skapa en relation med den svaga entitetens enkla, envärda attribut. Lägg ' +
        'till **ägarentitetens primärnyckel som främmande nyckel**. Primärnyckeln blir **kombinationen** ' +
        'av denna främmande nyckel och den partiella identifieraren.\n\n' +
        '`Hotel(Name, Rating)`\n`Room(RoomNumber, HotelName, Price)` — PK är {RoomNumber, HotelName}\n\n' +
        'Notera att varken RoomNumber eller HotelName är unika var för sig; bara kombinationen. Tre ' +
        'tillägg från föreläsningen: det identifierande sambandets egna attribut (till exempel när ' +
        'uppgiften lades till) hamnar **i den svaga relationen** — sambandet får ingen egen relation. ' +
        'Mappa alltid **ägaren först**. Och i en kedja Project → ProjectTask → TaskStep refererar ' +
        'TaskStep hela sin närmaste ägares nyckel, {ProjectNo, TaskNo}, som **en** sammansatt FK.\n\n' +
        '**3. Binärt 1:M.** Lägg **ett-sidans primärnyckel som främmande nyckel på många-sidan**. ' +
        'Eventuella enkla relationsattribut hamnar i samma relation.\n\n' +
        '`Project(ProjectNo, Name, Budget)`\n`Employee(EmployeeNo, Name, Address, Salary, Hours, ProjectNo)`\n\n' +
        'Minnesregel: FK hamnar alltid på **många**-sidan. Skälet är atomaritet — många-sidan har exakt ' +
        'ett värde att peka på.\n\n' +
        '**4. Binärt 1:1.** Normalfallet är främmande nyckel-metoden:\n\n' +
        '- Lägg den ena sidans primärnyckel som FK hos den andra. **Välj helst sidan med totalt ' +
        'deltagande** som värd — varje projekt har en ansvarig, så FK:n hamnar i PROJECT\n' +
        '- **Gör FK:n till en kandidatnyckel.** Annars kan två projekt peka på samma anställd, och då ' +
        'är det inte längre 1:1. En giltig FK garanterar bara att den anställde finns, inte att hen ' +
        'förekommer en enda gång\n' +
        '- Sambandets attribut följer med till värdrelationen\n\n' +
        '`PROJECT(ProjectNo, ResponsibleEmployeeNo)` med CK₂ = {ResponsibleEmployeeNo} och ' +
        '`FK: (ResponsibleEmployeeNo) REF EMPLOYEE(EmployeeNo)`\n\n' +
        'Är deltagandet **totalt för båda** kan relationerna också **slås ihop** till en, där båda ' +
        'identifierarna blir var sin kandidatnyckel. Det är valfritt — FK-metoden fungerar alltid, åt ' +
        'vilket håll som helst. Ett tredje, sällan föredraget alternativ är en separat sambandsrelation ' +
        'där båda deltagarnas nycklar är kandidatnycklar.\n\n' +
        '**5. Binärt M:N.** Skapa en **ny relation** för själva sambandet. Ta med primärnyckelattributen ' +
        'från båda de deltagande relationerna. Tillsammans bildar de en **sammansatt primärnyckel**, och ' +
        'båda är dessutom främmande nycklar. Relationsattribut läggs till som vanliga attribut och ingår ' +
        '**inte** i primärnyckeln.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary)`\n`Project(ProjectNo, Name, Budget)`\n' +
        '`Work(EmployeeNo, ProjectNo, Hours)` — PK är {EmployeeNo, ProjectNo}, Hours står utanför\n\n' +
        'Regel 6 och 7 nedan är inga egna regler i HT26-föreläsningen, utan 1:N- och M:N-regeln ' +
        'tillämpade på ett unärt samband. Regel 9 finns inte med i HT26-materialet.\n\n' +
        '**6. Unärt 1:M.** Tillämpa 1:M-regeln — men båda sidor är samma entitet. Attributet får ett ' +
        'rollspecifikt namn.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary, ManagerNo)` där ManagerNo är FK mot samma relation. ' +
        'Den översta chefen har NULL.\n\n' +
        '**7. Unärt M:N.** Tillämpa M:N-regeln. Attributen måste få olika namn.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary)`\n`Manage(EmployeeNo, ManagerEmployeeNo)`\n\n' +
        '**8. Multivärt attribut.** Skapa en **egen relation** med två komponenter: ägarrelationens ' +
        'primärnyckel som främmande nyckel, samt själva det multivärda attributet. Kombinationen blir ' +
        'primärnyckel.\n\n' +
        '`Employee(EmployeeNo, Name, Salary)`\n`EmployeeAddress(EmployeeNo, Address)`\n\n' +
        '**9. Ternärt samband** (från förra årets föreläsning). Skapa en relation med primärnycklarna ' +
        'från alla tre deltagande relationer.\n\n' +
        '`Delivery(supplierName, productName, customerName)`\n\n' +
        'Att istället använda tre binära samband fungerar **inte**: med "Amazon levererar stol", "IKEA ' +
        'levererar stol" och "Erdogan beställer stol" går det inte att svara på vilken leverantör som ' +
        'levererade stolen till Erdogan. Informationen om trepartskombinationen går förlorad.\n\n' +
        '**Kontrollera tre saker separat** efter varje regel: att referenserna pekar på något som ' +
        'finns, att nycklarna är unika, och att **deltagandet** hålls. Det sista klarar en FK inte ensam: ' +
        'om varje projekt måste ha minst en anställd kan ett projekt utan rad i WORKS_ON ändå ha giltiga ' +
        'nycklar. Föreläsningen påpekar uttryckligen att FK:er inte upprätthåller minsta deltagande.'
    },
    {
      rubrik: 'Multivärt attribut eller egen entitet?',
      text:
        'Båda tillåter flera adresser per anställd. Skillnaden är om adresser kan **delas**.\n\n' +
        '**Multivärt attribut** ⇒ `EmployeeAddress(EmployeeNo, Address)`. Två anställda kan mycket väl ha ' +
        'samma adressträng.\n\n' +
        '**Egen entitet med 1:M** ⇒ varje adressförekomst pekar på exakt en anställd. Adresser kan inte ' +
        'delas.\n\n' +
        'Materialet ställer den kritiska följdfrågan om det är *avsiktligt* att två anställda kan dela ' +
        'adress. Det är precis den sortens fråga som måste ställas till verksamhetssidan.'
    },
    {
      rubrik: 'En varning om informationsförlust',
      text:
        'Materialet visar ett exempel där en till synes rimlig omstrukturering förstör information.\n\n' +
        'Ursprungligt: Employee har ett samband till Department, och Project har ett samband till ' +
        'Department. Frågan "vilket projekt arbetar Zoe i?" går inte att besvara — bara vilken avdelning ' +
        'hon tillhör och vilka projekt avdelningen har.\n\n' +
        'Efter omstruktureringen kan man svara på projektfrågan men **inte längre** på "vilken avdelning ' +
        'arbetar Zoe i?".\n\n' +
        'Lärdomen: kontrollera alltid vilka frågor schemat faktiskt kan besvara. Det leder direkt in i ' +
        'nästa kapitel, där **lossless join** ger begreppet ett formellt namn.'
    }
  ],
  nyckelbegrepp: [
    'Relation = mängd tupler; oordnad, inga dubbletter, atomära värden',
    'Grad = antal attribut, kardinalitet = antal tupler',
    'Kandidatnyckel = unik och minimal; primärnyckel = den valda kandidatnyckeln',
    'FK-värden får upprepas; ett värde i rätt domän är inte automatiskt en giltig referens',
    'Referensintegritet: FK måste matcha ett befintligt värde eller vara NULL',
    '1:M ⇒ FK på många-sidan',
    'M:N ⇒ ny relation med sammansatt PK; relationsattribut står utanför PK',
    '1:1 ⇒ FK på sidan med totalt deltagande, och FK:n görs till kandidatnyckel (UNIQUE)',
    'Svag entitet ⇒ PK = ägarens PK + partiell identifierare; ägaren mappas först',
    'Multivärt attribut ⇒ egen relation med sammansatt PK',
    'FK:er garanterar inte minsta deltagande — det måste hanteras separat'
  ],
  tentakoppling:
    'Transformation från konceptuell till fysisk datamodell är ett av tentans fem områden. På ' +
    'HT25-tentorna var det uppgift 2 (25 p): ett ER-diagram som skulle bli färdig DDL med alla ' +
    'constraints och surrogatnycklar. Det här kapitlet är första halvan av den uppgiften, kapitel 9 ' +
    'den andra. Övningshäftets uppgifter 4–9 tränar den här halvan.'
},

/* ====================== KAPITEL 8 ====================== */
{
  id: 'db-k8',
  nr: 8,
  titel: 'Normalformer och normalisering',
  ingress: 'Anomalier, funktionella beroenden, attributslutning och nycklar, 1NF–3NF, lossless join och dependency preservation — med en arbetsgång som fungerar varje gång.',
  lastid: 20,
  amnen: ['db-normalisering'],
  avsnitt: [
    {
      rubrik: 'Problemet: anomalier',
      text:
        'Transformationsreglerna ger flera relationer. Men hur vet vi att det blir en **bra** ' +
        'uppdelning? Föreläsningen testar genom att strunta i reglerna och lägga allt i en enda ' +
        'relation:\n\n' +
        '`ASSIGNMENT_REGISTER(EmployeeNo, EmployeeName, DepartmentNo, DepartmentName, ProjectNo, ' +
        'ProjectTitle, AllocationPercentage)`\n\n' +
        'En tupel är ett uppdrag: E-104 Mary på avdelning D-10 Analysis arbetar 60 % på P-10 Atlas. ' +
        'Kandidatnyckeln är {EmployeeNo, ProjectNo}. Alla fakta stämmer och alla tupler är unika — ändå ' +
        'går tre saker fel:\n\n' +
        '**Uppdateringsanomali.** P-10 döps om från Atlas till Atlas Renewal. Titeln står på två rader, ' +
        'en för varje person i projektet. Missas den ena har P-10 plötsligt **två motstridiga titlar**.\n\n' +
        '**Insättningsanomali.** Projektet P-40 Orion ska läggas in innan någon arbetar i det. Det går ' +
        'inte: EmployeeNo ingår i primärnyckeln och kan varken utelämnas eller hittas på. *Ett giltigt ' +
        'projekt får ingen plats.*\n\n' +
        '**Borttagningsanomali.** Garys uppdrag på Beacon avslutas och raden tas bort. Det var den enda ' +
        'raden som nämnde Beacon — så **projektet försvinner** fast det fortfarande finns.\n\n' +
        'Alla tre har samma orsak: projektfakta lagras bara **inuti uppdragstupler**, fast ett projekt ' +
        'kan finnas utan uppdrag. Problemet är hur fakta kombineras, inte antalet kolumner.\n\n' +
        'Håll isär **upprepade referenser** och **upprepade fakta**. Att P-10 står på två rader behövs — ' +
        'det identifierar två olika uppdrag. Att "P-10 heter Atlas" står på två rader är **redundans**: ' +
        'samma faktum lagrat två gånger.\n\n' +
        'Delar man upp i EMPLOYEE, DEPARTMENT, PROJECT och WORKS_ON får varje händelse ett enda mål: ' +
        'namnbytet ändrar en PROJECT-tupel, Orion läggs in i PROJECT utan uppdrag, och Garys uppdrag ' +
        'tas bort ur WORKS_ON medan Beacon finns kvar. Det är därför transformationsreglerna fungerar. ' +
        'Men godtycklig uppdelning räcker inte — resten av kapitlet handlar om vilka uppdelningar som är ' +
        'säkra.'
    },
    {
      rubrik: 'Funktionella beroenden',
      text:
        '`EmployeeNo → EmployeeName` läses "EmployeeNo bestämmer funktionellt EmployeeName". Vänster ' +
        'sida är **determinanten**, höger sida det **beroende** attributet.\n\n' +
        '> **Funktionellt beroende.** X → Y gäller när två tupler som har **samma värden på X** alltid ' +
        'också har **samma värden på Y** — i **varje tillåten population**, inte bara den som ligger i ' +
        'tabellen nu.\n\n' +
        'Fem saker som följer av definitionen:\n\n' +
        '- **Ett enda motexempel räcker.** Två tupler med E-104 men namnen Mary och Maria bryter mot ' +
        'EmployeeNo → EmployeeName.\n' +
        '- **Värden får ändras.** Byter Mary namn till Maria på alla rader gäller beroendet fortfarande — ' +
        'det kräver överensstämmelse inom varje tillstånd, inte att värdet aldrig ändras.\n' +
        '- **Pilen har riktning.** EmployeeNo → DepartmentNo betyder inte att DepartmentNo → EmployeeNo; ' +
        'D-10 har flera anställda.\n' +
        '- **Beroenden kommer från regler, inte från data.** Att alla namn råkar vara olika i dag bevisar ' +
        'inte att EmployeeName → EmployeeNo. Reglerna tillåter en andra Mary.\n' +
        '- **En determinant behöver inte vara en nyckel.** EmployeeNo bestämmer namnet men inte vilket ' +
        'projekt eller vilken procentsats — det är ingen nyckel i ASSIGNMENT_REGISTER.\n\n' +
        '**Trivialt beroende:** X → Y där Y redan ingår i X, till exempel {EmployeeNo, ProjectNo} → ' +
        'ProjectNo. Det säger ingenting nytt.\n\n' +
        '**Klammerparenteserna spelar roll — och sidan de står på:**\n\n' +
        '`{A, B} → {C, D}` betyder `{A,B} → C` och `{A,B} → D`. Höger sida får delas upp ' +
        '(**dekomposition**) och beroenden med samma vänsterled får slås ihop (**union**). Vänster sida ' +
        'får **aldrig** delas: det betyder **inte** `A → C` eller `B → D`.\n\n' +
        '**Transitivitet:** EmployeeNo → DepartmentNo och DepartmentNo → DepartmentName ger ' +
        'EmployeeNo → DepartmentName. Det är ingen ny verksamhetsregel, utan en följd av de två.\n\n' +
        '**F och F⁺.** F är de beroenden vi anger. F⁺ är **allt** som följer av dem — F självt, ' +
        'följder som den transitiva ovan, och de triviala. Båda är mängder av beroenden, inte av attribut.'
    },
    {
      rubrik: 'Attributslutning, supernyckel och kandidatnyckel',
      text:
        'Hur hittar man nyckeln på ett sätt som går att visa? Med **attributslutningen** X⁺: mängden av ' +
        'alla attribut som X bestämmer under de givna beroendena. X⁺ innehåller alltid X självt.\n\n' +
        '**Så räknar du ut X⁺:**\n\n' +
        '1. Börja med attributen i X\n' +
        '2. Leta upp ett beroende vars **hela** vänsterled redan finns i mängden\n' +
        '3. Lägg till attributen på dess högersida\n' +
        '4. Upprepa tills ett helt varv inte ger något nytt\n\n' +
        'Gå tillbaka till tidigare beroenden — ett attribut du fått sent kan låsa upp ett du redan ' +
        'passerat.\n\n' +
        '**Exempel** med beroendena i ASSIGNMENT_REGISTER:\n\n' +
        '- {EmployeeNo}⁺ = {EmployeeNo, EmployeeName, DepartmentNo, DepartmentName}. ProjectNo saknas, ' +
        'så varken projekttiteln eller procentsatsen går att nå.\n' +
        '- {ProjectNo}⁺ = {ProjectNo, ProjectTitle}\n' +
        '- {EmployeeNo, ProjectNo}⁺ = alla sju attributen — först när båda finns kan ' +
        '{EmployeeNo, ProjectNo} → AllocationPercentage användas.\n\n' +
        '> **Supernyckel:** en attributmängd vars slutning innehåller **alla** relationens attribut.\n\n' +
        '> **Kandidatnyckel:** en **minimal** supernyckel — tar man bort vilket attribut som helst slutar ' +
        'den vara supernyckel.\n\n' +
        '{EmployeeNo, ProjectNo, EmployeeName} är en supernyckel men ingen kandidatnyckel, eftersom ' +
        'EmployeeName kan strykas. Minimal betyder att inget kan tas bort — inte att alla kandidatnycklar ' +
        'måste vara lika stora.\n\n' +
        '**Knepet som gör det snabbt:** ett attribut som **aldrig står på någon högersida** kan ingen ' +
        'slutning lägga till. Det måste alltså ingå i **varje** nyckel. I ASSIGNMENT_REGISTER gäller det ' +
        'både EmployeeNo och ProjectNo — och eftersom paret redan är en kandidatnyckel är det den enda.\n\n' +
        '**Flera kandidatnycklar** uppstår när attribut bestämmer varandra. I EMPLOYEE(EmployeeNo, ' +
        'WorkEmail, EmployeeName) med EmployeeNo → WorkEmail och WorkEmail → EmployeeNo är både ' +
        '{EmployeeNo} och {WorkEmail} kandidatnycklar.\n\n' +
        '**Arbetsgången för nycklar:**\n\n' +
        '1. Skriv upp attributen och beroendena\n' +
        '2. Ta med alla attribut som inte står på någon högersida — de måste finnas i varje nyckel\n' +
        '3. Räkna ut slutningen; räcker den inte, lägg till fler attribut\n' +
        '4. Kontrollera minimaliteten\n' +
        '5. Pröva andra startmängder och förklara varför inga andra minimala mängder finns\n\n' +
        'Först **därefter** klassificerar du attributen:\n\n' +
        '- **Primärattribut (prime):** medlem i **minst en** kandidatnyckel\n' +
        '- **Icke-primärt attribut (non-prime):** medlem i **ingen** kandidatnyckel\n\n' +
        'Titta på **alla** kandidatnycklar, inte bara den som valts till primärnyckel. WorkEmail är ' +
        'primärt även om EmployeeNo blev PK — valet av primärnyckel ändrar ingenting.'
    },
    {
      rubrik: 'De tre normalformerna',
      text:
        'Normalformerna **bygger på varandra**: för att uppfylla 3NF måste relationen redan uppfylla 2NF. ' +
        'Ju högre normalform, desto mindre redundans och desto mindre utrymme för anomalier.\n\n' +
        '**Första normalformen (1NF):**\n\n' +
        '> En relation är i 1NF när varje attributvärde i varje tupel är ett enda, **atomärt** värde — ' +
        'inte en samling värden.\n\n' +
        'En cell med {P-10, P-20} bryter mot 1NF. Lösningen är ett projektnummer per tupel. Ett ' +
        'atomärt värde **får** ha delar: ett datum har år, månad och dag men är ett värde. Flera datum i ' +
        'samma cell bryter däremot mot 1NF. Och 1NF tar **inte** bort redundans — relationen ovan har ' +
        'fortfarande alla tre anomalierna.\n\n' +
        '**Andra normalformen (2NF):**\n\n' +
        '> En relation är i 2NF om och endast om den är i 1NF och **inget icke-primärt attribut är ' +
        'funktionellt beroende av någon äkta delmängd av någon kandidatnyckel**.\n\n' +
        'En **äkta delmängd** är en delmängd som inte är lika med hela mängden: {A} och {B} är äkta ' +
        'delmängder av {A, B}. Två begrepp gör definitionen lättare att använda:\n\n' +
        '- **Fullt beroende:** ingen äkta delmängd av X bestämmer A. AllocationPercentage behöver både ' +
        'EmployeeNo och ProjectNo.\n' +
        '- **Partiellt beroende:** en äkta delmängd räcker. EmployeeName behöver bara EmployeeNo — det ' +
        'bryter mot 2NF.\n\n' +
        'Följ kedjorna: EmployeeNo → DepartmentNo → DepartmentName gör också DepartmentName partiellt ' +
        'beroende av {EmployeeNo, ProjectNo}.\n\n' +
        '**Tredje normalformen (3NF):**\n\n' +
        '> En relation är i 3NF om och endast om den är i 2NF och **inget icke-primärt attribut är ' +
        'transitivt beroende av någon kandidatnyckel**.\n\n' +
        '> **Transitivt beroende:** X → Z indirekt, via X → Y och Y → Z, där det **inte** gäller att ' +
        'Y → X.\n\n' +
        'I EMPLOYEE_DETAILS(EmployeeNo, EmployeeName, DepartmentNo, DepartmentName) är DepartmentName ' +
        'icke-primärt och beror på nyckeln via DepartmentNo, som inte bestämmer EmployeeNo — alltså inte ' +
        '3NF. Mellanledet får inte innehålla målattributet självt; ett trivialt steg räknas inte. Ett ' +
        'likvärdigt sätt att se det, som föreläsningen också använder: beroendet DepartmentNo → ' +
        'DepartmentName bryter mot 3NF eftersom DepartmentNo inte är en supernyckel och DepartmentName ' +
        'inte ingår i någon kandidatnyckel.\n\n' +
        'Notera att både 2NF och 3NF uteslutande handlar om **icke-primära** attribut. Det ger en ' +
        'användbar genväg: har relationen **inga icke-primära attribut alls** är den automatiskt i 3NF.'
    },
    {
      rubrik: 'Arbetsgången som fungerar varje gång',
      text:
        'Följ alltid samma fem steg. Det är så facit i övningshäftet är formulerat, och det är så du bör ' +
        'svara på tentan.\n\n' +
        '**Steg 1 — bestäm kandidatnyckel/-nycklar** med attributslutning. Börja med attributen som inte ' +
        'står på någon högersida, räkna ut slutningen och kontrollera minimaliteten. Leta efter ' +
        '**flera** — det är en vanlig miss.\n\n' +
        '**Steg 2 — klassificera attributen.** Vilka är primära (medlemmar i någon kandidatnyckel) och ' +
        'vilka är icke-primära?\n\n' +
        '**Steg 3 — kontrollera 2NF.** Ställ först frågan: *är kandidatnyckeln sammansatt?*\n\n' +
        '> Om nej kan 2NF **inte** brytas — det finns inga äkta delmängder att bero på. Relationen är ' +
        'automatiskt i minst 2NF.\n\n' +
        'Är den sammansatt: finns något beroende från en äkta delmängd till ett icke-primärt attribut? Då ' +
        'är relationen bara i 1NF.\n\n' +
        '**Steg 4 — kontrollera 3NF.** Finns kedjor X → Y → Z där Y inte bestämmer X, och Z är ' +
        'icke-primärt? Då är relationen bara i 2NF.\n\n' +
        '**Steg 5 — normalisera vid behov** genom dekomposition, och ange primärnyckel för varje ny ' +
        'relation. Receptet är detsamma för båda normalformerna: skapa en ny relation med den mindre ' +
        'determinanten och det den bestämmer, ta bort de beroende attributen ur originalet, men **behåll ' +
        'determinanten** där så att delarna går att koppla ihop igen. Dela inte mer än 3NF kräver — ' +
        'tentan drar poäng för övernormalisering.\n\n' +
        '**Motivera alltid.** Facit skriver till exempel: *"Normalform: 2NF. Reason: Non-prime attribute ' +
        'D is transitively dependent of candidate key A."*'
    },
    {
      rubrik: 'Tre genomräknade exempel',
      text:
        '**Exempel 1**\n\n' +
        '`R1(A, B, C, D)` med `A → {B,C}` och `C → D`\n\n' +
        '- Kandidatnyckel: A (bestämmer B och C direkt, D via C)\n' +
        '- Primära: A. Icke-primära: B, C, D\n' +
        '- 2NF? Kandidatnyckeln är enkel ⇒ kan inte brytas ⇒ minst 2NF\n' +
        '- 3NF? A → C och C → D, och C bestämmer inte A. D är alltså **transitivt** beroende av A\n' +
        '- **Svar: 2NF.** Normalisering: `R1(A, B, C)` och `R2(C, D)`\n\n' +
        '**Exempel 2**\n\n' +
        '`R2(A, B, C, D)` med `{A,B} → C` och `B → D`\n\n' +
        '- Kandidatnyckel: {A, B}\n' +
        '- Primära: A, B. Icke-primära: C, D\n' +
        '- 2NF? Kandidatnyckeln är sammansatt. B är en äkta delmängd och bestämmer det icke-primära D ⇒ ' +
        '**partiellt beroende**\n' +
        '- **Svar: 1NF.** Normalisering: `R1(A, B, C)` och `R2(B, D)`\n\n' +
        '**Exempel 3 — den knepiga**\n\n' +
        '`R(A, B, C)` med `{A,B} → C` och `C → A`\n\n' +
        '- Kandidatnycklar: {A, B} **och** {C, B}. Den andra eftersom C ger A, och C tillsammans med B ' +
        'därmed ger allt\n' +
        '- Primära: A, B **och** C. Icke-primära: **inga**\n' +
        '- Både 2NF och 3NF handlar bara om icke-primära attribut ⇒ inget kan brytas\n' +
        '- **Svar: 3NF**\n\n' +
        'Facit i övningshäftet motiverar just så: *"3NF (C is a primary attribute and a member of CK ' +
        '{C, B})"*. Missa inte att leta efter flera kandidatnycklar.'
    },
    {
      rubrik: 'Lossless join',
      text:
        'Dekomposition kan lösa ett problem och skapa ett värre.\n\n' +
        '> **Lossless join** (non-additive join): en dekomposition är förlustfri om originalrelationen ' +
        'kan **återskapas exakt** genom att joina delarna — för **varje** population som uppfyller ' +
        'beroendena. Ingen tupel får saknas och ingen får tillkomma.\n\n' +
        'Det som går fel är sällan att tupler försvinner, utan att det **tillkommer falska tupler** ' +
        '(*spurious tuples*). Delas WORKS_ON(EmployeeNo, ProjectNo, AllocationPercentage) upp i ' +
        '(EmployeeNo, ProjectNo) och (ProjectNo, AllocationPercentage) delar de ProjectNo. Men P-10 har ' +
        'både 60 % och 50 %, och joinen parar ihop varje anställd med **båda** — E-104 får plötsligt ' +
        '50 % och E-207 60 %. Vem som hade vilken andel är borta. Utan gemensamma attribut alls blir det ' +
        'ännu värre: varje par kombineras med varje procentsats.\n\n' +
        '**Testet för två delar** — det du ska använda på tentan:\n\n' +
        '> Uppdelningen i R₁ och R₂ är förlustfri **om och endast om** de gemensamma attributen ' +
        'bestämmer **alla attribut i minst en av delarna**: (R₁ ∩ R₂) → R₁ eller (R₁ ∩ R₂) → R₂.\n\n' +
        'Så gör du:\n\n' +
        '1. Skriv upp originalrelationen, dess beroenden F och attributen i varje del\n' +
        '2. Ta fram de gemensamma attributen X = R₁ ∩ R₂\n' +
        '3. Räkna ut X⁺ med de **ursprungliga** beroendena\n' +
        '4. Innehåller X⁺ hela R₁ eller hela R₂ är uppdelningen förlustfri, annars inte\n\n' +
        '**Gemensamma attribut räcker inte** — de måste bestämma en hel del. EMPLOYEE(EmployeeNo, ' +
        'EmployeeName, DepartmentNo) och DEPARTMENT(DepartmentNo, DepartmentName) delar DepartmentNo, och ' +
        '{DepartmentNo}⁺ täcker hela DEPARTMENT: förlustfri. I procentexemplet ovan är {ProjectNo}⁺ = ' +
        '{ProjectNo} — det täcker ingen av delarna: förlustig.\n\n' +
        '**Fler än två delar:** joina två delar i taget. Om de gemensamma attributen bestämmer den ena ' +
        'delen helt, slå ihop dem och fortsätt. Når du hela originalrelationen är uppdelningen förlustfri. ' +
        'Exempel: R(A,B,C,D,E) med A → B, B → C och C → D, uppdelad i (A,B), (C,D), (A,E) och (B,C). Joina ' +
        '(A,B) med (A,E) på A (A → B), sedan med (B,C) på B (B → C), sedan med (C,D) på C (C → D) — hela R ' +
        'är tillbaka. Fastnar du bevisar det däremot ingenting.\n\n' +
        'Två varningar från föreläsningen: **ett lyckat tupelexempel bevisar inte** förlustfrihet, men ' +
        '**ett motexempel räcker** för att motbevisa den. Och det klassiska felet — Employee och Project ' +
        'var för sig i 3NF, men ingen vet vem som arbetar var — löses med kopplingsrelationen ' +
        '`Work(EmployeeNo, ProjectNo)`.'
    },
    {
      rubrik: 'Dependency preservation',
      text:
        'Den andra egenskapen en dekomposition kan ha.\n\n' +
        '> **Dependency preservation:** en dekomposition är beroendebevarande om de beroenden som kan ' +
        'kontrolleras **inom varje enskild relation** tillsammans **implicerar alla ursprungliga ' +
        'beroenden**.\n\n' +
        'Ett beroende är **lokalt** när alla dess attribut finns i samma resulterande relation. Det ' +
        'praktiska testet blir alltså: ligger X och Y i samma relation är X → Y bevarat. Splittras de ' +
        'måste du kontrollera om beroendet ändå **följer av** de lokala beroendena. Med A → B och B → C ' +
        'i (A,B) och (B,C) är till exempel A → C bevarat fast A och C aldrig står ihop, eftersom det ' +
        'följer av de två lokala.\n\n' +
        'Går ett beroende förlorat kan databasen inte längre upprätthålla det lokalt. Föreläsningens ' +
        'exempel: EMPLOYEE(EmployeeNo, Email, Office) med EmployeeNo → Email, uppdelad i ' +
        '(EmployeeNo, Office) och (Email, Office). Ingen av delarna innehåller både EmployeeNo och Email. ' +
        'Varje del för sig är felfri, men joinar man på Office får E1 två olika mejladresser — och ingen ' +
        'lokal kontroll kan upptäcka det.\n\n' +
        '**Se upp med den gamla formuleringen.** Förra årets föreläsning (som fortfarande ligger bland ' +
        'materialet) sa bara att ett beroende är bevarat "om dess två attribut finns i samma relation", ' +
        'och gav som exempel att EmployeeNo → ProjectName går förlorat när EmployeeProject delas upp i ' +
        '`Employee(EmployeeNo, Name, Address, ProjectNo)` och `Project(ProjectNo, ProjectName, Budget)`. ' +
        'Med den nya, fullständiga definitionen är det beroendet **inte** förlorat: EmployeeNo → ProjectNo ' +
        'gäller i Employee och ProjectNo → ProjectName i Project, och tillsammans implicerar de ' +
        'EmployeeNo → ProjectName. Samma-relation-testet är alltså ett **tillräckligt** villkor, inte ett ' +
        'nödvändigt. Pröva alltid om ett splittrat beroende följer av de lokala innan du säger att det ' +
        'gått förlorat.\n\n' +
        'Lossless join och dependency preservation är **oberoende** egenskaper. En dekomposition kan ha ' +
        'den ena utan den andra — mejlexemplet ovan saknar faktiskt båda.'
    },
    {
      rubrik: 'Ett verkligt exempel: World of Warcraft',
      text:
        'Blizzard beskriver själva hur deras databasdesign utvecklats. Den ursprungliga Spell-tabellen såg ' +
        'ut ungefär så här:\n\n' +
        '`Spell(Id, Name, effectOne, effectTwo, effectThree, auraOne, auraTwo, effectDamageOne, auraDamageOne, auraDamageTwo)`\n\n' +
        'De flesta besvärjelser använde inte alla kolumner, så tabellen var full av NULL-värden. Dessutom ' +
        'var antalet effekter **hårdkodat till tre** — vill man ha en fjärde måste man ändra schemat.\n\n' +
        'Normaliserat blev det istället tre tabeller:\n\n' +
        '`Spell(Id, Name)`\n`SpellEffect(Id, SpellID, effect, Damage)`\n`SpellAura(Id, SpellID, Aura, Damage)`\n\n' +
        'Blizzards egen kommentar: *"In this form, there is much less wasted space and spells are no ' +
        'longer limited to three effects."*\n\n' +
        'Poängen: normalisering handlar inte bara om teoretisk elegans utan om **lagringsutrymme och ' +
        'flexibilitet** i verkliga system.'
    }
  ],
  nyckelbegrepp: [
    'Tre anomalier — uppdatering, insättning, borttagning — med samma orsak: samma faktum lagrat flera gånger',
    'X → Y: samma X kräver samma Y i varje tillåten population. Beroenden kommer från regler, inte data',
    '{A,B} → C betyder A och B TILLSAMMANS; vänsterledet får aldrig delas',
    'Attributslutning X⁺: allt X bestämmer. Supernyckel: X⁺ = alla attribut. Kandidatnyckel: minimal supernyckel',
    'Attribut som aldrig står på en högersida ingår i varje kandidatnyckel',
    '1NF: atomära värden',
    '2NF: inget icke-primärt attribut beror på en äkta delmängd av en kandidatnyckel',
    '3NF: inga transitiva beroenden för icke-primära attribut',
    'Enkel kandidatnyckel ⇒ 2NF kan inte brytas',
    'Inga icke-primära attribut ⇒ automatiskt 3NF',
    'Lossless join: exakt återskapande; misslyckas det uppstår falska tupler',
    'Binärt test: (R₁ ∩ R₂)⁺ måste innehålla hela R₁ eller hela R₂',
    'Dependency preservation: de lokala beroendena ska tillsammans implicera alla ursprungliga'
  ],
  tentakoppling:
    'Normalformer och normalisering är ett av tentans fem områden. På HT25-tentorna var det uppgift 3 ' +
    '(20 p): fem sant/falskt-påståenden om tre givna uppdelningar (2 p rätt, −1 p fel) — normalform, ' +
    'kandidatnyckel, primärattribut, lossless join och dependency preservation — och sedan två ' +
    'relationer att bestämma normalform för och normalisera till 3NF (5 p var). Sant/falskt-delen ' +
    'löser du med attributslutning och det binära lossless-testet ovan. Öva övningshäftets uppgifter ' +
    '10–13 och Modelleras normaliseringsuppgifter tills du gör dem på under fem minuter styck.'
},

/* ====================== KAPITEL 9 ====================== */
{
  id: 'db-k9',
  nr: 9,
  titel: 'Fysisk design: DDL och constraints',
  ingress: 'CREATE TABLE, samtliga constraints, datatyper, namnkonventioner och varför surrogatnycklar införs just här.',
  lastid: 12,
  amnen: ['db-fysisk'],
  avsnitt: [
    {
      rubrik: 'Från relation till tabell',
      text:
        'Den logiska modellen `Employee(EmployeeNo, Name, Address, Salary)` blir i fysisk design:\n\n' +
        '```\nCREATE TABLE Employee (\n    EmployeeID INTEGER IDENTITY(1,1),\n' +
        '    EmpNo VARCHAR(10) NOT NULL,\n    EmpName VARCHAR(100),\n    EmpAddress VARCHAR(100),\n' +
        '    EmpSalary DECIMAL(10,2),\n' +
        '    CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY(EmployeeID),\n' +
        '    CONSTRAINT UQ_Employee_EmpNo UNIQUE(EmpNo)\n);\n```\n\n' +
        'Tre delar: kolumnnamn med datatyper, och constraints. En tabell får innehålla **exakt en** ' +
        'primärnyckel-constraint.'
    },
    {
      rubrik: 'Namnkonventioner',
      text:
        'Enligt kursens kodstandard:\n\n' +
        '- **Tabellnamn:** PascalCase och **singular**. Rätt: `Employee`, `HasStudied`. Fel: `Employees`, ' +
        '`hasStudied`\n' +
        '- **Kolumnnamn:** PascalCase\n' +
        '- **SQL-nyckelord:** VERSALER\n' +
        '- **Surrogatnyckelkolumn:** tabellnamn + "ID", alltså `EmployeeID`\n' +
        '- **Constraints:** prefix efter typ — `PK_`, `FK_`, `UQ_`, `CK_`, `DF_`, följt av tabell och kolumn\n' +
        '- **SQL-skriptfiler:** snake_case\n\n' +
        '**Undvik reserverade ord** som kolumnnamn. `Name` och `Address` är reserverade i SQL Server. En ' +
        'lösning är att prefixa kolumnerna med tabellnamnet eller en välkänd förkortning: `EmpName`, ' +
        '`EmpAddress`, `DeptBudget`.\n\n' +
        'Namnge alltid dina constraints. Gör du inte det hittar SQL Server på namn som ' +
        '`PK__Employee__AF2D66D30054DE4D`, vilket gör felmeddelanden i det närmaste obegripliga.'
    },
    {
      rubrik: 'Naturliga kontra surrogatnycklar',
      text:
        '**Naturlig nyckel** — en kandidatnyckel bildad av kolumner med **inneboende affärsmening** som ' +
        'används externt: e-postadress, personnummer, ISBN. De innehåller ofta fakta; ditt personnummer ' +
        'avslöjar bland annat hur gammal du är.\n\n' +
        '**Surrogatnyckel** — en enskild kolumn med unika värden, skapad enbart för **internt bruk** i ' +
        'databasen. Bör aldrig visas för slutanvändaren. Implementeras typiskt som autoinkrementerande ' +
        'heltal.\n\n' +
        'Synonymer: naturlig nyckel kallas även business key eller domain key; surrogatnyckel kallas ' +
        'synthetic key, pseudokey, factless key eller technical key.\n\n' +
        '**Tre problem med naturliga nycklar som primärnycklar:**\n\n' +
        '**1. Stabilitet.** Måste ett primärnyckelvärde ändras krävs följdändringar i alla främmande ' +
        'nyckel-referenser. Det är komplext, felbenäget och kan ge "orphaned rows". Refereras värdena i ' +
        'andra databaser måste även de uppdateras.\n\n' +
        'Behöver naturliga nycklar verkligen ändras? Ja. Ett svenskt personnummer kan ändras när du fyller ' +
        '100 (bindestrecket byts mot plus), om numret är felaktigt, vid juridiskt könsbyte, eller om du ' +
        'får ett fingerat personnummer efter att ha utsatts för allvarlig brottslighet. Registreringsnummer ' +
        'ändras vid stöld eller köp av personlig skylt. Och så finns handhavandefel: skriver någon in fel ' +
        'värde måste primärnyckeln ändras.\n\n' +
        '**2. Komplexitet.** En sammansatt primärnyckel måste **replikeras i varje refererande tabell**. ' +
        'Med PK {FirstName, LastName, DateOfBirth} måste alla tre kolumnerna finnas i Work-tabellen.\n\n' +
        '**3. Prestanda.** Varje join mellan tabellerna kräver då **tre jämförelser** av varchar och date, ' +
        'vilket är långsammare än att jämföra ett enda heltal.\n\n' +
        '**Nackdelar med surrogatnycklar** nämns också: kopplingstabeller blir mindre läsbara eftersom ' +
        'nycklarna saknar affärsfakta (löses med en trevägsjoin), och insättningar blir mer komplexa ' +
        'eftersom man först måste slå upp surrogatnycklarna.'
    },
    {
      rubrik: 'IDENTITY och entitetsintegritet',
      text:
        '```\nEmployeeID INTEGER IDENTITY(1,1)\n```\n\n' +
        'Första argumentet är **seed** — värdet för den allra första raden. Andra är **increment** — vad ' +
        'som läggs till föregående rads värde.\n\n' +
        'IDENTITY-kolumner utelämnas ur INSERT-satsens kolumnlista, eftersom databasen genererar värdena.\n\n' +
        '> **Viktigt:** IDENTITY gör inte kolumnen till primärnyckel. Det kräver en separat ' +
        '`PRIMARY KEY`-constraint. Och FK-kolumner i kopplingstabeller ska **inte** ha IDENTITY — deras ' +
        'värden kommer från de refererade tabellerna.\n\n' +
        '**Hur bevaras entitetsintegriteten?** När en naturlig nyckel är primärnyckel sköter ' +
        'PK-constraintet både unikhet och NOT NULL automatiskt. Med surrogatnyckel som PK gäller det bara ' +
        'surrogatnyckeln — utan mer skulle detta vara möjligt:\n\n' +
        '```\n-- Möjligt utan NOT NULL på den naturliga nyckeln\nINSERT INTO Employee VALUES (NULL, NULL, NULL, NULL, NULL);\n\n' +
        '-- Möjligt utan UNIQUE på den naturliga nyckeln\nINSERT INTO Employee VALUES(\'P1\', \'Edgar Codd\', \'Lund\', 90000, 1),\n' +
        '                            (\'P1\', \'Edgar Codd\', \'Lund\', 90000, 1);\n```\n\n' +
        'Därför blir standardmönstret alltid:\n\n' +
        '> **PRIMARY KEY på surrogatnyckeln + UNIQUE + NOT NULL på varje naturlig nyckel.**'
    },
    {
      rubrik: 'Constraints',
      text:
        'Constraints används för att säkerställa entitetsintegritet, domänintegritet, referensintegritet ' +
        'och dataintegritet (verksamhetsregler). De anges alltid med `CREATE TABLE` eller `ALTER TABLE`.\n\n' +
        '**PRIMARY KEY.** Ingen del av en primärnyckel får vara NULL, och värdena måste vara unika. ' +
        'Försöker man infoga en dubblett: *"Violation of PRIMARY KEY constraint … Cannot insert duplicate ' +
        'key."*\n\n' +
        '**UNIQUE.** Ett constraint per nyckel. Har relationen två kandidatnycklar behövs två separata ' +
        'UNIQUE-constraints. Notera att felmeddelandet vid sammansatt UNIQUE anger värdet som ' +
        '`(Edgar, Codd)` — ett par, inte en sträng.\n\n' +
        '**FOREIGN KEY.** Upprätthåller referensintegritet: *om B refererar till A måste A existera*. ' +
        'Värdet får vara NULL om den anställde inte tillhör någon avdelning och NULL är tillåtet.\n\n' +
        '**NOT NULL.** Används bland annat för att implementera **obligatoriskt deltagande** från ' +
        'ER-modellen. "En anställd måste arbeta på exakt en avdelning" blir ' +
        '`DepartmentID INTEGER NOT NULL`.\n\n' +
        '**CHECK.** Verktyget för verksamhetsregler som ER-modellen inte kan uttrycka:\n\n' +
        '```\nCONSTRAINT CK_Employee_EmpNo CHECK(EmpNo LIKE \'E__\'),\n' +
        'CONSTRAINT CK_Employee_Address CHECK(EmpAddress IN(\'Lund\', \'New York\')),\n' +
        'CONSTRAINT CK_Employee_Salary CHECK(EmpSalary BETWEEN 20000 AND 90000)\n```\n\n' +
        '**DEFAULT.** Sätter ett värde när inget anges: ' +
        '`EmpHireDate DATETIME CONSTRAINT DF_Employee_EmpHireDate DEFAULT GETDATE()`.\n\n' +
        '**ON DELETE CASCADE.** Raderar automatiskt refererande barnrader när föräldraraden raderas. Utan ' +
        'den blockeras raderingen av FK-constraintet. `ON UPDATE CASCADE` fungerar analogt vid ändring av ' +
        'nyckelvärdet — men materialet påpekar att kaskadering kan behöva uppdatera miljontals rader och ' +
        'därför inte är att föredra framför surrogatnycklar.\n\n' +
        '**Översättningstabell från ER till constraints:**\n\n' +
        '| ER-modellen | Fysisk design |\n' +
        '|---|---|\n' +
        '| Obligatoriskt deltagande | NOT NULL på FK |\n' +
        '| Frivilligt deltagande | FK får vara NULL |\n' +
        '| 1:1-samband | UNIQUE på FK-kolumnen |\n' +
        '| Identifierande attribut | UNIQUE + NOT NULL |\n' +
        '| Värdebaserad regel | CHECK |'
    },
    {
      rubrik: 'ALTER TABLE och DROP',
      text:
        '```\n-- Lägg till kolumner\nALTER TABLE Employee ADD EmpAge INTEGER;\n\n' +
        '-- Ta bort en kolumn\nALTER TABLE Employee DROP COLUMN EmpAddress;\n\n' +
        '-- Ändra datatyp\nALTER TABLE Employee ALTER COLUMN EmpSalary DECIMAL(10,2);\n\n' +
        '-- Ta bort och lägga till constraints\nALTER TABLE Employee DROP CONSTRAINT PK_Employee_EmpNo;\n' +
        'ALTER TABLE Employee ADD CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY(EmployeeID);\n```\n\n' +
        'Att tillfälligt droppa ett FK-constraint för att kunna uppdatera nyckelvärden är en känd ' +
        'workaround — men materialet varnar: det kan **kompromettera dataintegriteten**. Det botas med ' +
        'databastransaktioner, som ligger utanför kursen.\n\n' +
        '`DELETE FROM Employee;` tömmer tabellen. `DROP TABLE Employee;` tar bort den ur databasen.'
    },
    {
      rubrik: 'Datatyper i SQL Server',
      text:
        '**Exakta numeriska** — när precision är kritisk, vilket det oftast är:\n\n' +
        '| Typ | Intervall | Storlek |\n' +
        '|---|---|---|\n' +
        '| TINYINT | 0 till 255 | 1 byte |\n' +
        '| SMALLINT | −32 768 till 32 767 | 2 byte |\n' +
        '| INTEGER | ca ±2,1 miljarder | 4 byte |\n' +
        '| BIGINT | ca ±9,2 triljoner | 8 byte |\n\n' +
        '**BIT** — SQL Server saknar boolean. BIT rymmer 1 eller 0.\n\n' +
        '**DECIMAL(precision, scale)** och **NUMERIC** är synonymer. Precision är totalt antal siffror, ' +
        'scale antalet decimaler. `DECIMAL(10,5)` rymmer alltså 5 siffror före och 5 efter ' +
        'decimaltecknet. Överskrids precisionen: *"Arithmetic overflow error."*\n\n' +
        '**MONEY** motsvarar DECIMAL(19,4) och **SMALLMONEY** DECIMAL(10,4). Microsoft varnar själva för ' +
        'avrundningsfel.\n\n' +
        '**Datum och tid:** DATE (bara datum), TIME (bara tid), DATETIME (ca 3,33 ms precision, från ' +
        '1753), DATETIME2 (upp till 7 decimaler, från år 1), DATETIMEOFFSET (med tidszon), SMALLDATETIME ' +
        '(minutprecision, 1900–2079).\n\n' +
        '**Teckensträngar:**\n\n' +
        '- **CHAR(n)** — fast storlek. Använd när längden alltid är densamma: landskoder (SE, GB), ' +
        'delstatskoder (CA, NY). CHAR(11) lagrar värdet "1" som 11 byte.\n' +
        '- **VARCHAR(n)** — variabel storlek. Använd för namn och adresser.\n' +
        '- **VARCHAR(MAX)** — upp till 2 GB. Använd bara vid värden över 8000 byte; hämtning blir ' +
        'långsammare.\n' +
        '- **TEXT** — föråldrad, ska undvikas. Använd VARCHAR(MAX).\n\n' +
        '> **Viktig detalj som ofta missförstås:** argumentet i CHAR(2) och VARCHAR(40) anger antal ' +
        '**byte**, inte antal tecken. Missuppfattningen är vanlig eftersom latinska tecken normalt tar en ' +
        'byte. Men `N\'张伟\'` tar 3 byte per tecken och får inte plats i CHAR(2).\n\n' +
        '**Unicode:** CHAR och VARCHAR använder **inte** UTF-8 som standard, utan en mindre teckenuppsättning ' +
        'som täcker det latinska alfabetet. För andra tecken finns två vägar: ange UTF-8-kollation på ' +
        'kolumnen, eller använd **NCHAR** och **NVARCHAR** som använter UCS-2 eller UTF-16. Prefixet `N` ' +
        'framför en sträng markerar att den är unicode: `INSERT … VALUES (N\'张伟\')`.'
    }
  ],
  nyckelbegrepp: [
    'Tabeller: PascalCase, singular. Constraints: PK_/FK_/UQ_/CK_/DF_',
    'IDENTITY(seed, increment) genererar värden men sätter inte primärnyckel',
    'Surrogatnyckel som PK + UNIQUE + NOT NULL på varje naturlig nyckel',
    'Tre problem med naturliga nycklar: stabilitet, komplexitet, prestanda',
    'Obligatoriskt deltagande ⇒ NOT NULL på FK; 1:1 ⇒ UNIQUE på FK',
    'CHECK för verksamhetsregler ER-modellen inte kan uttrycka',
    'CHAR för fast längd, VARCHAR för variabel; argumentet anger BYTE, inte tecken',
    'NCHAR/NVARCHAR för unicode; prefix N framför strängkonstanten'
  ],
  tentakoppling:
    'Transformation till fysisk datamodell är ett av tentans fem områden, och på HT25-tentorna ' +
    'uppgift 2 (25 p). Uppgiftstexten kräver att reserverade ord skrivs ut helt (PRIMARY KEY, ' +
    'CONSTRAINT), att alla constraints är med, och att tabeller för vanliga och svaga entiteter får ' +
    'automatiskt inkrementerande surrogatnycklar; constraints behöver inte namnges. Övningshäftets uppgifter ' +
    '18–22 går från ER-diagram till komplett DDL — exakt den uppgiftstypen.'
},

/* ====================== KAPITEL 10 ====================== */
{
  id: 'db-k10',
  nr: 10,
  titel: 'Klientutveckling, säkerhet och metadata',
  ingress: 'JDBC, DAO-mönstret, SQL-injektion, hemligheter och metadata — grunden för projektet, och från HT26 även ett tentaområde.',
  lastid: 11,
  amnen: ['db-klient', 'db-sakerhet', 'db-metadata'],
  avsnitt: [
    {
      rubrik: 'Vad det här kapitlet är till för',
      text:
        'Detta kapitel hör till delkursens tredje del, **applikationsutveckling**: databasprojektet, där ' +
        'ni i grupp utvecklar en Java-klient som pratar med SQL Server via JDBC, med resurshantering, ' +
        'felhantering, säkerhet och metadata.\n\n' +
        '> **Nytt för HT26:** introduktionsföreläsningen räknar upp applikationsutveckling — *"writing ' +
        'code for relational databases"* — som ett av tentans fem områden. Det ingick inte i HT25-tentorna, ' +
        'så det finns inga gamla uppgifter att gå efter. Läs alltså kapitlet både för projektet och för ' +
        'tentan, och kunna särskilt JDBC-flödet, try-with-resources, parametriserade frågor och ' +
        'ResultSetMetaData.'
    },
    {
      rubrik: 'JDBC-grunderna',
      text:
        'En **connection URL** för SQL Server ser ut så här:\n\n' +
        '```\njdbc:sqlserver://<server>:<port>;database=<db>;user=<användare>;\n' +
        'password=<lösenord>;encrypt=true;trustServerCertificate=true;\n```\n\n' +
        '`encrypt` och `trustServerCertificate` krävs från JDBC-drivrutin v10.2 och senare.\n\n' +
        '**Arbetsflödet:**\n\n' +
        '```\ntry (Connection connection = connectionHandler.getConnection();\n' +
        '     PreparedStatement statement = connection.prepareStatement(query);\n' +
        '     ResultSet resultSet = statement.executeQuery()) {\n\n' +
        '    while (resultSet.next()) {\n        String empNo = resultSet.getString("EmpNo");\n' +
        '        String empName = resultSet.getString("EmpName");\n    }\n\n' +
        '} catch (SQLException e) {\n    // felhantering\n}\n```\n\n' +
        '**Metodval:**\n\n' +
        '- `executeQuery()` för SELECT — returnerar ett **ResultSet**\n' +
        '- `executeUpdate()` för INSERT, UPDATE och DELETE — returnerar **antalet påverkade rader**\n\n' +
        'Minnesregel: Query frågar efter data ⇒ ResultSet. Update ändrar data ⇒ antal rader.\n\n' +
        '**try-with-resources** är avgörande. Resurser som deklareras i try-parentesen stängs automatiskt ' +
        'när blocket lämnas, oavsett om det sker normalt eller genom ett undantag. Utan den krävs manuella ' +
        '`close()`-anrop i ett finally-block, och glöms de bort läcker anslutningar tills poolen tar slut.'
    },
    {
      rubrik: 'Arkitektur: separation of concerns',
      text:
        'Exempelapplikationen är byggd så här:\n\n' +
        '- **Vy** — gränssnittet definierat i FXML\n' +
        '- **Controller** — hanterar användarhändelser (MVC)\n' +
        '- **Data Access Layer** — DAO-mönstret, med JDBC\n' +
        '- **DaoException** — egen undantagsklass för lös koppling mellan lagren\n\n' +
        '**DAO-mönstret** (Data Access Object) samlar all databasåtkomst på ett ställe. `EmployeeDao` har ' +
        'metoder som `findAll()`, `findByEmpNo()` och `save()`. Controllern anropar dem utan att veta ' +
        'något om SQL, Connection eller ResultSet.\n\n' +
        'Materialet visar tre nivåer: **poor**, **partial** och **total separation of concerns**. Vid ' +
        'total separation känner varje lager bara till nästa. Byts databasen ut behöver bara DAO-lagret ' +
        'skrivas om.\n\n' +
        'Den egna undantagsklassen `DaoException` är central: controllern behöver aldrig importera ' +
        '`java.sql` och behöver därmed inte veta att det är just en SQL-databas bakom.'
    },
    {
      rubrik: 'SQL-injektion',
      text:
        'Kapitlets viktigaste avsnitt. Utgå från den här koden — **den är sårbar**:\n\n' +
        '```\nString query = "INSERT INTO Employee (EmpNo, EmpName, EmpSalary) VALUES ("\n' +
        '    + "\'" + employee.getEmployeeNumber() + "\', "\n' +
        '    + "\'" + employee.getName() + "\', "\n    + employee.getSalary() + ")";\n\n' +
        'PreparedStatement statement = connection.prepareStatement(query);\nstatement.executeUpdate();\n```\n\n' +
        'Materialet kallar det *"misuse of PreparedStatement"*: klassen används, men helt utan effekt, ' +
        'eftersom strängen redan är färdigbyggd när den skickas in.\n\n' +
        '**Angreppet.** I namnfältet skriver angriparen:\n\n' +
        '```\nlol pwned\', 1337); DELETE Employee; --\n```\n\n' +
        'Den färdiga frågan blir:\n\n' +
        '```\nINSERT INTO Employee (EmpNo, EmpName, EmpSalary)\nVALUES (\'E9\', \'lol pwned\', 1337); DELETE Employee; --, 99999)\n```\n\n' +
        '**Fyra delar samverkar:**\n\n' +
        '1. Enkelfnutten `\'` avslutar strängvärdet i förtid\n' +
        '2. Semikolonet `;` avslutar den legitima satsen\n' +
        '3. `DELETE Employee` är angriparens egna kod\n' +
        '4. De dubbla bindestrecken `--` kommenterar bort resten så att inget syntaxfel uppstår\n\n' +
        'Resultatet: hela Employee-tabellen töms.\n\n' +
        '**Motmedlet — parametriserade frågor:**\n\n' +
        '```\nString query = "INSERT INTO Employee (EmpNo, EmpName, EmpSalary) VALUES (?, ?, ?)";\n\n' +
        'try (Connection connection = connectionHandler.getConnection();\n' +
        '     PreparedStatement statement = connection.prepareStatement(query)) {\n\n' +
        '    statement.setString(1, employee.getEmployeeNumber());\n' +
        '    statement.setString(2, employee.getName());\n' +
        '    statement.setDouble(3, employee.getSalary());\n    statement.executeUpdate();\n}\n```\n\n' +
        'Nu skickas frågans **struktur** och dess **värden** separat till databasen. Injektionssträngen ' +
        'behandlas som ett textvärde och sparas som ett kuriöst men ofarligt namn.\n\n' +
        '> Att *använda* PreparedStatement skyddar inte. Det är platshållarna `?` och sättermetoderna som ' +
        'gör jobbet.\n\n' +
        '**Djupförsvar** utöver parametrisering: minsta möjliga behörighet för applikationens ' +
        'databaskonto, indatavalidering i applikationslagret, constraints i databasen som skyddsnät, och ' +
        'felmeddelanden som inte avslöjar databasstruktur för slutanvändaren.'
    },
    {
      rubrik: 'Att hantera hemligheter',
      text:
        'Hårdkodade anslutningsuppgifter i källkoden är en av de vanligaste verkliga säkerhetsbristerna.\n\n' +
        '**Varför det är farligt:**\n\n' +
        '- Källkod hamnar i versionshantering. Görs ett repository publikt av misstag har alla på ' +
        'internet det som krävs för att ansluta. Materialet ger verkliga exempel: **Toyota exponerade en ' +
        'hemlig nyckel på GitHub i fem år**.\n' +
        '- Man kan inte klistra in kod på Stack Overflow eller MSDN utan att först sanera den\n' +
        '- Teammedlemmar kan behöva egna uppgifter, vilket tvingar fram lokala ändringar som måste ändras ' +
        'tillbaka före push\n\n' +
        '**Två föreslagna lösningar:**\n\n' +
        '**1. Systemmiljövariabler** (Windows):\n\n' +
        '```\nString databaseServerName = System.getenv("DATABASE_SERVER_NAME");\n' +
        'String databaseUserPassword = System.getenv("DATABASE_USER_PASSWORD");\n```\n\n' +
        'Returnerar `System.getenv()` null? Kontrollera stavningen och starta om Windows-maskinen.\n\n' +
        '**2. Properties-fil** som undantas från versionshantering:\n\n' +
        '```\ndatabase.server.name=74.241.165.119\ndatabase.server.port=1433\n' +
        'database.name=Company\ndatabase.user.name=company_user\ndatabase.user.password=…\n```\n\n' +
        'Läses via `Properties` och `getResourceAsStream`. Lägg filen i `.gitignore` och committa en ' +
        '`.env.example` med enbart nyckelnamnen. Dokumentera vilka variabler som krävs i README.\n\n' +
        'I båda fallen byggs URL:en ihop i en `ConnectionHandler`-klass, så att resten av applikationen ' +
        'aldrig ser uppgifterna.\n\n' +
        '**Attacker mot beroenden.** Applikationens säkerhet beror inte bara på din egen kod. Varje ' +
        'beroende i pom.xml är en förtroendelänk. Kompromissas ett paket i sin källa — som i de omtalade ' +
        'npm-fallen med `debug` och `chalk` — körs angriparens kod i alla applikationer som hämtar den nya ' +
        'versionen. Exempelkoden i föreläsningen läser av användarens Ethereum-plånbok. Motmedel: lås ' +
        'versioner, granska nya beroenden, håll antalet nere.\n\n' +
        '**Behörigheter i praktiken.** SQL-uppgiftens Task 2 går ut på att ge en annan grupp läsåtkomst: ' +
        'ett SQL Server-inloggningskonto (inte Windows-konto) med starkt lösenord, serverrollen public och ' +
        'läsrättigheter — *"but not more!"*. Ingen RDP-åtkomst till operativsystemet. Grupperna verifierar ' +
        'varandras konfiguration genom att testa destruktiva kommandon: `DELETE Employee`, `DROP TABLE Car`, ' +
        '`DROP DATABASE Hospital`. Lyckas något har behörigheterna satts fel.'
    },
    {
      rubrik: 'Metadata',
      text:
        'Metadata är data om data. SQL Server har fyra **systemdatabaser**:\n\n' +
        '- **master** — systeminformation för instansen: inloggningskonton, endpoints, länkade servrar, ' +
        'systeminställningar, vilka databaser som finns\n' +
        '- **model** — **mall** för alla nya databaser. Ändras model ärver alla databaser som skapas ' +
        '*därefter* ändringarna\n' +
        '- **msdb** — används av SQL Server Agent och SSMS för schemaläggning samt backup- och ' +
        'återställningshistorik\n' +
        '- **tempdb** — global resurs för temporära tabeller och procedurer. Återskapas från grunden vid ' +
        'varje start; ingenting sparas mellan sessioner\n\n' +
        'Säkerhetskopiera alltid model och msdb innan du ändrar dem.\n\n' +
        'De fyra har `database_id` 1–4, vilket ger ett praktiskt knep:\n\n' +
        '```\n-- Användarskapade databaser\nSELECT database_id, name, create_date\nFROM sys.databases\nWHERE database_id > 4;\n```\n\n' +
        '**Två sorters vyer.** master lagrar det mesta i skyddade, dolda systemtabeller. Vyerna är det ' +
        'publika gränssnittet mot dem.\n\n' +
        '- **sys-vyer** — främst instansnivå: `sys.databases`, `sys.sql_logins`, `sys.server_principals`. ' +
        'Men det finns även sys-vyer på databasnivå: `sys.tables`, `sys.objects`, `sys.check_constraints`, ' +
        '`sys.default_constraints`\n' +
        '- **INFORMATION_SCHEMA** — databasnivå: `COLUMNS`, `TABLES`, `TABLE_CONSTRAINTS`\n\n' +
        '```\nUSE Company;\n\nSELECT ORDINAL_POSITION, COLUMN_NAME, TABLE_NAME, DATA_TYPE, IS_NULLABLE\n' +
        'FROM INFORMATION_SCHEMA.COLUMNS\nWHERE DATA_TYPE = \'varchar\' AND IS_NULLABLE = \'YES\';\n```\n\n' +
        'Notera att `IS_NULLABLE` är en **textsträng** med värdet \'YES\' eller \'NO\' — inte en boolean ' +
        'eller bit. Samma sak för `DATA_TYPE`, som jämförs mot gemena typnamn.\n\n' +
        'Med **trepartsnamn** (databas.schema.objekt) når man en annan databas utan att byta kontext, ' +
        'vilket gör det möjligt att slå ihop metadata från flera databaser med UNION.'
    },
    {
      rubrik: 'ResultSetMetaData',
      text:
        'JDBC ger tillgång till metadata på två sätt: dels genom att fråga metadatavyerna som vanligt, ' +
        'dels genom **ResultSetMetaData** som beskriver själva resultatmängden.\n\n' +
        '```\nResultSetMetaData metaData = resultSet.getMetaData();\n' +
        'System.out.println("Column count: " + metaData.getColumnCount());\n\n' +
        'for (int i = 1; i <= metaData.getColumnCount(); i++) {\n' +
        '    System.out.println("Column name: " + metaData.getColumnName(i));\n' +
        '    System.out.println("Column type: " + metaData.getColumnTypeName(i));\n' +
        '    System.out.println("Is nullable: " + metaData.isNullable(i));\n}\n```\n\n' +
        '**Den avgörande skillnaden:** ResultSetMetaData beskriver **resultatmängden**, inte tabellen. Den ' +
        'ändras när SELECT-satsen ändras.\n\n' +
        'För frågan `SELECT EmpNo AS No, EmpName AS Name, \'Test\' AS TestColumn FROM Employee` blir ' +
        'kolumnnamnen **No, Name och TestColumn** — alltså aliasen. Litteralen `\'Test\'` bildar en ' +
        'fullvärdig kolumn med egen metadata (varchar, isNullable 0).\n\n' +
        'Vill du ha den faktiska tabelldefinitionen måste du fråga `INFORMATION_SCHEMA.COLUMNS`. Då får du ' +
        'med EmployeeID, EmpNo, EmpName och EmpSalary oavsett hur frågan såg ut.\n\n' +
        'Notera också indexeringen: JDBC:s kolumnindex börjar på **1**, inte 0.'
    }
  ],
  nyckelbegrepp: [
    'executeQuery() ger ResultSet; executeUpdate() ger antal påverkade rader',
    'try-with-resources stänger Connection, PreparedStatement och ResultSet automatiskt',
    'DAO kapslar in databasåtkomsten; DaoException ger lös koppling till controllern',
    'SQL-injektionens fyra delar: fnutt, semikolon, skadlig kod, kommentar',
    'Skyddet är platshållare (?) plus setString/setInt — inte enbart PreparedStatement',
    'Hemligheter i miljövariabler eller properties-fil utanför versionshanteringen',
    'Systemdatabaser: master, model (mall), msdb, tempdb (återskapas vid start)',
    'sys-vyer främst instansnivå, INFORMATION_SCHEMA databasnivå',
    'ResultSetMetaData beskriver resultatmängden och visar aliasen, inte tabellen'
  ],
  tentakoppling:
    'Applikationsutveckling är från HT26 ett av tentans fem områden, men hur uppgiften ser ut vet ' +
    'ingen än — HT25-tentorna hade den inte. Det säkraste är att kunna skriva och läsa koden i det här ' +
    'kapitlet utan att titta: en try-with-resources med PreparedStatement och platshållare, ' +
    'skillnaden mellan executeQuery och executeUpdate, och varför en sammanfogad sträng är sårbar.'
}

);
