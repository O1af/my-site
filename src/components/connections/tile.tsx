"use client";

import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";

interface WordTileProps {
  word: string;
  selected: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export default function WordTile({
  word,
  selected,
  onClick,
  disabled = false,
}: WordTileProps) {
  const textRef = useRef<HTMLDivElement>(null);
  const [fontSize, setFontSize] = useState("text-lg");

  // Determine font size based on word length and container size
  useEffect(() => {
    if (textRef.current) {
      // Reset to largest size first
      setFontSize("text-lg");

      // Check if text overflows and adjust size accordingly
      setTimeout(() => {
        if (textRef.current) {
          const isOverflowing =
            textRef.current.scrollHeight > textRef.current.clientHeight ||
            textRef.current.scrollWidth > textRef.current.clientWidth;

          if (isOverflowing) {
            setFontSize("text-base");

            // Check again with medium size
            setTimeout(() => {
              if (textRef.current) {
                const stillOverflowing =
                  textRef.current.scrollHeight > textRef.current.clientHeight ||
                  textRef.current.scrollWidth > textRef.current.clientWidth;
                if (stillOverflowing) {
                  setFontSize("text-sm");
                }
              }
            }, 0);
          }
        }
      }, 0);
    }
  }, [word]);

  return (
    <motion.button
      className={`
        w-full aspect-square flex items-center justify-center font-bold p-2
        rounded-md transition-colors duration-200 border
        ${
          selected
            ? "bg-accent text-accent-foreground border-accent-foreground/20"
            : "bg-card text-card-foreground border-border hover:bg-accent/50 hover:text-accent-foreground"
        }
        ${disabled ? "cursor-not-allowed opacity-70" : "cursor-pointer"}
      `}
      onClick={onClick}
      whileHover={!disabled ? { scale: 1.05 } : {}}
      whileTap={!disabled ? { scale: 0.95 } : {}}
      animate={selected ? { scale: [1, 1.05, 1] } : { scale: 1 }}
      transition={{ duration: 0.2 }}
      disabled={disabled}
    >
      <div
        ref={textRef}
        className={`text-center ${fontSize} leading-tight max-h-full overflow-hidden flex items-center justify-center`}
      >
        {word}
      </div>
    </motion.button>
  );
}
