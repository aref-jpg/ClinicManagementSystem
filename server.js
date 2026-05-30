const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ================= DB =================
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "ClinicDB"
});

db.connect(() => console.log("DB Connected"));

// ================= HEALTH =================
app.get("/", (req, res) => {
  res.json({ message: "Clinic API Running" });
});

// ================= PATIENTS =================
app.get("/patients", (req, res) => {
  db.query("SELECT * FROM Patient ORDER BY patient_id DESC", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/patients", (req, res) => {
  const { name, phone, address, birth_date, job } = req.body;

  db.query(
    "INSERT INTO Patient (name, phone, address, birth_date, job) VALUES (?,?,?,?,?)",
    [name, phone, address, birth_date, job],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Patient added" });
    }
  );
});

app.delete("/patients/:id", (req, res) => {
  db.query("DELETE FROM Patient WHERE patient_id=?", [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Patient deleted" });
  });
});

// ================= DOCTORS =================
app.get("/doctors", (req, res) => {
  db.query("SELECT * FROM Doctor", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/doctors", (req, res) => {
  const { name, specialization, phone } = req.body;

  db.query(
    "INSERT INTO Doctor (name, specialization, phone) VALUES (?,?,?)",
    [name, specialization, phone],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Doctor added" });
    }
  );
});

app.delete("/doctors/:id", (req, res) => {
  db.query("DELETE FROM Doctor WHERE doctor_id=?", [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Doctor deleted" });
  });
});

// ================= CLINICS =================
app.get("/clinics", (req, res) => {
  db.query("SELECT * FROM Clinic", (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/clinics", (req, res) => {
  const { name, location } = req.body;

  db.query(
    "INSERT INTO Clinic (name, location) VALUES (?,?)",
    [name, location],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Clinic added" });
    }
  );
});

app.delete("/clinics/:id", (req, res) => {
  db.query("DELETE FROM Clinic WHERE clinic_id=?", [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Clinic deleted" });
  });
});

// ================= DEPARTMENTS =================
app.get("/departments", (req, res) => {
  db.query(`
    SELECT 
      d.department_id,
      d.name,
      d.clinic_id,
      c.name AS clinic_name
    FROM Department d
    LEFT JOIN Clinic c ON d.clinic_id = c.clinic_id
  `, (err, result) => {
    if (err) return res.status(500).json(err);
    res.json(result);
  });
});

app.post("/departments", (req, res) => {
  const { name, clinic_id } = req.body;

  db.query(
    "INSERT INTO Department (name, clinic_id) VALUES (?,?)",
    [name, clinic_id],
    err => {
      if (err) return res.status(500).json(err);
      res.json({ message: "Department added" });
    }
  );
});

app.delete("/departments/:id", (req, res) => {
  db.query("DELETE FROM Department WHERE department_id=?", [req.params.id], err => {
    if (err) return res.status(500).json(err);
    res.json({ message: "Department deleted" });
  });
});

// ================= APPOINTMENTS =================
app.get("/appointments", (req, res) => {
  db.query(`
    SELECT 
      a.appointment_id,
      a.appointment_date,
      a.start_time,
      a.end_time,
      a.status,

      p.patient_id,
      p.name AS patient_name,

      d.doctor_id,
      d.name AS doctor_name

    FROM Appointment a
    LEFT JOIN Patient p ON a.patient_id = p.patient_id
    LEFT JOIN Doctor d ON a.doctor_id = d.doctor_id
    ORDER BY a.appointment_id DESC
  `, (err, result) => {
    if (err) {
      console.log(err);
      return res.json([]);
    }
    res.json(result);
  });
});
// ================= START =================
app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});