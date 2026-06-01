import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";
import { ImageOrPlaceholder } from "@/components/shared/ImageOrPlaceholder";
import { TeamCardBody } from "./TeamCardBody";

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
        </Reveal>
        <Reveal className="team-grid">
          {l.members.map((m, i) => (
            <div className="team-card" key={m.name}>
              <div className="team-photo">
                <div className="team-photo-circle">
                  <ImageOrPlaceholder
                    src={m.photo}
                    alt={`Portrait of ${m.name}, ${m.title}`}
                    withLabel
                    objectFit="cover"
                    priority={i === 0}
                    sizes="(max-width: 1080px) 50vw, 180px"
                  />
                </div>
              </div>
              <TeamCardBody m={m} />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
