/* =========================================================================
   Frågor på FÖRELÄSNING 1 – enterprise IT, datastrategi och företagsteorier.

   Materialet finns bara i föreläsningen, inte i kursboken. Tentan bygger
   uttryckligen på båda, så det här är frågor som är lätta att bli tagen på
   sängen av.

   Alternativen är avsiktligt jämnlånga, och rätt svar blandas till en
   slumpmässig position vid visning (se js/ova.js).
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = (window.SYSB23.fragor || []).concat([

  /* -------------------- Enterprise IT-historien -------------------- */
  {
    id: 'str-ent-01', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 1,
    fraga: 'Vad menas med produktivitetsparadoxen?',
    alternativ: [
      'Att IT-investeringar inte syntes som ökad produktivitet i statistiken',
      'Att produktiviteten steg snabbare än vad företagen hann anställa',
      'Att produktiva företag investerade mindre i IT än de oproduktiva',
      'Att produktivitetsmått blev omöjliga att beräkna efter datoriseringen'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Robert Solow formulerade det 1987: "You can see the computer age everywhere but in the productivity statistics." Förklaringen är att IT som läggs ovanpå **oförändrade processer** inte ger någon produktivitetsökning.',
      'Fel. Det motsatta förhållandet — produktiviteten steg just **inte** trots investeringarna.',
      'Fel. Paradoxen handlar inte om vilka som investerade utan om att investeringarna inte gav utslag.',
      'Fel. Måtten fanns och fungerade. Det var resultatet som uteblev, inte mätningen.'
    ],
    forklaring: 'Paradoxen är utgångspunkten för hela delkursens IT-spår: den motiverar varför strategisk alignment blev svaret.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ent-02', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad kännetecknade företagens IT-landskap under 80- och 90-talet enligt föreläsningen?',
    alternativ: [
      'Enterprise application spaghetti: många system utan strategisk koppling',
      'Ett fåtal välintegrerade system styrda direkt av företagsledningen',
      'Standardiserade molntjänster som köptes in färdiga från leverantörer',
      'Långsam datorisering eftersom tekniken ännu var för dyr för företag'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Alla satsade stort men ofta ostrukturerat. IT sågs inte som strategisk verksamhet, låg i en organisatorisk silo, och IT-avdelningen betraktades närmast som en vaktmästare.',
      'Fel. Tvärtom: ledningen bestod av en generation som inte var digital, och IT hade ingen strategisk koppling till kärnaffären.',
      'Fel. Molntjänster fanns inte. COTS fick genomslag först efter Clinger-Cohen 1996.',
      'Fel. Moores lag hade redan gjort datorisering ekonomiskt försvarbar för allt fler företag och processer.'
    ],
    forklaring: 'Silo-placeringen är inte en detalj utan förklaringen: IT utan koppling till affären ger ingen affärsnytta.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ent-03', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilket av följande blev INTE en konsekvens av Clinger-Cohen Act 1996?',
    alternativ: [
      'Att öppen källkod blev huvudregel i offentlig upphandling av system',
      'Att CIO-rollen legitimerades som en strategisk ledningsfunktion',
      'Att Enterprise Architecture etablerades som managementdisciplin',
      'Att COTS fick stort genomslag och IT började styras som investering'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt — det här är alltså det som INTE följde. Öppen källkod nämns inte alls i sammanhanget. Lagen handlade om styrning och roller, inte om licensmodeller.',
      'Fel svar på frågan, men sant i sak: CIO-rollen fick sin strategiska legitimitet just här.',
      'Fel svar på frågan, men sant: EA etablerades som egen disciplin. Det är därför du läser verksamhetsarkitektur senare i SYSB23.',
      'Fel svar på frågan, men sant: både COTS-genomslaget och IT governance kom ur reformen.'
    ],
    forklaring: 'Fem konsekvenser att kunna: CIO som strategisk roll, Enterprise Architecture, IT governance, COTS och strategic alignment.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ent-04', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad var gemensamt för 90-talets managementmetoder som TQM, BPR, Lean och Six Sigma?',
    alternativ: [
      'De ändrade processerna i stället för att bara datorisera dem som de var',
      'De ersatte företagens egna system med inköpta standardapplikationer',
      'De flyttade beslutsfattandet från ledningen ut till enskilda medarbetare',
      'De reglerade hur offentlig sektor fick upphandla informationssystem'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Det är just poängen: de behandlar verksamheten som processer som kan mätas och förbättras, och förutsätter att systemen utformas efter processerna — inte tvärtom.',
      'Fel. COTS var en separat utveckling som kom med Clinger-Cohen, inte kärnan i metoderna.',
      'Fel. Medarbetarskap är ett annat begrepp, från kapitlet om mjuka styrmedel.',
      'Fel. Det beskriver Clinger-Cohen Act, inte managementmetoderna.'
    ],
    forklaring: 'Metoderna är svaret på produktivitetsparadoxen: om IT i oförändrade processer inte ger effekt måste processerna ändras.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ent-05', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 3,
    fraga: 'Vad menas med att komplexiteten i IT-landskapet är KUMULATIV?',
    alternativ: [
      'Att varje ny IT-epok läggs ovanpå den förra i stället för att ersätta den',
      'Att kostnaden för IT stiger snabbare än nyttan i takt med att systemen åldras',
      'Att antalet leverantörer ökar för varje ny teknikgeneration som införs',
      'Att komplexiteten ökar linjärt med antalet anställda i organisationen'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. SaaS, mobilt och moln kom ovanpå de gamla systemen. Big data, ML och AI ovanpå det. Cybersäkerhet och integritet ovanpå det. Nu agentisk AI. Varje lager kräver nya integrationer och en ny helhetssyn.',
      'Fel. Det beskriver teknisk skuld, som är ett närliggande men annat begrepp.',
      'Fel. Antalet leverantörer är en följd, inte det som avses med kumulativ komplexitet.',
      'Fel. Sambandet gäller antalet system och kopplingar mellan dem, inte antalet anställda.'
    ],
    forklaring: 'Kumulativ komplexitet på makronivå förklarar varför man aldrig blir klar. På mikronivå upprepar sig dessutom produktivitetsparadoxen inom varje nytt område som digitaliseras.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ent-06', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad är huvudpoängen i Henderson och Venkatramans Strategic Alignment Model?',
    alternativ: [
      'Att fördelen ligger i förmågan att fortlöpande utnyttja IT, inte i systemet',
      'Att IT-strategin bör formuleras innan affärsstrategin läggs fast',
      'Att organisationsinfrastrukturen bör anpassas efter systemleverantörens krav',
      'Att en tillräckligt avancerad applikation ger uthållig konkurrensfördel'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Deras egen formulering: ingen enskild IT-applikation, hur avancerad den än är, kan i sig ge en uthållig konkurrensfördel — fördelen ligger i organisationens förmåga att fortlöpande utnyttja funktionaliteten.',
      'Fel. Modellen handlar om ömsesidig anpassning mellan fyra områden, inte om en bestämd ordning.',
      'Fel. Anpassningen sker mot affärsstrategin, inte mot en leverantör.',
      'Fel. Det är exakt det påstående modellen avvisar — och samma sak Barney säger om AI trettio år senare.'
    ],
    forklaring: 'De fyra områdena: affärsstrategi, IT-strategi, organisationsinfrastruktur och IT-infrastruktur.',
    kalla: 'Föreläsning 1'
  },

  /* -------------------- Datastrategi -------------------- */
  {
    id: 'str-dat-01', delkurs: 'strategi', amne: 'str-data',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vilka fyra delar består AI-fabriken av enligt Iansiti och Lakhani?',
    alternativ: [
      'Data pipeline, algoritmutveckling, experimentplattform, IT-infrastruktur',
      'Datainsamling, lagring, visualisering och rapportering till ledningen',
      'Strategi, struktur, system och kultur i en samverkande helhet',
      'Insamling, anonymisering, kvalitetssäkring och radering av persondata'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Data pipeline samlar in, rensar och lagrar. Algoritmutvecklingen bygger och tränar modeller offline. Experimentplattformen testar dem mot varandra. IT-infrastrukturen håller ihop det.',
      'Fel. Visualisering och rapportering hör till klassisk BI, inte till AI-fabrikens fyra delar.',
      'Fel. Det är ett organisationsteoretiskt ramverk, inte AI-fabriken.',
      'Fel. Det beskriver dataskyddsarbete, alltså en del av data defense.'
    ],
    forklaring: 'Poängen är vad som inte finns med: ingen människa deltar i besluten. De är digitaliserade, inte bara understödda av teknik.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-dat-02', delkurs: 'strategi', amne: 'str-data',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad skiljer data defense från data offense enligt DalleMule och Davenport?',
    alternativ: [
      'Defense minimerar risk, offense maximerar avkastningen på datan',
      'Defense gäller kunddata medan offense gäller företagets interna data',
      'Defense sköts av IT-avdelningen medan offense sköts av verksamheten',
      'Defense avser säkerhetskopior medan offense avser realtidsanalyser'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Defense: efterlevnad, bedrägeridetektering, skydd mot intrång, intern dataintegritet. Offense: insamlingsstrategier, integration och analys, data mining, BI och AI.',
      'Fel. Uppdelningen går efter syfte — risk mot avkastning — inte efter vilken sorts data det gäller.',
      'Fel. Båda riktningarna är verksamhetsfrågor, inte en fråga om vem som utför dem.',
      'Fel. Säkerhetskopior och realtidsanalys är exempel inom respektive riktning, men inte det som definierar dem.'
    ],
    forklaring: 'De drar åt olika håll och måste balanseras. Ett företag kan inte maximera båda samtidigt.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-dat-03', delkurs: 'strategi', amne: 'str-data',
    typ: 'flerval', svarighet: 3,
    fraga: 'Hur förhåller sig SSOT och MVoT till data defense respektive data offense?',
    alternativ: [
      'SSOT hör till defense och MVoT till offense',
      'MVoT hör till defense och SSOT till offense',
      'Båda hör till defense, eftersom båda handlar om datakvalitet',
      'Båda hör till offense, eftersom båda möjliggör analys av data'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Single source of truth är intern dataintegritet — en auktoritativ version, alltså försvar. Multiple versions of the truth är flera bearbetade versioner för olika analysändamål, alltså offensiv.',
      'Fel — det är omvänt. Fundera på vad respektive begrepp används till: en sanning skyddar, flera versioner möjliggör.',
      'Fel. MVoT hör till offensiven; det handlar inte om kvalitet utan om användbarhet för olika ändamål.',
      'Fel. SSOT hör till försvaret och handlar om integritet, inte om analyskapacitet.'
    ],
    forklaring: 'De framstår som motstridiga just för att de tjänar olika syften. Poängen är att versionerna ska kunna härledas tillbaka till den enda källan.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-dat-04', delkurs: 'strategi', amne: 'str-data',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad avgör enligt föreläsningen hur offensiv en datastrategi kan tillåtas vara?',
    alternativ: [
      'Hur höga insatserna är om något går fel, vilket reglering till stor del styr',
      'Hur stor datamängd företaget hunnit bygga upp genom åren',
      'Hur mycket företaget har investerat i sin IT-infrastruktur',
      'Hur många av de anställda som har analytisk kompetens idag'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Rättsväsende, polis och sjukvård har högst insatser, därefter bank och försäkring, lägst har detaljhandel och underhållning. GDPR har dessutom gjort de flesta sektorer high-stakes i EU när det gäller personuppgifter.',
      'Fel. Storleken på datamängden avgör inte vad man får göra med den — Barney påpekar dessutom att mer data inte nödvändigtvis ger bättre resultat.',
      'Fel. Infrastrukturen är en förutsättning, inte det som sätter gränsen.',
      'Fel. Kompetens avgör vad man förmår, inte vad man tillåts.'
    ],
    forklaring: 'Skillnaden USA–EU är värd att kunna: USA har historiskt haft lite reglering, EU har regleringsfokus, och AI Act tillämpar en riskbaserad ansats.',
    kalla: 'Föreläsning 1'
  },

  /* -------------------- Företagsteorier -------------------- */
  {
    id: 'str-ftg-01', delkurs: 'strategi', amne: 'str-mal',
    typ: 'flerval', svarighet: 2,
    fraga: 'Vad förklarar transaktionskostnadsteorin?',
    alternativ: [
      'Varför vissa aktiviteter utförs inom företaget i stället för att köpas',
      'Varför transaktioner mellan företag beskattas hårdare än interna',
      'Varför kostnaderna för en transaktion stiger med transaktionens storlek',
      'Varför företag med låga kostnader växer snabbare än sina konkurrenter'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Att använda marknaden kostar: hitta motpart, förhandla, skriva kontrakt, kontrollera efterlevnad. När de kostnaderna blir höga nog är det billigare att göra det själv. Det är make or buy-frågan.',
      'Fel. Teorin handlar inte om beskattning utan om samordningskostnader.',
      'Fel. Det är inte storleken som avses utan kostnaden för att genomföra utbytet över huvud taget.',
      'Fel. Det är en fråga om kostnadsledarskap, inte om företagets gränser.'
    ],
    forklaring: 'Gränsen mellan företag och marknad hamnar där marknadens transaktionskostnader möter företagets interna. När företag växer uppstår nämligen interna transaktionskostnader.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ftg-02', delkurs: 'strategi', amne: 'str-mal',
    typ: 'flerval', svarighet: 2,
    fraga: 'Hur beskriver behavioural theories of the firm företaget?',
    alternativ: [
      'Som en koalition av intressenter med olika behov och motiv',
      'Som en svart låda som omvandlar inflöde till utflöde',
      'Som en hierarki där ägarnas krav bryts ned uppifrån och ned',
      'Som en värdekedja av processer som tillsammans skapar kundvärde'
    ],
    ratt: 0,
    forklaringar: [
      'Rätt. Följden blir komplexa beslutsprocesser, beslut baserade på **imperfekt information**, och ett agerande som är resultatet av intern politik, konflikter och kompromisser.',
      'Fel. Det är den neoklassiska vinstmaximeringsmodellen.',
      'Fel. Det är det vertikala perspektivet på ekonomistyrning, från kapitel 5.',
      'Fel. Det är det horisontella perspektivet, också från kapitel 5.'
    ],
    forklaring: 'Just därför behövs tydliga visioner, strategier och styrsystem — de skapar samsyn i en organisation som annars drar åt olika håll. Det är motiveringen för att ämnet finns.',
    kalla: 'Föreläsning 1'
  },
  {
    id: 'str-ftg-03', delkurs: 'strategi', amne: 'str-enterprise',
    typ: 'oppen', svarighet: 3,
    fraga: 'Förklara produktivitetsparadoxen och redogör för hur ämnet försökt lösa den. Knyt an till strategic alignment och till varför problemet återkommer.',
    modellsvar:
      'Produktivitetsparadoxen formulerades av Robert Solow 1987: datoriseringen syntes överallt utom i ' +
      'produktivitetsstatistiken. Trots omfattande IT-investeringar under 70- och 80-talet uteblev den ' +
      'förväntade produktivitetsökningen.\n\n' +
      'Förklaringen ligger i hur investeringarna gjordes. Företagen datoriserade befintliga processer utan ' +
      'att ändra dem, och byggde system för en avdelning i taget. Resultatet blev enterprise application ' +
      'spaghetti: många system utan strategisk koppling till kärnaffären, med IT placerat i en ' +
      'organisatorisk silo. NIST beskrev 1989 samma problem som the dilemma of integration — ju fler system ' +
      'som skulle samverka, desto mer resurser gick åt till integration i stället för till verksamhetsnytta.\n\n' +
      'Ämnet svarade på två sätt. Dels med 90-talets managementmetoder — TQM, Lean, Six Sigma, BPR, ERP, ' +
      'CRM och övriga — vars gemensamma nämnare är att de ändrar processerna i stället för att bara ' +
      'datorisera dem. Dels med strategic alignment som idé, formaliserad i Henderson och Venkatramans ' +
      'modell från 1993 och institutionaliserad genom Clinger-Cohen Act 1996, som gav CIO-rollen strategisk ' +
      'legitimitet och etablerade enterprise architecture och IT governance.\n\n' +
      'Kärnan i Henderson och Venkatramans slutsats är att ingen enskild applikation, hur avancerad den än ' +
      'är, ger en uthållig konkurrensfördel. Fördelen ligger i organisationens förmåga att fortlöpande ' +
      'utnyttja IT-funktionaliteten — vilket kräver att affärsstrategi, IT-strategi, ' +
      'organisationsinfrastruktur och IT-infrastruktur passar ihop.\n\n' +
      'Problemet återkommer ändå, på två nivåer. På makronivå är komplexiteten kumulativ: varje ny epok ' +
      'läggs ovanpå den förra och kräver nya integrationer. På mikronivå upprepar sig paradoxen inom varje ' +
      'nytt område som digitaliseras — först investeras det i tekniken, sedan upptäcks att processerna ' +
      'måste ändras, och först då kommer effekten. Det är därför dagens motsvarighet heter digital ' +
      'transformation och AI-transformation, och varför Barneys argument om generativ AI är samma argument ' +
      'som Henderson och Venkatraman gjorde trettio år tidigare.',
    nyckelpunkter: [
      'Definierar paradoxen och nämner Solow 1987',
      'Förklarar orsaken: IT ovanpå oförändrade processer, system i silo utan strategisk koppling',
      'Nämner 90-talets managementmetoder som ett svar',
      'Redogör för strategic alignment och Henderson & Venkatramans slutsats',
      'Nämner Clinger-Cohen Act och dess konsekvenser',
      'Förklarar kumulativ komplexitet på makronivå',
      'Förklarar att paradoxen upprepar sig på mikronivå',
      'Drar parallellen till Barney och generativ AI'
    ],
    forklaring: 'Frågan binder ihop föreläsning 1 med kapitel 9. Ett fullpoängssvar behöver både historien och den principiella slutsatsen — inte bara den ena.',
    kalla: 'Föreläsning 1'
  }
]);
