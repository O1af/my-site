"use client";

import { Button } from "@/components/ui/button";
import CategoryReveal from "./reveal";
import { motion } from "motion/react";
import { useState } from "react";
import { CheckIcon, CopyIcon, ShareIcon } from "lucide-react";

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
  guessHistory: Array<{
    words: string[];
    correct: boolean;
    categoryColor?: string;
  }>;
  allCategories: Array<{
    name: string;
    color: string;
    words: string[];
  }>;
}

export default function GameOver({
  won,
  solvedCategories,
  unsolvedCategories,
  onReset,
  guessHistory,
  allCategories,
}: GameOverProps) {
  const [copied, setCopied] = useState(false);

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

  // Map color to emoji
  const colorToEmoji = (color: string): string => {
    switch (color) {
      case "bg-yellow-200":
        return "🟨"; // Yellow
      case "bg-green-200":
        return "🟩"; // Green
      case "bg-blue-200":
        return "🟦"; // Blue
      case "bg-purple-200":
        return "🟪"; // Purple
      default:
        return "⬜"; // Default
    }
  };

  // Generate emoji grid for results
  const generateEmojiGrid = (): string => {
    let result = "olafdsouza.com/connections\n";

    // For correct guesses, we use the actual category color
    // For incorrect guesses, show a mix of squares based on where those words actually belong
    guessHistory.forEach((guess) => {
      let guessEmojis = "";

      if (guess.correct && guess.categoryColor) {
        // For correct guesses, use the same emoji for all 4 words
        guessEmojis = Array(4).fill(colorToEmoji(guess.categoryColor)).join("");
      } else {
        // For incorrect guesses, show which category each word belongs to
        guessEmojis = guess.words
          .map((word) => {
            // Find which category this word belongs to
            const category = allCategories.find((cat) =>
              cat.words.includes(word)
            );
            return category ? colorToEmoji(category.color) : "⬜";
          })
          .join("");
      }

      result += guessEmojis + "\n";
    });

    return result;
  };

  const shareResults = async () => {
    const text = generateEmojiGrid();

    if (navigator.share && navigator.canShare?.({ text })) {
      try {
        await navigator.share({ text });
      } catch (err) {
        await copyToClipboard(text);
      }
    } else {
      await copyToClipboard(text);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <motion.div
      className="max-w-md mx-auto flex flex-col items-center p-4"
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
        className="mb-4 text-center text-muted-foreground"
        variants={item}
      >
        {won
          ? "You found all the connections!"
          : "You ran out of attempts. Here are all the connections:"}
      </motion.p>

      {/* Share and copy results buttons */}
      <motion.div variants={item} className="w-full mb-6 flex gap-2">
        <Button
          onClick={shareResults}
          className="flex-1 flex items-center justify-center gap-2"
          variant="outline"
        >
          <ShareIcon size={16} />
          Share
        </Button>

        <Button
          onClick={() => copyToClipboard(generateEmojiGrid())}
          className="flex-1 flex items-center justify-center gap-2"
          variant="outline"
        >
          {copied ? (
            <>
              <CheckIcon size={16} />
              Copied
            </>
          ) : (
            <>
              <CopyIcon size={16} />
              Copy Results
            </>
          )}
        </Button>
      </motion.div>

      {/* Show all categories - only render a category once */}
      {allCategories.map((category, index) => {
        // Check if this category is solved
        const isSolved = solvedCategories.some(
          (solved) => solved.name === category.name
        );

        return (
          <motion.div
            key={`category-${index}`}
            variants={item}
            className="w-full"
          >
            <CategoryReveal category={category} />
          </motion.div>
        );
      })}

      <motion.div variants={item}>
        <Button onClick={onReset} className="mt-6" size="lg">
          Play Again
        </Button>
      </motion.div>
    </motion.div>
  );
}
