const API_BASE_URL =
  "https://blog-platform-backend-kwxo.onrender.com";


// =========================
// HELPER
// =========================

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.detail || "Something went wrong"
    );
  }

  return data;
}


// =========================
// AUTHENTICATION
// =========================

export async function registerUser(userData) {
  const response = await fetch(
    `${API_BASE_URL}/auth/register`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    }
  );

  return handleResponse(response);
}


export async function loginUser(username, password) {
  const formData = new URLSearchParams();

  formData.append("username", username);
  formData.append("password", password);

  const response = await fetch(
    `${API_BASE_URL}/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/x-www-form-urlencoded",
      },
      body: formData,
    }
  );

  return handleResponse(response);
}


// =========================
// TOKEN
// =========================

function getToken() {
  return localStorage.getItem("access_token");
}


function authHeaders() {
  const token = getToken();

  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
}


// =========================
// POSTS
// =========================

export async function getPosts() {
  const response = await fetch(
    `${API_BASE_URL}/posts/`
  );

  return handleResponse(response);
}


export async function getPost(postId) {
  const response = await fetch(
    `${API_BASE_URL}/posts/${postId}`
  );

  return handleResponse(response);
}


export async function createPost(postData) {
  const response = await fetch(
    `${API_BASE_URL}/posts/`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(postData),
    }
  );

  return handleResponse(response);
}


export async function updatePost(postId, postData) {
  const response = await fetch(
    `${API_BASE_URL}/posts/${postId}`,
    {
      method: "PUT",
      headers: authHeaders(),
      body: JSON.stringify(postData),
    }
  );

  return handleResponse(response);
}


export async function deletePost(postId) {
  const response = await fetch(
    `${API_BASE_URL}/posts/${postId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  return handleResponse(response);
}


// =========================
// COMMENTS
// =========================

export async function getComments(postId) {
  const response = await fetch(
    `${API_BASE_URL}/comments/post/${postId}`
  );

  return handleResponse(response);
}


export async function createComment(
  postId,
  commentData
) {
  const response = await fetch(
    `${API_BASE_URL}/comments/post/${postId}`,
    {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify(commentData),
    }
  );

  return handleResponse(response);
}


export async function deleteComment(commentId) {
  const response = await fetch(
    `${API_BASE_URL}/comments/${commentId}`,
    {
      method: "DELETE",
      headers: authHeaders(),
    }
  );

  return handleResponse(response);
}
