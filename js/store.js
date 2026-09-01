/* =========================================================================
   store.js – all lagring i webbläsarens localStorage.
   Inget skickas någonsin till någon server.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.store = (function () {
  var NYCKEL = 'sysb23-plugg-v2';

  var tomtLage = {
    version: 3,
    delkurs: 'strategi',      // vald delkurs i gränssnittet
    tema: 'creme',            // färgtema, se js/tema.js
    amnen: {},                // amneId  -> { ratt, delvis, fel, forsok, senast, dagar: [] }
    fragor: {},               // fragaId -> { forsok, ratt, fel, senast, prioritet }
    lasta: {},                // kapitelId -> ISO-datum
    essaUtkast: {},           // fragaId -> { text, punkter: [bool], sparad }
    historik: [],             // [{ datum, lage, rubrik, antal, ratt, procent, poang, maxPoang }]
    studiedagar: [],          // ['ÅÅÅÅ-MM-DD', …] för streak
    svarPerDag: {},           // 'ÅÅÅÅ-MM-DD' -> antal besvarade frågor
    anteckningar: {},         // kapitelId -> { text, andrad }
    egnaPass: [],             // [{ id, datum, tid, rubrik, typ, sal, delkurs, notis }]
    passAndringar: {},        // passId -> { datum, tid, rubrik, sal, notis, dold }
    tentalankar: [],          // [{ id, titel, url }] egna länkar till gamla tentor
    sqlLosta: {},             // ovningsId -> ISO-datum, lösta SQL-övningar
    datum: {}                 // egna anteckningar per etapp (kvar från v1)
  };

  /* Dagsmålet. Tio frågor är kort nog att alltid hinnas med och långt nog
     att ge effekt – poängen är att målet ska gå att bocka av, inte att
     vara ambitiöst. Ett avklarat mål varje dag slår ett stort mål ibland. */
  var DAGSMAL = 10;

  /* Nivåtrappan. Fem steg gör framsteg synliga och ger något att sikta på.
     Kraven kombinerar träffsäkerhet, antal svar och – för högsta nivån –
     att kunskapen hållit över tid (svar vid minst två olika dagar) samt att
     du faktiskt sett merparten av ämnets frågor. */
  var NIVAER = [
    { n: 0, namn: 'Ny',        beskrivning: 'Du har inte svarat på något här än' },
    { n: 1, namn: 'Påbörjad',  beskrivning: 'Du har börjat' },
    { n: 2, namn: 'På gång',   beskrivning: 'Grunderna finns' },
    { n: 3, namn: 'Halvvägs',  beskrivning: 'Du kan det mesta' },
    { n: 4, namn: 'Stark',     beskrivning: 'Nästan i mål' },
    { n: 5, namn: 'Sitter',    beskrivning: 'Du kan det, även efter några dagar' }
  ];

  function las() {
    try {
      var raw = localStorage.getItem(NYCKEL);
      if (!raw) {
        // Försök migrera från v1 om den finns
        var gammal = localStorage.getItem('sysb23-progress-v1');
        if (gammal) {
          var g = JSON.parse(gammal);
          var ny = JSON.parse(JSON.stringify(tomtLage));
          ny.amnen = g.amnen || {};
          ny.fragor = g.fragor || {};
          ny.historik = g.historik || [];
          ny.datum = g.datum || {};
          return ny;
        }
        return JSON.parse(JSON.stringify(tomtLage));
      }
      var data = JSON.parse(raw);
      Object.keys(tomtLage).forEach(function (k) {
        if (data[k] === undefined) data[k] = JSON.parse(JSON.stringify(tomtLage[k]));
      });
      return data;
    } catch (e) {
      console.warn('Kunde inte läsa sparad data, börjar från tomt läge.', e);
      return JSON.parse(JSON.stringify(tomtLage));
    }
  }

  function spara() {
    try {
      localStorage.setItem(NYCKEL, JSON.stringify(data));
    } catch (e) {
      console.warn('Kunde inte spara (localStorage full eller blockerad).', e);
    }
  }

  var data = las();

  var api = {

    /* ---------------------- Vald delkurs ---------------------- */
    delkurs: function () { return data.delkurs; },
    sattDelkurs: function (id) { data.delkurs = id; spara(); },

    /* ---------------------- Färgtema ---------------------- */
    tema: function () { return data.tema || 'creme'; },
    sattTema: function (id) { data.tema = id; spara(); },

    /* ---------------------- Svar på frågor ---------------------- */
    // utfall: 'ratt' | 'delvis' | 'fel'
    // Returnerar { fore, efter } med nivå före och efter svaret, så att
    // gränssnittet kan visa när ett ämne går upp en nivå.
    registreraSvar: function (fraga, utfall) {
      var nu = new Date().toISOString();
      var idag = nu.slice(0, 10);
      var nivaFore = api.amnesNiva(fraga.amne).n;

      if (!data.amnen[fraga.amne]) {
        data.amnen[fraga.amne] = { ratt: 0, delvis: 0, fel: 0, forsok: 0, senast: null, dagar: [] };
      }
      var a = data.amnen[fraga.amne];
      if (!a.dagar) a.dagar = [];
      a.forsok += 1;
      a[utfall] += 1;
      a.senast = nu;
      if (a.dagar.indexOf(idag) === -1) a.dagar.push(idag);

      if (data.studiedagar.indexOf(idag) === -1) data.studiedagar.push(idag);
      if (!data.svarPerDag) data.svarPerDag = {};
      data.svarPerDag[idag] = (data.svarPerDag[idag] || 0) + 1;

      if (!data.fragor[fraga.id]) {
        data.fragor[fraga.id] = { forsok: 0, ratt: 0, fel: 0, senast: null, prioritet: 0 };
      }
      var f = data.fragor[fraga.id];
      f.forsok += 1;
      if (utfall === 'ratt') {
        f.ratt += 1;
        f.prioritet = Math.max(0, (f.prioritet || 0) - 2);
      } else if (utfall === 'delvis') {
        f.prioritet = (f.prioritet || 0) + 1;
      } else {
        f.fel += 1;
        f.prioritet = (f.prioritet || 0) + 3;
      }
      f.senast = nu;

      spara();

      return { fore: nivaFore, efter: api.amnesNiva(fraga.amne).n };
    },

    /* ---------------------- Avslutat pass ---------------------- */
    registreraPass: function (pass) {
      data.historik.unshift({
        datum: new Date().toISOString(),
        lage: pass.lage || 'ova',
        rubrik: pass.rubrik,
        antal: pass.antal,
        ratt: pass.ratt,
        procent: pass.procent,
        poang: pass.poang === undefined ? null : pass.poang,
        maxPoang: pass.maxPoang === undefined ? null : pass.maxPoang
      });
      data.historik = data.historik.slice(0, 60);
      spara();
    },

    /* ---------------------- Lästa kapitel ---------------------- */
    arLast: function (kapitelId) { return !!data.lasta[kapitelId]; },
    markeraLast: function (kapitelId, last) {
      if (last) data.lasta[kapitelId] = new Date().toISOString();
      else delete data.lasta[kapitelId];
      spara();
    },
    antalLasta: function (kapitelLista) {
      var n = 0;
      kapitelLista.forEach(function (k) { if (data.lasta[k.id]) n += 1; });
      return n;
    },

    /* ---------------------- Essäutkast ---------------------- */
    hamtaUtkast: function (fragaId) {
      return data.essaUtkast[fragaId] || { text: '', punkter: [], sparad: null };
    },
    sparaUtkast: function (fragaId, text, punkter) {
      data.essaUtkast[fragaId] = {
        text: text,
        punkter: punkter || [],
        sparad: new Date().toISOString()
      };
      spara();
    },

    /* ---------------------- Uppslag ---------------------- */
    amnesStatistik: function (amneId) {
      var a = data.amnen[amneId];
      if (!a || a.forsok === 0) return null;
      var poang = a.ratt + a.delvis * 0.5;
      return {
        forsok: a.forsok, ratt: a.ratt, delvis: a.delvis, fel: a.fel,
        procent: Math.round((poang / a.forsok) * 100),
        senast: a.senast
      };
    },

    fragaStatistik: function (fragaId) { return data.fragor[fragaId] || null; },

    sedda: function (fragor) {
      var n = 0;
      fragor.forEach(function (f) { if (data.fragor[f.id]) n += 1; });
      return n;
    },

    historik: function () { return data.historik; },

    /* ---------------------- Nivå per ämne ---------------------- */
    amnesNiva: function (amneId) {
      var a = data.amnen[amneId];
      if (!a || a.forsok === 0) return NIVAER[0];

      var s = api.amnesStatistik(amneId);
      var dagar = (a.dagar || []).length;

      // Hur stor del av ämnets frågor har du sett?
      var alla = (window.SYSB23.fragor || []).filter(function (f) { return f.amne === amneId; });
      var sedda = alla.filter(function (f) { return data.fragor[f.id]; }).length;
      var tackning = alla.length ? sedda / alla.length : 0;

      if (s.forsok >= 8 && s.procent >= 85 && dagar >= 2 && tackning >= 0.6) return NIVAER[5];
      if (s.forsok >= 6 && s.procent >= 85) return NIVAER[4];
      if (s.forsok >= 5 && s.procent >= 75) return NIVAER[3];
      if (s.forsok >= 3 && s.procent >= 60) return NIVAER[2];
      return NIVAER[1];
    },

    /* Vad som krävs för att nå nästa nivå – visas i gränssnittet */
    nastaNivaKrav: function (amneId) {
      var niva = api.amnesNiva(amneId).n;
      var s = api.amnesStatistik(amneId);
      var a = data.amnen[amneId];

      if (niva === 5) return null;
      if (!s) return 'Svara på tre frågor så får ämnet en nivå.';

      var krav = [
        null,
        { forsok: 3, procent: 60 },
        { forsok: 5, procent: 75 },
        { forsok: 6, procent: 85 },
        { forsok: 8, procent: 85 }
      ][niva + 1 - 1] || { forsok: 8, procent: 85 };

      var delar = [];
      if (s.forsok < krav.forsok) {
        var kvar = krav.forsok - s.forsok;
        delar.push('svara på ' + kvar + (kvar === 1 ? ' fråga till' : ' frågor till'));
      }
      if (s.procent < krav.procent) {
        delar.push('kom upp i ' + krav.procent + ' % rätt');
      }
      if (niva === 4) {
        var dagar = (a.dagar || []).length;
        if (dagar < 2) delar.push('öva ämnet en dag till');
      }
      if (!delar.length) return 'Nästa rätta svar höjer nivån.';
      return 'För att gå upp en nivå: ' + delar.join(', ') + '.';
    },

    nivaLista: function () { return NIVAER; },

    /* Kvar för bakåtkompatibilitet: textnyckel för färgsättning */
    niva: function (amneId) {
      return String(api.amnesNiva(amneId).n);
    },

    /* ---------------------- Repetitionskö ---------------------- */
    /* Frågor du svarat fel på ligger kvar tills de suttit två gånger. */
    repetitioner: function (delkursId) {
      return (window.SYSB23.fragor || []).filter(function (f) {
        if (delkursId && f.delkurs !== delkursId) return false;
        var st = data.fragor[f.id];
        return st && st.prioritet > 0;
      });
    },

    /* ---------------------- Studiestreak ---------------------- */
    streak: function () {
      if (!data.studiedagar.length) return 0;
      var dagar = data.studiedagar.slice().sort().reverse();
      var d = new Date();
      d.setHours(0, 0, 0, 0);

      var idag = iso(d);
      var igar = iso(new Date(d.getTime() - 86400000));

      // Streaken lever så länge du pluggat idag eller igår
      if (dagar[0] !== idag && dagar[0] !== igar) return 0;

      var antal = 0;
      var peka = new Date(dagar[0] + 'T00:00:00');
      for (var i = 0; i < dagar.length; i++) {
        if (dagar[i] === iso(peka)) {
          antal += 1;
          peka = new Date(peka.getTime() - 86400000);
        } else break;
      }
      return antal;

      function iso(x) {
        return x.getFullYear() + '-' +
               String(x.getMonth() + 1).padStart(2, '0') + '-' +
               String(x.getDate()).padStart(2, '0');
      }
    },

    /* Dagens mål: hur många frågor du svarat på idag och hur långt kvar. */
    dagsmal: function () {
      var d = new Date();
      var idag = d.getFullYear() + '-' +
                 String(d.getMonth() + 1).padStart(2, '0') + '-' +
                 String(d.getDate()).padStart(2, '0');
      var antal = (data.svarPerDag && data.svarPerDag[idag]) || 0;
      return {
        antal: antal,
        mal: DAGSMAL,
        klart: antal >= DAGSMAL,
        andel: Math.min(100, Math.round((antal / DAGSMAL) * 100))
      };
    },

    pluggatIdag: function () {
      var d = new Date();
      var idag = d.getFullYear() + '-' +
                 String(d.getMonth() + 1).padStart(2, '0') + '-' +
                 String(d.getDate()).padStart(2, '0');
      return data.studiedagar.indexOf(idag) > -1;
    },

    /* ---------------------- Sammanfattning ---------------------- */
    sammanfattning: function (delkursId) {
      var S = window.SYSB23;
      var amnesIdn = S.amnen
        .filter(function (a) { return !delkursId || a.delkurs === delkursId; })
        .map(function (a) { return a.id; });

      var forsok = 0, poang = 0, testade = 0;
      amnesIdn.forEach(function (id) {
        var a = data.amnen[id];
        if (a && a.forsok > 0) {
          forsok += a.forsok;
          poang += a.ratt + a.delvis * 0.5;
          testade += 1;
        }
      });

      var fragor = S.fragor.filter(function (f) { return !delkursId || f.delkurs === delkursId; });
      var pass = data.historik.filter(function (h) { return true; });

      return {
        forsok: forsok,
        procent: forsok ? Math.round((poang / forsok) * 100) : null,
        testadeAmnen: testade,
        totaltAmnen: amnesIdn.length,
        seddaFragor: api.sedda(fragor),
        totaltFragor: fragor.length,
        antalPass: pass.length,
        senastePass: pass[0] || null
      };
    },

    /* ---------------------- Svaga ämnen ---------------------- */
    /* Ämnen på nivå 1–2 med minst tre svar. Sorteras svagast först. */
    svagaAmnen: function (delkursId, minForsok) {
      var S = window.SYSB23;
      minForsok = minForsok === undefined ? 3 : minForsok;
      return S.amnen
        .filter(function (a) { return !delkursId || a.delkurs === delkursId; })
        .map(function (a) {
          return { amne: a, stat: api.amnesStatistik(a.id), niva: api.amnesNiva(a.id) };
        })
        .filter(function (x) {
          return x.stat && x.stat.forsok >= minForsok && x.niva.n <= 2;
        })
        .sort(function (x, y) {
          if (x.niva.n !== y.niva.n) return x.niva.n - y.niva.n;
          return x.stat.procent - y.stat.procent;
        });
    },

    /* Ämnen som ännu inte påbörjats, i kapitelordning */
    orordaAmnen: function (delkursId) {
      var S = window.SYSB23;
      return S.amnen.filter(function (a) {
        if (delkursId && a.delkurs !== delkursId) return false;
        if (!S.fragor.some(function (f) { return f.amne === a.id; })) return false;
        return api.amnesNiva(a.id).n === 0;
      });
    },

    /* Snitt över alla ämnen i delkursen, 0–5. Driver "kursläget". */
    delkursNiva: function (delkursId) {
      var S = window.SYSB23;
      var amnen = S.amnen.filter(function (a) {
        return a.delkurs === delkursId &&
               S.fragor.some(function (f) { return f.amne === a.id; });
      });
      if (!amnen.length) return { snitt: 0, andel: 0, befasta: 0, totalt: 0 };

      var summa = 0, befasta = 0;
      amnen.forEach(function (a) {
        var n = api.amnesNiva(a.id).n;
        summa += n;
        if (n >= 4) befasta += 1;
      });
      return {
        snitt: summa / amnen.length,
        andel: Math.round((summa / (amnen.length * 5)) * 100),
        befasta: befasta,
        totalt: amnen.length
      };
    },

    /* ---------------------- Anteckningar ----------------------
       En anteckning per kapitel. Tom text tar bort posten helt, så att
       "kapitel med anteckningar" alltid betyder kapitel med innehåll. */
    anteckning: function (kapitelId) {
      var a = data.anteckningar[kapitelId];
      return a ? a.text : '';
    },

    sparaAnteckning: function (kapitelId, text) {
      if (!text || !text.trim()) delete data.anteckningar[kapitelId];
      else data.anteckningar[kapitelId] = { text: text, andrad: new Date().toISOString() };
      spara();
    },

    anteckningAndrad: function (kapitelId) {
      var a = data.anteckningar[kapitelId];
      return a ? a.andrad : null;
    },

    /* Alla anteckningar i kapitelordning, med kapitlet inlagt */
    allaAnteckningar: function (delkursId) {
      var S = window.SYSB23;
      var ut = [];
      Object.keys(S.kompendium).forEach(function (dk) {
        if (delkursId && dk !== delkursId) return;
        S.kompendium[dk].kapitel.forEach(function (k) {
          var a = data.anteckningar[k.id];
          if (a && a.text.trim()) {
            ut.push({ kapitel: k, delkurs: dk, text: a.text, andrad: a.andrad });
          }
        });
      });
      return ut;
    },

    /* ---------------------- Egna pass i schemat ----------------------
       Två sorters ändring hålls isär. Egna pass är helt egna poster som
       går att ta bort. Ändringar på kursens pass sparas som ett lager
       ovanpå kalenderfilen, så att originalet alltid går att få tillbaka
       och en uppdatering av kalendern inte skriver över det du ändrat. */
    egnaPass: function () { return data.egnaPass.slice(); },

    laggTillPass: function (p) {
      p.id = 'egen-' + Date.now().toString(36) + '-' +
             Math.floor(Math.random() * 1000).toString(36);
      data.egnaPass.push(p);
      spara();
      return p.id;
    },

    andraEgetPass: function (id, p) {
      data.egnaPass = data.egnaPass.map(function (x) {
        if (x.id !== id) return x;
        p.id = id;
        return p;
      });
      spara();
    },

    taBortEgetPass: function (id) {
      data.egnaPass = data.egnaPass.filter(function (x) { return x.id !== id; });
      spara();
    },

    passAndring: function (passId) { return data.passAndringar[passId] || null; },

    sattPassAndring: function (passId, andring) {
      data.passAndringar[passId] = andring;
      spara();
    },

    aterstallPass: function (passId) {
      delete data.passAndringar[passId];
      spara();
    },

    antalAndrade: function () {
      return Object.keys(data.passAndringar).length + data.egnaPass.length;
    },

    /* ---------------------- Egna länkar till gamla tentor ----------------------
       Tentorna ligger bakom inloggning på Canvas och går inte att länka till
       generellt. Därför får man spara sina egna länkar här, så att de finns
       samlade när man väl letat upp dem en gång. */
    tentalankar: function () { return data.tentalankar.slice(); },

    laggTillLank: function (titel, url) {
      /* Bara http och https. En javascript:-länk i egen data vore ofarlig här,
         men blir farlig i samma sekund någon delar sin exportfil. */
      var l = String(url).trim().toLowerCase();
      if (l.indexOf('http://') !== 0 && l.indexOf('https://') !== 0) return null;
      var post = {
        id: 'lank-' + Date.now().toString(36),
        titel: String(titel).slice(0, 90),
        url: String(url).slice(0, 500)
      };
      data.tentalankar.push(post);
      spara();
      return post.id;
    },

    taBortLank: function (id) {
      data.tentalankar = data.tentalankar.filter(function (x) { return x.id !== id; });
      spara();
    },

    /* ---------------------- SQL-verkstaden ----------------------
       En övning räknas som löst när svaret gav samma resultatmängd som
       referenslösningen. Datumet sparas så att man ser när man klarade
       den, inte bara att man gjorde det. */
    sqlLost: function (id) { return !!data.sqlLosta[id]; },

    markeraSqlLost: function (id) {
      if (!data.sqlLosta[id]) { data.sqlLosta[id] = new Date().toISOString(); spara(); }
    },

    antalSqlLosta: function () { return Object.keys(data.sqlLosta).length; },

    nollstallSql: function () { data.sqlLosta = {}; spara(); },

    /* ---------------------- Underhåll ---------------------- */
    exportera: function () { return JSON.stringify(data, null, 2); },

    importera: function (json) {
      var inkommande = JSON.parse(json);
      if (!inkommande || typeof inkommande !== 'object') throw new Error('Ogiltigt format');
      Object.keys(tomtLage).forEach(function (k) {
        if (inkommande[k] === undefined) inkommande[k] = JSON.parse(JSON.stringify(tomtLage[k]));
      });
      data = inkommande;
      spara();
    },

    rensa: function () {
      data = JSON.parse(JSON.stringify(tomtLage));
      try { localStorage.removeItem(NYCKEL); } catch (e) { /* ignoreras */ }
      spara();
    }
  };

  return api;
})();
