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
  }
];
