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
  const [rulesesOpen, setRulesesOpen] = useState(false);
  const [curriculumOpen, setCurriculumOpen] = useState(false);
  const [routineOpen, setRoutineOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [admissionOpen, setAdmissionOpen] = useState(false);



  return (
    <>
      <div className="z-20 w-full left-0 top-0 fixed">
        <div className="w-full h-[70px] flex items-center">
          <div className="w-full bg-black/10 backdrop-blur-sm max-w-[99%] md:max-w-[80%] mx-auto flex items-center justify-between py-4 px-5 rounded-2xl">
            
            {/* Logo */}
            <div className="min-[50px] text-white text-2xl font-bold flex items-center">
              <Image src="/logo.png" alt="logo" width={70} height={70} />
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white text-3xl z-30"
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {/* Links */}
            <div
              className={`absolute top-[100px] left-5 w-[60%] bg-black/30 lg:bg-transparent rounded-2xl flex flex-col lg:items-center gap-4 lg:gap-6 py-6 px-6 lg:px-0 text-black lg:text-white font-bold transition-all duration-300 lg:static lg:flex-row lg:py-0 ${
                menuOpen ? "flex" : "hidden lg:flex"
              }`}
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

              {/* Academic Dropdown */}
              <div
                className="relative group z-50"
                onMouseEnter={() => setAcademicOpen(true)}
                onMouseLeave={() => {
                  setAcademicOpen(false);
                  setRulesesOpen(false);
                  setCurriculumOpen(false);
                }}
              >
                <button
                  onClick={() => setAcademicOpen(!academicOpen)}
                  type="button"
                  className="flex items-center gap-1 hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm"
                >
                  {t("academic")} <ChevronDown size={18} />
                </button>

                {/* Academic Dropdown Items */}
                <div
                  className={`absolute left-0 mt-2 w-40 bg-black/70 text-white rounded-xl shadow-lg backdrop-blur-xl transition-all duration-300 overflow-hidden ${
                    academicOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  }`}
                >
                  {/* Ruleses trigger */}
                  <button
                    onMouseEnter={() => setRulesesOpen(true)}
                    onMouseLeave={() => setRulesesOpen(false)}
                    className="w-full flex justify-between px-4 py-2 hover:bg-white/10"
                  >
                    <span>Ruleses</span>
                    <span>{">"}</span>
                  </button>

                  {/* Curriculum trigger */}
                  <button
                    onMouseEnter={() => setCurriculumOpen(true)}
                    onMouseLeave={() => setCurriculumOpen(false)}
                    className="w-full flex justify-between px-4 py-2 hover:bg-white/10"
                  >
                    <span>Curriculum</span>
                    <span>{">"}</span>
                  </button>

                    {/* Routine trigger */}
<button
  onMouseEnter={() => setRoutineOpen(true)}
  onMouseLeave={() => setRoutineOpen(false)}
  className="w-full flex justify-between px-4 py-2 hover:bg-white/10"
>
  <span>Routine</span>
  <span>{">"}</span>
</button>

{/* Services trigger */}
<button
  onMouseEnter={() => setServicesOpen(true)}
  onMouseLeave={() => setServicesOpen(false)}
  className="w-full flex justify-between px-4 py-2 hover:bg-white/10"
>
  <span>Serviceses</span>
  <span>{">"}</span>
</button>

                  {/* <Link
                    href="/pages/routine"
                    className="block px-4 py-2 hover:bg-white/10"
                  >
                    Routine
                  </Link> */}
                </div>

                {/* Ruleses Submenu */}
                {rulesesOpen && academicOpen && (
                  <div
                    className="absolute left-35 top-0 w-44 bg-black/80 text-white rounded-xl shadow-xl backdrop-blur-xl transition-all duration-300 p-2"
                    onMouseEnter={() => setRulesesOpen(true)}
                    onMouseLeave={() => setRulesesOpen(false)}
                  >
                    <Link href="/rules/leave" className="block px-4 py-2 hover:bg-white/10">Leave & Application</Link>
                    <Link href="/rules/exam" className="block px-4 py-2 hover:bg-white/10">Exam</Link>
                    <Link href="/rules/examinee" className="block px-4 py-2 hover:bg-white/10">Examinee</Link>
                    <Link href="/rules/boarding" className="block px-4 py-2 hover:bg-white/10">Boarding</Link>
                    <Link href="/rules/offence" className="block px-4 py-2 hover:bg-white/10">Offence</Link>
                    <Link href="/rules/pledge" className="block px-4 py-2 hover:bg-white/10">Pledge</Link>
                    <Link href="/rules/dormitory" className="block px-4 py-2 hover:bg-white/10">Dormitory</Link>
                    <Link href="/rules/cleaning" className="block px-4 py-2 hover:bg-white/10">Cleaning</Link>
                    <Link href="/rules/others" className="block px-4 py-2 hover:bg-white/10">Others</Link>
                  </div>
                )}

                {/* Curriculum Submenu */}
                {curriculumOpen && academicOpen && (
                  <div
                    className="absolute left-35 top-20 w-44 bg-black/80 text-white rounded-xl shadow-xl backdrop-blur-xl transition-all duration-300 p-2"
                    onMouseEnter={() => setCurriculumOpen(true)}
                    onMouseLeave={() => setCurriculumOpen(false)}
                  >
                    <Link href="/academic/curriculum/board" className="block px-4 py-2 hover:bg-white/10">Board</Link>
                    <Link href="/academic/curriculum/boardspecial" className="block px-4 py-2 hover:bg-white/10">Board Special</Link>

                    <Link href="/academic/curriculum/hifz" className="block px-4 py-2 hover:bg-white/10">Hifz</Link>
                    <Link href="/academic/curriculum/nazera" className="block px-4 py-2 hover:bg-white/10">Nazera</Link>
                    <Link href="/academic/curriculum/kitab" className="block px-4 py-2 hover:bg-white/10">Kitab</Link>

                  </div>
                )}

                {/* Routine submenu mini window */}
{routineOpen && academicOpen && (
  <div
    className="absolute left-35 top-40 w-44 bg-black/80 text-white rounded-xl shadow-xl backdrop-blur-xl transition-all duration-300 p-2"
    onMouseEnter={() => setRoutineOpen(true)}
    onMouseLeave={() => setRoutineOpen(false)}
  >
    <Link href="/academic/routine/board" className="block px-4 py-2 hover:bg-white/10">Board</Link>
    <Link href="/academic/routine/boardspecial" className="block px-4 py-2 hover:bg-white/10">Board Special</Link>
    <Link href="/academic/routine/nazera" className="block px-4 py-2 hover:bg-white/10">Nazera</Link>
    <Link href="/academic/routine/hifz" className="block px-4 py-2 hover:bg-white/10">Hifz</Link>
    <Link href="/academic/routine/advice" className="block px-4 py-2 hover:bg-white/10">Advice</Link>
    <Link href="/academic/routine/kitab" className="block px-4 py-2 hover:bg-white/10">Kitab</Link>
    <Link href="/academic/routine/thursday-friday" className="block px-4 py-2 hover:bg-white/10">Thursday & Friday</Link>
    <Link href="/academic/routine/mamulat" className="block px-4 py-2 hover:bg-white/10">Daily Mamulat</Link>



  </div>
)}

{servicesOpen && academicOpen && (
  <div
    className="absolute left-35 top-45 w-44 bg-black/80 text-white rounded-xl shadow-xl backdrop-blur-xl transition-all duration-300 p-2"
    onMouseEnter={() => setServicesOpen(true)}
    onMouseLeave={() => setServicesOpen(false)}
  >
    <Link href="/services/free-food-numbers" className="block px-4 py-2 hover:bg-white/10">
      Free Food
    </Link>

    {/* <Link href="/services/number" className="block px-4 py-2 hover:bg-white/10">
      Number
    </Link>

    <Link href="/services/medical" className="block px-4 py-2 hover:bg-white/10">
      Medical
    </Link>

    <Link href="/services/transport" className="block px-4 py-2 hover:bg-white/10">
      Transport
    </Link>

    <Link href="/services/help-centre" className="block px-4 py-2 hover:bg-white/10">
      Help Centre
    </Link> */}
  </div>
)}


              </div>

{/* Admission Dropdown */}
<div
  className="relative group"
  onMouseEnter={() => setAdmissionOpen(true)}
  onMouseLeave={() => setAdmissionOpen(false)}
>
  <button
    onClick={() => setAdmissionOpen(!admissionOpen)}
    className="hover:text-gray-300 bg-white/40 lg:bg-transparent backdrop-blur-3xl py-1.5 px-2 rounded-sm flex items-center gap-1"
  >
    {t("admission")} <ChevronDown size={18} />
  </button>

  {/* Admission submenu */}
  {admissionOpen && (
    <div
      className="absolute left-0 top-7 mt-1 w-44 bg-black/80 text-white rounded-xl shadow-xl backdrop-blur-xl transition-all duration-300 p-2"
      onMouseEnter={() => setAdmissionOpen(true)}
      onMouseLeave={() => setAdmissionOpen(false)}
    >
      <Link href="/admission/admission-numbers" className="block px-4 py-2 hover:bg-white/10">
        Admission Numbers
      </Link>
      <Link href="/admission/apply-online" className="block px-4 py-2 hover:bg-white/10">
        Apply Online
      </Link>
      <Link href="/admission/fees" className="block px-4 py-2 hover:bg-white/10">
        Admission Notice
      </Link>
      {/* <Link href="/admission/scholarships" className="block px-4 py-2 hover:bg-white/10">
        Scholarships
      </Link> */}
    </div>
  )}
</div>



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
