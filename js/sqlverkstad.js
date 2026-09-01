/* =========================================================================
   sqlverkstad.js – en riktig databas i webbläsaren.

   SQLite är kompilerat till WebAssembly (sql.js, MIT) och ligger i
   vendor/. Motorn laddas först när man öppnar vyn, så resten av appen
   startar lika snabbt som förut.

   Databasen byggs om från grunden före VARJE körning. Det gör två saker:
   ingenting man skriver kan förstöra något, och en övning som ändrar data
   påverkar inte nästa.

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
  var senasteSvar = null;     // { typ, text, kolumner, rader, antal }
  var fritext = 'SELECT * FROM Employee;';
  var oppnaNivaer = {};       // nivå -> true om introtexten är utfälld

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

  /* En ny databas varje gång. Billigt — hela datamängden är några kilobyte. */
  function nyDatabas() {
    var db = new SQL.Database();
    S.sqlSchema.forEach(function (s) { db.run(s); });
    S.sqlData.forEach(function (s) { db.run(s); });
    return db;
  }

  /* Kör SQL och returnera { kolumner, rader } för sista SELECT-satsen,
     eller { andrade: n } för satser som bara ändrar data. */
  function kor(db, sql) {
    var res = db.exec(sql);
    if (res.length) {
      var sista = res[res.length - 1];
      return { kolumner: sista.columns, rader: sista.values };
    }
    return { kolumner: null, rader: null, andrade: db.getRowsModified() };
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

    var ra = a.rader.map(radText);
    var rb = b.rader.map(radText);
    if (!kravOrdning) { ra.sort(); rb.sort(); }
    for (var i = 0; i < ra.length; i++) if (ra[i] !== rb[i]) return false;
    return true;
  }

  /* Tal och sifferström jämförs lika: 6 och "6" är samma svar. */
  function radText(rad) {
    return rad.map(function (v) {
      if (v === null || v === undefined) return '\u0000NULL';   /* sentinel — kan aldrig krocka med texten "NULL" */
      if (typeof v === 'number') return String(v);
      var n = Number(v);
      return (v !== '' && !isNaN(n)) ? String(n) : String(v);
    }).join('\u0001');   /* avskiljare som inte kan finnas i datan */
  }

  function rattaSvar(ovning, svar) {
    var db = nyDatabas();
    var mitt, facit;

    try {
      kor(db, svar);
      mitt = ovning.kontroll ? kor(db, ovning.kontroll) : senaste(db, svar);
    } catch (e) {
      db.close();
      return { typ: 'fel', text: e.message };
    }
    db.close();

    var db2 = nyDatabas();
    kor(db2, ovning.losning);
    facit = ovning.kontroll ? kor(db2, ovning.kontroll) : kor(db2, ovning.losning);
    db2.close();

    var ratt = likaResultat(mitt, facit, !!ovning.ordning);
    return {
      typ: ratt ? 'ratt' : 'nastan',
      kolumner: mitt.kolumner, rader: mitt.rader,
      facitRader: facit.rader, facitKolumner: facit.kolumner,
      andrade: mitt.andrade
    };
  }

  /* För övningar utan kontrollfråga: resultatet av satsen man körde. */
  function senaste(db, sql) { return kor(db, sql); }

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
    h += '<p class="muted liten">En riktig SQLite-databas som körs i din webbläsare. ' +
         'Skriv frågan, kör den, och få svaret <strong>rättat mot resultatet</strong> — ' +
         'inte mot hur du skrev den. Databasen byggs om före varje körning, ' +
         'så ingenting du gör kan förstöra den.</p>';

    var losta = S.store.antalSqlLosta();
    var totalt = S.sqlOvningar.length;
    h += '<div style="display:flex;align-items:center;gap:.85rem;margin:.9rem 0">';
    h += '<div class="progress' + (losta === totalt ? ' gron' : '') + '" style="flex:1">' +
         '<div style="width:' + Math.round(losta / totalt * 100) + '%"></div></div>';
    h += '<span class="liten muted" style="white-space:nowrap">' + losta + ' av ' + totalt +
         ' lösta</span></div>';

    h += '<div class="chiprad">';
    h += '<button class="chip' + (lage === 'ovningar' ? ' vald' : '') + '" data-sqllage="ovningar">Övningar</button>';
    h += '<button class="chip' + (lage === 'fritt' ? ' vald' : '') + '" data-sqllage="fritt">Fritt läge</button>';
    h += '<button class="chip" id="sql-tabeller">Visa tabeller</button>';
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

    var niva = S.sqlNivaer.filter(function (n) { return n.n === o.niva; })[0];
    var last = S.store.sqlLost(o.id);

    var h = '<div class="kort">';
    h += '<div class="sqlhuvud">';
    h += '<span class="markor aktuell">Nivå ' + o.niva + ' · ' + U.esc(niva.namn) + '</span>';
    if (last) h += '<span class="nivaetikett ne-5">✓ Löst</span>';
    h += '<span style="flex:1"></span>';
    h += '<button class="lankbtn" data-sqlsteg="-1">← Föregående</button>';
    h += '<button class="lankbtn" data-sqlsteg="1">Nästa →</button>';
    h += '</div>';

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
      h += '<div class="notis"><strong>Varför.</strong> ' + U.esc(o.forklaring) + '</div>';
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
      return '<p class="muted liten">Frågan kördes men gav noll rader.</p>';
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
    h += '<p class="muted liten">Skriv vad du vill mot databasen. Den byggs om före varje ' +
         'körning, så du kan testa DROP TABLE utan att något går sönder på riktigt.</p>';
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
         ' uppgifter. De bygger på varandra — ta dem i ordning första gången.</p>';

    S.sqlNivaer.forEach(function (n) {
      var iNiva = S.sqlOvningar.filter(function (o) { return o.niva === n.n; });
      var lostaHar = iNiva.filter(function (o) { return S.store.sqlLost(o.id); }).length;

      h += '<div class="sqlniva">';
      h += '<button class="sqlniva-rubrik" data-sqlniva="' + n.n + '">';
      h += '<span class="sqlniva-nr">' + n.n + '</span>';
      h += '<span class="sqlniva-text"><span class="sqlniva-namn">' + U.esc(n.namn) + '</span>';
      h += '<span class="sqlniva-antal">' + lostaHar + ' av ' + iNiva.length + '</span></span>';
      h += '</button>';

      if (oppnaNivaer[n.n]) {
        h += '<p class="sqlniva-intro">' + U.esc(n.intro) + '</p>';
      }

      h += '<div class="sqluppgifter">';
      iNiva.forEach(function (o, i) {
        var last = S.store.sqlLost(o.id);
        h += '<button class="sqluppgift' + (o.id === aktivId ? ' vald' : '') +
             (last ? ' last' : '') + '" data-sqlovning="' + U.esc(o.id) + '">';
        h += '<span class="sqlu-nr">' + (last ? '✓' : n.n + '.' + (i + 1)) + '</span>';
        h += '<span class="sqlu-text">' + U.esc(o.fraga) + '</span>';
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
    senasteSvar = null;
    rendera();
    var f = U.el('sqlfalt');
    if (f) f.focus();
  }

  function stega(riktning) {
    var i = S.sqlOvningar.findIndex(function (o) { return o.id === aktivId; });
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
      var db = nyDatabas();
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
      S.store.markeraSqlLost(o.id);
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
    knapp('sql-ledtrad', function () { visadLedtrad = true; rendera(); });
    knapp('sql-facit', function () { visatFacit = true; rendera(); });
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
  /* Tabellöversikten                                                  */
  /* ---------------------------------------------------------------- */

  function visaTabeller() {
    var db = nyDatabas();
    var innehall = S.sqlTabeller.map(function (t) {
      var r = db.exec('SELECT * FROM ' + t.namn + ';');
      return { namn: t.namn, text: t.text, res: r.length ? r[0] : null };
    });
    db.close();

    U.overlagg.oppna(function (b) {
      var h = '<div class="overlagg-ruta bred-ruta">';
      h += '<div class="overlagg-topp">';
      h += '<h2 id="overlagg-rubrik" class="utan-markor">Databasen</h2>';
      h += '<button class="ikonknapp" id="tb-stang" aria-label="Stäng">✕</button></div>';
      h += '<p class="muted liten">Tio tabeller. Datan är konstruerad så att fällorna ' +
           'faktiskt går att träffa: en patient utan adress, en bil utan ägare, ' +
           'en sjukdom ingen lider av och en enhet utan patienter.</p>';

      innehall.forEach(function (t) {
        h += '<h3>' + U.esc(t.namn) + ' <span class="muted liten">' + U.esc(t.text) + '</span></h3>';
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
    });
  }

  return { rendera: rendera };
})();
