# Pro-Tasker — Frontend

This is the **React frontend** for **Pro-Tasker**, a full-stack MERN project management application.  
It provides the user interface for authentication, project creation, and task management.

The frontend communicates with a deployed Express + MongoDB backend via REST APIs.

---

## Live Application

**Frontend (Live App):**  
https://mern-pro-tasker-frontend.onrender.com

**Backend API:**  
https://mern-pro-tasker-backend.onrender.com

---

## Project Overview

Pro-Tasker allows users to:

- Register and log in securely
- Create and manage projects
- Create tasks within projects
- Update task status (To Do, In Progress, Done)
- Delete tasks
- Log out securely

The frontend is built as a **Single Page Application (SPA)** using React and communicates with the backend using JWT-protected API requests.

---

## 🛠️ Tech Stack

- **React** (Vite)
- **JavaScript (ES6+)**
- **React Router**
- **Context API** (global auth state)
- **Fetch API**
- **Plain CSS** (custom responsive styling)
- **Render** (deployment)

---

## Folder Structure

```txt
src/
├── api/              # API request helpers
├── components/       # Reusable UI components (Navbar, ProtectedRoute)
├── context/          # AuthContext (global authentication state)
├── pages/            # Page components (Login, Register, Dashboard Project)
├── styles/           # Global CSS styling
├── App.jsx           # Main app routes
├── main.jsx          # React entry point
``` 
## API Communication
``` 
VITE_API_URL=https://mern-pro-tasker-backend.onrender.com
```

## Run Locally

1. Clone the repository
2. Install dependencies:
```
npm install
```
3. Create a .env file:
```
VITE_API_URL=http://localhost:5000
```
4. Start the development server:
```
npm run dev
```