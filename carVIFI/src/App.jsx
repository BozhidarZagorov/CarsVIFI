import { Routes, Route, Navigate } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import YourCars from "./pages/YourCars";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./ctx/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const { user } = useAuth();

  return (
    <>
    <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/cars"element={
            <ProtectedRoute>
              <YourCars />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to={user ? "/cars" : "/login"} replace />}/>
      </Routes>
  <Footer />
    </>
  );
}

export default App;
