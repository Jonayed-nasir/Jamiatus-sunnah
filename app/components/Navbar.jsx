'use client';
import { React, useState } from 'react';
import { Menu, X } from 'lucide-react';

import Image from 'next/image';

import { useTranslation } from 'react-i18next';
import LanguageSwitcher from './LanguageSwitcher';
import Link from 'next/link';

export default function Navbar() {
  const { t } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="  z-20 w-full left-0 top-0 fixed">
        {/* -----------Nav Bar---------- */}
        <div className="w-full h-[70px]  flex items-center">

          <div className="w-full bg-transparent  backdrop-blur-sm  max-w-[99%] md:max-w-[80%] mx-auto flex items-center justify-between py-4 px-5 rounded-2xl">
            {/* -------Logo------- */}
            <div className="min-[50px] text-white text-2xl font-bold flex items-center">
              <Image src="/logo.png" alt="logo" width={70} height={70} />{' '}
            </div>
            {/* -------Menu Icon (mobile only)------- */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-white text-3xl z-30 "
            >
              {menuOpen ? <X /> : <Menu />}
            </button>

            {/* -------Nav Link---------- */}
            <div
              className={`absolute  top-[100px] left-5 w-[40%] bg-black/30 lg:bg-black/0 rounded-2xl  flex flex-col lg:items-center gap-4 lg:gap-6 py-6 px-6 lg:px-0 text-black lg:text-white font-bold transition-all delay-300 duration-300 lg:static lg:flex-row lg:py-0 lg:flex  ${
                menuOpen ? 'flex justify-end' : 'hidden'
              } justify-end`}
            >
              <span className="navHovereffect relative inline-block">
                <a className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm" 
                href="#">
                  {t('home')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('about')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a
                  className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('departments')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('academic')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a
                  className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('admission')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a
                  className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('notice')}
                </a>
              </span>
              <span className="navHovereffect relative inline-block">
                <a
                  className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('donate')}
                </a>
              </span>

              <span className="navHovereffect relative inline-block">
                <a
                  className="hover:text-gray-600 lg:text-gray-300 bg-white/40 lg:bg-white/0  transition-all duration-300  backdrop-blur-3xl py-1.5 px-1.5 rounded-sm"
                  href="#"
                >
                  {t('contact')}
                </a>
              </span>
              <LanguageSwitcher className="bg-transparent backdrop-blur-2xl" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
