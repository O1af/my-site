"use client";

import { Button } from "@/components/ui/button";
import CategoryReveal from "./reveal";
import { motion } from "motion/react";

interface GameOverProps {
  won: boolean;
  solvedCategories: Array<{
    name: string;
    color: string;
    words: string[];
  }>;
  unsolvedCategories: Array<{
    name: string;
    color: string;
    words: string[];
  }>;
  onReset: () => void;
}

export default function GameOver({
  won,
  solvedCategories,
  unsolvedCategories,
  onReset,
}: GameOverProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      className="max-w-md mx-auto flex flex-col items-center"
      initial="hidden"
      animate="show"
      variants={container}
    >
      <motion.h1
        className="text-2xl font-bold mb-4 text-center text-foreground"
        variants={item}
      >
        {won ? "You won!" : "Game Over"}
      </motion.h1>

      <motion.p
        className="mb-8 text-center text-muted-foreground"
        variants={item}
      >
        {won
          ? "You found all the connections!"
          : "You ran out of attempts. Here are all the connections:"}
      </motion.p>

      {/* Show all categories */}
      {solvedCategories.map((category, index) => (
        <motion.div key={`solved-${index}`} variants={item} className="w-full">
          <CategoryReveal category={category} />
        </motion.div>
      ))}

      {unsolvedCategories.map((category, index) => (
        <motion.div
          key={`unsolved-${index}`}
          variants={item}
          className="w-full"
        >
          <CategoryReveal category={category} />
        </motion.div>
      ))}

      <motion.div variants={item}>
        <Button onClick={onReset} className="mt-6" size="lg">
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
