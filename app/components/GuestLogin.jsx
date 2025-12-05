"use client";

import { useState } from "react";

export default function GuestLogin({ onLogin }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    if (!name.trim() || !email.trim()) return;

    try {
      const res = await fetch("https://jamiatussunnah.onrender.com/message/guest-user/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });
      const data = await res.json();
      localStorage.setItem("guestUser", JSON.stringify(data));
      onLogin(data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4 p-4">
      <h2 className="text-2xl font-bold">Enter your details</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-3 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border rounded w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-5 py-2 rounded font-semibold hover:bg-blue-600 transition"
      >
        Enter Chat
      </button>
    </div>
  );
}
