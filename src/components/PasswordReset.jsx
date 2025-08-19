"use client";

import React, { useState } from "react";

/**
 * PasswordReset component
 * Props:
 *  - apiEndpoint: path for "send reset email" endpoint (default: /api/auth/password-reset-request)
 *  - buttonText: text for the submit button
 *  - buttonStyle, inputStyle: optional inline styles
 */
export default function PasswordReset({
  apiEndpoint = "/api/auth/password-reset-request",
  buttonText = "Send Reset Email",
  buttonStyle = {},
  inputStyle = {},
}) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSend = async (e) => {
    e && e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending reset email to", email, "endpoint:", apiEndpoint);

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      console.log("PasswordReset response:", res.status, data);

      if (res.ok) {
        // Be generic for security: do not reveal whether the email exists
        setSuccess(
          data?.message ||
            "If that email is registered we sent a reset link. Check your inbox."
        );
        setError("");
      } else {
        // Surface server-provided error when helpful
        if (typeof data === "string") {
          setError(data || `Request failed (status ${res.status})`);
        } else {
          setError(data?.error || `Request failed (status ${res.status})`);
        }
      }
    } catch (err) {
      console.error("PasswordReset fetch error:", err);
      setError(err?.message || "Failed to contact the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSend}
      style={{ display: "flex", flexDirection: "column", gap: 8 }}
    >
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "8px 10px",
          borderRadius: 6,
          border: "1px solid #ccc",
          fontSize: "0.95rem",
          boxSizing: "border-box",
          ...inputStyle,
        }}
        required
      />
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "none",
            border: "none",
            color: "#0070f3",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "0.95rem",
            ...buttonStyle,
          }}
        >
          {loading ? "Sending..." : buttonText}
        </button>
        {/* Optional cancel could be handled by parent; left out for portability */}
      </div>

      {error && <div style={{ color: "#e00", fontSize: 13 }}>{error}</div>}
      {success && <div style={{ color: "#090", fontSize: 13 }}>{success}</div>}
    </form>
  );
}
