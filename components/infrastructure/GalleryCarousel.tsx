import Link from "next/link";
import Image from "next/image";
import { carouselPhotos, galleries, type GalleryLocation } from "@/content";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Reveal } from "@/components/layout/Reveal";

/**
 * Preview strip on the Infrastructure page: shows the first few photos of a
 * location's album. Each photo (and the "View all" card) links to the full
 * /infrastructure/gallery/<location> page where the lightbox lives.
 */
export function GalleryCarousel({ location }: { location: GalleryLocation }) {
  const g = galleries[location];
  const preview = carouselPhotos(location, 5);
  const href = `/infrastructure/gallery/${location}`;
  const remaining = g.photos.length - preview.length;

  return (
    <Reveal>
      <div className="section-head">
        <div className="text">
          <Eyebrow>{g.facility}</Eyebrow>
          <h2>{g.name}</h2>
          <p style={{ maxWidth: 620, marginTop: 8 }}>{g.blurb}</p>
        </div>
        <Link href={href} className="btn btn-ghost btn-sm">
          View all {g.photos.length} photos →
        </Link>
      </div>

      <div className="gallery-carousel">
        {preview.map((p, i) => (
          <Link key={p.slug} href={href} className="gc-item" aria-label={`${p.title} — open ${g.name} gallery`}>
            <Image
              src={`${g.dir}/${p.slug}-thumb.webp`}
              alt={p.title}
              fill
              sizes="(max-width: 720px) 50vw, 18vw"
              loading={i < 2 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
            />
            <span className="gc-caption">{p.title}</span>
          </Link>
        ))}
        {remaining > 0 && (
          <Link href={href} className="gc-item gc-more" aria-label={`View all ${g.photos.length} photos`}>
            <span className="gc-more-num">+{remaining}</span>
            <span className="gc-more-label">View album →</span>
          </Link>
        )}
      </div>
    </Reveal>
  );
}
