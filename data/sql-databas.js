/* =========================================================================
   sql-databas.js – databaserna SQL-verkstaden övar mot.

   Två stycken, och båda kommer ur kursen — inte ur mitt huvud:

   1. Sjukhuset. Kursens egen hospital-ddl.sql, ordagrant. Det är den
      databasen laborationerna och SQL-uppgiften använder, så tabell- och
      kolumnnamnen här är de du faktiskt ska kunna.

   2. Studenter och kurser. Tabellerna i tentans uppgift 4, som ensam är
      värd 30 av 100 poäng. Både omtentan och uppsamlingstentan HT25
      använder exakt de här raderna.

   DDL:en är skriven i T-SQL, precis som kursen skriver den — IDENTITY,
   NVARCHAR, namngivna constraints. js/tsql.js översätter till SQLite vid
   körning. Det är inte en omväg utan själva poängen: det du läser här är
   det du ska skriva på tentan.

   Kolumnlistorna under varje tabell är en enda källa som driver tre saker:
   tabellrutan i verkstaden, schemadiagrammet, och tsql.js gissning om
   huruvida + betyder plus eller sammanfogning.
   ========================================================================= */

window.SYSB23 = window.SYSB23 || {};

window.SYSB23.sqlDatabaser = [

  /* ------------------------------------------------------------------ */
  /* 1. Sjukhuset — kursens labbdatabas                                  */
  /* ------------------------------------------------------------------ */
  {
    id: 'sjukhus',
    namn: 'Sjukhuset',
    kort: 'Kursens egen hospital-ddl.sql, oförändrad.',
    beskrivning:
      'Åtta tabeller: enheter, anställda, patienter, sjukdomar och bilar. ' +
      'Två av kopplingstabellerna är värda att hålla isär — **Suffers** är ' +
      'sjukdomar patienten har nu och har ett startdatum, **HasSuffered** är ' +
      'sådana patienten har haft.',

    ddl:
'CREATE TABLE Unit (\n' +
'    UnitID      INTEGER IDENTITY(1,1),\n' +
'    UnitNo      CHAR(5) NOT NULL,\n' +
'    UnitName    VARCHAR(50),\n' +
'    UnitAddress VARCHAR(100),\n' +
'    CONSTRAINT PK_Unit_UnitID PRIMARY KEY(UnitID),\n' +
'    CONSTRAINT UQ_Unit_UnitNo UNIQUE(UnitNo)\n' +
');\n\n' +

'CREATE TABLE Employee (\n' +
'    EmployeeID      INTEGER IDENTITY(1,1),\n' +
'    EmpNo           CHAR(11) NOT NULL,\n' +
'    EmpName         VARCHAR(50),\n' +
'    EmpAddress      VARCHAR(100),\n' +
'    EmpPhoneNumber  CHAR(10),\n' +
'    EmpSalary       INT,\n' +
'    UnitID          INTEGER,\n' +
'    CONSTRAINT PK_Employee_EmployeeID PRIMARY KEY(EmployeeID),\n' +
'    CONSTRAINT UQ_Employee_EmpNo UNIQUE(EmpNo),\n' +
'    CONSTRAINT FK_Employee_Unit_UnitID FOREIGN KEY(UnitID) REFERENCES Unit(UnitID)\n' +
');\n\n' +

'CREATE TABLE Patient (\n' +
'    PatientID       INTEGER IDENTITY(1,1),\n' +
'    PatientNo       CHAR(11) NOT NULL,\n' +
'    PatientName     VARCHAR(50) NOT NULL,\n' +
'    PatientAddress  VARCHAR(100),\n' +
'    PatientPhoneNumber CHAR(10),\n' +
'    UnitID          INTEGER,\n' +
'    CONSTRAINT PK_Patient_PatientID PRIMARY KEY(PatientID),\n' +
'    CONSTRAINT UQ_Patient_PatientNo UNIQUE(PatientNo),\n' +
'    CONSTRAINT FK_Patient_Unit_UnitID FOREIGN KEY(UnitID) REFERENCES Unit(UnitID)\n' +
');\n\n' +

'CREATE TABLE Illness (\n' +
'    IllnessID       INTEGER IDENTITY(1,1),\n' +
'    IllnessName     NVARCHAR(50) NOT NULL,\n' +
'    CONSTRAINT PK_Illness_IllnessID PRIMARY KEY(IllnessID),\n' +
'    CONSTRAINT UQ_Illness_IllnessName UNIQUE(IllnessName)\n' +
');\n\n' +

'CREATE TABLE Examines (\n' +
'    EmployeeID  INTEGER,\n' +
'    PatientID   INTEGER,\n' +
'    CONSTRAINT PK_Examines PRIMARY KEY(EmployeeID, PatientID),\n' +
'    CONSTRAINT FK_Examines_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(EmployeeID),\n' +
'    CONSTRAINT FK_Examines_Patient FOREIGN KEY(PatientID) REFERENCES Patient(PatientID)\n' +
');\n\n' +

'CREATE TABLE Suffers (\n' +
'    IllnessID   INTEGER NOT NULL,\n' +
'    PatientID   INTEGER NOT NULL,\n' +
'    StartDate   DATETIME,\n' +
'    CONSTRAINT PK_Suffers PRIMARY KEY(IllnessID, PatientID),\n' +
'    CONSTRAINT FK_Suffers_Illness FOREIGN KEY(IllnessID) REFERENCES Illness(IllnessID),\n' +
'    CONSTRAINT FK_Suffers_Patient FOREIGN KEY(PatientID) REFERENCES Patient(PatientID)\n' +
');\n\n' +

'CREATE TABLE HasSuffered (\n' +
'    IllnessID   INTEGER NOT NULL,\n' +
'    PatientID   INTEGER NOT NULL,\n' +
'    CONSTRAINT PK_HasSuffered PRIMARY KEY(IllnessID, PatientID),\n' +
'    CONSTRAINT FK_HasSuffered_Illness FOREIGN KEY(IllnessID) REFERENCES Illness(IllnessID),\n' +
'    CONSTRAINT FK_HasSuffered_Patient FOREIGN KEY(PatientID) REFERENCES Patient(PatientID)\n' +
');\n\n' +

'CREATE TABLE Car (\n' +
'    CarID           INTEGER IDENTITY(1,1),\n' +
'    LicenseNo       CHAR(10) NOT NULL,\n' +
'    Brand           VARCHAR(50),\n' +
'    Price           INT,\n' +
'    EmployeeID      INTEGER NULL,\n' +
'    CONSTRAINT PK_Car_CarID PRIMARY KEY(CarID),\n' +
'    CONSTRAINT UQ_Car_LicenseNo UNIQUE(LicenseNo),\n' +
'    CONSTRAINT FK_Car_Employee FOREIGN KEY(EmployeeID) REFERENCES Employee(EmployeeID)\n' +
');',

    data:
"INSERT INTO Unit (UnitNo, UnitName, UnitAddress) VALUES\n" +
"    ('U1', 'General Surgery', 'Hospital road'),\n" +
"    ('U2', 'Rehabilitation', 'Hospital road'),\n" +
"    ('U3', 'Trauma', 'Care road');\n\n" +

"INSERT INTO Employee (EmpNo, EmpName, EmpAddress, EmpPhoneNumber, EmpSalary, UnitID) VALUES\n" +
"    ('E1', 'Anna', 'Lund', '111', 25000, (SELECT UnitID FROM Unit WHERE UnitNo = 'U1')),\n" +
"    ('E2', 'Eva', 'Eslöv', '222', 55000, (SELECT UnitID FROM Unit WHERE UnitNo = 'U1')),\n" +
"    ('E3', 'Anna', 'Lund', '333', 37500, (SELECT UnitID FROM Unit WHERE UnitNo = 'U2')),\n" +
"    ('E4', 'Hans', 'Eslöv', '444', 18000, (SELECT UnitID FROM Unit WHERE UnitNo = 'U2')),\n" +
"    ('E5', 'Eva', 'Malmö', '555', 279000, (SELECT UnitID FROM Unit WHERE UnitNo = 'U3')),\n" +
"    ('E6', 'Peter', 'Dalby', '666', 32000, (SELECT UnitID FROM Unit WHERE UnitNo = 'U1'));\n\n" +

"INSERT INTO Patient (PatientNo, PatientName, PatientAddress, PatientPhoneNumber, UnitID) VALUES\n" +
"    ('PP1', 'Anna', 'Lund', '111', (SELECT UnitID FROM Unit WHERE UnitNo = 'U1')),\n" +
"    ('PP2', 'Hans', 'Dalby', '777', (SELECT UnitID FROM Unit WHERE UnitNo = 'U1')),\n" +
"    ('PP3', 'Bo', 'Lund', '888', (SELECT UnitID FROM Unit WHERE UnitNo = 'U3')),\n" +
"    ('PP4', 'Peter', 'Lund', '999', (SELECT UnitID FROM Unit WHERE UnitNo = 'U3')),\n" +
"    ('PP5', 'Anna', 'London', '100', (SELECT UnitID FROM Unit WHERE UnitNo = 'U2')),\n" +
"    ('PP6', 'Anna', 'Berlin', '111', (SELECT UnitID FROM Unit WHERE UnitNo = 'U1'));\n\n" +

"INSERT INTO Examines (EmployeeID, PatientID) VALUES\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E1'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E1'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP2')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E1'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E2'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E2'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E3'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E3'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP4')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E3'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP5')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E4'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP5')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E4'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT EmployeeID FROM Employee WHERE EmpNo = 'E4'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP4'));\n\n" +

"INSERT INTO Illness (IllnessName) VALUES\n" +
"    ('Insomnia'),\n" +
"    ('Love sickness'),\n" +
"    ('Cough'),\n" +
"    ('Amnesia'),\n" +
"    ('Incontinence'),\n" +
"    ('Chickenpox');\n\n" +

"INSERT INTO Suffers (IllnessID, PatientID, StartDate) VALUES\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Insomnia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1'), '1953-01-12'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Insomnia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP2'), '2006-10-16'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Insomnia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3'), '1978-01-05'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Love sickness'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1'), '2008-08-08'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Love sickness'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP2'), '2003-01-22'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Cough'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP4'), '1998-06-07'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Cough'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3'), '1978-05-23'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Incontinence'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP6'), '1989-11-11'),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Amnesia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP6'), '2010-12-09');\n\n" +

"INSERT INTO HasSuffered (IllnessID, PatientID) VALUES\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Love sickness'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Love sickness'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP2')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Cough'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Cough'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP1')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Love sickness'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Cough'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP4')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Insomnia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP3')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Insomnia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP6')),\n" +
"    ((SELECT IllnessID FROM Illness WHERE IllnessName = 'Amnesia'), (SELECT PatientID FROM Patient WHERE PatientNo = 'PP6'));\n\n" +

"INSERT INTO Car (LicenseNo, Brand, Price, EmployeeID) VALUES\n" +
"    ('C1', 'saab', 30000, NULL),\n" +
"    ('C2', 'saab', 40000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E1')),\n" +
"    ('C3', 'volvo', 50000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E2')),\n" +
"    ('C4', 'volvo', 60000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E3')),\n" +
"    ('C5', 'audi', 70000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E4')),\n" +
"    ('C6', 'audi', 30000, NULL),\n" +
"    ('C7', 'saab', 30000, (SELECT EmployeeID FROM Employee WHERE EmpNo = 'E5'));",

    tabeller: [
      {
        namn: 'Unit', text: 'Sjukhusets enheter.',
        kolumner: [
          { namn: 'UnitID',      typ: 'INTEGER',      roll: 'pk' },
          { namn: 'UnitNo',      typ: 'CHAR(5)',      roll: 'unik' },
          { namn: 'UnitName',    typ: 'VARCHAR(50)' },
          { namn: 'UnitAddress', typ: 'VARCHAR(100)' }
        ]
      },
      {
        namn: 'Employee', text: 'Anställda. Två heter Anna, två heter Eva.',
        kolumner: [
          { namn: 'EmployeeID',     typ: 'INTEGER',      roll: 'pk' },
          { namn: 'EmpNo',          typ: 'CHAR(11)',     roll: 'unik' },
          { namn: 'EmpName',        typ: 'VARCHAR(50)' },
          { namn: 'EmpAddress',     typ: 'VARCHAR(100)' },
          { namn: 'EmpPhoneNumber', typ: 'CHAR(10)' },
          { namn: 'EmpSalary',      typ: 'INT' },
          { namn: 'UnitID',         typ: 'INTEGER',      roll: 'fk', mot: 'Unit' }
        ]
      },
      {
        namn: 'Patient', text: 'Patienter. Fyra av sex heter Anna.',
        kolumner: [
          { namn: 'PatientID',          typ: 'INTEGER',      roll: 'pk' },
          { namn: 'PatientNo',          typ: 'CHAR(11)',     roll: 'unik' },
          { namn: 'PatientName',        typ: 'VARCHAR(50)' },
          { namn: 'PatientAddress',     typ: 'VARCHAR(100)' },
          { namn: 'PatientPhoneNumber', typ: 'CHAR(10)' },
          { namn: 'UnitID',             typ: 'INTEGER',      roll: 'fk', mot: 'Unit' }
        ]
      },
      {
        namn: 'Illness', text: 'Sjukdomar. Chickenpox har ingen patient — bra för NOT EXISTS.',
        kolumner: [
          { namn: 'IllnessID',   typ: 'INTEGER',      roll: 'pk' },
          { namn: 'IllnessName', typ: 'NVARCHAR(50)', roll: 'unik' }
        ]
      },
      {
        namn: 'Examines', text: 'Vilken anställd undersöker vilken patient. Ren kopplingstabell.',
        kolumner: [
          { namn: 'EmployeeID', typ: 'INTEGER', roll: 'pkfk', mot: 'Employee' },
          { namn: 'PatientID',  typ: 'INTEGER', roll: 'pkfk', mot: 'Patient' }
        ]
      },
      {
        namn: 'Suffers', text: 'Sjukdomar patienten har NU, med startdatum.',
        kolumner: [
          { namn: 'IllnessID', typ: 'INTEGER',  roll: 'pkfk', mot: 'Illness' },
          { namn: 'PatientID', typ: 'INTEGER',  roll: 'pkfk', mot: 'Patient' },
          { namn: 'StartDate', typ: 'DATETIME' }
        ]
      },
      {
        namn: 'HasSuffered', text: 'Sjukdomar patienten HAR HAFT. Ingen tid, bara kopplingen.',
        kolumner: [
          { namn: 'IllnessID', typ: 'INTEGER', roll: 'pkfk', mot: 'Illness' },
          { namn: 'PatientID', typ: 'INTEGER', roll: 'pkfk', mot: 'Patient' }
        ]
      },
      {
        namn: 'Car', text: 'Bilar. Två saknar ägare — därför är den bra för NULL och OUTER JOIN.',
        kolumner: [
          { namn: 'CarID',      typ: 'INTEGER',     roll: 'pk' },
          { namn: 'LicenseNo',  typ: 'CHAR(10)',    roll: 'unik' },
          { namn: 'Brand',      typ: 'VARCHAR(50)' },
          { namn: 'Price',      typ: 'INT' },
          { namn: 'EmployeeID', typ: 'INTEGER',     roll: 'fk', mot: 'Employee' }
        ]
      }
    ]
  },

  /* ------------------------------------------------------------------ */
  /* 2. Studenter och kurser — tentans uppgift 4                         */
  /* ------------------------------------------------------------------ */
  {
    id: 'tenta',
    namn: 'Studenter och kurser',
    kort: 'Tabellerna i tentans uppgift 4 — 30 av 100 poäng.',
    beskrivning:
      'Raderna är hämtade ur databastentorna HT25 och står oförändrade. ' +
      'Uppgift 4 ber om **en enda fråga** som svarar på något i stil med ' +
      '"kurskod, namn och snittbetyg för kurser som lästs av S1 men inte av ' +
      'S2", eller "studenter äldre än S4 som läst minst två kurser". ' +
      'Övningarna på nivå 5 till 9 tränar precis den typen av fråga.\n\n' +
      'Lägg märke till adresserna. Codd street och Chen street är inte ' +
      'slumpmässiga — det är Edgar Codd som gav oss relationsmodellen och ' +
      'Peter Chen som gav oss ER-diagrammet.',

    ddl:
'CREATE TABLE Student (\n' +
'    StudentNo   CHAR(3) NOT NULL,\n' +
'    Name        VARCHAR(50) NOT NULL,\n' +
'    Age         INT,\n' +
'    Address     VARCHAR(100),\n' +
'    CONSTRAINT PK_Student_StudentNo PRIMARY KEY(StudentNo)\n' +
');\n\n' +

'CREATE TABLE Course (\n' +
'    Code        CHAR(3) NOT NULL,\n' +
'    Name        VARCHAR(50) NOT NULL,\n' +
'    Credits     INT,\n' +
'    CONSTRAINT PK_Course_Code PRIMARY KEY(Code)\n' +
');\n\n' +

'CREATE TABLE HasStudied (\n' +
'    StudentNo   CHAR(3) NOT NULL,\n' +
'    Code        CHAR(3) NOT NULL,\n' +
'    Grade       INT,\n' +
'    CONSTRAINT PK_HasStudied PRIMARY KEY(StudentNo, Code),\n' +
'    CONSTRAINT FK_HasStudied_Student FOREIGN KEY(StudentNo) REFERENCES Student(StudentNo),\n' +
'    CONSTRAINT FK_HasStudied_Course FOREIGN KEY(Code) REFERENCES Course(Code)\n' +
');',

    data:
"INSERT INTO Student (StudentNo, Name, Age, Address) VALUES\n" +
"    ('S1', 'Phoebe', 27, 'Main street'),\n" +
"    ('S2', 'Olivia', 32, 'Main street'),\n" +
"    ('S3', 'Max',    18, 'Codd street'),\n" +
"    ('S4', 'Gary',   33, 'Chen street');\n\n" +

"INSERT INTO Course (Code, Name, Credits) VALUES\n" +
"    ('C1', 'Databases', 5),\n" +
"    ('C2', 'Java', 10),\n" +
"    ('C3', 'Artificial Intelligence', 15);\n\n" +

"INSERT INTO HasStudied (StudentNo, Code, Grade) VALUES\n" +
"    ('S1', 'C1', 7),\n" +
"    ('S1', 'C2', 8),\n" +
"    ('S2', 'C3', 6),\n" +
"    ('S2', 'C1', 9),\n" +
"    ('S3', 'C2', 5);",

    tabeller: [
      {
        namn: 'Student', text: 'Fyra studenter. Gary har inte läst någonting — han finns bara i Student.',
        kolumner: [
          { namn: 'StudentNo', typ: 'CHAR(3)',      roll: 'pk' },
          { namn: 'Name',      typ: 'VARCHAR(50)' },
          { namn: 'Age',       typ: 'INT' },
          { namn: 'Address',   typ: 'VARCHAR(100)' }
        ]
      },
      {
        namn: 'Course', text: 'Tre kurser med olika poängtal.',
        kolumner: [
          { namn: 'Code',    typ: 'CHAR(3)',     roll: 'pk' },
          { namn: 'Name',    typ: 'VARCHAR(50)' },
          { namn: 'Credits', typ: 'INT' }
        ]
      },
      {
        namn: 'HasStudied', text: 'Vem har läst vad, och med vilket betyg.',
        kolumner: [
          { namn: 'StudentNo', typ: 'CHAR(3)', roll: 'pkfk', mot: 'Student' },
          { namn: 'Code',      typ: 'CHAR(3)', roll: 'pkfk', mot: 'Course' },
          { namn: 'Grade',     typ: 'INT' }
        ]
      }
    ]
  }
];

/* Namnen på alla textkolumner i båda databaserna. tsql.js använder listan
   för att avgöra om + betyder addition eller sammanfogning. */
window.SYSB23.sqlTextkolumner = (function () {
  var namn = [];
  window.SYSB23.sqlDatabaser.forEach(function (db) {
    db.tabeller.forEach(function (tab) {
      tab.kolumner.forEach(function (kol) {
        if (/CHAR|TEXT/i.test(kol.typ)) namn.push(kol.namn);
      });
    });
  });
  return namn;
})();
