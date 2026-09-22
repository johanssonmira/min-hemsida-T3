/* =========================================================================
   Kompendium – Processorienterad verksamhetsutveckling, kapitel 1–6
   (BPM som managementdisciplin: historia, livscykel, 7FE-ramverket)
   -------------------------------------------------------------------------
   Källor: 01_SYSB23_BPM_HT26.pdf (Föreläsning 1, Benjamin Weaver, 22 sep 2026),
   Jeston (2022) Business Process Management: Practical Guidelines to Successful
   Implementation (5th ed.) — via kursens fyra riktiga tentor (HT24 x2, HT25 x2),
   samt Hammer (1990) Reengineering Work: Don't Automate, Obliterate, HBR.

   En sak värd att vara medveten om: föreläsning 2–4 (som enligt kursöversikten
   går igenom 7FE-ramverket i detalj) fanns inte bland de filer som lästes in när
   det här kapitlet skrevs — bara föreläsning 1 och de fyra tentorna. Kapitel 3–5
   är därför byggda genom att extrahera varje begrepp som faktiskt förekommer i
   tentafrågorna och förklara det så exakt materialet tillåter, inte genom att
   återge bokens kapitelindelning ordagrant. Har du föreläsning 2–4 som PDF är
   det värt att skicka dem — då går det att skärpa det här ytterligare.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.processer = {
  delkurs: 'processer',
  titel: 'Processorienterad verksamhetsutveckling',
  intro:
    'Delkursen har två halvor som examineras på olika sätt. Den ena är **BPM som ' +
    'managementdisciplin** — historia, livscykel och Jestons 7FE-ramverk för att ' +
    'faktiskt driva ett BPM-initiativ. Den examineras på salstentan tillsammans med ' +
    'en andra del om **BPMN**, notationen för att rita processdiagram. BPMN examineras ' +
    'dessutom praktiskt genom en gruppuppgift där ni visualiserar en verksamhetsprocess.\n\n' +
    '> **Tentan:** ett fåtal essäfrågor (inte om BPMN) plus 10–15 flervalsfrågor som ' +
    'täcker båda delarna, rätt svar ger poäng (anges per fråga i BPMN-delen), fel svar ' +
    '−1 p, obesvarat 0 p.\n\n' +
    'Kapitel 1–6 här täcker BPM-delen. Kapitel 7–10 (i nästa fil) täcker BPMN.',
  kapitel: []
};

window.SYSB23.kompendium.processer.kapitel.push(

/* ====================== KAPITEL 1 ====================== */
{
  id: 'proc-k1',
  nr: 1,
  titel: 'BPM: definition, historia och drivkrafter',
  ingress: 'Vad BPM faktiskt är enligt Jeston, och de tio–femton årens strömningar som ledde fram till att det blev ett eget fält.',
  lastid: 9,
  amnen: ['proc-intro'],
  avsnitt: [
    {
      rubrik: 'Vad BPM inte är',
      text:
        'Jeston (2022) är tydlig med att avfärda två vanliga missuppfattningar innan han ' +
        'ger sin egen definition:\n\n' +
        '- BPM är **inte** en mjukvarusvit eller viss teknik\n' +
        '- BPM är **inte** bara modellering av processer\n\n' +
        '> **BPM är implementeringen, exekveringen och styrningen (governance) av ' +
        'processer.**\n\n' +
        'Det är skillnaden mellan att rita ett diagram och att faktiskt förändra hur ' +
        'organisationen arbetar. Ett vackert BPMN-diagram som ingen använder är inte BPM — ' +
        'det är en bild.'
    },
    {
      rubrik: 'Två sätt att beskriva BPM',
      text:
        'Kursen skiljer på ett **industriperspektiv** (Gartner, CIO.com, Wikipedia — hur ' +
        'BPM beskrivs i praktiken) och ett **akademiskt perspektiv**: BPM som en ' +
        '**livscykel** med sju steg — identifiering, modellering, kartläggning av ' +
        'nuläget (as-is), analys, omdesign (to-be), implementering och löpande ' +
        'övervakning. Det akademiska perspektivet är kapitel 2:s ämne.\n\n' +
        'Svenska termer är inte helt inarbetade. Vanligast är **verksamhetsprocess­hantering** ' +
        'eller **affärsprocesshantering** för BPM. Håll isär tre närliggande begrepp: ' +
        '**BPM** (metod och styrning), **BPA** (Business Process Automation — ' +
        'processautomatisering) och **RPA** (Robotic Process Automation — mjukvarurobotar ' +
        'som efterliknar en människas klick i ett gränssnitt).'
    },
    {
      rubrik: 'Produktivitetsparadoxen — samma problem som i Strategi',
      text:
        'Om du läser Strategi och ekonomistyrning parallellt känner du igen det här: på ' +
        '70- och 80-talet syntes IT-investeringar **inte** i produktivitetsstatistiken. ' +
        'Robert Solow, 1987:\n\n' +
        '> "You can see the computer age everywhere but in the productivity statistics."\n\n' +
        'Förklaringen som växte fram under 90-talet var att teknik som läggs ovanpå ' +
        '**oförändrade processer** inte ger någon effekt. Det öppnade för en hel våg av ' +
        'managementtrender som alla, på olika sätt, försökte lösa paradoxen genom att ' +
        'angripa själva processerna: **ERP, CRM, supply chain management, Total Quality ' +
        'Management, Kaizen/Lean/Six Sigma, Just-in-Time, kunskapshantering, ' +
        'datalagerhantering, outsourcing** — och **Business Process Reengineering (BPR)**, ' +
        'BPM:s mest direkta föregångare.'
    },
    {
      rubrik: 'Business Process Reengineering — BPM:s hetlevrade föregångare',
      text:
        'Michael Hammers artikel från 1990, "Reengineering Work: Don\'t Automate, ' +
        'Obliterate", formulerade tesen som satte igång 90-talets BPR-våg:\n\n' +
        '> "Instead of embedding outdated processes in silicon and software, we should ' +
        'obliterate them and start over. We should \'reengineer\' our businesses: use the ' +
        'power of modern IT to radically redesign our business processes in order to ' +
        'achieve dramatic improvements…"\n\n' +
        'Poängen är skarp: att automatisera en dålig process ger dig en **snabbare dålig ' +
        'process**. Hammers mest citerade exempel är Fords leverantörsreskontra, där ' +
        'hela avstämningssteget mellan följesedel, order och faktura togs bort i stället ' +
        'för att effektiviseras — antalet anställda i avdelningen minskade med tre ' +
        'fjärdedelar. IBM Credit är ett annat klassiskt exempel: genom att ersätta en kedja ' +
        'av specialister med en enda generalist per ärende kortades handläggningstiden ' +
        'från en vecka till några timmar.\n\n' +
        '**BPR gick för långt.** Kursen sammanfattar det som "good BPR" och "bad BPR":\n\n' +
        '| BPR bra | BPR dåligt |\n' +
        '| --- | --- |\n' +
        '| Utmanade tanken att gamla arbetssätt måste bestå | Radikala top-down-projekt: dyra, ' +
        'komplexa, hög risk |\n' +
        '| Första trenden att fokusera på icke-produktionsprocesser (order, ' +
        'kundservice) | Tidiga framgångssagor visade sig vara kortsiktiga |\n' +
        '| Satte IT och människor i centrum, bröt ner silos | Blev ursäkt för nedskärningar ' +
        'i stället för att "empowra" medarbetare |\n' +
        '| | Underskattade motstånd från medarbetare och IT-avdelningar |\n\n' +
        'BPM växte fram som en **mognare, mindre disruptiv efterföljare** till BPR — agil ' +
        'och kontinuerlig i stället för monolitisk och engångsradikal.'
    },
    {
      rubrik: 'Två rötter möts: amerikansk affärstänkning och europeisk formell modellering',
      text:
        'Parallellt med den amerikanska managementutvecklingen pågick ett helt annat spår ' +
        'i Europa (särskilt Tyskland och Nederländerna): **formell matematisk modellering ' +
        'av dynamiska arbetsflöden**, med **Petri-nät** (Carl Adam Petri, 1962) som ' +
        'grundverktyg för att beskriva processflöde och parallellitet i datorsystem. Det ' +
        'akademiska spåret introducerade den **visuella representationen** av formella ' +
        'modeller som processdiagram — en direkt föregångare till BPMN.\n\n' +
        '**BPM som eget fält föddes 1998–2003**, när dessa två spår möttes: amerikansk ' +
        'affärsprocesstänkning och europeisk akademisk workflow-modellering. Den ' +
        'första BPM-konferensen hölls i Eindhoven 2003 (van der Aalst et al.).'
    },
    {
      rubrik: 'Drivkrafter som gjorde BPM till mainstream',
      text:
        'Tre ytterligare krafter drev igenom BPM som ledningsstandard i början av 2000-talet:\n\n' +
        '- **ISO 9000:2000** krävde processdokumentation för kvalitetsledning\n' +
        '- **Enron-skandalen 2001** ledde till **Sarbanes-Oxley (SOX) 2002**, som krävde ' +
        'rigorös, granskningsbar dokumentation av alla processer kopplade till finansiell ' +
        'rapportering — och BPM gav de metoder, verktyg och notationer (t.ex. BPMN) som ' +
        'gjorde det görbart\n' +
        '- **BPMS (Business Process Management Systems)** och **SOA (Service-Oriented ' +
        'Architecture)** gjorde det tekniskt möjligt att exekvera och övervaka processer ' +
        'över flera system\n\n' +
        'Smith och Fingar (2003) sammanfattade BPM:s mognad som en rörelse bort från det ' +
        'monolitiska och disruptiva: **agilt och lean** i stället för allt-på-en-gång, ' +
        '**kontinuerlig förbättring** i stället för toppstyrd revolution, och en ' +
        '**enhetlig ansats** som integrerar teknik, ledning och människor mot en ' +
        'uthållig konkurrensfördel.'
    },
    {
      rubrik: 'Från BPM till RPA till agentisk AI',
      text:
        'BPM:s historia stannar inte vid 2003. Kursens tidslinje fortsätter:\n\n' +
        '- **2010-talet:** "Digital transformation" — BPM-sviter blir orkestreringsplattformar ' +
        '(iBPMS, intelligent BPMS). Termen "BPM" används mindre i marknadsföring till förmån ' +
        'för processorkestrering, Digital Process Automation (DPA) och process mining.\n' +
        '- **2015–2022:** **RPA (Robotic Process Automation)** dominerar. Mjukvarurobotar ' +
        '("bots") efterliknar hur en människa klickar i ett gränssnitt. Low-code/no-code ' +
        'gör det möjligt för icke-tekniska medarbetare att bygga egna bots.\n' +
        '- **I dag:** allt omdöps till "AI", men BPM-tänkandet ligger kvar under ytan — ' +
        'agentisk AI, bot-orkestrering, LLM-copiloter för processförbättring, AI-assisterad ' +
        'modellering. Visionen (ännu inte verklighet) är att AI-agenter kör hela ' +
        'verksamhetsflöden, fattar strategiska beslut längs vägen, och att strategi och ' +
        'processer justerar sig själva med minimal mänsklig inblandning.\n\n' +
        'Jestons "hype cycle" (en tidslinje snarare än en riktig hypcykel) placerar BPR:s ' +
        'topp och besvikelse i tidiga 90-talet, BPM:s mognad genom 2000-talet, och dagens ' +
        'AI-agenter som nästa våg på samma linje.'
    }
  ],
  nyckelbegrepp: [
    'BPM = implementering, exekvering och styrning av processer — inte bara mjukvara eller modellering',
    'Produktivitetsparadoxen (Solow 1987): IT ovanpå oförändrade processer ger ingen effekt',
    'BPR (Hammer 1990): "obliterate, don\'t automate" — radikal omdesign, inte snabbare gamla processer',
    'BPR gick för långt: dyrt, riskabelt, blev ursäkt för nedskärningar — BPM är den mognare efterföljaren',
    'BPM föds 1998–2003 ur mötet mellan amerikansk affärstänkning och europeisk Petri-nätsmodellering',
    'SOX (2002) och ISO 9000:2000 drev igenom processdokumentation som standard',
    'BPM → RPA (2015–2022) → agentisk AI: samma tänkande, nya verktyg'
  ],
  tentakoppling:
    'Flera flervalsfrågor på både HT24- och HT25-tentorna testar just varför BPR misslyckades ' +
    '(för radikalt, för kostsamt, för stort motstånd — inte att det saknade IT-koppling) och ' +
    'vad som är BPM:s "primära syfte" (att anpassa processer efter strategi, inte att byta ' +
    'teknik eller sänka alla kostnader).'
},

/* ====================== KAPITEL 2 ====================== */
{
  id: 'proc-k2',
  nr: 2,
  titel: 'BPM-livscykeln och normativ litteratur',
  ingress: 'De sju stegen i det akademiska BPM-perspektivet, och varför Jestons bok läses annorlunda än en forskningsartikel.',
  lastid: 8,
  amnen: ['proc-livscykel'],
  avsnitt: [
    {
      rubrik: 'BPM-livscykelns sju steg',
      text:
        'Det akademiska perspektivet på BPM beskriver arbetet som en cykel, inte ett ' +
        'engångsprojekt:\n\n' +
        '1. **Process identification** — processarkitektur, vilka processer finns och ' +
        'vilka ska prioriteras\n' +
        '2. **Process modelling** — rita processen i BPMN\n' +
        '3. **Process discovery** — kartlägg **as-is**, hur processen faktiskt fungerar i dag\n' +
        '4. **Process analysis** — hitta flaskhalsar, väntetider, onödiga hand-offs\n' +
        '5. **Process redesign** — designa **to-be**, den önskade framtida processen\n' +
        '6. **Process implementation** — exekverbara modeller, ofta i ett BPMS\n' +
        '7. **Process monitoring** — mät och håll koll, vilket ofta leder tillbaka till ' +
        'steg 1\n\n' +
        'Skillnaden mellan **as-is** och **to-be** är en av de mest tentanära ' +
        'distinktionerna i hela delkursen: as-is är en beskrivning, to-be är ett beslut. ' +
        'Att identifiera **gapet mellan as-is och to-be** hör till analysfasen.'
    },
    {
      rubrik: 'Normativ managementlitteratur kontra forskningslitteratur',
      text:
        'Jestons bok är ett exempel på **normativ managementlitteratur**, och kursen är ' +
        'noga med att du ska kunna skilja den sortens text från en forskningsartikel som ' +
        'Reijers (2021) eller Houy et al. (2012):\n\n' +
        '| | Normativ litteratur (Jeston) | Forskningslitteratur |\n' +
        '| --- | --- | --- |\n' +
        '| Mål | Berätta för chefer **vad de ska göra** för att lyckas | Förstå **varför och ' +
        'hur** organisationer beter sig som de gör |\n' +
        '| Sanningskriterium | "Fungerar det för chefer?" | "Stöds påståendet av systematisk ' +
        'evidens eller resonemang?" |\n' +
        '| Inriktning | Föreskrivande — modeller, steg, best practices | Beskrivande och ' +
        'analytisk |\n' +
        '| Publik | Chefer, konsulter, studenter | Forskare, beslutsfattare |\n' +
        '| Hur du bör läsa den | Under vilka förutsättningar gäller det här? Vad är evidensen ' +
        'bakom exemplet? | Hur generaliserbart är resultatet? Korrelation ≠ kausalitet |\n\n' +
        'Poängen är inte att normativ litteratur är sämre — den fyller **gapet mellan att ' +
        'veta och att göra** genom tumregler som är "tillräckligt bra" för att vägleda ' +
        'handling, även om de inte är universellt giltiga. Men den kräver **kritisk ' +
        'reflektion**: du ska kunna fråga dig under vilka förutsättningar ett Jeston-råd ' +
        'faktiskt gäller.'
    },
    {
      rubrik: 'Jestons avmystifiering av BPM',
      text:
        'Ett återkommande grepp i Jestons bok är att ställa en vanlig missuppfattning mot ' +
        'verkligheten:\n\n' +
        '- *"BPM är bättre än tidigare processförbättringsansatser"* → BPM är moget och ' +
        'väletablerat, men beror **fortfarande** på engagemang från ledning och medarbetare ' +
        'för att lyckas.\n' +
        '- *"BPM bygger på viss teknik eller mjukvarusvit"* → Det finns bra teknikstöd, men ' +
        'lyckad BPM är **inte** beroende av en specifik lösning.\n' +
        '- *"BPM har en robust metodik"* → Det finns bara ett fåtal beprövade metodiker ' +
        '(Jestons är förmodligen en av dem) — **gör inte ett eget DIY-upplägg**.\n' +
        '- *"BPM är enkelt"* → Nej. Det är komplext, och därför ska man **börja litet och ' +
        'expandera** snarare än gå all-in direkt.\n' +
        '- *"BPM kräver externa konsulter"* → Beror på organisationens BPM-mognad och ' +
        'kompetens — konsulter kan hjälpa mycket, men är inget krav.'
    }
  ],
  nyckelbegrepp: [
    'BPM-livscykeln: identification → modelling → discovery (as-is) → analysis → redesign (to-be) → implementation → monitoring',
    'As-is = hur processen fungerar i dag, to-be = den önskade framtida processen',
    'Normativ litteratur (Jeston) föreskriver vad chefer bör göra; forskningslitteratur beskriver och testar varför',
    'BPM är moget men inte "enkelt" — börja litet, konsulter är valfria, ingen universallösning'
  ],
  tentakoppling:
    'Vilken fas av "BPM life cycle" som identifierar gapet mellan as-is och to-be (svar: ' +
    'process analysis) har förekommit ordagrant på HT24-tentan.'
},

/* ====================== KAPITEL 3 ====================== */
{
  id: 'proc-k3',
  nr: 3,
  titel: '7FE-ramverket: faser och artefakter',
  ingress: 'Jestons metodik för att faktiskt driva ett BPM-initiativ, och de konkreta verktyg som hör till varje steg.',
  lastid: 10,
  amnen: ['proc-7fe'],
  avsnitt: [
    {
      rubrik: 'Vad "7FE" står för',
      text:
        'Jestons metodik heter 7FE Process Framework. Enligt en av tentafrågorna (HT24) ' +
        'består ramverkets **essentiella komponenter** av: **Foundations, Findings and ' +
        'Solutions, Fulfilment, Future**, samt de tre stödjande enablerna **Leadership, ' +
        'People Change Management** och **Business Process Project Management**. ' +
        'Alliterationen (fyra F-ord) är själva minnesknepet i namnet "7FE".\n\n' +
        'Praktiskt organiseras arbetet kring **faser** som återkommer i tentafrågor under ' +
        'egna namn: **Foundation(s)**, **Launch**, **Understand**, **Innovate**, ' +
        '**Execution/Develop/Implement**, **Realize (value)** och **Sustainability/' +
        'Follow-up**, med **Evaluation** och **Enablement** som löpande, styrande ' +
        'inslag genom hela arbetet snarare än enskilda engångssteg.\n\n' +
        '> Den här strukturen är rekonstruerad ur kursens fyra riktiga tentor, inte ur ' +
        'bokens eget register — har du föreläsningsslides 2–4 eller Jeston-kapitlen ' +
        'själva är det värt att jämföra mot dem.'
    },
    {
      rubrik: 'Foundations — grunden BPM-arbetet vilar på',
      text:
        'Foundations-fasen handlar om att komma överens om komponenterna i den ' +
        '**target operating model (TOM)** och en uppsättning styrande principer för hur ' +
        'organisationen ska hantera sina processer. En **Target Operating Model** är en ' +
        'övergripande beskrivning av **hur organisationens olika delar ska fungera i ' +
        'framtiden** för att BPM-implementeringen ska lyckas — inte en detaljerad karta ' +
        'över nuläget, och inte bara en IT-arkitekturbild.'
    },
    {
      rubrik: 'Launch — att välja var man börjar',
      text:
        'Launch-fasen (eller "Launch Pad") har tre huvudsakliga utfall:\n\n' +
        '1. **val av var** den första (eller nästa) BPM-aktiviteten ska starta i ' +
        'organisationen\n' +
        '2. **överenskommelse om processmål och/eller vision** när processerna väl är valda\n' +
        '3. **etablering** av den valda aktiviteten\n\n' +
        'Det är här man avgör **hur** BPM-arbetet ska drivas: top-down (för strategiskt ' +
        'viktiga, tvärfunktionella förändringar som kräver mandat och samordning över hela ' +
        'organisationen) eller bottom-up (lokala, små förbättringar för att bygga momentum ' +
        'när ledningen inte är engagerad och strategin är oklar).'
    },
    {
      rubrik: 'Understand — kartlägg innan du designar',
      text:
        'I **Understand-fasen** är huvudsyftet med modellering **inte** att direkt ' +
        'producera automatiseringsklara processbeskrivningar eller detaljerade KPI:er. ' +
        'Syftet är att få fram **en gemensam, faktabaserad bild av hur processen faktiskt ' +
        'fungerar i dag**, som underlag för att analysera hur den kan optimeras.\n\n' +
        'Ett centralt verktyg här är **process asset**: ett vidare begrepp än en ren ' +
        'processmodell. En processmodell beskriver en specifik sekvens av aktiviteter — ' +
        'en process asset innehåller **dessutom** regler, ägarskap, risker, IT-stöd och ' +
        'dokumentationskrav. Uppstår en incident kopplad till en process, är det process ' +
        'asseten (inte bara diagrammet) man vänder sig till för att förstå steg, regler, ' +
        'ansvar och beslutspunkter.'
    },
    {
      rubrik: 'Red Wine Test — att formulera framgång innan man är där',
      text:
        'Ett av Jestons mer konkreta workshop-verktyg. I ett **Red Wine Test** ombeds ' +
        'deltagarna föreställa sig att BPM-projektet redan är genomfört, och beskriva hur ' +
        'organisationens **framtida tillstånd** ser ut — informellt, som om man satt med ' +
        'ett glas rödvin och pratade om hur bra allt blivit ("kunderna får sina ärenden ' +
        'lösta i ett steg", "medarbetarna är engagerade", "vi har bättre tvärfunktionellt ' +
        'samarbete"). Syftet är att skapa **ett gemensamt narrativ om hur framgång ser ut** ' +
        '— inte att kartlägga nuläget (det är Understand-fasens jobb) och inte att ta fram ' +
        'detaljerade to-be-modeller.'
    },
    {
      rubrik: 'Quick wins',
      text:
        'En **quick win** är en förbättring som kan genomföras **snabbt, utan stora ' +
        'kostnader, och som ger omedelbar effekt** i en verksamhetsprocess. Poängen med ' +
        'att medvetet leta efter quick wins tidigt i ett BPM-initiativ är att bygga ' +
        'momentum och trovärdighet innan de större, mer tidskrävande förändringarna ' +
        'genomförs — motsatsen till att en quick win skulle kräva omfattande ' +
        'förstudiearbete eller minska behovet av workshops.'
    },
    {
      rubrik: 'Realize och Sustainability — att inte tappa värdet man skapat',
      text:
        '**Realize (value)**-fasen säkerställer att de nyttoeffekter som beskrevs i business ' +
        'caset faktiskt **realiseras** — inte bara att processerna är designade eller ' +
        'implementerade, utan att den utlovade nyttan verkligen kommer organisationen ' +
        'till del.\n\n' +
        '**Sustainability** (Follow-up) handlar om att processförbättringarna inte bara ' +
        'ska **implementeras och kommuniceras**, utan fortsätta ha **styrning (governance) ' +
        'och kontinuerlig förbättring** efter att projektet formellt är avslutat. Att tro ' +
        'att uppföljning blir onödig bara för att en utvärdering visat att målen uppnåtts ' +
        'är precis den fällan tentan varnar för — BPM är en cykel, inte ett engångsprojekt ' +
        '(jämför kapitel 2).'
    }
  ],
  nyckelbegrepp: [
    '7FE:s fyra F: Foundations, Findings and Solutions, Fulfilment, Future — plus enablerna Leadership, People Change Management, Business Process Project Management',
    'Target Operating Model (TOM) = övergripande bild av hur organisationen ska fungera i framtiden, inte en as-is-karta',
    'Understand-fasens modellering ska skapa en gemensam bild av nuläget — inte automatiseringsklara modeller eller KPI:er',
    'Process asset = processmodell + regler, ägarskap, risker, IT-stöd och dokumentationskrav',
    'Red Wine Test = föreställ dig att projektet redan lyckats, formulera det gemensamma narrativet om framgång',
    'Quick win = snabb, billig förbättring med omedelbar effekt — bygger momentum tidigt',
    'Sustainability/Follow-up är aldrig "klart" bara för att Evaluation visat gott resultat — kontinuerlig styrning krävs'
  ],
  tentakoppling:
    'Det här kapitlet är troligen det mest tentatäta i hela delkursen — nästan hälften av ' +
    'HT24-tentans 50 frågor rör en enskild 7FE-fas eller -artefakt. Läs varje avsnitt två ' +
    'gånger och öva särskilt på att skilja näraliggande faser åt (Foundations mot Launch, ' +
    'Realize mot Sustainability).'
},

/* ====================== KAPITEL 4 ====================== */
{
  id: 'proc-k4',
  nr: 4,
  titel: 'Att starta och driva BPM-arbete',
  ingress: 'Vad som får ett BPM-initiativ att börja över huvud taget, och de fyra sätt Jeston beskriver att det faktiskt brukar se ut i praktiken.',
  lastid: 7,
  amnen: ['proc-implementering'],
  avsnitt: [
    {
      rubrik: 'Drivers och triggers',
      text:
        'Två begrepp som lätt blandas ihop, men som betyder olika saker:\n\n' +
        '- En **driver** är en **långsiktig, strategisk motivator** för BPM — en ' +
        'bakomliggande anledning till att organisationen alls bryr sig om sina processer ' +
        '(t.ex. konkurrenstryck, regulatoriska krav, digitaliseringsstrategi).\n' +
        '- En **trigger** är en **specifik händelse eller ett specifikt villkor** som ' +
        'utlöser omedelbar handling — ett akut problem eller en möjlighet som gör att man ' +
        'agerar just nu.\n\n' +
        'Skillnaden är alltså tidsperspektiv och konkretion, inte "intern kontra extern" ' +
        'eller "mätbar kontra symbolisk" (två vanliga men felaktiga distraktorer på ' +
        'tentafrågor om detta).'
    },
    {
      rubrik: 'Business-issue-led kontra strategy-led',
      text:
        'Ett BPM-initiativ kan starta på två principiellt olika nivåer:\n\n' +
        '- **Business-issue-led** — initiativet drivs av ett **operativt eller ' +
        'verksamhetsnära problem** hos en avdelning eller enhet. Beslutet fattas alltså ' +
        'på en **lägre organisatorisk nivå** än strateginivån.\n' +
        '- **Strategy-led** — initiativet härleds direkt ur den övergripande strategin, ' +
        'och drivs top-down.\n\n' +
        'När förändringen är **strategiskt viktig och tvärfunktionell** (t.ex. en myndighet ' +
        'som måste anpassa sig till nya nationella regler som berör hela verksamheten) ' +
        'rekommenderar Jeston att man driver arbetet **top-down**, för att säkerställa ' +
        'styrning, mandat och samordning över organisationsgränserna — inte att man väntar, ' +
        'decentraliserar beslutet till varje avdelning, eller kör ett rent bottom-up-upplägg.'
    },
    {
      rubrik: 'Fyra implementeringsscenarier',
      text:
        'Jeston beskriver flera typiska sätt BPM-arbete faktiskt uppstår och pågår i en ' +
        'organisation, bland dem:\n\n' +
        '- **Business as usual** — BPM är en etablerad, löpande del av hur organisationen ' +
        'redan arbetar, inte ett separat projekt.\n' +
        '- **Under the radar** — enskilda medarbetare (t.ex. ett par ' +
        'processanalytiker på en HR-avdelning) börjar kartlägga och förbättra sina egna ' +
        'processer på eget initiativ. Ledningen känner till det men har inte prioriterat ' +
        'eller formellt finansierat det — arbetet sker sporadiskt, utan budget eller ' +
        'formell styrning.\n' +
        '- **Pilot project** — ett avgränsat, tidsbegränsat försök innan man skalar upp.\n' +
        '- **In the driver\'s seat** — organisationen (eller en specifik roll) har ' +
        'tydligt och aktivt tagit kontroll över och driver BPM-arbetet.\n\n' +
        'Att kunna para ihop ett scenariobeskrivet case (som i exempel ovan) med rätt ' +
        'etikett är en återkommande frågetyp på tentan.'
    },
    {
      rubrik: 'BPM-mognad — one size fits all fungerar inte',
      text:
        'Jestons genomgående budskap är att BPM-arbete **måste anpassas** efter ' +
        'organisationens **mognadsgrad, kultur och förutsättningar** — det finns ingen ' +
        'universallösning. En organisation som aldrig arbetat processorienterat behöver ' +
        'ett annat angreppssätt än en som redan har etablerad governance, KPI-uppföljning ' +
        'och processägarskap på plats. Det är samma tanke som ligger bakom att börja litet ' +
        'och expandera (kapitel 2) och bakom valet mellan top-down och bottom-up ovan: ' +
        'metodiken är robust, men **appliceringen** måste vara situationsanpassad.'
    }
  ],
  nyckelbegrepp: [
    'Driver = långsiktig strategisk motivator, trigger = specifik händelse som utlöser handling nu',
    'Business-issue-led = initiativ från lägre organisatorisk nivå, strategy-led = härlett direkt ur strategin',
    'Strategiskt viktiga, tvärfunktionella förändringar bör drivas top-down för styrning och samordning',
    'Fyra implementeringsscenarier: business as usual, under the radar, pilot project, in the driver\'s seat',
    'BPM-mognad avgör hur ett initiativ bör läggas upp — ingen universallösning'
  ],
  tentakoppling:
    '"Under the radar" har förekommit som facit till ett scenario om två processanalytiker ' +
    'som kartlägger sina egna processer utan formell styrning — ett exempel värt att kunna ' +
    'känna igen i omvänd riktning också.'
},

/* ====================== KAPITEL 5 ====================== */
{
  id: 'proc-k5',
  nr: 5,
  titel: 'Leadership och people change management',
  ingress: 'Varför BPM-husets grund inte är teknik utan människor, och det förändringsledningsgrepp kursen lyfter fram särskilt.',
  lastid: 6,
  amnen: ['proc-forandring'],
  avsnitt: [
    {
      rubrik: 'BPM-huset: flera lager, inte ett enda golv',
      text:
        'Jeston illustrerar BPM med en **husmetafor**: BPM består av flera lager som ' +
        'tillsammans skapar en effektiv organisation — från strategiska grunder ' +
        '(fundament) upp till operativa och innovativa processer. Poängen med metaforen ' +
        'är att BPM **inte** ska ses som ett enskilt projekt eller som något man bygger ' +
        'stegvis rent tekniskt enligt en arkitekturplan. Det är en organisatorisk ' +
        'struktur som måste bäras upp av flera samverkande delar samtidigt, inte en ' +
        'checklista man bockar av uppifrån och ner.\n\n' +
        'Byggstenarna som håller huset uppe (enligt "the house metaphor") inkluderar ' +
        'ramverk för **processtransformation, people change management** och ' +
        '**benefits realization/processförbättring** — utan alla tre delar riskerar ' +
        'huset att kollapsa, oavsett hur bra själva processdesignen är.'
    },
    {
      rubrik: '60 % av arbetet är kommunikation, inte teknik',
      text:
        'En av kursens mest citerade siffror: Jeston framhåller att **omkring 60 % av ' +
        'arbetet** i ett BPM-initiativ handlar om **kommunikation och mänskliga aspekter** ' +
        '— inte om teknik eller modellering. Riskerna med att inte prioritera detta är ' +
        'konkreta: motstånd från medarbetare, uteblivet adoption av nya arbetssätt, och att ' +
        'processer som ser bra ut på papper aldrig faktiskt används i praktiken (jämför ' +
        'BPR:s misslyckanden i kapitel 1 — teknisk elegans utan förankring räcker inte).'
    },
    {
      rubrik: 'Leadership som stödjande komponent',
      text:
        '**Leadership** i 7FE-sammanhang handlar specifikt om att organisationens ledare ' +
        'ger det **stöd och den vägledning** som krävs för att BPM-aktiviteten och ' +
        'organisationen ska vara i linje med varandra och leverera rätt affärsutfall — ' +
        'inte om att detaljstyra resurser, budget och tidsplaner (det är snarare **Business ' +
        'Process Project Management**s roll) och inte specifikt om att säkerställa att alla ' +
        'intressenter är villiga att bidra till lösningen (det ligger närmare **People ' +
        'Change Management**s ansvar).'
    },
    {
      rubrik: 'Appreciative inquiry — bygg på det som fungerar',
      text:
        '**Appreciative inquiry** är den förändringsledningsansats kursen lyfter fram. Den ' +
        'skiljer sig markant från en traditionell problemlösningsansats:\n\n' +
        '| Appreciative inquiry | Traditionell problemfokusering |\n' +
        '| --- | --- |\n' +
        '| Fokuserar på **vad som fungerar** | Fokuserar på vad som är fel |\n' +
        '| Söker **rotorsaker till framgång** | Söker rotorsaker till misslyckanden |\n' +
        '| Hinder behandlas som **möjligheter att lära av** | Hinder behandlas som barriärer |\n\n' +
        'Logiken är att organisationer och människor förändras mer hållbart genom att ' +
        'förstärka det som redan fungerar än genom att jaga fel — vilket kopplar direkt ' +
        'tillbaka till Red Wine Test i kapitel 3, som bygger på samma framåtblickande, ' +
        'positiva grundidé.'
    }
  ],
  nyckelbegrepp: [
    'BPM-huset: flera samverkande lager (strategi, people change management, benefits realization) — inte ett enskilt projekt',
    'Cirka 60 % av BPM-arbetet handlar om kommunikation och människor, inte teknik',
    'Leadership säkerställer att BPM-aktiviteten och organisationen är i linje och levererar rätt utfall',
    'Appreciative inquiry: fokusera på vad som fungerar och rotorsaker till framgång, inte på fel och barriärer'
  ],
  tentakoppling:
    'En av HT25:s essäfrågor bygger direkt på 60-procentssiffran: varför de mänskliga delarna ' +
    'är avgörande för att BPM-arbete ska lyckas, och vilka risker som uppstår om de ' +
    'nedprioriteras. Öva på att svara med konkreta risker (motstånd, uteblivet adoption), ' +
    'inte bara "det är viktigt med kommunikation".'
},

/* ====================== KAPITEL 6 ====================== */
{
  id: 'proc-k6',
  nr: 6,
  titel: 'Processoptimering: från BPR till agentisk AI',
  ingress: 'De konkreta lösningarna Jeston räknar upp när en process väl ska förbättras, och varför RPA sällan skalar som utlovat.',
  lastid: 7,
  amnen: ['proc-optimering'],
  avsnitt: [
    {
      rubrik: 'Processoptimeringslösningar',
      text:
        'När analysfasen (kapitel 2) har identifierat vad som behöver förbättras, räknar ' +
        'Jeston upp en uppsättning konkreta **processoptimeringslösningar** att välja ' +
        'mellan: **process redesign, outsourcing, shared services, RPA** och ' +
        '**molntjänster (cloud computing)**. Det här är en annan sorts lista än ' +
        'perspektiven "integration-centric / human-centric / customer-centric BPM" ' +
        '(som beskriver **vilket fokus** ett initiativ har) eller enablerna "leadership, ' +
        'project management, people change management" (som är **stödjande komponenter**, ' +
        'inte optimeringslösningar i sig).'
    },
    {
      rubrik: 'Customer-centric mot andra BPM-perspektiv',
      text:
        'Ett BPM-initiativ kan drivas med olika tyngdpunkt. Fokuserar arbetet på att kunder ' +
        'ska få snabbare svar, färre överlämningar mellan avdelningar (hand-offs) och en ' +
        'tydlig kontaktpunkt, dominerar ett **customer-centric** perspektiv — till skillnad ' +
        'från ett **system-centric** perspektiv (fokus på IT-integration) eller ett ' +
        '**employee-centric** perspektiv (fokus på medarbetarupplevelsen).'
    },
    {
      rubrik: 'Varför RPA sällan skalade som utlovat',
      text:
        'RPA byggde sitt löfte på att vara enkelt: mjukvarurobotar som klickar sig igenom ' +
        'samma gränssnitt en människa skulle använt, utan att kräva ny systemintegration. ' +
        'Den tekniska begränsningen som gjorde att många initiala RPA-case **inte skalade** ' +
        'är precis den egenskapen: **RPA arbetar via UI-interaktioner, inte robusta ' +
        'systemintegrationer**, vilket gör lösningarna sköra — ett litet gränssnittsbyte i ' +
        'det underliggande systemet kan slå ut en hel bot. Det var alltså inte brist på ' +
        'molnstöd, API-integrationer eller kodningskompetens som var flaskhalsen, utan ' +
        'själva arkitekturvalet att simulera en användare i stället för att integrera ' +
        'direkt mot systemen.'
    },
    {
      rubrik: 'Agentisk AI-orkestrering — nästa våg, samma grundfråga',
      text:
        'RPA-leverantörer konkurrerar nu med en ny våg av **agentisk AI-orkestrering**, där ' +
        'AI-agenter inte bara efterliknar klick utan kan **fatta beslut och hantera hela ' +
        'arbetsflöden** från start till slut, i vissa visioner med minimal mänsklig ' +
        'inblandning. Kursens poäng är att detta inte upphäver BPM-tänkandet — det gör det ' +
        'bara mer akut. Frågan "vilken roll spelar människor?" (som föreläsning 1 ställer ' +
        'explicit) är obesvarad, och grundproblemet är detsamma som i produktivitetsparadoxen ' +
        'från kapitel 1: **ny teknik ovanpå oförstådda eller odokumenterade processer löser ' +
        'ingenting** — oavsett om tekniken heter RPA eller agentisk AI.'
    }
  ],
  nyckelbegrepp: [
    'Processoptimeringslösningar: redesign, outsourcing, shared services, RPA, molntjänster',
    'Customer-centric BPM fokuserar på snabbare svar, färre hand-offs, tydlig kontaktpunkt för kunden',
    'RPA arbetar via UI-interaktioner (inte systemintegration) — därför skalar det sällan robust',
    'Agentisk AI-orkestrering är BPM:s nya våg, men grundproblemet (process före teknik) är detsamma'
  ],
  tentakoppling:
    'Ett scenario om ett team som kopierar fakturarader mellan e-post och ett ERP-system, ' +
    'steg för steg utan omdöme, är precis den typ av uppgift RPA passar för — känn igen ' +
    'mönstret "repetitivt, regelstyrt, UI-baserat" som RPA:s signum.'
},

/* ====================== KAPITEL 7 ====================== */
{
  id: 'proc-k7',
  nr: 7,
  titel: 'BPM som forskningsfält: akademi, hållbarhet och AI',
  ingress: 'Tre artiklar, tre bilder av vart BPM-forskningen är på väg — vad fältet faktiskt studerar, varför Green BPM inte slog igenom, och hur AI förskjuter grunderna.',
  lastid: 8,
  amnen: ['proc-akademisk'],
  avsnitt: [
    {
      rubrik: 'Reijers (2021): sju teman i BPM-forskningen',
      text:
        'Hajo Reijers gick igenom över 100 vetenskapliga artiklar om BPM publicerade i ' +
        'tidskriften *Computers in Industry* under fyrtio år, och destillerade sju ' +
        'teman som tillsammans beskriver hur fältet utvecklats:\n\n' +
        '1. **BPM Systems (BPMS)** — mjukvaruplattformar för att definiera, exekvera och ' +
        'spåra processer\n' +
        '2. **Process modeling** — hur man representerar processer (BPMN hör hit)\n' +
        '3. **Process design** — hur man designar bättre processer, inte bara beskriver dem\n' +
        '4. **Coordination and interoperability** — hur processer som spänner över flera ' +
        'system och organisationer samordnas\n' +
        '5. **Model management** — hur man hanterar stora samlingar av processmodeller ' +
        'över tid\n' +
        '6. **Process mining** — att automatiskt upptäcka och analysera processer utifrån ' +
        'loggdata\n' +
        '7. **New technologies** — hur nya tekniska möjligheter (t.ex. AI) förändrar vad ' +
        'BPM kan göra\n\n' +
        'Reijers utgångspunkt är densamma som i föreläsning 1: processorienterade ' +
        'organisationer presterar bättre än de som saknar det fokuset, eftersom en process ' +
        'ofta spänner över avdelningar, specialiteter och geografier — utan samordning ' +
        'suboptimeras varje del för sig, frikopplat från vad kunden faktiskt behöver.'
    },
    {
      rubrik: 'Houy et al. (2012): Green BPM',
      text:
        '**Green BPM** är idén att använda BPM:s metoder och verktyg för att förbättra ' +
        'organisationers **hållbarhet** — mäta, analysera och minska en process ' +
        'miljöpåverkan (energi, utsläpp, resursanvändning) på samma sätt man idag mäter ' +
        'tid och kostnad. Houy et al. undersöker potentialen och utmaningarna, och ' +
        'demonstrerar en delvis automatiserad ansats för att förbättra processers ' +
        'hållbarhet — kopplat till forskningsfältet **Green IS** (informationssystem för ' +
        'hållbarhet) i stort.\n\n' +
        'Enligt kursens egen bedömning har visionen från 2012 **inte fått det breda ' +
        'genomslag** som förutspåddes. Skälet som lyfts fram är tekniskt, inte juridiskt ' +
        'eller konceptuellt: **de flesta BPM-verktyg saknar inbyggt stöd för att lagra, ' +
        'räkna och analysera energi-, utsläpps- och resursdata** i själva ' +
        'processmodellerna. Det är alltså inte att hållbarhetsdata är förbjuden att lagra, ' +
        'och inte att process mining är oförmöget att hantera CO₂-data — verktygen är ' +
        'bara inte byggda för den typen av mätning ännu.'
    },
    {
      rubrik: 'Rosemann et al. (2024): tre förskjutningar i AI-eran',
      text:
        'Rosemann, vom Brocke och kollegor argumenterar att AI-eran innebär tre ' +
        '**förskjutningar (drifts)** i hur BPM behöver tänkas, sammanfattade som en ' +
        'rörelse bort från det tänkande som etablerades under den industriella ' +
        'revolutionens övergång från hantverk till massproduktion:\n\n' +
        '1. **Från transaktion till konversation** — processer slutar vara stela ' +
        'sekvenser av formulärifyllnad och blir dialogdrivna, där AI-agenter för ett ' +
        'samtal med användaren snarare än att bara exekvera fasta steg\n' +
        '2. **Från automatisering till autonomisering** — skillnaden mellan att en robot ' +
        'utför ett i förväg definierat steg (automatisering) och att en agent själv ' +
        '**beslutar** vad som ska göras härnäst utifrån målet (autonomisering)\n' +
        '3. **Från förenkling till sofistikering** — traditionell processdesign har strävat ' +
        'efter att göra processer så **enkla och standardiserade** som möjligt; AI gör det ' +
        'möjligt (och ibland önskvärt) att hantera betydligt mer **sofistikerad**, ' +
        'kontextkänslig processlogik utan att offra hanterbarheten\n\n' +
        'Poängen med alla tre förskjutningar är densamma som i föreläsning 1:s avslutande ' +
        'fråga om agentisk AI — BPM:s grundläggande tänkande (processer, roller, styrning) ' +
        'består, men förutsättningarna det tänkandet vilar på håller på att förändras i ' +
        'grunden.'
    }
  ],
  nyckelbegrepp: [
    'Reijers sju forskningsteman: BPMS, process modeling, process design, coordination/interoperability, model management, process mining, new technologies',
    'Green BPM: använd BPM-metoder för att mäta och minska processers miljöpåverkan',
    'Green BPM:s genomslag hämmas av att BPM-verktyg saknar inbyggt stöd för hållbarhetsdata — inte av lagstiftning',
    'Rosemann et al:s tre drifts: transaktion → konversation, automatisering → autonomisering, förenkling → sofistikering'
  ],
  tentakoppling:
    'HT25-tentan testar explicit varför Green BPM inte fått genomslag — läs alternativen ' +
    'noga på riktiga tentor, för tre av fyra svarsalternativ brukar vara rimligt formulerade ' +
    'men fel (juridik, teknikbyte, mätbarhet) medan det verkliga svaret handlar om ' +
    'verktygens datastöd.'
}

);
