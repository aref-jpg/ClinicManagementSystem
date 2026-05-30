# Clinic Management System (Full Stack Project)

##  Project Overview
This is a full-stack Clinic Management System designed to manage hospital operations efficiently.  
It is built using:

- MySQL (Database Layer)
- Node.js + Express (Backend API)
- React.js (Frontend Dashboard)

The system manages:
- Patients
- Doctors
- Clinics
- Departments
- Appointments

It also includes business logic features such as:
- Preventing overlapping doctor appointments
- Basic analytics (diagnosis trends, revenue)
- RESTful API architecture
- Real-time dashboard updates

---

##  Repository Structure


/sql
├── create_tables.sql → Database schema (DDL)
├── load_data.sql → Sample data (10+ records per table)
├── queries.sql → SQL queries (JOINs, reports, analytics)
├── triggers.sql → Database triggers (business rules)


/src
├── backend               → Node.js + Express API
├── frontend              → React.js dashboard


 How to Run the Project

1. Database Setup (MySQL)

Open MySQL Workbench and run:

source sql/create_tables.sql;
source sql/load_data.sql;
source sql/triggers.sql;

2. Backend Setup (Node.js + Express)

cd src/backend
npm install
node index.js

Backend will run on:
http://localhost:3001


3. Frontend Setup (React)

cd src/frontend
npm install
npm start


Frontend will run on:
http://localhost:3000



Key Features
Full CRUD operations for all entities
Appointment scheduling system
Overlap prevention using SQL trigger + backend validation
Clean relational database design
Real-time dashboard statistics
REST API architecture


Database Design
Entities:
Department
Manages multiple clinics and doctors
Clinic
Belongs to a department
Doctor
Works under a department
Patient
Independent entity
Appointment
Links Patient + Doctor + Clinic
Stores time, diagnosis, and status



 Analytics Features
Most common diagnosis tracking
Revenue calculation per doctor
Appointment statistics
Upcoming appointment filtering




Bonus Features
SQL Trigger prevents double-booking of doctors
Backend validation for overlapping appointments
Clean RESTful API structure
React dashboard for live data visualization



Author

Student Project  – Clinic Management System
Built for academic submission and full-stack learning demonstration.
This project was developed by students from Nile University:

- Mohamed Ahmed Aref
- Adham Mohammed AlDakrany
- Jana Hosam Abd El Wahab
- Sara Khalil Mohammed
- Hajer Hossam Abdulbaki

---

#Institution

Nile University  
Faculty of Biotechnology  
Database Systems Project

---

## Project Purpose

This project was developed as part of a Database Systems course to demonstrate the design and implementation of a relational database, SQL programming, triggers, queries, and full-stack integration using MySQL, Node.js, Express.js, and React.js.




## External Libraries and Sources

This project was developed by the authors listed above. All database design, SQL scripts, backend APIs, frontend implementation, and project integration were completed as part of the course requirements.

The following external technologies and libraries were used:

### Database
- MySQL

### Backend
- Node.js
- Express.js
- MySQL2
- CORS

### Frontend
- React.js

### Development Tools
- MySQL Workbench
- Visual Studio Code
- Git & GitHub

### References
Official documentation was consulted during development:

- MySQL Documentation: https://dev.mysql.com/doc/
- Node.js Documentation: https://nodejs.org/docs/
- Express.js Documentation: https://expressjs.com/
- React Documentation: https://react.dev/
- MySQL2 Documentation: https://github.com/sidorares/node-mysql2

All code submitted in this repository represents the authors' own work, except for the use of the above libraries, frameworks, and officially documented examples used for learning and implementation purposes.
