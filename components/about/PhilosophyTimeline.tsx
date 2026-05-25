import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function PhilosophyTimeline() {
  const p = about.philosophy;
  const m = about.milestones;
  return (
    <section style={{ background: "var(--bg-alt)" }}>
      <div className="container-tg about-two-col">
        <Reveal>
          <Eyebrow>{p.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 10 }}>{p.h2}</h2>
          {p.paragraphs.map((para, i) => <p key={i}>{para}</p>)}
          <div className="badge-row">
            {p.badges.map((b) => <span className="badge" key={b}>{b}</span>)}
          </div>
        </Reveal>

        <Reveal>
          <Eyebrow>{m.eyebrow}</Eyebrow>
          <h2 style={{ marginTop: 10 }}>{m.h2}</h2>
          <div className="timeline">
            {m.items.map((it) => (
              <div className="tl-item" key={it.year}>
                <div className="year">{it.year}</div>
                <div className="title">{it.title}</div>
                <p>{it.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
