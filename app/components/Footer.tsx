"use client";

import { Zap, Shield } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-gray-300">
      {/* Main Footer */}
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">

          {/* Brand */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Zap className="w-8 h-8 text-white" />
              <Link
                href="/"
                className="text-2xl font-bold text-white hover:underline focus:outline-none focus:ring-2 focus:ring-white/60 rounded"
                aria-label="Go to PDFSwift homepage"
              >
                PDFSwift
              </Link>
            </div>

            <p className="text-gray-400 text-sm sm:text-base">
              Fast and secure PDF tools for all your needs.
            </p>

            <div className="flex items-center gap-2 text-gray-400">
              <Shield className="w-4 h-4" />
              <span className="text-xs sm:text-sm">
                100% Secure Processing
              </span>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4">Tools</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/" className="hover:text-white transition text-sm sm:text-base">Home</Link></li>
              <li><Link href="/jpg-to-pdf" className="hover:text-white transition text-sm sm:text-base">JPG to PDF</Link></li>
              <li><Link href="/rotate-pdf" className="hover:text-white transition text-sm sm:text-base">Rotate PDF</Link></li>
              <li><Link href="/merge-pdf" className="hover:text-white transition text-sm sm:text-base">Merge PDF</Link></li>
              <li><Link href="/split-pdf" className="hover:text-white transition text-sm sm:text-base">Split PDF</Link></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4">Company</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/about" className="hover:text-white transition text-sm sm:text-base">About</Link></li>
              <li><Link href="/blog" className="hover:text-white transition text-sm sm:text-base">Blog</Link></li>
              <li><Link href="/" className="hover:text-white transition text-sm sm:text-base">All Tools</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-3 sm:mb-4">Legal</h3>
            <ul className="space-y-1 sm:space-y-2">
              <li><Link href="/privacy" className="hover:text-white transition text-sm sm:text-base">Privacy Policy</Link></li>
              <li><Link href="/security" className="hover:text-white transition text-sm sm:text-base">Security</Link></li>
            </ul>
          </div>

        </div>
      </div>

      {/* Copyright */}
      <div className="bg-gray-900 py-3 sm:py-4">
        <div className="container mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} PDFSwift. All rights reserved.
          </p>
          <p className="text-center text-gray-500 text-xs mt-1">
            Made with ❤️ for document lovers
          </p>
        </div>
      </div>
    </footer>
  );
}
