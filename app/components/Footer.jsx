import Link from "next/link";
export default function Footer() {
  return (
    <footer className="bg-[#0b3a2d] text-white py-12 mt-16 mb-14">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-10">

        {/* Madrasa Info */}
        <div>
          <h2 className="text-2xl font-bold mb-3">জামিয়াতুন্নাহ শিবচর মাদারীপুর</h2>
          <p className="text-sm opacity-90 leading-6">
            দ্বীনি শিক্ষা, আমল এবং সুন্দর চরিত্র গঠনে নিবেদিত একটি অঙ্গীকারবদ্ধ কওমি মাদ্রাসা।
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">গুরুত্বপূর্ণ লিংক</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li><Link href="/about/about" className="hover:text-gray-300">মাদ্রাসা সম্পর্কে</Link></li>
            <li><Link href="/admission" className="hover:text-gray-300">ভর্তি তথ্য</Link></li>
            <li><Link href="/departments" className="hover:text-gray-300">বিভাগসমূহ</Link></li>
            <li><Link href="/notice" className="hover:text-gray-300">নোটিশ বোর্ড</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300">যোগাযোগ</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">যোগাযোগ</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>📍 শিবচর, মাদারীপুর</li>
            <li>📞 017XXXXXXXX</li>
            <li>📧 info@jamiatunnoha.com</li>
            <li>🕘 অফিস সময়: সকাল ৯টা – বিকাল ৪টা</li>
          </ul>
        </div>

        {/* Donation */}
        <div>
          <h3 className="text-lg font-semibold mb-3">অনুদান</h3>
          <ul className="space-y-2 text-sm opacity-90">
            <li>ব্যাংক: Islami Bank</li>
            <li>A/C: 123456789</li>
            <li>বিকাশ: 01XXXXXXXXX</li>
            <li>নগদ: 01XXXXXXXXX</li>
          </ul>
        </div>

      </div>

      {/* Bottom line */}
      <div className="text-center text-sm mt-12 pt-5 border-t border-white/20">
        © {new Date().getFullYear()} জামিয়াতুন্নাহ শিবচর মাদারীপুর. সর্বস্বত্ব সংরক্ষিত।  
        <br />
        <span className="opacity-70">Developed by md Jonayed & md zubayer</span>
      </div>
    </footer>
  );
}

