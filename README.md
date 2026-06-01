
# Zerodha-clone — Local Development

Small demo project consisting of:

- `frontend/` — public landing site (React)
- `dashboard/` — dashboard SPA (React) that requires sign-in
- `backend/` — Express API used for demo data and protected order creation

This README explains how to run the apps locally, the demo auth flow, and useful developer commands.

Prerequisites
-------------
- Node.js 18+ (includes `fetch` used by the test script)
- npm

Environment
-----------
- Backend reads these env vars (optional):
  - `PORT` (default `3002`)
  - `MONGO_URL` (if you want to persist data via MongoDB)
  - `JWT_SECRET` (default development secret if not provided)
  - `DEMO_EMAIL` / `DEMO_PASS` (defaults: `demo@demo.com` / `demo`)

Run the apps (development)
--------------------------
1. Backend

```powershell
cd backend
npm install
npm start
# server listens on http://localhost:3002 by default
```

2. Dashboard (protected SPA)

```powershell
cd dashboard
npm install
npm start
# opens http://localhost:3000 by default
```

3. Landing frontend

```powershell
cd frontend
npm install
npm start
# opens http://localhost:3001 (or whatever CRA assigns)
```

Demo login (local)
------------------
- Demo credentials (development only):
  - Email: `demo@demo.com`
  - Password: `demo`

- Behavior: POST `/login` returns `{ token, user }`. The dashboard stores the JWT in `localStorage` and sends it as `Authorization: Bearer <token>` on requests.

API endpoints (quick reference)
------------------------------
- POST `/login` — body `{ email, password }` -> `{ token, user }` on success
- POST `/newOrder` — protected: creates an order; requires `Authorization` header
- GET `/allHoldings` — returns demo holdings
- GET `/allPositions` — returns demo positions
- GET `/addHoldings`, `/addPositions` — helper routes to seed demo data

Developer utilities
-------------------
- Run a smoke-test that calls `/login` then `/newOrder`:

```powershell
cd backend
npm run test-api
```

What I changed (high level)
---------------------------
- Added a simple JWT demo auth flow in `backend/index.js` (demo creds, `jsonwebtoken`).
- Dashboard now contains `AuthContext` which persists token+user and sets `axios` default `Authorization` header.
- `BuyActionWindow` and `/newOrder` are protected to ensure only authenticated requests create orders.

Security notes (important)
--------------------------
- The current auth is a local demo flow only — DO NOT use the demo JWT secret or credentials in production.
- Replace the demo login with a proper user store (database), hashed passwords (bcrypt), and a secure JWT signing secret or sessions.
- Validate and sanitize all request inputs on the server before saving to the DB.

Next recommended tasks
----------------------
- Replace demo credentials with a persisted user table + password hashing
- Add server-side validation and unit/integration tests (e.g., Jest + supertest)
- Improve the login UI: loading state, error display, and remember-me option
- Add a small README in each subfolder with service-specific commands

If you want, I can implement any of the recommended next steps — tell me which one to start with.
