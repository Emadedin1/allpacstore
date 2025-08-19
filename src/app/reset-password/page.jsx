"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Read token from URL in an effect (safer for SSR)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("token") || "";
      setToken(t);
      console.log("Reset page token:", t);
    }
  }, []);

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
      console.log("Submitting password reset", { token, password });

      // POST to your existing API route name (password-reset)
      const res = await fetch("/api/auth/password-reset", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const contentType = res.headers.get("content-type") || "";
      let data;
      if (contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      console.log("Reset response:", res.status, data);

      if (res.ok) {
        setSuccess("Password reset successful");
        setError("");
        // brief delay so user sees the message, then redirect to homepage
        setTimeout(() => {
          router.push("/");
        }, 900);
      } else {
        // Surface helpful error messages from the server where possible
        if (typeof data === "string") {
          // sometimes servers return HTML/text for 4xx/5xx - show a short friendly message
          setError(data || `Reset failed (status ${res.status})`);
        } else {
          setError(data?.error || `Reset failed (status ${res.status}).`);
        }
      }
    } catch (err) {
      console.error("Reset password fetch error:", err);
      setError(err?.message || "An error occurred while contacting the server.");
    } finally {
      setLoading(false);
    }
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
            fontSize: "1rem",
            boxSizing: "border-box"
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
