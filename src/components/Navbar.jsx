import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav className="nav card">
      <div className="nav-left">
        {!isLoggedIn && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        {isLoggedIn && <Link to="/dashboard">Dashboard</Link>}
      </div>

      <div className="nav-right">
        {isLoggedIn && (
          <>
            <span className="small">
              Logged in as: <strong>{user?.email}</strong>
            </span>
            <button type="button" className="btn btn-secondary" onClick={logout}>
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

