"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type AsTag = "div" | "section" | "article" | "ul" | "ol" | "header" | "footer" | "main" | "nav" | "aside";

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  id,
  y = 18,
}: {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  delay?: number;
  id?: string;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;

  return (
    <MotionTag
      id={id}
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </MotionTag>
  );
}

/** Wrapper for a group of children that fade-and-rise in sequence. */
export function StaggerGroup({
  children,
  className = "",
  as = "div",
  stagger = 0.08,
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  stagger?: number;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.05, margin: "0px 0px 200px 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduced ? 0 : stagger } },
      }}
      custom={y}
    >
      {children}
    </MotionTag>
  );
}

export function StaggerItem({
  children,
  className = "",
  as = "div",
  y = 14,
}: {
  children: ReactNode;
  className?: string;
  as?: AsTag;
  y?: number;
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={{
        hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y },
        show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] } },
      }}
    >
      {children}
    </MotionTag>
  );
}
