"use client";

import { Facebook, Github, Instagram, Mail, Phone, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 border-t border-gray-300 dark:border-gray-700 mt-10">
      <div className="container mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            PDF Tools Pro
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Smart, fast and secure tools for all your PDF conversions.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-700 dark:text-gray-300 hover:text-blue-600">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Quick Links
          </h3>
          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li><a href="/" className="hover:text-blue-600">Home</a></li>
            <li><a href="/tools" className="hover:text-blue-600">All Tools</a></li>
            <li><a href="/about" className="hover:text-blue-600">About</a></li>
            <li><a href="/privacy" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="/contact" className="hover:text-blue-600">Contact</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h3>
          <p className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
            <Mail className="w-5 h-5" /> support@pdftoolspro.com
          </p>
          <p className="flex items-center gap-3 mt-3 text-gray-700 dark:text-gray-300">
            <Phone className="w-5 h-5" /> +91 9876543210
          </p>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="bg-gray-200 dark:bg-gray-800 py-4">
        <p className="text-center text-gray-700 dark:text-gray-300 text-sm">
          © {new Date().getFullYear()} PDF Tools Pro. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
