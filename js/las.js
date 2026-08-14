/* =========================================================================
   las.js – kompendium, ordlista och sökning över båda.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.las = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var oppetKapitel = null;   // id på kapitlet som visas, null = listvyn
  var sokterm = '';
  var visaAnteckningar = false;   // anteckningsrutan bredvid kapiteltexten
  var visaSamling = false;        // samlingssidan med alla anteckningar
  var sparaTimer = null;

  function rendera() {
    if (visaSamling) renderaSamling();
    else if (oppetKapitel) renderaKapitel();
    else renderaLista();
  }

  function oppna(kapitelId) {
    oppetKapitel = kapitelId;
    visaSamling = false;
    S.app.visaVy('las');
  }

  function stang() {
    oppetKapitel = null;
    visaSamling = false;
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
        if (S.store.anteckning(k.id)) html += ' · <strong>✎ du har anteckningar</strong>';
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

    /* Egna anteckningar – ingång till samlingssidan */
    var antal = S.store.allaAnteckningar(delkurs).length;
    html += '<div class="kort anteckningsingang">';
    html += '<h2>✎ Din sammanfattning</h2>';
    if (antal) {
      html += '<p class="muted liten">Du har skrivit anteckningar i <strong>' + antal +
              (antal === 1 ? ' kapitel' : ' kapitel') + '</strong>. Samlade på ett ställe blir de ' +
              'en sammanfattning i dina egna ord — det bästa du kan läsa dagen före tentan.</p>';
    } else {
      html += '<p class="muted liten">Öppna ett kapitel och tryck på <strong>✎ Anteckna</strong> ' +
              'så får du en skrivruta bredvid texten. Att formulera om det du läser med egna ord ' +
              'fastnar betydligt bättre än att läsa om samma stycke en gång till.</p>';
    }
    html += '<div class="knapprad"><button class="' + (antal ? 'primar' : 'sekundar') +
            '" id="tillsamling">' +
            (antal ? 'Läs din sammanfattning' : 'Se hur det ser ut') + '</button></div>';
    html += '</div>';

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

    stangAnteckningar();          /* rutan hör till ett kapitel, inte till listan */
    vy.innerHTML = html;

    Array.prototype.forEach.call(vy.querySelectorAll('[data-oppna]'), function (e) {
      e.addEventListener('click', function () { oppna(e.dataset.oppna); });
    });

    U.el('tillsamling').addEventListener('click', function () {
      visaSamling = true;
      rendera();
      window.scrollTo(0, 0);
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
    html += '<div class="kaptopp">';
    html += '<div>';
    html += '<h1 style="margin-top:.6rem">' + kap.nr + '. ' + U.esc(kap.titel) + '</h1>';
    html += '<p class="muted">' + U.esc(kap.ingress) + '</p>';
    html += '<p class="muted mini" style="margin-bottom:0">ca ' + kap.lastid + ' min · ' +
            U.esc(komp.titel) + '</p>';
    html += '</div>';
    html += '<button class="' + (visaAnteckningar ? 'primar' : 'sekundar') + ' antknapp" ' +
            'id="anteckningsknapp">✎ ' +
            (visaAnteckningar ? 'Dölj anteckningar' : 'Anteckna') +
            (S.store.anteckning(kap.id) && !visaAnteckningar
              ? '<span class="antprick" title="Du har anteckningar här"></span>' : '') +
            '</button>';
    html += '</div>';
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

    U.el('anteckningsknapp').addEventListener('click', function () {
      if (visaAnteckningar) stangAnteckningar();
      else oppnaAnteckningar(kap);
    });

    /* Rutan lever utanför vyn, så den överlever att kapitlet ritas om.
       Är den redan uppe ska den byta till det kapitel man nu läser. */
    if (visaAnteckningar) oppnaAnteckningar(kap);

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

  /* ---------------------------------------------------------------- */
  /* Anteckningar                                                      */
  /*                                                                   */
  /* Att formulera om det man läser med egna ord är en av de få saker  */
  /* som mäter sig med att öva frågor. Rutan ligger därför bredvid     */
  /* texten, inte på en egen sida — man ska kunna växla utan att       */
  /* tappa var man var.                                                */
  /* ---------------------------------------------------------------- */

  /* Rutan ligger i body och inte i vyn. Den ska stå kvar medan man
     scrollar, byter kapitel och läser vidare — hade den legat i vyn hade
     den försvunnit varje gång kapitlet ritades om. */
  function oppnaAnteckningar(kap) {
    visaAnteckningar = true;
    document.body.classList.add('ant-oppen');

    var panel = U.el('antpanel');
    if (!panel) {
      panel = document.createElement('aside');
      panel.id = 'antpanel';
      panel.className = 'antpanel';
      document.body.appendChild(panel);
    }
    panel.innerHTML = anteckningsruta(kap);
    kopplaAnteckningar(kap);

    var knapp = U.el('anteckningsknapp');
    if (knapp) {
      knapp.className = 'primar antknapp';
      knapp.innerHTML = '✎ Dölj anteckningar';
    }
  }

  function stangAnteckningar() {
    visaAnteckningar = false;
    document.body.classList.remove('ant-oppen');
    var panel = U.el('antpanel');
    if (panel) panel.remove();
    if (sparaTimer) { clearTimeout(sparaTimer); sparaTimer = null; }

    var knapp = U.el('anteckningsknapp');
    if (knapp) knapp.className = 'sekundar antknapp';
    /* Rita om kapitlet så pricken "du har anteckningar här" kommer tillbaka */
    if (oppetKapitel && !visaSamling) renderaKapitel();
  }

  function anteckningsruta(kap) {
    var text = S.store.anteckning(kap.id);
    var andrad = S.store.anteckningAndrad(kap.id);

    var h = '<div class="antpanel-topp">';
    h += '<h2 class="utan-markor">✎ Anteckningar</h2>';
    h += '<button class="ikonknapp" id="antstang" aria-label="Stäng anteckningar">✕</button>';
    h += '</div>';
    h += '<p class="antkapitel">Kapitel ' + kap.nr + ': ' + U.esc(kap.titel) + '</p>';
    h += '<p class="muted mini">Skriv med <strong>egna ord</strong> — det är själva poängen. ' +
         'Sparas automatiskt.</p>';

    h += '<textarea id="antfalt" class="antfalt" placeholder="Vad är kärnan i det du just läste?&#10;&#10;' +
         'Skriv som om du förklarade för någon annan.">' + U.esc(text) + '</textarea>';

    h += '<div class="antrad">';
    h += '<button class="minibtn" id="antklipp" title="Lägg till texten du markerat i kapitlet">' +
         '↧ Ta med markerad text</button>';
    h += '<span class="muted mini" id="antstatus">' +
         (andrad ? 'Sparad ' + U.esc(U.tidssedan(andrad)) : 'Inget skrivet än') + '</span>';
    h += '</div>';

    h += '<div class="antmallar">';
    h += '<span class="muted mini">Fastnat? Börja med:</span>';
    ['Kärnan är att…', 'Detta hänger ihop med…', 'På tentan kan de fråga…',
     'Det jag inte fattar är…'].forEach(function (m) {
      h += '<button class="minibtn" data-antmall="' + U.esc(m) + '">' + U.esc(m) + '</button>';
    });
    h += '</div>';

    h += '<div class="knapprad"><button class="sekundar" id="antsamling">' +
         'Alla mina anteckningar →</button></div>';
    return h;
  }

  function kopplaAnteckningar(kap) {
    var falt = U.el('antfalt');
    var status = U.el('antstatus');

    U.el('antstang').addEventListener('click', stangAnteckningar);

    /* Sparas en halv sekund efter sista tangenttrycket. Att spara vid varje
       tecken skriver till localStorage hundratals gånger i onödan. */
    falt.addEventListener('input', function () {
      status.textContent = 'Skriver…';
      clearTimeout(sparaTimer);
      sparaTimer = setTimeout(function () {
        S.store.sparaAnteckning(kap.id, falt.value);
        status.textContent = 'Sparad ' + U.tidssedan(new Date().toISOString());
      }, 500);
    });

    /* Markerad text i kapitlet flyttas in som citat. Snabbare än att skriva
       av, och citatmarkeringen håller isär källtext och egna ord. */
    U.el('antklipp').addEventListener('click', function () {
      var vald = String(window.getSelection());
      if (!vald.trim()) {
        status.textContent = 'Markera först ett stycke i texten till vänster.';
        return;
      }
      var ny = (falt.value ? falt.value.replace(/\s+$/, '') + '\n\n' : '') +
               '> ' + vald.trim().replace(/\s+/g, ' ') + '\n\n';
      falt.value = ny;
      S.store.sparaAnteckning(kap.id, ny);
      status.textContent = 'Tillagd';
      falt.focus();
      falt.setSelectionRange(ny.length, ny.length);
      falt.scrollTop = falt.scrollHeight;
    });

    Array.prototype.forEach.call(document.querySelectorAll('[data-antmall]'), function (b) {
      b.addEventListener('click', function () {
        var ny = (falt.value ? falt.value.replace(/\s+$/, '') + '\n' : '') +
                 b.dataset.antmall + ' ';
        falt.value = ny;
        S.store.sparaAnteckning(kap.id, ny);
        falt.focus();
        falt.setSelectionRange(ny.length, ny.length);
      });
    });

    U.el('antsamling').addEventListener('click', function () {
      stangAnteckningar();
      visaSamling = true;
      rendera();
      window.scrollTo(0, 0);
    });
  }

  /* ---------------------------------------------------------------- */
  /* Samlingssidan – alla anteckningar som ett sammanhängande häfte    */
  /* ---------------------------------------------------------------- */

  function renderaSamling() {
    var delkurs = S.store.delkurs();
    var alla = S.store.allaAnteckningar(delkurs);
    var komp = S.kompendium[delkurs];

    var html = '<div class="kort">';
    html += '<button class="lankbtn" id="tillbaka">← Tillbaka</button>';
    html += '<h1 style="margin-top:.6rem">Din sammanfattning</h1>';
    html += '<p class="muted">' + U.esc(U.delkursNamn(delkurs)) + ' — allt du skrivit medan ' +
            'du läst, i kapitelordning. Det här är din egen version av kursen.</p>';

    if (alla.length) {
      var ord = alla.reduce(function (n, a) { return n + a.text.split(/\s+/).length; }, 0);
      html += '<div class="statgrid">';
      html += '<div class="statruta"><div class="v">' + alla.length + '</div>' +
              '<div class="l">av ' + (komp ? komp.kapitel.length : 0) + ' kapitel</div></div>';
      html += '<div class="statruta"><div class="v">' + ord + '</div>' +
              '<div class="l">ord du skrivit</div></div>';
      html += '</div>';

      html += '<div class="knapprad">';
      html += '<button class="sekundar" id="antkopiera">Kopiera allt</button>';
      html += '<button class="sekundar" id="antladda">Ladda ner som textfil</button>';
      html += '<button class="sekundar" id="antskriv">Skriv ut</button>';
      html += '</div>';
    }
    html += '</div>';

    if (!alla.length) {
      html += '<div class="kort"><p class="muted" style="margin-bottom:0">' +
              'Du har inte skrivit några anteckningar i den här delkursen än. ' +
              'Öppna ett kapitel och tryck på <strong>✎ Anteckna</strong> så hamnar de här.</p></div>';
    }

    alla.forEach(function (a) {
      html += '<div class="kort anteckningspost">';
      html += '<div class="ap-topp">';
      html += '<h2 class="utan-markor">' + a.kapitel.nr + '. ' + U.esc(a.kapitel.titel) + '</h2>';
      html += '<button class="minibtn" data-oppna="' + U.esc(a.kapitel.id) + '">Öppna kapitlet</button>';
      html += '</div>';
      html += '<p class="muted mini">Senast ändrad ' + U.esc(U.tidssedan(a.andrad)) + '</p>';
      html += '<div class="lastext ap-text">' + U.block(a.text) + '</div>';
      html += '</div>';
    });

    var vy = U.el('vy-las');
    stangAnteckningar();
    vy.innerHTML = html;

    U.el('tillbaka').addEventListener('click', function () {
      visaSamling = false;
      rendera();
      window.scrollTo(0, 0);
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-oppna]'), function (e) {
      e.addEventListener('click', function () {
        visaSamling = false;
        oppna(e.dataset.oppna);
        window.scrollTo(0, 0);
      });
    });

    if (!alla.length) return;

    var text = somText(alla, delkurs);

    U.el('antkopiera').addEventListener('click', function (e) {
      navigator.clipboard.writeText(text).then(function () {
        e.target.textContent = '✓ Kopierad';
        setTimeout(function () { e.target.textContent = 'Kopiera allt'; }, 2000);
      });
    });

    U.el('antladda').addEventListener('click', function () {
      var blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
      var a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'sammanfattning-' + delkurs + '.txt';
      a.click();
      URL.revokeObjectURL(a.href);
    });

    U.el('antskriv').addEventListener('click', function () { window.print(); });
  }

  function somText(alla, delkurs) {
    var rader = [U.delkursNamn(delkurs).toUpperCase(), 'Egna anteckningar — SYSB23', ''];
    alla.forEach(function (a) {
      rader.push('');
      rader.push(a.kapitel.nr + '. ' + a.kapitel.titel);
      rader.push('-'.repeat(Math.min(60, (a.kapitel.titel + '   ').length + 3)));
      rader.push(a.text.trim());
    });
    return rader.join('\n');
  }

  return {
    rendera: rendera, oppna: oppna, stang: stang,
    doljAnteckningar: stangAnteckningar
  };
})();
