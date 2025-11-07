'use client';

import Navbar from './components/Navbar';
import { useTranslation } from 'react-i18next';
import HomeSection from './pages/HomeSection';
import Noticeboard from './pages/Noticeboard';
import Introduction from './pages/Introduction';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='overflow-x-hidden'>
      <Navbar />
      <HomeSection />
      <Noticeboard />                             
      <Introduction />
    </div>
  );
}
