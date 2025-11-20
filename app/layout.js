import './globals.css';
import { Aref_Ruqaa  } from 'next/font/google'
import './i18n'; // i18n init load
import AOSInitializer from './components/AOSInitializer';
import Navbar from './components/Navbar';

const aref_ruqaa = Aref_Ruqaa({subsets: ['latin'], weight: ['400', '700'],})

export const metadata = {
  title: 'Multilingual Website',
  description: 'Next.js multilingual setup',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={`${aref_ruqaa.className}`} >
      <Navbar />
      <AOSInitializer >{children}</AOSInitializer>
      
      </body>
    </html>
  );
}
