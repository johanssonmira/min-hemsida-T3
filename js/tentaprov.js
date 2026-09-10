/* =========================================================================
   tentaprov.js – Prov: de riktiga gamla tentorna, exakt som de såg ut.

   Inga andra frågor. Provet består av de gamla strategitentorna, med
   frågor och svarsalternativ ord för ord och i originalets ordning. Texten
   kommer från tentans PDF, som man läser in själv — se js/extentaimport.js
   för varför den inte ligger i appen.

   Som på salstentan: allt på en sida, man kryssar i, kan ändra sig och
   ta bort ett svar, och rättar först vid inlämning. Rätt ger 6 poäng, fel
   −1, obesvarad 0. Essäfrågorna självrättas mot en checklista.

   Facit och förklaringar är appens egna (data/extentor.js). Tentorna kom
   utan facit, och det står tydligt i gränssnittet.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.tentaprov = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var POANG_RATT = 6, POANG_FEL = -1;

  var prov = null;
  /* prov = { id, nyckel, tenta, svar:{nr:index}, essasvar:{nr:text},
              punkter:{nr:[bool]}, inlamnat, resultat } */

  var laddar = null;      /* tentaId som läses in just nu */
  var fel = {};           /* tentaId -> felmeddelande från senaste inläsning */

  /* ---------------------------------------------------------------- */

  function tentor() {
    return (S.extentor || []).filter(function (e) { return e.delkurs === S.store.delkurs(); });
  }

  function rendera() {
    if (prov && prov.inlamnat) { visaResultat(); return; }
    if (prov) { visaFormular(); return; }
    visaStart();
  }

  function aterstall() { prov = null; }

  /* Tentans egen text, med betoningen kvar. Texten kommer från en fil
     och escapas alltid här — den får aldrig tolkas som HTML. */
  function delarTillHtml(delar) {
    return (delar || []).map(function (d) {
      return d.f ? '<strong>' + U.esc(d.t) + '</strong>' : U.esc(d.t);
    }).join('');
  }

  function styckenTillHtml(stycken) {
    return (stycken || []).map(function (s) { return '<p>' + delarTillHtml(s) + '</p>'; }).join('');
  }

  /* ---------------------------------------------------------------- */
  /* Startsidan                                                        */
  /* ---------------------------------------------------------------- */

  function visaStart() {
    var h = '<div class="sida"><div class="huvud">';

    h += '<div class="kort">';
    h += '<h2>Prov</h2>';
    h += '<p>De gamla tentorna, exakt som de såg ut: samma frågor, samma svarsalternativ, ' +
         'samma ordning och samma poäng. <strong>Rätt svar 6 p, fel svar −1 p, obesvarad 0 p.</strong> ' +
         'Essäfrågorna ger högst 20 p. Allt rättas när du lämnar in.</p>';
    h += '<div class="notis info liten"><strong>Så här fungerar det.</strong> Tentorna är ' +
         'universitetets material och får inte ligga på den här publika sidan. Därför läser du ' +
         'in PDF:en själv — den finns bland kursens filer. Den läses bara i din webbläsare, ' +
         'skickas ingenstans, och behöver bara läsas in en gång per enhet.</div>';
    h += '</div>';

    tentor().forEach(function (e) { h += tentakort(e); });

    h += '</div>';

    /* Tidigare försök */
    h += '<aside class="sido"><div class="kort"><h2>Dina tidigare prov</h2>';
    var tidigare = S.store.historik().filter(function (x) { return x.lage === 'prov'; });
    if (!tidigare.length) {
      h += '<p class="muted liten" style="margin-bottom:0">Inga än.</p>';
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
    kopplaStart(vy);
  }

  function tentakort(e) {
    var inlast = S.store.extenta(e.id);
    var h = '<div class="kort tentakort">';
    h += '<div class="tentakort-rad">';
    h += '<div><h3 style="margin:0">' + U.esc(e.titel) + '</h3>';
    h += '<p class="muted liten" style="margin:.2rem 0 0">' + U.esc(U.langtDatum(e.datum)) +
         ' · ' + e.fragor.filter(function (f) { return f.typ === 'flerval'; }).length +
         ' flervalsfrågor och ' + e.fragor.filter(function (f) { return f.typ === 'essa'; }).length +
         ' essäfrågor</p></div>';

    if (inlast) {
      h += '<button class="primar" data-starta="' + U.esc(e.id) + '">Starta provet</button>';
    }
    h += '</div>';

    if (laddar === e.id) {
      h += '<p class="muted liten">Läser in PDF:en…</p>';
    } else if (!inlast) {
      h += '<p class="liten" style="margin:.8rem 0 .4rem">Läs in filen <code>' + U.esc(e.fil) + '</code>:</p>';
      h += '<label class="primar filknapp">Välj PDF…' +
           '<input type="file" accept="application/pdf,.pdf" data-lasin="' + U.esc(e.id) + '" hidden></label>';
    } else {
      h += '<p class="muted mini" style="margin:.7rem 0 0">Inläst ' +
           U.esc(U.tidssedan(inlast.inlast)) + '. ' +
           '<button class="lankbtn" data-taborttenta="' + U.esc(e.id) + '">Ta bort från den här enheten</button></p>';
    }

    if (fel[e.id]) {
      h += '<div class="notis" style="margin:.8rem 0 0"><strong>Det gick inte att läsa in.</strong> ' +
           U.esc(fel[e.id]) + '</div>';
    }
    h += '</div>';
    return h;
  }

  function kopplaStart(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-lasin]'), function (inp) {
      inp.addEventListener('change', function () {
        var fil = inp.files && inp.files[0];
        if (fil) lasIn(inp.dataset.lasin, fil);
      });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-starta]'), function (b) {
      b.addEventListener('click', function () { starta(b.dataset.starta); });
    });
    Array.prototype.forEach.call(vy.querySelectorAll('[data-taborttenta]'), function (b) {
      b.addEventListener('click', function () {
        S.store.taBortExtenta(b.dataset.taborttenta);
        visaStart();
      });
    });
  }

  function lasIn(id, fil) {
    laddar = id;
    delete fel[id];
    visaStart();

    S.extentaimport.lasPdf(fil).then(function (sidor) {
      var m = S.extentaimport.matcha(S.extentaimport.tolka(sidor));
      laddar = null;
      if (m.fel) { fel[id] = m.fel; visaStart(); return; }
      if (m.id !== id) {
        /* Rätt tenta men fel knapp — spara den ändå där den hör hemma */
        fel[id] = 'Det där var den andra tentan. Den är nu inläst på sin plats.';
      }
      S.store.sparaExtenta(m.id, m.tenta);
      visaStart();
    }).catch(function (e) {
      laddar = null;
      fel[id] = 'PDF:en kunde inte läsas (' + (e && e.message ? e.message : e) + ').';
      visaStart();
    });
  }

  /* ---------------------------------------------------------------- */
  /* Formuläret                                                        */
  /* ---------------------------------------------------------------- */

  function starta(id) {
    var nyckel = (S.extentor || []).filter(function (e) { return e.id === id; })[0];
    var inlast = S.store.extenta(id);
    if (!nyckel || !inlast) return;

    prov = {
      id: id, nyckel: nyckel, tenta: inlast.tenta,
      svar: {}, essasvar: {}, punkter: {}, inlamnat: false
    };
    visaFormular();
    window.scrollTo(0, 0);
  }

  function flervalsfragor() { return prov.tenta.fragor.filter(function (f) { return f.typ === 'flerval'; }); }
  function essafragor() { return prov.tenta.fragor.filter(function (f) { return f.typ === 'essa'; }); }

  function antalBesvarade() {
    var n = 0;
    prov.tenta.fragor.forEach(function (f) {
      if (f.typ === 'flerval' && prov.svar[f.nr] !== undefined) n++;
      if (f.typ === 'essa' && (prov.essasvar[f.nr] || '').trim()) n++;
    });
    return n;
  }

  function visaFormular() {
    var e = prov.nyckel;
    var h = '<div class="provark">';

    h += '<div class="kort provhuvud">';
    h += '<div class="muted mini">HT24 · SYSB23, Strategi och ekonomistyrning</div>';
    h += '<h2 style="margin:.2rem 0 .6rem">' + U.esc(e.titel) + '</h2>';
    h += '<p class="liten" style="margin:0"><strong>Poängsättning.</strong> I flervalssektionen ' +
         'ger rätt svar 6 poäng, fel svar −1 poäng och obesvarad fråga 0 poäng. ' +
         'Essäfrågorna ger max 20 poäng, utan minuspoäng.</p>';
    h += '<p class="muted mini" style="margin:.5rem 0 0">Klicka på ett markerat alternativ igen ' +
         'för att ta bort svaret.</p>';
    h += '</div>';

    prov.tenta.fragor.forEach(function (f) {
      h += f.typ === 'flerval' ? flervalsfraga(f) : essafraga(f);
    });

    h += '<div class="kort" style="text-align:center">';
    h += '<button class="primar stor" id="prov-lamna">Lämna in</button>';
    h += '<p class="muted mini" style="margin:.7rem 0 0">Efter inlämning kan svaren inte ändras.</p>';
    h += '</div></div>';

    h += '<div class="provremsa"><span id="prov-raknare"></span>' +
         '<button class="primar" id="prov-lamna2">Lämna in</button></div>';

    var vy = U.el('vy-prov');
    vy.innerHTML = h;
    kopplaFormular(vy);
    uppdateraRaknare();
  }

  function flervalsfraga(f) {
    var h = '<div class="kort provfraga" id="tf-' + f.nr + '">';
    h += '<div class="provnr">' + f.nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<div class="provtext">' + styckenTillHtml(f.fraga) + '</div>';
    h += '<p class="muted mini" style="margin:0 0 .5rem">Välj ett alternativ:</p>';
    h += '<div class="provalternativ">';
    f.alternativ.forEach(function (alt, i) {
      var vald = prov.svar[f.nr] === i;
      h += '<label class="provalt' + (vald ? ' vald' : '') + '">' +
           '<input type="radio" name="tf-' + f.nr + '" value="' + i + '"' + (vald ? ' checked' : '') + '>' +
           '<span>' + delarTillHtml(alt) + '</span></label>';
    });
    h += '</div>';
    h += '<p class="muted mini provpoangrad">Totalpoäng: ' + f.poang + '</p>';
    h += '</div></div>';
    return h;
  }

  function essafraga(f) {
    var h = '<div class="kort provfraga">';
    h += '<div class="provnr">' + f.nr + '</div>';
    h += '<div class="provinnehall">';
    h += '<div class="provtext">' + styckenTillHtml(f.fraga) + '</div>';
    h += '<textarea class="provessa" data-essa="' + f.nr + '" rows="10" ' +
         'placeholder="Skriv in ditt svar här">' + U.esc(prov.essasvar[f.nr] || '') + '</textarea>';
    h += '<p class="muted mini provpoangrad">Totalpoäng: ' + f.poang + '</p>';
    h += '</div></div>';
    return h;
  }

  function kopplaFormular(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('.provalt input[type=radio]'), function (r) {
      /* Radioknappar går inte att avmarkera. Ett klick på det redan valda
         alternativet tar därför bort svaret — på tentan kan man ångra ett
         kryss, och här ska det gå lika lätt. */
      r.addEventListener('click', function () {
        var nr = Number(r.name.slice(3));
        var i = Number(r.value);
        if (prov.svar[nr] === i) { delete prov.svar[nr]; r.checked = false; }
        else prov.svar[nr] = i;

        var ruta = vy.querySelector('#tf-' + nr);
        Array.prototype.forEach.call(ruta.querySelectorAll('.provalt'), function (l) {
          l.classList.toggle('vald', l.querySelector('input').checked);
        });
        uppdateraRaknare();
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-essa]'), function (t) {
      t.addEventListener('input', function () {
        prov.essasvar[t.dataset.essa] = t.value;
        uppdateraRaknare();
      });
    });

    [U.el('prov-lamna'), U.el('prov-lamna2')].forEach(function (k) {
      if (k) k.addEventListener('click', lamnaIn);
    });
  }

  function uppdateraRaknare() {
    var r = U.el('prov-raknare');
    if (r) r.innerHTML = '<strong>' + antalBesvarade() + '</strong> av ' +
                         prov.tenta.fragor.length + ' besvarade';
  }

  /* ---------------------------------------------------------------- */
  /* Rättning                                                          */
  /* ---------------------------------------------------------------- */

  function nyckelFor(nr) { return prov.nyckel.fragor[nr - 1]; }

  function lamnaIn() {
    var obesvarade = flervalsfragor().filter(function (f) { return prov.svar[f.nr] === undefined; }).length;
    if (obesvarade && !window.confirm(obesvarade + (obesvarade === 1 ? ' flervalsfråga är' : ' flervalsfrågor är') +
        ' obesvarade och ger 0 poäng. Lämna in?')) return;

    var poang = 0, ratt = 0, felSvar = 0, blanka = 0;
    flervalsfragor().forEach(function (f) {
      var svar = prov.svar[f.nr];
      if (svar === undefined) { blanka++; return; }
      if (svar === nyckelFor(f.nr).ratt) { ratt++; poang += POANG_RATT; }
      else { felSvar++; poang += POANG_FEL; }
    });

    prov.resultat = { poangFlerval: poang, ratt: ratt, fel: felSvar, blanka: blanka };
    prov.inlamnat = true;
    S.store.registreraPass(historikpost());
    visaResultat();
    window.scrollTo(0, 0);
  }

  function maxPoang() {
    return prov.tenta.fragor.reduce(function (s, f) { return s + f.poang; }, 0);
  }

  function essaBank(nr) {
    var id = nyckelFor(nr).bank;
    return S.fragor.filter(function (q) { return q.id === id; })[0] || null;
  }

  function essapoang(f) {
    var bank = essaBank(f.nr);
    var lista = (bank && bank.nyckelpunkter) || [];
    if (!lista.length) return 0;
    var kryss = (prov.punkter[f.nr] || []).filter(Boolean).length;
    return Math.round(kryss / lista.length * f.poang);
  }

  function totalpoang() {
    return prov.resultat.poangFlerval +
      essafragor().reduce(function (s, f) { return s + essapoang(f); }, 0);
  }

  function historikpost() {
    var p = Math.max(0, totalpoang()), max = maxPoang();
    return {
      lage: 'prov', rubrik: prov.nyckel.titel + ' ' + prov.nyckel.datum,
      antal: prov.tenta.fragor.length, ratt: prov.resultat.ratt,
      poang: p, maxPoang: max, procent: Math.round(p / max * 100)
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
  /* Resultatet                                                        */
  /* ---------------------------------------------------------------- */

  function visaResultat() {
    var r = prov.resultat;
    var p = Math.max(0, totalpoang()), max = maxPoang();
    var procent = Math.round(p / max * 100);
    var b = betyg(procent);

    var h = '<div class="provark">';
    h += '<div class="kort provresultat ' + (b === 'U' ? 'underkant' : 'godkant') + '">';
    h += '<div class="provbetyg">' + b + '</div><div>';
    h += '<h2 style="margin:0 0 .25rem">' + p + ' av ' + max + ' poäng · ' + procent + ' %</h2>';
    h += '<p class="muted liten" style="margin:0">' + U.esc(prov.nyckel.titel) + ' · ' +
         r.ratt + ' rätt, ' + r.fel + ' fel, ' + r.blanka + ' obesvarade' +
         (r.fel ? ' · de felaktiga svaren kostade ' + r.fel + ' p' : '') + '</p>';
    h += '</div></div>';

    if (r.fel && !r.blanka) {
      h += '<div class="notis"><strong>Värt att lägga märke till.</strong> Du svarade på alla ' +
           'flervalsfrågor. De ' + r.fel + ' felaktiga kostade ' + r.fel + ' poäng — hade du ' +
           'lämnat dem obesvarade hade du fått ' + (p + r.fel) + ' poäng.</div>';
    }

    h += '<p class="muted mini">Tentorna kom utan facit. Rätt svar och förklaringar nedan är ' +
         'appens egna, grundade i kurslitteraturen.</p>';

    prov.tenta.fragor.forEach(function (f) {
      h += f.typ === 'flerval' ? rattadFlerval(f) : rattadEssa(f);
    });

    h += '<div class="kort" style="text-align:center">' +
         '<button class="sekundar" id="prov-tillbaka">Till alla tentor</button> ' +
         '<button class="primar" id="prov-igen">Gör om samma tenta</button></div>';
    h += '</div>';

    var vy = U.el('vy-prov');
    vy.innerHTML = h;

    Array.prototype.forEach.call(vy.querySelectorAll('[data-punkt]'), function (c) {
      c.addEventListener('change', function () {
        var nr = c.dataset.punkt, i = Number(c.dataset.index);
        prov.punkter[nr] = prov.punkter[nr] || [];
        prov.punkter[nr][i] = c.checked;
        S.store.uppdateraSenastePass(historikpost());
        var y = window.scrollY;
        visaResultat();
        window.scrollTo(0, y);
      });
    });
    U.el('prov-tillbaka').addEventListener('click', function () { prov = null; visaStart(); });
    U.el('prov-igen').addEventListener('click', function () { starta(prov.id); });
  }

  function rattadFlerval(f) {
    var k = nyckelFor(f.nr);
    var svar = prov.svar[f.nr];
    var blank = svar === undefined;
    var korrekt = !blank && svar === k.ratt;

    var h = '<div class="kort provfraga rattad ' + (korrekt ? 'ratt' : (blank ? 'blank' : 'fel')) + '">';
    h += '<div class="provnr">' + f.nr + '</div><div class="provinnehall">';
    h += '<div class="provtext">' + styckenTillHtml(f.fraga) + '</div>';

    f.alternativ.forEach(function (alt, i) {
      var mitt = svar === i, facit = i === k.ratt;
      h += '<div class="provalt statisk' + (facit ? ' facit' : (mitt ? ' mittfel' : '')) + '">';
      h += '<span>' + delarTillHtml(alt) + '</span>';
      h += '<span class="provmarke">' + (facit ? '✓ Rätt svar' : (mitt ? '✕ Ditt svar' : '')) + '</span>';
      h += '</div>';
    });

    h += '<p class="muted liten" style="margin:.6rem 0 0">' +
         (korrekt ? '+6 p' : (blank ? 'Obesvarad · 0 p' : 'Fel · −1 p')) + '</p>';
    h += '<div class="notis info liten" style="margin:.6rem 0 0">' + U.inline(k.forklaring) + '</div>';
    h += '</div></div>';
    return h;
  }

  function rattadEssa(f) {
    var bank = essaBank(f.nr);
    var lista = (bank && bank.nyckelpunkter) || [];
    var punkter = prov.punkter[f.nr] || [];
    var kryss = punkter.filter(Boolean).length;

    var h = '<div class="kort provfraga">';
    h += '<div class="provnr">' + f.nr + '</div><div class="provinnehall">';
    h += '<div class="provtext">' + styckenTillHtml(f.fraga) + '</div>';

    var mitt = (prov.essasvar[f.nr] || '').trim();
    h += '<h4 class="tabellrubrik">Ditt svar</h4>';
    h += mitt ? '<div class="egetsvar">' + U.block(mitt) + '</div>'
              : '<p class="muted liten">Du skrev inget svar.</p>';

    h += '<h4 class="tabellrubrik">Rätta dig själv <span class="muted liten">' + kryss + ' av ' +
         lista.length + ' punkter · ' + essapoang(f) + ' av ' + f.poang + ' p</span></h4>';
    h += '<p class="muted mini" style="margin:0 0 .4rem">Kryssa i de punkter ditt svar faktiskt tar upp.</p>';
    h += '<ul class="checklista">';
    lista.forEach(function (punkt, i) {
      h += '<li><label><input type="checkbox" data-punkt="' + f.nr + '" data-index="' + i + '"' +
           (punkter[i] ? ' checked' : '') + '> ' + U.inline(punkt) + '</label></li>';
    });
    h += '</ul>';
    if (bank && bank.modellsvar) {
      h += '<details class="modellsvar"><summary>Visa modellsvar</summary>' +
           '<div class="lastext">' + U.block(bank.modellsvar) + '</div></details>';
    }
    h += '</div></div>';
    return h;
  }

  return { rendera: rendera, aterstall: aterstall };
})();
