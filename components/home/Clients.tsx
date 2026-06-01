import type { CSSProperties } from "react";
import Image from "next/image";
import { home, clientLogos } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function Clients() {
  const c = home.clients;
  const count = clientLogos.length;
  // Duplicate the track so the -50% translate loops seamlessly.
  const track = [...clientLogos, ...clientLogos];

  return (
    <section>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2>{c.h2}</h2>
          </div>
          <p style={{ maxWidth: 340 }}>{c.body}</p>
        </Reveal>
      </div>

      {/* Full-bleed marquee: single horizontal row, constant speed, always running. */}
      <Reveal className="clients-marquee">
        <div className="clients-track" style={{ "--client-count": count } as CSSProperties}>
          {track.map((logo, i) => {
            // The marquee translates logos far outside the initial viewport,
            // where a lazy intersection observer never fires — leaving blank
            // cells on wide screens. The roster is small, so load every logo
            // eagerly. The duplicate pass is decorative and aria-hidden.
            const isDuplicate = i >= count;
            return (
              <div className="client-logo" key={`${logo.src}-${i}`} aria-hidden={isDuplicate}>
                <Image
                  src={logo.src}
                  alt={isDuplicate ? "" : logo.name}
                  fill
                  sizes="230px"
                  loading="eager"
                  style={{ objectFit: "contain" }}
                />
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
