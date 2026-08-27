/* =========================================================================
   Frågebank – Strategi och ekonomistyrning: ekonomistyrningens grunder
   Ämnen: str-ekonomistyrning, str-vision, str-mal, str-effektivitet,
          str-organisation, str-mjuk
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ======================= str-ekonomistyrning ======================= */
{
  id: 'str-eko-01',
  delkurs: 'strategi',
  amne: 'str-ekonomistyrning',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Hur definieras ekonomistyrning enligt Nationalencyklopedin och kursboken?',
  alternativ: [
    'Bokföring och upprättande av årsredovisning enligt gällande lagstiftning',
    'Avsiktlig påverkan på en verksamhet och dess befattningshavare mot vissa ekonomiska mål',
    'Beräkning av ett företags marknadsvärde och hur det utvecklas över tid',
    'Fördelning av företagets vinst mellan ägarna efter räkenskapsårets slut'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det beskriver extern redovisning, som riktar sig till intressenter utanför företaget och regleras av lagar och rekommendationer. Ekonomistyrning är internt inriktad.',
    'Rätt. Nyckelorden är *avsiktlig påverkan* (det sker medvetet), *verksamhet och befattningshavare* (både processer och människor) samt *ekonomiska mål* (som kan vara både finansiella och icke-finansiella).',
    'Fel. Värdering av företag hör till finansiering och investeringskalkylering.',
    'Fel. Utdelningspolitik är ett finansieringsbeslut, inte styrning av verksamheten.'
  ],
  forklaring: 'Ekonomiska mål kan vara finansiella (lönsamhet, vinst, soliditet, kassaflöde, likviditet) eller icke-finansiella (nöjda kunder, kvalitet, nöjda medarbetare). De icke-finansiella har fått ökad betydelse eftersom de anses bidra till uppfyllandet av de finansiella.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},
{
  id: 'str-eko-02',
  delkurs: 'strategi',
  amne: 'str-ekonomistyrning',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Kursboken delar in styrmedel i tre kategorier. Vilka?',
  alternativ: [
    'Kortsiktiga, medellånga och långsiktiga styrmedel efter planeringshorisont',
    'Formella styrmedel, organisationsstruktur och mindre formaliserad styrning',
    'Finansiella, icke-finansiella och hybrida styrmedel efter måttens karaktär',
    'Interna, externa och blandade styrmedel efter vem de riktar sig till'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Tidshorisont är en egenskap hos mål, inte grunden för Samuelsons klassificering av styrmedel.',
    'Rätt. (1) Formella styrmedel = ekonomistyrningens tekniker, t.ex. produktkalkylering, budgetering och prestationsmätning. (2) Organisationsstruktur = organisationsform, ansvarsfördelning och belöningssystem. (3) Mindre formaliserad styrning = företagskultur, lärande och medarbetarskap.',
    'Fel. Det är en indelning av *mått*, inte av styrmedel.',
    'Fel. Ingen sådan indelning förekommer i materialet.'
  ],
  forklaring: 'Poängen med indelningen är att ekonomistyrning inte bara är formaliserade tekniker – även mjuka element och det organisatoriska sammanhanget ingår. Boken fokuserar dock främst på de mer formaliserade delarna.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1 & 3'
},
{
  id: 'str-eko-03',
  delkurs: 'strategi',
  amne: 'str-ekonomistyrning',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är det övergripande syftet med ekonomistyrningen?',
  alternativ: [
    'Att minimera företagets skatt genom att styra hur resultatet redovisas',
    'Att bidra till att företagets strategiska mål uppnås i praktiken',
    'Att uppfylla bokföringslagens krav på hur verksamheten ska redovisas',
    'Att maximera antalet mätetal så att verksamheten kan följas i detalj'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Skatteplanering är en avgränsad fråga, inte ekonomistyrningens syfte.',
    'Rätt. Ekonomistyrningen utgör ett medel för implementering av företagets strategi. Konsekvensen är viktig: styrningens *utformning och användning* måste anpassas till den strategi företaget valt. En lågkostnadsstrategi kräver en annan ekonomistyrning än en differentieringsstrategi.',
    'Fel. Lagkrav gäller den externa redovisningen, som riktar sig utåt.',
    'Fel. Fler mätetal är tvärtom ofta ett problem – jämför Ittner & Larckers exempel med en instrumentpanel som svällde till nästan 300 mått.'
  ],
  forklaring: 'Kedjan är: vision → affärsidé → strategi → verksamhetsplaner → ekonomistyrning. Det är inte strategin i sig som är utgångspunkten, utan dess nedbrytning och operationalisering i delmål och verksamhetsplaner.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},
{
  id: 'str-eko-04',
  delkurs: 'strategi',
  amne: 'str-ekonomistyrning',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad kännetecknar strategisk ekonomistyrning jämfört med traditionell ekonomistyrning?',
  alternativ: [
    'Den fokuserar uteslutande på interna förhållanden och bortser från marknaden',
    'Den lägger ett externt fokus på konkurrenter och kunder till det interna',
    'Den avskaffar behovet av produktkalkylering och budgetering helt och hållet',
    'Den ersätter samtliga finansiella mått med icke-finansiella mätetal'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Uteslutande internt fokus är just vad som kännetecknar den *traditionella* ekonomistyrningen.',
    'Rätt. Gemensamma särdrag enligt materialet: uppgifterna breddas till att omfatta identifiering av konkurrensfördelar och strategiformulering; det interna fokuset kompletteras med externt fokus på konkurrenters priser, kostnadsnivåer och marknadsandelar samt kunders betalningsvillighet; värdekedjelänkar och strategiska kostnadsdrivare utnyttjas; och styrningen anpassas till strategin.',
    'Fel. Produktkalkylering finns kvar, kompletterad med nyare metoder som ABC-kalkylering och målkostnadskalkylering.',
    'Fel. Icke-finansiella mått *kompletterar* de finansiella – de ersätter dem inte.'
  ],
  forklaring: 'Metoder som brukar tillskrivas strategisk ekonomistyrning: strategisk kostnadsanalys, kostnadsdrivaranalys, kalkylering av produktattribut, värdekedjeanalys, livscykelkalkylering, balanserat styrkort och målkostnadskalkylering. Notera att det ännu inte råder konsensus om begreppets exakta innebörd.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},

/* ============================ str-vision ============================ */
{
  id: 'str-vis-01',
  delkurs: 'strategi',
  amne: 'str-vision',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilket är vanligen det primära syftet med att formulera en vision för ett företag?',
  alternativ: [
    'Att redogöra för företagets ekonomiska mål',
    'Att specificera företagets produkter och tjänster',
    'Att beskriva företagets framtida önskade tillstånd',
    'Att skapa en konkret plan för företagets verksamhet'
  ],
  ratt: 2,
  forklaringar: [
    'Fel. Ekonomiska mål uttrycks i huvudmål och delmål, inte i visionen. Visionen är avsiktligt övergripande och långsiktig.',
    'Fel. Vad företaget ägnar sig åt hör till affärsidén.',
    'Rätt. Visionen anger hur man vill att kunderna ska uppfatta företaget och i vilken riktning det ska utvecklas – ett önskvärt framtida tillstånd. IKEA: "att skapa en bättre vardag för de många människorna".',
    'Fel. Konkreta planer utformas i verksamhetsplaneringen, längst ned i kedjan.'
  ],
  forklaring: 'Denna fråga är hämtad ordagrant från omtentan HT24. Visionens tre funktioner: legitimerande (samhälleligt berättigande gentemot intressenter), ambition och fokus (sätter ramar för affärsidé och strategi) samt identifikation och motivation (delaktighet och engagemang bland anställda).',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1, Tentamen 241206'
},
{
  id: 'str-vis-02',
  delkurs: 'strategi',
  amne: 'str-vision',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur skiljer sig en vision från en affärsidé?',
  alternativ: [
    'Visionen är en kortsiktig plan för det närmaste året, medan affärsidén är långsiktig',
    'Visionen är avsedd att kommuniceras utåt medan affärsidén är till för det interna strategiarbetet',
    'Visionen beskriver hur företaget ska tjäna pengar, medan affärsidén beskriver framtidsdrömmar',
    'Visionen beskriver framtida riktning, affärsidén vad företaget gör och tjänar på'
  ],
  ratt: 3,
  forklaringar: [
    'Fel. Det är tvärtom: visionen är den mest långsiktiga av de två. Ingen av dem är en "plan" – det är strategin och verksamhetsplanerna som är planer.',
    'Fel. Båda kommuniceras såväl internt som externt. Visionen har till och med en uttalad legitimerande funktion gentemot omvärlden.',
    'Fel. Beskrivningarna är omkastade. Att tjäna pengar hör till affärsidén, framtidsbilden till visionen.',
    'Rätt. Visionen = önskat framtida tillstånd och riktning. Affärsidén = vad företaget ägnar sig åt eller tjänar pengar på, samt vad som skiljer det från andra företag. H&M: "att erbjuda mode och kvalitet till bästa pris".'
  ],
  forklaring: 'Denna fråga är hämtad ordagrant från ordinarie tenta HT24. Hierarkin: vision (vart är vi på väg) → affärsidé (vad gör vi och hur tjänar vi pengar) → strategi (hur ska vi arbeta) → verksamhetsplaner (nedbrutna delmål och handlingsplaner) → ekonomistyrning.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1, Tentamen 241014'
},
{
  id: 'str-vis-03',
  delkurs: 'strategi',
  amne: 'str-vision',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande ingår typiskt i ett företags STRATEGI (inte i affärsidén eller visionen)?',
  alternativ: [
    'En bild av det önskade framtida tillståndet som verksamheten strävar mot',
    'Vilka konkurrensfördelar som ska utvecklas och hur hot ska mötas',
    'Företagets utdelningspolicy och hur vinsten ska fördelas till ägarna',
    'Antalet anställda per avdelning och hur bemanningen ska fördelas'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är visionens innehåll.',
    'Rätt. Strategin beskriver *hur* affärsidén ska uppnås. Typiska inslag: konkurrensfördelar, styrkor/svagheter och möjligheter/hot, vilka varu- och tjänsteområden man ska arbeta inom, vilka kundkategorier man vänder sig till, hur konkurrenthot ska mötas, organisationsstruktur, kompetenskrav, resursbehov och finansiering.',
    'Fel. Utdelningspolicy är ett finansiellt mål, som SSABs mål om cirka 50 % av vinsten efter skatt.',
    'Fel. Bemanningssiffror hör till den konkreta verksamhetsplaneringen.'
  ],
  forklaring: 'Strateginivåer i stora företag: koncernstrategi, affärsområdesstrategi, divisionsstrategi, affärsenhetsstrategi och funktionsstrategi. Ekonomistyrning förekommer främst på divisions- och affärsenhetsnivå, eftersom det är först där verksamheten kan preciseras tillräckligt.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},

/* ============================= str-mal ============================= */
{
  id: 'str-mal-01',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vad är företagets mål enligt den neoklassiska teorin om företaget?',
  alternativ: [
    'Att uppnå en tillfredsställande vinst',
    'Att maximera vinsten',
    'Att optimera kassaflöden (likviditet)',
    'Att maximera intressenternas tillfredsställelse'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Tillfredsställande vinst är Herbert Simons satisfieringsmodell, som uttryckligen avviker från neoklassisk teori.',
    'Rätt. I den neoklassiska teorin antas företaget maximera sin vinst. Företaget betraktas som en "svart låda" – en resursomvandlingsenhet där man bortser från individer och från hur omvandlingen går till. Vinsten är det enda målet och därmed det enda uttrycket för effektivitet.',
    'Fel. Nuvärdet av framtida nettokassaflöden är målet i kassaflödesbaserade modeller.',
    'Fel. Att tillgodose intressenternas krav är intressentmodellens mål.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Kritiken mot neoklassisk teori: vinstmaximering som enda mål, antagandet om fullständig information inför en osäker framtid, samt att det skulle finnas en enda effektiv kombination av pris och kvantitet. Försvaret är att teorin inte syftar till att beskriva hur företag faktiskt arbetar, utan till att belysa prisbildning och resursfördelning på marknadsnivå.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1, Tentamen 241206'
},
{
  id: 'str-mal-02',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad kännetecknar Herbert Simons satisfieringsmodell?',
  alternativ: [
    'Företag maximerar försäljningsvolymen i stället för vinsten på kort sikt',
    'Företag söker en tillfredsställande vinst, eftersom maximering inte är möjlig',
    'Företagsledningen maximerar sin egen nytta i stället för ägarnas avkastning',
    'Företaget maximerar nuvärdet av samtliga framtida kassaflöden i verksamheten'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Försäljningsmaximering är William Baumols modell, en av företagsledarmodellerna.',
    'Rätt. Simon menar att företag utmärks av *begränsad rationalitet*: beslutsfattaren känner inte till alla tänkbara alternativ, kan inte i förväg fastställa det bästa och måste aktivt söka information. Därför nöjer man sig när ett alternativ uppfyller ett preciserat minimikrav. Anspråksnivån beror på situationen; vinsten måste dock räcka för överlevnad.',
    'Fel. Nyttomaximering hos ledningen är Oliver Williamsons modell, där lön, makt, status och prestige driver besluten.',
    'Fel. Nuvärdesmaximering hör till de kassaflödesbaserade modellerna.'
  ],
  forklaring: 'Viktig nyans: en tillfredsställande vinst innebär INTE en lägre ambitionsnivå än vinstmaximering. Poängen är att det på grund av den begränsade rationaliteten helt enkelt inte är *möjligt* att vinstmaximera.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},
{
  id: 'str-mal-03',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är utgångspunkten i intressentmodellen?',
  alternativ: [
    'Att företaget uteslutande ska maximera aktieägarnas förmögenhet över tid',
    'Att företaget söker jämvikt där bidrag och belöningar balanseras',
    'Att företaget är ett slutet system som fattar beslut utan hänsyn till omgivningen',
    'Att företagsledningen alltid agerar i ägarnas intresse framför andra parters'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Aktieägarfokus kännetecknar de kassaflödesbaserade modellerna.',
    'Rätt. Företaget och dess intressenter står i ett ömsesidigt beroendeförhållande. Intressenterna lämnar bidrag (ägare kapital, medarbetare arbete, långivare kapital, kunder betalningar) och kräver belöningar som överstiger bidragen (utdelning, lön och trygghet, räntor, varor och service). Målet är en kompromiss mellan intressenternas krav.',
    'Fel. Slutna system kännetecknar tvärtom de tidigare modellerna – kritiken mot dem ledde till det öppna systemsynsättet som intressentmodellen bygger på.',
    'Fel. Att ledningen kan avvika från ägarnas intressen är just poängen i företagsledarmodellerna.'
  ],
  forklaring: 'Eftersom kraven ofta står i konflikt och sammantaget kan vara för stora, blir en central ledningsuppgift att kompromissa. Företaget förhåller sig "seriekopplat" till kraven: en intressentgrupps krav tillgodoses vid en tidpunkt och nästa grupps vid en annan. Strävan är att ersätta det kortsiktiga nollsummespelet med ett långsiktigt plussummespel.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},
{
  id: 'str-mal-04',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilken av följande punkter är en kritik som lyfts fram mot vinstmaximering som företagets enda mål?',
  alternativ: [
    'I den digitala ekonomin behöver företag inte generera vinst',
    'Företag kan ha flera olika mål beroende på sammanhang',
    'Vinst är idag helt underordnat andra målsättningar',
    'Företag agerar alltid enligt marknadens lagar'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ingen seriös teori hävdar att vinst är umbärlig. Lönsamhet är grunden för överlevnad även i småföretag.',
    'Rätt. Kursboken ger fyra skäl till att det inte finns ett entydigt svar på frågan om företags mål: olika sammanhang kräver olika modeller, företag och omgivning förändras över tid, mål skiljer sig mellan och inom företag, och det finns skilda uppfattningar av politisk, ideologisk och moralisk art.',
    'Fel. Överdriven formulering. Lönsamhet är tvärtom det högst rankade företagsmålet i praktiken och det mål det råder störst enighet om bland intressenterna.',
    'Fel. Detta är ett antagande i den neoklassiska teorin, inte en kritik mot den.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Notera att kursboken själv ansluter sig till lönsamhetsmålet – men lönsamhet *på lång sikt*, och som huvudmål snarare än enda mål.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1, Tentamen 241014'
},
{
  id: 'str-mal-05',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad menas med symboliska mål?',
  alternativ: [
    'Mål som uttrycks i grafisk form i stället för i siffror och text',
    'Mål som skapar en viss bild av företaget utan att gälla i praktiken',
    'Mål som endast gäller symboliska belopp utan verklig ekonomisk betydelse',
    'Mål som fastställs av branschorganisationer och gäller alla företag i branschen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Formen på presentationen är irrelevant.',
    'Rätt. Ett företag som förorenar miljön kan kommunicera högt satta miljömål för att söka legitimitet. Andra symboliska mål uttrycker strävanden som inte gäller i praktiken, t.ex. "det är företagets målsättning att säkra de anställdas arbeten". De kan användas för att avleda uppmärksamhet eller dölja verkliga planer.',
    'Fel. Beloppens storlek har inget med saken att göra.',
    'Fel. Symboliska mål formuleras av företaget självt.'
  ],
  forklaring: 'Alla symboliska mål är inte negativa. SAS budskap om att vara affärsresenärens flygbolag förmedlar värderingar och normer till kunder och anställda. Poängen är att man ska vara medveten om att det finns olika slag av mål i företag – uttalade, faktiska och symboliska.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},
{
  id: 'str-mal-06',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Redogör för huvuddragen i vinstmaximeringsmodellen, företagsledarmodellerna, satisfieringsmodellen, intressentmodellen och de kassaflödesbaserade modellerna. Vilken syn på företags mål ansluter sig kursboken själv till?',
  modellsvar:
    '**Vinstmaximeringsmodellen (neoklassisk teori).** Företaget antas maximera sin vinst och betraktas som en "svart låda" – en resursomvandlingsenhet med ett inflöde av uppoffringar och ett utflöde av prestationer till högre värde. Man bortser från individer och från hur omvandlingen går till. Vinst är det enda målet och det enda uttrycket för effektivitet. Kostnad definieras som alternativkostnad. Handlandet antas rationellt.\n\n' +
    'Kritik: vinstmaximering som enda mål, orealistiskt antagande om fullständig information inför en osäker framtid, samt att det skulle finnas en enda effektiv kombination av pris och kvantitet. Försvaret är att teorin inte syftar till att förklara hur företag faktiskt arbetar utan till att belysa prisbildning och resursfördelning på marknads- och branschnivå.\n\n' +
    '**Företagsledarmodellerna.** Utgår från att ägande och drift är åtskilda, vilket minskar ägarnas kontroll och skapar utrymme för ledningen att arbeta efter egna mål. Baumol: ledningen maximerar försäljningen (och därmed tillväxten) samtidigt som ägarna hålls nöjda med en tillfredsställande vinst – tillväxten ger högre löner, större inflytande och högre status. Williamson: ledningen maximerar sin egen nytta via lön, makt, status och prestige, genom utgifter för administration, förmåner och prioriterade investeringar.\n\n' +
    '**Satisfieringsmodellen (Simon).** Företag strävar efter en tillfredsställande vinst i förhållande till en anspråksnivå, inte efter maximal vinst. Grunden är begränsad rationalitet: beslutsfattaren känner inte till alla alternativ och kan inte avgöra vilket som är bäst. Man nöjer sig när ett alternativ uppfyller ett minimikrav. Detta innebär inte lägre ambition – det är helt enkelt inte möjligt att maximera.\n\n' +
    '**Intressentmodellen.** Bygger på det öppna systemsynsättet: företaget har relationer till och beroendeförhållanden med sin omgivning. Balans krävs mellan intressenternas bidrag och de belöningar företaget lämnar. Målet är att tillgodose intressenternas krav, vilket blir en kompromiss. Konflikter hanteras genom att företaget förhåller sig "seriekopplat" – olika gruppers krav tillgodoses vid olika tidpunkter. Strävan är att ersätta det kortsiktiga nollsummespelet med ett långsiktigt plussummespel.\n\n' +
    '**Kassaflödesbaserade modeller.** Bygger på ett kapitalmarknadssynsätt med investerarperspektiv. Målet är att maximera nuvärdet av framtida nettokassaflöden, vilket motsvarar att maximera aktieägarnas förmögenhet via aktiernas marknadsvärde. Detta är troligen det mest accepterade företagsmålet inom företagsekonomin och ligger till grund för investeringskalkylering. Målet ska dock inte tolkas bokstavligt i praktiken – att faktiskt maximera nuvärdet är närmast omöjligt, och företag arbetar i praktiken med flera mål och uttrycker dem i räntabilitetstermer.\n\n' +
    '**Kursbokens egen ståndpunkt:** lönsamhetsmålet, som är det högst rankade företagsmålet i praktiken och det mål det råder störst enighet om bland intressenterna. Två viktiga preciseringar görs: (1) det gäller lönsamhet på *lång* sikt, eftersom kortsiktiga åtgärder kan höja lönsamheten tillfälligt men skada den långsiktigt, och (2) lönsamhet är inte det *enda* målet – andra mål utgör ofta delmål eller restriktioner, t.ex. likviditet, soliditet, kapitalbindning eller icke-finansiella mål.',
  nyckelpunkter: [
    'Vinstmaximering: svart låda, vinst enda målet, kritiseras för orealistiska antaganden',
    'Företagsledarmodeller: ägande skilt från drift; Baumol (försäljningsmaximering), Williamson (egen nytta)',
    'Satisfiering (Simon): tillfredsställande vinst, anspråksnivå, begränsad rationalitet',
    'Intressentmodellen: öppet system, balans bidrag/belöningar, seriekoppling, plussummespel',
    'Kassaflödesmodeller: nuvärde av framtida nettokassaflöden, aktieägarperspektiv',
    'Kursbokens ståndpunkt: långsiktig lönsamhet som huvudmål, inte enda mål'
  ],
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
},

/* ========================= str-effektivitet ========================= */
{
  id: 'str-eff-01',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilket av följande är ett kännetecken för hög INRE effektivitet?',
  alternativ: [
    'Hög kundnöjdhet och nöjda kunder som återkommer',
    'Hög produktivitet och kostnadseffektivitet',
    'Ett väl utbyggt distributionsnätverk',
    'Ett välkänt och omtyckt varumärke'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kundnöjdhet handlar om kundvärde och tillhör den *yttre* effektiviteten.',
    'Rätt. Inre effektivitet = "att göra saker rätt". Den förknippas med hög produktivitet, kostnadseffektivitet, "ordning och reda" samt välutvecklade system och rutiner. Perspektivet är internt: hur företaget hushållar med sina resurser.',
    'Fel. Distributionsnätverket rör relationen till omvärlden och därmed yttre effektivitet.',
    'Fel. Varumärket är hur omvärlden uppfattar företaget – yttre effektivitet.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Inre effektivitet = att göra saker rätt (internt perspektiv). Yttre effektivitet = att göra rätt saker (externt perspektiv: affärsmässighet, tillväxt, kvalitet, service, kundvärde). Tillsammans utgör de den totala effektiviteten, och båda krävs på lång sikt för överlevnad.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2, Tentamen 241206'
},
{
  id: 'str-eff-02',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket av följande är ett kännetecken på ett företag med LÅG yttre effektivitet?',
  alternativ: [
    'Ett väl utbyggt distributionsnätverk, men höga produktionskostnader',
    'Företaget har hög produktivitet men förlorar marknadsandelar',
    'Ett välkänt och omtyckt varumärke men höga kostnader för administration',
    'Företaget har fått många designpris för sina produkter'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ett väl utbyggt distributionsnätverk är ett tecken på *hög* yttre effektivitet. Höga produktionskostnader pekar istället på låg inre effektivitet.',
    'Rätt. Hög produktivitet = hög inre effektivitet ("gör saker rätt"). Att ändå förlora marknadsandelar visar att man inte gör *rätt* saker i förhållande till marknaden – låg yttre effektivitet. Man producerar effektivt något som kunderna efterfrågar allt mindre.',
    'Fel. Ett omtyckt varumärke tyder på hög yttre effektivitet; höga administrationskostnader på låg inre.',
    'Fel. Designpriser tyder på att man gör något marknaden uppskattar – snarare hög yttre effektivitet.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Tekniken för att lösa denna typ av fråga: sortera varje alternativ i internt (kostnader, produktivitet, rutiner) eller externt (kunder, marknad, varumärke, distribution), och leta efter alternativet som är starkt internt men svagt externt.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2, Tentamen 241014'
},
{
  id: 'str-eff-03',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan effektivitet och produktivitet?',
  alternativ: [
    'Ingen skillnad alls – de två begreppen används synonymt i kursboken',
    'Effektivitet mäter utflöde mot inflöde i värde och mot ett mål, produktivitet i kvantiteter',
    'Effektivitet gäller endast tillverkande företag, produktivitet endast tjänsteföretag',
    'Effektivitet är alltid ett finansiellt mått, produktivitet alltid ett icke-finansiellt'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Begreppen avser samma slags förhållande men uttrycks i olika enheter.',
    'Rätt. Effektivitet = värdet av utflöde / värdet av inflöde, bestämt i förhållande till ett mål (grad av måluppfyllelse). Produktivitet = kvantitet utflöde / kvantitet inflöde, alltså i fysiska termer: antal maskinbearbetade produkter per maskintimme, antal debiterade konsulttimmar per arbetad timme, antal betjänade kunder per dag.',
    'Fel. Båda begreppen används i alla verksamhetstyper.',
    'Fel. Effektivitet mäts ofta finansiellt eftersom målen ofta är det, men i sjukvård och utbildning måste den ofta bestämmas i icke-finansiella termer.'
  ],
  forklaring: 'En produktivitetsökning behöver inte betyda att företaget lyckats bättre. Om tiden per kund minskar stiger produktiviteten – men kunderna kan uppfatta det som sämre service. Mindre noggrann tillverkning ökar avdelningens produktivitet men kan sänka produktkvaliteten.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2'
},
{
  id: 'str-eff-04',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Varför sägs lönsamhet vara ett bättre uttryck än resultat för hur bra ett företag går?',
  alternativ: [
    'Lönsamhet är alltid ett större tal än resultatet och ser därför bättre ut',
    'Resultatet är ett absolut tal, lönsamheten sätter det i relation till kapitalet',
    'Resultatet går att manipulera i redovisningen, vilket lönsamheten inte gör',
    'Lönsamheten regleras i lag medan resultatet får beräknas fritt av företaget'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Lönsamhet uttrycks vanligen som en procentsats och är sällan ett större tal än resultatet i kronor.',
    'Rätt. Ett företag med stor vinst behöver inte vara mer lönsamt än ett med lägre vinst – det beror på hur mycket kapital som bundits för att skapa vinsten. Lönsamhet = Resultat / Kapital säger något om hur väl verksamheten bedrivs i förhållande till insatt kapital.',
    'Fel. Båda måtten bygger på samma redovisningsdata och är lika känsliga för värderings- och periodiseringsval.',
    'Fel. Lagstiftningen reglerar den externa redovisningen, inte vilket nyckeltal ett företag väljer att styra på.'
  ],
  forklaring: 'Vanliga lönsamhetsmått: räntabilitet på totalt kapital = (resultat efter finansiella poster + räntekostnader) / totalt kapital, och räntabilitet på eget kapital = resultat efter finansiella poster / eget kapital. För enheter inom ett företag används ofta räntabilitet på sysselsatt kapital.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2'
},
{
  id: 'str-eff-05',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Ett företag fakturerar en order den 10 februari, fakturan förfaller den 10 mars och pengarna finns på företagets konto den 12 mars. När uppkommer INKOMSTEN?',
  alternativ: [
    'Den 10 februari, det vill säga det datum fakturan är daterad',
    'Den 10 mars, alltså det datum då fakturan förfaller till betalning',
    'Den 12 mars, alltså den dag betalningen finns på företagets konto',
    'Löpande under produktionen, i takt med att arbetet färdigställs'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Enligt redovisningspraxis uppstår inkomsten det datum fakturan är daterad. Inkomstbegreppet är knutet till affärstransaktionen med en extern part, alltså avyttringen av varor eller tjänster.',
    'Fel. Förfallodagen är bara en betalningsfrist och saknar betydelse för när inkomsten uppstår.',
    'Fel. Den 12 mars uppkommer *inbetalningen* – när likvida medel faktiskt förs över.',
    'Fel. Under produktionen uppstår intäkten och kostnaden på *kalkylmässiga* grunder, inte inkomsten.'
  ],
  forklaring: 'De tre begreppsparen: inbetalning/utbetalning knyts till betalningstransaktionen, inkomst/utgift till affärstransaktionen (fakturadatum), intäkt/kostnad till perioden då prestationen utförts respektive resurser förbrukats (periodiserade inkomster och utgifter).',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2'
},
{
  id: 'str-eff-06',
  delkurs: 'strategi',
  amne: 'str-effektivitet',
  typ: 'praktisk',
  svarighet: 3,
  fraga: 'Företaget Bordlagt tillverkade 100 bord under första halvåret. 75 bord såldes för 10 000 kr per styck. Tillverkningskostnaden är 6 000 kr per bord. Beräkna det bokföringsmässiga resultatet och minst en variant av det kalkylmässiga resultatet.',
  modellsvar:
    '**Bokföringsmässigt resultat**\n' +
    'Intäkt: 75 bord × 10 000 kr = 750 000 kr\n' +
    'Kostnad: 75 bord × 6 000 kr = −450 000 kr\n' +
    '**Resultat: 300 000 kr**\n\n' +
    'Endast de sålda borden beaktas. De 25 osålda borden utgör istället en tillgång (lager) värd 25 × 6 000 = 150 000 kr och redovisas i balansräkningen.\n\n' +
    '**Kalkylmässigt resultat, variant 1** (periodens försäljning mot periodens tillverkningskostnad)\n' +
    'Intäkt: 75 × 10 000 = 750 000 kr\n' +
    'Kostnad: 100 × 6 000 = −600 000 kr\n' +
    '**Resultat: 150 000 kr**\n\n' +
    '**Kalkylmässigt resultat, variant 2** (förväntad försäljning mot periodens tillverkningskostnad)\n' +
    'Intäkt: 100 × 10 000 = 1 000 000 kr\n' +
    'Kostnad: 100 × 6 000 = −600 000 kr\n' +
    '**Resultat: 400 000 kr**',
  steg: [
    'Identifiera vilket resultatbegrepp som efterfrågas. Bokföringsmässiga grunder används i extern redovisning, kalkylmässiga i ekonomistyrningen.',
    'Bokföringsmässigt gäller matchningsprincipen: periodens intäkt (försäljning) ställs mot kostnaden för just de resurser som förbrukats för att producera det som sålts. Alltså 75 bord på båda sidor.',
    'Osålda enheter är ingen kostnad utan en tillgång i balansräkningen, värderad till anskaffnings-/tillverkningsvärdet.',
    'Kalkylmässigt bestäms intäkten utifrån vad som *presterats*, oberoende av om försäljning skett. Det finns ingen given innebörd – flera beräkningssätt är möjliga.',
    'Redovisa vilket antaganden du gjort. Skillnaderna mellan bokföringsmässigt och kalkylmässigt resultat kan hänföras till urval, värdering och periodisering.'
  ],
  forklaring: 'Poängen är att "resultat" inte är ett entydigt tal – det beror på vilka grunder som används. Extern redovisning är lagreglerad; internredovisningen får företaget utforma efter egna behov.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 2'
},

/* ========================= str-organisation ========================= */
{
  id: 'str-org-01',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vad karaktäriserar en funktionsorganisation?',
  alternativ: [
    'Organisationen är indelad efter funktioner som marknad, produktion och ekonomi',
    'Organisationen är strukturerad för att prioritera projekt och temporära funktionella arbetsgrupper',
    'Organisationen är indelad i avdelningar utifrån produkter eller tjänster den säljer',
    'Organisationen är indelad i avdelningar utifrån geografiska marknader och regioner'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Funktionsorganisationen delar in verksamheten efter arbetsuppgifternas art: utveckling, inköp, tillverkning, försäljning, administration. Specialistkompetens samlas då i varje funktion.',
    'Fel. Projektfokus och temporära arbetsgrupper kännetecknar en projekt- eller matrisorganisation.',
    'Fel. Indelning efter produkter eller tjänster kännetecknar en divisionsorganisation.',
    'Fel. Geografisk indelning är också en form av divisionsorganisation.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Gemensamt för de flesta organisationsformer (funktions-, divisions-, matris- och linjeorganisation) är att företaget betraktas som en hierarki med över- och underordnade enheter – det vertikala perspektivet.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3, Tentamen 241206'
},
{
  id: 'str-org-02',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför har stora företag ofta tydliga inslag av divisionsorganisation?',
  alternativ: [
    'Det underlättar lansering av nya produktområden och nya marknader',
    'En divisionsorganisation är lättare för ledningen att styra så att alla arbetar i samma riktning',
    'Divisionsorganisation underlättar när man arbetar med många olika projekt samtidigt inom samma bransch'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Divisioner byggs kring produktområden eller geografiska marknader och kan ges eget lönsamhets- eller resultatansvar. Det gör det möjligt att expandera in i nya områden utan att omorganisera hela företaget – varje division kan ha sin egen strategi.',
    'Fel. Att styra alla i samma riktning är snarare en styrka hos den centraliserade funktionsorganisationen. Divisionalisering innebär tvärtom decentralisering och ökad självständighet.',
    'Fel. Många parallella projekt inom samma bransch hanteras bättre av en matris- eller projektorganisation, där specialister från funktionerna lånas ut till projekten.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24 (notera att den bara hade tre alternativ). Kopplingen till ekonomistyrning: divisioner får typiskt lönsamhets- eller resultatansvar, medan funktioner på lägre nivåer får kostnadsansvar.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3, Tentamen 241014'
},
{
  id: 'str-org-03',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad kännetecknar det HORISONTELLA perspektivet på ekonomistyrning?',
  alternativ: [
    'Företaget ses som en hierarki där överordnade enheter styr och följer upp underordnade',
    'Företaget ses som en värdekedja av processer som skapar kundvärde',
    'Företaget ses som en svart låda där bara in- och utflöden är intressanta att mäta',
    'Företaget ses som en samling självständiga juridiska personer med egna resultat'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Hierarkiperspektivet är det *vertikala*, där ägarkrav bryts ned via styrelse och ledning till divisioner, funktioner och individer.',
    'Rätt. I värdekedjeperspektivet betraktas företaget som en serie processer bestående av aktiviteter som ska skapa kundvärde. En viktig uppgift blir att fokusera på värdeskapande aktiviteter och minimera icke-värdeskapande.',
    'Fel. Svarta lådan tillhör den neoklassiska teorin om företagets mål.',
    'Fel. Juridisk struktur är en annan fråga än styrperspektiv.'
  ],
  forklaring: 'Motivet för det horisontella perspektivet är kundorientering. Kritiken mot det vertikala är att kunder inte inkluderas explicit i styrningen (annat än som intäkter), att kundbehov har svårt att tränga in i enheter utan direkt marknadskontakt, och att det kan uppstå "revirbeteende" mellan funktioner.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},
{
  id: 'str-org-04',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka är de fyra huvudslagen av ekonomiskt ansvar?',
  alternativ: [
    'Strategiskt, taktiskt, operativt och administrativt ansvar efter beslutsnivå',
    'Lönsamhetsansvar, resultatansvar, intäkts- eller bidragsansvar samt kostnadsansvar',
    'Ägaransvar, styrelseansvar, ledningsansvar och medarbetaransvar i den ordningen',
    'Kortsiktigt, medellångt, långsiktigt och evigt ansvar utifrån tidshorisont'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är en indelning av beslutsnivåer, inte av ekonomiskt ansvar.',
    'Rätt. Lönsamhetsansvar (resultat i förhållande till kapital, mäts med räntabilitet), resultatansvar (intäkter minus kostnader, mäts i absoluta tal eller marginaler), intäkts-/bidragsansvar (täckningsbidrag, bruttomarginal) och kostnadsansvar (kostnader, avvikelser mot standardkostnad, produktivitetsmått).',
    'Fel. Det beskriver bolagsstyrningens roller.',
    'Fel. Ingen sådan indelning förekommer.'
  ],
  forklaring: 'Två principer styr ansvarsfördelningen: påverkbarhetsprincipen (man ska kunna påverka det man ansvarar för) och befogenhetsprincipen (man ska ha befogenheter att göra det). Skillnaden mellan rent och artificiellt resultatansvar är att det senare gäller enheter utan externa kunder eller full beslutsrätt, t.ex. en IT-avdelning.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},
{
  id: 'str-org-05',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vilken risk finns med att ensidigt inrikta ekonomistyrningen på resultatansvar?',
  alternativ: [
    'Att enheterna slutar sälja och i stället fokuserar på att hålla nere kostnaderna',
    'Att kapitalbindningen ökar, vilket ger negativa effekter på företagets räntabilitet',
    'Att kostnaderna blir omöjliga att mäta och fördela mellan enheterna',
    'Att enheterna får för lite befogenheter för att kunna påverka sitt resultat'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Resultatansvar ger tvärtom starka incitament att sälja, eftersom intäkterna ingår i måttet.',
    'Rätt. Resultatansvar tar ingen hänsyn till kapitalet. En enhet kan förbättra sitt resultat genom att bygga upp stora lager eller ge generösa kundkrediter – vilket ökar kapitalbindningen och drar ner företagets räntabilitet. Motmedel: komplettera med ansvar för vissa kapitalposter, eller använda kapitalomsättningsmått som lageromsättningshastighet.',
    'Fel. Kostnaderna ingår redan i resultatmåttet och mäts som vanligt.',
    'Fel. Resultatansvar innebär tvärtom att enheten ges befogenheter över både intäkter och kostnader.'
  ],
  forklaring: 'Detta illustrerar varför valet av ansvarsform är ett styrmedel: måttet styr beteendet. Vill man att en enhet ska hushålla med kapital måste kapitalet ingå i ansvaret – då talar man om lönsamhets- eller räntabilitetsansvar.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},
{
  id: 'str-org-06',
  delkurs: 'strategi',
  amne: 'str-organisation',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är en "fripassagerare" i samband med belöningssystem?',
  alternativ: [
    'En anställd som säger upp sig direkt efter att bonusen har betalats ut',
    'En anställd som bidrar lite men ändå får del av gruppens belöning',
    'En inhyrd konsult som deltar i gruppens arbete utan att få någon ersättning',
    'En chef som står utanför belöningssystemet men leder gruppen som omfattas'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är ett problem med belöningars utformning över tid, men inte fripassagerarproblemet.',
    'Rätt. Vid grupprelaterade belöningar tilldelas varje anställd en belöning baserad på vad gruppen åstadkommit. Det öppnar för att någon som bidrar mycket lite ändå får belöning, vilket kan skapa missnöje och dålig stämning – och därmed motverka hela syftet med belöningssystemet.',
    'Fel. Ingen sådan definition förekommer i materialet.',
    'Fel. Vem som omfattas är en avgränsningsfråga, inte fripassagerarproblemet.'
  ],
  forklaring: 'Avvägningen: individuella belöningar kräver att individuella prestationer går att urskilja och att ingen uppfattas som favoriserad. När de förutsättningarna saknas är grupprelaterade belöningar mer ändamålsenliga – men de har alltså sitt eget problem. Belöningar kan vara både finansiella (bonus) och icke-finansiella (ledighet, befordran, utvidgat ansvar).',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},

/* ============================ str-mjuk ============================ */
{
  id: 'str-mju-01',
  delkurs: 'strategi',
  amne: 'str-mjuk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan enkelkretslärande och dubbelkretslärande?',
  alternativ: [
    'Enkelkretslärande sker individuellt medan dubbelkretslärande sker gemensamt i grupp',
    'Enkelkretslärande löser problemet, dubbelkretslärande ifrågasätter även orsaken',
    'Enkelkretslärande går snabbare att genomföra men blir dyrare i längden',
    'Enkelkretslärande gäller tekniska system medan dubbelkretslärande gäller människor'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Individ kontra grupp är en annan dimension. Organisatoriskt lärande uppstår när individers lärande sprids och omsätts i praktiken.',
    'Rätt. Kursbokens formulering: vid dubbelkretslärande "kurerar man både symptomen och tar sig an sjukdomen". Enkelkretslärande (single-loop) åtgärdar felet; dubbelkretslärande (double-loop) frågar dessutom varför felet kunde uppstå.',
    'Fel. Kostnad och hastighet är inte den definierande skillnaden.',
    'Fel. Båda lärprocesserna gäller organisationens sätt att arbeta, oavsett område.'
  ],
  forklaring: 'Lärande definieras som bestående förändringar i beteendet hos en individ eller grupp, på grundval av erfarenheter eller samspel med omgivningen. Erfarenhetsbaserat lärande anses mest ändamålsenligt, särskilt när avvikelser ska leda till förändring och förbättring. Förutsättningen är en kultur där det är accepterat att experimentera och ta initiativ.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},
{
  id: 'str-mju-02',
  delkurs: 'strategi',
  amne: 'str-mjuk',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad innebär medarbetarskap (empowerment)?',
  alternativ: [
    'Att samtliga anställda äger aktier i företaget och därmed får del av vinsten',
    'Att anställda har inflytande över arbetsplats, investeringar och chefstillsättning',
    'Att företaget helt saknar chefer och styrs gemensamt av de anställda',
    'Att anställda själva får välja att arbeta hemifrån när de vill'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Delägarskap är en form av belöningssystem, inte medarbetarskap.',
    'Rätt. Medarbetarskap handlar om demokratisering av arbetslivet och om mer än att bara kunna påverka sitt eget arbete. Enligt förespråkarna krävs befogenheter och inflytande i frågor som arbetsplatsens utformning, arbetets utförande, investeringar, tillsättning av chefer och anställningsförhållanden.',
    'Fel. Chefer finns kvar – men de behöver acceptera förlusten av kontroll. Chefers motstånd är just ett av de vanligaste hindren.',
    'Fel. Distansarbete är en arbetsformsfråga.'
  ],
  forklaring: 'Två argument för medarbetarskap: (1) demokratisering av arbetslivet, och (2) att kund- och marknadsorienterade verksamheter med kvalitets- och servicefokus ställer organisatoriska krav som inte passar en traditionell hierarkisk och byråkratisk struktur. Förutsättningar: tydliga roller, klar ansvarsfördelning, delegerat ansvar och möjligheter till utveckling.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
},
{
  id: 'str-mju-03',
  delkurs: 'strategi',
  amne: 'str-mjuk',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vilken förklaring till "gapet mellan teori och praktik" inom ekonomistyrning har enligt kursboken STÖRST stöd?',
  alternativ: [
    'Att det finns en tidseftersläpning mellan teoriutveckling och implementering',
    'Att praktikerna har för lite kunskap om den teori som forskningen tagit fram',
    'Att teorin inte i tillräcklig utsträckning beaktar kostnads- och nyttokriteriet',
    'Att företagen i grunden är ovilliga till förändring av sina arbetssätt'
  ],
  ratt: 2,
  forklaringar: [
    'Fel. Kursboken avfärdar denna förklaring: de flesta metoder har funnits tillgängliga i litteraturen under lång tid och skulle ha börjat användas om de verkligen tilltalade praktiker.',
    'Fel. Även denna avfärdas: många i praktiken har utbildning i ekonomistyrning och har därmed tillgodogjort sig teorins innehåll.',
    'Rätt. Den fjärde förklaringen sägs ha störst stöd. Metoder är olika kostsamma (konsultarvoden, kalkyldatasystem, utbildning, informationsinsamling och rapportering) och ger olika nytta (kvalitet på beslutsunderlag, styreffekt, tidsbesparing). I praktiken tillämpas kostnads- och nyttokriteriet, medan man i teorin ofta bortser från det.',
    'Fel. Detta är inte en av bokens fyra förklaringar.'
  ],
  forklaring: 'En tredje förklaring – att teorin inte fångar in praktikers verklighet – sägs också ha starkt stöd ("fåtöljforskning"). Slutsatsen är att litteraturens metoder inte utgör en samling metoder som *ska* användas, utan tillgängliga metoder att välja mellan. Därför är kunskap om metodernas egenskaper, antaganden, styrkor och svagheter avgörande.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 3'
}

);
