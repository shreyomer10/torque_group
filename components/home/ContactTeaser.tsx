import { home } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/layout/Reveal";

export function ContactTeaser() {
  const c = home.contactTeaser;
  return (
    <section>
      <div className="container-tg">
        <Reveal className="contact-teaser">
          <div>
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2 style={{ marginTop: 8 }}>{c.h2}</h2>
            <p style={{ maxWidth: 560, marginTop: 8 }}>{c.body}</p>
          </div>
          <div>
            <LinkButton href={c.cta.href} withArrow>
              {c.cta.label}
            </LinkButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
