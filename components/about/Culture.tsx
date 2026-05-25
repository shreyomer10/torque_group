import { about } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

export function Culture() {
  const c = about.culture;
  return (
    <section>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{c.eyebrow}</Eyebrow>
            <h2>{c.h2}</h2>
          </div>
        </Reveal>
        <Reveal className="industries">
          {c.principles.map((p) => (
            <div className="industry" key={p.num}>
              <div className="num">{p.num}</div>
              <h4>{p.title}</h4>
              <p>{p.desc}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
