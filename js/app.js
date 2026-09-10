/* =========================================================================
   app.js – navigation, delkursväxling och uppstart.
   ========================================================================= */

(function () {
  var S = window.SYSB23;
  var U = S.ui;

  var aktuellVy = 'hem';

  var vyer = {
    hem:       function () { S.hem.rendera(); },
    las:       function () { S.las.rendera(); },
    sql:       function () { S.sqlverkstad.rendera(); },
    modellera: function () { S.modellera.rendera(); },
    ova:       function () { S.ova.renderaOva(); },
    prov:      function () { S.tentaprov.rendera(); },
    essa:      function () { S.essa.rendera(); },
    statistik: function () { S.statistik.rendera(); },
    schema:    function () { S.schema.rendera(); }
  };

  function visaVy(namn) {
    if (!vyer[namn]) namn = 'hem';

    /* Anteckningsrutan svävar över sidan och hör till läsvyn. Den ska inte
       ligga kvar och skymma kalendern när man byter vy. */
    if (aktuellVy === 'las' && namn !== 'las') S.las.doljAnteckningar();

    aktuellVy = namn;
    uppdateraDelkursband();
    uppdateraFlikar();

    Object.keys(vyer).forEach(function (v) {
      U.el('vy-' + v).classList.toggle('dold', v !== namn);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.navbtn'), function (b) {
      b.classList.toggle('active', b.dataset.vy === namn);
    });

    vyer[namn]();
    window.scrollTo(0, 0);
  }

  /* Varje delkurs visar bara de flikar den faktiskt har innehåll för.
     SQL-verkstaden och Modellera hör till Databaser; Essä hör till
     Strategi, där tentan har två essäfrågor à 20 poäng. Databastentan
     har inga — dess skrivuppgifter är DDL och normalisering, och de
     tränas i Modellera i stället.

     Prov innehåller bara riktiga gamla tentor, frågorna exakt som de
     stod. För Databaser bygger de tentorna på ER-diagram som bilder, och
     deras uppgifter tränas redan i Modellera och SQL-verkstaden — så där
     finns ingen Prov-flik.

     Att gömma i stället för att visa tomma vyer är hela poängen: en meny
     med åtta flikar där tre är meningslösa är svårare att navigera än en
     med fem som alla leder någonstans. */
  var VYER_PER_DELKURS = {
    strategi:  ['hem', 'las', 'ova', 'prov', 'essa', 'statistik', 'schema'],
    databaser: ['hem', 'las', 'sql', 'modellera', 'ova', 'statistik', 'schema']
  };

  function synligaVyer() {
    return VYER_PER_DELKURS[S.store.delkurs()] || VYER_PER_DELKURS.strategi;
  }

  function uppdateraFlikar() {
    var synliga = synligaVyer();

    Array.prototype.forEach.call(document.querySelectorAll('.navbtn'), function (b) {
      b.classList.toggle('dold', synliga.indexOf(b.dataset.vy) === -1);
    });

    /* Står man i en vy som just försvann finns ingen väg tillbaka utom
       hem — annars blir sidan tom utan förklaring. */
    if (synliga.indexOf(aktuellVy) === -1) visaVy('hem');
  }

  function rendera() {
    uppdateraDelkursband();
    uppdateraFlikar();
    vyer[aktuellVy]();
  }

  function bytDelkurs(id) {
    S.store.sattDelkurs(id);
    S.tema.uppdateraForDelkurs();
    S.ova.aterstall();
    S.las.stang();
    var sel = U.el('sel-delkurs');
    if (sel) sel.value = id;
    rendera();
  }

  /* ---------------------------------------------------------------- */
  /* Kontextbandet under menyn.                                        */
  /* Frågan "vilken delkurs är jag inne på?" ska aldrig behöva ställas: */
  /* accentlinjen byter färg och bandet skriver ut läget i klartext.   */
  /* ---------------------------------------------------------------- */

  function uppdateraDelkursband() {
    var id = S.store.delkurs();
    var farg = U.delkursFarg(id);

    document.documentElement.style.setProperty('--aktiv', farg);

    var band = U.el('delkursband');
    if (!band) return;

    var kal = S.kalenderDelkurser.filter(function (d) { return d.id === id; })[0];
    var tenta = U.nastaTenta(id, true);
    var komp = S.kompendium[id];
    var lage = S.store.delkursNiva(id);

    var h = '<span class="dkb-namn"><i class="fargprick" style="background:' + farg +
            '"></i>' + U.esc(U.delkursNamn(id)) + '</span>';

    /* "extra" faller bort på smal skärm – bandet får inte äta halva mobilen */
    var delar = [];
    if (kal) delar.push({ text: kal.hp + ' hp', extra: true });
    delar.push({
      text: S.fragor.filter(function (f) { return f.delkurs === id; }).length + ' frågor',
      extra: true
    });

    if (tenta) {
      var dagar = U.dagarTill(tenta.datum);
      delar.push({ text: '<b>Tenta om ' + dagar + (dagar === 1 ? ' dag' : ' dagar') + '</b> · ' +
                         U.esc(U.kortDatum(tenta.datum)) });
    }
    if (komp && komp.kapitel.length) {
      delar.push({ text: S.store.antalLasta(komp.kapitel) + ' av ' +
                         komp.kapitel.length + ' kapitel lästa', extra: true });
    }
    if (lage.totalt) {
      delar.push({ text: '<b>' + lage.andel + ' %</b> av kursen sitter' });
    }

    delar.forEach(function (d) {
      var kl = 'dkb-del' + (d.extra ? ' dkb-extra' : '');
      h += '<span class="dkb-avdelare' + (d.extra ? ' dkb-extra' : '') +
           '" aria-hidden="true">/</span><span class="' + kl + '">' + d.text + '</span>';
    });

    band.innerHTML = h;
  }

  function ovaAmne(amneId) {
    var a = S.amneMap[amneId];
    if (!a) return;
    if (a.delkurs !== S.store.delkurs()) {
      S.store.sattDelkurs(a.delkurs);
      S.tema.uppdateraForDelkurs();
      var sel = U.el('sel-delkurs');
      if (sel) sel.value = a.delkurs;
    }
    S.ova.ovaAmne(amneId);
  }

  /* ---------------------------------------------------------------- */

  function fyllDelkursval() {
    var sel = U.el('sel-delkurs');
    sel.innerHTML = '';

    /* Två grupper, så att det syns direkt vad man kan välja mellan */
    var klara = document.createElement('optgroup');
    klara.label = 'Delkurser du kan plugga här';
    S.delkurser.forEach(function (d) {
      var o = document.createElement('option');
      o.value = d.id;
      o.textContent = d.namn;
      klara.appendChild(o);
    });
    sel.appendChild(klara);

    /* Delkurser som finns i kalendern men saknar material – visas inaktiva */
    var senare = document.createElement('optgroup');
    senare.label = 'Ligger senare i terminen — inget material än';
    S.kalenderDelkurser.forEach(function (k) {
      if (S.delkurser.some(function (d) { return d.id === k.id; })) return;
      var o = document.createElement('option');
      o.value = k.id;
      o.textContent = k.namn;
      o.disabled = true;
      senare.appendChild(o);
    });
    if (senare.children.length) sel.appendChild(senare);

    sel.value = S.store.delkurs();
    sel.addEventListener('change', function () { bytDelkurs(sel.value); });
  }

  function koppla() {
    Array.prototype.forEach.call(document.querySelectorAll('.navbtn'), function (b) {
      b.addEventListener('click', function () { visaVy(b.dataset.vy); });
    });
    U.el('btn-hem').addEventListener('click', function () { visaVy('hem'); });
    U.el('btn-tema').addEventListener('click', function () { S.tema.oppna(); });

    /* Siffertangenterna hör till Öva, där man svarar på en fråga i taget.
       Provet är ett formulär med alla frågor på en gång — där skulle de
       gissa åt vilken fråga man menade. */
    document.addEventListener('keydown', function (e) {
      if (aktuellVy === 'ova') S.ova.tangent(e);
    });
  }

  /* ---------------------------------------------------------------- */

  function kontrolleraData() {
    var problem = [];
    var idn = {};

    S.fragor.forEach(function (f) {
      if (idn[f.id]) problem.push('Dubblerat id: ' + f.id);
      idn[f.id] = true;
      if (!S.amneMap[f.amne]) problem.push(f.id + ': okänt ämne "' + f.amne + '"');
      if (f.typ === 'flerval') {
        if (!f.alternativ || f.alternativ.length < 2) problem.push(f.id + ': för få alternativ');
        if (f.ratt === undefined || f.ratt < 0 || f.ratt >= (f.alternativ || []).length) {
          problem.push(f.id + ': ogiltigt värde på "ratt"');
        }
        if (!f.forklaringar || f.forklaringar.length !== (f.alternativ || []).length) {
          problem.push(f.id + ': antalet förklaringar matchar inte antalet alternativ');
        }
      } else if (!f.modellsvar) {
        problem.push(f.id + ': saknar modellsvar');
      }
      if (f.typ === 'oppen' && (!f.nyckelpunkter || !f.nyckelpunkter.length)) {
        problem.push(f.id + ': essäfråga utan nyckelpunkter (checklistan blir tom)');
      }
    });

    Object.keys(S.kompendium).forEach(function (dk) {
      var kapIdn = {};
      S.kompendium[dk].kapitel.forEach(function (k) {
        if (kapIdn[k.id]) problem.push('Dubblerat kapitel-id: ' + k.id);
        kapIdn[k.id] = true;
        (k.amnen || []).forEach(function (a) {
          if (!S.amneMap[a]) problem.push(k.id + ': okänt ämne "' + a + '"');
        });
      });
    });

    S.tentor.forEach(function (t) {
      if (!U.parse(t.datum)) problem.push('Ogiltigt tentadatum: ' + t.datum);
    });
    S.pass.forEach(function (p) {
      if (!U.parse(p.datum)) problem.push('Ogiltigt passdatum: ' + p.datum);
    });

    if (problem.length) console.warn('SYSB23 – problem i datan:\n' + problem.join('\n'));
    else {
      console.log('SYSB23: ' + S.fragor.length + ' frågor, ' +
        Object.keys(S.kompendium).reduce(function (n, d) {
          return n + S.kompendium[d].kapitel.length; }, 0) + ' kapitel, ' +
        S.ordlista.length + ' ordlisteposter, ' + S.pass.length + ' pass. Inga problem.');
    }
  }

  function start() {
    if (!S.fragor || !S.fragor.length) {
      document.querySelector('main').innerHTML =
        '<div class="kort"><h2>Inget innehåll laddades</h2>' +
        '<p>Öppna <code>index.html</code> från projektmappen, eller kör ' +
        '<code>node serve.js</code> och gå till <code>http://localhost:8080</code>. ' +
        'Vissa webbläsare blockerar lokala skript vid <code>file://</code>.</p></div>';
      return;
    }

    S.tema.start();
    kontrolleraData();
    fyllDelkursval();
    koppla();
    registreraOffline();

    /* Genvägarna i manifest.json pekar hit med ?vy=… */
    var onskad = (location.search.match(/[?&]vy=([a-z]+)/) || [])[1];
    visaVy(onskad || 'hem');
  }

  /* ---------------------------------------------------------------- */
  /* Offline                                                           */
  /*                                                                   */
  /* Service workern kräver https eller localhost. Öppnar man filen     */
  /* direkt från hårddisken (file://) hoppas den tyst över – appen      */
  /* fungerar ändå, den blir bara inte installerbar.                   */
  /* ---------------------------------------------------------------- */

  function registreraOffline() {
    if (!('serviceWorker' in navigator)) return;
    if (location.protocol === 'file:') return;

    navigator.serviceWorker.register('sw.js').then(function (reg) {
      reg.addEventListener('updatefound', function () {
        var ny = reg.installing;
        if (!ny) return;
        ny.addEventListener('statechange', function () {
          /* controller finns bara om en tidigare version redan kört –
             annars är det här bara förstagångsinstallationen. */
          if (ny.state === 'installed' && navigator.serviceWorker.controller) {
            visaUppdatering();
          }
        });
      });
    }).catch(function (e) {
      console.warn('Offlineläget kunde inte startas.', e);
    });
  }

  function visaUppdatering() {
    if (U.el('uppdatering')) return;
    var d = document.createElement('div');
    d.id = 'uppdatering';
    d.className = 'skal';
    d.innerHTML = '<span>En nyare version finns.</span>' +
                  '<button class="primar" id="uppdatera-nu">Ladda om</button>' +
                  '<button class="ikonknapp" id="uppdatera-senare" aria-label="Stäng">✕</button>';
    document.body.appendChild(d);
    U.el('uppdatera-nu').addEventListener('click', function () { location.reload(); });
    U.el('uppdatera-senare').addEventListener('click', function () { d.remove(); });
  }

  S.app = {
    visaVy: visaVy,
    rendera: rendera,
    bytDelkurs: bytDelkurs,
    ovaAmne: ovaAmne
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
