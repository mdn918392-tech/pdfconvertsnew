"use client";

import { FileText, Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);
  const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setToolsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setToolsOpen(false);
    }, 300); // 300ms delay before closing
  };

  // टूल्स डेटा
  const tools = [
    { name: "JPG to PDF", href: "jpg-to-pdf" },
    { name: "PDF to JPG", href: "pdf-to-jpg" },
    { name: "Merge PDF", href: "merge-pdf" },
    { name: "Split PDF", href: "split-pdf" },
    { name: "Compress PDF", href: "compress-pdf" },
    { name: "Extract Pages", href: "extract-pages" },
    { name: "Remove Pages", href: "remove-pages" },
    { name: "Rotate PDF", href: "rotate-pdf" },
    { name: "PNG to JPG", href: "png-to-jpg" },
    { name: "Compress Image", href: "compress-image" },
      { name: "resize image", href: "resize-image" },

      { name: "passport photo maker", href: "passport-photo" },
        { name: "webpage-to-jpg", href: "webpage-to-jpg" },
{ name: "rotate to image", href: "rotate-image" },
        
        

      

    
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* LOGO */}
        <a href="/" className="flex items-center gap-3">
          <div className="relative z-50 w-12 h-12">
            <div className="w-15 h-15 mb-5">
              <Image
                src="/favicon.png"
                alt="Logo"
                width={100}
                height={100}
                className="object-contain"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              PDFSwift
            </h2>
            <p className="text-xs text-gray-600">
              Fast & Smart PDF Tools
            </p>
          </div>
        </a>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex gap-8 items-center">
          <a
            href="/"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            Home
          </a>

          {/* Tools Dropdown */}
          <div
            className="relative"
            ref={dropdownRef}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition-colors duration-200">
              Tools
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  toolsOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {toolsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <div className="p-3 grid grid-cols-1 gap-1">
                  {tools.map((tool, index) => (
                    <motion.a
                      key={index}
                      href={tool.href}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors duration-150"
                      onClick={() => setToolsOpen(false)}
                    >
                      {tool.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          <a
            href="/about"
            className="text-gray-700 hover:text-blue-600 transition-colors duration-200"
          >
            About
          </a>
        </nav>

        {/* RIGHT BUTTONS */}
        <div className="flex items-center gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden p-2 bg-gray-100 rounded-lg transition-colors duration-200"
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
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white border-t border-gray-200 shadow-sm"
        >
          <nav className="flex flex-col p-4 space-y-3 text-gray-700">
            <a
              href="/"
              className="py-2 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              Home
            </a>

            {/* Mobile Tools Dropdown */}
            <div className="border-b border-gray-100 pb-3">
              <button
                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                className="flex items-center justify-between w-full py-2 hover:text-blue-600 transition-colors duration-200"
              >
                <span>Tools</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform duration-200 ${
                    mobileToolsOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobileToolsOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-2 ml-4 space-y-2"
                >
                  {tools.map((tool, index) => (
                    <a
                      key={index}
                      href={tool.href}
                      className="block py-2 text-sm hover:text-blue-600 transition-colors duration-200"
                      onClick={() => {
                        setOpen(false);
                        setMobileToolsOpen(false);
                      }}
                    >
                      {tool.name}
                    </a>
                  ))}
                </motion.div>
              )}
            </div>

            <a
              href="/about"
              className="py-2 hover:text-blue-600 transition-colors duration-200"
              onClick={() => setOpen(false)}
            >
              About
            </a>
          </nav>
        </motion.div>
      )}
    </header>
  );
}