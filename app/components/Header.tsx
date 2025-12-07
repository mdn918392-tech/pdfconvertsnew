"use client";

import { Moon, Sun, FileText, Menu, X } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">

        {/* LOGO */}
        <a href="/" className="flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="p-2 bg-blue-600 rounded-lg"
          >
            <FileText className="w-6 h-6 text-white" />
          </motion.div>

          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              PDF Tools Pro
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              Smart PDF Utilities
            </p>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 items-center">
          <a href="/" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Home
          </a>
          <a href="/tools" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Tools
          </a>
          <a href="/about" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            About
          </a>
          <a href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
            Contact
          </a>
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-4">

          {/* Dark Mode Toggle */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {theme === "light" ? (
              <Moon className="w-5 h-5 text-gray-900" />
            ) : (
              <Sun className="w-5 h-5 text-yellow-400" />
            )}
          </motion.button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 bg-gray-100 dark:bg-gray-800 rounded-lg"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-sm"
        >
          <nav className="flex flex-col p-4 space-y-4 text-gray-700 dark:text-gray-300">
            <a href="/" className="hover:text-blue-600">Home</a>
            <a href="/tools" className="hover:text-blue-600">Tools</a>
            <a href="/about" className="hover:text-blue-600">About</a>
            <a href="/contact" className="hover:text-blue-600">Contact</a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}
