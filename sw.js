/* =========================================================================
   sw.js – service worker. Gör appen körbar utan internet.

   Strategin är nätverket först och cachen som reserv när man är offline.
   Se kommentaren vid fetch nedan för varför.

   Höj VERSION när något ändras. Då byggs cachen om från grunden och gamla
   filer städas bort i activate.
   ========================================================================= */

var VERSION = 'sysb23-v11';

var FILER = [
  './',
  'index.html',
  'css/style.css',
  'manifest.json',
  'ikoner/icon-192.png',
  'ikoner/icon-512.png',
  'ikoner/icon-maskable-512.png',
  'ikoner/apple-touch-icon.png',

  'data/topics.js',
  'data/kalender.js',
  'data/ordlista.js',
  'data/kompendium-strategi-1.js',
  'data/kompendium-strategi-2.js',
  'data/kompendium-strategi-3.js',
  'data/kompendium-databaser-1.js',
  'data/kompendium-databaser-2.js',
  'data/kompendium-process-1.js',
  'data/kompendium-process-2.js',
  'data/sql-databas.js',
  'data/sql-ovningar.js',
  'data/modellera.js',
  'data/extentor.js',
  'data/questions-db-sql.js',
  'data/questions-db-joins.js',
  'data/questions-db-design.js',
  'data/questions-db-app.js',
  'data/questions-process-bpm.js',
  'data/questions-process-bpmn.js',
  'data/questions-strategi-ekonomistyrning.js',
  'data/questions-strategi-styrning.js',
  'data/questions-strategi-forelasning1.js',

  'js/ui.js',
  'js/tsql.js',
  'js/diagram.js',
  'js/normalform.js',
  'js/store.js',
  'js/tema.js',
  'js/hem.js',
  'js/las.js',
  'js/ova.js',
  'js/extentaimport.js',
  'js/tentaprov.js',
  'js/essa.js',
  'js/statistik.js',
  'js/schema.js',
  'js/passform.js',
  'js/sqlverkstad.js',
  'js/modellera.js',
  'js/app.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      /* cache: 'reload' går förbi webbläsarens HTTP-cache. GitHub Pages
         skickar max-age=600, så utan det kunde en ny version av appen
         installeras med tio minuter gamla filer — och sedan ligga kvar. */
      .then(function (c) {
        return c.addAll(FILER.map(function (f) { return new Request(f, { cache: 'reload' }); }));
      })
      .then(function () { return self.skipWaiting(); })
  );
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    caches.keys()
      .then(function (nycklar) {
        return Promise.all(nycklar.map(function (n) {
          if (n !== VERSION) return caches.delete(n);
        }));
      })
      .then(function () { return self.clients.claim(); })
  );
});

/* Nätverket först, cachen bara när man är offline.

   Tidigare var det tvärtom: cachen först och en tyst uppdatering i
   bakgrunden. Det gjorde att en ny version syntes först vid andra eller
   tredje besöket — och det är precis så det kändes som att ändringar
   "inte fanns". Appen är liten, så att vänta på nätet kostar nästan
   ingenting, och offline fungerar den fortfarande. */
self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;

  e.respondWith(
    fetch(e.request, { cache: 'no-cache' }).then(function (svar) {
      if (svar && svar.status === 200 && svar.type === 'basic') {
        var kopia = svar.clone();
        caches.open(VERSION).then(function (c) { c.put(e.request, kopia); });
      }
      return svar;
    }).catch(function () {
      return caches.match(e.request).then(function (traff) {
        if (traff) return traff;
        if (e.request.mode === 'navigate') return caches.match('index.html');
      });
    })
  );
});
