import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getPosts } from "../api";

function Home() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const username =
    localStorage.getItem("username");

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      setLoading(true);
      setError("");

      const data = await getPosts();
      setPosts(data);
    } catch (err) {
      setError(
        err.message || "Failed to load posts"
      );
    } finally {
      setLoading(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("username");

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <div className="home-page">

      {/* =========================
          HEADER
      ========================= */}

      <header className="home-header">

        <div>
          <h1>Blog Platform 📝</h1>

          <p>
            Discover stories, ideas and perspectives.
          </p>
        </div>

        <div className="home-header-actions">

          <span className="welcome-user">
            Hi, {username || "User"} 👋
          </span>

          <Link
            to="/create-post"
            className="create-post-btn"
          >
            + Create Post
          </Link>

          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>

        </div>

      </header>


      {/* =========================
          POSTS
      ========================= */}

      <main className="posts-container">

        <div className="posts-heading">

          <h2>Latest Posts</h2>

          <button
            className="refresh-btn"
            onClick={loadPosts}
          >
            Refresh
          </button>

        </div>


        {loading && (
          <div className="status-message">
            Loading posts...
          </div>
        )}


        {error && (
          <div className="error-message">
            {error}
          </div>
        )}


        {!loading &&
          !error &&
          posts.length === 0 && (
            <div className="empty-state">

              <h3>No posts yet 📭</h3>

              <p>
                Be the first person to publish a post.
              </p>

              <Link to="/create-post">
                Create your first post
              </Link>

            </div>
          )}


        {!loading &&
          posts.length > 0 && (
            <div className="posts-grid">

              {posts.map((post) => (
                <article
                  className="post-card"
                  key={post.id}
                >

                  <h3>
                    {post.title}
                  </h3>

                  <p>
                    {post.content}
                  </p>

                  <div className="post-card-footer">

                    <span>
                      Author #{post.author_id}
                    </span>

                    <Link
                      to={`/post/${post.id}`}
                    >
                      Read More →
                    </Link>

                  </div>

                </article>
              ))}

            </div>
          )}

      </main>

    </div>
  );
}

export default Home;
