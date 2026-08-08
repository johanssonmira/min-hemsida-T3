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
  ingress: 'Entiteter, attributtyper, samband, multiplicitet, deltagande, svaga entiteter — och vad notationen inte klarar.',
  lastid: 12,
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
        '**Entitetstyp:** *en mängd saker med samma egenskaper, som av en användare eller organisation ' +
        'identifieras som havande en oberoende existens.* Informellt kallad entitet.\n\n' +
        'Entiteter kan ha **fysisk existens** (Student) eller **konceptuell existens** (Course).\n\n' +
        'Nyckelordet är **oberoende existens**. Address är ett attribut till Student så länge vi inte ' +
        'behöver lagra data om adresser för deras egen skull. Behöver vi det — kanske vill vi lagra ' +
        'gatunamn och gatunummer separat, oberoende av vem som bor där — måste Address bli en egen ' +
        'entitet med ett samband till Student.\n\n' +
        'Testet: **behöver verksamheten lagra data om saken för dess egen skull?**'
    },
    {
      rubrik: 'Attributtyper',
      text:
        '- **Enkelt attribut** — ett odelbart värde, t.ex. StudentNo\n' +
        '- **Sammansatt attribut** — består av delattribut, t.ex. Name bestående av FirstName och LastName\n' +
        '- **Multivärt attribut** — kan ha flera värden samtidigt, t.ex. flera adresser\n' +
        '- **Härlett attribut** — kan beräknas ur andra, t.ex. Age ur DateOfBirth\n' +
        '- **Identifierande attribut** — unikt identifierar en förekomst. Ritas **understruket** i ' +
        'Chen-notation\n\n' +
        'Sammansatta attribut kan också vara identifierande. Materialet går igenom fyra varianter av ' +
        'Student med olika unikhetskrav, och skillnaden syns i vilka attribut som är understrukna:\n\n' +
        '- Unikt StudentNo, namnet inte unikt ⇒ StudentNo understruket\n' +
        '- StudentNo inte unikt, men kombinationen FirstName + LastName unik ⇒ båda delattributen ' +
        'understrukna\n' +
        '- Både StudentNo och namnkombinationen unika ⇒ alla tre understrukna\n' +
        '- Även adressen unik ⇒ även Address understruken\n\n' +
        'Varje understruken uppsättning motsvarar en **kandidatnyckel** i nästa steg.'
    },
    {
      rubrik: 'Samband: multiplicitet och deltagande',
      text:
        'Ett binärt samband har ett **namn** och **multipliciteter** (ibland kallade kardinaliteter).\n\n' +
        '**Multiplicitet** — 1:1, 1:M eller M:N.\n\n' +
        '> Skriv alltid **M:N**, aldrig M:M. Samma bokstav på båda sidor skulle påstå att antalet är ' +
        'identiskt i båda riktningarna. M och N är fristående variabler för "många".\n\n' +
        '**Deltagande** — obligatoriskt eller frivilligt, och det anges **per sida**. I Chen-notation ' +
        'visas obligatoriskt deltagande med **dubbla linjer** mellan entiteten och sambandet; en enkel ' +
        'linje betyder frivilligt.\n\n' +
        'Detta är två **oberoende** dimensioner. En 1:M-relation kan vara obligatorisk för studenten men ' +
        'frivillig för kursen, obligatorisk för båda, eller frivillig för båda. I UML uttrycks båda ' +
        'samtidigt av intervallet: `1..1` mot `0..*`.\n\n' +
        '**Relationsattribut** representerar data som uppstår som ett resultat av själva sambandet. Bara ' +
        'en student som *har läst* en kurs kan tilldelas ett betyg — Grade hör därför varken till Student ' +
        'eller Course utan till sambandet HasStudied. Används mest vid M:N men förekommer även vid 1:M ' +
        'och 1:1.\n\n' +
        'Det kan finnas **flera samband mellan samma två entiteter**, till exempel Study (pågående) och ' +
        'HasStudied (avslutade).\n\n' +
        '**Unära (rekursiva) samband** går från en entitet till sig själv, till exempel att en student ' +
        'mentorerar andra studenter. Rollnamn (mentors, is_mentored) klargör riktningen. Knep: rita ut ' +
        'det som binärt med två kopior av entiteten, så blir det uppenbart.'
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
        'Kedjan kan vara längre. Med University → Department → Course kan två institutioner vid samma ' +
        'universitet ha kurser med samma kod, eftersom kursen är unik inom institutionen och ' +
        'institutionen unik inom universitetet.'
    },
    {
      rubrik: 'Chen kontra Crow\'s foot',
      text:
        'ER-diagram kan ritas i olika notationer som skiljer sig både visuellt och i vilka element de ' +
        'erbjuder. Kursen fokuserar på Chen och Crow\'s foot, eftersom de är gjorda för ER-modellering.\n\n' +
        '**Crow\'s foot** har sitt ursprung 1976 (Everest), är vanligt förekommande men **inte ' +
        'standardiserat**. Det gör att du hittar många varianter.\n\n' +
        'Vad Crow\'s foot i Visual Paradigm **saknar** jämfört med Chen:\n\n' +
        '- **Multivärda attribut** — måste lösas med en egen entitet\n' +
        '- **Härledda attribut** — går inte att visa\n' +
        '- **Sammansatta attribut** — kan inte visas\n' +
        '- **Svaga entiteter** — saknas; istället visas identifierande relation med heldragen linje ' +
        'istället för streckad\n' +
        '- Att visa att både StudentNo *och* kombinationen FirstName+LastName är unika samtidigt\n\n' +
        '**Om UML.** ER-diagram kan visuellt likna UML-klassdiagram men är **fundamentalt och ' +
        'konceptuellt olika**. ER-diagram är för design av relationsdatabaser; UML-klassdiagram för ' +
        'objektorienterade lösningar. UML används ibland som ER-notation eftersom den är välkänd, men ' +
        'saknar element som identifierande attribut, svaga entiteter och relationsattribut ' +
        '(associationsklass är inte samma sak i ER-paradigmet).\n\n' +
        'UML-multipliciteter: `0..1` noll eller ett, `1` eller `1..1` exakt ett, `0..*` eller `*` noll ' +
        'eller många, `1..5` minst ett och högst fem.'
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
    'Entitet: mängd saker med samma egenskaper och oberoende existens',
    'Attributtyper: enkelt, sammansatt, multivärt, härlett, identifierande',
    'Multiplicitet (1:1, 1:M, M:N) och deltagande (obligatoriskt/frivilligt) är oberoende dimensioner',
    'Skriv M:N, aldrig M:M',
    'Dubbla linjer i Chen = obligatoriskt deltagande',
    'Relationsattribut: data som uppstår ur sambandet',
    'Svag entitet: kan inte identifieras utan ägarens nyckel; dubbel ram + partiell identifierare',
    'ER-modellen kan inte uttrycka värdebaserade verksamhetsregler'
  ],
  tentakoppling:
    'ER-modellering är ett av tentans fyra områden. Räkna med att gå från en verksamhetsbeskrivning ' +
    'i text till ett diagram, eller att avgöra vilka dataförekomster som är giltiga enligt en modell.'
},

/* ====================== KAPITEL 7 ====================== */
{
  id: 'db-k7',
  nr: 7,
  titel: 'Logisk design: från ER till relationer',
  ingress: 'Relationsmodellen, nyckelbegreppen och samtliga transformationsregler du behöver kunna utantill.',
  lastid: 12,
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
        '**Kandidatnyckel** — *ett attribut eller en attributmängd som unikt kan identifiera vilken tupel ' +
        'som helst*. Ett annat sätt att uttrycka det: ett attribut som funktionellt bestämmer alla övriga ' +
        'attribut.\n\n' +
        '**Primärnyckel** — *ett specifikt val av attribut som unikt identifierar en tupel*. Alltså: den ' +
        'kandidatnyckel som databasarkitekten valt.\n\n' +
        'En relation kan ha **flera kandidatnycklar** men bara en primärnyckel. Employee(EmployeeNo, ' +
        'Email, Name) har till exempel två kandidatnycklar: EmployeeNo och Email. Arkitekten väljer en.\n\n' +
        'Vid val bör man ta den som är **stabil, minimal och semantiskt meningsfull**.\n\n' +
        '**Sammansatt kandidatnyckel** består av flera attribut, till exempel {FirstName, LastName}. Båda ' +
        'attributen understryks då.\n\n' +
        '**Främmande nyckel** (foreign key) — ett attribut som refererar till en kandidatnyckel i en ' +
        'annan relation. Relationerna kallas parent/referenced/master respektive child/referencing/detail.\n\n' +
        '**Referensintegritet:** värdet i en främmande nyckel måste finnas i den refererade kolumnen, ' +
        'eller vara NULL. I klartext: *du får inte arbeta i ett projekt som inte finns*.'
    },
    {
      rubrik: 'Varför inga surrogatnycklar här?',
      text:
        'En fråga som ofta förvirrar. På den logiska nivån använder vi **naturliga nycklar** från ' +
        'ER-modellen. Skälen:\n\n' +
        '- **Konceptuell klarhet** — vi förlitar oss på tydligt definierade, naturliga identifierare från ' +
        'den konceptuella modellen\n' +
        '- **Bevarad mening** — naturliga nycklar speglar verkliga verksamhetsregler och semantik\n' +
        '- **Inte en fysisk fråga än** — surrogatnycklar är en fysisk optimering för implementation, ' +
        'indexering och joins\n\n' +
        'Surrogatnycklar kommer in i **fysisk design** (kapitel 9), valda utifrån nyckelstabilitet, ' +
        'prestanda och enkelhet.'
    },
    {
      rubrik: 'Transformationsreglerna',
      text:
        'Detta är kapitlets kärna. Lär dig dem så väl att du inte behöver slå upp dem.\n\n' +
        '**1. Vanlig (icke-svag) entitet.** Skapa en relation med samma namn. Ta med alla enkla och ' +
        'envärda attribut. Sammansatta attribut tas **inte** med som sådana — bara deras atomära ' +
        'delattribut. Välj en av de identifierande uppsättningarna till primärnyckel.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary)`\n\n' +
        '**2. Svag entitet.** Skapa en relation med den svaga entitetens enkla, envärda attribut. Lägg ' +
        'till **ägarentitetens primärnyckel som främmande nyckel**. Primärnyckeln blir **kombinationen** ' +
        'av denna främmande nyckel och den partiella identifieraren.\n\n' +
        '`Hotel(Name, Rating)`\n`Room(RoomNumber, HotelName, Price)` — PK är {RoomNumber, HotelName}\n\n' +
        'Notera att varken RoomNumber eller HotelName är unika var för sig; bara kombinationen.\n\n' +
        '**3. Binärt 1:M.** Lägg **ett-sidans primärnyckel som främmande nyckel på många-sidan**. ' +
        'Eventuella enkla relationsattribut hamnar i samma relation.\n\n' +
        '`Project(ProjectNo, Name, Budget)`\n`Employee(EmployeeNo, Name, Address, Salary, Hours, ProjectNo)`\n\n' +
        'Minnesregel: FK hamnar alltid på **många**-sidan. Skälet är atomaritet — många-sidan har exakt ' +
        'ett värde att peka på.\n\n' +
        '**4. Binärt 1:1.** Tre fall:\n\n' +
        '- *Obligatoriskt för en sida:* lägg den **icke-obligatoriska** sidans primärnyckel som främmande ' +
        'nyckel hos den **obligatoriska** sidan\n' +
        '- *Frivilligt för båda:* främmande nyckel-metoden fungerar åt båda hållen — arkitekten väljer\n' +
        '- *Obligatoriskt för båda*, och inget annat samband finns mellan entiteterna: de kan slås ihop ' +
        'till **en enda relation**, eller så används främmande nyckel-metoden. Tre giltiga alternativ.\n\n' +
        '**5. Binärt M:N.** Skapa en **ny relation** för själva sambandet. Ta med primärnyckelattributen ' +
        'från båda de deltagande relationerna. Tillsammans bildar de en **sammansatt primärnyckel**, och ' +
        'båda är dessutom främmande nycklar. Relationsattribut läggs till som vanliga attribut och ingår ' +
        '**inte** i primärnyckeln.\n\n' +
        '`Employee(EmployeeNo, Name, Address, Salary)`\n`Project(ProjectNo, Name, Budget)`\n' +
        '`Work(EmployeeNo, ProjectNo, Hours)` — PK är {EmployeeNo, ProjectNo}, Hours står utanför\n\n' +
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
        '**9. Ternärt samband.** Skapa en relation med primärnycklarna från alla tre deltagande ' +
        'relationer.\n\n' +
        '`Delivery(supplierName, productName, customerName)`\n\n' +
        'Att istället använda tre binära samband fungerar **inte**: med "Amazon levererar stol", "IKEA ' +
        'levererar stol" och "Erdogan beställer stol" går det inte att svara på vilken leverantör som ' +
        'levererade stolen till Erdogan. Informationen om trepartskombinationen går förlorad.'
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
    'Kandidatnyckel kan vara nyckel; primärnyckel är vald till nyckel',
    'Referensintegritet: FK måste matcha ett befintligt värde eller vara NULL',
    '1:M ⇒ FK på många-sidan',
    'M:N ⇒ ny relation med sammansatt PK; relationsattribut står utanför PK',
    'Svag entitet ⇒ PK = ägarens PK + partiell identifierare',
    'Multivärt attribut ⇒ egen relation med sammansatt PK',
    'Ternärt samband kan inte ersättas av tre binära'
  ],
  tentakoppling:
    'Transformation av konceptuell datamodell är ett av tentans fyra områden. Övningshäftets ' +
    'uppgifter 4–9 är exakt den typ av uppgift som kommer.'
},

/* ====================== KAPITEL 8 ====================== */
{
  id: 'db-k8',
  nr: 8,
  titel: 'Normalformer och normalisering',
  ingress: 'Funktionella beroenden, 1NF–3NF, dekomposition, lossless join och dependency preservation — med en arbetsgång som fungerar varje gång.',
  lastid: 13,
  amnen: ['db-normalisering'],
  avsnitt: [
    {
      rubrik: 'Problemet: anomalier',
      text:
        'Transformationsregeln för M:N säger att man ska skapa tre relationer. Men hur vet vi att det ' +
        'ger en **bra** uppdelning? Varför tre och inte en?\n\n' +
        'Anta att vi implementerar en M:N-modell som **en enda** relation:\n\n' +
        '`EmployeeProject(EmployeeNo, Name, Address, ProjectNo, ProjectName, Budget)`\n\n' +
        'Två saker går fel.\n\n' +
        '**Uppdateringsanomali.** Ska budgeten för projekt P3 höjas måste flera celler ändras, eftersom ' +
        'P3 förekommer på raderna för både E4 och E5. Ändras bara den ena blir datan **inkonsistent** — ' +
        'databasen påstår två olika budgetar för samma projekt.\n\n' +
        '**Borttagningsanomali.** Tas projekt P3 bort försvinner även raderna för E4 och E5, alltså all ' +
        'information om två anställda. *Att radera information om en entitet ska normalt inte medföra att ' +
        'information om en helt annan entitet går förlorad.*\n\n' +
        'Grundorsaken är **redundans** — samma faktum lagras på flera ställen. Normalformerna ger ett ' +
        'formellt sätt att mäta "godhet" hos relationer.'
    },
    {
      rubrik: 'Funktionella beroenden',
      text:
        'Ett **funktionellt beroende** innebär att värdet av ett attribut är associerat med **precis ett** ' +
        'värde av ett annat attribut.\n\n' +
        '`EmployeeNo → Name`\n\n' +
        'Läses "EmployeeNo bestämmer funktionellt Name". Notera att det inte behöver gälla åt andra ' +
        'hållet: flera anställda kan heta Bob, så Name bestämmer inte EmployeeNo.\n\n' +
        '**Klammerparenteserna spelar roll — och sidan de står på:**\n\n' +
        '`{A, B} → {C, D}` betyder `{A,B} → C` och `{A,B} → D`. Alltså: A och B **tillsammans** bestämmer ' +
        'C och D.\n\n' +
        'Det betyder **inte** `A → C`, `A → D`, `B → C`, `B → D`.\n\n' +
        'Vänster sida (determinanten) hänger ihop; höger sida kan delas upp.\n\n' +
        '**Definitioner du behöver ordagrant:**\n\n' +
        '- **Kandidatnyckel:** ett attribut eller en attributmängd som unikt kan identifiera vilken tupel ' +
        'som helst\n' +
        '- **Primärattribut (prime):** ett attribut som är medlem i **någon** kandidatnyckel\n' +
        '- **Icke-primärt attribut (non-prime):** ett attribut som inte är medlem i någon kandidatnyckel\n' +
        '- **Äkta delmängd:** en delmängd av t.ex. {A,B} som inte är lika med {A,B}. Både A och B är ' +
        'äkta delmängder av {A,B}\n' +
        '- **Transitivt beroende:** X → Z indirekt, genom X → Y och Y → Z, där det **inte** gäller att ' +
        'Y → X'
    },
    {
      rubrik: 'De tre normalformerna',
      text:
        'Normalformerna **bygger på varandra**: för att uppfylla 3NF måste relationen redan uppfylla 2NF. ' +
        'Ju högre normalform, desto mindre redundans och desto mindre utrymme för anomalier.\n\n' +
        '**Första normalformen (1NF):**\n\n' +
        '> En relation är i 1NF om värdena i varje attribut är **atomära**.\n\n' +
        'En cell med "P1, P5" bryter mot 1NF. Lösningen är att lägga varje kombination på en egen rad.\n\n' +
        '**Andra normalformen (2NF):**\n\n' +
        '> En relation är i 2NF om och endast om den är i 1NF och **inget icke-primärt attribut är ' +
        'funktionellt beroende av någon äkta delmängd av någon kandidatnyckel**.\n\n' +
        '**Tredje normalformen (3NF):**\n\n' +
        '> En relation är i 3NF om och endast om båda villkoren gäller:\n' +
        '> - Relationen är i 2NF\n' +
        '> - **Varje icke-primärt attribut är icke-transitivt beroende av varje kandidatnyckel**\n\n' +
        'Notera att både 2NF och 3NF uteslutande handlar om **icke-primära** attribut. Det ger en ' +
        'användbar genväg: har relationen **inga icke-primära attribut alls** är den automatiskt i 3NF.'
    },
    {
      rubrik: 'Arbetsgången som fungerar varje gång',
      text:
        'Följ alltid samma fem steg. Det är så facit i övningshäftet är formulerat, och det är så du bör ' +
        'svara på tentan.\n\n' +
        '**Steg 1 — bestäm kandidatnyckel/-nycklar.** Vilket attribut eller vilken attributmängd bestämmer ' +
        '(direkt eller via kedjor) alla övriga attribut? Leta efter **flera** — det är en vanlig miss.\n\n' +
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
        'relation.\n\n' +
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
        'Dekomposition kan lösa ett problem och skapa ett värre. Betrakta:\n\n' +
        '`R(A,B,C,D,E,F)` med `A → {B,C}` och `D → {E,F}`\n\n' +
        'Föreslagen dekomposition: `R1(A,B,C)` och `R2(D,E,F)`. Båda ser ut att vara i 3NF. Vad är felet?\n\n' +
        '**De har inga gemensamma attribut.** De går inte att joina tillbaka — kopplingen mellan delarna ' +
        'är förlorad.\n\n' +
        '> **Lossless join** (non-additive join) är en egenskap hos en dekomposition: en naturlig join av ' +
        'de mindre relationerna ska ge tillbaka den ursprungliga relationen.\n\n' +
        'Det konkreta exemplet: Employee och Project var för sig är i 3NF, men efter uppdelningen vet man ' +
        'inte längre **vem som arbetar i vilket projekt**. Lösningen är kopplingsrelationen ' +
        '`Work(EmployeeNo, ProjectNo)`, som återställer lossless join.\n\n' +
        '(En **naturlig join** matchar automatiskt kolumner med samma namn och datatyp — ingen ON-sats ' +
        'behövs.)\n\n' +
        'Kontrollera alltid efter en dekomposition att delarna har gemensamma attribut att joina på.'
    },
    {
      rubrik: 'Dependency preservation',
      text:
        'Den andra egenskapen en dekomposition kan ha.\n\n' +
        '> Ett funktionellt beroende är **bevarat** om dess två ingående attribut finns i **samma ' +
        'relation**.\n\n' +
        'Splittras X och Y i olika relationer kan beroendet X → Y inte längre upprätthållas lokalt av ' +
        'databasen — ansvaret flyttas till applikationen.\n\n' +
        'Exempel på förlust. Utgå från:\n\n' +
        '`EmployeeProject(EmployeeNo, Name, Address, ProjectNo, ProjectName, Budget)` med\n' +
        '`EmployeeNo → {Name, Address, ProjectNo, ProjectName}`, `ProjectNo → {ProjectName, Budget}` och ' +
        '`ProjectName → {ProjectNo, Budget}`\n\n' +
        'Efter dekomposition till `Employee(EmployeeNo, Name, Address, ProjectNo)` och ' +
        '`Project(ProjectNo, Name, Budget)` är beroendet **EmployeeNo → ProjectName** förlorat: ' +
        'EmployeeNo hamnade i Employee, ProjectName i Project.\n\n' +
        'Lossless join och dependency preservation är **oberoende** egenskaper. En dekomposition kan ha ' +
        'den ena utan den andra.'
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
    'Uppdateringsanomali och borttagningsanomali orsakas av redundans',
    'X → Y: X bestämmer funktionellt Y. {A,B} → C betyder A och B TILLSAMMANS',
    '1NF: atomära värden',
    '2NF: inget icke-primärt attribut beror på en äkta delmängd av en kandidatnyckel',
    '3NF: inga transitiva beroenden för icke-primära attribut',
    'Enkel kandidatnyckel ⇒ 2NF kan inte brytas',
    'Inga icke-primära attribut ⇒ automatiskt 3NF',
    'Lossless join: delarna måste kunna joinas tillbaka till originalet',
    'Dependency preservation: båda attributen i ett beroende måste ligga i samma relation'
  ],
  tentakoppling:
    'Normalformer och normalisering är ett av tentans fyra områden, och det område där arbetsgången ' +
    'betyder mest. Öva övningshäftets uppgifter 10–13 tills du gör dem på under fem minuter styck.'
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
    'Transformation till fysisk datamodell är ett av tentans fyra områden. Övningshäftets uppgifter ' +
    '18–22 går från ER-diagram till komplett DDL — exakt den uppgiftstypen.'
},

/* ====================== KAPITEL 10 ====================== */
{
  id: 'db-k10',
  nr: 10,
  titel: 'Klientutveckling, säkerhet och metadata',
  ingress: 'JDBC, DAO-mönstret, SQL-injektion och hur man hanterar hemligheter — grunden för projektuppgiften.',
  lastid: 11,
  amnen: ['db-klient', 'db-sakerhet', 'db-metadata'],
  avsnitt: [
    {
      rubrik: 'Vad det här kapitlet är till för',
      text:
        'Kapitel 2–9 täckte salstentans fyra områden. Detta kapitel hör till delkursens **andra halva**: ' +
        'databasprojektuppgiften, där ni i grupp utvecklar en Java-applikation som kommunicerar med er ' +
        'egen databasserver, med resurshantering, felhantering, säkerhet och metadata.\n\n' +
        'Läs det när du börjar med projektet — inte när du pluggar till tentan.'
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
    'Detta område ingår INTE i salstentan, som täcker ER-modellering, transformation, normalformer ' +
    'och SQL. Kapitlet hör till databasprojektuppgiften.'
}

);
