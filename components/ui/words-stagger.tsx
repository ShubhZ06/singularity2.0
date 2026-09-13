"use client";

import React from "react";
import { motion, Transition } from "motion/react";
import { cn } from "@/lib/utils";

interface WordsStaggerProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  stagger?: number;
  speed?: number;
  autoStart?: boolean;
  onStart?: () => void;
  onComplete?: () => void;
  inView?: boolean;
  once?: boolean;
}

export function WordsStagger({
  children,
  className,
  delay = 0,
  stagger = 0.1,
  speed = 0.5,
  autoStart = true,
  onStart,
  onComplete,
  inView = false,
  once = true,
}: WordsStaggerProps) {
  const text = React.Children.toArray(children)
    .filter((child) => typeof child === "string")
    .join("");

  const words = text.split(" ").filter((word) => word.length > 0);

  const transition: Transition = {
    type: "tween",
    ease: "easeOut",
    duration: speed,
  };

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: stagger,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      y: 10,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition,
    },
  };

  const isJustified = className?.includes("text-justify") || className?.includes("[text-align:justify]");

  return (
    <motion.div
      className={cn(isJustified ? "block" : "flex flex-wrap", className)}
      variants={containerVariants}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : autoStart ? "visible" : "hidden"}
      viewport={{ once }}
      onAnimationStart={onStart}
      onAnimationComplete={onComplete}
    >
      {words.map((word, index) => (
        <React.Fragment key={`${word}-${index}`}>
          <motion.span
            className="inline-block"
            variants={wordVariants}
          >
            {word}
          </motion.span>
          {index < words.length - 1 && (isJustified ? " " : <span className="inline-block">&nbsp;</span>)}
        </React.Fragment>
      ))}
    </motion.div>
  );
}

export default WordsStagger;
