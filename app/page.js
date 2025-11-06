'use client';

import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';
import HomeSection from './pages/HomeSection';
import Noticeboard from './pages/Noticeboard';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div>
      <Navbar />
      <HomeSection />
      <Noticeboard />                             
    </div>
  );
}
