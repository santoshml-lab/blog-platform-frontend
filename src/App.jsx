import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<div>Register Page</div>}
      />

      <Route
        path="/home"
        element={<div>Home Page</div>}
      />

      <Route
        path="/create-post"
        element={<div>Create Post Page</div>}
      />

      <Route
        path="/edit-post/:postId"
        element={<div>Edit Post Page</div>}
      />

      <Route
        path="/post/:postId"
        element={<div>Post Details Page</div>}
      />

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
