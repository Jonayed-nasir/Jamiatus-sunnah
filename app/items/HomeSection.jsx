"use client";
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Typewriter from 'typewriter-effect';

export default function HomeSection() {
  const images = [
    "/images/hero.jpeg",
    "/images/hero2.jpeg",
    "/images/hero3.jpeg",
    "/images/hero4.jpeg"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto change every 5 sec
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) =>
        prev === images.length - 1 ? 0 : prev + 1
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-screen z-40 relative">

      {/* Background Image */}
      <Image
        key={currentIndex}
        className="w-full h-[50%] lg:h-auto  absolute transition-all duration-1000"
        src={images[currentIndex]}
        alt="hero"
        width={500}
        height={500}
      />

      <div
        data-aos="fade-down-right"
        data-aos-duration="3000"
        className="relative w-full h-screen flex flex-col px-3 pt-30 lg:justify-center lg:items-center"
      >
        {/* <div className="space-y-5 z-0 bg-transparent backdrop-blur-sm py-2 px-3 rounded-2xl"> */}
          <h1 className="text-white font-bold text-4xl lg:text-6xl text-center">
            <Typewriter
              options={{
                strings: [
                  'jamiatus sunnah',
                  'جامعة السنة',
                  'জামিয়াতুস সুন্নাহ',
                ],
                autoStart: true,
                loop: true,
                delay: 280,
                deleteSpeed: 300,
              }}
            />
          </h1>

          <h3 className="text-gray-300 text-lg text-center">
            <Typewriter
              options={{
                strings: [
                  'dakhin kandi, bahadurpur, shibsor, madaripur',
                  'دكن كاندي، بهادور بور، شيبصر، مداري بور',
                  'দক্ষিন কান্দি, বাহাদুরপুর, শিবচর, মাদারীপুর',
                ],
                autoStart: true,
                loop: true,
              }}
            />
          </h3>
        </div>
      </div>
    // </div>
  );
}
