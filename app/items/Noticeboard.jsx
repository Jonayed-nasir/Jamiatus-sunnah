'use client';

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSwipeable } from 'react-swipeable';
import Image from 'next/image';
export default function Noticeboard() {
  const [notices, setNotices] = useState([]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // 🔹 API থেকে ডেটা ফেচ
  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch(
          'https://jamiatussunnah.onrender.com/post/api/'
        );
        const data = await res.json();
        setNotices(data.slice(-5).reverse()); // শেষ ৫টা
      } catch (err) {
        console.error('Error fetching notices:', err);
      }
    }
    fetchNotices();
  }, []);

  // 🔹 Auto slide + progress
  useEffect(() => {
    if (!notices.length) return;
    // setProgress(0);

    const progressInterval = setInterval(() => {
      if (!isPaused) setProgress((prev) => (prev >= 100 ? 0 : prev + 2.5));
    }, 100);

    const slideInterval = setInterval(() => {
      if (!isPaused) setIndex((prev) => (prev + 1) % notices.length);
    }, 4000);

    return () => {
      clearInterval(slideInterval);
      clearInterval(progressInterval);
    };
  }, [notices, isPaused]);

  if (!notices.length) {
    return (
      <p className="text-center text-gray-400 py-10">Loading notices...</p>
    );
  }

  const getVisibleCards = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      return [notices[index % notices.length]];
    } else {
      return [
        notices[index % notices.length],
        notices[(index + 1) % notices.length],
        notices[(index + 2) % notices.length],
      ];
    }
  };

  const visibleCards = getVisibleCards();

  const handlePrev = () =>
    setIndex((prev) => (prev - 1 + notices.length) % notices.length);
  const handleNext = () => setIndex((prev) => (prev + 1) % notices.length);

  return (
    <div className="w-full max-w-[90%] lg:max-w-[80%] mx-auto flex flex-col justify-center items-center py-10 md:py-20">
      <div className="flex items-center justify-between lg:justify-center">
        <Image
          data-aos="fade-right"
          className="max-w-32"
          src="/images/new-update.jpeg"
          alt="new-update"
          width={500}
          height={500}
        />
        <h3
          data-aos="fade-left"
          className="font-bold text-center text-lg md:text-3xl bg-blue-500 hover:bg-pink-700 text-white px-4 py-2 rounded border-b-8 border-blue-800 transition-all duration-300"
        >
          সর্বশেষ নোটিশসমূহ
        </h3>
      </div>

      {/* 🔹 Navigation Buttons */}
      <div className="flex justify-between w-full mb-4">
        <button
          onClick={handlePrev}
          className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded border-b-4 border-pink-700 hover:border-pink-400 transition-all cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={handleNext}
          className="bg-pink-500 hover:bg-pink-700 text-white px-4 py-2 rounded border-b-4 border-pink-700 hover:border-pink-400 transition-all cursor-pointer"
        >
          Next
        </button>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <AnimatePresence mode="wait">
          {visibleCards.map((item, idx) => {
            const dateObj = new Date(item.created_at);
            const formattedDate = dateObj.toLocaleDateString('bn-GB', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
            });
            const year = dateObj.getFullYear();

            return (
              <motion.div
                key={idx + item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="card col-span-1 w-full h-auto bg-white/10 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
              >
                <div
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="card-text p-5"
                >
                  <h2 className=" space-y-7 text-xl font-semibold text-white mb-2 bg-pink-500 py-1.5 px-3 rounded-tl-2xl rounded-br-2xl leading-10 line-clamp-1 border-b-4 border-pink-700 text-center">
                    {item.title}
                  </h2>
                  <p className="text-gray-200 mt-4 text-sm leading-relaxed line-clamp-6">
                    {item.content}
                  </p>
                  <span className="mt-6 inline-block px-3 py-2 bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-tl-2xl rounded-br-2xl transition-all duration-300 border-b-4 border-blue-800 hover:border-blue-400">
                    <a href="#">Show More</a>
                  </span>
                </div>

                <div className="card-stats flex items-center justify-between py-3 px-5 text-sm text-gray-300 h-[50px]">
                  <div>{formattedDate}</div>
                  <div className="border-r border-l border-pink-300 px-2">
                    {item.get_time_difference}
                  </div>
                  <div>{year}</div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* 🔹 Progress Bar */}
      <div className="w-full h-1 bg-gray-700 mt-6 rounded overflow-hidden">
        <div
          className="h-full bg-pink-500 transition-all duration-100 ease-linear"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* 🔹 Dots Indicator */}
      <div className="flex mt-4 gap-2">
        {notices.map((_, idx) => (
          <span
            key={idx}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              idx === index ? 'bg-pink-500' : 'bg-gray-500'
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
}
