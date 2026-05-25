import Image from "next/image";
import { existsSync } from "node:fs";
import path from "node:path";

/**
 * Renders next/image if the file exists under public/, otherwise renders
 * the wireframe's grid-paper placeholder so the page never looks broken.
 */
export function ImageOrPlaceholder({
  src,
  alt,
  className = "",
  withLabel = true,
  fill = true,
  priority = false,
  sizes,
}: {
  src: string; // e.g. "/images/team/founder.jpg"
  alt: string;
  className?: string;
  withLabel?: boolean;
  fill?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const absolute = path.join(process.cwd(), "public", src.replace(/^\//, ""));
  const has = existsSync(absolute);

  if (!has) {
    return (
      <div
        className={`placeholder-grid ${withLabel ? "with-label" : ""} ${className}`.trim()}
        role="img"
        aria-label={alt}
        style={{ position: "absolute", inset: 0 }}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill={fill}
      sizes={sizes ?? "(max-width: 1080px) 100vw, 50vw"}
      priority={priority}
      className={className}
      style={{ objectFit: "cover" }}
    />
  );
}
