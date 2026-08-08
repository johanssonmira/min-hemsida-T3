/* =========================================================================
   hem.js – startvyn.

   Bärande idé: användaren ska aldrig behöva fundera på vad hen ska göra.
   "Dagens plan" räknar fram tre konkreta steg ur det faktiska läget –
   repetera det som glappar, läs nästa kapitel, öva svagaste ämnet –
   och lägger dem i den ordning som ger mest inlärning per minut.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.hem = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  function rendera() {
    var delkurs = S.store.delkurs();
    var html = '';

    html += nedrakningskort(delkurs);
    html += dagensPlan(delkurs);
    html += lagekort(delkurs);
    html += veckanskort();
    html += atgardskort(delkurs);
    html += tentaformatkort(delkurs);

    var vy = U.el('vy-hem');
    vy.innerHTML = html;
    koppla(vy);
  }

  /* ================================================================ */
  /* Nedräkning                                                        */
  /* ================================================================ */

  function nedrakningskort(delkurs) {
    var tenta = U.nastaTenta(delkurs, true);
    var html = '<div class="kort nedrakning">';

    if (!tenta) {
      html += '<div class="etikett">Ingen kommande examination</div>';
      html += '<h1>' + U.esc(U.delkursNamn(delkurs)) + '</h1>';
      html += '<p class="fakta">Alla inlagda tentatillfällen för den här delkursen har passerat.</p>';
      return html + '</div>';
    }

    var dagar = U.dagarTill(tenta.datum);
    html += '<div class="etikett">Nästa examination · ' +
            (tenta.typ === 'omtenta' ? 'Omtentamen' : 'Ordinarie') + '</div>';
    html += '<h1>' + U.esc(U.delkursNamn(tenta.delkurs)) + '</h1>';

    html += '<div class="dagar"><span class="siffra">' + dagar + '</span>' +
            '<span class="text">' + (dagar === 1 ? 'dag kvar' : 'dagar kvar') + '</span></div>';

    html += '<div class="fakta">';
    html += '<div>' + U.esc(U.langtDatum(tenta.datum)) + ', ' + U.esc(tenta.tid) + '</div>';
    html += '<div>' + U.esc(tenta.sal) + (tenta.larare ? ' · ' + U.esc(tenta.larare) : '') + '</div>';
    html += '</div>';

    html += radtips(delkurs, dagar);
    return html + '</div>';
  }

  /* Konkret lästakt utifrån hur mycket som återstår */
  function radtips(delkurs, dagar) {
    var komp = S.kompendium[delkurs];
    if (!komp || !komp.kapitel.length) return '';

    var totalt = komp.kapitel.length;
    var lasta = S.store.antalLasta(komp.kapitel);
    var kvar = totalt - lasta;
    var text;

    if (kvar === 0) {
      text = 'Alla ' + totalt + ' kapitel lästa. Nu handlar det om att öva frågor och skriva essäsvar.';
    } else if (dagar <= 0) {
      text = kvar + ' olästa kapitel och tentan är idag. Läs kapitlet om tentataktik om inget annat.';
    } else {
      var takt = Math.floor(dagar / kvar);
      text = kvar + ' olästa kapitel på ' + dagar + ' dagar — ' +
             (takt >= 2 ? 'ett kapitel var ' + takt + ':e dag räcker.'
                        : 'ungefär ' + Math.ceil(kvar / dagar) + ' kapitel om dagen.');
    }
    return '<div class="radtips">' + U.esc(text) + '</div>';
  }

  /* ================================================================ */
  /* Dagens plan                                                       */
  /* ================================================================ */

  function dagensPlan(delkurs) {
    var steg = byggSteg(delkurs);
    var streak = S.store.streak();

    var html = '<div class="kort">';
    html += '<h2>Dagens plan';
    if (streak > 0) {
      html += '<span class="streak">🔥 ' + streak + (streak === 1 ? ' dag' : ' dagar') + ' i rad</span>';
    }
    html += '</h2>';

    if (!steg.length) {
      html += '<p class="muted">Inget som brådskar just nu. Byt delkurs eller gör ett prov ' +
              'för att testa hela kursen.</p>';
      return html + '</div>';
    }

    html += '<p class="muted liten">Tre saker att göra härnäst, viktigast först. ' +
            'Listan ändrar sig när du svarat på frågor.</p>';

    steg.forEach(function (s) {
      html += '<button class="plansteg' + (s.klar ? ' klar' : '') + '"' +
              (s.gatill ? ' data-gatill="' + U.esc(s.gatill) + '"' : '') +
              (s.amne ? ' data-ovaamne="' + U.esc(s.amne) + '"' : '') +
              (s.kapitel ? ' data-laskap="' + U.esc(s.kapitel) + '"' : '') +
              (s.repetition ? ' data-repetition="1"' : '') + '>';
      html += '<span class="plan-ikon plan-' + s.ikonKlass + '">' + s.ikon + '</span>';
      html += '<span class="plan-kropp">';
      html += '<span class="plan-rubrik">' + U.esc(s.rubrik) + '</span>';
      html += '<span class="plan-under">' + U.esc(s.under) + '</span>';
      html += '</span>';
      html += '<span class="plan-pil">→</span>';
      html += '</button>';
    });

    return html + '</div>';
  }

  /* Prioriteringsordningen är medveten:
     1. Repetition först – det du höll på att glömma ger störst effekt
     2. Läsning – förståelse innan mer testning
     3. Svagaste ämnet – riktad övning
     4. Nytt ämne – bredda när grunden sitter
     5. Prov – när det mesta är på plats */
  function byggSteg(delkurs) {
    var steg = [];

    var rep = S.store.repetitioner(delkurs);
    if (rep.length) {
      steg.push({
        ikon: '↻', ikonKlass: 'rep',
        rubrik: 'Repetera ' + rep.length + (rep.length === 1 ? ' fråga' : ' frågor'),
        under: 'Frågor du svarat fel på. Här lär du dig mest.',
        repetition: true
      });
    }

    var komp = S.kompendium[delkurs];
    if (komp && komp.kapitel.length) {
      var nasta = komp.kapitel.filter(function (k) { return !S.store.arLast(k.id); })[0];
      if (nasta) {
        steg.push({
          ikon: '§', ikonKlass: 'las',
          rubrik: 'Läs kapitel ' + nasta.nr + ': ' + nasta.titel,
          under: 'Ca ' + nasta.lastid + ' min. ' + nasta.ingress,
          kapitel: nasta.id
        });
      }
    }

    var svaga = S.store.svagaAmnen(delkurs);
    if (svaga.length) {
      var x = svaga[0];
      steg.push({
        ikon: '✎', ikonKlass: 'ova',
        rubrik: 'Öva ' + x.amne.namn,
        under: 'Ditt svagaste ämne: nivå ' + x.niva.n + ' av 5, ' +
               x.stat.procent + ' % rätt hittills.',
        amne: x.amne.id
      });
    } else {
      var orord = S.store.orordaAmnen(delkurs);
      if (orord.length) {
        steg.push({
          ikon: '✎', ikonKlass: 'ova',
          rubrik: 'Öva ' + orord[0].namn,
          under: 'Nytt ämne. ' +
                 S.fragor.filter(function (f) { return f.amne === orord[0].id; }).length +
                 ' frågor att testa.',
          amne: orord[0].id
        });
      }
    }

    /* När grunden sitter blir provet nästa naturliga steg */
    var kursniva = S.store.delkursNiva(delkurs);
    if (steg.length < 3 && kursniva.snitt >= 2.5) {
      steg.push({
        ikon: '★', ikonKlass: 'prov',
        rubrik: 'Gör ett prov',
        under: 'Du kan tillräckligt för att testa hela kursen med tentans poäng.',
        gatill: 'prov'
      });
    }

    /* Har man inte gjort något alls: mjuk ingång */
    if (!steg.length) {
      steg.push({
        ikon: '✎', ikonKlass: 'ova',
        rubrik: 'Öva frågor',
        under: 'Appen väljer frågorna åt dig utifrån vad du behöver mest.',
        gatill: 'ova'
      });
    }

    return steg.slice(0, 3);
  }

  /* ================================================================ */
  /* Läget                                                             */
  /* ================================================================ */

  function lagekort(delkurs) {
    var s = S.store.sammanfattning(delkurs);
    var kursniva = S.store.delkursNiva(delkurs);
    var komp = S.kompendium[delkurs];

    var html = '<div class="kort">';
    html += '<h2>Var står du?</h2>';

    /* Kursläget som helhet – en enda siffra att följa över tid */
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
    html += ruta(kursniva.befasta + '/' + kursniva.totalt, 'ämnen du är stark på',
                 kursniva.befasta === kursniva.totalt && kursniva.totalt ? 'god' : '');
    html += ruta(komp ? S.store.antalLasta(komp.kapitel) + '/' + komp.kapitel.length : '—',
                 'kapitel lästa');
    html += '</div>';

    /* Nivåtrappan förklarad, så skalan blir begriplig */
    if (s.forsok === 0) {
      html += '<div class="notis info" style="margin-top:1rem">Varje ämne har fem nivåer, från ' +
              '<strong>Ny</strong> till <strong>Sitter</strong>. Du går uppåt genom att svara rätt. ' +
              'För att nå högsta nivån måste du kunna ämnet vid flera olika tillfällen — ' +
              'inte bara en gång.</div>';
    }

    return html + '</div>';

    function ruta(v, l, klass) {
      return '<div class="statruta ' + (klass || '') + '"><div class="v">' + U.esc(v) +
             '</div><div class="l">' + U.esc(l) + '</div></div>';
    }
  }

  /* ================================================================ */
  /* Veckan                                                            */
  /* ================================================================ */

  function veckanskort() {
    var idag = U.idag();
    var pass = S.pass.filter(function (p) {
      var d = U.parse(p.datum);
      if (!d) return false;
      var diff = Math.round((d - idag) / 86400000);
      return diff >= 0 && diff < 7;
    });

    var html = '<div class="kort">';
    html += '<h2>Närmaste sju dagarna</h2>';

    if (!pass.length) {
      var start = U.dagarTill(S.kalenderNoteringar.terminStart);
      html += start > 0
        ? '<p class="muted">Inga pass den här veckan. Terminen börjar om ' + start + ' dagar — ' +
          U.esc(U.langtDatum(S.kalenderNoteringar.terminStart)) + '.</p>'
        : '<p class="muted">Inga inbokade pass de närmaste sju dagarna.</p>';
    } else {
      pass.forEach(function (p) { html += passrad(p); });
    }

    html += '<div class="knapprad"><button class="sekundar" data-gatill="schema">' +
            'Hela kalendern</button></div>';
    return html + '</div>';
  }

  function passrad(p) {
    var h = '<div class="pass' + (p.typ === 'tenta' ? ' ar-tenta' : '') + '">';
    h += '<span class="pass-dag">' + U.esc(U.kortDatum(p.datum)) + '</span>';
    h += '<span class="pass-tid">' + U.esc(p.tid) + '</span>';
    h += '<span class="pass-kropp"><span class="pass-rubrik">' + U.esc(p.rubrik) +
         (p.typ === 'tenta' ? '<span class="pass-etikett">Tenta</span>' : '') +
         (p.obligatorisk ? '<span class="pass-etikett obl">Obl.</span>' : '') + '</span>';
    h += '<span class="pass-meta">' + U.esc(U.delkursKort(p.delkurs)) + ' · ' + U.esc(p.sal) + '</span>';
    return h + '</span></div>';
  }

  /* ================================================================ */
  /* Åtgärder och tentaformat                                          */
  /* ================================================================ */

  function atgardskort(delkurs) {
    var komp = S.kompendium[delkurs];
    var antal = S.fragor.filter(function (f) { return f.delkurs === delkurs; }).length;
    var essa = S.fragor.filter(function (f) {
      return f.delkurs === delkurs && f.typ === 'oppen';
    }).length;

    var html = '<div class="kort">';
    html += '<h2>Alla lägen</h2>';
    html += '<div class="atgarder">';

    html += kort('a-las', 'las', 'Läs kompendiet',
                 komp ? komp.kapitel.length + ' kapitel, ca ' +
                        komp.kapitel.reduce(function (n, k) { return n + k.lastid; }, 0) + ' min'
                      : 'Inte skrivet än');
    html += kort('a-ova', 'ova', 'Öva frågor', antal + ' frågor, en i taget med facit');
    html += kort('a-prov', 'prov', 'Gör ett prov', 'Tentans poängsystem');
    if (essa) html += kort('a-essa', 'essa', 'Träna essäsvar', essa + ' frågor med checklista');

    html += '</div>';
    return html + '</div>';

    function kort(klass, vy, rubrik, under) {
      return '<button class="atgard ' + klass + '" data-gatill="' + vy + '">' +
             '<span class="rubrik">' + U.esc(rubrik) + '</span>' +
             '<span class="under">' + U.esc(under) + '</span></button>';
    }
  }

  function tentaformatkort(delkurs) {
    var d = S.delkurser.filter(function (x) { return x.id === delkurs; })[0];
    if (!d) return '';
    return '<div class="kort rosa">' +
           '<h2>Så räknas tentan</h2>' +
           '<p class="liten">' + U.esc(d.tentaInfo) + '</p>' +
           '<p class="muted liten" style="margin-bottom:0">' + U.esc(d.examination) + '</p>' +
           '</div>';
  }

  /* ================================================================ */

  function koppla(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-gatill]'), function (b) {
      b.addEventListener('click', function () { S.app.visaVy(b.dataset.gatill); });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-ovaamne]'), function (b) {
      b.addEventListener('click', function () { S.app.ovaAmne(b.dataset.ovaamne); });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-laskap]'), function (b) {
      b.addEventListener('click', function () { S.las.oppna(b.dataset.laskap); });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-repetition]'), function (b) {
      b.addEventListener('click', function () { S.ova.startaRepetition(); });
    });
  }

  return { rendera: rendera, passrad: passrad };
})();
