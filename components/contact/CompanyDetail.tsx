import { companies, type CompanyId } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LinkButton } from "@/components/ui/Button";

const LOCATION_BY: Record<CompanyId, string> = {
  institute: "Mumbai, IN",
  chennai:   "Chennai, IN",
  subhags:   "Pune, IN",
  nulite:    "India",
  wolff:     "Hamburg, Germany",
};

export function CompanyDetail({ id }: { id: CompanyId }) {
  const c = companies[id];
  return (
    <div className="cd">
      <Eyebrow>{`${c.code} · ${c.discipline}`}</Eyebrow>
      <h3>{c.name}</h3>
      <p className="mono">{c.email}</p>
      <p className="mono">{c.phone ? `${c.phone} · ${LOCATION_BY[id]}` : LOCATION_BY[id]}</p>
      <p>{c.blurb}</p>
      <LinkButton href={c.website} variant="ghost" size="sm" external>
        Visit company site →
      </LinkButton>
    </div>
  );
}
