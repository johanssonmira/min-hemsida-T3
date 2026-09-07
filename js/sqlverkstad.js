/* =========================================================================
   sqlverkstad.js – en riktig databas i webbläsaren.

   SQLite är kompilerat till WebAssembly (sql.js, MIT) och ligger i vendor/.
   Motorn laddas först när man öppnar vyn, så resten av appen startar lika
   snabbt som förut.

   Två saker skiljer verkstaden från en vanlig SQL-lekstuga:

   1. Du skriver T-SQL, precis som i kursen. js/tsql.js översätter TOP,
      ISNULL, LEN, IDENTITY och + som strängkonkatenering innan frågan når
      motorn. Det du övar på är alltså det du ska skriva på tentan, inte
      det SQLite råkar vilja ha.

   2. Databasen byggs om från grunden före VARJE körning. Det gör två
      saker: ingenting du skriver kan förstöra något, och en övning som
      ändrar data påverkar inte nästa.

   Rättningen jämför resultatmängder, inte text. Alla vägar till rätt svar
   duger därför — en join och en underfråga som ger samma rader räknas båda
   som rätt, precis som på tentan.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.sqlverkstad = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var SQL = null;             // sql.js-modulen, laddas en gång
  var laddar = false;
  var laddfel = null;

  var lage = 'ovningar';      // 'ovningar' | 'fritt'
  var aktivId = null;         // vald övning
  var visadLedtrad = false;
  var visatFacit = false;
  var togHjalp = false;       // ledtråd eller facit framme på DENNA övning
  var senasteSvar = null;
  var frittDb = 'sjukhus';
  var fritext = 'SELECT TOP 3 EmpName, EmpSalary\nFROM Employee\nORDER BY EmpSalary DESC;';
  var oppnaNivaer = {};       // nivå -> true om lektionen är utfälld

  /* ---------------------------------------------------------------- */
  /* Motorn                                                            */
  /* ---------------------------------------------------------------- */

  function laddaMotor(narKlar) {
    if (SQL) { narKlar(); return; }
    if (laddar) return;
    laddar = true;

    var skript = document.createElement('script');
    skript.src = 'vendor/sql-wasm.js';
    skript.onload = function () {
      window.initSqlJs({ locateFile: function (f) { return 'vendor/' + f; } })
        .then(function (modul) {
          SQL = modul;
          laddar = false;
          S.tsql.larDigTextkolumner(S.sqlTextkolumner);
          narKlar();
        })
        .catch(function (e) {
          laddar = false;
          laddfel = e.message || String(e);
          rendera();
        });
    };
    skript.onerror = function () {
      laddar = false;
      laddfel = 'Filen vendor/sql-wasm.js kunde inte laddas.';
      rendera();
    };
    document.head.appendChild(skript);
  }

  function databas(id) {
    return S.sqlDatabaser.filter(function (d) { return d.id === id; })[0] || S.sqlDatabaser[0];
  }

  /* En ny databas varje gång. Billigt — hela datamängden är några kilobyte. */
  function nyDatabas(id) {
    var def = databas(id);
    var db = new SQL.Database();
    db.run('PRAGMA foreign_keys = ON;');
    db.run(S.tsql.oversatt(def.ddl));
    db.run(S.tsql.oversatt(def.data));
    return db;
  }

  /* Kör SQL och returnera { kolumner, rader } för sista SELECT-satsen,
     eller { andrade: n } för satser som bara ändrar data. */
  function kor(db, sql) {
    var res = db.exec(S.tsql.oversatt(sql));
    if (res.length) {
      var sista = res[res.length - 1];
      return { kolumner: sista.columns, rader: sista.values };
    }

    /* Tomt från sql.js betyder ETT AV TVÅ: en fråga som gav noll rader,
       eller en sats som inte var en fråga. Blandar man ihop dem rättas
       varje övning vars rätta svar är ett tomt resultat som fel — och
       det är flera av dem, inklusive en av tentauppgifterna. */
    if (S.tsql.arFragesats(sql)) {
      return { kolumner: kolumnnamn(db, S.tsql.oversatt(sql)), rader: [] };
    }

    return { kolumner: null, rader: null, andrade: db.getRowsModified() };
  }

  /* Kolumnnamnen för en fråga som gav noll rader. Utan dem vore ett tomt
     resultat med fel antal kolumner omöjligt att skilja från ett rätt —
     "inga rader, tre kolumner" och "inga rader, en kolumn" är olika svar. */
  function kolumnnamn(db, oversattSql) {
    try {
      var satser = S.tsql.delaSatser(S.tsql.tokenisera(oversattSql));
      var sista = satser[satser.length - 1]
        .map(function (t) { return t.v; }).join('');
      var sats = db.prepare(sista);
      var namn = sats.getColumnNames();
      sats.free();
      return namn || [];
    } catch (e) {
      return [];
    }
  }

  /* ---------------------------------------------------------------- */
  /* Rättning                                                          */
  /* ---------------------------------------------------------------- */

  /* Jämför två resultatmängder. Kolumnnamn ignoreras — det är värdena som
     är svaret. Radordning ignoreras också, utom när övningen kräver
     ORDER BY, för då är ordningen en del av uppgiften. */
  function likaResultat(a, b, kravOrdning) {
    if (!a.rader || !b.rader) return false;
    if (a.rader.length !== b.rader.length) return false;
    if (a.rader.length && a.rader[0].length !== b.rader[0].length) return false;

    /* Två tomma resultat har inga rader att jämföra bredden på. Då är
       antalet kolumner det enda som skiljer dem åt. */
    if (!a.rader.length && (a.kolumner || []).length !== (b.kolumner || []).length) return false;

    var ra = a.rader.map(radText);
    var rb = b.rader.map(radText);
    if (!kravOrdning) { ra.sort(); rb.sort(); }
    for (var i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) return false;
    return true;
  }

  /* Tal och sifferström jämförs lika: 6 och "6" är samma svar. */
  function radText(rad) {
    return rad.map(function (v) {
      if (v === null || v === undefined) return '\u0000NULL';   /* sentinel — krockar aldrig med texten "NULL" */
      if (typeof v === 'number') return String(v);
      var n = Number(v);
      return (v !== '' && !isNaN(n)) ? String(n) : String(v);
    }).join('\u0001');   /* avskiljare som inte kan finnas i datan */
  }

  function rattaSvar(ovning, svar) {
    var mitt, facit;

    var db = nyDatabas(ovning.db);
    try {
      var eget = kor(db, svar);
      mitt = ovning.kontroll ? kor(db, ovning.kontroll) : eget;
    } catch (e) {
      db.close();
      return { typ: 'fel', text: e.message };
    }
    db.close();

    var db2 = nyDatabas(ovning.db);
    try {
      var ref = kor(db2, ovning.losning);
      facit = ovning.kontroll ? kor(db2, ovning.kontroll) : ref;
    } catch (e) {
      db2.close();
      return { typ: 'fel', text: 'Facitlösningen gick inte att köra: ' + e.message };
    }
    db2.close();

    var ratt = likaResultat(mitt, facit, !!ovning.ordning);
    return {
      typ: ratt ? 'ratt' : 'nastan',
      kolumner: mitt.kolumner, rader: mitt.rader,
      facitRader: facit.rader, facitKolumner: facit.kolumner,
      andrade: mitt.andrade
    };
  }

  /* ---------------------------------------------------------------- */
  /* Rendering                                                         */
  /* ---------------------------------------------------------------- */

  function rendera() {
    var vy = U.el('vy-sql');

    if (laddfel) {
      vy.innerHTML = '<div class="kort"><h2>SQL-verkstad</h2>' +
        '<p class="muted">Databasmotorn kunde inte startas: ' + U.esc(laddfel) + '</p>' +
        '<p class="muted liten">Öppnar du sidan direkt från hårddisken (file://) blockerar ' +
        'webbläsaren WebAssembly. Kör <code>node serve.js</code> eller använd den ' +
        'publicerade adressen.</p></div>';
      return;
    }

    if (!SQL) {
      vy.innerHTML = '<div class="kort"><h2>SQL-verkstad</h2>' +
        '<p class="muted">Startar databasen…</p>' +
        '<div class="progress"><div style="width:40%"></div></div></div>';
      laddaMotor(rendera);
      return;
    }

    var html = '<div class="sida">';
    html += '<div class="huvud">' + huvudkort() + '</div>';
    html += '<aside class="sido">' + ovningslista() + '</aside>';
    html += '</div>';

    vy.innerHTML = html;
    koppla(vy);
  }

  function huvudkort() {
    var h = '<div class="kort">';
    h += '<h2>SQL-verkstad</h2>';
    h += '<p class="muted liten">En riktig SQLite-databas i din webbläsare, som ' +
         'förstår <strong>SQL Server-dialekten</strong>. <code>TOP</code>, ' +
         '<code>ISNULL</code>, <code>LEN</code> och <code>+</code> som ' +
         'sammanfogning fungerar precis som i kursen. Svaret rättas mot ' +
         '<strong>resultatet</strong>, inte mot hur du skrev frågan, och databasen ' +
         'byggs om före varje körning så ingenting du gör kan förstöra den.</p>';

    var losta = S.store.antalSqlLosta();
    var utanHjalp = S.store.antalSqlUtanHjalp();
    var totalt = S.sqlOvningar.length;

    h += '<div class="sqlframsteg">';
    h += '<div class="progress' + (losta === totalt ? ' gron' : '') + '">' +
         '<div style="width:' + Math.round(losta / totalt * 100) + '%"></div></div>';
    h += '<span class="liten muted">' + losta + ' av ' + totalt + ' lösta' +
         (losta ? ' · ' + utanHjalp + ' utan hjälp' : '') + '</span>';
    h += '</div>';

    h += '<div class="chiprad">';
    h += '<button class="chip' + (lage === 'ovningar' ? ' vald' : '') +
         '" data-sqllage="ovningar">Övningar</button>';
    h += '<button class="chip' + (lage === 'fritt' ? ' vald' : '') +
         '" data-sqllage="fritt">Fritt läge</button>';
    h += '<button class="chip" id="sql-tabeller">Visa databasen</button>';
    h += '</div>';
    h += '</div>';

    h += lage === 'fritt' ? frittkort() : ovningskort();
    return h;
  }

  function ovningskort() {
    var o = aktivOvning();
    if (!o) {
      return '<div class="kort"><p class="muted" style="margin-bottom:0">' +
             'Välj en övning i listan till höger för att börja.</p></div>';
    }

    var niva = S.sqlNivaer.filter(function (n) { return n.niva === o.niva; })[0];
    var post = S.store.sqlPost(o.id);
    var def = databas(o.db);

    var h = '<div class="kort">';
    h += '<div class="sqlhuvud">';
    h += '<span class="markor aktuell">Nivå ' + o.niva + ' · ' + U.esc(niva.namn) + '</span>';
    h += '<span class="sqldbmarke" title="Övningen körs mot den här databasen">' +
         U.esc(def.namn) + '</span>';
    if (post) {
      h += '<span class="nivaetikett ' + (post.hjalp ? 'ne-3' : 'ne-5') + '">' +
           (post.hjalp ? '✓ Löst med hjälp' : '✓ Löst') + '</span>';
    }
    h += '<span style="flex:1"></span>';
    h += '<button class="lankbtn" data-sqlsteg="-1">← Föregående</button>';
    h += '<button class="lankbtn" data-sqlsteg="1">Nästa →</button>';
    h += '</div>';

    if (o.tenta) {
      h += '<div class="notis tenta"><strong>Från en riktig tenta.</strong> ' +
           U.esc(o.tenta) + '</div>';
    }

    h += '<p class="sqlfraga">' + U.esc(o.fraga) + '</p>';

    h += '<textarea id="sqlfalt" class="sqlfalt" spellcheck="false" ' +
         'placeholder="SELECT ...">' + U.esc(sparadText(o)) + '</textarea>';
    h += '<p class="muted mini sqltips">Ctrl/Cmd + Enter kör frågan.</p>';

    h += '<div class="knapprad">';
    h += '<button class="primar" id="sql-kor">Kör ▸</button>';
    h += '<button class="sekundar" id="sql-rensa">Rensa</button>';
    if (!visadLedtrad) h += '<button class="sekundar" id="sql-ledtrad">Ledtråd</button>';
    if (!visatFacit) h += '<button class="sekundar" id="sql-facit">Visa lösning</button>';
    h += '</div>';

    if (visadLedtrad && !visatFacit) {
      h += '<div class="notis info" style="margin-top:1rem"><strong>Ledtråd.</strong> ' +
           U.esc(o.ledtrad) + '</div>';
    }

    h += svarsruta(o);

    if (visatFacit) {
      h += '<h3>Referenslösning</h3>';
      h += '<pre class="kodruta">' + U.esc(o.losning) + '</pre>';
      h += '<div class="notis">' + U.block(o.forklaring) + '</div>';
    }

    h += '</div>';
    return h;
  }

  function svarsruta(o) {
    if (!senasteSvar) return '';
    var r = senasteSvar;

    if (r.typ === 'fel') {
      return '<div class="facitbox fel" style="margin-top:1rem">' +
             '<div class="facitrubrik"><span class="facitikon fel">✕</span>' +
             '<h3 style="margin:0">Frågan gick inte att köra</h3></div>' +
             '<pre class="kodruta">' + U.esc(r.text) + '</pre>' +
             '<p class="liten" style="margin-bottom:0">Läs felmeddelandet — det pekar oftast ' +
             'ut exakt var i frågan det tog stopp.</p></div>';
    }

    var h = '<div class="facitbox ' + (r.typ === 'ratt' ? 'ratt' : '') + '" style="margin-top:1rem">';
    h += '<div class="facitrubrik"><span class="facitikon ' +
         (r.typ === 'ratt' ? 'ratt">✓' : 'neutral">–') + '</span>';
    h += '<h3 style="margin:0">' +
         (r.typ === 'ratt' ? 'Rätt — samma resultat som facit'
                           : 'Frågan kördes, men resultatet stämmer inte') + '</h3></div>';

    if (r.typ !== 'ratt' && o) {
      h += '<p class="liten">Ditt svar gav ' + antalText(r.rader) + '. Facit ger ' +
           antalText(r.facitRader) + '.' +
           (o.ordning ? ' Den här uppgiften kräver dessutom rätt ordning på raderna.' : '') +
           '</p>';
    }
    h += '</div>';

    h += resultattabell(r.kolumner, r.rader, r.andrade);
    return h;
  }

  function antalText(rader) {
    if (!rader) return 'inget resultat';
    return rader.length + (rader.length === 1 ? ' rad' : ' rader');
  }

  function resultattabell(kolumner, rader, andrade) {
    if (!kolumner) {
      return '<p class="muted liten">Satsen ändrade ' + (andrade || 0) +
             (andrade === 1 ? ' rad' : ' rader') + ' och returnerade ingen resultatmängd.</p>';
    }
    if (!rader.length) {
      return '<p class="muted liten">Frågan kördes men gav noll rader. ' +
             'Ett tomt resultat är ibland det rätta svaret — kontrollera villkoret ' +
             'i WHERE innan du antar att något gått fel.</p>';
    }

    var h = '<div class="tabellwrap"><table class="sqltabell"><thead><tr>';
    kolumner.forEach(function (k) { h += '<th>' + U.esc(k) + '</th>'; });
    h += '</tr></thead><tbody>';
    rader.slice(0, 60).forEach(function (rad) {
      h += '<tr>';
      rad.forEach(function (v) {
        h += '<td>' + (v === null ? '<span class="nullvarde">NULL</span>' : U.esc(v)) + '</td>';
      });
      h += '</tr>';
    });
    h += '</tbody></table></div>';
    if (rader.length > 60) {
      h += '<p class="muted mini">Visar 60 av ' + rader.length + ' rader.</p>';
    }
    return h;
  }

  function frittkort() {
    var h = '<div class="kort">';
    h += '<h3 style="margin-top:0">Fritt läge</h3>';
    h += '<p class="muted liten">Skriv vad du vill. Databasen byggs om före varje ' +
         'körning, så du kan testa DROP TABLE utan att något går sönder på riktigt.</p>';

    h += '<div class="chiprad">';
    S.sqlDatabaser.forEach(function (d) {
      h += '<button class="chip' + (frittDb === d.id ? ' vald' : '') +
           '" data-frittdb="' + U.esc(d.id) + '">' + U.esc(d.namn) + '</button>';
    });
    h += '</div>';

    h += '<textarea id="sqlfalt" class="sqlfalt" spellcheck="false">' +
         U.esc(fritext) + '</textarea>';
    h += '<p class="muted mini sqltips">Ctrl/Cmd + Enter kör frågan.</p>';
    h += '<div class="knapprad">';
    h += '<button class="primar" id="sql-kor">Kör ▸</button>';
    h += '<button class="sekundar" id="sql-rensa">Rensa</button>';
    h += '</div>';

    if (senasteSvar) {
      if (senasteSvar.typ === 'fel') {
        h += '<div class="facitbox fel" style="margin-top:1rem">' +
             '<div class="facitrubrik"><span class="facitikon fel">✕</span>' +
             '<h3 style="margin:0">Fel i frågan</h3></div>' +
             '<pre class="kodruta">' + U.esc(senasteSvar.text) + '</pre></div>';
      } else {
        h += resultattabell(senasteSvar.kolumner, senasteSvar.rader, senasteSvar.andrade);
      }
    }
    h += '</div>';
    return h;
  }

  function ovningslista() {
    var h = '<div class="kort">';
    h += '<h2>Övningar</h2>';
    h += '<p class="muted mini">Nio nivåer, ' + S.sqlOvningar.length +
         ' uppgifter. De bygger på varandra — ta dem i ordning första gången. ' +
         'Klicka på nivåns rubrik för att läsa lektionen.</p>';

    S.sqlNivaer.forEach(function (n) {
      var iNiva = S.sqlOvningar.filter(function (o) { return o.niva === n.niva; });
      var lostaHar = iNiva.filter(function (o) { return S.store.sqlLost(o.id); }).length;

      h += '<div class="sqlniva">';
      h += '<button class="sqlniva-rubrik" data-sqlniva="' + n.niva + '"' +
           ' aria-expanded="' + (oppnaNivaer[n.niva] ? 'true' : 'false') + '">';
      h += '<span class="sqlniva-nr">' + n.niva + '</span>';
      h += '<span class="sqlniva-text"><span class="sqlniva-namn">' + U.esc(n.namn) + '</span>';
      h += '<span class="sqlniva-antal">' + lostaHar + ' av ' + iNiva.length + '</span></span>';
      h += '<span class="sqlniva-pil">' + (oppnaNivaer[n.niva] ? '▾' : '▸') + '</span>';
      h += '</button>';

      if (oppnaNivaer[n.niva]) {
        h += '<div class="sqllektion lastext">' + U.block(n.lektion) + '</div>';
      } else {
        h += '<p class="sqlniva-intro">' + U.esc(n.kort) + '</p>';
      }

      h += '<div class="sqluppgifter">';
      iNiva.forEach(function (o, i) {
        var post = S.store.sqlPost(o.id);
        h += '<button class="sqluppgift' + (o.id === aktivId ? ' vald' : '') +
             (post ? (post.hjalp ? ' last-hjalp' : ' last') : '') +
             '" data-sqlovning="' + U.esc(o.id) + '">';
        h += '<span class="sqlu-nr">' + (post ? '✓' : n.niva + '.' + (i + 1)) + '</span>';
        h += '<span class="sqlu-text">' + U.esc(o.fraga) +
             (o.tenta ? ' <span class="sqlu-tenta">tenta</span>' : '') + '</span>';
        h += '</button>';
      });
      h += '</div></div>';
    });

    h += '</div>';
    return h;
  }

  /* ---------------------------------------------------------------- */

  var utkast = {};   // ovningsId -> senast skrivna text, lever under sessionen
  function sparadText(o) { return utkast[o.id] !== undefined ? utkast[o.id] : ''; }

  function aktivOvning() {
    if (!aktivId) return null;
    return S.sqlOvningar.filter(function (o) { return o.id === aktivId; })[0] || null;
  }

  function valjOvning(id) {
    aktivId = id;
    visadLedtrad = false;
    visatFacit = false;
    togHjalp = false;
    senasteSvar = null;
    rendera();
    var f = U.el('sqlfalt');
    if (f) f.focus();
  }

  function stega(riktning) {
    var i = -1;
    S.sqlOvningar.forEach(function (o, k) { if (o.id === aktivId) i = k; });
    var ny = i + riktning;
    if (ny < 0 || ny >= S.sqlOvningar.length) return;
    valjOvning(S.sqlOvningar[ny].id);
  }

  function korNu() {
    var falt = U.el('sqlfalt');
    if (!falt) return;
    var text = falt.value.trim();
    if (!text) return;

    if (lage === 'fritt') {
      fritext = falt.value;
      var db = nyDatabas(frittDb);
      try { senasteSvar = kor(db, text); senasteSvar.typ = 'ok'; }
      catch (e) { senasteSvar = { typ: 'fel', text: e.message }; }
      db.close();
      rendera();
      return;
    }

    var o = aktivOvning();
    if (!o) return;
    utkast[o.id] = falt.value;
    senasteSvar = rattaSvar(o, text);

    if (senasteSvar.typ === 'ratt') {
      S.store.markeraSqlLost(o.id, togHjalp);
      visatFacit = true;      /* rätt svar visar förklaringen direkt */
    }
    rendera();
  }

  function koppla(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-sqllage]'), function (b) {
      b.addEventListener('click', function () {
        lage = b.dataset.sqllage;
        senasteSvar = null;
        rendera();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-frittdb]'), function (b) {
      b.addEventListener('click', function () {
        frittDb = b.dataset.frittdb;
        senasteSvar = null;
        rendera();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-sqlovning]'), function (b) {
      b.addEventListener('click', function () { valjOvning(b.dataset.sqlovning); });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-sqlniva]'), function (b) {
      b.addEventListener('click', function () {
        var n = b.dataset.sqlniva;
        oppnaNivaer[n] = !oppnaNivaer[n];
        rendera();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-sqlsteg]'), function (b) {
      b.addEventListener('click', function () { stega(parseInt(b.dataset.sqlsteg, 10)); });
    });

    knapp('sql-kor', korNu);
    knapp('sql-rensa', function () {
      var f = U.el('sqlfalt');
      if (f) { f.value = ''; f.focus(); }
      var o = aktivOvning();
      if (o) utkast[o.id] = '';
      senasteSvar = null;
      rendera();
    });
    knapp('sql-ledtrad', function () { visadLedtrad = true; togHjalp = true; rendera(); });
    knapp('sql-facit', function () { visatFacit = true; togHjalp = true; rendera(); });
    knapp('sql-tabeller', visaTabeller);

    var falt = U.el('sqlfalt');
    if (falt) {
      falt.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') { e.preventDefault(); korNu(); }
      });
      falt.addEventListener('input', function () {
        var o = aktivOvning();
        if (lage === 'fritt') fritext = falt.value;
        else if (o) utkast[o.id] = falt.value;
      });
    }

    function knapp(id, fn) {
      var b = U.el(id);
      if (b) b.addEventListener('click', fn);
    }
  }

  /* ---------------------------------------------------------------- */
  /* Databasrutan                                                      */
  /* ---------------------------------------------------------------- */

  /* Vilken databas rutan ska visa: den aktiva övningens, annars den man
     valt i fritt läge. */
  function visadDatabas() {
    if (lage === 'fritt') return frittDb;
    var o = aktivOvning();
    return o ? o.db : 'sjukhus';
  }

  function visaTabeller() {
    var valdId = visadDatabas();

    U.overlagg.oppna(function (b) {
      var def = databas(valdId);
      var db = nyDatabas(valdId);
      var innehall = def.tabeller.map(function (t) {
        var r = db.exec('SELECT * FROM ' + t.namn + ';');
        return { namn: t.namn, text: t.text, res: r.length ? r[0] : null };
      });
      db.close();

      var h = '<div class="overlagg-ruta bred-ruta">';
      h += '<div class="overlagg-topp">';
      h += '<h2 id="overlagg-rubrik" class="utan-markor">' + U.esc(def.namn) + '</h2>';
      h += '<button class="ikonknapp" id="tb-stang" aria-label="Stäng">✕</button></div>';

      h += '<div class="chiprad">';
      S.sqlDatabaser.forEach(function (d) {
        h += '<button class="chip' + (valdId === d.id ? ' vald' : '') +
             '" data-visadb="' + U.esc(d.id) + '">' + U.esc(d.namn) + '</button>';
      });
      h += '</div>';

      h += '<div class="lastext" style="font-size:1rem">' + U.block(def.beskrivning) + '</div>';

      /* Schemakartan ritas ur samma metadata som tabellerna nedan */
      h += '<div class="lastext">' +
           S.diagram.rita(valdId === 'sjukhus' ? 'db-sjukhus' : 'db-tenta') +
           '</div>';

      h += '<h3>Kursens DDL</h3>';
      h += '<p class="muted liten">Det här är T-SQL, ordagrant som i kursmaterialet. ' +
           'Verkstaden översätter den till SQLite åt dig.</p>';
      h += '<pre class="kodruta">' + U.esc(def.ddl) + '</pre>';

      h += '<h3>Innehållet</h3>';
      innehall.forEach(function (t) {
        h += '<h4 class="tabellrubrik">' + U.esc(t.namn) +
             ' <span class="muted liten">' + U.esc(t.text) + '</span></h4>';
        if (t.res) {
          h += '<div class="tabellwrap"><table class="sqltabell"><thead><tr>';
          t.res.columns.forEach(function (k) { h += '<th>' + U.esc(k) + '</th>'; });
          h += '</tr></thead><tbody>';
          t.res.values.forEach(function (rad) {
            h += '<tr>';
            rad.forEach(function (v) {
              h += '<td>' + (v === null ? '<span class="nullvarde">NULL</span>' : U.esc(v)) + '</td>';
            });
            h += '</tr>';
          });
          h += '</tbody></table></div>';
        }
      });

      h += '<div class="overlagg-knappar"><button class="primar" id="tb-klar">Stäng</button></div>';
      b.innerHTML = h + '</div>';

      U.el('tb-stang').addEventListener('click', function () { U.overlagg.stang(); });
      U.el('tb-klar').addEventListener('click', function () { U.overlagg.stang(); });

      Array.prototype.forEach.call(b.querySelectorAll('[data-visadb]'), function (knapp) {
        knapp.addEventListener('click', function () {
          valdId = knapp.dataset.visadb;
          U.overlagg.rita();
        });
      });
    });
  }

  return { rendera: rendera };
})();
