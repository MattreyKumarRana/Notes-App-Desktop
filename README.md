# 📝 Full-Stack Notes Application

A modern full-stack Notes application built with **React** and **FastAPI**, featuring complete CRUD functionality, favorites, search, and persistent storage using a real backend database.

⚠️ **Note:** This application is currently optimized for desktop view and is not fully responsive.

---

## 🚀 Features

* ✍️ Create, edit, and delete notes
* ⭐ Mark notes as favorites
* 🔍 Search notes instantly
* 📑 Tabs for filtering (All / Favorites)
* 🕒 Notes sorted using `updated_at`
* 💾 Persistent storage using a backend database (no localStorage dependency)
* ⚡ Real-time UI updates after API actions
* 🌐 Fully integrated frontend and backend

---

## 🛠️ Tech Stack

### Frontend

* React (Hooks)
* Tailwind CSS
* Fetch API

### Backend

* FastAPI
* SQLModel
* SQLite
* Uvicorn

---

## 📂 Project Structure

```
notes-app/
│
├── notes-frontend/        # React application
│
└── notes-backend/
    ├── main.py
    ├── models.py
    ├── database.py
```

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```
git clone https://github.com/MattreyKumarRana/Notes-App-Desktop.git
cd Notes-App-Desktop
```

---

### 2. Backend Setup

```
cd notes-backend
python -m venv venv
venv\Scripts\activate   # Windows
# source venv/bin/activate  # Mac/Linux

pip install fastapi uvicorn sqlmodel
```

### Run Backend

```
uvicorn main:app --reload
```

Backend runs on:

```
http://127.0.0.1:8000
```

Swagger Docs:

```
http://127.0.0.1:8000/docs
```

---

### 3. Frontend Setup

```
cd notes-frontend
npm install
npm run dev
```

Frontend runs on:

```
http://localhost:5173
```

---

## 🔌 API Endpoints

| Method | Endpoint    | Description       |
| ------ | ----------- | ----------------- |
| GET    | /notes      | Get all notes     |
| GET    | /notes/{id} | Get a single note |
| POST   | /notes      | Create a note     |
| PUT    | /notes/{id} | Update a note     |
| DELETE | /notes/{id} | Delete a note     |

---

## 🧠 Key Concepts Learned

* Full-stack architecture (frontend ↔ backend)
* REST API design
* State management with React
* Async data fetching and synchronization
* Database modeling with SQLModel
* Handling real-time UI updates from API responses
* CORS configuration for cross-origin communication

---

## 🔮 Possible Improvements

* 🔐 User authentication (JWT)
* ⚡ Loading states and error UI
* 🧠 Backend search & filtering
* ☁️ Deployment (Vercel + Render/Fly.io)

---

## 📸 Screenshot

<img width="1919" height="874" alt="Notes App Screenshot" src="https://github.com/user-attachments/assets/5c6badc1-85dd-4843-aa69-b62be11e79fc" />

---

## 💡 Author

**Mattrey Rana**
