"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { contact, companyOrder, type CompanyId } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { CompanyPicker } from "./CompanyPicker";
import { CompanyDetail } from "./CompanyDetail";
import { InquiryForm } from "./InquiryForm";

function isCompanyId(s: string | null): s is CompanyId {
  return !!s && (companyOrder as readonly string[]).includes(s);
}

export function ContactInteractive() {
  const search = useSearchParams();
  const [selected, setSelected] = useState<CompanyId>(contact.step1.defaultCompany);
  const reduced = useReducedMotion();

  useEffect(() => {
    const co = search.get("co");
    if (isCompanyId(co)) setSelected(co);
  }, [search]);

  // Sequential fade-and-rise on first paint so the page doesn't open flat.
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.21, 0.47, 0.32, 0.98] as [number, number, number, number] },
        };

  return (
    <>
      <motion.div className="section-head" style={{ marginBottom: 18 }} {...rise(0.05)}>
        <div className="text">
          <Eyebrow>{contact.step1.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 6 }}>{contact.step1.h2}</h2>
        </div>
      </motion.div>

      <motion.div {...rise(0.14)}>
        <CompanyPicker value={selected} onChange={setSelected} />
      </motion.div>

      <motion.div
        key={selected}
        style={{ marginTop: 24 }}
        initial={reduced ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <CompanyDetail id={selected} />
      </motion.div>

      <motion.div className="section-head" style={{ marginTop: 44, marginBottom: 18 }} {...rise(0.22)}>
        <div className="text">
          <Eyebrow>{contact.step2.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 6 }}>{contact.step2.h2}</h2>
        </div>
      </motion.div>

      <motion.div {...rise(0.3)}>
        <InquiryForm company={selected} />
      </motion.div>
    </>
  );
}
