import {
  Factory,
  Store,
  HeartPulse,
  ShieldCheck,
  Handshake,
  Headset,
  Globe2,
  Truck,
  Gauge,
  Snowflake,
  GlassWater,
  Wrench,
  type LucideIcon,
} from "lucide-react";

/* ---------------------------------- Values --------------------------------- */
export type Value = { title: string; description: string; icon: LucideIcon };

export const values: Value[] = [
  {
    title: "Dependability",
    description:
      "Equipment that holds its temperature and a team that picks up the phone, because spoiled stock cannot be undone.",
    icon: Gauge,
  },
  {
    title: "Precision",
    description:
      "Systems sized to your real load and layout, specified on paper first instead of guessed from a catalogue.",
    icon: ShieldCheck,
  },
  {
    title: "Care",
    description:
      "Planned servicing and honest advice, so equipment lasts longer and costs less to run.",
    icon: Handshake,
  },
];

/* --------------------------------- Industries ------------------------------ */
export type Industry = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  overview: string;
  offerings: string[];
  heroSeed: string;
  image?: string;
  highlights: { value: string; label: string }[];
  applications: { title: string; description: string; seed: string }[];
};

export const industryProcess = [
  { step: "01", title: "Understand", description: "We learn your load, layout and power supply first." },
  { step: "02", title: "Specify", description: "We size and select equipment that fits the job." },
  { step: "03", title: "Install", description: "Neat, tested installation scheduled around your operation." },
  { step: "04", title: "Service", description: "Planned servicing that keeps everything cold." },
] as const;

export const industries: Industry[] = [
  {
    slug: "food-processing",
    name: "Food Processing",
    short: "Food Processing",
    tagline: "Cold rooms, blast chilling and process cooling for every batch.",
    icon: Factory,
    overview:
      "Cold rooms, blast chillers and process cooling that protect product quality from the production line to the loading dock.",
    offerings: [
      "Walk-in cold rooms & freezers",
      "Blast chillers & freezing tunnels",
      "Process cooling & chilled-water systems",
      "Temperature monitoring & alarms",
    ],
    heroSeed: "nrv-food-hero",
    image: "/images/cold-room.svg",
    highlights: [
      { value: "-40°C", label: "Blast freezing range" },
      { value: "24/7", label: "Emergency call-out" },
      { value: "5", label: "Equipment partners" },
    ],
    applications: [
      { title: "Chilling & Freezing", description: "Fast, even cooling that locks in freshness and shelf life.", seed: "food-chill" },
      { title: "Cold Rooms", description: "Walk-in rooms sized to your volume and floor plan.", seed: "food-rooms" },
      { title: "Process Cooling", description: "Chilled-water loops that keep production lines stable.", seed: "food-process" },
      { title: "Monitoring", description: "Alarms and logs that catch a drifting temperature early.", seed: "food-monitor" },
    ],
  },
  {
    slug: "retail-and-hospitality",
    name: "Retail & Hospitality",
    short: "Retail & Hospitality",
    tagline: "Display cases, kitchens and bar coolers that keep service running.",
    icon: Store,
    overview:
      "Display refrigeration, kitchen units and beverage cooling for shops, restaurants and hotels, installed cleanly and serviced on a plan.",
    offerings: [
      "Display chillers & freezers",
      "Kitchen refrigeration & prep tables",
      "Ice machines & beverage coolers",
      "Planned maintenance plans",
    ],
    heroSeed: "nrv-retail-hero",
    highlights: [
      { value: "2-week", label: "Typical install lead time" },
      { value: "24/7", label: "Service hotline" },
      { value: "5-yr", label: "Compressor warranty options" },
    ],
    applications: [
      { title: "Supermarket Display", description: "Open and closed display cases that show product at its best.", seed: "retail-display" },
      { title: "Restaurant Kitchens", description: "Reach-in and prep refrigeration built for a busy line.", seed: "retail-kitchen" },
      { title: "Bars & Beverage", description: "Bottle coolers and ice machines that never run short.", seed: "retail-bar" },
      { title: "Convenience Stores", description: "Compact, efficient units for small floor areas.", seed: "retail-store" },
    ],
  },
  {
    slug: "healthcare-and-pharma",
    name: "Healthcare & Pharma",
    short: "Healthcare & Pharma",
    tagline: "Monitored cold storage for medicine, vaccines and samples.",
    icon: HeartPulse,
    overview:
      "Precision cold storage for medicines, vaccines and laboratory samples, with continuous monitoring and documented temperature records.",
    offerings: [
      "Pharmacy refrigerators & freezers",
      "Vaccine & sample cold storage",
      "Continuous temperature logging",
      "Backup power & alarm integration",
    ],
    heroSeed: "nrv-health-hero",
    highlights: [
      { value: "±1°C", label: "Temperature stability" },
      { value: "24/7", label: "Alarm monitoring" },
      { value: "100%", label: "Logged & documented" },
    ],
    applications: [
      { title: "Pharmacy Storage", description: "Reliable units for everyday medicine stock.", seed: "health-pharmacy" },
      { title: "Vaccine Cold Chain", description: "Stable storage with alerts if anything drifts.", seed: "health-vaccine" },
      { title: "Laboratory Samples", description: "Controlled storage for sensitive samples and reagents.", seed: "health-lab" },
      { title: "Backup & Monitoring", description: "Power backup and logging that protect critical stock.", seed: "health-backup" },
    ],
  },
];

/* ---------------------------------- Products ------------------------------- */
export type ProductCategory = {
  title: string;
  description: string;
  icon: LucideIcon;
};

export const productCategories: ProductCategory[] = [
  {
    title: "Cold Rooms & Freezers",
    description:
      "Walk-in cold rooms, freezers and insulated panels sized to your load and floor plan.",
    icon: Snowflake,
  },
  {
    title: "Display & Kitchen Refrigeration",
    description:
      "Display chillers, prep tables and under-counter units for shops and professional kitchens.",
    icon: Store,
  },
  {
    title: "Ice & Beverage Cooling",
    description:
      "Ice machines, bottle coolers and beverage chillers for bars, cafes and hotels.",
    icon: GlassWater,
  },
  {
    title: "Installation & Service Plans",
    description:
      "Installation, planned maintenance and 24/7 call-out, so breakdowns stay rare and short.",
    icon: Wrench,
  },
];

/* --------------------------------- Why Norvane ----------------------------- */
export type Differentiator = { title: string; description: string; icon: LucideIcon };

export const differentiators: Differentiator[] = [
  {
    title: "Trusted Equipment Partners",
    description:
      "Direct relationships with compressor, coil and panel makers in Italy, Japan, Germany and Denmark.",
    icon: Globe2,
  },
  {
    title: "Planned Service, Fast Call-out",
    description:
      "Scheduled maintenance and a service line that answers, day or night.",
    icon: Headset,
  },
  {
    title: "Right-Sized, On-Time Installation",
    description:
      "Equipment specified to your load and installed on the date we promised.",
    icon: Truck,
  },
];

/* ----------------------------- Equipment partners -------------------------- */
// Fictional partner names for the concept project.
export type Supplier = {
  name: string;
  origin: string;
  productLines: string;
};

export const suppliers: Supplier[] = [
  {
    name: "Kelmar Compressors",
    origin: "Italy",
    productLines:
      "Semi-hermetic and scroll compressors, condensing units and rack systems for commercial and light-industrial refrigeration.",
  },
  {
    name: "Hanabi Controls",
    origin: "Japan",
    productLines:
      "Electronic controllers, sensors and temperature loggers for cold rooms, display cases and process lines.",
  },
  {
    name: "Brenner & Voss Coils",
    origin: "Germany",
    productLines:
      "Evaporators, air coolers and condensers engineered for low-noise, energy-efficient operation.",
  },
  {
    name: "Sundal Panel Systems",
    origin: "Denmark",
    productLines:
      "Insulated cold-room panels, doors and flooring for walk-in rooms and temperature-controlled buildings.",
  },
  {
    name: "Pacific Rim Coolants",
    origin: "South Korea",
    productLines:
      "Refrigerants, lubricants and service consumables for installation and maintenance work.",
  },
];

/* ---------------------------------- Clients -------------------------------- */
// Fictional sample clients for the concept project.
export const clients: string[] = [
  "Harbor Fresh Foods",
  "Mabini Meat Traders",
  "Greenfield Dairy",
  "Lumina Hotels",
  "Casa Verde Restaurants",
  "Bayline Seafood",
  "Santiago Bakeshops",
  "Sunrise Pharma Distribution",
  "Westgate Medical Group",
  "Cedarpoint Grocers",
  "Orchid Catering",
  "Coastline Ice Cream",
  "Highland Produce",
  "Metro Fresh Markets",
  "Tala Beverages",
  "Riverside Diagnostics",
];

/* ----------------------------- Vision & Mission ---------------------------- */
export const vision =
  "To be the Philippines' most dependable cold-chain partner, keeping food, medicine and fresh produce at the right temperature from the first delivery to the last mile.";

export const mission =
  "Norvane Cold Systems supplies, installs and services commercial refrigeration for businesses that cannot afford a warm room. We specify equipment around each customer's real load, back every installation with planned servicing, and answer the phone when something goes wrong. Dependability, precision and care guide every job we take on.";

export const story = [
  "Norvane was founded in 2012 in Cebu by two refrigeration engineers who kept being called out to rescue systems that had never been sized properly. They started with one van and one rule: measure the load before choosing the machine.",
  "Today the company supplies cold rooms, display refrigeration and monitored cold storage to customers across the Visayas and Luzon, from a head office in Mandaue City, with equipment from partners in Italy, Japan, Germany, Denmark and South Korea.",
];

/* ----------------------------------- Stats --------------------------------- */
export type Stat = { value: number; suffix?: string; prefix?: string; label: string };

export const stats: Stat[] = [
  { value: 3, label: "Core industries served" },
  { value: 5, label: "Equipment partners" },
  { value: 100, suffix: "%", label: "Commitment to quality" },
  { value: 24, suffix: "/7", label: "Service hotline" },
];
