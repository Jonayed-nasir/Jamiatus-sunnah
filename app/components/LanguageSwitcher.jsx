'use client';

import i18n from '../i18n';
import { useState } from 'react';

export default function LanguageSwitcher() {
  const [lang, setLang] = useState(i18n.language || 'en');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setLang(lng);
    if (lng === 'ar') {
      document.dir = 'rtl';
    } else {
      document.dir = 'ltr';
    }
  };

  return (
    <select
      value={lang}
      onChange={(e) => changeLanguage(e.target.value)}
      className="rounded-sm outline-none border-2 bg-transparent text-white"
    >
      <option className="text-black" value="bn">
        বাংলা
      </option>
      <option className="text-black" value="en">
        English
      </option>
      <option className="text-black" value="ar">
        عربي
      </option>
    </select>
  );
}
