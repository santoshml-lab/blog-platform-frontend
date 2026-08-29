import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { loginUser } from "../api";

function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const data = await loginUser(username, password);

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "username",
        username
      );

      navigate("/home");
    } catch (err) {
      setError(
        err.message || "Login failed"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Welcome Back 👋</h1>

        <p className="auth-subtitle">
          Login to your Blog Platform
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Username
          </label>

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            required
          />

          <label>
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don't have an account?{" "}
          <Link to="/register">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
