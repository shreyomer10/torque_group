import Link from "next/link";
import { ImageOrPlaceholder } from "@/components/shared/ImageOrPlaceholder";

type Size = "large" | "medium" | "small";

export function InfraTile({
  id, size, corner, tag, h4, desc, image, href, photoCount,
}: {
  id: string; size: Size; corner: string; tag: string; h4: string; desc?: string;
  image?: string;       // explicit image src (else falls back to /images/infrastructure/<id>.jpg)
  href?: string;        // if set, the whole tile links to a gallery
  photoCount?: number;  // shows a "View N photos" affordance
}) {
  const inner = (
    <>
      <div className="img-area">
        <ImageOrPlaceholder
          src={image ?? `/images/infrastructure/${id}.jpg`}
          alt={h4}
          withLabel
          sizes="(max-width: 1080px) 100vw, 50vw"
        />
        {href && photoCount ? (
          <span className="infra-gallery-badge">{photoCount} PHOTOS →</span>
        ) : null}
      </div>
      <div className="corner-tag">{corner}</div>
      <div className="label-area">
        <div className="tag">{tag}</div>
        <h4>{h4}</h4>
        {desc && <p>{desc}</p>}
        {href ? <span className="infra-gallery-link">View gallery →</span> : null}
      </div>
    </>
  );

  if (href) {
    return (
      <Link className={`infra-tile ${size} is-link`} href={href} aria-label={`${h4} — view gallery`}>
        {inner}
      </Link>
    );
  }

  return <div className={`infra-tile ${size}`}>{inner}</div>;
}
