"use client";
import React, { useEffect, useState } from "react";

export default function PostFilterList() {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    fetch("https://jamiatussunnah.onrender.com/post/api/all/")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);

        // extract unique categories/titles
        const cats = Array.from(new Set(data.map((p) => p.title))).filter(Boolean);
        setCategories(["All", ...cats]);
      })
      .catch((err) => console.log(err));
  }, []);

  const filteredPosts =
    selectedCategory === "All"
      ? posts
      : posts.filter((p) => p.title === selectedCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 mt-24">
      <h1 className="text-3xl font-bold mb-6 text-center animate-pulse text-blue-600">
        Notices
      </h1>

      {/* Category Flex List */}
      <div className="flex gap-3 overflow-x-auto mb-6 py-2 px-1">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`flex-shrink-0 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-200 ${
              selectedCategory === cat
                ? "bg-blue-500 text-white shadow-md scale-105"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Posts List */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredPosts.length === 0 && (
          <p className="text-gray-500 text-center col-span-full">
            No posts found in this category.
          </p>
        )}

        {filteredPosts.map((post) => {
          const isOpen = expanded === post.id;
          return (
            <div
              key={post.id}
              className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <button
                className="w-full text-left flex justify-between items-center focus:outline-none"
                onClick={() => setExpanded(isOpen ? null : post.id)}
              >
                <h2 className="text-lg font-semibold">{post.title}
                                 <p className="text-xs text-gray-400">
                    Created: {new Date(post.created_at).toLocaleDateString("en-GB")}
                  </p>
                </h2>

                <span
                  className={`transform transition-transform duration-300 ${
                    isOpen ? "rotate-45 text-red-500" : "rotate-0 text-gray-400"
                  }`}
                >
                  +
                </span>
              </button>

              {isOpen && (
                <div className="mt-2 text-gray-700 space-y-2 text-sm">
                  <p>{post.content}</p>
 
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
