"use client";

import { Menu, X, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function Header() {
    const [open, setOpen] = useState(false);
    const [toolsOpen, setToolsOpen] = useState(false);
    const [mobileToolsOpen, setMobileToolsOpen] = useState(false);

    const dropdownRef = useRef<HTMLDivElement>(null);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);

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
        }, 300);
    };

    const pdfTools = [
        { name: "JPG to PDF", href: "/jpg-to-pdf" },
        { name: "PDF to JPG", href: "/pdf-to-jpg" },
        { name: "Merge PDF", href: "/merge-pdf" },
        { name: "Split PDF", href: "/split-pdf" },
        { name: "Organize PDF", href: "/organize-pdf" },
        { name: "Extract Pages", href: "/extract-pages" },
        { name: "Compress PDF", href: "/compress-pdf" },
        { name: "Remove Pages", href: "/remove-pages" },
        { name: "Rotate PDF", href: "/rotate-pdf" },
        { name: "Add Pages & Images to PDF", href: "/add-pages-and-images-to-pdf" },
        { name: "PDF Filter", href: "/pdf-filter" },
    ];

    const imageTools = [
        { name: "PNG to JPG", href: "/png-to-jpg" },
        { name: "Compress Image", href: "/compress-image" },
        { name: "Resize Image", href: "/resize-image" },
        { name: "Passport Photo Maker", href: "/passport-photo" },
        { name: "Webpage to JPG", href: "/webpage-to-jpg" },
        { name: "Rotate Image", href: "/rotate-image" },
    ];

    return (
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200/50 shadow-sm dark:bg-gray-900/80 dark:border-gray-700/50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 md:h-20">

                    {/* LOGO */}
                    <a href="/" className="flex items-center gap-3 group flex-shrink-0">
                        <div className="relative w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
                            <Image
                                src="/logo.png"
                                alt="PDFSwift Logo"
                                fill
                                className="object-contain transition-transform duration-200 group-hover:scale-105"
                                priority
                            />
                        </div>
                        <div className="flex flex-col leading-tight">
                            <span className="text-xl md:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
                                PDFSwift
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">
                                Fast & Smart PDF Tools
                            </span>
                        </div>
                    </a>

                    {/* DESKTOP NAVIGATION - CENTERED */}
                    <nav className="hidden md:flex items-center justify-center flex-1 px-6">
                        <div className="flex items-center gap-1 lg:gap-2 xl:gap-3">

                            <a
                                href="/"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
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
                                <button
                                    type="button"
                                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${toolsOpen
                                        ? "text-blue-600 bg-blue-50/50 dark:text-blue-400 dark:bg-gray-800/50"
                                        : "text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                                        }`}
                                >
                                    Tools
                                    <ChevronDown
                                        className={`w-4 h-4 transition-transform duration-200 ${toolsOpen ? "rotate-180" : ""
                                            }`}
                                    />
                                </button>

                                {toolsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                        transition={{ duration: 0.2, ease: "easeOut" }}
                                        className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[580px] bg-white/95 backdrop-blur-sm border border-gray-200/80 rounded-xl shadow-2xl dark:bg-gray-800/95 dark:border-gray-700/80"
                                        onMouseEnter={handleMouseEnter}
                                        onMouseLeave={handleMouseLeave}
                                    >
                                        <div className="p-5 grid grid-cols-2 gap-8">
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                                                    PDF Tools
                                                </h3>
                                                <div className="space-y-0.5">
                                                    {pdfTools.map((tool, idx) => (
                                                        <motion.a
                                                            key={tool.href}
                                                            href={tool.href}
                                                            initial={{ opacity: 0, x: -6 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.015 }}
                                                            className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-blue-400"
                                                            onClick={() => setToolsOpen(false)}
                                                        >
                                                            {tool.name}
                                                        </motion.a>
                                                    ))}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-3">
                                                    Image Tools
                                                </h3>
                                                <div className="space-y-0.5">
                                                    {imageTools.map((tool, idx) => (
                                                        <motion.a
                                                            key={tool.href}
                                                            href={tool.href}
                                                            initial={{ opacity: 0, x: 6 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: idx * 0.015 }}
                                                            className="block px-3 py-1.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-blue-400"
                                                            onClick={() => setToolsOpen(false)}
                                                        >
                                                            {tool.name}
                                                        </motion.a>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            <a
                                href="/about"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                            >
                                About
                            </a>
                            <a
                                href="/contact"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                            >
                                Contact
                            </a>
                            {/* Blog link added after Contact */}
                            <a
                                href="/blog"
                                className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50/50 rounded-lg transition-all duration-200 dark:text-gray-300 dark:hover:text-blue-400 dark:hover:bg-gray-800/50"
                            >
                                Blog
                            </a>
                        </div>
                    </nav>

                    {/* RIGHT SIDE - Only Mobile Menu Button */}
                    <div className="flex items-center flex-shrink-0">
                        <button
                            type="button"
                            onClick={() => {
                                setOpen(!open);
                                if (open) setMobileToolsOpen(false);
                            }}
                            className="md:hidden p-2 rounded-lg bg-gray-100/80 hover:bg-gray-200/80 transition-colors dark:bg-gray-800/80 dark:hover:bg-gray-700/80"
                            aria-label={open ? "Close menu" : "Open menu"}
                        >
                            {open ? (
                                <X className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            ) : (
                                <Menu className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* MOBILE NAVIGATION */}
            {open && (
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="md:hidden bg-white/95 backdrop-blur-sm border-t border-gray-200/60 dark:bg-gray-900/95 dark:border-gray-700/60"
                >
                    <nav className="container mx-auto px-4 py-5 space-y-4 text-gray-700 dark:text-gray-300">
                        <a
                            href="/"
                            className="block text-base font-medium hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                            onClick={() => setOpen(false)}
                        >
                            Home
                        </a>

                        <div className="border-b border-gray-200/60 pb-3 dark:border-gray-700/60">
                            <button
                                type="button"
                                onClick={() => setMobileToolsOpen(!mobileToolsOpen)}
                                className="flex items-center justify-between w-full text-base font-medium hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                            >
                                <span>Tools</span>
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform duration-200 ${mobileToolsOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            {mobileToolsOpen && (
                                <motion.div
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: "auto" }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="mt-4 grid grid-cols-2 gap-6"
                                >
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                                            PDF Tools
                                        </p>
                                        <div className="space-y-2">
                                            {pdfTools.map((tool) => (
                                                <a
                                                    key={tool.href}
                                                    href={tool.href}
                                                    className="block text-sm hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setMobileToolsOpen(false);
                                                    }}
                                                >
                                                    {tool.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 dark:text-gray-500 mb-2">
                                            Image Tools
                                        </p>
                                        <div className="space-y-2">
                                            {imageTools.map((tool) => (
                                                <a
                                                    key={tool.href}
                                                    href={tool.href}
                                                    className="block text-sm hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                                                    onClick={() => {
                                                        setOpen(false);
                                                        setMobileToolsOpen(false);
                                                    }}
                                                >
                                                    {tool.name}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        <a
                            href="/about"
                            className="block text-base font-medium hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                            onClick={() => setOpen(false)}
                        >
                            About
                        </a>
                        <a
                            href="/contact"
                            className="block text-base font-medium hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                            onClick={() => setOpen(false)}
                        >
                            Contact
                        </a>
                        {/* Blog link added after Contact in mobile */}
                        <a
                            href="/blog"
                            className="block text-base font-medium hover:text-blue-600 transition-colors dark:hover:text-blue-400"
                            onClick={() => setOpen(false)}
                        >
                            Blog
                        </a>
                    </nav>
                </motion.div>
            )}
        </header>
    );
}