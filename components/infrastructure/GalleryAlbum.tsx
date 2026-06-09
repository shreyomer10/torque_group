"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { Gallery } from "@/content";

export function GalleryAlbum({ gallery }: { gallery: Gallery }) {
  const photos = gallery.photos;
  const [open, setOpen] = useState<number | null>(null);
  const reduced = useReducedMotion();

  const close = useCallback(() => setOpen(null), []);
  const go = useCallback(
    (dir: number) =>
      setOpen((i) => (i === null ? null : (i + dir + photos.length) % photos.length)),
    [photos.length]
  );

  // Keyboard navigation + scroll lock while the lightbox is open.
  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, close, go]);

  const active = open === null ? null : photos[open];

  return (
    <>
      <div className="album-grid">
        {photos.map((p, i) => (
          <button
            key={p.slug}
            type="button"
            className="album-tile"
            onClick={() => setOpen(i)}
            aria-label={`Open ${p.title}`}
          >
            <Image
              src={p.thumbSrc ?? `${gallery.dir}/${p.slug}-thumb.webp`}
              alt={p.title}
              fill
              sizes="(max-width: 720px) 50vw, (max-width: 1080px) 33vw, 25vw"
              loading={i < 4 ? "eager" : "lazy"}
              style={{ objectFit: "cover" }}
            />
            <span className="album-caption">{p.title}</span>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={active.title}
            onClick={close}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button type="button" className="lb-close" onClick={close} aria-label="Close">✕</button>
            <button
              type="button"
              className="lb-nav lb-prev"
              onClick={(e) => { e.stopPropagation(); go(-1); }}
              aria-label="Previous photo"
            >‹</button>

            <motion.figure
              className="lb-figure"
              key={active.slug}
              onClick={(e) => e.stopPropagation()}
              initial={reduced ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="lb-image-wrap">
                <Image
                  src={active.fullSrc ?? `${gallery.dir}/${active.slug}-full.webp`}
                  alt={active.title}
                  fill
                  sizes="90vw"
                  priority
                  style={{ objectFit: "contain" }}
                />
              </div>
              <figcaption className="lb-caption">
                <span>{active.title}</span>
                <span className="lb-count">{(open ?? 0) + 1} / {photos.length}</span>
              </figcaption>
            </motion.figure>

            <button
              type="button"
              className="lb-nav lb-next"
              onClick={(e) => { e.stopPropagation(); go(1); }}
              aria-label="Next photo"
            >›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
