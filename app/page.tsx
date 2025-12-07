"use client";

import { motion } from "framer-motion";
import ToolCard from "./components/ToolCard";
import { tools } from "./data/tools";
import { Shield, Zap, Lock, ArrowRight, Sparkles, FileText, Image as ImageIcon, Download, CheckCircle, Users, Clock } from "lucide-react";
import { useState } from "react";
import type { Tool } from "./types"; // Import the existing Tool type

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("all");

  // Clean tools array - don't use type predicate if it's causing issues
  const cleanTools = tools.filter((t) => t != null) as Tool[];

  const categories = {
    convert: cleanTools.filter((t) => t.category === "convert"),
    pdf: cleanTools.filter((t) => t.category === "pdf"),
    image: cleanTools.filter((t) => t.category === "image"),
  };

  const allTools = [...categories.convert, ...categories.pdf, ...categories.image];
  
  // Filter tools based on active category
  const filteredTools = activeCategory === "all" 
    ? allTools
    : categories[activeCategory as keyof typeof categories] || [];

  const categoryTabs = [
    { id: "all", label: "All Tools", icon: Sparkles, count: allTools.length },
    { id: "convert", label: "Convert", icon: FileText, count: categories.convert.length },
    { id: "pdf", label: "PDF Tools", icon: Download, count: categories.pdf.length },
    { id: "image", label: "Image", icon: ImageIcon, count: categories.image.length },
  ];

  const stats = [
    { value: "10K+", label: "Daily Users", icon: Users, color: "bg-gradient-to-br from-blue-500 to-blue-600" },
    { value: "100%", label: "Free", icon: CheckCircle, color: "bg-gradient-to-br from-green-500 to-green-600" },
    { value: "0ms", label: "No Delay", icon: Zap, color: "bg-gradient-to-br from-purple-500 to-purple-600" },
    { value: "24/7", label: "Available", icon: Clock, color: "bg-gradient-to-br from-orange-500 to-orange-600" },
  ];

  const features = [
    {
      icon: Shield,
      title: "Military-Grade Security",
      description: "All processing happens locally in your browser.",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-900/20"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Instant processing with WebAssembly technology.",
      color: "text-purple-600 dark:text-purple-400",
      bg: "bg-purple-50 dark:bg-purple-900/20"
    },
    {
      icon: Lock,
      title: "Privacy First",
      description: "No data collection, no tracking, no server storage.",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-900/20"
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-300/30 dark:bg-blue-900/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-300/30 dark:bg-purple-900/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative mx-auto px-4 py-8 sm:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100 dark:border-blue-800 mb-6">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              No Installation • Completely Free
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              All-in-One
            </span>
            <span className="block text-gray-900 dark:text-white mt-2">
              Document Tools
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
            Convert, merge, split, and edit files in your browser.
            <span className="block text-gray-500 dark:text-gray-400 mt-1 text-base">
              Fast, secure, and completely free.
            </span>
          </p>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-12"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 rounded-xl p-4 sm:p-5 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${stat.color} p-2 rounded-lg w-fit mb-3`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="sticky top-2 z-10 mb-8 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm py-2"
        >
          <div className="flex flex-wrap gap-2 justify-center">
            {categoryTabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                  activeCategory === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
                <span className={`ml-1 px-1.5 py-0.5 text-xs rounded ${
                  activeCategory === tab.id
                    ? "bg-white/20"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-12"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="p-5 sm:p-6 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-200 dark:hover:border-blue-800 transition-colors"
            >
              <div className={`${feature.bg} ${feature.color} p-3 rounded-lg w-fit mb-4`}>
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Tools Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {activeCategory === "all" ? (
            // Show all tools when "all" is selected
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredTools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.03 }}
                >
                  <ToolCard tool={tool} />
                </motion.div>
              ))}
            </div>
          ) : (
            // Show tools by category
            Object.entries(categories).map(([categoryKey, categoryTools], sectionIndex) => (
              categoryKey === activeCategory && (
                <section key={categoryKey} className="mb-10 sm:mb-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500">
                      {categoryKey === "convert" && <FileText className="w-5 h-5 text-white" />}
                      {categoryKey === "pdf" && <Download className="w-5 h-5 text-white" />}
                      {categoryKey === "image" && <ImageIcon className="w-5 h-5 text-white" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 dark:text-white capitalize">
                        {categoryKey === "convert" ? "Convert Files" : 
                         categoryKey === "pdf" ? "PDF Tools" : "Image Tools"}
                      </h2>
                      <p className="text-gray-600 dark:text-gray-400 text-sm">
                        {categoryTools.length} tools
                      </p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                    {categoryTools.map((tool, index) => (
                      <motion.div
                        key={tool.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.03 }}
                      >
                        <ToolCard tool={tool} />
                      </motion.div>
                    ))}
                  </div>
                </section>
              )
            ))
          )}
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 sm:mt-20 mb-8"
        >
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Ready to transform your documents?
            </h2>
            <p className="text-white/90 mb-6 max-w-xl mx-auto">
              Join thousands of users who trust our tools. No registration required.
            </p>
            <button className="inline-flex items-center gap-2 bg-white text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors">
              Start Using Tools
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}