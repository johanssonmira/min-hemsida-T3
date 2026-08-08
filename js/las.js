/* =========================================================================
   las.js – kompendium, ordlista och sökning över båda.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.las = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var oppetKapitel = null;   // id på kapitlet som visas, null = listvyn
  var sokterm = '';

  function rendera() {
    if (oppetKapitel) renderaKapitel();
    else renderaLista();
  }

  function oppna(kapitelId) {
    oppetKapitel = kapitelId;
    S.app.visaVy('las');
  }

  function stang() {
    oppetKapitel = null;
    rendera();
    window.scrollTo(0, 0);
  }

  /* ---------------------------------------------------------------- */
  /* Listvyn                                                           */
  /* ---------------------------------------------------------------- */

  function renderaLista() {
    var delkurs = S.store.delkurs();
    var komp = S.kompendium[delkurs];
    var vy = U.el('vy-las');
    var html = '';

    /* Sökruta */
    html += '<div class="kort">';
    html += '<h2>Läs</h2>';
    html += '<p class="muted liten">Läs kapitlen för att förstå. Slå upp ord i ordlistan när du ' +
            'fastnar. Sökrutan letar i båda samtidigt.</p>';
    html += '<input type="search" id="sok" class="sokruta" placeholder="Sök efter ett ord eller ämne" ' +
            'value="' + U.esc(sokterm) + '">';
    html += '<div id="soktraffar"></div>';
    html += '</div>';

    if (!komp || !komp.kapitel.length) {
      html += '<div class="kort"><h2>Kompendium</h2>' +
              '<p class="muted">Kompendiet för ' + U.esc(U.delkursNamn(delkurs)) +
              ' är inte skrivet än. Använd Öva-läget så länge – där finns förklaringar till varje fråga.</p>' +
              '</div>';
    } else {
      var lasta = S.store.antalLasta(komp.kapitel);
      var procent = Math.round((lasta / komp.kapitel.length) * 100);

      html += '<div class="kort">';
      html += '<h2>' + U.esc(komp.titel) + '</h2>';
      html += U.block(komp.intro);

      html += '<div style="display:flex;align-items:center;gap:.8rem;margin:1rem 0 .3rem">';
      html += '<div class="progress' + (procent === 100 ? ' gron' : '') +
              '" style="flex:1"><div style="width:' + procent + '%"></div></div>';
      html += '<span class="liten muted">' + lasta + ' av ' + komp.kapitel.length + '</span>';
      html += '</div>';

      var forsta = komp.kapitel.filter(function (k) { return !S.store.arLast(k.id); })[0];
      if (forsta) {
        html += '<div class="knapprad"><button class="primar" data-oppna="' + U.esc(forsta.id) + '">' +
                (lasta === 0 ? 'Börja läsa' : 'Fortsätt med kapitel ' + forsta.nr) + '</button></div>';
      }
      html += '</div>';

      html += '<div class="kort">';
      var forstaOlast = komp.kapitel.filter(function (k) { return !S.store.arLast(k.id); })[0];

      komp.kapitel.forEach(function (k) {
        var last = S.store.arLast(k.id);
        var arNasta = forstaOlast && k.id === forstaOlast.id;

        html += '<div class="kapitel' + (last ? ' last' : '') + (arNasta ? ' nasta' : '') +
                '" data-oppna="' + U.esc(k.id) + '">';
        html += '<span class="kap-nr">' + (last ? '✓' : k.nr) + '</span>';
        html += '<span class="kap-kropp">';
        html += '<span class="kap-titel">' + U.esc(k.titel) + '</span>';
        html += '<span class="kap-ingress">' + U.esc(k.ingress) + '</span>';

        /* Visar hur väl du kan kapitlets ämnen – kopplar läsning till övning */
        html += '<span class="kap-meta">ca ' + k.lastid + ' min';
        if (k.amnen && k.amnen.length) {
          var snitt = k.amnen.reduce(function (n, a) {
            return n + S.store.amnesNiva(a).n; }, 0) / k.amnen.length;
          /* Visas först när du börjat öva – annars är siffran bara brus */
          if (snitt > 0) html += ' · du ligger på nivå ' + snitt.toFixed(1) + ' av 5 här';
        }
        html += '</span>';
        html += '</span>';

        html += '<span class="kap-status">' +
                (last ? '<span class="nivaetikett ne-5">Läst</span>'
                      : (arNasta ? '<span class="nivaetikett ne-2">Näst på tur</span>'
                                 : '<span class="nivaetikett ne-0">Oläst</span>')) +
                '</span>';
        html += '</div>';
      });
      html += '</div>';
    }

    /* Ordlista */
    var ord = S.ordlista.filter(function (o) { return o.delkurs === delkurs; });
    html += '<div class="kort">';
    html += '<h2>Ordlista <span class="muted liten">' + ord.length + ' termer</span></h2>';
    html += '<div id="ordlistan">';
    ord.forEach(function (o) {
      html += '<div class="ordpost"><div class="term">' + U.esc(o.term) + '</div>' +
              '<div class="def">' + U.inline(o.forklaring) + '</div></div>';
    });
    html += '</div></div>';

    vy.innerHTML = html;

    Array.prototype.forEach.call(vy.querySelectorAll('[data-oppna]'), function (e) {
      e.addEventListener('click', function () { oppna(e.dataset.oppna); });
    });

    var sokfalt = U.el('sok');
    if (sokfalt) {
      sokfalt.addEventListener('input', function () {
        sokterm = sokfalt.value;
        visaTraffar();
      });
      if (sokterm) visaTraffar();
    }
  }

  /* ---------------------------------------------------------------- */
  /* Sökning                                                           */
  /* ---------------------------------------------------------------- */

  function visaTraffar() {
    var ruta = U.el('soktraffar');
    if (!ruta) return;

    var q = sokterm.trim().toLowerCase();
    if (q.length < 2) { ruta.innerHTML = ''; return; }

    var delkurs = S.store.delkurs();
    var traffar = [];

    /* Ordlistan */
    S.ordlista.forEach(function (o) {
      if (o.term.toLowerCase().indexOf(q) > -1 || o.forklaring.toLowerCase().indexOf(q) > -1) {
        traffar.push({
          typ: 'Ordlista', rubrik: o.term, text: o.forklaring,
          kapitel: o.kapitel, vikt: o.term.toLowerCase().indexOf(q) === 0 ? 0 : 2,
          egenDelkurs: o.delkurs === delkurs
        });
      }
    });

    /* Kompendiet */
    Object.keys(S.kompendium).forEach(function (dk) {
      S.kompendium[dk].kapitel.forEach(function (k) {
        if (k.titel.toLowerCase().indexOf(q) > -1 || k.ingress.toLowerCase().indexOf(q) > -1) {
          traffar.push({
            typ: 'Kapitel ' + k.nr, rubrik: k.titel, text: k.ingress,
            kapitel: k.id, vikt: 1, egenDelkurs: dk === delkurs
          });
        }
        k.avsnitt.forEach(function (a) {
          if (a.rubrik.toLowerCase().indexOf(q) > -1 ||
              (a.text && a.text.toLowerCase().indexOf(q) > -1)) {
            traffar.push({
              typ: 'Kapitel ' + k.nr, rubrik: a.rubrik,
              text: utdrag(a.text, q), kapitel: k.id, vikt: 3,
              egenDelkurs: dk === delkurs
            });
          }
        });
        (k.nyckelbegrepp || []).forEach(function (n) {
          if (n.toLowerCase().indexOf(q) > -1) {
            traffar.push({
              typ: 'Nyckelbegrepp', rubrik: n.split(':')[0], text: n,
              kapitel: k.id, vikt: 1, egenDelkurs: dk === delkurs
            });
          }
        });
      });
    });

    traffar.sort(function (a, b) {
      if (a.egenDelkurs !== b.egenDelkurs) return a.egenDelkurs ? -1 : 1;
      return a.vikt - b.vikt;
    });

    if (!traffar.length) {
      ruta.innerHTML = '<p class="muted liten" style="margin-top:.7rem">Inga träffar på "' +
                       U.esc(sokterm) + '".</p>';
      return;
    }

    var html = '<p class="muted mini" style="margin:.7rem 0 .2rem">' + traffar.length +
               ' träffar</p>';
    traffar.slice(0, 25).forEach(function (t) {
      html += '<div class="traff"' + (t.kapitel ? ' data-oppna="' + U.esc(t.kapitel) + '"' : '') + '>';
      html += '<span class="t-typ">' + U.esc(t.typ) + '</span>';
      html += '<span class="t-rubrik">' + U.esc(t.rubrik) + '</span>';
      html += '<div class="t-text">' + U.esc(kapa(t.text, 170)) + '</div>';
      html += '</div>';
    });
    ruta.innerHTML = html;

    Array.prototype.forEach.call(ruta.querySelectorAll('[data-oppna]'), function (e) {
      e.addEventListener('click', function () { oppna(e.dataset.oppna); });
    });
  }

  function utdrag(text, q) {
    if (!text) return '';
    var i = text.toLowerCase().indexOf(q);
    if (i < 0) return text.slice(0, 170);
    var start = Math.max(0, i - 60);
    return (start > 0 ? '…' : '') + text.slice(start, start + 200);
  }

  function kapa(text, n) {
    var rent = String(text || '').replace(/\*\*/g, '').replace(/`/g, '').replace(/\n/g, ' ');
    return rent.length > n ? rent.slice(0, n) + '…' : rent;
  }

  /* ---------------------------------------------------------------- */
  /* Kapitelvyn                                                        */
  /* ---------------------------------------------------------------- */

  function renderaKapitel() {
    var delkurs = S.store.delkurs();
    var komp = null, kap = null;

    Object.keys(S.kompendium).forEach(function (dk) {
      S.kompendium[dk].kapitel.forEach(function (k) {
        if (k.id === oppetKapitel) { komp = S.kompendium[dk]; kap = k; }
      });
    });

    if (!kap) { oppetKapitel = null; renderaLista(); return; }

    var index = komp.kapitel.indexOf(kap);
    var foreg = komp.kapitel[index - 1];
    var nasta = komp.kapitel[index + 1];
    var last = S.store.arLast(kap.id);

    var html = '';

    html += '<div class="kort">';
    html += '<button class="lankbtn" id="tillbaka">← Alla kapitel</button>';
    html += '<h1 style="margin-top:.6rem">' + kap.nr + '. ' + U.esc(kap.titel) + '</h1>';
    html += '<p class="muted">' + U.esc(kap.ingress) + '</p>';
    html += '<p class="muted mini">ca ' + kap.lastid + ' min · ' +
            U.esc(komp.titel) + '</p>';
    html += '</div>';

    html += '<div class="kort lastext">';
    kap.avsnitt.forEach(function (a) {
      html += '<h3>' + U.esc(a.rubrik) + '</h3>';
      html += U.block(a.text);
    });
    html += '</div>';

    if (kap.nyckelbegrepp && kap.nyckelbegrepp.length) {
      html += '<div class="kort faktaruta">';
      html += '<h3>Det viktigaste i kapitlet</h3><ul>';
      kap.nyckelbegrepp.forEach(function (n) { html += '<li>' + U.inline(n) + '</li>'; });
      html += '</ul></div>';
    }

    if (kap.tentakoppling) {
      html += '<div class="kort tentaruta"><h3>Koppling till tentan</h3>' +
              '<p class="liten" style="margin-bottom:0">' + U.inline(kap.tentakoppling) +
              '</p></div>';
    }

    /* Öva på kapitlets ämnen */
    if (kap.amnen && kap.amnen.length) {
      var antal = S.fragor.filter(function (f) { return kap.amnen.indexOf(f.amne) > -1; }).length;
      html += '<div class="kort">';
      html += '<h3 style="margin-top:0">Testa dig på kapitlet</h3>';
      html += '<p class="liten muted">' + antal + ' frågor hör till det här kapitlet. ' +
              'Klicka på ett ämne för att börja.</p>';
      html += '<div class="chiprad">';
      kap.amnen.forEach(function (a) {
        var n = S.fragor.filter(function (f) { return f.amne === a; }).length;
        var niva = S.store.amnesNiva(a);
        html += '<button class="chip" data-ovaamne="' + U.esc(a) + '" title="' +
                U.esc(niva.namn + ' – ' + niva.beskrivning) + '">' +
                U.nivaPrick(niva.n) +
                U.esc(U.amneNamn(a)) + ' <span class="antal">' + n + '</span></button>';
      });
      html += '</div></div>';
    }

    /* Läsmarkering och navigering */
    html += '<div class="kort">';
    html += '<div class="knapprad">';
    html += '<button class="' + (last ? 'sekundar' : 'primar') + '" id="markera">' +
            (last ? '✓ Markerad som läst' : 'Markera som läst') + '</button>';
    if (nasta) {
      html += '<button class="primar" data-oppna="' + U.esc(nasta.id) + '">' +
              'Nästa: ' + U.esc(nasta.titel) + ' →</button>';
    }
    html += '</div>';
    if (foreg) {
      html += '<div class="knapprad"><button class="sekundar" data-oppna="' + U.esc(foreg.id) +
              '">← ' + U.esc(foreg.titel) + '</button></div>';
    }
    html += '</div>';

    var vy = U.el('vy-las');
    vy.innerHTML = html;

    U.el('tillbaka').addEventListener('click', stang);

    U.el('markera').addEventListener('click', function () {
      S.store.markeraLast(kap.id, !S.store.arLast(kap.id));
      renderaKapitel();
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-oppna]'), function (e) {
      e.addEventListener('click', function () {
        // Markera automatiskt som läst när man går vidare framåt
        if (nasta && e.dataset.oppna === nasta.id) S.store.markeraLast(kap.id, true);
        oppna(e.dataset.oppna);
        window.scrollTo(0, 0);
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-ovaamne]'), function (b) {
      b.addEventListener('click', function () { S.app.ovaAmne(b.dataset.ovaamne); });
    });
  }

  return { rendera: rendera, oppna: oppna, stang: stang };
})();
