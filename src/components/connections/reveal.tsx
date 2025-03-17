"use client";

import { motion } from "motion/react";

interface CategoryRevealProps {
  category: {
    name: string;
    color: string;
    words: string[];
  };
}

export default function CategoryReveal({ category }: CategoryRevealProps) {
  // Determine font size based on category name length
  const getTitleFontSize = () => {
    if (category.name.length > 25) return "text-lg";
    return "text-xl";
  };

  // Map the color to a theme-compatible color
  const getCategoryColor = () => {
    switch (category.color) {
      case "bg-yellow-200":
        return "bg-[var(--chart-4)] text-[var(--chart-4-foreground,_var(--foreground))]";
      case "bg-green-200":
        return "bg-[var(--chart-2)] text-[var(--chart-2-foreground,_var(--foreground))]";
      case "bg-blue-200":
        return "bg-[var(--chart-3)] text-[var(--chart-3-foreground,_var(--foreground))]";
      case "bg-purple-200":
        return "bg-[var(--chart-1)] text-[var(--chart-1-foreground,_var(--foreground))]";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <motion.div
      className={`w-full mb-4 p-4 rounded-md ${getCategoryColor()} shadow-sm`}
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h3
        className={`text-center font-bold ${getTitleFontSize()} leading-tight`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        {category.name}
      </motion.h3>
      <motion.p
        className="text-center mt-1 text-sm md:text-base"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.3 }}
      >
        {category.words.join(", ")}
      </motion.p>
    </motion.div>
  );
}
