import { useState } from "react";
import { registerUser, loginUser } from "../services/auth";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div style={{ padding: 24 }}>
      <h2>Login / Register</h2>

      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br /><br />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br /><br />

      <button onClick={() => loginUser(email, password)}>Login</button>
      <button onClick={() => registerUser(email, password)}>
        Register
      </button>
    </div>
  );
}

export default AuthPage;
