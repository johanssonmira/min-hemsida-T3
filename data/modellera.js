/* =========================================================================
   modellera.js – övningar till databastentans uppgift 1, 2 och 3.

   Tre familjer, och tillsammans täcker de 70 av tentans 100 poäng:

     lasdiagram    uppgift 1 (25 p) – ett ER-diagram och tio påståenden,
                   markera alla som är sanna. +5 för rätt, −3 för fel.
     erschema      uppgift 2 (25 p) – transformera ER-diagrammet till ett
                   relationsschema.
     normalisering uppgift 3 (20 p) – högsta normalform, och uppdelning
                   till 3NF när relationen inte redan är där.

     Den sista fjärdedelen, uppgift 4, är en SQL-fråga och tränas i
     SQL-verkstaden.

   Normaliseringsuppgifterna är kursens egna, avlästa spaltvis ur
   övningshäftets uppgift 10 till 13. Facit står INTE här utan räknas ut
   av js/normalform.js — 54 handskrivna facit hade innehållit fel, och ett
   fel facit lär ut fel sak. Lösaren är validerad mot häftets eget facit.

   ER-diagrammen är ritade efter häftets uppgifter 4 till 9. Facit i
   häftet visar exakt vilka relationer och attribut som ska falla ut, så
   diagrammen går att återskapa även om själva bilderna inte går att läsa
   ur en PDF.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

/* ------------------------------------------------------------------ */
/* 1. Läsa diagram – tentans uppgift 1                                 */
/* ------------------------------------------------------------------ */

window.SYSB23.lasdiagram = [
  {
    id: 'ld-1',
    titel: 'Föreningen',
    kalla: 'Egen uppgift i tentans form',
    diagram: {
      bredd: 660, hojd: 330,
      entiteter: [
        { id: 'for', namn: 'Förening', x: 90,  y: 70 },
        { id: 'lag', namn: 'Lag',      x: 330, y: 70 },
        { id: 'spe', namn: 'Spelare',  x: 330, y: 250 },
        { id: 'are', namn: 'Arena',    x: 580, y: 160 }
      ],
      relationer: [
        { id: 'har',   namn: 'Har',      x: 210, y: 70 },
        { id: 'medlem', namn: 'MedlemI', x: 90,  y: 250, bredd: 92 },
        { id: 'spelar', namn: 'SpelarI', x: 330, y: 160, bredd: 88 },
        { id: 'hemma',  namn: 'Hemma',   x: 460, y: 105, bredd: 84 }
      ],
      attribut: [
        { av: 'for', namn: 'foreningsNo', x: 60,  y: 20, nyckel: true },
        { av: 'for', namn: 'namn',        x: 175, y: 20 },
        { av: 'lag', namn: 'lagNo',       x: 300, y: 20, delnyckel: true },
        { av: 'lag', namn: 'division',    x: 415, y: 20 },
        { av: 'spe', namn: 'spelarNo',    x: 300, y: 305, nyckel: true },
        { av: 'spe', namn: 'namn',        x: 420, y: 305 },
        { av: 'are', namn: 'arenaNo',     x: 610, y: 60, nyckel: true },
        { av: 'are', namn: 'ort',         x: 620, y: 245 }
      ],
      linjer: [
        { fran: 'for', till: 'har',    etikett: '1' },
        { fran: 'har', till: 'lag',    etikett: 'N', total: true },
        { fran: 'for', till: 'medlem', etikett: '1' },
        { fran: 'medlem', till: 'spe', etikett: 'N', total: true },
        { fran: 'lag', till: 'spelar', etikett: 'M' },
        { fran: 'spelar', till: 'spe', etikett: 'N' },
        { fran: 'lag', till: 'hemma',  etikett: 'N', total: true },
        { fran: 'hemma', till: 'are',  etikett: '1' }
      ]
    },
    beskrivning:
      'Fyra entitetstyper och fyra relationstyper. **Lag är en svag ' +
      'entitetstyp**: lagNo är streckat understruket och identifierar bara ' +
      'inom föreningen. Läs kardinaliteten tvärs över relationen, och ' +
      'linjerna vid sin egen ände.',
    pastaenden: [
      { text: 'En förening identifieras av sitt föreningsnummer.', sant: true,
        skal: 'foreningsNo är heldraget understruket — en vanlig nyckel.' },
      { text: 'Två lag i olika föreningar kan ha samma lagnummer.', sant: true,
        skal: 'lagNo är streckat understruket, alltså en partiell nyckel. Lag identifieras av föreningen plus lagNo.' },
      { text: 'En spelare kan vara medlem i flera föreningar.', sant: false,
        skal: 'MedlemI är 1:N från Förening. Varje spelare hör till högst en förening.' },
      { text: 'En spelare kan spela i flera lag.', sant: true,
        skal: 'SpelarI är M:N. Ingenting begränsar antalet lag per spelare.' },
      { text: 'En spelare måste spela i minst ett lag.', sant: false,
        skal: 'Linjen mellan SpelarI och Spelare är enkel — partiellt deltagande.' },
      { text: 'En spelare måste tillhöra en förening.', sant: true,
        skal: 'Dubbel linje mellan MedlemI och Spelare betyder totalt deltagande.' },
      { text: 'Flera lag kan ha samma hemmaarena.', sant: true,
        skal: 'Hemma är N:1 från Lag till Arena. Flera lag får peka på samma arena.' },
      { text: 'Ett lag måste ha en hemmaarena.', sant: true,
        skal: 'Dubbel linje vid Lag i relationen Hemma.' },
      { text: 'En arena måste vara hemmaarena för minst ett lag.', sant: false,
        skal: 'Linjen vid Arena är enkel. En arena utan lag är tillåten.' },
      { text: 'En spelare kan spela i ett lag som tillhör en annan förening än den spelaren är medlem i.', sant: true,
        skal: 'Ingenting i ett ER-diagram binder ihop MedlemI med SpelarI. Den sortens regel går inte att uttrycka i notationen — det är just det diagrammet INTE kan säga.' }
    ]
  },

  {
    id: 'ld-2',
    titel: 'Biblioteket',
    kalla: 'Egen uppgift i tentans form',
    diagram: {
      bredd: 660, hojd: 320,
      entiteter: [
        { id: 'bib', namn: 'Bibliotek', x: 95,  y: 80 },
        { id: 'tit', namn: 'Titel',     x: 350, y: 80 },
        { id: 'exe', namn: 'Exemplar',  x: 350, y: 240, svag: true },
        { id: 'lan', namn: 'Låntagare', x: 585, y: 240 }
      ],
      relationer: [
        { id: 'ager', namn: 'Äger',   x: 222, y: 80, bredd: 76 },
        { id: 'av',   namn: 'AvTitel', x: 350, y: 160, bredd: 86, identifierande: true },
        { id: 'lanad', namn: 'Lånad', x: 470, y: 240, bredd: 80 }
      ],
      attribut: [
        { av: 'bib', namn: 'bibNo',    x: 60,  y: 25, nyckel: true },
        { av: 'bib', namn: 'ort',      x: 175, y: 25 },
        { av: 'tit', namn: 'isbn',     x: 320, y: 25, nyckel: true },
        { av: 'tit', namn: 'forfattare', x: 460, y: 25 },
        { av: 'exe', namn: 'expNo',    x: 245, y: 295, delnyckel: true },
        { av: 'exe', namn: 'skick',    x: 400, y: 295 },
        { av: 'lan', namn: 'lanekort', x: 610, y: 180, nyckel: true }
      ],
      linjer: [
        { fran: 'bib', till: 'ager',  etikett: '1' },
        { fran: 'ager', till: 'tit',  etikett: 'N' },
        { fran: 'tit', till: 'av',    etikett: '1' },
        { fran: 'av', till: 'exe',    etikett: 'N', total: true },
        { fran: 'exe', till: 'lanad', etikett: 'N' },
        { fran: 'lanad', till: 'lan', etikett: '1' }
      ]
    },
    beskrivning:
      '**Exemplar är en svag entitetstyp** med dubbel ram, identifierad av ' +
      'sin titel plus exemplarnumret. Lägg märke till vilka linjer som är ' +
      'dubbla och vilka som inte är det.',
    pastaenden: [
      { text: 'Ett exemplar kan inte finnas utan en titel.', sant: true,
        skal: 'Dubbel ram på Exemplar och dubbel romb på AvTitel: en identifierande relation med totalt deltagande.' },
      { text: 'Två exemplar av olika titlar kan ha samma exemplarnummer.', sant: true,
        skal: 'expNo är en partiell nyckel — den är bara unik inom sin titel.' },
      { text: 'En titel kan ägas av flera bibliotek.', sant: false,
        skal: 'Äger är 1:N från Bibliotek. Varje titel hör till högst ett bibliotek.' },
      { text: 'En titel måste ägas av ett bibliotek.', sant: false,
        skal: 'Linjen mellan Äger och Titel är enkel — partiellt deltagande.' },
      { text: 'Ett exemplar kan vara utlånat till högst en låntagare.', sant: true,
        skal: 'Lånad är N:1 från Exemplar till Låntagare.' },
      { text: 'En låntagare kan ha flera exemplar hemma samtidigt.', sant: true,
        skal: 'N-sidan sitter vid Exemplar, så flera exemplar får peka på samma låntagare.' },
      { text: 'Ett exemplar måste vara utlånat.', sant: false,
        skal: 'Enkel linje vid Exemplar i relationen Lånad. Ett exemplar får stå i hyllan.' },
      { text: 'Två titlar kan ha samma ISBN.', sant: false,
        skal: 'isbn är heldraget understruket och därmed unikt.' },
      { text: 'Ett bibliotek identifieras av sin ort.', sant: false,
        skal: 'Det är bibNo som är understruket, inte ort. Två bibliotek får ligga på samma ort.' },
      { text: 'Diagrammet visar hur länge ett lån får pågå.', sant: false,
        skal: 'Det finns inget attribut för lånetid någonstans. Ett ER-diagram säger bara det som står i det.' }
    ]
  },

  {
    id: 'ld-3',
    titel: 'Verkstaden',
    kalla: 'Egen uppgift i tentans form',
    diagram: {
      bredd: 660, hojd: 300,
      entiteter: [
        { id: 'kund', namn: 'Kund',    x: 90,  y: 75 },
        { id: 'bil',  namn: 'Bil',     x: 335, y: 75 },
        { id: 'mek',  namn: 'Mekaniker', x: 90, y: 235, bredd: 108 },
        { id: 'jobb', namn: 'Jobb',    x: 335, y: 235 }
      ],
      relationer: [
        { id: 'ager',  namn: 'Äger',    x: 212, y: 75, bredd: 76 },
        { id: 'gallar', namn: 'Gäller', x: 335, y: 155, bredd: 78 },
        { id: 'utfor', namn: 'Utför',   x: 212, y: 235, bredd: 78 }
      ],
      attribut: [
        { av: 'kund', namn: 'kundNo',  x: 55,  y: 22, nyckel: true },
        { av: 'kund', namn: 'namn',    x: 165, y: 22 },
        { av: 'bil',  namn: 'regNr',   x: 305, y: 22, nyckel: true },
        { av: 'bil',  namn: 'marke',   x: 425, y: 22 },
        { av: 'mek',  namn: 'anstNo',  x: 60,  y: 288, nyckel: true },
        { av: 'jobb', namn: 'jobbNo',  x: 300, y: 288, nyckel: true },
        { av: 'jobb', namn: 'timmar',  x: 430, y: 288 },
        { av: 'utfor', namn: 'datum',  x: 212, y: 160 }
      ],
      linjer: [
        { fran: 'kund', till: 'ager',   etikett: '1' },
        { fran: 'ager', till: 'bil',    etikett: 'N', total: true },
        { fran: 'bil',  till: 'gallar', etikett: '1' },
        { fran: 'gallar', till: 'jobb', etikett: 'N', total: true },
        { fran: 'mek',  till: 'utfor',  etikett: 'M' },
        { fran: 'utfor', till: 'jobb',  etikett: 'N', total: true }
      ]
    },
    beskrivning:
      'Lägg märke till attributet **datum**, som hänger på relationen Utför ' +
      'och inte på någon av entiteterna. Det är signaturen för en M:N-relation ' +
      'som kommer att bli en egen tabell.',
    pastaenden: [
      { text: 'Ett jobb kan utföras av flera mekaniker.', sant: true,
        skal: 'Utför är M:N. Flera mekaniker får dela på samma jobb.' },
      { text: 'Ett jobb måste utföras av minst en mekaniker.', sant: true,
        skal: 'Dubbel linje mellan Utför och Jobb.' },
      { text: 'Attributet datum hör till mekanikern.', sant: false,
        skal: 'datum hänger på relationen Utför. Det gäller kombinationen mekaniker och jobb, inte personen.' },
      { text: 'En bil måste ha en ägare.', sant: true,
        skal: 'Dubbel linje mellan Äger och Bil.' },
      { text: 'En kund måste äga minst en bil.', sant: false,
        skal: 'Linjen vid Kund är enkel. En kund utan bil är tillåten.' },
      { text: 'Ett jobb kan gälla flera bilar.', sant: false,
        skal: 'Gäller är 1:N från Bil. Varje jobb hör till exakt en bil.' },
      { text: 'Ett jobb måste gälla en bil.', sant: true,
        skal: 'Dubbel linje mellan Gäller och Jobb.' },
      { text: 'Två bilar kan ha samma registreringsnummer.', sant: false,
        skal: 'regNr är understruket och därmed unikt.' },
      { text: 'En mekaniker kan sakna jobb helt.', sant: true,
        skal: 'Enkel linje vid Mekaniker i relationen Utför.' },
      { text: 'När modellen blir tabeller kommer Utför att bli en egen tabell.', sant: true,
        skal: 'Varje M:N-relation blir en egen tabell, och relationens attribut — här datum — följer med dit.' }
    ]
  }
];

/* ------------------------------------------------------------------ */
/* 2. ER till relationsschema – tentans uppgift 2                      */
/* ------------------------------------------------------------------ */

/* I facit betyder fk: true att attributet är en främmande nyckel. Dess
   NAMN rättas inte — vad man kallar OwnerName eller PersonName är en
   smaksak, medan det som räknas är att det finns och vad det pekar på. */

window.SYSB23.erschema = [
  {
    id: 'es-4',
    titel: 'Person och bil',
    kalla: 'Övningshäftet uppgift 4',
    ledtext: 'En person kan äga noll eller flera bilar. Varje bil ägs av exakt en person.',
    diagram: {
      bredd: 600, hojd: 200,
      entiteter: [
        { id: 'p', namn: 'Person', x: 100, y: 110 },
        { id: 'c', namn: 'Car',    x: 480, y: 110 }
      ],
      relationer: [{ id: 'o', namn: 'Owns', x: 290, y: 110 }],
      attribut: [
        { av: 'p', namn: 'Name',    x: 55,  y: 45, nyckel: true },
        { av: 'p', namn: 'Address', x: 160, y: 30 },
        { av: 'p', namn: 'Salary',  x: 45,  y: 175 },
        { av: 'c', namn: 'LicenseNumber', x: 520, y: 45, nyckel: true },
        { av: 'c', namn: 'Brand',   x: 405, y: 30 },
        { av: 'c', namn: 'Speed',   x: 540, y: 175 }
      ],
      linjer: [
        { fran: 'p', till: 'o', etikett: '1' },
        { fran: 'o', till: 'c', etikett: 'N', total: true }
      ]
    },
    facit: [
      { namn: 'Person', attribut: ['Name', 'Address', 'Salary'], nyckel: ['Name'] },
      { namn: 'Car', attribut: ['LicenseNumber', 'Brand', 'Speed'], nyckel: ['LicenseNumber'],
        fkAntal: 1, fkMot: ['Person'] }
    ],
    forklaring:
      'En binär 1:N-relation ger ingen egen tabell. **Ett-sidans nyckel läggs ' +
      'som främmande nyckel på många-sidan** — Person.Name hamnar i Car. ' +
      'Att göra tvärtom går inte: en person kan äga flera bilar, och en kolumn ' +
      'rymmer ett värde.'
  },

  {
    id: 'es-5',
    titel: 'Lärare och kurs',
    kalla: 'Övningshäftet uppgift 5',
    ledtext:
      'Varje kurs har exakt en kursansvarig lärare. Utöver det undervisar ' +
      'lärare på kurser, och en kurs kan ha flera lärare.',
    diagram: {
      bredd: 620, hojd: 300,
      entiteter: [
        { id: 't', namn: 'Teacher', x: 110, y: 150 },
        { id: 'c', namn: 'Course',  x: 500, y: 150 }
      ],
      relationer: [
        { id: 'r', namn: 'Responsible', x: 305, y: 70, bredd: 110 },
        { id: 'te', namn: 'Teach',      x: 305, y: 230 }
      ],
      attribut: [
        { av: 't', namn: 'EmployeeNo', x: 60,  y: 85, nyckel: true },
        { av: 't', namn: 'Name',       x: 55,  y: 225 },
        { av: 't', namn: 'Salary',     x: 165, y: 265 },
        { av: 'c', namn: 'CourseCode', x: 555, y: 85, nyckel: true },
        { av: 'c', namn: 'Name',       x: 560, y: 225 },
        { av: 'c', namn: 'Credits',    x: 450, y: 265 }
      ],
      linjer: [
        { fran: 't', till: 'r',  etikett: '1' },
        { fran: 'r', till: 'c',  etikett: 'N', total: true },
        { fran: 't', till: 'te', etikett: 'M' },
        { fran: 'te', till: 'c', etikett: 'N' }
      ]
    },
    facit: [
      { namn: 'Teacher', attribut: ['EmployeeNo', 'Name', 'Salary'], nyckel: ['EmployeeNo'] },
      { namn: 'Course', attribut: ['CourseCode', 'Name', 'Credits'], nyckel: ['CourseCode'],
        fkAntal: 1, fkMot: ['Teacher'] },
      { namn: 'Teach', attribut: [], nyckel: [], fkAntal: 2, fkMot: ['Teacher', 'Course'],
        nyckelArFk: true }
    ],
    forklaring:
      'Två relationer med olika kardinalitet ger olika resultat. ' +
      '**Responsible är 1:N** och blir en främmande nyckel i Course. ' +
      '**Teach är M:N** och blir en egen tabell, vars nyckel är de två ' +
      'främmande nycklarna tillsammans.'
  },

  {
    id: 'es-6',
    titel: 'Anställd med chef och e-post',
    kalla: 'Övningshäftet uppgift 6',
    ledtext:
      'En anställd kan ha en chef, som också är anställd. En anställd kan ha ' +
      'flera e-postadresser.',
    diagram: {
      bredd: 620, hojd: 280,
      entiteter: [{ id: 'e', namn: 'Employee', x: 300, y: 150, bredd: 120 }],
      relationer: [{ id: 's', namn: 'Supervise', x: 470, y: 70, bredd: 104 }],
      attribut: [
        { av: 'e', namn: 'EmployeeNo', x: 120, y: 70, nyckel: true },
        { av: 'e', namn: 'Name',       x: 120, y: 230 },
        { av: 'e', namn: 'Salary',     x: 300, y: 245 },
        { av: 'e', namn: 'Email',      x: 480, y: 230, flervard: true }
      ],
      linjer: [
        { fran: 'e', till: 's', etikett: '1' },
        { fran: 's', till: 'e', etikett: 'N' }
      ]
    },
    facit: [
      { namn: 'Employee', attribut: ['EmployeeNo', 'Name', 'Salary'], nyckel: ['EmployeeNo'],
        fkAntal: 1, fkMot: ['Employee'] },
      { namn: 'EmployeeEmail', attribut: ['Email'], nyckel: ['Email'],
        fkAntal: 1, fkMot: ['Employee'], nyckelArFk: true }
    ],
    forklaring:
      'Två saker på en gång. **Den rekursiva 1:N-relationen** lägger en ' +
      'främmande nyckel till samma tabell — chefens EmployeeNo hamnar som en ' +
      'extra kolumn i Employee. Och **ett flervärt attribut kan aldrig bli en ' +
      'kolumn**: det blir en egen tabell, med ägarens nyckel plus värdet som ' +
      'sammansatt nyckel.'
  },

  {
    id: 'es-7',
    titel: 'Hotell och rum',
    kalla: 'Övningshäftet uppgift 7',
    ledtext:
      'Ett rumsnummer är bara unikt inom sitt hotell. Rum 101 finns på nästan ' +
      'varje hotell.',
    diagram: {
      bredd: 620, hojd: 210,
      entiteter: [
        { id: 'h', namn: 'Hotel', x: 110, y: 115 },
        { id: 'r', namn: 'Room',  x: 500, y: 115, svag: true }
      ],
      relationer: [{ id: 'c', namn: 'Contains', x: 305, y: 115, bredd: 104, identifierande: true }],
      attribut: [
        { av: 'h', namn: 'Name',   x: 70,  y: 45, nyckel: true },
        { av: 'h', namn: 'Rating', x: 60,  y: 180 },
        { av: 'r', namn: 'RoomNumber', x: 540, y: 45, delnyckel: true },
        { av: 'r', namn: 'Price',  x: 545, y: 180 }
      ],
      linjer: [
        { fran: 'h', till: 'c', etikett: '1' },
        { fran: 'c', till: 'r', etikett: 'N', total: true }
      ]
    },
    facit: [
      { namn: 'Hotel', attribut: ['Name', 'Rating'], nyckel: ['Name'] },
      { namn: 'Room', attribut: ['RoomNumber', 'Price'], nyckel: ['RoomNumber'],
        fkAntal: 1, fkMot: ['Hotel'], nyckelArFk: true }
    ],
    forklaring:
      'En **svag entitetstyp** får ägarens nyckel som främmande nyckel, och ' +
      'primärnyckeln blir **kombinationen** av den och den partiella ' +
      'identifieraren: {RoomNumber, HotelName}. Varken rumsnumret eller ' +
      'hotellnamnet är unikt för sig — bara paret.'
  },

  {
    id: 'es-8',
    titel: 'Anställd och avdelning',
    kalla: 'Övningshäftet uppgift 8',
    ledtext:
      'En avdelning identifieras av sitt namn OCH sin adress tillsammans — ' +
      'två avdelningar kan heta samma sak på olika orter. En anställd kan ' +
      'arbeta på flera avdelningar, med ett antal timmar på var och en.',
    diagram: {
      bredd: 640, hojd: 260,
      entiteter: [
        { id: 'e', namn: 'Employee',   x: 110, y: 130, bredd: 116 },
        { id: 'd', namn: 'Department', x: 520, y: 130, bredd: 130 }
      ],
      relationer: [{ id: 'w', namn: 'Work', x: 315, y: 130 }],
      attribut: [
        { av: 'e', namn: 'EmployeeNo', x: 65,  y: 55, nyckel: true },
        { av: 'e', namn: 'Name',       x: 55,  y: 205 },
        { av: 'e', namn: 'Address',    x: 185, y: 225 },
        { av: 'd', namn: 'Name',       x: 480, y: 50, nyckel: true },
        { av: 'd', namn: 'Address',    x: 590, y: 55, nyckel: true },
        { av: 'd', namn: 'Description', x: 555, y: 210 },
        { av: 'w', namn: 'Hours',      x: 315, y: 40 }
      ],
      linjer: [
        { fran: 'e', till: 'w', etikett: 'M' },
        { fran: 'w', till: 'd', etikett: 'N' }
      ]
    },
    facit: [
      { namn: 'Employee', attribut: ['EmployeeNo', 'Name', 'Address'], nyckel: ['EmployeeNo'] },
      { namn: 'Department', attribut: ['Name', 'Address', 'Description'], nyckel: ['Name', 'Address'] },
      { namn: 'Work', attribut: ['Hours'], nyckel: [],
        fkAntal: 3, fkMot: ['Employee', 'Department', 'Department'], nyckelArFk: true }
    ],
    forklaring:
      'Kopplingstabellen ärver **hela** den sammansatta nyckeln. Departments ' +
      'nyckel är {Name, Address}, alltså två kolumner, så Work får tre ' +
      'främmande nyckelkolumner: EmployeeNo, DeptName och DeptAddress. ' +
      'Relationens eget attribut Hours följer med — det gäller kombinationen ' +
      'anställd och avdelning, inte någon av dem för sig.'
  },

  {
    id: 'es-9',
    titel: 'Konsultbolaget',
    kalla: 'Övningshäftet uppgift 9',
    ledtext:
      'Den svåraste i häftet: sju relationer faller ut. Ta den bit för bit — ' +
      'en relationstyp i taget, och fråga varje gång om den är 1:N, M:N, ' +
      'rekursiv eller ett flervärt attribut.',
    diagram: {
      bredd: 660, hojd: 400,
      entiteter: [
        { id: 'o', namn: 'Office',   x: 95,  y: 60 },
        { id: 'e', namn: 'Employee', x: 330, y: 150, bredd: 116 },
        { id: 't', namn: 'Team',     x: 330, y: 340 },
        { id: 'c', namn: 'Customer', x: 570, y: 150, bredd: 116 }
      ],
      relationer: [
        { id: 'at',  namn: 'At',      x: 210, y: 105, bredd: 66 },
        { id: 'wo',  namn: 'Work',    x: 330, y: 245, bredd: 74 },
        { id: 'se',  namn: 'Serves',  x: 452, y: 150, bredd: 82 },
        { id: 'fam', namn: 'Family',  x: 570, y: 300, bredd: 84 }
      ],
      attribut: [
        { av: 'o', namn: 'Address', x: 60,  y: 15, nyckel: true },
        { av: 'o', namn: 'Name',    x: 175, y: 20 },
        { av: 'e', namn: 'EmployeeNo', x: 235, y: 90, nyckel: true },
        { av: 'e', namn: 'Name',    x: 415, y: 95 },
        { av: 'e', namn: 'Certificate', x: 200, y: 190, flervard: true },
        { av: 't', namn: 'TeamNo',  x: 235, y: 385, nyckel: true },
        { av: 't', namn: 'Name',    x: 425, y: 385 },
        { av: 'c', namn: 'CustomerNumber', x: 585, y: 80, nyckel: true },
        { av: 'c', namn: 'DiscountClass',  x: 600, y: 215 },
        { av: 'wo', namn: 'Hours',  x: 215, y: 268 }
      ],
      linjer: [
        { fran: 'o', till: 'at',  etikett: '1' },
        { fran: 'at', till: 'e',  etikett: 'N' },
        { fran: 'e', till: 'wo',  etikett: 'M' },
        { fran: 'wo', till: 't',  etikett: 'N' },
        { fran: 'e', till: 'se',  etikett: '1' },
        { fran: 'se', till: 'c',  etikett: 'N' },
        { fran: 'c', till: 'fam', etikett: 'M' },
        { fran: 'fam', till: 'c', etikett: 'N' }
      ]
    },
    facit: [
      { namn: 'Office', attribut: ['Address', 'Name'], nyckel: ['Address'] },
      { namn: 'Employee', attribut: ['EmployeeNo', 'Name'], nyckel: ['EmployeeNo'],
        fkAntal: 1, fkMot: ['Office'] },
      { namn: 'Team', attribut: ['TeamNo', 'Name'], nyckel: ['TeamNo'] },
      { namn: 'Customer', attribut: ['CustomerNumber', 'DiscountClass'], nyckel: ['CustomerNumber'],
        fkAntal: 1, fkMot: ['Employee'] },
      { namn: 'Work', attribut: ['Hours'], nyckel: [],
        fkAntal: 2, fkMot: ['Employee', 'Team'], nyckelArFk: true },
      { namn: 'FamilyRelation', attribut: [], nyckel: [],
        fkAntal: 2, fkMot: ['Customer', 'Customer'], nyckelArFk: true },
      { namn: 'EmployeeCertificate', attribut: ['Certificate'], nyckel: ['Certificate'],
        fkAntal: 1, fkMot: ['Employee'], nyckelArFk: true }
    ],
    forklaring:
      'Sju relationer, och varje regel används minst en gång: två vanliga ' +
      'entiteter, två 1:N som blir främmande nycklar, en M:N med attribut, ' +
      'en **rekursiv M:N** (Family, kund mot kund) som blir en egen tabell ' +
      'med två främmande nycklar till samma tabell, och ett flervärt ' +
      'attribut som blir EmployeeCertificate.'
  }
];

/* ------------------------------------------------------------------ */
/* 3. Normalisering – tentans uppgift 3                                */
/* ------------------------------------------------------------------ */

/* Kursens egna uppgifter, avlästa spaltvis ur övningshäftet.
   bara-form: uppgift 10 frågar bara efter högsta normalform.
   Facit räknas ut av js/normalform.js. */

window.SYSB23.normaliseringsuppgifter = [
  {
    grupp: 'Uppgift 10', baraForm: true,
    kalla: 'Övningshäftet uppgift 10 — bara högsta normalform',
    relationer: [
      ['ABC',    [['A','B'],['A','C']]],
      ['ABC',    [['A','B']]],
      ['ABCDE',  [['AB','C'],['C','D'],['D','E']]],
      ['ABCDE',  [['A','B'],['B','AC'],['C','DE']]],
      ['ABCDE',  [['A','B'],['B','A'],['C','D'],['D','E']]],
      ['ABCDE',  [['AB','C'],['C','A'],['C','B'],['A','D'],['B','E']]],
      ['ABCDEF', [['A','B'],['B','C'],['D','E'],['E','C']]],
      ['ABC',    [['A','C'],['B','C']]],
      ['ABCD',   [['AB','C'],['B','D']]],
      ['ABC',    [['AB','C']]],
      ['ABC',    [['A','BC'],['B','AC'],['C','A']]],
      ['ABCDEFG',[['A','B'],['B','AC'],['C','D'],['D','EF'],['E','G']]],
      ['ABCDEFG',[['A','B'],['B','AC'],['C','BDE'],['D','CFG']]],
      ['ABCD',   [['A','BC'],['B','AC'],['C','BA']]],
      ['ABCDEF', [['AB','C'],['C','D'],['D','E'],['E','F']]],
      ['ABCD',   []]
    ]
  },
  {
    grupp: 'Uppgift 11',
    kalla: 'Övningshäftet uppgift 11',
    relationer: [
      ['ABC',    [['A','B'],['B','C']]],
      ['ABCD',   [['A','B'],['B','C'],['C','BD']]],
      ['ABCDE',  [['AB','C'],['A','D'],['B','E']]],
      ['ABCDE',  [['A','B'],['B','AC'],['C','BDE']]],
      ['ABCDEF', [['AB','CD'],['D','E']]],
      ['AB',     []],
      ['ABCDEF', [['AB','C'],['C','ABD'],['D','EF']]],
      ['ABCDEF', [['AB','C'],['C','D'],['D','EF']]],
      ['ABC',    [['A','B'],['B','C'],['C','B']]],
      ['ABCDEF', [['A','D'],['B','E'],['C','F']]],
      ['ABCDE',  [['AB','C'],['C','A'],['C','B'],['A','D'],['B','E']]],
      ['ABC',    [['A','C']]]
    ]
  },
  {
    grupp: 'Uppgift 12',
    kalla: 'Övningshäftet uppgift 12',
    relationer: [
      ['ABCD',    [['A','B'],['C','D']]],
      ['ABCD',    [['A','B'],['B','C']]],
      ['ABCDE',   [['ABC','D'],['AB','E']]],
      ['ABCDEFG', [['AB','C'],['C','ABD'],['D','CE'],['E','F'],['F','G']]],
      ['ABCDEFG', [['AB','C'],['C','ABD'],['D','CE'],['E','F']]],
      ['ABCDE',   [['AB','C'],['A','D'],['B','E']]],
      ['ABCDEF',  [['A','B'],['B','AC'],['C','DE']]],
      ['ABCDE',   [['A','B'],['B','CD'],['D','E']]],
      ['ABCD',    [['A','B'],['B','C'],['D','C']]],
      ['ABCDEF',  [['AB','C'],['D','EF']]],
      ['ABCDEF',  [['AB','C'],['C','A'],['C','B'],['C','D'],['D','CE'],['E','DF']]],
      ['ABCD',    [['AB','C'],['C','D'],['D','C']]],
      ['ABCDE',   [['AB','C'],['C','D'],['D','CE']]],
      ['ABCDEF',  [['A','B'],['B','AC'],['C','DE'],['D','CF']]]
    ]
  },
  {
    grupp: 'Uppgift 13',
    kalla: 'Övningshäftet uppgift 13',
    relationer: [
      ['ABCD',   [['A','B'],['B','C']]],
      ['ABC',    [['AB','C'],['C','A']]],
      ['ABCDE',  [['AB','C'],['C','A'],['C','B'],['C','DE']]],
      ['ABCDEF', [['AB','C'],['C','D'],['B','E'],['E','F']]],
      ['ABCDE',  [['A','B'],['C','B'],['D','B'],['E','B']]],
      ['ABCDEF', [['AB','C'],['C','D'],['D','E'],['F','E']]],
      ['ABCDEF', [['AB','C'],['C','ABD'],['D','EF']]],
      ['ABCDEF', [['AB','C'],['C','D'],['D','CE'],['E','DF']]],
      ['ABCD',   [['AB','C'],['AB','D'],['D','C']]],
      ['ABCDEF', [['AB','C'],['C','D'],['A','E'],['B','F']]],
      ['ABCDEF', [['AB','C'],['C','D'],['D','CF'],['F','E']]],
      ['ABCDEF', [['AB','C'],['C','DE'],['D','CEF']]]
    ]
  }
];
