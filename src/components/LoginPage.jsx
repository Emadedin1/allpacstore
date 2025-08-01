"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #ddd",
    fontSize: "1rem",
    outline: "none",
    transition: "border-color 0.2s",
  },
  inputFocus: {
    borderColor: "#0070f3",
  },
  button: {
    padding: "10px 0",
    borderRadius: "6px",
    border: "none",
    background: "#0070f3",
    color: "#fff",
    fontWeight: 600,
    fontSize: "1rem",
    cursor: "pointer",
    transition: "background 0.2s",
  },
  buttonSwitch: {
    background: "#fff",
    color: "#0070f3",
    border: "1px solid #0070f3",
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

  // Read the base URL from an env var, fall back to current origin
  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE_URL || window.location.origin;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const endpoint = mode === "login" ? "login" : "register";
    const url = `${API_BASE}/api/auth/${endpoint}`;

    const payload =
      mode === "login"
        ? { email, password }
        : { email, password, name };

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (res.ok) {
        // save JWT (or whatever token your backend returns)
        if (data.token) {
          localStorage.setItem("token", data.token);
        }
        if (data.name) {
          localStorage.setItem("name", data.name);
        }
        setSuccess(
          mode === "login"
            ? "Login successful!"
            : "Account created! You can now log in."
        );
        setError("");

        // Redirect to homepage after successful login
        if (mode === "login") {
          setTimeout(() => {
            router.push("/");
          }, 500); // short delay for feedback
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
      <div style={styles.title}>
        {mode === "login" ? "Login" : "Create Account"}
      </div>
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
          style={{
            ...styles.input,
            ...(focus === "password" ? styles.inputFocus : {}),
          }}
          onFocus={() => setFocus("password")}
          onBlur={() => setFocus(null)}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" style={styles.button}>
          {mode === "login" ? "Login" : "Register"}
        </button>
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
