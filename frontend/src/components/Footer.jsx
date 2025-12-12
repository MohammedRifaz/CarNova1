import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm">&copy; {new Date().getFullYear()} CarNova. All rights reserved.</p>
        <div className="flex gap-6">
          <a href="#contact" className="hover:text-yellow-400 transition">Contact</a>
          <a href="#help" className="hover:text-yellow-400 transition">Help</a>
          <a href="#feedback" className="hover:text-yellow-400 transition">Feedback</a>
        </div>
      </div>
    </footer>
  );
}
