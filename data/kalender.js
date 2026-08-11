/* =========================================================================
   SYSB23 – Kalender HT 2026
   -------------------------------------------------------------------------
   Terminen löper måndag 31 augusti 2026 till söndag 17 januari 2027.
   Underlaget är avläst mot TimeEdit 1 augusti 2026.

   VIKTIGT: kontrollera alltid aktuell vecka i TimeEdit – salar och tider
   kan ändras under terminens gång. Delkurserna i november hade färre pass
   inlagda vid avläsningen än de sannolikt får.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

/* Delkursernas kortnamn används som nyckel i pass och tentor nedan.
   "kopplas" pekar ut vilken delkurs i frågebanken de motsvarar
   (null = vi har inget material för den delkursen än). */
/* "farg" används i kalendern så att varje delkurs går att känna igen på
   färgen ensam, utan att man behöver läsa texten. */
window.SYSB23.kalenderDelkurser = [
  { id: 'strategi',     namn: 'Strategi och ekonomistyrning',            kort: 'Strategi',              hp: 2, kopplas: 'strategi',  farg: '#DE8600' },
  { id: 'databaser',    namn: 'Databaser',                               kort: 'Databaser',             hp: 3, kopplas: 'databaser', farg: '#2B29E0' },
  { id: 'processer',    namn: 'Processorienterad verksamhetsutveckling', kort: 'Processorienterad',     hp: 3, kopplas: null,        farg: '#7C3AED' },
  { id: 'arkitektur',   namn: 'Verksamhetsarkitektur',                   kort: 'Verksamhetsarkitektur', hp: 2, kopplas: null,        farg: '#0E7490' },
  { id: 'sakerhet',     namn: 'Säkerhet i informationssystem',           kort: 'Säkerhet',              hp: 2, kopplas: null,        farg: '#C2185B' },
  { id: 'ansvarsfull',  namn: 'Ansvarsfull verksamhetsutveckling',       kort: 'Ansvarsfull',           hp: 1, kopplas: null,        farg: '#0E7A52' },
  { id: 'isprojekt',    namn: 'Informationssystemsprojekt',              kort: 'IS-projekt',            hp: 6, kopplas: null,        farg: '#6E4100' }
];

/* -------------------------- Examinationer -------------------------- */
window.SYSB23.tentor = [
  { delkurs: 'strategi',   typ: 'ordinarie', datum: '2026-09-21', tid: '08:00–11:00', sal: 'Skrivsal MA 9',  larare: 'Benjamin Weaver', hp: 2 },
  { delkurs: 'strategi',   typ: 'omtenta',   datum: '2026-11-06', tid: '08:00–11:00', sal: 'Skrivsal MA 9',  larare: 'Benjamin Weaver', hp: 2 },
  { delkurs: 'processer',  typ: 'ordinarie', datum: '2026-11-13', tid: '08:00–13:00', sal: 'Skrivsal MA 10', larare: 'Benjamin Weaver', hp: 3 },
  { delkurs: 'databaser',  typ: 'ordinarie', datum: '2026-11-17', tid: '08:00–13:00', sal: 'Skrivsal MA 9',  larare: 'Björn Svensson', hp: 3 },
  { delkurs: 'arkitektur', typ: 'ordinarie', datum: '2026-11-27', tid: '14:00–19:00', sal: 'Skrivsal MA 10', larare: 'Umberto Fiaccadori', hp: 2 },
  { delkurs: 'sakerhet',   typ: 'ordinarie', datum: '2026-12-03', tid: '08:00–13:00', sal: 'Skrivsal MA 10', larare: 'Miranda Kajtazi', hp: 2 },
  { delkurs: 'databaser',  typ: 'omtenta',   datum: '2027-01-05', tid: '08:00–13:00', sal: 'Skrivsal MA 10', larare: 'Björn Svensson', hp: 3 },
  { delkurs: 'processer',  typ: 'omtenta',   datum: '2027-01-07', tid: '08:00–13:00', sal: 'Skrivsal MA 9',  larare: 'Benjamin Weaver', hp: 3 },
  { delkurs: 'arkitektur', typ: 'omtenta',   datum: '2027-01-13', tid: '14:00–19:00', sal: 'Skrivsal MA 10', larare: 'Umberto Fiaccadori', hp: 2 },
  { delkurs: 'sakerhet',   typ: 'omtenta',   datum: '2027-01-14', tid: '08:00–13:00', sal: 'Skrivsal Sparta', larare: 'Miranda Kajtazi', hp: 2 }
];

/* ----------------------------- Alla pass -----------------------------
   Avläst rad för rad ur TimeEdit-schemat för SYSB23 HT 2026.

   Grupptillfällen ligger som en rad var, precis som i TimeEdit. Det gick
   inte att slå ihop dem till "13:00 / 15:00" utan att tappa vilken sal
   och vilken lärare som gällde vilket tillfälle — och det är just det man
   behöver veta på morgonen.

   typ: 'forelasning' | 'laboration' | 'lektion' | 'seminarium' | 'workshop'
        | 'handledning' | 'redovisning' | 'tenta' | 'ovrigt'              */
window.SYSB23.pass = [
  // ---------------------------- Vecka 36 ----------------------------
  { datum: '2026-08-31', tid: '13:00–15:00', rubrik: 'Introduktion till kursen (upprop)', delkurs: 'strategi',  sal: 'MA 5', larare: 'Björn Svensson', typ: 'ovrigt', obligatorisk: true },
  { datum: '2026-09-01', tid: '13:00–15:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-09-02', tid: '08:00–10:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-09-02', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-02', tid: '15:00–17:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-03', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'strategi',  sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-04', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },

  // ---------------------------- Vecka 37 ----------------------------
  { datum: '2026-09-07', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 5', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-09-08', tid: '08:00–10:00', rubrik: 'Föreläsning', delkurs: 'strategi',  sal: 'EC1:Crafoordsalen', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-08', tid: '13:00–15:00', rubrik: 'Lektion', delkurs: 'databaser', sal: 'EC2:101', larare: 'Björn Svensson', typ: 'lektion' },
  { datum: '2026-09-08', tid: '15:00–17:00', rubrik: 'Lektion', delkurs: 'databaser', sal: 'EC2:101', larare: 'Björn Svensson', typ: 'lektion' },
  { datum: '2026-09-09', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-09', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-11', tid: '10:00–12:00', rubrik: 'Föreläsning — sista i delkursen', delkurs: 'strategi', sal: 'MA 5', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-11', tid: '13:00–15:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },

  // ---------------------------- Vecka 38 ----------------------------
  { datum: '2026-09-14', tid: '08:00–10:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 5', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-09-16', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-16', tid: '15:00–17:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-17', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },

  // ---------------------------- Vecka 39 ----------------------------
  { datum: '2026-09-21', tid: '08:00–11:00', rubrik: 'Tentamen', delkurs: 'strategi', sal: 'Skrivsal MA 9', larare: 'Benjamin Weaver', typ: 'tenta' },
  { datum: '2026-09-22', tid: '10:00–12:00', rubrik: 'Föreläsning — introduktion', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-23', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-23', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-25', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'processer', sal: 'EC1:Crafoordsalen', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-25', tid: '15:00–17:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },

  // ---------------------------- Vecka 40 ----------------------------
  { datum: '2026-09-29', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-09-30', tid: '08:00–10:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-30', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-09-30', tid: '13:00–15:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-10-01', tid: '08:00–10:00', rubrik: 'Handledning', delkurs: 'processer', sal: 'EC2:241 Verona', larare: 'Benjamin Weaver', typ: 'handledning' },
  { datum: '2026-10-02', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 3', larare: 'Björn Svensson', typ: 'forelasning' },

  // ---------------------------- Vecka 41 ----------------------------
  { datum: '2026-10-05', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-10-07', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-07', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-08', tid: '13:00–17:00', rubrik: 'Handledning', delkurs: 'processer', sal: 'EC2:241 Verona', larare: 'Benjamin Weaver', typ: 'handledning' },

  // ---------------------------- Vecka 42 ----------------------------
  { datum: '2026-10-12', tid: '13:00–15:00', rubrik: 'Föreläsning', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'forelasning' },
  { datum: '2026-10-13', tid: '15:00–17:00', rubrik: 'Föreläsning', delkurs: 'databaser', sal: 'MA 5', larare: 'Björn Svensson', typ: 'forelasning' },
  { datum: '2026-10-14', tid: '08:00–10:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-14', tid: '10:00–12:00', rubrik: 'Lektion', delkurs: 'databaser', sal: 'EC2:101', larare: 'Björn Svensson', typ: 'lektion' },
  { datum: '2026-10-14', tid: '10:00–12:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-14', tid: '15:00–17:00', rubrik: 'Lektion', delkurs: 'databaser', sal: 'EC2:101', larare: 'Björn Svensson', typ: 'lektion' },
  { datum: '2026-10-15', tid: '08:00–12:00', rubrik: 'Handledning', delkurs: 'processer', sal: 'EC2:241 Verona', larare: 'Benjamin Weaver', typ: 'handledning' },

  // ---------------------------- Vecka 43 ----------------------------
  { datum: '2026-10-20', tid: '10:00–12:00', rubrik: 'Workshop', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'workshop' },
  { datum: '2026-10-21', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-21', tid: '15:00–17:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-23', tid: '08:00–12:00', rubrik: 'Handledning', delkurs: 'processer', sal: 'EC2:207 Bilbao', larare: 'Benjamin Weaver', typ: 'handledning' },

  // ---------------------------- Vecka 44 ----------------------------
  { datum: '2026-10-27', tid: '10:00–12:00', rubrik: 'Seminarium', delkurs: 'processer', sal: 'MA 3', larare: 'Benjamin Weaver', typ: 'seminarium' },
  { datum: '2026-10-28', tid: '13:00–15:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },
  { datum: '2026-10-28', tid: '15:00–17:00', rubrik: 'Laboration', delkurs: 'databaser', sal: 'EC2:PC011/PC015/PC059', larare: 'Nils Törnqvist', typ: 'laboration' },

  // ---------------------------- Vecka 45 ----------------------------
  { datum: '2026-11-06', tid: '08:00–11:00', rubrik: 'Omtentamen', delkurs: 'strategi', sal: 'Skrivsal MA 9', larare: 'Benjamin Weaver', typ: 'tenta' },

  // ---------------------------- Vecka 46 ----------------------------
  { datum: '2026-11-09', tid: '10:00–17:00', rubrik: 'Redovisning av projektet', delkurs: 'databaser', sal: 'EC2:PC059', larare: 'Björn Svensson', typ: 'redovisning' },
  { datum: '2026-11-10', tid: '10:00–17:00', rubrik: 'Redovisning av projektet', delkurs: 'databaser', sal: 'EC2:PC059', larare: 'Björn Svensson', typ: 'redovisning' },
  { datum: '2026-11-11', tid: '10:00–17:00', rubrik: 'Redovisning av projektet', delkurs: 'databaser', sal: 'EC2:PC059', larare: 'Björn Svensson', typ: 'redovisning' },
  { datum: '2026-11-12', tid: '10:00–17:00', rubrik: 'Redovisning av projektet', delkurs: 'databaser', sal: 'EC2:PC059', larare: 'Björn Svensson', typ: 'redovisning' },
  { datum: '2026-11-13', tid: '08:00–13:00', rubrik: 'Tentamen', delkurs: 'processer', sal: 'Skrivsal MA 10', larare: 'Benjamin Weaver', typ: 'tenta' },

  // ---------------------------- Vecka 47 ----------------------------
  { datum: '2026-11-17', tid: '08:00–13:00', rubrik: 'Tentamen', delkurs: 'databaser', sal: 'Skrivsal MA 9', larare: 'Björn Svensson', typ: 'tenta' },
  { datum: '2026-11-18', tid: '14:00–16:00', rubrik: 'Föreläsning — introduktion', delkurs: 'arkitektur', sal: 'EC1:Crafoordsalen', larare: 'Umberto Fiaccadori', typ: 'forelasning' },
  { datum: '2026-11-19', tid: '14:00–16:00', rubrik: 'Föreläsning — introduktion', delkurs: 'sakerhet', sal: 'EC1:Crafoordsalen', larare: 'Miranda Kajtazi', typ: 'forelasning' },
  { datum: '2026-11-20', tid: '10:00–12:00', rubrik: 'Föreläsning', delkurs: 'arkitektur', sal: 'MA 3', larare: 'Umberto Fiaccadori', typ: 'forelasning' },

  // ---------------------------- Vecka 48 ----------------------------
  { datum: '2026-11-25', tid: '08:00–10:00', rubrik: 'Föreläsning — introduktion', delkurs: 'ansvarsfull', sal: 'MA 5', larare: 'Miranda Kajtazi', typ: 'forelasning' },
  { datum: '2026-11-25', tid: '12:00–14:00', rubrik: 'Föreläsning', delkurs: 'arkitektur', sal: 'EC1:Crafoordsalen', larare: 'Umberto Fiaccadori', typ: 'forelasning' },
  { datum: '2026-11-25', tid: '15:00–17:00', rubrik: 'Föreläsning', delkurs: 'sakerhet', sal: 'MA 5', larare: 'Miranda Kajtazi', typ: 'forelasning' },
  { datum: '2026-11-26', tid: '10:00–12:00', rubrik: 'Workshop', delkurs: 'ansvarsfull', sal: 'EHL:Online', larare: 'Miranda Kajtazi', typ: 'workshop' },
  { datum: '2026-11-27', tid: '14:00–19:00', rubrik: 'Tentamen', delkurs: 'arkitektur', sal: 'Skrivsal MA 10', larare: 'Umberto Fiaccadori', typ: 'tenta' },

  // ---------------------------- Vecka 49 ----------------------------
  { datum: '2026-12-01', tid: '13:00–15:00', rubrik: 'Seminarium', delkurs: 'ansvarsfull', sal: 'EC2:101', larare: 'Miranda Kajtazi', typ: 'seminarium' },
  { datum: '2026-12-01', tid: '15:00–17:00', rubrik: 'Seminarium', delkurs: 'ansvarsfull', sal: 'EC2:101', larare: 'Miranda Kajtazi', typ: 'seminarium' },
  { datum: '2026-12-03', tid: '08:00–13:00', rubrik: 'Tentamen', delkurs: 'sakerhet', sal: 'Skrivsal MA 10', larare: 'Miranda Kajtazi', typ: 'tenta' },

  // ---------------------------- Vecka 50 ----------------------------
  { datum: '2026-12-08', tid: '14:00–15:00', rubrik: 'Föreläsning — introduktion till projektrapporten', delkurs: 'isprojekt', sal: 'EC1:Crafoordsalen', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'forelasning' },

  // ---------------------------- Vecka 51 ----------------------------
  { datum: '2026-12-15', tid: '09:00–12:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2026-12-15', tid: '13:00–16:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2026-12-16', tid: '09:00–12:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2026-12-16', tid: '13:00–16:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },

  // ----------------------------- Vecka 1 -----------------------------
  { datum: '2027-01-05', tid: '08:00–13:00', rubrik: 'Omtentamen', delkurs: 'databaser', sal: 'Skrivsal MA 10', larare: 'Björn Svensson', typ: 'tenta' },
  { datum: '2027-01-07', tid: '08:00–13:00', rubrik: 'Omtentamen', delkurs: 'processer', sal: 'Skrivsal MA 9', larare: 'Benjamin Weaver', typ: 'tenta' },

  // ----------------------------- Vecka 2 -----------------------------
  { datum: '2027-01-11', tid: '09:00–12:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2027-01-11', tid: '13:00–16:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2027-01-12', tid: '09:00–12:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2027-01-12', tid: '13:00–16:00', rubrik: 'Handledning — bokad tid', delkurs: 'isprojekt', sal: 'EC2:241 Verona', larare: 'Weaver / Kajtazi / Fiaccadori', typ: 'handledning' },
  { datum: '2027-01-13', tid: '14:00–19:00', rubrik: 'Omtentamen', delkurs: 'arkitektur', sal: 'Skrivsal MA 10', larare: 'Umberto Fiaccadori', typ: 'tenta' },
  { datum: '2027-01-14', tid: '08:00–13:00', rubrik: 'Omtentamen', delkurs: 'sakerhet', sal: 'Skrivsal Sparta', larare: 'Miranda Kajtazi', typ: 'tenta' }
];

/* ------------------------- Terminen i faser ------------------------- */
window.SYSB23.terminsfaser = [
  {
    span: '31 aug – 21 sep',
    rubrik: 'Strategi och ekonomistyrning + Databaser',
    text: 'Två delkurser parallellt. Strategi är kort och intensiv – bara tre föreläsningar, sista redan 11 september.',
    tat: false
  },
  {
    span: '22 sep – 13 nov',
    rubrik: 'Databaser + Processorienterad verksamhetsutveckling',
    text: 'Processorienterad startar dagen efter Strategi-tentan – sömlöst byte. Databaser fortsätter med labbar varje vecka.',
    tat: false
  },
  {
    span: '18 nov – 3 dec',
    rubrik: 'Verksamhetsarkitektur, Säkerhet och Ansvarsfull verksamhetsutveckling',
    text: 'Tre delkurser överlappar. Onsdag 25 november har tre olika delkurser samma dag.',
    tat: true
  },
  {
    span: '8 dec – 17 jan',
    rubrik: 'Informationssystemsprojektet',
    text: 'Bara projektet, med handledning i block och en lång ledig sträcka över jul och nyår.',
    tat: false
  }
];

window.SYSB23.kalenderNoteringar = {
  tyngstaStrackan:
    'Tyngsta sträckan: redovisning 9–12 nov, tenta 13 nov, tenta 17 nov, tre nya delkurser som startar ' +
    '18–25 nov, tenta 27 nov och tenta 3 dec. Fyra salstentor på tre veckor.',
  praktiskt: [
    'Samtliga tentor är digitala och kräver egen laptop.',
    'Anmälan i Ladok senast en vecka innan tentan.',
    'MA-skrivsalarna ligger i Matteannexet, Sölvegatan 20.',
    'Skrivsal Sparta ligger på Tunavägen 39.'
  ],
  kalla: 'Avläst mot TimeEdit 1 augusti 2026. Kontrollera alltid aktuell vecka i TimeEdit – salar och tider kan ändras.',
  terminStart: '2026-08-31',
  terminSlut: '2027-01-17'
};
