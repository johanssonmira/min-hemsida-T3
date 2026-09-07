/* =========================================================================
   sql-ovningar.js – nio nivåer med lektion och övningar.

   Nivåindelningen följer SQL-föreläsningens ordning, och lektionerna tar
   upp det föreläsaren själv lyfter fram: att SQL är deklarativt, skillnaden
   mellan skrivordning och utförandeordning, att COUNT(kolumn) hoppar över
   NULL, att självjoin går fel på två bestämda sätt, och att underfrågor
   avråds när en join gör samma jobb.

   Varje övning körs mot en riktig databas och rättas på resultatet, inte
   på texten. Alla vägar fram duger därför — join eller underfråga spelar
   ingen roll så länge raderna blir desamma.

   Fält:
     db        vilken databas övningen gäller ('sjukhus' eller 'tenta')
     ordning   true när ORDER BY är en del av uppgiften och radordningen rättas
     kontroll  fråga som körs EFTER svaret, för övningar som ändrar data
     tenta     true för uppgifter tagna ur en riktig tenta
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.sqlNivaer = [
  {
    niva: 1,
    namn: 'SELECT, FROM, WHERE',
    kort: 'Hämta kolumner, filtrera rader, sortera.',
    lektion:
      'En fråga börjar alltid med vad du vill se och varifrån:\n\n' +
      '```\nSELECT EmpName, EmpSalary FROM Employee;\n```\n\n' +
      '**SQL är deklarativt.** Det är den viktigaste skillnaden mot Java, och ' +
      'föreläsningen inleder med den. I Java är du imperativ: du beskriver steg ' +
      'för steg *hur* något ska göras — loopa igenom listan, jämför varje element. ' +
      'I SQL beskriver du bara *vad* du vill ha. "Ge mig alla patienter i Lund." ' +
      'Hur databasen hittar dem, i vilken ordning den läser raderna, vilket index ' +
      'den använder — det bestämmer frågeoptimeraren. Två frågor som är skrivna ' +
      'helt olika kan köras på exakt samma sätt.\n\n' +
      '`SELECT *` ger alla kolumner. Praktiskt när du snabbt vill titta, men i ' +
      'skarpa frågor räknar man upp kolumnerna, så att frågan inte plötsligt ' +
      'ändrar beteende den dag tabellen får en ny kolumn.\n\n' +
      '**AS ger alias.** Både kolumner och uttryck kan döpas om:\n\n' +
      '```\nSELECT EmpName AS Namn, EmpSalary / 12 AS Manadslon FROM Employee;\n```\n\n' +
      'Ett uttryck **utan** alias får inget namn alls — SQL Server skriver ' +
      '"(No column name)". Ge därför alltid uttryck ett alias.\n\n' +
      '**WHERE** filtrerar rader med `=`, `<>` (eller `!=`), `<`, `>`, `<=`, `>=`. ' +
      'Observera att `=` betyder *jämförelse*, inte tilldelning som i Java. ' +
      'Villkoret prövas rad för rad, och bara de rader där det blir sant kommer med.\n\n' +
      '**Text jämförs lexikografiskt**, alltså i bokstavsordning tecken för tecken. ' +
      'Jämförelsen går från vänster till höger: första tecknet i vardera strängen ' +
      'jämförs, och skiljer de sig avgör det. Är de lika går man vidare till nästa. ' +
      "Därför är `'S2' > 'S1'` sant, och `'Max' > 'Mary Sue'` är sant eftersom x " +
      'kommer efter r på tredje positionen.\n\n' +
      '**DISTINCT** tar bort dubblettrader. **ORDER BY** sorterar, `ASC` är ' +
      'standard och `DESC` vänder. Flera kolumner går bra: `ORDER BY Brand ASC, ' +
      'Price DESC` sorterar först på märke och inom varje märke på pris.\n\n' +
      'Man *kan* skriva `ORDER BY 3` för tredje kolumnen, men föreläsningen avråder: ' +
      'frågan blir svårläst och går sönder så snart kolumnordningen ändras.\n\n' +
      '> **Skrivordning:** SELECT → FROM → WHERE → GROUP BY → HAVING → ORDER BY.\n' +
      '> **Utförandeordning:** FROM → WHERE → GROUP BY → aggregat → HAVING → SELECT → ORDER BY.\n\n' +
      'Skillnaden är inte akademisk. Den förklarar varför ett alias du hittat på i ' +
      'SELECT inte går att använda i WHERE (WHERE körs först) men däremot i ' +
      'ORDER BY (som körs sist). Kom tillbaka hit när du blir förvånad på nivå 4.'
  },

  {
    niva: 2,
    namn: 'Predikat, NULL och TOP',
    kort: 'AND, OR, BETWEEN, IN, LIKE, IS NULL och de vanligaste funktionerna.',
    lektion:
      '**AND** kräver att båda villkoren stämmer, **OR** att minst ett gör det, ' +
      '**NOT** vänder på villkoret. De får blandas — men då avgör parenteserna ' +
      'vad som hör ihop:\n\n' +
      "```\nWHERE (EmpAddress = 'Lund' OR EmpAddress = 'Eslöv')\n  AND EmpSalary > 20000;\n```\n\n" +
      'Utan parenteser binder AND hårdare än OR, och frågan betyder något helt ' +
      'annat än du tänkt. Sätt alltid parenteser när AND och OR står tillsammans.\n\n' +
      '**BETWEEN** är inklusive i båda ändar. `Price BETWEEN 30000 AND 50000` ' +
      'tar med både 30 000 och 50 000.\n\n' +
      '**IN** ersätter en kedja av OR: `WHERE UnitID IN (1, 3)`.\n\n' +
      '**LIKE** matchar textmönster. `%` står för noll eller fler tecken, `_` för ' +
      "exakt ett. `LIKE 'A%'` hittar allt som börjar på A, `LIKE '%son'` allt som " +
      "slutar på son, `LIKE '_o%'` allt där andra bokstaven är o.\n\n" +
      '**NULL är det mest missförstådda i hela SQL.** NULL betyder att ett värde ' +
      'saknas — inte noll, inte tom sträng, och inte samma sak som `null` i Java. ' +
      'Det gör att `WHERE EmployeeID = NULL` **alltid är falskt**, även för rader ' +
      'som faktiskt saknar värde. Ingenting är lika med det okända, inte ens det ' +
      'okända. Du måste skriva:\n\n' +
      '```\nWHERE EmployeeID IS NULL\nWHERE EmployeeID IS NOT NULL\n```\n\n' +
      '**Konstanter i SELECT.** Du kan välja ut ett fast värde: ' +
      "`SELECT LicenseNo, 'Tjanstebil' AS Typ FROM Car` sätter texten på varje rad. " +
      'Användbart för att märka varifrån raderna kommer i en UNION.\n\n' +
      '**Textfunktioner.** `LOWER()` och `UPPER()` byter skiftläge, ' +
      '`SUBSTRING(text, start, längd)` klipper ut en bit, och `ISNULL(kolumn, ' +
      'ersättning)` sätter in något annat där kolumnen är tom: ' +
      "`ISNULL(EmpAddress, 'Okand')`.\n\n" +
      '**Strängar sätts ihop med `+`** i SQL Server: `EmpNo + \' - \' + EmpName`.\n\n' +
      '**Begränsa antalet rader** med `SELECT TOP 3 ...`, eller med `SET ROWCOUNT 3` ' +
      'före frågan och `SET ROWCOUNT 0` efteråt för att släppa spärren igen.\n\n' +
      '> Verkstaden förstår T-SQL. `TOP`, `ISNULL`, `LEN` och `+` som ' +
      'sammanfogning fungerar här precis som i SQL Server, trots att motorn ' +
      'under huven är SQLite. Skriv som du skulle skriva på tentan.'
  },

  {
    niva: 3,
    namn: 'Aggregatfunktioner',
    kort: 'COUNT, SUM, AVG, MIN och MAX — och vad de gör med NULL.',
    lektion:
      'Aggregatfunktioner räknar ihop många rader till ett enda värde:\n\n' +
      '- `COUNT(*)` — antal rader\n' +
      '- `COUNT(kolumn)` — antal rader där kolumnen **inte** är NULL\n' +
      '- `SUM`, `AVG`, `MIN`, `MAX`\n\n' +
      'Skillnaden mellan de två COUNT-varianterna är en klassisk tentafälla. ' +
      'I bilregistret finns sju bilar, men bara fem har en ägare. Då ger ' +
      '`COUNT(*)` sju och `COUNT(EmployeeID)` fem. Frågan "hur många bilar finns" ' +
      'och frågan "hur många bilar har en ägare" är alltså två olika frågor, och ' +
      'skillnaden ligger i ett enda tecken.\n\n' +
      '**Alla aggregat utom COUNT(\\*) hoppar över NULL.** `AVG(EmpSalary)` räknar ' +
      'bara på rader som faktiskt har en lön — den behandlar inte saknade löner ' +
      'som nollor. Det är rätt beteende, men lätt att glömma, och det är skillnaden ' +
      'mellan ett medelvärde som betyder något och ett som är utspätt med nollor.\n\n' +
      'Ge alltid resultatet ett alias, annars saknar kolumnen namn:\n\n' +
      '```\nSELECT AVG(EmpSalary) AS Medellon FROM Employee;\n```'
  },

  {
    niva: 4,
    namn: 'GROUP BY och HAVING',
    kort: 'Räkna per grupp, och filtrera på gruppernas resultat.',
    lektion:
      '**GROUP BY** delar raderna i högar och kör aggregatet en gång per hög:\n\n' +
      '```\nSELECT Brand, SUM(Price) AS Totalt\nFROM Car\nGROUP BY Brand;\n```\n\n' +
      'Regeln som orsakar flest felmeddelanden i hela kursen: **varje kolumn i ' +
      'SELECT måste antingen stå i GROUP BY eller ligga inuti en aggregatfunktion.** ' +
      'Skriver du `SELECT Brand, LicenseNo, SUM(Price) ... GROUP BY Brand` får du ' +
      'fel, och det är logiskt: gruppen "volvo" innehåller flera registreringsnummer, ' +
      'så vilket av dem skulle databasen visa?\n\n' +
      'En bieffekt värd att känna till: **GROUP BY tar bort dubbletter.** ' +
      '`SELECT EmpName FROM Employee GROUP BY EmpName` ger samma resultat som ' +
      '`SELECT DISTINCT EmpName FROM Employee`. Skillnaden är att GROUP BY kan ' +
      'räkna samtidigt.\n\n' +
      '**WHERE eller HAVING?** Det här är den andra stora förvirringen, och ' +
      'utförandeordningen ger hela svaret:\n\n' +
      '> FROM → **WHERE** → GROUP BY → aggregat → **HAVING** → SELECT → ORDER BY\n\n' +
      'WHERE körs **innan** grupperingen och filtrerar enskilda rader. HAVING körs ' +
      '**efter** och filtrerar färdiga grupper. Därför kan WHERE aldrig innehålla ' +
      'ett aggregat — när WHERE körs finns inga grupper att räkna på ännu. Och ' +
      'därför kan HAVING göra det.\n\n' +
      '```\nSELECT Brand, COUNT(*) AS Antal\nFROM Car\nWHERE Price > 20000      -- sållar bort billiga bilar först\nGROUP BY Brand\nHAVING COUNT(*) > 1;     -- behåller bara märken med fler än en kvar\n```\n\n' +
      'Läs den frågan i utförandeordning en gång till, så sitter skillnaden.'
  },

  {
    niva: 5,
    namn: 'Joins',
    kort: 'Sätt ihop tabeller — inklusive de två sätten att misslyckas med självjoin.',
    lektion:
      'En **kartesisk produkt** parar ihop varenda rad med varenda rad. Sex ' +
      'anställda och tre enheter ger arton rader, varav de flesta är nonsens. ' +
      'Det är vad du får om du glömmer villkoret:\n\n' +
      '```\nSELECT * FROM Employee, Unit;   -- 18 rader, mest skräp\n```\n\n' +
      '**INNER JOIN** är den kartesiska produkten med ett villkor som behåller de ' +
      'meningsfulla raderna:\n\n' +
      '```\nSELECT e.EmpName, u.UnitName\nFROM Employee AS e\nINNER JOIN Unit AS u ON e.UnitID = u.UnitID;\n```\n\n' +
      'Den äldre syntaxen `FROM Employee e, Unit u WHERE e.UnitID = u.UnitID` ' +
      'betyder exakt samma sak. Föreläsningen visar båda, men JOIN-formen är ' +
      'tydligare eftersom kopplingsvillkoret hålls isär från filtreringen.\n\n' +
      '**Tetajoin** är en join på något annat än likhet — `ON a.Price > b.Price` ' +
      'till exempel.\n\n' +
      '**Självjoin** kopplar en tabell till sig själv, och det finns två sätt att ' +
      'göra det fel. Föreläsningen ägnar tre slides åt dem.\n\n' +
      'Första felet: `WHERE EmpAddress = EmpAddress`. Det är alltid sant, eftersom ' +
      'kolumnen jämförs med sig själv på samma rad. Du får hela tabellen tillbaka.\n\n' +
      'Andra felet: du tar in tabellen två gånger med alias, men glömmer utesluta ' +
      'raden från att matcha sig själv. Alla får träff, för alla bor på samma ' +
      'adress som sig själva.\n\n' +
      'Rätt version behöver **båda** villkoren:\n\n' +
      '```\nSELECT a.EmpNo, a.EmpName, a.EmpAddress\nFROM Employee AS a\nINNER JOIN Employee AS b\n  ON a.EmpAddress = b.EmpAddress\n  AND a.EmpNo <> b.EmpNo;      -- utan den här raden är allt fel\n```\n\n' +
      '**OUTER JOIN** behåller rader som saknar motpart. `LEFT JOIN` behåller allt ' +
      'i vänstertabellen och fyller på med NULL där det inte finns någon match — ' +
      'så hittar du bilarna utan ägare. `RIGHT JOIN` gör tvärtom, `FULL JOIN` båda.\n\n' +
      'Att fråga efter "de som saknar" är just ett OUTER JOIN plus `IS NULL`:\n\n' +
      '```\nSELECT c.LicenseNo\nFROM Car AS c\nLEFT JOIN Employee AS e ON c.EmployeeID = e.EmployeeID\nWHERE e.EmployeeID IS NULL;\n```'
  },

  {
    niva: 6,
    namn: 'Underfrågor',
    kort: 'En fråga inuti en annan — och när man hellre ska låta bli.',
    lektion:
      'Föreläsningen börjar med **en fråga per fråga**: du kan alltid dela upp ett ' +
      'problem och köra två frågor efter varandra. "Vem bor på samma adress som ' +
      'PP1?" blir först "vilken adress har PP1?" och sedan "vilka bor där?".\n\n' +
      'En **underfråga** slår ihop de två stegen till ett:\n\n' +
      '```\nSELECT PatientNo, PatientName\nFROM Patient\nWHERE PatientAddress =\n      (SELECT PatientAddress FROM Patient WHERE PatientNo = \'PP1\');\n```\n\n' +
      'Den inre frågan körs först och lämnar över sitt svar till den yttre. ' +
      'Returnerar den **en** rad kan du jämföra med `=`. Returnerar den **flera** ' +
      'måste du använda `IN`, annars blir det fel.\n\n' +
      '> Föreläsningen är uttrycklig på en punkt: **underfrågor avråds när en join ' +
      'kan göra samma jobb.** Skälet är läsbarhet — underfrågor kan nästlas hur ' +
      'djupt som helst och blir snabbt omöjliga att följa. Men ibland behövs de.\n\n' +
      'En **korrelerad** underfråga är något annat och svårare. Den refererar till ' +
      'den yttre frågan och måste därför köras om för varje rad:\n\n' +
      '```\nSELECT e.EmpName, e.EmpSalary\nFROM Employee AS e\nWHERE e.EmpSalary =\n      (SELECT MAX(EmpSalary) FROM Employee\n       WHERE UnitID = e.UnitID);      -- e.UnitID kommer utifrån\n```\n\n' +
      'Läs den inifrån och ut: för varje anställd, ta reda på den högsta lönen på ' +
      '*hans eller hennes* enhet, och behåll raden om personen har just den lönen. ' +
      'Det är den formen som gör korrelerade frågor kraftfulla — och långsamma.'
  },

  {
    niva: 7,
    namn: 'EXISTS och mängdoperationer',
    kort: 'Finns det någon rad? Och att räkna med mängder.',
    lektion:
      '**EXISTS** frågar bara en sak: gav underfrågan någon rad alls? Den bryr sig ' +
      'inte om *vad* som kom tillbaka, så `SELECT *` inuti är helt i sin ordning.\n\n' +
      '```\nSELECT IllnessName\nFROM Illness AS i\nWHERE NOT EXISTS\n      (SELECT * FROM Suffers AS s WHERE s.IllnessID = i.IllnessID);\n```\n\n' +
      'Det där är "sjukdomar som ingen har". **NOT EXISTS är standardsvaret på ' +
      'frågor som börjar med "vilka saknar"**, och det är värt att känna igen ' +
      'mönstret direkt.\n\n' +
      'Föreläsningen jämför tre sätt att uttrycka samma sak — `IN`, `EXISTS` och ' +
      '`INNER JOIN`. De ger ofta samma resultat. Skillnaden är att EXISTS kan ' +
      'sluta leta så snart den hittat en rad, medan IN bygger klart hela listan ' +
      'först.\n\n' +
      '**Mängdoperationerna** arbetar på hela resultat i stället för på rader:\n\n' +
      '- `UNION` — allt ur båda, **utan dubbletter**\n' +
      '- `UNION ALL` — allt ur båda, dubbletter kvar\n' +
      '- `INTERSECT` — bara det som finns i båda\n' +
      '- `EXCEPT` — det som finns i den första men inte i den andra\n\n' +
      '`EXCEPT` är det andra svaret på "vilka saknar", och ofta det kortaste.\n\n' +
      '**Unionskompatibilitet** är kravet: de två frågorna måste ha **lika många ' +
      'kolumner**, i samma ordning, med jämförbara datatyper. Annars får du ' +
      'felmeddelandet om att alla frågor som kombineras med UNION, INTERSECT eller ' +
      'EXCEPT måste ha lika många uttryck. Kolumn**namnen** behöver däremot inte ' +
      'stämma — det är den första frågans namn som används.'
  },

  {
    niva: 8,
    namn: 'Att ändra data, och vyer',
    kort: 'INSERT, UPDATE, DELETE och sparade frågor.',
    lektion:
      'Hittills har du bara läst. De tre satser som ändrar heter INSERT, UPDATE ' +
      'och DELETE, och de tillhör DML — Data Manipulation Language — till skillnad ' +
      'från SELECT som hör till DQL och CREATE TABLE som hör till DDL.\n\n' +
      '```\nINSERT INTO Illness (IllnessName) VALUES (\'Migraine\');\n\n' +
      'UPDATE Employee SET EmpSalary = EmpSalary * 1.1 WHERE UnitID = 1;\n\n' +
      'DELETE FROM Car WHERE EmployeeID IS NULL;\n```\n\n' +
      '> **UPDATE och DELETE utan WHERE ändrar varenda rad i tabellen.** Det finns ' +
      'ingen ångerknapp. Vanan att skriva WHERE-satsen först och sedan gå tillbaka ' +
      'och sätta dit UPDATE är inte överdriven försiktighet.\n\n' +
      'Här kan du testa fritt — databasen byggs om före varje körning, så ingenting ' +
      'du gör kan förstöra något.\n\n' +
      'När du sätter in en rad som pekar på en annan tabell behöver du dess nyckel. ' +
      'Kursens egen DDL löser det med en underfråga i stället för att gissa ett ' +
      'ID-nummer:\n\n' +
      '```\nINSERT INTO Car (LicenseNo, Brand, Price, EmployeeID)\nVALUES (\'C8\', \'volvo\', 45000,\n        (SELECT EmployeeID FROM Employee WHERE EmpNo = \'E6\'));\n```\n\n' +
      '**En vy är en sparad fråga** som beter sig som en tabell:\n\n' +
      '```\nCREATE VIEW RikaAnstallda AS\nSELECT EmpName, EmpSalary FROM Employee WHERE EmpSalary > 30000;\n\nSELECT * FROM RikaAnstallda;\n```\n\n' +
      'Vyn lagrar ingen data. Den kör sin fråga på nytt varje gång du använder den, ' +
      'så den är alltid aktuell. Nyttan är dels att slippa upprepa en komplicerad ' +
      'fråga, dels att kunna ge någon tillgång till en del av en tabell utan att ' +
      'ge tillgång till hela.'
  },

  {
    niva: 9,
    namn: 'Division — "alla"-frågan',
    kort: 'Den svåraste frågetypen, och de två sätten att lösa den.',
    lektion:
      'Relationsalgebrans **division** svarar på frågor av formen "vilka har ' +
      '**alla**?" — vilka studenter har läst alla kurser, vilka anställda har ' +
      'undersökt alla patienter. Föreläsningen kallar den varianten **EXISTS – ' +
      'Hard Mode**, och det är rimligt.\n\n' +
      'Svårigheten är att SQL inte har någon operator för det. Du måste bygga den ' +
      'själv, och det finns två vägar.\n\n' +
      '**Väg 1: räkna.** Om antalet kurser en student har läst är lika med det ' +
      'totala antalet kurser, har hon läst alla:\n\n' +
      '```\nSELECT s.StudentNo, s.Name\nFROM Student AS s\nINNER JOIN HasStudied AS hs ON s.StudentNo = hs.StudentNo\nGROUP BY s.StudentNo, s.Name\nHAVING COUNT(hs.Code) = (SELECT COUNT(*) FROM Course);\n```\n\n' +
      'Lättast att läsa, och den duger på tentan.\n\n' +
      '**Väg 2: dubbel NOT EXISTS.** Vänd på frågan. "Har läst alla kurser" är ' +
      'samma sak som **"det finns ingen kurs som hon inte har läst"**:\n\n' +
      '```\nSELECT StudentNo, Name\nFROM Student AS s\nWHERE NOT EXISTS\n      (SELECT * FROM Course AS c\n       WHERE NOT EXISTS\n             (SELECT * FROM HasStudied AS hs\n              WHERE hs.StudentNo = s.StudentNo\n                AND hs.Code = c.Code));\n```\n\n' +
      'Läs den utifrån och in:\n\n' +
      '1. Den innersta frågan: har *den här* studenten läst *den här* kursen?\n' +
      '2. `NOT EXISTS` runt den: den här kursen har studenten **inte** läst.\n' +
      '3. Den mellersta frågan letar alltså efter kurser studenten missat.\n' +
      '4. `NOT EXISTS` runt hela: det finns **inga** sådana kurser.\n' +
      '5. Alltså: studenten har läst allihop.\n\n' +
      'Den dubbla negationen är det som gör konstruktionen svår att läsa och lätt ' +
      'att skriva fel. Kan du bygga den utantill är du färdig med SQL-delen.\n\n' +
      '> Nedan ligger också de två SQL-uppgifterna från databastentorna HT25, ' +
      'ordagrant. De är värda 30 poäng styck.'
  }
];

window.SYSB23.sqlOvningar = [

  /* ---------------- Nivå 1: SELECT, FROM, WHERE ---------------- */
  {
    id: 'sq1-1', niva: 1, db: 'sjukhus',
    fraga: 'Visa alla kolumner för samtliga enheter på sjukhuset.',
    losning: 'SELECT * FROM Unit;',
    start: 'SELECT ',
    ledtrad: 'Stjärnan betyder alla kolumner.',
    forklaring: 'Tre enheter: General Surgery, Rehabilitation och Trauma.'
  },
  {
    id: 'sq1-2', niva: 1, db: 'sjukhus',
    fraga: 'Visa namnen på alla anställda.',
    losning: 'SELECT EmpName FROM Employee;',
    ledtrad: 'Bara en kolumn den här gången.',
    forklaring: 'Sex rader — men bara fyra olika namn. Två heter Anna och två heter Eva.'
  },
  {
    id: 'sq1-3', niva: 1, db: 'sjukhus',
    fraga: 'Visa namn och adress för alla patienter som bor i Lund.',
    losning: "SELECT PatientName, PatientAddress FROM Patient WHERE PatientAddress = 'Lund';",
    ledtrad: 'Textvärden omges av enkla citattecken.',
    forklaring:
      'Tre patienter bor i Lund. Notera att jämförelsen är skiftlägesokänslig här, ' +
      'precis som i SQL Server — även \'lund\' hade fungerat.'
  },
  {
    id: 'sq1-4', niva: 1, db: 'sjukhus',
    fraga: 'Visa varje förnamn som förekommer bland de anställda, men bara en gång per namn.',
    losning: 'SELECT DISTINCT EmpName FROM Employee;',
    ledtrad: 'Sex anställda, men färre än sex olika namn.',
    forklaring: 'DISTINCT tar bort dubbletterna: Anna, Eva, Hans och Peter blir kvar.'
  },
  {
    id: 'sq1-5', niva: 1, db: 'sjukhus', ordning: true,
    fraga: 'Visa namn och lön för alla anställda, sorterade med den högsta lönen först.',
    losning: 'SELECT EmpName, EmpSalary FROM Employee ORDER BY EmpSalary DESC;',
    ledtrad: 'ORDER BY med DESC. Den här övningen rättar även radordningen.',
    forklaring: 'Eva på Trauma tjänar 279 000 och hamnar överst. Hans tjänar minst.'
  },
  {
    id: 'sq1-6', niva: 1, db: 'sjukhus',
    fraga: 'Visa varje anställds namn och månadslön. Kalla kolumnerna Namn och Manadslon.',
    losning: 'SELECT EmpName AS Namn, EmpSalary / 12 AS Manadslon FROM Employee;',
    ledtrad: 'Lönerna är årslöner. Ett uttryck utan alias får inget kolumnnamn alls.',
    forklaring:
      'Uttryck i SELECT behöver alias — annars skriver SQL Server "(No column name)". ' +
      'Heltalsdivision ger heltal, vilket är väntat här.'
  },
  {
    id: 'sq1-7', niva: 1, db: 'sjukhus',
    fraga: 'Visa namnen på de anställda vars namn kommer efter "Eva" i bokstavsordning.',
    losning: "SELECT EmpName FROM Employee WHERE EmpName > 'Eva';",
    ledtrad: 'Jämförelseoperatorerna fungerar på text också.',
    forklaring:
      'Lexikografisk jämförelse, tecken för tecken från vänster. Hans och Peter ' +
      'kommer efter Eva; Anna kommer före.'
  },

  /* ---------------- Nivå 2: Predikat, NULL och TOP ---------------- */
  {
    id: 'sq2-1', niva: 2, db: 'sjukhus',
    fraga: 'Visa namn och lön för de anställda som tjänar mer än 30 000.',
    losning: 'SELECT EmpName, EmpSalary FROM Employee WHERE EmpSalary > 30000;',
    ledtrad: 'Rakt fram med >.',
    forklaring:
      'Fyra anställda: Peter 32 000, Anna 37 500, Eva 55 000 och Eva 279 000. ' +
      'Anna på 25 000 och Hans på 18 000 faller bort.'
  },
  {
    id: 'sq2-2', niva: 2, db: 'sjukhus',
    fraga: 'Visa registreringsnummer, märke och pris för de bilar som kostar mellan 30 000 och 50 000 kronor, gränserna inräknade.',
    losning: 'SELECT LicenseNo, Brand, Price FROM Car WHERE Price BETWEEN 30000 AND 50000;',
    ledtrad: 'BETWEEN tar med båda ändpunkterna.',
    forklaring: 'Fem bilar. Både 30 000 och 50 000 räknas in — det är just poängen med BETWEEN.'
  },
  {
    id: 'sq2-3', niva: 2, db: 'sjukhus',
    fraga: 'Visa namnen på alla patienter vars namn börjar på bokstaven A.',
    losning: "SELECT PatientName FROM Patient WHERE PatientName LIKE 'A%';",
    ledtrad: 'LIKE med jokertecknet %.',
    forklaring: 'Fyra av sex patienter heter Anna.'
  },
  {
    id: 'sq2-4', niva: 2, db: 'sjukhus',
    fraga: 'Visa registreringsnummer och märke för de bilar som inte tillhör någon anställd.',
    losning: 'SELECT LicenseNo, Brand FROM Car WHERE EmployeeID IS NULL;',
    ledtrad: 'EmployeeID = NULL fungerar inte. Fundera på varför innan du tittar på facit.',
    forklaring:
      'C1 och C6. Skälet till att `= NULL` inte fungerar är att ingenting är lika ' +
      'med det okända — inte ens ett annat okänt värde. Därför finns IS NULL.'
  },
  {
    id: 'sq2-5', niva: 2, db: 'sjukhus',
    fraga: 'Visa registreringsnummer för de bilar som HAR en ägare.',
    losning: 'SELECT LicenseNo FROM Car WHERE EmployeeID IS NOT NULL;',
    ledtrad: 'Motsatsen till förra övningen.',
    forklaring: 'Fem av sju bilar har en ägare.'
  },
  {
    id: 'sq2-6', niva: 2, db: 'sjukhus',
    fraga: 'Visa namn och adress för de anställda som bor i Lund eller Eslöv OCH tjänar mer än 20 000.',
    losning:
      "SELECT EmpName, EmpAddress, EmpSalary FROM Employee " +
      "WHERE (EmpAddress = 'Lund' OR EmpAddress = 'Eslöv') AND EmpSalary > 20000;",
    ledtrad: 'Parenteserna avgör allt här. AND binder hårdare än OR.',
    forklaring:
      'Tre anställda. Utan parenteserna hade frågan betytt "bor i Lund, ELLER bor ' +
      'i Eslöv och tjänar över 20 000" — vilket hade tagit med Anna på 25 000 men ' +
      'också ändrat innebörden helt.'
  },
  {
    id: 'sq2-7', niva: 2, db: 'sjukhus',
    fraga: 'Visa namnen på de patienter som tillhör enhet 1 eller enhet 3. Använd IN.',
    losning: 'SELECT PatientName FROM Patient WHERE UnitID IN (1, 3);',
    ledtrad: 'IN ersätter en kedja av OR.',
    forklaring: 'Fem patienter. IN (1, 3) betyder exakt samma sak som UnitID = 1 OR UnitID = 3.'
  },
  {
    id: 'sq2-8', niva: 2, db: 'sjukhus',
    fraga: 'Visa varje bils registreringsnummer och dess ägar-ID. Där bilen saknar ägare ska det stå 0 i stället för tomt. Kalla kolumnen Agare.',
    losning: 'SELECT LicenseNo, ISNULL(EmployeeID, 0) AS Agare FROM Car;',
    ledtrad: 'ISNULL(kolumn, ersättning) byter ut de tomma värdena.',
    forklaring:
      'ISNULL är SQL Servers funktion. Den ändrar inget i databasen — bara hur ' +
      'resultatet visas.'
  },
  {
    id: 'sq2-9', niva: 2, db: 'sjukhus', ordning: true,
    fraga: 'Visa de tre dyraste bilarnas registreringsnummer och pris, dyrast först. Använd SQL Servers TOP.',
    losning: 'SELECT TOP 3 LicenseNo, Price FROM Car ORDER BY Price DESC;',
    ledtrad: 'TOP står direkt efter SELECT, före kolumnerna.',
    forklaring:
      'TOP finns inte i SQLite — verkstaden översätter den till LIMIT åt dig. ' +
      'Poängen är att du ska skriva som på tentan, inte som motorn vill ha det.'
  },
  {
    id: 'sq2-10', niva: 2, db: 'sjukhus',
    fraga: 'Visa varje sjukdoms namn i gemener, och dess fyra första tecken. Kalla kolumnerna Gemener och Kort.',
    losning: 'SELECT LOWER(IllnessName) AS Gemener, SUBSTRING(IllnessName, 1, 4) AS Kort FROM Illness;',
    ledtrad: 'SUBSTRING(text, startposition, längd). Första tecknet är position 1, inte 0.',
    forklaring:
      'Att SUBSTRING räknar från 1 och inte från 0 är värt att komma ihåg — det ' +
      'skiljer sig från hur du är van att indexera i Java.'
  },

  /* ---------------- Nivå 3: Aggregatfunktioner ---------------- */
  {
    id: 'sq3-1', niva: 3, db: 'sjukhus',
    fraga: 'Hur många patienter finns registrerade? Svara med en enda kolumn.',
    losning: 'SELECT COUNT(*) AS Antal FROM Patient;',
    ledtrad: 'COUNT(*) räknar rader.',
    forklaring: 'Sex patienter.'
  },
  {
    id: 'sq3-2', niva: 3, db: 'sjukhus',
    fraga: 'Vad är medellönen bland de anställda?',
    losning: 'SELECT AVG(EmpSalary) AS Medellon FROM Employee;',
    ledtrad: 'Svaret blir ett decimaltal — det är väntat.',
    forklaring:
      'Eva på Trauma med sina 279 000 drar upp snittet rejält. Ett medelvärde ' +
      'säger inte allt om en skev fördelning.'
  },
  {
    id: 'sq3-3', niva: 3, db: 'sjukhus',
    fraga: 'Visa den lägsta och den högsta lönen på samma resultatrad, i den ordningen.',
    losning: 'SELECT MIN(EmpSalary) AS Lagst, MAX(EmpSalary) AS Hogst FROM Employee;',
    ledtrad: 'Två aggregat i samma SELECT ger två kolumner på en rad.',
    forklaring: '18 000 och 279 000.'
  },
  {
    id: 'sq3-4', niva: 3, db: 'sjukhus',
    fraga: 'Visa i samma resultatrad hur många bilar det finns totalt, och hur många av dem som har en ägare. Kalla kolumnerna Totalt och MedAgare.',
    losning: 'SELECT COUNT(*) AS Totalt, COUNT(EmployeeID) AS MedAgare FROM Car;',
    ledtrad: 'Skillnaden mellan COUNT(*) och COUNT(kolumn) är hela uppgiften.',
    forklaring:
      'Sju och fem. COUNT(*) räknar rader, COUNT(kolumn) räknar rader där kolumnen ' +
      'inte är NULL. Ett enda tecken skiljer två olika frågor åt, och det här är ' +
      'en klassisk tentafälla.'
  },
  {
    id: 'sq3-5', niva: 3, db: 'sjukhus',
    fraga: 'Vad är det sammanlagda värdet av alla bilar?',
    losning: 'SELECT SUM(Price) AS Totalvarde FROM Car;',
    ledtrad: 'SUM över hela tabellen, utan gruppering.',
    forklaring: '310 000 kronor.'
  },

  /* ---------------- Nivå 4: GROUP BY och HAVING ---------------- */
  {
    id: 'sq4-1', niva: 4, db: 'sjukhus',
    fraga: 'Visa varje bilmärke tillsammans med det sammanlagda värdet av bilarna i det märket.',
    losning: 'SELECT Brand, SUM(Price) AS Totalt FROM Car GROUP BY Brand;',
    ledtrad: 'GROUP BY på det du vill gruppera efter.',
    forklaring: 'Tre märken: audi, saab och volvo.'
  },
  {
    id: 'sq4-2', niva: 4, db: 'sjukhus',
    fraga: 'Visa varje bilmärke och hur många bilar det finns av det märket.',
    losning: 'SELECT Brand, COUNT(*) AS Antal FROM Car GROUP BY Brand;',
    ledtrad: 'Samma mönster som förra, men med COUNT.',
    forklaring: 'saab har tre, volvo och audi har två vardera.'
  },
  {
    id: 'sq4-3', niva: 4, db: 'sjukhus',
    fraga: 'Visa bara de bilmärken som det finns fler än två bilar av, tillsammans med antalet.',
    losning: 'SELECT Brand, COUNT(*) AS Antal FROM Car GROUP BY Brand HAVING COUNT(*) > 2;',
    ledtrad: 'Villkoret gäller gruppen, inte den enskilda raden. Vilken av WHERE och HAVING är det då?',
    forklaring:
      'Bara saab. Villkoret måste ligga i HAVING eftersom det innehåller ett ' +
      'aggregat — när WHERE körs finns ännu inga grupper att räkna på.'
  },
  {
    id: 'sq4-4', niva: 4, db: 'sjukhus',
    fraga: 'Visa varje enhets UnitID och medellönen på enheten.',
    losning: 'SELECT UnitID, AVG(EmpSalary) AS Medellon FROM Employee GROUP BY UnitID;',
    ledtrad: 'Gruppera på UnitID.',
    forklaring: 'Tre grupper. Enhet 3 sticker ut — där finns bara Eva med sina 279 000.'
  },
  {
    id: 'sq4-5', niva: 4, db: 'sjukhus',
    fraga: 'Visa UnitID och antal anställda för de enheter som har fler än två anställda, men räkna bara med anställda som tjänar mer än 20 000.',
    losning:
      'SELECT UnitID, COUNT(*) AS Antal FROM Employee ' +
      'WHERE EmpSalary > 20000 GROUP BY UnitID HAVING COUNT(*) > 2;',
    ledtrad: 'Två filter i samma fråga. Ett gäller rader, ett gäller grupper.',
    forklaring:
      'Enhet 1. WHERE sållar bort Hans innan grupperingen, HAVING sållar bland de ' +
      'färdiga grupperna. Läs frågan i utförandeordning: FROM, WHERE, GROUP BY, ' +
      'aggregat, HAVING, SELECT.'
  },
  {
    id: 'sq4-6', niva: 4, db: 'sjukhus',
    fraga: 'Visa varje förnamn bland de anställda och hur många som heter så.',
    losning: 'SELECT EmpName, COUNT(*) AS Antal FROM Employee GROUP BY EmpName;',
    ledtrad: 'GROUP BY tar bort dubbletter på köpet.',
    forklaring:
      'Anna 2, Eva 2, Hans 1, Peter 1. Utan COUNT hade GROUP BY EmpName gett ' +
      'exakt samma rader som SELECT DISTINCT EmpName — skillnaden är att GROUP BY ' +
      'kan räkna samtidigt.'
  },

  /* ---------------- Nivå 5: Joins ---------------- */
  {
    id: 'sq5-1', niva: 5, db: 'sjukhus',
    fraga: 'Visa varje anställds namn tillsammans med namnet på den enhet personen arbetar på.',
    losning:
      'SELECT e.EmpName, u.UnitName FROM Employee AS e ' +
      'INNER JOIN Unit AS u ON e.UnitID = u.UnitID;',
    ledtrad: 'Kopplingen går via UnitID.',
    forklaring: 'Sex rader — en per anställd. Alias gör frågan kortare att skriva och lättare att läsa.'
  },
  {
    id: 'sq5-2', niva: 5, db: 'sjukhus',
    fraga: 'Visa varje patients namn tillsammans med enhetens namn och adress.',
    losning:
      'SELECT p.PatientName, u.UnitName, u.UnitAddress FROM Patient AS p ' +
      'INNER JOIN Unit AS u ON p.UnitID = u.UnitID;',
    ledtrad: 'Samma mönster som förra övningen, men från Patient.',
    forklaring: 'Sex rader.'
  },
  {
    id: 'sq5-3', niva: 5, db: 'sjukhus',
    fraga: 'Visa alla bilars registreringsnummer tillsammans med ägarens namn. Bilar utan ägare ska också vara med.',
    losning:
      'SELECT c.LicenseNo, e.EmpName FROM Car AS c ' +
      'LEFT JOIN Employee AS e ON c.EmployeeID = e.EmployeeID;',
    ledtrad: '"Ska också vara med" är signalordet för OUTER JOIN.',
    forklaring:
      'Sju rader. C1 och C6 får NULL i namnkolumnen — en INNER JOIN hade tappat ' +
      'dem helt, vilket är precis den sortens tyst radförlust man ska se upp med.'
  },
  {
    id: 'sq5-4', niva: 5, db: 'sjukhus',
    fraga: 'Visa registreringsnumret för de bilar som saknar ägare — men lös det med en join, inte med IS NULL på Car.EmployeeID.',
    losning:
      'SELECT c.LicenseNo FROM Car AS c ' +
      'LEFT JOIN Employee AS e ON c.EmployeeID = e.EmployeeID ' +
      'WHERE e.EmployeeID IS NULL;',
    ledtrad: 'Gör en LEFT JOIN först och titta sedan på vilka rader som inte fick någon match.',
    forklaring:
      'C1 och C6. Mönstret "LEFT JOIN plus IS NULL på högertabellen" är standardsvaret ' +
      'på alla frågor av typen "vilka saknar motpart".'
  },
  {
    id: 'sq5-5', niva: 5, db: 'sjukhus',
    fraga: 'Visa namn och adress för de anställda som bor på samma adress som minst en ANNAN anställd.',
    losning:
      'SELECT a.EmpNo, a.EmpName, a.EmpAddress FROM Employee AS a ' +
      'INNER JOIN Employee AS b ON a.EmpAddress = b.EmpAddress AND a.EmpNo <> b.EmpNo;',
    ledtrad: 'Ta in tabellen två gånger med olika alias. Och glöm inte villkoret som hindrar en rad från att matcha sig själv.',
    forklaring:
      'Fyra rader. Utan `a.EmpNo <> b.EmpNo` matchar varje person sig själv och ' +
      'hela tabellen kommer med — det är föreläsningens "How to Fail at Self Join". ' +
      'Jämför du i stället EmpAddress med EmpAddress på samma rad blir villkoret ' +
      'alltid sant, vilket är det andra sättet att gå bet.'
  },
  {
    id: 'sq5-6', niva: 5, db: 'sjukhus',
    fraga: 'Visa varje patients namn tillsammans med namnet på de sjukdomar patienten har just nu.',
    losning:
      'SELECT p.PatientName, i.IllnessName FROM Patient AS p ' +
      'INNER JOIN Suffers AS s ON p.PatientID = s.PatientID ' +
      'INNER JOIN Illness AS i ON s.IllnessID = i.IllnessID;',
    ledtrad: 'Tre tabeller. Kopplingstabellen Suffers ligger i mitten.',
    forklaring:
      'Nio rader. En trevägsjoin ser lång ut men följer samma mönster som en ' +
      'tvåvägs — varje JOIN tar med en tabell till och anger hur den hänger ihop.'
  },
  {
    id: 'sq5-7', niva: 5, db: 'sjukhus',
    fraga: 'Visa namnen på de anställda som undersöker en patient som heter Anna.',
    losning:
      "SELECT DISTINCT e.EmpName FROM Employee AS e " +
      "INNER JOIN Examines AS x ON e.EmployeeID = x.EmployeeID " +
      "INNER JOIN Patient AS p ON x.PatientID = p.PatientID " +
      "WHERE p.PatientName = 'Anna';",
    ledtrad: 'Flera anställda undersöker flera Anna. Tänk på dubbletter.',
    forklaring:
      'Utan DISTINCT hade samma anställd dykt upp en gång per Anna hon undersöker. ' +
      'Fyra av sex patienter heter Anna, så det märks.'
  },
  {
    id: 'sq5-8', niva: 5, db: 'sjukhus',
    fraga: 'Visa namn och pris för de bilpar där den första bilen är dyrare än den andra och båda är av märket saab. Visa båda registreringsnumren.',
    losning:
      "SELECT a.LicenseNo AS Dyrare, b.LicenseNo AS Billigare FROM Car AS a " +
      "INNER JOIN Car AS b ON a.Price > b.Price " +
      "WHERE a.Brand = 'saab' AND b.Brand = 'saab';",
    ledtrad: 'Joinvillkoret behöver inte vara likhet. Det kallas tetajoin.',
    forklaring:
      'En tetajoin är en join på något annat än =. Här blir det två rader: C2 är ' +
      'dyrare än både C1 och C7.'
  },
  {
    id: 'sq5-9', niva: 5, db: 'sjukhus',
    fraga: 'Visa hur många rader en kartesisk produkt mellan Employee och Unit ger. Svara med en enda kolumn.',
    losning: 'SELECT COUNT(*) AS Antal FROM Employee, Unit;',
    ledtrad: 'Kommatecken mellan tabellerna och inget villkor alls.',
    forklaring:
      'Sex anställda gånger tre enheter blir arton rader, varav de flesta är ' +
      'nonsens. Det är exakt det du får om du glömmer joinvillkoret — och skälet ' +
      'till att en join alltid ska ha ett ON.'
  },
  {
    id: 'sq5-10', niva: 5, db: 'sjukhus',
    fraga: 'Visa varje enhets namn och antalet anställda på enheten.',
    losning:
      'SELECT u.UnitName, COUNT(e.EmployeeID) AS Antal FROM Unit AS u ' +
      'LEFT JOIN Employee AS e ON u.UnitID = e.UnitID GROUP BY u.UnitName;',
    ledtrad: 'Join och gruppering i samma fråga.',
    forklaring:
      'Tre rader. Med LEFT JOIN och COUNT(e.EmployeeID) skulle en enhet utan ' +
      'anställda få nollan rätt — hade du skrivit COUNT(*) hade den fått 1.'
  },
  {
    id: 'sq5-11', niva: 5, db: 'tenta',
    fraga: 'Visa varje students namn tillsammans med namnet på de kurser hen har läst och betyget.',
    losning:
      'SELECT s.Name, c.Name AS Kurs, hs.Grade FROM Student AS s ' +
      'INNER JOIN HasStudied AS hs ON s.StudentNo = hs.StudentNo ' +
      'INNER JOIN Course AS c ON hs.Code = c.Code;',
    ledtrad: 'Trevägsjoin igen, nu i tentans databas. Båda tabellerna har en kolumn som heter Name — alias behövs.',
    forklaring:
      'Fem rader. Gary saknas helt eftersom han inte läst någonting — en INNER ' +
      'JOIN släpper inte igenom rader utan motpart.'
  },

  /* ---------------- Nivå 6: Underfrågor ---------------- */
  {
    id: 'sq6-1', niva: 6, db: 'sjukhus',
    fraga: 'Visa namn och lön för de anställda som tjänar mer än genomsnittet.',
    losning: 'SELECT EmpName, EmpSalary FROM Employee WHERE EmpSalary > (SELECT AVG(EmpSalary) FROM Employee);',
    ledtrad: 'Den inre frågan ger ett enda värde, så du kan jämföra med >.',
    forklaring:
      'Bara Eva på Trauma. Genomsnittet är knappt 74 000, och hennes 279 000 drar ' +
      'upp det så mycket att ingen annan når över.'
  },
  {
    id: 'sq6-2', niva: 6, db: 'sjukhus',
    fraga: 'Visa patientnummer och namn för de patienter som bor på samma adress som patient PP1.',
    losning:
      "SELECT PatientNo, PatientName FROM Patient " +
      "WHERE PatientAddress = (SELECT PatientAddress FROM Patient WHERE PatientNo = 'PP1');",
    ledtrad: 'Först: vilken adress har PP1? Sedan: vilka bor där?',
    forklaring:
      'Tre patienter, PP1 själv inräknad. Det här är föreläsningens "en fråga per ' +
      'fråga" hopslaget till en enda.'
  },
  {
    id: 'sq6-3', niva: 6, db: 'sjukhus',
    fraga: 'Visa namn och lön för den eller de anställda som tjänar mest på sin egen enhet.',
    losning:
      'SELECT e.EmpName, e.EmpSalary FROM Employee AS e ' +
      'WHERE e.EmpSalary = (SELECT MAX(EmpSalary) FROM Employee WHERE UnitID = e.UnitID);',
    ledtrad: 'Den inre frågan behöver veta vilken enhet den yttre raden tillhör.',
    forklaring:
      'Tre rader, en per enhet. Det här är en korrelerad underfråga: den refererar ' +
      'till e.UnitID från den yttre frågan och måste därför köras om för varje rad.'
  },
  {
    id: 'sq6-4', niva: 6, db: 'sjukhus',
    fraga: 'Visa namnen på de patienter som har minst en sjukdom registrerad i Suffers. Använd IN.',
    losning: 'SELECT PatientName FROM Patient WHERE PatientID IN (SELECT PatientID FROM Suffers);',
    ledtrad: 'Den inre frågan ger flera värden, så = fungerar inte.',
    forklaring:
      'Fem av sex patienter. När underfrågan kan ge fler än en rad måste du använda ' +
      'IN i stället för =.'
  },
  {
    id: 'sq6-5', niva: 6, db: 'sjukhus',
    fraga: 'Visa namnen på de anställda som INTE äger någon bil.',
    losning: 'SELECT EmpName FROM Employee WHERE EmployeeID NOT IN (SELECT EmployeeID FROM Car WHERE EmployeeID IS NOT NULL);',
    ledtrad: 'NOT IN — men var försiktig, för Car innehåller NULL i just den kolumnen.',
    forklaring:
      'Peter. Och här ligger en fälla: hade du utelämnat `IS NOT NULL` i den inre ' +
      'frågan skulle NOT IN jämföra mot NULL och ge **noll rader**, eftersom ' +
      'jämförelser med det okända aldrig blir sanna. Det är en av de vanligaste ' +
      'tysta buggarna i SQL.'
  },
  {
    id: 'sq6-6', niva: 6, db: 'tenta',
    fraga: 'Visa kurskod och namn för de kurser som student S1 har läst.',
    losning:
      "SELECT Code, Name FROM Course WHERE Code IN " +
      "(SELECT Code FROM HasStudied WHERE StudentNo = 'S1');",
    ledtrad: 'Vilka koder finns i HasStudied för S1?',
    forklaring: 'C1 Databases och C2 Java.'
  },
  {
    id: 'sq6-7', niva: 6, db: 'tenta',
    fraga: 'Visa studentnummer och namn för de studenter som är äldre än student S4.',
    losning:
      "SELECT StudentNo, Name FROM Student " +
      "WHERE Age > (SELECT Age FROM Student WHERE StudentNo = 'S4');",
    ledtrad: 'S4 är Gary. Hur gammal är han?',
    forklaring:
      'Ingen. Gary är 33 och äldst av alla fyra — ett tomt resultat är rätt svar ' +
      'här. Halva det här villkoret dyker upp igen i uppsamlingstentans uppgift 4.'
  },

  /* ---------------- Nivå 7: EXISTS och mängdoperationer ---------------- */
  {
    id: 'sq7-1', niva: 7, db: 'sjukhus',
    fraga: 'Visa namnen på de sjukdomar som ingen patient har just nu.',
    losning:
      'SELECT IllnessName FROM Illness AS i ' +
      'WHERE NOT EXISTS (SELECT * FROM Suffers AS s WHERE s.IllnessID = i.IllnessID);',
    ledtrad: '"Vilka saknar" är nästan alltid NOT EXISTS.',
    forklaring:
      'Chickenpox. EXISTS bryr sig bara om huruvida underfrågan gav någon rad alls, ' +
      'aldrig om vad den gav — därför är SELECT * inuti helt i sin ordning.'
  },
  {
    id: 'sq7-2', niva: 7, db: 'sjukhus',
    fraga: 'Visa namnen på de enheter som har minst en patient.',
    losning:
      'SELECT UnitName FROM Unit AS u ' +
      'WHERE EXISTS (SELECT * FROM Patient AS p WHERE p.UnitID = u.UnitID);',
    ledtrad: 'Samma mönster som förra, utan NOT.',
    forklaring: 'Alla tre enheter har patienter.'
  },
  {
    id: 'sq7-3', niva: 7, db: 'sjukhus',
    fraga: 'Visa ID för de sjukdomar som förekommer i HasSuffered men inte i Suffers. Använd EXCEPT.',
    losning: 'SELECT IllnessID FROM HasSuffered EXCEPT SELECT IllnessID FROM Suffers;',
    ledtrad: 'EXCEPT ger det som finns i den första frågan men inte i den andra.',
    forklaring:
      'Tomt resultat — varje sjukdom någon har haft är också en någon har nu. ' +
      'Ett tomt resultat är ett svar, inte ett fel.'
  },
  {
    id: 'sq7-4', niva: 7, db: 'sjukhus',
    fraga: 'Visa ID för de sjukdomar som förekommer både i Suffers och i HasSuffered. Använd INTERSECT.',
    losning: 'SELECT IllnessID FROM Suffers INTERSECT SELECT IllnessID FROM HasSuffered;',
    ledtrad: 'INTERSECT ger snittet.',
    forklaring: 'Fyra sjukdomar finns i båda tabellerna.'
  },
  {
    id: 'sq7-5', niva: 7, db: 'sjukhus',
    fraga: 'Visa en lista med alla namn i sjukhuset — både anställda och patienter — där varje rad också visar om namnet kommer från Employee eller Patient. Kalla kolumnerna Namn och Kalla.',
    losning:
      "SELECT EmpName AS Namn, 'Employee' AS Kalla FROM Employee " +
      "UNION SELECT PatientName, 'Patient' FROM Patient;",
    ledtrad: 'En konstant i SELECT märker varifrån raden kommer.',
    forklaring:
      'UNION tar bort dubbletter, så de två Anna bland de anställda blir en rad. ' +
      'Vill du ha kvar dubbletterna använder du UNION ALL. Lägg också märke till ' +
      'att kolumnnamnen bara behöver anges i den första frågan.'
  },
  {
    id: 'sq7-6', niva: 7, db: 'sjukhus',
    fraga: 'Visa namnen på de patienter som har haft minst en sjukdom som de INTE har nu.',
    losning:
      'SELECT DISTINCT p.PatientName FROM Patient AS p ' +
      'INNER JOIN HasSuffered AS h ON p.PatientID = h.PatientID ' +
      'WHERE NOT EXISTS (SELECT * FROM Suffers AS s ' +
      'WHERE s.PatientID = h.PatientID AND s.IllnessID = h.IllnessID);',
    ledtrad: 'Den inre frågan måste matcha på BÅDE patient och sjukdom.',
    forklaring:
      'Två patienter. Det som gör uppgiften svår är att villkoret gäller ett par ' +
      'av värden, inte ett enda — glömmer du ena halvan får du fel svar utan att ' +
      'något felmeddelande dyker upp.'
  },
  {
    id: 'sq7-7', niva: 7, db: 'tenta',
    fraga: 'Visa koden för de kurser som student S1 har läst men inte student S2. Använd EXCEPT.',
    losning:
      "SELECT Code FROM HasStudied WHERE StudentNo = 'S1' " +
      "EXCEPT SELECT Code FROM HasStudied WHERE StudentNo = 'S2';",
    ledtrad: 'Två frågor mot samma tabell, med EXCEPT emellan.',
    forklaring:
      'C2. S1 har läst C1 och C2, S2 har läst C3 och C1 — kvar blir C2. Det här ' +
      'är halva omtentans uppgift 4, som du får i sin helhet på nivå 9.'
  },
  {
    id: 'sq7-8', niva: 7, db: 'tenta',
    fraga: 'Visa studentnummer och namn för de studenter som inte har läst någon kurs alls.',
    losning:
      'SELECT StudentNo, Name FROM Student AS s ' +
      'WHERE NOT EXISTS (SELECT * FROM HasStudied AS hs WHERE hs.StudentNo = s.StudentNo);',
    ledtrad: 'Samma "vilka saknar"-mönster som med sjukdomarna.',
    forklaring: 'S4 Gary. Han finns i Student men aldrig i HasStudied.'
  },

  /* ---------------- Nivå 8: Att ändra data, och vyer ---------------- */
  {
    id: 'sq8-1', niva: 8, db: 'sjukhus',
    fraga: 'Lägg till sjukdomen Migraine i Illness.',
    losning: "INSERT INTO Illness (IllnessName) VALUES ('Migraine');",
    kontroll: 'SELECT IllnessName FROM Illness ORDER BY IllnessName;',
    ledtrad: 'IllnessID sätts automatiskt — du ska bara ange namnet.',
    forklaring:
      'IllnessID är deklarerad som IDENTITY(1,1) och fylls i av databasen. Att ' +
      'försöka sätta den själv är ett vanligt nybörjarfel.'
  },
  {
    id: 'sq8-2', niva: 8, db: 'sjukhus',
    fraga: 'Höj lönen med tio procent för alla anställda på enhet 1.',
    losning: 'UPDATE Employee SET EmpSalary = EmpSalary * 1.1 WHERE UnitID = 1;',
    kontroll: 'SELECT EmpNo, EmpSalary FROM Employee ORDER BY EmpNo;',
    ledtrad: 'Du kan räkna med kolumnens eget värde på högersidan.',
    forklaring:
      'Tre anställda påverkas. Utan WHERE-satsen hade alla sex fått höjt — och ' +
      'det finns ingen ångerknapp i en riktig databas.'
  },
  {
    id: 'sq8-3', niva: 8, db: 'sjukhus',
    fraga: 'Ta bort alla bilar som saknar ägare.',
    losning: 'DELETE FROM Car WHERE EmployeeID IS NULL;',
    kontroll: 'SELECT LicenseNo FROM Car ORDER BY LicenseNo;',
    ledtrad: 'IS NULL, inte = NULL.',
    forklaring: 'C1 och C6 försvinner, fem bilar blir kvar.'
  },
  {
    id: 'sq8-4', niva: 8, db: 'sjukhus',
    fraga: 'Lägg till bilen C8, en volvo för 45 000, och sätt den anställde med EmpNo E6 som ägare. Slå upp ägarens ID med en underfråga i stället för att skriva en siffra.',
    losning:
      "INSERT INTO Car (LicenseNo, Brand, Price, EmployeeID) " +
      "VALUES ('C8', 'volvo', 45000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E6'));",
    kontroll: 'SELECT LicenseNo, Brand, Price, EmployeeID FROM Car ORDER BY LicenseNo;',
    ledtrad: 'En underfråga får stå som ett värde i VALUES.',
    forklaring:
      'Precis så gör kursens egen hospital-ddl.sql. Fördelen är att koden fungerar ' +
      'även om ID-numren blir andra när databasen byggs om.'
  },
  {
    id: 'sq8-5', niva: 8, db: 'sjukhus',
    fraga: 'Skapa en vy som heter RikaAnstallda med namn och lön för de som tjänar mer än 30 000, och hämta sedan allt ur vyn.',
    losning:
      'CREATE VIEW RikaAnstallda AS SELECT EmpName, EmpSalary FROM Employee WHERE EmpSalary > 30000; ' +
      'SELECT * FROM RikaAnstallda;',
    ledtrad: 'Två satser: först CREATE VIEW, sedan en vanlig SELECT mot vyn.',
    forklaring:
      'Vyn lagrar ingen data — den kör sin fråga på nytt varje gång och är därför ' +
      'alltid aktuell. Nyttan är dels att slippa upprepa en lång fråga, dels att ' +
      'kunna ge någon tillgång till en del av en tabell utan att ge hela.'
  },

  /* ---------------- Nivå 9: Division ---------------- */
  {
    id: 'sq9-1', niva: 9, db: 'tenta',
    fraga: 'Vilka studenter har läst ALLA kurser? Visa studentnummer och namn. Lös det genom att räkna.',
    losning:
      'SELECT s.StudentNo, s.Name FROM Student AS s ' +
      'INNER JOIN HasStudied AS hs ON s.StudentNo = hs.StudentNo ' +
      'GROUP BY s.StudentNo, s.Name ' +
      'HAVING COUNT(hs.Code) = (SELECT COUNT(*) FROM Course);',
    ledtrad: 'Om antalet lästa kurser är lika med det totala antalet kurser har studenten läst alla.',
    forklaring:
      'Tomt resultat — ingen av de fyra har läst alla tre kurserna. S1 har läst två. ' +
      'Att svaret är tomt gör inte frågan mindre viktig: det är exakt den här ' +
      'konstruktionen föreläsningen kallar EXISTS – Hard Mode.'
  },
  {
    id: 'sq9-2', niva: 9, db: 'tenta',
    fraga: 'Samma fråga en gång till: vilka studenter har läst alla kurser? Nu med dubbel NOT EXISTS i stället för COUNT.',
    losning:
      'SELECT StudentNo, Name FROM Student AS s ' +
      'WHERE NOT EXISTS (SELECT * FROM Course AS c ' +
      'WHERE NOT EXISTS (SELECT * FROM HasStudied AS hs ' +
      'WHERE hs.StudentNo = s.StudentNo AND hs.Code = c.Code));',
    ledtrad: '"Har läst alla kurser" är samma sak som "det finns ingen kurs hen inte har läst".',
    forklaring:
      'Läs utifrån och in: innersta frågan är "har den här studenten läst den här ' +
      'kursen", NOT EXISTS runt den blir "den här kursen har hen inte läst", och ' +
      'NOT EXISTS runt hela blir "det finns inga sådana kurser". Kan du bygga den ' +
      'utantill är du klar med SQL-delen.'
  },
  {
    id: 'sq9-3', niva: 9, db: 'sjukhus',
    fraga: 'Vilka anställda undersöker ALLA patienter som tillhör enhet 3? Visa namnet.',
    losning:
      'SELECT e.EmpName FROM Employee AS e ' +
      'WHERE NOT EXISTS (SELECT * FROM Patient AS p WHERE p.UnitID = 3 ' +
      'AND NOT EXISTS (SELECT * FROM Examines AS x ' +
      'WHERE x.EmployeeID = e.EmployeeID AND x.PatientID = p.PatientID));',
    ledtrad: 'Samma dubbla negation, men mängden att täcka är begränsad av ett villkor.',
    forklaring:
      'Anna och Hans. Enhet 3 har patienterna PP3 och PP4, och båda dessa två ' +
      'anställda undersöker var och en av dem. Lägg märke till att villkoret ' +
      '`p.UnitID = 3` står i den MELLERSTA frågan — det är där mängden som ska ' +
      'täckas definieras. Flyttar du det inåt betyder frågan något annat.'
  },
  {
    id: 'sq9-4', niva: 9, db: 'tenta', tenta: 'Omtentamen 24 oktober 2025, uppgift 4 (30 p)',
    fraga:
      'Skriv EN fråga som returnerar kurskod, namn och snittresultat för de kurser ' +
      'som läses av student S1 men inte av student S2.',
    losning:
      "SELECT c.Code, c.Name, AVG(hs.Grade) AS Snitt FROM Course AS c " +
      "INNER JOIN HasStudied AS hs ON c.Code = hs.Code " +
      "WHERE c.Code IN (SELECT Code FROM HasStudied WHERE StudentNo = 'S1') " +
      "AND c.Code NOT IN (SELECT Code FROM HasStudied WHERE StudentNo = 'S2') " +
      "GROUP BY c.Code, c.Name;",
    ledtrad:
      'Tre saker på en gång: hitta kurserna S1 läst, ta bort dem S2 också läst, ' +
      'och räkna snittbetyget per kurs över ALLA studenter.',
    forklaring:
      'C2 Java, snitt 6,5. Notera att snittet räknas över alla som läst kursen — ' +
      'S1 fick 8 och S3 fick 5 — inte bara över S1. Läs uppgiftstexten noga: den ' +
      'säger "snittresultat för kurser", inte "S1:s betyg".\n\n' +
      'Allt ska ligga i **en enda fråga och ett enda resultat**. Det står ' +
      'uttryckligen i uppgiften, och att lämna in två frågor ger avdrag.'
  },
  {
    id: 'sq9-5', niva: 9, db: 'tenta', tenta: 'Uppsamlingstentamen 25 maj 2026, uppgift 4 (30 p)',
    fraga:
      'Skriv EN fråga som returnerar studentnummer, namn och högsta betyg för de ' +
      'studenter som är äldre än student S4 och har läst två eller fler kurser.',
    losning:
      "SELECT s.StudentNo, s.Name, MAX(hs.Grade) AS HogstaBetyg FROM Student AS s " +
      "INNER JOIN HasStudied AS hs ON s.StudentNo = hs.StudentNo " +
      "WHERE s.Age > (SELECT Age FROM Student WHERE StudentNo = 'S4') " +
      "GROUP BY s.StudentNo, s.Name HAVING COUNT(*) >= 2;",
    ledtrad:
      'Åldersvillkoret gäller enskilda rader, kursantalet gäller grupper. ' +
      'Var hör respektive villkor hemma?',
    forklaring:
      'Tomt resultat — Gary är 33 och äldst, så ingen är äldre än han. Att det ' +
      'rätta svaret är tomt är själva finessen: uppgiften prövar om du bygger ' +
      'frågan rätt, inte om du hittar rader.\n\n' +
      'Det viktiga är placeringen. Åldern hör till WHERE eftersom den gäller ' +
      'enskilda rader, antalet kurser hör till HAVING eftersom det gäller ' +
      'färdiga grupper.'
  }
];
