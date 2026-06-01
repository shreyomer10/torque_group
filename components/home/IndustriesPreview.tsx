import { home, industries } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/layout/Reveal";

// Short labels for the home-page preview; full descriptions live on /industries.
const PREVIEW = [
  { n: "01", h: "Marine", p: "Hydraulic machinery repairs, maintenance, spares, consultancy and shipboard service — alongside pumps and valves across merchant fleets." },
  { n: "02", h: "Shipbuilding", p: "New-build supply of valves, pumping systems and IMO signage packages." },
  { n: "03", h: "Offshore", p: "Process valves, hydraulic systems and retrofit engineering for offshore assets." },
  { n: "04", h: "Industrial Manufacturing", p: "Pumping infrastructure and engineered process systems for plants." },
  { n: "05", h: "Marine Safety", p: "IMO-compliant signages and shipboard safety equipment via Nulite." },
  { n: "06", h: "Technical Training", p: "Marine engineer cadet training, simulator and practical workshop programmes." },
];

export function IndustriesPreview() {
  const i = home.industriesPreview;
  return (
    <section>
      <div className="container-tg">
        <Reveal className="section-head">
          <div className="text">
            <Eyebrow>{i.eyebrow}</Eyebrow>
            <h2>{i.h2}</h2>
          </div>
          <LinkButton href={i.cta.href} variant="ghost">{i.cta.label}</LinkButton>
        </Reveal>
        <Reveal className="industries">
          {PREVIEW.map((row) => (
            <div className="industry" key={row.n}>
              <div className="num">{row.n}</div>
              <h4>{row.h}</h4>
              <p>{row.p}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
