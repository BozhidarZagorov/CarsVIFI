import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import YourCars from "./pages/YourCars";
import ProtectedRoute from "./components/ProtectedRoute";
import { logoutUser } from "./services/auth";
import { useAuth } from "./ctx/AuthContext";

function App() {
  const { user } = useAuth();

  return (
    <>
      {user && (
        <div style={{ padding: 16 }}>
          <button onClick={logoutUser}>Logout</button>
        </div>
      )}

      <Routes>
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cars"element={
            <ProtectedRoute>
              <YourCars />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/cars" : "/login"} replace />}/>
      </Routes>
    </>
  );
}

export default App;
