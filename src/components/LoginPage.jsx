// File: src/components/LoginPage.jsx
"use client";
import React, { useState } from "react";
import PasswordReset from "./PasswordReset";
import { useRouter } from "next/navigation";

// Consistent style object (longhand only, no shorthand conflicts)
const styles = {
  container: {
    maxWidth: 400,
    margin: "40px auto",
    padding: "32px",
    borderRadius: "12px",
    background: "#fff",
    boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
    fontFamily: "Segoe UI, Roboto, Arial, sans-serif",
  },
  title: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: 600,
    fontSize: "1.5rem",
    color: "#333",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "stretch",
  },
  input: {
    width: "100%",
    padding: "10px 12px",
    borderRadius: "6px",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#ddd",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  inputFocus: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0070f3",
  },
  button: {
    padding: "10px 16px",
    borderRadius: "6px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
    minWidth: 120,
  },
  buttonSwitch: {
    background: "#fff",
    color: "#0070f3",
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "#0070f3",
    fontWeight: 500,
    padding: "8px 18px",
    borderRadius: "6px",
    marginLeft: "6px",
    marginRight: "6px",
    cursor: "pointer",
  },
  error: {
    color: "#e00",
    textAlign: "center",
    fontSize: "0.98rem",
    marginTop: "4px",
  },
  success: {
    color: "#090",
    textAlign: "center",
    fontSize: "0.98rem",
    marginTop: "4px",
  },
  switch: {
    marginTop: 18,
    textAlign: "center",
    fontSize: "0.98rem",
  },
};

export default function LoginPage({ mode: initialMode = "login" }) {
  const [mode, setMode] = useState(initialMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [focus, setFocus] = useState(null);
  const router = useRouter();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const endpoint = mode === "login" ? "login" : "register";
    const url = `${API_BASE}/api/auth/${endpoint}`;
    const payload = mode === "login" ? { email, password } : { email, password, name };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // ensure httpOnly cookies are set/sent
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.user && data.user.name) {
          localStorage.setItem("name", data.user.name);
          window.dispatchEvent(new Event("userNameChanged"));
        }
        setSuccess(mode === "login" ? "Login successful!" : "Account created! You can now log in.");
        setError("");

        if (mode === "login") {
          const next = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("next") : null;
          setTimeout(() => {
            router.push(next || "/");
          }, 400);
        }
      } else {
        setError(data.error || "Something went wrong");
      }
    } catch (err) {
      console.error("LoginPage error:", err);
      setError("Failed to reach server");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>{mode === "login" ? "Login" : "Create Account"}</div>
      <form style={styles.form} onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            style={{
              ...styles.input,
              ...(focus === "name" ? styles.inputFocus : {}),
            }}
            onFocus={() => setFocus("name")}
            onBlur={() => setFocus(null)}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          autoComplete="username"
          style={{
            ...styles.input,
            ...(focus === "email" ? styles.inputFocus : {}),
          }}
          onFocus={() => setFocus("email")}
          onBlur={() => setFocus(null)}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          autoComplete="current-password"
          style={{
            ...styles.input,
            ...(focus === "password" ? styles.inputFocus : {}),
          }}
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div style={{ width: "100%", marginTop: 6 }}>
          <button type="submit" style={{ ...styles.button, width: "100%" }}>
            {mode === "login" ? "Login" : "Register"}
          </button>
        </div>

        {mode === "login" && (
          <div style={{ textAlign: "right", marginTop: 8 }}>
            <PasswordReset
              apiEndpoint="/api/auth/password-reset-request"
              buttonText="Forgot Password?"
              buttonStyle={{
                background: "none",
                border: "none",
                color: "#0070f3",
                cursor: "pointer",
                padding: 0,
                margin: 0,
                fontSize: "0.98rem",
                fontWeight: 500,
                textDecoration: "underline",
              }}
              inputStyle={{
                ...styles.input,
                marginTop: 12,
              }}
            />
          </div>
        )}

        {error && <div style={styles.error}>{error}</div>}
        {success && <div style={styles.success}>{success}</div>}
      </form>

      <div style={styles.switch}>
        {mode === "login" ? (
          <span>
            Don&apos;t have an account?
            <button
              type="button"
              style={styles.buttonSwitch}
              onClick={() => {
                setMode("register");
                setError("");
                setSuccess("");
              }}
            >
              Create Account
            </button>
          </span>
        ) : (
          <span>
            Already have an account?
            <button
              type="button"
              style={styles.buttonSwitch}
              onClick={() => {
                setMode("login");
                setError("");
                setSuccess("");
              }}
            >
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
