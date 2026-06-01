"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { Eyebrow } from "./Eyebrow";

type Crumb = { label: string; href?: string };

export function PageHead({
  crumb,
  crumbs,
  eyebrow,
  h1,
  lede,
}: {
  crumb?: string;          // simple single-segment crumb (back-compat)
  crumbs?: Crumb[];        // multi-segment trail; segments with href are links
  eyebrow: string;
  h1: string;
  lede?: string;
}) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
        };

  const trail: Crumb[] = crumbs ?? (crumb ? [{ label: crumb }] : []);

  return (
    <section className="page-head">
      <div className="container-tg">
        <motion.div className="crumbs" {...rise(0)}>
          <Link href="/">Home</Link>
          {trail.map((c) => (
            <span key={c.label}>
              &nbsp;/&nbsp;
              {c.href ? <Link href={c.href}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </motion.div>
        <motion.div {...rise(0.08)}>
          <Eyebrow>{eyebrow}</Eyebrow>
        </motion.div>
        <motion.h1 style={{ marginTop: 14, maxWidth: 900 }} {...rise(0.16)}>{h1}</motion.h1>
        {lede && <motion.p style={{ maxWidth: 720, marginTop: 14 }} {...rise(0.24)}>{lede}</motion.p>}
      </div>
    </section>
  );
}
