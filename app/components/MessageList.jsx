"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function MessageList({ guest }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    try {
      const res = await fetch("https://jamiatussunnah.onrender.com/message/");
      const data = await res.json();
      setMessages(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim()) return;
    try {
      const res = await fetch("https://jamiatussunnah.onrender.com/message/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: newMessage, sender: guest?.id }),
      });
      if (res.ok) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const guestId = guest?.id ?? -1;

  return (
    <div className="flex flex-col h-screen bg-gray-100">

      {/* Header */}
      <header className="text-center p-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold shadow">
        Jamiatus Sunnah Chat
      </header>

      {/* Messages */}
      <main className="flex-1 p-4 overflow-y-auto flex flex-col gap-4 pb-28">
        <AnimatePresence initial={false}>
          {messages.map((msg) => {
            const sender = msg.sender;
            const isUser = sender === guestId;
            const isAdmin = sender === null;
            const senderName = isUser ? "You" : isAdmin ? "Admin" : msg.sender_name;

            const bubbleStyle = isUser
              ? "self-end bg-blue-500 text-white rounded-br-none"
              : isAdmin
              ? "self-start bg-yellow-200 text-gray-900 rounded-bl-none"
              : "self-start bg-green-200 text-gray-900 rounded-bl-none";

            return (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-sm ${bubbleStyle}`}
              >
                <div className="font-semibold text-sm opacity-80 mb-1">{senderName}</div>
                <div>{msg.body}</div>
                <div className="text-xs text-right opacity-60 mt-1">
                  {new Date(msg.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </main>

      {/* Footer */}
      <footer className="fixed bottom-0 left-0 right-0 bg-white p-3 flex gap-2 border-t shadow">
        <input
          type="text"
          className="flex-1 p-3 border rounded-full focus:ring-2 focus:ring-blue-400"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-full"
          onClick={handleSend}
        >
          Send
        </button>
      </footer>
    </div>
  );
}
