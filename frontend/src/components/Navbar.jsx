import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/");
  };

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate("/")} className="text-2xl font-extrabold text-yellow-400">
          CarNova
        </button>
      </div>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-sm md:text-base hover:text-yellow-300 transition">Home</Link>

        {!isAdmin ? (
          <Link
            to="/login"
            className="bg-yellow-500 text-white px-4 py-2 rounded-full font-semibold hover:brightness-110 transition"
          >
            Admin Login
          </Link>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-500 transition"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
