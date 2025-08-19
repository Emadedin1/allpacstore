"use client";

import React, { useState } from "react";

/**
 * PasswordReset component (collapsed by default)
 * Props:
 *  - apiEndpoint: endpoint to POST { email } for sending the reset email
 *                 (default "/api/auth/password-reset-request")
 *  - buttonText: visible link text to open the reset UI (default "Forgot Password?")
 *  - buttonStyle, inputStyle: optional inline style overrides
 */
export default function PasswordReset({
  apiEndpoint = "/api/auth/password-reset-request",
  buttonText = "Forgot Password?",
  buttonStyle = {},
  inputStyle = {},
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const resetState = () => {
    setEmail("");
    setError("");
    setSuccess("");
    setLoading(false);
  };

  const handleOpen = () => {
    resetState();
    setOpen(true);
  };

  const handleCancel = () => {
    resetState();
    setOpen(false);
  };

  const handleSend = async () => {
    setError("");
    setSuccess("");

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    setLoading(true);
    try {
      console.log("PasswordReset: sending reset request to", apiEndpoint, "email:", email);

      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const contentType = res.headers.get("content-type") || "";
      const data = contentType.includes("application/json") ? await res.json() : await res.text();

      console.log("PasswordReset response:", res.status, data);

      if (res.ok) {
        setSuccess(
          data?.message ||
            "If that email is registered we sent a reset link. Check your inbox."
        );
        setError("");
      } else {
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
    <div style={{ display: "inline-block" }}>
      {!open && (
        <button
          type="button"
          onClick={handleOpen}
          style={{
            background: "none",
            border: "none",
            color: "#0070f3",
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
            fontSize: "0.98rem",
            ...buttonStyle,
          }}
        >
          {buttonText}
        </button>
      )}

      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSend();
              }
            }}
            style={{
              padding: "8px 10px",
              borderRadius: 6,
              border: "1px solid #ccc",
              fontSize: "0.95rem",
              boxSizing: "border-box",
              width: "100%",         // <-- full width to match other inputs
              ...inputStyle,
            }}
            required
          />

          <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
            <button
              type="button"
              onClick={handleSend}
              disabled={loading}
              style={{
                background: "#0070f3",
                color: "#fff",
                border: "none",
                borderRadius: 6,
                padding: "8px 12px",
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              {loading ? "Sending..." : "Send Reset Email"}
            </button>

            <button
              type="button"
              onClick={handleCancel}
              style={{
                background: "transparent",
                border: "none",
                color: "#0070f3",
                textDecoration: "underline",
                cursor: "pointer",
                padding: 0,
                fontSize: "0.95rem",
              }}
            >
              Cancel
            </button>
          </div>

          {error && <div style={{ color: "#e00", fontSize: 13 }}>{error}</div>}
          {success && <div style={{ color: "#090", fontSize: 13 }}>{success}</div>}
        </div>
      )}
    </div>
  );
}
