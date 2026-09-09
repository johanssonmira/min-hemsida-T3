/* =========================================================================
   modellera.js – databastentans uppgift 1, 2 och 3.

   Tre familjer i en vy:

     Läsa diagram   ett ER-diagram och tio påståenden. +5 för varje rätt
                    markerat, −3 för varje fel. Precis tentans poängsystem,
                    så att man lär sig att INTE kryssa i det man är osäker på.

     ER till schema ett diagram, och du skriver relationsschemat. Rättas
                    som mängder: relationsnamn och namnet på en främmande
                    nyckel spelar ingen roll, men vad som identifierar och
                    vad som refererar vad gör det.

     Normalisering  en relation med sina beroenden. Ange högsta normalform
                    och, om den inte är i 3NF, uppdelningen. Facit räknas
                    ut av js/normalform.js i stället för att stå skrivet.

   Rättningen är avsiktligt förlåtande mot form och sträng mot innehåll.
   Att bli underkänd för att man skrev PK på fel rad lär inte ut någonting.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.modellera = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var familj = 'lasdiagram';        // 'lasdiagram' | 'erschema' | 'normalisering'
  var vald = {};                    // familj -> uppgiftsId
  var utkast = {};                  // uppgiftsId -> vad man skrivit
  var markerade = {};               // uppgiftsId -> { index: true }
  var normalval = {};               // uppgiftsId -> 1 | 2 | 3
  var svar = {};                    // uppgiftsId -> rättningsresultat

  /* ---------------------------------------------------------------- */
  /* Uppgifterna                                                       */
  /* ---------------------------------------------------------------- */

  /* Normaliseringsuppgifterna ligger grupperade i datafilen. Här plattas
     de ut till en lista med stabila id:n, och facit räknas ut en gång. */
  var normalisering = (function () {
    var ut = [];
    (S.normaliseringsuppgifter || []).forEach(function (grupp, gi) {
      grupp.relationer.forEach(function (rel, ri) {
        ut.push({
          id: 'nf-' + (gi + 1) + '-' + (ri + 1),
          grupp: grupp.grupp,
          nr: ri + 1,
          baraForm: !!grupp.baraForm,
          kalla: grupp.kalla,
          attribut: rel[0],
          fd: rel[1],
          analys: S.normalform.analysera(rel[0], rel[1])
        });
      });
    });
    return ut;
  })();

  var FAMILJER = [
    { id: 'lasdiagram', namn: 'Läsa diagram',
      kort: 'Tentans uppgift 1 · 25 p',
      intro: 'Ett Chen-diagram och tio påståenden. Markera alla som är korrekta. ' +
             '**+5 poäng för varje rätt markerat påstående, −3 för varje felaktigt**, ' +
             '0 för omarkerat. Markerar du alla och endast de korrekta får du 25 poäng.',
      lista: function () { return S.lasdiagram || []; } },

    { id: 'erschema', namn: 'ER till schema',
      kort: 'Tentans uppgift 2 · 25 p',
      intro: 'Ett ER-diagram, och du skriver relationsschemat. Rättningen bryr sig om ' +
             '**vad som identifierar och vad som refererar vad** — inte om vad du döper ' +
             'relationerna eller de främmande nycklarna till.',
      lista: function () { return S.erschema || []; } },

    { id: 'normalisering', namn: 'Normalisering',
      kort: 'Tentans uppgift 3 · 20 p',
      intro: 'En relation med sina funktionella beroenden. Ange högsta normalform, och ' +
             'om den inte redan är i 3NF: dela upp den och ange primärnyckel för varje ' +
             'relation. **Att dela upp mer än 3NF kräver är övernormalisering** och ger avdrag.',
      lista: function () { return normalisering; } }
  ];

  function familjen() {
    return FAMILJER.filter(function (f) { return f.id === familj; })[0];
  }

  function uppgifter() { return familjen().lista(); }

  function aktuell() {
    var lista = uppgifter();
    if (!lista.length) return null;
    var id = vald[familj];
    return lista.filter(function (u) { return u.id === id; })[0] || lista[0];
  }

  /* ---------------------------------------------------------------- */
  /* Schemaspråket                                                     */
  /* ---------------------------------------------------------------- */

  /* Tolkar ett skrivet relationsschema. Accepterar med flit flera
     skrivsätt, eftersom understrykning inte går att skriva i en textruta:

       Person(_Name_, Address, Salary)
       Person(Name*, Address, Salary)
       Person(Name, Address, Salary)   PK = {Name}
       R1(A, B) PK = A

     Returnerar [{ namn, attribut:[…], nyckel:[…] }]. */
  function tolkaSchema(text) {
    var relationer = [];

    String(text || '').split('\n').forEach(function (rad) {
      rad = rad.trim();
      if (!rad) return;

      var m = /^([A-Za-z_][\w]*)\s*\(([^)]*)\)\s*(.*)$/.exec(rad);
      if (!m) {
        /* En ensam PK-rad hör till relationen ovanför */
        var pk = /^(?:PK|primärnyckel|primarnyckel)\s*[:=]\s*\{?([^}]*)\}?$/i.exec(rad);
        if (pk && relationer.length) {
          relationer[relationer.length - 1].nyckel = dela(pk[1]);
        }
        return;
      }

      var namn = m[1];
      var innehall = m[2];
      var svans = m[3] || '';

      var attribut = [], nyckel = [];

      /* Här måste råtexten läsas, inte den rensade — det är just
         understrecken och stjärnorna som säger vad som är nyckel. */
      rader(innehall).forEach(function (a) {
        var ren = a, arNyckel = false;

        if (/^_.+_$/.test(ren)) { ren = ren.slice(1, -1); arNyckel = true; }
        if (/\*$/.test(ren))    { ren = ren.slice(0, -1); arNyckel = true; }
        if (/^\*/.test(ren))    { ren = ren.slice(1);     arNyckel = true; }

        ren = ren.trim();
        if (!ren) return;
        attribut.push(ren);
        if (arNyckel) nyckel.push(ren);
      });

      var pkSvans = /(?:PK|primärnyckel|primarnyckel)\s*[:=]\s*\{?([^}]*)\}?/i.exec(svans);
      if (pkSvans) nyckel = dela(pkSvans[1]);

      relationer.push({ namn: namn, attribut: attribut, nyckel: nyckel });
    });

    return relationer;

    /* Rå uppdelning: bara trimning, markörerna lämnas kvar. */
    function rader(s) {
      return String(s).split(',')
        .map(function (x) { return x.trim(); })
        .filter(Boolean);
    }

    /* Rensad uppdelning, för listor där allt redan ÄR nyckel — som PK = {…}. */
    function dela(s) {
      return rader(s)
        .map(function (x) { return x.replace(/^_|_$/g, '').replace(/^\*|\*$/g, '').trim(); })
        .filter(Boolean);
    }
  }

  function lika(a, b) { return String(a).toLowerCase() === String(b).toLowerCase(); }
  function harNamn(lista, namn) {
    return lista.some(function (x) { return lika(x, namn); });
  }

  /* ---------------------------------------------------------------- */
  /* Rättning: ER till schema                                          */
  /* ---------------------------------------------------------------- */

  function rattaSchema(uppgift, text) {
    var mina = tolkaSchema(text);
    var facit = uppgift.facit;

    if (!mina.length) {
      return { poang: 0, max: facit.length, fel: ['Inget schema att rätta. Skriv minst en relation.'], rader: [] };
    }

    var kvar = mina.slice();
    var rader = [], poang = 0;

    facit.forEach(function (f) {
      /* Para ihop med den skrivna relation som delar flest attributnamn.
         Namnet på relationen används inte — det är en smaksak. */
      var bast = null, bastPoang = -1;
      kvar.forEach(function (m) {
        var traffar = f.attribut.filter(function (a) { return harNamn(m.attribut, a); }).length;
        var namnbonus = lika(m.namn, f.namn) ? 0.5 : 0;
        if (traffar + namnbonus > bastPoang) { bastPoang = traffar + namnbonus; bast = m; }
      });

      if (!bast) {
        rader.push({ facit: f, ok: false, brister: ['Relationen saknas helt.'] });
        return;
      }
      kvar.splice(kvar.indexOf(bast), 1);

      var brister = [];

      var saknade = f.attribut.filter(function (a) { return !harNamn(bast.attribut, a); });
      if (saknade.length) brister.push('Saknar ' + saknade.join(', ') + '.');

      /* Allt utöver facits egna attribut ska vara främmande nycklar */
      var extra = bast.attribut.filter(function (a) { return !harNamn(f.attribut, a); });
      var vantadeFk = f.fkAntal || 0;
      if (extra.length < vantadeFk) {
        brister.push('Saknar ' + (vantadeFk - extra.length) + ' främmande nyckel' +
                     (vantadeFk - extra.length === 1 ? '' : 'ar') +
                     ' mot ' + unika(f.fkMot).join(' och ') + '.');
      } else if (extra.length > vantadeFk) {
        brister.push('Har ' + (extra.length - vantadeFk) + ' attribut för mycket: ' +
                     extra.join(', ') + '.');
      }

      var vantadNyckel = f.nyckel.length + (f.nyckelArFk ? vantadeFk : 0);
      var saknadeINyckel = f.nyckel.filter(function (a) { return !harNamn(bast.nyckel, a); });
      if (!bast.nyckel.length) {
        brister.push('Ingen primärnyckel utmärkt. Skriv _Attribut_ eller PK = {…}.');
      } else if (saknadeINyckel.length) {
        brister.push('Primärnyckeln ska innehålla ' + saknadeINyckel.join(', ') + '.');
      } else if (bast.nyckel.length !== vantadNyckel) {
        brister.push('Primärnyckeln ska bestå av ' + vantadNyckel + ' attribut, du har ' +
                     bast.nyckel.length + '.');
      }

      var ok = !brister.length;
      if (ok) poang++;
      rader.push({ facit: f, mitt: bast, ok: ok, brister: brister });
    });

    var fel = [];
    if (kvar.length) {
      fel.push(kvar.length + ' relation' + (kvar.length === 1 ? '' : 'er') +
               ' för mycket: ' + kvar.map(function (m) { return m.namn; }).join(', ') +
               '. Kontrollera om du gjort en egen tabell av något som skulle blivit ' +
               'en främmande nyckel.');
    }

    return { poang: poang, max: facit.length, rader: rader, fel: fel };

    function unika(lista) {
      return (lista || []).filter(function (x, i, a) { return a.indexOf(x) === i; });
    }
  }

  /* ---------------------------------------------------------------- */
  /* Rättning: normalisering                                           */
  /* ---------------------------------------------------------------- */

  function rattaNormalisering(uppgift, nivaSvar, text) {
    var a = uppgift.analys;
    var delar = [];
    var poang = 0, max = uppgift.baraForm ? 1 : 2;

    var nivaRatt = Number(nivaSvar) === a.niva;
    delar.push({
      rubrik: 'Högsta normalform',
      ok: nivaRatt,
      mitt: nivaSvar ? nivaSvar + 'NF' : 'inget svar',
      facit: a.niva + 'NF',
      skal: nivaForklaring(a)
    });
    if (nivaRatt) poang++;

    if (!uppgift.baraForm) {
      if (a.redan3NF) {
        /* Redan i 3NF: ingen uppdelning ska göras. Att dela upp ändå är
           övernormalisering, och det ger avdrag på tentan. */
        var skrivet = tolkaSchema(text);
        var ok = skrivet.length <= 1;
        delar.push({
          rubrik: 'Uppdelning',
          ok: ok,
          mitt: skrivet.length ? skrivet.length + ' relationer' : 'ingen uppdelning',
          facit: 'ingen — R är redan i 3NF',
          skal: ok
            ? 'Rätt. R är redan i 3NF, så den ska lämnas som den är.'
            : 'Övernormalisering. R är redan i 3NF och ska inte delas upp. ' +
              'Att dela upp mer än nödvändigt ger avdrag på tentan.'
        });
        if (ok) poang++;
      } else {
        var mina = tolkaSchema(text);
        var facit = a.uppdelning;

        var minaSet = mina.map(function (r) { return S.normalform.mangd(r.attribut.join('')); }).sort();
        var facitSet = facit.map(function (r) { return S.normalform.mangd(r.attribut); }).sort();

        var sammaRelationer = minaSet.length === facitSet.length &&
          minaSet.every(function (v, i) { return v === facitSet[i]; });

        var brister = [];
        if (!mina.length) {
          brister.push('Ingen uppdelning skriven.');
        } else if (!sammaRelationer) {
          var saknas = facitSet.filter(function (f) { return minaSet.indexOf(f) === -1; });
          var forMycket = minaSet.filter(function (m) { return facitSet.indexOf(m) === -1; });
          if (saknas.length) brister.push('Saknar R(' + saknas.map(kommatera).join('), R(') + ').');
          if (forMycket.length) brister.push('Har R(' + forMycket.map(kommatera).join('), R(') + ') som inte hör dit.');
        } else {
          /* Rätt relationer — kontrollera nycklarna */
          facit.forEach(function (f) {
            var mattr = S.normalform.mangd(f.attribut);
            var min = mina.filter(function (r) {
              return S.normalform.mangd(r.attribut.join('')) === mattr;
            })[0];
            if (!min) return;
            var minNyckel = S.normalform.mangd(min.nyckel.join(''));
            var ratt = S.normalform.mangd(f.nyckel);
            if (!minNyckel) brister.push('R(' + kommatera(mattr) + ') saknar utmärkt primärnyckel.');
            else if (minNyckel !== ratt) {
              brister.push('R(' + kommatera(mattr) + ') ska ha primärnyckeln ' +
                           kommatera(ratt) + ', du skrev ' + kommatera(minNyckel) + '.');
            }
          });
        }

        var uppOk = !brister.length && mina.length > 0;
        if (uppOk) poang++;

        delar.push({
          rubrik: 'Uppdelning till 3NF',
          ok: uppOk,
          mitt: mina.length ? mina.map(function (r) {
            return 'R(' + r.attribut.join(', ') + ')' +
                   (r.nyckel.length ? ' PK = ' + r.nyckel.join(', ') : '');
          }).join('   ') : 'inget svar',
          facit: facit.map(function (r) {
            return 'R(' + kommatera(r.attribut) + ') PK = ' + kommatera(r.nyckel);
          }).join('   '),
          skal: brister.length ? brister.join(' ') : 'Rätt uppdelning, och rätt primärnycklar.'
        });
      }
    }

    return { poang: poang, max: max, delar: delar };
  }

  function kommatera(s) { return String(s).split('').join(', '); }

  /* "{A}, {B} och {C}" — inte "{A} och {B} och {C}". */
  function raddaUpp(delar) {
    if (delar.length < 2) return delar[0] || '';
    return delar.slice(0, -1).join(', ') + ' och ' + delar[delar.length - 1];
  }

  function nivaForklaring(a) {
    var nycklar = raddaUpp(a.nycklar.map(kommatera).map(function (n) { return '{' + n + '}'; }));
    var flera = a.nycklar.length > 1;
    var ord = flera ? 'Kandidatnycklar: ' : 'Kandidatnyckel: ';

    if (a.niva === 3) {
      return ord + nycklar + '. Varje beroende har en supernyckel till vänster, ' +
             'eller ett primärattribut till höger. Alltså 3NF.';
    }
    if (a.niva === 2) {
      return ord + nycklar + '. Inget icke-primärattribut beror på en del av ' +
             'nyckeln, så 2NF håller — men något beror transitivt via ett icke-primärattribut, ' +
             'och då faller 3NF.';
    }
    return ord + nycklar + '. Ett icke-primärattribut beror på en ÄKTA DEL av ' +
           'nyckeln. Det är ett partiellt beroende, och redan 2NF faller.';
  }

  /* ---------------------------------------------------------------- */
  /* Rendering                                                         */
  /* ---------------------------------------------------------------- */

  function rendera() {
    var vy = U.el('vy-modellera');
    var f = familjen();

    var h = '<div class="sida">';
    h += '<div class="huvud">' + huvud(f) + '</div>';
    h += '<aside class="sido">' + sidolista() + '</aside>';
    h += '</div>';

    vy.innerHTML = h;
    koppla(vy);
  }

  function huvud(f) {
    var h = '<div class="kort">';
    h += '<h2>Modellera</h2>';
    h += '<p class="muted liten">Databastentans tre skrivuppgifter. Tillsammans är de ' +
         'värda <strong>70 av 100 poäng</strong>. Den fjärde, SQL-frågan, tränar du i ' +
         'SQL-verkstaden.</p>';

    h += '<div class="chiprad">';
    FAMILJER.forEach(function (x) {
      var lista = x.lista();
      var idn = lista.map(function (u) { return u.id; });
      var sum = S.store.modelleraSummering(idn);
      h += '<button class="chip' + (x.id === familj ? ' vald' : '') +
           '" data-familj="' + x.id + '">' + U.esc(x.namn) +
           ' <span class="antal">' + sum.klara + '/' + lista.length + '</span></button>';
    });
    h += '</div>';
    h += '<div class="notis info" style="margin:.9rem 0 0"><strong>' + U.esc(f.kort) +
         '.</strong> ' + U.inline(f.intro) + '</div>';
    h += '</div>';

    var u = aktuell();
    if (!u) return h + '<div class="kort"><p class="muted">Inga uppgifter här än.</p></div>';

    if (familj === 'lasdiagram') return h + lasdiagramKort(u);
    if (familj === 'erschema') return h + erschemaKort(u);
    return h + normaliseringKort(u);
  }

  /* --- Läsa diagram --- */

  function lasdiagramKort(u) {
    var res = svar[u.id];
    var mark = markerade[u.id] || {};

    var h = '<div class="kort">';
    h += uppgiftshuvud(u.titel, u.kalla, u.id);
    h += '<div class="lastext">' + S.diagram.chenFigur(u.diagram, 'ER-diagram: ' + u.titel, u.beskrivning) + '</div>';

    h += '<p class="muted liten">Markera samtliga påståenden som är korrekta utifrån ' +
         'diagrammet. <strong>+5 p</strong> för varje rätt markerat, <strong>−3 p</strong> ' +
         'för varje felaktigt markerat, 0 p för omarkerat.</p>';

    h += '<ol class="pastaenden">';
    u.pastaenden.forEach(function (p, i) {
      var i_markerad = !!mark[i];
      var klass = '';
      if (res) {
        if (p.sant && i_markerad) klass = ' ratt';
        else if (!p.sant && i_markerad) klass = ' fel';
        else if (p.sant && !i_markerad) klass = ' missad';
      }
      h += '<li class="pastaende' + klass + (i_markerad ? ' markerad' : '') + '">';
      h += '<label><input type="checkbox" data-pastaende="' + i + '"' +
           (i_markerad ? ' checked' : '') + (res ? ' disabled' : '') + '> ' +
           U.inline(p.text) + '</label>';
      if (res) {
        h += '<div class="pastaende-skal"><strong>' +
             (p.sant ? 'Sant' : 'Falskt') + '.</strong> ' + U.inline(p.skal) + '</div>';
      }
      h += '</li>';
    });
    h += '</ol>';

    if (!res) {
      var antal = Object.keys(mark).filter(function (k) { return mark[k]; }).length;
      h += '<div class="knapprad"><button class="primar" id="m-ratta">Rätta</button>' +
           '<span class="muted liten" style="align-self:center">' + antal + ' markerade</span></div>';
    } else {
      h += resultatruta(res);
      h += '<div class="knapprad"><button class="sekundar" id="m-igen">Gör om</button>' +
           '<button class="primar" id="m-nasta">Nästa uppgift →</button></div>';
    }

    h += '</div>';
    return h;
  }

  function rattaLasdiagram(u) {
    var mark = markerade[u.id] || {};
    var poang = 0, ratt = 0, felaktiga = 0, missade = 0;

    u.pastaenden.forEach(function (p, i) {
      if (mark[i]) {
        if (p.sant) { poang += 5; ratt++; }
        else { poang -= 3; felaktiga++; }
      } else if (p.sant) missade++;
    });

    var maxPoang = 25;
    /* Tentan ger 25 p för alla och endast de korrekta, oavsett hur många
       de är. Vi normaliserar på samma sätt. */
    var antalSanna = u.pastaenden.filter(function (p) { return p.sant; }).length;
    var normerad = Math.max(0, Math.round(poang / (antalSanna * 5) * maxPoang));

    return {
      poang: normerad, max: maxPoang, rapoang: poang,
      ratt: ratt, felaktiga: felaktiga, missade: missade,
      text: ratt + ' rätt markerade, ' + felaktiga + ' felaktigt markerade, ' +
            missade + ' missade.' +
            (felaktiga ? ' De felaktiga kostade ' + (felaktiga * 3) + ' p.' : '')
    };
  }

  /* --- ER till schema --- */

  function erschemaKort(u) {
    var res = svar[u.id];

    var h = '<div class="kort">';
    h += uppgiftshuvud(u.titel, u.kalla, u.id);
    h += '<p class="provtext">' + U.inline(u.ledtext) + '</p>';
    h += '<div class="lastext">' + S.diagram.chenFigur(u.diagram, 'ER-diagram: ' + u.titel, '') + '</div>';

    h += '<h3>Ditt relationsschema</h3>';
    h += '<p class="muted liten">En relation per rad. Märk primärnyckeln med ' +
         '<code>_understreck_</code> runt attributet, eller skriv ' +
         '<code>PK = {…}</code> efter relationen.</p>';
    h += '<pre class="kodruta exempel">Person(_Name_, Address, Salary)\n' +
         'Car(_LicenseNumber_, Brand, Speed, OwnerName)</pre>';

    h += '<textarea id="m-schema" class="sqlfalt" spellcheck="false" rows="8" ' +
         (res ? 'readonly ' : '') + 'placeholder="Relation(_Nyckel_, attribut, …)">' +
         U.esc(utkast[u.id] || '') + '</textarea>';

    if (!res) {
      h += '<div class="knapprad"><button class="primar" id="m-ratta">Rätta</button></div>';
    } else {
      h += schemaFacit(u, res);
      h += '<div class="knapprad"><button class="sekundar" id="m-igen">Gör om</button>' +
           '<button class="primar" id="m-nasta">Nästa uppgift →</button></div>';
    }

    h += '</div>';
    return h;
  }

  function schemaFacit(u, res) {
    var h = resultatruta(res);

    h += '<h3>Rättning, relation för relation</h3>';
    h += '<div class="schemarader">';
    res.rader.forEach(function (r) {
      h += '<div class="schemarad ' + (r.ok ? 'ratt' : 'fel') + '">';
      h += '<span class="schemaikon">' + (r.ok ? '✓' : '✕') + '</span>';
      h += '<div><code>' + U.esc(facittext(r.facit)) + '</code>';
      if (!r.ok) {
        h += '<div class="liten" style="margin-top:.3rem">' +
             r.brister.map(U.esc).join(' ') + '</div>';
      }
      h += '</div></div>';
    });
    h += '</div>';

    if (res.fel.length) {
      h += '<div class="notis">' + res.fel.map(U.esc).join(' ') + '</div>';
    }
    h += '<div class="notis info">' + U.inline(u.forklaring) + '</div>';
    return h;
  }

  function facittext(f) {
    var delar = [];
    var nyckelSet = f.nyckel || [];

    f.attribut.forEach(function (a) {
      delar.push(nyckelSet.indexOf(a) > -1 ? '_' + a + '_' : a);
    });
    (f.fkMot || []).forEach(function (mot, i) {
      var text = 'FK→' + mot;
      delar.push(f.nyckelArFk ? '_' + text + '_' : text);
    });
    return f.namn + '(' + delar.join(', ') + ')';
  }

  /* --- Normalisering --- */

  function normaliseringKort(u) {
    var res = svar[u.id];
    var valdNiva = normalval[u.id];

    var h = '<div class="kort">';
    h += uppgiftshuvud(u.grupp + ', relation ' + u.nr, u.kalla, u.id);

    h += '<div class="relationsruta">';
    h += '<div class="relationsnamn">R(' + kommatera(u.attribut) + ')</div>';
    h += '<ul class="fdlista">';
    u.fd.forEach(function (par) {
      h += '<li>' + kommatera(par[0]).replace(/, /g, '') +
           (par[0].length > 1 ? '' : '') + ' <span class="pil">→</span> ' +
           (par[1].length > 1 ? '{' + kommatera(par[1]) + '}' : par[1]) + '</li>';
    });
    if (!u.fd.length) h += '<li class="muted">Inga funktionella beroenden.</li>';
    h += '</ul></div>';

    h += '<h3>Högsta normalform</h3>';
    h += '<div class="nivaval">';
    [1, 2, 3].forEach(function (n) {
      var i = valdNiva === n;
      h += '<label class="provalt' + (i ? ' vald' : '') + '">' +
           '<input type="radio" name="m-niva" value="' + n + '"' +
           (i ? ' checked' : '') + (res ? ' disabled' : '') + '>' +
           '<span>R är i <strong>' + n + 'NF</strong>' +
           (n === 3 ? ' — och behöver alltså inte delas upp' : '') + '</span></label>';
    });
    h += '</div>';

    if (!u.baraForm) {
      h += '<h3>Uppdelning</h3>';
      h += '<p class="muted liten">Behövs bara om R inte är i 3NF. En relation per rad, ' +
           'med primärnyckeln märkt: <code>R1(_A_, B)</code>.</p>';
      h += '<textarea id="m-schema" class="sqlfalt" spellcheck="false" rows="5" ' +
           (res ? 'readonly ' : '') + 'placeholder="R1(_A_, B)">' +
           U.esc(utkast[u.id] || '') + '</textarea>';
    }

    if (!res) {
      h += '<div class="knapprad"><button class="primar" id="m-ratta">Rätta</button></div>';
    } else {
      h += resultatruta(res);
      res.delar.forEach(function (d) {
        h += '<div class="schemarad ' + (d.ok ? 'ratt' : 'fel') + '">';
        h += '<span class="schemaikon">' + (d.ok ? '✓' : '✕') + '</span>';
        h += '<div><strong>' + U.esc(d.rubrik) + '</strong>';
        if (!d.ok) {
          h += '<div class="liten">Ditt svar: ' + U.esc(d.mitt) + '<br>' +
               'Facit: <code>' + U.esc(d.facit) + '</code></div>';
        }
        h += '<div class="liten" style="margin-top:.3rem">' + U.esc(d.skal) + '</div>';
        h += '</div></div>';
      });
      h += '<div class="knapprad"><button class="sekundar" id="m-igen">Gör om</button>' +
           '<button class="primar" id="m-nasta">Nästa uppgift →</button></div>';
    }

    h += '</div>';
    return h;
  }

  /* --- Gemensamt --- */

  function uppgiftshuvud(titel, kalla, id) {
    var post = S.store.modelleraPost(id);
    var h = '<div class="sqlhuvud">';
    h += '<span class="markor aktuell">' + U.esc(titel) + '</span>';
    h += '<span class="sqldbmarke">' + U.esc(kalla) + '</span>';
    if (post) {
      var klar = post.poang >= post.max;
      h += '<span class="nivaetikett ' + (klar ? 'ne-5' : 'ne-3') + '">' +
           (klar ? '✓ Klar' : post.poang + '/' + post.max + ' p') + '</span>';
    }
    h += '</div>';
    return h;
  }

  function resultatruta(res) {
    var full = res.poang >= res.max;
    var h = '<div class="facitbox ' + (full ? 'ratt' : '') + '" style="margin-top:1rem">';
    h += '<div class="facitrubrik"><span class="facitikon ' +
         (full ? 'ratt">✓' : 'neutral">–') + '</span>';
    h += '<h3 style="margin:0">' + res.poang + ' av ' + res.max + ' poäng</h3></div>';
    if (res.text) h += '<p class="liten" style="margin-bottom:0">' + U.esc(res.text) + '</p>';
    h += '</div>';
    return h;
  }

  function sidolista() {
    var lista = uppgifter();
    var u = aktuell();

    var h = '<div class="kort"><h2>Uppgifter</h2>';
    var idn = lista.map(function (x) { return x.id; });
    var sum = S.store.modelleraSummering(idn);
    h += '<p class="muted mini">' + sum.klara + ' av ' + lista.length + ' klara.</p>';

    var grupp = null;
    h += '<div class="sqluppgifter">';
    lista.forEach(function (x, i) {
      if (x.grupp && x.grupp !== grupp) {
        grupp = x.grupp;
        h += '</div><h3 class="uppgiftsgrupp">' + U.esc(grupp) + '</h3><div class="sqluppgifter">';
      }
      var post = S.store.modelleraPost(x.id);
      var klar = post && post.poang >= post.max;
      var delvis = post && !klar;
      h += '<button class="sqluppgift' + (u && x.id === u.id ? ' vald' : '') +
           (klar ? ' last' : (delvis ? ' last-hjalp' : '')) +
           '" data-uppgift="' + U.esc(x.id) + '">';
      h += '<span class="sqlu-nr">' + (klar ? '✓' : (x.nr || (i + 1))) + '</span>';
      h += '<span class="sqlu-text">' + U.esc(x.titel || ('R(' + kommatera(x.attribut) + ')')) +
           '</span></button>';
    });
    h += '</div></div>';
    return h;
  }

  /* ---------------------------------------------------------------- */
  /* Händelser                                                         */
  /* ---------------------------------------------------------------- */

  function koppla(vy) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-familj]'), function (b) {
      b.addEventListener('click', function () { familj = b.dataset.familj; rendera(); });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-uppgift]'), function (b) {
      b.addEventListener('click', function () {
        vald[familj] = b.dataset.uppgift;
        rendera();
        window.scrollTo(0, 0);
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('[data-pastaende]'), function (c) {
      c.addEventListener('change', function () {
        var u = aktuell();
        markerade[u.id] = markerade[u.id] || {};
        markerade[u.id][c.dataset.pastaende] = c.checked;
        c.closest('.pastaende').classList.toggle('markerad', c.checked);
        var r = vy.querySelector('#m-ratta');
        if (r && r.nextElementSibling) {
          var n = Object.keys(markerade[u.id]).filter(function (k) { return markerade[u.id][k]; }).length;
          r.nextElementSibling.textContent = n + ' markerade';
        }
      });
    });

    Array.prototype.forEach.call(vy.querySelectorAll('input[name=m-niva]'), function (r) {
      r.addEventListener('change', function () {
        var u = aktuell();
        normalval[u.id] = parseInt(r.value, 10);
        Array.prototype.forEach.call(vy.querySelectorAll('.nivaval .provalt'), function (l) {
          l.classList.toggle('vald', l.querySelector('input').checked);
        });
      });
    });

    var falt = vy.querySelector('#m-schema');
    if (falt) {
      falt.addEventListener('input', function () {
        var u = aktuell();
        utkast[u.id] = falt.value;
      });
    }

    var ratta = vy.querySelector('#m-ratta');
    if (ratta) ratta.addEventListener('click', function () {
      var u = aktuell();
      var res;

      if (familj === 'lasdiagram') res = rattaLasdiagram(u);
      else if (familj === 'erschema') res = rattaSchema(u, utkast[u.id] || '');
      else res = rattaNormalisering(u, normalval[u.id], utkast[u.id] || '');

      svar[u.id] = res;
      S.store.sparaModellera(u.id, res.poang, res.max);
      rendera();
    });

    var igen = vy.querySelector('#m-igen');
    if (igen) igen.addEventListener('click', function () {
      var u = aktuell();
      delete svar[u.id];
      delete markerade[u.id];
      delete normalval[u.id];
      utkast[u.id] = '';
      rendera();
    });

    var nasta = vy.querySelector('#m-nasta');
    if (nasta) nasta.addEventListener('click', function () {
      var lista = uppgifter();
      var u = aktuell();
      var i = lista.map(function (x) { return x.id; }).indexOf(u.id);
      vald[familj] = lista[Math.min(i + 1, lista.length - 1)].id;
      rendera();
      window.scrollTo(0, 0);
    });
  }

  return { rendera: rendera };
})();
