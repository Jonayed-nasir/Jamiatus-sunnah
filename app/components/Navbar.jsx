'use client';

import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";
import Link from "next/link";

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [academicOpen, setAcademicOpen] = useState(false);

  return (
    <>
      <div className="z-20 w-full left-0 top-0 fixed">
        <div className="w-full h-[70px] flex items-center">
          <div className="w-full bg-black/10 backdrop-blur-sm max-w-[99%] md:max-w-[80%] mx-auto flex items-center justify-between py-4 px-5 rounded-2xl">
            <div className="min-[50px] text-white text-2xl font-bold flex items-center">
              <Image src="/logo.png" alt="logo" width={70} height={70} />
            </div>

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white text-3xl z-30"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            <div
              className={`absolute top-[100px] left-5 w-[60%] bg-black/30 lg:bg-transparent rounded-2xl flex flex-col lg:items-center gap-4 lg:gap-6 py-6 px-6 lg:px-0 text-black lg:text-white font-bold transition-all duration-300 lg:static lg:flex-row lg:py-0 ${menuOpen ? "flex" : "hidden lg:flex"}`}
            >
              <Link
                className="hover:text-gray-300 bg-white/40 lg:bg-transparent transition-all backdrop-blur-3xl py-1.5 px-2 rounded-sm"
                href="/"
              >
                {t("home")}
              </Link>

              <Link
                className="hover:text-gray-300 bg-white/40 lg:bg-transparent transition-all backdrop-blur-3xl py-1.5 px-2 rounded-sm"
                href="/about/about"
              >
                {t("about")}
              </Link>

              {/* Academic with dropdown */}
              <div
                className="relative group z-50"
                onMouseEnter={() => setAcademicOpen(true)}
                onMouseLeave={() => setAcademicOpen(false)}
              >
                <button
                  onClick={() => setAcademicOpen(!academicOpen)}
                  type="button"
                  className="flex items-center gap-1 hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm"
                >
                  {t("academic")} <ChevronDown size={18} />
                </button>

                <div
                  className={`absolute left-0 mt-2 w-40 bg-black/70 text-white rounded-xl shadow-lg backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                    academicOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  <Link
                    href="/pages/ruleses"
                    className="block px-4 py-2 hover:bg-white/10"
                  >
                    Ruleses
                  </Link>
                </div>
              </div>

              <Link className="hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm" href="#">
                {t("admission")}
              </Link>

              <a className="hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm" href="#">
                {t("notice")}
              </a>

              <a className="hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm" href="#">
                {t("donate")}
              </a>

              <a className="hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm" href="#">
                {t("contact")}
              </a>

              <LanguageSwitcher className="bg-transparent backdrop-blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
