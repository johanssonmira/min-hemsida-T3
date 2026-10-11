/* =========================================================================
   attgora.js – egen att göra-lista per dag.

   Man skriver själv in punkter och bockar av dem. Varje dag har sin egen
   lista och allt sparas lokalt, så man kan bläddra tillbaka och se vad man
   gjorde. Det man inte hann med går att flytta till idag med ett klick —
   annars blir gamla ogjorda punkter liggande och skaver.

   Listan hör inte till någon delkurs. Den är samma vad man än pluggar,
   och rymmer allt — "handla på Coop" lika väl som "plugga till databastentan".
   Förslagen under listan hämtas därför från alla aktuella delkurser, och
   läggs till först när man klickar på dem.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.attgora = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var datum = null;      // visad dag, 'ÅÅÅÅ-MM-DD'; null = idag
  var redigerar = null;  // id för punkten som redigeras

  function idagIso() { return iso(U.idag()); }

  function iso(d) {
    return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' + ('0' + d.getDate()).slice(-2);
  }

  function flytta(isoDatum, dagar) {
    var d = U.parse(isoDatum);
    d.setDate(d.getDate() + dagar);
    return iso(d);
  }

  function rendera() {
    var vy = U.el('vy-attgora');
    var idag = idagIso();
    var dag = datum || idag;
    var lista = S.store.attgora(dag);
    var klara = lista.filter(function (p) { return p.klar; }).length;

    var h = '<div class="sida">';
    h += '<div class="huvud">';

    /* ---- Listan ---- */
    h += '<div class="kort ag-kort">';
    h += '<div class="ag-huvud">';
    h += '<button class="ikonknapp" id="ag-fore" aria-label="Föregående dag">←</button>';
    h += '<div class="ag-datum"><span class="overrubrik">Att göra</span><h1>' + U.esc(rubrik(dag, idag)) + '</h1>';
    h += '<span class="muted liten">' + U.esc(U.langtDatum(dag)) + '</span></div>';
    h += '<button class="ikonknapp" id="ag-nasta" aria-label="Nästa dag">→</button>';
    if (dag !== idag) h += '<button class="sekundar ag-idag" id="ag-tillidag">Idag</button>';
    h += '</div>';

    if (lista.length) {
      h += '<div class="ag-framsteg"><div class="progress' + (klara === lista.length ? ' gron' : '') + '">' +
           '<div style="width:' + Math.round(klara / lista.length * 100) + '%"></div></div>' +
           '<span class="liten muted">' + klara + ' av ' + lista.length + ' klara</span></div>';
    }

    h += '<ul class="ag-lista">';
    lista.forEach(function (p, i) {
      h += '<li class="ag-punkt' + (p.klar ? ' klar' : '') + '">';
      if (redigerar === p.id) {
        h += '<input class="ag-redigera" id="ag-redigera" data-id="' + p.id + '" value="' + U.esc(p.text) +
             '" aria-label="Ändra punkten" maxlength="300">';
        h += '<button class="ikonknapp" data-spara="' + p.id + '" aria-label="Spara">✓</button>';
      } else {
        h += '<label class="ag-rad"><input type="checkbox" data-bocka="' + p.id + '"' +
             (p.klar ? ' checked' : '') + '><span class="ag-bock" aria-hidden="true"></span>' +
             '<span class="ag-text">' + U.esc(p.text) + '</span></label>';
        h += '<span class="ag-verktyg">';
        if (i > 0) h += '<button class="ikonknapp" data-upp="' + p.id + '" aria-label="Flytta upp">↑</button>';
        h += '<button class="ikonknapp" data-andra="' + p.id + '" aria-label="Ändra">✎</button>';
        h += '<button class="ikonknapp" data-tabort="' + p.id + '" aria-label="Ta bort">✕</button>';
        h += '</span>';
      }
      h += '</li>';
    });
    h += '</ul>';

    if (!lista.length) {
      h += '<p class="muted ag-tom">' + (dag < idag
        ? 'Ingenting skrevs upp den här dagen.'
        : 'Inget att göra än. Skriv allt du ska hinna — plugg och annat. Samma lista oavsett vilken delkurs du står i.') + '</p>';
    }

    h += '<form class="ag-ny" id="ag-ny" autocomplete="off">';
    h += '<input id="ag-text" type="text" maxlength="300" placeholder="Handla på Coop, plugga quiz till Databaser …" ' +
         'aria-label="Ny punkt">';
    h += '<button class="primar" type="submit">Lägg till</button>';
    h += '</form>';
    h += '<p class="fel-text dold" id="ag-fel" role="alert">Skriv något först.</p>';

    /* Ogjorda punkter från en annan dag */
    var oklaraHar = lista.filter(function (p) { return !p.klar; }).length;
    if (dag < idag && oklaraHar) {
      h += '<div class="notis ag-notis">' + oklaraHar +
           (oklaraHar === 1 ? ' punkt blev inte klar.' : ' punkter blev inte klara.') +
           ' <button class="lankbtn" data-flyttahit="' + dag + '">Flytta till idag</button></div>';
    }
    if (dag === idag) {
      var forra = senasteMedOklara(idag);
      if (forra) {
        h += '<div class="notis ag-notis">' + forra.antal +
             (forra.antal === 1 ? ' ogjord punkt' : ' ogjorda punkter') + ' från ' +
             U.esc(U.langtDatum(forra.dag)) + '. ' +
             '<button class="lankbtn" data-flyttahit="' + forra.dag + '">Hämta hit</button></div>';
      }
    }
    h += '</div>';

    /* ---- Förslag ---- */
    var forslag = byggForslag(dag);
    if (forslag.length) {
      h += '<div class="kort">';
      h += '<h2>Förslag från dina kurser</h2>';
      h += '<p class="muted liten">Klicka för att lägga till i listan.</p>';
      h += '<div class="ag-forslag">';
      forslag.forEach(function (f) {
        h += '<button class="chip" data-forslag="' + U.esc(f) + '">+ ' + U.esc(f) + '</button>';
      });
      h += '</div></div>';
    }
    h += '</div>';

    /* ---- Tidigare dagar ---- */
    h += '<aside class="sido">';
    h += '<div class="kort">';
    h += '<h2>Dina dagar</h2>';
    var dagar = S.store.attgoraDagar().slice(0, 21);
    if (!dagar.length) {
      h += '<p class="muted liten">Här samlas dagarna du skrivit listor för, så du kan se tillbaka på vad du gjort.</p>';
    } else {
      h += '<div class="ag-dagar">';
      dagar.forEach(function (d) {
        var l = S.store.attgora(d);
        var k = l.filter(function (p) { return p.klar; }).length;
        h += '<button class="ag-dagrad' + (d === dag ? ' vald' : '') + (k === l.length ? ' alla' : '') +
             '" data-dag="' + d + '"><span>' + U.esc(rubrik(d, idag, true)) + '</span>' +
             '<span class="ag-raknare">' + k + '/' + l.length + '</span></button>';
      });
      h += '</div>';
    }
    h += '</div>';
    h += '</aside>';
    h += '</div>';

    vy.innerHTML = h;
    koppla(vy, dag);
    if (S.app && S.app.uppdateraAttgoraKnapp) S.app.uppdateraAttgoraKnapp();
  }

  function rubrik(dag, idag, kort) {
    if (dag === idag) return 'Idag';
    if (dag === flytta(idag, 1)) return 'Imorgon';
    if (dag === flytta(idag, -1)) return 'Igår';
    return kort ? U.kortDatum(dag) : U.langtDatum(dag).replace(/^\S+ /, function (v) {
      return v.charAt(0).toUpperCase() + v.slice(1);
    });
  }

  /* Den senaste dagen före idag som har ogjorda punkter, högst två veckor bak */
  function senasteMedOklara(idag) {
    var dagar = S.store.attgoraDagar().filter(function (d) { return d < idag && d >= flytta(idag, -14); });
    for (var i = 0; i < dagar.length; i++) {
      var antal = S.store.attgora(dagar[i]).filter(function (p) { return !p.klar; }).length;
      if (antal) return { dag: dagar[i], antal: antal };
    }
    return null;
  }

  /* Förslag ur läget i ALLA aktuella delkurser, inte bara den valda:
     nästa olästa kapitel, en övningsrunda, dagens schemapass och
     Ladok-anmälan när den närmar sig. */
  function byggForslag(dag) {
    var finns = S.store.attgora(dag).map(function (p) { return p.text; });
    var aktuella = S.delkurser.filter(function (d) { return !d.avslutad; });
    var ut = [];

    U.allaPass().filter(function (p) { return p.datum === dag; }).forEach(function (p) {
      ut.push(p.tid.split('–')[0] + ' ' + p.rubrik + (p.delkurs ? ' (' + U.delkursKort(p.delkurs) + ')' : ''));
    });

    S.tentor.forEach(function (t) {
      if (t.typ !== 'ordinarie' || !aktuella.some(function (d) { return d.id === t.delkurs; })) return;
      var anm = flytta(t.datum, -7);
      var kvar = U.dagarTill(anm);
      if (anm >= dag && kvar !== null && kvar >= 0 && kvar <= 10) {
        ut.push('Anmäl mig till tentan i ' + U.delkursKort(t.delkurs) + ' i Ladok');
      }
    });

    aktuella.forEach(function (d) {
      var namn = U.delkursKort(d.id);
      var komp = S.kompendium[d.id];
      if (komp) {
        var nasta = komp.kapitel.filter(function (k) { return !S.store.arLast(k.id); })[0];
        if (nasta) ut.push('Läs kapitel ' + nasta.nr + ' i ' + namn + ': ' + nasta.titel);
      }
      ut.push('Öva 10 frågor i ' + namn);
    });

    return ut.filter(function (t) { return finns.indexOf(t) === -1; }).slice(0, 8);
  }

  function koppla(vy, dag) {
    function alla(sel, fn) { Array.prototype.forEach.call(vy.querySelectorAll(sel), fn); }
    function klick(sel, fn) { alla(sel, function (b) { b.addEventListener('click', function (e) { fn(b, e); }); }); }

    klick('#ag-fore', function () { datum = flytta(dag, -1); redigerar = null; rendera(); });
    klick('#ag-nasta', function () { datum = flytta(dag, 1); redigerar = null; rendera(); });
    klick('#ag-tillidag', function () { datum = null; redigerar = null; rendera(); });
    klick('[data-dag]', function (b) { datum = b.dataset.dag; redigerar = null; rendera(); });

    var form = U.el('ag-ny');
    var falt = U.el('ag-text');
    var fel = U.el('ag-fel');
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!falt.value.trim()) { fel.classList.remove('dold'); falt.focus(); return; }
      S.store.laggTillAttgora(dag, falt.value);
      rendera();
      U.el('ag-text').focus();
    });
    falt.addEventListener('input', function () { fel.classList.add('dold'); });

    alla('[data-bocka]', function (c) {
      c.addEventListener('change', function () { S.store.vaxlaAttgora(dag, c.dataset.bocka); rendera(); });
    });
    klick('[data-tabort]', function (b) { S.store.taBortAttgora(dag, b.dataset.tabort); rendera(); });
    klick('[data-upp]', function (b) { S.store.flyttaAttgora(dag, b.dataset.upp, -1); rendera(); });
    klick('[data-andra]', function (b) {
      redigerar = b.dataset.andra; rendera();
      var f = U.el('ag-redigera');
      if (f) { f.focus(); f.select(); }
    });

    var red = U.el('ag-redigera');
    if (red) {
      var sparaRed = function () {
        S.store.andraAttgora(dag, red.dataset.id, red.value);
        redigerar = null; rendera();
      };
      red.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); sparaRed(); }
        if (e.key === 'Escape') { redigerar = null; rendera(); }
      });
      klick('[data-spara]', sparaRed);
    }

    klick('[data-flyttahit]', function (b) {
      S.store.flyttaOklara(b.dataset.flyttahit, idagIso());
      datum = null; rendera();
    });
    klick('[data-forslag]', function (b) { S.store.laggTillAttgora(dag, b.dataset.forslag); rendera(); });
  }

  /* Hur dagens lista ligger till — används av Hem */
  function idagsLage() {
    var lista = S.store.attgora(idagIso());
    return { antal: lista.length, klara: lista.filter(function (p) { return p.klar; }).length };
  }

  return { rendera: rendera, idagsLage: idagsLage };
})();
