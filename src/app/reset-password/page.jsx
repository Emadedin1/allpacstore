"use client";

import React, { useState } from "react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get token from the URL query string
  let token = "";
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    token = params.get("token") || "";
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!token) {
      setError("Invalid or missing token.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password reset successfully! You can now log in.");
      } else {
        setError(data.error || "Reset failed.");
      }
    } catch (err) {
      setError("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div style={{
      maxWidth: 400, margin: "40px auto", padding: 32,
      borderRadius: 12, background: "#fff",
      boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
      fontFamily: "Segoe UI, Roboto, Arial, sans-serif"
    }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 600, marginBottom: 24 }}>Reset Password</h1>
      <form style={{ display: "flex", flexDirection: "column", gap: 16 }} onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          style={{
            padding: "10px 12px",
            borderRadius: 6,
            border: "1px solid #ddd",
            fontSize: "1rem"
          }}
          required
        />
        <button
          type="submit"
          style={{
            padding: "10px 0",
            borderRadius: 6,
            border: "none",
            background: "#0070f3",
            color: "#fff",
            fontWeight: 600,
            fontSize: "1rem",
            cursor: "pointer"
          }}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {error && <div style={{ color: "#e00", textAlign: "center" }}>{error}</div>}
        {success && <div style={{ color: "#090", textAlign: "center" }}>{success}</div>}
      </form>
    </div>
  );
}
