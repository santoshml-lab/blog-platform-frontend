import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { getPost, updatePost } from "../api";

function EditPost() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadPost();
  }, [postId]);

  async function loadPost() {
    try {
      setLoading(true);
      setError("");

      const data = await getPost(postId);

      setTitle(data.title || "");
      setContent(data.content || "");
    } catch (err) {
      setError(
        err.message || "Failed to load post"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSaving(true);

    try {
      await updatePost(postId, {
        title,
        content,
      });

      navigate(`/post/${postId}`);
    } catch (err) {
      setError(
        err.message || "Failed to update post"
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="status-message">
        Loading post...
      </div>
    );
  }

  return (
    <div className="create-page">
      <div className="create-card">

        <div className="create-header">
          <div>
            <h1>Edit Post ✏️</h1>
            <p>
              Update your blog post.
            </p>
          </div>

          <Link to={`/post/${postId}`}>
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
            value={title}
            onChange={(event) =>
              setTitle(event.target.value)
            }
            placeholder="Enter post title"
            required
          />

          <label>
            Content
          </label>

          <textarea
            value={content}
            onChange={(event) =>
              setContent(event.target.value)
            }
            placeholder="Write your post..."
            rows="10"
            required
          />

          <button
            type="submit"
            disabled={saving}
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default EditPost;
