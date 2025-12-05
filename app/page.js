'use client';

import { useTranslation } from 'react-i18next';
import HomeSection from './items/HomeSection';
import Noticeboard from './items/Noticeboard';
import Introduction from './items/Introduction';
import Stats from './items/Stats';
import AdvancedDepartments from './items/AdvancedDepartments';
import Projects from './items/Projects';  
import BefaqResultList from './items/BefaqResultList';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className='overflow-x-hidden'>
      
      <HomeSection />
      <Noticeboard />                             
      <Introduction />
      <Stats />
      <AdvancedDepartments />
      <Projects />
      <BefaqResultList />
      
    </div>
  );
}
