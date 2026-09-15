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
  }
];
