import Link from "next/link";
import { Eyebrow } from "./Eyebrow";

export function PageHead({
  crumb,
  eyebrow,
  h1,
  lede,
}: {
  crumb: string;
  eyebrow: string;
  h1: string;
  lede?: string;
}) {
  return (
    <section className="page-head">
      <div className="container-tg">
        <div className="crumbs">
          <Link href="/">Home</Link> &nbsp;/&nbsp; <span>{crumb}</span>
        </div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 style={{ marginTop: 14, maxWidth: 900 }}>{h1}</h1>
        {lede && <p style={{ maxWidth: 720, marginTop: 14 }}>{lede}</p>}
      </div>
    </section>
  );
}
