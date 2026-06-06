import { industries } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata("/industries");

export default function IndustriesPage() {
  const i = industries;
  return (
    <>
      <PageHead crumb={i.head.crumb} eyebrow={i.head.eyebrow} h1={i.head.h1} lede={i.head.lede} />

      <section>
        <div className="container-tg">
          <Reveal className="industries">
            {i.sectors.map((s) => (
              <div className="industry" key={s.code}>
                <div className="num">{s.code}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section>
        <div className="container-tg">
          <Reveal className="section-head">
            <div className="text">
              <Eyebrow>{i.workflow.eyebrow}</Eyebrow>
              <h2>{i.workflow.h2}</h2>
            </div>
          </Reveal>
          <Reveal className="workflow">
            {i.workflow.steps.map((s) => (
              <div className="step" key={s.code}>
                <div className="step-num">{s.code}</div>
                <h5>{s.title}</h5>
                <p>{s.desc}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Industries", href: "/industries" },
            ])
          ),
        }}
      />
    </>
  );
}
