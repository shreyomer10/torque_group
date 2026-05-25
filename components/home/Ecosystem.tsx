"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { home, companies, companyOrder } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function Ecosystem() {
  const e = home.ecosystem;
  const reduced = useReducedMotion();

  return (
    <section>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{e.eyebrow}</Eyebrow>
            <h2 style={{ whiteSpace: "pre-line" }}>{e.h2}</h2>
          </div>
        </Reveal>

        <Reveal className="ecosystem">
          <div className="ecosystem-grid">
            <motion.div
              className="root"
              initial={reduced ? false : { opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <Eyebrow>{e.parent.eyebrow}</Eyebrow>
              <h3>{e.parent.title}</h3>
              <p>{e.parent.body}</p>
              <div className="badge-row">
                {e.parent.badges.map((b) => (
                  <span key={b} className="badge badge-on-navy">{b}</span>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="nodes"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: reduced ? 0 : 0.08, delayChildren: 0.15 } },
              }}
            >
              {companyOrder.map((id) => {
                const c = companies[id];
                return (
                  <motion.div
                    key={id}
                    variants={{
                      hidden: reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 },
                      show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
                    }}
                    whileHover={reduced ? undefined : { y: -3, transition: { duration: 0.15 } }}
                  >
                    <Link href={`/companies#${id}`} className="node">
                      <div className="tag">{c.code}</div>
                      <h4>{c.name}</h4>
                      <p>{c.blurb}</p>
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
