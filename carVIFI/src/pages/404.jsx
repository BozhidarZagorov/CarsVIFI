import { Link } from "react-router-dom";

function NotFound() {
  return (
<div className="notFound-page">
    <div className="notfound-page">
      <h1>404</h1>
      <p>Oops… this page doesn’t exist.</p>

      <Link to="/" className="btn btn-primary">
        Go Home
      </Link>
    </div>
</div>
  );
}

export default NotFound;
