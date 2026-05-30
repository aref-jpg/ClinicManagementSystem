USE ClinicDB;

-- ================= DEPARTMENTS =================
INSERT INTO Department VALUES
(1,'Cardiology'), (2,'Gastroenterology'), (3,'Dermatology'),
(4,'Neurology'), (5,'Orthopedics'), (6,'Pediatrics'),
(7,'Oncology'), (8,'ENT'), (9,'Ophthalmology'), (10,'Urology');

-- ================= CLINICS =================
INSERT INTO Clinic VALUES
(101,'Heart Care Clinic','Cairo',1),
(102,'Skin Clinic','Giza',3),
(103,'Brain Clinic','Cairo',4),
(104,'Bone Clinic','Giza',5),
(105,'Kids Clinic','Cairo',6),
(106,'Cancer Center','Giza',7),
(107,'Eye Center','Cairo',9),
(108,'Urology Center','Giza',10),
(109,'ENT Clinic','Cairo',8),
(110,'Cardio Plus','Giza',1);

-- ================= DOCTORS =================
INSERT INTO Doctor VALUES
(1001,'Dr Ahmed','01011111111','Cairo',1),
(1002,'Dr Sara','01022222222','Giza',3),
(1003,'Dr Ali','01033333333','Cairo',4),
(1004,'Dr Mona','01044444444','Giza',5),
(1005,'Dr Youssef','01055555555','Cairo',6),
(1006,'Dr Nour','01066666666','Giza',7),
(1007,'Dr Hossam','01077777777','Cairo',8),
(1008,'Dr Aya','01088888888','Giza',9),
(1009,'Dr Omar','01099999999','Cairo',10),
(1010,'Dr Lina','01010101010','Giza',1);

-- ================= PATIENTS =================
INSERT INTO Patient VALUES
(2001,'Mohamed','0111111111','Cairo','1999-01-01','Engineer'),
(2002,'Sara','0112222222','Giza','2000-02-02','Student'),
(2003,'Ali','0113333333','Cairo','1998-03-03','Teacher'),
(2004,'Mona','0114444444','Giza','1997-04-04','Doctor'),
(2005,'Omar','0115555555','Cairo','2001-05-05','Designer'),
(2006,'Yara','0116666666','Giza','2002-06-06','Engineer'),
(2007,'Kareem','0117777777','Cairo','1995-07-07','Manager'),
(2008,'Nour','0118888888','Giza','1996-08-08','Student'),
(2009,'Hassan','0119999999','Cairo','1994-09-09','Engineer'),
(2010,'Laila','0110000000','Giza','2003-10-10','Teacher');

-- ================= APPOINTMENTS =================
INSERT INTO Appointment VALUES
(1,'2026-06-01','10:00','10:30',300,'scheduled','checkup',2001,1001,101),
(2,'2026-06-02','11:00','11:30',400,'completed','diabetes',2002,1002,102),
(3,'2026-06-03','12:00','12:30',250,'scheduled','migraine',2003,1003,103),
(4,'2026-06-04','09:00','09:30',500,'in progress','heart disease',2004,1001,101),
(5,'2026-06-05','13:00','13:30',350,'scheduled','skin rash',2005,1002,102),
(6,'2026-06-06','14:00','14:30',450,'completed','bone pain',2006,1004,104),
(7,'2026-06-07','15:00','15:30',600,'scheduled','cancer check',2007,1006,106),
(8,'2026-06-08','16:00','16:30',200,'postponed','eye exam',2008,1008,107),
(9,'2026-06-09','10:30','11:00',300,'scheduled','ENT infection',2009,1007,109),
(10,'2026-06-10','11:30','12:00',280,'completed','kidney check',2010,1009,108);