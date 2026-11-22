export type ProjectCategory = "Residential" | "Commercial" | "Interiors";

export type ProjectFact = {
  label: string;
  value: string;
};

export type ProjectImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type Project = {
  slug: string;
  index: string;
  title: string;
  location: string;
  year: string;
  category: ProjectCategory;
  discipline: string;
  summary: string;
  intro: string;
  image: string;
  imageAlt: string;
  facts: ProjectFact[];
  concept: string[];
  materials: string[];
  gallery: ProjectImage[];
  plan: { label: string; value: string }[];
};

export const categories: Array<"All" | ProjectCategory> = [
  "All",
  "Residential",
  "Commercial",
  "Interiors",
];

export const projects: Project[] = [
  {
    slug: "villa-solis",
    index: "01",
    title: "Villa Solis",
    location: "Lake Como, Italy",
    year: "2024",
    category: "Residential",
    discipline: "Private residence",
    summary:
      "A low horizontal residence in limestone and dark timber, arranged around a still courtyard pool and a terrace of olive trees.",
    intro:
      "Conceived as a single continuous horizon, Villa Solis dissolves the boundary between interior and landscape. Three volumes step down the slope, each opening fully to the lake.",
    image: "/images/villa-solis.jpg",
    imageAlt:
      "Villa Solis — a modern limestone and timber residence with an infinity pool reflecting its facade",
    facts: [
      { label: "Location", value: "Lake Como, Italy" },
      { label: "Year", value: "2024" },
      { label: "Type", value: "Private residence" },
      { label: "Site", value: "4,200 m²" },
      { label: "Built area", value: "680 m²" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The house is organised along a single east–west axis: arriving through a walled garden, the visitor passes a shaded portico before the landscape opens in one gesture. There is no front door in the conventional sense — only a threshold of stone and shadow.",
      "Living spaces sit beneath a deep cantilevered roof, its underside in warm oak. Bedrooms retreat into the quieter northern volume, screened by vertical timber fins that filter the afternoon light into thin, moving lines.",
      "Materials were chosen for how they age: local limestone that softens with weather, charred larch that silvers slowly, and bronze detailing that develops a patina. The palette stays deliberately narrow so that the lake and the sky remain the most vivid elements of the composition.",
    ],
    materials: [
      "Local limestone, split-face",
      "Charred larch cladding",
      "Solid oak floors and ceilings",
      "Bronze window frames",
      "Micro-cement surfaces",
    ],
    gallery: [
      {
        src: "/images/villa-solis.jpg",
        alt: "Villa Solis exterior with infinity pool and olive trees",
        caption: "South elevation and courtyard pool",
      },
      {
        src: "/images/interior-living.jpg",
        alt: "Double-height living room with concrete wall and oak floor",
        caption: "Living room, late afternoon",
      },
      {
        src: "/images/solis-bedroom.jpg",
        alt: "Minimalist bedroom in warm neutral tones with soft daylight",
        caption: "Principal bedroom",
      },
      {
        src: "/images/philosophy.jpg",
        alt: "Sculptural stone staircase with geometric daylight",
        caption: "Stair to the guest wing",
      },
      {
        src: "/images/material-stone.jpg",
        alt: "Travertine wall detail with horizontal veining",
        caption: "Travertine detail, entrance",
      },
      {
        src: "/images/cta-sunset.jpg",
        alt: "Residence silhouette at sunset with warm light on still water",
        caption: "West terrace at dusk",
      },
    ],
    plan: [
      { label: "Ground floor", value: "Living, dining, kitchen, guest suite" },
      { label: "Upper level", value: "Three bedrooms, study, terrace" },
      { label: "Lower level", value: "Spa, cellar, service" },
      { label: "Orientation", value: "East–west, lake-facing" },
    ],
  },
  {
    slug: "house-n04",
    index: "02",
    title: "House N°04",
    location: "Åre, Sweden",
    year: "2023",
    category: "Residential",
    discipline: "Private house",
    summary:
      "A compact dwelling in charred timber, held between pine trunks and a clearing that catches the morning mist.",
    intro:
      "A house for two, built with a deliberately small footprint. Its plan is a single bar, its section a continuous room, its material a single species of timber.",
    image: "/images/house-n04.jpg",
    imageAlt:
      "House N°04 — minimalist charred timber house in a pine forest with a stone path",
    facts: [
      { label: "Location", value: "Åre, Sweden" },
      { label: "Year", value: "2023" },
      { label: "Type", value: "Private house" },
      { label: "Site", value: "1,800 m²" },
      { label: "Built area", value: "148 m²" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The site dictated the plan: two mature pines were kept, and the house steps between them rather than clearing the ground. The result is a narrow volume with a widening at the living end, where the forest opens into a clearing.",
      "Charred timber wraps the exterior, absorbing light and letting the building recede into the shadows of the trunks. Inside, pale ash and lime plaster reverse that weight, keeping the rooms bright through the long northern winter.",
      "A single continuous bench runs the length of the eastern wall — seating, storage, and a place to watch the weather. Heating is drawn from a ground source, and the roof carries a sedum meadow that insulates and slows rainwater.",
    ],
    materials: [
      "Charred pine cladding",
      "Ash interior linings",
      "Lime plaster walls",
      "Natural slate floor",
      "Blackened steel fireplace",
    ],
    gallery: [
      {
        src: "/images/house-n04.jpg",
        alt: "House N°04 among pine trees with morning mist",
        caption: "Approach from the north path",
      },
      {
        src: "/images/wood-detail.jpg",
        alt: "Vertical timber slats forming a precise facade pattern",
        caption: "Timber screen detail",
      },
      {
        src: "/images/material-wood.jpg",
        alt: "Warm oak panelling with visible grain",
        caption: "Interior lining, ash",
      },
      {
        src: "/images/material-concrete.jpg",
        alt: "Board-formed concrete wall with fine horizontal imprint",
        caption: "Foundation wall",
      },
    ],
    plan: [
      { label: "Ground floor", value: "Living, kitchen, bedroom, bath" },
      { label: "Loft", value: "Study and guest sleeping" },
      { label: "Orientation", value: "East, clearing-facing" },
    ],
  },
  {
    slug: "residence-alba",
    index: "03",
    title: "Residence Alba",
    location: "Lisbon, Portugal",
    year: "2025",
    category: "Residential",
    discipline: "Urban residence",
    summary:
      "A city residence carved from pale stone, with deep balconies and bronze screens that temper the Atlantic light.",
    intro:
      "Four apartments and a penthouse share a single sculptural facade. Depth, not decoration, gives the building its character.",
    image: "/images/residence-alba.jpg",
    imageAlt:
      "Residence Alba — urban stone facade with recessed balconies and bronze screens",
    facts: [
      { label: "Location", value: "Lisbon, Portugal" },
      { label: "Year", value: "2025" },
      { label: "Type", value: "Urban residence" },
      { label: "Site", value: "620 m²" },
      { label: "Built area", value: "1,240 m²" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The facade is a thick, inhabited wall. Balconies are cut into it rather than attached, producing deep shaded rooms that stay cool without mechanical cooling. Bronze screens slide across the openings, giving each resident control over privacy and light.",
      "Pale limestone continues from the street into the entrance hall, establishing a continuous material register. Above, apartments are planned around a central service core, freeing the perimeter for living spaces that open to the city.",
      "At roof level, a penthouse steps back to create a planted terrace. Rainwater is collected and reused for irrigation, and the building's envelope is designed to exceed current thermal requirements without visible technical clutter.",
    ],
    materials: [
      "Pale limestone facade",
      "Bronze sliding screens",
      "Oak parquet",
      "Lime-based renders",
      "Brushed stainless ironmongery",
    ],
    gallery: [
      {
        src: "/images/residence-alba.jpg",
        alt: "Residence Alba stone facade with bronze screens in late afternoon light",
        caption: "Street elevation",
      },
      {
        src: "/images/material-glass.jpg",
        alt: "Close-up of a glass facade with geometric reflections",
        caption: "Glazing detail",
      },
      {
        src: "/images/material-metal.jpg",
        alt: "Warm copper cladding with a fine vertical pattern",
        caption: "Bronze screen, patinated",
      },
      {
        src: "/images/cta-sunset.jpg",
        alt: "Modern residence silhouette against an amber sunset sky",
        caption: "Roof terrace at dusk",
      },
    ],
    plan: [
      { label: "Levels", value: "Ground plus four" },
      { label: "Apartments", value: "Four, plus penthouse" },
      { label: "Orientation", value: "South-west, city-facing" },
    ],
  },
  {
    slug: "the-stone-house",
    index: "04",
    title: "The Stone House",
    location: "Alentejo, Portugal",
    year: "2022",
    category: "Residential",
    discipline: "Country house",
    summary:
      "A monolithic house of hand-cut stone, with narrow openings that frame the dry landscape like photographs.",
    intro:
      "Built from stone quarried within sight of the site, the house is conceived as a single mass with rooms carved from it.",
    image: "/images/stone-house.jpg",
    imageAlt:
      "The Stone House — monolithic natural stone residence with narrow vertical windows",
    facts: [
      { label: "Location", value: "Alentejo, Portugal" },
      { label: "Year", value: "2022" },
      { label: "Type", value: "Country house" },
      { label: "Site", value: "12,000 m²" },
      { label: "Built area", value: "410 m²" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The house reads as a geological outcrop. Its walls are 600 mm thick, built from stone taken from a quarry a few kilometres away, laid in the same irregular courses as the dry stone walls that cross the surrounding fields.",
      "Openings are few and deliberate. Each is positioned for a specific view or a specific hour of light: a slot above the kitchen bench catches the morning; a tall vertical cut in the living room frames the evening sun.",
      "Interiors are cool and quiet, with lime-washed walls and floors of local terracotta. The house requires almost no cooling: thermal mass and cross-ventilation do the work, and shutters close the openings through the hottest part of the day.",
    ],
    materials: [
      "Hand-cut local granite",
      "Lime wash",
      "Terracotta floors",
      "Chestnut window frames",
      "Raw brass fittings",
    ],
    gallery: [
      {
        src: "/images/stone-house.jpg",
        alt: "Stone house facade with rough masonry and vertical window openings",
        caption: "South wall",
      },
      {
        src: "/images/material-stone.jpg",
        alt: "Travertine surface with warm daylight raking across the texture",
        caption: "Stone texture",
      },
      {
        src: "/images/material-concrete.jpg",
        alt: "Concrete wall detail with crisp timber imprint lines",
        caption: "Threshold detail",
      },
      {
        src: "/images/interior-living.jpg",
        alt: "Interior with concrete wall, oak floor and linen furniture",
        caption: "Living hall",
      },
    ],
    plan: [
      { label: "Ground floor", value: "Living, kitchen, three bedrooms" },
      { label: "Courtyard", value: "Enclosed, olive tree" },
      { label: "Orientation", value: "South, courtyard-facing" },
    ],
  },
  {
    slug: "pavilion-nord",
    index: "05",
    title: "Pavilion Nord",
    location: "Copenhagen, Denmark",
    year: "2023",
    category: "Commercial",
    discipline: "Brand pavilion",
    summary:
      "A low pavilion for a design brand: a concrete base, a fully glazed hall and a colonnade that turns the forecourt into a room.",
    intro:
      "A commercial building that behaves like a public room. The pavilion holds showroom, workshop and a small café beneath one continuous roof plane.",
    image: "/images/pavilion-nord.jpg",
    imageAlt:
      "Pavilion Nord — a concrete and glass commercial pavilion with a colonnade and gravel forecourt",
    facts: [
      { label: "Location", value: "Copenhagen, Denmark" },
      { label: "Year", value: "2023" },
      { label: "Type", value: "Brand pavilion" },
      { label: "Site", value: "2,600 m²" },
      { label: "Built area", value: "920 m²" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The brief asked for a showroom, a workshop and a place for visitors to stay a while. Rather than separate them, the plan stacks all three under a single roof and lets the colonnade do the dividing.",
      "A board-formed concrete base grounds the building and houses the workshop, its sawdust and noise kept away from the display areas. Above, a fully glazed hall sits beneath a deep roof, its bronze mullions reading as a fine grid against the sky.",
      "The forecourt is treated as the first room: gravel, low grasses and a line of slender columns that carries the rhythm of the facade out into the landscape. Cars are kept at the edge of the site.",
    ],
    materials: [
      "Board-formed concrete base",
      "Bronze curtain wall mullions",
      "Polished concrete floor",
      "Ash display joinery",
      "Gravel and native grasses",
    ],
    gallery: [
      {
        src: "/images/pavilion-nord.jpg",
        alt: "Concrete and glass pavilion with colonnade and landscaped forecourt",
        caption: "Forecourt and colonnade",
      },
      {
        src: "/images/material-concrete.jpg",
        alt: "Board-formed concrete wall with timber imprint",
        caption: "Concrete base, board-formed",
      },
      {
        src: "/images/material-glass.jpg",
        alt: "Glass reflecting warm evening light",
        caption: "Glazing, dusk",
      },
      {
        src: "/images/studio.jpg",
        alt: "Workshop interior with oak table and material samples",
        caption: "Workshop and sample library",
      },
    ],
    plan: [
      { label: "Ground floor", value: "Showroom, café, workshop, service" },
      { label: "Roof", value: "Plant and staff terrace" },
      { label: "Orientation", value: "North light, forecourt-facing" },
    ],
  },
  {
    slug: "apartment-luce",
    index: "06",
    title: "Apartment Luce",
    location: "Milan, Italy",
    year: "2024",
    category: "Interiors",
    discipline: "Interior architecture",
    summary:
      "A single lateral apartment reorganised around light: oak joinery, warm plaster and one long stone counter facing the courtyard.",
    intro:
      "An interior project rather than a building: two dark rooms opened into one continuous living space, calibrated to the passage of the sun.",
    image: "/images/apartment-luce.jpg",
    imageAlt:
      "Apartment Luce — warm minimalist Milan apartment with oak joinery, plaster walls and a stone counter",
    facts: [
      { label: "Location", value: "Milan, Italy" },
      { label: "Year", value: "2024" },
      { label: "Type", value: "Interior architecture" },
      { label: "Area", value: "165 m²" },
      { label: "Rooms", value: "Living, kitchen, two bedrooms" },
      { label: "Status", value: "Concept" },
    ],
    concept: [
      "The apartment had good bones and bad partitions. Removing a central corridor produced a single living room that borrows light from both sides of the building and finally makes use of its ceiling height.",
      "Materials are held to three: lime plaster, oak and stone. Joinery runs the length of the wall, absorbing storage, kitchen and a desk so that the room itself stays empty. The stone counter is the one sculptural object in the plan.",
      "Colour is kept close to the paper tone of the walls, with bronze and linen providing the only contrast. Lighting is layered and low, so that the apartment reads as calm at night as it does at noon.",
    ],
    materials: [
      "Lime plaster walls",
      "Solid oak joinery",
      "Honed limestone counter",
      "Linen curtains",
      "Bronze fittings",
    ],
    gallery: [
      {
        src: "/images/apartment-luce.jpg",
        alt: "Warm minimalist apartment interior with oak joinery and stone counter",
        caption: "Living room and kitchen",
      },
      {
        src: "/images/interior-living.jpg",
        alt: "Living room with concrete wall, oak floor and linen sofa",
        caption: "Living room, afternoon",
      },
      {
        src: "/images/solis-bedroom.jpg",
        alt: "Minimalist bedroom in warm neutral tones",
        caption: "Principal bedroom",
      },
      {
        src: "/images/material-wood.jpg",
        alt: "Warm vertical wood panelling with visible grain",
        caption: "Oak joinery, detail",
      },
    ],
    plan: [
      { label: "Living", value: "One continuous room, courtyard-facing" },
      { label: "Kitchen", value: "Integrated into oak joinery" },
      { label: "Bedrooms", value: "Two, with a shared dressing room" },
    ],
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

export function nextProject(slug: string): Project {
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

export const approach = [
  {
    number: "01",
    title: "Discovery",
    body: "We begin on site. Light, topography, prevailing wind, existing trees and the client's daily rituals are documented before a single line is drawn.",
  },
  {
    number: "02",
    title: "Concept",
    body: "One idea, tested in section and model. We present a clear architectural proposition rather than a menu of options.",
  },
  {
    number: "03",
    title: "Architecture",
    body: "Materials, structure and detail are resolved together. Drawings are coordinated with engineers and makers from the first iteration.",
  },
  {
    number: "04",
    title: "Realization",
    body: "We stay on site through construction, protecting the intent of the design in the joints, the tolerances and the final surfaces.",
  },
];

export const materials = [
  {
    name: "Stone",
    detail: "Travertine · limestone · granite",
    image: "/images/material-stone.jpg",
    alt: "Travertine wall with fine horizontal veining",
    className: "md:col-span-5 md:row-span-2 aspect-[4/5] md:aspect-auto",
  },
  {
    name: "Wood",
    detail: "Oak · larch · ash",
    image: "/images/material-wood.jpg",
    alt: "Warm oak panelling with visible grain",
    className: "md:col-span-4 aspect-[4/3]",
  },
  {
    name: "Glass",
    detail: "Structural glazing · bronze frames",
    image: "/images/material-glass.jpg",
    alt: "Glass facade with geometric reflections",
    className: "md:col-span-3 aspect-[3/4] md:aspect-auto",
  },
  {
    name: "Concrete",
    detail: "Board-formed · fair-faced",
    image: "/images/material-concrete.jpg",
    alt: "Board-formed concrete with timber imprint",
    className: "md:col-span-4 aspect-[4/3]",
  },
  {
    name: "Metal",
    detail: "Bronze · blackened steel",
    image: "/images/material-metal.jpg",
    alt: "Warm copper cladding with fine vertical pattern",
    className: "md:col-span-3 aspect-[3/4] md:aspect-auto",
  },
];

export const stats = [
  { value: "12+", label: "Years of experience" },
  { value: "38", label: "Completed concepts" },
  { value: "16", label: "Architectural awards" },
  { value: "8", label: "Countries" },
];

export const principles = [
  {
    number: "I",
    title: "Site before form",
    body: "Every project begins with a reading of the place — its climate, its soil, its existing life. The building is an answer, not an assertion.",
  },
  {
    number: "II",
    title: "Few materials, used well",
    body: "We work with a narrow palette of honest materials and detail them precisely. Restraint is what allows a space to feel calm.",
  },
  {
    number: "III",
    title: "Light as structure",
    body: "Openings are placed for the hour they will be used. Daylight is treated as a building material with the same weight as stone or timber.",
  },
  {
    number: "IV",
    title: "Built to age",
    body: "Surfaces are chosen for how they weather. A house should become more itself over time, not more tired.",
  },
];

export const team = [
  {
    initials: "EM",
    name: "Elena Marchetti",
    role: "Founding partner, architecture",
    bio: "Twenty years across residential and cultural projects in Milan, Lisbon and Copenhagen.",
  },
  {
    initials: "JV",
    name: "Jonas Vik",
    role: "Partner, technical design",
    bio: "Leads structure, envelope and the coordination of makers from concept to handover.",
  },
  {
    initials: "AK",
    name: "Amara Kone",
    role: "Head of interiors",
    bio: "Works with material, furniture and light to complete the architectural idea inside.",
  },
];
