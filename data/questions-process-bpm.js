/* =========================================================================
   Frågor – Processorienterad verksamhetsutveckling: BPM och 7FE-ramverket

   Grundade i föreläsning 1 (01_SYSB23_BPM_HT26.pdf) och i de begrepp som
   faktiskt förekommer i kursens fyra riktiga tentor (HT24 ordinarie och
   omtenta, HT25 ordinarie och omtenta) — men frågorna här är egna
   formuleringar, inte kopior av tentornas frågetext. Flera är medvetet
   byggda som sant/falskt-påståenden, eftersom det är det dominerande
   formatet på BPM-delen av den riktiga tentan.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = (window.SYSB23.fragor || []).concat([

  /* -------------------- BPM: definition, historia, drivkrafter -------------------- */
  {
    id: 'proc-intro-01', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 1,
    fraga: 'Enligt Jeston (2022) är BPM i grunden...',
    alternativ: [
      'En mjukvarusvit för att rita processdiagram',
      'Implementeringen, exekveringen och styrningen av processer',
      'Enbart modellering av verksamhetens processer',
      'Ett projekt som avslutas när processerna är dokumenterade'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Jeston är uttrycklig med att BPM inte är en mjukvarusvit eller viss teknik.',
      'Rätt. BPM är implementeringen, exekveringen och styrningen (governance) av processer — inte bara att rita dem.',
      'Fel. Jeston avfärdar explicit uppfattningen att BPM bara är modellering.',
      'Fel. BPM är en pågående cykel (se BPM-livscykeln), inte ett engångsprojekt som tar slut.'
    ],
    forklaring: 'Ett vackert processdiagram som ingen använder är inte BPM — det är en bild.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-intro-02', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 1,
    fraga: 'Produktivitetsparadoxen, som Robert Solow formulerade 1987, innebär att...',
    alternativ: [
      'IT-investeringar syntes inte som ökad produktivitet i statistiken',
      'Produktiviteten steg snabbare än företagen hann anställa folk',
      'Produktiva företag investerade mindre i IT än oproduktiva',
      'Produktivitetsmått blev omöjliga att beräkna efter datoriseringen'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. "You can see the computer age everywhere but in the productivity statistics." Förklaringen är att IT ovanpå oförändrade processer inte ger effekt.',
      'Fel. Det motsatta gällde — produktiviteten steg just inte.',
      'Fel. Paradoxen handlar om att investeringarna inte gav utslag, inte om vem som investerade.',
      'Fel. Måtten fanns och fungerade, det var resultatet som uteblev.'
    ],
    forklaring: 'Samma paradox motiverade både 90-talets managementtrender och senare BPR och BPM.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-intro-03', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: BPR (Business Process Reengineering) misslyckades framför allt för att metoden saknade koppling till modern IT.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel. BPR handlade tvärtom uttryckligen om att använda IT för att radikalt designa om processer.',
      'Rätt. BPR misslyckades ofta för att projekten blev för radikala, kostsamma och mötte starkt motstånd från medarbetare — inte för att IT-kopplingen saknades.'
    ],
    forklaring: 'Hammers ursprungliga idé ("obliterate, don\'t automate") satte IT i centrum. Det som gick fel var genomförandet: top-down, disruptivt, och ofta en ursäkt för nedskärningar.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-intro-04', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad var den centrala tesen i Hammers artikel "Reengineering Work: Don\'t Automate, Obliterate" (1990)?',
    alternativ: [
      'Processer bör automatiseras så snabbt som möjligt, oavsett kvalitet',
      'Gamla, ineffektiva processer ska raderas och byggas om från grunden, inte bara datoriseras',
      'IT-investeringar bör undvikas tills processerna är perfekta',
      'Automatisering bör alltid ske stegvis, aldrig radikalt'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Hammers poäng var att blind automatisering av dåliga processer bara ger en snabbare dålig process.',
      'Rätt. "Obliterate" betyder just att radera och börja om — radikal omdesign, inte att lägga teknik ovanpå det gamla.',
      'Fel. Hammer förespråkade tvärtom kraftfull användning av modern IT.',
      'Fel. Hammer förespråkade radikal, inte stegvis, förändring — det var själva poängen med BPR.'
    ],
    forklaring: 'Klassiska exempel är Ford (leverantörsreskontra, personalen minskade drastiskt genom att ta bort ett helt avstämningssteg) och IBM Credit (handläggningstid från en vecka till några timmar genom generalister i stället för en kedja av specialister).',
    kalla: 'Föreläsning 1; Hammer (1990)'
  },
  {
    id: 'proc-intro-05', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 2,
    fraga: 'Var uppstod den formella, matematiska modelleringen av processflöden (t.ex. Petri-nät) som senare blev en förlaga till BPMN?',
    alternativ: [
      'I amerikansk managementkonsultverksamhet',
      'I europeisk (särskilt tysk och nederländsk) akademisk datavetenskap',
      'I japansk kvalitetsrörelse (Kaizen, Six Sigma)',
      'I brittisk redovisningsforskning'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det amerikanska spåret handlade om affärsprocesstänkande (BPR, TQM), inte formell modellering.',
      'Rätt. Petri-nät (Carl Adam Petri, 1962) och liknande formella modeller kom ur europeisk, EU-centrerad akademisk informatik.',
      'Fel. Det är en separat strömning inom 90-talets managementtrender.',
      'Fel. Inte kopplat till processflödesmodellering.'
    ],
    forklaring: 'BPM som eget fält föds 1998–2003 när det europeiska akademiska spåret möter det amerikanska affärsprocesstänkandet. Första BPM-konferensen: Eindhoven 2003.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-intro-06', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilken händelse ledde till Sarbanes-Oxley-regleringen (SOX) 2002, som i sin tur drev igenom bred BPM-adoption?',
    alternativ: [
      'Finanskrisen 2008',
      'Enron-skandalen 2001',
      'Införandet av ISO 9000',
      'Millennieskiftets IT-buggar (Y2K)'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Finanskrisen kom senare och gav andra regleringar.',
      'Rätt. Enron-skandalen 2001 ledde till SOX 2002, som krävde rigorös, granskningsbar dokumentation av processer kopplade till finansiell rapportering.',
      'Fel. ISO 9000:2000 var en parallell, separat drivkraft för processdokumentation.',
      'Fel. Y2K var ett tekniskt icke-problem utan koppling till BPM:s uppkomst.'
    ],
    forklaring: 'SOX gav BPM en konkret, tvingande anledning: metoder, verktyg och notation (t.ex. BPMN) för att dokumentera processer i syfte att klara revision.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-intro-07', delkurs: 'processer', amne: 'proc-intro',
    typ: 'flerval', svarighet: 3,
    fraga: 'Vad är den tekniska begränsningen som gjorde att många tidiga RPA-satsningar inte skalade?',
    alternativ: [
      'RPA kräver omfattande kodning av specialister, en trång resurs i de flesta organisationer',
      'RPA saknade helt stöd för molnbaserade applikationer',
      'RPA arbetar via UI-interaktioner snarare än robusta systemintegrationer, vilket ger skörhet',
      'RPA kunde bara automatisera processer med mänsklig inblandning'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. RPA marknadsfördes tvärtom som low-code/no-code, tillgängligt för icke-tekniska medarbetare.',
      'Fel. Molnstöd var inte huvudbegränsningen.',
      'Rätt. RPA simulerar en användares klick i ett gränssnitt i stället för att integrera direkt mot systemen — ett litet gränssnittsbyte kan slå ut en hel bot.',
      'Fel. RPA:s hela poäng är att automatisera bort mänsklig inblandning i repetitiva uppgifter.'
    ],
    forklaring: 'Samma sköra UI-baserade arkitektur är skälet till att agentisk AI-orkestrering nu utmanar renodlade RPA-leverantörer.',
    kalla: 'Föreläsning 1'
  },

  /* -------------------- BPM-livscykeln och normativ litteratur -------------------- */
  {
    id: 'proc-livscykel-01', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'flerval', svarighet: 1,
    fraga: 'I vilket steg av den akademiska BPM-livscykeln kartläggs hur en process faktiskt fungerar i dag (as-is)?',
    alternativ: ['Process identification', 'Process discovery', 'Process redesign', 'Process monitoring'],
    ratt: 1,
    forklaringar: [
      'Fel. Identification handlar om att välja vilka processer som ska prioriteras, inte kartlägga dem i detalj.',
      'Rätt. Process discovery kartlägger as-is.',
      'Fel. Redesign designar to-be, den framtida processen.',
      'Fel. Monitoring sker efter implementering.'
    ],
    forklaring: 'Ordningen är identification → modelling → discovery (as-is) → analysis → redesign (to-be) → implementation → monitoring.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-livscykel-02', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilket steg i BPM-livscykeln identifierar gapet mellan as-is och to-be?',
    alternativ: ['Process design', 'Process analysis', 'Process implementation', 'Process optimization'],
    ratt: 1,
    forklaringar: [
      'Fel. Design/redesign kommer efter att gapet redan identifierats.',
      'Rätt. Analysfasen jämför nuläget med det önskade läget och pekar ut vad som behöver förändras.',
      'Fel. Implementation genomför den redan beslutade förändringen.',
      'Fel. "Process optimization" är inget eget steg i den akademiska sjustegslivscykeln.'
    ],
    forklaring: 'Frågan har förekommit ordagrant på en riktig tenta.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-livscykel-03', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: Jestons bok är ett exempel på forskningslitteratur, eftersom den testar hypoteser om varför organisationer beter sig som de gör.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Jestons bok är normativ managementlitteratur — den föreskriver vad chefer bör göra, bedömd efter om den fungerar i praktiken, inte efter vetenskaplig evidens.'
    ],
    forklaring: 'Reijers (2021), Houy et al. (2012) och Rosemann et al. (2024) är exempel på forskningslitteratur i kursen.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-livscykel-04', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är sanningskriteriet för normativ managementlitteratur, till skillnad från forskningslitteratur?',
    alternativ: [
      'Om påståendet stöds av systematisk evidens eller resonemang',
      'Om det fungerar för chefer — en praktikers logik',
      'Om studien går att replikera av andra forskare',
      'Om resultatet är generaliserbart till andra kontexter'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det är forskningslitteraturens sanningskriterium.',
      'Rätt. Normativ litteratur bedöms efter praktisk nytta ("does it work for managers?"), inte efter vetenskaplig evidens.',
      'Fel. Replikerbarhet är ett forskningskriterium.',
      'Fel. Generaliserbarhet är också ett forskningskriterium.'
    ],
    forklaring: 'Det betyder inte att normativ litteratur är sämre — men den kräver kritisk reflektion: under vilka förutsättningar gäller rådet?',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'proc-livscykel-05', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'flerval', svarighet: 1,
    fraga: 'Enligt Jestons "avmystifiering" av BPM: stämmer det att BPM kräver en specifik mjukvarusvit för att fungera?',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Det finns bra teknikstöd, men lyckad BPM är inte beroende av en viss lösning eller leverantör.'
    ],
    forklaring: 'Samma missuppfattning ("BPM är bara mjukvara") avfärdas redan i kapitel 1:s definition av BPM.',
    kalla: 'Föreläsning 1'
  },

  /* -------------------- 7FE-ramverket -------------------- */
  {
    id: 'proc-7fe-01', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilka fyra huvudkomponenter bildar bokstäverna "FE" (upprepat) i namnet "7FE Process Framework"?',
    alternativ: [
      'Foundation, Follow-up, Feedback, Facilitation',
      'Findings and Solutions, Foundations, Fulfilment, Future',
      'Engagement, Empowerment, Execution, Evaluation',
      'Enablement, Engagement, Evaluation, Execution'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Dessa alliterativa F-ord låter rimliga men är inte ramverkets riktiga komponenter.',
      'Rätt. De fyra "F"-komponenterna är Findings and Solutions, Foundations, Fulfilment och Future — tillsammans med enablerna Leadership, People Change Management och Business Process Project Management.',
      'Fel. Dessa E-ord är en konstruerad distraktor, inte ramverkets riktiga namn.',
      'Fel. Samma sak — låter rimligt men är fel kombination.'
    ],
    forklaring: 'En riktig tentafråga bad specifikt om att välja ut ALLA sju komponenter bland en lista där flera alliterativa men falska alternativ blandats in. Lär dig de sju riktiga namnen utantill.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-7fe-02', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är huvudsyftet med processmodellering i Understand-fasen, enligt Jeston?',
    alternativ: [
      'Att producera fullständiga modeller redo för automatisering i ett BPMS',
      'Att definiera detaljerade KPI:er för framtida styrning',
      'Att få fram en gemensam, faktabaserad bild av hur processen fungerar i dag, som underlag för analys',
      'Att skapa dokumentation enbart för revision och kvalitetssäkring'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Det är för tidigt i BPM-arbetet för automatiseringsklara modeller.',
      'Fel. KPI-definition sker senare.',
      'Rätt. Understand-fasens modellering skapar en gemensam bild av nuläget, som grund för att analysera hur processen kan optimeras.',
      'Fel. Revision/kvalitetssäkring är en bieffekt, inte huvudsyftet i just den här fasen.'
    ],
    forklaring: 'Precis den här frågan förekom på HT25:s omtenta med samma fyra typer av felaktiga distraktorer.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-7fe-03', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad skiljer en "process asset" från en ren processmodell, enligt Jeston?',
    alternativ: [
      'Process asset används bara för små förändringar, processmodellen för stora',
      'Processmodellen beskriver en specifik sekvens av aktiviteter, medan process asset dessutom innehåller regler, ägarskap, risker, IT-stöd och dokumentationskrav',
      'Process asset är en typ av BPMN-diagram, medan processmodellen är textbaserad',
      'Det finns ingen egentlig skillnad — termerna används synonymt'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Skillnaden handlar om innehåll, inte förändringens storlek.',
      'Rätt. Process asset är ett vidare begrepp: modellen plus regler, ägarskap, risker, IT-stöd och dokumentationskrav.',
      'Fel. Ingetdera är kopplat till en specifik diagramtyp.',
      'Fel. De är uttryckligen olika begrepp i kursen.'
    ],
    forklaring: 'Vid en incident kopplad till en process är det process asseten — inte bara diagrammet — man vänder sig till för att förstå steg, regler, ansvar och beslutspunkter.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-7fe-04', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är huvudsyftet med en Target Operating Model (TOM)?',
    alternativ: [
      'En detaljerad karta över organisationens processer i nuläget (as-is)',
      'Ett verktyg för att beräkna kostnadsbesparingar från processförbättringar',
      'En schematisk överblick över organisationens framtida IT-arkitektur',
      'En övergripande beskrivning av hur organisationens olika delar ska fungera i framtiden för en lyckad BPM-implementering'
    ],
    ratt: 3,
    forklaringar: [
      'Fel. TOM handlar om framtiden, inte nuläget — det är motsatsen till as-is.',
      'Fel. TOM är inte primärt ett kalkylverktyg.',
      'Fel. TOM är bredare än bara IT-arkitektur — den omfattar hela organisationen.',
      'Rätt. TOM fastställs i Foundations-fasen och beskriver helhetsbilden av det önskade framtida tillståndet.'
    ],
    forklaring: 'Håll TOM isär från Red Wine Test: TOM är en mer strukturerad, formell beskrivning; Red Wine Test är en informell workshop-övning med samma framåtblickande syfte.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-7fe-05', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknar ett Red Wine Test, enligt Jeston?',
    alternativ: [
      'En kartläggning och analys av organisationens as-is-processer',
      'En workshop där man analyserar strategidokument och kopplar dem till centrala processer',
      'Deltagarna föreställer sig att BPM-projektet redan är genomfört och beskriver det önskade framtida tillståndet',
      'En genomgång av riskerna kopplade till olika processer'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Det är Understand-fasens jobb, inte Red Wine Test.',
      'Fel. Det beskriver ett annat sorts strategiworkshop-upplägg.',
      'Rätt. Red Wine Test skapar ett gemensamt narrativ om hur framgång ser ut, genom att föreställa sig att projektet redan lyckats.',
      'Fel. Riskgenomgång är en annan aktivitet.'
    ],
    forklaring: 'Namnet syftar på den avslappnade, informella tonen — som ett samtal över ett glas rödvin om hur bra allt blivit.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-7fe-06', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknar en "quick win" i BPM-sammanhang?',
    alternativ: [
      'Den kräver ofta extern konsultkompetens och omfattande förstudier',
      'Den har liten praktisk effekt men stor symbolisk betydelse',
      'Den kan genomföras snabbt, utan stora kostnader, och ger omedelbar förbättring',
      'Den minskar behovet av workshops och andra tidskrävande BPM-aktiviteter'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Tvärtom — quick wins kräver just inte omfattande förstudier.',
      'Fel. Effekten ska vara verklig och omedelbar, inte bara symbolisk.',
      'Rätt. Snabbt, billigt, omedelbar effekt — poängen är att bygga momentum tidigt.',
      'Fel. Quick wins ersätter inte det grundläggande BPM-arbetet.'
    ],
    forklaring: 'En quick win är ett sätt att visa värde tidigt medan de större, mer tidskrävande förändringarna fortfarande pågår.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-7fe-07', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 3,
    fraga: 'Påstående: Enligt 7FE-ramverket blir uppföljning (Follow-up/Sustainability) onödig så snart Evaluation-fasen visar att BPM-målen är fullt uppnådda.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Sustainability handlar om löpande styrning och kontinuerlig förbättring, oavsett vad en enskild utvärdering visat. BPM är en cykel, inte ett engångsprojekt.'
    ],
    forklaring: 'Samma logik som BPM-livscykeln: monitoring leder tillbaka till identification, det tar aldrig riktigt slut.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-7fe-08', delkurs: 'processer', amne: 'proc-7fe',
    typ: 'flerval', svarighet: 3,
    fraga: 'Påstående: Enablement-fasen i 7FE handlar uteslutande om tekniskt stöd, som BPM-mjukvara och verktyg.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Enablement handlar om strukturerat stöd och resurser i vidare mening — inklusive kompetens och organisatoriskt stöd, inte bara teknik. "Uteslutande" är ordet som gör påståendet falskt.'
    ],
    forklaring: 'En vanlig anledning till BPM-misslyckanden är just en svag Enablement-grund: brist på strukturerat stöd och resurser för BPM-kompetens, inte bristande mjukvara.',
    kalla: 'Tentamen HT24'
  },

  /* -------------------- Att starta och driva BPM-arbete -------------------- */
  {
    id: 'proc-impl-01', delkurs: 'processer', amne: 'proc-implementering',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är skillnaden mellan en driver och en trigger i BPM-sammanhang?',
    alternativ: [
      'Drivers är externa faktorer, triggers är interna initiativ från ledningen',
      'Drivers är operativa frågor, triggers är strategiska mål',
      'Drivers är långsiktiga strategiska motivatorer, triggers är specifika händelser som utlöser omedelbar handling',
      'Drivers är mätbara processmått, triggers är milstolpar som visar processframgång'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Skillnaden handlar inte om internt/externt.',
      'Fel. Det är tvärtom — drivers är snarare de mer strategiska.',
      'Rätt. Driver = långsiktig motivator, trigger = specifik händelse som kräver handling nu.',
      'Fel. Ingetdera begrepp definieras som ett mått eller en milstolpe.'
    ],
    forklaring: 'En organisation kan ha en driver (t.ex. konkurrenstryck) i bakgrunden länge innan en konkret trigger (t.ex. en kundförlust) får dem att faktiskt agera.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-impl-02', delkurs: 'processer', amne: 'proc-implementering',
    typ: 'flerval', svarighet: 2,
    fraga: 'En myndighet måste anpassa sina processer till nya nationella regler som påverkar hela verksamheten. Enligt Jeston bör de...',
    alternativ: [
      'skjuta upp projektet tills varje enhet skapat egna interna planer',
      'köra ett rent bottom-up-angreppssätt eftersom det engagerar flest personer',
      'lämna lösningen till varje avdelning att hantera decentraliserat',
      'driva arbetet top-down för att säkerställa styrning, mandat och samordning över hela organisationen'
    ],
    ratt: 3,
    forklaringar: [
      'Fel. Att vänta löser inget regulatoriskt tvingande krav.',
      'Fel. Bottom-up passar bättre för lokala förbättringar, inte tvärfunktionella, strategiskt tvingande förändringar.',
      'Fel. Decentraliserad hantering ger inkonsekvent efterlevnad av ett krav som gäller hela verksamheten.',
      'Rätt. Strategiskt viktiga, tvärfunktionella förändringar kräver top-down-styrning för samordning.'
    ],
    forklaring: 'Jämför med "under the radar" och "bottom-up", som passar bättre när ledningen INTE är engagerad och strategin är oklar — motsatt situation.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-impl-03', delkurs: 'processer', amne: 'proc-implementering',
    typ: 'flerval', svarighet: 2,
    fraga: 'Två processanalytiker på en HR-avdelning har på eget initiativ börjat kartlägga sina processer. Cheferna känner till det men har inte prioriterat det — arbetet sker sporadiskt utan budget eller formell styrning. Vilket Jeston-scenario beskriver detta?',
    alternativ: ['Business as usual', 'Under the radar', 'In the driver’s seat', 'Pilot project'],
    ratt: 1,
    forklaringar: [
      'Fel. Business as usual innebär att BPM redan är en etablerad, löpande del av verksamheten.',
      'Rätt. Under the radar: känt av ledningen men inte formellt prioriterat, sporadiskt och utan styrning.',
      'Fel. In the driver’s seat innebär tydlig, aktiv kontroll — motsatsen till scenariot här.',
      'Fel. Ett pilotprojekt är avgränsat och tidsbestämt, inte ett odefinierat, informellt initiativ.'
    ],
    forklaring: 'Ordagrant hämtat scenario från HT25:s omtenta.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-impl-04', delkurs: 'processer', amne: 'proc-implementering',
    typ: 'flerval', svarighet: 2,
    fraga: 'Påstående: I ett "business-as-usual"-scenario är BPM-arbetet pausat, och det finns inget behov av löpande processutvärdering förrän ett uttryckligt behov uppstår.',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Business as usual betyder att BPM är en etablerad, ständigt pågående del av verksamheten — inte att den är pausad.'
    ],
    forklaring: 'Namnet är lite missvisande om man läser det bokstavligt: "vanligt" här betyder normaliserat och inbäddat, inte vilande.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-impl-05', delkurs: 'processer', amne: 'proc-implementering',
    typ: 'flerval', svarighet: 3,
    fraga: 'Ett projekt bör enligt Jeston involvera endast ledningsgruppen, för att beslut ska kunna fattas snabbt och effektivt. Sant eller falskt?',
    alternativ: ['Sant', 'Falskt'],
    ratt: 1,
    forklaringar: [
      'Fel.',
      'Rätt. Kursen understryker tvärtom att brett engagemang (inte bara ledningen) är avgörande — kom ihåg att cirka 60 % av BPM-arbetet handlar om just kommunikation och mänskliga aspekter.'
    ],
    forklaring: 'Att begränsa deltagandet till ledningen ökar risken för motstånd och uteblivet adoption längre ner i organisationen — samma misstag som fällde många BPR-projekt.',
    kalla: 'Tentamen HT24'
  },

  /* -------------------- Leadership och people change management -------------------- */
  {
    id: 'proc-forandring-01', delkurs: 'processer', amne: 'proc-forandring',
    typ: 'flerval', svarighet: 2,
    fraga: 'Ungefär hur stor andel av arbetet i ett BPM-initiativ menar Jeston handlar om kommunikation och mänskliga aspekter, snarare än teknik eller modellering?',
    alternativ: ['Cirka 20 %', 'Cirka 40 %', 'Cirka 60 %', 'Cirka 90 %'],
    ratt: 2,
    forklaringar: [
      'Fel.',
      'Fel.',
      'Rätt. Cirka 60 % — en majoritet, men inte "nästan allt".',
      'Fel. Överdriver andelen.'
    ],
    forklaring: 'Siffran är central i en av HT25:s essäfrågor: diskutera varför dessa delar är avgörande, och vilka risker som uppstår om de inte prioriteras.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-forandring-02', delkurs: 'processer', amne: 'proc-forandring',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad innebär BPM-husets metafor, enligt Jeston?',
    alternativ: [
      'BPM ska ses som ett enskilt, avgränsat projekt',
      'BPM byggs upp stegvis från processkartläggning och automatisering, innan strategi utvecklas',
      'BPM består av flera samverkande lager — från strategiska grunder till operativa och innovativa processer — som tillsammans skapar en effektiv organisation',
      'BPM handlar om att bygga IT-system steg för steg enligt en arkitekturplan'
    ],
    ratt: 2,
    forklaringar: [
      'Fel. Metaforen betonar tvärtom att BPM inte är ett enskilt projekt.',
      'Fel. Ordningen är fel — strategiska grunder kommer inte efter kartläggning.',
      'Rätt. Flera lager som tillsammans bär upp organisationen, inklusive processtransformation, people change management och benefits realization.',
      'Fel. Det beskriver snarare en IT-arkitekturprocess, inte BPM-husets bredare idé.'
    ],
    forklaring: 'Utan alla lager samtidigt — inte bara den tekniska processdesignen — riskerar "huset" att inte hålla ihop.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-forandring-03', delkurs: 'processer', amne: 'proc-forandring',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilket av följande stämmer om Leadership som stödjande komponent i 7FE?',
    alternativ: [
      'Leadership handlar om att säkerställa att resurser, budget, tidsplaner och leverabler hanteras',
      'Leadership handlar om att organisationens ledare ger stöd och vägledning så att BPM-arbetet och organisationen är i linje och levererar rätt affärsutfall',
      'Leadership handlar om att säkerställa att alla intressenter är villiga att bidra till den framtida lösningen',
      'Leadership handlar enbart om extern kommunikation med kunder'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det beskriver snarare Business Process Project Management.',
      'Rätt. Ledarnas stöd och vägledning för att hålla BPM och organisationen i linje.',
      'Fel. Det beskriver People Change Management.',
      'Fel. Leadership handlar om intern styrning, inte extern kundkommunikation.'
    ],
    forklaring: 'De tre enablerna Leadership, People Change Management och Business Process Project Management har varsin tydlig, avgränsad roll — blanda inte ihop dem.',
    kalla: 'Tentamen HT24'
  },
  {
    id: 'proc-forandring-04', delkurs: 'processer', amne: 'proc-forandring',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknar appreciative inquiry som förändringsledningsansats?',
    alternativ: [
      'Fokus på vad som är fel, och sökande efter rotorsaker till misslyckanden',
      'Fokus på vad som fungerar, och sökande efter rotorsaker till framgång',
      'Hinder behandlas alltid som barriärer som måste undanröjas',
      'Metoden bygger på att analysera konkurrenters misstag'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det beskriver den traditionella problemfokuserade ansatsen — motsatsen till appreciative inquiry.',
      'Rätt. Appreciative inquiry bygger organisationens förändring på det som redan fungerar.',
      'Fel. Hinder ses snarare som något att lära av än som rena barriärer.',
      'Fel. Metoden handlar om den egna organisationen, inte konkurrentanalys.'
    ],
    forklaring: 'Samma framåtblickande, positiva grundlogik som Red Wine Test (kapitel 3).',
    kalla: 'Tentamen HT24'
  },

  /* -------------------- Processoptimering -------------------- */
  {
    id: 'proc-opt-01', delkurs: 'processer', amne: 'proc-optimering',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilka räknar Jeston som typiska processoptimeringslösningar att välja mellan?',
    alternativ: [
      'Process redesign, outsourcing, shared services, RPA och molntjänster',
      'Leadership, project management och people change management',
      'Integration-centric BPM, human-centric BPM och customer-centric BPM',
      'Activity-based costing, processmodellering och workflow management'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Detta är Jestons uppräkning av konkreta lösningar.',
      'Fel. Det är stödjande komponenter/enablers, inte optimeringslösningar.',
      'Fel. Det är olika BPM-perspektiv (vad initiativet fokuserar på), inte lösningar.',
      'Fel. Blandad lista utan koppling till Jestons uppräkning.'
    ],
    forklaring: 'Håll isär "lösningar man väljer mellan" från "perspektiv ett initiativ kan ha" och "stödjande komponenter" — tre olika sorters listor som lätt blandas ihop på tentan.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-opt-02', delkurs: 'processer', amne: 'proc-optimering',
    typ: 'flerval', svarighet: 1,
    fraga: 'Ett team hanterar dagligen hundratals fakturarader genom att kopiera data från e-post till ett ERP-system. Stegen är alltid likadana och kräver inget omdöme. Vilken optimeringslösning passar bäst?',
    alternativ: ['Agentic AI process orchestration', 'RPA (Robotic Process Automation)', 'Redesign av processen med hjälp av BPM', 'Outsourcing i kombination med molnbaserad lösning'],
    ratt: 1,
    forklaringar: [
      'Fel. Agentisk AI-orkestrering passar mer komplexa, beslutsberoende flöden.',
      'Rätt. Repetitivt, regelstyrt och UI-baserat — precis det RPA är gjort för.',
      'Fel. Redesign är en större insats än vad ett rent kopieringsproblem kräver.',
      'Fel. Outsourcing löser inte den underliggande, mycket repetitiva uppgiften på samma direkta sätt.'
    ],
    forklaring: 'Kom ihåg RPA:s begränsning (kapitel 6): fungerar bra just för den här typen av enkla, regelstyrda UI-uppgifter, men skalar sämre för mer komplexa flöden.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-opt-03', delkurs: 'processer', amne: 'proc-optimering',
    typ: 'flerval', svarighet: 2,
    fraga: 'En organisation redesignar sin ärendehantering med fokus på snabbare svar till kund, färre hand-offs mellan avdelningar och en tydlig kontaktpunkt. Vilket BPM-perspektiv dominerar?',
    alternativ: ['Integration-centric BPM', 'System-centric BPM', 'Customer-centric BPM', 'Employee-centric BPM'],
    ratt: 2,
    forklaringar: [
      'Fel. Integration-centric fokuserar på systemkoppling, inte kundupplevelse.',
      'Fel. System-centric prioriterar IT-perspektivet.',
      'Rätt. Snabbare svar, färre hand-offs, tydlig kontaktpunkt — allt handlar om kundens upplevelse.',
      'Fel. Employee-centric fokuserar på medarbetarupplevelsen, inte kundens.'
    ],
    forklaring: 'Vilket perspektiv som dominerar avgörs av VAD initiativet optimerar för, inte av vilken teknik som används.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-opt-04', delkurs: 'processer', amne: 'proc-optimering',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är den viktigaste skillnaden mellan traditionell BPM/RPA-automatisering och "autonomisering" i agentisk AI, enligt Rosemann et al. (2024)?',
    alternativ: [
      'Autonomisering är billigare att implementera',
      'Vid autonomisering beslutar agenten själv vad som ska göras utifrån målet, i stället för att bara utföra ett i förväg definierat steg',
      'Autonomisering kräver ingen mänsklig övervakning alls, någonsin',
      'Autonomisering fungerar bara i molnbaserade system'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Kostnad är inte den definierande skillnaden i artikeln.',
      'Rätt. Det är just förskjutningen "från automatisering till autonomisering" — agenten fattar egna beslut om hur målet ska nås.',
      'Fel. Artikeln beskriver en förskjutning, inte en garanti för fullständig frånvaro av tillsyn.',
      'Fel. Ingen sådan teknisk begränsning nämns.'
    ],
    forklaring: 'De tre drifterna behandlas mer utförligt i kapitel 7 om BPM som forskningsfält.',
    kalla: 'Rosemann et al. (2024)'
  },

  /* -------------------- BPM som forskningsfält -------------------- */
  {
    id: 'proc-akad-01', delkurs: 'processer', amne: 'proc-akademisk',
    typ: 'flerval', svarighet: 2,
    fraga: 'Varför har Green BPM, enligt Houy et al. (2012) och kursens egen bedömning, inte fått det breda genomslag som förutspåddes?',
    alternativ: [
      'De flesta BPM-verktyg saknar inbyggt stöd för att lagra, räkna och analysera energi-, utsläpps- och resursdata i modellerna',
      'BPM håller på att helt ersättas av agentisk AI-orkestrering',
      'Hållbarhetsdata får enligt lag inte lagras i BPM- eller ERP-system',
      'Process mining fungerar inte alls för CO₂-relaterad data'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Det är en teknisk begränsning i verktygen, inte ett juridiskt eller konceptuellt hinder.',
      'Fel. Det är inte skälet till Green BPM:s uteblivna genomslag specifikt.',
      'Fel. Ingen sådan lagstiftning nämns eller antyds i materialet.',
      'Fel. Överdrivet och obelagt påstående.'
    ],
    forklaring: 'Lägg märke till att tre av fyra alternativ låter rimliga men pekar på fel sorts hinder (juridik, teknikbyte, mätbarhet) — det korrekta svaret handlar specifikt om verktygens datastöd.',
    kalla: 'Tentamen HT25; Houy et al. (2012)'
  },
  {
    id: 'proc-akad-02', delkurs: 'processer', amne: 'proc-akademisk',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilket av följande är INTE ett av Reijers (2021) sju forskningsteman inom BPM?',
    alternativ: ['Process mining', 'Coordination and interoperability', 'Model management', 'Marknadsföringsstrategi'],
    ratt: 3,
    forklaringar: [
      'Fel svar på frågan, men sant: process mining är ett av de sju.',
      'Fel svar på frågan, men sant: koordinering/interoperabilitet är ett av de sju.',
      'Fel svar på frågan, men sant: model management är ett av de sju.',
      'Rätt — det här är INTE ett av Reijers teman. De sju är: BPMS, process modeling, process design, coordination and interoperability, model management, process mining och new technologies.'
    ],
    forklaring: 'Reijers gick igenom över 100 artiklar publicerade i Computers in Industry under fyrtio år för att identifiera dessa sju teman.',
    kalla: 'Reijers (2021)'
  },
  {
    id: 'proc-akad-03', delkurs: 'processer', amne: 'proc-akademisk',
    typ: 'flerval', svarighet: 2,
    fraga: 'Rosemann et al. (2024) beskriver tre "drifts" (förskjutningar) för BPM i AI-eran. Vilken av följande är EN av dem?',
    alternativ: [
      'Från konversation till transaktion',
      'Från transaktion till konversation',
      'Från sofistikering till förenkling',
      'Från autonomisering till automatisering'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Riktningen är omvänd mot artikelns argument.',
      'Rätt. En av de tre drifterna: processer blir mer dialogdrivna (konversation) i stället för stela formulärsekvenser (transaktion).',
      'Fel. Riktningen är omvänd — artikeln beskriver en rörelse MOT sofistikering.',
      'Fel. Riktningen är omvänd — artikeln beskriver en rörelse MOT autonomisering.'
    ],
    forklaring: 'De tre drifterna är: transaktion → konversation, automatisering → autonomisering, förenkling → sofistikering. Lägg märke till att alla tre distraktorer bara vänder på en riktig drifts riktning.',
    kalla: 'Rosemann et al. (2024)'
  },
  {
    id: 'proc-akad-04', delkurs: 'processer', amne: 'proc-akademisk',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vad är BPMS, som Reijers lyfter fram som ett centralt forskningstema?',
    alternativ: [
      'En metod för förändringsledning',
      'En mjukvaruplattform som stödjer definition, exekvering och spårning av processer',
      'Ett annat namn för BPMN',
      'En typ av gateway i processdiagram'
    ],
    ratt: 1,
    forklaringar: [
      'Fel. Det beskriver snarare change management-metoder.',
      'Rätt. Business Process Management System — mjukvaran som kör och övervakar processer.',
      'Fel. BPMN är notationen, BPMS är exekveringsplattformen — olika saker.',
      'Fel. Gateways är ett BPMN-notationsbegrepp, inte kopplat till BPMS.'
    ],
    forklaring: 'Håll isär BPM (disciplinen), BPMN (notationen för att rita processer) och BPMS (mjukvaran som kör dem).',
    kalla: 'Reijers (2021)'
  },

  /* -------------------- Essäfrågor -------------------- */
  {
    id: 'proc-essa-01', delkurs: 'processer', amne: 'proc-forandring',
    typ: 'oppen', svarighet: 3,
    fraga:
      'Jeston (2022) framhåller att cirka 60 % av arbetet i ett BPM-initiativ handlar om ' +
      'kommunikation och mänskliga aspekter snarare än teknik eller modellering. Diskutera ' +
      'varför dessa delar är avgörande för att BPM-arbetet ska lyckas, och vilka risker som ' +
      'uppstår om de inte prioriteras.',
    nyckelpunkter: [
      'Nämn siffran (cirka 60 %) och att den handlar om kommunikation/mänskliga aspekter, inte teknik',
      'Koppla till att processer utförs av människor — även en perfekt designad process kräver att medarbetarna faktiskt förändrar sitt beteende',
      'Nämn BPM-husets metafor: people change management är en av grundpelarna, inte ett tillägg',
      'Risk: motstånd från medarbetare om de inte involveras eller informeras',
      'Risk: uteblivet adoption — processen ser bra ut på papper men används aldrig i praktiken',
      'Koppla till BPR:s historiska misslyckanden (kapitel 1) som varnande exempel på vad som händer när man ignorerar den mänskliga sidan',
      'Nämn gärna appreciative inquiry eller Leadership/People Change Management som konkreta motmedel'
    ],
    modellsvar:
      'Jestons poäng är att BPM till sin natur är ett förändringsarbete, inte ett ' +
      'tekniskt projekt — processer utförs av människor, och även den mest välformulerade ' +
      'to-be-processen ger ingen effekt om medarbetarna inte faktiskt ändrar hur de arbetar. ' +
      'Det är därför BPM-huset bygger på flera lager samtidigt, där people change management ' +
      'är en lika grundläggande pelare som själva processdesignen — inte ett tillägg i ' +
      'slutet av projektet.\n\n' +
      'Riskerna med att nedprioritera detta är konkreta och historiskt väldokumenterade. ' +
      'BPR-vågen på 90-talet floppade ofta av precis den anledningen: radikala, ' +
      'toppstyrda förändringar möttes av starkt motstånd, användes som förevändning för ' +
      'nedskärningar i stället för att "empowra" medarbetare, och misslyckades med att ta ' +
      'hänsyn till adoption. Konsekvensen blev att tekniskt sett välfungerande nya processer ' +
      'aldrig slog rot i den dagliga verksamheten.\n\n' +
      'Jestons egna motmedel är dels enablern People Change Management (att säkerställa att ' +
      'berörda är kapabla och villiga att bidra till lösningen), dels Leadership (att ' +
      'ledningen ger stöd och riktning så att BPM-arbetet hålls i linje med organisationen), ' +
      'och dels förändringsledningsverktyg som appreciative inquiry, som bygger förändringen ' +
      'på det som redan fungerar i stället för att bara peka ut fel.',
    kalla: 'Tentamen HT25'
  },
  {
    id: 'proc-essa-02', delkurs: 'processer', amne: 'proc-livscykel',
    typ: 'oppen', svarighet: 3,
    fraga:
      'Jeston (2022) framhåller att processer bör förbättras innan de automatiseras med hjälp ' +
      'av teknologiska lösningar. Diskutera varför detta är en central princip i BPM-arbetet.',
    nyckelpunkter: [
      'Koppla till produktivitetsparadoxen: teknik ovanpå oförändrade processer ger ingen effekt',
      'Koppla till Hammers grundtes: "obliterate, don\'t automate" — att automatisera en dålig process bara ger en snabbare dålig process',
      'Nämn RPA:s begränsning som ett modernt exempel: en robot som efterliknar en dålig manuell process ärver samma svagheter',
      'Nämn as-is/to-be: processen måste förstås och designas om (to-be) innan implementering/automatisering',
      'Ge ett konkret exempel (Ford, IBM Credit, eller eget resonerat exempel) på vad som händer när man automatiserar utan att först redesigna'
    ],
    modellsvar:
      'Principen bygger direkt på produktivitetsparadoxen: 70- och 80-talets erfarenhet var ' +
      'att IT-investeringar inte gav ökad produktivitet, eftersom tekniken lades ovanpå ' +
      'processer som i grunden inte förändrades. Hammers artikel formulerade samma insikt ' +
      'som en tydlig tes — "obliterate, don\'t automate" — att automatisera en dålig process ' +
      'bara ger en snabbare dålig process, eftersom felen och friktionen i arbetssättet ' +
      'följer med rakt in i den nya tekniken.\n\n' +
      'BPM-livscykelns ordning speglar samma logik: man kartlägger as-is, analyserar var ' +
      'problemen finns, och designar om till ett bättre to-be — innan man implementerar och ' +
      'automatiserar. Hoppar man över analys- och redesignstegen riskerar man att bygga in ' +
      'gamla ineffektiviteter i ett nytt, dyrare och svårare-att-ändra system.\n\n' +
      'Samma mönster syns i modern tid med RPA: en robot som efterliknar en människas klick ' +
      'i ett dåligt designat gränssnitt ärver exakt samma svagheter (och blir dessutom skör, ' +
      'eftersom UI-baserad automatisering är känslig för minsta förändring). Lärdomen är ' +
      'konsekvent genom hela kursens historik, från BPR via RPA till dagens agentiska AI: ' +
      'teknik löser inget som en dålig process inte redan har löst konceptuellt.',
    kalla: 'Tentamen HT25'
  }
]);
