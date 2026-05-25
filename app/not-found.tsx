import Link from "next/link";
import { microcopy } from "@/content";

export default function NotFound() {
  return (
    <section className="page-head" style={{ minHeight: "70vh", display: "grid", placeItems: "center" }}>
      <div className="container-tg" style={{ textAlign: "center" }}>
        <h1 style={{ maxWidth: 720, margin: "0 auto" }}>{microcopy.notFound.h1}</h1>
        <p style={{ maxWidth: 560, margin: "16px auto 28px" }}>{microcopy.notFound.body}</p>
        <div style={{ display: "inline-flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
          {microcopy.notFound.ctas.map((c, i) => (
            <Link key={c.href} href={c.href} className={`btn ${i === 0 ? "btn-accent" : "btn-ghost"}`}>
              {c.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
