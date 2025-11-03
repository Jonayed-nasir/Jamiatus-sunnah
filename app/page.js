import { useState, useEffect } from 'react';


const heroImages = [
'https://images.unsplash.com/photo-1587560699334-cc4ff634909a',
'https://images.unsplash.com/photo-1551882547-ff1096e83253',
'https://images.unsplash.com/photo-1602515303001-3f8d8c3aa1b3',
'https://images.unsplash.com/photo-1622471117114-5f83a0cd1f99',
];
export default function Home() {
const [currentHero, setCurrentHero] = useState(0);


useEffect(() => {
const interval = setInterval(() => {
setCurrentHero(prev => (prev + 1) % heroImages.length);
}, 4000);
return () => clearInterval(interval);
}, []);


  return (
    <div className="scroll-smooth bg-[#fefcf6] text-gray-900 dark:bg-[#0f1f17] dark:text-gray-100 transition-colors duration-500">
{/* Top Utility Bar */}
<div className="bg-emerald-900 text-white text-sm px-4 py-2 flex justify-between items-center">
<span className="italic">بسم الله الرحمن الرحيم</span>
<div className="flex gap-4 items-center">
<span>📞 +8801XXXXXXX</span>
<span>✉ info@madrasaname.edu.bd</span>
<button id="themeToggle" className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-emerald-700 transition">🌙</button>
</div>
</div>


{/* Navbar */}
<header className="sticky top-0 z-50 bg-white/90 dark:bg-emerald-950/90 backdrop-blur shadow-sm">
<div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
<div className="flex items-center space-x-3">
<img src="https://cdn-icons-png.flaticon.com/512/3104/3104958.png" alt="logo" className="w-10 h-10" />
<div>
<h1 className="text-xl font-bold text-emerald-800 dark:text-emerald-300">الجامعة الأحمدية القومية</h1>
<p className="text-sm text-gray-600 dark:text-gray-400">Al-Jamia Al-Ahmadiya Qawmi Madrasa</p>
</div>
</div>
<nav className="hidden md:flex items-center space-x-8 font-semibold">
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Home</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">About</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Departments</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Academics</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Admission</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Notice</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Gallery</a>
<a href="#" className="hover:text-emerald-700 dark:hover:text-emerald-300 transition">Contact</a>
<a href="#" className="bg-gradient-to-r from-emerald-600 to-yellow-500 text-white px-4 py-2 rounded-full hover:shadow-lg hover:scale-105 transition">Donate</a>
</nav>
</div>
</header>


{/* Hero Section */}
<section className="relative overflow-hidden">
<img src={heroImages[currentHero]} alt="Hero" className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-40 transition-opacity duration-1000" />
<div className="relative max-w-6xl mx-auto px-6 py-32 text-center text-white">
<h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-wide drop-shadow-lg">الجامعــة الأحمديــة القوميــة</h2>
<p className="text-lg md:text-xl font-serif italic text-yellow-200 mb-4">"রَّبِّ জِদْনِي ইল্মা" — “হে আমার প্রভু, আমার জ্ঞান বৃদ্ধি কর।” (সূরা ত্বা-হা ২০:১১৪)</p>
<p className="text-base md:text-lg text-gray-100 max-w-2xl mx-auto mb-8">ইলমে নাববীর আলোয় শিক্ষিত প্রজন্ম গড়ে তোলার প্রয়াসে — এক অনন্য দ্বীনি শিক্ষাপ্রতিষ্ঠান।</p>
<div className="flex justify-center gap-4">
<a href="#admission" className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold px-6 py-3 rounded-full transition">ভর্তি তথ্য দেখুন</a>
<a href="#donate" className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold px-6 py-3 rounded-full transition">দান করুন</a>
</div>
</div>
</section>


{/* Remaining Sections like Notice, About, Departments, Footer can be copied similarly */}
</div>
  );
}
