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

    if (!title.trim() || !content.trim()) {
      setError("Please enter both title and content.");
      return;
    }

    setLoading(true);

    try {
      await createPost({
        title: title.trim(),
        content: content.trim(),
      });

      navigate("/home", {
        replace: true,
      });

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

          <Link
            to="/home"
            className="back-link"
          >
            ← Back
          </Link>

        </div>


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        <form
          onSubmit={handleSubmit}
          className="create-form"
        >

          <div className="form-group">

            <label htmlFor="title">
              Title
            </label>

            <input
              id="title"
              type="text"
              placeholder="Enter your post title"
              value={title}
              onChange={(event) =>
                setTitle(event.target.value)
              }
              required
            />

          </div>


          <div className="form-group">

            <label htmlFor="content">
              Content
            </label>

            <textarea
              id="content"
              placeholder="Write your post..."
              value={content}
              onChange={(event) =>
                setContent(event.target.value)
              }
              rows="12"
              required
            />

          </div>


          <button
            type="submit"
            disabled={loading}
            className="publish-btn"
          >
            {loading
              ? "Publishing..."
              : "Publish Post 🚀"}
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreatePost;
