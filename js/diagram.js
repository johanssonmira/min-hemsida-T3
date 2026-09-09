/* =========================================================================
   diagram.js – figurerna i kompendiet, ritade som SVG.

   Skrivs in i lästexten som en egen rad: [[diagram:chen-grund]]

   Allt ritas med CSS-variabler i stället för fasta färger, så figurerna
   följer med när man byter tema. Och allt är vektor, så de är lika skarpa
   på en telefon som på en stor skärm och kostar ingenting att ladda.

   De två schemakartorna ritas ur tabellmetadatan i data/sql-databas.js.
   Det är inte bara bekvämt: det gör att kartan aldrig kan visa något annat
   än vad databasen faktiskt innehåller.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.diagram = (function () {

  var BLACK = 'var(--ink)';
  var MID   = 'var(--ink-mid)';
  var YTA   = 'var(--creme-50)';
  var KANT  = 'var(--ink)';
  var BLA   = 'var(--blaa-500)';
  /* Ockran i figurerna är 600, inte 500. Femhundran är gjord för ytor och
     dekor och når bara 2,7:1 mot figurbakgrunden — under både 4,5:1 för
     text och 3:1 för grafik som bär betydelse. Och FK-linjerna bär
     betydelse: de är hela poängen med schemakartan. */
  var OCKRA = 'var(--ockra-600)';
  var OCKRA_TEXT = 'var(--ockra-600)';
  var GRON  = 'var(--gron-500)';
  var DIM   = 'var(--creme-300)';

  var TS = 13;                                   /* teckenstorlek */
  function bredd(text, ts) { return String(text).length * (ts || TS) * 0.56; }

  /* ---------------------------------------------------------------- */
  /* Byggstenar                                                        */
  /* ---------------------------------------------------------------- */

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  function txt(x, y, s, o) {
    o = o || {};
    return '<text x="' + x + '" y="' + y + '"' +
      ' text-anchor="' + (o.anchor || 'middle') + '"' +
      ' dominant-baseline="' + (o.baseline || 'central') + '"' +
      ' font-size="' + (o.ts || TS) + '"' +
      ' font-weight="' + (o.fet ? '600' : '400') + '"' +
      ' fill="' + (o.farg || BLACK) + '"' +
      (o.kursiv ? ' font-style="italic"' : '') + '>' + esc(s) + '</text>';
  }

  function linje(x1, y1, x2, y2, o) {
    o = o || {};
    return '<line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '"' +
      ' stroke="' + (o.farg || KANT) + '"' +
      ' stroke-width="' + (o.tjock || 1.4) + '"' +
      (o.streckad ? ' stroke-dasharray="5 3"' : '') + '/>';
  }

  /* Dubbel linje = totalt deltagande i Chen-notation */
  function dubbellinje(x1, y1, x2, y2) {
    var dx = x2 - x1, dy = y2 - y1, l = Math.sqrt(dx * dx + dy * dy) || 1;
    var nx = -dy / l * 2, ny = dx / l * 2;
    return linje(x1 + nx, y1 + ny, x2 + nx, y2 + ny) +
           linje(x1 - nx, y1 - ny, x2 - nx, y2 - ny);
  }

  /* Entitetstyp: rektangel. Dubbel ram = svag entitet. */
  function ram(x, y, w, h, etikett, o) {
    o = o || {};
    var s = '<rect x="' + x + '" y="' + y + '" width="' + w + '" height="' + h + '" rx="3"' +
      ' fill="' + (o.yta || YTA) + '" stroke="' + (o.farg || KANT) + '" stroke-width="1.5"/>';
    if (o.dubbel) {
      s += '<rect x="' + (x + 4) + '" y="' + (y + 4) + '" width="' + (w - 8) +
           '" height="' + (h - 8) + '" rx="2" fill="none" stroke="' + (o.farg || KANT) +
           '" stroke-width="1.1"/>';
    }
    return s + txt(x + w / 2, y + h / 2, etikett, { fet: true, ts: o.ts });
  }

  /* Relationstyp: romb. Dubbel = identifierande relation. */
  function romb(cx, cy, w, h, etikett, o) {
    o = o || {};
    function p(k) {
      return [cx, cy - h / 2 * k, cx + w / 2 * k, cy, cx, cy + h / 2 * k, cx - w / 2 * k, cy]
        .join(' ').replace(/(\S+) (\S+)/g, '$1,$2 ');
    }
    var s = '<polygon points="' + p(1) + '" fill="' + (o.yta || YTA) +
            '" stroke="' + KANT + '" stroke-width="1.5"/>';
    if (o.dubbel) {
      s += '<polygon points="' + p(0.82) + '" fill="none" stroke="' + KANT + '" stroke-width="1.1"/>';
    }
    return s + txt(cx, cy, etikett, { ts: o.ts || TS - 1 });
  }

  /* Attribut: ellips. Understruken = nyckel, streckad = härledd,
     dubbel = flervärt. */
  function attribut(cx, cy, etikett, o) {
    o = o || {};
    var rx = Math.max(bredd(etikett, TS - 1) / 2 + 12, 30), ry = 15;
    var s = '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + rx + '" ry="' + ry + '"' +
      ' fill="' + YTA + '" stroke="' + KANT + '" stroke-width="1.3"' +
      (o.harledd ? ' stroke-dasharray="4 3"' : '') + '/>';
    if (o.flervard) {
      s += '<ellipse cx="' + cx + '" cy="' + cy + '" rx="' + (rx - 4) + '" ry="' + (ry - 4) +
           '" fill="none" stroke="' + KANT + '" stroke-width="1"/>';
    }
    s += txt(cx, cy, etikett, { ts: TS - 1 });
    if (o.nyckel) {
      var b = bredd(etikett, TS - 1) / 2;
      s += '<line x1="' + (cx - b) + '" y1="' + (cy + 8) + '" x2="' + (cx + b) + '" y2="' + (cy + 8) +
           '" stroke="' + KANT + '" stroke-width="1.2"' +
           (o.nyckel === 'streckad' ? ' stroke-dasharray="3 2"' : '') + '/>';
    }
    return s;
  }

  /* Crow's Foot-ändpunkt. Yttre märket är valfrihet (cirkel = noll tillåtet,
     streck = krävs), inre märket är antal (streck = en, fork = många). */
  function andpunkt(x, y, riktning, valfri, manga) {
    var d = (riktning === 'hoger') ? 1 : -1;
    var s = '';
    var yttre = x + d * 20, inre = x + d * 9;

    s += valfri
      ? '<circle cx="' + yttre + '" cy="' + y + '" r="5" fill="' + YTA +
        '" stroke="' + KANT + '" stroke-width="1.4"/>'
      : linje(yttre, y - 7, yttre, y + 7);

    if (manga) {
      s += linje(x, y, inre + d * 11, y - 8) +
           linje(x, y, inre + d * 11, y) +
           linje(x, y, inre + d * 11, y + 8);
    } else {
      s += linje(inre, y - 7, inre, y + 7);
    }
    return s;
  }

  /* ---------------------------------------------------------------- */
  /* Figurram                                                          */
  /* ---------------------------------------------------------------- */

  function figur(viewBox, beskrivning, bildtext, innehall, maxbredd) {
    return '<figure class="figur">' +
      '<svg viewBox="' + viewBox + '" role="img" aria-label="' + esc(beskrivning) + '"' +
      ' style="max-width:' + (maxbredd || 640) + 'px" ' +
      'font-family="inherit">' + innehall + '</svg>' +
      (bildtext ? '<figcaption>' + window.SYSB23.ui.inline(bildtext) + '</figcaption>' : '') +
      '</figure>';
  }

  /* ---------------------------------------------------------------- */
  /* Figurerna                                                         */
  /* ---------------------------------------------------------------- */

  var figurer = {};

  /* 1. Chen-notationens grundelement */
  figurer['chen-grund'] = function () {
    var s = '';
    s += ram(20, 70, 110, 40, 'Employee');
    s += linje(130, 90, 250, 90);
    s += romb(300, 90, 100, 46, 'WorksOn');
    s += linje(350, 90, 470, 90);
    s += ram(470, 70, 110, 40, 'Project');
    s += txt(190, 78, 'M', { fet: true, ts: TS + 1, farg: BLA });
    s += txt(410, 78, 'N', { fet: true, ts: TS + 1, farg: BLA });

    s += attribut(60, 25, 'employeeNo', { nyckel: 'hel' });
    s += linje(60, 40, 70, 70);
    s += attribut(520, 25, 'projectNo', { nyckel: 'hel' });
    s += linje(520, 40, 510, 70);

    s += attribut(300, 165, 'startDate');
    s += linje(300, 113, 300, 150);

    return figur('0 0 600 195',
      'Chen-diagram: entitetstyperna Employee och Project förbundna av relationstypen WorksOn med förhållandet M till N. employeeNo och projectNo är understrukna nyckelattribut, och startDate är ett attribut på själva relationen.',
      'Chen-notationens tre former: **rektangel** för entitetstyp, **romb** för relationstyp och **ellips** för attribut. Understrykning markerar nyckel. Att `startDate` hänger på relationen och inte på någon av entiteterna är hela poängen med M:N — datumet gäller kombinationen, inte personen eller projektet var för sig.',
      s);
  };

  /* 2. Attributtyperna */
  figurer['attribut'] = function () {
    var s = ram(250, 105, 120, 44, 'Employee');

    s += attribut(70, 30, 'employeeNo', { nyckel: 'hel' });
    s += linje(110, 42, 255, 108);
    s += txt(70, 60, 'nyckel', { ts: TS - 2, farg: MID });

    s += attribut(240, 25, 'name');
    s += linje(250, 40, 280, 105);
    s += txt(240, 55, 'enkelt', { ts: TS - 2, farg: MID });

    s += attribut(410, 25, 'phoneNo', { flervard: true });
    s += linje(400, 40, 345, 105);
    s += txt(410, 58, 'flervärt', { ts: TS - 2, farg: MID });

    s += attribut(560, 60, 'yearsEmployed', { harledd: true });
    s += linje(520, 72, 372, 115);
    s += txt(560, 92, 'härlett', { ts: TS - 2, farg: MID });

    s += attribut(120, 200, 'address');
    s += linje(160, 190, 270, 149);
    s += attribut(45, 250, 'street', { ts: TS - 2 });
    s += attribut(160, 250, 'city', { ts: TS - 2 });
    s += linje(100, 215, 60, 236);
    s += linje(140, 215, 155, 236);
    s += txt(120, 288, 'sammansatt', { ts: TS - 2, farg: MID });

    return figur('0 0 640 305',
      'Employee omgiven av fem attributtyper: employeeNo understruket som nyckel, name som enkel ellips, phoneNo i dubbel ellips för flervärt, yearsEmployed i streckad ellips för härlett, och address som förgrenar sig i street och city.',
      'De fem attributtyperna. **Härlett** betyder att värdet räknas fram ur något annat — anställningsår ur anställningsdatum — och därför inte ska lagras. **Flervärt** betyder att en anställd kan ha flera telefonnummer, och det är den formen som senare tvingar fram en egen tabell.',
      s);
  };

  /* 3. Kardinalitet */
  figurer['kardinalitet'] = function () {
    function par(x, y, vanster, hoger, v, h, rubrik, under) {
      var s = ram(x, y, 84, 34, vanster, { ts: TS - 1 });
      s += linje(x + 84, y + 17, x + 116, y + 17);
      s += romb(x + 146, y + 17, 60, 32, 'Rel', { ts: TS - 2 });
      s += linje(x + 176, y + 17, x + 208, y + 17);
      s += ram(x + 208, y, 84, 34, hoger, { ts: TS - 1 });
      s += txt(x + 100, y + 6, v, { fet: true, farg: BLA });
      s += txt(x + 192, y + 6, h, { fet: true, farg: BLA });
      s += txt(x + 146, y + 54, rubrik, { fet: true });
      s += txt(x + 146, y + 72, under, { ts: TS - 2, farg: MID });
      return s;
    }
    var s = par(10, 20, 'Employee', 'Desk', '1', '1', '1:1', 'en anställd, ett skrivbord');
    s += par(330, 20, 'Unit', 'Employee', '1', 'N', '1:N', 'en enhet, många anställda');
    s += par(170, 130, 'Employee', 'Project', 'M', 'N', 'M:N', 'många åt båda håll');

    return figur('0 0 640 235',
      'Tre Chen-diagram som visar kardinaliteterna 1 till 1 mellan Employee och Desk, 1 till N mellan Unit och Employee, och M till N mellan Employee och Project.',
      'Kardinalitet läses **tvärs över** relationen: siffran vid Unit säger hur många Unit varje Employee hör till, inte tvärtom. Det är den vanligaste förväxlingen, och den enda som kostar poäng på uppgift 1.',
      s);
  };

  /* 4. Deltagande */
  figurer['deltagande'] = function () {
    var s = ram(20, 30, 96, 36, 'Employee', { ts: TS - 1 });
    s += linje(116, 48, 148, 48);
    s += romb(178, 48, 60, 32, 'Leads', { ts: TS - 2 });
    s += linje(208, 48, 240, 48);
    s += ram(240, 30, 90, 36, 'Project', { ts: TS - 1 });
    s += txt(132, 37, '1', { fet: true, farg: BLA });
    s += txt(224, 37, 'N', { fet: true, farg: BLA });
    s += txt(175, 92, 'Partiellt deltagande', { fet: true });
    s += txt(175, 110, 'enkel linje — ett projekt behöver ingen ledare', { ts: TS - 2, farg: MID });

    s += ram(350, 30, 96, 36, 'Employee', { ts: TS - 1 });
    s += linje(446, 48, 478, 48);
    s += romb(508, 48, 60, 32, 'Leads', { ts: TS - 2 });
    s += dubbellinje(538, 48, 570, 48);
    s += ram(570, 30, 90, 36, 'Project', { ts: TS - 1 });
    s += txt(462, 37, '1', { fet: true, farg: BLA });
    s += txt(554, 37, 'N', { fet: true, farg: BLA });
    s += txt(505, 92, 'Totalt deltagande', { fet: true });
    s += txt(505, 110, 'dubbel linje — varje projekt måste ha en ledare', { ts: TS - 2, farg: MID });

    return figur('0 0 680 125',
      'Två Chen-diagram sida vid sida. Till vänster Employee, Leads, Project med enkel linje vid Project. Till höger samma diagram med dubbel linje vid Project.',
      'Deltagande svarar på frågan **måste**, kardinalitet på frågan **hur många**. Den dubbla linjen läses vid sin egen ände: den sitter vid Project och betyder att varje projekt måste delta.',
      s);
  };

  /* 5. Svag entitet */
  figurer['svag-entitet'] = function () {
    var s = ram(30, 70, 100, 40, 'Project');
    s += attribut(80, 25, 'projectNo', { nyckel: 'hel' });
    s += linje(80, 40, 80, 70);

    s += linje(130, 90, 200, 90);
    s += romb(255, 90, 110, 50, 'Contains', { dubbel: true, ts: TS - 2 });
    s += linje(310, 90, 380, 90);
    s += txt(165, 78, '1', { fet: true, farg: BLA });
    s += txt(345, 78, 'N', { fet: true, farg: BLA });

    s += ram(380, 68, 120, 44, 'ProjectTask', { dubbel: true });
    s += attribut(560, 40, 'taskNo', { nyckel: 'streckad' });
    s += linje(520, 52, 500, 78);
    s += attribut(560, 130, 'taskName');
    s += linje(520, 122, 500, 104);

    s += txt(255, 150, 'identifierande relation', { ts: TS - 2, farg: MID });
    s += txt(440, 150, 'svag entitetstyp', { ts: TS - 2, farg: MID });
    s += txt(560, 68, 'partiell nyckel', { ts: TS - 2, farg: MID });

    return figur('0 0 640 165',
      'Chen-diagram: Project med enkel ram och understruket projectNo, kopplat via den identifierande relationen Contains med dubbel romb till ProjectTask som har dubbel ram och attributet taskNo med streckad understrykning.',
      'En **svag entitetstyp** kan inte identifieras av sina egna attribut. `taskNo` är bara unikt inom ett projekt — därför streckad understrykning, en **partiell nyckel**. Den fulla nyckeln blir projectNo plus taskNo, och det är därför den identifierande relationen ritas med dubbel romb.',
      s);
  };

  /* 6. Reifiering av M:N */
  figurer['reifiering'] = function () {
    var s = txt(20, 20, 'FÖRE', { anchor: 'start', fet: true, farg: MID, ts: TS - 1 });
    s += ram(20, 45, 100, 38, 'Employee', { ts: TS - 1 });
    s += linje(120, 64, 175, 64);
    s += romb(225, 64, 100, 44, 'WorksOn', { ts: TS - 2 });
    s += linje(275, 64, 330, 64);
    s += ram(330, 45, 100, 38, 'Project', { ts: TS - 1 });
    s += txt(148, 53, 'M', { fet: true, farg: BLA });
    s += txt(302, 53, 'N', { fet: true, farg: BLA });
    s += attribut(225, 125, 'startDate');
    s += linje(225, 86, 225, 110);

    s += '<path d="M 470 90 L 500 90" stroke="' + OCKRA + '" stroke-width="2"/>';
    s += '<path d="M 494 84 L 502 90 L 494 96 Z" fill="' + OCKRA + '"/>';

    s += txt(20, 185, 'EFTER', { anchor: 'start', fet: true, farg: MID, ts: TS - 1 });
    s += ram(20, 210, 100, 38, 'Employee', { ts: TS - 1 });
    s += linje(120, 229, 165, 229);
    s += ram(165, 210, 110, 38, 'Assignment', { ts: TS - 2, farg: GRON });
    s += linje(275, 229, 320, 229);
    s += ram(320, 210, 100, 38, 'Project', { ts: TS - 1 });
    s += txt(142, 218, '1', { fet: true, farg: BLA });
    s += txt(188, 218, 'N', { fet: true, farg: BLA });
    s += txt(252, 218, 'N', { fet: true, farg: BLA });
    s += txt(298, 218, '1', { fet: true, farg: BLA });
    s += attribut(220, 290, 'startDate');
    s += linje(220, 251, 220, 275);

    s += txt(540, 150, 'M:N blir två 1:N', { anchor: 'middle', fet: true, ts: TS - 1 });
    s += txt(540, 172, 'med en ny entitet emellan', { anchor: 'middle', ts: TS - 2, farg: MID });

    return figur('0 0 640 310',
      'Överst Employee, WorksOn och Project i ett M till N-förhållande med attributet startDate på relationen. Underst samma modell där WorksOn ersatts av entitetstypen Assignment, med 1 till N från Employee och N till 1 till Project.',
      'Varje M:N-relation blir en egen tabell i den logiska modellen. Relationens attribut följer med dit — och det är just därför `startDate` inte kunde ligga på vare sig Employee eller Project. Kopplingstabellerna `Examines`, `Suffers` och `HasStudied` i övningsdatabaserna är alla resultatet av precis den här omvandlingen.',
      s);
  };

  /* 7. Chen mot Crow's Foot */
  figurer['chen-crow'] = function () {
    var s = txt(20, 18, 'CHEN', { anchor: 'start', fet: true, farg: MID, ts: TS - 1 });
    s += ram(40, 40, 100, 38, 'Employee', { ts: TS - 1 });
    s += linje(140, 59, 195, 59);
    s += romb(245, 59, 100, 44, 'WorksOn', { ts: TS - 2 });
    s += linje(295, 59, 350, 59);
    s += ram(350, 40, 100, 38, 'Project', { ts: TS - 1 });
    s += txt(168, 48, 'M', { fet: true, farg: BLA });
    s += txt(322, 48, 'N', { fet: true, farg: BLA });

    s += txt(20, 128, "CROW'S FOOT", { anchor: 'start', fet: true, farg: MID, ts: TS - 1 });
    s += ram(40, 150, 100, 38, 'EMPLOYEE', { ts: TS - 2 });
    s += linje(160, 169, 330, 169);
    s += andpunkt(160, 169, 'vanster', false, true);
    s += andpunkt(330, 169, 'hoger', false, true);
    s += ram(350, 150, 100, 38, 'PROJECT', { ts: TS - 2 });
    s += txt(245, 195, 'många till många', { ts: TS - 2, farg: MID });

    s += txt(530, 80, 'Chen ritar relationen', { anchor: 'middle', ts: TS - 1 });
    s += txt(530, 98, 'som en egen form.', { anchor: 'middle', ts: TS - 1 });
    s += txt(530, 130, "Crow's Foot lägger den", { anchor: 'middle', ts: TS - 1 });
    s += txt(530, 148, 'i linjens ändar.', { anchor: 'middle', ts: TS - 1 });

    return figur('0 0 640 215',
      'Samma modell i två notationer. Överst Chen med Employee, romben WorksOn och Project märkt M och N. Underst Crow’s Foot med EMPLOYEE och PROJECT förbundna av en linje med kråkfötter i båda ändar.',
      'Samma sak, två språk. Chen är tydligare när man **tänker** — relationen syns som ett eget begrepp och kan bära attribut. Crow’s Foot är tätare och närmare tabellerna, och används därför oftare när man **bygger**.',
      s);
  };

  /* 8. Crow's Foot-ändpunkterna */
  figurer['crow-andpunkter'] = function () {
    function fall(x, y, valfri, manga, rubrik, marken) {
      var s = linje(x, y, x + 118, y);
      s += andpunkt(x + 118, y, 'hoger', valfri, manga);
      s += ram(x + 138, y - 18, 96, 36, 'PROJECT', { ts: TS - 2 });
      s += txt(x + 60, y + 32, rubrik, { fet: true, ts: TS - 1 });
      s += txt(x + 60, y + 50, marken, { ts: TS - 2, farg: MID });
      return s;
    }
    var s = fall(20, 40, true, false, 'Noll eller en', 'cirkel + streck');
    s += fall(340, 40, false, false, 'Exakt en', 'streck + streck');
    s += fall(20, 150, true, true, 'Noll eller många', 'cirkel + fork');
    s += fall(340, 150, false, true, 'En eller många', 'streck + fork');

    s += txt(320, 235, 'Yttre märket = får det vara noll?   ·   Inre märket = en eller många?',
             { ts: TS - 1, farg: MID });

    return figur('0 0 640 255',
      'Fyra Crow’s Foot-ändpunkter vid en entitetsbox: cirkel och streck för noll eller en, streck och streck för exakt en, cirkel och fork för noll eller många, streck och fork för en eller många.',
      'Läs alltid **utifrån och in**. Det yttre märket säger om noll är tillåtet: cirkel betyder valfritt, streck betyder obligatoriskt. Det inre säger antalet: streck betyder en, kråkfoten betyder många. Och märkena sitter vid den ände vars instanser de räknar.',
      s);
  };

  /* 9-10. Schemakartor, ritade ur tabellmetadatan */
  function schemakarta(dbId, layout, viewBox, bildtext) {
    var def = (window.SYSB23.sqlDatabaser || []).filter(function (d) { return d.id === dbId; })[0];
    if (!def) return '';

    var boxar = {}, s = '', kopplingar = '';
    var RH = 17, RUBRIK = 26;

    def.tabeller.forEach(function (tab) {
      var pos = layout[tab.namn];
      if (!pos) return;
      var h = RUBRIK + tab.kolumner.length * RH + 6;
      var w = pos.w || 150;
      boxar[tab.namn] = { x: pos.x, y: pos.y, w: w, h: h };

      s += '<rect x="' + pos.x + '" y="' + pos.y + '" width="' + w + '" height="' + h +
           '" rx="5" fill="' + YTA + '" stroke="' + KANT + '" stroke-width="1.5"/>';
      s += '<rect x="' + pos.x + '" y="' + pos.y + '" width="' + w + '" height="' + RUBRIK +
           '" rx="5" fill="' + DIM + '"/>';
      s += '<rect x="' + pos.x + '" y="' + (pos.y + RUBRIK - 6) + '" width="' + w +
           '" height="6" fill="' + DIM + '"/>';
      s += linje(pos.x, pos.y + RUBRIK, pos.x + w, pos.y + RUBRIK);
      s += txt(pos.x + 9, pos.y + RUBRIK / 2, tab.namn, { anchor: 'start', fet: true, ts: TS });

      tab.kolumner.forEach(function (kol, i) {
        var y = pos.y + RUBRIK + 6 + i * RH + RH / 2 - 3;
        var nyckel = kol.roll === 'pk' || kol.roll === 'pkfk';
        var frammande = kol.roll === 'fk' || kol.roll === 'pkfk';
        var markor = nyckel ? 'PK' : (frammande ? 'FK' : (kol.roll === 'unik' ? 'U' : ''));

        s += txt(pos.x + 9, y, kol.namn, {
          anchor: 'start', ts: TS - 2,
          fet: nyckel,
          farg: nyckel ? BLACK : MID
        });
        if (markor) {
          s += txt(pos.x + w - 9, y, markor, {
            anchor: 'end', ts: TS - 3,
            farg: nyckel ? BLA : (frammande ? OCKRA_TEXT : MID), fet: true
          });
        }
        if (nyckel) {
          s += '<line x1="' + (pos.x + 9) + '" y1="' + (y + 7) + '" x2="' +
               (pos.x + 9 + bredd(kol.namn, TS - 2)) + '" y2="' + (y + 7) +
               '" stroke="' + BLACK + '" stroke-width="1"/>';
        }
      });
    });

    /* Främmande nycklar som linjer mellan boxarna */
    def.tabeller.forEach(function (tab) {
      var fran = boxar[tab.namn];
      if (!fran) return;
      tab.kolumner.forEach(function (kol) {
        if (!kol.mot) return;
        var till = boxar[kol.mot];
        if (!till) return;

        var fx = fran.x + fran.w / 2, fy = fran.y + fran.h / 2;
        var tx = till.x + till.w / 2, ty = till.y + till.h / 2;

        /* Fäst på närmaste kant i den dominerande riktningen. Riktningen
           måste avgöras innan koordinaterna skrivs över. */
        var hogerut = tx > fx, nedat = ty > fy;

        if (Math.abs(tx - fx) > Math.abs(ty - fy)) {
          fx = hogerut ? fran.x + fran.w : fran.x;
          tx = hogerut ? till.x : till.x + till.w;
        } else {
          fy = nedat ? fran.y + fran.h : fran.y;
          ty = nedat ? till.y : till.y + till.h;
        }

        kopplingar += linje(fx, fy, tx, ty, { farg: OCKRA, tjock: 1.6 });
        kopplingar += andpunkt(fx, fy, hogerut ? 'vanster' : 'hoger', false, true);
      });
    });

    return figur(viewBox,
      'Schemakarta över databasen ' + def.namn + ' med tabellerna ' +
      def.tabeller.map(function (t) { return t.namn; }).join(', ') +
      ' och deras primärnycklar och främmande nycklar.',
      bildtext, kopplingar + s, 700);
  }

  figurer['db-sjukhus'] = function () {
    return schemakarta('sjukhus', {
      Unit:        { x: 240, y: 10,  w: 160 },
      Employee:    { x: 20,  y: 150, w: 175 },
      Patient:     { x: 450, y: 150, w: 185 },
      Illness:     { x: 250, y: 300, w: 150 },
      Car:         { x: 20,  y: 330, w: 160 },
      Examines:    { x: 240, y: 150, w: 140 },
      Suffers:     { x: 440, y: 330, w: 140 },
      HasSuffered: { x: 440, y: 440, w: 140 }
    }, '0 0 660 545',
      'Kursens hospital-databas. **PK** är primärnyckel, **FK** främmande nyckel, ' +
      '**U** unik. De ockra linjerna är de främmande nycklarna — det är längs dem ' +
      'dina joins går. Lägg märke till att `Examines`, `Suffers` och `HasSuffered` ' +
      'bara består av nycklar: de är kopplingstabeller som uppstått ur M:N-relationer.');
  };

  figurer['db-tenta'] = function () {
    return schemakarta('tenta', {
      Student:    { x: 20,  y: 40,  w: 170 },
      HasStudied: { x: 250, y: 60,  w: 160 },
      Course:     { x: 470, y: 40,  w: 160 }
    }, '0 0 660 190',
      'Tentans databas. `HasStudied` är kopplingstabellen mellan student och kurs, ' +
      'och dess primärnyckel är sammansatt av två främmande nycklar — det är ' +
      'signaturen för en M:N-relation som blivit tabell.');
  };

  /* 11. Joins */
  figurer['joins'] = function () {
    function venn(x, y, rubrik, fyll, under) {
      var s = '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
              KANT + '" stroke-width="1.4"/>';
      s += '<circle cx="' + (x + 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
           KANT + '" stroke-width="1.4"/>';

      /* Fyllningen ritas som klippta cirklar */
      var id = 'k' + Math.round(x) + Math.round(y);
      s = '<defs>' +
          '<clipPath id="' + id + 'a"><circle cx="' + (x - 20) + '" cy="' + y + '" r="34"/></clipPath>' +
          '<clipPath id="' + id + 'b"><circle cx="' + (x + 20) + '" cy="' + y + '" r="34"/></clipPath>' +
          '</defs>' + s;

      if (fyll.indexOf('v') > -1) {
        s += '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="' + BLA + '" opacity="0.28"/>';
      }
      if (fyll.indexOf('h') > -1) {
        s += '<circle cx="' + (x + 20) + '" cy="' + y + '" r="34" fill="' + BLA + '" opacity="0.28"/>';
      }
      if (fyll.indexOf('m') > -1) {
        s += '<g clip-path="url(#' + id + 'a)"><circle cx="' + (x + 20) + '" cy="' + y +
             '" r="34" fill="' + BLA + '" opacity="0.55"/></g>';
      }

      s += '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
           KANT + '" stroke-width="1.4"/>';
      s += '<circle cx="' + (x + 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
           KANT + '" stroke-width="1.4"/>';
      s += txt(x, y + 56, rubrik, { fet: true, ts: TS - 1 });
      s += txt(x, y + 73, under, { ts: TS - 3, farg: MID });
      return s;
    }

    var s = venn(105, 50, 'INNER JOIN', 'm', 'bara det som matchar');
    s += venn(325, 50, 'LEFT JOIN', 'vm', 'allt till vänster');
    s += venn(545, 50, 'RIGHT JOIN', 'hm', 'allt till höger');
    s += venn(215, 190, 'FULL JOIN', 'vhm', 'allt från båda');
    s += venn(435, 190, 'CROSS JOIN', 'vhm', 'varje rad mot varje rad');
    s += txt(435, 190, '×', { ts: 30, farg: BLACK, fet: true });

    return figur('0 0 660 285',
      'Fem mängddiagram som visar vilka delar av två överlappande cirklar varje jointyp behåller: INNER bara snittet, LEFT vänstercirkeln plus snittet, RIGHT högercirkeln plus snittet, FULL båda, CROSS alla kombinationer.',
      'Bilden är en förenkling värd att kunna, men läs den rätt: cirklarna är **rader som matchar**, inte tabeller. En LEFT JOIN behåller vänstertabellens rader som saknar motpart och fyller dem med NULL — och det är just de raderna du fångar med `WHERE h.nyckel IS NULL`.',
      s);
  };

  /* 12. Mängdoperationer */
  figurer['mangdoperationer'] = function () {
    function op(x, y, rubrik, fyll, under) {
      var id = 'm' + Math.round(x);
      var s = '<defs><clipPath id="' + id + '"><circle cx="' + (x - 20) + '" cy="' + y +
              '" r="34"/></clipPath></defs>';

      if (fyll === 'union') {
        s += '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="' + GRON + '" opacity="0.3"/>';
        s += '<circle cx="' + (x + 20) + '" cy="' + y + '" r="34" fill="' + GRON + '" opacity="0.3"/>';
      } else if (fyll === 'snitt') {
        s += '<g clip-path="url(#' + id + ')"><circle cx="' + (x + 20) + '" cy="' + y +
             '" r="34" fill="' + GRON + '" opacity="0.55"/></g>';
      } else {
        s += '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="' + GRON + '" opacity="0.3"/>';
        s += '<g clip-path="url(#' + id + ')"><circle cx="' + (x + 20) + '" cy="' + y +
             '" r="34" fill="' + YTA + '"/></g>';
      }

      s += '<circle cx="' + (x - 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
           KANT + '" stroke-width="1.4"/>';
      s += '<circle cx="' + (x + 20) + '" cy="' + y + '" r="34" fill="none" stroke="' +
           KANT + '" stroke-width="1.4"/>';
      s += txt(x, y + 56, rubrik, { fet: true, ts: TS - 1 });
      s += txt(x, y + 73, under, { ts: TS - 3, farg: MID });
      return s;
    }

    var s = op(110, 50, 'UNION', 'union', 'allt, utan dubbletter');
    s += op(330, 50, 'INTERSECT', 'snitt', 'bara det som finns i båda');
    s += op(550, 50, 'EXCEPT', 'diff', 'den första minus den andra');

    s += txt(330, 155, 'Kravet: lika många kolumner, samma ordning, jämförbara typer.',
             { ts: TS - 1, farg: MID });

    return figur('0 0 660 175',
      'Tre mängddiagram: UNION med båda cirklarna fyllda, INTERSECT med bara överlappet fyllt, EXCEPT med bara den vänstra cirkelns icke-överlappande del fylld.',
      'Mängdoperationerna arbetar på hela resultat, inte på enskilda rader. **EXCEPT** är ofta det kortaste svaret på "vilka saknar", och ett alternativ till NOT EXISTS.',
      s);
  };

  /* ---------------------------------------------------------------- */
  /* Ingång                                                            */
  /* ---------------------------------------------------------------- */

  function rita(id) {
    var fn = figurer[id];
    if (!fn) return '<p class="notis">Diagrammet <code>' + esc(id) + '</code> saknas.</p>';
    return fn();
  }

  function finns(id) { return !!figurer[id]; }

  function alla() { return Object.keys(figurer); }

  /* ---------------------------------------------------------------- */
  /* Chen-diagram ur data                                              */
  /* ---------------------------------------------------------------- */

  /* Övningarna i Modellera behöver egna diagram, och de ska inte ritas
     för hand en och en. Ett diagram beskrivs i stället som data:

       {
         bredd, hojd,
         entiteter:  [{ id, namn, x, y, svag }],
         relationer: [{ id, namn, x, y, identifierande }],
         attribut:   [{ av, namn, x, y, nyckel, delnyckel, flervard, harledd }],
         linjer:     [{ fran, till, etikett, total }]
       }

     x och y är mittpunkter. Linjerna fäster automatiskt vid kanten på
     respektive form, så man slipper räkna ut anslutningspunkter för hand. */

  function chen(spec) {
    var noder = {};
    var s = '';

    (spec.entiteter || []).forEach(function (e) {
      var w = e.bredd || Math.max(bredd(e.namn) + 30, 92);
      var h = e.hojd || 38;
      noder[e.id] = { typ: 'ram', x: e.x, y: e.y, w: w, h: h };
    });

    (spec.relationer || []).forEach(function (r) {
      var w = r.bredd || Math.max(bredd(r.namn, TS - 1) + 34, 74);
      var h = r.hojd || 40;
      noder[r.id] = { typ: 'romb', x: r.x, y: r.y, w: w, h: h };
    });

    /* Linjerna först, så formerna täcker deras ändar */
    (spec.linjer || []).forEach(function (l) {
      var a = noder[l.fran], b = noder[l.till];
      if (!a || !b) return;
      var p1 = kant(a, b.x, b.y);
      var p2 = kant(b, a.x, a.y);
      s += l.total ? dubbellinje(p1.x, p1.y, p2.x, p2.y)
                   : linje(p1.x, p1.y, p2.x, p2.y);

      if (l.etikett) {
        /* Etiketten sätts en bit in på linjen från relationssidan, och
           skjuts åt sidan så att den inte hamnar ovanpå linjen. */
        var t = 0.36;
        var ex = p2.x + (p1.x - p2.x) * t;
        var ey = p2.y + (p1.y - p2.y) * t;
        var vagrat = Math.abs(p1.x - p2.x) > Math.abs(p1.y - p2.y);
        s += txt(ex + (vagrat ? 0 : 13), ey - (vagrat ? 11 : 0),
                 l.etikett, { fet: true, farg: BLA });
      }
    });

    /* Attributen och deras streck */
    (spec.attribut || []).forEach(function (a) {
      var mot = noder[a.av];
      if (mot) {
        var p = kant(mot, a.x, a.y);
        s += linje(a.x, a.y, p.x, p.y, { farg: MID, tjock: 1.1 });
      }
    });

    (spec.entiteter || []).forEach(function (e) {
      var n = noder[e.id];
      s += ram(n.x - n.w / 2, n.y - n.h / 2, n.w, n.h, e.namn,
               { dubbel: e.svag, ts: e.ts || TS - 1 });
    });

    (spec.relationer || []).forEach(function (r) {
      var n = noder[r.id];
      s += romb(n.x, n.y, n.w, n.h, r.namn,
                { dubbel: r.identifierande, ts: TS - 2 });
    });

    (spec.attribut || []).forEach(function (a) {
      s += attribut(a.x, a.y, a.namn, {
        nyckel: a.nyckel ? 'hel' : (a.delnyckel ? 'streckad' : null),
        flervard: a.flervard,
        harledd: a.harledd
      });
    });

    return s;
  }

  /* Punkten på nodens kant i riktning mot (mx, my). */
  function kant(nod, mx, my) {
    var dx = mx - nod.x, dy = my - nod.y;
    if (!dx && !dy) return { x: nod.x, y: nod.y };

    if (nod.typ === 'romb') {
      /* |x|/(w/2) + |y|/(h/2) = 1 */
      var k = 1 / (Math.abs(dx) / (nod.w / 2) + Math.abs(dy) / (nod.h / 2));
      return { x: nod.x + dx * k, y: nod.y + dy * k };
    }

    /* Rektangel: skala till närmaste kant */
    var sx = (nod.w / 2) / (Math.abs(dx) || 1e-6);
    var sy = (nod.h / 2) / (Math.abs(dy) || 1e-6);
    var t = Math.min(sx, sy);
    return { x: nod.x + dx * t, y: nod.y + dy * t };
  }

  /* Färdig figur ur en diagramspecifikation. */
  function chenFigur(spec, beskrivning, bildtext) {
    return figur('0 0 ' + (spec.bredd || 640) + ' ' + (spec.hojd || 260),
                 beskrivning, bildtext, chen(spec), spec.maxbredd || 640);
  }

  return {
    rita: rita, finns: finns, alla: alla,
    chen: chen, chenFigur: chenFigur, figur: figur
  };
})();
