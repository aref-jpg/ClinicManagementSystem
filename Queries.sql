-- 1. All appointments with patient + doctor info
SELECT p.name AS patient, d.name AS doctor, a.appointment_date, a.status
FROM Appointment a
JOIN Patient p ON a.patient_id = p.patient_id
JOIN Doctor d ON a.doctor_id = d.doctor_id;

-- 2. Number of patients per doctor
SELECT d.name, COUNT(a.patient_id) AS total_patients
FROM Doctor d
LEFT JOIN Appointment a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id;

-- 3. Revenue per doctor
SELECT d.name, SUM(a.cost) AS revenue
FROM Doctor d
JOIN Appointment a ON d.doctor_id = a.doctor_id
GROUP BY d.doctor_id;

-- 4. Most common diagnosis
SELECT diagnosis, COUNT(*) AS frequency
FROM Appointment
GROUP BY diagnosis
ORDER BY frequency DESC;

-- 5. Upcoming appointments
SELECT * FROM Appointment
WHERE appointment_date > CURDATE();