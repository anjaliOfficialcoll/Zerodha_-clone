import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "./AuthContext";
import axios from "axios";

const pageStyles = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background:
    "radial-gradient(circle at top, rgba(28, 132, 255, 0.18), transparent 34%), linear-gradient(180deg, #f7f9fc 0%, #eef3f9 100%)",
  padding: "24px",
};

const cardStyles = {
  width: "100%",
  maxWidth: "440px",
  background: "#ffffff",
  borderRadius: "24px",
  boxShadow: "0 24px 80px rgba(15, 23, 42, 0.12)",
  padding: "32px",
  border: "1px solid rgba(15, 23, 42, 0.06)",
};

const inputStyles = {
  width: "100%",
  border: "1px solid #d7dfeb",
  borderRadius: "12px",
  padding: "14px 16px",
  marginTop: "8px",
  outline: "none",
  fontSize: "15px",
};

const buttonStyles = {
  width: "100%",
  border: "none",
  borderRadius: "12px",
  padding: "14px 16px",
  fontWeight: 600,
  fontSize: "15px",
  cursor: "pointer",
  background: "#387ed1",
  color: "#fff",
};

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const redirectPath = location.state?.from?.pathname || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setError("Enter both email and password to continue.");
      return;
    }

    setError("");
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3002/login", {
        email: email.trim(),
        password,
      });

      const { token, user } = res.data;
      if (token && user) {
        login({ user, token });
        navigate(redirectPath, { replace: true });
      } else {
        setError("Unexpected login response");
      }
    } catch (err) {
      const msg = err?.response?.data?.error || "Login failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageStyles}>
      <div style={cardStyles}>
        <div style={{ marginBottom: "24px" }}>
          <p style={{ color: "#387ed1", fontWeight: 700, marginBottom: "8px" }}>
            Zerodha Dashboard
          </p>
          <h1 style={{ margin: 0, fontSize: "32px", lineHeight: 1.1 }}>
            Sign in to continue
          </h1>
          <p style={{ marginTop: "12px", color: "#667085" }}>
            Access your watchlist, holdings, and order window after login.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <label style={{ display: "block", marginBottom: "16px", color: "#344054" }}>
            Email
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              style={inputStyles}
            />
          </label>

          <label style={{ display: "block", marginBottom: "16px", color: "#344054" }}>
            Password
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              style={inputStyles}
            />
          </label>

          {error ? (
            <p style={{ color: "#d92d20", marginBottom: "16px" }}>{error}</p>
          ) : null}

          <button type="submit" style={buttonStyles}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;