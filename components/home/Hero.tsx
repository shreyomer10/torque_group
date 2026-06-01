"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

const HERO_IMAGES = [
  "/images/home/mumbai-50.jpg",
  "/images/home/mumbai-52.jpg",
  "/images/home/mumbai-63.jpg",
];

export function Hero() {
  const h = home.hero;
  const reduced = useReducedMotion();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (reduced || HERO_IMAGES.length < 2) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % HERO_IMAGES.length);
    }, 4000);
    return () => clearInterval(id);
  }, [reduced]);

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
            Engineering Maritime<br />Excellence Since 1998
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
          whileHover={reduced ? undefined : { scale: 1.015 }}
        >
          <div className="img-area">
            {HERO_IMAGES.map((src, i) => (
              <motion.img
                key={src}
                src={src}
                alt="Torque Group marine engine and turbocharger overhaul — Mumbai workshop"
                className="hero-slide"
                initial={false}
                animate={{
                  // Active image is fully revealed; others are wiped off to the left.
                  clipPath: i === active ? "inset(0 0 0 0)" : "inset(0 0 0 100%)",
                  zIndex: i === active ? 2 : 1,
                }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { duration: 1.4, ease: [0.65, 0.05, 0.36, 1] }
                }
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
