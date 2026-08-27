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
    html += '<aside class="sido">' + tentakort() + extentakort() + '</aside>';
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
            '<strong>Klicka på vilken dag som helst</strong> — då öppnas den med salar ' +
            'och detaljer, och du kan lägga in något eget.</p>';

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

    /* Delkursen står först och i sin egen färg. Färgen ensam räckte inte —
       sju nyanser är fler än man håller i huvudet, särskilt de tre blå. */
    h += '<span>';
    if (p.delkurs) h += '<i class="hnd-dk">' + U.esc(U.delkursKort(p.delkurs)) + '</i>';
    else if (p.egen) h += '<i class="hnd-dk">Egen</i>';
    h += '<i class="hnd-typ">' + U.esc(typ.kort) + '</i>';
    h += '</span>';
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

        /* Alla dagar går att klicka på, även tomma – det är just de tomma
           man vill lägga något eget på. */
        html += '<button class="' + klasser.join(' ') + '" data-dag="' + iso + '"' +
                ' title="' + U.esc(U.langtDatum(iso)) +
                (pass.length ? ' – ' + pass.length + ' pass' : ' – inget inbokat') +
                '. Klicka för att se och lägga till.">';
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
            '. Klicka på en dag för att öppna den.</p>';

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

  /* ================================================================ */
  /* Dagrutan – öppnas som dialog när man klickar på ett datum         */
  /*                                                                   */
  /* Allt som rör en dag samlas här: vad som händer och möjligheten    */
  /* att lägga till något eget. Att klicka på datumet är den naturliga */
  /* gesten för "jag vill göra något med den här dagen", så den ska    */
  /* leda hela vägen och inte bara markera rutan.                      */
  /* ================================================================ */

  function oppnaDag(iso) {
    valdDag = iso;
    U.overlagg.oppna(function (behallare) {
      behallare.innerHTML = dagRutaHtml(iso);
      kopplaDagRuta(behallare, iso);
    }, function () {
      valdDag = null;
      rendera();
    });
  }

  function dagRutaHtml(iso) {
    var dagens = passForDatum(iso).slice().sort(function (a, b) {
      return U.starttid(a.tid) < U.starttid(b.tid) ? -1 : 1;
    });

    var h = '<div class="overlagg-ruta dagruta">';

    h += '<div class="overlagg-topp">';
    h += '<h2 id="overlagg-rubrik" class="utan-markor dagruta-rubrik">' +
         U.esc(U.langtDatum(iso)) +
         '<span class="muted liten"> · vecka ' + U.veckonummer(iso) + '</span></h2>';
    h += '<button class="ikonknapp" id="dr-stang" aria-label="Stäng">✕</button>';
    h += '</div>';

    if (!dagens.length) {
      h += '<p class="muted">Inget inbokat den här dagen. Bra tillfälle att repetera — ' +
           'eller lägg in något eget.</p>';
    } else {
      h += '<div class="dagruta-lista">';
      dagens.forEach(function (p) {
        var farg = p.delkurs ? U.delkursFarg(p.delkurs) : 'var(--egen)';
        h += '<div class="dagspass' + (p.egen ? ' egen' : '') + (p.andrad ? ' andrad' : '') +
             '" style="--dkf:' + farg + '">';
        h += '<div class="dagspass-tid">' + U.esc(p.tid) + '</div>';
        h += '<div class="dagspass-kropp">';
        h += '<div class="dagspass-rubrik">' + U.typBadge(p) + U.esc(p.rubrik) +
             (p.obligatorisk ? '<span class="pass-etikett obl">Obligatorisk</span>' : '') +
             (p.egen ? '<span class="pass-etikett min">✎ Din egen</span>' : '') +
             (p.andrad ? '<span class="pass-etikett min">✎ Ändrad</span>' : '') + '</div>';

        var meta = [];
        if (p.delkurs) meta.push(U.delkursNamn(p.delkurs));
        if (p.sal) meta.push(p.sal);
        if (p.larare) meta.push(p.larare);
        if (meta.length) h += '<div class="dagspass-meta">' + U.esc(meta.join(' · ')) + '</div>';
        if (p.notis) h += '<div class="dagspass-notis">' + U.inline(p.notis) + '</div>';

        h += '</div>';
        h += '<button class="minibtn" data-andrapass="' + U.esc(p.passId) + '">Ändra</button>';
        h += '</div>';
      });
      h += '</div>';
    }

    h += '<div class="overlagg-knappar">';
    h += '<button class="primar" data-nypass="' + U.esc(iso) + '">+ Lägg till egen händelse</button>';
    h += '<button class="sekundar" id="dr-klar">Stäng</button>';
    h += '</div>';

    return h + '</div>';
  }

  function kopplaDagRuta(behallare, iso) {
    U.el('dr-stang').addEventListener('click', function () { U.overlagg.stang(); });
    U.el('dr-klar').addEventListener('click', function () { U.overlagg.stang(); });

    /* Formuläret tar över samma överlägg. Oavsett om man sparar eller
       ångrar sig kommer man tillbaka hit, så man ser resultatet i sitt
       sammanhang i stället för att trilla ut till kalendern.

       Flyttar man posten till ett annat datum följer dagrutan med dit –
       annars öppnas den dag man kom ifrån och posten ser ut att ha
       försvunnit. */
    var visaDag = iso;

    function narSparat(datum) {
      if (datum) visaDag = datum;
      passCache = null;
      hoppaTill(datum);
    }
    function narStangd() { passCache = null; oppnaDag(visaDag); }

    Array.prototype.forEach.call(behallare.querySelectorAll('[data-nypass]'), function (b) {
      b.addEventListener('click', function () {
        S.passform.nyPa(iso, narSparat, narStangd);
      });
    });

    Array.prototype.forEach.call(behallare.querySelectorAll('[data-andrapass]'), function (b) {
      b.addEventListener('click', function () {
        var p = pass().filter(function (x) { return x.passId === b.dataset.andrapass; })[0];
        if (p) S.passform.oppna(p, narSparat, narStangd);
      });
    });
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
  /* Gamla tentor                                                      */
  /*                                                                   */
  /* Tentorna ligger bakom inloggning och går inte att länka till      */
  /* generellt. Kortet pekar därför ut var de brukar finnas, och låter */
  /* dig spara dina egna länkar när du väl letat upp dem en gång.      */
  /* ================================================================ */

  function extentakort() {
    var egna = S.store.tentalankar();

    var h = '<div class="kort">';
    h += '<h2>Gamla tentor';
    h += '<button class="minibtn" id="ny-tentalank">+ Spara länk</button>';
    h += '</h2>';

    h += '<p class="muted liten">Att räkna gamla tentor ligger närmast den riktiga ' +
         'situationen av allt du kan göra. Här är vägarna dit — och plats för dina ' +
         'egna länkar när du hittat dem.</p>';

    h += '<div class="lanklista">';
    h += lankrad('https://canvas.education.lu.se/', 'Canvas',
                 'Kursrummet. Gamla tentor och facit brukar ligga under Filer eller Sidor.', null);
    h += lankrad('https://www.lu.se/lubas/i-uoh-lu-SYSB23', 'Kursplanen för SYSB23',
                 'Examinationsformer och lärandemål — vad de faktiskt får fråga om.', null);
    h += lankrad('https://www.ehl.lu.se/utbildning/student', 'Studentsidorna på EHL',
                 'Anmälan i Ladok, skrivsalar och regler för salstentamen.', null);

    egna.forEach(function (l) { h += lankrad(l.url, l.titel, '', l.id); });
    h += '</div>';

    if (!egna.length) {
      h += '<p class="muted mini" style="margin-bottom:0">Hittar du en tenta i Canvas: ' +
           'kopiera adressen och spara den här, så slipper du leta igen.</p>';
    }

    return h + '</div>';
  }

  function lankrad(url, titel, beskrivning, egetId) {
    var h = '<div class="lankrad">';
    h += '<a href="' + U.esc(url) + '" target="_blank" rel="noopener noreferrer">';
    h += '<span class="lank-titel">' + U.esc(titel) + ' \u2197</span>';
    h += '<span class="lank-besk' + (beskrivning ? '' : ' lank-url') + '">' +
         U.esc(beskrivning || url) + '</span>';
    h += '</a>';
    if (egetId) {
      h += '<button class="minibtn" data-tabortlank="' + U.esc(egetId) +
           '" aria-label="Ta bort länken">\u2715</button>';
    }
    return h + '</div>';
  }

  function oppnaLankform() {
    U.overlagg.oppna(function (b) {
      var h = '<div class="overlagg-ruta">';
      h += '<div class="overlagg-topp">';
      h += '<h2 id="overlagg-rubrik" class="utan-markor">Spara en länk</h2>';
      h += '<button class="ikonknapp" id="lf-stang" aria-label="Stäng">\u2715</button></div>';
      h += '<p class="muted liten">Länken sparas bara hos dig, i den här webbläsaren.</p>';
      h += '<div class="faltrad"><label class="falt">' +
           '<span class="falt-etikett">Vad är det?</span>' +
           '<input type="text" id="lf-titel" maxlength="90" ' +
           'placeholder="Tenta HT 2025 med facit"></label></div>';
      h += '<div class="faltrad"><label class="falt">' +
           '<span class="falt-etikett">Adress</span>' +
           '<input type="url" id="lf-url" placeholder="https://…"></label></div>';
      h += '<p class="pf-fel dold" id="lf-fel"></p>';
      h += '<div class="overlagg-knappar">' +
           '<button class="primar" id="lf-spara">Spara</button>' +
           '<button class="sekundar" id="lf-avbryt">Avbryt</button></div>';
      b.innerHTML = h + '</div>';

      U.el('lf-stang').addEventListener('click', function () { U.overlagg.stang(); });
      U.el('lf-avbryt').addEventListener('click', function () { U.overlagg.stang(); });
      U.el('lf-spara').addEventListener('click', function () {
        var titel = U.el('lf-titel').value.trim();
        var url = U.el('lf-url').value.trim();
        var fel = U.el('lf-fel');
        if (!titel) {
          fel.textContent = 'Skriv vad länken leder till.';
          fel.classList.remove('dold');
          return;
        }
        if (!S.store.laggTillLank(titel, url)) {
          fel.textContent = 'Adressen måste börja med http:// eller https://.';
          fel.classList.remove('dold');
          return;
        }
        U.overlagg.stang();
        rendera();
      });
    });
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

    /* Knappen i kortets huvud. Föreslår idag om man tittar på den månaden,
       annars den första i månaden — och landar i dagrutan när man är klar. */
    Array.prototype.forEach.call(vy.querySelectorAll('[data-nypass]'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var idagD = U.idag();
        var datum = (idagD.getMonth() === manadNr && idagD.getFullYear() === manadAr)
                  ? U.isoDatum(idagD)
                  : U.isoDatum(new Date(manadAr, manadNr, 1));
        S.passform.nyPa(datum, null, function () { passCache = null; oppnaDag(datum); });
      });
    });

    /* Ändra ett pass direkt ur listvyn */
    Array.prototype.forEach.call(vy.querySelectorAll('[data-andrapass]'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var p = pass().filter(function (x) { return x.passId === b.dataset.andrapass; })[0];
        if (p) S.passform.oppna(p, null, function () { passCache = null; rendera(); });
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
      b.addEventListener('click', function () { oppnaDag(b.dataset.dag); });
    });

    var nl = U.el('ny-tentalank');
    if (nl) nl.addEventListener('click', oppnaLankform);

    Array.prototype.forEach.call(vy.querySelectorAll('[data-tabortlank]'), function (b) {
      b.addEventListener('click', function () {
        S.store.taBortLank(b.dataset.tabortlank);
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
