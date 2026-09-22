/* =========================================================================
   Kompendium – Processorienterad verksamhetsutveckling, kapitel 8–11
   (BPMN: notationen för att rita och läsa processdiagram)
   -------------------------------------------------------------------------
   Källa: "Introduction to Business Process Modeling" (Björn Svensson),
   grundat på Silver, B. (2017) BPMN Quick and Easy: Using Method and Style —
   kursens egen BPMN-litteratur. BPMN 2.0 underhålls av Object Management
   Group (OMG) och är inte ägt av något enskilt företag.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};
window.SYSB23.kompendium.processer.kapitel.push(

/* ====================== KAPITEL 8 ====================== */
{
  id: 'proc-k8',
  nr: 8,
  titel: 'BPMN-grunder: pooler, roller och aktiviteter',
  ingress: 'Vad BPMN passar för och inte, instansbegreppet, och de tre aktivitetstyperna som skiljer människa från maskin.',
  lastid: 9,
  amnen: ['bpmn-grund'],
  avsnitt: [
    {
      rubrik: 'Vad BPMN är — och vad det inte passar för',
      text:
        '**BPMN (Business Process Model and Notation)** är en standardiserad uppsättning ' +
        'diagramkonventioner för att beskriva verksamhetsprocesser, förvaltad av **Object ' +
        'Management Group (OMG)** — ingen enskild leverantör äger notationen.\n\n' +
        'BPMN passar för processer med en **definierad start och slut**, som utförs på ' +
        '**instanser** (t.ex. en order i taget) och där alla aktiviteter är kända i förväg: ' +
        'en orderprocess, en rekryteringsprocess, en introduktionsprocess för nyanställda.\n\n' +
        'BPMN passar **inte** för kontinuerliga eller ostrukturerade processer: löpande ' +
        'feedbackloopar, ledningsprocesser eller kontinuerligt förbättringsarbete som ' +
        'saknar en tydlig avslutspunkt. Ett typiskt tecken på att en process **inte** bör ' +
        'modelleras i BPMN är att den beskrivs med ord som "löpande", "vid behov" eller ' +
        '"ad hoc" snarare än en tydlig sekvens av steg fram till ett bestämt slut.'
    },
    {
      rubrik: 'Instansbegreppet',
      text:
        'En process och dess aktiviteter utförs **upprepade gånger, på olika instanser av ' +
        'samma sort**. En vanlig modelleringsmiss är att blanda instansnivåer i samma ' +
        'diagram — till exempel att en aktivitet gäller en **batch av ordrar** medan nästa ' +
        'aktivitet i samma flöde gäller en **enskild order**. Ett sådant diagram är ' +
        'felaktigt: varje process ska konsekvent handla om en och samma sorts instans hela ' +
        'vägen genom diagrammet.'
    },
    {
      rubrik: 'Start events och namnkonventioner',
      text:
        'Ett **start event** representerar utlösaren (triggern) som sätter igång en ' +
        'processinstans. Namnkonventionen är **"Motta [meddelandenamn]"** — t.ex. "Motta ' +
        'låneansökan" — där själva meddelandet ofta inte modelleras separat förrän man ' +
        'går in på meddelandeflöden (kapitel 10).\n\n' +
        'För **aktiviteter** gäller den omvända konventionen: **verb–objekt**. "Granska ' +
        'låneansökan" är korrekt, "Låneansökan granskning" är fel. Det är en liten regel, ' +
        'men den testas — och den gör diagrammen mycket lättare att läsa högt för sig ' +
        'själv, vilket är hela poängen.'
    },
    {
      rubrik: 'Tre aktivitetstyper: user, service och script task',
      text:
        'En aktivitet kan ha en **typ** som visar **hur** steget faktiskt utförs:\n\n' +
        '- **User task** (utförs av en person) — en människa gör jobbet, eller klickar en ' +
        'knapp som startar automatiserad efterbehandling. Avgörande: **uppgiften kräver ' +
        'mänsklig medverkan eller ett mänskligt beslut.** Ett exempel: en handläggare som ' +
        'granskar en ansökan och beslutar om godkännande eller avslag — det är en user ' +
        'task, **inte** en service task, trots att det formellt sett är "en uppgift i ' +
        'systemet".\n' +
        '- **Service task** (automatiserad) — utförs av en tjänst, applikation eller ett ' +
        'system utan mänsklig interaktion, t.ex. att systemet automatiskt skickar ett ' +
        'e-postmeddelande när en order skickats. Ett vanligt tentafel är att kalla ett ' +
        'sådant steg en "user task" bara för att en människa **initierade** flödet ' +
        'tidigare i processen — typen avgörs av **det specifika stegets** utförande, inte ' +
        'av vem som startade hela processen.\n' +
        '- **Script task** — automatiserad exekvering av anpassad kod eller skript.\n\n' +
        'Valet mellan de tre typerna avgörs av **aktivitetens natur och graden av ' +
        'automatisering eller anpassning** den kräver — inte av en fast regel om var i ' +
        'processen steget ligger.'
    },
    {
      rubrik: 'Gateways — en första introduktion',
      text:
        'Den romb-formade **gatewayen** tillåter förgrening och sammanslagning av ' +
        'sekvensflöden. Ett viktigt, ofta missförstått faktum: **gatewayen fattar inte ' +
        'själv ett beslut.** Beslutet är redan fattat innan flödet når gatewayen — ' +
        'gatewayen **testar ett datavillkor** och varje utgående sekvensflöde motsvarar ett ' +
        'booleskt villkor (sant/falskt). En **XOR-gateway** (exklusiv, ingen symbol i ' +
        'romben) betyder att exakt ett av de utgående flödena aktiveras. De övriga ' +
        'gatewaytyperna får ett eget kapitel (kapitel 9).'
    }
  ],
  nyckelbegrepp: [
    'BPMN passar processer med tydlig start/slut på kända instanser — inte kontinuerliga eller ostrukturerade processer',
    'En process ska konsekvent handla om EN sorts instans genom hela diagrammet',
    'Namnkonvention: start event "Motta X", aktivitet "Verb objekt"',
    'User task = mänsklig medverkan/beslut, service task = automatiserad tjänst, script task = automatiserad kod',
    'En gateway testar ett datavillkor — den fattar inget beslut själv, beslutet är redan taget'
  ],
  tentakoppling:
    'Klassisk tentafälla: ett scenario beskriver en aktivitet som "kan automatiseras och ' +
    'inte kräver mänsklig interaktion" men kallas ändå "user task" i frågetexten — svaret ' +
    'är då falskt, eftersom typen avgörs av vad aktiviteten FAKTISKT gör, inte av ordvalet ' +
    'i beskrivningen.'
},

/* ====================== KAPITEL 9 ====================== */
{
  id: 'proc-k9',
  nr: 9,
  titel: 'Gateways: förgrening och sammanslagning',
  ingress: 'De fyra gatewaytyperna, och den enda som faktiskt kan lösa ett deadlock.',
  lastid: 8,
  amnen: ['bpmn-gateways'],
  avsnitt: [
    {
      rubrik: 'Exclusive gateway (XOR)',
      text:
        'Ritas som en tom romb. **Exakt ett** av de utgående flödena aktiveras, baserat på ' +
        'vilket villkor som är sant. Det här är standardgatewayen för att **routa flöden ' +
        'baserat på specifika villkor eller beslutsutfall** — den vanligaste gatewayen i de ' +
        'flesta processer.'
    },
    {
      rubrik: 'Parallel gateway (AND)',
      text:
        'Ritas med ett plustecken i romben. Används för att modellera **samtidig ' +
        'exekvering**: en **split** startar flera parallella flöden samtidigt, en **join** ' +
        'väntar in **alla** inkommande flöden innan processen fortsätter. Parallella ' +
        'gateways är **alltid omärkta** — det finns inget villkor att namnge, eftersom alla ' +
        'grenar alltid körs. En AND-join **måste** vänta in samtliga inkommande flöden; gör ' +
        'den inte det uppstår ett deadlock (se nedan).'
    },
    {
      rubrik: 'Inclusive gateway (OR)',
      text:
        'Ritas med en cirkel i romben. Tillåter **ett eller flera** av de utgående flödena ' +
        'att aktiveras beroende på villkor — **men inte nödvändigtvis alla**. Det är den ' +
        'springande skillnaden mot både XOR (exakt ett) och AND (alltid alla): en OR-split ' +
        'kan aktivera två av tre grenar, om två av tre villkor är sanna.\n\n' +
        'Konsekvensen vid **join**: en OR-join kan inte veta i förväg hur många av de ' +
        'inkommande flödena som faktiskt kommer att aktiveras, så den använder OR-gateway-join ' +
        'just när man **har minst två inkommande sekvensflöden som är parallella, och inte ' +
        'kan garantera att alla kommer aktiveras** i en given instans — motsatsen till en ' +
        'AND-join, som alltid kräver alla.'
    },
    {
      rubrik: 'Event-based gateway',
      text:
        'Routar flödet baserat på **vilken händelse som inträffar först**, inte på ett ' +
        'förutbestämt villkor. Bara **en** gate aktiveras — den vars händelse faktiskt ' +
        'inträffar. Det här skiljer den från de andra gatewaytyperna: en event-based ' +
        'gateway **väntar** på att en specifik händelse ska ske och väljs **vid körning ' +
        '(runtime)**, snarare än att routa utifrån ett fördefinierat datavillkor. Typisk ' +
        'användning: "vänta på antingen ett meddelande från kunden ELLER att en timer löper ' +
        'ut — vilket som kommer först."'
    },
    {
      rubrik: 'Att undvika deadlock',
      text:
        'Två typiska deadlock-situationer, och hur de löses:\n\n' +
        '- **Ett undantag i ett parallellt block** — om ett flöde i en parallell sektion ' +
        'ska kunna avbryta hela blocket vid ett fel, används ett **terminate end event** ' +
        'för att signalera att undantaget härrör från just det parallella blocket.\n' +
        '- **En AND-join som väntar på ett flöde som aldrig kommer** — om ett tidigare ' +
        'XOR-villkor gör att en av grenarna som leder in till en efterföljande AND-join ' +
        'aldrig aktiveras, kommer joinen vänta för evigt. Lösningen är att byta den sista ' +
        'joinen mot en **OR-gateway-join**, eftersom den (till skillnad från AND-joinen) ' +
        'inte kräver att samtliga inkommande flöden aktiveras.\n\n' +
        'Det här är den mest praktiska, konkreta tentafällan i hela gateway-avsnittet: ' +
        'känner du igen mönstret "XOR före, AND efter" är risken för deadlock nästan alltid ' +
        'närvarande.'
    }
  ],
  nyckelbegrepp: [
    'Exclusive (XOR) — exakt ett flöde aktiveras, baserat på villkor',
    'Parallel (AND) — alla flöden aktiveras samtidigt; join väntar in ALLA; alltid omärkt',
    'Inclusive (OR) — ett eller flera flöden aktiveras, inte nödvändigtvis alla',
    'Event-based gateway — routar mot den händelse som inträffar först, vid körning',
    'Deadlock uppstår ofta när en XOR-gren leder till en AND-join som väntar på ett flöde som aldrig kommer — lös med OR-join'
  ],
  tentakoppling:
    'Flera BPMN-frågor på tentan ger dig ett scenario ("meddelande A mottas, meddelande B ' +
    'mottas 2 dagar efter att aktivitet A avslutats") och ber dig räkna ut exakt vilka ' +
    'aktiviteter som hinner exekveras. Rita om scenariot för hand innan du svarar — att ' +
    'göra det i huvudet är där de flesta felsvaren kommer ifrån.'
},

/* ====================== KAPITEL 10 ====================== */
{
  id: 'proc-k10',
  nr: 10,
  titel: 'Events: starta, vänta och reagera',
  ingress: 'Skillnaden mellan att kasta och fånga en signal, och de boundary events som avgör om en pågående aktivitet avbryts eller fortsätter.',
  lastid: 9,
  amnen: ['bpmn-events'],
  avsnitt: [
    {
      rubrik: 'Intermediate events: kastande och fångande',
      text:
        '**Intermediate events** inträffar efter start och före slut, och beskriver hur ' +
        'processen reagerar på en signal om att något hänt. Det finns två sorters signaler:\n\n' +
        '- **Kastande (throwing)** — signalen **genereras av processen själv**, och kastas ' +
        'omedelbart och automatiskt när det inkommande sekvensflödet når eventet. Processen ' +
        'fortsätter direkt efter att signalen kastats.\n' +
        '- **Fångande (catching)** — signalen **kommer utifrån**. Processen **väntar** på ' +
        'triggern tills den anländer, och fortsätter först då.\n\n' +
        'En **catching timer event** betyder "vänta [en viss tid]" eller "vänta till [ett ' +
        'visst datum/klockslag]" — de två varianterna av samma eventtyp.'
    },
    {
      rubrik: 'Boundary events: interrupting och non-interrupting',
      text:
        '**Boundary events** är fästa på en aktivitet (eller subprocess), och har **inga ' +
        'inkommande sekvensflöden** — de triggas av något som händer medan aktiviteten ' +
        'pågår, inte av ett flöde som leder till dem. De kan vara:\n\n' +
        '- **Interrupting** (heldragen ram) — **avbryter** aktiviteten så fort signalen tas ' +
        'emot, och processen fortsätter längs undantagsflödet i stället.\n' +
        '- **Non-interrupting** (streckad ram) — **avbryter inte** aktiviteten. I stället ' +
        'aktiveras ett parallellt undantagsflöde vid triggern, medan den ursprungliga ' +
        'aktiviteten fortsätter opåverkad tills den är klar och det normala flödet återtar.\n\n' +
        '**Meddelande- och timerhändelser kan vara båda**, men **error-boundaryhändelser ' +
        'är alltid interrupting** — ett fel avbryter alltid aktiviteten, per definition. Ett ' +
        'exempel på non-interrupting: en timer-boundaryhändelse som skickar en ' +
        'förseningsavisering till kunden utan att avbryta den pågående granskningen. Ett ' +
        'exempel på interrupting: en meddelande-boundaryhändelse som låter kunden avbryta ' +
        'sin ansökan mitt i granskningen.'
    },
    {
      rubrik: 'Event gateway och event subprocess',
      text:
        'Håll isär två liknande men olika begrepp:\n\n' +
        '- **Event-based gateway** (kapitel 9) — en punkt **i huvudflödet** där processen ' +
        'väntar på vilken av flera möjliga händelser som inträffar först.\n' +
        '- **Event subprocess** — en **separat delprocess** som ligger vid sidan av ' +
        'huvudflödet och triggas av en händelse, inte av ett inkommande sekvensflöde. Den ' +
        'har därför **inga inkommande sekvensflöden alls**, och dess startevent måste vara ' +
        'ett **triggat** starthändelse (inte det tomma "none"-starteventet en vanlig ' +
        'subprocess har).\n\n' +
        'Skillnaden mot en **vanlig subprocess**: en vanlig subprocess triggas av ett ' +
        'inkommande sekvensflöde och måste ha ett tomt ("none") startevent, eftersom det är ' +
        'flödet i föräldradiagrammet som startar den. En event-subprocess kan, precis som ' +
        'ett boundary event, vara **interrupting eller non-interrupting** — en ' +
        'meddelandebaserad event-subprocess som avbryter huvudprocessen vid en avbokning ' +
        'kontra en som svarar på en statusförfrågan utan att störa den pågående processen.'
    },
    {
      rubrik: 'Process- och subprocessstarter',
      text:
        'En process kan starta på tre sätt: **extern begäran** (ett meddelande utifrån), ' +
        '**intern begäran** (ett internt villkor eller flöde) eller **återkommande** ' +
        '(schemalagt, t.ex. en timer som upprepas). En **subprocess** kan vara antingen ' +
        '**ihopfälld** (collapsed, visas som en enda låda med ett plustecken i det ' +
        'överordnade diagrammet) eller **expanderad** (visas i sin helhet), beroende på om ' +
        'diagrammet behöver en översiktlig eller detaljerad representation. Genom att ' +
        'bryta ut aktiviteter i subprocesser håller man varje enskilt diagram vid ungefär ' +
        'tio aktiviteter — fler än så blir svårläst.'
    }
  ],
  nyckelbegrepp: [
    'Kastande event = processen genererar signalen själv; fångande event = processen väntar på en extern trigger',
    'Boundary event: interrupting avbryter aktiviteten, non-interrupting kör vidare parallellt',
    'Error-boundaryhändelser är alltid interrupting',
    'Event subprocess har inga inkommande sekvensflöden och ett triggat startevent — till skillnad från en vanlig subprocess',
    'En subprocess kan vara ihopfälld eller expanderad beroende på önskad detaljnivå'
  ],
  tentakoppling:
    'Både HT24- och HT25-tentorna har haft flera sant/falskt-frågor just om interrupting ' +
    'kontra non-interrupting och om vad som skiljer en vanlig subprocess från en ' +
    'event-subprocess — det är en av de mest lönsamma sakerna att ha helt klart för sig.'
},

/* ====================== KAPITEL 11 ====================== */
{
  id: 'proc-k11',
  nr: 11,
  titel: 'Subprocesser, återanvändning och dataflöden',
  ingress: 'Hur processlogik återanvänds mellan diagram, hur pooler och lanes visar vem som gör vad, och hur BPMN kopplas till beslutsregler i DMN.',
  lastid: 9,
  amnen: ['bpmn-avancerat', 'bpmn-dmn'],
  avsnitt: [
    {
      rubrik: 'Pooler och lanes: vem gör vad',
      text:
        'Ett diagram visar **vilka aktiviteter** som utförs och **i vilken ordning** — men ' +
        'inte automatiskt **vem** som utför dem. Det löser **pooler** och **lanes**:\n\n' +
        '- En **pool** är en valfri container för en process, och används för att skilja ' +
        'processer som kommunicerar via meddelandeflöden i samma toppnivådiagram. Poolens ' +
        'etikett ska alltid vara **processens namn**, t.ex. "Ansökningsgranskningsprocess".\n' +
        '- **Lanes** är valfria och visar **vem** (system eller person) som utför en viss ' +
        'aktivitet. En lane ska namnges med en **roll eller organisatorisk enhet**, t.ex. ' +
        '"Kreditavdelningen" eller "Låneansvarig" — inte en enskild persons namn.\n\n' +
        'En bra tumregel för modellering: lägg till pooler och lanes **sist**, efter att ' +
        'flödet är klart. En gateways placering i en viss lane visar **inte** var beslutet ' +
        'fattas — den kan lika gärna ligga kvar i föregående aktivitets lane av ren ' +
        'bekvämlighet.'
    },
    {
      rubrik: 'Black-box-pooler',
      text:
        'En **black-box-pool** innehåller inga events, aktiviteter eller gateways — den ' +
        'representerar en **extern part**, som en kund eller sökande, som kommunicerar med ' +
        'huvudprocessen via meddelandeflöden. Använd en black-box-pool när:\n\n' +
        '- **beställaren inte är en del av** den organisation som äger processen, eller\n' +
        '- beställaren **är** en del av organisationen men **inte har några reguljära, ' +
        'definierade uppgifter** att utföra i just den här processen.\n\n' +
        'Den vanligaste modelleringsfällan här (nämnd explicit i föreläsningsmaterialet) är ' +
        'en teknisk BPMN-specbugg: att koppla en **data association** till en black-box-pool ' +
        'ger normalt ett valideringsfel i modelleringsverktyget. Lösningen är att ignorera ' +
        'felet, eller använda en vanlig **association**-koppling med riktningsattributet ' +
        'satt till "One" i stället.'
    },
    {
      rubrik: 'Sekvensflöde och meddelandeflöde — inte samma sak',
      text:
        'Två av de vanligaste sammanblandningarna i hela kursen:\n\n' +
        '- **Sequence flow** (heldragen pil) — visar **ordningen** aktiviteter, events och ' +
        'gateways utförs i, **inom samma pool**. Den kan bara koppla ihop **flow nodes** ' +
        '(aktiviteter, gateways, events) — aldrig en pool till en annan.\n' +
        '- **Message flow** (streckad pil) — visar **kommunikation mellan olika deltagare ' +
        '(pooler)** i ett samarbetsdiagram. Ett sekvensflöde kan **aldrig** gå mellan två ' +
        'pooler, och ett meddelandeflöde kan **aldrig** ersätta ett sekvensflöde inom en ' +
        'och samma pool — de är strikt åtskilda.\n\n' +
        'En tredje "connecting object"-typ är **association**, som kopplar ihop artefakter, ' +
        'dataobjekt eller textkommentarer med flow-objekt — den bär ingen egen betydelse om ' +
        'ordning eller kommunikation, bara en visuell koppling.'
    },
    {
      rubrik: 'Call activities — återanvändning av processlogik',
      text:
        'En **call activity** är en subprocess som är **definierad oberoende**, som en ' +
        'egen, fristående processmodell — och som kan **anropas från ett eller flera** ' +
        'andra processer. Det är BPMN:s motsvarighet till att bryta ut en funktion i ' +
        'programmering: har du samma delprocess (t.ex. "Verifiera finansiella uppgifter") ' +
        'som förekommer identiskt i flera huvudprocesser, modelleras den en gång och ' +
        '**återanvänds** via call activities i stället för att ritas om varje gång.'
    },
    {
      rubrik: 'Data stores och data associations',
      text:
        'En **data store** representerar information lagrad i en applikation, databas ' +
        'eller fil som processen (och externa parter) kan läsa från eller skriva till — ' +
        'ett alternativ till meddelandeflöden för att förmedla information till en process. ' +
        '**Data associations** visar riktningen: en aktivitet kan **läsa från** en data ' +
        'store, eller **skriva till** den (infoga, uppdatera, radera information).'
    },
    {
      rubrik: 'Business rule task och DMN',
      text:
        'När en processaktivitet innebär att tillämpa en **beslutsregel** snarare än att ' +
        'göra ett fritt bedömningsval, används en **business rule task** — det är BPMN:s ' +
        'officiella namn för det som ofta kallas "decision task" i vardagligt tal. En ' +
        'business rule task **länkar till en DMN-modell** (Decision Model and Notation), ' +
        'ofta visualiserad som ett **DRD (Decision Requirements Diagram)** som visar vilka ' +
        'data och regler beslutet bygger på.\n\n' +
        'Kopplingen mellan BPMN och DMN lyfts fram i kursen som ett svar på ett regulatoriskt ' +
        'krav: **förklarbarhet (explainability)** i automatiserat beslutsfattande. Genom att ' +
        'göra både processflödet och beslutslogiken **visuella och begripliga**, blir det ' +
        'möjligt att förklara för den som berörs av ett automatiserat beslut **varför** ' +
        'beslutet blev som det blev — inte genom att beslutet automatiskt loggas eller ' +
        'översätts till naturligt språk, utan genom att modellerna själva är läsbara.'
    }
  ],
  nyckelbegrepp: [
    'Pool = container för en process, namnges efter processen; lane = utförarens roll, läggs till sist',
    'Black-box-pool: inga events/aktiviteter/gateways, representerar en extern part utan reguljära uppgifter i processen',
    'Sequence flow = ordning inom en pool; message flow = kommunikation mellan pooler — kan aldrig ersätta varandra',
    'Call activity = fristående, återanvändbar subprocessdefinition som kan anropas från flera processer',
    'Data store = läs/skriv-lagring utanför meddelandeflödet',
    'Business rule task = BPMN:s namn för "decision task", länkar till en DMN-modell (DRD) — stödjer förklarbarhet'
  ],
  tentakoppling:
    'Gruppuppgiften examinerar just BPMN och DMN/DRD praktiskt genom att ni visualiserar en ' +
    'egen verksamhetsprocess i Trisotech — övningarna i SQL-verkstadens systerdel, ' +
    'övningshäftet med textbeskrivna processer, är bästa sättet att träna innan dess.'
}

);
