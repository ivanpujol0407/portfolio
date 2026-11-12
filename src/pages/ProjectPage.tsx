import { useParams, Link } from "react-router-dom";
import { useEffect, useRef, type ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, Camera, FileText } from "lucide-react";
import { projectsData, type Project, type ProductPart, type GalleryItem, type Spec } from "@/data/projectsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Scatter,
  ComposedChart,
  Line,
  ScatterChart } from
"recharts";

// Speedway images
import geometryImg from "@/assets/speedway/geometry.png";
import domainImg from "@/assets/speedway/domain.png";
import meshPrismImg from "@/assets/speedway/mesh-prism.png";
import windTunnelSetupImg from "@/assets/speedway/wind-tunnel-setup.jpg";
import cpContourImg from "@/assets/speedway/cp-contour.png";
import cpLegendImg from "@/assets/speedway/cp-legend.png";
import meanVelocityImg from "@/assets/speedway/mean-velocity.png";
import velocityLegendImg from "@/assets/speedway/velocity-legend.png";
import accumulatedDragImg from "@/assets/speedway/accumulated-drag.png";
import vorticityPlane1 from "@/assets/speedway/vorticity-plane1.png";
import vorticityPlane2 from "@/assets/speedway/vorticity-plane2.png";
import vorticityPlane3 from "@/assets/speedway/vorticity-plane3.png";
import vorticityPlane4 from "@/assets/speedway/vorticity-plane4.png";
import vorticityLegend from "@/assets/speedway/vorticity-legend.png";
import cpNewDesign from "@/assets/speedway/cp-new-design.png";
import lambda2New from "@/assets/speedway/lambda2-new.png";
import lambda2Standard from "@/assets/speedway/lambda2-standard.png";
import lambda2Legend from "@/assets/speedway/lambda2-legend.png";
import wallYPlusImg from "@/assets/speedway/wall-y-plus.png";

// Gearbox images
import gearboxDisseny from "@/assets/gearbox/Disseny.png";
import gearboxDisseny2 from "@/assets/gearbox/Disseny2.png";
import gearboxCarcassa from "@/assets/gearbox/Carcassa.png";
import gearboxTapaCarcassa from "@/assets/gearbox/Tapa_de_la_carcassa.png";
import gearboxEixEntrada from "@/assets/gearbox/Eix_entrada.png";
import gearboxEixSortida from "@/assets/gearbox/Eix_sortida.png";
import gearboxBrida from "@/assets/gearbox/Brida.png";
import gearboxTapaEixSortida from "@/assets/gearbox/Tapa_eix_sortida.png";
import gearboxTapaEixEntrada from "@/assets/gearbox/Tapa_eix_entrada.png";
import gearboxGalga from "@/assets/gearbox/Galga_separadora.png";
import gearboxPassador from "@/assets/gearbox/Passador_centrador.png";
import gearboxDiagramaForces from "@/assets/gearbox/Diagrama_forces.png";
import gearboxDiagramaEixSortida from "@/assets/gearbox/Diagrama_forces_eix_sortida.png";
import gearboxDiagramaEixEntrada from "@/assets/gearbox/Diagrama_forces_eix_entrada.png";
import gearboxSkf7208Dim from "@/assets/gearbox/Especificacions_rodaments_rodament_SKF_7208.png";
import gearboxSkf7208Calc from "@/assets/gearbox/Especificacions_rodaments_rodament_SKF_7208_2.png";
import gearboxSkf7203Dim from "@/assets/gearbox/Especificacions_rodaments_rodament_SKF_7203.png";
import gearboxSkf7203Calc from "@/assets/gearbox/Especificacions_rodaments_rodament_SKF_7203_2.png";

// Gripper images
import gripper3dView from "@/assets/gripper/3d-view.png";
import gripperDimensions from "@/assets/gripper/dimensions.png";
import gripperFeBc from "@/assets/gripper/fe-model-bc.png";
import gripperDisplacement from "@/assets/gripper/displacement-field.png";
import gripperSigma1 from "@/assets/gripper/principal-stress-sigma1.png";
import gripperSigma3 from "@/assets/gripper/principal-stress-sigma3.png";
import gripperNonlinear from "@/assets/gripper/nonlinear-results.png";
import gripperExtremePinch from "@/assets/gripper/displacement-extreme-pinch.png";
import gripperDestructive from "@/assets/gripper/displacement-destructive.png";
import gripperManufacturing from "@/assets/gripper/manufacturing.png";
import gripperUnrefinedMesh from "@/assets/gripper/unrefined-mesh.png";
import gripperRefinedMesh from "@/assets/gripper/refined-mesh.png";
import gripperUnrefinedResults from "@/assets/gripper/unrefined-results.png";
import gripperRefinedResults from "@/assets/gripper/refined-results.png";
import gripperStress60nSigma1 from "@/assets/gripper/stress-60n-sigma1.png";
import gripperStress60nSigma3 from "@/assets/gripper/stress-60n-sigma3.png";
import gripperStressElasticLimit from "@/assets/gripper/stress-elastic-limit-sigma3.png";
import gripperVacuumTestPhoto from "@/assets/gripper/vacuum-test-photo.png";
import gripperDestructiveTestResult from "@/assets/gripper/destructive-test-result.png";
const ImagePlaceholder = ({ label, aspect = "video" }: { label: string; aspect?: "video" | "square" | "portrait" }) => (
  <div
    className={`flex w-full flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-ink/25 bg-sand/60 p-6 text-center ${
      aspect === "square" ? "aspect-square" : aspect === "portrait" ? "aspect-[4/5]" : "aspect-video"
    }`}
  >
    <Camera className="h-5 w-5 text-ink/40" strokeWidth={1.5} />
    <span className="max-w-[28ch] font-serif text-[20px] leading-tight text-ink/60">{label}</span>
    <span className="eyebrow text-[10px] text-ink/40">Photo coming soon</span>
  </div>
);

interface FigureProps {
  src: string;
  legendSrc?: string;
  alt: string;
  caption: string;
  figureNumber: number;
  size?: "sm" | "md" | "lg";
}

const figSizeClass = { sm: "max-w-xs", md: "max-w-md", lg: "max-w-2xl" };

const Figure = ({ src, legendSrc, alt, caption, figureNumber, size = "lg" }: FigureProps) =>
<figure className="my-10">
    {legendSrc &&
  <div className="flex justify-center mb-2">
        <img src={legendSrc} alt={`${alt} legend`} className="max-h-12 object-contain" />
      </div>
  }
    <div className={`w-full ${figSizeClass[size]} mx-auto rounded-lg overflow-hidden border border-border`}>
      <img src={src} alt={alt} className="w-full h-auto object-contain" />
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Fig. {figureNumber}</span> {caption}
    </figcaption>
  </figure>;


interface MultiFigureProps {
  images: {src: string;alt: string;}[];
  legendSrc?: string;
  caption: string;
  figureNumber: number;
}

const MultiFigure = ({ images, legendSrc, caption, figureNumber }: MultiFigureProps) =>
<figure className="my-10">
    {legendSrc &&
  <div className="flex justify-center mb-2">
        <img src={legendSrc} alt="legend" className="max-h-12 object-contain" />
      </div>
  }
    <div className={`grid gap-2 ${images.length === 4 ? "grid-cols-2 md:grid-cols-4" : images.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {images.map((img, i) =>
    <div key={i} className="overflow-hidden rounded-lg border border-ink/10 bg-white">
          <img src={img.src} alt={img.alt} loading="lazy" className="h-auto w-full object-contain" />
        </div>
    )}
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Fig. {figureNumber}</span> {caption}
    </figcaption>
  </figure>;


// ---- Chart data ----

// Base size convergence
const baseSizeData = [
{ baseSize: 80, cdA: 0.4977 },
{ baseSize: 90, cdA: 0.4983 },
{ baseSize: 100, cdA: 0.4982 },
{ baseSize: 110, cdA: 0.4964 },
{ baseSize: 120, cdA: 0.4951 },
{ baseSize: 130, cdA: 0.4936 }];


const baseSizeFittedLine = [
{ baseSize: 75, fitted: -0.00009 * 75 + 0.50612 },
{ baseSize: 135, fitted: -0.00009 * 135 + 0.50612 }];


// Prism layers convergence
const prismLayerData = [
{ layers: 4, cdA: 0.4867 },
{ layers: 5, cdA: 0.4927 },
{ layers: 6, cdA: 0.4964 },
{ layers: 7, cdA: 0.4971 },
{ layers: 8, cdA: 0.4955 }];


// Time step convergence
const timeStepData = [
{ dt: 0.0007, cdA: 0.4951 },
{ dt: 0.0014, cdA: 0.4955 },
{ dt: 0.0029, cdA: 0.4945 },
{ dt: 0.0058, cdA: 0.4915 }];


// Shared chart styles
const chartAxisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 12 };
const chartLabelStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 13 };
const chartTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  color: "hsl(var(--foreground))"
};

interface CrosshairCursorProps {
  points?: { cx?: number; x?: number; cy?: number; y?: number }[];
  width?: number;
  height?: number;
  top?: number;
  left?: number;
}
const CrosshairCursor = (props: CrosshairCursorProps) => {
  const { points, width, height, top, left } = props;
  if (!points || !points.length) return null;

  const point = points[0];
  const x = point.cx ?? point.x;
  const y = point.cy ?? point.y;

  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={top + height} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={1} />
      <line x1={left} y1={y} x2={left + width} y2={y} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={1} />
    </g>
  );
};

const BaseSizeChart = ({ figureNumber }: {figureNumber: number;}) =>
<figure className="my-10">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-ink/10 bg-paper p-4">
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={baseSizeData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
          dataKey="baseSize"
          type="number"
          domain={[75, 135]}
          tickCount={7}
          label={{ value: "Base size (mm)", position: "insideBottom", offset: -10, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <YAxis
          domain={[0.492, 0.502]}
          tickCount={6}
          tickFormatter={(v: number) => v.toFixed(3)}
          label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Base size: ${l} mm`} cursor={<CrosshairCursor />} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex justify-between px-12 text-xs text-muted-foreground -mt-2">
        <span>↕ 0.25%</span>
        <span>↕ 0.57%</span>
      </div>
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
    <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Fig. {figureNumber}</span> Drag area vs Base size. Percentage errors comparing the selected base size with the finest and coarsest mesh cases. Fitted function: f(x) = -0.00009x + 0.506
    </figcaption>
  </figure>;


const PrismLayerChart = ({ figureNumber }: {figureNumber: number;}) =>
<figure className="my-10">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-ink/10 bg-paper p-4">
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={prismLayerData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
          dataKey="layers"
          type="number"
          domain={[3.5, 8.5]}
          ticks={[4, 5, 6, 7, 8]}
          label={{ value: "Number of prism layers", position: "insideBottom", offset: -10, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <YAxis
          domain={[0.48, 0.5]}
          tickCount={6}
          tickFormatter={(v: number) => v.toFixed(3)}
          label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Prism layers: ${l}`} cursor={<CrosshairCursor />} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex justify-center text-xs text-muted-foreground -mt-2">
        <span>↕ 1.79%</span>
      </div>
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Fig. {figureNumber}</span> Average drag area vs Number of prism layers. Percentage error comparing highest and lowest number of prism layers
    </figcaption>
  </figure>;


const TimeStepChart = ({ figureNumber }: {figureNumber: number;}) =>
<figure className="my-10">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-ink/10 bg-paper p-4">
      <ResponsiveContainer width="100%" height={350}>
        <ComposedChart data={timeStepData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis
          dataKey="dt"
          type="number"
          domain={[0.0005, 0.006]}
          tickCount={6}
          tickFormatter={(v: number) => v.toFixed(4)}
          label={{ value: "Δt U/L", position: "insideBottom", offset: -10, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <YAxis
          domain={[0.48, 0.51]}
          tickCount={7}
          tickFormatter={(v: number) => v.toFixed(3)}
          label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
          tick={chartAxisStyle}
          stroke="hsl(var(--muted-foreground))" />
        
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Δt U/L: ${Number(l).toFixed(4)}`} cursor={<CrosshairCursor />} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Fig. {figureNumber}</span> Drag area vs Non-dimensional time step Δt U/L
    </figcaption>
  </figure>;


// CFD vs WT table
const ValidationTable = ({ figureNumber }: {figureNumber: number;}) =>
<figure className="my-10">
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg border border-ink/10 bg-paper">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground">U (m/s)</th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">C<sub>D</sub>A<sub>WT</sub></th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">C<sub>D</sub>A<sub>CFD</sub></th>
            <th className="px-4 py-3 text-left font-semibold text-foreground">Variation (%)</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-border">
            <td className="px-4 py-3 text-muted-foreground">30</td>
            <td className="px-4 py-3 text-muted-foreground">0.5177</td>
            <td className="px-4 py-3 text-muted-foreground">0.5281</td>
            <td className="px-4 py-3 text-muted-foreground">1.98</td>
          </tr>
          <tr>
            <td className="px-4 py-3 text-muted-foreground">40</td>
            <td className="px-4 py-3 text-muted-foreground">0.5159</td>
            <td className="px-4 py-3 text-muted-foreground">0.5148</td>
            <td className="px-4 py-3 text-muted-foreground">-0.17</td>
          </tr>
        </tbody>
      </table>
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Table {figureNumber}</span> Wind tunnel vs CFD drag area from the master&apos;s thesis, converted to full scale. After peer review, the published article reports deviations of 1.87% at 30 m/s and −0.25% at 40 m/s.
    </figcaption>
  </figure>;


// Mapping for speedway methodology images
const speedwayMethodologyImages: Record<string, {src: string;caption: string;}> = {
  "3D Scanned Motorcycle Geometry": {
    src: geometryImg,
    caption: "Geometry of speedway and rider. Side view."
  },
  "Computational Domain and Boundary Conditions": {
    src: domainImg,
    caption: "The dimensions of the computational domain used in the CFD simulations, where L = 2070 mm, H = 1520 mm, and W = 830 mm."
  },
  "Polyhedral Mesh Detail and Prism Layers": {
    src: meshPrismImg,
    caption: "A zoomed-in representation of the prism layers used in the simulation. These layers are crucial for accurately capturing boundary layers."
  }
};

const speedwayValidationImages: Record<string, {src: string;caption: string;}> = {
  "Wind Tunnel Test Setup": {
    src: windTunnelSetupImg,
    caption: "3D-printed model used for wind tunnel testing. The model was printed in PLA plastic and split into four parts for manufacturing feasibility."
  }
};

// Gripper image mappings
const gripperMethodologyImages: Record<string, {src: string; caption: string;}> = {
  "Preliminary Gripper Design (SolidWorks 3D View)": {
    src: gripper3dView,
    caption: "3D isometric view of the PMMA gripper modelled in SolidWorks, showing the U-shaped lever geometry."
  },
  "Gripper Profile with Key Dimensions": {
    src: gripperDimensions,
    caption: "2D profile of the gripper with key dimensions: total length 232 mm, inner radius R26, outer radius R32, and arm gap of 26 mm."
  },
  "FE Model with Boundary Conditions and Applied Forces": {
    src: gripperFeBc,
    caption: "Finite element model showing boundary conditions (fixed node at fulcrum, constrained force application points) and applied forces F at the actuation points. The gripping distance d_R = 170 mm and force distance d_F = 100 mm define the lever mechanics."
  },
  "Nonlinear vs Linear Stress Comparison": {
    src: gripperNonlinear,
    caption: "Nonlinear analysis result (σ_I = 1.349 MPa) under F = 2 N load. Comparison with linear result (1.348 MPa) confirms 0.083% deviation, validating the linear elasticity assumption."
  }
};

const gripperResultsImages: Record<string, {src: string; caption: string;}> = {
  "Displacement Field: Vacuum Test": {
    src: gripperDisplacement,
    caption: "Displacement vector field under vacuum loading (F = 20.77 N). Maximum displacement of 25.99 mm at the tips, nearly closing the 26 mm gap between the arms."
  },
  "Displacement Field: Extreme Pinch": {
    src: gripperExtremePinch,
    caption: "Displacement vector field under extreme pinch force (F = 60 N). Maximum displacement of 3.25 mm at the tips confirms the arms remain well separated."
  },
  "Displacement Field: Destructive Test": {
    src: gripperDestructive,
    caption: "Displacement vector field at destructive load (F = 506.31 N). Maximum displacement of 27.42 mm exceeds the 26 mm gap, so the arms would make contact before full elastic failure."
  },
  "Stress at Elastic Limit σ_III": {
    src: gripperStressElasticLimit,
    caption: "Compressive principal stress σ_III at the elastic limit (F = 506.31 N). The maximum compressive stress reaches exactly −110 MPa at the inner curvature, confirming onset of elastic failure."
  },
  "Vacuum Test Photo": {
    src: gripperVacuumTestPhoto,
    caption: "Physical vacuum test setup. The manufactured PMMA gripper is loaded in a universal testing machine to verify the vacuum force prediction of F = 20.77 N."
  },
  "Destructive Test Result Photo": {
    src: gripperDestructiveTestResult,
    caption: "Gripper specimens after destructive testing. The fractured gripper (right) shows brittle failure consistent with PMMA behaviour: clean fracture with no plastic deformation, confirming the Rankine failure criterion assumption."
  },
};

// Multi-figure mappings for gripper (side-by-side pairs)
const gripperMultiFigures: Record<string, { images: {src: string; alt: string}[]; caption: string }> = {
  "Mesh: Unrefined vs Refined": {
    images: [
      { src: gripperUnrefinedMesh, alt: "Unrefined mesh" },
      { src: gripperRefinedMesh, alt: "Refined mesh" },
    ],
    caption: "Mesh comparison: unrefined mesh (left, ~1,200 elements at 2 mm element size) vs level-1 h-refinement at the curved region (right, ~4,800 elements). The refinement targets the stress concentration zone at the U-bend."
  },
  "Stress: Unrefined vs Refined": {
    images: [
      { src: gripperUnrefinedResults, alt: "Unrefined stress results" },
      { src: gripperRefinedResults, alt: "Refined stress results" },
    ],
    caption: "Principal stress σ_I results comparison: unrefined mesh (left, σ_I,max = 1.348 MPa) vs refined mesh (right, σ_I,max = 1.335 MPa). The 0.94% difference confirms mesh independence."
  },
  "Principal Stress σ_I and σ_III: Vacuum": {
    images: [
      { src: gripperSigma1, alt: "Principal stress σ_I" },
      { src: gripperSigma3, alt: "Principal stress σ_III" },
    ],
    caption: "Principal stress distributions under vacuum loading (F = 20.77 N). Left: σ_I (tensile, max 14.00 MPa at outer curve). Right: σ_III (compressive, min −16.48 MPa at inner curve). The Rankine equivalent stress is σ_eq = 16.48 MPa, giving γ_s = 6.67."
  },
  "Principal Stress σ_I and σ_III: Extreme Pinch": {
    images: [
      { src: gripperStress60nSigma1, alt: "σ_I under 60 N" },
      { src: gripperStress60nSigma3, alt: "σ_III under 60 N" },
    ],
    caption: "Principal stress distributions under extreme pinch force (F = 60 N). Left: σ_I (tensile, max 12.11 MPa). Right: σ_III (compressive, min −13.04 MPa). Safety factor γ_s = 8.44, confirming safe operation under maximum human force."
  },
};

// Gearbox image mappings
const gearboxImages: Record<string, { src: string; caption: string; size?: "sm" | "md" | "lg" }> = {
  "Gear Force Diagram": {
    src: gearboxDiagramaForces,
    caption: "Decomposition of the normal contact force on a helical gear tooth into its tangential (F\u209c = 9.72 kN), radial (F\u1d63 = 3.89 kN) and axial (F\u2090 = 4.43 kN) components.",
    size: "sm",
  },
  "Main Housing": {
    src: gearboxCarcassa,
    caption: "Main housing body in grey cast iron FG 25. The housing integrates bearing seats for the output shaft, mounting feet, oil drain and fill plug bosses, and shaft cover seats. Designed with 2\u00b0 draft angles and ~12 mm constant wall thickness for sand casting.",
    size: "md",
  },
  "Housing Cover": {
    src: gearboxTapaCarcassa,
    caption: "Housing cover in grey cast iron FG 25, showing the two bearing seat bores for the output shaft bearings, bolt holes for M12 through-bolts, and the oil sight glass port.",
    size: "md",
  },
  "Input Shaft": {
    src: gearboxEixEntrada,
    caption: "Input shaft in 42CrMo4 quenched and tempered steel. The 18-tooth helical pinion (\u03b2\u2080 = 24.49\u00b0) is machined directly onto the shaft. The shaft is hollow (24 mm bore) for motor coupling and features stepped shoulders for both angular contact bearings.",
    size: "md",
  },
  "Output Shaft": {
    src: gearboxEixSortida,
    caption: "Output shaft in 42CrMo4 quenched and tempered steel, showing the keyway (DIN 6885 A 14\u00d79\u00d720 mm) for the output gear wheel, retaining ring groove (DIN 471 55\u00d72 mm), and stepped shoulders for the two deep groove ball bearings.",
    size: "md",
  },
  "Flange": {
    src: gearboxBrida,
    caption: "Motor coupling flange in 42CrMo4 steel. The pilot bore centres the motor on the reducer input and the four bolt holes transmit torque. Dimensions are standardised to the motor frame size.",
    size: "sm",
  },
  "Output Shaft Cover": {
    src: gearboxTapaEixSortida,
    caption: "Output shaft cover showing the central shaft exit bore, SKF CRW1 oil retainer groove, O-ring groove for sealing against the housing, and extraction holes to facilitate retainer removal during maintenance.",
    size: "sm",
  },
  "Input Shaft Cover": {
    src: gearboxTapaEixEntrada,
    caption: "Input shaft cover retaining the outer race of the SKF 7208 angular contact bearing. Features an O-ring groove for sealing and bolt holes. The cover\u2019s axial position controls the pre-load of the angular contact bearing pair.",
    size: "sm",
  },
  "Spacer Shim": {
    src: gearboxGalga,
    caption: "Spacer shim laser-cut from 0.2 mm AISI 304 stainless steel sheet. Multiple shims are stacked to achieve the precise gap required to pre-load the angular contact bearings on the input shaft.",
    size: "sm",
  },
  "Centering Pin": {
    src: gearboxPassador,
    caption: "Hollow centering pin machined from AISI 304 stainless steel. Two pins locate the housing cover precisely on the main body during assembly, with the M12 through-bolts passing through the hollow bore.",
    size: "sm",
  },
  "Output Shaft Force Diagram": {
    src: gearboxDiagramaEixSortida,
    caption: "Free body diagram of the output shaft showing bearing positions D and E, the external radial force F = 4.5 kN, gear engagement forces (F\u1d63, F\u209c, F\u2090) and bearing reactions. Distances: 100 mm (D to gear), 51.5 mm (gear to E), 42 mm (E to shaft end).",
    size: "md",
  },
  "Input Shaft Force Diagram": {
    src: gearboxDiagramaEixEntrada,
    caption: "Free body diagram of the input shaft showing bearing positions A (SKF 7203) and B (SKF 7208), gear engagement forces and bearing reactions. Distances: 36.5 mm (A to gear), 31.5 mm (gear to B).",
    size: "md",
  },
  "SKF 7208 Dimensions": {
    src: gearboxSkf7208Dim,
    caption: "SKF 7208 BECBP angular contact bearing dimensions: d = 40 mm bore, D = 80 mm OD, B = 18 mm width. Mounted at the gear-side of the input shaft (bearing B) in X-arrangement.",
    size: "md",
  },
  "SKF 7208 Calculation Data": {
    src: gearboxSkf7208Calc,
    caption: "SKF 7208 BECBP load ratings and calculation factors: C = 36.5 kN dynamic, C\u2080 = 26 kN static, e = 1.14, X = 0.35, Y = 0.57. Reference speed 10,000 rpm.",
    size: "md",
  },
  "SKF 7203 Dimensions": {
    src: gearboxSkf7203Dim,
    caption: "SKF 7203 BECBP angular contact bearing dimensions: d = 17 mm bore, D = 40 mm OD, B = 12 mm width. Mounted at the motor-side of the input shaft (bearing A) in X-arrangement.",
    size: "md",
  },
  "SKF 7203 Calculation Data": {
    src: gearboxSkf7203Calc,
    caption: "SKF 7203 BECBP load ratings: C = 11 kN dynamic, C\u2080 = 5.85 kN static, e = 1.14, X = 0.35, Y = 0.57. These values confirm the bearing is significantly undersized for the 10,000-hour design life at the calculated loads.",
    size: "md",
  },
  "Complete Design: Front View": {
    src: gearboxDisseny,
    caption: "Final reducer assembly, front view. The compact housing integrates the motor flange (input, top), output shaft with keyway (right), oil sight glass, and cast mounting feet.",
    size: "md",
  },
  "Complete Design: Side View": {
    src: gearboxDisseny2,
    caption: "Final reducer assembly, side view, showing the housing cover bolted with six M12×175 through-bolts, the oil fill plug at the top, and the flange at the motor input end.",
    size: "md",
  },
};

const gripperSupplementaryImages: Record<string, {src: string; caption: string;}> = {
  "Manufacturing & Testing": {
    src: gripperManufacturing,
    caption: "Laser cutting of the optimised PMMA gripper profile from a 10 mm acrylic sheet. The CO₂ laser follows the DXF contour exported from SolidWorks."
  }
};

// Design optimisation comparison data for chart
const gripperOptimisationData = [
  { parameter: "Volume (mm³)", initial: 82912.69, optimised: 25237.56 },
  { parameter: "Mass (g)", initial: 98.67, optimised: 30.03 },
  { parameter: "Efficiency η (%)", initial: 58.824, optimised: 66.67 },
  { parameter: "Mass efficiency ζ (kg⁻¹)", initial: 5.96, optimised: 22.2 },
];

const GripperOptimisationChart = ({ figureNumber }: { figureNumber: number }) => (
  <figure className="my-10">
    <div className="w-full max-w-2xl mx-auto overflow-hidden rounded-lg border border-ink/10 bg-paper">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/50">
            <th className="px-4 py-3 text-left font-semibold text-foreground">Parameter</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Initial Design</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Optimised Design</th>
            <th className="px-4 py-3 text-right font-semibold text-foreground">Change</th>
          </tr>
        </thead>
        <tbody>
          {gripperOptimisationData.map((row, i) => {
            const change = ((row.optimised - row.initial) / row.initial * 100);
            const isPositive = change > 0;
            return (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="px-4 py-3 text-muted-foreground font-medium">{row.parameter}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{row.initial.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                <td className="px-4 py-3 text-right text-muted-foreground">{row.optimised.toLocaleString(undefined, {maximumFractionDigits: 2})}</td>
                <td className={`px-4 py-3 text-right font-semibold ${isPositive ? "text-teal" : "text-flame"}`}>
                  {isPositive ? "+" : ""}{change.toFixed(1)}%
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <figcaption className="mx-auto mt-3 max-w-2xl text-[13px] leading-relaxed text-ink-soft">
      <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Table {figureNumber}</span> Comparison of initial and optimised gripper designs. Volume and mass reduced by ~70%, while mechanical and mass efficiency significantly improved.
    </figcaption>
  </figure>
);

// Results section text blocks (from the paper)
const speedwayResultsText = {
  accumulatedDrag:
  "The accumulated drag force along the longitudinal axis compares the full motorcycle-rider configuration with a simulation excluding the rider, isolating the aerodynamic influence of the human body. The region between 0.20 and 0.30 x/L exhibits the steepest gradient, corresponding to the front fairing, front fork, handlebars, and the rider's hands, accounting for approximately 28% of total drag. Between 0.35 and 0.40, a sharp increase is attributed to the helmet and forearms. The rider contributes approximately 52.4% of the total drag, confirming the dominant aerodynamic role of the rider's posture and body geometry.",
  pressureCoefficient:
  "Streamwise pressure coefficient contours are plotted on the motorcycle and rider surfaces, and pressure coefficient is plotted on the centre plane. High values are observed on forward-facing surfaces including the rider's chest, helmet, legs, and the front fairing, fork, and wheel, where stagnation pressure produces strong aerodynamic resistance. Low-pressure regions develop in the wake behind the motorcycle and rider, particularly behind the back and lower torso, contributing to drag through suction effects.",
  meanVelocity:
  "High-velocity regions are observed along the helmet surface, beneath the motorcycle body, and in the flow channel between the front fairing and the rider's arms. These zones indicate areas of local acceleration due to streamlined geometries and flow constriction. Stagnation zones in front of the front fairing and front wheel indicate high-pressure areas, identifying them as primary pressure drag contributors. Low-velocity regions inside the front wheel and between the handlebar and the rider indicate turbulent flow.",
  vorticity:
  "Time-averaged axial vorticity contours are evaluated on vertical YZ planes positioned downstream of the front fairing. In the first plane, high vorticity concentrations are evident near the fork edges, handlebars, and rider's hands. Counter-rotating vortex structures in this region result from flow separation, confirming the aerodynamic inefficiency of the front geometry. As the flow progresses downstream, the vorticity field expands and intensifies around the helmet, arms, and rider's legs.",
  newDesign:
  "The front fairing was identified as one of the primary contributors to the motorcycle's aerodynamic drag. Early concepts generated extensive high-pressure regions and failed to deliver significant drag reductions. Ultimately, the front fairing was removed entirely, leading to a 5.6% drag reduction. The front forks and handlebar were then redesigned with more streamlined profiles, reducing drag by 6.3%. Hand covers were developed to reduce frontal area, improve alignment with the freestream, and guide airflow more efficiently around the rider's arms. The final configuration reduces total drag by 9.1%, primarily due to diminished stagnation pressure, smoother pressure recovery, and a narrower, less turbulent wake.",
  newDesignAnalysis:
  "The streamwise pressure coefficient contours clearly illustrate the aerodynamic advantages of the final design. Compared to the initial configuration, the new front eliminates the large high-pressure zone at the front fairing surface, promoting smoother flow attachment. The redesigned hand covers feature a more streamlined geometry, generating lower-pressure regions that contribute to reduced aerodynamic resistance. Lambda-2 vortex visualisations reveal that the original design induces larger vortices around the front fairing and handlebar, whereas the optimised configuration produces smaller structures, thereby reducing pressure drag."
};

const FormulaRow = ({ label, formula, result }: { label: string; formula: string; result: string }) => (
  <div className="flex flex-col gap-1 rounded-md border border-ink/10 bg-paper p-3">
    <span className="text-xs text-muted-foreground">{label}</span>
    <span className="font-mono text-sm text-foreground">{formula}</span>
    <span className="font-mono text-sm font-semibold text-teal">{result}</span>
  </div>
);

const GearboxFormulas = () => (
  <div className="my-10 space-y-8">
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Gear Geometry</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Transmission ratio" formula="i = z₂ / z₁ = 73 / 18" result="i = 4.06" />
        <FormulaRow label="Helix angle (d₀₁ + d₀₂ = 200 mm)" formula="cos β₀ = m₀(z₁ + z₂) / 200" result="β₀ = 24.49°" />
        <FormulaRow label="Pinion primitive diameter" formula="d₀₁ = m₀ · z₁ / cos β₀" result="d₀₁ = 39.56 mm" />
        <FormulaRow label="Wheel primitive diameter" formula="d₀₂ = m₀ · z₂ / cos β₀" result="d₀₂ = 160.44 mm" />
      </div>
    </div>
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Shaft Diameters</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Input shaft inner diameter (equal torsional stress, η = 0.95)" formula="d₁ = d₂ · (i · η)^(−1/3)" result="d₁ = 24.23 mm → 24 mm" />
        <FormulaRow label="Hollow shaft minimum outer diameter" formula="(π/32)(D⁴ − d⁴) / (D/2) = (π/32)d⁴ / (d/2)" result="D_min = 29.30 mm" />
      </div>
    </div>
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Gear Engagement Forces</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Tangential force" formula="Fₜ = Γ₂ / r₀₂ = 780 / (0.08022)" result="Fₜ = 9.72 kN" />
        <FormulaRow label="Radial force" formula="Fᵣ = Fₜ · tan(α₀) / cos(β₀)" result="Fᵣ = 3.89 kN" />
        <FormulaRow label="Axial force" formula="Fₐ = Fₜ · tan(β₀)" result="Fₐ = 4.43 kN" />
        <FormulaRow label="Total resultant force" formula="F = √(Fₜ² + Fᵣ² + Fₐ²)" result="F = 11.37 kN" />
      </div>
    </div>
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Output Shaft Bearing Reactions (D = SKF 6210, E = SKF 6209)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Radial reaction at bearing D (fixed)" formula="F_rtotD = √(F_rD² + F_tD²)" result="F_rtotD = 11.89 kN" />
        <FormulaRow label="Axial reaction at bearing D" formula="F_aD = Fₐ" result="F_aD = 4.43 kN" />
        <FormulaRow label="Radial reaction at bearing E (free)" formula="F_rtotE = √(F_rE² + F_tE²)" result="F_rtotE = 5.98 kN" />
      </div>
    </div>
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Input Shaft Bearing Reactions (A = SKF 7203, B = SKF 7208)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Radial reaction at bearing A" formula="F_rtotA = √(F_rA² + F_tA²)" result="F_rtotA = 4.85 kN" />
        <FormulaRow label="Radial reaction at bearing B" formula="F_rtotB = √(F_rB² + F_tB²)" result="F_rtotB = 5.62 kN" />
        <FormulaRow label="Axial load at bearing A" formula="F_aA = Kₐ + F_rtotB / (2Y)" result="F_aA = 9.36 kN" />
        <FormulaRow label="Axial load at bearing B" formula="F_aB = F_rtotB / (2Y), Y = 0.57" result="F_aB = 4.93 kN" />
        <FormulaRow label="Combined load, bearing B (F_aB/F_rB ≤ e = 1.14)" formula="F_combB = F_rtotB" result="F_combB = 5.62 kN" />
        <FormulaRow label="Combined load, bearing A (F_aA/F_rA > e, X=0.35, Y=0.57)" formula="F_combA = X·F_rtotA + Y·F_aA" result="F_combA = 7.03 kN" />
      </div>
    </div>
    <div>
      <h3 className="mb-3 text-[15px] font-semibold text-ink">Bearing Life Verification (n = 1,450 rpm, p = 3)</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <FormulaRow label="Required dynamic load capacity" formula="C = (Lₕ · 60n / 10⁶)^(1/3) · F_comb" result="" />
        <FormulaRow label="Bearing A life (C = 11 kN vs required)" formula="SKF 7203 BECBP → L_hA =" result="44 h ✕ (target: 10,000 h)" />
        <FormulaRow label="Bearing B life (C = 36.5 kN vs required)" formula="SKF 7208 BECBP → L_hB =" result="3,147 h ✕ (target: 10,000 h)" />
      </div>
      <p className="text-xs text-muted-foreground mt-3 pl-1">Both angular contact bearings are undersized for this application. Significantly larger bearings would be required in production to meet the 10,000-hour design life.</p>
    </div>
  </div>
);

// ---- Building blocks for the redesigned page ----

const badgeTone = {
  flame: "bg-flame text-cream",
  ink: "bg-ink text-cream",
  teal: "bg-teal text-mint",
};

const Prose = ({ children }: { children: ReactNode }) => <p className="prose-body whitespace-pre-line">{children}</p>;

const SubHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="mb-4 mt-12 font-display text-[22px] font-extrabold tracking-[-0.01em] text-ink">{children}</h3>
);

const SpecList = ({ specs, dense = false }: { specs: Spec[]; dense?: boolean }) => (
  <dl className="border-t border-ink/15">
    {specs.map((s) => (
      <div
        key={s.label}
        className={`grid grid-cols-[1fr_auto] items-baseline gap-4 border-b border-ink/15 ${dense ? "py-2" : "py-3"}`}
      >
        <dt className={`${dense ? "text-[13px]" : "text-[14px]"} text-ink-soft`}>{s.label}</dt>
        <dd className={`text-right font-mono ${dense ? "text-[12px]" : "text-[13px]"} text-ink`}>{s.value}</dd>
      </div>
    ))}
  </dl>
);

const PartCard = ({ part, index }: { part: ProductPart; index: number }) => (
  <article className="flex flex-col">
    <div className="relative aspect-square overflow-hidden rounded-lg bg-sand">
      {part.image ? (
        <img src={part.image} alt={`${part.name}, render`} loading="lazy" className="h-full w-full object-contain p-4" />
      ) : (
        <div className="flex h-full items-center justify-center font-serif text-xl text-ink/40">Render coming soon</div>
      )}
      <span className="absolute left-3 top-3 font-mono text-[11px] text-flame">{String(index + 1).padStart(2, "0")}</span>
    </div>
    <h4 className="mt-4 text-[15px] font-semibold uppercase tracking-[0.04em]">{part.name}</h4>
    <p className="mt-2 text-[14px] leading-relaxed text-ink-soft">{part.description}</p>
    {part.specs && part.specs.length > 0 && (
      <div className="mt-4">
        <SpecList specs={part.specs} dense />
      </div>
    )}
  </article>
);

const Gallery = ({ items }: { items: GalleryItem[] }) => (
  <div className="grid gap-4 sm:grid-cols-2">
    {items.map((item, i) => {
      const wide = item.aspect === "landscape";
      return (
        <div key={i} className={wide ? "sm:col-span-2" : ""}>
          {item.src ? (
            <figure>
              <img
                src={item.src}
                alt={item.label}
                loading="lazy"
                className={`w-full rounded-lg object-cover ${
                  wide ? "aspect-video" : item.aspect === "square" ? "aspect-square" : "aspect-[4/5]"
                }`}
              />
              <figcaption className="mt-2 text-[13px] text-ink-soft">{item.label}</figcaption>
            </figure>
          ) : (
            <ImagePlaceholder
              label={item.label}
              aspect={wide ? "video" : item.aspect === "square" ? "square" : "portrait"}
            />
          )}
        </div>
      );
    })}
  </div>
);

const PublicationCard = ({ project }: { project: Project }) => {
  const pub = project.publication!;
  return (
    <div className="rounded-lg bg-teal p-7 text-mint md:p-10">
      <p className="eyebrow text-mint/70">
        Published in {pub.journal} · {pub.date}
      </p>
      <p className="mt-4 font-serif text-[30px] leading-[1.1] text-cream md:text-[40px]">{pub.title}</p>
      <p className="mt-4 text-[14px] leading-relaxed text-mint/75">
        {pub.authors.map((a, i) => (
          <span key={a}>
            <span className={i === 0 ? "font-semibold text-cream" : ""}>{a}</span>
            {i < pub.authors.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
      <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-mint/15 md:grid-cols-4">
        {pub.highlights.map((h) => (
          <div key={h.label} className="flex flex-col-reverse bg-teal p-4">
            <dt className="text-[12px] leading-snug text-mint/70">{h.label}</dt>
            <dd className="mb-2 font-mono text-[28px] leading-none text-cream">{h.value}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-8 flex flex-wrap items-center gap-3">
        <a href={pub.url} target="_blank" rel="noopener noreferrer" className="pill bg-mint text-teal hover:bg-cream">
          Read in {pub.journal}
          <ArrowUpRight className="h-4 w-4" />
        </a>
        {project.pdfUrl && (
          <a
            href={project.pdfUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="pill border border-mint/60 text-mint hover:bg-mint hover:text-teal"
          >
            <FileText className="h-4 w-4" />
            Submitted preprint (PDF)
          </a>
        )}
        <span className="font-mono text-[12px] text-mint/60">DOI {pub.doi}</span>
      </div>
    </div>
  );
};

interface PageSection {
  id: string;
  title: string;
  content: ReactNode;
}

const ProjectPage = () => {
  const { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  const figureCountRef = useRef(0);
  figureCountRef.current = 0;
  const nextFigure = () => ++figureCountRef.current;

  const projectIndex = projectsData.findIndex((p) => p.id === id);
  const project = projectsData[projectIndex];

  if (!project) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container flex min-h-[70vh] flex-col items-start justify-center pt-20">
          <h1 className="display-xl text-[16vw] lg:text-[160px]">Not found</h1>
          <Link to="/" className="pill-outline mt-8">
            <ArrowLeft className="h-4 w-4" /> Back home
          </Link>
        </div>
      </div>
    );
  }

  const isSpeedway = id === "speedway-aerodynamics";
  const isGripper = id === "pmma-gripper-fea";
  const isGearbox = id === "parallel-shaft-gearbox";
  const isProduct = project.category === "Product design";
  const next = projectsData[(projectIndex + 1) % projectsData.length];

  const methodPlaceholders = project.methodologyPlaceholders || [];
  const resPlaceholders = project.resultsPlaceholders || [];

  // For speedway, render custom results section
  const renderSpeedwayResults = () => (
    <>
      <Prose>{speedwayResultsText.accumulatedDrag}</Prose>
      <Figure src={accumulatedDragImg} alt="Accumulated drag" caption="Comparison of accumulated drag forces along the speedway profile." figureNumber={nextFigure()} />

      <Prose>{speedwayResultsText.pressureCoefficient}</Prose>
      <Figure src={cpContourImg} legendSrc={cpLegendImg} alt="Pressure coefficient contour" caption="Contour of pressure coefficient on mid-plane in flow direction. The mid-plane pressure coefficient contour illustrates pressure variations along the centreline of the speedway motorcycle. It highlights stagnation zones, areas of low pressure, and key separation regions." figureNumber={nextFigure()} />

      <Prose>{speedwayResultsText.meanVelocity}</Prose>
      <Figure src={meanVelocityImg} legendSrc={velocityLegendImg} alt="Mean velocity field" caption="Contour of mean velocity on mid-plane in flow direction. It highlights high-velocity regions around the helmet and front fairing, along with low-velocity wake areas behind the rider." figureNumber={nextFigure()} />

      <Prose>{speedwayResultsText.vorticity}</Prose>
      <MultiFigure
        images={[
          { src: vorticityPlane1, alt: "Vorticity plane 1" },
          { src: vorticityPlane2, alt: "Vorticity plane 2" },
          { src: vorticityPlane3, alt: "Vorticity plane 3" },
          { src: vorticityPlane4, alt: "Vorticity plane 4" },
        ]}
        legendSrc={vorticityLegend}
        caption="Time-averaged axial vorticity contours with line integral convolution of the in-plane velocity at YZ planes. These vorticity contours show vortex structures forming around the front fairing, handlebar and front wheel."
        figureNumber={nextFigure()}
      />

      <SubHeading>New front design</SubHeading>
      <Prose>{speedwayResultsText.newDesign}</Prose>
      <Figure src={cpNewDesign} legendSrc={cpLegendImg} alt="Pressure coefficient new design" caption="Streamwise pressure coefficient for the new front design." figureNumber={nextFigure()} />
      <Prose>{speedwayResultsText.newDesignAnalysis}</Prose>
      <MultiFigure
        images={[
          { src: lambda2New, alt: "Lambda2 new design" },
          { src: lambda2Standard, alt: "Lambda2 standard design" },
        ]}
        legendSrc={lambda2Legend}
        caption="Instantaneous vortex structures visualised with λ₂ criterion. Comparison between new front design and standard front fairing."
        figureNumber={nextFigure()}
      />
    </>
  );

  // Resolve an image placeholder label to a real figure, or a labelled placeholder
  const resolveImage = (label: string, figCounter: () => number) => {
    if (isSpeedway) {
      const img = speedwayMethodologyImages[label] || speedwayValidationImages[label];
      if (img) return <Figure src={img.src} alt={label} caption={img.caption} figureNumber={figCounter()} />;
    }
    if (isGripper) {
      const multi = gripperMultiFigures[label];
      if (multi) return <MultiFigure images={multi.images} caption={multi.caption} figureNumber={figCounter()} />;
      const img = gripperMethodologyImages[label] || gripperResultsImages[label] || gripperSupplementaryImages[label];
      if (img) return <Figure src={img.src} alt={label} caption={img.caption} figureNumber={figCounter()} />;
    }
    if (isGearbox) {
      const img = gearboxImages[label];
      if (img) return <Figure src={img.src} alt={label} caption={img.caption} figureNumber={figCounter()} size={img.size} />;
    }
    return <ImagePlaceholder label={label} />;
  };

  const renderSubsections = (subs?: { title: string; content: string; placeholders?: string[] }[]) =>
    subs && subs.length > 0
      ? subs.map((sec, i) => (
          <div key={i}>
            <SubHeading>{sec.title}</SubHeading>
            <Prose>{sec.content}</Prose>
            {sec.placeholders?.map((label, j) => <div key={j}>{resolveImage(label, nextFigure)}</div>)}
          </div>
        ))
      : null;

  // ---- Assemble the sections in reading order (figure numbers follow this order) ----
  const sections: PageSection[] = [];

  sections.push({ id: "overview", title: "Overview", content: <Prose>{project.overview}</Prose> });

  sections.push({
    id: "objectives",
    title: isProduct ? "Design goals" : "Objectives",
    content: (
      <ul className="border-t border-ink/15">
        {project.objectives.map((obj, i) => (
          <li key={i} className="grid grid-cols-[40px_1fr] gap-2 border-b border-ink/15 py-4 text-[16px] leading-relaxed text-ink/80">
            <span className="pt-1 font-mono text-[11px] text-flame">{String(i + 1).padStart(2, "0")}</span>
            {obj}
          </li>
        ))}
      </ul>
    ),
  });

  if (project.specs && project.specs.length > 0) {
    sections.push({
      id: "specs",
      title: "Spec sheet",
      content: (
        <div className="grid gap-8 md:grid-cols-[1fr_0.9fr]">
          <SpecList specs={project.specs} />
          {project.printer && (
            <div className="self-start rounded-lg bg-paper p-6">
              <p className="eyebrow text-ink-soft">Printed on</p>
              <p className="mt-3 font-display text-[26px] font-black uppercase leading-none tracking-[-0.02em]">
                {project.printer.name}
              </p>
              <p className="mt-3 text-[14px] leading-relaxed text-ink-soft">{project.printer.notes}</p>
            </div>
          )}
        </div>
      ),
    });
  }

  if (project.parts && project.parts.length > 0) {
    sections.push({
      id: "parts",
      title: "Parts",
      content: (
        <>
          {project.exploded && (
            <figure className="mb-14">
              <div className="flex justify-center overflow-hidden rounded-lg bg-sand">
                <img
                  src={project.exploded}
                  alt={`${project.title}, exploded view`}
                  loading="lazy"
                  className="max-h-[720px] w-auto object-contain"
                />
              </div>
              <figcaption className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                <span className="mr-2 font-mono text-[11px] uppercase tracking-[0.08em] text-flame">Exploded view</span>
                Rendered from the STL files that were printed.
              </figcaption>
            </figure>
          )}
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2">
            {project.parts.map((part, i) => (
              <PartCard key={part.name} part={part} index={i} />
            ))}
          </div>
        </>
      ),
    });
  }

  sections.push({
    id: "method",
    title: isProduct ? "Design process" : "Methodology",
    content: (
      <>
        <Prose>{project.methodology}</Prose>
        {methodPlaceholders.map((label, i) => (
          <div key={i}>{resolveImage(label, nextFigure)}</div>
        ))}
        {renderSubsections(project.methodologySections)}

        {isSpeedway && project.supplementary && project.supplementary.length > 0 && (
          <>
            <SubHeading>Convergence studies</SubHeading>
            {project.supplementary.map((item, i) => (
              <div key={i} className="mt-8">
                <h4 className="mb-3 text-[15px] font-semibold">{item.title}</h4>
                <Prose>{item.content}</Prose>
                {item.title === "Mesh Convergence: Base Size" ? (
                  <BaseSizeChart figureNumber={nextFigure()} />
                ) : item.title === "Mesh Convergence: Prism Layers" ? (
                  <>
                    <PrismLayerChart figureNumber={nextFigure()} />
                    <Figure src={wallYPlusImg} alt="Wall Y+ histogram" caption="Wall y⁺ histogram for 8 prism layers." figureNumber={nextFigure()} />
                  </>
                ) : item.title === "Time Step Convergence" ? (
                  <TimeStepChart figureNumber={nextFigure()} />
                ) : null}
              </div>
            ))}
          </>
        )}
      </>
    ),
  });

  if (project.validation) {
    sections.push({
      id: "validation",
      title: "Validation",
      content: (
        <>
          <Prose>{project.validation}</Prose>
          {isSpeedway ? (
            <>
              <Figure src={windTunnelSetupImg} alt="Wind tunnel test setup" caption="3D-printed model used for wind tunnel testing. The model was printed in PLA plastic and split into four parts for manufacturing feasibility." figureNumber={nextFigure()} />
              <ValidationTable figureNumber={nextFigure()} />
            </>
          ) : (
            project.validationPlaceholders?.map((label, i) => <ImagePlaceholder key={i} label={label} />)
          )}
        </>
      ),
    });
  }

  if (project.gallery && project.gallery.length > 0) {
    sections.push({ id: "gallery", title: "In real life", content: <Gallery items={project.gallery} /> });
  }

  sections.push({
    id: "results",
    title: isProduct ? "Outcome" : "Results",
    content: (
      <>
        <Prose>{project.results}</Prose>
        {isSpeedway ? (
          <div className="mt-8">{renderSpeedwayResults()}</div>
        ) : project.resultsSections && project.resultsSections.length > 0 ? (
          renderSubsections(project.resultsSections)
        ) : (
          resPlaceholders.map((label, i) => <div key={i}>{resolveImage(label, nextFigure)}</div>)
        )}
        {isGearbox && <GearboxFormulas />}
      </>
    ),
  });

  if ((isGearbox || isGripper) && project.supplementary) {
    project.supplementary.forEach((item, i) => {
      sections.push({
        id: `extra-${i}`,
        title: item.title,
        content: (
          <>
            <Prose>{item.content}</Prose>
            {isGripper && item.title === "Design Optimisation" && <GripperOptimisationChart figureNumber={nextFigure()} />}
            {isGripper && item.title === "Manufacturing & Testing" && (
              <>
                <Figure src={gripperManufacturing} alt="Laser cutting of PMMA gripper" caption="Laser cutting of the optimised PMMA gripper profile from a 10 mm acrylic sheet. The CO₂ laser follows the DXF contour exported from SolidWorks." figureNumber={nextFigure()} />
                <Figure src={gripperVacuumTestPhoto} alt="Vacuum test photo" caption="Physical vacuum test setup. The manufactured PMMA gripper is loaded in a universal testing machine to verify the vacuum force prediction of F = 20.77 N." figureNumber={nextFigure()} />
                <Figure src={gripperDestructiveTestResult} alt="Destructive test result" caption="Gripper specimens after destructive testing. The fractured gripper (right) shows brittle failure consistent with PMMA behaviour: clean fracture with no plastic deformation, confirming the Rankine failure criterion assumption." figureNumber={nextFigure()} />
              </>
            )}
          </>
        ),
      });
    });
  }

  sections.push({ id: "lessons", title: "Lessons learned", content: <Prose>{project.lessons}</Prose> });

  if (project.futureWork) {
    sections.push({
      id: "next-steps",
      title: isProduct ? "Next iteration" : "Future work",
      content: <Prose>{project.futureWork}</Prose>,
    });
  }

  const meta: Spec[] = [
    { label: "Year", value: project.date },
    { label: "Role", value: project.role },
    { label: "Discipline", value: project.category },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="pt-16 md:pt-20">
        <article>
          {/* Header */}
          <header className="container pt-10 md:pt-14">
            <Link
              to="/#work"
              className="eyebrow inline-flex items-center gap-2 text-ink-soft transition-colors hover:text-ink"
            >
              <ArrowLeft className="h-3.5 w-3.5" /> All work
            </Link>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <div className="mt-8 flex flex-wrap gap-2">
                {project.badge && <span className={`tag ${badgeTone[project.badge.tone]}`}>{project.badge.label}</span>}
                <span className="tag border border-ink/20 text-ink">{project.tag}</span>
              </div>
              <h1 className="display-xl mt-5 max-w-[14ch] text-[13vw] md:text-[10vw] xl:text-[140px]">{project.title}</h1>
              {project.subtitle && (
                <p className="mt-6 max-w-3xl font-serif text-[28px] leading-[1.1] text-ink md:text-[40px]">{project.subtitle}</p>
              )}
            </motion.div>

            <dl className="mt-12 grid border-t border-ink/15 sm:grid-cols-2 lg:grid-cols-4">
              {meta.map((m) => (
                <div key={m.label} className="border-b border-ink/15 py-4 sm:pr-6 lg:border-b-0">
                  <dt className="eyebrow text-ink-soft">{m.label}</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{m.value}</dd>
                </div>
              ))}
              {project.tools && (
                <div className="border-b border-ink/15 py-4 lg:border-b-0">
                  <dt className="eyebrow text-ink-soft">Tools</dt>
                  <dd className="mt-2 text-[15px] leading-snug">{project.tools.join(", ")}</dd>
                </div>
              )}
            </dl>
          </header>

          {/* Cover */}
          <div className="container mt-6 md:mt-10">
            <div
              className={`overflow-hidden rounded-lg ${
                project.cardStyle === "render" ? "bg-sand" : "bg-ink"
              } aspect-[4/3] md:aspect-[21/9]`}
            >
              {project.image ? (
                <img
                  src={project.image}
                  alt={project.title}
                  className={`h-full w-full ${project.cardStyle === "render" ? "object-contain p-10 mix-blend-multiply" : "object-cover"}`}
                  style={project.coverPosition ? { objectPosition: project.coverPosition } : undefined}
                />
              ) : (
                <ImagePlaceholder label="Hero photo" />
              )}
            </div>
          </div>

          {project.publication && (
            <div className="container mt-6">
              <PublicationCard project={project} />
            </div>
          )}

          {/* Body */}
          <div className="container mt-16 grid gap-12 md:mt-24 lg:grid-cols-[200px_minmax(0,1fr)] xl:grid-cols-[240px_minmax(0,1fr)]">
            <aside className="hidden lg:block">
              <nav className="sticky top-28" aria-label="On this page">
                <p className="eyebrow text-ink-soft">On this page</p>
                <ol className="mt-4 space-y-2">
                  {sections.map((sec, i) => (
                    <li key={sec.id}>
                      <a href={`#${sec.id}`} className="group flex gap-3 text-[13px] text-ink-soft hover:text-ink">
                        <span className="font-mono text-[11px] text-ink/40 group-hover:text-flame">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {sec.title}
                      </a>
                    </li>
                  ))}
                </ol>
              </nav>
            </aside>

            <div className="min-w-0 max-w-3xl space-y-20 md:space-y-28">
              {sections.map((sec, i) => (
                <section key={sec.id} id={sec.id} className="scroll-mt-28">
                  <div className="mb-8 flex items-baseline gap-4 border-t border-ink pt-4">
                    <span className="font-mono text-[12px] text-flame">{String(i + 1).padStart(2, "0")}</span>
                    <h2 className="font-serif text-[36px] leading-none md:text-[48px]">{sec.title}</h2>
                  </div>
                  {sec.content}
                </section>
              ))}
            </div>
          </div>

          {/* Next project */}
          <Link to={`/project/${next.id}`} className="group mt-28 block bg-paper py-16 md:mt-36 md:py-24">
            <div className="container flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="eyebrow text-ink-soft">Next project</p>
                <p className="display-xl mt-4 text-[11vw] md:text-[7vw] xl:text-[104px]">{next.title}</p>
              </div>
              <span className="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-ink transition-colors group-hover:bg-ink group-hover:text-cream md:h-24 md:w-24">
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </Link>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default ProjectPage;
