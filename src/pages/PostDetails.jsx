import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import {
  getPost,
  getComments,
  createComment,
  deletePost,
  deleteComment,
} from "../api";

function PostDetails() {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [commentLoading, setCommentLoading] = useState(false);
  const [error, setError] = useState("");

  const username = localStorage.getItem("username");

  useEffect(() => {
    loadPost();
    loadComments();
  }, [postId]);

  async function loadPost() {
    try {
      setLoading(true);

      const data = await getPost(postId);

      setPost(data);
    } catch (err) {
      setError(
        err.message || "Failed to load post"
      );
    } finally {
      setLoading(false);
    }
  }

  async function loadComments() {
    try {
      const data = await getComments(postId);

      setComments(data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleComment(event) {
    event.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      setCommentLoading(true);

      await createComment(postId, {
        content: comment,
      });

      setComment("");

      await loadComments();
    } catch (err) {
      setError(
        err.message || "Failed to add comment"
      );
    } finally {
      setCommentLoading(false);
    }
  }

  async function handleDeletePost() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deletePost(postId);

      navigate("/home");
    } catch (err) {
      setError(
        err.message || "Failed to delete post"
      );
    }
  }

  async function handleDeleteComment(commentId) {
    const confirmed = window.confirm(
      "Delete this comment?"
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteComment(commentId);

      await loadComments();
    } catch (err) {
      setError(
        err.message || "Failed to delete comment"
      );
    }
  }

  if (loading) {
    return (
      <div className="status-message">
        Loading post...
      </div>
    );
  }

  if (!post) {
    return (
      <div className="status-message">
        Post not found.
      </div>
    );
  }

  return (
    <div className="details-page">
      <div className="details-container">

        <Link
          to="/home"
          className="back-link"
        >
          ← Back to Posts
        </Link>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <article className="details-card">

          <div className="details-header">

            <div>
              <h1>{post.title}</h1>

              <p className="post-meta">
                Author #{post.author_id}
              </p>
            </div>

            <div className="post-actions">

              <Link
                to={`/edit-post/${post.id}`}
                className="edit-btn"
              >
                Edit
              </Link>

              <button
                onClick={handleDeletePost}
                className="delete-btn"
              >
                Delete
              </button>

            </div>

          </div>

          <div className="details-content">
            {post.content}
          </div>

        </article>


        {/* =========================
            COMMENTS
        ========================= */}

        <section className="comments-section">

          <h2>
            Comments ({comments.length}) 💬
          </h2>

          <form
            onSubmit={handleComment}
            className="comment-form"
          >

            <textarea
              placeholder="Write a comment..."
              value={comment}
              onChange={(event) =>
                setComment(event.target.value)
              }
              rows="4"
              required
            />

            <button
              type="submit"
              disabled={commentLoading}
            >
              {commentLoading
                ? "Posting..."
                : "Add Comment"}
            </button>

          </form>


          <div className="comments-list">

            {comments.length === 0 ? (
              <p className="no-comments">
                No comments yet. Be the first!
              </p>
            ) : (

              comments.map((item) => (

                <div
                  className="comment-card"
                  key={item.id}
                >

                  <div>

                    <strong>
                      User #{item.user_id}
                    </strong>

                    <p>
                      {item.content}
                    </p>

                  </div>

                  {String(item.user_id) === username && (
                    <button
                      onClick={() =>
                        handleDeleteComment(item.id)
                      }
                      className="comment-delete-btn"
                    >
                      Delete
                    </button>
                  )}

                </div>

              ))

            )}

          </div>

        </section>

      </div>
    </div>
  );
}

export default PostDetails;
