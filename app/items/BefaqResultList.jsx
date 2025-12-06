"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaPlus, FaMinus } from "react-icons/fa";

const results = [
  { year: 2024, students: 515 },
  { year: 2023, students: 416 },
  { year: 2022, students: 369 },
  { year: 2021, students: 315 },
  { year: 2019, students: 280 },
  { year: 2018, students: 157 },
  { year: 2017, students: 235 },
  { year: 2016, students: 153 },
  { year: 2015, students: 162 },
  { year: 2014, students: 111 },
  { year: 2013, students: 81 },
  { year: 2012, students: 72 },
  { year: 2011, students: 56 },
];

export default function TimelineResults() {
  const [showAll, setShowAll] = useState(false);
  const visibleResults = showAll ? results : results.slice(0, 6);

  return (
    <section className="py-12 bg-gradient-to-b from-purple-50 to-purple-100">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-extrabold text-center mb-12 text-purple-700 animate-pulse">
          বেফাকুল মাদারিসিল আরাবিয়্যার ফলাফল
        </h2>

        <div className="relative pl-10">
          <div className="absolute left-5 top-0 h-full w-1 bg-gradient-to-b from-purple-400 via-purple-500 to-purple-600 rounded-full shadow-lg"></div>

          {visibleResults.map((res, idx) => (
            <motion.div
              key={idx}
              className="mb-10 pl-8 p-4 bg-white rounded-xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }} 
              transition={{ duration: 0.5 }}
            >
              <span className="absolute -left-7 top-5 text-yellow-400 text-3xl drop-shadow-lg">
                <FaStar />
              </span>

              <h3 className="text-2xl font-bold text-purple-600 mb-1">
                {res.year}
              </h3>
              <p className="text-gray-800 text-lg">
                {res.students} জন স্ট্যান্ড করে{" "}
                <span className="font-semibold">১ম স্থান</span>
              </p>
            </motion.div>
          ))}

          {results.length > 6 && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => setShowAll(!showAll)}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition transform hover:scale-105 relative overflow-hidden"
              >
                <motion.span
                  key={showAll ? "minus" : "plus"}
                  initial={{ rotate: 0, scale: 0 }}
                  animate={{ rotate: showAll ? 180 : 0, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="text-xl"
                >
                  {showAll ? <FaMinus /> : <FaPlus />}
                </motion.span>

                <motion.span
                  key={showAll ? "hide" : "show"}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {showAll ? "কম দেখুন" : "আরো দেখুন"}
                </motion.span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

