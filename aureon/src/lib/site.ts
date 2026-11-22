export const site = {
  name: "AUREON",
  tagline: "Architecture shaped by nature",
  description:
    "AUREON is a concept architecture studio designing private residences, contemporary rural homes and commercial architecture. A demonstration project by ADA.",
  url: "https://example.com",
  email: "studio@aureon.example",
  phone: "+39 031 000 0000",
  address: "Via del Lago 12, 22100 Como, Italy",
  hours: "Monday – Friday, 09:00 – 18:00 CET",
  nav: [
    { href: "/projects", label: "Projects" },
    { href: "/#philosophy", label: "Philosophy" },
    { href: "/studio", label: "Studio" },
    { href: "/contact", label: "Contact" },
  ],
  projectTypes: [
    "Private residence",
    "Country house",
    "Urban residence",
    "Commercial",
    "Interiors",
    "Other",
  ],
  budgets: [
    "Under €500k",
    "€500k – €1M",
    "€1M – €3M",
    "€3M +",
    "Not defined yet",
  ],
  socials: [
    { label: "Instagram", href: "#" },
    { label: "Pinterest", href: "#" },
    { label: "LinkedIn", href: "#" },
  ],
  credits:
    "Concept architecture brand. AUREON is fictional and was created by ADA as a design demonstration.",
} as const;

export const navLinks = site.nav;
