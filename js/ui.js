/* =========================================================================
   ui.js – gemensamma hjälpfunktioner: escaping, enkel textmarkering,
   datum och nedräkning.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.ui = (function () {

  function el(id) { return document.getElementById(id); }

  function esc(text) {
    var d = document.createElement('div');
    d.textContent = (text === undefined || text === null) ? '' : String(text);
    return d.innerHTML;
  }

  /* Enkel inline-markering: **fet**, *kursiv*, `kod` */
  function inline(text) {
    return esc(text)
      .replace(/`([^`]+)`/g, '<code>$1</code>')
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[^*])\*([^*\n]+)\*/g, '$1<em>$2</em>');
  }

  /* Renderar ett textblock med stycken, punktlistor, numrerade listor och citat */
  function block(text) {
    if (!text) return '';
    var rader = String(text).split('\n');
    var html = '';
    var i = 0;

    while (i < rader.length) {
      var rad = rader[i];

      if (rad.trim() === '') { i++; continue; }

      // Kodblock med ```
      if (rad.trim().indexOf('```') === 0) {
        i++;
        var kod = [];
        while (i < rader.length && rader[i].trim().indexOf('```') !== 0) {
          kod.push(rader[i]);
          i++;
        }
        i++; // hoppa över avslutande ```
        html += '<pre class="kodruta">' + esc(kod.join('\n')) + '</pre>';
        continue;
      }

      // Tabell: rader som börjar och slutar med |
      if (/^\|.*\|$/.test(rad.trim())) {
        var tabellrader = [];
        while (i < rader.length && /^\|.*\|$/.test(rader[i].trim())) {
          tabellrader.push(rader[i].trim());
          i++;
        }
        html += tabell(tabellrader);
        continue;
      }

      // Citat-/varningsruta
      if (rad.indexOf('> ') === 0) {
        var citat = [];
        while (i < rader.length && rader[i].indexOf('> ') === 0) {
          citat.push(rader[i].slice(2));
          i++;
        }
        html += '<blockquote>' + inline(citat.join(' ')) + '</blockquote>';
        continue;
      }

      // Punktlista
      if (rad.indexOf('- ') === 0) {
        html += '<ul>';
        while (i < rader.length && rader[i].indexOf('- ') === 0) {
          html += '<li>' + inline(rader[i].slice(2)) + '</li>';
          i++;
        }
        html += '</ul>';
        continue;
      }

      // Numrerad lista
      if (/^\d+\.\s/.test(rad)) {
        html += '<ol>';
        while (i < rader.length && /^\d+\.\s/.test(rader[i])) {
          html += '<li>' + inline(rader[i].replace(/^\d+\.\s/, '')) + '</li>';
          i++;
        }
        html += '</ol>';
        continue;
      }

      // Vanligt stycke – slå ihop följande rader tills tomrad eller nytt block
      var stycke = [];
      while (i < rader.length && rader[i].trim() !== '' &&
             rader[i].indexOf('- ') !== 0 && rader[i].indexOf('> ') !== 0 &&
             rader[i].trim().indexOf('```') !== 0 &&
             !/^\|.*\|$/.test(rader[i].trim()) &&
             !/^\d+\.\s/.test(rader[i])) {
        stycke.push(rader[i]);
        i++;
      }
      html += '<p>' + inline(stycke.join(' ')) + '</p>';
    }

    return html;
  }

  /* Bygger en HTML-tabell av markdown-liknande rader.
     Rader som bara innehåller |---|---| tolkas som avgränsare. */
  function tabell(rader) {
    var celler = rader
      .filter(function (r) { return !/^\|[\s\-:|]+\|$/.test(r); })
      .map(function (r) {
        return r.replace(/^\||\|$/g, '').split('|').map(function (c) { return c.trim(); });
      });

    if (!celler.length) return '';

    var html = '<div class="tabellwrap"><table>';
    html += '<thead><tr>';
    celler[0].forEach(function (c) { html += '<th>' + inline(c) + '</th>'; });
    html += '</tr></thead><tbody>';
    celler.slice(1).forEach(function (rad) {
      html += '<tr>';
      rad.forEach(function (c) { html += '<td>' + inline(c) + '</td>'; });
      html += '</tr>';
    });
    html += '</tbody></table></div>';
    return html;
  }

  /* ------------------------------ Datum ------------------------------ */

  var VECKODAGAR = ['söndag', 'måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag', 'lördag'];
  var MANADER = ['januari', 'februari', 'mars', 'april', 'maj', 'juni',
                 'juli', 'augusti', 'september', 'oktober', 'november', 'december'];
  var MANADER_KORT = ['jan', 'feb', 'mar', 'apr', 'maj', 'jun',
                      'jul', 'aug', 'sep', 'okt', 'nov', 'dec'];

  function parse(datumStrang) {
    var d = new Date(datumStrang + 'T00:00:00');
    return isNaN(d.getTime()) ? null : d;
  }

  function idag() {
    var d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function dagarTill(datumStrang) {
    var d = parse(datumStrang);
    if (!d) return null;
    return Math.round((d - idag()) / 86400000);
  }

  function langtDatum(datumStrang) {
    var d = parse(datumStrang);
    if (!d) return datumStrang;
    return VECKODAGAR[d.getDay()] + ' ' + d.getDate() + ' ' + MANADER[d.getMonth()];
  }

  function kortDatum(datumStrang) {
    var d = parse(datumStrang);
    if (!d) return datumStrang;
    return VECKODAGAR[d.getDay()].slice(0, 2) + ' ' + d.getDate() + ' ' + MANADER_KORT[d.getMonth()];
  }

  function veckonummer(datumStrang) {
    var d = parse(datumStrang);
    if (!d) return null;
    var m = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    var dag = m.getUTCDay() || 7;
    m.setUTCDate(m.getUTCDate() + 4 - dag);
    var arsstart = new Date(Date.UTC(m.getUTCFullYear(), 0, 1));
    return Math.ceil((((m - arsstart) / 86400000) + 1) / 7);
  }

  function tidssedan(isoStrang) {
    if (!isoStrang) return '';
    var d = new Date(isoStrang);
    return d.toLocaleDateString('sv-SE') + ' ' +
           d.toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' });
  }

  /* ------------------------- Nästa examination ------------------------- */

  function nastaTenta(delkursId, inkluderaOmtentor) {
    var S = window.SYSB23;
    var kandidater = S.tentor.filter(function (t) {
      if (delkursId && t.delkurs !== delkursId) return false;
      if (!inkluderaOmtentor && t.typ !== 'ordinarie') return false;
      var d = dagarTill(t.datum);
      return d !== null && d >= 0;
    });
    kandidater.sort(function (a, b) { return a.datum < b.datum ? -1 : 1; });
    return kandidater[0] || null;
  }

  function delkursNamn(id) {
    var S = window.SYSB23;
    var k = S.kalenderDelkurser.filter(function (d) { return d.id === id; })[0];
    return k ? k.namn : id;
  }

  function delkursKort(id) {
    var S = window.SYSB23;
    var k = S.kalenderDelkurser.filter(function (d) { return d.id === id; })[0];
    return k ? k.kort : id;
  }

  function delkursFarg(id) {
    var S = window.SYSB23;
    var k = S.kalenderDelkurser.filter(function (d) { return d.id === id; })[0];
    return (k && k.farg) || '#605E7E';
  }

  /* Alla dagar i månaden som ett rutnät med hela veckor, måndag först.
     Returnerar en lista av veckor, där varje vecka är sju datumobjekt. */
  function manadsrutnat(ar, manad) {
    var forsta = new Date(ar, manad, 1);
    var start = new Date(forsta);
    var veckodag = (forsta.getDay() + 6) % 7;      // 0 = måndag
    start.setDate(start.getDate() - veckodag);

    var veckor = [];
    var d = new Date(start);

    while (true) {
      var vecka = [];
      for (var i = 0; i < 7; i++) {
        vecka.push(new Date(d));
        d.setDate(d.getDate() + 1);
      }
      veckor.push(vecka);
      if (d.getMonth() !== manad && d > forsta) break;
      if (veckor.length > 6) break;
    }
    return veckor;
  }

  function isoDatum(d) {
    return d.getFullYear() + '-' +
           String(d.getMonth() + 1).padStart(2, '0') + '-' +
           String(d.getDate()).padStart(2, '0');
  }

  function manadsNamn(manad) { return MANADER[manad]; }

  function amneNamn(id) {
    var S = window.SYSB23;
    var a = S.amneMap[id];
    return a ? a.namn : id;
  }

  /* ---------------------- Nivåvisning ---------------------- */

  /* Femstegsmätare. Färgen följer semantiken: rött svagt, ockra på väg,
     grönt starkt. Samma skala används i alla vyer. */
  function nivaMatare(n) {
    var h = '<span class="niva n' + n + '" title="Nivå ' + n + ' av 5">';
    for (var i = 0; i < 5; i++) h += '<i></i>';
    return h + '</span>';
  }

  function nivaEtikett(nivaObj) {
    return '<span class="nivaetikett ne-' + nivaObj.n + '">' + esc(nivaObj.namn) + '</span>';
  }

  function nivaPrick(n) {
    return '<i class="prick p-' + n + '"></i>';
  }

  /* Blandar en lista (Fisher–Yates) */
  function blanda(lista) {
    var k = lista.slice();
    for (var i = k.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = k[i]; k[i] = k[j]; k[j] = t;
    }
    return k;
  }

  return {
    el: el, esc: esc, inline: inline, block: block,
    parse: parse, idag: idag, dagarTill: dagarTill,
    langtDatum: langtDatum, kortDatum: kortDatum, veckonummer: veckonummer,
    tidssedan: tidssedan, nastaTenta: nastaTenta,
    delkursNamn: delkursNamn, delkursKort: delkursKort, delkursFarg: delkursFarg,
    amneNamn: amneNamn,
    nivaMatare: nivaMatare, nivaEtikett: nivaEtikett, nivaPrick: nivaPrick,
    manadsrutnat: manadsrutnat, isoDatum: isoDatum, manadsNamn: manadsNamn,
    blanda: blanda
  };
})();
