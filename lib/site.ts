export const site = {
  name: "Norvane Cold Systems",
  shortName: "Norvane",
  tagline: "Cold chain, built to hold",
  description:
    "Norvane Cold Systems supplies, installs and services commercial refrigeration and cold-chain equipment for food processors, restaurants, retailers and healthcare providers across the Philippines.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://norvane-cold.vercel.app",
  // Illustrative details for a concept project. None of these are real contacts.
  contact: {
    email: "hello@norvane.example",
    email2: "service@norvane.example",
    phone: "+63 900 000 0000",
    phone2: "+63 900 000 0001",
    address: "Mandaue City, Cebu, Philippines",
    addressShort: "Mandaue City, Cebu",
  },
  sourcingCountries: ["Italy", "Japan", "Germany", "Denmark", "South Korea"],
  conceptNote:
    "Norvane Cold Systems is a fictional company created by Zelarion as a concept project. All names, contacts and figures are illustrative.",
} as const;

export type NavItem = { label: string; href: string };

export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Industries", href: "/industries" },
  { label: "Products", href: "/products" },
  { label: "Contact", href: "/contact" },
];
