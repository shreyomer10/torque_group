"use client";

import { motion, useReducedMotion } from "framer-motion";
import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

export function Hero() {
  const h = home.hero;
  const reduced = useReducedMotion();

  const fadeUp = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
        };

  return (
    <section className="hero">
      <div className="container-tg hero-grid">
        <div>
          <motion.div {...fadeUp(0.05)}><Eyebrow>{h.eyebrow}</Eyebrow></motion.div>
          <motion.h1 {...fadeUp(0.12)}>
            Engineering Maritime<br />Excellence Since 1991
          </motion.h1>
          <motion.div className="lede" {...fadeUp(0.2)}>{h.lede}</motion.div>
          <motion.p style={{ maxWidth: 560 }} {...fadeUp(0.28)}>{h.body}</motion.p>
          <motion.div className="hero-cta" {...fadeUp(0.36)}>
            <LinkButton href={h.ctas[0].href} variant="accent" withArrow>
              {h.ctas[0].label}
            </LinkButton>
            <LinkButton href={h.ctas[1].href} variant="ghost">
              {h.ctas[1].label}
            </LinkButton>
          </motion.div>
          <motion.div className="hero-stats" {...fadeUp(0.44)}>
            {h.stats.map((s, i) => (
              <motion.div
                className="hero-stat"
                key={s.label}
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.55 + i * 0.08 }}
              >
                <div className="num">{s.num}</div>
                <div className="lbl">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          className="hero-visual"
          initial={reduced ? false : { opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          <div className="img-area" />
          <div className="corner-tag">{h.visualRef}</div>
          <div className="ticks"><span /><span /><span /></div>
          <div className="meta">
            <span>{h.visualMeta}</span>
            <span>{h.visualIndex}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
