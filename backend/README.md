# Backend (MERN TypeScript scaffold)

This folder contains a minimal Express + TypeScript backend scaffold intended to pair with the frontend.

Quick start:

1. Copy `.env.example` to `.env` and set `MONGO_URI` and `JWT_SECRET`.
2. Install dependencies:

```bash
cd backend
npm install
```

3. Run dev server:

```bash
npm run dev
```

API endpoints:
- `POST /api/auth/register` — register user
- `POST /api/auth/login` — login (returns JWT)
- `GET /api/books` — list books
- `GET /api/books/:id` — get single book
- `POST /api/books` — create book (auth required)
- `PUT /api/books/:id` — update book (auth required)
- `DELETE /api/books/:id` — delete book (auth required)

