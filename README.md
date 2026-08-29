# 📝 Blog Platform

A modern full-stack blogging platform where users can register, log in, create posts, edit and delete their posts, and interact through comments.

Built as a full-stack internship project using React, FastAPI and a relational database.

---

## 🚀 Live Demo

### 🌐 Frontend

https://blog-platform-frontend-silk.vercel.app/

### ⚙️ Backend API

https://blog-platform-backend-kwxo.onrender.com/

### 📚 API Documentation

https://blog-platform-backend-kwxo.onrender.com/docs

---

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- JWT authentication
- Secure password hashing
- Logout functionality
- Protected routes

### 📝 Blog Posts

- Create new posts
- View all posts
- View individual post details
- Edit posts
- Delete posts
- Author-based post management

### 💬 Comments

- Add comments to posts
- View comments
- Delete your own comments

### 🎨 Frontend

- Modern responsive UI
- React-based component architecture
- React Router navigation
- Loading states
- Error handling
- Responsive design for mobile and desktop

---

## 🛠️ Tech Stack

### Frontend

- React
- Vite
- React Router
- JavaScript
- CSS

### Backend

- Python
- FastAPI
- SQLAlchemy
- JWT Authentication
- Passlib / password hashing

### Database

- SQL database
- SQLAlchemy ORM

### Deployment

- Frontend: Vercel
- Backend: Render

---

## 🏗️ Project Architecture

```text
User
  │
  ▼
React Frontend
  │
  │ REST API
  ▼
FastAPI Backend
  │
  ├── Authentication
  ├── Posts
  └── Comments
  │
  ▼
SQL Database
