import type { ReactNode } from "react";
import { Eyebrow } from "./Eyebrow";

export function SectionHead({
  eyebrow,
  h2,
  body,
  aside,
  className = "",
}: {
  eyebrow?: string;
  h2: ReactNode;
  body?: ReactNode;
  aside?: ReactNode;
  className?: string;
}) {
  return (
    <div className={`section-head reveal ${className}`.trim()}>
      <div className="text">
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2>{h2}</h2>
        {body && typeof body === "string" ? <p style={{ marginTop: 10 }}>{body}</p> : body}
      </div>
      {aside}
    </div>
  );
}
