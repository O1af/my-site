"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import WordTile from "./tile";
import { Button } from "@/components/ui/button";
import CategoryReveal from "./reveal";
import GameOver from "./end";
import { toast } from "sonner";

// Define types
type Category = {
  name: string;
  color: string;
  words: string[];
};

type Guess = {
  words: string[];
  correct: boolean;
  categoryColor?: string;
};

type GameState = {
  categories: Category[];
  remainingWords: string[];
  selectedWords: string[];
  mistakesRemaining: number;
  solvedCategories: Category[];
  gameOver: boolean;
  gameWon: boolean;
  isShuffling: boolean;
  guessHistory: Guess[];
};

// Sample game data
const INITIAL_CATEGORIES: Category[] = [
  {
    name: "APPS TO WASTE TIME",
    color: "bg-yellow-200",
    words: ["NETFLIX", "TIKTOK", "TWITTER", "LINKEDIN"],
  },
  {
    name: "SPORTS ENDING IN -BALL",
    color: "bg-green-200",
    words: ["PICKLE", "BASE", "DODGE", "VOLLEY"],
  },
  {
    name: "FOOTBALL TERMS",
    color: "bg-blue-200",
    words: ["HIKE", "RUN", "SNAP", "DRIVE"],
  },
  {
    name: "YUMMY FOODS",
    color: "bg-purple-200",
    words: ["TURNOVER", "DATE", "APPLE", "JAM"],
  },
];

const STORAGE_KEY = "connectionsGameState1";

// Fisher-Yates shuffle algorithm
function shuffleArray<T>(array: T[]): T[] {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

export default function ConnectionsGame() {
  const [gameState, setGameState] = useState<GameState>(() => {
    if (typeof window !== "undefined") {
      try {
        const savedState = localStorage.getItem(STORAGE_KEY);
        if (savedState) return JSON.parse(savedState);
      } catch (e) {
        console.error("Failed to load game state:", e);
      }
    }
    return initializeGame();
  });

  // Save game state to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
      } catch (e) {
        console.error("Failed to save game state:", e);
      }
    }
  }, [gameState]);

  function initializeGame(): GameState {
    const allWords = INITIAL_CATEGORIES.flatMap((category) => category.words);
    const shuffledWords = shuffleArray(allWords);

    return {
      categories: INITIAL_CATEGORIES,
      remainingWords: shuffledWords,
      selectedWords: [],
      mistakesRemaining: 4,
      solvedCategories: [],
      gameOver: false,
      gameWon: false,
      isShuffling: false,
      guessHistory: [],
    };
  }

  function handleWordSelect(word: string) {
    if (gameState.isShuffling) return;

    setGameState((prev) => {
      // If already selected, remove it
      if (prev.selectedWords.includes(word)) {
        return {
          ...prev,
          selectedWords: prev.selectedWords.filter((w) => w !== word),
        };
      }

      // If 4 words are already selected, don't add more
      if (prev.selectedWords.length >= 4) return prev;

      // Add the word to selected words
      return {
        ...prev,
        selectedWords: [...prev.selectedWords, word],
      };
    });
  }

  function handleSubmit() {
    if (gameState.selectedWords.length !== 4 || gameState.isShuffling) return;

    // Check if the selected words belong to the same category
    const matchingCategory = gameState.categories.find((category) => {
      const selectedSet = new Set(gameState.selectedWords);
      const categorySet = new Set(category.words);
      return (
        selectedSet.size === categorySet.size &&
        [...selectedSet].every((word) => categorySet.has(word))
      );
    });

    if (matchingCategory) {
      // Correct match
      setGameState((prev) => {
        const newRemainingWords = prev.remainingWords.filter(
          (word) => !prev.selectedWords.includes(word)
        );
        const newSolvedCategories = [
          ...prev.solvedCategories,
          matchingCategory,
        ];
        const gameWon = newRemainingWords.length === 0;

        return {
          ...prev,
          remainingWords: newRemainingWords,
          selectedWords: [],
          solvedCategories: newSolvedCategories,
          gameOver: gameWon,
          gameWon,
          guessHistory: [
            ...prev.guessHistory,
            {
              words: [...prev.selectedWords],
              correct: true,
              categoryColor: matchingCategory.color,
            },
          ],
        };
      });
    } else {
      // Check for "one away" situation
      const isOneAwayInfo = checkOneAway();
      if (isOneAwayInfo.isOneAway) {
        toast.info(
          <span className="font-medium">You're one away from a group!</span>,
          {
            id: "one-away-toast",
            duration: 3000,
          }
        );
      }

      // Incorrect match
      setGameState((prev) => {
        const newMistakesRemaining = prev.mistakesRemaining - 1;
        const gameOver = newMistakesRemaining === 0;

        return {
          ...prev,
          selectedWords: [],
          mistakesRemaining: newMistakesRemaining,
          gameOver,
          gameWon: false,
          guessHistory: [
            ...prev.guessHistory,
            {
              words: [...prev.selectedWords],
              correct: false,
            },
          ],
        };
      });
    }
  }

  function checkOneAway() {
    let isOneAway = false;
    let oneAwayCategory = null;

    // Check each unsolved category
    for (const category of gameState.categories) {
      // Skip already solved categories
      if (gameState.solvedCategories.some((c) => c.name === category.name))
        continue;

      // Count matches between selected words and this category
      const matchCount = gameState.selectedWords.filter((word) =>
        category.words.includes(word)
      ).length;

      // If exactly 3 words match, this is "one away"
      if (matchCount === 3) {
        isOneAway = true;
        oneAwayCategory = category;
        break;
      }
    }

    return { isOneAway, oneAwayCategory };
  }

  function handleShuffle() {
    if (gameState.isShuffling) return;

    setGameState((prev) => ({
      ...prev,
      isShuffling: true,
      selectedWords: [],
    }));

    // Add a small delay before shuffling
    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        remainingWords: shuffleArray(prev.remainingWords),
        isShuffling: false,
      }));
    }, 500);
  }

  function handleDeselectAll() {
    if (gameState.isShuffling) return;
    setGameState((prev) => ({ ...prev, selectedWords: [] }));
  }

  function handleReset() {
    const newState = initializeGame();
    setGameState(newState);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
  }

  // If game is over, show the game over screen
  if (gameState.gameOver) {
    return (
      <GameOver
        won={gameState.gameWon}
        solvedCategories={gameState.solvedCategories}
        unsolvedCategories={gameState.categories.filter(
          (category) => !gameState.solvedCategories.includes(category)
        )}
        onReset={handleReset}
        guessHistory={gameState.guessHistory}
        allCategories={gameState.categories}
      />
    );
  }

  return (
    <div className="max-w-md mx-auto flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-8 text-center text-foreground">
        Create four groups of four!
      </h1>

      {/* Solved categories */}
      <AnimatePresence>
        {gameState.solvedCategories.map((category) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full"
          >
            <CategoryReveal category={category} />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Word grid */}
      <div className="grid grid-cols-4 gap-2 mb-6 w-full">
        <AnimatePresence>
          {gameState.remainingWords.map((word, index) => (
            <motion.div
              key={word}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: {
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  delay: index * 0.03,
                },
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="aspect-square"
            >
              <WordTile
                word={word}
                selected={gameState.selectedWords.includes(word)}
                onClick={() => handleWordSelect(word)}
                disabled={gameState.isShuffling}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Game controls */}
      <div className="flex flex-col w-full gap-4">
        {/* Submit button */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-sm font-medium text-muted-foreground">
              Mistakes left:
            </div>
            <div className="flex gap-1">
              {Array.from({ length: gameState.mistakesRemaining }).map(
                (_, i) => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                  ></div>
                )
              )}
              {Array.from({ length: 4 - gameState.mistakesRemaining }).map(
                (_, i) => (
                  <div key={i} className="w-2 h-2 rounded-full bg-muted"></div>
                )
              )}
            </div>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={
              gameState.selectedWords.length !== 4 || gameState.isShuffling
            }
            variant={
              gameState.selectedWords.length === 4 ? "default" : "outline"
            }
            className="px-6"
          >
            Submit
          </Button>
        </div>

        {/* Action buttons */}
        <div className="flex justify-between gap-2">
          <Button
            onClick={handleShuffle}
            disabled={gameState.isShuffling}
            variant="outline"
            className="flex-1"
          >
            Shuffle
          </Button>
          <Button
            onClick={handleDeselectAll}
            disabled={
              gameState.selectedWords.length === 0 || gameState.isShuffling
            }
            variant="outline"
            className="flex-1"
          >
            Deselect All
          </Button>
        </div>
      </div>
    </div>
  );
}
