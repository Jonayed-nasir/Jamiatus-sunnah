"use client";

import { useEffect, useState } from "react";

export default function FatwaPage() {
  const [fatwas, setFatwas] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const resFatwas = await fetch("https://jamiatussunnah.onrender.com/fatwa/fatwas/");
        const fatwaData = await resFatwas.json();
        setFatwas(fatwaData);

        const resCats = await fetch("https://jamiatussunnah.onrender.com/fatwa/categories/");
        const catData = await resCats.json();
        setCategories([{ id: null, name: "All" }, ...catData]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const filteredFatwas =
    selectedCategoryId === null
      ? fatwas
      : fatwas.filter((f) => f.category === selectedCategoryId);

  if (loading) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-20">
      <h1 className="text-3xl font-bold mb-6 text-center animate-pulse text-blue-600">
        Fatwa‑সমূহ
      </h1>

      {/* Category Flex List */}
      <div className="flex gap-3 overflow-x-auto mb-6 py-2 px-1">
        {categories.map((cat) => (
          <button
            key={cat.id ?? "all"}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              selectedCategoryId === cat.id
                ? "bg-blue-500 text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategoryId(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Fatwa List */}
      <div className="space-y-4">
        {filteredFatwas.length === 0 && (
          <p className="text-center text-gray-500">No Fatwas found in this category.</p>
        )}

        {filteredFatwas.map((f) => {
          const isOpen = expanded === f.id;
          return (
            <div
              key={f.id}
              className="bg-white shadow-md rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <button
                className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none"
                onClick={() => setExpanded(isOpen ? null : f.id)}
              >
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-semibold">{f.name}</span>
                    <span className="text-sm text-gray-500">{f.address}</span>
                  </div>
                  <div className="flex gap-1 items-center font-bold mb-1">
                    <h5 className="">বিষয় :</h5>
                    <span className="text-sm text-gray-500">
                      {categories.find((c) => c.id === f.category)?.name || "Uncategorized"}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold">প্রশ্ন : {f.question}</h2>
                </div>
                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-red-500" : "rotate-0 text-gray-400"
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-4 pt-2 text-gray-700 space-y-2 text-sm">
                  <p><span className="font-bold">উত্তর :</span> {f.answer}</p>
                  {f.reference && (
                    <p className="text-sm text-gray-400 italic">
                      Reference: {f.reference}
                    </p>
                  )}
                  <p className="text-xs text-gray-400 text-right">
                    Created: {new Date(f.created_at).toLocaleDateString("en-GB")}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
