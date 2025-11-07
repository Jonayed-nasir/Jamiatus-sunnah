import Image from 'next/image';
import React from 'react';
import Typewriter from 'typewriter-effect';
// import { useTranslation } from 'react-i18next';
// import LanguageSwitcher from './LanguageSwitcher';

export default function HomeSection() {
  // const {} = useTranslation();

  return (
    <div className=" w-full h-screen z-40">
      <div>
        <Image
          className="w-full h-[99vh] bg-cover object-cover absolute"
          src="/images/hero.jpeg"
          alt="hero"
          width={500}
          height={500}
        />
      </div>

      <div
        data-aos="fade-down-right"
        data-aos-duration="3000"
        className="relative w-full h-screen flex flex-col px-3 justify-center items-center"
      >
        <div className="space-y-5 bg-transparent backdrop-blur-sm py-2 px-3 rounded-2xl">
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
    </div>
  );
}
