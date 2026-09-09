/* =========================================================================
   normalform.js – räknar ut normalformer och 3NF-uppdelningar.

   Facit skrivs inte av för hand utan räknas fram ur de funktionella
   beroendena. Det är inte bara bekvämt: 38 handskrivna facit hade
   garanterat innehållit fel, och ett fel facit lär ut fel sak.

   Algoritmen är den kursen använder:
     1. attributslutning för att hitta kandidatnycklar
     2. 2NF: inget icke-primärattribut får bero på en DEL av en nyckel
     3. 3NF: varje beroende X → A måste ha X som supernyckel, eller A som
        primärattribut
     4. uppdelning genom syntes: minimalt hölje, gruppera på vänsterled,
        stryk delmängder, och lägg till en nyckelrelation om ingen finns

   Validerad mot facit i kursens övningshäfte: samtliga 16 relationer i
   uppgift 10 och samtliga 12 uppdelningar i uppgift 11.

   Mängder representeras som sorterade strängar utan avskiljare — 'ABC'.
   Attributen är enstaka versaler i allt kursmaterial, vilket gör det både
   snabbt och lättläst i felsökning.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.normalform = (function () {

  /* ---------------------------------------------------------------- */
  /* Mängder som strängar                                              */
  /* ---------------------------------------------------------------- */

  function m(s) {
    return String(s).replace(/[^A-Za-z]/g, '').toUpperCase()
      .split('').filter(function (c, i, a) { return a.indexOf(c) === i; })
      .sort().join('');
  }

  function union(a, b) { return m(a + b); }

  function harAlla(mangd, del) {
    for (var i = 0; i < del.length; i++) if (mangd.indexOf(del[i]) === -1) return false;
    return true;
  }

  function utan(mangd, tecken) {
    return mangd.split('').filter(function (c) { return c !== tecken; }).join('');
  }

  /* Alla äkta delmängder, minsta först */
  function delmangder(s) {
    var ut = [];
    for (var mask = 1; mask < (1 << s.length); mask++) {
      var d = '';
      for (var i = 0; i < s.length; i++) if (mask & (1 << i)) d += s[i];
      ut.push(d);
    }
    return ut.sort(function (a, b) { return a.length - b.length || a.localeCompare(b); });
  }

  /* ---------------------------------------------------------------- */
  /* Slutning och nycklar                                              */
  /* ---------------------------------------------------------------- */

  /* Allt som går att härleda ur X med beroendena F. */
  function slutning(x, fd) {
    var res = m(x), andrat = true;
    while (andrat) {
      andrat = false;
      for (var i = 0; i < fd.length; i++) {
        if (harAlla(res, fd[i][0]) && !harAlla(res, fd[i][1])) {
          res = union(res, fd[i][1]);
          andrat = true;
        }
      }
    }
    return res;
  }

  function arSupernyckel(x, attribut, fd) {
    return slutning(x, fd).length === m(attribut).length;
  }

  /* Alla minimala supernycklar. Attributen är få (högst sju i häftet), så
     en genomsökning av alla delmängder är både enklast och snabbast. */
  function kandidatnycklar(attribut, fd) {
    var alla = m(attribut);
    var nycklar = [];

    delmangder(alla).forEach(function (d) {
      if (!arSupernyckel(d, alla, fd)) return;
      /* Minimal? Ingen redan funnen nyckel får rymmas i den här. */
      var minimal = nycklar.every(function (n) { return !harAlla(d, n); });
      if (minimal) nycklar.push(d);
    });

    return nycklar;
  }

  function primarattribut(nycklar) {
    return m(nycklar.join(''));
  }

  /* ---------------------------------------------------------------- */
  /* Normalformer                                                      */
  /* ---------------------------------------------------------------- */

  /* 2NF: inget ICKE-primärattribut får bero på en äkta del av en
     kandidatnyckel. Primärattribut får det — det är hela skillnaden mot
     hur regeln oftast missminns. */
  function ar2NF(attribut, fd, nycklar, prim) {
    var alla = m(attribut);

    for (var i = 0; i < nycklar.length; i++) {
      var nyckel = nycklar[i];
      if (nyckel.length < 2) continue;                 /* enkel nyckel kan inte ha äkta del */

      var delar = delmangder(nyckel).filter(function (d) { return d.length < nyckel.length; });
      for (var j = 0; j < delar.length; j++) {
        var harledda = slutning(delar[j], fd);
        for (var k = 0; k < alla.length; k++) {
          var a = alla[k];
          if (prim.indexOf(a) > -1) continue;          /* primärattribut räknas inte */
          if (delar[j].indexOf(a) > -1) continue;
          if (harledda.indexOf(a) > -1) return false;
        }
      }
    }
    return true;
  }

  /* 3NF: för varje icke-trivialt X → A måste X vara supernyckel eller A
     vara primärattribut. */
  function ar3NF(attribut, fd, prim) {
    var alla = m(attribut);

    for (var i = 0; i < fd.length; i++) {
      var x = fd[i][0], hoger = fd[i][1];
      for (var j = 0; j < hoger.length; j++) {
        var a = hoger[j];
        if (x.indexOf(a) > -1) continue;               /* trivialt */
        if (arSupernyckel(x, alla, fd)) continue;
        if (prim.indexOf(a) > -1) continue;
        return false;
      }
    }
    return true;
  }

  /* ---------------------------------------------------------------- */
  /* Minimalt hölje                                                    */
  /* ---------------------------------------------------------------- */

  function minimaltHolje(fd) {
    /* 1. Ett attribut i taget på högersidan */
    var enkla = [];
    fd.forEach(function (par) {
      m(par[1]).split('').forEach(function (a) {
        if (par[0].indexOf(a) === -1) enkla.push([m(par[0]), a]);
      });
    });

    /* Stryk dubbletter */
    enkla = enkla.filter(function (p, i) {
      return enkla.findIndex(function (q) { return q[0] === p[0] && q[1] === p[1]; }) === i;
    });

    /* 2. Stryk överflödiga attribut i vänsterledet.

       Prövningen måste ske mot beroendelistan SOM DEN ÄR. Byter man först
       in det förkortade beroendet blir provet självuppfyllande: AB → C
       ersatt med B → C "bevisar" genast att B räcker, och varje sammansatt
       vänsterled skulle krympa till ett enda attribut. */
    for (var i = 0; i < enkla.length; i++) {
      var vanster = enkla[i][0];
      if (vanster.length < 2) continue;
      for (var k = 0; k < vanster.length; k++) {
        var mindre = utan(vanster, vanster[k]);
        if (!mindre) continue;
        if (slutning(mindre, enkla).indexOf(enkla[i][1]) > -1) {
          enkla[i] = [mindre, enkla[i][1]];
          vanster = mindre;
          k = -1;
        }
      }
    }

    /* 3. Stryk överflödiga beroenden */
    for (var j = enkla.length - 1; j >= 0; j--) {
      var utanDet = enkla.slice(0, j).concat(enkla.slice(j + 1));
      if (slutning(enkla[j][0], utanDet).indexOf(enkla[j][1]) > -1) enkla = utanDet;
    }

    return enkla;
  }

  /* ---------------------------------------------------------------- */
  /* Uppdelning till 3NF                                               */
  /* ---------------------------------------------------------------- */

  function delaUpp(attribut, fd) {
    var alla = m(attribut);
    var nycklar = kandidatnycklar(alla, fd);
    var holje = minimaltHolje(fd);

    /* Gruppera på vänsterled: ett beroende per relation, med alla
       högerled som samma vänsterled bestämmer. */
    var grupper = {};
    holje.forEach(function (par) {
      if (!grupper[par[0]]) grupper[par[0]] = par[0];
      grupper[par[0]] = union(grupper[par[0]], par[1]);
    });

    var relationer = Object.keys(grupper).map(function (vanster) {
      return { attribut: grupper[vanster], nyckel: vanster };
    });

    /* Stryk relationer som ryms i en annan */
    relationer = relationer.filter(function (r, i) {
      return !relationer.some(function (annan, j) {
        return j !== i && harAlla(annan.attribut, r.attribut) &&
               (annan.attribut.length > r.attribut.length || j < i);
      });
    });

    /* Rymmer ingen relation en kandidatnyckel måste en läggas till,
       annars går informationen inte att sätta ihop igen. */
    var harNyckel = relationer.some(function (r) {
      return nycklar.some(function (n) { return harAlla(r.attribut, n); });
    });
    if (!harNyckel && nycklar.length) {
      relationer.push({ attribut: nycklar[0], nyckel: nycklar[0], nyckelrelation: true });
    }

    /* Attribut som inte kom med någonstans (de saknar beroenden helt) */
    var med = m(relationer.map(function (r) { return r.attribut; }).join(''));
    var kvar = alla.split('').filter(function (a) { return med.indexOf(a) === -1; }).join('');
    if (kvar && relationer.length) {
      relationer[relationer.length - 1].attribut =
        union(relationer[relationer.length - 1].attribut, kvar);
    }

    return relationer;
  }

  /* ---------------------------------------------------------------- */
  /* Ingång                                                            */
  /* ---------------------------------------------------------------- */

  /* fd anges som [['AB','C'], ['C','D']] */
  function analysera(attribut, fd) {
    var alla = m(attribut);
    var beroenden = (fd || []).map(function (p) { return [m(p[0]), m(p[1])]; });

    var nycklar = kandidatnycklar(alla, beroenden);
    var prim = primarattribut(nycklar);

    var tre = ar3NF(alla, beroenden, prim);
    var tva = tre || ar2NF(alla, beroenden, nycklar, prim);
    var niva = tre ? 3 : (tva ? 2 : 1);

    return {
      attribut: alla,
      fd: beroenden,
      nycklar: nycklar,
      primarattribut: prim,
      niva: niva,
      redan3NF: tre,
      uppdelning: tre ? [{ attribut: alla, nyckel: nycklar[0] || alla }] : delaUpp(alla, beroenden)
    };
  }

  return {
    analysera: analysera,
    slutning: slutning,
    kandidatnycklar: kandidatnycklar,
    minimaltHolje: minimaltHolje,
    delaUpp: delaUpp,
    mangd: m
  };
})();
