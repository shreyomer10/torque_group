type MapPin = {
  id: string;
  label: string;
  tooltip: string[];
  lat: number;
  lng: number;
};

const FRAME_W = 1200;
const FRAME_H = 600;

const pins: MapPin[] = [
  {
    id: "hamburg",
    label: "Hamburg",
    tooltip: ["Hamburg · Germany", "Armaturen-Wolff LLP"],
    lat: 53.55,
    lng: 9.99,
  },
  {
    id: "dubai",
    label: "Dubai",
    tooltip: ["Dubai · UAE", "Regional service and sales presence"],
    lat: 25.2,
    lng: 55.27,
  },
  {
    id: "pune-mumbai",
    label: "Pune / Mumbai",
    tooltip: [
      "Pune · India",
      "Subhag Engineers · Torque Techniques Pune · Nulite",
      "Mumbai · India",
      "Torque Technics Institute",
    ],
    lat: 18.8,
    lng: 73.35,
  },
  {
    id: "chennai",
    label: "Chennai",
    tooltip: ["Chennai · India", "Torque Technics Chennai"],
    lat: 13.08,
    lng: 80.27,
  },
];

const project = (lat: number, lng: number) => ({
  left: `${((lng + 180) / 360) * 100}%`,
  top: `${((90 - lat) / 180) * 100}%`,
});

export function WorldMap({ height }: { height?: number } = {}) {
  return (
    <div className="map-visual map-world" style={height ? { height } : undefined}>
      <div
        className="map-world-frame"
        style={{ aspectRatio: `${FRAME_W} / ${FRAME_H}` }}
        aria-label="World map of Torque Group offices in India, Dubai and Germany"
        role="img"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="map-world-img" src="/world-map-real.svg" alt="" aria-hidden="true" />

        {pins.map((p) => (
          <span
            key={p.id}
            className={`map-world-pin map-world-pin-${p.id}`}
            style={project(p.lat, p.lng)}
            tabIndex={0}
          >
            <span className="map-world-dot" />
            <span className="map-world-tooltip">
              <span>{p.label}</span>
              {p.tooltip.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
