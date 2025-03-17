import React from "react";
import { motion, Variants } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedHeadingProps {
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  gradient?: boolean;
  delay?: number;
  staggerChildren?: boolean;
}

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.03,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
      delayChildren: delay,
    },
  }),
};

export const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({
  level = 1,
  children,
  className,
  gradient = false,
  delay = 0,
  staggerChildren = true,
}) => {
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

  const baseClasses = {
    1: "text-3xl sm:text-4xl font-bold tracking-tight",
    2: "text-2xl sm:text-3xl font-bold tracking-tight",
    3: "text-xl sm:text-2xl font-bold",
    4: "text-lg sm:text-xl font-semibold",
    5: "text-base sm:text-lg font-semibold",
    6: "text-sm sm:text-base font-medium",
  }[level];

  const gradientClasses = gradient
    ? "bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent"
    : "";

  if (!staggerChildren) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay }}
      >
        <HeadingTag className={cn(baseClasses, gradientClasses, className)}>
          {children}
        </HeadingTag>
      </motion.div>
    );
  }

  // Split text into individual characters for staggered animation
  const text = React.Children.toArray(children)[0];
  const characters = String(text).split("");

  return (
    <HeadingTag className={cn(baseClasses, gradientClasses, className)}>
      <motion.span
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        custom={delay}
        className="inline-block"
      >
        {characters.map((char, index) => (
          <motion.span
            key={`${char}-${index}`}
            variants={letterVariants}
            custom={index}
            className="inline-block"
            style={{
              // Add a slight wobble effect to some characters
              transform:
                index % 3 === 0
                  ? "rotate(-1deg)"
                  : index % 3 === 1
                  ? "rotate(1deg)"
                  : "rotate(0deg)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.span>
    </HeadingTag>
  );
};

export default AnimatedHeading;
