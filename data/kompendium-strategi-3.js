/* =========================================================================
   Kompendium – Strategi och ekonomistyrning, kapitel 11–12

   Dessa två kapitel bygger på FÖRELÄSNING 1, inte på kursboken. Det spelar
   roll: tentan säger uttryckligen att frågorna baseras på innehållet i
   litteraturen OCH föreläsningarna, och föreläsningens första halva har
   inget direkt motsvarande kapitel i Ax, Johansson och Kullvén.

   Kapitlen ligger sist i numreringen men hör innehållsmässigt ihop med
   kapitel 9 om IT, AI och strategi. Läs dem gärna i följd.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};
window.SYSB23.kompendium = window.SYSB23.kompendium || {};

window.SYSB23.kompendium.strategi.kapitel.push(

/* ====================== KAPITEL 11 ====================== */
{
  id: 'str-k11',
  nr: 11,
  titel: 'Från räknemaskin till strategisk resurs',
  ingress: 'Varför kursen börjar med IT-historia: den förklarar hur produktivitetsparadoxen uppstod, ' +
           'vad 90-talets managementvågor egentligen försökte lösa, och varför strategisk alignment blev svaret.',
  lastid: 12,
  amnen: ['str-enterprise'],
  avsnitt: [
    {
      rubrik: 'En sak i taget',
      text:
        'De första datorerna var **avancerade räknemaskiner med mycket specifika syften**. ENIAC (1946) ' +
        'räknade ballistiska banor, Apollo Guidance Computer (1966) navigerade en rymdfarkost. De löste ' +
        'ett problem var.\n\n' +
        'När företag började använda datorer följde de samma mönster. Stora företag, banker och statliga ' +
        'myndigheter utvecklade **egna applikationer, en process i taget**: lönehantering, redovisning, ' +
        'lagerhantering, batchbaserad dataanalys, processkontroll. Varje system byggdes för sig, av den ' +
        'avdelning som behövde det.\n\n' +
        'Det fungerade så länge systemen var få. **Moores lag** ändrade förutsättningarna: när kapaciteten ' +
        'fördubblades regelbundet blev det ekonomiskt försvarbart att datorisera fler och fler processer, ' +
        'i fler och fler företag. Från stordatorer på 1960-talet, via minidatorer på 70-talet, till ' +
        'persondatorn på 80-talet.'
    },
    {
      rubrik: 'IT-kaoset: enterprise application spaghetti',
      text:
        'Under 80- och 90-talet satsade **alla** företag stort på IT — ofta ostrukturerat och ogenomtänkt. ' +
        'Resultatet blev det som kallas **enterprise application spaghetti**: hundratals system som var och ' +
        'ett löste sitt problem, kopplade till varandra med punkt-till-punkt-integrationer som ingen hade ' +
        'ritat upp i förväg.\n\n' +
        'Tre saker förklarar varför det gick så:\n\n' +
        '- Företagen leddes av en generation som **inte var digital**\n' +
        '- **IT sågs inte som en strategisk aktivitet** — det fanns ingen koppling mellan IT och kärnaffären\n' +
        '- IT låg i en **organisatorisk silo**, och IT-avdelningen betraktades närmast som en vaktmästare\n\n' +
        'Att IT-chefen inte satt i ledningsgruppen var alltså inte en tillfällighet utan en konsekvens av ' +
        'hur IT uppfattades.'
    },
    {
      rubrik: 'Produktivitetsparadoxen',
      text:
        'Trots enorma investeringar syntes ingen ökning i produktivitetsstatistiken. Nationalekonomen ' +
        '**Robert Solow** formulerade det 1987 i en mening som har följt ämnet sedan dess:\n\n' +
        '> "You can see the computer age everywhere but in the productivity statistics."\n\n' +
        'Det är **produktivitetsparadoxen**. Förklaringen som ämnet landade i är att IT som läggs ovanpå ' +
        '**oförändrade processer** inte ger någon produktivitetsökning. Datoriserar man en dålig rutin får ' +
        'man en snabb dålig rutin.\n\n' +
        '**NIST formulerade 1989 samma problem från andra hållet**: Daniel Appleton beskrev *the dilemma of ' +
        'integration* — ju fler system som skulle prata med varandra, desto svårare blev det att få dem att ' +
        'göra det, och desto mer resurser gick åt till integration i stället för till verksamhetsnytta.\n\n' +
        'Samtidigt tog Japan över som världsledare inom högteknologi och elektronik. Det gav frågan en ' +
        'konkurrensdimension: det var inte bara en teoretisk paradox, det var något som höll på att ' +
        'kosta amerikansk industri dess försprång.'
    },
    {
      rubrik: '90-talets managementvågor',
      text:
        'Svaret blev en lång rad IT-drivna managementmetoder som alla, på olika sätt, handlade om att ' +
        '**ändra processerna i stället för att bara datorisera dem**:\n\n' +
        '- **Total Quality Management**\n' +
        '- **Kaizen, Lean manufacturing, Six Sigma**\n' +
        '- **Just-in-time production och Kanban**\n' +
        '- **Business process reengineering (BPR)**\n' +
        '- **ERP** – enterprise resource planning\n' +
        '- **CRM** – customer relationship management\n' +
        '- **Supply chain management**\n' +
        '- **Knowledge management**\n' +
        '- **Data warehousing**\n' +
        '- **Outsourcing**\n\n' +
        'Gemensamt för dem: de behandlar verksamheten som **processer** som kan mätas och förbättras, och ' +
        'de förutsätter att IT-systemen utformas efter processerna — inte tvärtom. Det är samma horisontella ' +
        'perspektiv som kapitel 5 beskriver.'
    },
    {
      rubrik: 'Clinger-Cohen Act 1996',
      text:
        'Den amerikanska **Information Technology Management Reform Act**, i dagligt tal **Clinger-Cohen ' +
        'Act**, reformerade IT-arbetet inom offentlig sektor 1996. Den fick långt större betydelse än så, ' +
        'eftersom den formaliserade fem saker som blivit standard i hela branschen:\n\n' +
        '1. **CIO-rollen legitimerades** som en strategisk ledningsfunktion — IT-chefen fick en plats vid bordet\n' +
        '2. **Enterprise Architecture (EA)** etablerades som en egen managementdisciplin\n' +
        '3. **IT governance**: IT började styras som en strategisk investering, med krav på uppföljning\n' +
        '4. **COTS** (commercial off-the-shelf) fick stort genomslag — köp färdigt i stället för att bygga eget\n' +
        '5. **Strategic alignment** blev ett centralt managementkoncept\n\n' +
        'Notera kopplingen framåt i din egen utbildning: verksamhetsarkitektur, som är en egen delkurs ' +
        'senare i SYSB23, har sin moderna form härifrån.'
    },
    {
      rubrik: 'Strategic Alignment Model',
      text:
        '**Henderson och Venkatraman (1993)** formulerade den modell som binder ihop alltihop. Fyra områden ' +
        'måste passa med varandra:\n\n' +
        '- **Affärsstrategi**\n' +
        '- **IT-strategi**\n' +
        '- **Organisationsinfrastruktur**\n' +
        '- **IT-infrastruktur**\n\n' +
        'Deras egen slutsats är värd att kunna, eftersom den är exakt samma argument som Barney gör om AI ' +
        'trettio år senare:\n\n' +
        '> Ingen enskild IT-applikation, hur avancerad den än är, kan i sig ge en uthållig ' +
        'konkurrensfördel. Fördelen ligger i organisationens **förmåga att fortlöpande utnyttja** ' +
        'IT-funktionaliteten.\n\n' +
        'Det kräver enligt författarna en grundläggande förändring i hur ledningen tänker om IT:s roll i ' +
        'organisatorisk förändring.'
    },
    {
      rubrik: 'Löste vi problemet? Nej.',
      text:
        'Trots alla metoder fortsätter spektakulära IT-misslyckanden att inträffa. Förklaringen ligger i ' +
        '**ökande komplexitet**: ju fler delar ett system har och ju fler kopplingar mellan dem, desto ' +
        'större är risken att något går fel.\n\n' +
        'Två nivåer att hålla isär:\n\n' +
        '**Makronivå — kumulativ komplexitet.** Varje ny IT-epok läggs *ovanpå* den förra i stället för att ' +
        'ersätta den. SaaS, mobilt och moln kom ovanpå de gamla systemen. Big data, maskininlärning och AI ' +
        'kom ovanpå det. Cybersäkerhet och integritetskrav ovanpå det. Nu agentisk AI. Varje lager kräver ' +
        'nya integrationer och en ny helhetssyn.\n\n' +
        '**Mikronivå — paradoxen upprepar sig.** Produktivitetsparadoxen är inte ett historiskt fenomen ' +
        'som inträffade en gång på 80-talet. Den tenderar att **upprepa sig inom varje nytt område som ' +
        'digitaliseras**. Först investerar man i tekniken, sedan upptäcker man att processerna måste ' +
        'ändras, och först då kommer effekten. Det är därför det heter *digital transformation* och ' +
        '*AI-transformation* i dag och inte bara *IT-investering*.'
    },
    {
      rubrik: 'Vad som driver på förändringen',
      text:
        'Fyra krafter driver kontinuerliga systemförbättringar — och de är svaret på frågan varför man ' +
        'aldrig blir klar:\n\n' +
        '- **Ökad konkurrens på globala marknader** — internet, snabbare produktcykler, distribution och logistik\n' +
        '- **Nya regleringar** — SOX, GDPR, CSRD, AI Act\n' +
        '- **Frivillig efterlevnad** — standarder, certifieringar, miljömärkning. Kan i praktiken vara krav ' +
        'vid upphandlingar\n' +
        '- **Accelererande teknikutveckling** — IoT, moln, SaaS, AI\n\n' +
        'Slutsatsen för dig som student: på framtidens IT-arbetsmarknad behövs **holistisk kunskap om ' +
        'verksamheter, informationssystem och strategi** — inte bara teknisk färdighet. När AI tar över ' +
        'traditionella hantverksmoment krävs en förflyttning uppåt i tech-stacken.'
    }
  ],
  nyckelbegrepp: [
    'Tidiga system löste **en process i taget**; Moores lag gjorde bred datorisering möjlig',
    'Enterprise application spaghetti: ostrukturerad IT utan strategisk koppling, IT i silo',
    'Produktivitetsparadoxen (Solow 1987): IT i oförändrade processer ger ingen produktivitetsökning',
    'NIST 1989 (Appleton): the dilemma of integration',
    '90-talets vågor: TQM, Kaizen/Lean/Six Sigma, JIT/Kanban, BPR, ERP, CRM, SCM, knowledge management, data warehousing, outsourcing',
    'Clinger-Cohen Act 1996: CIO som strategisk roll, Enterprise Architecture, IT governance, COTS, strategic alignment',
    'SAM (Henderson & Venkatraman 1993): affärsstrategi, IT-strategi, organisationsinfrastruktur, IT-infrastruktur',
    'Ingen enskild applikation ger uthållig fördel — förmågan att fortlöpande utnyttja den gör det',
    'Kumulativ komplexitet: varje IT-epok läggs ovanpå den förra',
    'Paradoxen upprepar sig i varje nytt område som digitaliseras',
    'Drivkrafter: global konkurrens, reglering (SOX, GDPR, CSRD, AI Act), frivillig efterlevnad, teknikutveckling'
  ],
  tentakoppling:
    'Föreläsning 1 ägnar drygt halva tiden åt det här spåret, och tentan bygger uttryckligen på ' +
    'både litteratur och föreläsningar. Produktivitetsparadoxen och strategic alignment har redan ' +
    'kommit som flervalsfrågor. Clinger-Cohens fyra konsekvenser och listan över 90-talsmetoderna ' +
    'är typiska flervalsfrågor som är lätta att få rätt om man läst dem en gång.'
},

/* ====================== KAPITEL 12 ====================== */
{
  id: 'str-k12',
  nr: 12,
  titel: 'Datastrategi: att styra det som AI lever av',
  ingress: 'AI-fabriken, avvägningen mellan defensiv och offensiv datastrategi, och varför reglering ' +
           'avgör hur långt åt det offensiva hållet ett företag kan gå.',
  lastid: 9,
  amnen: ['str-data'],
  avsnitt: [
    {
      rubrik: 'AI-fabriken',
      text:
        '**Iansiti och Lakhani (2020)** beskriver hur digitala företag behandlar beslutsfattande som en ' +
        '**industriell process**. Deras bild är *the AI factory*, som består av fyra delar:\n\n' +
        '1. **Data pipeline** — samlar in, rensar och lagrar data\n' +
        '2. **Algorithm development** — bygger och tränar maskininlärningsmodeller offline\n' +
        '3. **Experimentation platform** — testar modeller mot varandra, typiskt med A/B-tester\n' +
        '4. **IT infrastructure** — den gemensamma arkitekturen som håller ihop det\n\n' +
        'Poängen är vad som *inte* finns med. Ingen mänsklig auktionsförrättare deltar i Googles miljontals ' +
        'dagliga annonsauktioner. Ingen dispatcher väljer vilken bil som skickas hos Uber. Ingen ' +
        'sportbutikschef sätter dagspriset på golfkläder hos Amazon. Inga banktjänstemän godkänner varje ' +
        'lån hos Ant Financial.\n\n' +
        'Besluten är **digitaliserade**, inte bara understödda av teknik. Det är skillnaden mellan att ' +
        'använda AI och att vara byggd kring den — samma skillnad Barney pekar på i kapitel 9.'
    },
    {
      rubrik: 'En AI-anpassad organisation kräver ny arkitektur',
      text:
        '**Fountaine, McCarthy och Saleh (2019)** visar att steget till en AI-driven organisation inte i ' +
        'första hand är tekniskt utan **organisatoriskt och arkitektoniskt**. Data måste vara tillgänglig, ' +
        'tillförlitlig och gemensam — annars kan modellerna inte lita på den, och verksamheten kan inte ' +
        'lita på modellerna.\n\n' +
        'Två förkortningar som återkommer och som är lätta att blanda ihop:\n\n' +
        '- **SSOT** — *single source of truth*. En enda auktoritativ version av varje uppgift\n' +
        '- **MVoT** — *multiple versions of the truth*. Flera bearbetade versioner för olika ändamål\n\n' +
        'De är inte varandras motsatser i betydelsen att den ena är rätt. Poängen är att man behöver **en** ' +
        'källa som är sanningen, och att de olika versionerna som verksamheten faktiskt arbetar med ska ' +
        'kunna härledas tillbaka till den.'
    },
    {
      rubrik: 'Data defense och data offense',
      text:
        '**DalleMule och Davenport (2017)** delar datastrategin i två riktningar som drar åt olika håll och ' +
        'som måste balanseras mot varandra.\n\n' +
        '**Data defense — minimera risk:**\n\n' +
        '- Efterlevnad av regelverk\n' +
        '- Upptäcka och begränsa bedrägerier\n' +
        '- Förhindra intrång och datastöld\n' +
        '- Intern dataintegritet: **single source of truth**\n\n' +
        '**Data offense — maximera avkastning på data:**\n\n' +
        '- Strategier för att samla in data\n' +
        '- Dataintegration och analys\n' +
        '- Data mining, BI, AI och maskininlärning\n' +
        '- Bedrägeridetektering i realtid\n' +
        '- **Multiple versions of the truth**\n\n' +
        'Lägg märke till att SSOT hör till försvaret och MVoT till offensiven. Det förklarar varför de kan ' +
        'framstå som motstridiga: de tjänar olika syften. Ett företag kan inte maximera båda samtidigt utan ' +
        'måste välja var på skalan det ska ligga.'
    },
    {
      rubrik: 'Var på skalan man får ligga bestäms av kontexten',
      text:
        'Hur offensiv en datastrategi kan vara avgörs av hur höga insatserna är om något går fel — och det ' +
        'avgörs i sin tur till stor del av **reglering**.\n\n' +
        'Högst insatser: rättsväsende, polis och sjukvård. Därefter banker, finansiella institutioner och ' +
        'försäkring. Lägst: detaljhandel, onlinetjänster, media, underhållning och besöksnäring.\n\n' +
        'Här skiljer sig världsdelarna åt på ett sätt som är värt att kunna:\n\n' +
        '- **USA** har historiskt haft lite reglering — beskrivet i föreläsningen som "wild west"\n' +
        '- **EU** har ett regleringsfokus. **GDPR har redan gjort de flesta sektorer high-stakes** när det ' +
        'gäller personuppgifter\n' +
        '- **AI Act** tillämpar en **riskbaserad ansats**: ju högre risk användningen innebär, desto hårdare krav\n\n' +
        'Utöver detta ställer omvärlden krav som måste efterlevas oavsett strategi: dataskydd och ' +
        'personuppgiftsregler skapar juridiska utmaningar, efterlevnad av datasäkerhet blir alltmer komplex ' +
        'och kostsam, och **dataresiliens** — säkerhetskopior och återställning — är verksamhetskritisk för ' +
        'ett företag vars beslut fattas av modeller.'
    },
    {
      rubrik: 'Kopplingen tillbaka till kursen',
      text:
        'Det här kapitlet är inte en avstickare. Det är samma resonemang som löper genom hela delkursen, ' +
        'fast tillämpat på data:\n\n' +
        '- **Strategin kommer först.** Databasarkitekturen utformas efter vad verksamheten ska kunna göra ' +
        'med datan — inte tvärtom\n' +
        '- **Tekniken i sig ger ingen fördel.** Precis som SAM och Barney säger: förmågan att fortlöpande ' +
        'utnyttja den gör det\n' +
        '- **Reglering är inte bara en kostnad.** Jämför Porter och van der Linde i kapitel 8: krav som ' +
        'tvingar fram analys blottlägger ofta slöseri\n\n' +
        'Och kopplingen till din andra delkurs är direkt: en single source of truth är i praktiken frågan om ' +
        'redundans och anomalier — alltså normalisering, fast på verksamhetsnivå.'
    }
  ],
  nyckelbegrepp: [
    'AI-fabriken (Iansiti & Lakhani 2020): data pipeline, algorithm development, experimentation platform, IT infrastructure',
    'Beslut som är **digitaliserade**, inte bara understödda av teknik',
    'SSOT = single source of truth (en auktoritativ version)',
    'MVoT = multiple versions of the truth (flera bearbetade versioner)',
    'Data defense: efterlevnad, bedrägeri, intrång, dataintegritet — hör ihop med SSOT',
    'Data offense: insamling, integration, analys, BI/AI, realtid — hör ihop med MVoT',
    'Ju högre insatser, desto mer defensiv måste strategin vara',
    'GDPR har gjort de flesta sektorer high-stakes i EU; AI Act är riskbaserad',
    'Dataresiliens är verksamhetskritisk när besluten fattas av modeller'
  ],
  tentakoppling:
    'Det här materialet finns bara i föreläsningen, inte i kursboken — vilket gör det lätt att missa ' +
    'och därmed till en bra fråga att ställa. Paret data defense och data offense, och kopplingen ' +
    'SSOT till försvar respektive MVoT till offensiv, är den mest testbara enskilda saken i kapitlet.'
}

);
