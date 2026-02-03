import { Navigate } from "react-router-dom";
import { useAuth } from "../ctx/AuthContext";

export default function AuthRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return null;

  return user ? <Navigate to="/" replace /> : children;
}
