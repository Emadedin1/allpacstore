import React, { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState("login"); // "login" or "register"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const url = mode === "login" ? "/api/auth/login" : "/api/auth/register";
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
        localStorage.setItem("token", data.token);
        setSuccess(
          mode === "login"
            ? "Login successful!"
            : "Account created! You can now log in."
        );
        // Optionally redirect or update UI here
      } else {
        setError(data.error || "Failed");
      }
    } catch {
      setError("Failed");
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto" }}>
      <h2>{mode === "login" ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        {mode === "register" && (
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">
          {mode === "login" ? "Login" : "Register"}
        </button>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {success && <div style={{ color: "green" }}>{success}</div>}
      </form>
      <div style={{ marginTop: 20 }}>
        {mode === "login" ? (
          <span>
            Don't have an account?{" "}
            <button type="button" onClick={() => setMode("register")}>
              Create Account
            </button>
          </span>
        ) : (
          <span>
            Already have an account?{" "}
            <button type="button" onClick={() => setMode("login")}>
              Login
            </button>
          </span>
        )}
      </div>
    </div>
  );
}
