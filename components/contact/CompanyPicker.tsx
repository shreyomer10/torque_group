"use client";

import { useRef, type KeyboardEvent } from "react";
import { companies, companyOrder, type CompanyId } from "@/content";

export function CompanyPicker({
  value,
  onChange,
}: {
  value: CompanyId;
  onChange: (id: CompanyId) => void;
}) {
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      const next = (i + 1) % companyOrder.length;
      refs.current[next]?.focus();
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      const prev = (i - 1 + companyOrder.length) % companyOrder.length;
      refs.current[prev]?.focus();
    }
  };

  return (
    <div className="div-pick" role="radiogroup" aria-label="Choose company">
      {companyOrder.map((id, i) => {
        const c = companies[id];
        const active = value === id;
        return (
          <button
            key={id}
            ref={(el) => { refs.current[i] = el; }}
            type="button"
            role="radio"
            aria-checked={active}
            data-active={active ? "true" : "false"}
            className="pick"
            onClick={() => onChange(id)}
            onKeyDown={(e) => handleKey(e, i)}
          >
            <small>{c.code}</small>
            {c.picker.line1}
            <span className="pick-sub">{c.picker.line2}</span>
          </button>
        );
      })}
    </div>
  );
}
