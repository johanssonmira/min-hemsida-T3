/* =========================================================================
   tsql.js – översätter SQL Server-dialekten (T-SQL) till SQLite.

   Kursen skriver T-SQL. Motorn i webbläsaren är SQLite. Utan det här lagret
   får du syntaxfel på fullt korrekt kurskod: SELECT TOP 3, ISNULL, LEN,
   IDENTITY(1,1) och + som strängkonkatenering finns inte i SQLite.

   Översättningen är tokenbaserad, inte regexbaserad. Skillnaden märks när
   ett nyckelord står inne i en sträng eller en kommentar — 'TOP hemligt'
   ska inte röras, och det gör det inte här.

   Två saker är värda att veta om vad översättningen INTE gör: den känner
   inte igen fönsterfunktioner, och TOP inuti en UNION läggs på hela
   unionen i stället för på den första delfrågan. Ingetdera förekommer i
   kursens uppgifter.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.tsql = (function () {

  /* Kolumner med textinnehåll. Fylls av sqlverkstad när en databas laddas
     och används för att avgöra om + betyder plus eller sammanfogning. */
  var textkolumner = {};

  function larDigTextkolumner(namn) {
    textkolumner = {};
    (namn || []).forEach(function (k) { textkolumner[String(k).toLowerCase()] = true; });
  }

  /* ---------------------------------------------------------------- */
  /* Tokenisering                                                      */
  /* ---------------------------------------------------------------- */

  function tokenisera(s) {
    var tok = [], i = 0, n = s.length, j;

    while (i < n) {
      var c = s.charAt(i);

      /* blanktecken */
      if (/\s/.test(c)) {
        j = i; while (j < n && /\s/.test(s.charAt(j))) j++;
        tok.push({ t: 'ws', v: s.slice(i, j) }); i = j; continue;
      }

      /* radkommentar */
      if (c === '-' && s.charAt(i + 1) === '-') {
        j = s.indexOf('\n', i); if (j < 0) j = n;
        tok.push({ t: 'kom', v: s.slice(i, j) }); i = j; continue;
      }

      /* blockkommentar */
      if (c === '/' && s.charAt(i + 1) === '*') {
        j = s.indexOf('*/', i + 2); j = (j < 0) ? n : j + 2;
        tok.push({ t: 'kom', v: s.slice(i, j) }); i = j; continue;
      }

      /* sträng, med eller utan unicode-prefixet N */
      if (c === "'" || ((c === 'N' || c === 'n') && s.charAt(i + 1) === "'")) {
        if (c !== "'") i++;                       /* N'...' blir '...' */
        j = i + 1;
        while (j < n) {
          if (s.charAt(j) === "'") {
            if (s.charAt(j + 1) === "'") j += 2;  /* '' är ett escapat citattecken */
            else { j++; break; }
          } else j++;
        }
        tok.push({ t: 'str', v: s.slice(i, j) }); i = j; continue;
      }

      /* [klammeridentifierare] blir "citerad" */
      if (c === '[') {
        j = s.indexOf(']', i); j = (j < 0) ? n : j;
        tok.push({ t: 'id', v: '"' + s.slice(i + 1, j) + '"' }); i = j + 1; continue;
      }

      if (c === '"') {
        j = i + 1; while (j < n && s.charAt(j) !== '"') j++;
        tok.push({ t: 'id', v: s.slice(i, j + 1) }); i = j + 1; continue;
      }

      /* tal */
      if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(s.charAt(i + 1)))) {
        j = i; while (j < n && /[0-9]/.test(s.charAt(j))) j++;
        if (s.charAt(j) === '.') { j++; while (j < n && /[0-9]/.test(s.charAt(j))) j++; }
        tok.push({ t: 'num', v: s.slice(i, j) }); i = j; continue;
      }

      /* identifierare */
      if (/[A-Za-z_@#]/.test(c)) {
        j = i; while (j < n && /[A-Za-z0-9_@#$]/.test(s.charAt(j))) j++;
        tok.push({ t: 'id', v: s.slice(i, j) }); i = j; continue;
      }

      /* operatorer */
      var tva = s.substr(i, 2);
      if (['<>', '<=', '>=', '!=', '!<', '!>', '||'].indexOf(tva) > -1) {
        tok.push({ t: 'op', v: tva }); i += 2; continue;
      }
      tok.push({ t: 'op', v: c }); i++;
    }

    return tok;
  }

  function text(tok) { return tok.map(function (t) { return t.v; }).join(''); }

  /* Betydelsebärande token — hoppar över blanktecken och kommentarer */
  function bar(t) { return !!t && t.t !== 'ws' && t.t !== 'kom'; }

  function nasta(tok, i) { for (var k = i + 1; k < tok.length; k++) if (bar(tok[k])) return k; return -1; }
  function forra(tok, i) { for (var k = i - 1; k >= 0; k--) if (bar(tok[k])) return k; return -1; }

  /* Nyckelord jämförs versalt; strängar och kommentarer matchar aldrig. */
  function NO(t) { return (t && t.t === 'id') ? t.v.toUpperCase() : null; }
  function ar(t, tecken) { return !!t && t.t === 'op' && t.v === tecken; }

  /* Ersätter antal token från index i med nya token. ES5-vänligt. */
  function byt(tok, i, antal, nya) {
    Array.prototype.splice.apply(tok, [i, antal].concat(nya));
  }

  /* ---------------------------------------------------------------- */
  /* Satsindelning                                                     */
  /* ---------------------------------------------------------------- */

  /* Delar på semikolon utanför parenteser, och på GO som är T-SQL:s
     satsavskiljare i skript. Semikolonet följer med satsen det avslutar. */
  function delaSatser(tok) {
    var satser = [], nu = [], djup = 0;

    for (var i = 0; i < tok.length; i++) {
      var t = tok[i];
      if (ar(t, '(')) djup++;
      if (ar(t, ')')) djup--;

      if (djup === 0 && NO(t) === 'GO') { satser.push(nu); nu = []; continue; }

      nu.push(t);

      if (djup === 0 && ar(t, ';')) { satser.push(nu); nu = []; }
    }
    if (nu.length) satser.push(nu);

    return satser.filter(function (s) { return s.some(bar); });
  }

  /* ---------------------------------------------------------------- */
  /* Argument till ett funktionsanrop                                  */
  /* ---------------------------------------------------------------- */

  /* iPar är index för funktionens vänsterparentes. Returnerar
     { slut: index för högerparentesen, arg: [[start, slut], …] } där
     varje par är ett halvöppet tokenintervall. */
  function argument(tok, iPar) {
    var djup = 0, arg = [], start = iPar + 1;

    for (var i = iPar; i < tok.length; i++) {
      if (ar(tok[i], '(')) djup++;
      else if (ar(tok[i], ')')) {
        djup--;
        if (djup === 0) { arg.push([start, i]); return { slut: i, arg: arg }; }
      } else if (djup === 1 && ar(tok[i], ',')) {
        arg.push([start, i]); start = i + 1;
      }
    }
    return null;   /* obalanserad parentes — låt SQLite klaga själv */
  }

  /* Argumentets token, utan omgivande blanktecken — annars blir den
     översatta koden full av tomrum där argumenten bytt plats. */
  function bit(tok, par) {
    var a = par[0], b = par[1];
    while (a < b && !bar(tok[a])) a++;
    while (b > a && !bar(tok[b - 1])) b--;
    return tok.slice(a, b);
  }

  /* ---------------------------------------------------------------- */
  /* Plus: aritmetik eller sammanfogning?                              */
  /* ---------------------------------------------------------------- */

  /* T-SQL använder + för båda. SQLite kräver || för sammanfogning och
     tolkar annars 'Anna' + 'Berg' som 0. Vi tittar på vad som står på var
     sida: en strängliteral, en textkolumn eller en textfunktion gör det
     till sammanfogning. */
  var TEXTFUNKTIONER = {
    substr: 1, substring: 1, upper: 1, lower: 1, ltrim: 1, rtrim: 1, trim: 1,
    concat: 1, replace: 1, left: 1, right: 1, str: 1, format: 1, char: 1
  };

  function arText(tok, i, riktning) {
    if (i < 0) return false;
    var t = tok[i], k;

    if (t.t === 'str') return true;

    if (t.t === 'id') {
      var namn = t.v.replace(/"/g, '').toLowerCase();
      if (ar(tok[nasta(tok, i)], '(')) return !!TEXTFUNKTIONER[namn];   /* funktionsanrop */
      return !!textkolumner[namn];                                      /* t.Kolumn: sista ledet räknas */
    }

    /* Vänsterut avslutar ) antingen ett funktionsanrop eller en vanlig
       parentes. Backa till dess make och avgör därifrån. */
    if (riktning === 'vanster' && ar(t, ')')) {
      var djup = 0;
      for (k = i; k >= 0; k--) {
        if (ar(tok[k], ')')) djup++;
        else if (ar(tok[k], '(')) { djup--; if (djup === 0) break; }
      }
      if (k < 0) return false;
      var fore = forra(tok, k);
      if (fore >= 0 && tok[fore].t === 'id' && !ar(tok[forra(tok, fore)], '.')) {
        var f = tok[fore].v.replace(/"/g, '').toLowerCase();
        if (TEXTFUNKTIONER[f]) return true;
        if (NO(tok[fore]) !== null && f !== 'ifnull' && f !== 'isnull') return false;
      }
      return arText(tok, forra(tok, i), 'vanster');   /* vanlig parentes */
    }

    if (riktning === 'hoger' && ar(t, '(')) return arText(tok, nasta(tok, i), 'hoger');

    return false;
  }

  /* ---------------------------------------------------------------- */
  /* Funktionsöversättning                                             */
  /* ---------------------------------------------------------------- */

  var NAMNBYTEN = {
    isnull: 'IFNULL', substring: 'SUBSTR', len: 'LENGTH', datalength: 'LENGTH',
    count_big: 'COUNT', getutcdate: 'DATETIME'
  };

  var DATUMDEL = {
    year: '%Y', yy: '%Y', yyyy: '%Y',
    month: '%m', mm: '%m',
    day: '%d', dd: '%d',
    hour: '%H', hh: '%H',
    minute: '%M', mi: '%M',
    second: '%S', ss: '%S'
  };

  function tk(v, t) { return { t: t || 'id', v: v }; }
  function ws() { return { t: 'ws', v: ' ' }; }
  function str(v) { return { t: 'str', v: v }; }

  /* Bygger CAST(STRFTIME('%Y', uttryck) AS INTEGER) */
  function datumdel(kod, uttryck) {
    return [tk('CAST'), tk('(', 'op'), tk('STRFTIME'), tk('(', 'op'),
            str("'" + kod + "'"), tk(',', 'op'), ws()]
      .concat(uttryck)
      .concat([tk(')', 'op'), ws(), tk('AS'), ws(), tk('INTEGER'), tk(')', 'op')]);
  }

  /* Går igenom satsen bakifrån så att index inte flyttar sig under oss. */
  function oversattFunktioner(tok) {
    for (var i = tok.length - 1; i >= 0; i--) {
      var t = tok[i];
      if (t.t !== 'id') continue;

      var iPar = nasta(tok, i);

      if (!ar(tok[iPar], '(')) {
        if (NO(t) === 'CURRENT_TIMESTAMP') {
          byt(tok, i, 1, [tk('DATETIME'), tk('(', 'op'), str("'now'"), tk(')', 'op')]);
        }
        continue;
      }

      var namn = t.v.toLowerCase();
      var a = argument(tok, iPar);
      if (!a) continue;

      /* GETDATE() och SYSDATETIME() */
      if (namn === 'getdate' || namn === 'sysdatetime' || namn === 'getutcdate') {
        byt(tok, i, a.slut - i + 1,
            [tk('DATETIME'), tk('(', 'op'), str("'now'"), tk(')', 'op')]);
        continue;
      }

      /* YEAR(x), MONTH(x), DAY(x) */
      if (DATUMDEL[namn] && a.arg.length === 1 &&
          (namn === 'year' || namn === 'month' || namn === 'day')) {
        byt(tok, i, a.slut - i + 1, datumdel(DATUMDEL[namn], bit(tok, a.arg[0])));
        continue;
      }

      /* DATEPART(del, x) */
      if (namn === 'datepart' && a.arg.length === 2) {
        var del = bit(tok, a.arg[0]).filter(bar)
          .map(function (x) { return x.v; }).join('').toLowerCase();
        if (DATUMDEL[del]) {
          byt(tok, i, a.slut - i + 1, datumdel(DATUMDEL[del], bit(tok, a.arg[1])));
          continue;
        }
      }

      /* CHARINDEX(nål, höstack) → INSTR(höstack, nål). Argumenten byter plats. */
      if (namn === 'charindex' && a.arg.length >= 2) {
        byt(tok, i, a.slut - i + 1,
            [tk('INSTR'), tk('(', 'op')]
              .concat(bit(tok, a.arg[1]))
              .concat([tk(',', 'op'), ws()])
              .concat(bit(tok, a.arg[0]))
              .concat([tk(')', 'op')]));
        continue;
      }

      /* CONVERT(typ, uttryck) → CAST(uttryck AS typ) */
      if (namn === 'convert' && a.arg.length >= 2) {
        byt(tok, i, a.slut - i + 1,
            [tk('CAST'), tk('(', 'op')]
              .concat(bit(tok, a.arg[1]))
              .concat([ws(), tk('AS'), ws()])
              .concat(bit(tok, a.arg[0]))
              .concat([tk(')', 'op')]));
        continue;
      }

      /* LEFT(s, n) → SUBSTR(s, 1, n) */
      if (namn === 'left' && a.arg.length === 2) {
        byt(tok, i, a.slut - i + 1,
            [tk('SUBSTR'), tk('(', 'op')]
              .concat(bit(tok, a.arg[0]))
              .concat([tk(',', 'op'), ws(), tk('1', 'num'), tk(',', 'op'), ws()])
              .concat(bit(tok, a.arg[1]))
              .concat([tk(')', 'op')]));
        continue;
      }

      /* RIGHT(s, n) → SUBSTR(s, -n) */
      if (namn === 'right' && a.arg.length === 2) {
        byt(tok, i, a.slut - i + 1,
            [tk('SUBSTR'), tk('(', 'op')]
              .concat(bit(tok, a.arg[0]))
              .concat([tk(',', 'op'), ws(), tk('-', 'op')])
              .concat(bit(tok, a.arg[1]))
              .concat([tk(')', 'op')]));
        continue;
      }

      if (NAMNBYTEN[namn]) tok[i] = tk(NAMNBYTEN[namn]);
    }

    return tok;
  }

  /* ---------------------------------------------------------------- */
  /* TOP → LIMIT                                                       */
  /* ---------------------------------------------------------------- */

  /* TOP hör till den frågenivå den står på. Vi letar upp slutet på just
     den nivån och lägger LIMIT där — så fungerar TOP även i en underfråga. */
  function oversattTop(tok, ctx) {
    for (var i = 0; i < tok.length; i++) {
      if (NO(tok[i]) !== 'TOP') continue;
      if (['SELECT', 'DISTINCT', 'ALL'].indexOf(NO(tok[forra(tok, i)])) === -1) continue;

      var iAntal = nasta(tok, i), antal = null, sista = iAntal;

      if (tok[iAntal] && tok[iAntal].t === 'num') {
        antal = tok[iAntal].v;
      } else if (ar(tok[iAntal], '(')) {
        var inne = nasta(tok, iAntal);
        if (tok[inne] && tok[inne].t === 'num') {
          antal = tok[inne].v;
          sista = nasta(tok, inne);          /* högerparentesen */
        }
      }
      if (antal === null) continue;

      /* PERCENT och WITH TIES saknar motsvarighet — lämna dem orörda */
      if (NO(tok[nasta(tok, sista)]) === 'PERCENT') continue;

      tok.splice(i, sista - i + 1);

      var djup = 0, slut = tok.length;
      for (var k = i; k < tok.length; k++) {
        if (ar(tok[k], '(')) djup++;
        else if (ar(tok[k], ')')) { if (djup === 0) { slut = k; break; } djup--; }
        else if (djup === 0 && ar(tok[k], ';')) { slut = k; break; }
      }

      byt(tok, slut, 0, [ws(), tk('LIMIT'), ws(), tk(antal, 'num')]);
      i = slut;
    }

    /* SET ROWCOUNT n gäller tills det nollställs och verkar som en TOP på
       varje efterföljande SELECT. */
    if (ctx.rowcount && NO(tok[nasta(tok, -1)]) === 'SELECT') {
      var harLimit = tok.some(function (t) { return NO(t) === 'LIMIT'; });
      if (!harLimit) {
        var p = tok.length;
        while (p > 0 && !bar(tok[p - 1])) p--;
        if (p > 0 && ar(tok[p - 1], ';')) p--;
        byt(tok, p, 0, [ws(), tk('LIMIT'), ws(), tk(String(ctx.rowcount), 'num')]);
      }
    }

    return tok;
  }

  /* ---------------------------------------------------------------- */
  /* DDL                                                               */
  /* ---------------------------------------------------------------- */

  /* IDENTITY(1,1) motsvaras av AUTOINCREMENT, men SQLite kräver att
     nyckeln deklareras på kolumnen. Den separata PRIMARY KEY-restriktionen
     för samma kolumn måste därför bort — annars blir det två.

     Texttyperna får COLLATE NOCASE. SQL Server jämför text
     skiftlägesokänsligt som standard, SQLite gör det inte, och utan det
     här skulle WHERE EmpName = 'anna' ge tomt resultat här men träff på
     tentan. */
  function oversattDDL(sql) {
    var identitetskolumner = [];

    sql = sql.replace(
      /(\w+)(\s+)INT(?:EGER)?\s+IDENTITY(?:\s*\(\s*\d+\s*,\s*\d+\s*\))?/gi,
      function (_, kol, mellanrum) {
        identitetskolumner.push(kol);
        return kol + mellanrum + 'INTEGER PRIMARY KEY AUTOINCREMENT';
      }
    );

    identitetskolumner.forEach(function (kol) {
      var pk = '(?:CONSTRAINT\\s+\\w+\\s+)?PRIMARY\\s+KEY\\s*\\(\\s*' + kol + '\\s*\\)';
      var medForeKomma = new RegExp(',\\s*' + pk, 'i');
      var medEfterKomma = new RegExp(pk + '\\s*,', 'i');

      if (medForeKomma.test(sql)) sql = sql.replace(medForeKomma, '');
      else if (medEfterKomma.test(sql)) sql = sql.replace(medEfterKomma, '');
    });

    sql = sql.replace(/\b(N?VARCHAR|N?CHAR|NTEXT|TEXT)(\s*\(\s*(?:\d+|MAX)\s*\))?/gi,
                      '$1$2 COLLATE NOCASE');

    /* MAX är ingen längd SQLite känner igen */
    sql = sql.replace(/\(\s*MAX\s*\)/gi, '');

    return sql;
  }

  /* ---------------------------------------------------------------- */
  /* En sats                                                           */
  /* ---------------------------------------------------------------- */

  function oversattSats(tok, ctx) {
    var i0 = nasta(tok, -1);
    var forsta = NO(tok[i0]);

    /* SET ROWCOUNT n — sparas i ctx, satsen försvinner */
    if (forsta === 'SET' && NO(tok[nasta(tok, i0)]) === 'ROWCOUNT') {
      var iN = nasta(tok, nasta(tok, i0));
      ctx.rowcount = (tok[iN] && tok[iN].t === 'num') ? (Number(tok[iN].v) || null) : null;
      return [];
    }

    /* Satser utan motsvarighet som inte ska stoppa körningen */
    if (forsta === 'USE' || forsta === 'PRINT') return [];

    if (forsta === 'CREATE' && NO(tok[nasta(tok, i0)]) === 'TABLE') {
      return tokenisera(oversattDDL(text(tok)));
    }

    /* TRUNCATE TABLE t → DELETE FROM t */
    if (forsta === 'TRUNCATE' && NO(tok[nasta(tok, i0)]) === 'TABLE') {
      tok[i0] = tk('DELETE');
      tok[nasta(tok, i0)] = tk('FROM');
    }

    tok = oversattFunktioner(tok);

    /* + som sammanfogning */
    for (var i = 0; i < tok.length; i++) {
      if (!ar(tok[i], '+')) continue;
      if (arText(tok, forra(tok, i), 'vanster') || arText(tok, nasta(tok, i), 'hoger')) {
        tok[i] = { t: 'op', v: '||' };
      }
    }

    return oversattTop(tok, ctx);
  }

  /* ---------------------------------------------------------------- */
  /* Ingång                                                            */
  /* ---------------------------------------------------------------- */

  function oversatt(sql) {
    var ctx = { rowcount: null };
    return delaSatser(tokenisera(String(sql)))
      .map(function (sats) { return text(oversattSats(sats, ctx)); })
      .join('');
  }

  /* Är den sista satsen en fråga som ska ge en resultatmängd?

     Behövs eftersom sql.js inte returnerar något alls både när en SELECT
     ger noll rader och när satsen inte var en fråga. Utan den här
     skillnaden skulle "noll rader" och "ingen resultatmängd" bli samma
     sak, och varje övning vars rätta svar är ett tomt resultat skulle
     rättas som fel. */
  function arFragesats(sql) {
    var satser = delaSatser(tokenisera(String(sql)));
    if (!satser.length) return false;
    var forsta = NO(satser[satser.length - 1][nasta(satser[satser.length - 1], -1)]);
    return ['SELECT', 'WITH', 'VALUES', 'PRAGMA'].indexOf(forsta) > -1;
  }

  return {
    oversatt: oversatt,
    arFragesats: arFragesats,
    larDigTextkolumner: larDigTextkolumner,
    /* utlagda för testerna */
    tokenisera: tokenisera,
    delaSatser: delaSatser
  };
})();
