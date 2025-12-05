"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaUserGraduate, FaCalendarAlt, FaGlobe, FaFileAlt } from "react-icons/fa";

export default function NewAdmission() {
  const admissionInfo = [
    {
      icon: <FaUserGraduate />,
      title: "ভর্তি যোগ্যতা",
      description: "মক্তব বিভাগ থেকে ইফতার বিভাগ পর্যন্ত সকল শিক্ষার্থী ভর্তি হতে পারে।",
    },
    {
      icon: <FaCalendarAlt />,
      title: "ভর্তি সময়সীমা",
      description: "প্রতিবছর ঈদুল ফিতর থেকে নির্দিষ্ট সময় পর্যন্ত ভর্তি হওয়ার সুযোগ রয়েছে।",
    },
    {
      icon: <FaGlobe />,
      title: "অনলাইন রেজিস্ট্রেশন",
      description: "বছরের যেকোনো সময় অনলাইনে ভর্তির জন্য আবেদন করা যায়, পরে নির্দিষ্ট সময়ে মাদ্রাসায় এসে পরীক্ষা দিয়ে ভর্তি হতে পারবে।",
    },
    {
      icon: <FaFileAlt />,
      title: "ভর্তি পরীক্ষা",
      description: "মাদ্রাসার পক্ষ থেকে জামাত ভিত্তিক ভর্তি পরীক্ষার জন্য কিতাবের লিস্ট প্রকাশ করা হবে।",
    },
  ];

  // useInView hook
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.2 },
    }),
  };

  return (
    <section className="py-20 bg-gradient-to-b from-green-50 to-green-200">
      <div className="max-w-6xl mx-auto px-4">
        {/* Section Title */}
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 text-green-700"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          নতুন ছাত্র ভর্তি
        </motion.h2>

        {/* Cards */}
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {admissionInfo.map((info, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              className="bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center text-center relative overflow-hidden cursor-pointer
                         hover:scale-105 hover:shadow-2xl transition-all duration-500"
            >
              {/* Icon */}
              <motion.div
                className="text-6xl text-green-500 mb-5"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
              >
                {info.icon}
              </motion.div>

              {/* Title */}
              <motion.h3
                className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-600 to-green-500"
              >
                {info.title}
              </motion.h3>

              {/* Description */}
              <motion.p className="text-gray-700">{info.description}</motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
