import React, { useEffect, useState } from "react";
import "./styles.css";

const API = "http://localhost:3001";

export default function App() {
  const [tab, setTab] = useState("dashboard");

  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [appointments, setAppointments] = useState([]);

  // ===== FORMS =====
  const [pName, setPName] = useState("");
  const [pPhone, setPPhone] = useState("");
  const [pAddress, setPAddress] = useState("");
  const [pBirth, setPBirth] = useState("");
  const [pJob, setPJob] = useState("");

  const [dName, setDName] = useState("");
  const [dSpec, setDSpec] = useState("");
  const [dPhone, setDPhone] = useState("");

  const [cName, setCName] = useState("");
  const [cLocation, setCLocation] = useState("");

  const [deptName, setDeptName] = useState("");
  const [deptClinic, setDeptClinic] = useState("");

  // ===== LOAD DATA =====
  const loadAll = () => {
    fetch(API + "/patients").then(r => r.json()).then(d => setPatients(Array.isArray(d) ? d : []));
    fetch(API + "/doctors").then(r => r.json()).then(d => setDoctors(Array.isArray(d) ? d : []));
    fetch(API + "/clinics").then(r => r.json()).then(d => setClinics(Array.isArray(d) ? d : []));
    fetch(API + "/departments")
      .then(r => r.json())
      .then(d => setDepartments(Array.isArray(d) ? d : []))
      .catch(() => setDepartments([]));

    fetch(API + "/appointments")
      .then(r => r.json())
      .then(d => setAppointments(Array.isArray(d) ? d : []));
  };

  useEffect(() => loadAll(), []);

  // ===== PATIENT =====
  const addPatient = async () => {
    await fetch(API + "/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: pName,
        phone: pPhone,
        address: pAddress,
        birth_date: pBirth,
        job: pJob
      })
    });
    loadAll();
  };

  const deletePatient = async (id) => {
    await fetch(API + "/patients/" + id, { method: "DELETE" });
    loadAll();
  };

  // ===== DOCTOR =====
  const addDoctor = async () => {
    await fetch(API + "/doctors", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: dName,
        specialization: dSpec,
        phone: dPhone
      })
    });
    loadAll();
  };

  const deleteDoctor = async (id) => {
    await fetch(API + "/doctors/" + id, { method: "DELETE" });
    loadAll();
  };

  // ===== CLINIC =====
  const addClinic = async () => {
    await fetch(API + "/clinics", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: cName,
        location: cLocation
      })
    });
    loadAll();
  };

  const deleteClinic = async (id) => {
    await fetch(API + "/clinics/" + id, { method: "DELETE" });
    loadAll();
  };

  // ===== DEPARTMENT =====
  const addDepartment = async () => {
    await fetch(API + "/departments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: deptName,
        clinic_id: deptClinic
      })
    });
    loadAll();
  };

  const deleteDepartment = async (id) => {
    await fetch(API + "/departments/" + id, { method: "DELETE" });
    loadAll();
  };

  return (
    <div className="layout">

      {/* SIDEBAR */}
      <div className="sidebar">
        <h2>Clinic</h2>
        <p onClick={() => setTab("dashboard")}>Dashboard</p>
        <p onClick={() => setTab("patients")}>Patients</p>
        <p onClick={() => setTab("doctors")}>Doctors</p>
        <p onClick={() => setTab("clinics")}>Clinics</p>
        <p onClick={() => setTab("departments")}>Departments</p>
        <p onClick={() => setTab("appointments")}>Appointments</p>
      </div>

      {/* MAIN */}
      <div className="main">

        {/* DASHBOARD */}
        {tab === "dashboard" && (
          <div className="cards">
            <div className="card">Patients: {patients.length}</div>
            <div className="card">Doctors: {doctors.length}</div>
            <div className="card">Clinics: {clinics.length}</div>
            <div className="card">Departments: {departments.length}</div>
            <div className="card">Appointments: {appointments.length}</div>
          </div>
        )}

        {/* PATIENTS */}
        {tab === "patients" && (
          <div>
            <h2>Patients</h2>

            <div className="box">
              <input placeholder="Name" onChange={e => setPName(e.target.value)} />
              <input placeholder="Phone" onChange={e => setPPhone(e.target.value)} />
              <input placeholder="Address" onChange={e => setPAddress(e.target.value)} />
              <input placeholder="Birth Date" onChange={e => setPBirth(e.target.value)} />
              <input placeholder="Job" onChange={e => setPJob(e.target.value)} />
              <button onClick={addPatient}>Add</button>
            </div>

            <table>
              <tbody>
                {patients.map(p => (
                  <tr key={p.patient_id}>
                    <td>{p.name}</td>
                    <td>{p.phone}</td>
                    <td>{p.job}</td>
                    <td>
                      <button onClick={() => deletePatient(p.patient_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DOCTORS */}
        {tab === "doctors" && (
          <div>
            <h2>Doctors</h2>

            <div className="box">
              <input placeholder="Name" onChange={e => setDName(e.target.value)} />
              <input placeholder="Specialization" onChange={e => setDSpec(e.target.value)} />
              <input placeholder="Phone" onChange={e => setDPhone(e.target.value)} />
              <button onClick={addDoctor}>Add</button>
            </div>

            <table>
              <tbody>
                {doctors.map(d => (
                  <tr key={d.doctor_id}>
                    <td>{d.name}</td>
                    <td>{d.specialization}</td>
                    <td>
                      <button onClick={() => deleteDoctor(d.doctor_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* CLINICS */}
        {tab === "clinics" && (
          <div>
            <h2>Clinics</h2>

            <div className="box">
              <input placeholder="Name" onChange={e => setCName(e.target.value)} />
              <input placeholder="Location" onChange={e => setCLocation(e.target.value)} />
              <button onClick={addClinic}>Add</button>
            </div>

            <table>
              <tbody>
                {clinics.map(c => (
                  <tr key={c.clinic_id}>
                    <td>{c.name}</td>
                    <td>{c.location}</td>
                    <td>
                      <button onClick={() => deleteClinic(c.clinic_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* DEPARTMENTS */}
        {tab === "departments" && (
          <div>
            <h2>Departments</h2>

            <div className="box">
              <input placeholder="Department Name" onChange={e => setDeptName(e.target.value)} />

              <select onChange={e => setDeptClinic(e.target.value)}>
                <option value="">Select Clinic</option>
                {clinics.map(c => (
                  <option key={c.clinic_id} value={c.clinic_id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <button onClick={addDepartment}>Add</button>
            </div>

            <table>
              <tbody>
                {departments.map(d => (
                  <tr key={d.department_id}>
                    <td>{d.name}</td>
                    <td>{d.clinic_name || d.clinic_id}</td>
                    <td>
                      <button onClick={() => deleteDepartment(d.department_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* APPOINTMENTS (IMPROVED) */}
        {tab === "appointments" && (
          <div>
            <h2>Appointments</h2>

            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Patient</th>
                  <th>Doctor</th>
                  <th>Date</th>
                  <th>Time</th>
                </tr>
              </thead>

              <tbody>
                {appointments.map(a => (
                  <tr key={a.appointment_id}>
                    <td>{a.appointment_id}</td>
                    <td>{a.patient_name || a.patient}</td>
                    <td>{a.doctor_name || a.doctor}</td>
                    <td>{a.appointment_date}</td>
                    <td>{a.start_time} - {a.end_time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
}