import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { useAuthStore } from "./store/authStore";
import Dashboard from "./pages/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";
import Register from "./pages/Register";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import AuthorList from "./pages/AuthorList";
import AuthorForm from "./component/AuthorForm";
import CategoryList from "./pages/CategoryList";
import CategoryForm from "./component/CategoryForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts"
          element={
            <ProtectedRoute>
              <PostList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/create"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/posts/edit/:id"
          element={
            <ProtectedRoute>
              <PostForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors"
          element={
            <ProtectedRoute>
              <AuthorList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/authors/create"
          element={
            <ProtectedRoute>
              <AuthorForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/authors/edit/:id"
          element={
            <ProtectedRoute>
              <AuthorForm />
            </ProtectedRoute>
          }
        />


          <Route
          path="/categories"
          element={
            <ProtectedRoute>
              <CategoryList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/categories/create"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/categories/edit/:id"
          element={
            <ProtectedRoute>
              <CategoryForm />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
