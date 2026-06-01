import { Suspense } from "react";
import { contact } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { ContactInteractive } from "@/components/contact/ContactInteractive";
import { Reveal } from "@/components/layout/Reveal";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <PageHead crumb={contact.head.crumb} eyebrow={contact.head.eyebrow} h1={contact.head.h1} lede={contact.head.lede} />

      <section>
        <div className="container-tg">
          <Suspense fallback={null}>
            <ContactInteractive />
          </Suspense>

          <Reveal className="contact-foot">
            {contact.blocks.map((b) => (
              <div className="block" key={b.h4}>
                <h4>{b.h4}</h4>
                {b.lines.map((line, i) => {
                  const mono = "mono" in line && line.mono;
                  return (
                    <p key={i} className={mono ? "mono" : undefined}>{line.text}</p>
                  );
                })}
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
              { name: "Contact", href: "/contact" },
            ])
          ),
        }}
      />
    </>
  );
}
