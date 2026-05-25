import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";

export function Metrics() {
  const o = home.overview;
  return (
    <section style={{ background: "var(--bg-alt)" }}>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{o.eyebrow}</Eyebrow>
            <h2>{o.h2}</h2>
          </div>
          <p style={{ maxWidth: 340 }}>{o.body}</p>
        </Reveal>
        <StaggerGroup className="metrics" stagger={0.07}>
          {o.metrics.map((m) => (
            <StaggerItem className="metric" key={m.label}>
              <div className="num">{m.num}</div>
              <div className="lbl">{m.label}</div>
              <div className="desc">{m.desc}</div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
