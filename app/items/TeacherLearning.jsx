"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaChalkboardTeacher, FaBook, FaClock, FaMoneyBillWave, FaLaptop } from "react-icons/fa";

export default function MuallimTraining() {
  const trainingDetails = [
    {
      icon: <FaChalkboardTeacher />,
      title: "প্রশিক্ষণের উদ্দেশ্য",
      description:
        "শিশুদের প্রাথমিক শিক্ষাকে সহজ ও কার্যকর করতে দক্ষ শিক্ষক তৈরি করা।",
    },
    {
      icon: <FaBook />,
      title: "কোর্স বিষয়বস্তু",
      description:
        "কুরআন তিলাওয়াত, নূরানী পদ্ধতি, মূল শিক্ষাদান কৌশল ও প্র্যাকটিক্যাল টিপস।",
    },
    {
      icon: <FaClock />,
      title: "সময়কাল",
      description: "বিভিন্ন মেয়াদে প্রশিক্ষণ অনুষ্ঠিত হয়, সাধারণত ২-৩ মাস।",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "ফি স্ট্রাকচার",
      description:
        "নতুন ছাত্রছাত্রীদের ভর্তি ফি, মাসিক ফি, এবং অন্যান্য আনুষঙ্গিক খরচের বিস্তারিত তথ্য।",
    },
    {
      icon: <FaLaptop />,
      title: "অনলাইন রেজিস্ট্রেশন",
      description:
        "ছাত্রছাত্রীরা সহজে অনলাইনে ফর্ম পূরণ ও প্রয়োজনীয় তথ্য আপলোড করতে পারবেন।",
    },
  ];

  const refs = useRef({});
  const [visible, setVisible] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const idx = entry.target.getAttribute("data-idx");
          if (entry.isIntersecting) {
            setVisible((v) => ({ ...v, [idx]: true }));
          } else {
            // Scroll out → reset animation
            setVisible((v) => ({ ...v, [idx]: false }));
          }
        });
      },
      { threshold: 0.2 }
    );

    Object.values(refs.current).forEach((el) => el && observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-blue-50 to-blue-200">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 text-blue-700"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          মুয়াল্লিম প্রশিক্ষণ & ভর্তি তথ্য
        </motion.h2>

        <div className="flex flex-col gap-10">
          {trainingDetails.map((item, idx) => (
            <motion.div
              key={idx}
              ref={(el) => (refs.current[idx] = el)}
              data-idx={idx}
              initial="hidden"
              animate={visible[idx] ? "visible" : "hidden"}
              variants={cardVariants}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left hover:scale-105 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon */}
              <motion.div
                className="text-7xl text-blue-500"
                animate={visible[idx] ? { scale: [1, 1.2, 1], rotate: [0, 15, 0] } : { scale: 1, rotate: 0 }}
                transition={{ repeat: visible[idx] ? Infinity : 0, duration: 2, delay: idx * 0.2 }}
              >
                {item.icon}
              </motion.div>

              {/* Title & Description */}
              <div className="flex-1">
                <motion.h3
                  className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-blue-600 to-blue-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={visible[idx] ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className="text-gray-700 text-lg"
                  initial={{ opacity: 0 }}
                  animate={visible[idx] ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.4 }}
                >
                  {item.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
