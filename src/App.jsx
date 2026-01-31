import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

function App() {
  const { user, token, isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div style={{ padding: "16px" }}>
      <h1>Pro-Tasker Frontend</h1>
      <p>Frontend setup complete.</p>

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

      {isLoggedIn && (
        <button onClick={logout} style={{ marginTop: "12px" }}>
          Logout
        </button>
      )}
    </div>
  );
}

export default App;
