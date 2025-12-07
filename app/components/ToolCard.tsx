"use client";

import { motion } from "framer-motion";
import * as Icons from "lucide-react";
import { Tool } from "../types";

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const IconComponent =
    Icons[tool.icon as keyof typeof Icons] as React.ComponentType<{
      className?: string;
    }>;

  return (
    <motion.a
      href={tool.path}
      whileHover={{ scale: 1.03, y: -5 }}
      whileTap={{ scale: 0.98 }}
      className="block p-6 bg-white dark:bg-gray-800 rounded-xl border-2 border-gray-200 
                 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 
                 transition-all shadow-sm hover:shadow-lg"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          {IconComponent && (
            <IconComponent className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          )}
        </div>

        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
            {tool.name}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {tool.description}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
