# 🎓 Student Admin Portal

A full-stack Student Management System built with **Go (Golang)** and **React (TypeScript)**. This application features Role-Based Access Control (RBAC), allowing Administrators to manage student records and Students to view their academic profiles securely.


## 🚀 Tech Stack

### Frontend
- **Framework:** React + Vite (TypeScript)
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **State/Routing:** React Router DOM
- **Notifications:** React Hot Toast

### Backend
- **Language:** Go (Golang)
- **Framework:** Go Fiber
- **Database:** PostgreSQL (Hosted on Neon Tech)
- **ORM:** GORM
- **Authentication:** JWT & Bcrypt (Password Hashing)

---

## ✨ Key Features

- **🔐 Role-Based Authentication:**
  - Secure Login/Signup for Admins and Students.
  - Role verification middleware (Students cannot access Admin routes).
  - Strict course verification during Student login (Case-insensitive & space-insensitive).
  
- **👨‍💼 Admin Dashboard:**
  - View list of all enrolled students.
  - **Create** new student accounts (with auto-generated security credentials).
  - **Delete** student records.

- **👩‍🎓 Student Portal:**
  - Read-only profile view.
  - Displays assigned course and account status.
    
 ## 🧪 Demo Credentials

Want to test the app, use these credentials:

### 👨‍💼 **Admin Account**
- **Email:** `yorawat987@gmail..com`
- **Password:** `321`

### 👨‍🎓 **Student Account**
- **Email:** `stud1@edu.com`
- **Password:** `12345`
- **Course:** `EEE`


---

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone [https://github.com/your-username/student-admin-portal.git](https://github.com/your-username/student-admin-portal.git)
cd student-admin-portal
```
### 2. Backend Setup
Navigate to the backend folder and install dependencies.
```bash
cd backend
go mod tidy
```
Create a .env file in the backend/ directory:
```bash
DB_URL="postgresql://user:password@host/dbname?sslmode=require"
SECRET_KEY="your_super_secret_jwt_key"
```
Run the server:
```bash
go run main.go
```
### 3. Frontend Setup
Navigate to the frontend folder.
```bash
cd frontend
npm install
```
Start the development server:
```bash
npm run dev
```
### 4. API Endpoints
| Method | Endpoint              | Handler / Description                                   |
|--------|-----------------------|---------------------------------------------------------|
| POST   | /api/students         | CreateStudent – Creates a new student                   |
| GET    | /api/students         | GetStudents – Fetches a list of all students            |
| DELETE | /api/students/:id     | DeleteUser – Deletes a user/student by ID               |
| POST   | /api/signup           | Signup – Registers a new user                           |
| POST   | /api/login            | Login – Authenticates a user                            |
| GET    | /api/users            | GetUsers – Fetches all users (Admins & Students)        |

