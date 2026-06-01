import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { galleries, galleryOrder } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { GalleryAlbum } from "@/components/infrastructure/GalleryAlbum";
import { breadcrumbJsonLd } from "@/lib/schema";

export function generateStaticParams() {
  return galleryOrder.map((location) => ({ location }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const g = galleries[location];
  if (!g) return {};
  return {
    title: `${g.name} — Photo Gallery · Torque Group`,
    description: g.blurb,
  };
}

export default async function GalleryPage({ params }: { params: Promise<{ location: string }> }) {
  const { location } = await params;
  const g = galleries[location];
  if (!g) notFound();

  return (
    <>
      <PageHead
        crumbs={[
          { label: "Infrastructure", href: "/infrastructure" },
          { label: "Gallery" },
        ]}
        eyebrow={g.facility}
        h1={g.name}
        lede={g.blurb}
      />

      <section>
        <div className="container-tg">
          <GalleryAlbum gallery={g} />
          <div style={{ marginTop: 36 }}>
            <Link href="/infrastructure" className="btn btn-ghost btn-sm">← Back to Infrastructure</Link>
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", href: "/" },
              { name: "Infrastructure", href: "/infrastructure" },
              { name: g.name, href: `/infrastructure/gallery/${g.location}` },
            ])
          ),
        }}
      />
    </>
  );
}
