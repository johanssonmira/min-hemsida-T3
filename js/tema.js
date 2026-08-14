/* =========================================================================
   tema.js – färgtema för hela sidan.

   Ett tema byter bara ut CSS-variablerna i :root. Ingenting i innehållet
   ändras: samma frågor, samma siffror, samma nivåer, samma kalender.
   Det är hela poängen – man ska kunna välja känsla utan att välja bort
   information.

   Rätt och fel behåller grönt och rött i alla teman, och facit märker
   dessutom ut dem med ✓ och ✕. Byter man till det gröna temat, där hueen
   annars vore upptagen, står beskedet kvar i tecknen.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.tema = (function () {
  var S = window.SYSB23;

  /* prickar = de tre färger som visas i väljaren: yta, handling, accent.
     De är hämtade ur temats egna variabler, så förhandsvisningen kan inte
     hamna i otakt med hur sidan faktiskt ser ut. */
  var TEMAN = [
    {
      id: 'creme',
      namn: 'Creme',
      beskrivning: 'Varm sandton och elektriskt blå. Lugnast för långa lässtunder.',
      prickar: ['#FCF0EA', '#2B29E0', '#DE8600'],
      topp: '#12124F'
    },
    {
      id: 'skog',
      namn: 'Skog',
      beskrivning: 'Salviagrönt med puderrosa. Dämpat och svalt.',
      prickar: ['#E9F3E4', '#1B7A45', '#E0577F'],
      topp: '#0B2E1C'
    },
    {
      id: 'konditori',
      namn: 'Konditori',
      beskrivning: 'Prinsesstårtans rosa, blått och gult. Mjukt och glatt.',
      prickar: ['#FCEAF0', '#1A6DC0', '#DA8A1C'],
      topp: '#0B2B4D'
    },
    {
      id: 'neon',
      namn: 'Neon',
      beskrivning: 'Magenta och solgult på vitt. Mest färg, högst kontrast.',
      prickar: ['#FFF0F5', '#C4118C', '#F5C518'],
      topp: '#2A0A33'
    }
  ];

  /* "Följ delkursen" är inte ett tema utan ett läge: sidan tar färg efter
     den delkurs man pluggar. Då går frågan "vilken kurs är jag inne på?"
     inte att missa – svaret är hela skärmen, inte en prick i hörnet. */
  var FOLJ = {
    id: 'delkurs',
    namn: 'Följ delkursen',
    beskrivning: 'Hela sidan tar färg efter delkursen du pluggar. Byter färg när du byter kurs.',
    prickar: ['#EDF0FE', '#2B29E0', '#DE8600'],
    topp: '#12124F'
  };

  function lista() { return TEMAN.concat([FOLJ]); }

  function aktivt() {
    var id = S.store.tema();
    if (id === FOLJ.id) return FOLJ;
    return TEMAN.filter(function (t) { return t.id === id; })[0] || TEMAN[0];
  }

  /* Sätts på <html> så att även bakgrunden bakom sidan följer med */
  function anvand(id) {
    var rot = document.documentElement;
    rot.removeAttribute('data-tema');
    rot.removeAttribute('data-delkurstema');

    var toppfarg;

    if (id === FOLJ.id) {
      var dk = S.store.delkurs();
      rot.setAttribute('data-delkurstema', dk);
      /* Topbarens färg läses ur den palett som just aktiverats, i stället
         för att skrivas ned en gång till här och hinna hamna i otakt. */
      toppfarg = getComputedStyle(rot).getPropertyValue('--blaa-900').trim() || FOLJ.topp;
    } else {
      var t = TEMAN.filter(function (x) { return x.id === id; })[0] || TEMAN[0];
      if (t.id !== 'creme') rot.setAttribute('data-tema', t.id);
      toppfarg = t.topp;
    }

    /* Adressfältet på mobil färgas efter topbaren */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', toppfarg);
  }

  function valj(id) {
    S.store.sattTema(id);
    anvand(id);
  }

  /* Anropas när delkursen byts. Gör ingenting om temat är fast. */
  function uppdateraForDelkurs() {
    if (S.store.tema() === FOLJ.id) anvand(FOLJ.id);
  }

  /* Läser en variabel ur den palett vald delkurs skulle ge, utan att
     faktiskt byta tema. Används till prickarna i väljaren. */
  function foljFarg(variabel) {
    var prov = document.createElement('div');
    prov.setAttribute('data-delkurstema', S.store.delkurs());
    prov.style.display = 'none';
    document.body.appendChild(prov);
    var farg = getComputedStyle(prov).getPropertyValue(variabel).trim();
    document.body.removeChild(prov);
    return farg || '#CCCCCC';
  }

  /* Läses in innan första renderingen, så sidan aldrig blinkar creme
     innan den blir grön. */
  function start() { anvand(S.store.tema()); }

  /* ------------------------------------------------------------------ */
  /* Väljaren                                                            */
  /* ------------------------------------------------------------------ */

  function oppna() {
    window.SYSB23.ui.overlagg.oppna(rita);
  }

  function rita(behallare) {
    var nuvarande = aktivt().id;

    var h = '<div class="overlagg-ruta">';
    h += '<div class="overlagg-topp">';
    h += '<h2 id="overlagg-rubrik" class="utan-markor">Välj tema</h2>';
    h += '<button class="ikonknapp" id="tm-stang" aria-label="Stäng">✕</button>';
    h += '</div>';
    h += '<p class="muted liten">Bara färgerna ändras. Alla frågor, siffror och ' +
         'kalenderpass är exakt desamma i alla lägen — och rätt är alltid grönt, ' +
         'fel alltid rött.</p>';

    h += '<div class="temalista">';
    lista().forEach(function (t) {
      /* Följ-läget visar den delkurs man faktiskt står i, inte en generisk
         förhandsvisning – annars gissar man vad valet betyder. */
      var prickar = t.prickar;
      var besk = t.beskrivning;
      if (t.id === FOLJ.id) {
        prickar = [foljFarg('--creme-100'), foljFarg('--blaa-500'),
                   window.SYSB23.ui.delkursFarg(S.store.delkurs())];
        besk += ' Just nu: ' + window.SYSB23.ui.delkursNamn(S.store.delkurs()) + '.';
      }

      h += '<button class="temakort' + (t.id === nuvarande ? ' vald' : '') +
           (t.id === FOLJ.id ? ' temakort-folj' : '') +
           '" data-tema="' + t.id + '">';
      h += '<span class="tk-prickar">';
      prickar.forEach(function (f) {
        h += '<i style="background:' + f + '"></i>';
      });
      h += '</span>';
      h += '<span class="tk-text">';
      h += '<span class="tk-titel">' + t.namn +
           (t.id === nuvarande ? ' <span class="tk-vald">Vald</span>' : '') + '</span>';
      h += '<span class="tk-besk">' + besk + '</span>';
      h += '</span>';
      h += '</button>';
    });
    h += '</div>';

    h += '<div class="overlagg-knappar"><button class="primar" id="tm-klar">Klar</button></div>';
    h += '</div>';

    behallare.innerHTML = h;

    /* Temat byts direkt vid klick. Att se förändringen på riktigt är hela
       beslutet – en liten förhandsruta hade varit sämre än sidan själv. */
    Array.prototype.forEach.call(behallare.querySelectorAll('[data-tema]'), function (b) {
      b.addEventListener('click', function () {
        valj(b.dataset.tema);
        window.SYSB23.ui.overlagg.rita();
      });
    });

    window.SYSB23.ui.el('tm-stang').addEventListener('click', stang);
    window.SYSB23.ui.el('tm-klar').addEventListener('click', stang);
  }

  function stang() { window.SYSB23.ui.overlagg.stang(); }

  return {
    lista: lista, aktivt: aktivt, valj: valj, start: start, oppna: oppna,
    uppdateraForDelkurs: uppdateraForDelkurs
  };
})();
