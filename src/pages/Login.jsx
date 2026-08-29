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
      const data = await loginUser(
        username,
        password
      );

      localStorage.setItem(
        "access_token",
        data.access_token
      );

      localStorage.setItem(
        "username",
        username
      );

      navigate("/home", {
        replace: true,
      });

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

        <div className="auth-logo">
          📝
        </div>

        <h1>
          Welcome Back 👋
        </h1>

        <p className="auth-subtitle">
          Login to your Blog Platform
        </p>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>

            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="current-password"
              required
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading
              ? "Logging in..."
              : "Login →"}
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
