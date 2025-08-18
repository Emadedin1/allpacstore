"use client";
import React, { useState } from "react";

export default function PasswordReset({
  apiEndpoint = "/api/auth/password-reset",
  buttonText = "Forgot Password?",
  buttonStyle = {},
  inputStyle = {},
}) {
  const [showInput, setShowInput] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    try {
      const res = await fetch(apiEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (res.ok) {
        setSuccess("Password reset email sent!");
        setEmail("");
        setShowInput(false);
      } else {
        setError(data.error || "Reset failed.");
      }
    } catch {
      setError("An error occurred.");
    }
    setLoading(false);
  };

  return (
    <div>
      {showInput ? (
        <form onSubmit={handleReset} style={{ display: "flex", flexDirection: "column" }}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={inputStyle}
            required
          />
          <button type="submit" style={{ ...buttonStyle, marginTop: 8 }} disabled={loading}>
            {loading ? "Sending..." : "Send Reset Email"}
          </button>
          <button
            type="button"
            onClick={() => setShowInput(false)}
            style={{ ...buttonStyle, marginTop: 4 }}
          >
            Cancel
          </button>
          {error && <div style={{ color: "#e00", fontSize: "0.98rem" }}>{error}</div>}
          {success && <div style={{ color: "#090", fontSize: "0.98rem" }}>{success}</div>}
        </form>
      ) : (
        <button type="button" style={buttonStyle} onClick={() => setShowInput(true)}>
          {buttonText}
        </button>
      )}
    </div>
  );
}
