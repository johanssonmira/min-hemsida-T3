/* =========================================================================
   passform.js – dialogrutan för egna händelser och ändrade pass.

   Två fall, ett formulär:
     1. Egen händelse – helt din post, går att ta bort.
     2. Kursens pass  – dina ändringar sparas som ett lager ovanpå
        kalenderfilen, så originalet alltid går att få tillbaka.

   Skillnaden syns i knappraden längst ner, inte i fälten. Det är samma
   sak man gör i båda fallen och då ska det se likadant ut.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.passform = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var narKlar = null;        // anropas när något sparats
  var narStangd = null;      // anropas när rutan stängts, oavsett hur
  var aktivt = null;         // passet som redigeras, eller null för nytt

  /* klar   – körs efter att något sparats, tagits bort eller återställts
     stangd – körs när rutan stängts på vilket sätt som helst. Öppnades
              formuläret från en dagruta används den för att gå tillbaka
              dit, så man inte trillar ut till kalendern när man ångrar sig. */
  function oppna(pass, klar, stangd) {
    narKlar = klar;
    narStangd = stangd || null;
    aktivt = pass || null;

    U.overlagg.oppna(rita, function () {
      var fn = narStangd;
      aktivt = null;
      narStangd = null;
      if (fn) fn();
    });

    var f = U.el('pf-rubrik');
    if (f) f.focus();
  }

  function stang() { U.overlagg.stang(); }

  /* ------------------------------------------------------------------ */

  function rita(behallare) {
    var p = aktivt || {};
    var egen = !!p.egen;
    var nytt = !aktivt;
    var andrad = !!p.andrad;

    /* Tiden delas upp i två fält. Fritext på tid blir fel förr eller
       senare, och två klockväljare går snabbare att fylla i. */
    var tider = String(p.tid || '').match(/\d{1,2}[:.]\d{2}/g) || [];
    var fran = (tider[0] || '').replace('.', ':');
    var till = (tider[1] || '').replace('.', ':');

    var h = '<div class="overlagg-ruta">';

    h += '<div class="overlagg-topp">';
    h += '<h2 id="overlagg-rubrik" class="utan-markor">' +
         (nytt ? 'Ny egen händelse' : (egen ? 'Ändra din händelse' : 'Ändra passet')) +
         '</h2>';
    h += '<button class="ikonknapp" id="pf-stang" aria-label="Stäng">✕</button>';
    h += '</div>';

    if (!nytt && !egen) {
      h += '<p class="muted liten">Det här är ett pass ur kursens schema. ' +
           'Din ändring sparas bara hos dig och går alltid att ta bort igen.</p>';
    }

    h += '<div class="faltrad">';
    h += falt('Vad är det?', '<input type="text" id="pf-rubrik" value="' +
              U.esc(p.rubrik || '') + '" placeholder="T.ex. Grupparbete med Elin" maxlength="90">');
    h += '</div>';

    h += '<div class="faltrad tva">';
    h += falt('Sorts pass', typval(p.typ || 'ovrigt'));
    h += falt('Delkurs', delkursval(p.delkurs));
    h += '</div>';

    h += '<div class="faltrad tre">';
    h += falt('Datum', '<input type="date" id="pf-datum" value="' + U.esc(p.datum || '') + '">');
    h += falt('Från', '<input type="time" id="pf-fran" value="' + U.esc(fran) + '" step="300">');
    h += falt('Till', '<input type="time" id="pf-till" value="' + U.esc(till) + '" step="300">');
    h += '</div>';

    h += '<div class="faltrad">';
    h += falt('Var?', '<input type="text" id="pf-sal" value="' + U.esc(p.sal || '') +
              '" placeholder="Sal, adress eller länk" maxlength="80">');
    h += '</div>';

    h += '<div class="faltrad">';
    h += falt('Egen notering <span class="muted mini">(frivillig)</span>',
              '<textarea id="pf-notis" rows="2" maxlength="400" placeholder="Ta med kapitel 4. ' +
              'Fråga om normalisering.">' + U.esc(p.notis || '') + '</textarea>');
    h += '</div>';

    h += '<p class="pf-fel dold" id="pf-fel"></p>';

    /* Knappraden bär skillnaden mellan de två fallen */
    h += '<div class="overlagg-knappar">';
    h += '<button class="primar" id="pf-spara">Spara</button>';
    h += '<button class="sekundar" id="pf-avbryt">Avbryt</button>';

    if (!nytt && egen) {
      h += '<button class="fara" id="pf-tabort">Ta bort</button>';
    }
    if (!nytt && !egen) {
      h += '<button class="sekundar" id="pf-dolj">Dölj passet</button>';
      if (andrad) h += '<button class="sekundar" id="pf-aterstall">Återställ original</button>';
    }
    h += '</div>';

    h += '</div>';

    behallare.innerHTML = h;
    koppla();
  }

  function falt(etikett, kontroll) {
    return '<label class="falt"><span class="falt-etikett">' + etikett + '</span>' +
           kontroll + '</label>';
  }

  function typval(vald) {
    var h = '<select id="pf-typ">';
    U.passTypLista().forEach(function (t) {
      h += '<option value="' + U.esc(t.id) + '"' + (t.id === vald ? ' selected' : '') + '>' +
           U.esc(t.namn) + '</option>';
    });
    return h + '</select>';
  }

  function delkursval(vald) {
    var h = '<select id="pf-delkurs">';
    h += '<option value=""' + (!vald ? ' selected' : '') + '>Ingen delkurs</option>';
    S.kalenderDelkurser.forEach(function (d) {
      h += '<option value="' + U.esc(d.id) + '"' + (d.id === vald ? ' selected' : '') + '>' +
           U.esc(d.namn) + '</option>';
    });
    return h + '</select>';
  }

  /* ------------------------------------------------------------------ */

  function koppla() {
    /* Klick utanför rutan och Escape sköts av U.overlagg */
    U.el('pf-stang').addEventListener('click', stang);
    U.el('pf-avbryt').addEventListener('click', stang);
    U.el('pf-spara').addEventListener('click', spara);

    knapp('pf-tabort', function () {
      if (!confirm('Ta bort "' + (aktivt.rubrik || 'händelsen') + '" ur schemat?')) return;
      S.store.taBortEgetPass(aktivt.id);
      klar();
    });

    knapp('pf-dolj', function () {
      var a = S.store.passAndring(aktivt.passId) || {};
      a.dold = true;
      S.store.sattPassAndring(aktivt.passId, a);
      klar();
    });

    knapp('pf-aterstall', function () {
      S.store.aterstallPass(aktivt.passId);
      klar();
    });

    function knapp(id, fn) {
      var b = U.el(id);
      if (b) b.addEventListener('click', fn);
    }
  }

  function spara() {
    var rubrik = U.el('pf-rubrik').value.trim();
    var datum = U.el('pf-datum').value;
    var fran = U.el('pf-fran').value;
    var till = U.el('pf-till').value;

    if (!rubrik) return fel('Skriv vad det är för något.');
    if (!datum) return fel('Välj ett datum.');
    if (!fran) return fel('Välj en starttid.');
    if (till && till <= fran) return fel('Sluttiden måste komma efter starttiden.');

    var post = {
      rubrik: rubrik,
      datum: datum,
      tid: till ? fran + '–' + till : fran,
      typ: U.el('pf-typ').value,
      delkurs: U.el('pf-delkurs').value || null,
      sal: U.el('pf-sal').value.trim(),
      notis: U.el('pf-notis').value.trim()
    };

    if (!aktivt) {
      S.store.laggTillPass(post);
    } else if (aktivt.egen) {
      S.store.andraEgetPass(aktivt.id, post);
    } else {
      /* Kursens pass: spara bara det som skiljer sig från originalet, så
         att resten följer med om kalenderfilen uppdateras. */
      var original = hittaOriginal(aktivt.passId);
      var andring = S.store.passAndring(aktivt.passId) || {};
      delete andring.dold;
      ['datum', 'tid', 'rubrik', 'sal', 'typ', 'notis'].forEach(function (f) {
        var nyttVarde = post[f] || '';
        var gammalt = (original && original[f]) || '';
        if (nyttVarde !== gammalt) andring[f] = nyttVarde;
        else delete andring[f];
      });

      if (Object.keys(andring).length === 0) S.store.aterstallPass(aktivt.passId);
      else S.store.sattPassAndring(aktivt.passId, andring);
    }

    /* Datumet skickas med tillbaka så att kalendern kan hoppa dit posten
       faktiskt hamnade – inte dit den låg när formuläret öppnades. */
    klar(post.datum);
  }

  function hittaOriginal(id) {
    return S.pass.filter(function (p) { return U.passId(p) === id; })[0] || null;
  }

  function fel(text) {
    var f = U.el('pf-fel');
    f.textContent = text;
    f.classList.remove('dold');
  }

  /* narKlar körs före stang(). Ordningen spelar roll: den som öppnade
     formuläret får veta vilket datum posten hamnade på innan rutan stängs,
     så att den kan visa rätt dag när den tar över igen. */
  function klar(datum) {
    var fn = narKlar;
    narKlar = null;
    if (fn) fn(datum);
    stang();
  }

  /* Öppnar tom form med ett datum förifyllt */
  function nyPa(datum, klar, stangd) {
    oppna(null, klar, stangd);
    if (datum) U.el('pf-datum').value = datum;
  }

  return { oppna: oppna, nyPa: nyPa, stang: stang };
})();
