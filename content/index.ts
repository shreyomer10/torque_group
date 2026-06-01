/**
 * Torque Group — Site Content
 *
 * Single source of truth for every string on the website.
 * Components import from here. No hard-coded copy in JSX.
 *
 * Convention:
 *   - `eyebrow` = small uppercase mono label above a heading
 *   - `h1`/`h2`/`h3`/`h4` = headings (HTML hierarchy)
 *   - `body` = paragraph copy (string or string[])
 *   - `cta` = { label, href }
 *   - IDs (`institute`, `chennai`, `subhags`, `nulite`, `wolff`) are the
 *     stable slugs used for routing, anchors, and the inquiry-form
 *     ?co= query param. Do not rename without a redirect.
 */

// Client logo roster (home-page marquee). Kept in its own file for clarity.
export { clientLogos, type ClientLogo } from "./clients";

// Infrastructure photo galleries (per-location albums + carousel).
export {
  galleries,
  galleryOrder,
  carouselPhotos,
  type Gallery,
  type GalleryPhoto,
  type GalleryLocation,
} from "./infrastructure-gallery";

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

export type CompanyId = "institute" | "chennai" | "subhags" | "nulite" | "wolff";

export interface CTA {
  label: string;
  href: string;
}

export interface Company {
  id: CompanyId;
  order: number;            // 01–05
  code: string;             // "CO · 01"
  discipline: string;       // "TECHNICAL TRAINING"
  name: string;
  shortName: string;        // for picker tiles & nav
  role: string;             // tagline / city
  city: string;
  country: "IN" | "DE";
  blurb: string;            // 1-line for nav, ecosystem nodes
  body: string;             // full description on /companies
  spec: { label: string; value: string }[];
  chips: { label: string; value: string }[];
  website: string;
  email: string;
  phone: string;
  address: string;          // postal address for contact / map enquiry
  picker: { line1: string; line2: string }; // contact picker tile
  seoKeywords: string[];
}

// ---------------------------------------------------------------------------
// BRAND / GLOBAL
// ---------------------------------------------------------------------------

export const brand = {
  name: "Torque Group",
  shortName: "TORQUE GROUP",
  sub: "Maritime · Engineering · Since 1998",
  tagline: "Engineering Maritime Excellence Since 1998",
  established: 1998,
  yearsLegacy: "25+",
  countries: ["India", "Germany"] as const,
  cities: ["Pune", "Mumbai", "Chennai", "Hamburg"] as const,
  companyCount: 5,
  group: {
    email: "pune@torquetechnic.com",
    phone: "+91 99224 40667",
    address: "Plot No. 34, Poona Small Scale Industrial Estate, Gultekdi, Pune – 411 037, India",
  },
  contact: {
    email: "pune@torquetechnic.com",
    phone: "+91 99224 40667",
  },
  languages: ["EN", "DE", "HI", "TA", "MR"] as const,
} as const;

// ---------------------------------------------------------------------------
// NAVIGATION
// ---------------------------------------------------------------------------

export const nav = {
  links: [
    { href: "/",               label: "Home" },
    { href: "/about",          label: "About" },
    { href: "/companies",      label: "Group Companies" },
    { href: "/infrastructure", label: "Infrastructure" },
    { href: "/industries",     label: "Industries Served" },
  ] as const,
  cta: { label: "Get In Touch", href: "/contact" } satisfies CTA,
} as const;

// ---------------------------------------------------------------------------
// COMPANIES (single source for /companies, ecosystem, picker, footer, etc.)
// ---------------------------------------------------------------------------

export const companies: Record<CompanyId, Company> = {
  institute: {
    id: "institute",
    order: 1,
    code: "CO · 01",
    discipline: "TECHNICAL TRAINING",
    name: "Torque Technics Institute",
    shortName: "Torque Technics Institute",
    role: "Marine Technical Training Centre · Mumbai",
    city: "Mumbai",
    country: "IN",
    blurb: "Marine technical training centre — Mumbai workshops & labs.",
    body:
      "One of the largest practical marine technical training centres in Mumbai. The Institute operates hands-on workshops covering turbocharger overhaul, purifier systems, marine pumps, industrial machinery exposure and full engine-room practical environments for marine cadets.",
    spec: [
      { label: "Programmes", value: "CADET · PRE-SEA · POST-SEA" },
      { label: "Workshops",  value: "TURBOCHARGER · PURIFIER · PUMPS" },
      { label: "Capacity",   value: "500+ CADETS / YR" },
      { label: "Approvals",  value: "DGS · MARITIME REGULATOR" },
      { label: "Location",   value: "MUMBAI · IN" },
    ],
    chips: [
      { label: "LABS",        value: "06" },
      { label: "BAYS",        value: "Turbo · Purifier" },
      { label: "CADETS / YR", value: "500+" },
    ],
    website: "https://www.torquetechnicsinstitute.com",
    email: "pune@torquetechnic.com",
    phone: "",
    address: "Office No. 114, Sharad Industrial Estate, Lake Rd, opp. Maruti Service Center, Bhandup West, Mumbai, Maharashtra 400078",
    picker: { line1: "Torque Technics Institute", line2: "Marine training · Mumbai" },
    seoKeywords: [
      "marine technical training Mumbai",
      "DG Shipping approved cadet training",
      "engine room simulator India",
    ],
  },
  chennai: {
    id: "chennai",
    order: 2,
    code: "CO · 02",
    discipline: "MARINE REPAIR",
    name: "Torque Technics Chennai",
    shortName: "Torque Technics Chennai",
    role: "Shipboard Hydraulic Repair Workshop · Chennai",
    city: "Chennai",
    country: "IN",
    blurb: "Shipboard hydraulic repair workshop and marine maintenance.",
    body:
      "Workshop-heavy marine maintenance company focused on shipboard hydraulic system repair — steering gears, hatch covers, deck machinery, cranes and hydraulic power packs. Field engineers operate across the globe.",
    spec: [
      { label: "Capability", value: "HYDRAULIC REPAIR · DECK MACHINERY" },
      { label: "Service",    value: "WORKSHOP + SHIPBOARD" },
      { label: "Coverage",   value: "ACROSS THE GLOBE" },
      { label: "Location",   value: "CHENNAI · IN" },
    ],
    chips: [
      { label: "FOCUS",    value: "Hydraulics" },
      { label: "SERVICE",  value: "Shipboard" },
      { label: "RESPONSE", value: "24 / 7" },
    ],
    website: "https://www.torquetechnics.com",
    email: "info@torquetechnics.com",
    phone: "+91 44 2525 2555",
    address: "37/20, 3rd Lane, North Beach Road, Chennai – 600 001",
    picker: { line1: "TT Chennai", line2: "Hydraulic repair · Chennai" },
    seoKeywords: [
      "shipboard hydraulic repair Chennai",
      "marine steering gear overhaul India",
      "deck machinery repair",
    ],
  },
  subhags: {
    id: "subhags",
    order: 3,
    code: "CO · 03",
    discipline: "MANUFACTURING",
    name: "Subhag Engineers Pvt. Ltd.",
    shortName: "Subhag Engineers",
    role: "Marine & Industrial Pump Manufacturing · Pune",
    city: "Pune",
    country: "IN",
    blurb: "Marine & industrial pump manufacturing, spares and systems.",
    body:
      "Subhag Engineers Pvt. Ltd. engineers, manufactures and supplies marine and industrial pumps, spares and complete pumping systems. The company operates an in-house machining, assembly and pressure-testing facility serving shipyards, port operators and industrial plants.",
    spec: [
      { label: "Capability", value: "PUMP MFG · SPARES · SYSTEMS" },
      { label: "Sector",     value: "MARINE · INDUSTRIAL" },
      { label: "Workshop",   value: "4,200 m²" },
      { label: "Approvals",  value: "ISO 9001 · IRS" },
      { label: "Location",   value: "PUNE · IN" },
    ],
    chips: [
      { label: "FOUNDED", value: "1998" },
      { label: "FOCUS",   value: "Marine Pumps" },
      { label: "SUPPLY",  value: "40+ Yards" },
    ],
    website: "https://www.subhags.com",
    email: "sepl@subhagmail.com",
    phone: "+91 20 2426 1679",
    address: "Gat No. 64, Sasewadi, Tal.: Bhor, Dist.: Pune – 412 205",
    picker: { line1: "Subhag Engineers", line2: "Pump mfg · Pune" },
    seoKeywords: [
      "marine pump manufacturer India",
      "ISO 9001 IRS pump factory Pune",
      "industrial pump supplier India",
    ],
  },
  nulite: {
    id: "nulite",
    order: 4,
    code: "CO · 04",
    discipline: "MARINE SAFETY",
    name: "Nulite",
    shortName: "Nulite",
    role: "IMO Signages & Maritime Safety Systems",
    city: "India",
    country: "IN",
    blurb: "IMO signages and maritime safety systems for shipboard use.",
    body:
      "Manufacturer and supplier of IMO-compliant signages, photo-luminescent escape systems and shipboard safety products. Output is used during new-build, dry-dock and compliance retrofit campaigns.",
    spec: [
      { label: "Products",   value: "IMO SIGNAGE · SAFETY SYSTEMS" },
      { label: "Compliance", value: "IMO · SOLAS · IACS" },
      { label: "Use Cases",  value: "NEW-BUILD · RETROFIT · DRY-DOCK" },
      { label: "Location",   value: "IN" },
    ],
    chips: [
      { label: "STANDARD", value: "IMO / SOLAS" },
      { label: "FOCUS",    value: "Safety Sys." },
      { label: "SCOPE",    value: "Shipboard" },
    ],
    website: "https://www.nulite.in",
    email: "mail@nulite.co.in",
    phone: "+91 20 2426 1679",
    address: "Plot No. 34, Poona Small Scale Industrial Estate, Gultekdi, Pune – 411 037",
    picker: { line1: "Nulite", line2: "Safety systems" },
    seoKeywords: [
      "IMO signage manufacturer",
      "SOLAS compliant safety signage",
      "photoluminescent marine signage",
    ],
  },
  wolff: {
    id: "wolff",
    order: 5,
    code: "CO · 05",
    discipline: "VALVE ENGINEERING",
    name: "Armaturen-Wolff LLP",
    shortName: "Armaturen-Wolff",
    role: "German Maritime Valve Engineering · Hamburg, Germany",
    city: "Hamburg",
    country: "DE",
    blurb: "German maritime valve engineering and precision systems.",
    body:
      "Armaturen-Wolff designs and supplies maritime valves and precision flow-control systems engineered to German industrial standards. Output is used in shipbuilding, offshore and industrial process applications worldwide.",
    spec: [
      { label: "Capability", value: "VALVES · FLOW CONTROL · FITTINGS" },
      { label: "Sector",     value: "MARINE · OFFSHORE · PROCESS" },
      { label: "Standards",  value: "DIN · ISO · IACS" },
      { label: "Heritage",   value: "GERMAN ENGINEERING" },
      { label: "Location",   value: "HAMBURG · DE" },
    ],
    chips: [
      { label: "STANDARDS", value: "DIN / ISO" },
      { label: "EXPORT",    value: "Global" },
      { label: "OUTPUT",    value: "Marine Valves" },
    ],
    website: "https://www.armaturen-wolff.de",
    email: "awllp@awllpindia.com",
    phone: "+49 40 532 873-0",
    address: "Oehleckerring 29, 22419 Hamburg, Germany",
    picker: { line1: "Armaturen-Wolff", line2: "Valves · Hamburg" },
    seoKeywords: [
      "marine valve manufacturer Germany",
      "DIN ISO IACS valve",
      "flow control valves shipbuilding",
    ],
  },
};

export const companyOrder: CompanyId[] = [
  "institute", "chennai", "subhags", "nulite", "wolff",
];

// ---------------------------------------------------------------------------
// HOME
// ---------------------------------------------------------------------------

export const home = {
  hero: {
    eyebrow: "TORQUE GROUP · EST. 1998",
    h1: "Engineering Maritime Excellence Since 1998",
    lede: "MANUFACTURING · MARINE SERVICES · TECHNICAL TRAINING · INDUSTRIAL SOLUTIONS",
    body:
      "A multi-company maritime engineering holding group operating manufacturing infrastructure, marine repair workshops, technical training systems and industrial engineering services across India and Germany.",
    ctas: [
      { label: "Explore Group Companies", href: "/companies" },
      { label: "Contact Us",              href: "/contact"   },
    ] satisfies CTA[],
    stats: [
      { num: "25+", label: "Years Legacy"      },
      { num: "05",  label: "Group Companies"   },
      { num: "04",  label: "Operational Cities" },
    ],
    visualRef:    "REF · TG/2026/HERO/001",
    visualMeta:   "MARINE MAIN ENGINE OVERHAUL · MUMBAI WORKSHOP",
    visualIndex:  "01 / 05",
  },

  ecosystem: {
    eyebrow: "GROUP STRUCTURE",
    h2: "One engineering ecosystem.\nFive operating companies.",
    parent: {
      eyebrow: "PARENT GROUP",
      title:   "TORQUE GROUP",
      body:
        "Maritime engineering holding company coordinating manufacturing, marine services, training and industrial systems across five specialised companies.",
      badges: ["EST · 1998", "IN · DE"],
    },
  },

  overview: {
    eyebrow: "GROUP OVERVIEW",
    h2: "Operational capability across the maritime engineering chain",
    body:
      "From valve manufacturing in Germany to hydraulic shipboard repair in Chennai — Torque Group delivers end-to-end maritime engineering under one operational umbrella.",
    metrics: [
      { num: "25+",  label: "Years Legacy", desc: "Over two decades of maritime engineering operations." },
      { num: "05",   label: "Companies",    desc: "Specialised engineering companies under one group." },
      { num: "02",   label: "Countries",    desc: "India and Germany operational footprint." },
      { num: "12K+", label: "M² Workshops", desc: "Combined workshop, factory and training area." },
      { num: "500+", label: "Cadets / Yr",  desc: "Trained at Torque Technics Institute, Mumbai." },
      { num: "IACS", label: "Approvals",    desc: "Class-society and IMO-aligned compliance." },
    ],
  },

  industriesPreview: {
    eyebrow: "INDUSTRIES SERVED",
    h2: "Where Torque Group operates",
    cta: { label: "Industries Detail", href: "/industries" } satisfies CTA,
  },

  clients: {
    eyebrow: "CLIENTS",
    h2: "Trusted by shipyards, fleet operators and industrial plants",
    body:
      "A working roster of marine, shipbuilding, offshore and industrial customers across India and overseas.",
  },

  global: {
    eyebrow: "GLOBAL PRESENCE",
    h2: "Operational across India and Germany",
    offices: [
      { code: "CO · 03", city: "Pune · India",       desc: "Group head office and Subhag Engineers pump manufacturing facility." },
      { code: "CO · 01", city: "Mumbai · India",     desc: "Torque Technics Institute — marine technical training infrastructure." },
      { code: "CO · 02", city: "Chennai · India",    desc: "Torque Technics Chennai — shipboard hydraulic repair workshop." },
      { code: "CO · 05", city: "Hamburg · Germany",  desc: "Armaturen-Wolff LLP — maritime valve engineering operations." },
    ],
    pins: [
      { id: "hamburg", label: "HAMBURG · DE", lat: 53.55, lng:  9.99 },
      { id: "pune",    label: "PUNE",         lat: 18.52, lng: 73.85 },
      { id: "mumbai",  label: "MUMBAI",       lat: 19.07, lng: 72.87 },
      { id: "chennai", label: "CHENNAI",      lat: 13.08, lng: 80.27 },
    ],
  },

  contactTeaser: {
    eyebrow: "CONTACT",
    h2: "Route your inquiry to the right company.",
    body:
      "Pumps, valves, training, hydraulic repair or IMO signage — our enterprise inquiry desk forwards your request to the correct company within one business day.",
    cta: { label: "Open Inquiry Desk", href: "/contact" } satisfies CTA,
  },
} as const;

// ---------------------------------------------------------------------------
// ABOUT
// ---------------------------------------------------------------------------

export const about = {
  head: {
    crumb: "About Group",
    eyebrow: "ABOUT TORQUE GROUP",
    h1: "Three decades of maritime engineering — built company by company.",
    lede:
      "Torque Group operates as the parent of five specialised maritime engineering companies, each with its own operating heritage. Together they form a single industrial ecosystem covering manufacturing, marine services, training and engineering execution.",
  },

  leadership: {
    eyebrow: "LEADERSHIP",
    h2: "The people behind the group",
    members: [
      {
        role: "CO-FOUNDER · CHIEF ENGINEER (MEO CLASS-I)",
        name: "Mr. Sanjeev Ogale",
        title: "Co-founder · Director",
        summary:
          "Marine Engineer Officer Class I and ISO 9001:2015 Lead Auditor.",
        bio:
          "Marine Engineer Officer Class I (Ch. Engr.) and ISO 9001:2015 Lead Auditor with sea service from 1983 to 2000. Co-founder of the group, leading marine training, dredger technical management and IMO-compliant marine equipment. Government-licensed surveyor and long-serving Chairman of the Institute of Marine Engineers, Pune Branch.",
        photo: "/images/team/sanjeev-ogale.webp",
      },
      {
        role: "CO-FOUNDER · CHIEF ENGINEER (MEO CLASS-I)",
        name: "Mr. Girish Kotwal",
        title: "Co-founder · Director",
        summary:
          "Chief Engineer Marine with shore experience managing international tanker fleets.",
        bio:
          "Chief Engineer Marine (MEO Class-I) with shore-based experience as Technical Manager and Superintendent managing tanker fleets for international owners. Drives the group's technical management, marine training and the manufacture of pumps, valves and shipboard safety systems.",
        photo: "/images/team/girish-kotwal.webp",
      },
    ],
  },

  philosophy: {
    eyebrow: "ENGINEERING LEGACY",
    h2: "Operational philosophy",
    paragraphs: [
      "The group was founded on a single discipline — building, repairing and operating the mechanical systems that move ships. Every company retains that engineering-first culture: drawings on the wall, tools in hand, machines on the floor.",
      "Decisions are taken in workshops, not boardrooms. Specifications are tightened on the bench. The work proves itself when the vessel returns to service.",
    ],
    badges: ["EST · 1998", "FAMILY-RUN", "ENGINEER-LED", "CLASS-ALIGNED"],
  },

  visionMission: {
    vision:
      "To be the maritime engineering reference point for India and Germany — building, repairing and training the systems that keep ships moving.",
    mission:
      "Deliver class-aligned engineering across the full vessel lifecycle — from pump and valve manufacturing through shipboard repair, retrofit and crew training — under one operational group.",
  },

  milestones: {
    eyebrow: "MILESTONES · 1998 — 2026",
    h2: "Group evolution",
    items: [
      { year: "1998", title: "Subhag Engineers founded",          desc: "Marine pump manufacturing operation established in Pune." },
      { year: "2001", title: "Torque Technics Institute — Mumbai", desc: "Marine technical training centre opens with practical workshops and labs." },
      { year: "2012", title: "Torque Technics Chennai",           desc: "Shipboard hydraulic repair workshop commissioned in Chennai." },
      { year: "2018", title: "Nulite — Marine Safety Systems",    desc: "IMO signage and shipboard safety products company added to the group." },
      { year: "2022", title: "Armaturen-Wolff LLP · Germany",    desc: "German maritime valve engineering capability integrated under the group umbrella." },
    ],
  },

  culture: {
    eyebrow: "CULTURE",
    h2: "How we operate as a group",
    principles: [
      { num: "P · 01", title: "Engineering-first",         desc: "Every company is run by engineers. Drawings, tolerances and trials lead decisions." },
      { num: "P · 02", title: "Workshop discipline",       desc: "Real workshops, real machinery — capability is built on the bench, not the brochure." },
      { num: "P · 03", title: "Class-aligned",             desc: "Work performed to IRS, IACS, DIN and IMO standards as the operational baseline." },
      { num: "P · 04", title: "International collaboration", desc: "German engineering precision integrated with Indian operational scale." },
      { num: "P · 05", title: "Training continuity",       desc: "The Institute supplies the engineering pipeline that operates the group itself." },
      { num: "P · 06", title: "Long-cycle thinking",       desc: "We design, build and support over the full vessel and plant lifecycle." },
    ],
  },

  corridor: {
    eyebrow: "INTERNATIONAL COLLABORATION",
    h2: "India ↔ Germany",
    body:
      "The group operates a working corridor between Indian manufacturing & service scale and German maritime valve engineering. The two sides share specifications, drawings and approvals — keeping product output internationally consistent.",
    footnote: "Operating Languages · EN · DE · HI · TA · MR",
  },
} as const;

// ---------------------------------------------------------------------------
// COMPANIES (page header)
// ---------------------------------------------------------------------------

export const companiesPage = {
  head: {
    crumb: "Group Companies",
    eyebrow: "FIVE COMPANIES · ONE ECOSYSTEM",
    h1: "Group Companies",
    lede:
      "Each company operates independently with its own engineering focus and customer base, while sharing group-wide standards for quality, procurement and class compliance.",
  },
  ctas: {
    visit:   "Visit Company →",
    inquire: "Inquire",
  },
} as const;

// ---------------------------------------------------------------------------
// INFRASTRUCTURE
// ---------------------------------------------------------------------------

export const infrastructure = {
  head: {
    crumb: "Infrastructure",
    eyebrow: "WORKSHOPS · FACTORIES · LABS",
    h1: "Operational infrastructure",
    lede:
      "Across Pune, Mumbai, Chennai and Hamburg the group operates a combined footprint of manufacturing floors, hydraulic workshops, marine training labs and engineering execution facilities.",
  },
  metrics: [
    { num: "12K+", label: "M² Combined"    },
    { num: "04",   label: "Cities"         },
    { num: "04",   label: "Facilities"     },
    { num: "22",   label: "Workshop Bays"  },
    { num: "06",   label: "Training Labs"  },
    { num: "24/7", label: "Field Service"  },
  ],
  tiles: [
    {
      id: "mumbai-workshop",
      size: "large",
      corner: "FACILITY · 01 · MUMBAI",
      tag:    "MARINE TRAINING WORKSHOP",
      h4:     "Torque Technics Institute — practical workshops",
      desc:   "Turbocharger overhaul, purifier systems, marine pumps, hydraulic and engine-room practical bays.",
      image:  "bg-workshop",
      galleryImage: "/images/infrastructure/mumbai/mumbai-01-thumb.webp",
      galleryHref:  "/infrastructure/gallery/mumbai",
    },
    {
      id: "pune-factory",
      size: "medium",
      corner: "FACILITY · 02 · PUNE",
      tag:    "MANUFACTURING",
      h4:     "Subhag Engineers pump factory",
      desc:   "Machining, assembly and pressure-test cells for marine and industrial pump systems.",
      image:  "bg-factory",
    },
    {
      id: "chennai-hyd",
      size: "small",
      corner: "FACILITY · 03 · CHENNAI",
      tag:    "HYDRAULIC REPAIR",
      h4:     "Shipboard hydraulics workshop",
      desc:   "Cylinder, valve-block, power-pack and deck-machinery overhaul lines.",
      image:  "bg-hyd",
      galleryImage: "/images/infrastructure/chennai/workshop-thumb.webp",
      galleryHref:  "/infrastructure/gallery/chennai",
    },
    {
      id: "hamburg-valve",
      size: "small",
      corner: "FACILITY · 04 · HAMBURG",
      tag:    "VALVE ENGINEERING",
      h4:     "Armaturen-Wolff workshop",
      desc:   "Precision valve machining, assembly and flow-control test benches built to German maritime standards.",
      image:  "bg-valve",
    },
  ],
  equipment: {
    eyebrow: "EQUIPMENT INVENTORY",
    h2: "Selected workshop & lab equipment",
    rows: [
      { equipment: "Turbocharger overhaul bay", company: "Institute",   location: "Mumbai",  use: "Training / Service" },
      { equipment: "Marine pump test rig",      company: "Subhag",     location: "Pune",    use: "Pressure / Flow Test" },
      { equipment: "Purifier overhaul workshop", company: "Institute",  location: "Mumbai",  use: "Training" },
      { equipment: "Hydraulic cylinder honing", company: "TT Chennai",  location: "Chennai", use: "Repair" },
      { equipment: "Engine-room simulator",     company: "Institute",   location: "Mumbai",  use: "Cadet Training" },
      { equipment: "CNC machining centre",      company: "Subhag",     location: "Pune",    use: "Pump Components" },
      { equipment: "Valve test bench",          company: "Wolff",       location: "Hamburg", use: "QC / Certification" },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// INDUSTRIES SERVED
// ---------------------------------------------------------------------------

export const industries = {
  head: {
    crumb: "Industries Served",
    eyebrow: "INDUSTRIES SERVED",
    h1: "Maritime, offshore, industrial — wherever engineered systems run.",
    lede:
      "Output from Torque Group companies reaches merchant fleets, shipbuilders, offshore operators, industrial plants and marine training programmes across India and overseas yards.",
  },
  sectors: [
    { code: "SECTOR · 01", title: "Marine — Merchant Fleet",     desc: "Hydraulic machinery repairs, maintenance, spares, consultancy and shipboard service — with pumps, valves and hydraulics for cargo, container and tanker fleets in operation." },
    { code: "SECTOR · 02", title: "Shipbuilding & Yards",        desc: "New-build supply of valves, pumping systems and IMO signage to Indian and international shipyards." },
    { code: "SECTOR · 03", title: "Offshore & Energy",           desc: "Process valves, hydraulic systems and retrofit engineering for offshore support vessels and platforms." },
    { code: "SECTOR · 04", title: "Industrial Manufacturing",    desc: "Engineered pumping infrastructure and process flow systems for industrial plants and utilities." },
    { code: "SECTOR · 05", title: "Marine Safety & Compliance",  desc: "IMO-compliant signages and shipboard safety equipment for new-build and dry-dock retrofit campaigns." },
    { code: "SECTOR · 06", title: "Marine Technical Training",   desc: "Cadet, pre-sea and post-sea practical training programmes with workshop and simulator infrastructure." },
  ],
  matrix: {
    eyebrow: "COMPANY × SECTOR MATRIX",
    h2: "How companies serve each industry",
    columns: ["Marine", "Shipbuild", "Offshore", "Industrial", "Safety", "Training"] as const,
    // boolean grid — order matches `columns`
    rows: [
      { company: "Torque Technics Institute", cells: [true,  false, false, false, false, true ] },
      { company: "Torque Technics Chennai",   cells: [true,  true,  true,  true,  false, true ] },
      { company: "Subhag Engineers",          cells: [true,  true,  true,  true,  false, false] },
      { company: "Nulite",                    cells: [true,  true,  false, false, true,  false] },
      { company: "Armaturen-Wolff LLP",       cells: [true,  true,  true,  true,  false, false] },
    ],
  },
  workflow: {
    eyebrow: "OPERATING WORKFLOW",
    h2: "From inquiry to commissioned system",
    steps: [
      { code: "FLOW · 01", title: "Specification",   desc: "Customer specs, class society and IMO requirements captured." },
      { code: "FLOW · 02", title: "Engineering",     desc: "Drawings, schematics and BOM produced across companies." },
      { code: "FLOW · 03", title: "Manufacturing",   desc: "Pumps (Subhag), valves (Wolff), signage (Nulite) sourced in-group." },
      { code: "FLOW · 04", title: "Execution",       desc: "Workshop fabrication and shipboard installation by TT Chennai field teams." },
      { code: "FLOW · 05", title: "Trials & Handover", desc: "Class survey, IMO compliance check and operational handover." },
    ],
  },
} as const;

// ---------------------------------------------------------------------------
// CONTACT
// ---------------------------------------------------------------------------

export const contact = {
  head: {
    crumb: "Contact",
    eyebrow: "ENTERPRISE INQUIRY DESK",
    h1: "Route your inquiry to the right company.",
    lede:
      "Select the relevant company below. Your request is forwarded to the responsible engineering desk within one business day.",
  },
  step1: {
    eyebrow: "STEP 01 · CHOOSE COMPANY",
    h2: "Which company should we route to?",
    defaultCompany: "institute" as CompanyId,
  },
  step2: {
    eyebrow: "STEP 02 · YOUR INQUIRY",
    h2: "Send us the details",
    fields: {
      name:    { label: "Contact Name",  placeholder: "Full name",            required: true },
      company: { label: "Company",       placeholder: "Company / Operator",   required: true },
      email:   { label: "Email",         placeholder: "name@company.com",     required: true, type: "email" },
      phone:   { label: "Phone",         placeholder: "+91 / +49 …",          required: true },
      message: { label: "Inquiry Details", placeholder: "Vessel / plant, machinery, specs, scope of work, location and timeline…", required: true },
    },
    helper:        "Response · within 24 hrs",
    submit:        "Submit Inquiry",
    sending:       "Routing inquiry…",
    success:       "Inquiry routed to {company}. Response within 24 hours.",
    error:         "We couldn't send your inquiry. Please email us directly at pune@torquetechnic.com or try again.",
    autoReplySubject: "We've received your inquiry — Torque Group",
    autoReplyBody:    "Hi {name}, your inquiry has been routed to {company}. Their engineering desk will be in touch within one business day. If urgent, reach the group desk at pune@torquetechnic.com.",
  },
  blocks: [
    {
      h4: "Group head office",
      lines: [
        { text: "TORQUE GROUP · PUNE · IN", mono: true },
        { text: "Plot No. 34, Poona Small Scale Industrial Estate, Gultekdi, Pune – 411 037, India" },
        { text: "+91 20 2426 1679 · +91 99224 40667", mono: true },
        { text: "pune@torquetechnic.com", mono: true },
      ],
    },
    {
      h4: "Marine service desk",
      lines: [
        { text: "24 / 7 SHIPBOARD RESPONSE", mono: true },
        { text: "For urgent shipboard hydraulic or service callouts, contact TT Chennai directly." },
        { text: "info@torquetechnics.com · +91 44 2525 2555", mono: true },
      ],
    },
  ],
} as const;

// ---------------------------------------------------------------------------
// FOOTER
// ---------------------------------------------------------------------------

export const footer = {
  trust: {
    eyebrow: "TRUST & CERTIFICATIONS",
    h4: "Compliance-led maritime engineering",
    certs: [
      { code: "ISO 9001", desc: "Quality Mgmt."  },
      { code: "IRS",      desc: "Indian Register" },
      { code: "IACS",     desc: "Class Aligned"  },
      { code: "IMO",      desc: "Compliant"      },
      { code: "DIN",      desc: "German Std."    },
      { code: "DGS",      desc: "Approved"       },
    ],
  },
  cols: {
    brand: {
      desc:
        "A maritime engineering holding group operating manufacturing, marine services, technical training and industrial systems across India and Germany since 1998.",
    },
    companies: {
      h4: "Companies",
      // Links derived from `companies` + `companyOrder`. Render as anchors to /companies#<id>.
    },
    group: {
      h4: "Group",
      links: [
        { href: "/about",          label: "About"             },
        { href: "/infrastructure", label: "Infrastructure"    },
        { href: "/industries",     label: "Industries Served" },
        { href: "/contact",        label: "Contact"           },
      ],
    },
    offices: {
      h4: "Offices",
      desc1: "Pune · Mumbai · Chennai · Hamburg\nOperations across 4 cities, 2 countries.",
      desc2: "+91 99224 40667\ninfo@torquetechnics.com",
    },
  },
  bottom: {
    left:  "© 2026 TORQUE GROUP · ALL RIGHTS RESERVED",
    right: "ISO 9001 · IRS · IACS · IMO COMPLIANT",
    credit: {
      label: "Designed & maintained by",
      name:  "AFTR Labs",
      href:  "https://alteringfuture.com/",
      logo:  "/images/home/aftrlogo.jpg",
    },
  },
} as const;

// ---------------------------------------------------------------------------
// MICROCOPY
// ---------------------------------------------------------------------------

export const microcopy = {
  notFound: {
    h1: "Off the chart.",
    body: "This page isn't part of the Torque Group ecosystem.",
    ctas: [
      { label: "Home",            href: "/"          },
      { label: "Group Companies", href: "/companies" },
    ] satisfies CTA[],
  },
  cookies:
    "We use essential cookies only. By using this site you agree to our use of cookies for analytics. Learn more.",
} as const;

// ---------------------------------------------------------------------------
// SEO (per-route metadata)
// ---------------------------------------------------------------------------

export interface RouteMeta {
  title: string;
  description: string;
}

export const seo: Record<string, RouteMeta> = {
  "/": {
    title: "Torque Group — Maritime Engineering Holding · India & Germany",
    description:
      "Maritime engineering holding group operating marine pump manufacturing, valve engineering, technical training, hydraulic repair and IMO safety systems across India and Germany since 1998.",
  },
  "/about": {
    title: "About Torque Group — 25+ Years in Maritime Engineering",
    description:
      "Engineer-led maritime holding group operating five specialised companies across India and Germany. Founded 1998. IRS · IACS · DIN · IMO aligned.",
  },
  "/companies": {
    title: "Group Companies — Torque Group",
    description:
      "Five maritime engineering companies under Torque Group: pump manufacturing (Subhag Engineers), valve engineering (Armaturen-Wolff), marine training (Institute), hydraulic repair (TT Chennai), IMO signage (Nulite).",
  },
  "/infrastructure": {
    title: "Infrastructure — Workshops, Factories, Labs · Torque Group",
    description:
      "12,000+ m² of marine workshops, pump factory, hydraulic repair lines, training labs and valve engineering facilities across Pune, Mumbai, Chennai and Hamburg.",
  },
  "/industries": {
    title: "Industries Served — Marine, Shipbuilding, Offshore, Industrial",
    description:
      "Marine pumps, valves, hydraulics, IMO signage and technical training serving merchant fleets, shipyards, offshore operators and industrial plants across India and Germany.",
  },
  "/contact": {
    title: "Contact — Torque Group Enquiry Desk",
    description:
      "Route your inquiry to the right Torque Group company — pumps, valves, training, hydraulic repair or IMO signage. Response within one business day.",
  },
};

export const seoKeywordsGlobal = [
  "maritime engineering group India",
  "marine pump manufacturer India",
  "marine valve manufacturer Germany",
  "marine technical training Mumbai",
  "shipboard hydraulic repair Chennai",
  "IMO signage manufacturer",
  "marine retrofit India",
  "IACS IRS DIN ISO 9001 IMO compliant",
];
