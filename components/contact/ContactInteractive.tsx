"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
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

  useEffect(() => {
    const co = search.get("co");
    if (isCompanyId(co)) setSelected(co);
  }, [search]);

  return (
    <>
      <div className="section-head" style={{ marginBottom: 18 }}>
        <div className="text">
          <Eyebrow>{contact.step1.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 6 }}>{contact.step1.h2}</h2>
        </div>
      </div>

      <CompanyPicker value={selected} onChange={setSelected} />

      <div style={{ marginTop: 24 }}>
        <CompanyDetail id={selected} />
      </div>

      <div className="section-head" style={{ marginTop: 44, marginBottom: 18 }}>
        <div className="text">
          <Eyebrow>{contact.step2.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 6 }}>{contact.step2.h2}</h2>
        </div>
      </div>

      <InquiryForm company={selected} />
    </>
  );
}
