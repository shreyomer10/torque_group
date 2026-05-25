import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function Clients() {
  const c = home.clients;
  const slots = Array.from({ length: c.slots }, (_, i) => i + 1);
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
        <Reveal className="clients-grid">
          {slots.map((n) => (
            <div className="client-logo" key={n}>
              <span>CLIENT {String(n).padStart(2, "0")}</span>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
