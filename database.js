    // ================= BACKEND (Node.js + Express + MySQL) =================

    const express = require('express');
    const mysql = require('mysql2');
    const cors = require('cors');

    const app = express();
    app.use(cors());
    app.use(express.json());

    const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ClinicDB'
    });

    // -------- Patients --------
    app.get('/patients', (req, res) => {
    db.query('SELECT * FROM Patient', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
    });

    app.post('/patients', (req, res) => {
    const { name, phone, address, birth_date, job } = req.body;
    db.query(
        'INSERT INTO Patient (name, phone, address, birth_date, job) VALUES (?, ?, ?, ?, ?)',
        [name, phone, address, birth_date, job],
        (err) => {
        if (err) return res.status(500).send(err);
        res.send('Patient added');
        }
    );
    });

    // -------- Doctors --------
    app.get('/doctors', (req, res) => {
    db.query('SELECT * FROM Doctor', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
    });

    // -------- Appointments --------
    app.get('/appointments', (req, res) => {
    db.query('SELECT * FROM Appointment', (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
    });

    // Prevent overlapping appointments
    app.post('/appointments', (req, res) => {
    const { patient_id, doctor_id, appointment_date, start_time, end_time } = req.body;

    const checkQuery = `
        SELECT * FROM Appointment
        WHERE doctor_id = ?
        AND appointment_date = ?
        AND (
        (start_time < ? AND end_time > ?) OR
        (start_time < ? AND end_time > ?)
        )
    `;

    db.query(checkQuery, [doctor_id, appointment_date, end_time, start_time, end_time, start_time], (err, result) => {
        if (result.length > 0) {
        return res.status(400).send('Time slot not available');
        }

        db.query(
        'INSERT INTO Appointment (patient_id, doctor_id, appointment_date, start_time, end_time, status) VALUES (?, ?, ?, ?, ?, "scheduled")',
        [patient_id, doctor_id, appointment_date, start_time, end_time],
        (err) => {
            if (err) return res.status(500).send(err);
            res.send('Appointment booked');
        }
        );
    });
    });

    // -------- AI Feature: Diagnosis Trend --------
    app.get('/analytics/diagnosis-trend', (req, res) => {
    db.query(`
        SELECT diagnosis, COUNT(*) as count
        FROM Appointment
        GROUP BY diagnosis
        ORDER BY count DESC
    `, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
    });

    // -------- Revenue --------
    app.get('/analytics/revenue', (req, res) => {
    db.query(`SELECT SUM(cost) as total_revenue FROM Appointment`, (err, result) => {
        if (err) return res.status(500).send(err);
        res.json(result);
    });
    });

    app.listen(3000, () => console.log('Server running on port 3000'));


    // ================= FRONTEND (React Dashboard) =================

    // App.js
    import React, { useEffect, useState } from 'react';

    function App() {
    const [patients, setPatients] = useState([]);
    const [analytics, setAnalytics] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/patients')
        .then(res => res.json())
        .then(data => setPatients(data));

        fetch('http://localhost:3000/analytics/diagnosis-trend')
        .then(res => res.json())
        .then(data => setAnalytics(data));
    }, []);

    return (
        <div style={{ padding: '20px' }}>
        <h1>Clinic Dashboard</h1>

        <h2>Patients</h2>
        <ul>
            {patients.map(p => (
            <li key={p.patient_id}>{p.name}</li>
            ))}
        </ul>

        <h2>Diagnosis Trends (AI Insight)</h2>
        <ul>
            {analytics.map(a => (
            <li key={a.diagnosis}>
                {a.diagnosis}: {a.count}
            </li>
            ))}
        </ul>
        </div>
    );
    }

    export default App
