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
    ova:       function () { S.ova.renderaOva(); },
    prov:      function () { S.ova.renderaProv(); },
    essa:      function () { S.essa.rendera(); },
    statistik: function () { S.statistik.rendera(); },
    schema:    function () { S.schema.rendera(); }
  };

  function visaVy(namn) {
    if (!vyer[namn]) namn = 'hem';
    aktuellVy = namn;

    Object.keys(vyer).forEach(function (v) {
      U.el('vy-' + v).classList.toggle('dold', v !== namn);
    });
    Array.prototype.forEach.call(document.querySelectorAll('.navbtn'), function (b) {
      b.classList.toggle('active', b.dataset.vy === namn);
    });

    vyer[namn]();
    window.scrollTo(0, 0);
  }

  function rendera() {
    vyer[aktuellVy]();
  }

  function bytDelkurs(id) {
    S.store.sattDelkurs(id);
    S.ova.aterstall();
    S.las.stang();
    var sel = U.el('sel-delkurs');
    if (sel) sel.value = id;
    rendera();
  }

  function ovaAmne(amneId) {
    var a = S.amneMap[amneId];
    if (!a) return;
    if (a.delkurs !== S.store.delkurs()) {
      S.store.sattDelkurs(a.delkurs);
      var sel = U.el('sel-delkurs');
      if (sel) sel.value = a.delkurs;
    }
    S.ova.ovaAmne(amneId);
  }

  /* ---------------------------------------------------------------- */

  function fyllDelkursval() {
    var sel = U.el('sel-delkurs');
    sel.innerHTML = '';

    S.delkurser.forEach(function (d) {
      var antal = S.fragor.filter(function (f) { return f.delkurs === d.id; }).length;
      var o = document.createElement('option');
      o.value = d.id;
      o.textContent = d.namn + ' (' + antal + ' frågor)';
      sel.appendChild(o);
    });

    /* Delkurser som finns i kalendern men saknar material – visas inaktiva */
    S.kalenderDelkurser.forEach(function (k) {
      if (S.delkurser.some(function (d) { return d.id === k.id; })) return;
      var o = document.createElement('option');
      o.value = k.id;
      o.textContent = k.namn + ' (kommer senare)';
      o.disabled = true;
      sel.appendChild(o);
    });

    sel.value = S.store.delkurs();
    sel.addEventListener('change', function () { bytDelkurs(sel.value); });
  }

  function koppla() {
    Array.prototype.forEach.call(document.querySelectorAll('.navbtn'), function (b) {
      b.addEventListener('click', function () { visaVy(b.dataset.vy); });
    });
    U.el('btn-hem').addEventListener('click', function () { visaVy('hem'); });

    document.addEventListener('keydown', function (e) {
      if (aktuellVy === 'ova' || aktuellVy === 'prov') S.ova.tangent(e);
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

    kontrolleraData();
    fyllDelkursval();
    koppla();
    visaVy('hem');
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
