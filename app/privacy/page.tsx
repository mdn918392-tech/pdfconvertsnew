"use client";

import { Shield, Lock, Eye, Users, FileText, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-black text-gray-300">
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6 border-b border-gray-800">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 bg-blue-900/30 text-blue-300 px-4 py-2 rounded-full mb-6">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Privacy Policy</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Your Privacy <span className="text-blue-400">Matters</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We are committed to protecting your personal information and being transparent about what we collect and how we use it.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Sidebar Navigation */}
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Quick Navigation
                  </h3>
                  <nav className="space-y-3">
                    <a href="#data-collection" className="block text-gray-400 hover:text-blue-400 transition">
                      Data Collection
                    </a>
                    <a href="#data-usage" className="block text-gray-400 hover:text-blue-400 transition">
                      Data Usage
                    </a>
                    <a href="#data-protection" className="block text-gray-400 hover:text-blue-400 transition">
                      Data Protection
                    </a>
                    <a href="#cookies" className="block text-gray-400 hover:text-blue-400 transition">
                      Cookies
                    </a>
                    <a href="#rights" className="block text-gray-400 hover:text-blue-400 transition">
                      Your Rights
                    </a>
                  </nav>
                </div>

                <div className="mt-6 bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center gap-3 mb-4">
                    <Lock className="w-5 h-5 text-green-400" />
                    <h4 className="text-white font-semibold">Secure Processing</h4>
                  </div>
                  <p className="text-sm text-gray-400">
                    All files are automatically deleted after processing. We never store your documents.
                  </p>
                </div>
              </div>
            </div>

            {/* Policy Content */}
            <div className="md:col-span-2 space-y-12">
              {/* Last Updated */}
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400">Effective Date</span>
                  <span className="text-white font-medium">{new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <p className="text-gray-400">
                  This Privacy Policy explains how PDFSwift ("we", "us", "our") handles your information when you use our website and services.
                </p>
              </div>

              {/* Data We Collect */}
              <section id="data-collection">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-blue-900/30 rounded-lg">
                    <Eye className="w-6 h-6 text-blue-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Data We Collect</h2>
                </div>
                
                <div className="space-y-6">
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3">Information You Provide</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Email address (for account creation)</li>
                      <li>• Payment information (processed by secure payment providers)</li>
                      <li>• Support communications</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3">Automatically Collected</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>• Device and browser information</li>
                      <li>• Usage data (pages visited, features used)</li>
                      <li>• PDF file metadata (size, type)</li>
                    </ul>
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-6 border border-green-800/50">
                    <h3 className="text-white font-semibold mb-3 text-green-400">Important: What We Don't Collect</h3>
                    <ul className="space-y-2 text-gray-400">
                      <li>✓ We never access or store your PDF content</li>
                      <li>✓ We don't read your documents</li>
                      <li>✓ We don't sell or share your data</li>
                      <li>✓ We don't use your files for any other purpose</li>
                    </ul>
                  </div>
                </div>
              </section>

              {/* How We Use Data */}
              <section id="data-usage">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-purple-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-purple-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">How We Use Your Data</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    {
                      title: "Service Delivery",
                      desc: "To provide PDF conversion and editing tools"
                    },
                    {
                      title: "Improvement",
                      desc: "To enhance our services and user experience"
                    },
                    {
                      title: "Support",
                      desc: "To respond to your questions and requests"
                    },
                    {
                      title: "Security",
                      desc: "To protect our services from misuse"
                    }
                  ].map((item, index) => (
                    <div key={index} className="bg-gray-900/50 rounded-lg p-5">
                      <h4 className="text-white font-semibold mb-2">{item.title}</h4>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* Data Protection */}
              <section id="data-protection">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-green-900/30 rounded-lg">
                    <Shield className="w-6 h-6 text-green-400" />
                  </div>
                  <h2 className="text-2xl font-bold text-white">Data Security</h2>
                </div>

                <div className="space-y-4">
                  <div className="bg-gray-900/50 rounded-lg p-6">
                    <h3 className="text-white font-semibold mb-3">Security Measures</h3>
                    <ul className="space-y-3 text-gray-400">
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>End-to-end encryption for file transfers</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>Automatic file deletion (within 1 hour)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>SSL/TLS encryption for all communications</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-green-400">•</span>
                        <span>Secure server infrastructure</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-blue-900/20 rounded-lg p-6 border border-blue-800/50">
                    <h3 className="text-white font-semibold mb-3">File Processing Policy</h3>
                    <p className="text-gray-400">
                      Your PDF files are processed in isolated, secure environments and automatically deleted from our servers within 1 hour. We do not store your original files or converted outputs.
                    </p>
                  </div>
                </div>
              </section>

              {/* Cookies */}
              <section id="cookies">
                <h2 className="text-2xl font-bold text-white mb-6">Cookies</h2>
                <div className="bg-gray-900/50 rounded-lg p-6">
                  <p className="text-gray-400 mb-4">
                    We use cookies to improve your experience on our website:
                  </p>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="text-white font-medium mb-2">Essential Cookies</h4>
                      <p className="text-gray-400 text-sm">
                        Required for website functionality (session management, security).
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="text-white font-medium mb-2">Analytics Cookies</h4>
                      <p className="text-gray-400 text-sm">
                        Help us understand how users interact with our site (optional).
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Your Rights */}
              <section id="rights">
                <h2 className="text-2xl font-bold text-white mb-6">Your Privacy Rights</h2>
                <div className="bg-gray-900/50 rounded-lg p-6">
                  <p className="text-gray-400 mb-6">
                    You have the right to:
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      "Access your personal data",
                      "Correct inaccurate information",
                      "Request data deletion",
                      "Object to data processing",
                      "Request data portability"
                    ].map((right, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-gray-300">{right}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

             
            </div>
          </div>
        </div>
      </section>

      {/* Footer Note */}
      <div className="border-t border-gray-800 py-6">
        <div className="container mx-auto px-6">
          <p className="text-center text-gray-500 text-sm">
            © {new Date().getFullYear()} PDFSwift. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}