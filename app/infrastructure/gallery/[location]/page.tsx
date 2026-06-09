import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { galleries, galleryOrder } from "@/content";
import { PageHead } from "@/components/ui/PageHead";
import { GalleryAlbum } from "@/components/infrastructure/GalleryAlbum";
import { breadcrumbJsonLd } from "@/lib/schema";
import { siteUrl } from "@/lib/seo";

export function generateStaticParams() {
  return galleryOrder.map((location) => ({ location }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string }> }): Promise<Metadata> {
  const { location } = await params;
  const g = galleries[location];
  if (!g) return {};

  const firstPhoto = g.photos[0];
  const image = firstPhoto
    ? firstPhoto.fullSrc ?? `${g.dir}/${firstPhoto.slug}-full.webp`
    : "/images/home/torquegrp.jpeg";
  const url = `${siteUrl}/infrastructure/gallery/${g.location}`;
  const title = `${g.name} - Photo Gallery | Torque Group`;

  return {
    title,
    description: g.blurb,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: g.blurb,
      url,
      siteName: "Torque Group",
      type: "website",
      images: [{ url: `${siteUrl}${image}`, alt: g.name }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: g.blurb,
      images: [`${siteUrl}${image}`],
    },
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
            <Link href="/infrastructure" className="btn btn-ghost btn-sm">Back to Infrastructure</Link>
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
