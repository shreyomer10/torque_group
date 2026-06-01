"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { about } from "@/content";

export function TeamCardBody({ m }: { m: (typeof about.leadership.members)[number] }) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  return (
    <div className="team-body">
      <div className="team-role">{m.role}</div>
      <h3>{m.name}</h3>
      <div className="team-title">{m.title}</div>

      <p>{m.summary}</p>

      <AnimatePresence initial={false}>
        {open && (
          <motion.p
            key="bio"
            className="team-bio"
            initial={reduced ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
            style={{ overflow: "hidden" }}
          >
            {m.bio}
          </motion.p>
        )}
      </AnimatePresence>

      <button
        type="button"
        className="team-toggle"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? "Show less ↑" : "Read full bio ↓"}
      </button>
    </div>
  );
}
