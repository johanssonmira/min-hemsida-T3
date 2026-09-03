/* =========================================================================
   sw.js – service worker. Gör appen körbar utan internet.

   Strategin är cache-först med tyst uppdatering i bakgrunden. Allt i appen
   är statiskt och litet, så det finns ingen anledning att vänta på nätet
   innan något visas: filerna serveras direkt ur cachen medan en ny version
   hämtas åt sidan. Nästa gång man startar appen är den ny.

   Höj VERSION när något ändras. Då byggs cachen om från grunden och gamla
   filer städas bort i activate.
   ========================================================================= */

var VERSION = 'sysb23-v5';

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
  'data/sql-databas.js',
  'data/sql-ovningar.js',
  'data/questions-db-sql.js',
  'data/questions-db-joins.js',
  'data/questions-db-design.js',
  'data/questions-db-app.js',
  'data/questions-strategi-ekonomistyrning.js',
  'data/questions-strategi-styrning.js',
  'data/questions-strategi-forelasning1.js',

  'js/ui.js',
  'js/store.js',
  'js/tema.js',
  'js/hem.js',
  'js/las.js',
  'js/ova.js',
  'js/essa.js',
  'js/statistik.js',
  'js/schema.js',
  'js/passform.js',
  'js/sqlverkstad.js',
  'js/app.js'
];

self.addEventListener('install', function (e) {
  e.waitUntil(
    caches.open(VERSION)
      .then(function (c) { return c.addAll(FILER); })
      /* Den nya versionen tar över direkt i stället för att vänta på att
         alla flikar stängts. Appen har ingen server och inget delat
         tillstånd, så det finns inget att bli osams om. */
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

self.addEventListener('fetch', function (e) {
  var url = new URL(e.request.url);

  /* Bara vår egen sida cachas. Allt annat lämnas åt nätet. */
  if (e.request.method !== 'GET' || url.origin !== self.location.origin) return;

  e.respondWith(
    caches.match(e.request).then(function (traff) {
      var frannatet = fetch(e.request).then(function (svar) {
        if (svar && svar.status === 200 && svar.type === 'basic') {
          var kopia = svar.clone();
          caches.open(VERSION).then(function (c) { c.put(e.request, kopia); });
        }
        return svar;
      }).catch(function () {
        /* Offline och inget i cachen: för en sidnavigering är index.html
           bättre än webbläsarens dinosaurie. */
        if (e.request.mode === 'navigate') return caches.match('index.html');
        return traff;
      });

      return traff || frannatet;
    })
  );
});
