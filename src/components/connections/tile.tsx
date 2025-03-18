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
  const tileRef = useRef<HTMLButtonElement>(null);
  const [fontSize, setFontSize] = useState("text-lg");

  // Determine font size based on word length, container size and screen size
  useEffect(() => {
    const adjustFontSize = () => {
      if (textRef.current && tileRef.current) {
        // Get the current tile dimensions
        const tileWidth = tileRef.current.offsetWidth;
        const tileHeight = tileRef.current.offsetHeight;
        const effectiveTileWidth = tileWidth * 0.85; // Account for padding
        const effectiveTileHeight = tileHeight * 0.85;

        // Start with the largest size
        let currentSize = "text-lg";
        textRef.current.className = `text-center ${currentSize} leading-tight max-h-full overflow-hidden flex items-center justify-center`;

        // Check if content fits
        let isOverflowing =
          textRef.current.scrollHeight > textRef.current.clientHeight ||
          textRef.current.scrollWidth > textRef.current.clientWidth;

        // Step down size until content fits
        if (isOverflowing) {
          currentSize = "text-base";
          textRef.current.className = `text-center ${currentSize} leading-tight max-h-full overflow-hidden flex items-center justify-center`;

          isOverflowing =
            textRef.current.scrollHeight > textRef.current.clientHeight ||
            textRef.current.scrollWidth > textRef.current.clientWidth;

          if (isOverflowing) {
            currentSize = "text-sm";
            textRef.current.className = `text-center ${currentSize} leading-tight max-h-full overflow-hidden flex items-center justify-center`;

            isOverflowing =
              textRef.current.scrollHeight > textRef.current.clientHeight ||
              textRef.current.scrollWidth > textRef.current.clientWidth;

            if (isOverflowing) {
              currentSize = "text-xs";
              textRef.current.className = `text-center ${currentSize} leading-tight max-h-full overflow-hidden flex items-center justify-center`;
            }
          }
        }

        // Apply final size
        setFontSize(currentSize);
      }
    };

    // Immediate check and then a second check after render to be sure
    adjustFontSize();
    const timeoutId = setTimeout(adjustFontSize, 50);

    // Add resize listener
    window.addEventListener("resize", adjustFontSize);
    return () => {
      window.removeEventListener("resize", adjustFontSize);
      clearTimeout(timeoutId);
    };
  }, [word]); // Remove fontSize dependency to prevent re-render loops

  return (
    <motion.button
      ref={tileRef}
      className={`
        w-full aspect-square flex items-center justify-center font-bold px-1 py-1
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
        className={`text-center ${fontSize} leading-tight w-full h-full overflow-hidden flex items-center justify-center`}
      >
        {word}
      </div>
    </motion.button>
  );
}
