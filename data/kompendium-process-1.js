/* =========================================================================
   Kompendium – Processorienterad verksamhetsutveckling, kapitel 1–10
   (BPM som managementdisciplin: historia, livscykel, 7FE-ramverket och
   andra perspektiv)
   -------------------------------------------------------------------------
   Källor: föreläsning F1–F4b HT26 (Benjamin Weaver, 22 sep – 5 okt 2026),
   som följer Jeston (2022) Business Process Management: Practical Guidelines
   to Successful Implementation (5th ed.), samt artiklarna Hammer (1990),
   Houy et al. (2012), Reijers (2021) och Rosemann et al. (2024). Tentorna
   HT24 och HT25 har använts för att se vad som prövas.

   Kapitlen följer föreläsningarnas ordning: F1 → kap. 1–2, F2 → kap. 3–5,
   F3 → kap. 6–7, F4a → kap. 7–9, F4b → kap. 10. All text är skriven med
   egna ord; inget är kopierat ur bilderna eller boken.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.processer = {
  delkurs: 'processer',
  titel: 'Processorienterad verksamhetsutveckling',
  intro:
    'Delkursen har två halvor. Den ena är **BPM som managementdisciplin** — historia, ' +
    'livscykel och Jestons 7FE-ramverk för att driva ett BPM-initiativ. Den andra är ' +
    '**BPMN**, notationen för att rita och läsa processdiagram (Silver-boken). Båda ' +
    'prövas på salstentan; BPMN och DMN examineras dessutom genom gruppuppgiften, som ' +
    'lämnas in 5 november kl. 15.00.\n\n' +
    '> **Tentan 13 november** (digital, Inspera, **inga hjälpmedel**): 2–3 kortare ' +
    'essäfrågor à max 15 p — inte om BPMN — och 10–15 flervalsfrågor som även täcker ' +
    'BPMN. I BPM-delen ger rätt svar 5 p; i BPMN-delen anges poängen per fråga. Fel svar ' +
    'ger −1 p, obesvarad 0 p. Frågorna bygger på litteraturen och föreläsningarna.\n\n' +
    'Kapitel 1–10 täcker BPM-delen i föreläsningarnas ordning, kapitel 11–14 BPMN.',
  kapitel: []
};

window.SYSB23.kompendium.processer.kapitel.push(

/* ====================== KAPITEL 1 ====================== */
{
  id: 'proc-k1',
  nr: 1,
  titel: 'BPM: definition, historia och drivkrafter',
  ingress: 'Vad BPM faktiskt är enligt Jeston, och de tio–femton årens strömningar som ledde fram till att det blev ett eget fält.',
  lastid: 11,
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
      rubrik: 'BPM och Enterprise Architecture',
      text:
        'BPM och **Enterprise Architecture (EA)** har samma mål: att genomföra strategin, ' +
        'få IT i linje med strategin och stärka konkurrenskraften. Men de har olika roller:\n\n' +
        '- **EA är den övergripande ritningen** för hur företaget ska realisera sin ' +
        'strategi: vilka värdeskapande processer och förmågor som behövs, och vilka regler ' +
        'och principer som gäller.\n' +
        '- **BPM är ett operativt lager i EA**: processerna kopplar ihop strategin med ' +
        'IT-arkitekturen, BPM säkerställer styrning och prestationsmätning av processerna, ' +
        'driver kontinuerlig förbättring och kan exekvera processer i ett BPMS.\n\n' +
        'Tänk i tre skikt: **strategi** överst, **verksamhet** i mitten, **applikationer och ' +
        'infrastruktur** längst ner. BPM verkar i mitten och binder ihop de andra två. BPM ' +
        'och EA är alltså varken oberoende av varandra eller två namn på samma sak.'
    },
    {
      rubrik: 'Produktivitetsparadoxen — samma problem som i Strategi',
      text:
        'Om du läser Strategi och ekonomistyrning parallellt känner du igen det här: på ' +
        '70- och 80-talet syntes IT-investeringar **inte** i produktivitetsstatistiken. ' +
        'Robert Solow, 1987:\n\n' +
        '> "You can see the computer age everywhere but in the productivity statistics."\n\n' +
        'Processtänkandet är äldre än så. Det går tillbaka till **Taylors Scientific ' +
        'Management** (1880–1920) och kvalitetsrörelsen med statistisk processkontroll: ' +
        '**TQM** och **Six Sigma** (3,4 fel per miljon tillfällen) från mitten av 80-talet. ' +
        'Strategiskt kopplades processer till **Porters värdekedja**, **resource-based view**, ' +
        'dynamiska förmågor och idén om **strategic alignment** — att processer och IT ska ' +
        'stödja strategin för en uthållig konkurrensfördel.\n\n' +
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
        'fjärdedelar.\n\n' +
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
    'EA = övergripande ritning för att realisera strategin; BPM = operativt lager som kopplar strategi, verksamhet och IT',
    'Produktivitetsparadoxen (Solow 1987): IT ovanpå oförändrade processer ger ingen effekt',
    'BPR (Hammer 1990): "obliterate, don\'t automate" — radikal omdesign, inte snabbare gamla processer',
    'BPR gick för långt: dyrt, riskabelt, blev ursäkt för nedskärningar — BPM är den mognare efterföljaren',
    'BPM föds 1998–2003 ur mötet mellan amerikansk affärstänkning och europeisk Petri-nätsmodellering',
    'SOX (2002) och ISO 9000:2000 drev igenom processdokumentation som standard',
    'BPM → RPA (2015–2022) → agentisk AI: samma tänkande, nya verktyg'
  ],
  tentakoppling:
    'HT25-ordinarie frågade hur BPM förhåller sig till Enterprise Architecture. Flera ' +
    'flervalsfrågor på både HT24- och HT25-tentorna testar dessutom varför BPR misslyckades ' +
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
  id: 'proc-bpm-3',
  nr: 3,
  titel: 'Att starta BPM: vem, när och hur',
  ingress: 'Vilka som ska vara med, de sex framgångsfaktorerna, drivers och triggers, top-down mot bottom-up, tre sätt att initiera BPM och Jestons fyra scenarier.',
  lastid: 11,
  amnen: ['proc-start'],
  avsnitt: [
    {
      rubrik: 'Vem ska vara med?',
      text:
        'BPM är inte en sak för processanalytiker ensamma. Involveringen kan gälla allt från ' +
        'att driva projekten, detaljgranska processer, modellera och mäta, till ' +
        'omdesign, implementering och den löpande förvaltningen. Den kan också sträcka sig ' +
        '**utanför organisationen**: kunder, leverantörer längs värdekedjan och andra ' +
        'externa intressenter.\n\n' +
        'Jeston delar in BPM-arbete i fyra typer efter hur komplext det är och var det ' +
        'startar:\n\n' +
        '| Typ | Sponsor | Riktning |\n' +
        '| --- | --- | --- |\n' +
        '| 1. Enkla projekt med liten påverkan | Affärsenhet, ofta processintresserade chefer | Bottom-up |\n' +
        '| 2. Projekt med stor påverkan | Divisions- eller högre chef | |\n' +
        '| 3. Storskaliga BPM-program | Högsta ledningen, mycket förändringsledning | |\n' +
        '| 4. Transformation av hela företaget | VD eller ledningsgruppen | Top-down |\n\n' +
        '**Externa BPM-experter och konsulter** kan vara värdefulla som coacher för interna ' +
        'BPM-chefer, som oberoende granskare av kvalitet och resultat, som konfliktlösare när ' +
        'ett program kört fast, och som startstöd med beprövad erfarenhet. Men på lång sikt ' +
        'bör BPM-kompetensen finnas **inne i organisationen**.'
    },
    {
      rubrik: 'Sex kritiska framgångsfaktorer',
      text:
        '1. **Den högsta ledningens drivkraft** — synligt stöd från VD och ledning är den ' +
        'enskilt viktigaste faktorn\n' +
        '2. **Tydliga affärsdrivkrafter** — vet varför ni gör BPM, annars löser ni fel problem\n' +
        '3. **En tydlig vision** — en gemensam bild av hur verksamheten ser ut efteråt ' +
        '("start with the end in mind")\n' +
        '4. **Mätbart affärsvärde** — framgång definierad i mätbara termer, KPI:er\n' +
        '5. **En BPM-ledare och ett team med mandat** — befogenheter, erfarenhet och synligt ' +
        'stöd uppifrån, ibland i form av en Chief Transformation Officer\n' +
        '6. **Kopplade incitament** — chefers KPI:er, belöningar och konsekvenser hänger ' +
        'ihop med BPM-resultaten\n\n' +
        'Jestons råd är rakt på sak:\n\n' +
        '- Har ett **storskaligt** BPM-program inte stöd från VD eller ledningen ska man ' +
        '**helt enkelt låta bli**. Övriga framgångsfaktorer spelar då ingen roll.\n' +
        '- BPM-projekt som drivs med enbart **traditionell projektledning** ger sämre resultat ' +
        'än de som följer en strukturerad ansats som 7FE.\n' +
        '- **Anpassa takten efter organisationens processmognad.** Går man fortare än mognaden ' +
        'tillåter ökar risken att misslyckas.'
    },
    {
      rubrik: 'Drivers och triggers',
      text:
        'Två begrepp som ofta blandas ihop:\n\n' +
        '- **Driver** — ett affärsskäl eller motiv som får organisationen att agera för att ' +
        'nå ett affärsmål. Exempel: växa, öka lönsamheten, nå strategin, korssälja, bättre ' +
        'kundnöjdhet, mobilitet.\n' +
        '- **Trigger** — en händelse som får organisationen att agera för att lösa ett ' +
        'omedelbart problem eller svara på en förändring utifrån. Exempel: en ny lag, en ' +
        'kris, ett uppköp.\n\n' +
        'Enkelt uttryckt: en driver är **varför vi vill**, en trigger är **det som händer** ' +
        'och gör att vi måste.\n\n' +
        '**När ska man starta BPM?** Först när drivers och triggers är **bestämda och ' +
        'överenskomna** av alla intressenter, **dokumenterade, kommunicerade och förstådda**, ' +
        'och man är säker på att de är synliga i hela organisationen.'
    },
    {
      rubrik: 'Top-down, bottom-up — eller båda',
      text:
        '| | Top-down | Bottom-up |\n' +
        '| --- | --- | --- |\n' +
        '| Initieras av | Högsta ledningen som förstår vad BPM ger | Processägare eller team som vill förbättra lokalt |\n' +
        '| Styrka | Kopplat till strategin, hela organisationen i fokus | Snabba resultat, engagemang underifrån |\n' +
        '| Kräver | Starkt ledarskap, sponsorskap och styrning | Lite — men får begränsad räckvidd |\n' +
        '| Risk | Missar den operativa verkligheten, svagt engagemang hos medarbetarna | Stannar lokalt och påverkar aldrig strategin |\n\n' +
        '> **Top-down ger riktning, bottom-up ger fäste — de bästa BPM-programmen blandar ' +
        'båda.**\n\n' +
        'Två typsituationer från tentorna:\n\n' +
        '- **Ledningen är inte engagerad och strategin är oklar** → börja **lokalt med små ' +
        'bottom-up-förbättringar** som skapar värde och bygger momentum. Att vänta på en ny ' +
        'strategi eller starta ett top-down-program utan mandat fungerar inte.\n' +
        '- **Strategiskt viktig, tvärfunktionell förändring som berör hela organisationen** ' +
        '(t.ex. nya nationella regler) → driv BPM **top-down** för styrning, mandat och ' +
        'samordning.'
    },
    {
      rubrik: 'Tre sätt att initiera BPM',
      text:
        '1. **Strategy-led** — utlöst av strategin och top-down-transformationsprogram. ' +
        'Initiativet utgår från strategiska mål och startar i 7FE:s **Foundations och ' +
        'Enablement**.\n' +
        '2. **Business issue-led** — ett svar på ett konkret verksamhetsproblem, till exempel ' +
        'kundklagomål eller höga kostnader. Oftast taktiskt, lokalt och bottom-up.\n' +
        '3. **Process-led** — startat inifrån av processchefer eller analytiker som vill ' +
        'förbättra oberoende av den bredare strategin. Används ofta för att visa vad BPM kan ' +
        'ge genom små vinster.'
    },
    {
      rubrik: 'Fyra implementeringsscenarier',
      text:
        'Jeston beskriver fyra scenarier längs två axlar: hur stor **påverkan på ' +
        'organisationen** är, och hur mycket **ledningen är informerad och engagerad**.\n\n' +
        '1. **Under the radar** — små, informella BPM-insatser med begränsat stöd från ' +
        'ledningen. Typexempel: ett par analytiker har själva börjat kartlägga sina processer, ' +
        'cheferna känner till det men har inte prioriterat det, och arbetet sker sporadiskt ' +
        'utan budget eller formell styrning.\n' +
        '2. **Pilot project** — riktade projekt som ska **bevisa** vad BPM kan ge.\n' +
        '3. **In the driver’s seat** — BPM ses som en strategisk möjliggörare, med växande ' +
        'styrning.\n' +
        '4. **Business as usual** — BPM är helt inbäddat i organisationens sätt att arbeta.\n\n' +
        'Vilket scenario man befinner sig i avgör **hur strikt och brett** 7FE tillämpas.'
    }
  ],
  nyckelbegrepp: [
    'Fyra projekttyper: från enkla bottom-up-projekt till företagsövergripande top-down-transformation',
    'Viktigaste framgångsfaktorn: ledningens stöd — saknas det i ett storskaligt program, låt bli',
    'Driver = affärsskäl att agera; trigger = händelse som tvingar fram handling',
    'Top-down ger riktning, bottom-up ger fäste; bäst är att kombinera',
    'Utan ledningens engagemang: börja lokalt bottom-up. Tvärfunktionellt och strategiskt: top-down',
    'Tre sätt att initiera: strategy-led, business issue-led, process-led',
    'Fyra scenarier: under the radar, pilot, in the driver’s seat, business as usual'
  ],
  tentakoppling:
    'HT25-omtentan hade både en scenariofråga (två analytiker utan budget = under the radar) ' +
    'och en fråga om när top-down är rätt. HT25-ordinarie frågade vad Jeston rekommenderar ' +
    'när ledningen inte är engagerad (svar: bottom-up i liten skala).'
},

/* ====================== KAPITEL 4 ====================== */
{
  id: 'proc-bpm-4',
  nr: 4,
  titel: 'Improve before automate: teknik och perspektiv',
  ingress: 'Varför processer ska förbättras före automatisering, spreadsheet-testet, vad ett BPMS består av, processoptimeringslösningarna och balansen mellan kund och medarbetare.',
  lastid: 11,
  amnen: ['proc-teknik'],
  avsnitt: [
    {
      rubrik: 'Automatisering förstärker det som redan finns',
      text:
        'En av Jestons mest centrala principer: **automatisera aldrig en ineffektiv process**.\n\n' +
        '- **Automatisering förstärker befintliga förhållanden.** En effektiv process blir ' +
        'effektivare, en ineffektiv blir sämre — bara snabbare.\n' +
        '- **Risken med att automatisera dåliga processer** är bortkastade investeringar, ' +
        'frustrerade medarbetare och system som inte används.\n' +
        '- **Teknik är en möjliggörare, inte en lösning.** Den kan inte kompensera för dålig ' +
        'processdesign.\n' +
        '- **Förbättra först:** minska komplexiteten och optimera innan tekniken kommer in.\n' +
        '- **Grunderna först:** förstå, kartlägg och förbättra flödet och affärsreglerna ' +
        'innan systemet implementeras.\n\n' +
        'Tanken går tillbaka på BPR och Hammers "don’t automate, obliterate", men utan BPR:s ' +
        'radikala allt-på-en-gång-ansats.'
    },
    {
      rubrik: 'Spreadsheet-testet',
      text:
        'Jestons enkla diagnos: **"Hur många av era kritiska affärsprocesser eller processteg ' +
        'är beroende av kalkylblad?"**\n\n' +
        'De flesta organisationer löser processproblem genom att lägga till fler kalkylblad i ' +
        'stället för att förstå och åtgärda grundorsaken. Används kalkylblad i en ' +
        'affärsprocess är det ett tecken på att processen först behöver **förbättras** innan ' +
        'den automatiseras. System som är **fit for purpose** ska göra kalkylbladen onödiga.'
    },
    {
      rubrik: 'Vad ett BPM-system består av',
      text:
        'Ett BPMS (Business Process Management System) har tre grupper av komponenter:\n\n' +
        '| Modellering och design | Exekvering och spårning | Prestationsstyrning |\n' +
        '| --- | --- | --- |\n' +
        '| Hur processen beskrivs och ritas | Allt som rör att köra processen | Styrning av processerna via KPI:er |\n' +
        '| Processmodellering (BPMN) | Ärendehantering (work management) | Balanced scorecard |\n' +
        '| Activity-based costing | Regelmotor (business rules engine) | Business analytics, BI |\n' +
        '| Processimulering | Systemintegration, dokumenthantering | Dataanalys |\n' +
        '| | RPA, (agentisk AI-orkestrering) | |\n\n' +
        'Dagens **iBPM** lägger till RPA och low-code, **process mining**, avancerad analys och ' +
        'AI-orkestrering. BPM-system ingår numera i kategorin **BOAT** — Business ' +
        'Orchestration and Automation Technologies (t.ex. Appian, Pega, ServiceNow, UiPath).\n\n' +
        '**Activity-Based Costing (ABC)** var en stor managementinnovation på 80- och 90-talet: ' +
        'kostnader kopplas till aktiviteter och resursanvändning. Den visade sig dyr och svår ' +
        'att underhålla, men principen lever vidare i ERP, analysverktyg och ' +
        'prestationsstyrning som ger samma kostnadsinsyn automatiskt.'
    },
    {
      rubrik: 'Processoptimeringslösningar',
      text:
        'Jeston räknar med fem typiska lösningar att välja mellan:\n\n' +
        '- **Processoptimering (BPM)** — omdesign eller innovation av själva processen\n' +
        '- **Outsourcing** — låta en extern leverantör utföra processen\n' +
        '- **Shared services** — samla gemensamma processer på ett ställe\n' +
        '- **RPA** — mjukvarurobotar för regelstyrda, repetitiva steg\n' +
        '- **Cloud computing** — molnbaserade lösningar\n\n' +
        'Teknik är fortfarande en möjliggörare: tas inte kultur och människor om hand ' +
        'misslyckas även de bästa verktygen.\n\n' +
        '**RPA** är mjukvara som fungerar som en **virtuell medarbetare**: den utför ' +
        'regelstyrda, repetitiva uppgifter genom att efterlikna hur en människa klickar i ' +
        'systemen, utan att systemen behöver byggas om. RPA växte fram ur makron, skript, ' +
        'workflow och regelmotorer. Den går snabbt att införa, arbetar felfritt dygnet runt, ' +
        'ökar spårbarheten och är billigare än arbetskraft — och **kompletterar** snarare än ' +
        'ersätter människor. Typiska fall: datainmatning, sortera och skicka e-post, arkivera, ' +
        'periodisk rapportering, OCR och formatkonvertering.\n\n' +
        '> Exempel: ett team kopierar dagligen hundratals fakturarader från e-post till ERP. ' +
        'Stegen är alltid desamma och kräver inget omdöme → **RPA**.\n\n' +
        '**Varför skalade många tidiga RPA-fall inte?** RPA arbetar via ' +
        '**gränssnittet (UI)**, inte via robusta systemintegrationer. Ändras en skärmbild ' +
        'går roboten sönder. Att skala RPA till företagsnivå kräver dessutom tid, kompetens ' +
        'och styrning.'
    },
    {
      rubrik: 'Kund i centrum — eller medarbetare?',
      text:
        '**Customer-centric BPM.** Många organisationer fokuserar hårt på kundnöjdhet, men ' +
        'fina kundmått kan dölja ett djupare missnöje. Jestons figur över servicenivåer har ' +
        'en **irritationszon**, en linje av **absolut likgiltighet** och en zon av ' +
        '**excellens**. Poängen: det är effektivare att **ta bort det som irriterar kunden** ' +
        'än att lägga mycket pengar på "wow-faktorer" som tillför lite. Processer och KPI:er ' +
        'ska spegla den verkliga kundupplevelsen, inte bara interna dashboards.\n\n' +
        '> Fokus på snabbare svar, färre hand-offs och en tydlig kontaktpunkt för kunden = ' +
        '**customer-centric**.\n\n' +
        '**Employee-centric BPM.** Motiverade medarbetare är grunden för bra service — en ' +
        'medelmåttig process med entusiastiska medarbetare slår ofta en utmärkt process med ' +
        'oengagerade. Fokus på empowerment, omsorg och rätt arbetsmiljö. Chefer ska vara ' +
        '**tjänande ledare** som stöttar och coachar i stället för att detaljstyra. ' +
        '"FAIL" omtolkas som **First Attempt In Learning** — en lärande kultur.\n\n' +
        '**Balansen:** utan kunder ingen verksamhet, utan medarbetare ingen service. ' +
        'Bedöm en omdesignad process ur båda perspektiven: hur effektiv och tillfredsställande ' +
        'är den för kunden, och hur effektiv och stärkande är den för medarbetaren?'
    }
  ],
  nyckelbegrepp: [
    'Automatisering förstärker det som finns: förbättra processen först',
    'Teknik är en möjliggörare, inte en lösning',
    'Spreadsheet-testet: kalkylblad i kritiska processer signalerar att processen behöver förbättras',
    'BPMS: modellering och design, exekvering och spårning, prestationsstyrning',
    'Fem optimeringslösningar: BPM-omdesign, outsourcing, shared services, RPA, cloud computing',
    'RPA = virtuell medarbetare för repetitiva, regelstyrda steg; skalar dåligt eftersom den arbetar via UI',
    'Customer-centric: ta bort irritationsmoment snarare än att jaga wow-faktorer',
    'Employee-centric: tjänande ledarskap, FAIL = First Attempt In Learning'
  ],
  tentakoppling:
    'HT25-ordinarie hade en hel essä om varför processer ska förbättras innan de ' +
    'automatiseras, plus flervalsfrågor om RPA-fallet med fakturarader och customer-centric ' +
    'BPM. HT25-omtentan frågade varför RPA inte skalade och vilka optimeringslösningar ' +
    'Jeston räknar med.'
},

/* ====================== KAPITEL 5 ====================== */
{
  id: 'proc-bpm-5',
  nr: 5,
  titel: '7FE-ramverket och BPM-huset',
  ingress: 'Jestons husmetafor, 7FE:s tio faser och tre essentials, framgångspallen, ramverkets styrkor och svagheter — och varför one size fits all inte fungerar.',
  lastid: 10,
  amnen: ['proc-7fe'],
  avsnitt: [
    {
      rubrik: 'Bokens upplägg',
      text:
        'Jeston (2022) har tre delar:\n\n' +
        '1. **Del 1, kapitel 1–10:** en översikt i FAQ-form — vad, varför, hur och vem\n' +
        '2. **Del 2, kapitel 11–27:** hur man gör BPM, alltså **7FE-ramverket**. För varje ' +
        'fas: varför (rationale), resultat, hur (steg för steg), output och risker\n' +
        '3. **Del 3, kapitel 28–29:** fallstudier och BPM-mognad'
    },
    {
      rubrik: 'BPM-huset',
      text:
        'Jestons egen modell — han är mycket stolt över den — beskriver processfokuserad ' +
        'verksamhetsförändring som ett **hus i flera lager**:\n\n' +
        '- **Grunden: Foundations.** Komponenterna i målbilden (Target Operating Model) och ' +
        'övergripande principer: organisatorisk anpassning, process, organisationsdesign, ' +
        'prestationsstyrning, människor, processtyrning, teknik, innovation, kundstrategi, ' +
        'arbetsplatsstrategi och social miljö. Under alltihop ligger regelverket.\n' +
        '- **Enablement:** principer och riktlinjer som gör det möjligt att leverera ' +
        'målbilden och förmågorna.\n' +
        '- **Organizational alignment:** spårbarhet mellan strategi, målbild, förmågor och ' +
        'vägledande principer.\n' +
        '- **Business transformation program management, "set for success":** ramverk för ' +
        'processförändring och -förbättring, förändringsledning och nyttorealisering.\n' +
        '- **Tre slags processer:** *operativa* (kärnprocesser som order-to-activate och ' +
        'procure-to-pay, stödprocesser som ekonomi, HR och IT) som ger **effektivitet**; ' +
        '*ledningsprocesser* (portföljstyrning, strategiutveckling, scenarioplanering, ' +
        'riskaptit) som ger **uthållig konkurrensfördel**; och *innovationsprocesser* ' +
        '(ambition, samla, filtrera, utveckla, välja, mobilisera) som **framtidssäkrar**.\n' +
        '- **Taket: Sustainability och performance management** — processtyrning, ' +
        'organisationens process asset, prestationsstyrning, ramverk för nyttostyrning och ' +
        'organisationskultur. Taket håller ihop allt och bär en kultur som upprätthåller ' +
        'processfokus över tid.\n\n' +
        '> Husmetaforen säger att BPM består av **flera lager** — från strategiska grunder ' +
        'till operativa och innovativa processer — som **tillsammans** skapar en effektiv ' +
        'organisation. Inte ett projekt, inte en IT-plan.'
    },
    {
      rubrik: 'Strategin är drivkraften',
      text:
        'Allt utgår från **strategin och affärsmodellen**: värdeskapande och värdefångst. ' +
        'Strategin genomförs genom en **Business Operating Model**, som i sin tur kräver ' +
        'förmågor och resurser i tre dimensioner: **människor** (organisation och kultur), ' +
        '**teknik** och **process**.\n\n' +
        '**Framgångspallen (the BPM success stool)** har tre ben som alla måste bära: ' +
        'strategi, processer och människor/beteende. Jeston visar också att olika ' +
        'intressenter **uppfattar BPM olika** — för en är det processmodellering, för en ' +
        'annan prestationsmätning, för en tredje förändringsledning. Det är en anledning till ' +
        'att ramverket måste vara brett.'
    },
    {
      rubrik: '7FE: tio faser i fyra F och tre essentials',
      text:
        '"7FE" — "10P3" vore en ärligare beteckning — betyder **tio faser** som är grupperade ' +
        'i **fyra grupper som börjar på F**, plus **tre essentials**:\n\n' +
        '| Grupp | Faser |\n' +
        '| --- | --- |\n' +
        '| **F**oundations | 1. Foundations, 2. Enablement, 3. Launch |\n' +
        '| **F**indings & solutions | 4. Understand, 5. Innovate |\n' +
        '| **F**ulfilment | 6. People, 7. Develop, 8. Implement |\n' +
        '| **F**uture | 9. Realize (de strategiska målen), 10. Sustainability |\n\n' +
        '**Tre essentials** (förmågor som måste genomsyra alla faser): **Leadership**, ' +
        '**Project management** och **People change management**.\n\n' +
        'Två saker att inte blanda ihop:\n\n' +
        '- **Realize** handlar om att faktiskt få ut de **strategiska nyttorna**\n' +
        '- **Sustainability** betyder **uthållig konkurrensfördel** — att förbättringarna ' +
        'består — inte miljömässig hållbarhet\n\n' +
        'Varför en strukturerad ansats alls? Enkla omdesigninitiativ stannar ofta när ' +
        'processen är implementerad och glömmer både prestationsstyrning och kopplingen till ' +
        'strategin. Att omdesigna en process utan att förstå hur den hänger ihop med ' +
        'strategin riskerar att lösa fel problem. 7FE skapar en **återkopplingsloop**: ' +
        'strukturerad BPM → strategisk anpassning → kontinuerlig förbättring och lärande.'
    },
    {
      rubrik: 'Styrkor och svagheter',
      text:
        '| Styrkor | Svagheter |\n' +
        '| --- | --- |\n' +
        '| En helhetsbild: inte bara modellering utan strategi, ledarskap och kultur | Namnet "7FE" är ett misslyckat minnesstöd; de fyra grupperna verkar efterkonstruerade |\n' +
        '| Starkt förankrat i strategiskt managementtänkande som fortfarande gäller | En blandning av sekventiella och parallella steg — faserna överlappar och gränserna blir otydliga |\n' +
        '| Väver ihop människor och teknik, som andra BPM-metoder ofta missar | För komplext: projektledning, förändringsledning och omdesign i ett enda metaramverk |\n' +
        '| En upprepbar struktur för stora organisationer och konsulter | Pedagogiskt svagt — mest listor och checklistor, lite visuellt |\n' +
        '| Fungerar som allmän förändringsmetod även utanför BPM (ERP, dataplattform, AI) | |'
    },
    {
      rubrik: 'One size fits all fungerar inte',
      text:
        'Jeston betonar att samma upplägg **inte** passar alla:\n\n' +
        '- Organisationer skiljer sig i **BPM-mognad**, kultur, ledarskap och processvana\n' +
        '- Även när BPM stöds uppifrån saknar projekten ofta uthållig uppmärksamhet och ' +
        'resurser\n' +
        '- Vissa har redan solida grunder (vision, mål, processarkitektur), andra börjar med ' +
        'splittrade insatser\n' +
        '- Att **hoppa över faser** i 7FE går, men avråds om man inte kan motivera det\n\n' +
        '**BPM-mognad** beskriver hur långt organisationen kommit i att arbeta processorienterat. ' +
        'Låg mognad gör BPM-insatserna svårare att genomföra. Det är därför man ska anpassa ' +
        'takten: försöker man gå fortare än mognaden tillåter ökar risken för misslyckande. ' +
        'Kartlägg dessutom **BPM-resan hittills** — pågående förbättringsprojekt bör föras in ' +
        'under BPM-teamets styrning.'
    }
  ],
  nyckelbegrepp: [
    'Husmetaforen: flera lager från Foundations till taket med sustainability och performance management',
    'Tre processlager: operativa (effektivitet), lednings- (konkurrensfördel), innovations- (framtidssäkring)',
    'Strategin driver allt; den kräver förmågor i människor, teknik och process',
    '7FE = 10 faser i 4 F-grupper + 3 essentials (leadership, project management, people change management)',
    'Foundations: Foundations, Enablement, Launch · Findings & solutions: Understand, Innovate · Fulfilment: People, Develop, Implement · Future: Realize, Sustainability',
    'Sustainability = uthållig konkurrensfördel, inte miljöhållbarhet',
    'One size fits all fungerar inte: anpassa efter BPM-mognad, kultur och förutsättningar'
  ],
  tentakoppling:
    'Husmetaforen var en flervalsfråga på HT25-ordinarie. HT25-omtentan hade en hel essä om ' +
    'BPM-mognad och varför one size fits all inte fungerar.'
},

/* ====================== KAPITEL 6 ====================== */
{
  id: 'proc-bpm-6',
  nr: 6,
  titel: 'Foundations och Enablement',
  ingress: 'De två faserna som lägger grunden: strategy execution void, Red Wine Test, Target Operating Model, processnivåer, processtyrning, process asset och prestationsstyrning.',
  lastid: 14,
  amnen: ['proc-foundations'],
  avsnitt: [
    {
      rubrik: 'Foundations: kanske den viktigaste fasen',
      text:
        'Foundations lägger den strategiska och strukturella grund som allt annat BPM-arbete ' +
        'vilar på — precis som grunden i ett hus. Utan den blir senare insatser splittrade ' +
        'eller frikopplade från verksamhetens mål.\n\n' +
        '> Foundations handlar **inte om att skapa strategin** utan om att säkerställa ' +
        '**samstämmighet** mellan strategin, processtyrningen och de enskilda processerna.\n\n' +
        'Fasen har **fem steg**, som oftast görs i tur och ordning men kan överlappa. ' +
        'Kommunikation pågår hela tiden, och djupet varierar med organisation och mognad:\n\n' +
        '1. Hämta strategin\n' +
        '2. Förstå organisationens omgivning\n' +
        '3. Välj BPM-ansats (top-down eller bottom-up)\n' +
        '4. Ta fram en Target Operating Model\n' +
        '5. Kommunicera'
    },
    {
      rubrik: 'Steg 1: Hämta strategin — och strategy execution void',
      text:
        'Första uppgiften är att **förstå organisationens strategi**, inte att skapa eller ' +
        'kritisera den. Skaffa strategidokumentet och se till att det är förstått. Bygg ' +
        '**spårbarhet**: strategi → BPM-program → Red Wine Test-utfall → aktiviteter i ' +
        'BPM-kompetenscentret. Allt BPM-arbete ska tillföra värde till de strategiska målen. ' +
        'Strategin är visionen om vart man ska; BPM är ett av medlen för att komma dit.\n\n' +
        '**Strategy execution void** är **gapet mellan den strategiska avsikten och ' +
        'förmågan att genomföra strategin**. Att formulera strategi är svårt, men att ' +
        'genomföra den är svårare — och där misslyckas de flesta. Gapet har två ' +
        'sammanhängande komponenter:\n\n' +
        '- **Management effectiveness** — förmågan och disciplinen i **ledningsprocesserna**: ' +
        'styrning, beslutsfattande, anpassning av struktur och kultur. Ger **uthållig ' +
        'konkurrensfördel** när den är inbäddad i hela organisationen.\n' +
        '- **Operational efficiency** — kvaliteten i de **operativa processerna** som ' +
        'levererar produkter och tjänster. Ökar produktiviteten men ger sällan bestående ' +
        'fördel utan management effectiveness.\n\n' +
        'Fokuserar man bara på operativ effektivitet blir resultatet **"different sameness"** ' +
        '— små förbättringar utan verklig förändring.\n\n' +
        'I BPM-huset motsvarar det tre zoner: den **blå** zonen är management effectiveness ' +
        '(miljön för genomförandet), den **röda** är operational efficiency (själva ' +
        'genomförandet), och den **gröna** är BPM som det strukturerade ramverk som binder ' +
        'ihop dem. För att stänga gapet krävs tydlig koppling från strategi till strategiska ' +
        'teman och nyckelprocesser (nivå 1–2), samordnade program och projekt mot ' +
        'flaskhalsarna med tydlig överlämning och ägarskap, och **kontinuerliga ' +
        'återkopplingsloopar** mellan strategi och verksamhet.'
    },
    {
      rubrik: 'Steg 2: Förstå omgivningen — och Red Wine Test',
      text:
        'Som innan man bygger ett hus: man måste känna till tomtens storlek och form, ' +
        'omgivningen och ekonomin. BPM kräver förståelse för organisationens **struktur och ' +
        'kultur**, omvärlden den verkar i, och de begränsningar och möjligheter som formar ' +
        'förändringen. Organisationen är ett **levande system** — generationsskiften i ' +
        'arbetskraften, pandemins effekter på arbetsplatsen och digitala kundtrender kräver ' +
        'anpassade ledningssätt.\n\n' +
        'Bedöm också **BPM-mognaden**, kartlägg **BPM-resan hittills**, identifiera de ' +
        'viktigaste **drivers** och bestäm **bredden** på BPM-arbetet i fem nivåer: små ' +
        'förbättringar → förbättring av delprocesser → omdesign av processer → omdesign av ' +
        'verksamheten → att störa hela branschens värdekedja.\n\n' +
        '**Red Wine Test** är en visionsövning: deltagarna föreställer sig att de sitter i ' +
        'framtiden med ett glas vin och att **BPM-projektet redan är perfekt genomfört**. ' +
        'Vad har förändrats för kunder, medarbetare och ledning? Hur arbetar organisationen ' +
        'nu? Vad är de stolta över?\n\n' +
        'Workshopen skapar ett **gemensamt narrativ om hur framgång ser ut**, och för varje ' +
        'svar bestäms **vem som ansvarar för leveransen** — BPM-teamet eller linjeledningen. ' +
        'Den används också som checklista när projektet ska utvärderas.'
    },
    {
      rubrik: 'Steg 3–5: Ansats, TOM och kommunikation',
      text:
        '**Steg 3** — välj **top-down eller bottom-up** utifrån vilken typ av BPM-aktivitet ' +
        'det är (se kapitel 3).\n\n' +
        '**Steg 4 — Target Operating Model (TOM).** En **övergripande beskrivning av hur ' +
        'organisationens olika delar ska fungera i framtiden** för att BPM ska lyckas. ' +
        'Komponenterna som måste hänga ihop:\n\n' +
        '- Strategi (kopplad till BPM-aktiviteterna)\n' +
        '- Processtyrning (roller och ansvar)\n' +
        '- Prestationsstyrning (t.ex. balanced scorecard)\n' +
        '- Organisationsdesign\n' +
        '- Människor och kultur\n' +
        '- Teknik\n\n' +
        'TOM är **inte** en IT-arkitektur, inte en kostnadskalkyl och inte en karta över ' +
        'nuläget. Den kan ses som den önskade framtida verksamhets- eller ' +
        'företagsarkitekturen.\n\n' +
        '**Steg 5 — Kommunikation.** Det enda stället i 7FE där kommunikation är det ' +
        '**sista** steget, eftersom allt i Foundations och TOM måste vara överenskommet ' +
        'först. Sedan kommuniceras syfte och ansats löpande: ledningens budskap, ' +
        'informationsmöten, information online.\n\n' +
        '**Output** — TOM-komponenterna och samstämmigheten mellan BPM-projektet och ' +
        'strategin — blir **input** till alla följande faser.'
    },
    {
      rubrik: 'Enablement: gör målbilden genomförbar',
      text:
        'Enablement bygger på TOM. Att genomföra målbilden kräver att förmågor byggs i ' +
        'människor (organisation, kultur), teknik (IT-strategi och resurser) och process ' +
        '(ansats och arkitektur). Fasen har **sju steg**: kommunikation, processtyrning, ' +
        'processarkitektur, prestationsstyrning, människor och kultur, organisationsdesign ' +
        'samt teknik.\n\n' +
        '**End-to-end-processer** löper horisontellt genom organisationen, över ' +
        'funktionssilos. De syns sällan i organisationsscheman — så vem äger dem? En ' +
        '**organisationsprocessbild** visar strategiska processer, kärnprocesser och ' +
        'stödprocesser. Jeston rekommenderar **fem processnivåer**:\n\n' +
        '| Nivå | Innehåll |\n' +
        '| --- | --- |\n' +
        '| 0–1 | Företaget ur processperspektiv: karta över end-to-end-processerna |\n' +
        '| 2 | Lista över affärsprocesser, värdekedjan för varje nivå 1-process |\n' +
        '| 3 | Övergripande beskrivning av varje process, tvärfunktionella beroenden (BPMN) |\n' +
        '| 4 | Delprocesser: aktiviteter, beslut, händelser, resurser, system |\n' +
        '| 5 | Steg för steg — så detaljerat att en nyanställd klarar processen, och underlag för systemutvecklare |\n\n' +
        'Nivåerna ger en **spårbar koppling mellan strategi och genomförande**.'
    },
    {
      rubrik: 'Processtyrning och processarkitektur',
      text:
        '**Process governance** är nyckeln till långsiktiga förbättringar: vem fattar ' +
        'beslut, hur hanteras affärsrisker, hur styrs prestationen? Rollerna:\n\n' +
        '- **Strategic process council** — det högsta styrande organet för BPM\n' +
        '- **Chief Process Officer (CPO)** — idealiskt men sällsynt i verkligheten\n' +
        '- **Process sponsor** och **process executive**\n' +
        '- **Process champion** — chef med ansvar för processer\n' +
        '- **Process owner**\n' +
        '- **Process steward** — ansvarar för enskilda processer och BPM-projekt, och för ' +
        'prestationsstyrning på processnivå\n\n' +
        'En **processarkitektur** ger regler, principer och riktlinjer för hur processer ' +
        'designas och styrs: standarder för modellnivåer, vägledning för referensramverk, ' +
        'och motiveringar kopplade till strategin. Typiska delar: processriktlinjer, ' +
        'process assets, ett register över affärsregler, ett ramverk för nyttostyrning och ' +
        'samordning med enterprise architecture. Graden av **standardisering och ' +
        'integration** måste anpassas — varje organisation är unik.'
    },
    {
      rubrik: 'Process asset',
      text:
        'En **process asset** är det centrala arkivet för en process: **processmodellerna** ' +
        'plus dokumentation och metadata — regler, IT-system, roller, risker, ägarskap. Det ' +
        'gör processer till strategiska och värdefulla resurser och ger:\n\n' +
        '- konsekventa och återanvändbara processer\n' +
        '- mindre omarbete och bättre kvalitet\n' +
        '- enklare konsekvensanalys vid förändringar\n' +
        '- transparens för risk, regelefterlevnad och revision\n' +
        '- integration med företagets och den digitala strategin\n\n' +
        '> **Processmodellen är en del av process asset**, som dessutom innehåller roller, ' +
        'policyer, regler, risker och andra styrande element. Vid en incident där man ' +
        'behöver förstå steg, regler, ansvar och beslutspunkter är det process asset man ' +
        'tar fram.\n\n' +
        'Så bygger man den: definiera modelleringsstandarder, enas om nivåerna 1–5, bygg ett ' +
        '**pragmatiskt arkiv som växer** i stället för att överdesigna från början, fyll ' +
        'nivå 1–2 (gärna med branschmallar som SCOR) och nivå 3–4 med processerna som tas ' +
        'fram i projektet (i BPMN). Process asset och processarkitekturen är **länken mellan ' +
        'verksamhet och IT**: vilken produkt, roll, applikation, data, affärsregel och ' +
        'riskpunkt hör till varje aktivitet. I moderna BOAT-plattformar blir den en levande ' +
        'digital representation av processen med versionshistorik.'
    },
    {
      rubrik: 'Prestationsstyrning, människor, organisation och teknik',
      text:
        '**Prestationsstyrning:** *om du inte mäter prestationen styr du inte din ' +
        'verksamhet* (Jeston). Utan prestationsdata går det inte att fatta välgrundade beslut ' +
        'eller upprätthålla förbättringar. Det kräver en kultur av ansvarstagande, riktlinjer ' +
        'för KPI:er och rapportering, och belöningar för god prestation.\n\n' +
        '**Människor och kultur:** rätt kompetens, attityder och miljö — processförmåga, ' +
        'service- och prestationskultur, incitament, lärande och uppförandekod.\n\n' +
        '**Organisationsdesign:** strukturen ska **stödja processerna**, styrningen och ' +
        'prestationsstyrningen, och uppmuntra samarbete över silos. Ordningen är ' +
        '**processer → struktur → människor**.\n\n' +
        '**Teknik:** TOM och process asset ska kopplas till befintliga IT-styrdokument. ' +
        'Tekniken ska **möjliggöra, inte diktera** processdesignen — inte all ' +
        'processförbättring behöver teknik, även om RPA och AI automatiserar allt fler ' +
        'processer.'
    }
  ],
  nyckelbegrepp: [
    'Foundations skapar inte strategin — den säkerställer samstämmighet mellan strategi och processer',
    'Strategy execution void: gapet mellan strategisk avsikt och förmåga att genomföra',
    'Management effectiveness ger uthållig fördel; operational efficiency ensam ger "different sameness"',
    'Red Wine Test: föreställ dig att projektet redan lyckats; ger ett gemensamt narrativ och ansvar per svar',
    'TOM: övergripande beskrivning av hur organisationen ska fungera i framtiden',
    'Fem processnivåer ger spårbarhet från strategi till genomförande',
    'Process asset = processmodellen plus roller, regler, risker, ägarskap, IT-stöd',
    'Organisationsdesign: processer → struktur → människor'
  ],
  tentakoppling:
    'HT25 hade flervalsfrågor om Red Wine Test (två gånger), TOM och process asset (två ' +
    'gånger), och omtentan en hel essä om strategy execution void och hur BPM och 7FE kan ' +
    'överbrygga gapet.'
},

/* ====================== KAPITEL 7 ====================== */
{
  id: 'proc-bpm-7',
  nr: 7,
  titel: 'Launch och Understand',
  ingress: 'Hur ett BPM-initiativ formellt startar, och hur man skaffar en gemensam, faktabaserad bild av nuläget: workshops, mätning, rotorsaker, Process Worth Matrix och quick wins.',
  lastid: 13,
  amnen: ['proc-understand'],
  avsnitt: [
    {
      rubrik: 'Launch: den formella starten',
      text:
        'Organisationer vet ofta att det finns ineffektivitet men vet inte **var och hur** de ' +
        'ska börja. Launch sätter **omfattning, struktur och riktning**, säkerställer att ' +
        'nyckelintressenter är identifierade, engagerade och har samma förväntningar, och att ' +
        'allt är kopplat till de strategiska målen. Fasens steg:\n\n' +
        '1. **Kommunikation** — mål, omfattning och tidplan. Ta upp rädslor för ' +
        'nedskärningar, outsourcing och automatisering, vad medarbetarna kan förvänta sig, ' +
        'och hur ofta de informeras.\n' +
        '2. **Inledande intervjuer med nyckelintressenter** — bred överblick, deras bild av ' +
        'problemen, meningsfulla quick wins, och att bygga förtroende tidigt.\n' +
        '3. **Övergripande processgenomgång** — korta end-to-end-genomgångar, prata med dem ' +
        'som gör jobbet och med IT. **Orientering, inte utvärdering.**\n' +
        '4. **Identifiera intressenter** — interna och externa: leverantörer, kunder, ' +
        'partners, leverantörens leverantör, kundens kund.\n' +
        '5. **Ledningsworkshops** — se nedan.\n' +
        '6. **Överlämnings- och övertagandeplaner** — från projektteamet till verksamheten: ' +
        'kostnader, risker, tidpunkt, reservplaner, styrning.\n' +
        '7. **Implementeringsansats** — en strukturerad ansats lägger mer tid i början och ' +
        'undviker suboptimala lösningar och omtag senare.\n' +
        '8. **Business case** — på vanligt språk (inte BPMN), helst på **en sida**, med ' +
        'påståenden som stöds av belägg. Kan behöva uppdateras senare.\n' +
        '9. **Teamstruktur** — projektledare, styrgrupp, processteam och användarteam.\n' +
        '10. **Initial plan** som grund för nästa fas.'
    },
    {
      rubrik: 'Ledningsworkshopen: scope, mål och processval',
      text:
        'Med sponsorer och chefer från berörda enheter bestämmer man BPM-aktivitetens ' +
        '**scope**, initiala **processmål**, en **checklista** för vad framgång är, ' +
        'intressenter, en första lista över **end-to-end-processer**, en övergripande analys ' +
        'med mätvärden, implementeringsplan och styrning.\n\n' +
        '**Scope och bredd:** scope är om aktiviteten sträcker sig **utanför ' +
        'affärsenheten eller organisationen**; bredd är **hur omvälvande** den är (de fem ' +
        'nivåerna från små förbättringar till att störa branschens värdekedja).\n\n' +
        '**Processmål:**\n\n' +
        '- Bestäm hur stor förbättring som behövs och jämför nuläge med förväntat läge\n' +
        '- Håll antalet mått **lågt — helst högst fem per process**\n' +
        '- Koppla processprestation till **ansvariga personer**\n' +
        '- Alla mål ska vara **SMART**: specifika, mätbara, uppnåeliga, realistiska och ' +
        'tidsatta\n\n' +
        '**Process Selection Matrix (PSM)** visualiserar alla processer i en affärsenhet: ' +
        'huvudprocesser (end-to-end, t.ex. order) mot scenarier (produkter, geografi, ' +
        'distributionssätt). Den visar komplexitet och kopplingar och vilka processer som är ' +
        'unika eller gemensamma för flera produkter.'
    },
    {
      rubrik: 'Understand: varför man kartlägger nuläget',
      text:
        'Understand-fasen ska:\n\n' +
        '- **Ge processförståelse** — förstå dagens processer så att de kan omdesignas i ' +
        'Innovate\n' +
        '- **Etablera en baslinje** — mätvärden att jämföra as-is och to-be mot\n' +
        '- **Bedöma människor och kompetens** — vilka nya färdigheter som behövs\n' +
        '- **Starta förändringsresan** — involvera människor i att hitta problem och ' +
        'möjligheter\n\n' +
        '> Huvudsyftet med modellering i Understand är att få fram en **gemensam, ' +
        'faktabaserad bild av hur processen faktiskt fungerar i dag**, för att kunna analysera ' +
        'hur den kan förbättras — **inte** fullständiga beskrivningar för automatisering, ' +
        'detaljerade KPI:er eller dokumentation för revision.\n\n' +
        'Steg 1–2: **kommunicera** (skapa en trygg miljö där man kan prata om verkliga problem ' +
        'utan att söka syndabockar, ta upp oro för jobben) och **validera scope igen** — har ' +
        'tid gått sedan Launch, kontrollera att det fortfarande är relevant, och engagera ' +
        'externa intressenter för att hitta dubbelarbete och onödiga hand-offs.'
    },
    {
      rubrik: 'Understand-workshops: modellera lagom mycket',
      text:
        'Workshopparna ska ge en **faktisk** bild, inte antaganden: vilka processer behöver ' +
        'små förbättringar, omdesign eller innovation; hand-offs och systemgränssnitt över ' +
        'avdelningar; och mätvärden för prioritering.\n\n' +
        '- Bjud in teamledare och de som **utför** processen\n' +
        '- Modellerna ska vara **fit for purpose, inte perfekta**. Fråga hela tiden: är ' +
        'processen ändamålsenlig, uppfyller den kraven, är den kritisk?\n' +
        '- Låt deltagarna själva använda modelleringsverktyget — det signalerar ägarskap\n' +
        '- Håll tiden och låt ingen dominera — facilitering är avgörande\n' +
        '- **Sluta modellera** när det finns tillräckligt för att gå vidare till Innovate\n\n' +
        'Det finns ingen enda rätt modelleringsmetod. I kursen används BPMN, men alternativ i ' +
        'workshops är flödesscheman och swimlane-diagram, **EPC** (event-driven process ' +
        'chains, vanligt i SAP-sammanhang), berättelser och storyboards, och post-it-skisser.'
    },
    {
      rubrik: 'Mätning, rotorsaker och kompetens',
      text:
        '**Steg 4 — mätvärden.** Ger en objektiv grund för prioritering, kostnadsavstämning, ' +
        'business case och **baslinje** för jämförelse. Exempel: ledtider, volymer, ' +
        'resursanvändning, kostnad per process, SLA-uppfyllelse, fel- och omarbetsgrad, samt ' +
        'kundmått (klagomål, servicekvalitet). Ta in **Voice of Customer** och överreagera ' +
        'inte på sällsynta undantag ("exceptional exceptions").\n\n' +
        '**Steg 5 — rotorsaksanalys.** Hitta de **verkliga orsakerna**, inte symptomen — ' +
        'annars upprepar eller döljer omdesignen samma problem. Jeston använder **FMEA** ' +
        '(Failure Mode and Effect Analysis): vad kan gå fel, vilken effekt får det, hur ' +
        'allvarligt, hur ofta och hur lätt upptäcks det? Poängen ger en **värmekarta** över ' +
        'processernas kritiska svagheter.\n\n' +
        '**Steg 6 — People Capability Matrix.** Jämför nuvarande och **framtida** ' +
        'kompetensbehov per process. Varje färdighet graderas 1 = obligatorisk, 2 = ' +
        'rekommenderad, 3 = önskvärd.\n\n' +
        '**Steg 7 — tillgänglig information.** Både **tyst kunskap** (erfarenhet som inte är ' +
        'dokumenterad) och **explicit kunskap** (manualer, rutiner, affärsregler).'
    },
    {
      rubrik: 'Process Worth Matrix, prioriteringar och quick wins',
      text:
        '**Steg 8 — Process Worth Matrix.** Delar in processer efter **strategisk betydelse ' +
        '(salience)** och **ekonomiskt värde (worth)**:\n\n' +
        '| Salience | Tillgång (skapar värde) | Skuld (förstör värde) |\n' +
        '| --- | --- | --- |\n' +
        '| **Identity** | Definierar varumärket, t.ex. McDonald’s snabba service | Försvagar varumärket om den sköts dåligt |\n' +
        '| **Priority** | Stöder identiteten, t.ex. pålitlig leveranskedja | Synliga fel direkt när den brister |\n' +
        '| **Background** | Stöder vardagen (HR, administration) | Ofta ineffektiv — lätt vinst men liten effekt |\n' +
        '| **Mandated** | Krävs enligt regelverk, tillför sällan värde | Bördor som kan motivera automatisering eller outsourcing |\n\n' +
        '**Steg 9 — prioriteringar för Innovate.** Möjliga beslut per process: låt vara, ' +
        'förbättra, slå ihop, omdesigna från grunden, innovera radikalt, outsourca, ta hem ' +
        '(insourcing) eller eliminera. Värmekartor (FMEA + PSM) visar var vinsterna är ' +
        'störst.\n\n' +
        '**Steg 10 — quick wins.** Små förbättringar som går att genomföra **snabbt, utan ' +
        'stora kostnader**, och som ger **omedelbar** förbättring — gärna inom **4–8 veckor**. ' +
        'De bygger trovärdighet och momentum, kan göra BPM-projektet självfinansierande, och ' +
        'stärker engagemanget: låt medarbetare i frontlinjen föreslå dem och ge dem erkännande ' +
        'offentligt.\n\n' +
        '**Output från Understand:** as-is-modeller, mätvärden som baslinje, styrkor, ' +
        'svagheter och rotorsaker, quick wins, och en **Understand-rapport** med prioriteringar ' +
        'för Innovate.'
    }
  ],
  nyckelbegrepp: [
    'Launch: scope, struktur och riktning; intressenter; business case på en sida',
    'Processmål: högst fem mått per process, kopplade till ansvariga, SMART',
    'Process Selection Matrix: huvudprocesser mot scenarier',
    'Understand-modellering: gemensam, faktabaserad bild av nuläget — fit for purpose, inte perfekt',
    'FMEA för rotorsaker, People Capability Matrix för kompetensgap',
    'Process Worth Matrix: salience (identity, priority, background, mandated) mot worth (tillgång/skuld)',
    'Quick wins: snabba, billiga, omedelbar effekt, ofta 4–8 veckor'
  ],
  tentakoppling:
    'HT25-omtentan frågade om syftet med modellering i Understand och om kännetecknen för ' +
    'en quick win. Process Worth Matrix förekommer som felaktigt svarsalternativ — lär dig ' +
    'vad den faktiskt är till för.'
},

/* ====================== KAPITEL 8 ====================== */
{
  id: 'proc-bpm-8',
  nr: 8,
  titel: 'Innovate, People, Develop och Implement',
  ingress: 'Från as-is till to-be: innovationsworkshops och deras output, att anpassa människor och roller, att bygga lösningen och att sätta den i drift.',
  lastid: 11,
  amnen: ['proc-innovate'],
  avsnitt: [
    {
      rubrik: 'Innovate: där framtidens process designas',
      text:
        'Innovate omvandlar insikterna från Understand till konkreta förbättringar och ' +
        'innovationer — den mest kreativa och mest utmanande fasen. Syftet är att göra ' +
        'processerna så effektiva, ändamålsenliga och framtidssäkra som möjligt, leverera ' +
        'mätbart affärsvärde, och **kvantifiera nyttor och kostnader** för att förfina ' +
        'business caset.\n\n' +
        '**Steg 1–5: rätt inställning.**\n\n' +
        '1. **Kommunikation** — öppen miljö för idéer, men undvik informationsöverflöd\n' +
        '2. **Ledningens kick-off-workshop** — sätter **spelreglerna**: processmål och mått, ' +
        'begränsningar (tid, resurser, automatiseringsnivå) och koppling till strategin. En ' +
        'skicklig facilitator är avgörande.\n' +
        '3. **Uppdatera innovationsansatsen** — rätt deltagare, tidshorisonter (3, 12 eller ' +
        '24 månader), automatiserat eller inte\n' +
        '4. **Fokusgrupper med externa intressenter** — kunder, leverantörer, partners: ' +
        'informera, samla synpunkter på problem, skapa ägarskap. Håll det övergripande.\n' +
        '5. **Intern mobilisering** — samla idéer från personalen, **kvalitet före ' +
        'kvantitet**\n\n' +
        '**Steg 6 — RPA** prövas som en möjlig del av lösningen (se kapitel 4).'
    },
    {
      rubrik: 'Innovate-workshops i tre steg',
      text:
        'Innovate-workshopparna är kärnan i omdesignen. De skiljer sig från ' +
        'Understand-workshopparna: fokus flyttas från att **dokumentera nuet** till att ' +
        '**designa framtiden**. Skicka ut underlag i förväg (scope, mål, begränsningar, ' +
        'as-is-modeller, rotorsaksanalyser).\n\n' +
        '1. **Initial redesign-workshop** — kreativ omdesign, ungefär **70 %** klart\n' +
        '2. **Bekräftelseworkshop** — förfina och ta in nya idéer, ungefär **95 %**\n' +
        '3. **Slutworkshop** — presentera den slutliga processen för godkännande\n\n' +
        'Därefter steg 9–18: beräkna framtida mätvärden, **simulera**, uppdatera People ' +
        'Capability Matrix och kapacitetsplanering, workshop om lösningsförslagen, ' +
        '**demonstrera och validera** genomförbarheten, **gap-analys** mellan as-is och ' +
        'to-be, kvantifiera nyttor och uppdatera business case, rapport och presentation, ' +
        '**godkännande** från ledningen, och till sist **affärskrav** som lämnas över till ' +
        'Develop.\n\n' +
        '> **Typisk output från Innovate:** design av framtida processer (**to-be**) och ' +
        '**validerade lösningsförslag** — inte rotorsaker (Understand), inte riskregister och ' +
        'inte utbildningsplaner (People).'
    },
    {
      rubrik: 'People: människor och roller för de nya processerna',
      text:
        'People-fasen anpassar människor, roller och organisationsdesign till processerna ' +
        'från Innovate, så att medarbetarna är motiverade, kapabla och har stöd i den nya ' +
        'målbilden. Den löper parallellt med Develop, som fokuserar på teknik. Åtta steg:\n\n' +
        '1. **Kommunikation** — öppen, i båda riktningar; ta upp oro för förändrade jobb ' +
        'tidigt och varsamt\n' +
        '2. **People strategy** — principer med HR för roller, struktur, ledarskap, lärande, ' +
        'prestation och belöning\n' +
        '3. **Aktiviteter och rolldesign** — gruppera uppgifter till aktiviteter och definiera ' +
        'generiska roller med **RACI**; ett jobb kan rymma flera roller\n' +
        '4. **Prestationsstyrning** — mål och KPI:er för roller och team\n' +
        '5. **Kompetensgapanalys** — utbildning, coachning eller rekrytering\n' +
        '6. **Organisationsstruktur** — rapportvägar och kontrollspann efter den nya ' +
        'processmodellen, färre hand-offs\n' +
        '7. **Utbildning** — processbaserad, "train the trainer", just in time\n' +
        '8. **HR-policyer** — rekrytering, lärande, belöning och kvarhållande i linje med ' +
        'den nya organisationen'
    },
    {
      rubrik: 'Develop: bygg lösningen',
      text:
        'Develop gör om de omdesignade processerna och affärskraven till **fungerande ' +
        'lösningar eller system**: utveckla, konfigurera och testa tekniken, i linje med ' +
        'verksamhetens behov.\n\n' +
        '> **BPM kräver inte teknik** — men när automatisering ingår är det här den byggs.\n\n' +
        'Steg: kommunicera (automatiseringens påverkan på roller och kompetens), **bestäm ' +
        'BPM-komponenterna** (workflow, regelmotor, RPA, dokumenthantering), bestäm ' +
        'utvecklingsansats, och ta fram **funktionella och tekniska specifikationer** med ' +
        'tydlig gräns mellan verksamhets- och teknisk design. Ett **Business Process ' +
        'Architecture Committee** ser till att allt stämmer med TOM och IT-arkitekturen. ' +
        'Utmaningar: databeroenden, äldre system och integration.'
    },
    {
      rubrik: 'Implement: i drift',
      text:
        'Implement sätter processförbättringar, organisationsförändringar och system i ' +
        '**drift**. Här börjar **nyttorealiseringen**, och fasen ska säkerställa att det nya ' +
        'arbetssättet accepteras, fungerar och består. Stegen:\n\n' +
        '1. Uppdatera implementeringsstrategi och plan\n' +
        '2. Kommunikation i båda riktningar\n' +
        '3. Involvera ledningen — chefer ska vara förändringens förespråkare\n' +
        '4. Förbered **användaracceptanstest (UAT)**\n' +
        '5. Utbilda personalen, rollspecifikt och praktiskt\n' +
        '6. Marknadsföringskampanjer, internt och externt\n' +
        '7. Affärstester och **piloter** under verkliga förhållanden\n' +
        '8. Uppdatera all dokumentation till den slutliga lösningen\n' +
        '9. Planer för utrullning, **back-out** och reserv — hur man backar säkert om det går fel\n' +
        '10. Genomför lösningen\n' +
        '11. Mentorstöd efter driftsättningen\n' +
        '12. **Handover/takeover** — ansvaret går från projektteamet till linjen\n' +
        '13. Följ upp och justera mot business case och KPI:er\n' +
        '14. Återkoppla resultat och lärdomar, och ge erkännande'
    }
  ],
  nyckelbegrepp: [
    'Innovate: to-be-design, simulering, gap-analys, uppdaterat business case och godkännande',
    'Innovate-workshops i tre steg: ca 70 % → 95 % → slutgodkännande',
    'Output från Innovate: to-be-processer och validerade lösningsförslag',
    'People: roller med RACI, kompetensgap, struktur, utbildning, HR-policyer',
    'Develop: BPM kräver inte teknik, men automatisering byggs här',
    'Implement: UAT, piloter, back-out-planer, handover/takeover — nyttorealiseringen börjar'
  ],
  tentakoppling:
    'HT25-ordinarie frågade vilka som är typiska outputs från Innovate. De felaktiga ' +
    'alternativen hörde till andra faser: rotorsaker (Understand), riskregister och ' +
    'utbildningsplaner (People och Implement).'
},

/* ====================== KAPITEL 9 ====================== */
{
  id: 'proc-bpm-9',
  nr: 9,
  titel: 'Realize, Sustainability och de tre essentials',
  ingress: 'Att få ut nyttorna och behålla dem, och de tre förmågor som måste bära alla faser — projektledning, förändringsledning (60 % av arbetet) och ledarskap.',
  lastid: 10,
  amnen: ['proc-realize'],
  avsnitt: [
    {
      rubrik: 'Realize: från leverans till värde',
      text:
        'Realize säkerställer att **nyttorna i business caset faktiskt uppnås** och består. ' +
        'Många tror att ett projekt är klart vid driftsättning; Realize flyttar fokus **från ' +
        'leverans till värdeskapande**.\n\n' +
        'Nyttorealisering är **inte ett enskilt steg** utan en tråd genom alla faser:\n\n' +
        '| Steg | När |\n' +
        '| --- | --- |\n' +
        '| Ramverk för nyttostyrning | Enablement |\n' +
        '| Identifiera nyttor i ett **benefits register** | Launch |\n' +
        '| Baslinje och jämförande mätning | Understand |\n' +
        '| Förfina och optimera nyttomixen | Innovate |\n' +
        '| Nyttodetaljer i en **Benefits Delivery Matrix** | Develop, People, Implement |\n' +
        '| Leverans och uppföljning | Realize |\n' +
        '| Värdeövervakning och maximering | Sustainability |\n\n' +
        'Benefits register innehåller för varje nytta: ägare, värde i kronor, måldatum, ' +
        'beroenden, risker och koppling till strategin. Det **tar tid** innan nyttorna syns, ' +
        'och projektkostnaderna kan vara stora. Uteblir nyttan i ett område måste det ' +
        'upptäckas tidigt så att man kan rätta till eller avbryta.'
    },
    {
      rubrik: 'Sustainability: att förbättringarna består',
      text:
        'Sustainability är sista fasen och målet är **uthållig konkurrensfördel**. ' +
        'Resultatet ska gå över från projekt till **business as usual** och fortsätta ' +
        'förbättras. Utan den eroderar nyttorna när omvärlden förändras, och förtroendet för ' +
        'framtida BPM-arbete skadas. Stegen:\n\n' +
        '1. Utvärdera projektresultaten mot business case och nyttomatris\n' +
        '2. Utvärdera handover/takeover — fungerar processägarskapet?\n' +
        '3. Säkerställ att **process stewards** är utbildade\n' +
        '4. Utvärdera processmått och prestationsstyrning\n' +
        '5. Kvalitetssäkring av processen (regelbundna kontroller)\n' +
        '6. Uppdatera processdokumentationen\n' +
        '7. Kommunikation — lyft nyttorna och uppmuntra nya idéer\n\n' +
        '**Organisatorisk hållbarhet** (kapitel 27) betyder att förbättring går från projekt ' +
        'till **permanent förmåga**: ledningens engagemang, integrerad styrning, aktiv ' +
        'prestationsstyrning och en lärande kultur. BPM ska vara ett **sätt att leda ' +
        'verksamheten**, inte ett engångsprogram.'
    },
    {
      rubrik: 'Tre essentials som bär alla faser',
      text:
        'De tio faserna räcker inte. De tre essentials ska genomsyra varje fas — de är ' +
        'benen BPM-arbetet står på. Väl utförda ger de stabilt stöd; försummade får arbetet ' +
        'att **luta, sjunka eller rasa**.\n\n' +
        '**1. Project management.** BPM-projekt är mer komplexa än vanliga IT- eller ' +
        'verksamhetsprojekt: tvärfunktionella processer, kulturförändring och kontinuerlig ' +
        'förbättring. Vanlig projektledning (scope, tid, budget) räcker inte. BPM-projektledning ' +
        'kräver dessutom **förändringsledning**, **intressenthantering** och ' +
        '**BPM-expertis**.\n\n' +
        '**2. People change management.** Se nästa avsnitt.\n\n' +
        '**3. Leadership.** Ger vision, förtroende och koppling till strategin. Jeston ser ' +
        'ledarskap som ett **kontinuerligt inflytande på alla nivåer**, inte bara hos högsta ' +
        'ledningen. Det handlar om att inspirera mer än att administrera: tydlig ' +
        'kommunikation, strategisk samstämmighet, förtroende, att vara förebild och att ' +
        '**ge mandat snarare än kontrollera**.'
    },
    {
      rubrik: '60 procent handlar om människor',
      text:
        'Jeston menar att **minst 60 % av BPM-arbetet** bör gå till förändringsledning och ' +
        'kommunikation kring människor. Många BPM-initiativ misslyckas för att de ' +
        '**försummar de mänskliga och kulturella dimensionerna**.\n\n' +
        'Effektiv förändringsledning gör att medarbetarna är både **able** (kan, genom ' +
        'utbildning) och **willing** (vill, genom motivation och engagemang) att arbeta på ' +
        'nya sätt. Det gör BPM till en **mänsklig förändring**, inte en teknisk övning. Det ' +
        'kräver förtroende, engagerat ledarskap, konsekvent kommunikation och medarbetare med ' +
        'mandat.\n\n' +
        'Risker om det inte prioriteras: motstånd och rädsla (för nedskärningar, outsourcing ' +
        'och automatisering), låg användning av nya processer och system, att nyttorna ' +
        'uteblir, att man faller tillbaka i gamla arbetssätt, och att förtroendet för ' +
        'framtida BPM-arbete skadas — samma mönster som när BPR misslyckades.\n\n' +
        '**Appreciative inquiry** är en framåtblickande, deltagande modell som hjälper ' +
        'organisationen att **skapa** förändring i stället för att bara reagera på den — ' +
        'genom att utgå från det som fungerar.'
    }
  ],
  nyckelbegrepp: [
    'Realize: nyttorna i business caset ska uppnås; nyttostyrning är en tråd genom alla faser',
    'Benefits register (Launch) och Benefits Delivery Matrix',
    'Sustainability = uthållig konkurrensfördel; från projekt till business as usual',
    'Tre essentials: project management, people change management, leadership',
    'BPM-projektledning kräver förändringsledning, intressenthantering och BPM-expertis',
    'Minst 60 % av BPM-arbetet handlar om människor och kommunikation: able och willing',
    'Ledarskap på alla nivåer: inspirera och ge mandat snarare än kontrollera'
  ],
  tentakoppling:
    'HT25-ordinarie hade en hel essä om varför de 60 % kommunikation och mänskliga ' +
    'aspekter är avgörande och vilka riskerna är. HT24-tentorna frågade flera gånger om ' +
    'Realize och Sustainability.'
},

/* ====================== KAPITEL 10 ====================== */
{
  id: 'proc-bpm-10',
  nr: 10,
  titel: 'Andra perspektiv: Green BPM, process mining och AI',
  ingress: 'Artiklarna och föreläsning 4b: BPM för hållbarhet och varför det inte slog igenom, process mining mot workshops, Rosemanns tre drifts och agentisk AI.',
  lastid: 12,
  amnen: ['proc-perspektiv'],
  avsnitt: [
    {
      rubrik: 'Green BPM (Houy et al. 2012)',
      text:
        '**Green BPM** ligger i skärningen mellan BPM och **Green IS**. Idén är att BPM:s ' +
        'metoder — modellering, design, exekvering och övervakning — kan anpassas för att ' +
        'stödja hållbarhet, särskilt miljömässiga och ekonomiska mål: resurseffektivitet ' +
        '(energi, bränsle, material), avfall och utsläpp, och hållbarhet över hela livscykeln.\n\n' +
        'Varje aktivitet i en processmodell (BPMN eller EPC) kan **annoteras** med ' +
        'miljöindikatorer som energiförbrukning eller CO₂-utsläpp, så att organisationen kan ' +
        'mäta och styra sitt ekologiska fotavtryck direkt i processmodellerna.\n\n' +
        '**Användningsområden:**\n\n' +
        '- **IT-tjänster:** gröna servicenivåavtal (**gSLA**) i ramverk som ITIL, med tak för ' +
        'energi per transaktion; incidenthantering som även fångar avvikelser i ' +
        'hållbarhetsmått; kapacitetsplanering som undviker överdimensionering\n' +
        '- **Alla affärsprocesser:** varje aktivitet annoteras med resursanvändning och avfall\n' +
        '- **Leveranskedjor:** partner sätter gemensamma mål (t.ex. bränsle per transport) ' +
        'och jämför planerat mot faktiskt — bättre miljö och lägre kostnader\n\n' +
        '**Möjligheter:** miljömål vid sidan av kostnad, tid och kvalitet; datadrivna ' +
        'hållbarhetsbeslut på processnivå; större medvetenhet om enskilda uppgifters påverkan. ' +
        '**Utmaningar:** inga standardiserade hållbarhetsindikatorer i BPM-verktygen, behov ' +
        'av nya mått och konventioner, avvägning mellan ekologi och ekonomi, och kultur- ' +
        'och ledningsförändring.'
    },
    {
      rubrik: 'Varför Green BPM inte slog igenom',
      text:
        'Visionen från 2012 har inte fått det breda genomslag som förutspåddes. Föreläsningen ' +
        'förklarar varför:\n\n' +
        '- **Redovisningsstandarderna** (GHG-protokollet, ISO, och i EU **CSRD/ESRS**) ' +
        'fokuserar på organisationens **totala** koldioxidavtryck per år, inte på ' +
        'processnivå\n' +
        '- **BPMN och DMN är inte byggda** för att lagra kvantitativ hållbarhetsdata — de ' +
        'flesta "gröna" annoteringar är egna tillägg\n' +
        '- **Verktygen:** få BPM-verktyg kopplar direkt till utsläppsdatabaser, IoT eller ' +
        'koldioxidredovisning\n' +
        '- **Standardisering:** det finns inget branschschema som kopplar processteg till ' +
        'utsläppsfaktorer och GHG-scopes\n' +
        '- **Silos:** hållbarhetsteamen sköter rapporteringen och processteamen sköter BPM\n\n' +
        '> Kärnan: **de flesta BPM-verktyg saknar inbyggt stöd för att lagra, räkna och ' +
        'analysera energi-, utsläpps- och resursdata i modellerna.** Det är inte förbjudet ' +
        'enligt lag, och process mining är inte oförmöget att hantera CO₂-data.'
    },
    {
      rubrik: 'Process mining',
      text:
        '**Process mining** är tekniker som använder **händelseloggar** från ' +
        'informationssystem för att automatiskt upptäcka, analysera och förbättra processer ' +
        'utifrån hur de **faktiskt** körs. Forskningen började i slutet av 1990-talet, ' +
        'kommersiella tillämpningar kom runt 2005, och Big Data och beräkningskraft gjorde det ' +
        'möjligt i företagsskala. Det ligger i skärningen mellan datavetenskap, Big Data och ' +
        'BPM — och är i hög grad europeiskt (tre av fyra ledande leverantörer är tyska).\n\n' +
        '| | Traditionell BPM (workshops) | Process mining |\n' +
        '| --- | --- | --- |\n' +
        '| As-is | Hur vi **tror** att processen fungerar, ur intervjuer och workshops | Hur processen **faktiskt** fungerar, ur händelseloggar |\n' +
        '| Källa | Människor, dokumentation, BPMN-modeller | Loggar från ERP, CRM, workflow-system |\n' +
        '| Fråga | "Hur ska processen fungera?" | "Hur fungerar processen egentligen?" |\n' +
        '| Styrkor | Rik verksamhetskunskap, mål, undantag, framtida design | Flaskhalsar, avvikelser, omarbete och varianter ur miljontals körningar |\n' +
        '| Begränsningar | Subjektivt, ofullständigt, tidskrävande | Kräver bra loggdata; ser bara det som IT-systemen registrerar |\n\n' +
        'Tre förmågor kompletterar Jeston-BPM:\n\n' +
        '1. **Process discovery** — återskapa en processmodell ur loggarna\n' +
        '2. **Conformance checking** — jämför den upptäckta processen med den avsedda ' +
        'BPMN-modellen: följer man processen, var avviker man, bryts regler?\n' +
        '3. **Process improvement** — hitta flaskhalsar, onödig väntan, omarbete och ' +
        'varianter'
    },
    {
      rubrik: 'Rosemann et al. (2024): tre drifts i AI-eran',
      text:
        'Tekniken skapar förutsättningar som förskjuter BPM-tänkandet i tre riktningar. ' +
        'Förskjutningarna är illustrativa, inte uttömmande.\n\n' +
        '| Drift | Från | Till (med AI) |\n' +
        '| --- | --- | --- |\n' +
        '| 1 | **Transaktion:** processer som diskreta steg, "start–uppgift–slut" | **Konversation:** naturligt språk med processer; människor och AI i samtal |\n' +
        '| 2 | **Automatisering:** uppgifter och flöden automatiseras, förutsägbart, designat och testat av människor | **Autonomisering:** maskiner fattar och ändrar beslut, inte förutsägbart eller testat i förväg |\n' +
        '| 3 | **Förenkling:** to-be ska alltid vara enklare än as-is | **Sofistikering:** AI möjliggör rika processer som tidigare var otänkbara, t.ex. hyperpersonalisering |\n\n' +
        '**Konversationell BPM** börjar med kundchattbotar ("var är min order?") men går mot ' +
        'att interna frågor ställs till processerna ("varför tar den här processen så lång ' +
        'tid?") och att agentisk AI instrueras och rapporterar på naturligt språk.'
    },
    {
      rubrik: 'Agentisk AI och Large Process Models',
      text:
        '**Agentisk AI** är ett spektrum av förmågor. Ett AI-system är mer agentiskt ju mer ' +
        'komplex miljö det klarar med mindre instruktioner, ju bättre det förstår naturligt ' +
        'språk och agerar självständigt för användaren, och ju mer det använder ' +
        'designmönster som **verktygsanvändning och planering** med en språkmodell som ' +
        'orkestrerare av arbetsflödet. Agentisk AI kan fungera som processens ' +
        '**orkestrerare** och utmanar i dag de renodlade RPA-företagen.\n\n' +
        'En **Large Process Model (LPM)** enligt Kampik et al. (2025), som förekom på ' +
        'HT25-omtentan, är tanken att skapa en **samlad, datadriven kunskapsbas om processer** ' +
        'som kan ge **automatiserade rekommendationer för processförbättring**. Den ersätter ' +
        'inte processanalytiker eller BPM-arbete.\n\n' +
        '**BPMN och DMN och förklarbarhet:** när beslut fattas automatiskt gör BPMN och DMN ' +
        'beslutsflöden **visuella och begripliga**, så att man kan förklara för exempelvis ' +
        'medborgare **varför** ett beslut blev som det blev.'
    },
    {
      rubrik: 'Reijers (2021): disciplinens utveckling',
      text:
        'Reijers gick igenom fyra decennier av BPM-forskning och beskriver sju teman: ' +
        '**BPM-system**, **processmodellering**, **processdesign**, **samordning och ' +
        'interoperabilitet**, **hantering av modellsamlingar**, **process mining** och ' +
        '**ny teknik**. Utgångspunkten är densamma som kursens: processorienterade ' +
        'organisationer presterar bättre, eftersom en process ofta spänner över avdelningar ' +
        'och utan samordning suboptimeras varje del för sig.\n\n' +
        'Kom ihåg skillnaden från kapitel 2: Reijers, Houy och Rosemann är ' +
        '**forskningslitteratur** — beskrivande och analytisk — medan Jeston är **normativ**.'
    }
  ],
  nyckelbegrepp: [
    'Green BPM: annotera aktiviteter med miljöindikatorer; gSLA i IT-tjänster',
    'Green BPM slog inte igenom: verktygen saknar stöd för hållbarhetsdata, redovisning sker på organisationsnivå',
    'Process mining: händelseloggar visar hur processen faktiskt körs',
    'Tre förmågor: discovery, conformance checking, improvement',
    'Rosemanns drifts: transaktion → konversation, automatisering → autonomisering, förenkling → sofistikering',
    'LPM: samlad datadriven kunskapsbas som ger automatiserade förbättringsförslag',
    'BPMN/DMN gör automatiserade beslut förklarbara'
  ],
  tentakoppling:
    'HT25-ordinarie frågade varför Green BPM inte slog igenom och hur BPMN och DMN stödjer ' +
    'förklarbarhet. HT25-omtentan frågade om Large Process Models.'
}

);
