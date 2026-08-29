import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import "./App.css";
import CreatePost from "./pages/CreatePost";
import PostDetails from "./pages/PostDetails";

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
  element={<Register />}
/>
        
        
      

      <Route
        path="/home"
        element={<div>Home Page</div>}
      />

      <Route
  path="/create-post"
  element={<CreatePost />}
/>
        
        
      

      <Route
        path="/edit-post/:postId"
        element={<div>Edit Post Page</div>}
      />

      <Route
  path="/post/:postId"
  element={<PostDetails />}
/>
        


        
        

        
      

      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />
    </Routes>
  );
}

export default App;
