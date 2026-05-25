import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";
import { ImageOrPlaceholder } from "@/components/shared/ImageOrPlaceholder";

export function Leadership() {
  const l = about.leadership;
  return (
    <section>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{l.eyebrow}</Eyebrow>
            <h2>{l.h2}</h2>
          </div>
          <p style={{ maxWidth: 340 }}>{l.body}</p>
        </Reveal>
        <Reveal className="team-grid">
          {l.members.map((m) => (
            <div className="team-card" key={m.role}>
              <div className="team-photo with-portrait-label" style={{ position: "relative" }}>
                <ImageOrPlaceholder src={m.photo} alt={`Portrait of ${m.name}, ${m.title}`} withLabel={false} />
              </div>
              <div className="team-body">
                <div className="team-role">{m.role}</div>
                <h3>{m.name}</h3>
                <div className="team-title">{m.title}</div>
                <p>{m.bio}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
