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
            Carvifi
            <img src="/carVIFIlogo.png" alt="Carvifi logo" className="logo-img" />
          </Link>

          {user && (
            <nav className="nav-left">
              <Link to="/" className="nav-btn">Home</Link>
              <Link to="/cars" className="nav-btn">My Cars</Link>
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
              <Link to="/login" className="nav-btnlogin">Login</Link>
              <Link to="/register" className="nav-btnRegister">Register</Link>
            </>
          )}
        </nav>

      </div>
    </header>
  );
}
