"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MaintenanceNotice() {
  const [dotCount, setDotCount] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotCount((prev) => (prev >= 3 ? 1 : prev + 1));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const dots = ".".repeat(dotCount);

  return (
     <div>
    <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-500 overflow-hidden">
      {/* Floating background shapes */}
      <span className="absolute w-72 h-72 bg-white/10 rounded-full top-10 left-20 animate-floatSlow"></span>
      <span className="absolute w-56 h-56 bg-white/10 rounded-full bottom-20 right-16 animate-floatSlow2"></span>

      <div className="relative z-10 bg-white/20 backdrop-blur-md rounded-3xl p-10 max-w-lg w-full text-center shadow-xl animate-slideUp">
        <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-red-400 to-pink-500 mb-4 animate-textGradient">
         ওয়েবসাইটের কাজ চলছে
        </h1>

        <p className="text-lg text-white/90 mb-4 animate-type">
          এই পেজের কাজ এখনো  চলমান{dots}
        </p>

        <p className="text-sm text-white/70">
          ইনশাআল্লাহ, নির্দিষ্ট সময়ের মধ্যে সব ফিচার দেখতে পারবেন
        </p>


        <div className="flex justify-center gap-3 mt-6">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className={`w-3 h-3 bg-white rounded-full animate-dotBounce`}
              style={{ animationDelay: `${i * 0.2}s` }}
            ></span>
          ))}
        </div>
        <button  className="bg-amber-700 py-2 px-3 rounded-sm text-white mt-5">
        <Link href="/game">Neon Catch Game</Link>
      </button>
      </div>

      <style jsx>{`
        @keyframes dotBounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(-8px); opacity: 1; }
        }
        .animate-dotBounce { animation: dotBounce 0.6s infinite; }

        @keyframes type {
          0% { opacity: 0; }
          50% { opacity: 1; }
          100% { opacity: 1; }
        }
        .animate-type { animation: type 1s steps(1, end) infinite; }

        @keyframes slideUp {
          0% { transform: translateY(50px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slideUp { animation: slideUp 0.8s ease-out forwards; }

        @keyframes textGradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-textGradient {
          background-size: 200% 200%;
          animation: textGradient 3s ease infinite;
        }

        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
        .animate-floatSlow { animation: floatSlow 6s ease-in-out infinite; }

        @keyframes floatSlow2 {
          0% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
          100% { transform: translateY(0px); }
        }
        .animate-floatSlow2 { animation: floatSlow2 8s ease-in-out infinite; }
      `}</style>

      
    </div>
    
    </div>
  );
}

