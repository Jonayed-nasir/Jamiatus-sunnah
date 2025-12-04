"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  FileEdit,
  Bell,
  Users,
  BookUser,
  CalendarDays,
  Clock,
  MessageCircle,
  BookOpen
} from "lucide-react";
import Link from "next/link";

export default function FixedFooter() {
  const [small, setSmall] = useState(false);

  useEffect(() => {
    let lastScroll = 0;
    function handleScroll() {
      const currentScroll = window.scrollY;

      if (currentScroll > lastScroll) {
        setSmall(true);
      } else {
        setSmall(false);
      }

      lastScroll = currentScroll <= 0 ? 0 : currentScroll;
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: 0, right: 80 }}
      dragElastic={0.2}
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed bottom-0 left-0 w-full z-50"
    >
      <motion.div
        animate={{
          height: small ? 55 : 70,
        }}
        transition={{ duration: 0.2 }}
        className="backdrop-blur-xl bg-[#0b3a2d]/90 text-white flex items-center justify-around shadow-xl overflow-x-auto"
      >
        <NavItem icon={<Home size={22} />} label="Home" href="/" />
        <Link href='/admission'>
        <NavItem icon={<FileEdit size={22} />} label="Register" href="/register" />
        </Link>
        <NavItem icon={<Bell size={22} />} label="Notice" href="/notice" />
        <NavItem icon={<Users size={22} />} label="Student" href="/student" />
        <NavItem icon={<BookUser size={22} />} label="Teacher" href="/teacher" />
        <NavItem icon={<CalendarDays size={22} />} label="Events" href="/events" />
        <NavItem icon={<Clock size={22} />} label="নামাজ সময়" href="/prayer-times" />
        <NavItem icon={<MessageCircle size={22} />} label="Message" href="/message" />
        <NavItem icon={<BookOpen size={22} />} label="Fatwa" href="/fatwa" />
      </motion.div>
    </motion.div>
  );
}

function NavItem({ icon, label, href }) {
  return (
    <a
      href={href}
      className="flex flex-col items-center text-[11px] gap-1 px-2 hover:text-gray-300 transition-all"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </a>
  );
}
