import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoute from "./components/AuthRoute";
import ProtectedRoute from "./components/ProtectedRoute";

import YourCars from "./pages/YourCars";
import { useAuth } from "./ctx/AuthContext";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AddCar from "./pages/AddCar";

function App() {
  const { user } = useAuth();

  return (
    <>
    <div className="app-layout">
  <Header />
    <main className="app-content">
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={
            <AuthRoute>
              <Login/>
            </AuthRoute>
          } 
        />
        <Route path="/register" element={
            <AuthRoute>
              <Register/>
            </AuthRoute>
          } 
        />

        <Route path="/cars"element={
            <ProtectedRoute>
              <YourCars />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cars/addcar"
          element={
            <ProtectedRoute>
              <AddCar />
            </ProtectedRoute>
          }
        />


        <Route path="*" element={<Navigate to={user ? "/cars" : "/login"} replace />}/>
      </Routes>
    </main>
  <Footer />
    </div>
    </>
  );
}

export default App;
