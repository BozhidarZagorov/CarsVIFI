import { useState } from "react";
import { registerUser, loginUser } from "../services/auth";
import { createUserProfile } from "../services/firestore";

function AuthPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
  const cred = await registerUser(email, password);
  await createUserProfile(cred.user);
};

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
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default AuthPage;
