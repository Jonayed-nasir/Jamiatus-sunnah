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
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

export default function FixedFooter() {
  const [small, setSmall] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    let lastScroll = 0;

    function handleScroll() {
      const currentScroll = window.scrollY;

      // hide/show
      if (currentScroll > lastScroll + 10) setHidden(false); // scroll down → show
      else if (currentScroll < lastScroll - 10) setHidden(true); // scroll up → hide

      // height shrink
      if (currentScroll > 50) setSmall(true);
      else setSmall(false);

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
      animate={{ y: hidden ? 100 : 0 }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed bottom-0 left-0 w-full z-50"
    >
      <motion.div
        animate={{
          height: small ? 55 : 70,
        }}
        transition={{ duration: 0.2 }}
        className="backdrop-blur-xl bg-[#99FFFF]/90 text-black flex items-center justify-around shadow-xl overflow-x-auto"
      >
        <NavItem icon={<Home size={22} />} label={t("home")} href="/" />
        <Link href="/admission">
          <NavItem icon={<FileEdit size={22} />} label={t("admission")} href="/admission" />
        </Link>
        <NavItem icon={<Bell size={22} />} label={t("notice")} href="/notfoundpage" />
        <NavItem icon={<Users size={22} />} label={t("student")} href="/notfoundpage" />
        <NavItem icon={<BookUser size={22} />} label={t("teacher")} href="/notfoundpage" />
        <NavItem icon={<CalendarDays size={22} />} label={t("events")} href="/notfoundpage" />
        <NavItem icon={<Clock size={22} />} label={t("prayer_time")} href="/notfoundpage" />
        <NavItem icon={<MessageCircle size={22} />} label={t("message")} href="/message" />
        <NavItem icon={<BookOpen size={22} />} label={t("fatwa")} href="/fatwa" />
      </motion.div>
    </motion.div>
  );
}

function NavItem({ icon, label, href }) {
  return (
    <Link
      href={href}
      className="flex flex-col items-center text-[11px] gap-1 px-2 hover:text-gray-300 transition-all"
    >
      {icon}
      <span className="text-[10px]">{label}</span>
    </Link>
  );
}
