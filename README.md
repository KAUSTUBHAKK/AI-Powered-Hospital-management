🏥 SmartCare HMS
Full-Stack Hospital Management System

Built using React, Spring Boot, and MySQL

📌 Overview

SmartCare HMS is a full-stack web application designed to manage hospital workflows including patient records and appointments.

The system demonstrates REST API development, database integration using JPA/Hibernate, and frontend-backend communication using JSON over HTTP.

This project highlights core full-stack development skills aligned with Java-based backend development.

🛠 Tech Stack
🔹 Frontend

React

JavaScript (ES6+)

HTML5

CSS3

🔹 Backend

Spring Boot

Spring Data JPA

Hibernate ORM

RESTful APIs

🔹 Database

MySQL

✨ Key Features

Create, Read, Update, Delete (CRUD) operations for Patients

Appointment Management

RESTful API architecture

JSON-based client-server communication

CORS configuration for cross-origin requests

Layered backend structure (Controller → Repository → Database)

🏗 System Architecture
React (Frontend)
        ↓ HTTP Requests (JSON)
Spring Boot REST Controller
        ↓
JPA Repository (Hibernate ORM)
        ↓
MySQL Database
🚀 How to Run Locally
🔹 Backend Setup
cd smartcare-hms-backend
mvn spring-boot:run

Backend runs at:

http://localhost:8080
🔹 Frontend Setup
cd smartcare-hms-frontend
npm install
npm start

Frontend runs at:

http://localhost:3000
📡 Sample API Endpoints

GET /api/v1/patients

POST /api/v1/patients

PUT /api/v1/patients/{id}

DELETE /api/v1/patients/{id}

🎯 Learning Highlights

Through this project, I strengthened my understanding of:

REST API design principles

Spring Boot application structure

JPA & Hibernate ORM mapping

React component-based architecture

Client-server interaction using JSON

Relational database schema design

📚 Future Improvements

Add authentication using Spring Security & JWT

Implement role-based access control

Add pagination and filtering

Deploy backend to AWS EC2

Deploy frontend to cloud hosting
