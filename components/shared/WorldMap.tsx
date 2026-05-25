"use client";

import dynamic from "next/dynamic";

const GlobeClient = dynamic(() => import("./GlobeClient"), {
  ssr: false,
  loading: () => (
    <div
      className="globe-skeleton"
      style={{ height: 420, width: "100%", position: "relative", overflow: "hidden" }}
      aria-hidden="true"
    >
      <div className="globe-skeleton-orb" />
    </div>
  ),
});

export function WorldMap({ height = 420 }: { height?: number } = {}) {
  return (
    <div className="map-visual" style={{ background: "transparent", border: 0 }}>
      <GlobeClient height={height} />
    </div>
  );
}
