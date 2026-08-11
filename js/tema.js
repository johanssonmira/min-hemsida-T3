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

  function lista() { return TEMAN; }

  function aktivt() {
    var id = S.store.tema();
    return TEMAN.filter(function (t) { return t.id === id; })[0] || TEMAN[0];
  }

  /* Sätts på <html> så att även bakgrunden bakom sidan följer med */
  function anvand(id) {
    var t = TEMAN.filter(function (x) { return x.id === id; })[0] || TEMAN[0];

    if (t.id === 'creme') document.documentElement.removeAttribute('data-tema');
    else document.documentElement.setAttribute('data-tema', t.id);

    /* Adressfältet på mobil färgas efter topbaren */
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', t.topp);
  }

  function valj(id) {
    S.store.sattTema(id);
    anvand(id);
  }

  /* Läses in innan första renderingen, så sidan aldrig blinkar creme
     innan den blir grön. */
  function start() { anvand(S.store.tema()); }

  /* ------------------------------------------------------------------ */
  /* Väljaren                                                            */
  /* ------------------------------------------------------------------ */

  /* oppna() kopplar de lyssnare som ska finnas så länge dialogen är uppe.
     rita() ritar bara om innehållet. Skillnaden spelar roll: byter man tema
     ritas listan om, och låg overlay-lyssnaren i rita() skulle den läggas
     på en gång till för varje klick. */
  function oppna() {
    var ov = window.SYSB23.ui.el('overlagg');
    rita();
    ov.classList.remove('dold');
    document.body.classList.add('laast');
    ov.addEventListener('click', utanfor);
    document.addEventListener('keydown', esc);
  }

  function utanfor(e) {
    if (e.target === window.SYSB23.ui.el('overlagg')) stang();
  }

  function rita() {
    var ov = window.SYSB23.ui.el('overlagg');
    var nuvarande = aktivt().id;

    var h = '<div class="overlagg-ruta">';
    h += '<div class="overlagg-topp">';
    h += '<h2 id="overlagg-rubrik" class="utan-markor">Välj tema</h2>';
    h += '<button class="ikonknapp" id="tm-stang" aria-label="Stäng">✕</button>';
    h += '</div>';
    h += '<p class="muted liten">Bara färgerna ändras. Alla frågor, siffror och ' +
         'kalenderpass är exakt desamma i alla fyra — och rätt är alltid grönt, ' +
         'fel alltid rött.</p>';

    h += '<div class="temalista">';
    TEMAN.forEach(function (t) {
      h += '<button class="temakort' + (t.id === nuvarande ? ' vald' : '') +
           '" data-tema="' + t.id + '">';
      h += '<span class="tk-prickar">';
      t.prickar.forEach(function (f) {
        h += '<i style="background:' + f + '"></i>';
      });
      h += '</span>';
      h += '<span class="tk-text">';
      h += '<span class="tk-titel">' + t.namn +
           (t.id === nuvarande ? ' <span class="tk-vald">Vald</span>' : '') + '</span>';
      h += '<span class="tk-besk">' + t.beskrivning + '</span>';
      h += '</span>';
      h += '</button>';
    });
    h += '</div>';

    h += '<div class="overlagg-knappar"><button class="primar" id="tm-klar">Klar</button></div>';
    h += '</div>';

    ov.innerHTML = h;

    /* Temat byts direkt vid klick. Att se förändringen på riktigt är hela
       beslutet – en liten förhandsruta hade varit sämre än sidan själv. */
    Array.prototype.forEach.call(ov.querySelectorAll('[data-tema]'), function (b) {
      b.addEventListener('click', function () {
        valj(b.dataset.tema);
        rita();
      });
    });

    window.SYSB23.ui.el('tm-stang').addEventListener('click', stang);
    window.SYSB23.ui.el('tm-klar').addEventListener('click', stang);
  }

  function esc(e) {
    if (e.key === 'Escape') stang();
  }

  function stang() {
    var ov = window.SYSB23.ui.el('overlagg');
    ov.classList.add('dold');
    ov.innerHTML = '';
    document.body.classList.remove('laast');
    ov.removeEventListener('click', utanfor);
    document.removeEventListener('keydown', esc);
  }

  return { lista: lista, aktivt: aktivt, valj: valj, start: start, oppna: oppna };
})();
