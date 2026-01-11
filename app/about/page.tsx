import React from 'react';
import { FileText, Zap, Shield, Globe, Heart } from 'lucide-react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-full mb-6">
            <FileText className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            About <span className="text-blue-600">PDFSwift</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Fast, smart, and secure PDF tools designed to simplify your document workflow
          </p>
        </div>

        {/* Mission Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center mb-6">
            <Zap className="w-8 h-8 text-yellow-500 mr-3" />
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
          </div>
          <p className="text-lg text-gray-700 mb-6">
            At PDFSwift, we believe document management should be effortless, accessible, and secure. 
            We're on a mission to transform how individuals and businesses handle PDFs by providing 
            intuitive tools that save time and boost productivity.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-blue-600 text-2xl font-bold mb-2">100% Free</div>
              <p className="text-gray-700">No subscriptions, no hidden fees, no watermarks</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-green-600 text-2xl font-bold mb-2">Secure</div>
              <p className="text-gray-700">Your files are processed locally and never stored</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-purple-600 text-2xl font-bold mb-2">No Limits</div>
              <p className="text-gray-700">Unlimited conversions with no file size restrictions</p>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Why Choose PDFSwift?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Lightning Fast</h3>
              <p className="text-gray-600">
                Process PDFs in seconds with our optimized tools. No waiting, no delays.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Privacy First</h3>
              <p className="text-gray-600">
                Your documents never leave your browser. We process everything locally.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Accessible Anywhere</h3>
              <p className="text-gray-600">
                Use PDFSwift on any device with a modern browser. No downloads required.
              </p>
            </div>
          </div>
        </div>

        {/* Team/Values Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white mb-12">
          <h2 className="text-3xl font-bold mb-6">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Simplicity & Efficiency</h3>
              <p className="text-blue-100">
                We strip away complexity to deliver tools that just work. No learning curve, 
                no confusing options—just straightforward solutions.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-4">Innovation & Reliability</h3>
              <p className="text-blue-100">
                We continuously improve our tools while maintaining 99.9% uptime, so you can 
                rely on us whenever you need to handle PDFs.
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Simplify Your PDF Workflow?</h2>
          <p className="text-gray-600 text-lg mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust PDFSwift for their document needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 transition-colors"
            >
              Explore All Tools
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-3 text-base font-medium rounded-lg text-blue-600 bg-white border border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Start Converting
            </Link>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-16 pt-8 border-t border-gray-200 text-center">
          <div className="flex items-center justify-center mb-4">
            <Heart className="w-5 h-5 text-red-500 mr-2" />
            <span className="text-gray-700">Made with care for the global community</span>
          </div>
          <p className="text-gray-500">
            PDFSwift is proudly developed and maintained by a dedicated team passionate about
            simplifying document management for everyone.
          </p>
          <p className="text-gray-500 mt-2">© {new Date().getFullYear()} PDFSwift. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}