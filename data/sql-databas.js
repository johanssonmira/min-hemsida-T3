/* =========================================================================
   sql-databas.js – exempeldatabasen som SQL-verkstaden kör mot.

   Schemat följer kursens eget övningsmaterial: sjukhusdelen (Unit,
   Employee, Patient, Car, Disease) och universitetsdelen (Student,
   Course, HasStudied). Båda finns i samma databas så att övningarna kan
   variera utan att man måste byta databas mitt i.

   Datan är medvetet konstruerad. Här finns
     – en patient utan adress och en anställd utan chef (NULL-övningar)
     – en bil utan ägare (outer join)
     – anställda med samma adress som patienter (union och mängdfrågor)
     – en student som läst alla kurser och en som inte gjort det (division)
     – en sjukdom som ingen lider av och en enhet utan patienter (NOT EXISTS,
       outer join med COUNT)
   Ändras datan måste facit i sql-ovningar.js räknas om.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.sqlSchema = [

  /* ------------------------------- Sjukhuset ------------------------------- */
  `CREATE TABLE Unit (
     UnitID    INTEGER PRIMARY KEY,
     UnitNo    TEXT NOT NULL UNIQUE,
     UnitName  TEXT NOT NULL
   );`,

  `CREATE TABLE Employee (
     EmployeeID INTEGER PRIMARY KEY,
     EmpNo      TEXT NOT NULL UNIQUE,
     EmpName    TEXT NOT NULL,
     EmpAddress TEXT,
     Salary     INTEGER NOT NULL,
     UnitID     INTEGER REFERENCES Unit(UnitID),
     ManagerID  INTEGER REFERENCES Employee(EmployeeID)
   );`,

  `CREATE TABLE Patient (
     PatientID      INTEGER PRIMARY KEY,
     PatientNo      TEXT NOT NULL UNIQUE,
     PatientName    TEXT NOT NULL,
     PatientAddress TEXT,
     UnitID         INTEGER REFERENCES Unit(UnitID)
   );`,

  `CREATE TABLE Car (
     CarID      INTEGER PRIMARY KEY,
     CarNo      TEXT NOT NULL UNIQUE,
     Brand      TEXT NOT NULL,
     Price      INTEGER NOT NULL,
     EmployeeID INTEGER REFERENCES Employee(EmployeeID)
   );`,

  `CREATE TABLE Disease (
     DiseaseID   INTEGER PRIMARY KEY,
     DiseaseName TEXT NOT NULL UNIQUE
   );`,

  `CREATE TABLE SuffersFrom (
     PatientID INTEGER NOT NULL REFERENCES Patient(PatientID),
     DiseaseID INTEGER NOT NULL REFERENCES Disease(DiseaseID),
     PRIMARY KEY (PatientID, DiseaseID)
   );`,

  `CREATE TABLE Examines (
     EmployeeID INTEGER NOT NULL REFERENCES Employee(EmployeeID),
     PatientID  INTEGER NOT NULL REFERENCES Patient(PatientID),
     ExamDate   TEXT NOT NULL,
     PRIMARY KEY (EmployeeID, PatientID, ExamDate)
   );`,

  /* ------------------------------ Universitetet ---------------------------- */
  `CREATE TABLE Student (
     StudentID      INTEGER PRIMARY KEY,
     StudentNo      TEXT NOT NULL UNIQUE,
     StudentName    TEXT NOT NULL,
     StudentAddress TEXT
   );`,

  `CREATE TABLE Course (
     CourseID   INTEGER PRIMARY KEY,
     CourseCode TEXT NOT NULL UNIQUE,
     CourseName TEXT NOT NULL,
     Credits    INTEGER NOT NULL
   );`,

  `CREATE TABLE HasStudied (
     StudentID INTEGER NOT NULL REFERENCES Student(StudentID),
     CourseID  INTEGER NOT NULL REFERENCES Course(CourseID),
     Grade     INTEGER NOT NULL,
     PRIMARY KEY (StudentID, CourseID)
   );`
];

window.SYSB23.sqlData = [

  `INSERT INTO Unit (UnitID, UnitNo, UnitName) VALUES
     (1, 'U1', 'Trauma'),
     (2, 'U2', 'Kardiologi'),
     (3, 'U3', 'Ortopedi'),
     (4, 'U4', 'Radiologi');`,

  /* Eva Lind saknar chef – hon är verksamhetschef. Nils Ek saknar adress. */
  `INSERT INTO Employee (EmployeeID, EmpNo, EmpName, EmpAddress, Salary, UnitID, ManagerID) VALUES
     (1, 'E1', 'Eva Lind',      'Bredgatan 4, Lund',    52000, 1, NULL),
     (2, 'E2', 'Karl Ohlsson',  'Bredgatan 4, Lund',    41000, 1, 1),
     (3, 'E3', 'Mary Sue',      'Klostergatan 5, Lund', 38000, 2, 1),
     (4, 'E4', 'Max Berg',      'Kyrkogatan 12, Lund',  36000, 2, 3),
     (5, 'E5', 'Nils Ek',       NULL,                   29000, 3, 1),
     (6, 'E6', 'Sara Holm',     'Kyrkogatan 12, Lund',  47000, 3, 1);`,

  /* Petra Sund saknar adress. */
  `INSERT INTO Patient (PatientID, PatientNo, PatientName, PatientAddress, UnitID) VALUES
     (1, 'PP1', 'Anna Persson', 'Kyrkogatan 12, Lund',  1),
     (2, 'PP2', 'Bo Nilsson',   'Stora vägen 7, Malmö', 1),
     (3, 'PP3', 'Cecilia Ek',   'Bredgatan 4, Lund',    2),
     (4, 'PP4', 'David Ohlin',  'Norra vägen 3, Malmö', 2),
     (5, 'PP5', 'Petra Sund',   NULL,                   3);`,

  /* Teslan saknar ägare – den används i outer join-övningarna. */
  `INSERT INTO Car (CarID, CarNo, Brand, Price, EmployeeID) VALUES
     (1, 'ABC123', 'Volvo',  185000, 1),
     (2, 'DEF456', 'Volvo',  142000, 3),
     (3, 'GHI789', 'Saab',    98000, 3),
     (4, 'JKL012', 'Tesla',  410000, NULL),
     (5, 'MNO345', 'Volvo',  167000, 6);`,

  /* Malaria är med men ingen lider av den. */
  `INSERT INTO Disease (DiseaseID, DiseaseName) VALUES
     (1, 'Astma'),
     (2, 'Diabetes'),
     (3, 'Migran'),
     (4, 'Malaria');`,

  `INSERT INTO SuffersFrom (PatientID, DiseaseID) VALUES
     (1, 1), (1, 2),
     (2, 2),
     (3, 3),
     (4, 1), (4, 2), (4, 3);`,

  /* Eva undersöker alla tre patienter på Trauma och Kardiologi-patienten
     Cecilia; Karl undersöker bara två. Används i divisionsövningen. */
  `INSERT INTO Examines (EmployeeID, PatientID, ExamDate) VALUES
     (1, 1, '2026-09-01'),
     (1, 2, '2026-09-01'),
     (1, 3, '2026-09-02'),
     (2, 1, '2026-09-03'),
     (2, 2, '2026-09-03'),
     (3, 3, '2026-09-04'),
     (3, 4, '2026-09-04'),
     (6, 5, '2026-09-05');`,

  `INSERT INTO Student (StudentID, StudentNo, StudentName, StudentAddress) VALUES
     (1, 'S1', 'Alice Berg',  'Tunavagen 39, Lund'),
     (2, 'S2', 'Mary Sue',    'Bredgatan 4, Lund'),
     (3, 'S3', 'Chloe Falk',  NULL),
     (4, 'S4', 'David Ohlin', 'Bredgatan 4, Lund');`,

  `INSERT INTO Course (CourseID, CourseCode, CourseName, Credits) VALUES
     (1, 'SYSB23', 'Informationssystemsutveckling', 30),
     (2, 'INFC50', 'Databaser',                     15),
     (3, 'INFC55', 'Strategi',                       7);`,

  /* Alice har läst alla tre kurserna – hon är svaret på divisionsfrågan. */
  `INSERT INTO HasStudied (StudentID, CourseID, Grade) VALUES
     (1, 1, 6), (1, 2, 8), (1, 3, 7),
     (2, 1, 7), (2, 2, 9),
     (3, 2, 6),
     (4, 1, 8), (4, 3, 6);`
];

/* Kort beskrivning av varje tabell, för "Visa tabeller"-rutan. */
window.SYSB23.sqlTabeller = [
  { namn: 'Unit',        text: 'Sjukhusets enheter.' },
  { namn: 'Employee',    text: 'Anställda. ManagerID pekar på en annan anställd — självjoin.' },
  { namn: 'Patient',     text: 'Patienter, kopplade till en enhet.' },
  { namn: 'Car',         text: 'Tjänstebilar. EmployeeID kan vara NULL.' },
  { namn: 'Disease',     text: 'Sjukdomar.' },
  { namn: 'SuffersFrom', text: 'Vilka patienter som lider av vilka sjukdomar (M:N).' },
  { namn: 'Examines',    text: 'Vilka anställda som undersöker vilka patienter (M:N).' },
  { namn: 'Student',     text: 'Studenter.' },
  { namn: 'Course',      text: 'Kurser.' },
  { namn: 'HasStudied',  text: 'Betyg per student och kurs (M:N med relationsattribut).' }
];
