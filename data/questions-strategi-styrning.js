/* =========================================================================
   Frågebank – Strategi och ekonomistyrning: styrkort, strategi och hållbarhet
   Ämnen: str-bsc, str-ickefinansiella, str-perspektiv, str-it, str-hallbarhet
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.fragor = window.SYSB23.fragor || [];

window.SYSB23.fragor.push(

/* ============================= str-bsc ============================= */
{
  id: 'str-bsc-01',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Hur skiljer sig Balanced Scorecard från en mer traditionell styrningsmodell som primärt fokuserar på finansiella mått? Välj det svar som stämmer bäst.',
  alternativ: [
    'Det utgör en bättre grund för att skydda företagets värdefulla och sällsynta resurser från att kopieras av konkurrenter',
    'Det ersätter alla finansiella mått med kvalitativa bedömningar',
    'Det integrerar både finansiella och icke-finansiella mått för att ge en bredare bild av företagets prestation',
    'Det skapar bättre förutsättningar för att skydda miljön och förbättra socialt ansvarstagande'
  ],
  ratt: 2,
  forklaringar: [
    'Fel. Skydd av värdefulla och sällsynta resurser är kärnan i den resursbaserade teorin (RBV/Barney), inte i styrkortet.',
    'Fel. Styrkortet *kompletterar* de finansiella måtten – det avskaffar dem inte. Det finansiella perspektivet är ett av de fyra.',
    'Rätt. Styrkortet ger fyra perspektiv: finansiellt, kund, interna processer samt innovation och lärande. Det ger balans mellan externa mått som rörelseresultat och interna mått som produktutveckling, och synliggör de avvägningar ledningen redan gjort.',
    'Fel. Miljö och socialt ansvar hör till Triple Bottom Line och ESG.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Notera hur de felaktiga alternativen är hämtade från *andra* teorier i kursen – ett återkommande mönster på tentan. Lär dig därför vilket begrepp som hör till vilken teori.',
  kalla: 'Kaplan_Norton_1993.pdf, Tentamen 241206'
},
{
  id: 'str-bsc-02',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Enligt Kaplan och Norton har företag traditionellt förlitat sig för mycket på finansiella verksamhetsmått. Varför är detta ett problem?',
  alternativ: [
    'Genom att fokusera på finansiella mått tenderar företag att bara prioritera kostnadsbesparingar',
    'Finansiella mått är historiska och ger ingen vägledning om var företaget är på väg',
    'Finansiella mått tar inte hänsyn till externa faktorer som påverkar företaget',
    'Finansiella mått är meningslösa eller missvisande när det gäller att förstå ett företags verksamhet'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kostnadsfokus kan bli en konsekvens, men det är inte Kaplan och Nortons huvudargument.',
    'Rätt. Kärnan i artikeln: traditionella finansiella mått rapporterar vad som hände förra perioden utan att ange hur ledningen kan förbättra resultatet nästa period. Styrkortet ska istället fungera som hörnstenen för både nuvarande och framtida framgång.',
    'Fel. Externa faktorer fångas delvis av finansiella mått. Problemet är tidsperspektivet, inte det externa.',
    'Fel. För starkt formulerat. Kaplan och Norton menar inte att finansiella mått är meningslösa – de behåller dem som ett av fyra perspektiv.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Fällan är alternativ D, som är en överdriven version av det rätta svaret. På tentan är sådana absoluta formuleringar ("meningslösa", "alltid", "aldrig", "helt") nästan alltid fel.',
  kalla: 'Kaplan_Norton_1993.pdf, Tentamen 241014'
},
{
  id: 'str-bsc-03',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka är Balanced Scorecards fyra perspektiv?',
  alternativ: [
    'People, planet, profit och purpose',
    'Finansiellt, kund, interna processer samt innovation och lärande',
    'Strategi, struktur, system och kultur',
    'Leverantörer, kunder, konkurrenter och substitut'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. People, planet och profit är Triple Bottom Line (Rogers & Hudson, Elkington).',
    'Rätt. Styrkortet kompletterar traditionella finansiella indikatorer med mått för kunder, interna processer samt innovations- och förbättringsaktiviteter. Kaplan och Norton rekommenderar 15–20 mått totalt.',
    'Fel. Det påminner om McKinseys 7S-modell, som inte ingår i kursen.',
    'Fel. Det är komponenter ur Porters Five Forces.'
  ],
  forklaring: 'Ett kritiskt test på ett bra styrkort är dess *transparens*: en utomstående ska kunna se affärsenhetens konkurrensstrategi genom de 15–20 måtten. Styrkortet är därför inte en mall som kan appliceras generellt – varje affärsenhet utformar sitt eget utifrån sin mission, strategi, teknik och kultur.',
  kalla: 'Kaplan_Norton_1993.pdf'
},
{
  id: 'str-bsc-04',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Varför krävde FMC att divisionerna skulle använda UTFALLSMÅTT (output measures) snarare än PROCESSMÅTT?',
  alternativ: [
    'Processmått är omöjliga att beräkna',
    'Fokus på tid, kvalitet och kostnad uppmuntrar chefer att söka snäva processförbättringar istället för genombrott i utfallet',
    'Utfallsmått är billigare att samla in',
    'Processmått är förbjudna enligt redovisningsstandarder'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Processmått som cykeltid och kvalitet är tvärtom lätta att mäta – det är delvis därför de blir så populära.',
    'Rätt. Larry Brady: fokus på T-Q-C-mått (time, quality, cost) uppmuntrar chefer att göra befintliga saker lite bättre, medan fokus på utfall tvingar dem att förstå sin bransch och sin strategi och att kvantifiera strategisk framgång i konkreta måltal.',
    'Fel. Kostnaden för datainsamling var inte argumentet.',
    'Fel. Interna styrmått regleras inte av redovisningsstandarder.'
  ],
  forklaring: 'Bradys tre exempel visar varför: i försvarsverksamheten ger kortare cykeltid ingen kundnytta alls (kunden betalar lagerhållningen), i förpackningsmaskiner ger den tillgång till 35 % mer marknad, och i jordbruksmaskiner uppstår nyttan först som ett språng när cykeltiden understiger orderfönstret på sex veckor. Samma processförbättring får alltså helt olika värde beroende på affärslogik.',
  kalla: 'Kaplan_Norton_1993.pdf'
},
{
  id: 'str-bsc-05',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Varför lämpar sig Balanced Scorecard dåligt för extern rapportering enligt Kaplan och Norton?',
  alternativ: [
    'Det strider mot god redovisningssed',
    'Styrkort är utformade per affärsenhet och kan inte aggregeras; dessutom kan de avslöja känslig strategisk information för konkurrenter',
    'Investerare förstår inte icke-finansiella mått',
    'Måtten ändras för sällan för att vara intressanta'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Redovisningsregler hindrar inte frivillig tilläggsrapportering.',
    'Rätt. Tre skäl anges: (1) styrkort är meningsfulla främst för affärsenheter med väldefinierad strategi, och de flesta företag har flera divisioner vars styrkort inte kan aggregeras; (2) om styrkortet verkligen ger en transparent bild av strategin blir informationen känslig – en chef i artikeln säger att om en konkurrent såg hans styrkort skulle han förlora sin konkurrensfördel; (3) styrkortet är en så pass ny innovation att det behöver några års experimenterande internt först.',
    'Fel. Artikeln hävdar snarare att finansmarknaden är skeptisk till långsiktiga indikatorer, inte att den saknar förmåga att förstå dem.',
    'Fel. Måtten ses över årligen och rapporteras kvartalsvis eller månadsvis.'
  ],
  forklaring: 'Ironin som artikeln lyfter fram: ju bättre styrkortet är (desto mer transparent avspeglar det strategin), desto sämre lämpar det sig för extern publicering.',
  kalla: 'Kaplan_Norton_1993.pdf'
},
{
  id: 'str-bsc-06',
  delkurs: 'strategi',
  amne: 'str-bsc',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Kaplan och Norton beskriver Balanced Scorecard som "ett ledningssystem, inte bara ett mätsystem". Förklara vad de menar och varför AMD:s införande fick begränsad effekt medan Rockwaters fick stor.',
  modellsvar:
    '**Ett ledningssystem, inte ett mätsystem.** Poängen är att styrkortets värde inte ligger i att mäta mer, utan i att det förändrar hur företaget styrs. Larry Brady vid FMC uttrycker det som att styrkortet blir "hörnstenen i hur du driver verksamheten" – kärnan i ledningssystemet, inte i mätsystemet. Kaplan och Norton varnar uttryckligen för företag som inför styrkort som ännu ett managementmode: då blir förändringen bara inkrementell och man tappar bort styrkortets väsen – dess fokus, enkelhet och vision. Risken är att det svällar till hundratals mätetal och ett dyrt informationssystem.\n\n' +
    'Konkret innebär "ledningssystem" att styrkortet: översätter strategiska mål till en sammanhängande uppsättning mått, kommunicerar prioriteringar till chefer, anställda, investerare och kunder, samt fungerar som referenspunkt mot vilken alla nya projekt utvärderas.\n\n' +
    '**Varför Rockwater lyckades.** Rockwater hade uppstått genom en sammanslagning av två organisationer. De anställda kom från olika kulturer, talade olika språk och hade olika erfarenheter. Ledningen hade ännu inte formulerat sin strategi tydligt, och än mindre identifierat de nyckelfaktorer som driver strategisk framgång. Styrkortet användes därför för att *driva förändringsprocessen* – det hjälpte företaget att enas om vad man måste bli bra på för att bli branschledare, skapade samsyn kring partnerskap med nyckelkunder och lyfte fram behovet av dramatiska säkerhetsförbättringar.\n\n' +
    '**Varför AMD fick begränsad effekt.** AMD hade redan en tydligt definierad mission, en strategiformulering och en gemensam förståelse bland de ledande cheferna om sin konkurrensnisch. Företaget konkurrerade inom ett enda branschsegment, och de tolv högsta cheferna var väl förtrogna med marknader, teknik och de viktiga styrfaktorerna. Sammanfattningen i styrkortet var därför varken ny eller överraskande för dem. Cheferna för de decentraliserade produktionsenheterna hade också redan mycket information om sin egen verksamhet. Styrkortet blev en systematisk lagringsplats för strategisk information som möjliggjorde trendanalys – nyttigt, men det kunde bara sammanfatta kunskap cheferna redan hade.\n\n' +
    '**Slutsatsen** är att styrkortet får störst effekt när det används för att driva en förändringsprocess. Där organisationen redan har samsyn och kunskap tillför det mindre. Jerry Fishman vid Analog Devices beskriver samma mönster över tid: i början drev styrkortet betydande förändring, medan dess huvudsakliga effekt idag är att upprätthålla program som medarbetarna arbetat med i flera år.',
  nyckelpunkter: [
    'Ledningssystem = förändrar hur företaget styrs, inte bara vad som mäts',
    'Varning: styrkort som modefluga ⇒ inkrementell förändring och måttinflation',
    'Rockwater: fusion, oklar strategi, kulturkrock ⇒ styrkortet drev förändring',
    'AMD: redan tydlig mission, ett segment, insatta chefer ⇒ inget nytt att tillföra',
    'Styrkortets effekt är störst när det används som förändringsmotor'
  ],
  kalla: 'Kaplan_Norton_1993.pdf'
},

/* ======================= str-ickefinansiella ======================= */
{
  id: 'str-ick-01',
  delkurs: 'strategi',
  amne: 'str-ickefinansiella',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilket är enligt Ittner och Larcker det första och mest grundläggande misstaget företag gör med icke-finansiella mått?',
  alternativ: [
    'De mäter för sällan',
    'De kopplar inte måtten till strategin och utvecklar ingen orsaksmodell mellan icke-finansiella drivkrafter och finansiellt utfall',
    'De använder för få konsulter',
    'De publicerar måtten externt'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Mätfrekvens är inte bland de fyra misstagen.',
    'Rätt. Färre än 30 % av de undersökta företagen hade utvecklat orsaksmodeller (causal models / value driver maps). Utan sådana kan chefer inte välja ut de få relevanta måtten bland hundratals möjliga – följden blir att man mäter för mycket och fel saker.',
    'Fel. Artikeln kritiserar tvärtom att företag antar färdiga standardversioner av ramverk, ofta med dyra externa konsulter.',
    'Fel. Extern publicering diskuteras av Kaplan och Norton, inte som ett av Ittner och Larckers misstag.'
  ],
  forklaring: 'De fyra misstagen: (1) att inte koppla måtten till strategin, (2) att inte validera sambanden, (3) att sätta fel målnivåer, (4) att mäta felaktigt (bristande validitet och reliabilitet). De 23 % av företagen som konsekvent byggde och validerade orsaksmodeller hade i genomsnitt 2,95 procentenheter högre ROA och 5,14 procentenheter högre ROE.',
  kalla: 'Ittner_and_Larcker_2003.pdf'
},
{
  id: 'str-ick-02',
  delkurs: 'strategi',
  amne: 'str-ickefinansiella',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad kallade mellanchefer i Ittner och Larckers studie ironiskt Balanced Scorecard, och varför?',
  alternativ: [
    '"Den heliga graalen", eftersom det löste alla problem',
    '"Four bucket"- eller "smorgasbord"-metoden, eftersom ledningen krävde att de skulle hitta på något för varje perspektiv oavsett affärsenhetens strategi',
    '"Den tysta revolutionen", eftersom förändringen skedde omärkligt',
    '"Den finansiella spegeln", eftersom allt ändå mätte samma sak'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ingen sådan formulering förekommer i artikeln.',
    'Rätt. Kritiken gäller att styrkortet användes som en färdig checklista: fyll varje "hink" med något. Poängen är att ramverket i sig inte talar om vilka prestationsområden och drivkrafter som faktiskt bidrar mest till det finansiella utfallet – det måste varje företag gräva fram själv.',
    'Fel. Ingen sådan formulering finns i materialet.',
    'Fel. Detsamma.'
  ],
  forklaring: 'Notera att kritiken inte riktas mot Kaplan och Norton – artikeln påpekar att ramverkens egna upphovsmän med rätta insisterar på att varje företag måste gräva djupt för att hitta de aktiviteter som verkligen påverkar de breda perspektiven.',
  kalla: 'Ittner_and_Larcker_2003.pdf'
},
{
  id: 'str-ick-03',
  delkurs: 'strategi',
  amne: 'str-ickefinansiella',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Ett telekomföretag satte målet 100 % kundnöjdhet. Vad visade Ittner och Larckers analys?',
  alternativ: [
    'Att målet nåddes men till för hög kostnad i tid',
    'Att kunder som var 100 % nöjda inte spenderade mer än de som var 80 % nöjda – de sista procenten krävde stora investeringar utan avkastning',
    'Att kundnöjdhet inte alls samvarierade med intäkter',
    'Att målet borde ha varit 120 %'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Problemet var inte tidsåtgången utan att den sista biten helt saknade avkastning.',
    'Rätt. Sambandet mellan kundnöjdhet och intäkter fanns – men bara upp till en viss punkt. Att ta sig från 80 % till 100 % krävde betydande investeringar med liten eller ingen återbetalning. Enastående icke-finansiell prestation ger alltså avtagande, och ibland till och med negativ, ekonomisk avkastning.',
    'Fel. Sambandet fanns; det var bara inte linjärt hela vägen.',
    'Fel. Poängen är att optimum kan ligga *under* 100 %, inte över.'
  ],
  forklaring: 'Slutsatsen: först genom att fastställa den nivå där nöjdheten upphör att bidra till intäktstillväxt kan ett företag veta om och hur mycket det ska investera i att höja den. Notera också att målsättning försvåras av eftersläpning – förbättringar i en drivkraft tar tid innan de syns i utfallet.',
  kalla: 'Ittner_and_Larcker_2003.pdf'
},
{
  id: 'str-ick-04',
  delkurs: 'strategi',
  amne: 'str-ickefinansiella',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad är skillnaden mellan validitet och reliabilitet hos ett prestationsmått?',
  alternativ: [
    'Validitet gäller hur ofta man mäter, reliabilitet hur många som mäts',
    'Validitet är i vilken utsträckning måttet fångar det som avses; reliabilitet är i vilken grad mättekniken visar faktiska förändringar utan att introducera egna fel',
    'Validitet gäller finansiella mått, reliabilitet icke-finansiella',
    'Begreppen är synonymer'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det beskriver mätfrekvens och urvalsstorlek.',
    'Rätt. Artikelns definitioner. Minst 70 % av företagen använde mått som saknade statistisk validitet och reliabilitet – t.ex. enkäter med bara en eller ett fåtal frågor för att mäta mycket komplexa dimensioner, med få skalsteg, och där svaren sedan pressades ihop till binära skalor (4–5 = nöjd, 1–3 = missnöjd).',
    'Fel. Begreppen gäller alla slags mått.',
    'Fel. De är två separata egenskaper. Ett mått kan vara reliabelt men ovalidt – det mäter konsekvent fel sak.'
  ],
  forklaring: 'Reliabilitetsproblem uppstår också när olika enheter inom samma företag använder olika metoder. Ett konsultföretag lät tre interna grupper mäta företagets rykte med olika tekniker och fick tre motstridiga resultat. En tillverkare hade fabriker som mätte total personalomsättning medan andra bara mätte frivillig.',
  kalla: 'Ittner_and_Larcker_2003.pdf'
},
{
  id: 'str-ick-05',
  delkurs: 'strategi',
  amne: 'str-ickefinansiella',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Redogör för Ittner och Larckers fyra misstag samt deras sexstegsmetod för att göra rätt. Ge exempel från artikeln.',
  modellsvar:
    '**Misstag 1: Att inte koppla måtten till strategin.** Färre än 30 % hade utvecklat orsaksmodeller. Utan en modell som visar vilka områden som förväntas förbättras av vilka åtgärder kan man inte välja bland hundratals möjliga mått. Resultatet blir en flod av perifera och irrelevanta mätetal – ett bolåneföretags "executive dashboard" svällde till nästan 300 mått, och driftschefen efterlyste de tjugo som faktiskt sade något.\n\n' +
    'Positivt motexempel: en snabbmatskedja modellerade kedjan bättre personalurval → högre medarbetarnöjdhet → bättre prestation → högre kundnöjdhet → köpfrekvens, kundlojalitet och rekommendationer → försäljningstillväxt och aktieägarvärde.\n\n' +
    '**Misstag 2: Att inte validera sambanden.** Endast 21 % kontrollerade om förbättringar i de icke-finansiella måtten faktiskt påverkade framtida finansiella resultat. Ledningen litade på sina förutfattade meningar. Snabbmatskedjan trodde att personalomsättning var nyckeln och övervägde dyra bonusprogram – men analysen visade att lönsamheten varierade dramatiskt mellan restauranger med identisk omsättningstakt. Det som spelade roll var omsättningen bland *arbetsledare*, inte bland lägre personal.\n\n' +
    '**Misstag 3: Att sätta fel målnivåer.** Telekomföretaget som siktade på 100 % kundnöjdhet upptäckte att helt nöjda kunder inte spenderade mer än de som var 80 % nöjda. Utmärkt icke-finansiell prestation ger avtagande eller negativ avkastning bortom en viss punkt.\n\n' +
    '**Misstag 4: Att mäta felaktigt.** Minst 70 % använde mått utan statistisk validitet och reliabilitet: för korta enkäter, för få skalsteg, hopklumpning till binära skalor, olika mätmetoder i olika enheter, och data som samlats in innan man bestämt vad man ville ta reda på.\n\n' +
    '**Sexstegsmetoden "doing it right":**\n\n' +
    '1. **Utveckla en orsaksmodell** baserad på hypoteserna i den strategiska planen. Är planen mer en visions- än en vägkarta, testa ett par konkurrerande modeller.\n' +
    '2. **Samla in data.** Inventera befintliga informationssystem – inköp, produktionsstyrning, kundtjänst – innan ny insamling startas. Bieffekt: vaga definitioner skärps och måtten blir konsekventa.\n' +
    '3. **Omvandla data till information.** Använd korrelationsanalys och multipel regression samt kvalitativa metoder som fokusgrupper och djupintervjuer. Sears använde regressionsanalys över många butiker för att identifiera de få aktiviteter som verkligen drev prestationen.\n' +
    '4. **Förfina modellen kontinuerligt.** Bakom bevisade drivkrafter finns drivkrafternas drivkrafter. Låg sjukfrånvaro kan förbättra resultatet – men vad minskar frånvaron: lönen eller arbetsmiljön?\n' +
    '5. **Basera åtgärder på resultaten.** Ett finansbolag fann att medarbetarnöjdhet, antal handläggningsfel och kundnöjdhet var drivkrafterna, i stigande betydelse, och krävde att kapitalallokeringsförslag motiverades utifrån den rangordningen.\n' +
    '6. **Utvärdera utfallet.** Mycket få gjorde efterhandsgranskningar. Även negativa resultat är värdefulla: de leder till revidering av modellen och kan avslöja insamlingsfel eller manipulation.\n\n' +
    '**Grundproblemet** bakom alla fyra misstagen är att företagen inte tagit reda på vilka icke-finansiella faktorer som faktiskt har störst effekt på den långsiktiga ekonomiska prestationen.',
  nyckelpunkter: [
    'Misstag 1: ingen koppling till strategin, ingen orsaksmodell (<30 %)',
    'Misstag 2: sambanden valideras inte (endast 21 %) – snabbmatskedjans arbetsledare',
    'Misstag 3: fel målnivåer – 100 % kundnöjdhet lönade sig inte',
    'Misstag 4: bristande validitet och reliabilitet (minst 70 %)',
    'Sex steg: modell → data → information → förfining → åtgärd → utvärdering',
    'Företag med validerade orsaksmodeller hade högre ROA och ROE'
  ],
  kalla: 'Ittner_and_Larcker_2003.pdf'
},

/* ========================== str-perspektiv ========================== */
{
  id: 'str-per-01',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilken av följande är INTE en av de fem krafterna i Porters Five Forces-modell?',
  alternativ: [
    'Lagar och regleringar som påverkar branschen',
    'Leverantörers förhandlingskraft',
    'Konkurrens mellan existerande företag inom branschen',
    'Substitutprodukters hot'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Lagar och regleringar ingår inte i modellen. De fem krafterna är: hot från nyetablering, rivalitet mellan befintliga konkurrenter, hot från substitutprodukter, köparnas förhandlingsstyrka och leverantörernas förhandlingsstyrka. Reglering hanteras istället i bredare omvärldsanalyser som PESTEL.',
    'Fel svar på frågan – detta ÄR en av krafterna.',
    'Fel svar på frågan – detta ÄR en av krafterna.',
    'Fel svar på frågan – detta ÄR en av krafterna.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Den femte kraften, som inte finns med bland alternativen, är hot från nyetablering (threat of entry). Enligt modellen bestäms lönsamhetspotentialen av krafternas samlade styrka: intensiva krafter ger låg avkastning, måttliga krafter hög.',
  kalla: 'Herrmann_2005.pdf, Tentamen 241206'
},
{
  id: 'str-per-02',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'I vilket sammanhang kan ett företag ha nytta av att göra en analys utifrån Porters Five Forces-modell?',
  alternativ: [
    'När företaget planerar att förbättra sina anställdas arbetsmiljö',
    'När företaget analyserar sin leveranskedja för att minska kostnader',
    'När företaget överväger att gå in i en ny bransch eller industri',
    'När företaget vill bedöma effektiviteten av sina marknadsföringskampanjer'
  ],
  ratt: 2,
  forklaringar: [
    'Fel. Arbetsmiljöfrågor ligger utanför modellen, som analyserar branschstruktur.',
    'Fel. Leveranskedjeanalys görs med värdekedjeanalys. Five Forces säger något om leverantörers *förhandlingsstyrka* generellt, inte om den egna kedjans kostnader.',
    'Rätt. Modellen analyserar en *branschs* attraktivitet, det vill säga dess lönsamhetspotential. Det är precis den frågan man ställer sig inför ett inträde på en ny marknad.',
    'Fel. Kampanjeffektivitet mäts med marknadsföringsmått, inte med branschstrukturanalys.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Kom ihåg analysnivån: Five Forces analyserar branschen (extern, industriell organisation), medan RBV analyserar företagets egna resurser (internt). De kompletterar varandra.',
  kalla: 'Herrmann_2005.pdf, Tentamen 241014'
},
{
  id: 'str-per-03',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Enligt Mintzberg kan en strategi inte alltid planeras i förväg eftersom…',
  alternativ: [
    'Strategier planerade i förväg alltid misslyckas i praktiken',
    'Organisationer är beroende av statliga regleringar för sina beslut',
    'Marknad och omvärld ofta är osäker och förändras snabbt',
    'Långsiktig planering är alltför kostsam för att vara värt besväret'
  ],
  ratt: 2,
  forklaringar: [
    'Fel. Överdriven formulering. Mintzberg hävdar inte att planerad strategi *alltid* misslyckas, utan att strategi också uppstår framväxande.',
    'Fel. Regleringsberoende är inte Mintzbergs argument.',
    'Rätt. Mintzberg och Waters menar att strategi är *emergent* – den uppstår ur olika medlemmars handlingar snarare än som produkten av en statisk planeringsövning. Bakgrunden var chefers missnöje med tidig strategisk planering, som misslyckades med att förutse omvärldens skiften.',
    'Fel. Kostnaden är inte huvudargumentet.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Besläktat begrepp: Quinns "logical incrementalism" – organisationer förfinar sin strategiska kurs stegvis allteftersom ny information framträder ur omvärlden. En modern ledare inspirerad av Mintzberg skulle säga: "Vi anpassar strategin efter hur marknaden utvecklas och vad vi lär oss på vägen."',
  kalla: 'Herrmann_2005.pdf, Tentamen 241014 & 241206'
},
{
  id: 'str-per-04',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Enligt resursbaserad teori (RBV) – när utgör ett företags resurser en grund för uthålliga konkurrensfördelar?',
  alternativ: [
    'När de är billiga och lätta att skaffa',
    'När de är värdefulla, sällsynta och kostsamma eller omöjliga att imitera',
    'När de är standardiserade i branschen',
    'När de kan köpas av vilken leverantör som helst'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Är resursen billig och lättillgänglig kan alla konkurrenter skaffa den, och då försvinner varje fördel.',
    'Rätt. RBV vilar på idén att företag skapar uthålliga konkurrensfördelar genom att utveckla och tillämpa idiosynkratiska, företagsspecifika resurser. Dessa blir värdefulla genom social komplexitet – resurser som motstår imitation, som kultur och rykte, är resultatet av komplexa interaktioner.',
    'Fel. Standardiserade resurser är per definition inte sällsynta.',
    'Fel. Fritt köpbara resurser saknar sällsynthet och imiterbarhetsskydd.'
  ],
  forklaring: 'Kontrasten mot Porter: Five Forces förklarar lönsamhet med branschens egenskaper (externt), RBV med företagets egna resurser (internt). Herrmann beskriver RBV som den andra "era of ferment" i strategiämnets utveckling. Immateriella resurser är den främsta källan till konkurrensfördel men samtidigt svårast att mäta.',
  kalla: 'Herrmann_2005.pdf, Barney_2024_HBR.pdf'
},
{
  id: 'str-per-05',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad menar Herrmann med att Porters generiska strategier utgjorde den första "dominant design" inom strategisk ledning?',
  alternativ: [
    'Att Porter var den första som skrev om strategi',
    'Att Porters ramverk blev den allmänt accepterade standarden som avslutade en period av experimenterande och inledde en era av inkrementell förändring',
    'Att Porters modell är den enda korrekta',
    'Att Porter designade den första strategiska planeringsmallen'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Chandler, Andrews och Ansoff formulerade strategibegreppet redan på 1960-talet.',
    'Rätt. Herrmann tillämpar den evolutionära modellen variation–selektion–retention. Definitionen av strategi på 1960-talet var den tekniska diskontinuitet som startade den första "era of ferment". Porters Competitive Strategy (1980) blev den dominanta designen: den signalerade vetenskaplig mognad och allmänt accepterade standarder, varefter forskningen övergick i inkrementella förbättringar under 1980-talet.',
    'Fel. Herrmann noterar tvärtom att Porter kritiserats för bristande stringens – men påpekar att det inte är teknisk förtjänst utan sociala och organisatoriska dynamiker som avgör vilken standard som väljs.',
    'Fel. Portföljmatriser som BCG:s Growth/Share Matrix kom från konsultvärlden, inte från Porter.'
  ],
  forklaring: 'Herrmanns kronologi: strategidefinition (1960-tal, diskontinuitet) → process/innehåll-uppdelning (1970-tal) → Porters generiska strategier (1980, dominant design) → RBV (andra era of ferment) → kunskap, lärande och innovation (den nya era of ferment som artikeln argumenterar för).',
  kalla: 'Herrmann_2005.pdf'
},
{
  id: 'str-per-06',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Inom vissa strategiperspektiv betonas vikten av att företag är "lärande organisationer". Nämn ett sådant strategiperspektiv och förklara kort vad som avses med begreppet lärande organisation och varför det är viktigt.',
  modellsvar:
    '**Strategiperspektiv:** Det kunskaps- och lärandebaserade perspektivet, som växt fram ur den resursbaserade teorin (RBV). Herrmann argumenterar för att kunskap, lärande och innovation utgör den nya "era of ferment" i strategiämnet och kommer att bilda grunden för nästa dominanta design. Den kunskapsbaserade synen på företaget (knowledge-based view) bygger vidare på RBV med fokus på förvärv, intern utveckling, ackumulering, exploatering och spridning av kunskapsintensiva organisatoriska förmågor.\n\n' +
    'Man kan också hänvisa till kursbokens avsnitt om mindre formaliserad styrning, där lärande behandlas som ett styrmedel vid sidan av företagskultur och medarbetarskap.\n\n' +
    '**Vad är en lärande organisation?** Lärande definieras som bestående förändringar i beteendet hos en individ eller grupp, på grundval av gjorda erfarenheter eller som resultat av samspel med omgivningen. Konkret innebär det att uppfattningar om hur arbetet ska utföras förändras till det bättre: högre kvalitet, kortare tid, nya arbetssätt eller nya arbetsuppgifter.\n\n' +
    'Det är först individer som lär sig. Ett *organisatoriskt* lärande uppstår när lärandet sprids till andra i företaget och nya kunskaper och erfarenheter omsätts i praktiken. Organisatoriskt lärande kan därför beskrivas som en ständigt pågående förändrings-, förnyelse- och förbättringsprocess.\n\n' +
    'Man skiljer på enkelkretslärande, där något oönskat löses utan att orsaken utreds, och dubbelkretslärande, där man både löser problemet och ifrågasätter dess orsak – man kurerar både symptomen och sjukdomen.\n\n' +
    '**Varför är det viktigt?**\n\n' +
    '1. **Konkurrensfördel.** Kunskap och de förmågor som utvecklas genom lärprocesser är immateriella resurser som är socialt komplexa och därmed svåra för konkurrenter att imitera. Enligt RBV är det just sådana resurser som ger uthålliga konkurrensfördelar. Stalk med flera förklarade Wal-Marts framgång med förmågan att lära av erfarenhet och omvandla nyckelprocesser till strategiska förmågor.\n\n' +
    '2. **Anpassningsförmåga.** Företagsmiljön förändras allt snabbare: teknisk utveckling, hårdare konkurrens, kortare produktlivscykler, avreglering och nya krav på hållbarhet. Under osäkerhet måste företag vara flexibla för att snabbt kunna reagera på okända omständigheter.\n\n' +
    '3. **Kontinuerlig innovation.** Uthållig konkurrensfördel bygger enligt Herrmann på kontinuerlig generering av innovationer, vilket förutsätter ett dynamiskt samspel mellan individuellt och organisatoriskt lärande.\n\n' +
    '**Förutsättningar** för lärande är en företagskultur där det är accepterat att experimentera, ta initiativ och föreslå nya lösningar, samt en människosyn där medarbetaren ses som något annat än en produktionsfaktor.',
  nyckelpunkter: [
    'Perspektiv: kunskaps- och lärandebaserat, framvuxet ur RBV (Herrmann)',
    'Lärande = bestående beteendeförändring grundad på erfarenhet',
    'Individen lär först; organisatoriskt lärande när kunskapen sprids och tillämpas',
    'Enkelkretslärande (symptom) kontra dubbelkretslärande (även orsaken)',
    'Viktigt eftersom kunskap är svårimiterad ⇒ uthållig konkurrensfördel enligt RBV',
    'Viktigt för anpassningsförmåga i snabbt föränderlig omvärld och för kontinuerlig innovation',
    'Kräver en kultur som tillåter experimenterande och initiativ'
  ],
  kalla: 'Herrmann_2005.pdf, EkonomistyrningAJK_Kap13.pdf kap. 3, Tentamen 241014 fråga 12'
},

/* ============================= str-it ============================= */
{
  id: 'str-it-01',
  delkurs: 'strategi',
  amne: 'str-it',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vilka är de fyra nyckelområdena som behöver anpassas enligt Strategic Alignment Model (Henderson och Venkatraman, 1993)?',
  alternativ: [
    'Personal, Affärsverksamhet, IT-strategi, Leveranskedja',
    'Affärsstrategi, IT-strategi, Organisationsinfrastruktur, IT-infrastruktur',
    'Produktutveckling, IT-strategi, Affärsstrategi, Riskhantering',
    'IT-strategi, IT-infrastruktur, Marknadsföring, Ekonomi'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Varken personal eller leveranskedja ingår i modellens fyra domäner.',
    'Rätt. Modellen ställer upp fyra domäner i en matris: externt kontra internt (strategi kontra infrastruktur) och verksamhet kontra IT. Det ger affärsstrategi, IT-strategi, organisationsinfrastruktur och IT-infrastruktur. Poängen är att alla fyra måste vara i linje med varandra.',
    'Fel. Riskhantering ingår inte som en egen domän.',
    'Fel. Marknadsföring och ekonomi är funktioner inom verksamheten, inte modellens domäner.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från omtentan HT24. Minnesregel för matrisen: två dimensioner – extern/intern och verksamhet/IT – ger fyra rutor. IT-strategin ska stödja affärsstrategin, och infrastrukturerna ska stödja respektive strategi.',
  kalla: 'Tentamen 241206'
},
{
  id: 'str-it-02',
  delkurs: 'strategi',
  amne: 'str-it',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad anses ofta vara lösningen på den så kallade produktivitetsparadoxen?',
  alternativ: [
    'Omorganisering av arbetsflöden och processer inom organisationer för att bättre utnyttja ny teknologi',
    'Bromsa den teknologiska utvecklingen för att förhindra nya flaskhalsar',
    'Investera mer i ytterligare teknologiska lösningar utan förändring i arbetsprocesser',
    'Att undvika teknologiska investeringar för att behålla status quo'
  ],
  ratt: 0,
  forklaringar: [
    'Rätt. Produktivitetsparadoxen är att investeringar i informationsteknologi inte automatiskt syns som produktivitetsökningar. Förklaringen är att tekniken införs i oförändrade arbetsflöden – nyttan uppstår först när processer och organisation utformas om så att teknikens möjligheter faktiskt kan utnyttjas.',
    'Fel. Att bromsa utvecklingen löser ingenting och är inget som föreslås i litteraturen.',
    'Fel. Mer teknik utan processförändring är precis vad som orsakar paradoxen från början.',
    'Fel. Att avstå investeringar innebär att man tappar i konkurrenskraft.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. Notera kopplingen till Kaplan och Nortons resonemang om process- kontra utfallsmått: en teknisk förbättring som inte förändrar affärslogiken ger inget utfall att mäta.',
  kalla: 'Tentamen 241014'
},
{
  id: 'str-it-03',
  delkurs: 'strategi',
  amne: 'str-it',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Enligt Barney och Reeves – varför leder investeringar i generativ AI sällan till uthålliga konkurrensfördelar?',
  alternativ: [
    'Därför att tekniken är för dyr för de flesta företag',
    'Därför att teknikens natur gör nya insikter och datamönster nästan omedelbart tillgängliga för alla som använder samma verktyg',
    'Därför att AI ger felaktiga resultat',
    'Därför att lagstiftningen förbjuder kommersiell användning'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kostnaden är tvärtom låg och sjunkande, vilket är en del av problemet – alla har råd.',
    'Rätt. Barney och Reeves argument: alla överlevande företag i en sektor kommer att tillämpa gen AI, och då är den ingen konkurrensfördel för någon av dem. Ber du AI lista nya tandborsttyper får varje konkurrent ungefär samma lista, eftersom liknande algoritmer identifierar mönster i liknande databaser. AI är därför mer benägen att *ta bort* en konkurrensfördel än att skapa en.',
    'Fel. Argumentet handlar om spridning och imiterbarhet, inte om kvalitet.',
    'Fel. Ingen sådan lagstiftning åberopas.'
  ],
  forklaring: 'En särskilt viktig poäng: eftersom gen AI använder ständigt uppdaterad data absorberas dina "first mover"-tillämpningar i den data som analyseras när konkurrenterna använder AI som "late movers". De drar alltså nytta både av sina egna och av dina tidigare ansträngningar.',
  kalla: 'Barney_2024_HBR.pdf'
},
{
  id: 'str-it-04',
  delkurs: 'strategi',
  amne: 'str-it',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vilket problem ser Barney och Reeves med att förlita sig på proprietära datamängder som källa till uthållig konkurrensfördel?',
  alternativ: [
    'Att sådana data alltid är av dålig kvalitet',
    'Att konkurrenter kan ha funktionellt likvärdiga data, att större datamängder inte nödvändigtvis ger bättre resultat, och att AI kan härleda eller imitera strategin utan tillgång till grunddatan',
    'Att data alltid måste delas enligt GDPR',
    'Att datamängder inte kan analyseras av AI'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Kvaliteten är inte kärnan i argumentet.',
    'Rätt. Tre problem: (1) konkurrenten kan ha samlat egna data i åratal – olika datamängder men liknande mönster ger liknande AI-resultat; (2) större är inte alltid bättre, syns mönstren redan i 50 miljoner datapunkter tillför en miljard föga; (3) allteftersom AI blir mer sofistikerad kan den härleda vilken sorts data ett företag måste ha för att fatta de beslut det fattar, och till och med imitera strategin efter att ha observerat resultaten. Dessutom är datamängder anmärkningsvärt svåra att skydda – "one disgruntled employee away".',
    'Fel. GDPR reglerar personuppgiftsbehandling, men det är inte artikelns argument.',
    'Fel. Hela premissen är att AI *kan* analysera dessa data.'
  ],
  forklaring: 'Barney och Reeves "silver lining": har du redan värdefulla, sällsynta och svårimiterade resurser kan AI förstärka den fördel du har. Amazon är exemplet – relationer med miljontals leverantörer, sammankopplade informationssystem, komplex lager- och leveransverksamhet, allt inom en kultur som belönar effektivitet. AI kan förbättra sådant, men bara företag med liknande resurser kan dra samma nytta.',
  kalla: 'Barney_2024_HBR.pdf'
},
{
  id: 'str-it-05',
  delkurs: 'strategi',
  amne: 'str-it',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Jay Barney hävdar att företags investeringar i och användning av AI inte i sig leder till långsiktiga konkurrensfördelar. Vilka är hans huvudsakliga argument för detta, och hur menar han att företag kan använda AI för att faktiskt skapa hållbara konkurrensfördelar?',
  modellsvar:
    '**Historisk parallell.** Barney och Reeves inleder med att ångmaskinen, elmotorn och persondatorn alla förändrade ekonomin i grunden – men få av dem blev källor till *uthållig* konkurrensfördel, just därför att effekterna var så genomgripande att i praktiken alla företag tvingades anamma dem. I många fall raderade de dessutom ut de fördelar etablerade aktörer hade och släppte in nya konkurrenter.\n\n' +
    '**Huvudargument mot AI som konkurrensfördel:**\n\n' +
    '1. **Värdeskapande är inte värdefångst.** Gen AI gör företag effektivare – Ally Financial sänkte kostnaden för att sammanfatta kundsamtal, Cisco genererar kod effektivare, Klarna lät en AI-assistent hantera två tredjedelar av kundtjänstchattarna första månaden. Men samma besparingar är tillgängliga för varje företag som inför tekniken. Värde skapas men fångas inte – åtminstone inte länge.\n\n' +
    '2. **Innovationsförslagen blir likartade.** Empiriska studier visar att gen AI kan vara skickligare än erfarna yrkesutövare på att komma på nya produkter. Men ber alla i branschen AI om en lista på nya tandborsttyper får de ungefär samma lista, eftersom liknande algoritmer hittar mönster i liknande databaser.\n\n' +
    '3. **Lärandet gynnar efterföljaren.** Eftersom gen AI använder ständigt uppdaterad data absorberas dina tidiga tillämpningar i den data som analyseras när konkurrenterna använder AI senare. De drar nytta både av sina egna och av dina tidigare ansträngningar. Frågar du "vad ska vår strategi vara?" hamnar dina val i datamängden – antingen för att du offentliggör dem eller för att AI kan härleda dem ur dina handlingar.\n\n' +
    '4. **Egna plattformar imiteras.** En specialanpassad AI för den egna branschen kan ge en fördel, men konkurrenterna skulle dra samma slutsats och bygga egna, samarbeta, anpassa allmänna modeller eller betala externa utvecklare. Algoritmerna är dessutom ofta öppen källkod, vilket snabbar på spridningen. Att bygga en bättre *allmän* plattform än OpenAI och liknande är osannolikt – bättre att lägga ut det på dem som specialiserat sig.\n\n' +
    '5. **Proprietär data räcker sällan.** Konkurrenter kan ha funktionellt likvärdiga data. Större datamängder är inte nödvändigtvis bättre – syns mönstren redan i 50 miljoner datapunkter tillför en miljard föga. AI kan dessutom härleda vilken data ett företag måste ha och imitera strategin efter att ha observerat resultaten. Slutligen är datamängder svåra att skydda: man kan vara "en missnöjd anställd bort" från att få dem spridda, och ofta är det en välmenande anställd som begår säkerhetsmisstaget.\n\n' +
    '**Hur hållbara fördelar ändå kan skapas:**\n\n' +
    '**Huvudvägen – förstärk befintliga fördelar.** Har organisationen värdefulla förmågor och unika resurser som inte går att replikera, kan AI tillämpad på dessa generera affärsidéer som inte skulle uppstå när AI appliceras på mer generiska resurser. Är tillgångarna sällsynta och svåra att imitera kan AI:s insikter bli en källa till uthållig konkurrensfördel – förutsatt att företaget är tillräckligt snabbfotat för att agera på dem, vilket i sig är en sällsynt förmåga.\n\n' +
    'Amazon är exemplet: relationer med miljontals leverantörer, mjukvara som kopplar ihop dem med kunderna, sammankopplade informationssystem, komplex lagerhållning och distribution samt returhantering – allt inom en kultur som belönar effektivitet och initiativ. AI kan sänka kostnader och öka intäkter där, men bara Walmart och Carrefour kommer i närheten av liknande resurser.\n\n' +
    '**Den svårare vägen – bygg affärsmodellen runt AI.** Saknar man sällsynta resurser återstår att bygga hela affärsmodellen kring AI. Det innebär mer än en egen plattform, som i sig går att imitera: varje affärsprocess i organisationen måste integrera AI-insikter, och den data man tränar sin AI på måste innefatta alla dessa insikter. Då blir AI mer än ett verktyg för att förbättra affärsmodellen – den gör att hela verksamheten kan anpassa sig till en föränderlig omvärld automatiskt och mycket snabbt. Den snabbfotheten kan vara svår att duplicera, åtminstone tills konkurrenterna också byggt om sina modeller. Men än så länge har inget företag lyckats med detta, och det är oklart om tekniken är mogen nog för investeringen och risken.\n\n' +
    '**Slutsats.** Företag som förnekar AI:s kraft kommer att misslyckas. De som anammar den håller sig kvar i matchen. Men de enda som faktiskt *vinner* på den är de som kan använda den för att förstärka de fördelar de redan har.\n\n' +
    '**Koppling till RBV:** hela resonemanget är resursbaserad teori tillämpad på AI. AI är i sig inte värdefull-sällsynt-svårimiterbar, men den kan förstärka resurser som är det.',
  nyckelpunkter: [
    'Historisk parallell: allmänna tekniker sprids till alla och raderar snarare fördelar',
    'Värdeskapande ≠ värdefångst: samma besparingar tillgängliga för alla',
    'AI ger likartade innovationsförslag – liknande algoritmer på liknande data',
    'Ständigt uppdaterad data ⇒ efterföljaren drar nytta av förstaflyttarens arbete',
    'Proprietär data: funktionellt likvärdiga alternativ, storlek hjälper inte, kan härledas, svår att skydda',
    'Lösning 1: applicera AI på redan sällsynta och svårimiterade resurser (Amazon)',
    'Lösning 2: bygg hela affärsmodellen kring AI för att skapa svårimiterad snabbfothet',
    'Kräver dessutom agility – förmågan att faktiskt agera på insikterna'
  ],
  kalla: 'Barney_2024_HBR.pdf, Tentamen 241206 fråga 11'
},

/* ========================== str-hallbarhet ========================== */
{
  id: 'str-hal-01',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilken kategori i Triple Bottom Line handlar om socialt ansvar och välbefinnandet för anställda, samhället och kunder?',
  alternativ: ['Planet', 'Purpose', 'Prosperity', 'People'],
  ratt: 3,
  forklaringar: [
    'Fel. Planet står för den miljömässiga dimensionen: utsläpp, resursanvändning och ekologisk påverkan.',
    'Fel. Purpose ingår inte i Triple Bottom Line. De tre P:na är people, planet och profit.',
    'Fel. Prosperity förekommer i vissa varianter av hållbarhetsramverk (bland annat FN:s Agenda 2030), men inte i den klassiska TBL-formuleringen.',
    'Rätt. People motsvarar den sociala dimensionen: anställda, samhället och kunder.'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. TBL formulerades av John Elkington och omfattar sociala, miljömässiga och ekonomiska komponenter – people, planet, profit. I Venndiagrammet är skärningen mellan socialt och ekonomiskt "equitable", mellan ekonomiskt och miljömässigt "viable", mellan socialt och miljömässigt "bearable", och i mitten "sustainable".',
  kalla: 'Rogers_Hudson_2011.pdf, Tentamen 241014'
},
{
  id: 'str-hal-02',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 1,
  fraga: 'Vilket av följande skulle klassificeras under bokstaven "E" i ESG-ramverket?',
  alternativ: [
    'Införa en policy för lika löner mellan könen',
    'Utvärdera styrelsens prestation och sammansättning',
    'Ge anställda vidareutbildning',
    'Öka energieffektiviteten och minska koldioxidutsläpp'
  ],
  ratt: 3,
  forklaringar: [
    'Fel. Lika löner är en social fråga och hör till S (Social).',
    'Fel. Styrelsens sammansättning och utvärdering är bolagsstyrning och hör till G (Governance).',
    'Fel. Kompetensutveckling för anställda hör till S (Social).',
    'Rätt. Energieffektivitet och koldioxidutsläpp är miljöfrågor och hör till E (Environmental).'
  ],
  forklaring: 'Frågan är hämtad ordagrant från ordinarie tenta HT24. ESG = Environmental (miljö), Social (socialt ansvar) och Governance (bolagsstyrning). Syftet med ramverket är att skapa bättre förutsättningar för att skydda miljön, förbättra socialt ansvarstagande och stärka bolagsstyrningen.',
  kalla: 'Tentamen 241014 & 241206'
},
{
  id: 'str-hal-03',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Hur definierades hållbar utveckling i Brundtlandrapporten (Our Common Future, 1987)?',
  alternativ: [
    'Utveckling som maximerar den ekonomiska tillväxten på lång sikt',
    'Utveckling som tillgodoser dagens behov utan att äventyra kommande generationers möjligheter att tillgodose sina behov',
    'Utveckling som helt eliminerar all miljöpåverkan',
    'Utveckling som styrs av marknadens efterfrågan på gröna produkter'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Definitionen erkänner tvärtom gränser för tillväxt, eller åtminstone behovet av att styra om tillväxten i mindre miljöförstörande riktning.',
    'Rätt. Detta är den klassiska definitionen: "meets the needs of the present without compromising the ability of future generations to meet their own needs".',
    'Fel. Definitionen kräver inte nollpåverkan, utan att kommande generationers möjligheter inte äventyras.',
    'Fel. Marknadsefterfrågan nämns inte i definitionen. Tvärtom påpekas att marknadsekonomi tenderar att kraftigt diskontera framtida värden till förmån för kortsiktiga vinster.'
  ],
  forklaring: 'Fyra nyckeldrag i definitionen: (a) hållbarhet som ett globalt problem med globala ansvar, (b) erkännande av gränser för tillväxt, (c) social rättvisa som en central aspekt, särskilt vägar till ekonomiskt och socialt framåtskridande för mindre utvecklade länder, och (d) en ny prioritet för långsiktigt tänkande om framtida generationer.',
  kalla: 'Rogers_Hudson_2011.pdf'
},
{
  id: 'str-hal-04',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad fann Porter och van der Linde (1995) om miljöregleringars effekt på företags lönsamhet?',
  alternativ: [
    'Att regleringar konsekvent minskade lönsamheten',
    'Att regleringar överväldigande bidrog positivt till vinsterna, eftersom analysen av utsläppen blottlade slöseri och ledde till mer effektiva processer',
    'Att regleringar inte hade någon mätbar effekt',
    'Att endast stora företag gynnades'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Det är den konventionella uppfattning som studien motsäger.',
    'Rätt. I kemisektorn undersöktes 181 avfallsförebyggande åtgärder vid 29 anläggningar. Endast en gav nettokostnadsökning. Av de 70 aktiviteter med dokumenterade förändringar i produktutbyte rapporterade 68 ökningar. En fjärdedel krävde ingen kapitalinvestering alls, och nästan två tredjedelar återbetalade sig på sex månader eller mindre. Den årliga besparingen per satsad dollar var i genomsnitt 3,49 dollar.',
    'Fel. Effekterna var tydligt mätbara och positiva.',
    'Fel. Storleksaspekten var inte studiens slutsats.'
  ],
  forklaring: 'Mekanismen: företag börjar med motvillig efterlevnad, men analysen blottlägger olika former av slöseri – ekonomiskt spill och materialslöseri – vilket riktar uppmärksamheten mot mer grundläggande omdesign av processer. Lärdomen som alla avfallsexperter känner till: det är dyrt att städa upp avfall och mycket billigare att inte producera det.',
  kalla: 'Rogers_Hudson_2011.pdf'
},
{
  id: 'str-hal-05',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 2,
  fraga: 'Vad menas med "push"- respektive "pull"-mekanismer för hållbarhet enligt Rogers och Hudson?',
  alternativ: [
    'Push = kundernas efterfrågan, pull = leverantörernas krav',
    'Pull = ledare som ser hållbarhet som nästa steg i organisationsutveckling, push = marknadskrafter och regulatoriska påtryckningar',
    'Push = interna kostnadsbesparingar, pull = externa investerare',
    'Push = frivilliga initiativ, pull = lagstiftning'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Ingen av dessa motsvarar artikelns definitioner.',
    'Rätt. "Pull" kommer från organisationsledare som ser hållbarhet som nästa frontlinje inom organisationsutveckling – drivkraften kommer inifrån. "Push" kommer från marknadskrafter och regulatoriska påtryckningar som kräver att ledare hittar innovativa sätt att nå sina mål med hänsyn till Triple Bottom Line.',
    'Fel. Uppdelningen går mellan inre drivkrafter och yttre tryck, inte mellan kostnader och investerare.',
    'Fel. Denna beskrivning kastar dessutom om riktningarna.'
  ],
  forklaring: 'Artikelns centrala tes bygger vidare på detta: den viktigaste frågan är om förändringen kommer genom passiv reaktion på yttre krafter, eller inifrån – från organisatoriskt ledarskap på alla nivåer. Hållbarhet skiljer sig från andra utmaningar genom att kräva förändringar i tänkande och praktik på varje nivå.',
  kalla: 'Rogers_Hudson_2011.pdf'
},
{
  id: 'str-hal-06',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'flerval',
  svarighet: 3,
  fraga: 'Vad går Karnanis kritik mot CSR ut på, och hur bemöter Rogers och Hudson den?',
  alternativ: [
    'Karnani menar att CSR är för dyrt; författarna svarar att kostnaderna är låga',
    'Karnani menar att CSR är irrelevant när vinst och allmänintresse sammanfaller och verkningslöst när de står i konflikt; författarna svarar att han felaktigt underordnar socialt och ekologiskt ansvar under finansiell redovisning',
    'Karnani menar att CSR bör lagstiftas; författarna anser att frivillighet räcker',
    'Karnani menar att CSR bara passar stora företag; författarna framhåller småföretagens roll'
  ],
  ratt: 1,
  forklaringar: [
    'Fel. Karnanis argument handlar inte om kostnadsnivåer.',
    'Rätt. Karnani hävdar att där privata vinster och allmänintressen sammanfaller är CSR irrelevant – att bara göra vinst löser problemen ändå. Där de står i konflikt hjälper CSR inte, eftersom aktieägarna vinner över välmenande chefer och insatserna "almost always be ineffective". Kvar blir självreglering, som för honom bara blir en finansiell kalkyl. Författarna menar att han därmed underordnar socialt och ekologiskt ansvar under finansiell redovisning – vilket är precis vad TBL motsätter sig. Nyckeln är att se varje mål som en nödvändig, oberoende och okompromissad del av helheten.',
    'Fel. Karnani argumenterar inte för lagstiftning.',
    'Fel. Företagsstorlek är inte hans argument.'
  ],
  forklaring: 'Författarna ger Karnani rätt på en punkt: det kommer nästan säkert att uppstå situationer där sociala och miljömässiga mål begränsar verksamhet och vinst, åtminstone på kort sikt. De påpekar samtidigt att ömsesidigheten går åt båda håll: precis som företag måste internalisera sociala och miljömässiga effekter måste miljö- och socialpolitiken internalisera affärsverkligheten. Av världens 100 största ekonomier är 51 företag – ska lösningar hittas måste företagen vara en del av dem.',
  kalla: 'Rogers_Hudson_2011.pdf'
},
{
  id: 'str-hal-07',
  delkurs: 'strategi',
  amne: 'str-hallbarhet',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Ekonomistyrning handlar om att utvärdera olika mått för att bedöma hur väl företag når sina uppsatta mål. Förändringar i omvärlden, såsom ökad medvetenhet om hållbarhet och digitalisering, har drivit företag att utveckla och anpassa sig till nya typer av mått. Diskutera vilka typer av mått dessa förändringar ger upphov till och hur de påverkar företagens sätt att arbeta. Ge exempel på hur företag kan använda dessa mått för att hantera både traditionella ekonomiska mål och nya omvärldsutmaningar.',
  modellsvar:
    '**Utgångspunkt: från enbart finansiella till kompletterande icke-finansiella mått.** Ekonomistyrning fokuserar av tradition på ekonomiska mål av finansiell karaktär – lönsamhet, vinst, soliditet, kassaflöde och likviditet. Utvecklingen går dock mot en ökad betydelse av icke-finansiella mål. Idén är att aspekter som nöjda kunder, nöjda medarbetare och hög kvalitet anses bidra till uppfyllandet av de finansiella målen.\n\n' +
    'Kaplan och Nortons kritik ger grunden: traditionella finansiella mått rapporterar vad som hände förra perioden utan att ge vägledning om hur ledningen kan förbättra nästa. De är historiska och säger inget om vart företaget är på väg.\n\n' +
    '**Nya typer av mått som förändringarna ger upphov till:**\n\n' +
    '*Hållbarhetsrelaterade mått.* Triple Bottom Line lyfter in sociala och miljömässiga dimensioner i redovisningen – "what gets measured gets done". Exempel: koldioxidutsläpp, energieffektivitet, andel återvunnet material, avfallsmängd, källreduktion; på den sociala sidan arbetsmiljö, jämställdhet, kompetensutveckling, leverantörsuppförande. ESG-ramverket strukturerar detta i miljö, socialt och bolagsstyrning. I kursbokens exempel har ÅF både miljömål (resurshushållning i uppdrag och för resor) och medarbetarmål (könsbalans, personalomsättning 7–13 %, utvecklingssamtal årligen).\n\n' +
    '*Kund- och processmått.* Kundnöjdhet, kundlojalitet, marknadsandel, leveranssäkerhet, kvalitetsutfall, ledtider och säkerhetsindex. Rockwater mätte t.ex. antal timmar med kunder i identifieringsfasen, offertvinstgrad, projekteffektivitetsindex och säkerhetsindex.\n\n' +
    '*Innovations- och lärandemått.* Andel intäkter från nya tjänster, förbättringsindex, medarbetarenkäter, antal förbättringsförslag, intäkt per anställd.\n\n' +
    '*Digitaliseringsrelaterade mått.* Mått kopplade till IT-investeringars faktiska nytta, snarare än till investeringsvolym – vilket är en direkt lärdom av produktivitetsparadoxen.\n\n' +
    '**Hur detta påverkar företagens sätt att arbeta:**\n\n' +
    '1. *Nya styrmedel.* Balanserat styrkort som formellt styrmedel, med fyra perspektiv som binder ihop finansiella och icke-finansiella mått. Även det horisontella värdekedjeperspektivet växer fram, där kundvärde snarare än enhetsräntabilitet blir utgångspunkten.\n\n' +
    '2. *Externt fokus.* Strategisk ekonomistyrning kompletterar det traditionella interna fokuset med konkurrenters priser och kostnadsnivåer samt kunders betalningsvillighet och lojalitetsdrivande faktorer.\n\n' +
    '3. *Nya kompetenskrav och ansvarsformer.* Controllerrollen breddas – enligt Larry Brady bygger styrkortet en bro mellan strategiutveckling och finansiell kontroll, som tidigare varit åtskilda funktioner.\n\n' +
    '4. *Legitimitet gentemot intressenter.* I intressentmodellens termer ställer opinionsgrupper krav på miljövänlighet och socialt ansvar och lämnar acceptans och legitimitet som bidrag. Nya mått är ett sätt att hantera den balansen.\n\n' +
    '**Hur måtten kan användas för att hantera båda målen samtidigt:**\n\n' +
    '- *Bygg orsakskedjor.* Ittner och Larcker: företag som utvecklar och validerar orsaksmodeller presterade bättre (2,95 procentenheter högre ROA och 5,14 högre ROE). En förbättring i ett icke-finansiellt mått ska kunna spåras till finansiellt utfall. Snabbmatskedjans kedja: bättre personalurval → nöjdare medarbetare → nöjdare kunder → köpfrekvens och lojalitet → tillväxt och kassaflöde.\n\n' +
    '- *Sök synergier snarare än avvägningar.* Porter och van der Linde visade att miljöregleringar ofta ökade lönsamheten, eftersom analysen av utsläpp blottlade slöseri: av 181 undersökta åtgärder gav bara en nettokostnadsökning, och den genomsnittliga besparingen var 3,49 dollar per satsad dollar. Källreduktion sänker både miljöpåverkan och kostnader.\n\n' +
    '- *Sätt rätt målnivåer.* Bättre är inte alltid mer lönsamt. Telekomföretagets kunder som var 100 % nöjda spenderade inte mer än de som var 80 % nöjda. Företag måste ta reda på var sambandet planar ut.\n\n' +
    '- *Undvik måttinflation.* Ett bolåneföretags instrumentpanel svällde till nästan 300 mått. Kaplan och Norton rekommenderar 15–20 mått, valda så att en utomstående kan se strategin genom dem.\n\n' +
    '- *Säkerställ validitet och reliabilitet.* Minst 70 % av företagen använde mått utan statistisk validitet. Mätmetoderna måste dessutom vara enhetliga inom koncernen, annars går resultaten inte att jämföra.\n\n' +
    '**Avslutande reflektion.** Utvecklingen innebär inte att finansiella mått överges. Kursboken ansluter sig fortfarande till lönsamhetsmålet, men på lång sikt och som huvudmål snarare än enda mål, med andra mål som delmål eller restriktioner. De nya måtten är verktyg för att göra just den långsiktigheten styrbar – och det är också där risken ligger: mått som inte är kopplade till strategin riskerar att bli symboliska mål som söker legitimitet snarare än att styra verksamheten.',
  nyckelpunkter: [
    'Från enbart finansiella (historiska) till kompletterande icke-finansiella mått',
    'Hållbarhetsmått (TBL, ESG), kund-/processmått, innovations- och lärandemått',
    'Balanced Scorecard som styrmedel som binder ihop perspektiven',
    'Strategisk ekonomistyrning: externt fokus på konkurrenter och kunder',
    'Ittner & Larcker: orsaksmodeller måste byggas och valideras – ger mätbart bättre ROA/ROE',
    'Porter & van der Linde: miljöåtgärder blottlägger slöseri ⇒ synergi mellan miljö och lönsamhet',
    'Fallgropar: måttinflation, fel målnivåer, bristande validitet och reliabilitet',
    'Risk att ohanterade mått blir symboliska mål för legitimitet'
  ],
  kalla: 'Tentamen 241206 fråga 12; syntes av kursens litteratur'
},

/* ============ Tvärgående essäfråga från tidigare tenta ============ */
{
  id: 'str-per-07',
  delkurs: 'strategi',
  amne: 'str-perspektiv',
  typ: 'oppen',
  svarighet: 3,
  fraga: 'Varför är "strategic alignment" mellan IT och resten av ett företags verksamhet viktig? Vad innebär i korta drag strategic alignment och hur kan man enligt synsättet uppnå långsiktiga konkurrensfördelar med hjälp av IT?',
  modellsvar:
    '**Vad strategic alignment innebär.** Strategic Alignment Model (Henderson & Venkatraman, 1993) ställer upp fyra domäner som måste vara i linje med varandra: affärsstrategi, IT-strategi, organisationsinfrastruktur och IT-infrastruktur. Modellen kan läsas som en matris med två dimensioner – externt (strategi) kontra internt (infrastruktur och processer) samt verksamhet kontra IT.\n\n' +
    'Alignment innebär att IT-strategin stödjer och möjliggör affärsstrategin, att IT-infrastrukturen är utformad för att bära IT-strategin, och att organisationsinfrastrukturen är anpassad så att tekniken faktiskt kan utnyttjas. Anpassningen är dessutom dubbelriktad: IT kan både följa av och möjliggöra affärsstrategin.\n\n' +
    '**Varför det är viktigt:**\n\n' +
    '1. *Produktivitetsparadoxen.* Investeringar i informationsteknologi ger ofta inte de produktivitetsökningar man förväntar sig. Den vanliga förklaringen är att tekniken införs i oförändrade arbetsflöden. Lösningen anses vara omorganisering av arbetsflöden och processer så att teknikens möjligheter kan utnyttjas. Det är i praktiken ett alignment-problem: IT-infrastrukturen har uppdaterats men inte organisationsinfrastrukturen.\n\n' +
    '2. *Investeringarnas storlek.* IT utgör en betydande del av många företags investeringar. Utan koppling till affärsstrategin blir de kostnader utan strategiskt utfall.\n\n' +
    '3. *Sammanhang med ekonomistyrningen.* Ekonomistyrningen är ett medel för strategiimplementering, och dess utformning ska anpassas till strategin. Samma logik gäller IT-strategin.\n\n' +
    '**Hur långsiktiga konkurrensfördelar kan uppnås:**\n\n' +
    'Här måste svaret nyanseras med resursbaserad teori. IT i sig är sällan en uthållig konkurrensfördel – den kan köpas av alla. Barney och Reeves resonemang om generativ AI illustrerar detta: allmänna teknologier sprids till alla överlevande företag i en sektor och slutar då vara en fördel för någon av dem. AI är till och med mer benägen att radera en konkurrensfördel än att skapa en.\n\n' +
    'Uthålliga fördelar uppstår istället när IT kombineras med resurser som är värdefulla, sällsynta och kostsamma att imitera:\n\n' +
    '- *Svårimiterbara kombinationer.* Fördelen ligger inte i systemet utan i kombinationen av system, processer, kompetens och kultur. Amazons framgång beror på leverantörsrelationer, sammankopplade informationssystem, komplex lager- och distributionsverksamhet och returhantering – inom en kultur som belönar effektivitet. Det är samspelet, inte en enskild komponent, som är svårt att kopiera.\n\n' +
    '- *Socialt komplexa resurser.* Enligt RBV blir resurser värdefulla genom social komplexitet – kultur och rykte motstår imitation eftersom de är resultatet av komplexa interaktioner. En IT-lösning som är djupt inbäddad i sådana strukturer blir svår att replikera även om själva tekniken är allmänt tillgänglig.\n\n' +
    '- *Organisatoriskt lärande och snabbfothet.* Förmågan att agera på insikter är i sig en sällsynt förmåga. Att bygga hela affärsmodellen kring tekniken, så att varje process integrerar dess insikter, kan skapa en anpassningsförmåga som är svår att duplicera.\n\n' +
    '- *Kontinuerlig anpassning.* Eftersom omvärlden förändras måste alignment upprätthållas över tid; det är inte ett engångsprojekt.\n\n' +
    '**Slutsats.** Strategic alignment är en nödvändig men inte tillräcklig förutsättning. Utan alignment blir IT-investeringar kostnader utan strategiskt utfall – produktivitetsparadoxen. Med alignment kan IT förstärka de fördelar företaget redan har, men konkurrensfördelen ligger i de svårimiterbara resurserna och förmågorna, inte i tekniken i sig.',
  nyckelpunkter: [
    'SAM (Henderson & Venkatraman): affärsstrategi, IT-strategi, organisationsinfrastruktur, IT-infrastruktur',
    'Alignment = de fyra domänerna i linje; dubbelriktad påverkan',
    'Produktivitetsparadoxen = alignment-problem: teknik i oförändrade processer ger ingen effekt',
    'IT i sig är sällan uthållig konkurrensfördel – den kan köpas av alla (jfr Barney om AI)',
    'Fördel uppstår i svårimiterbara kombinationer av system, processer, kompetens och kultur',
    'RBV: socialt komplexa resurser motstår imitation',
    'Alignment måste upprätthållas kontinuerligt, inte som engångsprojekt'
  ],
  kalla: 'Tentamen 241014 fråga 11; Barney_2024_HBR.pdf; Herrmann_2005.pdf'
}

);
