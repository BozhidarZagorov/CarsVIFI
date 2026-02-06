import { useAuth } from "../ctx/AuthContext";
import { Link } from "react-router-dom";
import { getExpirySummary } from "../utils/expirySummary";
import { useCars } from "../ctx/CarsContext";

export default function Home() {
  const { user } = useAuth();

  const { cars } = useCars();
  const summary = cars.length ? getExpirySummary(cars) : null;


  return (
    <div className="home">

      <h1>Carvifi 🚗</h1>
      <p>Never miss a renewal again.</p>

      {!user ? (
        <div className="home-actions">
          <Link to="/login" className="btn">Login</Link>
          <Link to="/register" className="btn btn-outline">Register</Link>
        </div>
      ) : (
        <div className="home-actions">
          <Link to="/cars" className="btn">My Cars</Link>
        </div>
      )}
      {summary && (
  <div className="expiry-summary">
    {summary.expired > 0 && (
      <p className="expired">
        🔴 {summary.expired} item(s) expired
      </p>
    )}

    {summary.expiringSoon > 0 && (
      <p className="warning">
        ⚠️ {summary.expiringSoon} item(s) expiring in the next 30 days
      </p>
    )}

    {summary.expired === 0 && summary.expiringSoon === 0 && (
      <p className="ok">🟢 All items are up to date</p>
    )}
  </div>
)}
    </div>
  );
}
