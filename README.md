<div align="center">
  <img src="frontend/public/banner.png" alt="Nexus Edu Banner">
  
  <br />
  
  # Nexus Edu 🎓
  
  **An Elevated, Modern & Open-Source Educational Platform**
  
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
  [![GSoC Ready](https://img.shields.io/badge/GSoC-Ready-orange.svg?style=flat-square)](https://summerofcode.withgoogle.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square)](https://opensource.org/licenses/MIT)
  [![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=next.js&logoColor=white)](https://nextjs.org/)
</div>

---

## 🌟 About The Project

**Nexus Edu** is a modern, scalable, and open-source Learning Management System (LMS) engineered to bridge the gap between students, educators, and parents. Designed with high performance, a sophisticated user experience, and robust architecture, Nexus Edu brings the powerful features of platforms like Udemy into the open-source community.

> **💡 Note for GSoC Candidates/Reviewers:** 
> This project is structured specifically to welcome open-source contributions. With a clear separation of frontend/backend concerns, a modern tech-stack, and well-defined architecture, it is an excellent candidate for **Google Summer of Code (GSoC)** and other open-source initiatives.

### ✨ Key Features

- **🎓 For Students:**
  - Browse, search, and filter a rich catalog of educational courses by grade and subject.
  - Seamless course enrollment and intuitive progress tracking.
  - Interactive, personalized dashboard with learning statistics.
- **👨‍🏫 For Educators & Teachers:**
  - Dedicated Teacher Dashboard to create, publish, and manage courses.
  - Dynamic curriculum builder, pricing management, and student enrollment tracking.
- **👨‍👩‍👧 For Parents (Upcoming):**
  - Monitor children's educational progress, attendance, and performance metrics.
- **🛡️ Core System Security & Architecture:**
  - Strong Role-Based Access Control (RBAC: Admin, Teacher, Student, Parent).
  - Secure JWT Authentication & bcrypt password hashing.
  - Fully responsive, modern glassmorphism-inspired UI with system-defined dark mode.

## 🛠️ Tech Stack

The architecture is decoupled into a **Frontend Application** and a **Backend API**, favoring scalability and modularity.

| **Frontend** | **Backend** | **Infrastructure & Tools** |
| :--- | :--- | :--- |
| **Next.js 16 (App Router)** | **Node.js + Express.js** | **MySQL 8.0+** |
| **TypeScript** | **TypeScript** | **Git & GitHub** |
| **Tailwind CSS** | **JWT Authentication** | **RESTful APIs** |
| **Axios & Framer Motion**| **bcrypt Hashing** | **Prettier & ESLint** |

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing.

### Prerequisites

Ensure you have the following installed on your local environment:
- **Node.js** (v18.0.0 or higher)
- **MySQL** (v8.0 or higher)
- **npm** or **yarn**

### 1. Database Initialization

```bash
# Log into MySQL CLI
mysql -u root -p

# Create the database
CREATE DATABASE education_platform;
exit;

# Initialize Schema tables and seed data
cd backend
npx ts-node src/scripts/initDb.ts
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create environment configuration
cat << EOF > .env
PORT=5000
DB_HOST=localhost
DB_USER=root
# Replace with your local MySQL password
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=education_platform
JWT_SECRET=your_super_secret_jwt_key
EOF

# Run the backend server in development mode
npm run dev
```

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create environment configuration
cat << EOF > .env.local
NEXT_PUBLIC_API_URL=http://localhost:5000/api
EOF

# Run the frontend application
npm run dev
```

## 💻 Usage & Testing Roles

1. Open your browser and navigate to `http://localhost:3000`.
2. Explore the beautifully crafted landing page.
3. Use the following test accounts to experience different roles:

| Role | Username | Password |
|------|----------|----------|
| **Teacher** | `teacher1` | `password123` |
| **Student** | `student1` | `password123` |

## 📄 License

This project is open-source and available under the **MIT License**.
