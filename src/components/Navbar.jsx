import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  return (
    <nav style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
      {!isLoggedIn && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}

      {isLoggedIn && (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <span style={{ marginLeft: "8px" }}>
            Logged in as: <strong>{user?.email}</strong>
          </span>
          <button type="button" onClick={logout}>
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
