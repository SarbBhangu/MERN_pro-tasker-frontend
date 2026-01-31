import { useContext, useState } from "react";
import { AuthContext } from "./context/AuthContext";
import { loginUser } from "./api/authApi";

function App() {
  const { user, token, isLoggedIn, login, logout } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleQuickLogin = async () => {
    try {
      setLoading(true);
      setError("");

      // Use an account that already exists in your database
      const response = await loginUser({
        email: "testuser1@example.com",
        password: "password123",
      });

      // Save token + user into AuthContext + localStorage
      login(response.token, response.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "16px" }}>
      <h1>Pro-Tasker Frontend</h1>

      <hr />

      <h2>Auth Debug</h2>
      <p>
        <strong>Logged In:</strong> {isLoggedIn ? "Yes" : "No"}
      </p>
      <p>
        <strong>Token Length:</strong> {token ? token.length : 0}
      </p>
      <p>
        <strong>User:</strong> {user ? user.email : "None"}
      </p>

      {!isLoggedIn && (
        <button onClick={handleQuickLogin} disabled={loading}>
          {loading ? "Logging in..." : "Quick Login (Test)"}
        </button>
      )}

      {isLoggedIn && (
        <button onClick={logout} style={{ marginTop: "12px" }}>
          Logout
        </button>
      )}

      {error && (
        <p style={{ marginTop: "12px" }}>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}

export default App;

