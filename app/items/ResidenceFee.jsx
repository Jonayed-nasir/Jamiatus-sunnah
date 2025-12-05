"use client";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FaMoneyBillWave, FaBed, FaCoins } from "react-icons/fa";

export default function ResidentialFee() {
  const feeDetails = [
    {
      icon: <FaBed />,
      title: "আবাসিক সুবিধা",
      description:
        "ছাত্রদের জন্য নিরাপদ ও সুসজ্জিত আবাসিক কক্ষে থাকার সুব্যবস্থা।",
    },
    {
      icon: <FaMoneyBillWave />,
      title: "ফি কাঠামো",
      description:
        "আবাসিক ফি শিক্ষাবর্ষ অনুযায়ী নির্ধারিত, এতে থাকার খরচ, খাবার এবং অন্যান্য সেবা অন্তর্ভুক্ত।",
    },
    {
      icon: <FaCoins />,
      title: "পরিশোধ পদ্ধতি",
      description:
        "ছাত্ররা সহজ এবং নিরাপদ পদ্ধতিতে অনলাইন বা সরাসরি ফি জমা দিতে পারে।",
    },
  ];

  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

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
        <motion.h2
          className="text-5xl font-extrabold text-center mb-16 text-green-700"
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          আবাসিক ফি
        </motion.h2>

        <div ref={ref} className="flex flex-col gap-10">
          {feeDetails.map((item, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              initial="hidden"
              animate={controls}
              className="bg-white rounded-3xl shadow-xl p-10 flex flex-col md:flex-row items-center gap-6 text-center md:text-left hover:scale-105 hover:shadow-2xl transition-all duration-500"
            >
              <motion.div
                className="text-7xl text-green-500"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 15, 0] }}
                transition={{ repeat: Infinity, duration: 2, delay: idx * 0.2 }}
              >
                {item.icon}
              </motion.div>

              <div className="flex-1">
                <motion.h3
                  className="text-3xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-green-600 to-green-500"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.2 }}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className="text-gray-700 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
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
