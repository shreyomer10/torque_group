"use client";

import { useEffect, useRef, useState } from "react";
import Globe, { type GlobeMethods } from "react-globe.gl";
import { home } from "@/content";

type Pin = { id: string; label: string; lat: number; lng: number };
const PINS: Pin[] = [...home.global.pins];

/**
 * Interactive 3D globe used in GlobalPresence and Corridor sections.
 * - Slow auto-rotate until the user grabs it.
 * - Pins glow at each office. Click/hover lifts a label.
 * - Loaded only on the client; size is responsive to the wrapping element.
 */
export default function GlobeClient({ height = 420 }: { height?: number }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<GlobeMethods | undefined>(undefined);
  const [size, setSize] = useState({ w: 0, h: 0 });
  const [interacted, setInteracted] = useState(false);

  // Responsive: clamp to the measured wrapper width AND a sensible mobile height
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const w = Math.max(240, Math.floor(entry.contentRect.width));
        // On narrow viewports, cap height to width so the sphere stays in frame
        const h = Math.min(height, Math.max(280, w * 1.05));
        setSize({ w, h });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, [height]);

  // Setup controls + auto-rotate
  useEffect(() => {
    const g = globeRef.current;
    if (!g) return;
    const controls = g.controls() as unknown as {
      autoRotate: boolean;
      autoRotateSpeed: number;
      enableZoom: boolean;
      addEventListener: (ev: string, cb: () => void) => void;
    };
    controls.autoRotate = !interacted;
    controls.autoRotateSpeed = 0.45;
    controls.enableZoom = false;
    const stop = () => setInteracted(true);
    controls.addEventListener("start", stop);

    // Point camera at India initially. Lower altitude = closer.
    g.pointOfView({ lat: 22, lng: 55, altitude: 1.8 }, 0);
  }, [interacted]);

  return (
    <div
      ref={wrapRef}
      className="globe-wrap"
      style={{
        width: "100%",
        height: size.h || height,
        maxWidth: "100%",
        position: "relative",
        overflow: "hidden",
        cursor: "grab",
        touchAction: "pan-y",
      }}
      aria-label="Interactive 3D globe of Torque Group offices"
    >
      {size.w > 0 && (
      <Globe
        ref={globeRef}
        width={size.w}
        height={size.h}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#486581"
        atmosphereAltitude={0.15}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        // Big glowing pin + label at each office
        htmlElementsData={PINS}
        htmlLat={(d: object) => (d as Pin).lat}
        htmlLng={(d: object) => (d as Pin).lng}
        htmlAltitude={0.06}
        htmlElement={(d: object) => {
          const pin = d as Pin;
          const el = document.createElement("div");
          el.className = "globe-pin";
          el.innerHTML = `
            <span class="globe-pin-dot"></span>
            <span class="globe-pin-label">${pin.label}</span>
          `;
          return el;
        }}
        // Pulsing rings to draw the eye
        ringsData={PINS}
        ringLat={(d: object) => (d as Pin).lat}
        ringLng={(d: object) => (d as Pin).lng}
        ringColor={() => (t: number) => `rgba(234,88,12,${1 - t})`}
        ringMaxRadius={5}
        ringPropagationSpeed={2.4}
        ringRepeatPeriod={1400}
        ringAltitude={0.01}
      />
      )}
    </div>
  );
}
