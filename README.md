# E-commers-Backend
A robust and scalable backend API for an e-commerce application built with Node.js, Express, and Sequelize. This project provides secure authentication, role-based access control, and full CRUD operations for managing users, products, and orders.

🚀 Features

<li>🔐 JWT Authentication & Authorization</li>

<li>👥 Role-Based Access Control (Admin / Manager / User)</li>

<li>📦 Product Management (CRUD)</li>

<li>🛒 Order Handling System</li>

<li>👤 User Management System</li>

<li>🗄️ Database integration using Sequelize ORM</li>

<li>⚡ RESTful API architecture</li>

<li>🛡️ Secure password handling</li>


<h2>Tech Stack</h2>

<li>Node.js</li>

<li>Express.js</li>

<li>Sequelize ORM</li>

<li>PostgreSQL (or any SQL DB)</li>

<li>JSON Web Token (JWT)</li>

<h2>📁 Project Structure</h2>h2>

├── controllers/
├── models/
├── routes/
├── middleware/
├── config/
└── app.js
🔑 Authentication

<h2>This API uses JWT-based authentication.</h2>
<h3><u>Include your token in headers:</u></h3>

<h2>Authorization: Bearer <u><your_token></u></h2>
⚙️ Getting Started
npm install
npm run dev
📌 Notes

Only authorized users can access protected routes

Managers/Admins have elevated permissions

Environment variables are required (.env)

👨‍💻 Author
<h1><i>Mohammed Nattiq</i></h1>
Backend developed for learning and building scalable API systems.
