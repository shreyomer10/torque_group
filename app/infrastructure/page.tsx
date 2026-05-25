import { infrastructure } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { InfraTile } from "@/components/infrastructure/InfraTile";
import { EquipmentTable } from "@/components/infrastructure/EquipmentTable";
import { Reveal } from "@/components/layout/Reveal";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata("/infrastructure");

export default function InfrastructurePage() {
  const i = infrastructure;
  return (
    <>
      <PageHead crumb={i.head.crumb} eyebrow={i.head.eyebrow} h1={i.head.h1} lede={i.head.lede} />

      <section>
        <div className="container-tg">
          <Reveal className="metrics">
            {i.metrics.map((m) => (
              <div className="metric" key={m.label}>
                <div className="num">{m.num}</div>
                <div className="lbl">{m.label}</div>
              </div>
            ))}
          </Reveal>

          <div style={{ height: 40 }} />

          <Reveal className="infra-grid">
            {i.tiles.map((t) => (
              <InfraTile
                key={t.id}
                id={t.id}
                size={t.size as "large" | "medium" | "small"}
                corner={t.corner}
                tag={t.tag}
                h4={t.h4}
                desc={t.desc}
              />
            ))}
          </Reveal>
        </div>
      </section>

      <section style={{ background: "var(--bg-alt)" }}>
        <div className="container-tg">
          <Reveal className="section-head">
            <div className="text">
              <Eyebrow>{i.equipment.eyebrow}</Eyebrow>
              <h2>{i.equipment.h2}</h2>
            </div>
          </Reveal>
          <Reveal>
            <EquipmentTable />
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Infrastructure", href: "/infrastructure" },
            ])
          ),
        }}
      />
    </>
  );
}
