/* =========================================================================
   Frågor – Processorienterad verksamhetsutveckling: BPM och 7FE-ramverket

   Grundade i föreläsningarna F1–F4b HT26 och artiklarna. Tentorna HT24 och
   HT25 har använts för att se vilka begrepp som prövas och i vilken form,
   men alla frågor och scenarier här är egna formuleringar — ingen tentatext
   är kopierad (se minnesregeln om att tentatext aldrig får in i koden).

   Ett ämne per kapitel i kompendiet, så att Öva kan filtrera kapitel för
   kapitel. Rätt alternativ är spritt över positionerna.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = (window.SYSB23.fragor || []).concat([

  /* ============ Kapitel 1: definition, historia, drivkrafter ============ */
  {
    id: 'p1-01', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 1,
    fraga: 'Hur beskriver Jeston (2022) vad BPM i grunden är?',
    alternativ: [
      'Ett verktyg för att rita och lagra processdiagram',
      'Ett avgränsat projekt som är klart när processerna är dokumenterade',
      'Implementering, exekvering och styrning av processer',
      'En samling mjukvarumoduler för automatisering'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Att modellera är bara en del. Jeston avfärdar uttryckligen att BPM är modellering.',
      'Fel. BPM är löpande, inte ett engångsprojekt.',
      'Rätt. Det handlar om att faktiskt införa, köra och styra processerna.',
      'Fel. BPM är inte en mjukvarusvit eller teknik.'
    ],
    forklaring: 'Ett diagram som ingen arbetar efter är inte BPM — det är en bild.',
    kalla: 'F1'
  },
  {
    id: 'p1-02', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 2,
    fraga: 'En ledningsgrupp undrar om BPM och Enterprise Architecture är samma sak. Vilket svar stämmer med föreläsningen?',
    alternativ: [
      'EA är den övergripande ritningen för att realisera strategin; BPM är ett operativt lager som kopplar strategi, verksamhet och IT',
      'BPM är det strategiska ramverket som bestämmer hur EA ska se ut',
      'De är olika namn på i stort sett samma angreppssätt',
      'De är oberoende: EA handlar bara om IT-system, BPM bara om vardagens arbete'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. EA är helhetsritningen; BPM verkar i verksamhetsskiktet och binder ihop strategi och IT.',
      'Fel. Det är tvärtom — EA är den övergripande visionen.',
      'Fel. De har gemensamma mål men olika roller.',
      'Fel. EA rör hela företaget, inte bara IT, och de hänger tätt ihop.'
    ],
    forklaring: 'Tre skikt: strategi, verksamhet, applikationer och infrastruktur. BPM sitter i mitten.',
    kalla: 'F1'
  },
  {
    id: 'p1-03', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 1,
    fraga: 'Vad innebar produktivitetsparadoxen som Solow beskrev 1987?',
    alternativ: [
      'Att företag med mycket IT anställde fler än andra',
      'Att produktiviteten inte längre gick att mäta',
      'Att produktiva företag investerade mindre i IT',
      'Att stora IT-investeringar inte syntes som högre produktivitet'
    ],
    ratt: 3,
    forklaringar: [
      'Fel. Paradoxen handlade om produktivitet, inte anställningar.',
      'Fel. Den gick att mäta — den ökade bara inte.',
      'Fel. Det var inte så sambandet beskrevs.',
      'Rätt. "Datorålder överallt utom i produktivitetsstatistiken." Teknik ovanpå oförändrade processer gav ingen effekt.'
    ],
    forklaring: 'Paradoxen är ett av skälen till att 90-talet angrep själva processerna — med BPR, ERP, TQM och till slut BPM.',
    kalla: 'F1'
  },
  {
    id: 'p1-04', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 2,
    fraga: 'Varför levde Business Process Reengineering inte upp till sina löften?',
    alternativ: [
      'Projekten blev ofta för radikala och dyra och mötte starkt motstånd',
      'Metoden saknade koppling till IT',
      'Den användes nästan bara i små företag',
      'Den fokuserade så mycket på personalen att effektiviteten glömdes bort'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Radikala top-down-projekt med hög risk, ofta en ursäkt för nedskärningar, och medarbetarna togs inte med.',
      'Fel. BPR satte tvärtom IT i centrum — "use the power of modern IT".',
      'Fel. BPR var stort i stora organisationer.',
      'Fel. Det var snarare tvärtom: medarbetarna försummades.'
    ],
    forklaring: 'BPM växte fram som en mognare efterföljare: stegvis och kontinuerligt i stället för allt på en gång.',
    kalla: 'F1; Hammer (1990)'
  },
  {
    id: 'p1-05', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 2,
    fraga: 'Vad var kärnan i Hammers "Don’t Automate, Obliterate" (1990)?',
    alternativ: [
      'Automatisera så snabbt som möjligt för att vinna marknadsandelar',
      'Undvik IT tills processerna är perfekta',
      'Gamla processer ska rivas och göras om radikalt med hjälp av IT, inte bara datoriseras',
      'Förbättra processer i små steg med hjälp av medarbetarnas förslag'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Hammer varnade just för att automatisera gamla processer.',
      'Fel. IT var hans verktyg för omdesignen.',
      'Rätt. Att automatisera en dålig process ger en snabbare dålig process.',
      'Fel. Det låter mer som Kaizen eller BPM — Hammer ville vara radikal.'
    ],
    forklaring: 'Exemplet i artikeln är Fords leverantörsreskontra, där avstämningssteget togs bort helt.',
    kalla: 'F1; Hammer (1990)'
  },
  {
    id: 'p1-06', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 2,
    fraga: 'Vilka två spår möttes när BPM blev ett eget fält kring 1998–2003?',
    alternativ: [
      'Japansk kvalitetsrörelse och amerikansk redovisning',
      'Amerikanskt affärsprocesstänkande och europeisk akademisk workflow-modellering',
      'Brittisk organisationsteori och skandinavisk systemutveckling',
      'Leanproduktion och agil mjukvaruutveckling'
    ],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. BPR och managementtrender från USA möttes av formell modellering, t.ex. Petri-nät, från Tyskland och Nederländerna. Första BPM-konferensen var i Eindhoven 2003.',
      'Fel.',
      'Fel. Lean är en rot till kvalitetstänkandet, men det var inte de två spår som möttes.'
    ],
    forklaring: 'Det europeiska spåret gav den visuella representationen av formella modeller — en föregångare till BPMN.',
    kalla: 'F1'
  },
  {
    id: 'p1-07', delkurs: 'processer', amne: 'proc-intro', typ: 'flerval', svarighet: 2,
    fraga: 'Vilket regelverk från 2002 drev igenom bred processdokumentation och BPM?',
    alternativ: [
      'GDPR',
      'Basel II',
      'Sarbanes-Oxley (SOX), efter Enron-skandalen',
      'ISO 14001'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. GDPR kom 2018.',
      'Fel.',
      'Rätt. SOX krävde granskningsbar dokumentation av alla processer kring finansiell rapportering.',
      'Fel. ISO 9000:2000 drev processdokumentation, men det var inte ett regelverk från 2002.'
    ],
    forklaring: 'Processer dokumenterades nu för regelefterlevnad, inte bara för prestation — och BPMN fick fart.',
    kalla: 'F1'
  },

  /* ============ Kapitel 2: livscykeln och normativ litteratur ============ */
  {
    id: 'p2-01', delkurs: 'processer', amne: 'proc-livscykel', typ: 'flerval', svarighet: 1,
    fraga: 'I vilket steg av BPM-livscykeln kartläggs hur processen faktiskt fungerar i dag?',
    alternativ: ['Process discovery', 'Process identification', 'Process redesign', 'Process monitoring'],
    ratt: 0,
    forklaringar: [
      'Rätt. Discovery ger as-is.',
      'Fel. Identification handlar om vilka processer som finns och vilka som ska prioriteras.',
      'Fel. Redesign skapar to-be.',
      'Fel. Monitoring följer processen efter implementering.'
    ],
    forklaring: 'Identification → modelling → discovery → analysis → redesign → implementation → monitoring.',
    kalla: 'F1'
  },
  {
    id: 'p2-02', delkurs: 'processer', amne: 'proc-livscykel', typ: 'flerval', svarighet: 2,
    fraga: 'Var i livscykeln identifieras gapet mellan as-is och to-be?',
    alternativ: ['Process implementation', 'Process monitoring', 'Process identification', 'Process analysis'],
    ratt: 3,
    forklaringar: [
      'Fel.',
      'Fel.',
      'Fel.',
      'Rätt. Analysen hittar flaskhalsar och avvikelser och visar vad som måste ändras.'
    ],
    forklaring: 'As-is är en beskrivning; to-be är ett beslut. Analysen bygger bron däremellan.',
    kalla: 'F1'
  },
  {
    id: 'p2-03', delkurs: 'processer', amne: 'proc-livscykel', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är sanningskriteriet för normativ managementlitteratur som Jestons bok?',
    alternativ: [
      'Att påståendena stöds av systematisk evidens',
      'Att råden fungerar för chefer i praktiken',
      'Att resultaten går att replikera',
      'Att slutsatserna är generaliserbara'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är forskningslitteraturens kriterium.',
      'Rätt. Normativ litteratur bedöms efter användbarhet och ger tumregler för handling.',
      'Fel. Det hör till forskningens logik.',
      'Fel. Forskningen strävar efter generaliserbarhet; normativa råd är "tillräckligt bra" men inte universella.'
    ],
    forklaring: 'Läs Jeston kritiskt: under vilka förutsättningar gäller rådet, och vad bygger exemplet på?',
    kalla: 'F1'
  },
  {
    id: 'p2-04', delkurs: 'processer', amne: 'proc-livscykel', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Reijers (2021) och Jeston (2022) är samma sorts litteratur, eftersom båda handlar om BPM.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Reijers är forskningslitteratur (beskrivande och analytisk); Jeston är normativ (föreskrivande).'
    ],
    forklaring: 'Samma ämne, olika logik: vetenskapens validitet mot praktikens användbarhet.',
    kalla: 'F1'
  },
  {
    id: 'p2-05', delkurs: 'processer', amne: 'proc-livscykel', typ: 'flerval', svarighet: 2,
    fraga: 'Vilken av Jestons "avmystifieringar" stämmer?',
    alternativ: [
      'BPM är enkelt om man har rätt mjukvara',
      'Lyckad BPM kräver alltid externa konsulter',
      'BPM är komplext, så det är bättre att börja litet och växa än att gå all-in',
      'Varje organisation bör utveckla en egen BPM-metod'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. BPM är inte beroende av en viss teknik, och det är inte enkelt.',
      'Fel. Konsulter kan hjälpa men beror på mognad och kompetens.',
      'Rätt.',
      'Fel. Jeston avråder från egna "DIY"-metoder — det finns få beprövade.'
    ],
    forklaring: 'BPM är moget, men beror fortfarande på ledningens och medarbetarnas engagemang.',
    kalla: 'F1'
  },

  /* ============ Kapitel 3: att starta BPM ============ */
  {
    id: 'p3-01', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 1,
    fraga: 'Vilken framgångsfaktor är enligt Jeston den enskilt viktigaste?',
    alternativ: [
      'Ett modernt BPM-system',
      'Synligt stöd och drivkraft från VD och högsta ledningen',
      'Externa konsulter med branscherfarenhet',
      'Detaljerade as-is-modeller'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Teknik är en möjliggörare, inte en framgångsfaktor i sig.',
      'Rätt. Saknas det stödet i ett storskaligt program ska man enligt Jeston helt enkelt låta bli.',
      'Fel.',
      'Fel.'
    ],
    forklaring: 'De sex: ledningens drivkraft, tydliga drivers, tydlig vision, mätbart värde, BPM-team med mandat, kopplade incitament.',
    kalla: 'F2'
  },
  {
    id: 'p3-02', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 2,
    fraga: 'En bank måste ändra sin kundkontroll efter en ny EU-förordning. Vad är förordningen i Jestons termer?',
    alternativ: [
      'En driver',
      'En quick win',
      'En trigger',
      'Ett implementeringsscenario'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. En driver är ett affärsskäl eller motiv, som att öka lönsamheten.',
      'Fel.',
      'Rätt. En händelse som tvingar fram handling, ofta en förändring utifrån.',
      'Fel.'
    ],
    forklaring: 'Driver = varför vi vill. Trigger = det som händer och gör att vi måste. Båda ska vara dokumenterade och förstådda innan BPM startar.',
    kalla: 'F2'
  },
  {
    id: 'p3-03', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 2,
    fraga: 'Ekonomiavdelningen på ett företag vill förbättra sina processer, men ledningen visar inget intresse och strategin är otydlig. Vad rekommenderar Jeston?',
    alternativ: [
      'Vänta tills ledningen tagit fram en ny strategi',
      'Starta ett företagsövergripande top-down-program ändå',
      'Outsourca de krångligaste processerna',
      'Börja i liten skala bottom-up och bygg momentum med synliga förbättringar'
    ],
    ratt: 3,
    forklaringar: [
      'Fel. Att vänta ger ingenting.',
      'Fel. Utan ledningens stöd fungerar inte top-down.',
      'Fel.',
      'Rätt. Små lokala vinster visar värde och kan väcka ledningens intresse.'
    ],
    forklaring: 'Top-down ger riktning, bottom-up ger fäste. När riktningen saknas får man börja med fästet.',
    kalla: 'F2'
  },
  {
    id: 'p3-04', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 2,
    fraga: 'En kommun ska ställa om hela sin ärendehantering till ett nytt nationellt system. Det berör alla förvaltningar och är strategiskt viktigt. Hur bör BPM-arbetet drivas?',
    alternativ: [
      'Top-down, för mandat, styrning och samordning över hela organisationen',
      'Bottom-up, eftersom det engagerar flest',
      'Decentraliserat — varje förvaltning löser det själv',
      'Som ett under the radar-projekt'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Tvärfunktionellt och strategiskt kräver top-down.',
      'Fel. Bottom-up får inte räckvidd nog.',
      'Fel. Då tappas samordningen.',
      'Fel.'
    ],
    forklaring: 'Typ 4-projekt (företagsövergripande) måste drivas av VD eller ledningsgruppen.',
    kalla: 'F2'
  },
  {
    id: 'p3-05', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 2,
    fraga: 'På ett lager har en driftchef och en kollega på eget initiativ börjat rita sina flöden. Ledningen vet om det men har inte avsatt pengar eller tid, och ingen styr arbetet. Vilket av Jestons scenarier är det?',
    alternativ: ['Pilot project', 'In the driver’s seat', 'Business as usual', 'Under the radar'],
    ratt: 3,
    forklaringar: [
      'Fel. En pilot är ett riktat projekt för att bevisa värdet.',
      'Fel. Där ses BPM som strategiskt med växande styrning.',
      'Fel. Där är BPM helt inbäddat.',
      'Rätt. Små, informella insatser med begränsat stöd.'
    ],
    forklaring: 'Scenariot avgör hur strikt och brett 7FE tillämpas.',
    kalla: 'F2'
  },
  {
    id: 'p3-06', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 2,
    fraga: 'Ett BPM-initiativ startas för att kundklagomålen på leveranser har ökat kraftigt. Vilken typ av initiering är det?',
    alternativ: ['Strategy-led', 'Business issue-led', 'Process-led', 'Benefits-led'],
    ratt: 1,
    forklaringar: [
      'Fel. Strategy-led utgår från strategin och startar i Foundations och Enablement.',
      'Rätt. Ett svar på ett konkret verksamhetsproblem, oftast taktiskt och lokalt.',
      'Fel. Process-led startas av processchefer eller analytiker oberoende av strategin.',
      'Fel. Det är inte en av de tre.'
    ],
    forklaring: 'Tre sätt: strategy-led, business issue-led, process-led.',
    kalla: 'F2'
  },
  {
    id: 'p3-07', delkurs: 'processer', amne: 'proc-start', typ: 'flerval', svarighet: 1,
    fraga: 'Påstående: Jeston menar att BPM-kompetensen på lång sikt helst ska finnas hos externa konsulter.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Konsulter är bra som coacher, granskare och startstöd, men BPM-chefer bör vara integrerade i organisationen.'
    ],
    forklaring: 'Externa experter kan också lösa konflikter när program kört fast och utvärdera slutresultatet oberoende.',
    kalla: 'F2'
  },

  /* ============ Kapitel 4: improve before automate ============ */
  {
    id: 'p4-01', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 1,
    fraga: 'Varför ska en process enligt Jeston förbättras innan den automatiseras?',
    alternativ: [
      'Automatisering är alltid dyrare än förbättring',
      'Automatisering förstärker det som finns — en ineffektiv process blir bara snabbare dålig',
      'BPM-system klarar inte processer som inte är dokumenterade i BPMN',
      'Medarbetarna vill hellre ha förbättringar än ny teknik'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är inte en kostnadsjämförelse.',
      'Rätt. Teknik är en möjliggörare och kan inte kompensera för dålig processdesign.',
      'Fel.',
      'Fel.'
    ],
    forklaring: 'Risken med att automatisera dåliga processer: bortkastade investeringar, frustration och system som inte används.',
    kalla: 'F2'
  },
  {
    id: 'p4-02', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'En controller berättar att månadsbokslutet bygger på sju kalkylblad som skickas runt via e-post. Vad säger det enligt Jestons spreadsheet-test?',
    alternativ: [
      'Att processen är flexibel och väl anpassad',
      'Att ett nytt ERP-system direkt bör köpas in',
      'Att processen först behöver förbättras innan den automatiseras',
      'Att kalkylbladen bör ersättas av RPA'
    ],
    ratt: 2,
    forklaringar: [
      'Fel.',
      'Fel. Att automatisera direkt är precis felet.',
      'Rätt. Kalkylblad är ett tecken på att man täcker över processproblem i stället för att lösa grundorsaken.',
      'Fel. Då automatiserar man den dåliga processen.'
    ],
    forklaring: 'System som är fit for purpose ska göra kalkylbladen onödiga.',
    kalla: 'F2'
  },
  {
    id: 'p4-03', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'Vilka fem processoptimeringslösningar räknar Jeston med?',
    alternativ: [
      'Leadership, project management, people change management, governance och IT',
      'Processomdesign (BPM), outsourcing, shared services, RPA och cloud computing',
      'Customer-, employee-, system-, integration- och human-centric BPM',
      'ABC, BPMN, DMN, process mining och BI'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. De tre första är 7FE:s essentials.',
      'Rätt.',
      'Fel. Det är perspektiv, inte lösningar.',
      'Fel. Det är verktyg och notationer.'
    ],
    forklaring: 'Teknik är fortfarande en möjliggörare — utan att kultur och människor tas om hand misslyckas även bra verktyg.',
    kalla: 'F4a'
  },
  {
    id: 'p4-04', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'På ett försäkringsbolag läser en handläggare varje morgon av skadeanmälningar i en e-postlåda och skriver in samma fält i skadesystemet. Inget omdöme krävs. Vad passar enligt Jeston?',
    alternativ: [
      'Agentisk AI-orkestrering',
      'Outsourcing',
      'RPA',
      'En fullständig BPM-omdesign av skadeprocessen'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Agentisk AI är till för beslut och varierande situationer, inte fasta steg.',
      'Fel.',
      'Rätt. Repetitivt, regelstyrt och utan omdöme är RPA:s typfall.',
      'Fel. Det är överdrivet för ett fast, enkelt delsteg.'
    ],
    forklaring: 'RPA = en virtuell medarbetare som efterliknar hur en människa klickar i systemen.',
    kalla: 'F4a'
  },
  {
    id: 'p4-05', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'Varför skalade många tidiga RPA-satsningar dåligt?',
    alternativ: [
      'RPA kunde bara köras i molnet',
      'RPA arbetar via användargränssnittet i stället för robusta integrationer, så den går sönder när skärmarna ändras',
      'RPA kräver avancerad programmering av specialister',
      'RPA saknade stöd för e-post'
    ],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. UI-baserad automatisering är skör, och att skala kräver tid, kompetens och styrning.',
      'Fel. RPA är tvärtom low-code och användarvänligt.',
      'Fel. E-posthantering är ett typiskt RPA-fall.'
    ],
    forklaring: 'RPA-bolagen konkurrerar i dag med agentisk AI-orkestrering.',
    kalla: 'F1; F4a'
  },
  {
    id: 'p4-06', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'En vårdcentral gör om sin tidsbokning så att patienter får ett enda nummer att ringa, svar samma dag och slipper slussas mellan mottagningar. Vilket perspektiv dominerar?',
    alternativ: ['Employee-centric BPM', 'System-centric BPM', 'Integration-centric BPM', 'Customer-centric BPM'],
    ratt: 3,
    forklaringar: [
      'Fel. Då hade fokus legat på personalens arbetsmiljö och empowerment.',
      'Fel.',
      'Fel.',
      'Rätt. Snabbare svar, färre hand-offs och en kontaktpunkt för kunden.'
    ],
    forklaring: 'Jeston: ta bort det som irriterar kunden hellre än att satsa på dyra wow-faktorer.',
    kalla: 'F2'
  },
  {
    id: 'p4-07', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 2,
    fraga: 'Vad står "FAIL" för i det medarbetarcentrerade perspektivet?',
    alternativ: ['First Attempt In Learning', 'Failure Analysis In Logistics', 'Find, Assess, Improve, Learn', 'Fast Automation In Line'],
    ratt: 0,
    forklaringar: ['Rätt. En lärande kultur där misstag är en del av lärandet.', 'Fel.', 'Fel.', 'Fel.'],
    forklaring: 'Employee-centric BPM: tjänande ledarskap, empowerment och omsorg — motiverade medarbetare är grunden för bra service.',
    kalla: 'F2'
  },
  {
    id: 'p4-08', delkurs: 'processer', amne: 'proc-teknik', typ: 'flerval', svarighet: 3,
    fraga: 'Vilken av följande hör till "modellering och design" bland BPMS-komponenterna?',
    alternativ: ['Regelmotor', 'Processimulering', 'Balanced scorecard', 'Ärendehantering'],
    ratt: 1,
    forklaringar: [
      'Fel. Hör till exekvering och spårning.',
      'Rätt. Tillsammans med BPMN-modellering och activity-based costing.',
      'Fel. Hör till prestationsstyrning.',
      'Fel. Hör till exekvering och spårning.'
    ],
    forklaring: 'Tre grupper: modellering och design, exekvering och spårning, prestationsstyrning.',
    kalla: 'F2'
  },

  /* ============ Kapitel 5: 7FE och BPM-huset ============ */
  {
    id: 'p5-01', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 2,
    fraga: 'Vad vill Jeston visa med sin hus-metafor?',
    alternativ: [
      'Att BPM ska byggas som ett IT-system, steg för steg enligt en arkitekturplan',
      'Att BPM består av flera lager — från strategiska grunder till operativa och innovativa processer — som tillsammans ger en effektiv organisation',
      'Att processkartläggning och automatisering ska göras innan strategin tas fram',
      'Att BPM är ett avgränsat projekt'
    ],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Grund, enablement, alignment, programstyrning, tre processlager och ett tak av sustainability och performance management.',
      'Fel. Strategin kommer först — den är drivkraften.',
      'Fel. Taket handlar om att bära processfokus över tid.'
    ],
    forklaring: 'Operativa processer ger effektivitet, ledningsprocesser uthållig konkurrensfördel, innovationsprocesser framtidssäkring.',
    kalla: 'F2'
  },
  {
    id: 'p5-02', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 2,
    fraga: 'Vilka fyra grupper ger "F:en" i 7FE?',
    alternativ: [
      'Foundations, Findings & solutions, Fulfilment, Future',
      'Foundations, Facilitation, Follow-up, Feedback',
      'Focus, Flow, Function, Finance',
      'Foundations, Framework, Fulfilment, Flexibility'
    ],
    ratt: 0,
    forklaringar: ['Rätt.', 'Fel.', 'Fel.', 'Fel.'],
    forklaring: '10 faser i 4 F-grupper och 3 essentials ("10P3" vore ärligare, säger föreläsningen).',
    kalla: 'F2'
  },
  {
    id: 'p5-03', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 2,
    fraga: 'Vilka är 7FE:s tre essentials?',
    alternativ: [
      'Strategy, process och technology',
      'Leadership, project management och people change management',
      'Understand, Innovate och Implement',
      'Governance, architecture och performance management'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är BOM:s förmågedimensioner, ungefär.',
      'Rätt. De ska genomsyra alla tio faser.',
      'Fel. Det är faser.',
      'Fel. Det är delar av Enablement.'
    ],
    forklaring: 'Försummas de får BPM-arbetet att luta, sjunka eller rasa.',
    kalla: 'F2; F4a'
  },
  {
    id: 'p5-04', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Sustainability-fasen i 7FE handlar om miljömässig hållbarhet.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Den handlar om uthållig konkurrensfördel — att förbättringarna består. Inte "hållbarhet".'],
    forklaring: 'Miljöhållbarhet hör till Green BPM (Houy et al.), inte till 7FE:s sista fas.',
    kalla: 'F2'
  },
  {
    id: 'p5-05', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 3,
    fraga: 'Vilken är en svaghet hos 7FE som föreläsningen pekar på?',
    alternativ: [
      'Ramverket ignorerar strategi och ledarskap',
      'Det passar bara små organisationer',
      'Faserna överlappar och blandar sekventiellt och parallellt, så gränserna blir otydliga',
      'Det saknar koppling till människor och kultur'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Tvärtom är helhetssynen en styrka.',
      'Fel. Det ger en upprepbar struktur för stora organisationer.',
      'Rätt. Plus: för komplext, svagt namn, pedagogiskt mest listor.',
      'Fel. Att väva in människor är en styrka.'
    ],
    forklaring: 'Styrkor: helhetsbild, strategiskt förankrat, människor och teknik, upprepbart, användbart även utanför BPM.',
    kalla: 'F2'
  },
  {
    id: 'p5-06', delkurs: 'processer', amne: 'proc-7fe', typ: 'flerval', svarighet: 2,
    fraga: 'En organisation med låg BPM-mognad vill köra hela 7FE i full skala på ett halvår. Vad skulle Jeston invända?',
    alternativ: [
      'Att 7FE bara får användas av konsulter',
      'Att takten ska anpassas efter mognaden — går man fortare än den ökar risken att misslyckas',
      'Att alla faser måste hoppas över utom Foundations',
      'Ingenting — 7FE ska alltid tillämpas likadant'
    ],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. One size fits all fungerar inte.',
      'Fel. Att hoppa över faser avråds om man inte kan motivera det.',
      'Fel.'
    ],
    forklaring: 'Organisationer skiljer sig i mognad, kultur, ledarskap och processvana.',
    kalla: 'F2'
  },

  /* ============ Kapitel 6: Foundations och Enablement ============ */
  {
    id: 'p6-01', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är "strategy execution void"?',
    alternativ: [
      'Bristen på strategi i organisationer som saknar BPM',
      'Gapet mellan den strategiska avsikten och förmågan att faktiskt genomföra strategin',
      'Tiden mellan att en process designas och att den automatiseras',
      'Skillnaden mellan as-is och to-be'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Problemet är sällan att strategin saknas.',
      'Rätt. Att formulera strategi är svårt, men de flesta misslyckas med genomförandet.',
      'Fel.',
      'Fel. Det är analysfasens gap.'
    ],
    forklaring: 'Två komponenter: management effectiveness och operational efficiency.',
    kalla: 'F3'
  },
  {
    id: 'p6-02', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 3,
    fraga: 'Ett företag effektiviserar alla sina operativa processer men rör inte ledningsprocesser, styrning eller kultur. Vad blir resultatet enligt Jeston?',
    alternativ: [
      'En uthållig konkurrensfördel',
      '"Different sameness" — små förbättringar utan verklig förändring',
      'Att strategy execution void stängs',
      'Att BPM blir business as usual'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Uthållig fördel kräver management effectiveness.',
      'Rätt.',
      'Fel. Båda dimensionerna måste angripas.',
      'Fel.'
    ],
    forklaring: 'Operational efficiency höjer produktiviteten men ger sällan bestående fördel på egen hand.',
    kalla: 'F3'
  },
  {
    id: 'p6-03', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Hur går ett Red Wine Test till?',
    alternativ: [
      'Man analyserar strategidokumenten och kopplar dem till centrala processer',
      'Man kartlägger nuläget i en workshop med dem som utför processerna',
      'Deltagarna föreställer sig att BPM-projektet redan är genomfört och beskriver hur det ser ut då',
      'Man går igenom riskerna för varje process'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Det låter som steg 1 i Foundations.',
      'Fel. Det är Understand.',
      'Rätt. Vad har förändrats för kunder, medarbetare och ledning? Vad är man stolt över?',
      'Fel.'
    ],
    forklaring: 'Varje svar får en ansvarig för leveransen: BPM-teamet eller linjeledningen.',
    kalla: 'F3'
  },
  {
    id: 'p6-04', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Under en workshop säger cheferna: "beställningar levereras nästa dag", "teamen samarbetar över avdelningsgränserna" och "kunderna rekommenderar oss". Vad åstadkommer övningen?',
    alternativ: [
      'Ett gemensamt narrativ om hur framgång ser ut efter BPM-projektet',
      'En avgränsning av projektets scope',
      'Detaljerade to-be-modeller',
      'Ett underlag för att välja optimeringslösning'
    ],
    ratt: 0,
    forklaringar: ['Rätt. Det är ett Red Wine Test.', 'Fel.', 'Fel.', 'Fel.'],
    forklaring: 'Red Wine Test-svaren används senare också som checklista vid utvärderingen.',
    kalla: 'F3'
  },
  {
    id: 'p6-05', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är en Target Operating Model (TOM)?',
    alternativ: [
      'En karta över dagens processer',
      'En kalkyl över besparingarna från processförbättringar',
      'Den framtida IT-arkitekturen',
      'En övergripande beskrivning av hur organisationens delar ska fungera i framtiden för att BPM ska lyckas'
    ],
    ratt: 3,
    forklaringar: ['Fel. Det är as-is.', 'Fel.', 'Fel. Teknik är bara en av komponenterna.', 'Rätt. Strategi, processtyrning, prestationsstyrning, organisation, människor och kultur, teknik.'],
    forklaring: 'TOM tas fram i Foundations och ligger till grund för hela Enablement.',
    kalla: 'F3'
  },
  {
    id: 'p6-06', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Hur förhåller sig en processmodell till en process asset?',
    alternativ: [
      'De är samma sak',
      'Processmodellen är en del av process asset, som dessutom innehåller roller, regler, risker, ägarskap och IT-stöd',
      'Process asset används för små förändringar, processmodeller för stora',
      'Process asset är tyst kunskap, processmodellen explicit kunskap'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt.', 'Fel.', 'Fel. Båda är dokumenterad, explicit kunskap.'],
    forklaring: 'Process asset gör processen till en strategisk resurs: återanvändbar, spårbar och granskningsbar.',
    kalla: 'F3'
  },
  {
    id: 'p6-07', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Ett fel i fakturahanteringen ska utredas. Teamet behöver se stegen, reglerna, vem som ansvarar och var besluten fattas. Vad tar de fram?',
    alternativ: ['Process Worth Matrix', 'Strategidokumentet', 'Process asset för fakturaprocessen', 'Target Operating Model'],
    ratt: 2,
    forklaringar: ['Fel. Den prioriterar processer efter värde.', 'Fel.', 'Rätt.', 'Fel. TOM är för övergripande.'],
    forklaring: 'Process asset är länken mellan verksamhet och IT för varje aktivitet.',
    kalla: 'F3'
  },
  {
    id: 'p6-08', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 3,
    fraga: 'Vilken roll i processtyrningen ansvarar för enskilda processer och prestationsstyrning på processnivå?',
    alternativ: ['Strategic process council', 'Chief Process Officer', 'Process sponsor', 'Process steward'],
    ratt: 3,
    forklaringar: [
      'Fel. Det högsta styrande organet.',
      'Fel. Idealisk men sällsynt, högst upp.',
      'Fel.',
      'Rätt.'
    ],
    forklaring: 'Process governance är nyckeln till långsiktiga förbättringar: beslut, risk och prestation.',
    kalla: 'F3'
  },
  {
    id: 'p6-09', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'I vilken ordning ska organisationen utvecklas enligt Enablement-fasens steg om organisationsdesign?',
    alternativ: ['Struktur → människor → processer', 'Människor → struktur → processer', 'Processer → struktur → människor', 'Teknik → processer → struktur'],
    ratt: 2,
    forklaringar: ['Fel.', 'Fel.', 'Rätt. Strukturen ska stödja processerna.', 'Fel. Tekniken ska möjliggöra, inte diktera.'],
    forklaring: 'Organisationsdesign ska också uppmuntra samarbete över silos.',
    kalla: 'F3'
  },
  {
    id: 'p6-10', delkurs: 'processer', amne: 'proc-foundations', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: I Foundations-fasen tar BPM-teamet fram organisationens strategi.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Uppgiften är att förstå strategin och säkerställa samstämmighet — inte att skapa eller kritisera den.'],
    forklaring: 'Spårbarhet: strategi → BPM-program → Red Wine Test → BPM-kompetenscentrets aktiviteter.',
    kalla: 'F3'
  },

  /* ============ Kapitel 7: Launch och Understand ============ */
  {
    id: 'p7-01', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är huvudsyftet med att modellera processer i Understand-fasen?',
    alternativ: [
      'Att få kompletta modeller som kan köras direkt i ett BPMS',
      'Att få en gemensam, faktabaserad bild av hur processen fungerar i dag, som grund för förbättring',
      'Att ta fram detaljerade KPI:er för framtida styrning',
      'Att dokumentera för revision och kvalitetssäkring'
    ],
    ratt: 1,
    forklaringar: ['Fel. Modellerna ska vara fit for purpose, inte perfekta.', 'Rätt.', 'Fel.', 'Fel.'],
    forklaring: 'Sluta modellera när det finns tillräckligt för att gå vidare till Innovate.',
    kalla: 'F4a'
  },
  {
    id: 'p7-02', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 1,
    fraga: 'Vad kännetecknar en quick win?',
    alternativ: [
      'Den kräver en omfattande förstudie',
      'Den har stort symbolvärde men liten praktisk effekt',
      'Den ersätter behovet av workshops',
      'Den går snabbt och billigt att genomföra och ger omedelbar förbättring'
    ],
    ratt: 3,
    forklaringar: ['Fel.', 'Fel. Den ska ge verklig nytta.', 'Fel.', 'Rätt. Gärna inom 4–8 veckor.'],
    forklaring: 'Quick wins bygger trovärdighet och momentum och kan göra projektet självfinansierande.',
    kalla: 'F4a'
  },
  {
    id: 'p7-03', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 3,
    fraga: 'En reklambyrå sköter löneadministrationen internt. Den syns inte för kunderna och sköts ganska ineffektivt. Var hamnar den i Process Worth Matrix?',
    alternativ: ['Identity', 'Priority', 'Background', 'Mandated'],
    ratt: 2,
    forklaringar: [
      'Fel. Identity-processer definierar varumärket.',
      'Fel. Priority-processer stöder identiteten och får synliga fel direkt.',
      'Rätt. Stöder vardagen, låg strategisk synlighet — ofta en lätt vinst men liten effekt.',
      'Fel. Mandated krävs enligt regelverk.'
    ],
    forklaring: 'Matrisen ställer strategisk betydelse (salience) mot värde (worth) och hjälper att välja: förbättra, outsourca eller eliminera.',
    kalla: 'F4a'
  },
  {
    id: 'p7-04', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 2,
    fraga: 'Vilket verktyg använder Jeston för att hitta de verkliga orsakerna till processproblem i Understand?',
    alternativ: ['FMEA (Failure Mode and Effect Analysis)', 'Red Wine Test', 'Process Selection Matrix', 'Balanced scorecard'],
    ratt: 0,
    forklaringar: [
      'Rätt. Allvarlighet, frekvens och upptäckbarhet ger poäng och en värmekarta över svagheterna.',
      'Fel. Det är en visionsövning i Foundations.',
      'Fel. Den visualiserar processerna i Launch.',
      'Fel.'
    ],
    forklaring: 'Utan rotorsaksanalys riskerar omdesignen att upprepa eller dölja samma problem.',
    kalla: 'F4a'
  },
  {
    id: 'p7-05', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 2,
    fraga: 'Hur många prestationsmått per process rekommenderas när processmålen sätts i Launch?',
    alternativ: ['Minst tio', 'Helst högst fem', 'Exakt ett', 'Så många som möjligt för full insyn'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Målen ska vara SMART och kopplade till ansvariga personer.', 'Fel.', 'Fel.'],
    forklaring: 'SMART: specifika, mätbara, uppnåeliga, realistiska, tidsatta.',
    kalla: 'F3'
  },
  {
    id: 'p7-06', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 2,
    fraga: 'Hur ska business caset i Launch se ut enligt föreläsningen?',
    alternativ: [
      'Som en detaljerad BPMN-modell av to-be',
      'På vanligt språk, helst en sida, med påståenden som stöds av belägg',
      'Som en teknisk kravspecifikation',
      'Det tas fram först i Realize'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Det kan behöva uppdateras i senare faser.', 'Fel. Det kommer i Develop.', 'Fel.'],
    forklaring: 'Launch avslutas med en initial plan och ett business case som grund för Understand.',
    kalla: 'F3'
  },
  {
    id: 'p7-07', delkurs: 'processer', amne: 'proc-understand', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Den övergripande processgenomgången i Launch är en kritisk utvärdering av hur väl processerna fungerar.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Den ska vara övergripande och okritisk — orientering, inte utvärdering.'],
    forklaring: 'Den detaljerade granskningen sker i Understand.',
    kalla: 'F3'
  },

  /* ============ Kapitel 8: Innovate, People, Develop, Implement ============ */
  {
    id: 'p8-01', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 2,
    fraga: 'Vilket är en typisk output från Innovate-fasen?',
    alternativ: [
      'Identifierade rotorsaker',
      'Utbildningsplaner för personalen',
      'Ett riskregister för projektet',
      'To-be-processer och validerade lösningsförslag'
    ],
    ratt: 3,
    forklaringar: ['Fel. Hör till Understand.', 'Fel. Hör till People och Implement.', 'Fel.', 'Rätt.'],
    forklaring: 'Innovate avslutas med godkännande och affärskrav som lämnas till Develop.',
    kalla: 'F4a'
  },
  {
    id: 'p8-02', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är syftet med ledningens kick-off-workshop i Innovate?',
    alternativ: [
      'Att sätta spelreglerna: processmål, begränsningar och koppling till strategin',
      'Att modellera as-is',
      'Att utse process stewards',
      'Att testa lösningen med användare'
    ],
    ratt: 0,
    forklaringar: ['Rätt. En skicklig facilitator är avgörande.', 'Fel.', 'Fel.', 'Fel. Det är UAT i Implement.'],
    forklaring: 'Begränsningar kan vara tid, resurser och hur mycket som får automatiseras.',
    kalla: 'F4a'
  },
  {
    id: 'p8-03', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 3,
    fraga: 'Innovate-workshopparna sker i tre steg. Ungefär hur färdig ska designen vara efter bekräftelseworkshopen?',
    alternativ: ['Cirka 30 %', 'Cirka 50 %', 'Cirka 70 %', 'Cirka 95 %'],
    ratt: 3,
    forklaringar: ['Fel.', 'Fel.', 'Fel. Det gäller efter den första workshopen.', 'Rätt. Slutworkshopen presenterar sedan för godkännande.'],
    forklaring: 'Initial redesign (~70 %) → bekräftelse (~95 %) → slutgodkännande.',
    kalla: 'F4a'
  },
  {
    id: 'p8-04', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 2,
    fraga: 'Vilken modell används i People-fasen för att definiera roller och ansvar?',
    alternativ: ['SWOT', 'RACI', 'FMEA', 'SCOR'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Uppgifter grupperas till aktiviteter och generiska roller.', 'Fel. Används för rotorsaker.', 'Fel. En branschmall för processer.'],
    forklaring: 'Ett jobb kan rymma flera roller.',
    kalla: 'F4a'
  },
  {
    id: 'p8-05', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Ett BPM-projekt kräver alltid att ny teknik byggs i Develop-fasen.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. BPM kräver inte teknik — men när automatisering ingår är det i Develop den byggs.'],
    forklaring: 'Develop: bestäm BPM-komponenter, utvecklingsansats och specifikationer.',
    kalla: 'F4a'
  },
  {
    id: 'p8-06', delkurs: 'processer', amne: 'proc-innovate', typ: 'flerval', svarighet: 2,
    fraga: 'Vad innebär handover/takeover i Implement?',
    alternativ: [
      'Att leverantören tar över driften av systemet',
      'Att ansvaret för de nya processerna och systemen går från projektteamet till linjen',
      'Att en ny projektledare tar över',
      'Att processen outsourcas'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Ansvar, dokumentation och stöd ska finnas på plats.', 'Fel.', 'Fel.'],
    forklaring: 'Implement innehåller även UAT, piloter och planer för back-out.',
    kalla: 'F4a'
  },

  /* ============ Kapitel 9: Realize, Sustainability, essentials ============ */
  {
    id: 'p9-01', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 1,
    fraga: 'Ungefär hur stor del av BPM-arbetet menar Jeston bör handla om människor och kommunikation?',
    alternativ: ['Cirka 20 %', 'Cirka 40 %', 'Minst 60 %', 'Cirka 90 %'],
    ratt: 2,
    forklaringar: ['Fel.', 'Fel.', 'Rätt.', 'Fel.'],
    forklaring: 'Många BPM-initiativ misslyckas för att de försummar den mänskliga och kulturella sidan.',
    kalla: 'F4a'
  },
  {
    id: 'p9-02', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 2,
    fraga: 'Vad ska förändringsledningen enligt Jeston se till att medarbetarna är?',
    alternativ: ['Informerade och kontrollerade', 'Able och willing — kan och vill', 'Fler och billigare', 'Specialiserade och självgående'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Kan genom utbildning, vill genom motivation och engagemang.', 'Fel.', 'Fel.'],
    forklaring: 'Det gör BPM till en mänsklig förändring, inte en teknisk övning.',
    kalla: 'F4a'
  },
  {
    id: 'p9-03', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknar appreciative inquiry?',
    alternativ: [
      'Man letar efter rotorsaker till misslyckanden',
      'Man bygger förändringen på det som redan fungerar, framåtblickande och deltagande',
      'Man analyserar konkurrenternas misstag',
      'Man ser varje hinder som en barriär som måste rivas'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Den hjälper organisationen att skapa förändring i stället för att bara reagera.', 'Fel.', 'Fel.'],
    forklaring: 'Samma framåtblickande logik som Red Wine Test.',
    kalla: 'F4a'
  },
  {
    id: 'p9-04', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 2,
    fraga: 'Vad lägger BPM-projektledning till utöver traditionell projektledning (scope, tid, budget)?',
    alternativ: [
      'Agil utveckling, sprintar och backlog',
      'Förändringsledning, intressenthantering och BPM-expertis',
      'Upphandling, avtal och juridik',
      'Inget — det räcker med traditionell projektledning'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt.', 'Fel.', 'Fel. Jeston menar att vanliga metoder inte räcker för BPM.'],
    forklaring: 'BPM-projekt är tvärfunktionella och utmanar strukturer och arbetssätt.',
    kalla: 'F4a'
  },
  {
    id: 'p9-05', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 3,
    fraga: 'När registreras de potentiella nyttorna i ett benefits register?',
    alternativ: ['I Launch', 'I Realize', 'I Sustainability', 'I Implement'],
    ratt: 0,
    forklaringar: [
      'Rätt. Med ägare, värde, måldatum, beroenden, risker och koppling till strategin.',
      'Fel. I Realize levereras och följs nyttorna upp.',
      'Fel. Där övervakas och maximeras värdet.',
      'Fel.'
    ],
    forklaring: 'Nyttorealisering är en tråd genom alla faser, inte ett enskilt steg.',
    kalla: 'F4a'
  },
  {
    id: 'p9-06', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: När Realize visar att målen är uppnådda behövs ingen Sustainability-fas.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Utan Sustainability eroderar nyttorna när omvärlden förändras.'],
    forklaring: 'Sustainability gör förbättringen till en permanent förmåga: utvärdering, QA, utbildade stewards, uppdaterad dokumentation.',
    kalla: 'F4a'
  },
  {
    id: 'p9-07', delkurs: 'processer', amne: 'proc-realize', typ: 'flerval', svarighet: 2,
    fraga: 'Hur ser Jeston på ledarskap i BPM?',
    alternativ: [
      'Som ett ansvar enbart för högsta ledningen',
      'Som att kontrollera att resurser och tidplaner hålls',
      'Som ett kontinuerligt inflytande på alla nivåer, som inspirerar och ger mandat snarare än kontrollerar',
      'Som extern kommunikation med kunder'
    ],
    ratt: 2,
    forklaringar: ['Fel.', 'Fel. Det är projektledning.', 'Rätt.', 'Fel.'],
    forklaring: 'Ledarskap ger vision, förtroende och koppling till strategin.',
    kalla: 'F4a'
  },

  /* ============ Kapitel 10: Green BPM, process mining, AI ============ */
  {
    id: 'p10-01', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Varför har Green BPM inte slagit igenom som Houy et al. (2012) hoppades?',
    alternativ: [
      'Lagen förbjuder att hållbarhetsdata lagras i BPM-system',
      'BPM-verktygen saknar i regel inbyggt stöd för att lagra och analysera energi-, utsläpps- och resursdata i modellerna',
      'Agentisk AI har ersatt BPM',
      'Process mining kan inte hantera CO₂-data'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Dessutom sker redovisningen på organisationsnivå (GHG-protokollet, CSRD), inte per process.', 'Fel.', 'Fel.'],
    forklaring: 'Andra hinder: ingen standard som kopplar processteg till utsläppsfaktorer, och silos mellan hållbarhets- och processteam.',
    kalla: 'F4b; Houy et al. (2012)'
  },
  {
    id: 'p10-02', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Vad skiljer process mining från traditionell Jeston-BPM när man tar fram as-is?',
    alternativ: [
      'Process mining bygger på intervjuer och workshops',
      'Process mining visar hur processen faktiskt körs, utifrån händelseloggar i IT-systemen',
      'Process mining fångar även arbete som aldrig registreras i något system',
      'Process mining kräver ingen data'
    ],
    ratt: 1,
    forklaringar: ['Fel. Det är den traditionella metoden.', 'Rätt. "Hur fungerar processen egentligen?"', 'Fel. Den ser bara det som IT-systemen loggar.', 'Fel. Den kräver bra loggdata.'],
    forklaring: 'Tre förmågor: discovery, conformance checking, improvement.',
    kalla: 'F4b'
  },
  {
    id: 'p10-03', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Ett företag vill veta om medarbetarna faktiskt följer den godkända BPMN-modellen för reklamationer. Vilken process mining-förmåga behövs?',
    alternativ: ['Process discovery', 'Conformance checking', 'Process simulation', 'Activity-based costing'],
    ratt: 1,
    forklaringar: ['Fel. Den återskapar modellen ur loggarna.', 'Rätt. Den jämför verkligheten med den avsedda modellen.', 'Fel.', 'Fel.'],
    forklaring: 'Conformance checking visar avvikelser och regelbrott.',
    kalla: 'F4b'
  },
  {
    id: 'p10-04', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Vilken av följande är en av Rosemann et al:s (2024) tre drifts?',
    alternativ: [
      'Från konversation till transaktion',
      'Från autonomisering till automatisering',
      'Från transaktion till konversation',
      'Från sofistikering till förenkling'
    ],
    ratt: 2,
    forklaringar: ['Fel. Omvänt.', 'Fel. Omvänt.', 'Rätt.', 'Fel. Omvänt.'],
    forklaring: 'Transaktion → konversation, automatisering → autonomisering, förenkling → sofistikering.',
    kalla: 'F4b; Rosemann et al. (2024)'
  },
  {
    id: 'p10-05', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 3,
    fraga: 'Vad är skillnaden mellan automatisering och autonomisering enligt Rosemann et al.?',
    alternativ: [
      'Autonomisering är billigare',
      'Vid autonomisering fattar och ändrar maskinen beslut själv, utan att det är förutsägbart och testat i förväg av människor',
      'Autonomisering fungerar bara i molnet',
      'Det finns ingen egentlig skillnad'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Automatisering är designad och testad av människor och därmed förutsägbar.', 'Fel.', 'Fel.'],
    forklaring: 'Det är därför förklarbarhet blir viktigare — se BPMN och DMN.',
    kalla: 'F4b; Rosemann et al. (2024)'
  },
  {
    id: 'p10-06', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Hur kan BPMN och DMN hjälpa när beslut fattas automatiskt och måste kunna förklaras?',
    alternativ: [
      'De översätter beslut till naturligt språk',
      'De skapar automatiskt loggar över alla beslut',
      'De gör beslutsflödet visuellt och begripligt, så att man kan förklara varför ett beslut blev som det blev',
      'De gör besluten enklare genom att optimera processen'
    ],
    ratt: 2,
    forklaringar: ['Fel.', 'Fel.', 'Rätt.', 'Fel.'],
    forklaring: 'Viktigt t.ex. när en myndighet ska förklara ett beslut för en medborgare.',
    kalla: 'F4b'
  },
  {
    id: 'p10-07', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Vad är en grön SLA (gSLA) i Green BPM?',
    alternativ: [
      'Ett avtal om att bara använda förnybar el',
      'En servicenivå som även sätter tak för energi- och resursanvändning, t.ex. kWh per transaktion',
      'En certifiering för miljövänliga BPM-verktyg',
      'En policy om papperslösa processer'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt. Används i IT-tjänstehantering som ITIL.', 'Fel.', 'Fel.'],
    forklaring: 'Incidenthantering kan då även fånga avvikelser i hållbarhetsmått.',
    kalla: 'F4b; Houy et al. (2012)'
  },
  {
    id: 'p10-08', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 3,
    fraga: 'Vad är tanken bakom en Large Process Model (LPM) enligt Kampik et al. (2025)?',
    alternativ: [
      'Att ersätta processanalytikerna',
      'En samlad, datadriven kunskapsbas om processer som kan ge automatiserade förbättringsförslag',
      'Att styra alla processer med agentisk AI',
      'Att slippa dokumentera processer i BPMN'
    ],
    ratt: 1,
    forklaringar: ['Fel.', 'Rätt.', 'Fel.', 'Fel.'],
    forklaring: 'Begreppet förekom på HT25-omtentan.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'p10-09', delkurs: 'processer', amne: 'proc-perspektiv', typ: 'flerval', svarighet: 2,
    fraga: 'Vilket av följande är INTE ett av Reijers (2021) teman i BPM-forskningen?',
    alternativ: ['Process mining', 'Model management', 'Coordination and interoperability', 'Marknadsföringsstrategi'],
    ratt: 3,
    forklaringar: ['Fel — det är ett tema.', 'Fel — det är ett tema.', 'Fel — det är ett tema.', 'Rätt.'],
    forklaring: 'De sju: BPMS, modellering, design, samordning och interoperabilitet, model management, process mining, ny teknik.',
    kalla: 'Reijers (2021)'
  },

  /* ============ Essäfrågor (egna formuleringar av tentans teman) ============ */
  {
    id: 'p-essa-01', delkurs: 'processer', amne: 'proc-realize', typ: 'oppen', svarighet: 3,
    fraga:
      'Jeston (2022) menar att en stor del av BPM-arbetet — runt 60 procent — handlar om ' +
      'människor och kommunikation snarare än om modeller och teknik. Förklara varför den ' +
      'mänskliga sidan är så avgörande, och vad som riskeras om den nedprioriteras.',
    nyckelpunkter: [
      'Nämn att minst 60 % bör gå till förändringsledning och kommunikation',
      'Processer utförs av människor — en bra to-be ger inget om ingen ändrar sitt arbetssätt',
      'Able och willing: utbildning och motivation',
      'People change management är en av tre essentials som genomsyrar alla faser',
      'Risker: motstånd och rädsla, låg användning, uteblivna nyttor, återfall i gamla arbetssätt',
      'Koppla till BPR, som misslyckades bland annat för att medarbetarna inte togs med',
      'Motmedel: kommunikation i varje fas, ledarskap, quick wins, appreciative inquiry'
    ],
    modellsvar:
      'BPM är i grunden en förändring av hur människor arbetar, inte ett tekniskt projekt. ' +
      'Även en välgjord to-be-process ger ingen effekt om medarbetarna inte förstår, ' +
      'accepterar och använder den. Därför menar Jeston att minst 60 % av arbetet bör handla ' +
      'om förändringsledning och kommunikation, och people change management är en av 7FE:s ' +
      'tre essentials som ska genomsyra alla tio faser. Målet är att medarbetarna ska vara ' +
      'både able — kunna, genom utbildning — och willing — vilja, genom engagemang.\n\n' +
      'Riskerna med att nedprioritera detta syns redan i BPR-erfarenheterna på 90-talet: ' +
      'radikala, toppstyrda förändringar mötte starkt motstånd och blev ofta en ursäkt för ' +
      'nedskärningar. Utan kommunikation växer rädslan för nedskärningar, outsourcing och ' +
      'automatisering, nya processer och system används inte, nyttorna i business caset ' +
      'uteblir och organisationen faller tillbaka i gamla arbetssätt. Förtroendet för ' +
      'framtida BPM-arbete skadas också.\n\n' +
      '7FE bygger därför in kommunikation som ett steg i varje fas, betonar ledarskap på ' +
      'alla nivåer, använder quick wins för att visa värde tidigt och erkänna medarbetarnas ' +
      'bidrag, och förordar framåtblickande metoder som appreciative inquiry, där förändringen ' +
      'byggs på det som redan fungerar.',
    kalla: 'F4a; tema på tentan HT25'
  },
  {
    id: 'p-essa-02', delkurs: 'processer', amne: 'proc-teknik', typ: 'oppen', svarighet: 3,
    fraga:
      'Förklara Jestons princip att processer ska förbättras innan de automatiseras, och ' +
      'diskutera varför den är så central i BPM-arbetet.',
    nyckelpunkter: [
      'Automatisering förstärker befintliga förhållanden — effektivt blir effektivare, ineffektivt sämre',
      'Teknik är en möjliggörare, inte en lösning',
      'Koppla till produktivitetsparadoxen och Hammers "don’t automate, obliterate"',
      'Spreadsheet-testet som diagnos',
      'Risker: bortkastade investeringar, frustration, låg användning',
      'RPA som modernt exempel: en robot ärver den dåliga processens svagheter',
      'Livscykeln/7FE: förstå (as-is), analysera och designa om (to-be) före Develop'
    ],
    modellsvar:
      'Principen vilar på att automatisering förstärker det som redan finns. En effektiv ' +
      'process blir effektivare, men en ineffektiv process blir bara snabbare dålig — ' +
      'felen, dubbelarbetet och de onödiga stegen byggs in i ett system som dessutom är dyrt ' +
      'och svårt att ändra. Teknik är en möjliggörare, inte en lösning, och kan inte ' +
      'kompensera för dålig processdesign.\n\n' +
      'Insikten har djupa rötter. Produktivitetsparadoxen visade att IT ovanpå oförändrade ' +
      'processer inte gav ökad produktivitet, och Hammer formulerade samma sak som "don’t ' +
      'automate, obliterate". Jestons spreadsheet-test är en praktisk diagnos: bygger ' +
      'kritiska processer på kalkylblad har man täckt över problem i stället för att lösa ' +
      'grundorsaken, och processen behöver förbättras först.\n\n' +
      'I 7FE syns principen i ordningen mellan faserna: i Understand skapas en faktabaserad ' +
      'bild av nuläget och rotorsakerna, i Innovate designas to-be, och först i Develop byggs ' +
      'eventuell teknik — BPM kräver inte ens teknik. Hoppar man över detta riskerar man ' +
      'bortkastade investeringar, frustrerade medarbetare och system som inte används. RPA ' +
      'är ett modernt exempel: en robot som efterliknar en dålig manuell process ärver dess ' +
      'svagheter och blir dessutom skör.',
    kalla: 'F2; tema på tentan HT25'
  },
  {
    id: 'p-essa-03', delkurs: 'processer', amne: 'proc-foundations', typ: 'oppen', svarighet: 3,
    fraga:
      'Många organisationer har en genomtänkt strategi men lyckas ändå inte genomföra den. ' +
      'Förklara vad Jeston menar med "strategy execution void", och hur BPM och ' +
      '7FE-ramverket kan bidra till att stänga gapet.',
    nyckelpunkter: [
      'Definition: gapet mellan strategisk avsikt och förmågan att genomföra strategin',
      'Två komponenter: management effectiveness och operational efficiency',
      'Bara operativ effektivitet ger "different sameness"',
      'BPM-huset: blå, röd och grön zon',
      'Foundations: förstå strategin och skapa spårbarhet, Red Wine Test, TOM',
      'Processnivåer och processtyrning kopplar strategi till genomförande',
      'Samordnade program, överlämning och ägarskap, och kontinuerliga återkopplingsloopar'
    ],
    modellsvar:
      'Strategy execution void är gapet mellan vad organisationen vill uppnå strategiskt och ' +
      'dess förmåga att faktiskt genomföra det. Jeston menar att strategiformulering är svår ' +
      'men att genomförandet är svårare, och att det är där de flesta misslyckas. Gapet har ' +
      'två sammanhängande delar: management effectiveness — kvaliteten i ledningsprocesserna, ' +
      'styrningen och kulturen — och operational efficiency, kvaliteten i de operativa ' +
      'processerna. Satsar man bara på det operativa blir resultatet "different sameness": ' +
      'små förbättringar utan verklig förändring.\n\n' +
      'BPM kan stänga gapet genom att vara det strukturerade ramverk som binder ihop de två ' +
      'dimensionerna, den gröna zonen i BPM-huset. I Foundations hämtas strategin och ' +
      'spårbarhet byggs från strategi till BPM-program och aktiviteter; Red Wine Test ger en ' +
      'gemensam bild av framgång med tydligt ansvar; och Target Operating Model beskriver hur ' +
      'organisationens delar ska fungera. I Enablement kopplar processnivåerna 1–5 strategin ' +
      'till det dagliga arbetet, och processtyrning, prestationsstyrning och process assets ' +
      'ger ägarskap och mätbarhet.\n\n' +
      'Till sist behövs samordnade program mot flaskhalsarna, tydlig överlämning till linjen ' +
      'och kontinuerliga återkopplingsloopar mellan strategi och verksamhet, så att ' +
      'genomförandet följs upp och justeras — det Realize och Sustainability står för.',
    kalla: 'F3; tema på tentan HT25'
  },
  {
    id: 'p-essa-04', delkurs: 'processer', amne: 'proc-7fe', typ: 'oppen', svarighet: 3,
    fraga:
      'Jeston varnar för att använda samma BPM-upplägg överallt. Förklara vad BPM-mognad är ' +
      'och diskutera varför ett BPM-initiativ måste anpassas efter organisationens mognad, ' +
      'kultur och förutsättningar.',
    nyckelpunkter: [
      'BPM-mognad: hur långt organisationen kommit i att arbeta processorienterat',
      'Låg mognad gör BPM svårare; anpassa takten — för snabbt ökar risken att misslyckas',
      'Organisationer skiljer sig i kultur, ledarskap, processvana och befintliga grunder',
      'Scenarierna (under the radar … business as usual) styr hur strikt 7FE tillämpas',
      'Top-down och bottom-up efter situation; börja litet och växa',
      'Faser kan anpassas men bör inte hoppas över utan motivering',
      'Bedöm mognad och BPM-resa i Foundations steg 2'
    ],
    modellsvar:
      'BPM-mognad beskriver hur långt en organisation har kommit i att leda och förbättra ' +
      'verksamheten genom processer: finns processägarskap, processarkitektur, mätning och en ' +
      'kultur av kontinuerlig förbättring? Organisationer skiljer sig också i kultur, ' +
      'ledarskap och processvana. Vissa har redan vision, mål och processarkitektur på plats, ' +
      'andra börjar med splittrade insatser.\n\n' +
      'Därför fungerar inte one size fits all. Låg mognad gör BPM-insatserna svårare, och ' +
      'Jeston varnar för att gå fortare än mognaden tillåter eftersom risken att misslyckas ' +
      'då ökar. Ett företagsövergripande top-down-program i en organisation utan ' +
      'processtänkande möter motstånd och saknar förutsättningar, medan en mogen organisation ' +
      'kan ha BPM som business as usual. Implementeringsscenariot — från under the radar via ' +
      'pilot och in the driver’s seat till business as usual — avgör hur strikt och brett ' +
      '7FE tillämpas.\n\n' +
      'Anpassningen börjar i Foundations, där mognaden, BPM-resan hittills och arbetets ' +
      'bredd bedöms. Utifrån det väljs top-down, bottom-up eller en kombination, och man ' +
      'börjar hellre litet och växer, gärna med quick wins som bygger förtroende. Faser kan ' +
      'anpassas i djup och omfattning, men bör inte hoppas över utan god motivering.',
    kalla: 'F2; F3; tema på tentan HT25'
  }
]);
