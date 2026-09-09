/* =========================================================================
   ova.js – Öva-läget: en fråga i taget, med facit direkt.

   Provet bodde tidigare här och delade frågemotor med Öva. Det flyttade
   till js/tentaprov.js när det blev ett helt tentaformulär i stället för
   en fråga i taget — de två har inte längre något gemensamt utom
   frågebanken. Motorns arProv-grenar är kvarlevor och tas aldrig.

   Ämnesfiltret tar en LISTA av ämnen, så att man kan blanda flera i samma
   pass. Det är närmare tentan än att köra ett kapitel i taget.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.ova = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  /* Filterläge för Öva.

     amnen är en LISTA. Tom lista betyder allt. Att kunna blanda flera
     ämnen i samma pass är poängen: på tentan kommer frågorna inte ett
     kapitel i taget, och den som bara övat kapitelvis känner igen svaren
     på sammanhanget i stället för på innehållet. */
  var filter = { amnen: [], svarighet: 'alla' };

  /* Pågående pass */
  var pass = null;
  /* pass = { lage:'ova'|'prov', vyId, fragor, index, svar[], besvarad, valtIndex, rubrik } */

  /* Öva- och Prov-vyerna använder samma id:n internt. Den ena ligger kvar i DOM:en
     (dold) medan den andra är aktiv, så alla uppslag måste scopas till rätt vy –
     annars träffar getElementById fel vys element. */
  function q(sel) {
    if (!pass) return null;
    return document.querySelector('#' + pass.vyId + ' ' + sel);
  }
  function qa(sel) {
    if (!pass) return [];
    return Array.prototype.slice.call(document.querySelectorAll('#' + pass.vyId + ' ' + sel));
  }

  /* ================================================================ */
  /* Publika ingångar                                                  */
  /* ================================================================ */

  function renderaOva() {
    if (pass && pass.lage === 'ova') { visaFraga('vy-ova'); return; }
    startaOva();
  }

  /* Ingång från kompendiet: öva just det här ämnet, ensamt. */
  function ovaAmne(amneId) {
    filter.amnen = [amneId];
    filter.svarighet = 'alla';
    pass = null;
    S.app.visaVy('ova');
  }

  function avbryt() {
    lamnaFokus();
    pass = null;
    S.app.rendera();
  }

  /* ================================================================ */
  /* Urval av frågor                                                   */
  /* ================================================================ */

  /* amnen: lista med ämnes-id. Tom lista betyder alla ämnen. */
  function tillgangliga(delkurs, amnen, svarighet, typer) {
    return S.fragor.filter(function (f) {
      if (f.delkurs !== delkurs) return false;
      if (amnen && amnen.length && amnen.indexOf(f.amne) === -1) return false;
      if (svarighet && svarighet !== 'alla' && String(f.svarighet) !== String(svarighet)) return false;
      if (typer && typer.indexOf(f.typ) === -1) return false;
      return true;
    });
  }

  /* Adaptiv ordning: frågor man svarat fel på och aldrig sett kommer först */
  function adaptivOrdning(fragor) {
    return fragor.slice().sort(function (a, b) { return vikt(b) - vikt(a); });

    function vikt(f) {
      var v = Math.random() * 8;   // variation så ordningen inte blir identisk
      var st = S.store.fragaStatistik(f.id);
      if (!st) return v + 22;      // aldrig sedd
      v += (st.prioritet || 0) * 9;
      if (st.forsok > 0) v += (1 - st.ratt / st.forsok) * 18;
      // Frågor man nyligen svarat rätt på skjuts bakåt
      if (st.senast) {
        var timmar = (Date.now() - new Date(st.senast).getTime()) / 3600000;
        if (timmar < 2 && st.prioritet === 0) v -= 25;
      }
      return v;
    }
  }

  /* ================================================================ */
  /* ÖVA                                                               */
  /* ================================================================ */

  function startaOva() {
    var delkurs = S.store.delkurs();
    var urval = tillgangliga(delkurs, filter.amnen, filter.svarighet, ['flerval', 'praktisk']);

    if (!urval.length) {
      pass = null;
      visaOvaTomt(delkurs);
      return;
    }

    pass = {
      lage: 'ova', vyId: 'vy-ova',
      fragor: adaptivOrdning(urval),
      index: 0, svar: [], besvarad: false, valtIndex: null,
      rubrik: rubrikFor(delkurs)
    };
    visaFraga('vy-ova');
  }

  /* Repetitionspass: bara frågor som ligger kvar i kön. Dessa har du
     svarat fel på tidigare och de återkommer tills de suttit. */
  function startaRepetition() {
    var delkurs = S.store.delkurs();
    var kö = S.store.repetitioner(delkurs);

    if (!kö.length) {
      alert('Repetitionskön är tom. Bra jobbat — allt du svarat fel på har satt sig.');
      return;
    }

    pass = {
      lage: 'ova', vyId: 'vy-ova', repetition: true,
      fragor: adaptivOrdning(kö),
      index: 0, svar: [], besvarad: false, valtIndex: null,
      rubrik: 'Repetition – ' + U.delkursNamn(delkurs)
    };
    S.app.visaVy('ova');
  }

  function rubrikFor(delkurs) {
    var delar = [U.delkursNamn(delkurs)];

    if (filter.amnen.length === 1) delar.push(U.amneNamn(filter.amnen[0]));
    else if (filter.amnen.length > 1) delar.push(filter.amnen.length + ' ämnen blandat');

    if (filter.svarighet !== 'alla') {
      delar.push({ '1': 'grund', '2': 'standard', '3': 'klurig' }[filter.svarighet]);
    }
    return delar.join(' – ');
  }

  function visaOvaTomt(delkurs) {
    var html = filterpanel(delkurs);
    html += '<div class="kort"><p class="muted">Inga frågor matchar filtret. ' +
            'Välj ett bredare urval.</p></div>';
    var vy = U.el('vy-ova');
    vy.innerHTML = html;
    kopplaFilter(vy);
  }

  function filterpanel(delkurs) {
    var amnen = S.amnen.filter(function (a) { return a.delkurs === delkurs; });

    var html = '<div class="kort doljifokus">';
    html += '<h2>Öva</h2>';
    html += '<p class="muted liten">En fråga i taget, med facit direkt. Frågor du svarat fel på ' +
            'kommer tillbaka oftare. Inga minuspoäng här.</p>';

    var valda = filter.amnen.length;

    html += '<div class="amnesrubrik">';
    html += '<h3>Ämnen</h3>';
    html += '<span class="muted mini">' +
            (valda ? valda + ' valda · klicka för att lägga till eller ta bort'
                   : 'Inget valt betyder allt. Klicka i flera för att blanda.') +
            '</span>';
    if (valda) html += '<button class="lankbtn" data-amnen="rensa">Rensa</button>';
    html += '</div>';

    html += '<div class="chiprad">';
    var alla = tillgangliga(delkurs, [], filter.svarighet, ['flerval', 'praktisk']).length;
    html += '<button class="chip' + (valda ? '' : ' vald') +
            '" data-amnen="rensa">Allt <span class="antal">' + alla + '</span></button>';

    amnen.forEach(function (a) {
      var n = tillgangliga(delkurs, [a.id], filter.svarighet, ['flerval', 'praktisk']).length;
      if (!n) return;
      var niva = S.store.amnesNiva(a.id);
      var i = filter.amnen.indexOf(a.id) > -1;
      html += '<button class="chip' + (i ? ' vald' : '') +
              '" data-amnen="vaxla" data-varde="' + U.esc(a.id) + '"' +
              ' aria-pressed="' + (i ? 'true' : 'false') + '"' +
              ' title="' + U.esc(niva.namn + ' – ' + niva.beskrivning) + '">' +
              (i ? '<span class="bock" aria-hidden="true">✓</span>' : U.nivaPrick(niva.n)) +
              U.esc(a.namn) + ' <span class="antal">' + n + '</span></button>';
    });
    html += '</div>';

    /* Nivåmätaren gäller ett ämne i taget och blir meningslös för en
       blandning — då visar vi hur många frågor blandningen ger i stället. */
    if (filter.amnen.length === 1) {
      var vald = S.store.amnesNiva(filter.amnen[0]);
      var krav = S.store.nastaNivaKrav(filter.amnen[0]);
      html += '<div class="notis info" style="display:flex;align-items:center;gap:.7rem;flex-wrap:wrap">';
      html += U.nivaMatare(vald.n);
      html += U.nivaEtikett(vald);
      html += '<span class="liten">' + U.esc(krav || vald.beskrivning + '. Ämnet sitter.') + '</span>';
      html += '</div>';
    } else if (filter.amnen.length > 1) {
      var n = tillgangliga(delkurs, filter.amnen, filter.svarighet, ['flerval', 'praktisk']).length;
      html += '<div class="notis info liten">Blandat pass ur ' + filter.amnen.length +
              ' ämnen: <strong>' + n + ' frågor</strong>. ' +
              'Att inte veta vilket kapitel en fråga kommer från är närmare tentan ' +
              'än att öva ett ämne i taget.</div>';
    }

    html += '<h3>Svårighetsgrad</h3><div class="chiprad">';
    html += chip('alla', 'Alla', null, filter.svarighet === 'alla', 'svarighet');
    [['1', 'Grund'], ['2', 'Standard'], ['3', 'Klurig']].forEach(function (s) {
      var n = tillgangliga(delkurs, filter.amnen, s[0], ['flerval', 'praktisk']).length;
      html += chip(s[0], s[1], n, filter.svarighet === s[0], 'svarighet');
    });
    html += '</div>';
    html += '</div>';
    return html;

    function chip(varde, text, antal, vald, typ) {
      return '<button class="chip' + (vald ? ' vald' : '') + '" data-filter="' + typ +
             '" data-varde="' + U.esc(varde) + '">' + U.esc(text) +
             (antal !== null && antal !== undefined ? ' <span class="antal">' + antal + '</span>' : '') +
             '</button>';
    }
  }

  function kopplaFilter(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-filter]'), function (b) {
      b.addEventListener('click', function () {
        filter[b.dataset.filter] = b.dataset.varde;
        pass = null;
        startaOva();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-amnen]'), function (b) {
      b.addEventListener('click', function () {
        if (b.dataset.amnen === 'rensa') {
          filter.amnen = [];
        } else {
          var id = b.dataset.varde;
          var i = filter.amnen.indexOf(id);
          if (i > -1) filter.amnen.splice(i, 1);
          else filter.amnen.push(id);
        }
        pass = null;
        startaOva();
      });
    });
  }

  /* ================================================================ */
  /* PROV                                                              */
  /* ================================================================ */

  /* ================================================================ */
  /* Alternativens ordning                                             */
  /*                                                                   */
  /* I frågebanken låg 99 av 119 rätta svar på plats två. Det går att  */
  /* lära sig utan att kunna någonting, och då mäter övningen fel sak. */
  /* Ordningen blandas därför vid visning i stället för i datafilerna, */
  /* så att skevheten inte kan smyga sig tillbaka när nya frågor       */
  /* skrivs. Blandningen görs en gång per fråga och pass, så att facit */
  /* visar samma ordning som man svarade i.                            */
  /* ================================================================ */

  function aktuellFraga() {
    var f = pass.fragor[pass.index];
    if (!f || f.typ !== 'flerval' || !f.alternativ) return f;

    pass.ordningar = pass.ordningar || {};
    if (!pass.ordningar[pass.index]) {
      pass.ordningar[pass.index] = U.blanda(f.alternativ.map(function (_, i) { return i; }));
    }
    var ordning = pass.ordningar[pass.index];

    var vy = {};
    Object.keys(f).forEach(function (k) { vy[k] = f[k]; });
    vy.alternativ = ordning.map(function (i) { return f.alternativ[i]; });
    if (f.forklaringar) {
      vy.forklaringar = ordning.map(function (i) { return f.forklaringar[i]; });
    }
    vy.ratt = ordning.indexOf(f.ratt);
    return vy;
  }

  /* ================================================================ */
  /* Frågevisning (gemensam)                                           */
  /* ================================================================ */

  function visaFraga(vyId) {
    var f = aktuellFraga();
    var arProv = pass.lage === 'prov';
    var html = '';

    if (!arProv && !pass.repetition) html += filterpanel(S.store.delkurs());

    if (pass.repetition) {
      html += '<div class="kort doljifokus"><h2>Repetition</h2>' +
              '<p class="muted liten" style="margin-bottom:0">Frågor du svarat fel på tidigare. ' +
              'De ligger kvar tills du svarat rätt på dem två gånger.</p></div>';
    }

    html += '<div class="kort">';

    /* Huvud */
    html += '<div class="quizhuvud">';
    html += '<span class="markor aktuell">Fråga ' + (pass.index + 1) + ' av ' + pass.fragor.length + '</span>';
    if (pass.repetition) html += '<span class="markor repetition">Repetition</span>';
    html += '<span>' + U.esc(U.amneNamn(f.amne)) + '</span>';
    html += '<span>·</span>';
    html += '<span>' + ({ 1: 'Grund', 2: 'Standard', 3: 'Klurig' }[f.svarighet] || '') + '</span>';
    if (arProv) {
      var p = f.typ === 'flerval'
        ? pass.uppl.poangRatt + ' p' + (pass.uppl.poangFel < 0 ? ' (−1 vid fel)' : '')
        : (f.typ === 'oppen' ? pass.uppl.poangEssa + ' p' : pass.uppl.poangRatt + ' p');
      html += '<span class="markor poang">' + U.esc(p) + '</span>';
    }
    html += '<span style="flex:1"></span>';
    html += '<button class="lankbtn" id="fokus" title="Dölj allt utom frågan (F)">' +
            (arFokus() ? '◱ Lämna fokus' : '◱ Fokus') + '</button>';
    html += '<button class="lankbtn" id="avbryt">Avbryt</button>';
    html += '</div>';

    html += '<div class="progress"><div style="width:' +
            ((pass.index / pass.fragor.length) * 100) + '%"></div></div>';

    html += '<div class="fragetext">' + U.esc(f.fraga) + '</div>';
    if (f.kod) html += '<pre class="kodruta">' + U.esc(f.kod) + '</pre>';

    /* Svarsdel */
    if (f.typ === 'flerval') {
      html += '<div id="alternativ">';
      f.alternativ.forEach(function (text, i) {
        html += '<button class="alt" data-alt="' + i + '">' +
                '<span class="alt-nr">' + (i + 1) + '</span>' +
                '<span>' + U.esc(text) + '</span></button>';
      });
      html += '</div>';
      html += '<div class="knapprad"><button class="primar" id="svara">Svara</button></div>';
      html += '<p class="tangenttips"><kbd>1</kbd>–<kbd>' + f.alternativ.length +
              '</kbd> väljer &nbsp; <kbd>Enter</kbd> bekräftar &nbsp; <kbd>→</kbd> nästa</p>';
    } else {
      html += '<label class="liten muted" for="fritext">Ditt svar</label>';
      html += '<textarea id="fritext" class="svarsruta" rows="9" placeholder="' +
              (f.typ === 'praktisk' ? 'Skriv din SQL-kod eller ditt schema här.' :
               'Skriv ditt svar här och jämför sedan med modellsvaret.') + '"></textarea>';
      html += '<div class="knapprad"><button class="primar" id="svara">Visa facit</button></div>';
    }

    html += '<div id="facit" class="facit dold"></div>';
    html += '</div>';

    var vy = U.el(vyId);
    vy.innerHTML = html;

    /* Töm den andra frågevyn så att inga dubbletter av id:n ligger kvar i DOM:en */
    var annan = U.el(vyId === 'vy-ova' ? 'vy-prov' : 'vy-ova');
    if (annan) annan.innerHTML = '';

    if (!arProv) kopplaFilter(vy);
    q('#avbryt').addEventListener('click', function () {
      if (pass.svar.length === 0 || confirm('Avbryta passet? Besvarade frågor är redan sparade.')) {
        avbryt();
      }
    });
    q('#fokus').addEventListener('click', vaxlaFokus);

    pass.besvarad = false;
    pass.valtIndex = null;

    if (f.typ === 'flerval') {
      Array.prototype.forEach.call(vy.querySelectorAll('[data-alt]'), function (b) {
        b.addEventListener('click', function () { valj(parseInt(b.dataset.alt, 10)); });
      });
    }
    q('#svara').addEventListener('click', svara);
  }

  function valj(i) {
    if (pass.besvarad) return;
    pass.valtIndex = i;
    var alt = q('#alternativ');
    if (!alt) return;
    Array.prototype.forEach.call(alt.children, function (c, j) {
      c.classList.toggle('vald', j === i);
    });
  }

  /* ================================================================ */
  /* Svara och facit                                                   */
  /* ================================================================ */

  function svara() {
    if (pass.besvarad) return;
    var f = aktuellFraga();
    if (f.typ === 'flerval') svaraFlerval(f);
    else svaraFritext(f);
  }

  function svaraFlerval(f) {
    var arProv = pass.lage === 'prov';

    if (pass.valtIndex === null) {
      if (arProv && pass.uppl.poangFel < 0) {
        if (!confirm('Du har inte valt något alternativ.\n\n' +
                     'På tentan ger obesvarad fråga 0 p medan fel svar ger −1 p.\n' +
                     'Vill du lämna frågan obesvarad?')) return;
      } else {
        alert('Välj ett alternativ först.');
        return;
      }
    }

    var korrekt = pass.valtIndex === f.ratt;
    var utfall = pass.valtIndex === null ? 'hoppat' : (korrekt ? 'ratt' : 'fel');
    pass.besvarad = true;

    var alt = q('#alternativ');
    Array.prototype.forEach.call(alt.children, function (c, i) {
      c.classList.add('last');
      c.classList.remove('vald');
      if (i === f.ratt) c.classList.add('ar-ratt');
      else if (i === pass.valtIndex) c.classList.add('ar-fel');
    });

    var nivaResultat = null;
    if (utfall !== 'hoppat') nivaResultat = S.store.registreraSvar(f, utfall);

    pass.svar.push({
      fraga: f, utfall: utfall, valtIndex: pass.valtIndex,
      poang: provpoang(f, utfall)
    });

    visaFacitFlerval(f, utfall, nivaResultat);
  }

  function provpoang(f, utfall) {
    if (pass.lage !== 'prov') return null;
    var u = pass.uppl;
    if (f.typ === 'oppen') {
      return utfall === 'ratt' ? u.poangEssa : (utfall === 'delvis' ? Math.round(u.poangEssa / 2) : 0);
    }
    if (utfall === 'ratt') return u.poangRatt;
    if (utfall === 'fel') return u.poangFel;
    return 0;
  }

  function visaFacitFlerval(f, utfall, nivaResultat) {
    var html = '';
    var rubrik = utfall === 'ratt' ? 'Rätt svar'
               : (utfall === 'hoppat' ? 'Obesvarad' : 'Fel svar');
    var klass = utfall === 'ratt' ? 'ratt' : (utfall === 'fel' ? 'fel' : '');
    var ikon = utfall === 'ratt' ? '✓' : (utfall === 'fel' ? '✕' : '–');
    var ikonKlass = utfall === 'ratt' ? 'ratt' : (utfall === 'fel' ? 'fel' : 'neutral');

    /* Nivåuppgång firas – synligt framsteg är det som håller motivationen uppe */
    html += nivaupp(f, nivaResultat, utfall);

    html += '<div class="facitbox ' + klass + '">';
    html += '<div class="facitrubrik"><span class="facitikon ' + ikonKlass + '">' + ikon + '</span>';
    html += '<h3 style="margin:0">' + rubrik + ' — rätt alternativ är ' + (f.ratt + 1) + '</h3></div>';
    if (f.forklaring) html += U.block(f.forklaring);
    html += '</div>';

    html += '<h3>Varför varje alternativ är rätt eller fel</h3>';
    f.alternativ.forEach(function (text, i) {
      var arRatt = i === f.ratt;
      html += '<div class="altforklaring ' + (arRatt ? 'ar-ratt' : 'ar-fel') + '">';
      html += '<strong>' + (i + 1) + '. ' + U.esc(text) +
              (i === pass.valtIndex ? ' <span class="dittsvar">(ditt svar)</span>' : '') + '</strong>';
      /* inline() i stället för esc() – då slår **fetstil** i frågedatan
         igenom, precis som i kompendiet. Nyckelbegreppet ska fastna. */
      html += U.inline((f.forklaringar && f.forklaringar[i]) || '');
      html += '</div>';
    });

    if (f.kalla) html += '<p class="muted mini">Källa: ' + U.esc(f.kalla) + '</p>';

    avslutaFacit(html);
  }

  /* Visar antingen en nivåuppgång eller, vid fel svar, när frågan
     återkommer. Båda hjälper användaren se systemet arbeta. */
  function nivaupp(f, nivaResultat, utfall) {
    /* Ett fel svar ska aldrig firas, även om det tekniskt flyttar ämnet
       från "Ny" till "Påbörjad". Då visas repetitionsbeskedet istället. */
    if (utfall === 'fel' || utfall === 'hoppat') {
      return utfall === 'fel'
        ? '<div class="nivaupp" style="background:var(--ockra-50);border-color:var(--ockra-100);' +
          'color:var(--ockra-600)"><span>↻</span>' +
          '<span>Frågan kommer tillbaka senare, tills du kan den.</span></div>'
        : '';
    }

    if (nivaResultat && nivaResultat.efter > nivaResultat.fore) {
      var niva = S.store.amnesNiva(f.amne);
      return '<div class="nivaupp">' + U.nivaMatare(niva.n, niva.n) +
             '<span>Nivå ' + niva.n + ' av 5 i ' + U.esc(U.amneNamn(f.amne)) +
             ' — ' + U.esc(niva.namn) + '. ' + U.esc(niva.beskrivning) + '.</span></div>';
    }
    return '';
  }

  function svaraFritext(f) {
    var text = (q('#fritext') || {}).value || '';
    pass.besvarad = true;

    var html = '';
    if (text.trim()) {
      html += '<h3>Ditt svar</h3>';
      html += '<div class="facitbox">' + U.block(text) + '</div>';
    }

    html += '<div class="facitbox"><h3>Modellsvar</h3>';
    html += '<pre>' + U.esc(f.modellsvar || '') + '</pre></div>';

    if (f.steg && f.steg.length) {
      html += '<h3>Steg för steg</h3><ol>';
      f.steg.forEach(function (s) { html += '<li>' + U.inline(s) + '</li>'; });
      html += '</ol>';
    }

    if (f.nyckelpunkter && f.nyckelpunkter.length) {
      html += '<h3>Detta borde ditt svar innehålla</h3><ul>';
      f.nyckelpunkter.forEach(function (p) { html += '<li>' + U.inline(p) + '</li>'; });
      html += '</ul>';
    }

    if (f.forklaring) {
      html += '<div class="facitbox"><h3>Kommentar</h3>' + U.block(f.forklaring) + '</div>';
    }
    if (f.kalla) html += '<p class="muted mini">Källa: ' + U.esc(f.kalla) + '</p>';

    html += '<h3>Hur väl stämde ditt svar?</h3>';
    html += '<div class="knapprad">';
    html += '<button class="sekundar" data-utfall="ratt">Hade med det mesta</button>';
    html += '<button class="sekundar" data-utfall="delvis">Delvis</button>';
    html += '<button class="sekundar" data-utfall="fel">Missade det här</button>';
    html += '</div>';

    var facit = q('#facit');
    facit.innerHTML = html;
    facit.classList.remove('dold');
    q('#svara').classList.add('dold');

    var knappar = facit.querySelectorAll('[data-utfall]');
    Array.prototype.forEach.call(knappar, function (b) {
      b.addEventListener('click', function () {
        var utfall = b.dataset.utfall;
        var nivaResultat = S.store.registreraSvar(f, utfall);
        pass.svar.push({ fraga: f, utfall: utfall, valtIndex: null, poang: provpoang(f, utfall) });

        Array.prototype.forEach.call(knappar, function (x) {
          x.disabled = true;
          x.classList.remove('sekundar');
        });
        b.classList.add('primar');

        var upp = nivaupp(f, nivaResultat, utfall);
        if (upp) facit.insertAdjacentHTML('afterbegin', upp);

        laggTillNasta(facit);
      });
    });
  }

  function avslutaFacit(html) {
    var facit = q('#facit');
    facit.innerHTML = html;
    facit.classList.remove('dold');
    q('#svara').classList.add('dold');
    laggTillNasta(facit);
  }

  function laggTillNasta(facit) {
    var sista = pass.index + 1 >= pass.fragor.length;
    var div = document.createElement('div');
    div.className = 'knapprad';
    var b = document.createElement('button');
    b.className = 'primar';
    b.id = 'nasta';
    b.textContent = sista ? 'Visa resultat' : 'Nästa fråga →';
    b.addEventListener('click', nasta);
    div.appendChild(b);
    facit.appendChild(div);
    b.focus();
  }

  function nasta() {
    pass.index += 1;
    var vyId = pass.lage === 'prov' ? 'vy-prov' : 'vy-ova';

    if (pass.index >= pass.fragor.length) {
      if (pass.lage === 'prov') { pass.klart = true; visaResultat(vyId); }
      else visaResultat(vyId);
      return;
    }
    visaFraga(vyId);
    window.scrollTo(0, 0);
  }

  /* ================================================================ */
  /* Resultat                                                          */
  /* ================================================================ */

  function visaResultat(vyId) {
    lamnaFokus();          /* passet är slut – fokusläget ska inte hänga kvar */
    var antal = pass.svar.length;
    var ratt = rakna('ratt'), delvis = rakna('delvis'),
        fel = rakna('fel'), hoppat = rakna('hoppat');
    var procent = antal ? Math.round(((ratt + delvis * 0.5) / antal) * 100) : 0;
    var arProv = pass.lage === 'prov';

    var html = '<div class="kort">';
    html += '<h2>Resultat</h2>';

    if (arProv) {
      var poang = pass.svar.reduce(function (s, x) { return s + (x.poang || 0); }, 0);
      var max = pass.uppl.max;
      var pct = Math.max(0, Math.round((poang / max) * 100));
      var b = betyg(pct);

      html += '<p class="resultatsiffra ' + (pct >= 75 ? 'god' : (pct < 50 ? 'dalig' : '')) +
              '">' + poang + ' / ' + max + ' p</p>';
      html += '<p>Motsvarar <strong>' + pct + ' %</strong> &nbsp;<span class="betyg ' +
              (pct >= 50 ? 'godkand' : 'underkand') + '">' + b + '</span></p>';
      if (pass.uppl.essa) {
        html += '<p class="muted liten">Essäfrågorna poängsätts utifrån din egen skattning ' +
                '(' + pass.uppl.poangEssa + ' / ' + Math.round(pass.uppl.poangEssa / 2) + ' / 0 p).</p>';
      }
      S.store.registreraPass({
        lage: 'prov', rubrik: pass.rubrik, antal: antal, ratt: ratt,
        procent: pct, poang: poang, maxPoang: max
      });
    } else {
      html += '<p class="resultatsiffra ' + (procent >= 75 ? 'god' : (procent < 50 ? 'dalig' : '')) +
              '">' + procent + ' %</p>';
      html += '<p class="muted">' + U.esc(pass.rubrik) + '</p>';
      S.store.registreraPass({
        lage: 'ova', rubrik: pass.rubrik, antal: antal, ratt: ratt, procent: procent
      });
    }

    html += '<div style="margin-top:1rem">';
    html += rad('Antal frågor', antal);
    html += rad('Rätt', ratt);
    if (delvis) html += rad('Delvis rätt', delvis);
    html += rad('Fel', fel);
    if (hoppat) html += rad('Obesvarade', hoppat);
    html += '</div>';

    /* Per ämne */
    var perAmne = {};
    pass.svar.forEach(function (s) {
      var id = s.fraga.amne;
      if (!perAmne[id]) perAmne[id] = { antal: 0, poang: 0 };
      perAmne[id].antal += 1;
      perAmne[id].poang += s.utfall === 'ratt' ? 1 : (s.utfall === 'delvis' ? 0.5 : 0);
    });

    html += '<h3>Per ämne i det här passet</h3>';
    Object.keys(perAmne).forEach(function (id) {
      var p = perAmne[id];
      var niva = S.store.amnesNiva(id);
      html += '<div class="rad"><span>' + U.esc(U.amneNamn(id)) +
              ' <span class="muted mini">' + Math.round((p.poang / p.antal) * 100) +
              ' % i passet</span></span>' +
              '<span style="display:flex;align-items:center;gap:.5rem">' +
              U.nivaMatare(niva.n) + U.nivaEtikett(niva) + '</span></div>';
    });

    /* Läget i repetitionskön efter passet */
    var kvarIKo = S.store.repetitioner(S.store.delkurs()).length;
    if (kvarIKo) {
      html += '<div class="notis" style="margin-top:1rem">' +
              '<strong>' + kvarIKo + (kvarIKo === 1 ? ' fråga' : ' frågor') +
              '</strong> väntar på repetition. Ta dem härnäst — det är där du lär dig mest.' +
              '</div>';
    }

    var svaga = Object.keys(perAmne).filter(function (id) {
      return (perAmne[id].poang / perAmne[id].antal) < 0.6;
    });

    if (svaga.length) {
      html += '<div class="facitbox" style="margin-top:1rem"><h3>Gå tillbaka till det här</h3><ul>';
      svaga.forEach(function (id) {
        var a = S.amneMap[id];
        var kap = hittaKapitel(id);
        html += '<li><strong>' + U.esc(U.amneNamn(id)) + '</strong>';
        if (kap) html += ' — läs kapitel ' + kap.nr + ', ' + U.esc(kap.titel);
        else if (a) html += ' — ' + U.esc(a.kapitel);
        html += '</li>';
      });
      html += '</ul></div>';
    }

    html += '<div class="knapprad">';
    html += '<button class="primar" id="igen">' + (arProv ? 'Gör ett nytt prov' : 'Fortsätt öva') + '</button>';
    if (kvarIKo) {
      html += '<button class="sekundar" id="repetera">Repetera ' + kvarIKo + ' st</button>';
    }
    if (svaga.length) {
      html += '<button class="sekundar" data-ovaamne="' + U.esc(svaga[0]) + '">Öva ' +
              U.esc(U.amneNamn(svaga[0])) + '</button>';
    }
    var kapForsta = svaga.length ? hittaKapitel(svaga[0]) : null;
    if (kapForsta) {
      html += '<button class="sekundar" data-laskap="' + U.esc(kapForsta.id) + '">Läs kapitlet</button>';
    }
    html += '</div></div>';

    var vy = U.el(vyId);
    vy.innerHTML = html;

    vy.querySelector('#igen').addEventListener('click', function () {
      pass = null;
      startaOva();
      window.scrollTo(0, 0);
    });
    var repKnapp = vy.querySelector('#repetera');
    if (repKnapp) {
      repKnapp.addEventListener('click', function () { pass = null; startaRepetition(); });
    }
    Array.prototype.forEach.call(vy.querySelectorAll('[data-ovaamne]'), function (b) {
      b.addEventListener('click', function () { pass = null; ovaAmne(b.dataset.ovaamne); });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-laskap]'), function (b) {
      b.addEventListener('click', function () { pass = null; S.las.oppna(b.dataset.laskap); });
    });

    window.scrollTo(0, 0);

    function rakna(u) {
      return pass.svar.filter(function (s) { return s.utfall === u; }).length;
    }
    function rad(etikett, varde) {
      return '<div class="rad"><span>' + U.esc(etikett) + '</span><strong>' +
             U.esc(varde) + '</strong></div>';
    }
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

  function betyg(p) {
    if (p >= 85) return 'A';
    if (p >= 75) return 'B';
    if (p >= 65) return 'C';
    if (p >= 55) return 'D';
    if (p >= 50) return 'E';
    return 'U';
  }

  /* ================================================================ */
  /* Tangentbord                                                       */
  /* ================================================================ */

  /* ---------------------------------------------------------------- */
  /* Fokusläge                                                         */
  /*                                                                   */
  /* Meny, delkursband och filterpanel försvinner så att bara frågan   */
  /* står kvar. Färre saker att välja mellan gör att man faktiskt      */
  /* försöker minnas i stället för att sneglar på nästa knapp.         */
  /* ---------------------------------------------------------------- */

  function arFokus() { return document.body.classList.contains('fokus'); }

  function vaxlaFokus() {
    var pa = !arFokus();
    document.body.classList.toggle('fokus', pa);
    if (pa && !U.el('fokusut')) {
      var b = document.createElement('button');
      b.id = 'fokusut';
      b.className = 'fokusut';
      b.innerHTML = '← Lämna fokus <span class="mini">Esc</span>';
      b.addEventListener('click', vaxlaFokus);
      document.body.appendChild(b);
    } else if (!pa) {
      var ut = U.el('fokusut');
      if (ut) ut.remove();
    }
    /* Knappens text i frågehuvudet ska följa med */
    var k = pass && q('#fokus');
    if (k) k.textContent = pa ? '◱ Lämna fokus' : '◱ Fokus';
  }

  function lamnaFokus() { if (arFokus()) vaxlaFokus(); }

  function tangent(e) {
    if (!pass) return;
    var aktiv = document.activeElement;
    if (aktiv && (aktiv.tagName === 'TEXTAREA' || aktiv.tagName === 'INPUT')) return;

    if (e.key === 'Escape' && arFokus()) { e.preventDefault(); vaxlaFokus(); return; }
    if (e.key === 'f' || e.key === 'F') { e.preventDefault(); vaxlaFokus(); return; }

    var f = pass.fragor[pass.index];
    if (!f) return;

    if (!pass.besvarad && f.typ === 'flerval' && /^[1-9]$/.test(e.key)) {
      var i = parseInt(e.key, 10) - 1;
      if (i < f.alternativ.length) { e.preventDefault(); valj(i); }
      return;
    }

    if (e.key === 'Enter') {
      e.preventDefault();
      if (pass.besvarad) { var n = q('#nasta'); if (n) n.click(); }
      else svara();
      return;
    }

    if (e.key === 'ArrowRight' && pass.besvarad) {
      e.preventDefault();
      var nb = q('#nasta');
      if (nb) nb.click();
    }
  }

  return {
    renderaOva: renderaOva,
    ovaAmne: ovaAmne,
    startaRepetition: startaRepetition,
    tangent: tangent,
    aterstall: function () { lamnaFokus(); pass = null; },
    lamnaFokus: lamnaFokus
  };
})();
