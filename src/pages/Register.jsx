import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { registerUser } from "../api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser({
        username,
        email,
        password,
      });

      setSuccess(
        "Registration successful! Redirecting to login..."
      );

      setTimeout(() => {
        navigate("/login", {
          replace: true,
        });
      }, 1000);

    } catch (err) {
      setError(
        err.message || "Registration failed"
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
          Create Account 🚀
        </h1>

        <p className="auth-subtitle">
          Join our Blog Platform
        </p>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {success && (
          <div className="success-message">
            {success}
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
              placeholder="Choose a username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              autoComplete="username"
              required
            />
          </div>


          <div className="form-group">
            <label htmlFor="email">
              Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
              autoComplete="email"
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
              placeholder="Create a password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              autoComplete="new-password"
              required
            />
          </div>


          <button
            type="submit"
            disabled={loading}
            className="auth-submit-btn"
          >
            {loading
              ? "Creating account..."
              : "Create Account →"}
          </button>

        </form>


        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Register;
