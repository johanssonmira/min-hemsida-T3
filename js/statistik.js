/* =========================================================================
   statistik.js – utveckling över tid, resultat per ämne och datahantering.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.statistik = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  function rendera() {
    var delkurs = S.store.delkurs();
    var s = S.store.sammanfattning(delkurs);
    var komp = S.kompendium[delkurs];
    var kursniva = S.store.delkursNiva(delkurs);
    var streak = S.store.streak();

    var html = '';

    /* Sammanfattning */
    html += '<div class="kort">';
    html += '<h2>Din utveckling';
    if (streak > 0) {
      html += '<span class="streak">🔥 ' + streak + (streak === 1 ? ' dag' : ' dagar') + '</span>';
    }
    html += '</h2>';
    html += '<p class="muted liten">' + U.esc(U.delkursNamn(delkurs)) + '</p>';

    html += '<div style="display:flex;align-items:center;gap:.85rem;margin-bottom:1rem">';
    html += '<div class="progress' + (kursniva.andel >= 80 ? ' gron' :
            (kursniva.andel >= 50 ? ' barn' : '')) + '" style="flex:1">' +
            '<div style="width:' + kursniva.andel + '%"></div></div>';
    html += '<span class="liten muted" style="white-space:nowrap">' +
            kursniva.andel + ' % av kursen sitter</span>';
    html += '</div>';

    html += '<div class="statgrid">';
    html += ruta(s.forsok, 'frågor du svarat på');
    html += ruta(s.procent === null ? '—' : s.procent + ' %', 'rätt svar',
                 s.procent === null ? '' : (s.procent >= 75 ? 'god' : (s.procent < 60 ? 'varn' : '')));
    html += ruta(s.seddaFragor + '/' + s.totaltFragor, 'frågor du sett');
    html += ruta(S.store.repetitioner(delkurs).length, 'kvar att repetera',
                 S.store.repetitioner(delkurs).length ? 'varn' : 'god');
    html += '</div>';

    if (komp && komp.kapitel.length) {
      var lasta = S.store.antalLasta(komp.kapitel);
      var pct = Math.round((lasta / komp.kapitel.length) * 100);
      html += '<h3>Kompendiet</h3>';
      html += '<div style="display:flex;align-items:center;gap:.8rem">';
      html += '<div class="progress' + (pct === 100 ? ' gron' : '') +
              '" style="flex:1"><div style="width:' + pct + '%"></div></div>';
      html += '<span class="liten muted">' + lasta + ' av ' + komp.kapitel.length + ' kapitel</span>';
      html += '</div>';
    }

    if (s.forsok === 0) {
      html += '<p class="muted liten" style="margin-top:.8rem">Ingen statistik än. ' +
              'Kör ett övningspass så fylls den här vyn på.</p>';
    }
    html += '</div>';

    /* Nivåtrappan förklarad */
    html += '<div class="kort">';
    html += '<h2>Nivåer per ämne</h2>';
    html += '<p class="muted liten">Varje ämne har fem nivåer. För att nå den högsta måste du ' +
            'kunna ämnet vid flera olika tillfällen och ha sett de flesta av frågorna — ' +
            'så du inte bara haft tur en gång.</p>';
    html += '<div class="chiprad">';
    S.store.nivaLista().forEach(function (n) {
      html += '<span class="chip" style="cursor:default">' + U.nivaPrick(n.n) +
              U.esc(n.n + '. ' + n.namn) + '</span>';
    });
    html += '</div>';

    html += '<p class="muted liten">Klicka på ett ämne för att öva det. Ett ämne får en nivå ' +
            'först när du svarat på minst tre frågor i det.</p>';

    S.amnen.filter(function (a) { return a.delkurs === delkurs; }).forEach(function (a) {
      var stat = S.store.amnesStatistik(a.id);
      var niva = S.store.amnesNiva(a.id);
      var antal = S.fragor.filter(function (f) { return f.amne === a.id; }).length;

      html += '<div class="amnerad" data-ovaamne="' + U.esc(a.id) + '" title="' +
              U.esc(niva.namn + ' – ' + niva.beskrivning) + '">';
      html += U.nivaMatare(niva.n);
      html += '<span class="a-namn">' + U.esc(a.namn) +
              ' <span class="muted mini">(' + antal + ' frågor)</span></span>';
      if (stat) {
        html += '<span class="a-bar b' + niva.n + '"><div style="width:' +
                stat.procent + '%"></div></span>';
        html += '<span class="a-siffra">' + stat.procent + ' %</span>';
      } else {
        html += '<span class="a-bar b0"><div style="width:0"></div></span>';
        html += '<span class="a-siffra muted">–</span>';
      }
      html += '</div>';
    });
    html += '</div>';

    /* Svaga ämnen */
    var svaga = S.store.svagaAmnen(delkurs);
    if (svaga.length) {
      html += '<div class="kort">';
      html += '<h2>Lägg tiden här</h2>';
      html += '<ul>';
      svaga.slice(0, 6).forEach(function (x) {
        var kap = hittaKapitel(x.amne.id);
        html += '<li style="margin-bottom:.5rem"><strong>' + U.esc(x.amne.namn) + '</strong> — ' +
                'nivå ' + x.niva.n + ' av 5, ' + x.stat.procent + ' % rätt på ' +
                x.stat.forsok + ' svar.';
        var krav = S.store.nastaNivaKrav(x.amne.id);
        if (krav) html += ' <span class="muted">' + U.esc(krav) + '</span>';
        if (kap) html += ' Läs kapitel ' + kap.nr + ', ' + U.esc(kap.titel) + '.';
        html += '</li>';
      });
      html += '</ul></div>';
    }

    /* Historik */
    html += '<div class="kort">';
    html += '<h2>Senaste passen</h2>';
    var hist = S.store.historik();
    if (!hist.length) {
      html += '<p class="muted">Inga avslutade pass än.</p>';
    } else {
      hist.slice(0, 15).forEach(function (h) {
        var resultat = (h.poang !== null && h.poang !== undefined)
          ? h.poang + '/' + h.maxPoang + ' p (' + h.procent + ' %)'
          : h.procent + ' % (' + h.ratt + '/' + h.antal + ')';
        html += '<div class="rad"><span>' +
                '<strong>' + U.esc(h.rubrik) + '</strong>' +
                (h.lage === 'prov' ? ' <span class="markor">Prov</span>' : '') + '<br>' +
                '<span class="muted mini">' + U.esc(U.tidssedan(h.datum)) + '</span></span>' +
                '<strong>' + U.esc(resultat) + '</strong></div>';
      });
    }
    html += '</div>';

    /* Data */
    html += '<div class="kort">';
    html += '<h2>Din statistik</h2>';
    html += '<p class="muted liten">Allt sparas i din webbläsare på den här datorn. Ingenting ' +
            'skickas någon annanstans. Rensar du webbläsarens data försvinner statistiken, ' +
            'så spara en kopia om du vill vara säker.</p>';
    html += '<div class="knapprad">';
    html += '<button class="sekundar" id="exportera">Spara kopia</button>';
    html += '<button class="sekundar" id="importeraknapp">Läs in kopia</button>';
    html += '<button class="fara" id="rensa">Rensa allt</button>';
    html += '</div>';
    html += '<input type="file" id="importfil" accept="application/json" style="display:none">';
    html += '</div>';

    var vy = U.el('vy-statistik');
    vy.innerHTML = html;
    koppla(vy);
  }

  function ruta(v, l, klass) {
    return '<div class="statruta ' + (klass || '') + '"><div class="v">' + U.esc(v) +
           '</div><div class="l">' + U.esc(l) + '</div></div>';
  }

  function hittaKapitel(amneId) {
    var traff = null;
    Object.keys(S.kompendium).forEach(function (dk) {
      S.kompendium[dk].kapitel.forEach(function (k) {
        if (!traff && k.amnen && k.amnen.indexOf(amneId) > -1) traff = k;
      });
    });
    return traff;
  }

  function koppla(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-ovaamne]'), function (e) {
      e.addEventListener('click', function () { S.app.ovaAmne(e.dataset.ovaamne); });
    });

    U.el('exportera').addEventListener('click', function () {
      var blob = new Blob([S.store.exportera()], { type: 'application/json' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = 'sysb23-plugg-' + new Date().toISOString().slice(0, 10) + '.json';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });

    var fil = U.el('importfil');
    U.el('importeraknapp').addEventListener('click', function () { fil.click(); });
    fil.addEventListener('change', function () {
      var f = fil.files[0];
      if (!f) return;
      var lasare = new FileReader();
      lasare.onload = function () {
        try {
          S.store.importera(lasare.result);
          alert('Statistiken är importerad.');
          S.app.rendera();
        } catch (e) {
          alert('Kunde inte läsa filen: ' + e.message);
        }
      };
      lasare.readAsText(f);
    });

    U.el('rensa').addEventListener('click', function () {
      if (confirm('Detta raderar all statistik, alla lästmarkeringar och alla essäutkast. ' +
                  'Är du säker?')) {
        S.store.rensa();
        alert('Allt är rensat.');
        S.app.rendera();
      }
    });
  }

  return { rendera: rendera };
})();
