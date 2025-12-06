"use client";

import { useEffect, useRef, useState } from "react";
import {
  FaUniversity,
  FaUsers,
  FaChalkboardTeacher,
  FaUserCog,
} from "react-icons/fa";

const statsData = [
  { id: "founded", icon: FaUniversity, label: "Founded", value: 1990 },
  { id: "students", icon: FaUsers, label: "Students", value: 4000 },
  { id: "teachers", icon: FaChalkboardTeacher, label: "Teachers", value: 125 },
  { id: "staff", icon: FaUserCog, label: "Staff", value: 60 },
];

function useCountUp(target, startWhen, duration = 1500) {
  const [count, setCount] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!startWhen) return;
    const start = performance.now();
    const from = 0;
    const to = Number(target);

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.floor(from + (to - from) * eased);
      setCount(current);

      if (t < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCount(to);
      }
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, startWhen, duration]);

  return count;
}

export default function AnimatedStats() {
  const itemRefs = useRef({});
  const [visibleIds, setVisibleIds] = useState({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (items) => {
        items.forEach((it) => {
          const id = it.target.getAttribute("data-id");

          // visible হলে true
          if (it.isIntersecting) {
            setVisibleIds((s) => ({ ...s, [id]: true }));
          } else {
            // বাইরে গেলে আবার invisible করে দাও
            setVisibleIds((s) => ({ ...s, [id]: false }));
          }
        });
      },
      { threshold: 0.3 }
    );

    Object.values(itemRefs.current).forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="w-full py-6 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-8">
          Jamiatussunnah at a glance
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {statsData.map((s) => {
            const Icon = s.icon;
            const isVisible = Boolean(visibleIds[s.id]);
            const count = useCountUp(s.value, isVisible, 1500);

            return (
              <div
                key={s.id}
                data-id={s.id}
                ref={(el) => (itemRefs.current[s.id] = el)}
                className={`relative overflow-hidden p-6 rounded-2xl 
                  bg-white/60 backdrop-blur-md border border-gray-100 shadow-md
                  transform transition-all duration-700 ease-out
                  ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-95"}
                  hover:scale-105 hover:shadow-xl
                `}
              >
                <div className="absolute -right-8 -top-8 w-36 h-36 rounded-full bg-gradient-to-br from-blue-200/40 to-indigo-200/30 blur-3xl"></div>

                <div className="flex items-center justify-center mb-3">
                  <div className="p-3 rounded-xl bg-white/80 border border-gray-100 shadow-sm">
                    <Icon size={30} className="text-blue-600" />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-gray-900">
                    {s.label === "Founded" ? count : `${count}+`}
                  </div>

                  <div className="text-sm md:text-base text-gray-600 mt-1">
                    {s.label}
                  </div>
                </div>

                <div className="mt-4 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-blue-400 to-indigo-500 opacity-80"></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
