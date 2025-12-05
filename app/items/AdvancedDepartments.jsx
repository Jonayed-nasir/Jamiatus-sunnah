// components/AdvancedDepartmentsIconsYear.js
import { FaBook, FaBookOpen, FaPenFancy, FaScroll } from "react-icons/fa";
import { motion } from "framer-motion";

export default function AdvancedDepartmentsIconsYear() {
  const departments = [
    {
      title: "ইফতা বিভাগ",
      year: "১৪৩৫-৩৬ হি/২০১৪-১৫ ইং",
      icon: <FaBookOpen size={40} className="text-blue-600" />,
    },
    {
      title: "উলুমুল হাদিস বিভাগ",
      year: "১৪৪৫-৪৬ হি/২০২৪-২৫ ইং",
      icon: <FaBook size={40} className="text-green-600" />,
    },
    {
      title: "আরবি সাহিত্য বিভাগ",
      year: "১৪৩৬-৩৭ হি/২০১৫-১৬ ইং",
      icon: <FaPenFancy size={40} className="text-purple-600" />,
    },
    {
      title: "উচ্চতর কিরাত বিভাগ",
      year: "১৪৪৫-৪৬ হি/২০২৪-২৫ ইং",
      icon: <FaScroll size={40} className="text-yellow-600" />,
    },
  ];

  return (
    <section className="w-full bg-gray-50 py-6">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-blue-800 mb-12">
          উচ্চতর বিভাগসমূহ
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {departments.map((dept, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center justify-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-transform duration-300"
            >
              {dept.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800 text-center">
                {dept.title}
              </h3>
              <p className="mt-1 text-gray-500 text-sm text-center">{dept.year}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
