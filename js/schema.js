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
    passCache = null;
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

  /* Kursens pass med dina ändringar och egna poster inräknade.
     Cachas per rendering så att listan byggs en gång, inte per dagsruta. */
  var passCache = null;
  function pass() {
    if (!passCache) passCache = U.allaPass();
    return passCache;
  }

  function kalenderkort() {
    var egna = S.store.egnaPass().length;

    var html = '<div class="kort">';

    html += '<h2>Kalender';
    html += '<button class="minibtn" data-nypass="1">+ Egen händelse</button>';
    html += '</h2>';
    html += '<p class="muted liten">Färgen visar vilken delkurs passet hör till. ' +
            'I varje ruta står starttiden och vad det är för sorts pass. ' +
            '<strong>Klicka på en dag</strong> för salar, detaljer och för att ' +
            'ändra eller lägga till något.</p>';

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
      var n = pass().filter(function (p) { return p.delkurs === d.id; }).length;
      if (!n) return;
      html += '<button class="chip' + (filterDelkurs === d.id ? ' vald' : '') +
              '" data-filterdk="' + U.esc(d.id) + '">' +
              '<i class="fargprick" style="background:' + d.farg + '"></i>' +
              U.esc(d.kort) + ' <span class="antal">' + n + '</span></button>';
    });
    if (egna) {
      html += '<button class="chip chip-egen' + (filterDelkurs === 'egna' ? ' vald' : '') +
              '" data-filterdk="egna">✎ Mina egna <span class="antal">' + egna + '</span></button>';
    }
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
    /* Egna och ändrade poster får streckad kant i stället för en åttonde
       färg. Färgskalan är redan full av delkurser – hade "mitt" blivit en
       färg till hade den behövt läras in. En streckad kant läser sig själv. */
    if (p.egen) klasser.push('egen');
    if (p.andrad) klasser.push('andrad');

    var farg = p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)';
    var h = '<span class="' + klasser.join(' ') + '" style="--dkf:' + farg +
            (p.typ === 'tenta' ? ';color:' + U.kontrastfarg(farg) : '') + '"';
    h += ' title="' + U.esc(p.tid + ' · ' + typ.namn +
                            (p.delkurs ? ' · ' + U.delkursNamn(p.delkurs) : '') +
                            (p.sal ? ' · ' + p.sal : '') +
                            (p.egen ? ' · din egen händelse' : '') +
                            (p.andrad ? ' · ändrad av dig' : '')) + '">';
    /* Gruppomgångar ("13:00/15:00") delas upp så att den andra tiden kan
       fällas bort på mobil, där rutan bara rymmer fem tecken. */
    var tider = (U.starttid(p.tid) || p.tid).split('/');
    h += '<b>' + U.esc(tider[0]) +
         (tider.length > 1 ? '<i class="hnd-extratid">/' + U.esc(tider.slice(1).join('/')) + '</i>' : '') +
         '</b>';
    h += '<span>' + U.esc(typ.kort) + '</span>';
    return h + '</span>';
  }

  function passarFilter(p) {
    if (filterDelkurs === 'alla') return true;
    if (filterDelkurs === 'egna') return !!p.egen;
    return p.delkurs === filterDelkurs;
  }

  function passForDatum(iso) {
    return pass().filter(function (p) {
      if (!passarFilter(p)) return false;
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
    var iManaden = pass().filter(function (p) {
      var d = U.parse(p.datum);
      return d && d.getFullYear() === manadAr && d.getMonth() === manadNr &&
             passarFilter(p);
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
    var harEgna = false, harAndrade = false;
    pass().forEach(function (p) {
      if (!passarFilter(p)) return;
      förekommer[p.typ || 'ovrigt'] = true;
      if (p.egen) harEgna = true;
      if (p.andrad) harAndrade = true;
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
    if (harEgna) html += '<span class="hnd tf-prov egen"><span>Din egen</span></span>';
    if (harAndrade) html += '<span class="hnd tf-prov andrad"><span>Ändrad av dig</span></span>';
    html += '</div>';
    return html;
  }

  function dagsdetalj() {
    if (!valdDag) {
      return '<p class="muted liten" style="margin:.9rem 0 0">' +
             'Ingen dag vald. <strong>Klicka på en ruta i kalendern</strong> så visas tider, ' +
             'salar och delkurs här — och du kan ändra eller lägga till något.</p>';
    }

    var dagens = passForDatum(valdDag).slice().sort(function (a, b) {
      return U.starttid(a.tid) < U.starttid(b.tid) ? -1 : 1;
    });

    var html = '<div class="dagskort">';
    html += '<div class="dagskort-topp">';
    html += '<div class="dagskort-rubrik">' + U.esc(U.langtDatum(valdDag)) +
            ' <span class="muted liten">· vecka ' + U.veckonummer(valdDag) + '</span></div>';
    html += '<button class="minibtn" data-nypass="' + U.esc(valdDag) + '">+ Lägg till här</button>';
    html += '</div>';

    if (!dagens.length) {
      html += '<p class="muted liten" style="margin-bottom:0">Inget inbokat den här dagen. ' +
              'Bra tillfälle att repetera.</p>';
      return html + '</div>';
    }

    dagens.forEach(function (p) {
      var farg = p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)';
      html += '<div class="dagspass' + (p.egen ? ' egen' : '') + (p.andrad ? ' andrad' : '') +
              '" style="--dkf:' + farg + '">';
      html += '<div class="dagspass-tid">' + U.esc(p.tid) + '</div>';
      html += '<div class="dagspass-kropp">';
      html += '<div class="dagspass-rubrik">' + U.typBadge(p) + U.esc(p.rubrik) +
              (p.obligatorisk ? '<span class="pass-etikett obl">Obligatorisk</span>' : '') +
              (p.egen ? '<span class="pass-etikett min">✎ Din egen</span>' : '') +
              (p.andrad ? '<span class="pass-etikett min">✎ Ändrad</span>' : '') + '</div>';

      var meta = [];
      if (p.delkurs) meta.push(U.delkursNamn(p.delkurs));
      if (p.sal) meta.push(p.sal);
      if (meta.length) html += '<div class="dagspass-meta">' + U.esc(meta.join(' · ')) + '</div>';
      if (p.notis) html += '<div class="dagspass-notis">' + U.inline(p.notis) + '</div>';

      html += '</div>';
      html += '<button class="minibtn" data-andrapass="' + U.esc(p.passId) + '">Ändra</button>';
      html += '</div>';
    });

    return html + '</div>';
  }

  function listvy() {
    var idag = U.idag();
    var kommande = pass().filter(function (p) {
      if (!passarFilter(p)) return false;
      return U.parse(p.datum) >= idag;
    });

    var html = '<p class="muted liten">' + kommande.length + ' pass kvar av terminen.</p>';

    if (!kommande.length) {
      return html + '<p class="muted">Inga kommande pass.</p>';
    }

    var vecka = null;
    kommande.forEach(function (p) {
      var v = U.veckonummer(p.datum);
      if (v !== vecka) {
        vecka = v;
        html += '<div class="veckorubrik">Vecka ' + v + '</div>';
      }
      var farg = p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)';
      html += '<div class="pass' + (p.typ === 'tenta' ? ' ar-tenta' : '') +
              (p.egen ? ' egen' : '') + (p.andrad ? ' andrad' : '') +
              '" style="--dkf:' + farg + '">';
      html += '<span class="pass-dag">' + U.esc(U.kortDatum(p.datum)) +
              (p.spannTill ? '–' + U.parse(p.spannTill).getDate() : '') + '</span>';
      html += '<span class="pass-tid">' + U.esc(p.tid) + '</span>';
      html += '<span class="pass-kropp">';
      html += '<span class="pass-rubrik">' + U.typBadge(p) + U.esc(p.rubrik) +
              (p.obligatorisk ? '<span class="pass-etikett obl">Obligatorisk</span>' : '') +
              (p.egen ? '<span class="pass-etikett min">✎ Din egen</span>' : '') +
              (p.andrad ? '<span class="pass-etikett min">✎ Ändrad</span>' : '') + '</span>';
      html += '<span class="pass-meta"><i class="fargprick" style="background:' + farg + '"></i>' +
              U.esc(p.delkurs ? U.delkursKort(p.delkurs) : 'Egen') +
              (p.sal ? ' · ' + U.esc(p.sal) : '') + '</span>';
      html += '</span>';
      html += '<button class="minibtn" data-andrapass="' + U.esc(p.passId) + '">Ändra</button>';
      html += '</div>';
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

  /* Efter en ändring visas den dag posten faktiskt hamnade på — även om
     man flyttade den till en annan månad. Annars ser det ut som att
     ändringen försvann. */
  function hoppaTill(datum) {
    if (datum) {
      var d = U.parse(datum);
      if (d) { manadAr = d.getFullYear(); manadNr = d.getMonth(); valdDag = datum; }
    }
    rendera();
  }

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

    /* Ny egen händelse. Har man en dag vald fylls den i som datum. */
    Array.prototype.forEach.call(vy.querySelectorAll('[data-nypass]'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var datum = b.dataset.nypass !== '1' ? b.dataset.nypass
                  : (valdDag || U.isoDatum(new Date(manadAr, manadNr, 1)));
        S.passform.nyPa(datum, hoppaTill);
      });
    });

    /* Ändra ett befintligt pass, kursens eller ditt eget */
    Array.prototype.forEach.call(vy.querySelectorAll('[data-andrapass]'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var p = pass().filter(function (x) { return x.passId === b.dataset.andrapass; })[0];
        if (p) S.passform.oppna(p, hoppaTill);
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
