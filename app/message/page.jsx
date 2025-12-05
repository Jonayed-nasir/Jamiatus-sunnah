"use client";

import { useState, useEffect } from "react";
import GuestLogin from "../components/GuestLogin";
import MessageList from "../components/MessageList";

export default function MessagesPage() {
  const [guest, setGuest] = useState(null);

  useEffect(() => {
    const storedGuest = JSON.parse(localStorage.getItem("guestUser"));
    if (storedGuest) setGuest(storedGuest);
  }, []);

  if (!guest) return <GuestLogin onLogin={setGuest} />;

  return <MessageList guest={guest} />;
}
