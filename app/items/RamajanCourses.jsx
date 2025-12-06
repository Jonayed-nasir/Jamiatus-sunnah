"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { FaBook, FaQuran, FaPenFancy } from "react-icons/fa";

export default function RamzanCourses() {
  const ramzanDetails = [
    {
      icon: <FaQuran />,
      title: "বয়স্কদের কুরআন শিক্ষা",
      description:
        "কুরআন কারীমের সহীহ তিলাওয়াত শিক্ষা দেওয়া হয়। যারা আগে বঞ্চিত ছিল, তারা রমজান মাসে ১লা থেকে শেষ পর্যন্ত শিক্ষা গ্রহণ করে। শেষ দশ দিনে জামিয়ার জামে মসজিদে ইতিকাফের সুব্যবস্থা থাকে।",
    },
    {
      icon: <FaPenFancy />,
      title: "নাহু সরফ ও আরবী সাহিত্য প্রশিক্ষণ",
      description:
        "প্রতিবছর ১লা রমজান থেকে ২৫ শে রমজান পর্যন্ত নাহু সরফ ও আরবী সাহিত্যের বিশেষ কোর্স অনুষ্ঠিত হয়। নাহবেমীর ও উপরের জামাতের ছাত্ররা অংশগ্রহণ করতে পারে।",
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
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.6 } },
  };

  return (
    <section className="py-20 bg-gradient-to-b from-yellow-50 to-yellow-200">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 text-yellow-700"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          রমজানের কোর্স সমূহ
        </motion.h2>

        <div className="flex flex-col gap-10">
          {ramzanDetails.map((item, idx) => (
            <motion.div
              key={idx}
              ref={(el) => (refs.current[idx] = el)}
              data-idx={idx}
              initial="hidden"
              animate={visible[idx] ? "visible" : "hidden"}
              variants={cardVariants}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left
                         hover:scale-105 hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                className="text-7xl text-yellow-500"
                animate={visible[idx] ? { scale: [1, 1.3, 1], rotate: [0, 15, 0] } : { scale: 0.8, rotate: 0 }}
                transition={{ repeat: visible[idx] ? Infinity : 0, duration: 2, delay: idx * 0.2 }}
              >
                {item.icon}
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 via-yellow-600 to-yellow-500"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={visible[idx] ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
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
