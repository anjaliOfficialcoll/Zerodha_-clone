# 📈 Zerodha Clone – Full-Stack Stock Trading Platform

A modern, full-stack stock trading platform inspired by [Zerodha](https://zerodha.com/). Built with **React**, **Express.js**, and **MongoDB**, this project demonstrates a complete real-world application architecture with authentication, order management, and portfolio tracking.

---

## 🎯 Features

✅ **User Authentication** – JWT-based login with demo credentials  
✅ **Dashboard SPA** – Protected trading dashboard with real-time portfolio insights  
✅ **Order Management** – Create, view, and manage stock orders  
✅ **Holdings & Positions** – Track portfolio holdings and open positions  
✅ **Landing Page** – Public-facing marketing site  
✅ **REST API** – Robust backend API with protected endpoints  
✅ **Responsive Design** – Mobile-friendly UI with modern styling  

---

## 📁 Project Structure

```
Zerodha_-clone/
├── frontend/          # Public landing site (React)
├── dashboard/         # Trading dashboard SPA (React) - Requires auth
├── backend/           # Express.js API server
├── README.md          # Project documentation
└── .gitignore         # Git ignore rules
```

| Component | Purpose | Tech Stack |
|-----------|---------|-----------|
| **Frontend** | Marketing/landing page | React, CSS |
| **Dashboard** | Trading interface & portfolio | React, Axios, Context API |
| **Backend** | API & business logic | Express.js, JWT, MongoDB (optional) |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (includes native `fetch`)
- **npm 8+**
- **(Optional) MongoDB** – for data persistence

### Installation & Running

#### 1️⃣ Start the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on `http://localhost:3002` by default.

#### 2️⃣ Start the Dashboard

```bash
cd dashboard
npm install
npm start
```

Dashboard runs on `http://localhost:3000` by default.

#### 3️⃣ Start the Frontend (Landing Page)

```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3001` by default.

---

## 🔐 Authentication & Demo Credentials

### Default Demo Login

```
Email:    demo@demo.com
Password: demo
```

### Auth Flow

1. User enters credentials on the login page
2. Frontend sends `POST /login` request to backend
3. Backend validates credentials and returns JWT token + user info
4. Frontend stores token in `localStorage`
5. Subsequent requests include `Authorization: Bearer <token>` header
6. Protected endpoints verify token validity

### AuthContext

The dashboard uses React's `AuthContext` to:
- Store JWT token and user data globally
- Set default `Authorization` header in axios
- Protect routes from unauthorized access

---

## 🔌 API Reference

### Authentication Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/login` | Authenticate user, returns JWT token |

**Request:**
```json
{
  "email": "demo@demo.com",
  "password": "demo"
}
```

**Response:**
```json
{
  "token": "eyJhbGc...",
  "user": {
    "id": "123",
    "email": "demo@demo.com",
    "name": "Demo User"
  }
}
```

### Protected Endpoints (Requires JWT)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/newOrder` | Create a new stock order |

**Request:**
```json
{
  "name": "INFY",
  "qty": 10,
  "price": 1500,
  "mode": "BUY"
}
```

### Public Data Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/allHoldings` | Fetch all portfolio holdings |
| `GET` | `/allPositions` | Fetch all open positions |
| `GET` | `/addHoldings` | Seed demo holdings data |
| `GET` | `/addPositions` | Seed demo positions data |

---

## 🛠️ Environment Configuration

Create a `.env` file in the `backend/` directory:

```bash
# Backend Port (default: 3002)
PORT=3002

# MongoDB Connection (optional - uses in-memory storage if not set)
MONGO_URL=mongodb://localhost:27017/zerodha-clone

# JWT Secret (default: dev-secret-key - DO NOT use in production)
JWT_SECRET=your-secret-key-here

# Demo Credentials (can be overridden)
DEMO_EMAIL=demo@demo.com
DEMO_PASS=demo
```

---

## 🧪 Testing

### Run API Smoke Test

Test the complete auth flow and order creation:

```bash
cd backend
npm run test-api
```

This script will:
1. Call `/login` with demo credentials
2. Retrieve the JWT token
3. Call `/newOrder` with the token
4. Display success/failure results

---

## 📚 Key Implementation Details

### JWT Authentication (Backend)

- Located in `backend/index.js`
- Uses `jsonwebtoken` library for token generation and verification
- Middleware validates `Authorization: Bearer <token>` headers
- Protected routes check token validity before processing

### State Management (Dashboard)

- **AuthContext** – Manages global authentication state
- **Axios Interceptors** – Auto-includes JWT token in requests
- **localStorage** – Persists token across sessions

### Order Creation

- Protected endpoint validates JWT token
- `BuyActionWindow` component handles order form
- Orders sent to `/newOrder` endpoint with auth header
- Success/error handling with user feedback

---

## ⚠️ Security Notes

> ⚠️ **This is a demo project for educational purposes only.**

**Current Limitations:**
- Demo credentials and JWT secret are hardcoded
- No password hashing (plain text storage)
- No input validation or sanitization
- No rate limiting or CSRF protection
- No SSL/TLS in development

### ✅ Production Recommendations

- **User Management** – Use a proper database with bcrypt password hashing
- **JWT Security** – Use a strong, secret key; rotate keys regularly
- **Input Validation** – Sanitize and validate all user inputs server-side
- **HTTPS** – Enforce SSL/TLS in production
- **Rate Limiting** – Add request throttling to prevent abuse
- **CORS** – Configure strict CORS policies
- **Logging** – Implement comprehensive logging and monitoring
- **Testing** – Add unit/integration tests (Jest, Supertest)
- **Error Handling** – Don't expose sensitive stack traces to clients

---

## 🗺️ Roadmap & Next Steps

- [ ] Replace demo credentials with persistent user database
- [ ] Implement bcrypt password hashing
- [ ] Add comprehensive server-side validation
- [ ] Build unit and integration tests (Jest + Supertest)
- [ ] Enhance login UI (loading states, error messages, remember-me)
- [ ] Add order history and trade analytics
- [ ] Implement real-time price updates (WebSocket)
- [ ] Add fund transfer and payment integration
- [ ] Deploy to production (Heroku, AWS, etc.)

---

## 🔧 Troubleshooting

### Backend won't start
```bash
# Clear npm cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm start
```

### Dashboard can't connect to backend
- Verify backend is running on `http://localhost:3002`
- Check CORS headers in backend (if running on different port)
- Open browser DevTools → Network tab to see error details

### Login fails with demo credentials
- Ensure backend is running
- Check that `Authorization` header is being sent
- Verify JWT_SECRET matches between login and protected endpoints

### MongoDB connection issues
- If `MONGO_URL` not set, app uses in-memory storage (no persistence)
- Ensure MongoDB service is running: `mongod`
- Check connection string format: `mongodb://localhost:27017/db-name`

---

## 📖 Additional Documentation

- **[Frontend Setup](./frontend/README.md)** *(Create this)*
- **[Dashboard Setup](./dashboard/README.md)** *(Create this)*
- **[Backend API Docs](./backend/README.md)** *(Create this)*

---

## 🤝 Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 💡 Inspiration

Built as a learning project inspired by [Zerodha](https://zerodha.com/), one of India's leading stock brokerage platforms. This project demonstrates real-world full-stack development patterns including authentication, API design, and state management.

---

## 📧 Support

Have questions? Open an [issue](https://github.com/anjaliOfficialcoll/Zerodha_-clone/issues) on GitHub!

---

**Made with ❤️ by [anjaliOfficialcoll](https://github.com/anjaliOfficialcoll)**
