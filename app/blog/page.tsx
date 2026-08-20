"use client";

import { useState, useMemo } from "react";
import BlogCard from "./BlogCard";
import blogData from "./data.json";
import BlogSchema from "./BlogSchema";
import BreadcrumbSchema from "./BreadcrumbSchema";

const POSTS_PER_PAGE = 12;

export default function BlogPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Enhanced filtering - searches in title, description, and date
  const filteredBlogs = useMemo(() => {
    if (!searchTerm.trim()) return blogData;
    
    const term = searchTerm.toLowerCase().trim();
    return blogData.filter((blog) => {
      const titleMatch = blog.title?.toLowerCase().includes(term) || false;
      const descMatch = blog.description?.toLowerCase().includes(term) || false;
      const dateMatch = blog.date?.toLowerCase().includes(term) || false;
      const extraMatch = JSON.stringify(blog).toLowerCase().includes(term);
      
      return titleMatch || descMatch || dateMatch || extraMatch;
    });
  }, [searchTerm]);

  // Pagination logic
  const totalPages = Math.max(1, Math.ceil(filteredBlogs.length / POSTS_PER_PAGE));
  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = Math.min(startIndex + POSTS_PER_PAGE, filteredBlogs.length);
  const currentBlogs = filteredBlogs.slice(startIndex, endIndex);

  // Reset to first page when search changes
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <>
      {/* Structured Data */}
      <BlogSchema />
      <BreadcrumbSchema />

      <div className="max-w-7xl mx-auto py-6 px-4 bg-white dark:bg-gray-900 min-h-screen">
        <h1 className="text-2xl font-bold mb-3 text-gray-900 dark:text-white">Our Blog</h1>

        {/* Search Bar - Fixed visibility */}
        <div className="mb-5">
          <div className="flex items-center gap-2 max-w-sm">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search articles by title, description, or date..."
                value={searchTerm}
                onChange={handleSearch}
                className="w-full px-3 py-1.5 text-sm rounded-lg border border-gray-300 dark:border-gray-600 
                         bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                         focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500
                         transition-all pr-8 placeholder-gray-400 dark:placeholder-gray-500"
              />
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
          
          {/* Search results count - Visible on dark background */}
          <div className="mt-1.5 flex items-center gap-3">
            {searchTerm && (
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Found <span className="font-medium text-gray-900 dark:text-white">{filteredBlogs.length}</span> result{filteredBlogs.length !== 1 ? "s" : ""}
                {filteredBlogs.length === 0 && " - Try different keywords"}
              </p>
            )}
            {!searchTerm && blogData.length > 0 && (
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Showing {currentBlogs.length} of {blogData.length} articles
              </p>
            )}
          </div>
        </div>

        {/* Blog Grid */}
        {currentBlogs.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {currentBlogs.map((blog) => (
                <BlogCard key={blog.slug || blog.id} blog={blog} />
              ))}
            </div>

            {/* Pagination - Visible on dark background */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-700 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Previous
                </button>

                <span className="px-3 py-1 text-xs text-gray-700 dark:text-gray-300">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-600 
                           bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300
                           hover:bg-gray-50 dark:hover:bg-gray-700 
                           disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  Next
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-8">
            <div className="text-4xl mb-3">🔍</div>
            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
              No articles found matching "<span className="font-medium text-gray-900 dark:text-white">{searchTerm}</span>"
            </p>
            <p className="text-gray-500 dark:text-gray-400 text-xs mb-3">Try adjusting your search terms or browse all articles</p>
            <button
              onClick={clearSearch}
              className="px-4 py-1.5 text-sm bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Browse All Articles
            </button>
          </div>
        )}
      </div>
    </>
  );
}