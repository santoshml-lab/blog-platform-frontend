import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { createPost } from "../api";

function CreatePost() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      await createPost({
        title,
        content,
      });

      navigate("/home");
    } catch (err) {
      setError(
        err.message || "Failed to create post"
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="create-page">
      <div className="create-card">
        <div className="create-header">
          <div>
            <h1>Create New Post ✍️</h1>
            <p>
              Share your thoughts with the community.
            </p>
          </div>

          <Link to="/home">
            ← Back
          </Link>
        </div>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label>
            Title
          </label>

          <input
            type="text"
            placeholder="Enter your post title"
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            required
          />

          <label>
            Content
          </label>

          <textarea
            placeholder="Write your post..."
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            rows="10"
            required
          />

          <button
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Publishing..."
              : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
