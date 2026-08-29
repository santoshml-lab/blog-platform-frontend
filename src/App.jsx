import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={
          <h1 style={{ padding: "40px" }}>
            BLOG PLATFORM IS WORKING ✅
          </h1>
        }
      />
    </Routes>
  );
}

export default App;
