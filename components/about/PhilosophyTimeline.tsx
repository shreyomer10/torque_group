"use client";

import { motion, useReducedMotion } from "framer-motion";
import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function PhilosophyTimeline() {
  const p = about.philosophy;
  const m = about.milestones;
  const reduced = useReducedMotion();

  const item = {
    hidden: reduced ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 },
    show: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
    },
  };

  return (
    <section style={{ background: "var(--bg-alt)" }}>
      <div className="container-tg about-two-col">
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 10 }}>{p.h2}</h2>
          {p.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          <div className="badge-row">
            {p.badges.map((b) => <span className="badge" key={b}>{b}</span>)}
          </div>
        </Reveal>

        <div>
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 10 }}>{m.h2}</h2>
          <motion.div
            className="timeline"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
            variants={{ show: { transition: { staggerChildren: reduced ? 0 : 0.14 } } }}
          >
            {/* Animated progress line that draws as the section scrolls in. */}
            <motion.span
              className="tl-progress"
              aria-hidden
              initial={reduced ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 1.1, ease: "easeInOut" }}
            />
            {m.items.map((it) => (
              <motion.div className="tl-item" key={it.year} variants={item}>
                <span className="tl-dot" aria-hidden />
                <div className="year">{it.year}</div>
                <div className="title">{it.title}</div>
                <p>{it.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
