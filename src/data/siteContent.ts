// Text and lists used on the homepage. Edit here instead of inside the components.

import windTunnelImg from "@/assets/hero/wind-tunnel.jpg";
import nuvolHeroImg from "@/assets/lamps/nuvol/nuvol-hero.jpg";
import gerroHeroImg from "@/assets/lamps/gerro/gerro-hero.jpg";

export interface HeroSlide {
  image: string;
  alt: string;
  /** Short caption shown bottom-left; links to the project when projectId is set */
  caption: string;
  projectId?: string;
  /** CSS object-position, e.g. "center 40%" */
  position?: string;
}

// Lamp slides are renders for now: swap in real photos once they exist.
export const heroSlides: HeroSlide[] = [
  {
    image: nuvolHeroImg,
    alt: "Núvol lamp switched on, an orange ribbed double-bubble shade on a table",
    caption: "Núvol, a 3D-printed double-bubble lamp in orange PLA (render)",
    projectId: "nuvol-lamp",
    position: "center 60%",
  },
  {
    image: gerroHeroImg,
    alt: "Gerro lamp switched on, a green ribbed arch with a glowing white globe",
    caption: "Gerro, a ribbed arch lamp with a printed globe (render)",
    projectId: "gerro-lamp",
    position: "center 60%",
  },
  {
    image: windTunnelImg,
    alt: "1:6 scale 3D-printed speedway motorcycle model in the DTU wind tunnel",
    caption: "1:6 scale PLA print of a speedway bike and rider, ready for the wind tunnel",
    projectId: "speedway-aerodynamics",
    position: "center 45%",
  },
];

export interface Discipline {
  name: string;
  /** One line, Bohr-style category description */
  line: string;
  tools: { name: string; level: string }[];
}

export const disciplines: Discipline[] = [
  {
    name: "Product design",
    line: "Lamps modelled in CAD, printed on my own printer and adjusted after every test print.",
    tools: [
      { name: "SolidWorks", level: "Proficient" },
      { name: "FDM 3D printing", level: "Proficient" },
    ],
  },
  {
    name: "CFD & aerodynamics",
    line: "External aerodynamics in STAR-CCM+, checked against wind tunnel measurements.",
    tools: [
      { name: "Simcenter STAR-CCM+", level: "Advanced" },
      { name: "OpenFOAM", level: "Self-taught" },
    ],
  },
  {
    name: "Mechanical design",
    line: "Gearboxes and machine parts sized by hand calculation and detailed for manufacture.",
    tools: [
      { name: "SolidWorks", level: "Proficient" },
      { name: "AutoCAD", level: "Proficient" },
    ],
  },
  {
    name: "Structural analysis",
    line: "Basic finite element checks, compared with hand calculations and physical tests.",
    tools: [{ name: "ANSYS", level: "Beginner" }],
  },
];

export interface TimelineItem {
  date: string;
  title: string;
  place: string;
  kind: "work" | "study";
}

export const timeline: TimelineItem[] = [
  { date: "Sep 2024", title: "Mechanical Engineer", place: "Alfa Laval, Copenhagen", kind: "work" },
  { date: "Sep 2024", title: "Master's thesis", place: "DTU, Copenhagen", kind: "study" },
  { date: "Apr 2023", title: "Mechanical Design Engineer", place: "Vadecity, Barcelona", kind: "work" },
  { date: "Sep 2022", title: "MSc Industrial Engineering", place: "UPC, Barcelona", kind: "study" },
  { date: "Sep 2022", title: "Quality Engineer Intern", place: "SEAT, Martorell", kind: "work" },
  { date: "Feb 2022", title: "International exchange", place: "Università di Padova, Italy", kind: "study" },
  { date: "Sep 2018", title: "BSc Industrial Engineering", place: "UPC, Barcelona", kind: "study" },
];

export interface Tool {
  title: string;
  tag: string;
  description: string;
  href: string;
  features: string[];
}

export const tools: Tool[] = [
  {
    tag: "CFD pre-processing",
    title: "y⁺ Wall Calculator",
    description:
      "First cell height and prism layer sizing for wall-resolved and wall-modelled simulations, for internal and external flows.",
    href: "https://yplus-calculator.vercel.app/",
    features: ["External & internal flow", "Prism layer sizing", "Empirical correlations"],
  },
  {
    tag: "CFD post-processing",
    title: "GCI Mesh Convergence Calculator",
    description:
      "Discretisation error following Celik et al. (2008): Richardson extrapolation, observed order of accuracy and GCI bands for several quantities at once.",
    href: "https://gci-calculator.vercel.app/",
    features: ["Richardson extrapolation", "Asymptotic range check", "Multi-quantity"],
  },
];
