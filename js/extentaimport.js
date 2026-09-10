/* =========================================================================
   extentaimport.js – gör om en gammal tenta (PDF) till ett prov i appen.

   Tentorna skrivs INTE av in i appen. De är universitetets material och
   sidan är publik. I stället läser appen in den PDF du själv har — direkt i
   din webbläsare — och bygger provet ur den. Frågor och svarsalternativ blir
   därför exakt originalets, ord för ord och i samma ordning, utan att någon
   text ur tentan finns i koden eller på GitHub.

   Det appen själv bidrar med ligger i data/extentor.js: vilket alternativ
   som är rätt, en förklaring, och en kontrollsumma per fråga så att en
   feltolkad eller annan PDF upptäcks i stället för att rättas fel.

   Tolkningen bygger på hur Inspera skriver ut tentor:
     - varje fråga slutar med raden "Totalpoäng: N"
     - flervalsfrågor har raden "Välj ett alternativ:" före alternativen
     - en radbrytning inom ett alternativ ger ~12 pt till nästa rad, en ny
       rad mellan två alternativ ≥ 28 pt. Gränsen läggs på 20.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.extentaimport = (function () {

  var PDFJS = 'vendor/pdfjs/pdf.min.mjs';
  var WORKER = 'vendor/pdfjs/pdf.worker.min.mjs';

  var NY_ALTERNATIV = 20;     /* pt — över detta börjar ett nytt alternativ */
  var NYTT_STYCKE = 18;       /* pt — över detta börjar ett nytt stycke i frågetexten */

  /* ---------------------------------------------------------------- */
  /* Läsa PDF:en (bara i webbläsaren)                                  */
  /* ---------------------------------------------------------------- */

  var pdfjs = null;

  function laddaPdfjs() {
    if (pdfjs) return Promise.resolve(pdfjs);
    /* Dynamisk import, så att biblioteket (1,4 MB) bara hämtas av den som
       faktiskt läser in en tenta. */
    return import('../' + PDFJS).then(function (m) {
      m.GlobalWorkerOptions.workerSrc = WORKER;
      pdfjs = m;
      return m;
    });
  }

  /* Fil → sidor med textbitar och deras position. */
  function lasPdf(fil) {
    return fil.arrayBuffer().then(function (buf) {
      var start = String.fromCharCode.apply(null, new Uint8Array(buf.slice(0, 5)));

      /* Kursens filexport innehåller "PDF:er" som egentligen är zip-filer
         med fel ändelse (de börjar med PK). pdf.js ger då ett obegripligt
         fel — bättre att säga vad det är. */
      if (start.slice(0, 2) === 'PK') {
        throw new Error('filen är en zip-fil med ändelsen .pdf, inte en riktig PDF. ' +
                        'Ladda ner tentan igen som PDF, eller öppna den och välj Skriv ut → Spara som PDF');
      }
      if (start !== '%PDF-') throw new Error('filen är inte en PDF');

      return laddaPdfjs().then(function (lib) {
        return lib.getDocument({ data: new Uint8Array(buf) }).promise;
      });
    }).then(function (doc) {
      var sidor = [];
      var kedja = Promise.resolve();
      for (var n = 1; n <= doc.numPages; n++) {
        (function (nr) {
          kedja = kedja.then(function () {
            return doc.getPage(nr).then(function (s) { return s.getTextContent(); })
              .then(function (inn) { sidor.push(bitar(inn)); });
          });
        })(n);
      }
      return kedja.then(function () { return sidor; });
    });
  }

  function bitar(innehall) {
    return innehall.items.map(function (p) {
      return { s: p.str, x: p.transform[4], y: p.transform[5], w: p.width || 0, f: p.fontName };
    });
  }

  /* ---------------------------------------------------------------- */
  /* Från textbitar till rader                                         */
  /* ---------------------------------------------------------------- */

  /* Bitar på samma höjd blir en rad. Mellanslag sätts där det finns ett
     glapp mellan två bitar — annars blir "är inte en" till "ärinteen" när
     ordet i mitten är satt i ett annat typsnitt. Bitar i ett annat
     typsnitt än radens huvudtypsnitt markeras som betonade. */
  function tillRader(sida) {
    var grupper = [];

    sida.forEach(function (b) {
      if (b.s === undefined || b.s === '') return;
      var g = grupper.filter(function (x) { return Math.abs(x.y - b.y) < 2; })[0];
      if (!g) { g = { y: b.y, bitar: [] }; grupper.push(g); }
      g.bitar.push(b);
    });

    grupper.sort(function (a, b) { return b.y - a.y; });

    return grupper.map(function (g) {
      g.bitar.sort(function (a, b) { return a.x - b.x; });

      /* Radens huvudtypsnitt = det med flest tecken */
      var antal = {};
      g.bitar.forEach(function (b) {
        if (b.s.trim()) antal[b.f] = (antal[b.f] || 0) + b.s.length;
      });
      var huvud = Object.keys(antal).sort(function (a, b) { return antal[b] - antal[a]; })[0];

      var delar = [];
      var slut = null;
      g.bitar.forEach(function (b) {
        var text = b.s;
        if (!text.trim()) { if (delar.length) delar.push({ t: ' ', f: 0 }); slut = b.x + b.w; return; }
        if (slut !== null && b.x - slut > 1.2 && delar.length &&
            !/\s$/.test(delar[delar.length - 1].t) && !/^\s/.test(text)) {
          delar.push({ t: ' ', f: 0 });
        }
        delar.push({ t: text, f: (b.f !== huvud && Object.keys(antal).length > 1) ? 1 : 0 });
        slut = b.x + b.w;
      });

      return { y: g.y, x: g.bitar[0].x, delar: slaIhop(delar) };
    });
  }

  /* Intilliggande delar med samma betoning slås ihop. */
  function slaIhop(delar) {
    var ut = [];
    delar.forEach(function (d) {
      var sista = ut[ut.length - 1];
      if (sista && sista.f === d.f) sista.t += d.t;
      else ut.push({ t: d.t, f: d.f });
    });
    return ut;
  }

  function text(rad) { return rad.delar.map(function (d) { return d.t; }).join('').trim(); }

  /* Vad som ska stå mellan två rader som hör ihop. Normalt ett mellanslag,
     men ett ord som bröts vid ett bindestreck ("Forces-" / "modell") ska
     sättas ihop utan — annars blir det "Forces- modell". */
  function skarv(forraDelar, nastaText) {
    var forra = forraDelar.map(function (d) { return d.t; }).join('').replace(/\s+$/, '');
    return (/[A-Za-zÅÄÖåäö]-$/.test(forra) && /^[a-zåäö]/.test(nastaText)) ? '' : ' ';
  }

  /* Sidhuvud, sidfot och webbadresser tillhör inte tentan. */
  function arBrus(t) {
    return /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(t) ||
           /inspera\.com/.test(t) ||
           /^\d+\s*\/\s*\d+$/.test(t);
  }

  /* ---------------------------------------------------------------- */
  /* Från rader till frågor                                            */
  /* ---------------------------------------------------------------- */

  /* sidor: [[{ s, x, y, w, f }]]   →   { rubrik, fragor: [...] } */
  function tolka(sidor) {
    var rader = [];
    var rubrik = '';

    sidor.forEach(function (sida, si) {
      tillRader(sida).forEach(function (r) {
        var t = text(r);
        if (!t) return;
        if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(t) && !rubrik) rubrik = t;
        if (arBrus(t)) return;
        r.sida = si;
        rader.push(r);
      });
    });

    /* Frågorna börjar efter poängsättningen i instruktionerna */
    var start = 0;
    rader.forEach(function (r, i) { if (/^Essäfrågorna ger/.test(text(r))) start = i + 1; });

    var fragor = [];
    var block = [];
    for (var i = start; i < rader.length; i++) {
      var t = text(rader[i]);
      var m = /^Totalpoäng:\s*(\d+)/.exec(t);
      if (m) {
        fragor.push(tolkaBlock(block, fragor.length + 1, Number(m[1])));
        block = [];
      } else {
        block.push(rader[i]);
      }
    }

    return { rubrik: rubrik, fragor: fragor };
  }

  function glapp(a, b) {
    if (!a || !b) return Infinity;
    if (a.sida !== b.sida) return Infinity;
    return a.y - b.y;
  }

  function tolkaBlock(rader, nr, poang) {
    var iVal = -1, iSkriv = -1;
    rader.forEach(function (r, i) {
      var t = text(r);
      if (/^Välj ett alternativ/.test(t)) iVal = i;
      if (/^Skriv in ditt svar/.test(t)) iSkriv = i;
    });

    var slutFraga = iVal > -1 ? iVal : (iSkriv > -1 ? iSkriv : rader.length);
    var fragerader = rader.slice(0, slutFraga);

    /* Frågenumret står först, ibland ensamt på raden och ibland ihopskrivet
       med frågan. Det tas bort bara om det är just det väntade numret. */
    if (fragerader.length) {
      var forsta = fragerader[0].delar;
      var re = new RegExp('^\\s*' + nr + '(?!\\d)');
      if (re.test(forsta[0].t)) {
        forsta[0] = { t: forsta[0].t.replace(re, ''), f: forsta[0].f };
        if (!forsta[0].t.trim()) forsta.shift();
        if (!forsta.length) fragerader = fragerader.slice(1);
      }
    }

    var fraga = stycken(fragerader);

    if (iVal === -1) {
      return { nr: nr, typ: 'essa', poang: poang, fraga: fraga };
    }

    /* Alternativ: ny rad efter ett stort glapp startar ett nytt alternativ.
       Efter ett sidbyte avgör skiftläget — en rad som börjar med gemen är
       fortsättningen på föregående. */
    var alternativ = [];
    var forra = rader[iVal];
    rader.slice(iVal + 1).forEach(function (r) {
      var g = glapp(forra, r);
      var fortsattning = g < NY_ALTERNATIV ||
                         (g === Infinity && /^[a-zåäö]/.test(text(r)) && alternativ.length);
      if (fortsattning && alternativ.length) {
        var sista = alternativ[alternativ.length - 1];
        sista.push({ t: skarv(sista, text(r)), f: 0 });
        r.delar.forEach(function (d) { sista.push(d); });
      } else {
        alternativ.push(r.delar.slice());
      }
      forra = r;
    });

    return {
      nr: nr, typ: 'flerval', poang: poang, fraga: fraga,
      alternativ: alternativ.map(function (a) { return slaIhop(a).map(trimma); })
    };
  }

  function trimma(d, i, a) {
    var t = d.t;
    if (i === 0) t = t.replace(/^\s+/, '');
    if (i === a.length - 1) t = t.replace(/\s+$/, '');
    return { t: t.replace(/\s{2,}/g, ' '), f: d.f };
  }

  /* Frågetextens rader blir stycken: ett större glapp mellan två rader
     betyder nytt stycke, annars är det en radbrytning i samma mening. */
  function stycken(rader) {
    var ut = [], nu = [];
    rader.forEach(function (r, i) {
      if (i > 0 && glapp(rader[i - 1], r) > NYTT_STYCKE && glapp(rader[i - 1], r) !== Infinity) {
        ut.push(slaIhop(nu).map(trimma));
        nu = [];
      } else if (i > 0) {
        nu.push({ t: skarv(nu, text(r)), f: 0 });
      }
      r.delar.forEach(function (d) { nu.push(d); });
    });
    if (nu.length) ut.push(slaIhop(nu).map(trimma));
    return ut;
  }

  /* ---------------------------------------------------------------- */
  /* Kontrollsumma                                                     */
  /* ---------------------------------------------------------------- */

  /* Bara bokstäverna, gemener. Tål att mellanslag och betoning tolkas lite
     olika mellan webbläsare, men inte att frågan är en annan. */
  function kontrollsumma(delarLista) {
    var s = [].concat.apply([], delarLista).map(function (d) { return d.t; }).join('')
      .toLowerCase().replace(/[^a-zåäöé]/g, '');
    var h = 5381;
    for (var i = 0; i < s.length; i++) h = ((h * 33) ^ s.charCodeAt(i)) >>> 0;
    return h.toString(36);
  }

  /* ---------------------------------------------------------------- */
  /* Matcha mot facit                                                  */
  /* ---------------------------------------------------------------- */

  /* Tar reda på vilken tenta PDF:en är och kontrollerar att varje fråga
     tolkats rätt. Returnerar { id, tenta } eller { fel }. */
  function matcha(tolkad) {
    var kandidater = (window.SYSB23.extentor || []).filter(function (e) {
      return e.rubrik.every(function (ord) { return tolkad.rubrik.indexOf(ord) > -1; });
    });
    if (!kandidater.length) {
      return { fel: 'Det här ser inte ut att vara någon av de gamla tentorna appen har facit till. ' +
                    'Rubriken i PDF:en var: "' + (tolkad.rubrik || 'ingen') + '".' };
    }
    var nyckel = kandidater[0];

    if (tolkad.fragor.length !== nyckel.fragor.length) {
      return { fel: 'Hittade ' + tolkad.fragor.length + ' frågor, men tentan ska ha ' +
                    nyckel.fragor.length + '. PDF:en verkar vara en annan version.' };
    }

    for (var i = 0; i < nyckel.fragor.length; i++) {
      var k = nyckel.fragor[i], f = tolkad.fragor[i];
      if (f.typ !== k.typ) {
        return { fel: 'Fråga ' + (i + 1) + ' tolkades som ' + f.typ + ' men ska vara ' + k.typ + '.' };
      }
      if (k.typ === 'flerval' && f.alternativ.length !== k.antal) {
        return { fel: 'Fråga ' + (i + 1) + ' fick ' + f.alternativ.length +
                      ' svarsalternativ, men ska ha ' + k.antal + '.' };
      }
      if (kontrollsumma(f.fraga) !== k.summa) {
        return { fel: 'Fråga ' + (i + 1) + ' stämmer inte med tentan facit är skrivet för.' };
      }
    }

    return { id: nyckel.id, tenta: tolkad };
  }

  return {
    lasPdf: lasPdf,
    tolka: tolka,
    matcha: matcha,
    kontrollsumma: kontrollsumma
  };
})();
