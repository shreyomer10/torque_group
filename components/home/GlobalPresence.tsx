import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/layout/Reveal";
import { WorldMap } from "@/components/shared/WorldMap";

export function GlobalPresence() {
  const g = home.global;
  return (
    <section style={{ background: "var(--bg-alt)" }}>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{g.eyebrow}</Eyebrow>
            <h2>{g.h2}</h2>
          </div>
        </Reveal>
        <Reveal className="map-section">
          <WorldMap height={460} />
          <StaggerGroup className="locations" stagger={0.06}>
            {g.offices.map((o) => (
              <StaggerItem className="location" key={o.code}>
                <div className="role-line">{o.code}</div>
                <div className="city">{o.city}</div>
                <p>{o.desc}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}
