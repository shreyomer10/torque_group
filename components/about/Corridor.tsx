import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";
import { WorldMap } from "@/components/shared/WorldMap";

export function Corridor() {
  const c = about.corridor;
  return (
    <section style={{ background: "var(--bg-alt)" }}>
      <div className="container-tg">
        <Reveal className="map-section">
          <WorldMap height={420} />
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 style={{ marginTop: 8 }}>{c.h2}</h2>
            <p>{c.body}</p>
            <p
              className="muted"
              style={{
                fontFamily: "var(--font-mono), 'JetBrains Mono', monospace",
                fontSize: 12,
                letterSpacing: ".14em",
                textTransform: "uppercase",
              }}
            >
              {c.footnote}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
