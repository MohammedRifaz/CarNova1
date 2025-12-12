import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { adminLogin } from "../api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async e => {
    e.preventDefault();
    setBusy(true);
    try {
      const res = await adminLogin(username, password);
      if (res.success) {
        localStorage.setItem("isAdmin", "true");
        navigate("/admin");
      } else alert("Invalid username or password");
    } catch (err) {
      alert("Login failed");
    } finally { setBusy(false); }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-[75vh] bg-gray-900 px-4">
        <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-3xl w-full max-w-md text-white">
          <h2 className="text-2xl font-bold mb-6 text-yellow-400 text-center">Admin Login</h2>
          <input value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" className="w-full mb-4 p-3 rounded-xl bg-gray-700 text-white" required />
          <input value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" type="password" className="w-full mb-6 p-3 rounded-xl bg-gray-700 text-white" required />
          <button type="submit" disabled={busy} className="w-full bg-yellow-500 text-white py-3 rounded-full font-semibold hover:brightness-110 transition">{busy ? "Logging in..." : "Login"}</button>
          <button type="button" onClick={() => navigate("/")} className="w-full mt-3 bg-gray-700 text-white py-3 rounded-full font-semibold hover:bg-gray-600 transition">Back to Home</button>
        </form>
      </div>
    </>
  );
}
