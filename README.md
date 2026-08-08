# SYSB23 Plugg

Ett lokalt pluggverktyg för kursen SYSB23. Innehållet bygger på det faktiska kursmaterialet
i `sysb23-kursmaterial/` och på de två gamla tentorna från HT24.

Inga internetanrop, inga externa beroenden. All statistik sparas lokalt i din webbläsare.

---

## Starta

### Alternativ 1 – lokal webbserver (rekommenderas)

```bash
node serve.js
```

Öppna sedan <http://localhost:8080>. Avsluta med `Ctrl+C`.

### Alternativ 2 – öppna filen direkt

Dubbelklicka på `index.html`.

> **Obs:** vissa webbläsare blockerar lokala `.js`-filer vid `file://`. Syns rubriken men
> inget innehåll — använd alternativ 1.

---

## De sju lägena

| Läge | Vad det gör |
|------|-------------|
| **Hem** | Nedräkning till nästa tenta, veckans pass, var du står och vad du bör fokusera på |
| **Läs** | Kompendiet kapitel för kapitel med lästmarkering, plus ordlista och sökning |
| **Öva** | En fråga i taget med direkt facit. Inga minuspoäng. Fel besvarade frågor återkommer oftare |
| **Prov** | Tentans riktiga poängsystem, inklusive minuspoäng, med betygsomräkning |
| **Essä** | Skriv eget svar, kryssa i checklistan, jämför med modellsvar. Utkast sparas automatiskt |
| **Statistik** | Utveckling över tid, resultat per ämne, export och import |
| **Schema** | Hela terminens kalender, alla tentor och terminens faser |

### Tangentbord i Öva och Prov

- `1`–`9` väljer alternativ
- `Enter` bekräftar, och går vidare när facit visas
- `→` går till nästa fråga

---

## Innehåll

**Strategi och ekonomistyrning** (tenta 21 september)
- 10 kapitel kompendium, ca 100 minuters läsning
- 58 frågor: flervalsfrågor, essäfrågor och en räkneövning
- 67 ordlisteposter

**Databaser** (tenta 17 november)
- 10 kapitel kompendium, ca 108 minuters läsning
- 97 frågor: flervalsfrågor, öppna frågor och 22 praktiska övningar i SQL,
  ER-modellering, normalisering och DDL
- 35 ordlisteposter

**Kalendern** täcker alla sju delkurser: 59 pass, 5 ordinarie tentor och 5 omtentor.

---

## Antaganden som gjorts

Dessa är medvetna val där materialet inte gav ett entydigt svar. De står också
utskrivna i appen där de påverkar något.

- **Kalenderdata.** Avläst mot TimeEdit 1 augusti 2026. Kontrollera alltid aktuell vecka
  själv — salar och tider kan ändras. Delkurserna i november hade färre pass inlagda vid
  avläsningen än de sannolikt får.
- **Provformat, Strategi.** 10 flervalsfrågor à 6 p (−1 p vid fel, 0 p obesvarad) plus
  2 essäfrågor à 20 p. Detta är verifierat mot de två HT24-tentorna.
- **Provformat, Databaser.** ANTAGANDE: exakt poängsättning framgår inte av materialet,
  som bara anger att "question format may vary". Appen använder 20 frågor à 5 p utan
  minuspoäng, fördelade över tentans fyra angivna områden. Betygsskalan U–A är dock
  densamma enligt kursplanen.
- **Poängsättning av essäfrågor.** Fritextsvar kan inte rättas automatiskt, så poängen
  bygger på din egen skattning: "hade med det mesta" = 20 p, "delvis" = 10 p,
  "missade" = 0 p.
- **Ämnesbedömning.** Ett ämne bedöms först efter minst tre svar. Färre än så visas som
  "påbörjat".
- **Flera frågor är hämtade ordagrant** från de två gamla tentorna. Det står i så fall
  i förklaringen.

---

## Lägga till eget innehåll

All data ligger skild från gränssnittskoden i `data/`. Du behöver aldrig röra `js/`.

### Ny flervalsfråga

Lägg till i valfri `data/questions-*.js`:

```js
{
  id: 'str-eko-99',            // måste vara unikt
  delkurs: 'strategi',         // 'strategi' eller 'databaser'
  amne: 'str-ekonomistyrning', // ett id ur data/topics.js
  typ: 'flerval',
  svarighet: 2,                // 1 = grund, 2 = standard, 3 = klurig
  fraga: 'Frågetexten här?',
  kod: 'SELECT * FROM Employee;',   // valfritt, visas som kodblock
  alternativ: ['Alt 1', 'Alt 2', 'Alt 3', 'Alt 4'],
  ratt: 1,                     // index i listan ovan (0 = första)
  forklaringar: [              // MÅSTE vara lika många som alternativen
    'Varför 1 är fel …',
    'Varför 2 är rätt …',
    'Varför 3 är fel …',
    'Varför 4 är fel …'
  ],
  forklaring: 'Sammanfattande kommentar överst i facit.',
  kalla: 'EkonomistyrningAJK_Kap13.pdf kap. 1'
}
```

### Ny essäfråga eller praktisk övning

```js
{
  id: 'str-mal-99',
  delkurs: 'strategi',
  amne: 'str-mal',
  typ: 'oppen',                // 'oppen' = essä, 'praktisk' = SQL/modellering
  svarighet: 3,
  fraga: 'Frågetexten här.',
  modellsvar: 'Det fullständiga modellsvaret …',
  nyckelpunkter: [             // blir checklistan i Essä-läget
    'Punkt 1',
    'Punkt 2'
  ],
  steg: ['Steg 1 …', 'Steg 2 …'],   // valfritt, för praktiska övningar
  kalla: 'Kaplan_Norton_1993.pdf'
}
```

### Nytt kompendiekapitel

Lägg till i `data/kompendium-strategi-2.js` (eller skapa en ny fil och länka in den
i `index.html`):

```js
{
  id: 'str-k11',
  nr: 11,
  titel: 'Kapitlets titel',
  ingress: 'En mening om vad kapitlet innehåller.',
  lastid: 9,                        // ungefärlig lästid i minuter
  amnen: ['str-ekonomistyrning'],   // kopplar kapitlet till frågeämnen
  avsnitt: [
    { rubrik: 'Avsnittsrubrik', text: 'Brödtexten …' }
  ],
  nyckelbegrepp: ['Begrepp: förklaring'],
  tentakoppling: 'Varför detta är viktigt på tentan.'
}
```

**Textmarkering som stöds i `text`:**

| Markering | Resultat |
|---|---|
| `**fet**` | fet stil |
| `*kursiv*` | kursiv stil |
| `` `kod` `` | kod inline |
| rad som börjar med `- ` | punktlista |
| rad som börjar med `1. ` | numrerad lista |
| rad som börjar med `> ` | markerad ruta |
| rader inom ` ``` ` | kodblock |
| rader som börjar och slutar med `\|` | tabell |

Tomrad separerar stycken.

### Uppdatera kalendern

Redigera `data/kalender.js`. Där finns `tentor`, `pass`, `terminsfaser` och
`kalenderNoteringar`. Datumformatet är `'ÅÅÅÅ-MM-DD'`.

---

## Filstruktur

```
index.html                  Enda sidan
serve.js                    Lokal webbserver (node serve.js)
css/style.css               All formgivning

js/ui.js                    Hjälpfunktioner: textmarkering, datum, nedräkning
js/store.js                 Lagring i localStorage
js/hem.js                   Hemvyn
js/las.js                   Kompendium, ordlista, sökning
js/ova.js                   Öva- och Prov-lägena
js/essa.js                  Essä-läget
js/statistik.js             Statistikvyn
js/schema.js                Kalendervyn
js/app.js                   Navigation, delkursväxling, datakontroll

data/topics.js                      Delkurser och ämnen
data/kalender.js                    Alla pass, tentor och terminsfaser
data/ordlista.js                    Ordlista, båda delkurserna
data/kompendium-strategi-1.js       Strategi, kapitel 1–5
data/kompendium-strategi-2.js       Strategi, kapitel 6–10
data/kompendium-databaser-1.js      Databaser, kapitel 1–5
data/kompendium-databaser-2.js      Databaser, kapitel 6–10
data/questions-db-sql.js            Intro, SQL-grunder, aggregat
data/questions-db-joins.js          Joins, subqueries, mängdoperationer
data/questions-db-design.js         ER, transformation, normalisering, DDL
data/questions-db-app.js            JDBC, säkerhet, metadata
data/questions-strategi-*.js        Strategi och ekonomistyrning

sysb23-kursmaterial/        Originalmaterialet (rörs inte av appen)
```

Appen kontrollerar automatiskt vid start att id:n är unika, att ämnen finns, att `ratt`
pekar på ett giltigt alternativ, att antalet förklaringar stämmer och att alla datum är
giltiga. Problem loggas i webbläsarens utvecklarkonsol (F12).

---

## Din statistik

Allt sparas under nyckeln `sysb23-plugg-v2` i webbläsarens `localStorage` — alltså bara på
den här enheten och i den här webbläsaren. Ingenting skickas någonstans.

Använd **Exportera till fil** i Statistik-vyn för en säkerhetskopia, och **Importera** för
att flytta över den till en annan enhet eller webbläsare.

Öppnar du appen både via `file://` och via `http://localhost:8080` räknas de som två olika
ursprung och får var sin separata statistik. Håll dig till ett av sätten.
