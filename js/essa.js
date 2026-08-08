/* =========================================================================
   essa.js – Essä-läget. Skriv först eget svar, fäll sedan ut checklistan
   och kryssa i vad du faktiskt fick med. Ingen automatisk rättning –
   poängen är den aktiva återkallningen.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.essa = (function () {
  var S = window.SYSB23;
  var U = S.ui;

  var valdIndex = 0;
  var visaFacit = false;
  var sparTimer = null;

  function rendera() {
    var delkurs = S.store.delkurs();
    var fragor = S.fragor.filter(function (f) {
      return f.delkurs === delkurs && f.typ === 'oppen';
    });

    var vy = U.el('vy-essa');

    if (!fragor.length) {
      vy.innerHTML = '<div class="kort"><h2>Essä</h2>' +
        '<p class="muted">Det finns inga essäfrågor för ' + U.esc(U.delkursNamn(delkurs)) +
        ' i banken än.</p></div>';
      return;
    }

    if (valdIndex >= fragor.length) valdIndex = 0;
    var f = fragor[valdIndex];
    var utkast = S.store.hamtaUtkast(f.id);

    var html = '';

    /* Introduktion och frågeväljare */
    html += '<div class="kort">';
    html += '<h2>Essä</h2>';
    html += '<p class="muted liten">Skriv ditt svar först — det sparas automatiskt. Öppna sedan ' +
            'facit och kryssa i vad du fick med. Ingen rättar åt dig; poängen är att du själv ' +
            'försöker minnas innan du tittar.</p>';

    html += '<div class="chiprad">';
    fragor.forEach(function (x, i) {
      var u = S.store.hamtaUtkast(x.id);
      var klar = u.text && u.text.trim().length > 40;
      html += '<button class="chip' + (i === valdIndex ? ' vald' : '') +
              '" data-valj="' + i + '">' +
              (klar ? '✓ ' : '') + 'Essä ' + (i + 1) + '</button>';
    });
    html += '</div>';
    html += '</div>';

    /* Frågan */
    html += '<div class="kort">';
    if (f.kalla && /Tentamen|tenta/i.test(f.kalla)) {
      html += '<p class="muted mini">Förekom som essäfråga på tentan HT24 (20 p).</p>';
    }
    html += '<div class="fragetext">' + U.esc(f.fraga) + '</div>';

    html += '<label class="liten muted" for="essatext">Ditt svar</label>';
    html += '<textarea id="essatext" class="svarsruta" rows="14" ' +
            'placeholder="Struktur som fungerar: definiera begreppet, förklara mekanismen, ' +
            'ge exempel ur litteraturen, nyansera, dra en slutsats.">' +
            U.esc(utkast.text) + '</textarea>';
    html += '<p class="muted mini" id="ordraknare">' + ordAntal(utkast.text) +
            ' ord · sparas automatiskt' +
            (utkast.sparad ? ' · senast ' + U.esc(U.tidssedan(utkast.sparad)) : '') + '</p>';

    html += '<div class="knapprad">';
    html += '<button class="' + (visaFacit ? 'sekundar' : 'primar') + '" id="togglefacit">' +
            (visaFacit ? 'Dölj facit' : 'Visa checklista och modellsvar') + '</button>';
    html += '</div>';
    html += '</div>';

    /* Facit */
    if (visaFacit) {
      html += '<div class="kort">';
      html += '<h2>Checklista</h2>';
      html += '<p class="muted liten">Kryssa i det du faktiskt fick med. Var ärlig mot dig själv ' +
              '— det är då du ser vad som saknas.</p>';
      html += '<ul class="checklista">';
      (f.nyckelpunkter || []).forEach(function (p, i) {
        var ikryssad = utkast.punkter && utkast.punkter[i];
        html += '<li><label><input type="checkbox" data-punkt="' + i + '"' +
                (ikryssad ? ' checked' : '') + '><span>' + U.inline(p) + '</span></label></li>';
      });
      html += '</ul>';

      var antalPunkter = (f.nyckelpunkter || []).length;
      var antalIkryssade = (utkast.punkter || []).filter(Boolean).length;
      if (antalPunkter) {
        var pct = Math.round((antalIkryssade / antalPunkter) * 100);
        html += '<div style="display:flex;align-items:center;gap:.8rem;margin-top:.8rem">';
        html += '<div class="progress' + (pct === 100 ? ' gron' : '') +
                '" style="flex:1"><div style="width:' + pct + '%"></div></div>';
        html += '<span class="liten muted">' + antalIkryssade + ' av ' + antalPunkter + '</span>';
        html += '</div>';
        html += '<p class="muted liten" style="margin-top:.6rem">' +
                U.esc(bedomning(antalIkryssade, antalPunkter)) + '</p>';
      }
      html += '</div>';

      html += '<div class="kort">';
      html += '<h2>Modellsvar</h2>';
      html += '<div class="lastext">' + U.block(f.modellsvar) + '</div>';
      if (f.kalla) html += '<p class="muted mini">Källa: ' + U.esc(f.kalla) + '</p>';
      html += '</div>';
    }

    /* Skrivtips */
    html += '<div class="kort faktaruta">';
    html += '<h3>Så får du fler poäng på essäfrågorna</h3>';
    html += '<ul>';
    html += '<li>En essäfråga ger 20 p — lika mycket som drygt tre flervalsfrågor. Lämna dem <strong>aldrig</strong> tomma, det finns inga minuspoäng här.</li>';
    html += '<li>Stryk under vad frågan faktiskt frågar efter innan du börjar. Frågorna HT24 hade flera delar, och andra delen var minst hälften av poängen.</li>';
    html += '<li>Skriv ut namn och exempel: Rockwater, AMD, FMC, Sears, snabbmatskedjan, Amazon, Klarna.</li>';
    html += '<li>Koppla ihop två delar av kursen om du kan. Det visar att du förstått, inte bara memorerat.</li>';
    html += '<li>Avsluta med en slutsats som svarar på frågan rakt ut.</li>';
    html += '</ul>';
    html += '</div>';

    vy.innerHTML = html;
    koppla(vy, f, fragor);
  }

  function bedomning(i, n) {
    var kvot = n ? i / n : 0;
    if (kvot === 1) return 'Alla punkter med. Det här svaret skulle ge höga poäng.';
    if (kvot >= 0.75) return 'Bra svar. Läs modellsvaret och se vad som saknas — där ligger de sista poängen.';
    if (kvot >= 0.5) return 'Halva vägen. Räcker till godkänt, men inte mer. Läs modellsvaret noga.';
    if (kvot > 0) return 'En hel del saknas. Läs kapitlet igen och skriv om svaret.';
    return 'Inget ikryssat än.';
  }

  function ordAntal(text) {
    var t = (text || '').trim();
    return t ? t.split(/\s+/).length : 0;
  }

  function koppla(vy, f, fragor) {
    Array.prototype.forEach.call(vy.querySelectorAll('[data-valj]'), function (b) {
      b.addEventListener('click', function () {
        valdIndex = parseInt(b.dataset.valj, 10);
        visaFacit = false;
        rendera();
        window.scrollTo(0, 0);
      });
    });

    var toggle = U.el('togglefacit');
    if (toggle) {
      toggle.addEventListener('click', function () {
        sparaNu(f);
        visaFacit = !visaFacit;
        rendera();
      });
    }

    var ruta = U.el('essatext');
    if (ruta) {
      ruta.addEventListener('input', function () {
        var r = U.el('ordraknare');
        if (r) r.textContent = ordAntal(ruta.value) + ' ord · sparas automatiskt';
        clearTimeout(sparTimer);
        sparTimer = setTimeout(function () { sparaNu(f); }, 800);
      });
      ruta.addEventListener('blur', function () { sparaNu(f); });
    }

    Array.prototype.forEach.call(vy.querySelectorAll('[data-punkt]'), function (c) {
      c.addEventListener('change', function () {
        var utkast = S.store.hamtaUtkast(f.id);
        var punkter = utkast.punkter || [];
        punkter[parseInt(c.dataset.punkt, 10)] = c.checked;
        S.store.sparaUtkast(f.id, aktuellText(utkast), punkter);
        rendera();
      });
    });
  }

  function aktuellText(utkast) {
    var ruta = U.el('essatext');
    return ruta ? ruta.value : (utkast ? utkast.text : '');
  }

  function sparaNu(f) {
    var ruta = U.el('essatext');
    if (!ruta) return;
    var utkast = S.store.hamtaUtkast(f.id);
    S.store.sparaUtkast(f.id, ruta.value, utkast.punkter || []);
  }

  return { rendera: rendera };
})();
