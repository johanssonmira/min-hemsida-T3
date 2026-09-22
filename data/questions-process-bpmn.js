/* =========================================================================
   Frågor – Processorienterad verksamhetsutveckling: BPMN-notationen

   Grundade i "Introduction to Business Process Modeling" (Björn Svensson,
   baserad på Silver 2017, BPMN Quick and Easy) samt de BPMN-begrepp som
   testas på kursens fyra riktiga tentor. Diagram-läsande scenariofrågor
   (t.ex. "vilka aktiviteter hinner köras givet dessa villkor") kräver en
   bild av det aktuella diagrammet och kan därför inte återges här utan
   den riktiga tentans figur — träna på den sortens resonemang i
   BPMN-verkstaden/övningshäftet i stället.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = (window.SYSB23.fragor || []).concat([

  /* -------------------- BPMN-grunder -------------------- */
  {
    id: 'bpmn-grund-01', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vilken typ av process passar BPMN bäst för att modellera?',
    alternativ: [
      'En process med definierad start och slut, som utförs på kända instanser',
      'Ett kontinuerligt förbättringsarbete utan tydlig avslutspunkt',
      'En löpande feedbackloop mellan avdelningar',
      'En ostrukturerad ledningsprocess som sker "vid behov"'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Order-, rekryterings- och introduktionsprocesser är typexempel — tydlig start, tydligt slut, kända aktiviteter.',
      'Fel. Kontinuerliga processer utan avslutspunkt passar dåligt i BPMN.',
      'Fel. Löpande feedbackloopar saknar den tydliga instans-strukturen BPMN kräver.',
      'Fel. "Vid behov"-processer saknar den förutbestämda aktivitetsstrukturen BPMN förutsätter.'
    ],
    forklaring: 'Ett tydligt tecken på att en process INTE bör modelleras i BPMN är att den beskrivs med ord som "löpande" eller "ad hoc".',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-grund-02', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 2,
    fraga: 'Ett processdiagram har en aktivitet som gäller en hel batch av ordrar, följd av en aktivitet som gäller en enskild order i taget. Vad är problemet?',
    alternativ: [
      'Inget problem — det är helt korrekt BPMN',
      'Diagrammet blandar instansnivåer: en process ska konsekvent handla om en och samma sorts instans',
      'Problemet är att aktiviteterna saknar typ (user/service/script)',
      'Problemet är att det saknas en gateway mellan aktiviteterna'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det här är ett klassiskt modelleringsfel.',
      'Rätt. En process ska genomgående handla om en sorts instans — batch och enskild order är olika instansnivåer och ska inte blandas i samma flöde.',
      'Fel. Aktivitetstyp är inte huvudproblemet här.',
      'Fel. Gateways löser inte ett instansnivåproblem.'
    ],
    forklaring: 'Instansbegreppet är en av de saker som lätt missas eftersom diagrammet fortfarande "ser rätt ut" rent visuellt.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-grund-03', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vilken namnkonvention gäller för aktiviteter i BPMN?',
    alternativ: ['Objekt–verb, t.ex. "Låneansökan granskning"', 'Verb–objekt, t.ex. "Granska låneansökan"', 'Bara substantiv, t.ex. "Granskning"', 'Fritt, ingen konvention finns'],
    ratt: 1,
    forklaringar: [
      'Fel. Det är fel ordning enligt konventionen.',
      'Rätt. Verb–objekt: "Granska låneansökan" är korrekt.',
      'Fel. Ett rent substantiv säger inget om vad som faktiskt görs.',
      'Fel. Det finns en etablerad konvention.'
    ],
    forklaring: 'Start events har en egen konvention: "Motta [meddelandenamn]".',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-grund-04', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 2,
    fraga: 'En handläggare granskar en ansökan manuellt och beslutar om godkännande eller avslag. Vilken aktivitetstyp är detta i BPMN?',
    alternativ: ['Service task', 'Script task', 'User task', 'Ingen av dem — det behöver ingen typ'],
    ratt: 2,
    forklaringar: [
      'Fel. Service task är automatiserat, utan mänsklig interaktion.',
      'Fel. Script task kör automatiserad kod.',
      'Rätt. Mänsklig medverkan och ett mänskligt beslut — definitionen av en user task.',
      'Fel. Aktiviteter bör typas när det är relevant för att visa hur steget utförs.'
    ],
    forklaring: 'Typen avgörs av vad just det här steget gör, oavsett vad som händer tidigare eller senare i processen.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-grund-05', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Om en person klickar en knapp som sätter igång ett helautomatiskt förlopp i systemet, är hela steget en "user task", eftersom en människa initierade det.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 0,
    forklaringar: [
      'Rätt (med ett viktigt undantag). Enligt materialet räknas just "en person klickar en knapp och systemet gör resten" fortfarande som en user task — det mänskliga klicket är det som definierar steget.',
      'Fel enligt det specifika exemplet i kursmaterialet.'
    ],
    forklaring: 'Jämför noga med nästa fråga: skicka ett AUTOMATISKT mejl efter att en tidigare, separat aktivitet redan avslutats är däremot en service task, eftersom just DET steget saknar mänsklig medverkan.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-grund-06', delkurs: 'processer', amne: 'bpmn-grund',
    typ: 'flerval', svarighet: 3,
    fraga: 'I en orderprocess skickas ett automatiskt e-postmeddelande till kunden när ordern har skickats, helt utan mänsklig inblandning i just det steget. Är det korrekt att modellera detta som en "user task", eftersom en människa lagt ordern tidigare i processen?',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Steget i sig kräver ingen mänsklig interaktion, och ska modelleras som en service task — det spelar ingen roll att en människa startade processen tidigare.'
    ],
    forklaring: 'En vanlig tentafälla: att blanda ihop "vem startade processen" med "vad gör just det här specifika steget".',
    kalla: 'Tentamen HT24'
  },

  /* -------------------- Gateways -------------------- */
  {
    id: 'bpmn-gw-01', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vad gör en gateway i BPMN?',
    alternativ: [
      'Den fattar själv ett beslut baserat på tillgänglig data',
      'Den testar ett datavillkor — beslutet är redan fattat innan flödet når gatewayen',
      'Den kör alla utgående flöden parallellt, oavsett typ',
      'Den representerar en mänsklig handläggare'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Gatewayen fattar inget beslut — den testar bara vilket villkor som är sant.',
      'Rätt. Varje utgående flöde motsvarar ett booleskt villkor, och beslutet är redan fattat före gatewayen.',
      'Fel. Bara en parallel gateway (AND) beter sig så — inte gateways generellt.',
      'Fel. Gateways representerar inget om vem som utför arbetet, bara flödeslogik.'
    ],
    forklaring: 'Den här missuppfattningen ("gatewayen bestämmer") är en av de vanligaste bland nybörjare.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-gw-02', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vilken gateway-typ tillåter exakt ETT av flera utgående flöden att aktiveras?',
    alternativ: ['Parallel gateway (AND)', 'Inclusive gateway (OR)', 'Exclusive gateway (XOR)', 'Event-based gateway'],
    ratt: 2,
    forklaringar: [
      'Fel. AND aktiverar alla flöden.',
      'Fel. OR kan aktivera ett eller flera, inte nödvändigtvis exakt ett.',
      'Rätt. Exclusive gateway (XOR) — exakt ett flöde, baserat på villkor.',
      'Fel. Event-based väljer utifrån vilken händelse som inträffar först, inte ett datavillkor.'
    ],
    forklaring: 'XOR ritas som en tom romb, utan symbol.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-gw-03', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknar en parallel gateway (AND) i BPMN?',
    alternativ: [
      'Den är alltid märkt med det villkor som gäller för varje utgående flöde',
      'En AND-join fortsätter så snart NÅGOT av de inkommande flödena anlänt',
      'En AND-split aktiverar alla utgående flöden samtidigt, och en AND-join väntar in ALLA inkommande flöden',
      'Den kan bara användas i kombination med en XOR-gateway'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Parallella gateways är alltid OMÄRKTA — det finns inget villkor att namnge.',
      'Fel. Det beskriver snarare en OR-join. En AND-join väntar in ALLA flöden.',
      'Rätt. Split: alla flöden samtidigt. Join: väntar in samtliga.',
      'Fel. Ingen sådan begränsning finns.'
    ],
    forklaring: 'Väntar en AND-join på ett flöde som (på grund av ett tidigare XOR-villkor) aldrig aktiveras uppstår deadlock — se avsnittet om att undvika deadlock.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-gw-04', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad skiljer en inclusive gateway (OR) från en exclusive gateway (XOR)?',
    alternativ: [
      'OR tillåter ett eller flera utgående flöden samtidigt, XOR tillåter exakt ett',
      'OR och XOR fungerar identiskt, bara symbolen skiljer',
      'XOR kan bara användas vid split, OR bara vid join',
      'OR fattar ett eget beslut, XOR testar bara ett villkor'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Det är den avgörande skillnaden — OR kan aktivera flera grenar samtidigt, XOR exakt en.',
      'Fel. De skiljer sig funktionellt, inte bara visuellt.',
      'Fel. Båda kan användas för både split och join.',
      'Fel. Ingen gateway fattar ett eget beslut — se grundfrågan om gateways ovan.'
    ],
    forklaring: 'Ritas OR med en cirkel i romben, XOR med en tom romb.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-gw-05', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 2,
    fraga: 'När bör du använda en OR-gateway-join i stället för en AND-gateway-join?',
    alternativ: [
      'När du har minst två inkommande parallella flöden och INTE kan garantera att alla aktiveras i en given instans',
      'När processen bara har ett enda inkommande flöde',
      'När alla inkommande flöden garanterat alltid aktiveras',
      'Aldrig — OR-join stöds inte i BPMN'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Just den situationen — flera parallella flöden men ingen garanti att alla aktiveras — kräver en OR-join, annars deadlockar en AND-join.',
      'Fel. Med bara ett inkommande flöde behövs ingen join alls.',
      'Fel. Då fungerar en AND-join precis lika bra och är enklare att läsa.',
      'Fel. OR-gateway-join är en etablerad, korrekt BPMN-konstruktion.'
    ],
    forklaring: 'Detta är den vanligaste lösningen på deadlock-problemet som uppstår när en XOR-gren leder till en efterföljande AND-join.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-gw-06', delkurs: 'processer', amne: 'bpmn-gateways',
    typ: 'flerval', svarighet: 2,
    fraga: 'Hur fungerar en event-based gateway, särskilt i dynamiska miljöer?',
    alternativ: [
      'Den routar flödet enbart baserat på fördefinierade datavillkor',
      'Den väntar på att en specifik händelse ska inträffa, och den väljs vid körning (runtime)',
      'Den routar alla inkommande uppgifter parallellt för ökad effektivitet',
      'Den routar tasks baserat på ett DMN-beslutsträd i stället för enskilda villkor'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det beskriver snarare en exclusive gateway.',
      'Rätt. Bara en gate aktiveras — den vars händelse faktiskt inträffar först, avgjort vid körning.',
      'Fel. Det beskriver en parallel gateway.',
      'Fel. Event-based gateway kopplas inte specifikt till DMN.'
    ],
    forklaring: 'Typiskt användningsfall: vänta på antingen ett meddelande från kunden ELLER att en timer löper ut, vilket som kommer först.',
    kalla: 'Tentamen HT24'
  },

  /* -------------------- Events -------------------- */
  {
    id: 'bpmn-ev-01', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är skillnaden mellan ett kastande (throwing) och ett fångande (catching) intermediate event?',
    alternativ: [
      'Kastande genereras av processen själv; fångande väntar på en signal utifrån',
      'Kastande väntar på en signal utifrån; fångande genereras av processen själv',
      'Det finns ingen skillnad, bara olika namn på samma sak',
      'Kastande kan bara förekomma vid slutet av en process'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Kastande: processen genererar signalen och fortsätter direkt. Fångande: processen väntar tills triggern anländer utifrån.',
      'Fel. Riktningen är omvänd.',
      'Fel. De är principiellt olika.',
      'Fel. Kastande events kan förekomma mitt i en process, inte bara vid slutet.'
    ],
    forklaring: 'En catching timer event betyder "vänta [en viss tid]" eller "vänta till [datum/klockslag]".',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-ev-02', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 2,
    fraga: 'Ett boundary event är fäst på en aktivitet. Vad är sant om interrupting kontra non-interrupting boundary events?',
    alternativ: [
      'Interrupting avbryter aktiviteten vid signalen; non-interrupting kör vidare parallellt utan att avbryta',
      'Interrupting och non-interrupting fungerar identiskt, bara ramen ritas olika',
      'Non-interrupting avbryter alltid aktiviteten omedelbart',
      'Boundary events har alltid ett inkommande sekvensflöde precis som en vanlig aktivitet'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Interrupting stoppar aktiviteten; non-interrupting aktiverar ett parallellt undantagsflöde medan aktiviteten fortsätter.',
      'Fel. Deras beteende skiljer sig funktionellt, inte bara visuellt.',
      'Fel. Det är tvärtom — non-interrupting avbryter INTE.',
      'Fel. Boundary events har uttryckligen INGA egna inkommande sekvensflöden — de triggas av en händelse under aktivitetens gång.'
    ],
    forklaring: 'Meddelande- och timerhändelser kan vara antingen interrupting eller non-interrupting. Error-boundaryhändelser är alltid interrupting.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-ev-03', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Error-boundaryhändelser i BPMN kan vara antingen interrupting eller non-interrupting, precis som meddelande- och timerhändelser.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Error-boundaryhändelser är ALLTID interrupting — ett fel avbryter alltid aktiviteten, per definition. Det är bara meddelande- och timerhändelser som kan vara non-interrupting.'
    ],
    forklaring: 'En vanlig, lätt att missa detalj — de flesta boundary events kan välja, error kan det inte.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-ev-04', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 3,
    fraga: 'Vad krävs för att ett diagram ska räknas som en "event subprocess" snarare än en vanlig subprocess?',
    alternativ: [
      'Den måste ha ett tomt ("none") startevent, precis som en vanlig subprocess',
      'Den triggas av en händelse, har inga inkommande sekvensflöden, och måste ha ett triggat startevent',
      'Den måste alltid vara ihopfälld (collapsed), aldrig expanderad',
      'Den kan bara innehålla en enda aktivitet'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är precis tvärtom — en vanlig subprocess har ett tomt startevent, en event subprocess har ett TRIGGAT startevent.',
      'Rätt. Ingen inkommande sekvensflöde, triggad av en händelse, med ett triggat startevent.',
      'Fel. Ingen sådan begränsning nämns.',
      'Fel. En event subprocess kan innehålla flera aktiviteter, precis som vilken subprocess som helst.'
    ],
    forklaring: 'En vanlig subprocess triggas av det inkommande sekvensflödet från föräldradiagrammet — därför räcker ett tomt startevent. En event subprocess har inget sådant flöde att luta sig mot.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-ev-05', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: En BPMN-loopmarkering på en aktivitet eller subprocess betyder att aktiviteten upprepas tills ett angivet villkor är uppfyllt.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 0,
    forklaringar: [
      'Rätt. Det är exakt vad loop-markören signalerar.',
      'Fel.'
    ],
    forklaring: 'En enkel men lätt förbisedd markör, testad ordagrant på HT24-tentan.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'bpmn-ev-06', delkurs: 'processer', amne: 'bpmn-events',
    typ: 'flerval', svarighet: 2,
    fraga: 'På vilka tre sätt kan en process starta i BPMN?',
    alternativ: [
      'Extern begäran, intern begäran, återkommande (schemalagt)',
      'Manuell begäran, automatisk begäran, budgeterad begäran',
      'Endast genom ett meddelande utifrån',
      'Genom att en gateway aktiveras'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. De tre sätten: extern begäran, intern begäran, och återkommande (t.ex. en upprepad timer).',
      'Fel. Ingen sådan trippel nämns i materialet.',
      'Fel. Extern begäran är bara ett av tre sätt.',
      'Fel. En gateway startar inte en process — den routar redan pågående flöde.'
    ],
    forklaring: 'Startsättet påverkar vilken typ av startevent (meddelande, villkor, timer) som används i diagrammet.',
    kalla: 'BPMN Walkthrough'
  },

  /* -------------------- Subprocesser och dataflöden -------------------- */
  {
    id: 'bpmn-avc-01', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vad är syftet med en pool i BPMN?',
    alternativ: [
      'Att visa exakt var i koden ett steg körs',
      'Att fungera som en container för en process, och skilja processer som kommunicerar via meddelandeflöden',
      'Att ange vilken svårighetsgrad diagrammet har',
      'Att visa vilken tid varje aktivitet tar'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Pooler handlar inte om kod.',
      'Rätt. Poolen avgränsar en process och används för att visa kommunikation mellan olika processer/deltagare via meddelandeflöden.',
      'Fel. Ingen sådan funktion.',
      'Fel. Tid visas inte via pooler.'
    ],
    forklaring: 'Poolens etikett ska alltid vara processens namn, t.ex. "Ansökningsgranskningsprocess" — inte en avdelnings eller persons namn (det är lanes uppgift).',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-avc-02', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad ska en lane namnges med i BPMN?',
    alternativ: ['En specifik persons namn', 'En roll eller organisatorisk enhet, t.ex. "Kreditavdelningen"', 'Aktivitetens svårighetsgrad', 'Antal instanser som passerar lanen per dag'],
    ratt: 1,
    forklaringar: [
      'Fel. En enskild persons namn är för snävt och byts ut för lätt.',
      'Rätt. En roll eller organisatorisk enhet, t.ex. "Låneansvarig" eller "Kreditavdelningen".',
      'Fel. Ingen sådan koppling.',
      'Fel. Lanes visar utförare, inte volymstatistik.'
    ],
    forklaring: 'Bra tumregel vid modellering: lägg till pooler och lanes sist, efter att själva flödet är klart.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-avc-03', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 2,
    fraga: 'När bör en black-box-pool användas?',
    alternativ: [
      'När deltagaren har många detaljerade, definierade aktiviteter i processen',
      'När deltagaren inte tillhör den egna organisationen, eller tillhör den men saknar reguljära definierade uppgifter i just den processen',
      'När processen inte har några gateways',
      'När man vill dölja hela huvudprocessen'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är motsatsen — black-box-pooler saknar just detaljerade aktiviteter.',
      'Rätt. Extern part, eller intern part utan egna definierade uppgifter i den specifika processen.',
      'Fel. Ingen koppling till gateways.',
      'Fel. Black-box-pooler döljer den EXTERNA partens interna arbete, inte huvudprocessen.'
    ],
    forklaring: 'Black-box-pooler har inga events, aktiviteter eller gateways — bara ett namn och meddelandeflöden in/ut.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-avc-04', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är den huvudsakliga skillnaden mellan ett sequence flow och ett message flow?',
    alternativ: [
      'Sequence flow visar ordning inom en pool; message flow visar kommunikation mellan olika pooler',
      'De är utbytbara och betyder samma sak',
      'Sequence flow används bara för meddelanden, message flow bara för aktiviteter',
      'Message flow kan koppla ihop två aktiviteter inom samma pool i stället för sequence flow'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Sequence flow = ordning inom en pool. Message flow = kommunikation mellan pooler i ett samarbetsdiagram.',
      'Fel. De har strikt olika betydelser och kan aldrig ersätta varandra.',
      'Fel. Beskrivningen är felvänd.',
      'Fel. Ett message flow kan aldrig ersätta ett sequence flow inom samma pool — de är åtskilda per definition.'
    ],
    forklaring: 'Ett sekvensflöde kan bara koppla ihop flow nodes (aktiviteter, gateways, events) — aldrig gå mellan två pooler.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-avc-05', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är en call activity till för?',
    alternativ: [
      'Att avsluta en process i förtid',
      'Att representera en fristående, oberoende definierad subprocess som kan återanvändas från flera processer',
      'Att markera en aktivitet som obligatorisk',
      'Att koppla en aktivitet till en extern kund'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är inte en avslutningsmekanism.',
      'Rätt. En självständig processmodell som kan anropas ("callas") från ett eller flera andra diagram — BPMN:s motsvarighet till en återanvändbar funktion.',
      'Fel. Ingen sådan markering.',
      'Fel. Koppling till externa parter sker via pooler/black-box-pooler, inte call activities.'
    ],
    forklaring: 'Har du samma delprocess (t.ex. "Verifiera finansiella uppgifter") i flera huvudprocesser, modelleras den en gång och återanvänds via call activities.',
    kalla: 'BPMN Walkthrough'
  },
  {
    id: 'bpmn-avc-06', delkurs: 'processer', amne: 'bpmn-avancerat',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad representerar en data store i ett BPMN-diagram?',
    alternativ: [
      'En person som utför en aktivitet',
      'Information lagrad i en applikation, databas eller fil som processen kan läsa från eller skriva till',
      'Ett alternativt namn för en pool',
      'En typ av gateway'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är lanes uppgift att visa vem som utför en aktivitet.',
      'Rätt. Data store representerar lagrad information, med data-associationer som visar läsning eller skrivning.',
      'Fel. Data store och pool är olika begrepp.',
      'Fel. Data store är inte en gateway-typ.'
    ],
    forklaring: 'Data store kan användas som ett alternativ till meddelandeflöde för att förmedla information till en process.',
    kalla: 'BPMN Walkthrough'
  },

  /* -------------------- Business rule task och DMN -------------------- */
  {
    id: 'bpmn-dmn-01', delkurs: 'processer', amne: 'bpmn-dmn',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är BPMN:s officiella namn för det som ofta kallas "decision task" i dagligt tal?',
    alternativ: ['Service task', 'Business rule task', 'Script task', 'Call activity'],
    ratt: 1,
    forklaringar: [
      'Fel. Service task är en bredare kategori för automatiserade tjänster.',
      'Rätt. Business rule task är det officiella BPMN-namnet, och den länkar till en DMN-modell.',
      'Fel. Script task kör kod, inte specifikt beslutsregler.',
      'Fel. Call activity handlar om återanvändning av processlogik, inte beslutsregler.'
    ],
    forklaring: 'En vanlig tentafråga i sant/falskt-form: "decision task kallas officiellt business rule task i BPMN, och länkas till DMN" — sant.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'bpmn-dmn-02', delkurs: 'processer', amne: 'bpmn-dmn',
    typ: 'flerval', svarighet: 2,
    fraga: 'Hur stödjer kopplingen mellan BPMN och DMN regulatoriska krav på förklarbarhet (explainability) i automatiserat beslutsfattande?',
    alternativ: [
      'Genom att automatiskt översätta processer och beslutsregler till naturligt språk',
      'Genom att göra beslutsflödet visuellt och begripligt, så att man bättre kan förklara varför ett beslut blev som det blev',
      'Genom att automatiskt generera beslutslogg utan mänsklig inblandning',
      'Genom att processoptimering leder till färre, mindre komplexa beslut totalt sett'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Ingen automatisk språköversättning sker.',
      'Rätt. Den visuella, läsbara notationen (både process och beslutslogik) är själva mekanismen bakom förklarbarheten.',
      'Fel. Loggning är inte samma sak som förklarbarhet i den mening som testas.',
      'Fel. Förklarbarhet handlar inte om att minska antalet beslut.'
    ],
    forklaring: 'Kopplingen är särskilt relevant där automatiserade beslut påverkar enskilda (t.ex. myndighetsbeslut) och måste kunna motiveras.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'bpmn-dmn-03', delkurs: 'processer', amne: 'bpmn-dmn',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vad kallas diagrammet som visar vilka data och regler ett DMN-beslut bygger på?',
    alternativ: ['ER-diagram', 'DRD (Decision Requirements Diagram)', 'Sequence-diagram', 'Gantt-schema'],
    ratt: 1,
    forklaringar: [
      'Fel. ER-diagram hör till databasdesign, en annan delkurs.',
      'Rätt. DRD visar besluts- och datastrukturen som ett business rule task länkar till.',
      'Fel. Sequence-diagram är ett UML-begrepp, inte DMN.',
      'Fel. Gantt-scheman visar tidplaner, inte beslutslogik.'
    ],
    forklaring: 'Gruppuppgiften i kursen omfattar just att visualisera en process i BPMN med inslag av DMN/DRD.',
    kalla: 'Föreläsning 1'
  }
]);
