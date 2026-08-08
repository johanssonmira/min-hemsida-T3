/* =========================================================================
   Kompendium – Strategi och ekonomistyrning, kapitel 1–5
   -------------------------------------------------------------------------
   Textmarkering som stöds i "text"-fälten:
     **fet**   *kursiv*   `kod`
     Rader som börjar med "- "  blir punktlista
     Rader som börjar med "> "  blir citat-/varningsruta
     Tomrad separerar stycken
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.strategi = {
  delkurs: 'strategi',
  titel: 'Strategi och ekonomistyrning',
  intro:
    'Den här delkursen handlar om två saker som hänger ihop tätare än man först tror: hur företag ' +
    'bestämmer vart de ska (strategi) och hur de får verksamheten att faktiskt röra sig dit ' +
    '(ekonomistyrning). Kompendiet är skrivet för att läsas i ordning – varje kapitel bygger på det ' +
    'förra, och de sista knyter ihop bilden. Räkna med ungefär en och en halv timme för hela texten.\n\n' +
    'Läs först, öva sedan. Begreppen fastnar betydligt bättre när du redan sett dem i sitt sammanhang.',
  kapitel: []
};

window.SYSB23.kompendium.strategi.kapitel.push(

/* ====================== KAPITEL 1 ====================== */
{
  id: 'str-k1',
  nr: 1,
  titel: 'Vad ekonomistyrning är',
  ingress: 'Grundplattan: vad ekonomi och företag betyder i ämnet, hur ekonomistyrning definieras, vad den som styr faktiskt gör och vilka verktyg som finns.',
  lastid: 9,
  amnen: ['str-ekonomistyrning'],
  avsnitt: [
    {
      rubrik: 'Företag och ekonomi betyder något bredare än du tror',
      text:
        'De flesta tänker på Volvo, H&M eller den lokala bilhandlaren när de hör ordet **företag**. Inom ' +
        'företagsekonomin är begreppet bredare än så: det står för *en sammanslutning av personer som i ' +
        'någon form bedriver ett medvetet arbete för att uppnå ett eller flera mål*.\n\n' +
        'Det betyder att även offentlig verksamhet som sjukvård och energiproduktion räknas som företag, ' +
        'liksom idrottsföreningar, högskolor och kooperationer. Inom ämnet behandlas dock främst ' +
        'affärsdrivande verksamheter.\n\n' +
        'Ordet **ekonomi** kommer från grekiskans *oikonomia*, som betyder hushållning eller förvaltning. ' +
        'Ekonomi definieras som hushållning med begränsade eller knappa resurser. Företag behöver resurser ' +
        'för att producera och avyttra varor och tjänster – kapital, personal, utrustning, material, kunskap, ' +
        'information – och ingen har obegränsad tillgång till dem.\n\n' +
        'När företag hushållar förnuftigt och sparsamt med sina resurser säger man att **effektiviteten är hög**. ' +
        'Det betyder att de är framgångsrika i sin strävan att uppnå sina mål, alltså att graden av ' +
        'måluppfyllelse är hög. Vi återkommer till det begreppet på djupet i kapitel 4 – det är kursens mest ' +
        'förväxlade term.'
    },
    {
      rubrik: 'Definitionen du behöver kunna',
      text:
        'Nationalencyklopedin definierar ekonomistyrning så här, och kursboken använder samma formulering:\n\n' +
        '> Ekonomistyrning avser avsiktlig påverkan på en verksamhet och dess befattningshavare mot vissa ekonomiska mål.\n\n' +
        'Tre delar i definitionen är värda att stanna vid.\n\n' +
        '**Avsiktlig påverkan.** Det sker medvetet och planerat. Att en verksamhet råkar utvecklas i rätt ' +
        'riktning är inte ekonomistyrning.\n\n' +
        '**Verksamhet och befattningshavare.** Styrningen riktas både mot processer och mot människor. Man ' +
        'styr inte bara *vad* som görs, utan får organisatoriska enheter och medarbetare att i sitt arbete ' +
        'sträva mot de uppsatta målen.\n\n' +
        '**Ekonomiska mål.** Här ligger en vanlig missuppfattning. Ekonomiska mål är inte bara finansiella. ' +
        'De kan vara av båda slagen:'
    },
    {
      rubrik: 'Finansiella och icke-finansiella mål',
      text:
        '**Finansiella mål** kan gå ut på att nå ett visst resultat, en viss lönsamhet eller ett visst ' +
        'kassaflöde. Andra exempel är soliditet och likviditet.\n\n' +
        '**Icke-finansiella mål** kan gälla att få mer nöjda kunder, förbättra produktkvaliteten eller få ' +
        'mer nöjda medarbetare.\n\n' +
        'Ekonomistyrning fokuserar *av tradition* på finansiella mål. Men det finns en tydlig utveckling mot ' +
        'ökad betydelse för de icke-finansiella. Idén bakom utvecklingen är att aspekter som nöjda kunder, ' +
        'nöjda medarbetare och hög kvalitet **anses bidra till uppfyllandet av de finansiella målen**.\n\n' +
        'Lägg den formuleringen på minnet. Den är själva bryggan till kapitel 7, där Kaplan och Norton bygger ' +
        'ett helt styrsystem på tanken, och där Ittner och Larcker visar hur illa det går när företag antar ' +
        'sambandet utan att kontrollera det.'
    },
    {
      rubrik: 'Vad den som arbetar med ekonomistyrning faktiskt gör',
      text:
        'Kursboken listar uppgifterna. Du behöver inte kunna dem utantill, men du bör se mönstret: det handlar ' +
        'om en cykel av planering, genomförande, uppföljning och anpassning.\n\n' +
        '- Planera, genomföra, följa upp och anpassa verksamheten i förhållande till planer och mål\n' +
        '- Förse beslutsfattare med underlag och följa upp fattade beslut\n' +
        '- Fördela och utkräva ansvar\n' +
        '- Samla in, tolka, sammanställa, rapportera och kommunicera ekonomisk information\n' +
        '- Analysera orsaker till avvikelser från planer och föreslå åtgärder\n' +
        '- Genomföra specialutredningar\n' +
        '- Analysera hur verksamhetens processer och aktiviteter kan förbättras\n' +
        '- Verka som rådgivare och samtalspartner i ekonomiska frågor\n' +
        '- Utveckla och uppdatera styr- och ekonomisystem\n' +
        '- Utbilda medarbetarna i ekonomiska frågor\n' +
        '- Bidra till förutsättningar för en lärande organisation\n' +
        '- Bidra till en positiv företagskultur\n\n' +
        'Notera de tre sista. De handlar inte om siffror alls, utan om kultur och lärande. Ekonomistyrning är ' +
        'alltså inte enbart en formaliserad process med tekniker och metoder.'
    },
    {
      rubrik: 'De tre slagen av styrmedel',
      text:
        'För att kunna utföra uppgifterna behövs **styrmedel**. Samuelson delar in dem i tre kategorier, och ' +
        'den indelningen är en klassisk tentafråga.\n\n' +
        '**1. Formella styrmedel** – ekonomistyrningens tekniker. Exempel: produktkalkylering, budgetering och ' +
        'prestationsmätning. Kursboken behandlar elva stycken: resultatplanering, produktkalkylering, ' +
        'budgetering, intern redovisning, standardkostnader, internprissättning, prestationsmätning, ' +
        'benchmarking, processtyrning, målkostnadskalkylering och investeringskalkylering.\n\n' +
        '**2. Organisationsstruktur** – organisationsform, ansvarsfördelning och belöningssystem. Alltså hur ' +
        'verksamheten är uppbyggd, vem som ansvarar för vad och hur prestationer belönas.\n\n' +
        '**3. Mindre formaliserad styrning** – de mjuka styrmedlen: företagskultur, lärande och medarbetarskap ' +
        '(empowerment).\n\n' +
        'Kapitel 5 går igenom kategori 2 och 3 i detalj.\n\n' +
        '> Vanlig tentafälla: alternativ som föreslår helt andra indelningar, till exempel "kortsiktiga, ' +
        'medellånga och långsiktiga" eller "finansiella, icke-finansiella och hybrida". Tidshorisont är en ' +
        'egenskap hos *mål*, inte grunden för indelningen av *styrmedel*.'
    },
    {
      rubrik: 'Syftet: ekonomistyrning är strategiimplementering',
      text:
        'Det övergripande syftet med ekonomistyrningen är att hjälpa till i arbetet med att uppnå företagets ' +
        'strategiska målsättningar. Det kan också uttryckas som att **ekonomistyrningen utgör ett medel för ' +
        'implementering av företagets strategi**.\n\n' +
        'Det får en viktig konsekvens: ekonomistyrningens utformning och användning behöver anpassas till den ' +
        'strategi företaget bestämt sig för. En lågkostnadsstrategi kräver en annan ekonomistyrning än en ' +
        'differentieringsstrategi.\n\n' +
        'Notera nyansen: det är inte strategin *i sig* som är utgångspunkten, utan den nedbrytning och ' +
        'operationalisering av strategin som gjorts i verksamhetsplaner och delmål. Det för oss direkt in i ' +
        'nästa kapitel.'
    },
    {
      rubrik: 'Strategisk ekonomistyrning',
      text:
        'Ämnet är i förändring, och en ny inriktning har vuxit fram: **strategisk ekonomistyrning**. Det råder ' +
        'ännu inte konsensus om exakt vad begreppet innebär – olika författare anlägger olika perspektiv – men ' +
        'fyra gemensamma särdrag brukar anges:\n\n' +
        '- **Bredare uppgifter.** Ekonomistyrningen ska även omfatta identifiering och förstärkning av ' +
        'konkurrensfördelar, strategiformulering och strategisk förnyelse.\n' +
        '- **Externt fokus.** Det traditionella interna fokuset kompletteras med konkurrenters priser, ' +
        'kostnadsnivåer, produktionsvolymer och marknadsandelar, samt kunders betalningsvillighet, ' +
        'värdeskapande faktorer och lojalitetsbestämmande faktorer.\n' +
        '- **Nya angreppssätt.** Kostnadsreducering och differentiering söks genom att exploatera länkar i ' +
        'företagets värdekedja, arbeta med strategiska kostnadsdrivare och fokusera icke-finansiella men ' +
        'strategiskt viktiga aspekter.\n' +
        '- **Anpassning till strategin.** Det ska råda överensstämmelse mellan företagets strategiska ' +
        'inriktning och ekonomistyrningens utformning.\n\n' +
        'Metoder som brukar tillskrivas inriktningen: strategisk kostnadsanalys, kostnadsdrivaranalys, ' +
        'kalkylering av produktattribut, värdekedjeanalys, livscykelkalkylering, **balanserat styrkort** och ' +
        'målkostnadskalkylering.'
    }
  ],
  nyckelbegrepp: [
    'Ekonomistyrning: avsiktlig påverkan på en verksamhet och dess befattningshavare mot vissa ekonomiska mål',
    'Ekonomi: hushållning med begränsade eller knappa resurser',
    'Finansiella mål: resultat, lönsamhet, kassaflöde, soliditet, likviditet',
    'Icke-finansiella mål: nöjda kunder, kvalitet, nöjda medarbetare',
    'Formella styrmedel: kalkylering, budgetering, prestationsmätning',
    'Organisationsstruktur: organisationsform, ansvarsfördelning, belöningssystem',
    'Mindre formaliserad styrning: kultur, lärande, medarbetarskap',
    'Strategisk ekonomistyrning: externt fokus, värdekedja, anpassning till strategin'
  ],
  tentakoppling:
    'Definitionen av ekonomistyrning och indelningen i tre slag av styrmedel är standardfrågor. ' +
    'Kan du dem ordagrant får du dem gratis.'
},

/* ====================== KAPITEL 2 ====================== */
{
  id: 'str-k2',
  nr: 2,
  titel: 'Vision, affärsidé, strategi och verksamhetsplaner',
  ingress: 'Kedjan från önskad framtid till konkret styrning – och exakt vad som skiljer en vision från en affärsidé.',
  lastid: 8,
  amnen: ['str-vision'],
  avsnitt: [
    {
      rubrik: 'Kedjan',
      text:
        'Fyra begrepp bildar en kedja där varje led konkretiserar det föregående. Ekonomistyrningen hänger i ' +
        'botten av kedjan.\n\n' +
        '- **Vision** – hur företaget vill att kunderna ska uppfatta det, den riktning i vilken företaget ska ' +
        'utvecklas, det framtida önskade tillståndet\n' +
        '- **Affärsidé** – hur företaget avser att utvecklas i förhållande till sin vision, vad som skiljer det ' +
        'från andra företag, vad det ägnar sig åt\n' +
        '- **Strategi** – hur företaget ska arbeta, en plan för hur affärsidén ska uppnås\n' +
        '- **Verksamhetsplanering** – nedbrytning av huvudmål till delmål samt handlingsplaner och riktlinjer\n' +
        '- **Ekonomistyrning** – styrning mot ekonomiska mål\n\n' +
        'Lär dig kedjan i rätt ordning. Tentafrågor testar ofta just gränsdragningen mellan två intilliggande led.'
    },
    {
      rubrik: 'Vision',
      text:
        'Företagets vision anger hur man vill att kunderna ska uppfatta företaget, eller den riktning i vilken ' +
        'företaget ska utvecklas. Man kan också säga att en vision är **ett önskvärt framtida tillstånd** som ' +
        'beskriver vart företaget är på väg och vad det ska uppnå.\n\n' +
        'Två exempel ur årsredovisningar:\n\n' +
        '- IKEA: "att skapa en bättre vardag för de många människorna"\n' +
        '- Hemtex: "Inspiration och förnyelse för alla rum"\n\n' +
        'Visionen har **minst tre funktioner**, och de är en trolig tentafråga:\n\n' +
        '**Legitimerande.** Genom att ange den roll företaget vill ha i samverkan med intressenter i omgivningen ' +
        'sätts verksamheten in i ett samhällsperspektiv. Strävan är att övertyga viktiga intressenter om att ' +
        'företaget har ett socialt och samhälleligt berättigande.\n\n' +
        '**Ambition och fokus.** Visionen är ett samlat uttryck för företagets framtidsmål och anger en ' +
        'ambitionsnivå som sätter ramar för arbetet med affärsidé och strategi.\n\n' +
        '**Identifikation och motivation.** Visionen skapar motivation och engagemang, bidrar till att de ' +
        'anställda känner sig delaktiga och tar initiativ och ansvar.'
    },
    {
      rubrik: 'Affärsidé',
      text:
        'Affärsidén anger **vad företaget ska ägna sig åt** och hur man avser att utvecklas i förhållande till ' +
        'visionen. Den kan också sägas innebära ett klargörande av vad som skiljer företaget från andra företag.\n\n' +
        'Det finns ingen standardmall. Utvecklade affärsidéer innehåller klargöranden av bland annat vilka varor ' +
        'och tjänster som erbjuds, vilka kunder man vänder sig till, vilka marknader man arbetar på och hur ' +
        'verksamheten ska utvecklas. Etiska riktlinjer kan ingå.\n\n' +
        'Övergripande kan man säga att affärsidén anger **vad företaget tjänar pengar på**, eller ska tjäna ' +
        'pengar på i framtiden.\n\n' +
        'H&M:s affärsidé är "att erbjuda mode och kvalitet till bästa pris" – följt av en förklaring av hur det ' +
        'går ihop: få mellanhänder, stora volymer, djupt kunnande inom design och textil, rätt vara från rätt ' +
        'marknad, kostnadsmedvetenhet i alla led och effektiv distribution.\n\n' +
        'Enligt Roos med flera bör affärsidén framför allt:\n\n' +
        '- Åstadkomma en förståelse för syftet med organisationen\n' +
        '- Skapa ett underlag för motivation\n' +
        '- Utgöra ett underlag för fördelning av företagets resurser\n' +
        '- Etablera den ton och det affärsklimat som önskas\n' +
        '- Fungera som orienteringspunkt för dem som kan identifiera sig med företagets syfte\n' +
        '- Möjliggöra en översättning av organisationens syfte till konkreta mål\n' +
        '- Möjliggöra en översättning av mål till strategier och andra aktiviteter'
    },
    {
      rubrik: 'Skillnaden vision–affärsidé, formulerad som på tentan',
      text:
        'Detta är en fråga som förekommit ordagrant på ordinarie tenta HT24.\n\n' +
        '> **Visionen beskriver företagets framtida riktning, medan affärsidén fokuserar på vad företaget gör ' +
        'och hur det genererar intäkter.**\n\n' +
        'Fällorna i frågan var:\n\n' +
        '- "Visionen är kortsiktig, affärsidén långsiktig" – tvärtom, visionen är den mest långsiktiga\n' +
        '- "Visionen kommuniceras utåt, affärsidén internt" – båda kommuniceras åt båda hållen, och visionen ' +
        'har till och med en uttalad legitimerande funktion utåt\n' +
        '- "Visionen beskriver hur man tjänar pengar, affärsidén framtidsdrömmar" – beskrivningarna omkastade'
    },
    {
      rubrik: 'Strategi',
      text:
        'I strategin klargörs **hur företaget ska arbeta**. Strategin innehåller en beskrivning av eller en plan ' +
        'för hur affärsidén ska uppnås. Vanliga inslag:\n\n' +
        '- Vilka konkurrensfördelar företaget avser att utveckla och utnyttja\n' +
        '- Företagets styrkor och svagheter samt möjligheter och hot i omvärlden\n' +
        '- Inom vilka varu- och tjänsteområden företaget ska arbeta\n' +
        '- Vilka kundkategorier man vänder sig till och hur de ska bearbetas\n' +
        '- Hur hot från konkurrenter ska mötas\n' +
        '- Vilken organisationsstruktur som ska användas\n' +
        '- Vilken kompetens som krävs och hur den säkerställs\n' +
        '- Vilka resurser som krävs\n' +
        '- Hur verksamheten ska finansieras\n\n' +
        'Mindre företag har vanligen en homogen verksamhet och därmed en strategi för helheten. Större företag ' +
        'har flera. I mycket stora företag finns strategier på flera nivåer: **koncernstrategi, ' +
        'affärsområdesstrategi, divisionsstrategi, affärsenhetsstrategi och funktionsstrategi**.\n\n' +
        'När man diskuterar strategi håller man sig vanligen på divisions- eller affärsenhetsnivå. Det är först ' +
        'där verksamheten kan klargöras tillräckligt precist – och det är också där ekonomistyrningen i de allra ' +
        'flesta fall förekommer.'
    },
    {
      rubrik: 'Verksamhetsplaner',
      text:
        'När strategin är formulerad behöver huvudmålen brytas ned i **delmål**. Huvudmålen är en precisering och ' +
        'operationalisering av vision och affärsidé; strategin är sättet att uppnå dem.\n\n' +
        'Delmålen väljs så att uppfyllandet av dem leder till att de övergripande strategiska målen uppfylls. De ' +
        'är av olika slag och riktar sig mot olika delar av företaget. Vissa uttrycks finansiellt (räntabilitet, ' +
        'försäljning, kostnader), andra icke-finansiellt (kvalitet, kundtillfredsställelse, marknadsandel).\n\n' +
        'Två saker måste dessutom klargöras för varje delmål:\n\n' +
        '- **Tidshorisont** – lång, medellång eller kort sikt\n' +
        '- **Ansvar** – vilken division, avdelning, produktområde eller marknadsområde som svarar för målet\n\n' +
        'Först därefter kan den konkreta verksamhetsplaneringen ta form. Den riktar sig mot olika delar av ' +
        'verksamheten, och man talar då om produktionsstyrning, lagerstyrning, marknadsstyrning och ' +
        '**ekonomistyrning** – som alltså är en av flera parallella styrningar.'
    }
  ],
  nyckelbegrepp: [
    'Vision: önskvärt framtida tillstånd, riktning',
    'Visionens tre funktioner: legitimerande, ambition och fokus, identifikation och motivation',
    'Affärsidé: vad företaget ägnar sig åt och tjänar pengar på, vad som skiljer det från andra',
    'Strategi: hur företaget ska arbeta, planen för att uppnå affärsidén',
    'Strateginivåer: koncern, affärsområde, division, affärsenhet, funktion',
    'Verksamhetsplaner: nedbrytning till delmål med tidshorisont och ansvar'
  ],
  tentakoppling:
    'Skillnaden vision–affärsidé kom ordagrant på ordinarie tentan HT24, och visionens syfte på omtentan. ' +
    'Detta är kapitlet med högst träffsäkerhet per läst minut.'
},

/* ====================== KAPITEL 3 ====================== */
{
  id: 'str-k3',
  nr: 3,
  titel: 'Vad är egentligen företagets mål?',
  ingress: 'Fem konkurrerande modeller – från den neoklassiska svarta lådan till intressentmodellen – och vad företag faktiskt säger att de vill.',
  lastid: 11,
  amnen: ['str-mal'],
  avsnitt: [
    {
      rubrik: 'Varför finns det inte ett svar?',
      text:
        'Företag existerar för att uppfylla mål. Men vilka? Frågan har diskuterats länge inom företagsekonomin, ' +
        'och slutsatsen är att det **inte finns en teori eller modell som ger ett entydigt svar**.\n\n' +
        'Kursboken ger fyra skäl:\n\n' +
        '- **Olika sammanhang kräver olika modeller.** Man vill ofta belysa ett preciserat problem, och då är det ' +
        'både nödvändigt och önskvärt att förenkla verkligheten.\n' +
        '- **Företag och omgivning förändras.** Nya förutsättningar ställer krav på anpassning, inte bara i hur man ' +
        'arbetar utan även i vilka mål man har. Under en period kan lönsamhet vara viktigast, under en annan tillväxt.\n' +
        '- **Mål skiljer sig mellan och inom företag.** En koncern kan ha ett mål medan dotterbolagen har andra.\n' +
        '- **Det finns olika uppfattningar och synsätt**, delvis av politiska, ideologiska och moraliska skäl.\n\n' +
        'Nedan följer de fem modeller du behöver kunna. Läs dem som en utveckling: varje modell uppstår ur kritik ' +
        'mot den föregående.'
    },
    {
      rubrik: '1. Vinstmaximeringsmodellen (neoklassisk teori)',
      text:
        'I den neoklassiska företagsekonomiska teorin antas företag **maximera sin vinst**.\n\n' +
        'Företaget betraktas som en förädlings- eller resursomvandlingsenhet: ett inflöde av uppoffringar med ett ' +
        'visst värde omvandlas till ett utflöde av prestationer med ett högre värde. Man bortser från individer och ' +
        'behandlar inte hur omvandlingen går till. Företaget ses som en **svart låda** ("black box").\n\n' +
        'Vinst är det enda målet och därmed det enda uttrycket för effektivitet. Företagets handlande antas ' +
        '**rationellt**: inga handlingar vidtas som avviker från vinstmaximeringsmålet.\n\n' +
        'Begreppen har delvis annan innebörd än i redovisningen. **Intäkt** är erhållen försäljning, alltså pris per ' +
        'styck gånger såld kvantitet. **Kostnad** uttrycker vad företaget avstår från genom att använda resurser för ' +
        'ett visst handlingsalternativ – en **alternativkostnad**, bestämd av bästa alternativa användning.\n\n' +
        '**Kritiken** riktas mot antagandena:\n\n' +
        '- Att vinstmaximering skulle vara företags enda mål\n' +
        '- Att företag antas ha all information som krävs. Beslut fattas inför en osäker framtid, och det har till ' +
        'och med hävdats att man i efterhand knappt kan avgöra om företaget vinstmaximerat\n' +
        '- Att det skulle finnas en enda effektiv kombination av pris och kvantitet. Beaktar man riskattityd ' +
        'varierar vinst och mål med den\n\n' +
        '**Försvaret** är intressant: teorin syftar inte till att förutsäga eller förklara hur företag faktiskt ' +
        'arbetar. Den är en konstruktion för att belysa prisbildning och resursfördelning på marknads- och ' +
        'branschnivå. Kritik mot bristande realism blir då inte giltig – teorin är tillräckligt realistisk med ' +
        'avseende på vad den syftar till.'
    },
    {
      rubrik: '2. Företagsledarmodeller',
      text:
        'Många ekonomer har varit kritiska mot vinstmaximering. Ett gemensamt drag i **företagsledarmodellerna** ' +
        '(Managerial Theories of the Firm) är att **ägande och drift betraktas som åtskilda**. När de skiljs åt ' +
        'minskar ägarnas möjligheter att kontrollera driften, och det skapas utrymme för företagsledningen att ' +
        'arbeta efter egna mål.\n\n' +
        '**William Baumol – försäljningsmaximeringsmodellen.** Företaget maximerar försäljningen samtidigt som det ' +
        'strävar efter en vinst som ägarna uppfattar som tillfredsställande. Genom att maximera försäljningen ' +
        'istället för skillnaden mellan intäkter och kostnader växer företaget. Tillväxten skapar förutsättningar ' +
        'för högre löner, större inflytande och högre status för ledningen – fördelar som anses hänga samman mer ' +
        'med försäljningens än med vinstens storlek.\n\n' +
        '**Oliver Williamson.** Företagsledningen maximerar sin **egen nytta** istället för företagets vinst. Även ' +
        'här krävs en viss vinst som tillfredsställer ägarna. Ledningens nytta påverkas av lön, makt, status och ' +
        'prestige, och skapas genom utgifter för löner, administration (det anses prestigefyllt med en stor ' +
        'administration under sig), förmåner som flotta kontor, tjänstebilar och representation, samt prioriterade ' +
        'investeringar som inte krävs för normal drift.'
    },
    {
      rubrik: '3. Satisfieringsmodellen (Herbert Simon)',
      text:
        'Nobelpristagaren Herbert Simon menar att företag strävar efter en **tillfredsställande** eller ' +
        '**satisfierande** vinst, snarare än maximal vinst.\n\n' +
        'Vad som är tillfredsställande fastställs alltid i förhållande till en **anspråksnivå**. Det finns ingen ' +
        'given vinstnivå – den beror på företagets situation och de vinstmöjligheter som existerar. Vinsten måste ' +
        'dock vara tillräckligt hög för överlevnad och över tiden bli minst lika hög som tidigare perioder.\n\n' +
        'Grunden är **begränsad rationalitet**. Beslutsfattare känner inte till samtliga tänkbara alternativ, det ' +
        'bästa alternativet kan bara med svårighet (eller inte alls) fastställas på förhand, och beslutsfattaren ' +
        'måste aktivt skaffa sig information. Därför är man nöjd när man funnit ett alternativ som uppfyller ett ' +
        'preciserat minimikrav.\n\n' +
        '> Viktig nyans som ofta testas: en tillfredsställande vinst innebär **inte** en lägre ambitionsnivå än ' +
        'vinstmaximering. Poängen är att det på grund av den begränsade rationaliteten helt enkelt inte är ' +
        '*möjligt* att vinstmaximera.'
    },
    {
      rubrik: '4. Intressentmodellen',
      text:
        'De föregående modellerna betraktar företag som **slutna system** utan kopplingar till omgivningen. Kritiken ' +
        'mot det ledde till det **öppna systemsynsättet**, som intressentmodellen bygger på.\n\n' +
        'Utgångspunkten är att företag strävar efter ett stabilt förhållande till sin omgivning, en **jämvikt**. ' +
        'Varje företag har intressenter som det står i ömsesidigt beroendeförhållande till. Mellan företaget och ' +
        'intressenterna krävs en balans mellan de **bidrag** intressenterna lämnar och de **belöningar** företaget ' +
        'ger tillbaka.\n\n' +
        'Exempel på bidrag och belöningar:\n\n' +
        '- Ägare: kapital ⇄ utdelning och avkastning\n' +
        '- Företagsledning: arbete ⇄ lön, status, prestige, makt\n' +
        '- Medarbetare: arbete ⇄ lön, trygghet, personlig utveckling, medbestämmande\n' +
        '- Långivare: kapital ⇄ räntor, amorteringar, välskötta företag\n' +
        '- Leverantörer: varor, tjänster, kvalitet, service ⇄ betalningar\n' +
        '- Kunder: betalningar ⇄ varor, tjänster, kvalitet, service\n' +
        '- Stat och kommun: infrastruktur, utbildning, service ⇄ skatter, avgifter, arbetstillfällen\n' +
        '- Opinionsgrupper: acceptans och legitimitet ⇄ miljövänlighet och socialt ansvar\n\n' +
        'Intressenterna kräver belöningar som **överstiger** de bidrag de lämnar – det är en förutsättning för att ' +
        'de ska vilja tillhöra intressentgruppen.\n\n' +
        'Företagets mål blir att tillgodose intressenternas krav, alltså en **kompromiss** mellan dem. Kraven kan ' +
        'stå i konflikt och sammantaget vara så stora att de inte går att tillgodose fullt ut. En central ' +
        'ledningsuppgift blir då att kompromissa för att säkra fortsatt drift och utveckling.\n\n' +
        'Hur hanteras att vissa krav inte kan uppfyllas på kort sikt? Genom att företaget förhåller sig ' +
        '**"seriekopplat"** till kraven: vid en tidpunkt tillgodoses en grupps krav, vid en annan nästa grupps. ' +
        'Samtliga intressenters krav tillgodoses, men vid olika tillfällen. På längre sikt är strävan att i större ' +
        'utsträckning kunna tillgodose kraven – att ersätta det kortsiktiga **nollsummespelet** med ett långsiktigt ' +
        '**plussummespel**.'
    },
    {
      rubrik: '5. Kassaflödesbaserade modeller',
      text:
        'Dessa bygger på ett kapitalmarknadssynsätt med **investerarperspektiv**. Målet är att maximera nuvärdet av ' +
        'framtida nettokassaflöden (inbetalningar minus utbetalningar). Företagsledningen inriktas då på att ' +
        'maximera aktieägarnas förmögenhet genom att maximera aktiernas marknadsvärde.\n\n' +
        'Synsättet har mycket starkt stöd och är troligen **det mest accepterade företagsmålet** inom ' +
        'företagsekonomin. Det ligger till grund för mycket av beslutsfattande, produktkalkylering och ' +
        'investeringskalkylering.\n\n' +
        'Målet ska dock inte tolkas bokstavligt ur ett praktiskt perspektiv. Det är i praktiken mycket svårt, för ' +
        'att inte säga omöjligt, att maximera nuvärdet av framtida kassaflöden – företag arbetar med flera mål och ' +
        'gör avvägningar. Invändningarna mot vinstmaximeringsmodellen är i princip giltiga även här.\n\n' +
        'Två skäl att beräkna nuvärden: en krona idag är värd mer än en krona i morgon eftersom den kan placeras och ' +
        'ge avkastning, och en riskfri krona är värd mer än en riskfylld. För beräkningen krävs en **kalkylränta**, ' +
        'vars nivå bestäms av alternativkostnaden för kapital.\n\n' +
        'I praktiken anger företag sällan mål i dessa termer, utan snarare som räntabilitets- eller avkastningsmål.'
    },
    {
      rubrik: 'Symboliska mål och privata mål',
      text:
        'Modellerna ovan är rationella i den meningen att företag antas arbeta med formella och uttalade mål. Den ' +
        'rationaliteten kan ifrågasättas.\n\n' +
        'Studier visar att **individer och grupper ofta har andra mål än företaget som helhet**. Med tanke på hur ' +
        'människan fungerar är det närmast osannolikt att det inte finns "privata" mål i företag. De kan till och ' +
        'med strida mot företagets uttalade mål.\n\n' +
        'Företag arbetar dessutom med **symboliska mål**. De kan syfta till att skapa en bild man vill att ' +
        'omgivningen ska ha: ett företag som förorenar miljön kan kommunicera högt satta miljömål och därigenom ' +
        'söka **legitimitet**. Andra symboliska mål uttrycker strävanden som i praktiken inte gäller, som "det är ' +
        'företagets målsättning att säkra de anställdas arbeten". Sådana kan användas för att avleda uppmärksamhet ' +
        'eller dölja verkliga planer.\n\n' +
        'Alla symboliska mål är dock inte negativa. SAS budskap om att vara affärsresenärens flygbolag förmedlar ' +
        'värderingar och normer till kunder och anställda.'
    },
    {
      rubrik: 'Kursbokens egen ståndpunkt',
      text:
        'Det råder ingen tvekan om att **lönsamhetsmålet** är mycket betydelsefullt. Det är det högst rankade ' +
        'företagsmålet i praktiken och det mål kring vilket det råder störst enighet bland intressenterna. Ett ' +
        'företags verksamhet är på sikt avhängig en viss lönsamhet.\n\n' +
        'Två preciseringar är viktiga:\n\n' +
        '- Boken menar lönsamhet **på lång sikt**. På kort sikt kan man vidta – eller avstå från – handlingar som ' +
        'tillfälligt ökar lönsamheten men skadar den långsiktigt.\n' +
        '- Lönsamhet är **inte det enda** ekonomiska målet. Andra mål utgör ofta delmål eller restriktioner: ' +
        'likviditet, soliditet, kapitalbindning eller icke-finansiella mål.\n\n' +
        'Hur är det då med offentlig verksamhet som inte har lönsamhetsmål? Frenckner menar att skillnaderna mot ' +
        'affärsdrivande företag inte ska överdrivas. Ekonomiska principer bör gälla även där: mer resurser än vad ' +
        'som krävs ska inte förbrukas för att uppnå en viss effekt eller kvalitet. Uttrycket **"värde för pengarna"** ' +
        'markerar att resurser ska utnyttjas så att de skapar så stor nytta som möjligt.'
    }
  ],
  nyckelbegrepp: [
    'Vinstmaximeringsmodellen: neoklassisk, svart låda, vinst enda målet, alternativkostnad',
    'Företagsledarmodeller: ägande skilt från drift; Baumol = försäljningsmaximering; Williamson = egen nytta',
    'Satisfieringsmodellen: Simon, tillfredsställande vinst, anspråksnivå, begränsad rationalitet',
    'Intressentmodellen: öppet system, jämvikt, bidrag ⇄ belöningar, seriekoppling, plussummespel',
    'Kassaflödesmodeller: nuvärde av framtida nettokassaflöden, aktieägarperspektiv, kalkylränta',
    'Symboliska mål: legitimitetssökande eller avledande',
    'Kursbokens ståndpunkt: långsiktig lönsamhet som huvudmål, ej enda mål'
  ],
  tentakoppling:
    '"Vad är företagets mål enligt den neoklassiska teorin?" kom ordagrant på omtentan HT24, och kritiken mot ' +
    'vinstmaximering på ordinarie. Kunna skilja de fem modellerna åt är kapitlets hela poäng.'
},

/* ====================== KAPITEL 4 ====================== */
{
  id: 'str-k4',
  nr: 4,
  titel: 'Grundbegreppen: effektivitet, produktivitet, resultat, lönsamhet',
  ingress: 'Kursens mest förväxlade begrepp, sorterade en gång för alla – inklusive inre kontra yttre effektivitet och de tre begreppsparen.',
  lastid: 11,
  amnen: ['str-effektivitet'],
  avsnitt: [
    {
      rubrik: 'Effektivitet = grad av måluppfyllelse',
      text:
        'Effektivitet definieras som **grad av måluppfyllelse**. Det är ett uttryck för i vilken utsträckning ' +
        'företaget uppnår ett mål.\n\n' +
        'Effektiviteten bestäms som förhållandet mellan värdet av vad som åstadkommits (utflödet) och värdet av de ' +
        'resurser som satts in (inflödet), i förhållande till ett mål.\n\n' +
        '`Effektivitet = Värdet av utflöde / Värdet av inflöde`\n\n' +
        'Effektivitet mäts ofta i finansiella termer eftersom företags mål ofta är finansiella. Resultat i ' +
        'förhållande till satsat kapital är ett vanligt exempel. Men för sjukvård och utbildning, som inte i någon ' +
        'större utsträckning har finansiella mål, behöver bestämningen ofta göras i icke-finansiella termer.'
    },
    {
      rubrik: 'Inre och yttre effektivitet',
      text:
        'Detta är kapitlets viktigaste distinktion och en säker tentafråga.\n\n' +
        '**Inre effektivitet = "att göra saker rätt".** Handlar om företagets hushållande med resurser ur ett ' +
        '**internt** perspektiv. Förknippas med hög produktivitet, kostnadseffektivitet, "ordning och reda" samt ' +
        'välutvecklade system och rutiner.\n\n' +
        '**Yttre effektivitet = "att göra rätt saker".** Rör företagets relationer till sin **omvärld**. Här ' +
        'förekommer begrepp som affärsmässighet, tillväxt, kvalitet och service. Under senare år definieras den allt ' +
        'oftare som **kundvärde** – hur kunder värderar företagets varor och tjänster.\n\n' +
        'Tillsammans utgör de den **totala effektiviteten**. Företag behöver på lång sikt ha höga värden på båda ' +
        'komponenterna för att överleva.\n\n' +
        '> **Tentateknik.** Sortera varje svarsalternativ i internt (kostnader, produktivitet, rutiner) eller externt ' +
        '(kunder, marknad, varumärke, distribution). Frågan "kännetecken på låg yttre effektivitet" besvaras av ' +
        'alternativet som är starkt internt men svagt externt: *"Företaget har hög produktivitet men förlorar ' +
        'marknadsandelar."* Man producerar effektivt något marknaden efterfrågar allt mindre.'
    },
    {
      rubrik: 'Svårigheterna med effektivitetsbegreppet',
      text:
        'Begreppet är mer problematiskt än det ser ut. Fyra svårigheter:\n\n' +
        '- **Det är inte objektivt.** Eftersom effektivitet bestäms i förhållande till ett mål beror graden på ' +
        'målets nivå. Effektiviteten kan helt enkelt höjas genom att sänka målnivån.\n' +
        '- **Orsaken är svår att fastställa.** Stigande effektivitet kan bero på konjunkturuppgång, lägre ' +
        'marknadsräntor eller ny teknik – inte bara på företagets egna insatser.\n' +
        '- **Mål kan vara motstridiga.** Lönsamhet kan stå i strid med god arbetsmiljö och höga löner.\n' +
        '- **Tidshorisonten spelar roll.** På kort sikt kan man "pressa" fram hög effektivitet genom att utnyttja ' +
        'befintliga resurser maximalt – men det hotar den framtida effektiviteten. Det måste finnas lediga resurser ' +
        'även på kort sikt för att säkerställa framtida utveckling och förnyelse. Paradoxen är att företag med lediga ' +
        'resurser per definition inte är så effektiva de skulle kunna vara på kort sikt, men är de mest effektiva på ' +
        'lång sikt.\n\n' +
        'Svårigheterna har fått många att helt överge tanken på att kunna fastställa effektivitet. Företags **förmåga ' +
        'att överleva** har därför föreslagits som det slutliga kriteriet: överlever ett företag anses det vara effektivt.'
    },
    {
      rubrik: 'Produktivitet',
      text:
        'Produktivitet avser **samma förhållande** som effektivitet, men uttryckt i **fysiska termer**, alltså i ' +
        'kvantiteter.\n\n' +
        '`Produktivitet = Kvantitet utflöde / Kvantitet inflöde`\n\n' +
        'Exempel: antalet maskinbearbetade produkter per förbrukad maskintimme, antalet debiterade konsulttimmar per ' +
        'arbetad timme, antalet betjänade kunder per dag, antalet producerade enheter per kilo material.\n\n' +
        'Samma svårigheter gäller som för effektivitet – subjektiv måttstock, oklar orsak, motstridiga mått, ' +
        'tidsaspekt – plus en till som är värd att komma ihåg:\n\n' +
        '> **Produktiviteten kan öka utan att företaget lyckats bättre.** Minskar tiden man lägger på att betjäna ' +
        'kunder stiger produktiviteten – men kunderna kan uppfatta det som sämre service. Lägger en ' +
        'tillverkningsavdelning mindre tid på att bearbeta produkter ökar produktiviteten, men kunderna kan bli ' +
        'negativt inställda om kvaliteten sjunker.'
    },
    {
      rubrik: 'De tre begreppsparen',
      text:
        'Företagets **resultat** är skillnaden mellan intäkter och kostnader för en period. För att förstå vad ' +
        'intäkter och kostnader betyder behövs tre begreppspar som ofta blandas ihop.\n\n' +
        '**1. Inbetalning och utbetalning** är knutna till de tillfällen då **likvida medel** förs över, alltså när ' +
        'betalningstransaktioner äger rum.\n\n' +
        '**2. Inkomst och utgift** är knutna till **affärstransaktioner** med externa parter. Enligt ' +
        'redovisningspraxis uppstår inkomsten det datum fakturan är daterad, och utgiften när fakturan anländer ' +
        '(eller det datum den är daterad).\n\n' +
        '**3. Intäkt och kostnad** är **periodiserade** inkomster respektive utgifter. Intäkterna utgörs av värdet ' +
        'av de prestationer som utförts under perioden, kostnaderna av värdet på resursförbrukningen för att ' +
        'åstadkomma dem.\n\n' +
        'Tidpunkterna sammanfaller sällan. Vid handel mellan företag är kreditförsäljning vanligare än kontant ' +
        'betalning – köparen har ofta 30 dagar på sig – vilket innebär att utbetalningen sker i efterskott. ' +
        'Förskottsbetalningar förekommer också, till exempel för lokalhyra, leasingavgifter och abonnemang.'
    },
    {
      rubrik: 'Bokföringsmässiga och kalkylmässiga grunder',
      text:
        'Intäkter och kostnader kan bestämmas på två sätt, och skillnaden är en klassisk räkneuppgift.\n\n' +
        '**Bokföringsmässiga grunder** används i den externa redovisningen och regleras av lagar och ' +
        'rekommendationer. Inkomster och utgifter förs till de perioder under vilka prestationer utförs och resurser ' +
        'förbrukas – det kallas **periodisering**. En matchning ska ske: periodens intäkt ställs mot kostnaden för de ' +
        'resurser som förbrukats för att producera just det som sålts.\n\n' +
        'Ett tillverkande företag som bara producerat mot lager har därför varken intäkter eller kostnader för ' +
        'perioden. Produkterna utgör en **tillgång** i balansräkningen tills de säljs.\n\n' +
        '**Kalkylmässiga grunder** används i ekonomistyrningen. Här finns inga givna innebörder. Intäkten bestäms ' +
        'utifrån vad som **presterats**, oberoende av om försäljning ägt rum. Kostnaden är värdet av den ' +
        'resursförbrukning som krävs för att producera. Istället för historiskt anskaffningsvärde kan man använda ' +
        'återanskaffningsvärde eller alternativkostnad.\n\n' +
        '**Räkneexempel.** Bordlagt tillverkade 100 bord under halvåret. 75 såldes för 10 000 kr styck. ' +
        'Tillverkningskostnaden är 6 000 kr per bord.\n\n' +
        '- *Bokföringsmässigt resultat:* 75 × 10 000 − 75 × 6 000 = **300 000 kr**. De 25 osålda borden är en ' +
        'tillgång värd 150 000 kr.\n' +
        '- *Kalkylmässigt, variant 1* (periodens försäljning mot periodens tillverkning): 750 000 − 600 000 = ' +
        '**150 000 kr**\n' +
        '- *Kalkylmässigt, variant 2* (förväntad försäljning mot periodens tillverkning): 1 000 000 − 600 000 = ' +
        '**400 000 kr**\n\n' +
        'Skillnaderna kan hänföras till tre faktorer: **urval, värdering och periodisering**.'
    },
    {
      rubrik: 'Resultat kontra lönsamhet',
      text:
        'Resultatbegreppet har begränsningar. Ett företag med stor vinst behöver inte vara mer lönsamt än ett med ' +
        'lägre vinst – det kan till och med vara mindre lönsamt.\n\n' +
        'Skillnaden: **resultatet är utfallet uttryckt i absoluta tal**, medan **lönsamheten är ett kvotmått** där ' +
        'resultatet sätts i förhållande till en storhet, vanligen det kapital som används i företaget.\n\n' +
        '`Lönsamhet = Resultat / Kapital`\n\n' +
        'Därför är lönsamhet ett bättre mått på hur verksamheten bedrivs: det säger något om hur väl den bedrivs i ' +
        'förhållande till det kapital som binds för att skapa resultatet.\n\n' +
        '**Räntabilitet** (avkastning) är det vanligaste lönsamhetsmåttet:\n\n' +
        '- Räntabilitet på totalt kapital = (Resultat efter finansiella poster + Räntekostnader) / Totalt kapital\n' +
        '- Räntabilitet på eget kapital före skatt = Resultat efter finansiella poster / Eget kapital\n\n' +
        'Exempel: ett företag med tillgångar 800 000 kr, eget kapital 400 000 kr, resultat efter finansiella poster ' +
        '100 000 kr och räntekostnader 20 000 kr får räntabilitet på totalt kapital = (100 000 + 20 000) / 800 000 = ' +
        '**15 %**, och på eget kapital = 100 000 / 400 000 = **25 %**.\n\n' +
        'För enheter inom ett företag används ofta **räntabilitet på sysselsatt kapital**, som ställer resultatet i ' +
        'förhållande till det kapital som kräver avkastning. En fördel är att finansieringen då styrs mot räntefria ' +
        'krediter.'
    }
  ],
  nyckelbegrepp: [
    'Effektivitet = grad av måluppfyllelse = värdet av utflöde / värdet av inflöde',
    'Inre effektivitet = "göra saker rätt" (internt): produktivitet, kostnader, rutiner',
    'Yttre effektivitet = "göra rätt saker" (externt): kundvärde, kvalitet, tillväxt, service',
    'Produktivitet = kvantitet utflöde / kvantitet inflöde (fysiska termer)',
    'Inbetalning/utbetalning = likvida medel; inkomst/utgift = fakturadatum; intäkt/kostnad = periodiserat',
    'Bokföringsmässigt resultat = matchning mot det sålda; kalkylmässigt = mot det presterade',
    'Lönsamhet = Resultat / Kapital; räntabilitet på totalt respektive eget kapital'
  ],
  tentakoppling:
    'Inre kontra yttre effektivitet kom på BÅDA HT24-tentorna. Om du bara hinner lära dig en sak ur detta ' +
    'kapitel: lär dig sortera alternativ i internt eller externt.'
},

/* ====================== KAPITEL 5 ====================== */
{
  id: 'str-k5',
  nr: 5,
  titel: 'Organisation, ansvar och de mjuka styrmedlen',
  ingress: 'Vertikalt mot horisontellt perspektiv, de fyra ansvarstyperna, belöningssystem, kultur, lärande – och varför teori och praktik glider isär.',
  lastid: 12,
  amnen: ['str-organisation', 'str-mjuk'],
  avsnitt: [
    {
      rubrik: 'Organisationsformer',
      text:
        'Man talar bland annat om **funktions-, divisions-, matris- och linjeorganisation**.\n\n' +
        '**Funktionsorganisation** är strukturerad efter arbetsuppgifternas art: utveckling, inköp, tillverkning, ' +
        'försäljning, administration. Specialistkompetens samlas i varje funktion.\n\n' +
        '**Divisionsorganisation** är indelad efter produkter, tjänster eller geografiska marknader. Stora företag ' +
        'har ofta tydliga inslag av detta, eftersom det **underlättar när man vill lansera helt nya produktområden ' +
        'eller ge sig in på nya geografiska marknader**. Varje division kan ges eget lönsamhets- eller ' +
        'resultatansvar och sin egen strategi.\n\n' +
        '**Matrisorganisation** kombinerar två dimensioner, till exempel processer och funktioner.\n\n' +
        'Gemensamt för de flesta former är att företaget betraktas som en **hierarki** med över- och underordnade ' +
        'enheter på olika nivåer. Högst upp ägarna, längst ned enskilda anställda.'
    },
    {
      rubrik: 'Det vertikala perspektivet: företaget som hierarki',
      text:
        'Ur ett styrperspektiv är företaget en hierarki där överordnade enheter styr underordnade. Ekonomistyrningen ' +
        'blir då ett medel för överordnade enheter att kontrollera och instruera underordnade, vilket möjliggörs av ' +
        'de formella befogenheter som följer med hierarkisk organisering.\n\n' +
        'Utgångspunkten är **överordnade ägarkrav** som i en vertikal styrprocess översätts till krav på styrelse och ' +
        'företagsledning, vidare via självständiga verksamhetsdelar ned till funktionella enheter och individer.\n\n' +
        'Exempel: ett övergripande krav på räntabilitet på eget kapital bryts ned till lönsamhets- och ' +
        'resultatansvar för bolag och divisioner, och till kostnadsansvar på lägre nivåer. Principen att kapital, ' +
        'intäkter och kostnader knyts till ansvariga är en grundbult.'
    },
    {
      rubrik: 'Det horisontella perspektivet: företaget som värdekedja',
      text:
        'Företagsmiljön har förändrats: snabbare teknisk utveckling, hårdare konkurrens, kortare produktlivscykler, ' +
        'nya kritiska framgångsfaktorer, förändrade efterfrågemönster, avreglering, privatisering, hårdare miljökrav ' +
        'och krav på etiskt agerande.\n\n' +
        'Av företagens anpassningar är **kundorientering** troligen den mest framträdande. Många hävdar att det ' +
        'traditionella vertikala perspektivet inte lämpar sig för kundorienterade företag, av tre skäl:\n\n' +
        '- Kunder inkluderas inte explicit i styrningen, annat än möjligen som intäkter\n' +
        '- Kundernas behov och preferenser har svårt att tränga in i enheter som inte står i direkt marknadskontakt\n' +
        '- Det finns risk för en fackorienterad specialistkultur kring enskilda funktioner, som resulterar i ' +
        '"revirbeteende" och bristande intresse för andras arbete\n\n' +
        'Därför förespråkas ett **värdekedjeperspektiv**. Värde tolkas här ur ett kundperspektiv. Företaget betraktas ' +
        'som en serie **processer** som består av **aktiviteter** vilka syftar till att skapa kundvärde. En viktig ' +
        'uppgift blir att fokusera på **värdeskapande** aktiviteter och minimera **icke-värdeskapande**.\n\n' +
        'Ett sätt att säkerställa att hela kedjan blir resurssnål är att **varje länk ser nästa länk som sin kund**. ' +
        'Dimensionerna överordnad och underordnad minskar i betydelse och ersätts av förhållandet mellan mottagande ' +
        'och avlämnande enhet.'
    },
    {
      rubrik: 'Går perspektiven att kombinera?',
      text:
        'Teoretiskt föreligger ett motsatsförhållande, men svaret är **ja**.\n\n' +
        'I det vertikala perspektivet betonas enheternas **självständighet**: om varje enhet håller vad den lovat ' +
        'fungerar helheten. Problem uppstår när förutsättningarna ändras – delarna saknar helhetsperspektiv och ' +
        'varje enhet är sig själv närmast.\n\n' +
        'Det horisontella perspektivet betonar **beroendet och sambandet** mellan enheter istället för deras ' +
        'självständighet, och syftar till ökad horisontell kommunikation och samverkan. Ett problem kan dock vara att ' +
        'ansvaren inte blir lika klara, och att ansvar och befogenheter inte stämmer överens. Utkrävs ansvar för ' +
        'något som inte kan påverkas minskar ekonomistyrningens effekt.\n\n' +
        'Eftersom få helt hierarkilösa företag existerar bör båda dimensionerna beaktas. Det kan göras genom ' +
        '**matrisorganisation**, tvärfunktionella grupper eller samordnade avdelningar.'
    },
    {
      rubrik: 'De fyra slagen av ekonomiskt ansvar',
      text:
        'Ansvarsfördelning är ett centralt styrmedel. Två principer gäller: **påverkbarhetsprincipen** (man ska ' +
        'kunna påverka det man ansvarar för) och **befogenhetsprincipen** (man ska ha befogenheter att göra det).\n\n' +
        '**1. Lönsamhetsansvar** (även räntabilitetsansvar eller investeringsansvar). Ansvar för skillnaden mellan ' +
        'intäkter och kostnader **i förhållande till det kapital som tagits i anspråk**. Mäts med kvotmått som ' +
        'räntabilitet på sysselsatt kapital, eller residualmått där resultatet belastas med kalkylmässig ränta.\n\n' +
        '**2. Resultatansvar.** För enheter med både intäkter och kostnader men utan befogenheter över kapitalposter. ' +
        'Mäts i absoluta resultattermer, marginaler eller förädlingsgrad.\n\n' +
        'Skilj på **rent** och **artificiellt** resultatansvar. Rent resultatansvar innebär att intäkterna kommer från ' +
        'externa kunder och att enheten har full beslutsrätt. Artificiellt gäller enheter som saknar externa kunder ' +
        'eller full beslutsrätt, till exempel serviceenheter som IT-avdelningar.\n\n' +
        '**3. Intäkts- eller bidragsansvar.** Rena intäktsansvar är svåra att finna i praktiken, utom möjligen för ' +
        'individuella säljare. Försäljningsbolag och marknadsavdelningar arbetar oftare med **täckningsbidragsansvar**, ' +
        'där enhetens egna kostnader och tillverknings- eller inköpskostnaden dras från intäkten.\n\n' +
        '**4. Kostnadsansvar.** Vanligast på den lägsta organisatoriska nivån. Utvärderingen sker mot kostnadsmål. ' +
        'Typiska enheter: administrativa avdelningar, forskning och utveckling, tillverkande enheter. Tillverkande ' +
        'enheter har ofta **standardkostnadsansvar**, där förkalkyler fastställer standardkostnader och avvikelser ' +
        'analyseras.\n\n' +
        '> **Risk med resultatansvar.** Om styrningen ensidigt inriktas på resultat kan det leda till ökad ' +
        'kapitalbindning, vilket ger negativa effekter på räntabiliteten. En enhet kan förbättra sitt resultat genom ' +
        'stora lager eller generösa kundkrediter. Motmedel: komplettera med ansvar för vissa kapitalposter, eller ' +
        'använd kapitalomsättningsmått som lageromsättningshastighet.'
    },
    {
      rubrik: 'Belöningssystem',
      text:
        'Det vanligaste syftet är att motivera anställda att prestera utöver det vanliga. Andra syften förekommer, ' +
        'som att få anställda att stanna kvar.\n\n' +
        'Belöningar kan vara **finansiella** (bonuslön) eller **icke-finansiella** (ledighet, befordran, utvidgat ' +
        'ansvar och utvidgade befogenheter). De kan riktas mot individer eller grupper.\n\n' +
        'Avvägningen: **individuella** belöningar kräver att individuella prestationer går att urskilja och att det ' +
        'inte uppstår uppfattningar om att vissa favoriseras. När de förutsättningarna saknas är **grupprelaterade** ' +
        'belöningar mer ändamålsenliga.\n\n' +
        'Men gruppbelöningar har sitt eget problem: **fripassagerare** – anställda som inte bidrar alls eller mycket ' +
        'lite men ändå erhåller belöning. Det kan skapa missnöje och dålig stämning, och kanske till och med motverka ' +
        'syftet med belöningssystemet.'
    },
    {
      rubrik: 'Företagskultur',
      text:
        'Med en organisations kultur menas *dess inre liv, det vill säga sättet att leva, tänka, handla och vara*.\n\n' +
        'Kulturen påverkar hur personer fattar beslut, kommunicerar, bedömer andras ord och handlingar samt vad som ' +
        'anses bra eller dåligt, önskvärt eller icke-önskvärt.\n\n' +
        'Kulturen består av bland annat: handlingar och beteenden, uttryckta känslor, rutiner och ceremonier, ' +
        'historier och myter, språk och jargong, objekt och ting, rekryterings- och belöningssystem, fysisk struktur ' +
        'och arkitektur, uttalade värderingar samt uttalade normer.\n\n' +
        'Intresset för företagskultur förklaras av näringslivets behov av ändamålsenliga medel för att planera, ' +
        'samordna och motivera, av decentraliseringssträvanden och flexibilitetsbehov, av missnöje med det ' +
        'traditionella planeringsinriktade ledningssynsättet, samt av intresset för japansk företagsledning.'
    },
    {
      rubrik: 'Lärande organisation',
      text:
        '**Lärande** definieras som bestående förändringar i beteendet hos en individ eller en grupp, på grundval av ' +
        'gjorda erfarenheter eller som resultat av samspel med omgivningen. Konkret innebär det att uppfattningar om ' +
        'hur arbetet ska utföras förändras till det bättre: högre kvalitet, kortare tid, nya arbetssätt.\n\n' +
        'Det är **först individer som lär sig**. Ett **organisatoriskt** lärande uppstår när lärandet sprids till ' +
        'andra och nya kunskaper omsätts i praktiken. Organisatoriskt lärande kan därför beskrivas som en ständigt ' +
        'pågående förändrings-, förnyelse- och förbättringsprocess.\n\n' +
        'Två lärprocesser skiljs åt:\n\n' +
        '- **Enkelkretslärande** (single-loop): när något oönskat inträffar löser man det utan att gå till botten med ' +
        'orsaken\n' +
        '- **Dubbelkretslärande** (double-loop): man löser både problemet och ifrågasätter själva orsaken – man ' +
        '**kurerar både symptomen och sjukdomen**\n\n' +
        'Förutsättningen är en företagskultur där det är accepterat att experimentera, ta initiativ och föreslå nya ' +
        'lösningar, samt en människosyn där medarbetaren ses som något annat än en produktionsfaktor.'
    },
    {
      rubrik: 'Medarbetarskap (empowerment)',
      text:
        'Medarbetarskap handlar om **demokratisering av arbetslivet**, och om mer än att anställda ska kunna påverka ' +
        'sitt eget arbete.\n\n' +
        'För att kunna karakterisera ett företag som demokratiskt organiserat krävs enligt förespråkarna att ' +
        'anställda har befogenheter och inflytande i fråga om arbetsplatsens utformning, arbetets utförande, ' +
        'investeringar, tillsättning av chefer och anställningsförhållanden.\n\n' +
        'Ett medarbetarskapsinriktat företag utmärks av att anställda känner att de utför ett meningsfullt arbete, ' +
        'att deras kompetens tas tillvara och att företaget litar på dem.\n\n' +
        'Förutsättningar: tydlig organisation med klara roller och ansvarsfördelning, delegerat ansvar samt ' +
        'möjligheter till utveckling och lärande. Hinder: framför allt **motstånd från chefer** som inte har ' +
        'förtroende för sina medarbetare och inte är villiga att acceptera förlusten av kontroll.\n\n' +
        'Ett andra argument, vid sidan av demokratiseringen: de organisatoriska krav som ställs när företag kund- och ' +
        'marknadsorienterar sig och satsar på kvalitet och service stämmer inte med kraven i en traditionell ' +
        'hierarkisk och byråkratisk struktur.'
    },
    {
      rubrik: 'Gapet mellan teori och praktik',
      text:
        'I början av 1980-talet uppmärksammades det så kallade **gapet mellan teori och praktik**: det finns en stor ' +
        'skillnad mellan ekonomistyrning som den framställs i läroböcker och som den bedrivs i praktiken.\n\n' +
        'Studier har visat att metoder som enligt teorin bör användas ofta inte används, att vissa metoder bara ' +
        'förekommer i liten utsträckning, att företag föredrar enkla varianter framför mer sofistikerade, och att ' +
        'majoriteten inte är särskilt benägen att implementera nya metoder.\n\n' +
        'Fyra förklaringar brukar anges:\n\n' +
        '1. Det finns en **tidseftersläpning** mellan teoriutveckling och implementering\n' +
        '2. Praktiker har **för lite kunskap** om teorin\n' +
        '3. Teorin **fångar inte in den verklighet** praktiker upplever\n' +
        '4. Teorin beaktar inte **kostnads- och nyttokriteriet** i tillräcklig utsträckning\n\n' +
        'De två första avfärdas i kursboken: metoderna har funnits tillgängliga länge och skulle ha börjat användas ' +
        'om de tilltalade praktiker, och många praktiker har utbildning i ämnet.\n\n' +
        'Den **tredje** har starkt stöd. Mycket forskning har bedrivits utan utgångspunkt i verkliga situationer – i ' +
        'efterhand kallat "fåtöljforskning och -utveckling".\n\n' +
        'Den **fjärde tycks ha störst stöd**. Metoder är olika kostsamma (konsultarvoden, kalkylsystem, beräkningar, ' +
        'utbildning, informationshantering) och ger olika nytta (kvalitet på beslutsunderlag, styreffekt, ' +
        'kostnadskontroll, tidsbesparing). I praktiken tillämpas kriteriet; i teorin bortser man ofta från det.\n\n' +
        '**Slutsatsen** är viktig och kan användas i essäsvar: litteraturens metoder utgör inte en samling metoder ' +
        'som *ska* användas, utan **tillgängliga metoder att välja mellan**. Därför är kunskap om metodernas ' +
        'egenskaper, antaganden, styrkor och svagheter avgörande.'
    }
  ],
  nyckelbegrepp: [
    'Funktionsorganisation: indelad efter funktioner (marknad, produktion, ekonomi)',
    'Divisionsorganisation: indelad efter produkter, tjänster eller geografi',
    'Vertikalt perspektiv: hierarki, ägarkrav bryts ned uppifrån och ned',
    'Horisontellt perspektiv: värdekedja, processer och aktiviteter, kundvärde',
    'Fyra ansvarstyper: lönsamhets-, resultat-, intäkts/bidrags- och kostnadsansvar',
    'Rent kontra artificiellt resultatansvar',
    'Fripassagerare: problem med grupprelaterade belöningar',
    'Enkelkretslärande vs dubbelkretslärande (symptom vs sjukdom)',
    'Medarbetarskap: befogenheter och inflytande, demokratisering',
    'Gapet teori–praktik: kostnads- och nyttokriteriet har störst förklaringskraft'
  ],
  tentakoppling:
    'Funktionsorganisation kom på omtentan och divisionsorganisation på ordinarie HT24. De fyra ansvarstyperna ' +
    'och dubbelkretslärande är sannolika framtida frågor.'
}

);
