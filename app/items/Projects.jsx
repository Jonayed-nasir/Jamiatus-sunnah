"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function JamiaProjects() {
  const projects = [
    {
      title: "শিক্ষাপ্রকল্প",
      departments: [
        "মক্তব বিভাগ",
        "হিফয বিভাগ",
        "কিতাবু বিভাগ",
        "ইফতা বিভাগ",
        "উলূমুল হাদিস বিভাগ",
        "আরবি সাহিত্য বিভাগ",
        "উচ্চতর কিরাত বিভাগ",
      ],
      color: "bg-blue-200 text-blue-800 hover:bg-blue-400 hover:text-white",
    },
    {
      title: "প্রশিক্ষণ প্রকল্প",
      departments: [
        "ছাত্রপাঠাগার",
        "বক্তৃতা প্রতিযোগিতা",
        "দেয়ালিকা",
        "বিষয়ভিত্তিক মুহাযারা ও বিতর্ক",
        "আমলের বাস্তব প্রশিক্ষণ",
      ],
      color: "bg-green-200 text-green-800 hover:bg-green-400 hover:text-white",
    },
    {
      title: "জনসেবা প্রকল্প",
      departments: [
        "সাবাহী মক্তব",
        "ফাতওয়া বিভাগ",
        "ফারায়েজ বিভাগ",
        "প্রকাশনা বিভাগ",
        "মজলিসে দাওয়াতুল হক",
        "দাওয়াত ও তাবলীগ",
        "বয়স্কদের কুরআন শিক্ষা",
        "নাহ সরফ ও আরবী সাহিত্য প্রশিক্ষণ",
        "নূরানী মুয়াল্লিম প্রশিক্ষণ",
      ],
      color: "bg-red-200 text-red-800 hover:bg-red-400 hover:text-white",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300 } },
  };

  return (
    <section className="w-full bg-gray-50 py-12">
      <div className="max-w-5xl mx-auto px-4 space-y-12">
        {projects.map((proj, idx) => {
          const controls = useAnimation();
          const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });

          useEffect(() => {
            if (inView) controls.start("visible");
          }, [controls, inView]);

          return (
            <motion.div
              key={idx}
              ref={ref}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow"
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
              }}
              initial="hidden"
              animate={controls}
            >
              <motion.h3
                className="text-3xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: { type: "spring", stiffness: 120, duration: 0.6 },
                  },
                }}
              >
                {proj.title}
              </motion.h3>

              <motion.div
                className="flex flex-wrap gap-3 justify-center"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {proj.departments.map((dept, didx) => (
                  <motion.span
                    key={didx}
                    className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer ${proj.color} shadow-sm`}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.1, boxShadow: "0 4px 12px rgba(0,0,0,0.2)" }}
                  >
                    {dept}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

