import { about } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { Leadership } from "@/components/about/Leadership";
import { PhilosophyTimeline } from "@/components/about/PhilosophyTimeline";
import { Culture } from "@/components/about/Culture";
import { Corridor } from "@/components/about/Corridor";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata("/about");

export default function AboutPage() {
  return (
    <>
      <PageHead crumb={about.head.crumb} eyebrow={about.head.eyebrow} h1={about.head.h1} lede={about.head.lede} />
      <Leadership />
      <PhilosophyTimeline />
      <Culture />
      <Corridor />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "About", href: "/about" },
            ])
          ),
        }}
      />
    </>
  );
}
