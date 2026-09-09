/* =========================================================================
   tentaprov.js – Prov som ett helt tentaformulär.

   Alla frågor ligger på en sida, precis som på salstentan. Man kryssar i
   det man tror, hoppar över det man inte kan, och lämnar in när man är
   klar. Först då rättas allt.

   Skillnaden mot att svara en fråga i taget är inte kosmetisk. På tentan
   kan man läsa igenom allt, börja med det man kan, ändra sig och komma
   tillbaka — och man får aldrig veta om ett svar var rätt förrän efteråt.
   Ett prov som facitrar direkt övar en helt annan förmåga än den som
   examineras.

   "Lämna obesvarad" är ett eget alternativ och inte bara frånvaro av val.
   På strategitentan kostar ett fel svar 1 poäng medan en tom fråga ger 0,
   så att medvetet avstå ÄR ett svar — och det är värt att öva på.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.tentaprov = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var prov = null;
  /* prov = { delkurs, uppl, delar:[{typ,fragor}], ordningar:{}, svar:{},
              essasvar:{}, punkter:{}, inlamnat, resultat } */

  /* ---------------------------------------------------------------- */
  /* Tentans upplägg                                                   */
  /* ---------------------------------------------------------------- */

  function upplagg(delkurs) {
    if (delkurs === 'strategi') {
      return {
        flerval: 10, essa: 2,
        poangRatt: 6, poangFel: -1, poangEssa: 20, max: 100,
        rubrik: 'Tentamen · Strategi och ekonomistyrning',
        beskrivning:
          '**10 flervalsfrågor à 6 poäng.** Fel svar ger **−1 poäng**, obesvarad ger 0. ' +
          'Därtill **2 essäfrågor à 20 poäng** utan minuspoäng. Max 100 poäng.',
        rad:
          'Eftersom ett fel svar kostar en poäng är det värt att avstå från en fråga du ' +
          'inte alls kan. Kan du utesluta ett enda alternativ lönar det sig däremot att gissa.',
        kalla: 'Formatet är avläst ur de två HT24-tentorna.'
      };
    }

    return {
      flerval: 12, essa: 0,
      poangRatt: 5, poangFel: 0, poangEssa: 0, max: 60,
      rubrik: 'Begreppsprov · Databaser',
      beskrivning:
        '**12 flervalsfrågor à 5 poäng.** Inga minuspoäng. Max 60 poäng.',
      rad:
        'Den riktiga databastentan ser inte ut så här. Den består av fyra skrivuppgifter: ' +
        'läsa ett ER-diagram, skriva DDL, normalisera, och skriva en SQL-fråga. ' +
        'Uppgift 1 och 3 tränar du i **Modellera**, uppgift 4 i **SQL-verkstaden**. ' +
        'Det här provet testar begreppen som ligger under dem.',
      kalla: 'Tentaformatet är avläst ur de tre databastentorna HT25.'
    };
  }

  function betyg(p) {
    if (p >= 85) return 'A';
    if (p >= 75) return 'B';
    if (p >= 65) return 'C';
    if (p >= 55) return 'D';
    if (p >= 50) return 'E';
    return 'U';
  }

  /* ---------------------------------------------------------------- */
  /* Ingång                                                            */
  /* ---------------------------------------------------------------- */

  function rendera() {
    var delkurs = S.store.delkurs();

    if (prov && prov.delkurs !== delkurs) prov = null;
    if (!prov) { visaStart(delkurs); return; }
    if (prov.inlamnat) { visaResultat(); return; }
    visaFormular();
  }

  function aterstall() { prov = null; }

  /* ---------------------------------------------------------------- */
  /* Startsidan                                                        */
  /* ---------------------------------------------------------------- */

  function fragorAv(delkurs, typ) {
    return S.fragor.filter(function (f) {
      return f.delkurs === delkurs && f.typ === typ;
    });
  }

  function visaStart(delkurs) {
    var u = upplagg(delkurs);
    var fv = fragorAv(delkurs, 'flerval');
    var es = fragorAv(delkurs, 'oppen');
    var racker = fv.length >= u.flerval && es.length >= u.essa;

    var h = '<div class="sida"><div class="huvud">';
    h += '<div class="kort">';
    h += '<h2>' + U.esc(u.rubrik) + '</h2>';
    h += '<div class="lastext" style="font-size:1rem">' + U.block(u.beskrivning) + '</div>';
    h += '<div class="notis">' + U.inline(u.rad) + '</div>';

    h += '<p class="muted liten">Hela provet ligger på en sida, som på salstentan. ' +
         'Du kryssar i, ändrar dig hur många gånger du vill, och rättar först när du ' +
         'lämnar in.</p>';
    h += '<p class="muted mini">' + U.esc(u.kalla) + '</p>';

    if (racker) {
      h += '<div class="knapprad"><button class="primar" id="prov-start">Starta provet</button></div>';
    } else {
      h += '<p class="muted">Frågebanken räcker inte till ett helt prov än: ' +
           fv.length + ' flervalsfrågor och ' + es.length + ' essäfrågor finns.</p>';
    }
    h += '</div>';

    h += '<div class="notis info liten">' +
         '<strong>Betygsgränser.</strong> A 85–100 %, B 75–84 %, C 65–74 %, ' +
         'D 55–64 %, E 50–54 %, U under 50 %.</div>';
    h += '</div>';

    /* Tidigare försök */
    h += '<aside class="sido"><div class="kort"><h2>Dina tidigare prov</h2>';
    var tidigare = S.store.historik().filter(function (x) { return x.lage === 'prov'; });
    if (!tidigare.length) {
      h += '<p class="muted liten" style="margin-bottom:0">Inga än. Resultatet sparas här ' +
           'när du lämnat in.</p>';
    } else {
      tidigare.slice(0, 10).forEach(function (x) {
        h += '<div class="rad"><span>' + U.esc(U.tidssedan(x.datum)) +
             '<br><span class="muted mini">' + U.esc(x.rubrik) + '</span></span>' +
             '<strong>' + (x.poang !== null && x.poang !== undefined
                ? x.poang + '/' + x.maxPoang + ' p · ' : '') + x.procent + ' %</strong></div>';
      });
    }
    h += '</div></aside></div>';

    var vy = U.el('vy-prov');
    vy.innerHTML = h;
    var k = U.el('prov-start');
    if (k) k.addEventListener('click', function () { starta(delkurs); });
  }

  /* ---------------------------------------------------------------- */
  /* Starta                                                            */
  /* ---------------------------------------------------------------- */

  function starta(delkurs) {
    var u = upplagg(delkurs);

    var flerval = U.blanda(fragorAv(delkurs, 'flerval')).slice(0, u.flerval);
    var essaer = u.essa ? U.blanda(fragorAv(delkurs, 'oppen')).slice(0, u.essa) : [];

    /* Alternativens ordning blandas en gång per prov. I frågebanken låg
       rätt svar systematiskt på samma plats; blandas den vid visning kan
       skevheten inte lära någon att gissa på position. */
    var ordningar = {};
    flerval.forEach(function (f) {
      if (f.alternativ) {
        ordningar[f.id] = U.blanda(f.alternativ.map(function (_, i) { return i; }));
      }
    });

    prov = {
      delkurs: delkurs, uppl: u,
      flerval: flerval, essaer: essaer,
      ordningar: ordningar,
      svar: {},         /* fragaId -> visat alternativindex, eller 'blank' */
      essasvar: {},     /* fragaId -> text */
      punkter: {},      /* fragaId -> [bool] självrättning */
      inlamnat: false,
      startad: Date.now()
    };
    visaFormular();
    window.scrollTo(0, 0);
  }

  /* Frågan som den visas, med blandade alternativ. */
  function visad(f) {
    if (f.typ !== 'flerval' || !f.alternativ) return f;
    var ordning = prov.ordningar[f.id];
    if (!ordning) return f;

    var vy = {};
    Object.keys(f).forEach(function (k) { vy[k] = f[k]; });
    vy.alternativ = ordning.map(function (i) { return f.alternativ[i]; });
    if (f.forklaringar) vy.forklaringar = ordning.map(function (i) { return f.forklaringar[i]; });
    vy.ratt = ordning.indexOf(f.ratt);
    return vy;
  }

  /* ---------------------------------------------------------------- */
  /* Formuläret                                                        */
  /* ---------------------------------------------------------------- */

  function antalBesvarade() {
    var n = 0;
    prov.flerval.forEach(function (f) {
      if (prov.svar[f.id] !== undefined && prov.svar[f.id] !== 'blank') n++;
    });
    prov.essaer.forEach(function (f) {
      if ((prov.essasvar[f.id] || '').trim()) n++;
    });
    return n;
  }

  function visaFormular() {
    var u = prov.uppl;
    var totalt = prov.flerval.length + prov.essaer.length;

    var h = '<div class="provark">';

    h += '<div class="kort provhuvud">';
    h += '<h2 style="margin-top:0">' + U.esc(u.rubrik) + '</h2>';
    h += '<p class="muted liten" style="margin-bottom:0">' +
         U.inline(u.beskrivning) + '</p>';
    h += '</div>';

    /* Del 1 */
    h += '<h3 class="provdel">Del 1 · Flervalsfrågor</h3>';
    h += '<p class="muted liten provdeltext">' + u.poangRatt + ' p för rätt svar' +
         (u.poangFel < 0 ? ', ' + u.poangFel + ' p för fel svar' : ', inga minuspoäng') +
         ', 0 p för obesvarad.</p>';

    prov.flerval.forEach(function (f, i) {
      h += flervalsfraga(visad(f), i + 1);
    });

    /* Del 2 */
    if (prov.essaer.length) {
      h += '<h3 class="provdel">Del 2 · Essäfrågor</h3>';
      h += '<p class="muted liten provdeltext">' + u.poangEssa + ' p per fråga. ' +
           'Inga minuspoäng. Skriv med egna ord — du rättar dem själv mot ' +
           'checklistan när du lämnat in.</p>';
      prov.essaer.forEach(function (f, i) {
        h += essafraga(f, prov.flerval.length + i + 1);
      });
    }

    h += '<div class="kort" style="text-align:center">';
    h += '<button class="primar stor" id="prov-lamna">Lämna in provet</button>';
    h += '<p class="muted mini" style="margin:.7rem 0 0">Efter inlämning kan du inte ändra svaren.</p>';
    h += '</div>';

    h += '</div>';

    /* Klisterremsa längst ned med räknare och inlämning */
    h += '<div class="provremsa" id="provremsa">' +
         '<span id="prov-raknare"></span>' +
         '<button class="primar" id="prov-lamna2">Lämna in</button>' +
         '</div>';

    var vy = U.el('vy-prov');
    vy.innerHTML = h;
    kopplaFormular(vy, totalt);
    uppdateraRaknare(totalt);
  }

  function flervalsfraga(f, nr) {
    var h = '<div class="kort provfraga" id="fraga-' + U.esc(f.id) + '">';
    h += '<div class="provnr">' + nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<p class="provtext">' + U.inline(f.fraga) + '</p>';
    h += '<div class="provalternativ">';

    (f.alternativ || []).forEach(function (alt, i) {
      var vald = prov.svar[f.id] === i;
      h += '<label class="provalt' + (vald ? ' vald' : '') + '">' +
           '<input type="radio" name="p-' + U.esc(f.id) + '" value="' + i + '"' +
           (vald ? ' checked' : '') + '>' +
           '<span class="provbokstav">' + 'ABCDEF'.charAt(i) + '</span>' +
           '<span>' + U.inline(alt) + '</span></label>';
    });

    var blank = prov.svar[f.id] === 'blank';
    h += '<label class="provalt provblank' + (blank ? ' vald' : '') + '">' +
         '<input type="radio" name="p-' + U.esc(f.id) + '" value="blank"' +
         (blank ? ' checked' : '') + '>' +
         '<span class="provbokstav">–</span>' +
         '<span>Lämna obesvarad <span class="muted mini">(0 p' +
         (prov.uppl.poangFel < 0 ? ' i stället för −1 p' : '') + ')</span></span></label>';

    h += '</div></div></div>';
    return h;
  }

  function essafraga(f, nr) {
    var h = '<div class="kort provfraga" id="fraga-' + U.esc(f.id) + '">';
    h += '<div class="provnr">' + nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<p class="provtext">' + U.inline(f.fraga) + '</p>';
    h += '<textarea class="provessa" data-essa="' + U.esc(f.id) + '" rows="10" ' +
         'placeholder="Skriv ditt svar här…">' + U.esc(prov.essasvar[f.id] || '') + '</textarea>';
    h += '<p class="muted mini" style="margin:.4rem 0 0">' +
         (f.nyckelpunkter || []).length + ' punkter i checklistan.</p>';
    h += '</div></div>';
    return h;
  }

  function kopplaFormular(vy, totalt) {
    Array.prototype.forEach.call(vy.querySelectorAll('input[type=radio]'), function (r) {
      r.addEventListener('change', function () {
        var id = r.name.slice(2);
        prov.svar[id] = (r.value === 'blank') ? 'blank' : parseInt(r.value, 10);

        /* Markera det valda alternativet utan att rita om hela arket —
           annars tappar man scrollpositionen mitt i provet. */
        var ruta = vy.querySelector('#fraga-' + CSS.escape(id));
        Array.prototype.forEach.call(ruta.querySelectorAll('.provalt'), function (l) {
          l.classList.toggle('vald', l.querySelector('input').checked);
        });
        uppdateraRaknare(totalt);
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-essa]'), function (t) {
      t.addEventListener('input', function () {
        prov.essasvar[t.dataset.essa] = t.value;
        uppdateraRaknare(totalt);
      });
    });

    [U.el('prov-lamna'), U.el('prov-lamna2')].forEach(function (k) {
      if (k) k.addEventListener('click', lamnaIn);
    });
  }

  function uppdateraRaknare(totalt) {
    var r = U.el('prov-raknare');
    if (!r) return;
    var n = antalBesvarade();
    r.innerHTML = '<strong>' + n + '</strong> av ' + totalt + ' besvarade';
  }

  /* ---------------------------------------------------------------- */
  /* Rättning                                                          */
  /* ---------------------------------------------------------------- */

  function lamnaIn() {
    var u = prov.uppl;
    var obesvarade = prov.flerval.filter(function (f) {
      return prov.svar[f.id] === undefined;
    }).length;

    if (obesvarade) {
      var text = obesvarade === 1
        ? 'En fråga är varken besvarad eller markerad som obesvarad.'
        : obesvarade + ' frågor är varken besvarade eller markerade som obesvarade.';
      if (!window.confirm(text + ' De räknas som obesvarade och ger 0 poäng. Lämna in ändå?')) return;
    }

    var poang = 0, ratt = 0, fel = 0, blanka = 0;

    prov.flerval.forEach(function (f) {
      var v = visad(f);
      var svar = prov.svar[f.id];
      if (svar === undefined || svar === 'blank') { blanka++; return; }
      var korrekt = svar === v.ratt;
      if (korrekt) { ratt++; poang += u.poangRatt; }
      else { fel++; poang += u.poangFel; }

      /* Provet ska räknas in i statistiken som vilket svar som helst,
         annars blir repetitionskön blind för just det man missade på
         tentan — och det är det man behöver repetera mest. */
      S.store.registreraSvar(f, korrekt ? 'ratt' : 'fel');
    });

    prov.resultat = {
      poangFlerval: poang, ratt: ratt, fel: fel, blanka: blanka,
      maxFlerval: prov.flerval.length * u.poangRatt
    };
    prov.inlamnat = true;

    sparaHistorik();
    visaResultat();
    window.scrollTo(0, 0);
  }

  /* Essäpoängen är självrättad och kan ändras efter inlämning, så summan
     räknas om varje gång i stället för att frysas. */
  function essapoang() {
    var u = prov.uppl;
    var summa = 0;
    prov.essaer.forEach(function (f) {
      var punkter = prov.punkter[f.id] || [];
      var antal = (f.nyckelpunkter || []).length;
      if (!antal) return;
      var kryss = punkter.filter(Boolean).length;
      summa += Math.round(kryss / antal * u.poangEssa);
    });
    return summa;
  }

  function totalpoang() {
    return prov.resultat.poangFlerval + essapoang();
  }

  function historikpost() {
    var u = prov.uppl;
    var p = Math.max(0, totalpoang());
    return {
      lage: 'prov',
      rubrik: u.rubrik,
      antal: prov.flerval.length + prov.essaer.length,
      ratt: prov.resultat.ratt,
      poang: p,
      maxPoang: u.max,
      procent: Math.round(p / u.max * 100)
    };
  }

  function sparaHistorik() { S.store.registreraPass(historikpost()); }

  /* Självrättningen ändrar poängen på ett prov som redan är inlämnat. */
  function uppdateraHistorik() { S.store.uppdateraSenastePass(historikpost()); }

  /* ---------------------------------------------------------------- */
  /* Resultatet                                                        */
  /* ---------------------------------------------------------------- */

  function visaResultat() {
    var u = prov.uppl;
    var r = prov.resultat;
    var p = totalpoang();
    var procent = Math.max(0, Math.round(p / u.max * 100));
    var b = betyg(procent);

    var h = '<div class="provark">';

    h += '<div class="kort provresultat ' + (b === 'U' ? 'underkant' : 'godkant') + '">';
    h += '<div class="provbetyg">' + b + '</div>';
    h += '<div>';
    h += '<h2 style="margin:0 0 .25rem">' + Math.max(0, p) + ' av ' + u.max + ' poäng · ' +
         procent + ' %</h2>';
    h += '<p class="muted liten" style="margin:0">' + r.ratt + ' rätt, ' + r.fel + ' fel, ' +
         r.blanka + ' obesvarade' +
         (u.poangFel < 0 && r.fel
            ? ' · de felaktiga svaren kostade ' + (r.fel * -u.poangFel) + ' p' : '') +
         '</p>';
    h += '</div></div>';

    if (u.poangFel < 0 && r.fel && r.blanka === 0) {
      h += '<div class="notis"><strong>Värt att lägga märke till.</strong> ' +
           'Du gissade på alla frågor. Det kostade ' + (r.fel * -u.poangFel) +
           ' poäng. Hade du lämnat de ' + r.fel + ' du inte kunde obesvarade hade du ' +
           'fått ' + (Math.max(0, p) + r.fel * -u.poangFel) + ' poäng i stället.</div>';
    }

    h += '<h3 class="provdel">Del 1 · Rättning</h3>';
    prov.flerval.forEach(function (f, i) {
      h += rattadFraga(visad(f), i + 1);
    });

    if (prov.essaer.length) {
      h += '<h3 class="provdel">Del 2 · Rätta dina essäsvar</h3>';
      h += '<p class="muted liten provdeltext">Kryssa i de punkter du faktiskt fick med. ' +
           'Poängen räknas om direkt. Var ärlig — det är det enda sättet att veta var du står.</p>';
      prov.essaer.forEach(function (f, i) {
        h += rattadEssa(f, prov.flerval.length + i + 1);
      });
    }

    h += '<div class="kort" style="text-align:center">';
    h += '<button class="primar" id="prov-nytt">Gör ett nytt prov</button>';
    h += '</div></div>';

    var vy = U.el('vy-prov');
    vy.innerHTML = h;

    Array.prototype.forEach.call(vy.querySelectorAll('[data-punkt]'), function (c) {
      c.addEventListener('change', function () {
        var id = c.dataset.punkt, i = parseInt(c.dataset.index, 10);
        prov.punkter[id] = prov.punkter[id] || [];
        prov.punkter[id][i] = c.checked;
        uppdateraHistorik();
        visaResultat();
      });
    });

    var ny = U.el('prov-nytt');
    if (ny) ny.addEventListener('click', function () { prov = null; rendera(); });
  }

  function rattadFraga(f, nr) {
    var svar = prov.svar[f.id];
    var blank = svar === undefined || svar === 'blank';
    var korrekt = !blank && svar === f.ratt;
    var klass = korrekt ? 'ratt' : (blank ? 'blank' : 'fel');

    var h = '<div class="kort provfraga rattad ' + klass + '">';
    h += '<div class="provnr">' + nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<p class="provtext">' + U.inline(f.fraga) + '</p>';

    (f.alternativ || []).forEach(function (alt, i) {
      var mitt = svar === i;
      var facit = i === f.ratt;
      var kl = facit ? ' facit' : (mitt ? ' mittfel' : '');
      h += '<div class="provalt statisk' + kl + '">';
      h += '<span class="provbokstav">' + 'ABCDEF'.charAt(i) + '</span>';
      h += '<span>' + U.inline(alt);
      if (f.forklaringar && f.forklaringar[i] && (mitt || facit)) {
        h += '<span class="provforklaring">' + U.inline(f.forklaringar[i]) + '</span>';
      }
      h += '</span>';
      h += '<span class="provmarke">' + (facit ? '✓ Rätt svar' : (mitt ? '✕ Ditt svar' : '')) + '</span>';
      h += '</div>';
    });

    if (blank) {
      h += '<p class="muted liten" style="margin:.6rem 0 0">Du lämnade frågan obesvarad. ' +
           '0 poäng' + (prov.uppl.poangFel < 0 ? ', i stället för −1 om du gissat fel' : '') + '.</p>';
    }
    if (f.forklaring) {
      h += '<div class="notis liten" style="margin:.8rem 0 0">' + U.inline(f.forklaring) + '</div>';
    }

    h += '</div></div>';
    return h;
  }

  function rattadEssa(f, nr) {
    var punkter = prov.punkter[f.id] || [];
    var lista = f.nyckelpunkter || [];
    var kryss = punkter.filter(Boolean).length;
    var poang = lista.length ? Math.round(kryss / lista.length * prov.uppl.poangEssa) : 0;

    var h = '<div class="kort provfraga">';
    h += '<div class="provnr">' + nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<p class="provtext">' + U.inline(f.fraga) + '</p>';

    var mitt = (prov.essasvar[f.id] || '').trim();
    h += '<h4 class="tabellrubrik">Ditt svar</h4>';
    h += mitt
      ? '<div class="egetsvar">' + U.block(mitt) + '</div>'
      : '<p class="muted liten">Du skrev inget svar.</p>';

    h += '<h4 class="tabellrubrik">Checklista <span class="muted liten">' +
         kryss + ' av ' + lista.length + ' · ' + poang + ' av ' +
         prov.uppl.poangEssa + ' p</span></h4>';
    h += '<ul class="checklista">';
    lista.forEach(function (punkt, i) {
      h += '<li><label><input type="checkbox" data-punkt="' + U.esc(f.id) +
           '" data-index="' + i + '"' + (punkter[i] ? ' checked' : '') + '> ' +
           U.inline(punkt) + '</label></li>';
    });
    h += '</ul>';

    if (f.modellsvar) {
      h += '<details class="modellsvar"><summary>Visa modellsvar</summary>' +
           '<div class="lastext">' + U.block(f.modellsvar) + '</div></details>';
    }

    h += '</div></div>';
    return h;
  }

  return { rendera: rendera, aterstall: aterstall };
})();
