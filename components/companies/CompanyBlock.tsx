import type { Company } from "@/content";
import { companiesPage } from "@/content";
import { LinkButton } from "@/components/ui/Button";
import { ImageOrPlaceholder } from "@/components/shared/ImageOrPlaceholder";
import { Reveal } from "@/components/layout/Reveal";

const IMAGE_FOR: Record<string, string> = {
  institute: "/images/companies/institute.jpg",
  chennai:   "/images/companies/chennai.jpg",
  subhags:   "/images/companies/subhags.jpg",
  nulite:    "/images/companies/nulite.jpg",
  wolff:     "/images/companies/wolff.jpg",
};

const CORNER_FOR: Record<string, string> = {
  institute: "INSTITUTE · MUMBAI",
  chennai:   "TT · CHENNAI",
  subhags:   "SUBHAGS · PUNE",
  nulite:    "NULITE",
  wolff:     "WOLFF · HAMBURG",
};

export function CompanyBlock({ company, reverse = false }: { company: Company; reverse?: boolean }) {
  const c = company;
  return (
    <Reveal className={`company ${reverse ? "reverse" : ""}`} id={c.id}>
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
        <ImageOrPlaceholder src={IMAGE_FOR[c.id]} alt={`${c.name} — ${c.discipline.toLowerCase()}`} />
        <div className="overlay" />
        <div className="corner-tag">{CORNER_FOR[c.id]}</div>
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
