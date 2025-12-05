"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Typewriter from "typewriter-effect";

export default function HomeSection() {
  const images = [
    "/images/hero.jpeg",
    "/images/hero2.jpeg",
    "/images/hero3.jpeg",
    "/images/hero4.jpeg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto image change every 4s (more smooth)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[50vh] lg:h-screen overflow-hidden">

      {/* Smooth Fade + Slow Zoom */}
      <div className="absolute inset-0 mt-20 lg:mt-0">
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt="hero"
            width={2000}
            height={500}
            className={`
              absolute inset-0 w-full object-cover
              transition-all duration-[2500ms] ease-[cubic-bezier(0.4,0,0.2,1)]
              ${index === currentIndex 
                ? "opacity-100 scale-105" 
                : "opacity-0 scale-100"
              }
            `}
          />
        ))}
      </div>

      {/* Dark gradient overlay */}
      <div className="absolute inset-0  from-black/60 via-black/40 to-black/70"></div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center text-center px-4">
        <h1 className="text-white font-bold text-4xl lg:text-6xl drop-shadow-xl">
          <Typewriter
            options={{
              strings: [
                "jamiatus sunnah",
                "جامعة السنة",
                "জামিয়াতুস সুন্নাহ",
              ],
              autoStart: true,
              loop: true,
              delay: 280,
              deleteSpeed: 200,
            }}
          />
        </h1>

        <h3 className="text-gray-200 text-lg lg:text-xl mt-3 drop-shadow-lg">
          <Typewriter
            options={{
              strings: [
                "dakhin kandi, bahadurpur, shibsor, madaripur",
                "دكن كاندي، بهادور بور، شيبصر، مداري بور",
                "দক্ষিন কান্দি, বাহাদুরপুর, শিবচর, মাদারীপুর",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </h3>
      </div>
    </div>
  );
}
