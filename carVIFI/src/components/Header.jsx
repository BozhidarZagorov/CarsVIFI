import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAuth } from "../ctx/AuthContext";

export default function Header() {
  const { user } = useAuth();

  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <header className="header">
      <div className="header-inner">

        {/* LEFT SIDE */}
        <div className="header-left">
          <Link to="/" className="logo">
            Carvifi 🚗
          </Link>

          {user && (
            <nav className="nav-left">
              <Link to="/" className="nav-link">Home</Link>
              <Link to="/cars" className="nav-link">My Cars</Link>
            </nav>
          )}
        </div>

        {/* RIGHT SIDE */}
        <nav className="nav-right">
          {user ? (
            <button onClick={handleLogout} className="nav-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link">Register</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}
