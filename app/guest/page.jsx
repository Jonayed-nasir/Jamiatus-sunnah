"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GuestLogin() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      const res = await fetch("/api/guest/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (data.id) {
        localStorage.setItem("guestUser", JSON.stringify(data));
        router.push("/message");
      } else {
        alert(data.error || "Guest creation failed");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-3 bg-gray-100">
      <h1 className="text-2xl font-bold">আপনার নাম লিখুন</h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded"
        placeholder="আপনার নাম"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        চালিয়ে যান
      </button>
    </div>
  );
}
