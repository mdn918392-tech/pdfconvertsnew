// ToolButton.tsx (FINAL VERSION - Requires icon prop)

import React, { ReactNode } from "react"; // Import ReactNode for the icon type
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type ToolButtonProps = {
  label: string;
  url: string; // Placeholder URL for navigation
  icon: ReactNode; // NEW: Prop to accept the Lucide icon element
};

const ToolButton = ({ label, url, icon }: ToolButtonProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{
        scale: 1.02,
        boxShadow: "0 8px 20px rgba(100, 50, 150, 0.2)",
      }}
      className="w-full"
    >
                 {" "}
      <a
        href={url}
        className="w-full inline-flex items-center justify-start gap-3 px-6 py-3 text-base font-semibold 
                           text-gray-800 dark:text-gray-200 
                           bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 
                           hover:from-blue-100 hover:to-purple-100 dark:hover:from-gray-600 dark:hover:to-gray-700 
                           rounded-xl 
                           transition-all duration-300 
                           border border-blue-300 dark:border-gray-600 
                            shadow-md hover:shadow-lg cursor-pointer"
      >
        {/* NEW: Render the dynamic icon here */}
        <div className="p-1.5 bg-blue-200/50 dark:bg-purple-900/40 rounded-lg shrink-0">
          {icon}
        </div>
                        <span className="flex-1 truncate">{label}</span>
                       {" "}
        <ChevronRight className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                   {" "}
      </a>
             {" "}
    </motion.div>
  );
};

export default ToolButton;
