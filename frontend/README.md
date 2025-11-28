# 🥛 MilkMate - Smart Milk Collection & Billing System

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Build Status](https://img.shields.io/github/actions/workflow/status/komal2267g/MilkMate/ci.yml?branch=main)
![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED?logo=docker&logoColor=white)
![MERN Stack](https://img.shields.io/badge/MERN-Fullstack-000000?logo=react&logoColor=61DAFB)

> **The smartest way to manage milk entries, track customer payments, and automate billing.**

---

<div align="center">
  <h2>🚀 Live Demo</h2>
  <a href="https://milk-mate-two.vercel.app/">
    <img src="https://img.shields.io/badge/Visit_Live_Site-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Visit Live Site" height="50" />
  </a>
  <p><em>Deployed on Vercel (Frontend) & Render (Backend) with MongoDB Atlas</em></p>
</div>

---

## 📋 About The Project

**MilkMate** is a full-stack SaaS application designed to digitize the dairy business. It replaces traditional paper registers with a secure, cloud-based ledger system. It solves the pain points of manual calculation errors and lost data for dairy farmers and milk distributors.

### ✨ Key Features
*   **🔐 Secure Authentication:** encrypted login/signup using JWT & Bcrypt.
*   **📝 Daily Entry Management:** Track milk quantity (Liters) and fat content daily.
*   **📊 Dashboard Analytics:** Visualizing income and collection stats.
*   **🧾 Automated Billing:** Generates bills based on daily rates instantly.
*   **📱 Responsive Design:** Works seamlessly on Mobile and Desktop.

---

## 🛠️ Tech Stack & DevOps Architecture

This project follows modern **DevOps best practices** with a decoupled Microservices-ready architecture.

| Category | Technology Used |
| :--- | :--- |
| **Frontend** | React.js, CSS Modules, React Router |
| **Backend** | Node.js, Express.js, REST API |
| **Database** | MongoDB Atlas (Cloud Cluster) |
| **Containerization** | Docker & Docker Compose |
| **CI/CD Pipeline** | GitHub Actions (Automated Build & Testing) |
| **Hosting** | Vercel (Client) + Render (Server) |

---

## 🐳 Running Locally (DevOps Way)

Clone the project and run it using Docker. No need to install Node/Mongo locally.

### Prerequisites
*   Docker & Docker Compose installed.

### Steps
1.  **Clone the repository**
    ```bash
    git clone https://github.com/komal2267g/MilkMate.git
    cd MilkMate
    ```

2.  **Set up Environment Variables**
    Create a `.env` file in the `backend/` directory:
    ```env
    PORT=5000
    MONGO_URI=mongodb://mongo:27017/milkmate_db
    JWT_SECRET=supersecretkey123
    ```

3.  **Fire up the Containers**
    ```bash
    docker-compose up --build
    ```

4.  **Access the App**
    *   Frontend: `http://localhost:3000`
    *   Backend: `http://localhost:5000`
    *   Database: `localhost:27017`

---

## 📈 Scalability & Performance
This application is designed to handle scale:
*   **Stateless Backend:** The Node.js API is stateless, allowing for horizontal scaling (adding more instances behind a Load Balancer).
*   **Database Sharding:** MongoDB Atlas handles data growth efficiently.
*   **Containerized:** The entire stack is Dockerized, making it Kubernetes-ready.

---

## 🤝 Contributing
Contributions are welcome!
1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License
Distributed under the MIT License. See `LICENSE` for more information.

---
<div align="center">
  Created with ❤️ by <strong>Komal Chaurasiya</strong> | DevOps Engineer
</div>