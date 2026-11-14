import projectMeanVelocity from "@/assets/speedway/mean-velocity.png";
import gripperMainImg from "@/assets/gripper/main.png";
import gearboxMainImg from "@/assets/gearbox/hero.jpg";
import gearboxCardImg from "@/assets/gearbox/card.jpg";
import windTunnelImg from "@/assets/hero/wind-tunnel.jpg";

// Lamp renders (Blender Cycles from the printed STL files). Replace covers with real photos later.
import nuvolOnImg from "@/assets/lamps/nuvol/nuvol-on.jpg";
import nuvolExplodedImg from "@/assets/lamps/nuvol/exploded.webp";
import nuvolShadeImg from "@/assets/lamps/nuvol/shade.webp";
import nuvolBaseImg from "@/assets/lamps/nuvol/base.webp";
import gerroOnImg from "@/assets/lamps/gerro/gerro-on.jpg";
import gerroExplodedImg from "@/assets/lamps/gerro/exploded.webp";
import gerroBodyImg from "@/assets/lamps/gerro/body.webp";
import gerroSupportImg from "@/assets/lamps/gerro/support.webp";
import gerroGlobeImg from "@/assets/lamps/gerro/globe.webp";
// Studio renders for the galleries
import nuvolStudioOn from "@/assets/lamps/nuvol/studio-on.jpg";
import nuvolStudioDay from "@/assets/lamps/nuvol/studio-day.jpg";
import nuvolStudioClose from "@/assets/lamps/nuvol/studio-close.jpg";
import nuvolStudioParts from "@/assets/lamps/nuvol/studio-parts.jpg";
import gerroStudioOn from "@/assets/lamps/gerro/studio-on.jpg";
import gerroStudioDay from "@/assets/lamps/gerro/studio-day.jpg";
import gerroStudioClose from "@/assets/lamps/gerro/studio-close.jpg";
import gerroStudioGlobeOff from "@/assets/lamps/gerro/studio-globe-off.jpg";

export type ProjectCategory = "Product design" | "CFD & research" | "Mechanical design";

/** One row of a spec sheet, e.g. { label: "Height", value: "320 mm" } */
export interface Spec {
  label: string;
  value: string;
}

/** A printed or bought part of a product (used by the lamp projects) */
export interface ProductPart {
  name: string;
  description: string;
  /** Imported image (render or photo). Leave undefined to show a placeholder. */
  image?: string;
  specs?: Spec[];
}

/** An image slot in a gallery. Without src it renders as a labelled placeholder. */
export interface GalleryItem {
  label: string;
  src?: string;
  aspect?: "square" | "portrait" | "landscape";
}

export interface Publication {
  journal: string;
  title: string;
  authors: string[];
  date: string;
  doi: string;
  url: string;
  highlights: Spec[];
}

export interface Project {
  id: string;
  tag: string;
  title: string;
  /** Short line under the title on cards and in the page header */
  subtitle?: string;
  category: ProjectCategory;
  /** Small badge on the card, e.g. NEW or PUBLISHED */
  badge?: { label: string; tone: "flame" | "ink" | "teal" };
  /** Software, machines and processes used */
  tools?: string[];
  description: string;
  image: string;
  /** "render" = image sits on a sand background (good for CAD renders on white) */
  cardStyle?: "photo" | "render";
  /** CSS object-position for the cover image, e.g. "center 70%" */
  coverPosition?: string;
  /** Exploded-view render shown above the parts grid */
  exploded?: string;
  /** Image for the homepage card, if different from the page cover */
  cardImage?: string;
  /** Bought electrical parts and how they are installed (lamp projects) */
  electrical?: {
    intro: string;
    items: { name: string; spec: string; role: string }[];
    notes?: string[];
  };
  date: string;
  role: string;
  publication?: Publication;
  /** Spec sheet shown near the top of product pages */
  specs?: Spec[];
  parts?: ProductPart[];
  /** Real-life photos; items without src show as placeholders */
  gallery?: GalleryItem[];
  /** Section title for the gallery (defaults to "In real life") and an optional line under it */
  galleryTitle?: string;
  galleryNote?: string;
  printer?: { name: string; notes: string };
  overview: string;
  objectives: string[];
  methodology: string;
  methodologySections?: { title: string; content: string; placeholders?: string[] }[];
  results: string;
  resultsSections?: { title: string; content: string; placeholders?: string[] }[];
  lessons: string;
  futureWork?: string;
  supplementary?: {
    title: string;
    content: string;
  }[];
  methodologyPlaceholders?: string[];
  resultsPlaceholders?: string[];
  pdfUrl?: string;
  validation?: string;
  validationPlaceholders?: string[];
}

/** Printer used for the lamp projects */
const PRINTER = {
  name: "Creality Ender-3 S1 Pro",
  notes:
    "FDM printer with a 220 × 220 × 270 mm build volume, an all-metal Sprite direct-drive extruder (up to 300 °C), a PEI spring steel bed and CR Touch auto-levelling. Every part had to fit inside that build volume.",
};

export const projectsData: Project[] = [
  // ===== Núvol lamp =====
  {
    id: "nuvol-lamp",
    tag: "Personal project",
    title: "Núvol Lamp",
    subtitle: "A ribbed double-bubble table lamp with a quarter-turn bayonet",
    category: "Product design",
    tools: ["Parametric CAD", "Orca Slicer", "Creality Ender-3 S1 Pro", "PLA"],
    description:
      "A Ø180 mm double-bubble lamp with 116 ribs and a 0.9 mm wall. The shade twists onto the base with a quarter-turn bayonet, and the bulb was chosen by calculation so both bubbles glow in the right proportion.",
    image: nuvolOnImg,
    cardStyle: "photo",
    coverPosition: "center 62%",
    exploded: nuvolExplodedImg,
    date: "2026",
    role: "Designer and maker",
    printer: PRINTER,
    specs: [
      { label: "Size (assembled)", value: "Ø180 × 186 mm" },
      { label: "Shade", value: "2 bubbles, 116 ribs, 0.9 mm wall" },
      { label: "Base", value: "Ø135 × 70 mm" },
      { label: "Material", value: "Orange PLA" },
      { label: "Light source", value: "E27 LED P45, 4.9 W, 470 lm, 3000 K" },
      { label: "Printed parts", value: "2" },
      { label: "Print time", value: "~16 h shade + ~6 h base" },
      { label: "Shade to base", value: "Quarter-turn bayonet, 3 lugs" },
    ],
    parts: [
      {
        name: "Shade",
        image: nuvolShadeImg,
        description:
          "Two ribbed bubbles printed as two 0.45 mm perimeters, so light passes through the wall. The collar at the bottom carries the three bayonet lugs, and the wall thickens gradually from 0.9 to 2.6 mm over 8 mm where it meets the collar.",
        specs: [
          { label: "Size", value: "Ø180 × 182 mm" },
          { label: "Layer height", value: "0.16 mm" },
          { label: "Walls", value: "2 × 0.45 mm, Arachne" },
          { label: "Print time", value: "~16 h" },
        ],
      },
      {
        name: "Base",
        image: nuvolBaseImg,
        description:
          "Holds the E27 lampholder in a 60 mm column: the holder slides in from below, its shoulder rests on a 45° cone and the threaded ring locks it from above. Three bayonet channels with 30° ceilings take the shade, and a cable channel with anti-pull posts leads the cord out.",
        specs: [
          { label: "Size", value: "Ø135 × 70 mm" },
          { label: "Layer height", value: "0.2 mm" },
          { label: "Walls / infill", value: "3 / 15-20%" },
          { label: "Print time", value: "~6 h" },
        ],
      },
    ],
    galleryTitle: "Studio renders",
    galleryNote: "Rendered in Blender from the STL files that were printed, with the materials matched to the filament.",
    gallery: [
      { label: "Switched on", src: nuvolStudioOn, aspect: "landscape" },
      { label: "In daylight", src: nuvolStudioDay, aspect: "portrait" },
      { label: "The ribs and the waist up close", src: nuvolStudioClose, aspect: "portrait" },
      { label: "Shade lifted off the base, ready for the quarter turn", src: nuvolStudioParts, aspect: "landscape" },
    ],
    electrical: {
      intro:
        "The circuit is made only of bought parts: lampholder, cable and bulb. The printed base positions and protects them, and holds the lampholder without any screws or glue.",
      items: [
        {
          name: "E27 lampholder",
          spec: "Ø38 × 20 mm thread, Ø55 × 12 mm ring, 80 mm long",
          role: "Slides up through the base column from below. Its shoulder sits on a 45° cone and the threaded ring clamps the base plate from above, so it can't move or turn.",
        },
        {
          name: "Cable with switch and plug",
          spec: "4 m, flat 5 × 3 mm, stripped ends",
          role: "The two wires screw into the holder's terminals. Under the base the cord runs through a 7 × 6 mm channel and zig-zags around anti-pull posts, so a tug never reaches the terminals.",
        },
        {
          name: "LED bulb, P45",
          spec: "E27, 4.9 W, 470 lm, 3000 K, matte, Ø45 × 80 mm",
          role: "Its short length puts the light centre at 124 mm, which sets the balance between the bubbles. It sits at least 45.8 mm from the shade wall.",
        },
        {
          name: "Adhesive feet",
          spec: "Ø10 × 2 mm",
          role: "Under the base, to keep it off the table.",
        },
      ],
      notes: ["LED bulbs only, 5 W at most, so the PLA shade stays cool."],
    },
    overview:
      "Núvol is a table lamp made of two stacked ribbed bubbles. The shape started from a photo of a ribbed double-bubble lamp. I rebuilt it as a parametric CAD model and engineered everything needed to make it work on my own printer with parts from Danish hardware stores: how the shade attaches, how the lampholder is held, where the cable goes and which bulb to use. A first version was sized for an E14 bulb at Ø150 mm; the final one is Ø180 × 186 mm with an E27 bulb. It was printed in orange PLA on a Creality Ender-3 S1 Pro and assembled at home.",
    objectives: [
      "Keep the shade wall to two perimeters (0.9 mm) so it glows evenly, while staying strong enough to handle",
      "Make the shade removable for bulb changes without tools: a quarter-turn bayonet with three lugs",
      "Hold a standard threaded E27 lampholder securely, with the cable hidden and protected against pulling",
      "Choose the bulb so the lower bubble glows at roughly the same fraction of the upper one as in the reference",
      "Print everything without supports on a 220 × 220 × 270 mm bed",
    ],
    methodology:
      "The shade is defined by a revolved profile with two bubbles and a waist, with 116 ribs whose depth fades out towards the collar. Every dimension is a parameter, so scaling from the Ø150 E14 version to the Ø180 E27 version meant changing a handful of numbers.\n\nBefore buying parts I estimated how much light each bubble would receive for different bulb positions, integrating the irradiance over the inside of the shade. With an A60 bulb the lower bubble would only reach about 24% of the upper one's brightness. A shorter P45 bulb gives about 42%, close to the roughly 40% measured on the reference photo, so I chose the P45 and dropped a 43 mm pedestal I had considered for centring the light.\n\nI measured the real lampholder with callipers and modelled the base around it. The holder enters from below through a column, its body step sits on a 45° cone and the threaded ring clamps it from the top. Every iteration was checked in CAD for interference between the shade, base, holder and bulb before printing.",
    methodologySections: [
      {
        title: "Iterating with the printer",
        content:
          "Each physical print fed back into the model:\n\n• The bayonet test ring fitted first time, so its clearances (0.35 mm radial, 0.4 mm at the lugs, 0.5 mm vertical) became the reference for later designs.\n• The first shade cracked where the solid collar met the thin wall while removing it from the bed. I replaced the step with a gradual 8 mm taper and switched to an inner-only brim.\n• Flat ceilings on the bayonet channels left strings inside the base. Tilting them to 30° removed the strings while keeping enough retention.\n• The holder and cable were too tight on the first base. Version 5 opens the plate hole from Ø39.5 to Ø41, the column bore from Ø46 to Ø48 and the cable channel from 6 × 5 to 7 × 6 mm.",
      },
    ],
    results:
      "The lamp is printed, wired and assembled. The shade goes on and off with a quarter turn, and the P45 bulb sits where the calculation put it so both bubbles light up. Total print time is about 22 hours, and the bill of materials is around 150 DKK in filament, lampholder with switched cable, bulb and adhesive feet.",
    lessons:
      "This lamp turned into a set of rules I now apply to every print. Short holes for bought parts need about 3 mm of diametral clearance, and long bores where a part has to slide need about 6 mm. Cable channels need at least 2 mm extra width and 1 mm extra height over the cable. Never leave a flat ceiling hanging in the air: tilt it 30 to 45°. Never step from a solid section to a thin wall: taper it. And print a cheap slice of any fit before committing to a 16-hour part.",
  },
  // ===== Gerro lamp =====
  {
    id: "gerro-lamp",
    tag: "Personal project",
    title: "Gerro Lamp",
    subtitle: "A ribbed arch vase turned into a lamp with a printed glowing globe",
    category: "Product design",
    tools: ["Parametric CAD", "Mesh editing", "Orca Slicer", "Creality Ender-3 S1 Pro", "PLA"],
    description:
      "A matte green ribbed arch with a fully closed Ø100 mm printed globe that hides an E14 bulb. The globe locks on with a 60° bayonet, and the whole assembly was simulated before the first print.",
    image: gerroOnImg,
    cardStyle: "photo",
    coverPosition: "center 62%",
    exploded: gerroExplodedImg,
    date: "2026",
    role: "Designer and maker",
    printer: PRINTER,
    specs: [
      { label: "Height", value: "~240 mm" },
      { label: "Footprint", value: "120 × 120 mm" },
      { label: "Globe", value: "Ø100 mm, 0.9 mm wall" },
      { label: "Material", value: "Matte olive PLA, white PLA" },
      { label: "Light source", value: "E14 LED, 2.2 W, 470 lm, 2700 K" },
      { label: "Printed parts", value: "3" },
      { label: "Print time", value: "~19 h + ~5.5 h + ~3.5 h" },
      { label: "Globe to body", value: "60° bayonet, 3 lugs" },
    ],
    parts: [
      {
        name: "Body",
        image: gerroBodyImg,
        description:
          "The ribbed arch, adapted from an existing vase model and scaled to 57%. Inside, I added a ledge with three notches for the support, an inclined Ø9 mm cable channel and, underneath, a pocket where the cable makes an S around two anti-pull posts before leaving through a groove at the back.",
        specs: [
          { label: "Material", value: "Matte olive PLA, ~190 g" },
          { label: "Layer / walls / infill", value: "0.2 mm / 2 / 10%" },
          { label: "Print time", value: "~19 h" },
        ],
      },
      {
        name: "Support",
        image: gerroSupportImg,
        description:
          "A hidden insert that drops into the body and locks into the ledge notches. The E14 lampholder presses into a printed cup at the top, and the globe's bayonet channels are cut into its rim. Printed upside down without supports.",
        specs: [
          { label: "Infill", value: "40% gyroid" },
          { label: "Print time", value: "~3.5 h, ~40 g" },
        ],
      },
      {
        name: "Globe",
        image: gerroGlobeImg,
        description:
          "A fully closed Ø100 mm sphere in plain white PLA, which lets more light through than matte. The wall is 0.9 mm and thickens gradually towards the collar, where three inward lugs lock it to the support with a 60° clockwise turn.",
        specs: [
          { label: "Layer height", value: "0.16 mm, 0.08 mm on the top 12 mm" },
          { label: "Walls", value: "2" },
          { label: "Print time", value: "~5.5 h, ~42 g" },
        ],
      },
    ],
    galleryTitle: "Studio renders",
    galleryNote: "Rendered in Blender from the STL files that were printed, with the materials matched to the filament.",
    gallery: [
      { label: "Switched on", src: gerroStudioOn, aspect: "landscape" },
      { label: "In daylight", src: gerroStudioDay, aspect: "portrait" },
      { label: "Matte green ribs against the white globe", src: gerroStudioClose, aspect: "portrait" },
      { label: "Globe off: the bayonet collar and the E14 candle bulb", src: gerroStudioGlobeOff, aspect: "landscape" },
    ],
    electrical: {
      intro:
        "The lampholder sits hidden inside the tube and the cable runs through the body itself, so the only electrical part you see is the cord leaving the back of the base. There are no screws or metal fixings: printed features hold the lampholder and the cable.",
      items: [
        {
          name: "E14 lampholder",
          spec: "E14, with its own cable clamp",
          role: "Pushed into the printed cup in the support. Three crush ribs grip it so it doesn't turn when the bulb is screwed in, and the holder's clamp grips the cable.",
        },
        {
          name: "Cable with switch and plug",
          spec: "2 m, flat",
          role: "Runs from the holder down the tube, through an inclined Ø9 mm channel to a pocket under the base, makes an S around two anti-pull posts and leaves through a groove at the back.",
        },
        {
          name: "LED candle bulb",
          spec: "Osram, E14, 2.2 W, 470 lm, 2700 K, matte, Ø35 × 100 mm",
          role: "Slim enough to pass through the globe collar (Ø37.3 mm at the lugs) when the globe comes off, and at 2.2 W it barely warms the closed globe.",
        },
        {
          name: "Adhesive feet",
          spec: "Ø10 mm, 5 pieces",
          role: "Under the base, to keep it off the table and clear the cable groove.",
        },
      ],
      notes: [
        "No ventilation hole: at 2.2 W the globe barely warms up, and air can still move through the tube and the cable channel.",
        "LED bulbs of 3 W or less only.",
      ],
    },
    overview:
      "Gerro (Catalan for vase) turns a ribbed arch vase into a table lamp. The body is adapted from the \"Modern Ribbed Arch Vase\", an existing 3D model, scaled to 57% and modified in CAD. Everything that makes it a lamp is my own: the hidden support for the lampholder, the cable routing through the body, and a printed globe that hides the bulb completely and twists off to change it. The lamp is about 24 cm tall with a 12 × 12 cm footprint.",
    objectives: [
      "Hide the bulb completely: the globe should be a closed sphere with no visible opening or flat cap",
      "Make the globe removable with a twist so the bulb can be changed",
      "Mount a standard E14 lampholder securely inside a narrow, curved tube",
      "Route the cable invisibly through the body and protect it against pulling",
      "Keep the globe cool enough for PLA",
    ],
    methodology:
      "I went through three versions before printing. Version 1 kept the vase at 75% with a G125 glass globe bulb on top. Version 2 scaled it to 57% with a Ø95 globe bulb. Version 3, the one I built, replaces the glass globe with a printed Ø100 mm sphere around a slim E14 candle bulb, which means no special bulb to buy and a softer, more even glow.\n\nThe sphere sets two constraints. The bulb must be at most Ø35 mm so it fits through the globe's collar (Ø37.3 mm at the lugs) when the globe comes off, which rules out round P45 bulbs. And it must draw very little power, because a closed PLA sphere traps heat, so I chose a 2.2 W, 470 lm LED candle.\n\nBefore printing anything I simulated the assembly in software: lowering the support through the bore, turning the bayonet and routing the cable. It caught a part that would have jammed: an early lid design had only 0.7 mm of diametral clearance over 70 mm of travel, and I opened it to 1.8 mm.",
    methodologySections: [
      {
        title: "Printing a closed sphere without supports",
        content:
          "The first globe design had a small flat cap on top to make printing easier, but from outside it looked like an opening, so I made it a true sphere. The last 12 mm close almost flat over an empty interior. Printing that part at 0.08 mm layers with full cooling and a slow outer wall lets each layer step in only slightly, so the dome closes without supports. A 30-minute test print of just the top cap checks the result before committing to the 5.5-hour globe.",
      },
      {
        title: "Recovering a failed print",
        content:
          "The 19-hour body print stopped at 94% and the printer reported it as finished with the heaters still on. Reading the G-code showed why: from 94.3% onwards the file was binary garbage, a corrupted SD card. The last complete layer was at 132.0 mm. Rather than reprinting 19 hours, I cut the missing geometry from the original model at exactly that height into two small pieces, plus a guide that centres the mouth ring while it is glued.",
      },
    ],
    results:
      "The lamp is printed and assembled. The globe hides the bulb completely and comes off with a short twist. Total print time is about 28 hours and roughly 290 g of filament.",
    lessons:
      "Simulating the assembly before printing paid for itself by catching a part that would have jammed. Variable layer height is the tool for closing domes without supports. And for long prints: check that the file on the SD card matches the one on the computer, because a corrupted file fails silently.",
  },
  {
    id: "speedway-aerodynamics",
    tag: "Master's thesis, DTU",
    title: "Speedway Motorcycle Aerodynamics",
    subtitle: "CFD and wind tunnel study, published in Scientific Reports",
    category: "CFD & research",
    badge: { label: "Published", tone: "teal" },
    tools: ["Simcenter STAR-CCM+", "URANS / IDDES", "HPC cluster", "Wind tunnel", "3D scanning", "3D printing"],
    description:
      "First combined CFD and wind tunnel study of a speedway motorcycle, published in Scientific Reports. Validated within 1.87%, found the rider causes over half the drag, and cut total drag by 9.1% with a new front end.",
    image: projectMeanVelocity,
    cardImage: windTunnelImg,
    date: "Thesis 2024, published 2026",
    role: "First author, Technical University of Denmark (DTU)",
    publication: {
      journal: "Scientific Reports",
      title: "Numerical simulations of the aerodynamics of a speedway motorcycle",
      authors: [
        "Ivan Pujol Vidal",
        "Sebastian Obwoya Gudmand-Høyer",
        "Yvet Maathuis",
        "Andreas Top Adler",
        "Robert Flemming Mikkelsen",
        "Jens Honoré Walther",
      ],
      date: "9 October 2026",
      doi: "10.1038/s41598-026-71701-0",
      url: "https://www.nature.com/articles/s41598-026-71701-0",
      highlights: [
        { label: "Total drag reduction", value: "9.1%" },
        { label: "CFD vs wind tunnel at 30 m/s", value: "1.87%" },
        { label: "Rider share of total drag", value: ">50%" },
        { label: "Drag added by rotating wheels", value: "1.61%" },
      ],
    },
    overview:
      "This study presents a computational and experimental aerodynamic analysis of a speedway motorcycle, focusing on drag reduction strategies to enhance performance. Using CFD simulations in Simcenter STAR-CCM+ and wind tunnel experiments, the aerodynamic characteristics of the motorcycle and rider are investigated. Wind tunnel experiments validated the CFD methodology, with drag area deviations of 1.87% at 30 m/s and −0.25% at 40 m/s. The rider is identified as the primary drag contributor, accounting for over 50% of the total aerodynamic resistance, and rotating wheels add 1.61% drag compared with stationary ones. A redesigned front end with a new hand cover reduces total drag by 9.1%. This is the first combined CFD and wind tunnel aerodynamic investigation of a speedway motorcycle, and it was published in Scientific Reports in October 2026.",
    objectives: [
      "Conduct the first CFD aerodynamic study of a speedway motorcycle using a 3D-scanned full-scale model",
      "Validate CFD simulations against wind tunnel experiments on a 1:6 scale 3D-printed model",
      "Identify and quantify the main aerodynamic drag contributors on the rider-motorcycle system",
      "Analyse the effect of rotating vs stationary wheels on aerodynamic performance",
      "Measure how drag changes with yaw angle, which on a speedway bike is the slip angle during a power slide",
      "Propose and evaluate new front fairing and hand cover designs for drag reduction",
    ],
    methodology:
      "The full-scale geometry was captured by 3D scanning a real speedway motorcycle from Team Denmark with a MetraSCAN BLACK+ Elite scanner, with the rider in his straight-line riding position. Parts with negligible aerodynamic effect, such as internal cavities, small fasteners and cables, were removed. The wheel spokes and the front axle were also left out to keep the mesh manageable, which means the absolute drag is somewhat underestimated.\n\nThe computational domain extends 12.5L × 6H × 7.5W. The front, sides and top are velocity inlets at 30 m/s with 1% turbulence intensity and a turbulent viscosity ratio of 10, the rear is a pressure outlet, and the ground is a moving wall at the freestream speed. A 45 mm gap between the wheels and the ground keeps the prism layers clean, and both wheels rotate at 84.5 rad/s using a sliding mesh.\n\nThe polyhedral mesh has about 17 million cells, with a 110 mm base size, wake refinement down to 25% of the base size, and prism layers 2 mm thick in total (8 layers on the motorcycle and rider, 2 on the wheels) that keep y+ below 5. The flow is solved with URANS and the SST k-ω model, All y+ wall treatment, a second-order implicit scheme and a time step of 2×10⁻⁴ s, which keeps the maximum Courant number below 1. Every case runs for 0.5 s, about 7.25 convective times (tU/L), and the first 0.1 s is discarded before averaging. As a check on the turbulence model, an IDDES run on the same mesh and time step gave a drag area and a time-averaged wake in close agreement with URANS.",
    methodologyPlaceholders: [
      "3D Scanned Motorcycle Geometry",
      "Computational Domain and Boundary Conditions",
      "Polyhedral Mesh Detail and Prism Layers",
    ],
    validation:
      "The CFD setup was validated against wind tunnel tests on a 1:6 scale model, 3D printed in PLA on a Prusa MK3.5S and mounted on a support pin connected to a drag force sensor. The tunnel is 2 m long with a 0.5 m × 0.75 m inlet, and the model gives a blockage ratio of 5.21%, well below the usual 10% limit. Drag was logged for one minute at 100 Hz in FlexLogger, and every point is the average of five runs, with the model dismounted and remounted between them.\n\nIn the Reynolds number study, five velocities between 20 and 40 m/s (Re from 4.4×10⁵ to 8.8×10⁵) showed the drag area levelling off above 30 m/s, with less than 0.4% change between 30 and 40 m/s. The tunnel was then replicated in CFD at model scale, including the support pin, with stationary walls and 0.05% inlet turbulence. The simulated drag area deviates from the measurement by 1.87% at 30 m/s and −0.25% at 40 m/s.\n\nA second series measured drag at yaw angles from 10° to 80° in both directions at 10 m/s, since yaw is the slip angle of a speedway bike in a power slide. Drag rises steadily with yaw and is always higher clockwise, because the exhaust and the rider's legs (right foot on the ground, left on the peg) make the geometry asymmetric. CFD at 10°, 40° and 80° matched the tunnel within 6%.",
    validationPlaceholders: [
      "Wind Tunnel Test Setup",
      "CFD vs Wind Tunnel Drag Area Comparison Chart",
    ],
    results:
      "With the rider, the motorcycle produces 262.67 N of drag at 30 m/s, a drag coefficient of 0.702 and a drag area of 0.493 m². Without the rider the drag is 120.05 N, so the rider more than doubles it (+119%), through both the added frontal area and interference with the motorcycle. About 98% of the drag is pressure drag in both cases, so separation and the wake dominate. Wheel rotation increases the total drag area by 1.61%, mostly through the turbulence the wheels shed onto the rest of the geometry. A new front end, with the fairing removed, a streamlined fork and handlebar, and hand covers, reduces the drag area by 9.1%.",
    resultsPlaceholders: [
      "Pressure Coefficient Contour (Mid-plane)",
      "Mean Velocity Field",
      "Accumulated Drag Force Along Longitudinal Axis",
      "Vorticity Contours on YZ Planes",
      "Streamwise Pressure Coefficient, New vs Original Design",
      "λ₂ Vortex Structures Comparison",
    ],
    lessons:
      "Mesh quality around the rider was critical: the convergence study settled on a 110 mm base size and enough prism layers to keep y+ below 5 on the motorcycle and rider. The rider's upright posture is the dominant source of drag, and no change to the motorcycle alone can remove it. Leaving out the wheel spokes and front axle kept the mesh manageable, but it means the absolute drag is somewhat low, which matters when quoting numbers rather than comparing designs. The front fairing exists mainly to carry sponsor graphics, yet removing it alone cut drag by 6.4%. Finally, careful wind tunnel work (a controlled blockage ratio, repeated runs with the model remounted, and a Reynolds number check) is what made the CFD results credible.",
    futureWork:
      "The upright rider posture studied here only represents the straights. Since the rider dominates the drag, optimising that posture is the most promising next step. Cornering, where riders lean the bike hard, shift their weight and extend the inside leg, changes the flow completely and needs its own geometry, beyond the straight-line yaw tests done here. On the numerical side, Large Eddy Simulation could resolve the unsteady wake more accurately, although an IDDES check already agreed closely with URANS. Adding the wheel spokes and axles and testing at full scale in a wind tunnel would tighten the absolute drag values.",
    pdfUrl: "/Pujol-Vidal-2026-speedway-aerodynamics-Scientific-Reports.pdf",
    supplementary: [
      {
        title: "Mesh convergence: base size",
        content:
          "Six meshes with base sizes from 80 to 130 mm were compared, keeping every other setting fixed, and each ran for 0.5 s (about 7.25 tU/L). A regression line extrapolated towards zero base size predicts a drag area of about 0.51. The 110 mm mesh differs by only 0.25% from the finest 80 mm mesh, so it was chosen as the balance between accuracy and computational cost.",
      },
      {
        title: "Mesh convergence: prism layers",
        content:
          "Between 4 and 8 prism layers were tested at a constant total thickness of 2 mm. The drag area changed by less than 2%, but the wall y+ distribution showed that with 4 or 5 layers many wall cells sat above y+ = 5, in the buffer layer, where the turbulence model is less accurate. With 8 layers every wall-adjacent cell stays in the viscous sublayer, so the final mesh uses 8 layers on the motorcycle and rider and 2 on the wheels.",
      },
      {
        title: "Time step convergence",
        content:
          "Four time steps between 5×10⁻⁵ s and 4×10⁻⁴ s were tested on the selected mesh. At 4×10⁻⁴ s large parts of the domain exceeded a Courant number of 1, while 5×10⁻⁵ s brought no improvement. The average drag area changed by less than 1% across the valid time steps, so 2×10⁻⁴ s was chosen, keeping the maximum Courant number below 1.",
      },
    ],
  },
  {
    id: "pmma-gripper-fea",
    tag: "University project",
    title: "Manual PMMA Gripper",
    subtitle: "Design, FEA and a laser-cut prototype",
    category: "Mechanical design",
    tools: ["SolidWorks", "ANSYS", "Laser cutting"],
    description:
      "Design, finite element analysis, optimisation, and physical construction of a manual gripper made of polymethyl methacrylate (PMMA). The project combined SolidWorks CAD design with ANSYS structural simulation to validate and optimise the gripper under multiple loading scenarios.",
    image: gripperMainImg,
    cardStyle: "render",
    date: "2020",
    role: "Co-author, UPC – ETSEIB, Barcelona",
    overview:
      "This project involved the complete engineering cycle of a manual gripper: from conceptual design and material selection to finite element modelling, structural optimisation, physical manufacturing, and experimental testing. The gripper operates as a third-class lever mechanism, designed to pick up a 150 g steel cylinder. Polymethyl methacrylate (PMMA, also known as acrylic or Perspex) was selected for its transparency, rigidity, ease of machining, and adequate mechanical properties. The entire structural analysis was performed using ANSYS with 2D plane stress elements, and the gripper was manufactured via laser cutting from a PMMA sheet.",
    objectives: [
      "Design a functional manual gripper capable of securely gripping a 150 g steel cylinder",
      "Select an appropriate material and characterise its mechanical properties (E = 3000 MPa, ν = 0.4, σ_yield = 110 MPa)",
      "Build and validate a 2D finite element model in ANSYS using Solid Quad 8-node 183 elements",
      "Perform mesh convergence studies and validate the linear elasticity assumption",
      "Analyse stress distributions under vacuum, nominal, extreme, and destructive loading conditions",
      "Optimise the gripper geometry to improve mechanical efficiency and reduce mass",
      "Manufacture the final design using laser cutting and conduct physical load testing",
    ],
    methodology:
      "The gripper was designed as a U-shaped structure operating as a third-class lever. The steel cylinder (mass m = 150 g) is gripped at the curved end (fulcrum), while the user applies force near the tips. From static equilibrium, the nominal gripping force equals the cylinder weight: R_nom = m·g = 0.150 × 9.81 = 1.47 N. The actuation force F_nom was determined via moment balance about the fulcrum: F_nom × d_F = R_nom × d_R, where d_F = 100 mm is the distance from the fulcrum to the force application point and d_R = 170 mm is the distance from the fulcrum to the gripping point. This gives F_nom = R_nom × (d_R / d_F) = 1.47 × (170/100) = 2.50 N. The mechanical efficiency is defined as η = R_nom / F_nom = 1.47 / 2.50 = 58.8%, meaning only 58.8% of the applied force is transmitted to the gripping action. The maximum human pinch force was taken as F_max = 60 N, based on NASA anthropometric data, which serves as the upper bound for the extreme loading scenario.",
    methodologySections: [
      {
        title: "Finite element model setup",
        content: "The problem was modelled as a 2D plane stress case, valid because the gripper thickness (t = 30 mm) is much smaller than the in-plane dimensions (L = 232 mm). Under plane stress, σ_z = τ_xz = τ_yz = 0, reducing the 3D elasticity problem to 2D. The constitutive relation becomes {σ_x, σ_y, τ_xy} = [E/(1−ν²)] × [C] × {ε_x, ε_y, γ_xy}, where [C] is the plane stress stiffness matrix. The material was treated as linear elastic and isotropic with E = 3000 MPa and ν = 0.4. Solid Quad 8-node 183 elements (PLANE183 in ANSYS) were selected. These use quadratic shape functions (serendipity formulation) providing superior accuracy over linear 4-node elements, particularly important for capturing stress gradients in curved regions. Each node has two degrees of freedom (u_x, u_y). Boundary conditions: Node 1 at the fulcrum was fixed in Y (u_y = 0) to prevent rigid body translation; nodes at the force application points (2 and 3) were fixed in X (u_x = 0) to prevent lateral motion. At the gripping contact points, nodes were constrained in the direction normal to the cylinder surface to simulate the rigid steel cylinder contact.",
        placeholders: ["FE Model with Boundary Conditions and Applied Forces"]
      },
      {
        title: "Mesh convergence study",
        content: "The mesh was generated with a global element size of 2 mm, producing approximately 1,200 elements. To verify mesh independence, a finer mesh with element size 1 mm (~4,800 elements) was also tested. Under a reference load of F = 2 N, the coarse mesh yielded σ_I,max = 1.348 MPa while the fine mesh gave σ_I,max = 1.344 MPa, a relative error of only 0.30%, confirming mesh independence. A level-1 mesh refinement (h-refinement) was additionally applied to the curved region where stress concentrations are expected. The refined mesh produced σ_I,max = 1.335 MPa compared to the unrefined value of 1.348 MPa, an error of 0.94%. Since both values are within 1%, the standard mesh with element size 2 mm was deemed sufficient for all subsequent analyses.",
        placeholders: ["Mesh: Unrefined vs Refined", "Stress: Unrefined vs Refined"]
      },
      {
        title: "Linearity validation",
        content: "To validate the linear elasticity assumption (small displacements, linear strain-displacement relationship), both linear and geometrically nonlinear analyses were performed under F = 2 N. The linear solver assumes ε = ∂u/∂x (infinitesimal strain), while the nonlinear solver uses the full Green-Lagrange strain tensor accounting for large rotations and displacements. The linear analysis produced σ_I,max = 1.34772 MPa, while the nonlinear analysis (10 load substeps with Newton-Raphson iteration) yielded σ_I,max = 1.34884 MPa, an error of only 0.083%. This negligible difference confirmed that displacements under service loads are small enough (u_max/L < 0.01) for the linear hypothesis to hold, justifying computationally cheaper linear analysis for all subsequent load cases.",
        placeholders: ["Nonlinear vs Linear Stress Comparison"]
      }
    ],
    results:
      "The structural analysis was conducted under four loading conditions: vacuum (closing), nominal gripping, extreme maximum force, and destructive loading. Since PMMA is a brittle material (fracture without plastic deformation), the Rankine failure criterion was applied: σ_eq = max{|σ_I|, |σ_III|}, where σ_I and σ_III are the maximum and minimum principal stresses respectively. Failure occurs when σ_eq ≥ σ_yield = 110 MPa. The safety factor is calculated as γ_s = σ_yield / σ_eq, with the design requirement γ_s ≥ 1.2.",
    resultsSections: [
      {
        title: "Vacuum test (F = 20.77 N)",
        content: "The vacuum force (force needed to close the gripper arms until they touch) was determined using the linearity principle. Under a reference load of F_ref = 2 N, the maximum tip displacement was δ_ref = 2.50 mm. Since the gap between the arms is Δ = 26 mm, the vacuum force scales linearly: F_vac = F_ref × (Δ / δ_ref) = 2 × (26 / 2.50) = 20.77 N. Under this load, the maximum tensile principal stress σ_I reached 14.00 MPa at the outer curve, while the maximum compressive principal stress σ_III reached −16.48 MPa at the inner curve. Applying the Rankine criterion: σ_eq = max{14.00, 16.48} = 16.48 MPa. The safety factor is γ_s = 110 / 16.48 = 6.67, well above the required 1.2, confirming a safe design under vacuum loading.",
        placeholders: ["Displacement Field: Vacuum Test", "Principal Stress σ_I and σ_III: Vacuum"]
      },
      {
        title: "Extreme pinch test (F = 60 N)",
        content: "Under the maximum human pinch force of F = 60 N (NASA anthropometric data for thumb-index finger pinch), the gripper experienced a maximum displacement of u_max = 3.25 mm at the tips. The maximum tensile principal stress was σ_I = 12.11 MPa and the maximum compressive principal stress was σ_III = −13.04 MPa. Applying Rankine: σ_eq = max{12.11, 13.04} = 13.04 MPa, giving a safety factor γ_s = 110 / 13.04 = 8.44. Both stress values remained far below the elastic limit, confirming the gripper can withstand the most extreme manual loading without failure. The displacement of 3.25 mm is also well below the 26 mm gap, so the arms do not make contact.",
        placeholders: ["Displacement Field: Extreme Pinch", "Principal Stress σ_I and σ_III: Extreme Pinch"]
      },
      {
        title: "Destructive load (F = 506.31 N)",
        content: "The destructive force was calculated by linear scaling from a unit load analysis. Under F = 1 N, the maximum equivalent stress (Rankine) was σ_eq,1 = 0.217 MPa. Since the relationship is linear, the force required to reach the elastic limit is: F_u = σ_yield / σ_eq,1 = 110 / 0.217 = 506.31 N. At this force, the maximum displacement was u_max = 27.42 mm, which exceeds the 26 mm gap, meaning the arms would contact each other before full failure load is reached. The maximum compressive stress reached exactly σ_III = −110 MPa at the inner curve, confirming elastic failure onset. Since PMMA is a brittle material with negligible plastic deformation, the gripper would fracture catastrophically at this point. Note that this force is 8.4× the maximum human pinch force (60 N), providing a very large safety margin.",
        placeholders: ["Displacement Field: Destructive Test", "Stress at Elastic Limit σ_III"]
      }
    ],
    methodologyPlaceholders: [
      "Preliminary Gripper Design (SolidWorks 3D View)",
      "Gripper Profile with Key Dimensions",
    ],
    resultsPlaceholders: [],
    lessons:
      "A mesh refinement that changed the results by less than 1% was still worth running: it is what made the numbers trustworthy. Checking the linearity assumption (0.083% error) justified the cheaper linear analysis. For a brittle material like PMMA, the right failure criterion is the maximum principal stress (Rankine), not von Mises. And the optimisation showed how much small geometric changes can improve both stiffness and mass without weakening the part.",
    supplementary: [
      {
        title: "Design optimisation",
        content: "The optimisation targeted two key performance metrics: mechanical efficiency η = R/F (ratio of gripping force to applied force) and mass efficiency ζ = η/m (efficiency per unit mass, in kg⁻¹). The initial design had d_R = 170 mm and d_F = 100 mm, giving η₀ = d_F/d_R = 100/170 = 58.8%. Two geometric modifications were applied:\n\n1) Gripping distance reduction: The gripping point was moved from d_R = 170 mm to d_R = 150 mm, maintaining a minimum clearance of 50 mm for the steel cylinder. The new efficiency becomes η₁ = 100/150 = 66.7%, an improvement of +7.9 percentage points. The overall length was reduced from 232 mm to 212 mm by trimming material beyond the new gripping point.\n\n2) Width reduction: The cross-section width was reduced from w = 30 mm to w = 10 mm. Since plane stress applies, reducing the width proportionally reduces the second moment of area I = w·t³/12, but the stress scales inversely with width (σ ∝ 1/w), so the safety factor decreases proportionally. Under vacuum loading, the optimised design's safety factor was recalculated: the stress scales by the ratio 30/10 = 3×, so σ_eq,opt = 16.48 × 3 = 49.44 MPa, giving γ_s = 110/49.44 = 2.22, still above the 1.2 requirement but with reduced margin.\n\nThe optimised design mass was confirmed in SolidWorks as m_opt = 30.03 g (down from m₀ = 98.67 g, a 69.6% reduction). The mass efficiency improved from ζ₀ = 0.588/0.09867 = 5.96 kg⁻¹ to ζ_opt = 0.667/0.03003 = 22.2 kg⁻¹, a 3.7× improvement. The destructive force dropped from 506.31 N to F_u,opt = 506.31/3 = 168.77 N due to the thinner cross-section, but this still represents 2.8× the maximum human pinch force of 60 N."
      },
      {
        title: "Manufacturing and testing",
        content: "The optimised gripper was manufactured via laser cutting from a 10 mm thick PMMA sheet at a fabrication facility in Barcelona. The SolidWorks 3D model was exported as a 2D DXF profile for direct input to the CNC laser cutting machine, which uses a CO₂ laser to vaporise the acrylic along the cutting path. The laser cutting process offered several advantages for PMMA: clean edge finish without post-processing, tight dimensional tolerances (±0.1 mm), no mechanical stress introduction (unlike milling), and the ability to cut complex curved geometries in a single pass.\n\nPhysical testing was conducted in three stages: (1) Visual inspection confirmed dimensional accuracy against the SolidWorks drawing: all critical dimensions (total length 212 mm, arm width, curve radii R26/R32) matched within the laser cutter's tolerance. (2) Functional gripping test: the gripper was used to pick up the 150 g steel cylinder, confirming secure grip under nominal loading. The cylinder did not slip, validating the friction assumptions. (3) Manual extreme loading: the gripper was squeezed with maximum hand force (estimated ~50–60 N based on the operator), and no visible deformation, cracking, or whitening (crazing) of the PMMA was observed, consistent with the FEA prediction of γ_s = 2.22 under extreme load."
      }
    ],
  },
  {
    id: "parallel-shaft-gearbox",
    tag: "University project",
    title: "Parallel Shaft Gear Reducer",
    subtitle: "Helical gear reducer for assembly line conveyors",
    category: "Mechanical design",
    tools: ["SolidWorks", "Gear and bearing sizing", "Sand casting design"],
    description:
      "Complete mechanical design of a parallel shaft gear reducer for Volkswagen assembly line conveyors. Includes gear calculations, shaft design, bearing selection, housing design by sand casting, and full assembly documentation.",
    image: gearboxMainImg,
    cardImage: gearboxCardImg,
    cardStyle: "photo",
    date: "2023",
    role: "Author, Master\u2019s in Industrial Engineering, UPC \u2013 ETSEIB, Barcelona",
    overview:
      "This project was part of the Mechanical Design course in the Master\u2019s in Industrial Engineering programme at ETSEIB (UPC Barcelona), carried out for ABB. The assignment was to design and calculate a parallel shaft gear reducer for conveyor belt systems used in Volkswagen automobile assembly lines. The reducer controls the speed of the conveyor belts that move vehicle bodies through different assembly stations, allowing precise and efficient handling during the manufacturing process. The project targeted a production run of 6,000 units over three years, with a required operational life of 10,000 hours at full load. The design uses helical gears cut without profile shift from 16MnCr5 case-hardening steel, with an input shaft speed of 1,450 rpm and a transmission ratio of 4.06 (18-tooth pinion, 73-tooth wheel).",
    objectives: [
      "Design a parallel shaft gear reducer with a transmission ratio of 4.06 for Volkswagen assembly line conveyors",
      "Calculate gear geometry: 18-tooth pinion and 73-tooth wheel with helical teeth (\u03b2\u2080 = 24.49\u00b0) and 100 mm centre distance",
      "Design stepped shafts for proper axial positioning of all rotating components",
      "Select and verify bearings for 10,000 hours of operational life at full load",
      "Design a grey cast iron (FG 25) housing suitable for sand casting at 6,000-unit production scale",
      "Specify all purchased components: bearings, bolts, seals, oil plugs, retainers and sight glass",
      "Design all manufactured components: housing, cover, shafts, flange, shaft covers, spacer shims and centering pins",
      "Define complete assembly, lubrication, installation and maintenance procedures",
    ],
    methodology:
      "The design process began with the specifications from ABB\u2019s commercial department: output torque of 780 Nm, maximum radial force on the output shaft of 4.5 kN, input speed of 1,450 rpm, and horizontal shaft arrangement with the input shaft on top and motor coupled via flange. The input shaft diameter was calculated using the equal torsional stress criterion, yielding 24.23 mm (rounded to 24 mm). Since the input shaft is hollow to accommodate the motor coupling, the minimum outer diameter was calculated as 29.30 mm to ensure equivalent torsional strength. The production volume of 6,000 units made sand casting the clear choice for the housing, offering low per-unit cost, fast mass production, and the ability to integrate complex features directly into the mould.",
    methodologySections: [
      {
        title: "Gear design",
        content:
          "The helical gear helix angle was calculated from the constraint that the sum of the two primitive diameters must equal 200 mm (twice the 100 mm centre distance). With 18 teeth on the pinion and 73 on the wheel, and using d\u2080 = m\u2080z/cos(\u03b2\u2080), the helix angle was determined to be \u03b2\u2080 = 24.49\u00b0. This yielded primitive diameters of 39.56 mm (pinion) and 160.44 mm (wheel), tip diameters of 43.56 mm and 164.44 mm, and root diameters of 34.56 mm and 155.44 mm respectively. Since the pinion diameter is very close to the shaft diameter, the gear teeth were machined directly onto the input shaft. The output torque of 780 Nm and the wheel\u2019s primitive radius give a tangential force F\u209c = 9.72 kN. Resolving the normal contact force into its three components: radial force F\u1d63 = 3.89 kN, axial force F\u2090 = 4.43 kN, and total resultant F = 11.37 kN.",
        placeholders: ["Gear Force Diagram"],
      },
      {
        title: "Housing design (sand casting)",
        content:
          "The large production volume of 6,000 units made sand casting the optimal manufacturing process for the grey cast iron FG 25 housing. Key design rules applied were: a 2\u00b0 draft angle on all vertical faces for mould release, approximately 12 mm constant wall thickness for uniform cooling and to prevent shrinkage defects, and post-casting machining of all critical surfaces including bearing seats, bolt holes, oil plug threads, shaft cover seats and sealing faces. The housing consists of two parts (a main body and a cover) joined by six M12\u00d7175 8.8 through-bolts with self-locking nuts and flat washers. The main body houses the output shaft bearing seats, oil drain and fill plugs, and mounting feet for floor fixation. The cover houses the large input shaft bearing and the oil sight glass. Two shaft cover plates on the main body retain the outer races of the output shaft bearings.",
        placeholders: ["Main Housing", "Housing Cover"],
      },
      {
        title: "Shaft design",
        content:
          "Both shafts were designed in 42CrMo4 steel (ISO 683-2), quenched and tempered for optimal strength and toughness. The input shaft has the 18-tooth pinion machined directly onto it, a hollow bore (24 mm inner diameter, \u226529.3 mm outer diameter) for the motor coupling, and a motor flange at the drive end. The shaft is stepped to provide axial shoulders for both angular contact bearings. The output shaft features a DIN 6885 A keyway (14\u00d79\u00d720 mm) for the output gear wheel, a DIN 471 retaining ring groove (55\u00d72 mm) for axial fixing of the wheel, and a threaded central hole for external coupling. Both shafts have precision ground surfaces at bearing seats and fine surface finishes at sealing surfaces to ensure proper fit and oil retention.",
        placeholders: ["Input Shaft", "Output Shaft"],
      },
      {
        title: "Manufactured components",
        content:
          "Beyond the housing and shafts, several additional components were designed and manufactured. The flange is made from 42CrMo4 steel, machined and surface-treated to connect the drive motor to the reducer input. Its dimensions are standardised and it features a pilot bore for motor centring and bolt holes for attachment. The output shaft cover retains the outer race of one deep groove ball bearing and incorporates an SKF CRW1 oil retainer groove, an O-ring groove for sealing, and additional holes for retainer extraction. The input shaft cover similarly retains the outer race of the smaller angular contact bearing and features an O-ring groove and bolt holes. The spacer shims are laser-cut from 0.2 mm AISI 304 stainless steel sheet. They are used to pre-load the angular contact bearings on the input shaft: the cover is first fitted without shims, the required gap is measured, and then shims of the correct total thickness are inserted before final assembly. The centering pins are hollow cylindrical pins machined from AISI 304 stainless steel that allow the assembly bolts to pass through while precisely centring the housing cover on the main body.",
        placeholders: [
          "Flange",
          "Output Shaft Cover",
          "Input Shaft Cover",
          "Spacer Shim",
          "Centering Pin",
        ],
      },
    ],
    methodologyPlaceholders: [],
    results:
      "The gear engagement forces were calculated from the output torque and primitive radius. The tangential force F\u209c = 780 / (160.44/2 \u00d7 10\u207b\u00b3) = 9.72 kN. The radial force F\u1d63 = F\u209c\u00b7tan(\u03b1\u2080)/cos(\u03b2\u2080) = 3.89 kN, the axial force F\u2090 = F\u209c\u00b7tan(\u03b2\u2080) = 4.43 kN, and the total resultant F = 11.37 kN. These forces, combined with the 4.5 kN external radial load on the output shaft, drive the bearing verification calculations.",
    resultsSections: [
      {
        title: "Complete assembly",
        content:
          "The final design integrates all components into a compact cast iron housing. The input shaft enters from the top via the motor flange, the output shaft exits horizontally, and the cast mounting feet fix the reducer to the factory floor. The figures below show the front and side views of the complete assembly.",
        placeholders: ["Complete Design: Front View", "Complete Design: Side View"],
      },
      {
        title: "Output shaft bearing verification",
        content:
          "The output shaft uses two deep groove ball bearings (SKF 6210 and SKF 6209) in a fixed-free arrangement. The fixed bearing (SKF 6210) carries all axial load and is retained by a KM lock nut on the inner race and a shaft cover on the outer race. Applying force and moment equilibrium with the external 4.5 kN radial force and the gear engagement forces, the reactions at the bearings are: F\u1d63\u1d54\u1d52\u1d57D = 11.89 kN and F\u1d63\u1d54\u1d52\u1d57E = 5.98 kN radially, with the fixed bearing also carrying 4.43 kN axially. Using the SKF dynamic load rating formula C = (L\u210e \u00b7 60n / 10\u2076)\u00b9\u2044\u00b3 \u00b7 F\u1d48\u1d52\u1d50\u1d47 confirms both bearings satisfy the 10,000-hour life requirement at 1,450/4.06 = 357 rpm output speed.",
        placeholders: ["Output Shaft Force Diagram"],
      },
      {
        title: "Input shaft bearing verification",
        content:
          "The input shaft uses two angular contact ball bearings (SKF 7208 BECBP and SKF 7203 BECBP) mounted in an X-arrangement, pre-loaded via the input shaft cover and spacer shims. Without external forces, bearing loads come solely from gear engagement. Equilibrium gives total radial reactions of F\u1d63\u1d54\u1d52\u1d57A = 4.85 kN (bearing A, SKF 7203) and F\u1d63\u1d54\u1d52\u1d57B = 5.62 kN (bearing B, SKF 7208). The axial load condition yields F\u2090A = 9.36 kN and F\u2090B = 4.93 kN. For bearing B, F\u2090B/F\u1d63B \u2264 e (1.14), so the combined load equals the radial load: 5.62 kN. For bearing A, F\u2090A/F\u1d63A > e, so the combined load is F\u1d48\u1d52\u1d50\u1d47A = X\u00b7F\u1d63A + Y\u00b7F\u2090A = 0.35\u00d74.85 + 0.57\u00d79.36 = 7.03 kN. Applying the SKF life formula, bearing A reaches only 44 hours and bearing B 3,147 hours, both far below the 10,000-hour target. These bearings are undersized for this application; significantly larger angular contact bearings would be required in production.",
        placeholders: [
          "Input Shaft Force Diagram",
          "SKF 7208 Dimensions",
          "SKF 7208 Calculation Data",
          "SKF 7203 Dimensions",
          "SKF 7203 Calculation Data",
        ],
      },
      {
        title: "Bill of materials",
        content:
          "The full bill of materials includes: four bearings (SKF 7208 BECBP, SKF 7203 BECBP, SKF 6210, SKF 6209); bolted connections in M12, M10, M8 and M6 with flat washers and self-locking nuts; a DIN 6885 key; a DIN 471 retaining ring; a KM 9 lock nut with MB 9 washer; Elesa Ganter TMB and TCD oil plugs; a GN 743 oil sight glass; fluorocarbon O-ring seals (RS-PRO); a nitrile rubber cord seal for the housing split joint; and SKF CRW1 oil retainers for both shaft exits. All manufactured parts (housing, cover, input shaft, output shaft, output gear wheel, flange, shaft covers, spacer shims and centering pins) were fully specified with materials, manufacturing processes, heat treatments and surface finish requirements.",
        placeholders: [],
      },
    ],
    resultsPlaceholders: [],
    lessons:
      "Production volume decides the process: at 6,000 units, sand casting beat CNC machining for the housing. Designing for casting means draft angles, even wall thickness and planning which faces get machined afterwards. Bearings have to be checked against combined radial and axial loads; on the input shaft, both the SKF 7203 and 7208 fell short, at 44 and 3,147 hours against a 10,000-hour target. The assembly sequence shapes the geometry, from shoulder heights to seal grooves and bolt access. And a design is only reproducible when every part is specified down to bolt standard, material grade and catalogue number.",
    supplementary: [
      {
        title: "Assembly procedure",
        content:
          "The assembly follows a carefully defined sequence. First, the SKF 6210 bearing is pressed onto the output shaft using an SKF mounting tool until it seats against the shaft shoulder. The KM lock nut and MB safety washer are then fitted to secure the inner race. The shaft is inserted into the main housing through the large lower bore until the bearing seats in its housing recess. The output shaft cover (with SKF CRW1 oil retainer and O-ring pre-installed) is bolted on with M8 screws and flat washers. Next, the output gear wheel is fitted over the keyway and secured with the DIN 471 retaining ring. The remaining bearings are pressed onto both shafts. The input shaft is assembled into the housing cover with its large bearing (SKF 7208) seated in the cover bore. The cover is then carefully positioned onto the main housing using the two centering pins as guides, and both gear meshes must engage simultaneously as the cover is lowered. The housing halves are joined with six M12\u00d7175 8.8 bolts, washers and self-locking nuts. The motor flange is bolted on with M10 cylindrical-head screws. Finally, the input shaft cover is fitted without shims first, the pre-load gap is measured, shims are selected to match the gap, and the cover is refitted with the O-ring and shim stack to achieve the correct angular contact bearing pre-load. The ISO VG 68 oil is filled through the top plug until it reaches the mid-level of the sight glass.",
      },
      {
        title: "Lubrication and maintenance",
        content:
          "The reducer uses ISO VG 68 oil, which provides adequate film formation for the helical gears and bearings at the operating speed. The oil level must wet the lower teeth of the output gear wheel, visible through the lateral GN 743 sight glass. Oil is filled through the Elesa Ganter TCD top plug and drained through the magnetic TMB bottom plug, which also captures metallic particles during operation. Oil changes are required every 2,000 operating hours. Every 2,000 hours the reducer should also be partially disassembled for internal component inspection. Sealing is ensured by fluorocarbon O-rings at both shaft covers, a nitrile cord seal at the housing split joint, and SKF CRW1 oil retainers at both shaft exits. For installation, the reducer is bolted to a level surface via its cast feet using M12 bolts, the motor is coupled to the input flange, and axial and angular alignment of the output shaft with the driven equipment must be verified before start-up.",
      },
    ],
    pdfUrl: undefined,
    futureWork: undefined,
    validation: undefined,
  },
];
