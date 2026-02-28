# 📚 Heritage Archive - Digital Library System

A modern web platform for browsing, reading, and managing digitized historical books and manuscripts.

---

## 🚀 Quick Start

### **For Users**
Just visit the website and start exploring! No installation needed.

### **For Developers**

**1. Clone the project**
```bash
git clone https://github.com/gech21as/Book-management-system.git
cd Book-management-system
```

**2. Install dependencies**
```bash
# Frontend
cd frontend
npm install

# Backend  
cd ../backend
npm install
```

**3. Set up environment**
```bash
cd backend
cp .env.example .env
# Edit .env with your database URL and JWT secret
```

**4. Start the servers**
```bash
# Terminal 1: Backend (Port 5000)
cd backend
npm run dev

# Terminal 2: Frontend (Port 3000)
cd frontend
npm run dev
```

**5. Access the application**
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000

---

## 🌐 System Overview

### **Frontend (Port 3000)**
- **React 18** with TypeScript
- **Book Catalog**: Browse and search digitized books
- **Online Reader**: Read books directly in browser
- **Chatbot**: AI assistant for help and recommendations
- **User Authentication**: Login and registration
- **Admin Dashboard**: Manage books and users (admin only)

### **Backend (Port 5000)**
- **Node.js + Express** with TypeScript
- **JWT Authentication**: Secure user login
- **Book Management**: CRUD operations for books
- **File Upload**: Handle book uploads and covers
- **User Management**: Admin and regular user roles
- **API Endpoints**: RESTful API for frontend

---

## 📖 How to Use

### **For Readers**
1. **Browse Catalog**: Search or filter books by category, language, or institution
2. **Read Books**: Click any book to open the online reader
3. **Get Help**: Use the chatbot (bottom-right corner) for assistance
4. **Create Account**: Register to save favorites and reading history

### **For Admins**
1. **Login**: Use admin credentials to access dashboard
2. **Upload Books**: Add new books to the collection
3. **Manage Content**: Edit book details, remove books, manage users
4. **View Analytics**: Track popular books and user activity

---

## 🔧 Available Commands

### **Frontend (Port 3000)**
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
```

### **Backend (Port 5000)**
```bash
npm run dev      # Start development server
npm start        # Start production server
npm run build    # Compile TypeScript
```

---

## 📁 Project Structure

```
Book-management-system/
├── frontend/          # React app (Port 3000)
│   ├── src/
│   │   ├── components/  # UI components
│   │   ├── api/        # API calls
│   │   └── contexts/   # React contexts
│   └── package.json
├── backend/           # Node.js API (Port 5000)
│   ├── src/
│   │   ├── controllers/  # API handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   └── middleware/   # Auth middleware
│   └── package.json
└── .gitignore
```

---

## 🔐 Environment Setup

Create `.env` file in backend directory:

```env
DATABASE_URL=mongodb://localhost:27017/heritage-archive
JWT_SECRET=your-secret-key
PORT=5000
FRONTEND_URL=http://localhost:3000
```

---

## 📞 Support

- 📧 **Issues**: [GitHub Issues](https://github.com/gech21as/Book-management-system/issues)
- 🐛 **Bugs**: Report problems with detailed description
- 💡 **Features**: Suggest improvements and new functionality

---

**🌟 Preserving digital heritage, one book at a time.**
