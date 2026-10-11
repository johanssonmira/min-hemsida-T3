/* =========================================================================
   extentor.js – facit till de gamla tentorna. Inte tentorna själva.

   Här finns ingen text ur tentorna. Frågorna och svarsalternativen läses
   in från användarens egen PDF (se js/extentaimport.js). Det här är bara
   det appen själv tillför:

     antal   hur många svarsalternativ frågan har — kontrollerar tolkningen
     ratt    vilket alternativ som är rätt, räknat från 0 i tentans ordning
     summa   kontrollsumma över frågetextens bokstäver, så att en annan PDF
             eller en feltolkad fråga upptäcks i stället för att rättas fel
     bank    för essäfrågorna: frågan i frågebanken vars checklista och
             modellsvar används vid självrättningen
     poang   vad en flervals- respektive essäfråga är värd, för att kunna
             visa det innan PDF:en är inläst (rättningen använder PDF:ens
             egna "Totalpoäng")

   Tentorna kom utan facit. Svaren och förklaringarna är mina, grundade i
   kursboken och artiklarna, och det står i gränssnittet.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.extentor = [
  {
    id: 'ht24-ordinarie',
    delkurs: 'strategi',
    titel: 'Ordinarie tentamen',
    datum: '2024-10-14',
    fil: 'Tentamen SYSB23 Strategi och ekonomystyrning 24-10-14 HT24.pdf',
    rubrik: ['HT24', 'Strategi och ekonomistyrning', 'Ordinarie tentamen'],
    poang: { flerval: 6, essa: 20 },
    fragor: [
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1khes26',
        forklaring: 'Triple Bottom Line har tre dimensioner: den **sociala** (människorna — anställda, ' +
          'samhälle, kunder), den miljömässiga och den ekonomiska. Den sociala är People. ' +
          'Purpose är inte en av de tre.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'ny0jho',
        forklaring: '**Visionen** pekar ut vart företaget vill — ett önskat framtida tillstånd. ' +
          '**Affärsidén** beskriver vad företaget gör, för vem, och hur det tjänar pengar. ' +
          'Två av de felaktiga alternativen byter bara plats på begreppen.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '1uv0y5z',
        forklaring: 'Kritiken mot vinstmaximering är att den gör företaget till en svart låda med ett ' +
          'enda mål. I verkligheten har företag **flera mål** — ägare, ledning, anställda och andra ' +
          'intressenter vill olika saker. Det är just vad satisfierings- och intressentmodellerna fångar.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1je9jtp',
        forklaring: 'Mintzbergs **emergenta strategi**: omvärlden är osäker och förändras, så en del av ' +
          'strategin växer fram ur det man lär sig på vägen. Han säger inte att planering alltid ' +
          'misslyckas — bara att den inte räcker.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'fmmivi',
        forklaring: 'E står för **Environmental** — energi, utsläpp, resurser. Jämställda löner och ' +
          'vidareutbildning hör till S (Social). Styrelsens sammansättning hör till G (Governance).' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '4svo0v',
        forklaring: 'Five Forces bedömer konkurrenstrycket i en **bransch** och därmed hur lönsam den är ' +
          'att vara i. Det är precis frågan inför att gå in i en ny bransch. De andra alternativen ' +
          'är interna frågor som modellen inte handlar om.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: '2ixc9v',
        forklaring: 'Paradoxen uppstår när ny teknik läggs ovanpå **oförändrade arbetssätt**. Lösningen ' +
          'är att ändra processerna så att tekniken faktiskt utnyttjas — samma tanke som 90-talets ' +
          'processmetoder och strategic alignment bygger på.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '1wof5zg',
        forklaring: 'Kaplan och Nortons kärnpoäng: finansiella mått är **eftersläpande**. De visar följderna ' +
          'av gårdagens beslut men säger inget om vad som driver framtida resultat. Därför kompletterar ' +
          'styrkortet med kund-, process- och lärandeperspektiv. Måtten är inte meningslösa — bara otillräckliga.' },
      { typ: 'flerval', antal: 3, ratt: 0, summa: '1g7u0e8',
        forklaring: 'Divisionsorganisationen delar företaget i **självständiga enheter** per produktområde ' +
          'eller marknad. Då är det lätt att lägga till ett nytt område eller en ny marknad. Att få ' +
          'alla att dra åt samma håll är tvärtom dess svaghet.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '18nwde5',
        forklaring: '**Yttre effektivitet** är att göra rätt saker — att erbjuda det kunderna vill ha. ' +
          'Förlorade marknadsandelar är det tydligaste tecknet på att den brister. Hög produktivitet ' +
          'är inre effektivitet och hjälper inte då.' },
      { typ: 'essa', summa: 'n4uv8c', bank: 'str-per-07' },
      { typ: 'essa', summa: '1u64bz7', bank: 'str-per-06' }
    ]
  },

  {
    id: 'ht24-omtenta',
    delkurs: 'strategi',
    titel: 'Omtentamen',
    datum: '2024-12-06',
    fil: 'Tentamen SYSB23 Strategi och ekonomystyrning 24-12-06 HT24.pdf',
    rubrik: ['HT24', 'Strategi och ekonomistyrning', 'Omtentamen'],
    poang: { flerval: 6, essa: 20 },
    fragor: [
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'plvu0d',
        forklaring: 'Styrkortets idé är **balans**: de finansiella måtten behålls men kompletteras med ' +
          'icke-finansiella i kund-, process- och lärandeperspektiven. Två av de felaktiga alternativen ' +
          'beskriver helt andra modeller — resursbaserad teori och hållbarhetsramverk.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'dfh3pa',
        forklaring: 'Henderson och Venkatramans fyra domäner: **affärsstrategi, IT-strategi, ' +
          'organisationsinfrastruktur och IT-infrastruktur**. Modellen går ut på att hålla dem i linje ' +
          'med varandra, både strategiskt och funktionellt.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: 'ysxguw',
        forklaring: 'Funktionsorganisation är indelning efter **funktion** — marknad, produktion, ekonomi. ' +
          'Indelning efter produkt eller geografi är divisionsorganisation, och en organisation byggd ' +
          'kring projekt är en projekt- eller matrisorganisation.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'ycz1sf',
        forklaring: '**Inre effektivitet** är att göra saker rätt — med så lite resurser som möjligt. ' +
          'Hög produktivitet och låga kostnader är just det. Kundnöjdhet, distribution och varumärke ' +
          'hör till den yttre effektiviteten.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: '161wvrz',
        forklaring: 'ESG står för **Environmental, Social, Governance** — miljö, socialt ansvar och ' +
          'bolagsstyrning. Ramverket finns för att mäta och förbättra just de tre, inte för att ' +
          'maximera vinsten eller den interna effektiviteten.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '2iu5k0',
        forklaring: 'Triple Bottom Line: företaget bedöms på **tre sista rader samtidigt** — ekonomi, ' +
          'människor och miljö. Poängen är balansen mellan dem, inte att minimera kostnader eller ' +
          'maximera vinst.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '120shri',
        forklaring: 'En vision beskriver ett **önskat framtida tillstånd**. Ekonomiska mål, produktbeskrivningar ' +
          'och konkreta planer hör till målformuleringen, affärsidén respektive verksamhetsplanerna.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'vzbpwe',
        forklaring: 'Den neoklassiska teorin ser företaget som en svart låda med **ett** mål: att maximera ' +
          'vinsten. Tillfredsställande vinst är satisfieringsmodellen, intressenternas tillfredsställelse ' +
          'intressentmodellen, och kassaflödet de kassaflödesbaserade modellerna.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: 'ao1yfx',
        forklaring: 'Porters fem krafter: rivaliteten i branschen, hotet från nya aktörer, hotet från ' +
          'substitut, samt leverantörers och kunders förhandlingskraft. **Lagar och regleringar** är en ' +
          'omvärldsfaktor av den typ som PESTEL tar upp — inte en av de fem.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '1ejjcj3',
        forklaring: 'Emergent strategi växer fram ur **det organisationen lär sig** och ur hur omvärlden ' +
          'utvecklas. Det är inte samma sak som att strunta i planer eller att påstå att planer alltid ' +
          'misslyckas — det är en blandning av avsikt och anpassning.' },
      { typ: 'essa', summa: '1e3bvyz', bank: 'str-it-05' },
      { typ: 'essa', summa: '1mimif0', bank: 'str-hal-07' }
    ]
  },

  /* HT25 är upplagd annorlunda: essäfrågorna kommer först, och det är tre
     à 15 p plus elva flervalsfrågor à 5 p. Fyra av flervalsfrågorna fanns
     redan HT24 men med alternativen i en annan ordning — därav andra index. */
  {
    id: 'ht25-ordinarie',
    delkurs: 'strategi',
    titel: 'Ordinarie tentamen',
    datum: '2025-10-14',
    fil: 'Tentamen SYSB23 Strategi och ekonomistyrning 25-10-14 HT25.pdf',
    rubrik: ['HT25', 'Strategi och ekonomistyrning', 'Ordinarie tentamen'],
    poang: { flerval: 5, essa: 15 },
    fragor: [
      { typ: 'essa', summa: '1a2ed7u', bank: 'str-bsc-07' },
      { typ: 'essa', summa: 'ptgty4', bank: 'str-mal-07' },
      { typ: 'essa', summa: 'jnx8uf', bank: 'str-it-06' },
      { typ: 'flerval', antal: 3, ratt: 2, summa: '1g7u0e8',
        forklaring: '**Divisionsorganisationen** delar företaget i självständiga enheter per produktområde ' +
          'eller marknad, var och en med eget resultatansvar. Ett nytt område eller en ny marknad kan då ' +
          'läggas till som en egen division. Att styra alla åt samma håll är tvärtom lättare i en ' +
          'funktionsorganisation — jämför fråga 11. Frågan kom även HT24.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'ny0jho',
        forklaring: '**Visionen** pekar ut riktningen — ett önskat framtida tillstånd. **Affärsidén** beskriver ' +
          'vad företaget gör, för vem och hur det tjänar pengar. Ett av de felaktiga alternativen byter bara ' +
          'plats på begreppen, och en vision är varken kortsiktig eller enbart till för omvärlden.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '2ixc9v',
        forklaring: 'Paradoxen uppstår när ny teknik läggs ovanpå **oförändrade arbetssätt**. Lösningen är att ' +
          'ändra arbetsflöden och processer så att tekniken faktiskt utnyttjas. Mer teknik utan ' +
          'processförändring är just det som skapar paradoxen. Frågan kom även HT24.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'ao1yfx',
        forklaring: 'De fem krafterna är rivaliteten i branschen, hotet från nya aktörer, hotet från substitut ' +
          'samt leverantörers och kunders förhandlingskraft. **Lagar och regleringar** är en omvärldsfaktor ' +
          'som hör hemma i bredare omvärldsanalyser, inte i Five Forces. Samma fälla som på omtentan HT24.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1khes26',
        forklaring: 'Triple Bottom Line: **People** (det sociala — anställda, samhälle, kunder), Planet ' +
          '(miljön) och Profit (ekonomin). Purpose är inte en av de tre. Frågan kom även HT24.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'gtr2ko',
        forklaring: 'S i ESG står för **Social**: arbetsmiljö, mångfald, jämställdhet, kompetensutveckling. ' +
          'Förnybar energi och minskad pappersanvändning hör till E (Environmental), och ledningens ' +
          'struktur till G (Governance).' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1ghlgve',
        forklaring: 'En **taktik** är en konkret och kortsiktig åtgärd som genomförs inom strategins ram — ' +
          'en rabatt under en kampanjvecka. Att bli marknadsledande inom fem år är ett mål, och en ' +
          'treårsplan för tillväxt eller att identifiera nya marknader hör till det långsiktiga ' +
          'strategiarbetet.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '156rhm0',
        forklaring: 'I en **funktionsorganisation** leds funktionerna (inköp, tillverkning, försäljning …) ' +
          'direkt av ledningen, som därför har god kontroll och kan styra mot målen. Geografisk expansion ' +
          'och nya produktområden är divisionsorganisationens fördelar. Behovet av samordning minskar ' +
          'inte — funktionerna måste tvärtom samordnas, och revirtänkande är en känd svaghet.' },
      { typ: 'flerval', antal: 3, ratt: 0, summa: '12r6rgx',
        forklaring: '**Yttre effektivitet** är att göra rätt saker — att erbjuda det kunderna vill ha. Hög ' +
          'produktivitet är inre effektivitet, och förlorade marknadsandelar visar att den yttre brister. ' +
          'Lagerhantering och kostnadssänkningar är också inre effektivitet. Frågan kom även HT24.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '1wi5ilx',
        forklaring: 'Porters tre generiska strategier: **kostnadsledarskap** (lägst kostnader och därmed ' +
          'möjlighet till lägre pris), differentiering (något unikt som kunderna betalar mer för) och fokus ' +
          '(en avgränsad nisch). Det första alternativet beskriver differentiering, det sista fokus.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: '1aotrx8',
        forklaring: 'Den neoklassiska teorin ser företaget som en **svart låda** som omvandlar resurser till ' +
          'prestationer med vinst som enda mål, utan att bry sig om människorna eller hur omvandlingen går ' +
          'till. Öppet system med intressenter är intressentmodellen.' }
    ]
  },

  /* ---------------- Processorienterad verksamhetsutveckling ----------------
     HT25: två essäer à 15 p, en BPM-sektion med flervalsfrågor à 5 p och en
     BPMN-sektion där varje fråga har sin egen poäng (3–7 p). Fel −1 överallt.
     BPMN-frågorna har diagram; de klipps ut ur PDF:en vid inläsningen. */
  {
    id: 'bpm-ht25-ordinarie',
    delkurs: 'processer',
    titel: 'Ordinarie tentamen',
    datum: '2025-11-21',
    fil: 'SYSB23_BPM_21nov2025.pdf',
    rubrik: ['HT25', 'Processorienterad', 'Ordinarie tentamen'],
    poang: { flerval: 5, essa: 15 },
    beskrivning: '2 essäer à 15 p, 10 BPM-frågor à 5 p och 4 BPMN-frågor (3–7 p, tre med diagram)',
    poangsattning: 'Essäfrågorna ger max 15 poäng, utan minuspoäng. I BPM-sektionen ger rätt svar ' +
      '5 poäng; i BPMN-sektionen det antal poäng som står under frågan. Fel svar ger −1 poäng och ' +
      'obesvarad fråga 0 poäng. Max 300 ord per essä.',
    maxOrd: 300,
    fragor: [
      { typ: 'essa', summa: 'fr4180', bank: 'p-essa-01' },
      { typ: 'essa', summa: '1hb4d2f', bank: 'p-essa-02' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'bhxs1j',
        forklaring: 'EA är den övergripande ritningen över hur strategin ska förverkligas — affär, ' +
          'information, applikationer och teknik. **BPM är det operativa lagret** som kopplar ihop ' +
          'strategi, verksamhet och IT genom processerna. De är alltså inte samma sak, inte oberoende, ' +
          'och det är EA (inte BPM) som är den övergripande ramen.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1sebeum',
        forklaring: 'BPR på 90-talet ville riva upp och göra om processerna från grunden. Projekten blev ' +
          'ofta **för radikala, dyra och toppstyrda**, mötte starkt motstånd och blev i praktiken ofta ' +
          'nedskärningar. Det var tvärtom tätt kopplat till IT — "don’t automate, obliterate".' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '19ypnmo',
        forklaring: 'Regelstyrda, repetitiva steg utan omdöme i flera system är **RPA:s** typfall — en ' +
          'mjukvarurobot gör samma klick som människan. Agentic AI behövs när uppgiften kräver tolkning ' +
          'och beslut, och en redesign är överdriven när stegen redan är enkla och stabila.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'lkvuqm',
        forklaring: 'BPM-huset har **flera lager** som tillsammans ger en effektiv organisation: ' +
          'strategiska grunder som fundament, ledning och styrning (blå zon, management effectiveness), ' +
          'de operativa processerna (röd zon, operational efficiency) och BPM som ramverket som binder ' +
          'ihop dem (grön zon). Det handlar inte om IT-system, och strategin kommer före — inte efter — ' +
          'kartläggningen.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: '1em0itb',
        forklaring: 'Green BPM fastnade i praktiken för att **verktygen saknar stöd** för att lagra, räkna ' +
          'på och analysera energi-, utsläpps- och resursdata i processmodellerna. Ingen lag förbjuder det, ' +
          'och BPM har inte ersatts.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'cbspu',
        forklaring: 'Snabbare svar, färre överlämningar och en kontaktpunkt — allt utgår från kundens ' +
          'upplevelse. Det är **customer-centric BPM**. Integration- och system-centric handlar om ' +
          'systemkopplingar, employee-centric om medarbetarnas arbete.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'u4lhec',
        forklaring: 'Utan engagerad ledning och tydlig strategi rekommenderar Jeston att **börja lokalt, ' +
          'bottom-up**: små förbättringar som visar värde och bygger momentum (jämför scenariot under ' +
          'the radar). Ett top-down-program kräver just det mandat som saknas.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'pplocw',
        forklaring: 'Innovate tar fram **to-be**: framtida processer och validerade lösningsförslag. ' +
          'Rotorsaker hör till Understand, utbildningsplaner till People och Implement, och ' +
          'riskregistret till projektstyrningen.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '13x5arg',
        forklaring: 'Red Wine Test: deltagarna föreställer sig att projektet redan är klart och beskriver ' +
          'hur det ser ut. Syftet är ett **gemensamt narrativ om hur framgång ser ut** — inte scope, ' +
          'lösningsval eller detaljerade modeller.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'pq3aow',
        forklaring: 'En process asset är mer än modellen: **modellen är en del av den**, och till den hör ' +
          'roller, ägarskap, policyer, regler, risker, mått och andra styrande element. Det första ' +
          'alternativet låter likt men skiljer modellen från asseten i stället för att se den som en del.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: '1mhw2hq',
        forklaring: 'BPMN och DMN gör processflöden och beslutsregler **visuella och begripliga**, så att ' +
          'man kan visa varför ett automatiserat beslut blev som det blev. Det är förklarbarheten. ' +
          'Loggar och optimering förklarar inget i sig.' },
      { typ: 'flerval', antal: 5, ratt: 1, summa: '7gbwff',
        forklaring: 'Message A startar processen och Activity A körs. Sedan kommer en **händelsebaserad ' +
          'gateway**: den väg vars händelse inträffar först vinner, och den andra stängs. Message B kommer ' +
          'efter 2 dagar, före 4-dagarstimern, så det blir Activity B och sedan Activity D. ' +
          'Activity C körs aldrig. **A, B, D.**' },
      { typ: 'flerval', antal: 6, ratt: 4, summa: 'q91k19',
        forklaring: 'Event-subprocessen startar med en meddelandehändelse med **heldragen kant — den är ' +
          'avbrytande**. När Message A kommer 5 minuter efter Activity A avbryts huvudprocessen, och ' +
          'subprocessen kör Activity E och F. Message B och 3-timmarstimern hinns aldrig med, så B, C och ' +
          'D blir inte av. **A, E, F.** (Streckad kant hade betytt icke-avbrytande — då hade huvudflödet ' +
          'fortsatt parallellt.)' },
      { typ: 'flerval', antal: 6, ratt: 4, summa: 'p46atd',
        forklaring: 'Processen startar 4 december kl. 00:01. Activity A tar 1 timme, alltså klar 01:01. ' +
          'Den mellanliggande timern väntar **48 timmar**, till 6 december 01:01. Activity B tar 1 timme. ' +
          'Processen är klar **6 december kl. 02:01**. Fällan är att glömma någon av de två aktiviteternas ' +
          'timme.' }
    ]
  },

  {
    id: 'bpm-ht25-omtenta',
    delkurs: 'processer',
    titel: 'Omtentamen',
    datum: '2026-01-09',
    fil: 'SYSB23_BPM_9jan2026.pdf',
    rubrik: ['HT25', 'Processorienterad', 'Omtentamen'],
    poang: { flerval: 5, essa: 15 },
    beskrivning: '2 essäer à 15 p, 10 BPM-frågor à 5 p och 4 BPMN-frågor (3–7 p, tre med diagram)',
    poangsattning: 'Essäfrågorna ger max 15 poäng, utan minuspoäng. I BPM-sektionen ger rätt svar ' +
      '5 poäng; i BPMN-sektionen det antal poäng som står under frågan. Fel svar ger −1 poäng och ' +
      'obesvarad fråga 0 poäng. Max 300 ord per essä.',
    maxOrd: 300,
    fragor: [
      { typ: 'essa', summa: '1f0e643', bank: 'p-essa-03' },
      { typ: 'essa', summa: 'd5roqt', bank: 'p-essa-04' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1mtnkdy',
        forklaring: 'I ett Red Wine Test **föreställer sig deltagarna att BPM-projektet redan är klart** ' +
          'och beskriver hur organisationen då fungerar — som när man skålar efter ett lyckat projekt. ' +
          'Det är framåtblickande, inte en analys av as-is eller av risker.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1m98k5i',
        forklaring: 'Target Operating Model är en **övergripande bild av hur organisationens delar ska ' +
          'fungera i framtiden** — processer, människor, teknik och styrning tillsammans. Den är varken ' +
          'en IT-arkitektur, en kostnadskalkyl eller en as-is-karta.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1kcyh0o',
        forklaring: 'Steg, regler, ansvar och beslutspunkter för **en specifik process** — det är precis ' +
          'vad en process asset samlar. TOM är för övergripande, Process Worth Matrix prioriterar mellan ' +
          'processer, och strategidokumentet säger inget om hur processen går till.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: '1ynqmb1',
        forklaring: 'I Understand modellerar man för att få **en gemensam, faktabaserad bild av hur ' +
          'processen fungerar i dag** och kunna analysera den. Jeston varnar för att modellera för ' +
          'detaljerat — det är inte automatiseringsunderlag eller färdiga KPI:er.' },
      { typ: 'flerval', antal: 4, ratt: 2, summa: 'f9d8nl',
        forklaring: 'En quick win går att **genomföra snabbt och billigt och ger en direkt förbättring**. ' +
          'Den bygger förtroende för BPM-arbetet, men den ersätter inte workshops och kräver inte ' +
          'externa konsulter.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: 'sk57gt',
        forklaring: 'RPA klickar sig fram i **användargränssnittet** i stället för att integrera systemen ' +
          'på riktigt. Ändras en skärmbild går roboten sönder, och därför skalade många tidiga case dåligt. ' +
          'RPA kräver tvärtom lite kodning.' },
      { typ: 'flerval', antal: 4, ratt: 1, summa: 'mac05g',
        forklaring: 'Några engagerade personer, inget mandat, ingen budget, sporadiska insatser — det är ' +
          '**under the radar**. Pilot project är ett avgränsat projekt med uppdrag att visa värde, in the ' +
          'driver’s seat innebär ledningens stöd, och business as usual att BPM är inbäddat.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1cxfrpj',
        forklaring: 'Strategiskt viktigt, tvärfunktionellt och påverkar hela verksamheten: då behövs ' +
          '**top-down** för styrning, mandat och samordning. Bottom-up eller decentraliserat ger ingen ' +
          'helhet, och att vänta löser inget när regelverket kräver anpassning.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1pm102g',
        forklaring: 'En Large Process Model (Kampik m.fl. 2025) är en **samlad, datadriven kunskapsbas** ' +
          'om processer som kan ge automatiska förbättringsförslag. Den ska stödja analytikerna, inte ' +
          'ersätta dem eller styra allt via agenter.' },
      { typ: 'flerval', antal: 4, ratt: 0, summa: 'l5t4wi',
        forklaring: 'Jestons processoptimeringslösningar: **process redesign, outsourcing, shared services, ' +
          'RPA och cloud computing**. Ledarskap och change management är 7FE:s essentials, och ' +
          'customer- och human-centric är BPM-perspektiv.' },
      { typ: 'flerval', antal: 6, ratt: 0, summa: '3aya1r',
        forklaring: 'En event-subprocess ritas med **prickad kant**. Startar den med en **streckad** ' +
          'cirkel är den icke-avbrytande, och kuvertet gör den till en meddelandestart. Det är **B**. ' +
          'D har heldragen cirkel och är därför avbrytande, och F startar på en timer. C är en send task ' +
          '(fyllt kuvert), E en receive task (tomt kuvert), och A är en call activity.' },
      { typ: 'flerval', antal: 4, ratt: 3, summa: '1q6ingt',
        forklaring: 'En BPMN-process behöver en **tydlig start, ett förutsägbart flöde och tydliga slut**. ' +
          'Reseräkningen har allt det: inskick, kontroll, komplettering, attest och sluten Utbetald eller ' +
          'Avslagen. De andra är löpande, ad hoc eller saknar slutpunkt.' },
      { typ: 'flerval', antal: 6, ratt: 4, summa: 'so3mon',
        forklaring: 'Activity A, sedan Subprocess A: Activity B och gatewayn "Missing Information?". Svaret ' +
          'är Yes, så det blir Activity C, som slutar i en **error end event**. Felet fångas av ' +
          'feltriggern på subprocessens kant, och flödet går vidare till Activity F. Activity D och E ' +
          'körs aldrig. **A, B, C, F.**' },
      { typ: 'flerval', antal: 6, ratt: 2, summa: '1ox4gbt',
        forklaring: 'Start 2 februari kl. 00.01. Activity A tar två timmar, så den är klar 02.01. Timern ' +
          'väntar **36 timmar**, till 3 februari kl. 14.01. Activity B tar två timmar. Processen är klar ' +
          '**3 februari kl. 16.01**.' }
    ]
  }
];
