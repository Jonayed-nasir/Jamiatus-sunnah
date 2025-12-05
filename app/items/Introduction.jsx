"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import React from "react";

export default function Introduction() {
  return (
    <div className="lg:mt-16 py-10 px-3 w-full max-w-[95%] lg:max-w-[80%] mx-auto flex flex-col justify-center items-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative overflow-hidden p-8 rounded-3xl bg-gradient-to-br from-white/60 via-blue-50/60 to-white/40 backdrop-blur-lg border border-gray-100 shadow-xl transform transition-all hover:scale-105 duration-700"
      >
        <motion.h3
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="text-center text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 drop-shadow-lg"
        >
          সংক্ষিপ্ত পরিচিতি
        </motion.h3>

        <motion.p
          initial={{ scale: 0.95, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-gray-700 text-lg md:text-xl leading-relaxed text-justify line-clamp-8"
        >
          একমাত্র ইসলাম। জাগতিক চাহিদা, লোভ-লালসা এবং নশ্বর জগতের ক্ষণস্থায়ী
          সাজসজ্জা ও সৌন্দর্যের অবান্তর মোহে এক শ্রেণীর মানুষ সর্বযুগেই তাদের
          কূটকৌশল ও ষড়যন্ত্রের জাল বিস্তার করে কল্যাণ ও মুক্তির আদর্শবাহী
          ইসলামকে ধরাপৃষ্ঠ থেকে বিলুপ্ত করতে চেষ্টার কোনো ত্রুটি করেনি। এর
          পাশাপাশি নির্ভেজাল, চিরন্তন ও মহাসত্য ইসলামের নিশানবরদার আল্লাহর
          মদদপুষ্ট অন্য একটি দল পার্থিব সকল স্বার্থ জলাঞ্জলি দিয়ে জীবনের সর্বস্ব
          অকাতরে বিলীন করে আল্লাহর জমিনে আল্লাহ তাআলার দ্বীন কায়েম করতে উৎসর্গিত
          ছিলেন। তাঁদেরই অদম্য স্পৃহা ও রক্ত নিংড়ানো শ্রমের অবদানে পৃথিবীর বুকে
          গড়ে উঠেছে ইসলাম ও ইসলামী ঐতিহ্যের নিরঘুশ ধারাবাহিকতা সংরক্ষণের অগণিত
          দুর্জয় দূর্গ খাটি দ্বীনি প্রতিষ্ঠান। এই সূত্র পরস্পরায় ১৯৯০ ইং সালে
          তাবলীগ জামাতের বিশিষ্ট মুরব্বী নারায়ণগঞ্জ আমলাপাড়া মাদরাসার স্বনামধন্য
          মুহতামিম হযরত মাওলানা হুসাইন আহমাদ (রহ.) এর দিক-নির্দেশনায় মো: বাদশা
          মিয়া সাহেবের দানকৃত বিস্তৃত ভূমির উপরে বিশাল অবয়বে প্রতিষ্ঠা লাভ করে
          “জামিয়াতুস সুন্নাহ “|
        </motion.p>

        <motion.span
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 block max-w-[180px] text-center mx-auto px-4 py-2 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-indigo-600 hover:to-blue-500 text-white font-bold text-lg shadow-md border-b-4 border-blue-800 hover:border-indigo-500 transition-all duration-300"
        >
          <Link href="/about/about">Show More</Link>
        </motion.span>
      </motion.div>
    </div>
  );
}
