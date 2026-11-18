
import { useState } from "react";
import "./Login.css";

function Login({ onLogin }) {
  const [role, setRole] = useState("Farmer");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    onLogin(role);
  }

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🐛 Smart Sericulture</h1>
        <p>Smart Silkworm Farm Monitoring System</p>

        <h2>Welcome Back!</h2>
        <p>Login to continue</p>

        <form onSubmit={handleLogin}>
          <label>Select Portal</label>

          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Admin">Admin Portal</option>
            <option value="Farmer">Farmer Portal</option>
          </select>

          <label>Email Address</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">Login</button>
        </form>

        <p className="login-footer">
          Smart Sericulture Monitoring System © 2026
        </p>
      </div>
    </div>
  );
}

export default Login;
