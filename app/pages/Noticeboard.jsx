'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';

export default function Noticeboard() {
  const [notices, setNotices] = useState([]);
  const [index, setIndex] = useState(0);

  // 🔹 API থেকে ডেটা ফেচ করা
  useEffect(() => {
    async function fetchNotices() {
      try {
        const res = await fetch("https://jamiatussunnah.onrender.com/post/api/");

        const data = await res.json();
        setNotices(data);
      } catch (err) {
        console.error("Error fetching notices:", err);
      }
    }
    fetchNotices();
  }, []);

  // 🔹 Auto Slide Effect
  useEffect(() => {
    if (notices.length === 0) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % notices.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [notices]);

  if (!notices.length) {
    return <p className="text-center text-gray-400 py-10">Loading notices...</p>;
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





  return (
    <div className="  w-full max-w-[90%] lg:max-w-[80%] mx-auto flex  flex-col justify-center items-center ">
    
    <div className='flex items-center'>
      <Image className='w-40' src="/images/new-update.jpeg" alt='new update' width={500} height={500} />
      <h3 className='text-pink-400 font-bold text-2xl md:text-3xl'>সর্বশেষ নোটিশসমূহ</h3>
    </div>



      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 transition-all duration-700 ease-in-out">
        {visibleCards.map((item, idx) => {
          const dateObj = new Date(item.created_at);
          const formattedDate = dateObj.toLocaleDateString('bn-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          }); // 👉 “04 Nov 2025”

          const month = dateObj.toLocaleString('en-US', { month: 'long' });
          const year = dateObj.getFullYear();

          return (
            <div
              key={idx}
              className="card col-span-1 w-full h-auto bg-white/10 backdrop-blur-md text-white rounded-2xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500"
            >
              {/* 🔹 Image */}


              {/* 🔹 Text Section */}
              <h3 className='text-gray-400 text-left px-3 py-2 '>{item.get_time_difference}</h3>
              <div className="card-text">
                <h2 className="text-xl font-semibold text-white rounded-tl-4xl rounded-br-4xl rounded-sm mb-1 bg-pink-500 py-2 line-clamp-1">{item.title}</h2>

                <p className="text-gray-200 mt-7 text-sm leading-relaxed line-clamp-5">
                  {item.content} 
                </p>
                <span className='mt-8 inline-block px-3 rounded-tl-4xl rounded-br-4xl rounded-sm  py-2 bg-blue-500 hover:bg-blue-700 transition-all duration-300'><a className='text-white  font-bold' href="#">Show More</a></span>
              </div>

              {/* 🔹 Stats Section */}
              <div className="card-stats flex items-center justify-between py-3 px-5 text-sm text-gray-300 h-[50px]">
                <div>{formattedDate}</div>
                <div className=' border-r border-l border-pink-300'>{month}</div>
                <div>{year}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
