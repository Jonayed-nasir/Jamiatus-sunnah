"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function Noticeboard() {
  const [notices, setNotices] = useState([]);
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch("https://jamiatussunnah.onrender.com/post/api/");
        const data = await res.json();
        setNotices(data.slice(-5).reverse());
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    }
    fetchNotices();
  }, []);

  useEffect(() => {
    if (!notices.length) return;

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
    if (typeof window !== "undefined" && window.innerWidth < 768) {
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

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-200">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center">
        {/* Title */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-12">
          <Image
            src="/images/new-update.jpeg"
            alt="new-update"
            width={120}
            height={120}
            className="rounded-xl shadow-2xl hover:scale-110 transition-transform duration-500"
          />
          <motion.h2
            className="text-3xl md:text-5xl font-extrabold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 animate-text-glow"
            initial={{ y: -60, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            সর্বশেষ নোটিশসমূহ
          </motion.h2>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between w-full mb-6">
          <motion.button
            onClick={() => setIndex((prev) => (prev - 1 + notices.length) % notices.length)}
            whileHover={{ scale: 1.1 }}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg shadow-lg border-b-4 border-pink-700"
          >
            Prev
          </motion.button>
          <motion.button
            onClick={() => setIndex((prev) => (prev + 1) % notices.length)}
            whileHover={{ scale: 1.1 }}
            className="bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg shadow-lg border-b-4 border-pink-700"
          >
            Next
          </motion.button>
        </div>

        {/* Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            {visibleCards.map((item, idx) => {
              const dateObj = new Date(item.created_at);
              const formattedDate = dateObj.toLocaleDateString("bn-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              });
              const year = dateObj.getFullYear();

              return (
                <motion.div
                  key={idx + item.title}
                  initial={{ opacity: 0, y: 50, scale: 0.95 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                  className="relative p-6 rounded-3xl bg-white/60 backdrop-blur-md border border-gray-100 shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-500 hover:bg-gradient-to-r hover:from-pink-50 hover:to-yellow-50"
                >
                  <h3 className="text-xl md:text-2xl font-bold mb-3 bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 text-transparent bg-clip-text animate-text-glow">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 line-clamp-5 mb-4">{item.content}</p>
                  <Link href={`/notice/${item.id}`} className="justify-center flex">
                    <span className="inline-block px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg border-b-4 border-blue-700 transition-all duration-300 mt-5 mb-5">
                      বিস্তারিত পড়ুন
                    </span>
                  </Link>

                  <div className="flex justify-between items-center mt-4 mb-0 text-sm text-gray-500">
                    <span>{formattedDate}</span>
                    <span className="border-l border-r border-pink-300 px-2">
                      {item.get_time_difference}
                    </span>
                    <span>{year}</span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-300 mt-6 rounded overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 to-yellow-500"
            style={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          ></motion.div>
        </div>

        {/* Dots */}
        <div className="flex mt-4 gap-2">
          {notices.map((_, idx) => (
            <motion.span
              key={idx}
              className={`w-3 h-3 rounded-full ${idx === index ? 'bg-pink-500' : 'bg-gray-400'}`}
              animate={{ scale: idx === index ? 1.4 : 1 }}
              transition={{ duration: 0.3 }}
            ></motion.span>
          ))}
        </div>
      </div>

      <style jsx>{`
        .animate-text-glow {
          animation: textGlow 2s ease-in-out infinite alternate;
        }

        }
      `}</style>
    </section>
  );
}
