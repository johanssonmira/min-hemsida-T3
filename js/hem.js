/* =========================================================================
   hem.js – startvyn.

   Uppifrån och ner, i den ordning man undrar saker:
     1. Vilken tenta är nästa, och hur lång tid har jag?  (nedräkning)
     2. Vad händer den här veckan?                         (veckoremsa)
     3. Vad pluggar jag nu, och hur ligger jag till?       (delkurs + läge)
     4. Hur kommer jag igång?                              (vägar in)
     5. Vad finns mer, och hur räknas tentan?
   Inget här kräver att man förstår appen först.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.hem = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var valdDag = null;   // 'YYYY-MM-DD' i veckoremsan, null = idag

  var VECKODAGAR = ['MÅ', 'TI', 'ON', 'TO', 'FR', 'LÖ', 'SÖ'];

  function rendera() {
    var delkurs = S.store.delkurs();

    var html = '<div class="kort hem-topp">';
    html += nedrakning();
    html += veckan();
    html += '</div>';

    html += delkursintro(delkurs);
    html += lage(delkurs);
    html += vagar(delkurs);

    html += '<div class="hem-tva">';
    html += ovrigaDelkurser(delkurs);
    html += tentaformat(delkurs);
    html += '</div>';

    var vy = U.el('vy-hem');
    vy.innerHTML = html;
    koppla(vy);
  }

  /* ================================================================ */
  /* 1. Nedräkning till nästa tenta                                    */
  /* ================================================================ */

  function nedrakning() {
    var t = U.nastaAktuellTenta();
    var h = '<div class="hem-nedrakning">';

    if (!t) {
      h += '<div class="nr-rad"><span class="nr-text">Inga fler tentor inlagda</span></div>';
      h += '<p class="muted">Alla ordinarie tentor den här terminen är skrivna.</p>';
      return h + '</div>';
    }

    var dagarTenta = U.dagarTill(t.datum);
    var anmalan = U.parse(t.datum);
    anmalan.setDate(anmalan.getDate() - 7);
    var anmalanIso = iso(anmalan);
    var dagarAnmalan = U.dagarTill(anmalanIso);

    var visaAnmalan = dagarAnmalan >= 0;
    var siffra = visaAnmalan ? dagarAnmalan : dagarTenta;
    var etikett = visaAnmalan
      ? (siffra === 1 ? 'dag kvar att anmäla' : 'dagar kvar att anmäla')
      : (siffra === 0 ? 'tentan är idag' : (siffra === 1 ? 'dag kvar till tentan' : 'dagar kvar till tentan'));

    h += '<div class="nr-rad"><span class="nr-siffra">' + (siffra === 0 && !visaAnmalan ? '' : siffra) +
         '</span><span class="nr-text">' + etikett + '</span></div>';
    h += '<div class="nr-kurs">' + U.esc(U.delkursNamn(t.delkurs)) + '</div>';
    h += '<p class="nr-fakta">';
    if (visaAnmalan) {
      h += 'Anmälan i Ladok senast ' + U.esc(dagMånad(anmalanIso)) + ' · ';
    }
    h += 'tentan ' + U.esc(dagMånad(t.datum)) + ', ' + U.esc(t.tid) + ', ' + U.esc(t.sal) + '</p>';

    h += '<button class="primar bred-knapp" data-pluggatenta="' + U.esc(t.delkurs) + '">' +
         'Plugga till den här tentan</button>';
    return h + '</div>';
  }

  /* ================================================================ */
  /* 2. Veckoremsan                                                    */
  /* ================================================================ */

  function veckan() {
    var idag = U.idag();
    var mandag = new Date(idag);
    mandag.setDate(idag.getDate() - ((idag.getDay() + 6) % 7));

    var dagar = [];
    for (var i = 0; i < 7; i++) {
      var d = new Date(mandag);
      d.setDate(mandag.getDate() + i);
      dagar.push(d);
    }

    var allaPass = U.allaPass();
    var passPerDag = {};
    allaPass.forEach(function (p) { (passPerDag[p.datum] = passPerDag[p.datum] || []).push(p); });

    var idagIso = iso(idag);
    var vald = valdDag || idagIso;
    var antalVeckan = dagar.reduce(function (n, d) { return n + (passPerDag[iso(d)] || []).length; }, 0);

    var h = '<div class="hem-veckan">';
    h += '<div class="vk-huvud"><h2 class="utan-markor">Den här veckan</h2>';
    h += '<span class="muted liten">v.' + veckonummer(mandag) + ' · ' +
         mandag.getDate() + '–' + dagar[6].getDate() + ' ' + manadKort(dagar[6]) + ' · ' +
         antalVeckan + (antalVeckan === 1 ? ' pass' : ' pass') + '</span></div>';

    h += '<div class="veckoremsa">';
    dagar.forEach(function (d, i) {
      var dIso = iso(d);
      var pass = passPerDag[dIso] || [];
      var klasser = ['vk-dag'];
      if (dIso === idagIso) klasser.push('idag');
      if (dIso === vald) klasser.push('vald');
      if (pass.some(function (p) { return p.typ === 'tenta'; })) klasser.push('tentadag');

      var prickar = pass.slice(0, 3).map(function (p) {
        return '<i style="background:' + (p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)') + '"></i>';
      }).join('');

      h += '<button class="' + klasser.join(' ') + '" data-veckodag="' + dIso + '" ' +
           'aria-label="' + U.esc(U.langtDatum(dIso)) + ', ' +
           (pass.length ? pass.length + ' pass' : 'inget inbokat') +
           (dIso === idagIso ? ', idag' : '') + '"' +
           (dIso === vald ? ' aria-pressed="true"' : ' aria-pressed="false"') + '>';
      h += '<span class="vk-namn">' + (dIso === idagIso ? 'IDAG' : VECKODAGAR[i]) + '</span>';
      h += '<span class="vk-nr">' + d.getDate() + '</span>';
      h += '<span class="vk-prickar">' + (prickar || '<i class="tom"></i>') + '</span>';
      h += '</button>';
    });
    h += '</div>';

    var valdaPass = passPerDag[vald] || [];
    h += '<div class="vk-dagrubrik">' + U.esc(U.langtDatum(vald)) +
         (vald === idagIso ? ' · <span class="vk-idag">idag</span>' : '') + '</div>';
    if (valdaPass.length) {
      valdaPass.forEach(function (p) { h += passrad(p); });
    } else {
      h += '<p class="muted vk-tom">Inget inbokat.</p>';
    }

    var ag = S.attgora.idagsLage();
    h += '<div class="vk-lankar">';
    h += '<button class="lankbtn" data-gatill="attgora">' + (ag.antal
      ? 'Att göra idag · ' + ag.klara + ' av ' + ag.antal + ' klara →'
      : 'Skriv dagens att göra-lista →') + '</button>';
    h += '<button class="lankbtn neutral" data-gatill="schema">Hela kalendern →</button>';
    h += '</div>';
    return h + '</div>';
  }

  function passrad(p) {
    var farg = p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)';
    var h = '<div class="pass' + (p.typ === 'tenta' ? ' ar-tenta' : '') +
            (p.egen ? ' egen' : '') + (p.andrad ? ' andrad' : '') +
            '" style="--dkf:' + farg + '">';
    h += '<span class="pass-dag">' + U.esc(U.kortDatum(p.datum)) + '</span>';
    h += '<span class="pass-tid">' + U.esc(p.tid) + '</span>';
    h += '<span class="pass-kropp"><span class="pass-rubrik">' +
         U.typBadge(p) + U.esc(p.rubrik) +
         (p.obligatorisk ? '<span class="pass-etikett obl">Obl.</span>' : '') +
         (p.egen ? '<span class="pass-etikett min">✎ Din</span>' : '') + '</span>';
    h += '<span class="pass-meta">' + U.esc(p.delkurs ? U.delkursKort(p.delkurs) : 'Egen') +
         (p.sal ? ' · ' + U.esc(p.sal) : '') + '</span>';
    return h + '</span></div>';
  }

  /* ================================================================ */
  /* 3. Delkursen och läget                                            */
  /* ================================================================ */

  function delkursintro(delkurs) {
    var d = info(delkurs);
    var komp = S.kompendium[delkurs];
    var fragor = S.fragor.filter(function (f) { return f.delkurs === delkurs; });
    var essa = fragor.filter(function (f) { return f.typ === 'oppen'; }).length;
    var amnen = S.amnen.filter(function (a) { return a.delkurs === delkurs; }).length;

    var delar = [];
    if (komp) delar.push(komp.kapitel.length + ' kapitel');
    delar.push(fragor.length - essa + ' frågor');
    if (amnen) delar.push(amnen + ' ämnen');
    if (essa) delar.push(essa + ' essäfrågor');

    var h = '<section class="hem-intro">';
    h += '<span class="overrubrik">SYSB23 · Delkurs' + (d && d.avslutad ? ' · avslutad' : '') + '</span>';
    h += '<h1>' + U.esc(U.delkursNamn(delkurs)) + '</h1>';
    if (d) h += '<p class="hem-ingress">' + U.esc(d.beskrivning) + '</p>';
    h += '<p class="hem-meta">' + delar.join(' · ') + '</p>';
    return h + '</section>';
  }

  function lage(delkurs) {
    var s = S.store.sammanfattning(delkurs);
    var komp = S.kompendium[delkurs];
    var prov = S.store.historik().filter(function (x) {
      return x.lage === 'prov' && x.delkurs === delkurs;
    })[0];

    var h = '<div class="kort">';
    h += '<h2>Var står du?</h2>';
    h += '<div class="statgrid fyra">';
    h += ruta(s.forsok, 'Besvarade frågor');
    h += ruta(s.procent === null ? '—' : s.procent + ' %', 'Träffsäkerhet',
              s.procent === null ? '' : (s.procent >= 75 ? 'god' : (s.procent < 55 ? 'varn' : '')));
    h += ruta(komp ? S.store.antalLasta(komp.kapitel) + '/' + komp.kapitel.length : '—', 'Lästa kapitel');
    h += ruta(prov ? (prov.maxPoang ? prov.poang + '/' + prov.maxPoang : prov.procent + ' %') : '—',
              'Senaste prov');
    h += '</div>';

    if (s.forsok < 5) {
      h += '<p class="muted liten" style="margin:.9rem 0 0">Svara på några frågor så börjar ' +
           'sidan visa var du är stark och var du behöver öva mer.</p>';
    } else {
      var svaga = S.store.svagaAmnen(delkurs);
      if (svaga.length) {
        h += '<p class="liten" style="margin:.9rem 0 0">Svagast just nu: <strong>' +
             U.esc(svaga[0].amne.namn) + '</strong> (' + svaga[0].stat.procent + ' % rätt). ' +
             '<button class="lankbtn" data-ovaamne="' + U.esc(svaga[0].amne.id) + '">Öva det →</button></p>';
      }
    }
    return h + '</div>';

    function ruta(v, l, klass) {
      return '<div class="statruta ' + (klass || '') + '"><div class="l">' + U.esc(l) +
             '</div><div class="v">' + U.esc(String(v)) + '</div></div>';
    }
  }

  /* ================================================================ */
  /* 4. Vägar in                                                       */
  /* ================================================================ */

  function vagar(delkurs) {
    var synliga = S.app.synligaVyer();
    var komp = S.kompendium[delkurs];
    var fragor = S.fragor.filter(function (f) { return f.delkurs === delkurs; });
    var essa = fragor.filter(function (f) { return f.typ === 'oppen'; }).length;

    var rader = [];
    if (synliga.indexOf('las') > -1 && komp) {
      rader.push(['las', 'Läs kompendiet',
        S.store.antalLasta(komp.kapitel) + ' av ' + komp.kapitel.length + ' kapitel lästa']);
    }
    if (synliga.indexOf('ova') > -1) {
      rader.push(['ova', 'Öva frågor', 'En fråga i taget, med förklaring till varje alternativ']);
    }
    if (synliga.indexOf('sql') > -1) {
      rader.push(['sql', 'Skriv SQL', 'Frågor mot riktiga databaser, rättade på resultatet']);
    }
    if (synliga.indexOf('modellera') > -1) {
      rader.push(['modellera', 'Modellera', 'ER-diagram, ER till schema och normalisering']);
    }
    if (synliga.indexOf('prov') > -1) {
      rader.push(['prov', 'Gör ett prov', 'De riktiga gamla tentorna, med tentans poäng']);
    }
    if (synliga.indexOf('essa') > -1 && essa) {
      rader.push(['essa', 'Träna essäsvar', essa + ' frågor med checklista och modellsvar']);
    }

    var h = '<div class="kort vagar">';
    rader.forEach(function (r) {
      h += '<button class="vag" data-gatill="' + r[0] + '">' +
           '<span class="vag-kropp"><span class="vag-rubrik">' + U.esc(r[1]) + '</span>' +
           '<span class="vag-under">' + U.esc(r[2]) + '</span></span>' +
           '<span class="vag-pil" aria-hidden="true">→</span></button>';
    });
    return h + '</div>';
  }

  /* ================================================================ */
  /* 5. Övriga delkurser och tentaformatet                             */
  /* ================================================================ */

  function ovrigaDelkurser(delkurs) {
    var h = '<div class="kort">';
    h += '<h2>Övriga delkurser</h2>';
    h += '<p class="muted liten">Du byter delkurs i väljaren högst upp, eller här.</p>';
    h += '<div class="dk-lista">';
    S.kalenderDelkurser.forEach(function (k) {
      if (k.id === delkurs) return;
      var d = info(k.id);
      var status = !d ? 'kommer under terminen' : (d.avslutad ? 'avslutad' : 'klar att plugga');
      var klass = !d ? 'senare' : (d.avslutad ? 'avslutad' : 'klar');
      h += '<button class="dk-rad ' + klass + '"' + (d ? ' data-bytdelkurs="' + k.id + '"' : ' disabled') + '>' +
           '<i class="fargprick" style="background:' + k.farg + '"></i>' +
           '<span class="dk-namn">' + U.esc(k.namn) + '</span>' +
           '<span class="dk-status">' + status + '</span></button>';
    });
    h += '</div>';
    return h + '</div>';
  }

  function tentaformat(delkurs) {
    var d = info(delkurs);
    if (!d) return '';
    return '<div class="kort rosa">' +
           '<h2>Så räknas tentan</h2>' +
           '<p class="liten">' + U.esc(d.tentaInfo) + '</p>' +
           '<p class="muted liten" style="margin-bottom:0">' + U.esc(d.examination) + '</p>' +
           '</div>';
  }

  /* ================================================================ */

  function info(id) { return S.delkurser.filter(function (x) { return x.id === id; })[0] || null; }

  function iso(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  var MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni', 'juli',
                 'augusti', 'september', 'oktober', 'november', 'december'];
  function dagMånad(isoDatum) {
    var d = U.parse(isoDatum);
    return d.getDate() + ' ' + MANADER[d.getMonth()];
  }
  function manadKort(d) { return MANADER[d.getMonth()].slice(0, 3); }

  function veckonummer(d) {
    var t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dag = (t.getUTCDay() + 6) % 7;
    t.setUTCDate(t.getUTCDate() - dag + 3);
    var forsta = new Date(Date.UTC(t.getUTCFullYear(), 0, 4));
    return 1 + Math.round(((t - forsta) / 86400000 - 3 + ((forsta.getUTCDay() + 6) % 7)) / 7);
  }

  function koppla(vy) {
    function alla(sel, fn) { Array.prototype.forEach.call(vy.querySelectorAll(sel), fn); }

    alla('[data-gatill]', function (b) {
      b.addEventListener('click', function () { S.app.visaVy(b.dataset.gatill); });
    });
    alla('[data-ovaamne]', function (b) {
      b.addEventListener('click', function () { S.app.ovaAmne(b.dataset.ovaamne); });
    });
    alla('[data-veckodag]', function (b) {
      b.addEventListener('click', function () { valdDag = b.dataset.veckodag; rendera(); });
    });
    alla('[data-bytdelkurs]', function (b) {
      b.addEventListener('click', function () {
        S.app.bytDelkurs(b.dataset.bytdelkurs);
        window.scrollTo(0, 0);
      });
    });
    alla('[data-pluggatenta]', function (b) {
      b.addEventListener('click', function () {
        if (S.store.delkurs() !== b.dataset.pluggatenta) S.app.bytDelkurs(b.dataset.pluggatenta);
        S.app.visaVy('las');
      });
    });
  }

  return { rendera: rendera, passrad: passrad };
})();
