import Image from "next/image";
import type { Company } from "@/content";
import { companiesPage } from "@/content";
import { LinkButton } from "@/components/ui/Button";
import { Reveal } from "@/components/layout/Reveal";

const LOGO_FOR: Record<string, string> = {
  institute: "/assets/logos/ttmumbai.jpg",
  chennai:   "/assets/logos/ttChennai.jpeg",
  ttpune:    "/assets/logos/ttChennai.jpeg",
  subhags:   "/assets/logos/shubags.png",
  nulite:    "/assets/logos/nulite.png",
  wolff:     "/assets/logos/wold.png",
};

export function CompanyBlock({ company }: { company: Company }) {
  const c = company;
  return (
    <Reveal className="company" id={c.id}>
      <div className="company-body">
        <span className="index">{c.code.replace("·", "/")} · {c.discipline}</span>
        <h3>{c.name}</h3>
        <div className="role-line">{c.role}</div>
        <p>{c.body}</p>
        <ul>
          {c.spec.map((s) => (
            <li key={s.label}><span>{s.label}</span><span>{s.value}</span></li>
          ))}
        </ul>
        <div className="company-cta">
          <LinkButton href={c.website} size="sm" external>{companiesPage.ctas.visit}</LinkButton>
          <LinkButton href={`/contact?co=${c.id}`} size="sm" variant="ghost">{companiesPage.ctas.inquire}</LinkButton>
        </div>
      </div>
      <div className="company-visual">
        <div className="company-logo">
          <Image
            src={LOGO_FOR[c.id]}
            alt={`${c.name} logo`}
            fill
            sizes="(max-width: 1080px) 100vw, 50vw"
            style={{ objectFit: "contain" }}
          />
        </div>
        <div className="spec">
          {c.chips.map((chip) => (
            <div key={chip.label}>
              <span>{chip.label}</span>
              <strong>{chip.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}
