/* =========================================================================
   schema.js – pluggkalendern.

   Huvudvyn är ett månadsrutnät så att man ser formen på veckan direkt:
   var tomrummen ligger, när det är tätt, och när tentorna kommer. Varje
   delkurs har en egen färg, så en dag går att läsa av utan att läsa texten.
   Under rutnätet ligger vald dag i detalj, och därunder listan.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.schema = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var visning = 'kalender';        // 'kalender' | 'lista'
  var manadAr = null, manadNr = null;
  var valdDag = null;              // 'ÅÅÅÅ-MM-DD'
  var filterDelkurs = 'alla';
  var visaOmtentor = false;

  /* Startar på den månad där nästa examination ligger, annars terminsstart */
  function satterStartmanad() {
    if (manadAr !== null) return;
    var tenta = U.nastaTenta(null, true);
    var d = U.parse(tenta ? tenta.datum : S.kalenderNoteringar.terminStart);
    var idag = U.idag();
    if (idag > U.parse(S.kalenderNoteringar.terminStart) &&
        idag < U.parse(S.kalenderNoteringar.terminSlut)) d = idag;
    manadAr = d.getFullYear();
    manadNr = d.getMonth();
  }

  function rendera() {
    satterStartmanad();

    /* Kalendern får hela bredden för sig själv – den ska aldrig samsas om
       ytan med en textspalt vid sidan. Uppslagsinformationen ligger under,
       i vanlig huvudspalt och sidospalt. */
    var html = '<div class="sida">';
    html += '<div class="bred">' + nedrakningskort() + kalenderkort() + '</div>';
    html += '<div class="huvud">' + faskort() + praktisktkort() + '</div>';
    html += '<aside class="sido">' + tentakort() + '</aside>';
    html += '</div>';

    var vy = U.el('vy-schema');
    vy.innerHTML = html;
    koppla(vy);
  }

  /* ================================================================ */
  /* Nedräkning                                                        */
  /* ================================================================ */

  function nedrakningskort() {
    var vald = S.store.delkurs();
    var tenta = U.nastaTenta(null, true);
    if (!tenta) return '';

    /* Liggande banner: siffran, vilken tenta det gäller och knappen på
       en rad. Tar bredden utan att bli en vägg av blått. */
    var dagar = U.dagarTill(tenta.datum);
    var html = '<div class="kort nedrakning banner">';

    html += '<div class="dagar"><span class="siffra">' + dagar + '</span>' +
            '<span class="text">' + (dagar === 1 ? 'dag<br>kvar' : 'dagar<br>kvar') + '</span></div>';

    html += '<div class="banner-kropp">';
    html += '<div class="etikett">Nästa tenta · ' +
            (tenta.typ === 'omtenta' ? 'Omtenta' : 'Ordinarie') + '</div>';
    html += '<h1>' + U.esc(U.delkursNamn(tenta.delkurs)) + '</h1>';
    html += '<div class="fakta"><b>' + U.esc(U.langtDatum(tenta.datum)) + '</b> · ' +
            U.esc(tenta.tid) + ' · ' + U.esc(tenta.sal) +
            (tenta.larare ? ' · ' + U.esc(tenta.larare) : '') + '</div>';
    html += '</div>';

    if (harMaterial(tenta.delkurs)) {
      html += '<div class="knapprad">';
      html += tenta.delkurs !== vald
        ? '<button data-byt="' + U.esc(tenta.delkurs) + '">Plugga till den här tentan</button>'
        : '<button data-gatill="ova">Plugga till den här tentan</button>';
      html += '</div>';
    }
    return html + '</div>';
  }

  function harMaterial(id) {
    return S.fragor.some(function (f) { return f.delkurs === id; });
  }

  /* ================================================================ */
  /* Kalendern                                                         */
  /* ================================================================ */

  function kalenderkort() {
    var html = '<div class="kort">';

    html += '<h2>Kalender</h2>';
    html += '<p class="muted liten">Färgen visar vilken delkurs passet hör till. ' +
            'I varje ruta står starttiden och vad det är för sorts pass. ' +
            'Klicka på en dag för salar och detaljer.</p>';

    /* Växel mellan månadsvy och lista */
    html += '<div class="chiprad">';
    html += '<button class="chip' + (visning === 'kalender' ? ' vald' : '') +
            '" data-visning="kalender">Månad</button>';
    html += '<button class="chip' + (visning === 'lista' ? ' vald' : '') +
            '" data-visning="lista">Lista</button>';
    html += '</div>';

    /* Delkursfilter, tillika färgförklaring */
    html += '<div class="chiprad">';
    html += '<button class="chip' + (filterDelkurs === 'alla' ? ' vald' : '') +
            '" data-filterdk="alla">Alla delkurser</button>';
    S.kalenderDelkurser.forEach(function (d) {
      var n = S.pass.filter(function (p) { return p.delkurs === d.id; }).length;
      if (!n) return;
      html += '<button class="chip' + (filterDelkurs === d.id ? ' vald' : '') +
              '" data-filterdk="' + U.esc(d.id) + '">' +
              '<i class="fargprick" style="background:' + d.farg + '"></i>' +
              U.esc(d.kort) + ' <span class="antal">' + n + '</span></button>';
    });
    html += '</div>';

    html += visning === 'kalender' ? manadsvy() : listvy();

    return html + '</div>';
  }

  /* En händelsebricka i en dagsruta: starttid överst, passtyp under.
     Delkursfärgen ligger i --dkf och används av kantlinje och toning. */
  function bricka(p) {
    var typ = U.passTyp(p.typ);
    var klasser = ['hnd'];
    if (p.typ === 'tenta') klasser.push('h-tenta');
    if (p.obligatorisk) klasser.push('obl');

    var farg = U.delkursFarg(p.delkurs);
    var h = '<span class="' + klasser.join(' ') + '" style="--dkf:' + farg +
            (p.typ === 'tenta' ? ';color:' + U.kontrastfarg(farg) : '') + '"';
    h += ' title="' + U.esc(p.tid + ' · ' + typ.namn + ' · ' +
                            U.delkursNamn(p.delkurs) + ' · ' + p.sal) + '">';
    /* Gruppomgångar ("13:00/15:00") delas upp så att den andra tiden kan
       fällas bort på mobil, där rutan bara rymmer fem tecken. */
    var tider = (U.starttid(p.tid) || p.tid).split('/');
    h += '<b>' + U.esc(tider[0]) +
         (tider.length > 1 ? '<i class="hnd-extratid">/' + U.esc(tider.slice(1).join('/')) + '</i>' : '') +
         '</b>';
    h += '<span>' + U.esc(typ.kort) + '</span>';
    return h + '</span>';
  }

  function passForDatum(iso) {
    return S.pass.filter(function (p) {
      if (filterDelkurs !== 'alla' && p.delkurs !== filterDelkurs) return false;
      if (p.datum === iso) return true;
      /* Flerdagarspass, t.ex. redovisning 9–12 nov */
      if (p.spannTill) return iso > p.datum && iso <= p.spannTill;
      return false;
    });
  }

  function manadsvy() {
    var veckor = U.manadsrutnat(manadAr, manadNr);
    var idagIso = U.isoDatum(U.idag());
    var manadNamn = U.manadsNamn(manadNr) + ' ' + manadAr;

    var html = '';

    /* Månadsnavigering */
    html += '<div class="manadsrad">';
    html += '<button class="manadsknapp" data-manad="-1" aria-label="Föregående månad">←</button>';
    html += '<span class="manadsnamn">' + U.esc(manadNamn) + '</span>';
    html += '<span class="manadsrad-hoger">';
    html += '<button class="chip" data-idag="1">Idag</button>';
    html += '<button class="manadsknapp" data-manad="1" aria-label="Nästa månad">→</button>';
    html += '</span>';
    html += '</div>';

    html += '<div class="kalender">';

    html += '<div class="kal-veckodag">v.</div>';
    ['Mån', 'Tis', 'Ons', 'Tor', 'Fre', 'Lör', 'Sön'].forEach(function (d) {
      html += '<div class="kal-veckodag">' + d + '</div>';
    });

    veckor.forEach(function (vecka) {
      html += '<div class="kal-veckonr">' + U.veckonummer(U.isoDatum(vecka[0])) + '</div>';

      vecka.forEach(function (d, index) {
        var iso = U.isoDatum(d);
        var utanfor = d.getMonth() !== manadNr;
        var pass = passForDatum(iso);

        var klasser = ['kal-dag'];
        if (utanfor) klasser.push('utanfor');
        if (index >= 5) klasser.push('helg');
        if (iso === idagIso) klasser.push('idag');
        if (iso === valdDag) klasser.push('vald');
        if (pass.length) klasser.push('harpass');

        html += '<button class="' + klasser.join(' ') + '" data-dag="' + iso + '"' +
                (pass.length ? '' : ' tabindex="-1"') + '>';
        html += '<span class="kal-nr">' + d.getDate() + '</span>';

        /* Tentor först – de ska aldrig hamna bakom ett "+2 till" */
        var ordnade = pass.slice().sort(function (a, b) {
          if ((a.typ === 'tenta') !== (b.typ === 'tenta')) return a.typ === 'tenta' ? -1 : 1;
          return U.starttid(a.tid) < U.starttid(b.tid) ? -1 : 1;
        });

        ordnade.slice(0, 3).forEach(function (p) { html += bricka(p); });
        if (ordnade.length > 3) {
          html += '<span class="hnd-fler">+' + (ordnade.length - 3) + ' till</span>';
        }
        html += '</button>';
      });
    });

    html += '</div>';

    /* Teckenförklaring för passtyper – bara de som faktiskt förekommer */
    html += teckenforklaring();

    /* Vald dag i detalj */
    html += '<div id="dagsdetalj">' + dagsdetalj() + '</div>';

    /* Månadssammanfattning */
    var iManaden = S.pass.filter(function (p) {
      var d = U.parse(p.datum);
      return d && d.getFullYear() === manadAr && d.getMonth() === manadNr &&
             (filterDelkurs === 'alla' || p.delkurs === filterDelkurs);
    });
    var tentorIManaden = iManaden.filter(function (p) { return p.typ === 'tenta'; });

    html += '<p class="muted liten" style="margin-top:.9rem">' +
            iManaden.length + (iManaden.length === 1 ? ' pass' : ' pass') + ' i ' +
            U.esc(U.manadsNamn(manadNr).toLowerCase()) +
            (tentorIManaden.length
              ? ', varav ' + tentorIManaden.length +
                (tentorIManaden.length === 1 ? ' tenta' : ' tentor') : '') +
            '. Klicka på en dag för att se vad som händer.</p>';

    return html;
  }

  /* Teckenförklaring: samma brickor som i rutnätet, så att formen
     förklarar sig själv i stället för att kräva en färgkod. */
  function teckenforklaring() {
    var förekommer = {};
    S.pass.forEach(function (p) {
      if (filterDelkurs !== 'alla' && p.delkurs !== filterDelkurs) return;
      förekommer[p.typ || 'ovrigt'] = true;
    });

    var typer = U.passTypLista().filter(function (t) { return förekommer[t.id]; });
    if (!typer.length) return '';

    var html = '<div class="teckenforklaring">';
    html += '<span class="tf-rubrik">Vad är vad</span>';
    typer.forEach(function (t) {
      html += '<span class="hnd tf-prov' + (t.id === 'tenta' ? ' h-tenta' : '') + '">' +
              '<span>' + U.esc(t.namn) + '</span></span>';
    });
    html += '<span class="hnd tf-prov obl"><span>Obligatorisk</span></span>';
    html += '</div>';
    return html;
  }

  function dagsdetalj() {
    if (!valdDag) {
      return '<p class="muted liten" style="margin:.9rem 0 0">' +
             'Ingen dag vald. Klicka på en ruta i kalendern så visas tider, ' +
             'salar och vilken delkurs passen tillhör här.</p>';
    }

    var pass = passForDatum(valdDag).slice().sort(function (a, b) {
      return U.starttid(a.tid) < U.starttid(b.tid) ? -1 : 1;
    });

    var html = '<div class="dagskort">';
    html += '<div class="dagskort-rubrik">' + U.esc(U.langtDatum(valdDag)) +
            ' <span class="muted liten">· vecka ' + U.veckonummer(valdDag) + '</span></div>';

    if (!pass.length) {
      html += '<p class="muted liten" style="margin-bottom:0">Inget inbokat den här dagen. ' +
              'Bra tillfälle att repetera.</p>';
      return html + '</div>';
    }

    pass.forEach(function (p) {
      html += '<div class="dagspass" style="--dkf:' + U.delkursFarg(p.delkurs) + '">';
      html += '<div class="dagspass-tid">' + U.esc(p.tid) + '</div>';
      html += '<div class="dagspass-kropp">';
      html += '<div class="dagspass-rubrik">' + U.typBadge(p) + U.esc(p.rubrik) +
              (p.obligatorisk ? '<span class="pass-etikett obl">Obligatorisk</span>' : '') + '</div>';
      html += '<div class="dagspass-meta">' + U.esc(U.delkursNamn(p.delkurs)) +
              ' · ' + U.esc(p.sal) + '</div>';
      html += '</div></div>';
    });

    return html + '</div>';
  }

  function listvy() {
    var idag = U.idag();
    var pass = S.pass.filter(function (p) {
      if (filterDelkurs !== 'alla' && p.delkurs !== filterDelkurs) return false;
      return U.parse(p.datum) >= idag;
    });

    var html = '<p class="muted liten">' + pass.length + ' pass kvar av terminen.</p>';

    if (!pass.length) {
      return html + '<p class="muted">Inga kommande pass.</p>';
    }

    var vecka = null;
    pass.forEach(function (p) {
      var v = U.veckonummer(p.datum);
      if (v !== vecka) {
        vecka = v;
        html += '<div class="veckorubrik">Vecka ' + v + '</div>';
      }
      html += '<div class="pass' + (p.typ === 'tenta' ? ' ar-tenta' : '') +
              '" style="--dkf:' + U.delkursFarg(p.delkurs) + '">';
      html += '<span class="pass-dag">' + U.esc(U.kortDatum(p.datum)) +
              (p.spannTill ? '–' + U.parse(p.spannTill).getDate() : '') + '</span>';
      html += '<span class="pass-tid">' + U.esc(p.tid) + '</span>';
      html += '<span class="pass-kropp">';
      html += '<span class="pass-rubrik">' + U.typBadge(p) + U.esc(p.rubrik) +
              (p.obligatorisk ? '<span class="pass-etikett obl">Obligatorisk</span>' : '') + '</span>';
      html += '<span class="pass-meta"><i class="fargprick" style="background:' +
              U.delkursFarg(p.delkurs) + '"></i>' +
              U.esc(U.delkursKort(p.delkurs)) + ' · ' + U.esc(p.sal) + '</span>';
      html += '</span></div>';
    });

    return html;
  }

  /* ================================================================ */
  /* Tentor                                                            */
  /* ================================================================ */

  function tentakort() {
    var html = '<div class="kort">';
    html += '<h2>Alla tentor</h2>';

    var ordinarie = S.tentor.filter(function (t) { return t.typ === 'ordinarie'; });
    ordinarie.sort(function (a, b) { return a.datum < b.datum ? -1 : 1; });

    var narmast = U.nastaTenta(null, false);
    ordinarie.forEach(function (t) {
      html += tentarad(t, narmast && t.datum === narmast.datum && t.delkurs === narmast.delkurs);
    });

    html += '<div class="knapprad"><button class="sekundar" id="toggleomtentor">' +
            (visaOmtentor ? 'Dölj omtentor' : 'Visa omtentor') + '</button></div>';

    if (visaOmtentor) {
      var om = S.tentor.filter(function (t) { return t.typ === 'omtenta'; });
      om.sort(function (a, b) { return a.datum < b.datum ? -1 : 1; });
      html += '<h3>Omtentor</h3>';
      om.forEach(function (t) { html += tentarad(t, false); });
    }

    return html + '</div>';
  }

  function tentarad(t, arNarmast) {
    var dagar = U.dagarTill(t.datum);
    var passerad = dagar < 0;

    var h = '<div class="tentakort' + (arNarmast ? ' narmast' : '') + '"' +
            (passerad ? ' style="opacity:.42"' : '') + '>';
    h += '<span>';
    h += '<span class="tk-namn"><i class="fargprick" style="background:' +
         U.delkursFarg(t.delkurs) + '"></i>' + U.esc(U.delkursNamn(t.delkurs)) + '</span>';
    h += '<span class="tk-meta">' + U.esc(U.langtDatum(t.datum)) + ' · ' + U.esc(t.tid) +
         ' · ' + U.esc(t.sal) + '</span>';
    h += '<span class="tk-meta">' + U.esc(statusText(t.delkurs)) + '</span>';
    h += '</span>';
    h += '<span class="tk-dagar">' + (passerad ? 'passerad' : 'om ' + dagar + ' dagar') + '</span>';
    return h + '</div>';
  }

  function statusText(delkursId) {
    if (!harMaterial(delkursId)) return 'Finns inte i appen än.';

    var komp = S.kompendium[delkursId];
    var s = S.store.sammanfattning(delkursId);
    var delar = [];

    if (komp && komp.kapitel.length) {
      delar.push('Du har läst ' + S.store.antalLasta(komp.kapitel) + ' av ' +
                 komp.kapitel.length + ' kapitel');
    }
    if (s.forsok > 0) {
      delar.push(s.procent + ' % rätt på ' + s.forsok + (s.forsok === 1 ? ' fråga' : ' frågor'));
    }
    if (!delar.length) return 'Du har inte börjat plugga på den här än.';
    return delar.join(', ') + '.';
  }

  /* ================================================================ */
  /* Terminen i faser                                                  */
  /* ================================================================ */

  function faskort() {
    var html = '<div class="kort">';
    html += '<h2>Terminen i stort</h2>';
    S.terminsfaser.forEach(function (f) {
      html += '<div class="fas' + (f.tat ? ' tat' : '') + '">';
      html += '<div class="span">' + U.esc(f.span) + (f.tat ? ' · Tät period' : '') + '</div>';
      html += '<div class="rubrik">' + U.esc(f.rubrik) + '</div>';
      html += '<div class="text">' + U.esc(f.text) + '</div>';
      html += '</div>';
    });
    html += '<div class="notis" style="margin-top:.9rem">' +
            U.esc(S.kalenderNoteringar.tyngstaStrackan) + '</div>';
    return html + '</div>';
  }

  function praktisktkort() {
    var html = '<div class="kort rosa">';
    html += '<h2>Bra att veta</h2>';
    html += '<ul>';
    S.kalenderNoteringar.praktiskt.forEach(function (t) {
      html += '<li>' + U.esc(t) + '</li>';
    });
    html += '</ul>';
    html += '<p class="muted mini" style="margin-bottom:0">' +
            U.esc(S.kalenderNoteringar.kalla) + '</p>';
    return html + '</div>';
  }

  /* ================================================================ */

  function koppla(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-visning]'), function (b) {
      b.addEventListener('click', function () { visning = b.dataset.visning; rendera(); });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-filterdk]'), function (b) {
      b.addEventListener('click', function () { filterDelkurs = b.dataset.filterdk; rendera(); });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-manad]'), function (b) {
      b.addEventListener('click', function () {
        manadNr += parseInt(b.dataset.manad, 10);
        if (manadNr < 0) { manadNr = 11; manadAr -= 1; }
        if (manadNr > 11) { manadNr = 0; manadAr += 1; }
        valdDag = null;
        rendera();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-idag]'), function (b) {
      b.addEventListener('click', function () {
        var d = U.idag();
        manadAr = d.getFullYear();
        manadNr = d.getMonth();
        valdDag = U.isoDatum(d);
        rendera();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-dag]'), function (b) {
      b.addEventListener('click', function () {
        valdDag = valdDag === b.dataset.dag ? null : b.dataset.dag;
        rendera();
      });
    });

    var to = U.el('toggleomtentor');
    if (to) to.addEventListener('click', function () { visaOmtentor = !visaOmtentor; rendera(); });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-byt]'), function (b) {
      b.addEventListener('click', function () {
        S.app.bytDelkurs(b.dataset.byt);
        S.app.visaVy('ova');
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-gatill]'), function (b) {
      b.addEventListener('click', function () { S.app.visaVy(b.dataset.gatill); });
    });
  }

  return { rendera: rendera };
})();
