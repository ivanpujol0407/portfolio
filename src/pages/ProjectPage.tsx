import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projectsData";
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
  ScatterChart,
} from "recharts";

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

const ImagePlaceholder = ({ label, aspect = "video" }: { label: string; aspect?: "video" | "square" }) => (
  <div
    className={`w-full rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground p-6 text-center ${
      aspect === "square" ? "aspect-[4/3]" : "aspect-video"
    }`}
  >
    {label}
  </div>
);

interface FigureProps {
  src: string;
  legendSrc?: string;
  alt: string;
  caption: string;
  figureNumber: number;
}

const Figure = ({ src, legendSrc, alt, caption, figureNumber }: FigureProps) => (
  <figure className="my-6">
    {legendSrc && (
      <div className="flex justify-center mb-2">
        <img src={legendSrc} alt={`${alt} legend`} className="max-h-12 object-contain" />
      </div>
    )}
    <div className="w-full max-w-2xl mx-auto rounded-lg overflow-hidden border border-border">
      <img src={src} alt={alt} className="w-full h-auto object-contain" />
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Figure {figureNumber}:</span> {caption}
    </figcaption>
  </figure>
);

interface MultiFigureProps {
  images: { src: string; alt: string }[];
  legendSrc?: string;
  caption: string;
  figureNumber: number;
}

const MultiFigure = ({ images, legendSrc, caption, figureNumber }: MultiFigureProps) => (
  <figure className="my-6">
    {legendSrc && (
      <div className="flex justify-center mb-2">
        <img src={legendSrc} alt="legend" className="max-h-12 object-contain" />
      </div>
    )}
    <div className={`grid gap-2 ${images.length === 4 ? "grid-cols-4" : images.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
      {images.map((img, i) => (
        <div key={i} className="rounded-lg overflow-hidden border border-border">
          <img src={img.src} alt={img.alt} className="w-full h-auto object-contain" />
        </div>
      ))}
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Figure {figureNumber}:</span> {caption}
    </figcaption>
  </figure>
);

// ---- Chart data ----

// Base size convergence
const baseSizeData = [
  { baseSize: 80, cdA: 0.4977 },
  { baseSize: 90, cdA: 0.4983 },
  { baseSize: 100, cdA: 0.4982 },
  { baseSize: 110, cdA: 0.4964 },
  { baseSize: 120, cdA: 0.4951 },
  { baseSize: 130, cdA: 0.4936 },
];

const baseSizeFittedLine = [
  { baseSize: 75, fitted: -0.00009 * 75 + 0.50612 },
  { baseSize: 135, fitted: -0.00009 * 135 + 0.50612 },
];

// Prism layers convergence
const prismLayerData = [
  { layers: 4, cdA: 0.4867 },
  { layers: 5, cdA: 0.4927 },
  { layers: 6, cdA: 0.4964 },
  { layers: 7, cdA: 0.4971 },
  { layers: 8, cdA: 0.4955 },
];

// Time step convergence
const timeStepData = [
  { dt: 0.0007, cdA: 0.4951 },
  { dt: 0.0014, cdA: 0.4955 },
  { dt: 0.0029, cdA: 0.4945 },
  { dt: 0.0058, cdA: 0.4915 },
];

// Shared chart styles
const chartAxisStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 12 };
const chartLabelStyle = { fill: "hsl(var(--muted-foreground))", fontSize: 13 };
const chartTooltipStyle = {
  backgroundColor: "hsl(var(--card))",
  border: "1px solid hsl(var(--border))",
  borderRadius: 8,
  color: "hsl(var(--foreground))",
};

const CrosshairCursor = (props: any) => {
  const { points, width, height, top, left } = props;
  if (!points || !points.length) return null;
  const { x, y } = points[0];
  return (
    <g>
      <line x1={x} y1={top} x2={x} y2={top + height} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={1} />
      <line x1={left} y1={y} x2={left + width} y2={y} stroke="hsl(var(--muted-foreground))" strokeDasharray="4 4" strokeWidth={1} />
    </g>
  );
};

const BaseSizeChart = ({ figureNumber }: { figureNumber: number }) => (
  <figure className="my-6">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-card p-4">
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
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            domain={[0.492, 0.502]}
            tickCount={6}
            tickFormatter={(v: number) => v.toFixed(3)}
            label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
            tick={chartAxisStyle}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Base size: ${l} mm`} cursor={<CrosshairCursor />} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex justify-between px-12 text-xs text-muted-foreground -mt-2">
        <span>↕ 0.25%</span>
        <span>↕ 0.57%</span>
      </div>
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Figure {figureNumber}:</span> Drag area vs Base size. Percentage errors comparing the selected base size with the finest and coarsest mesh cases. Fitted function: f(x) = -0.00009x + 0.506
    </figcaption>
  </figure>
);

const PrismLayerChart = ({ figureNumber }: { figureNumber: number }) => (
  <figure className="my-6">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-card p-4">
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
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            domain={[0.48, 0.5]}
            tickCount={6}
            tickFormatter={(v: number) => v.toFixed(3)}
            label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
            tick={chartAxisStyle}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Prism layers: ${l}`} cursor={<CrosshairCursor />} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
      <div className="flex justify-center text-xs text-muted-foreground -mt-2">
        <span>↕ 1.79%</span>
      </div>
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Figure {figureNumber}:</span> Average drag area vs Number of prism layers. Percentage error comparing highest and lowest number of prism layers
    </figcaption>
  </figure>
);

const TimeStepChart = ({ figureNumber }: { figureNumber: number }) => (
  <figure className="my-6">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-card p-4">
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
            stroke="hsl(var(--muted-foreground))"
          />
          <YAxis
            domain={[0.48, 0.51]}
            tickCount={7}
            tickFormatter={(v: number) => v.toFixed(3)}
            label={{ value: "CᴅA", angle: -90, position: "insideLeft", offset: 0, style: chartLabelStyle }}
            tick={chartAxisStyle}
            stroke="hsl(var(--muted-foreground))"
          />
          <Tooltip contentStyle={chartTooltipStyle} formatter={(value: number) => [value.toFixed(4), "CᴅA"]} labelFormatter={(l) => `Δt U/L: ${Number(l).toFixed(4)}`} cursor={{ stroke: "hsl(var(--muted-foreground))", strokeDasharray: "4 4" }} />
          <Scatter dataKey="cdA" fill="hsl(var(--primary))" stroke="hsl(var(--primary))" r={5} name="CᴅA" />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Figure {figureNumber}:</span> Drag area vs Non-dimensional time step Δt U/L
    </figcaption>
  </figure>
);

// CFD vs WT table
const ValidationTable = ({ figureNumber }: { figureNumber: number }) => (
  <figure className="my-6">
    <div className="w-full max-w-2xl mx-auto rounded-lg border border-border bg-card overflow-hidden">
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
    <figcaption className="mt-2 text-sm text-muted-foreground text-center">
      <span style={{ color: "#63ab85", fontWeight: 600 }}>Table {figureNumber}:</span> Comparison of wind tunnel results vs CFD results. C<sub>D</sub>A values converted to full scale.
    </figcaption>
  </figure>
);

// Mapping for speedway methodology images
const speedwayMethodologyImages: Record<string, { src: string; caption: string }> = {
  "3D Scanned Motorcycle Geometry": {
    src: geometryImg,
    caption: "Geometry of speedway and rider. Side view.",
  },
  "Computational Domain and Boundary Conditions": {
    src: domainImg,
    caption: "The dimensions of the computational domain used in the CFD simulations, where L = 2070 mm, H = 1520 mm, and W = 830 mm.",
  },
  "Polyhedral Mesh Detail and Prism Layers": {
    src: meshPrismImg,
    caption: "A zoomed-in representation of the prism layers used in the simulation. These layers are crucial for accurately capturing boundary layers.",
  },
};

const speedwayValidationImages: Record<string, { src: string; caption: string }> = {
  "Wind Tunnel Test Setup": {
    src: windTunnelSetupImg,
    caption: "3D-printed model used for wind tunnel testing. The model was printed in PLA plastic and split into four parts for manufacturing feasibility.",
  },
};

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
    "The front fairing was identified as one of the primary contributors to the motorcycle's aerodynamic drag. Early concepts generated extensive high-pressure regions and failed to deliver significant drag reductions. Ultimately, the front fairing was removed entirely, leading to a 5.6% drag reduction. The front forks and handlebar were then redesigned with more streamlined profiles, reducing drag by 6.3%. Hand covers were developed to reduce frontal area, improve alignment with the freestream, and guide airflow more efficiently around the rider's arms. The final configuration achieves a 9% reduction in drag area, primarily due to diminished stagnation pressure, smoother pressure recovery, and a narrower, less turbulent wake.",
  newDesignAnalysis:
    "The streamwise pressure coefficient contours clearly illustrate the aerodynamic advantages of the final design. Compared to the initial configuration, the new front eliminates the large high-pressure zone at the front fairing surface, promoting smoother flow attachment. The redesigned hand covers feature a more streamlined geometry, generating lower-pressure regions that contribute to reduced aerodynamic resistance. Lambda-2 vortex visualisations reveal that the original design induces larger vortices around the front fairing and handlebar, whereas the optimised configuration produces smaller structures, thereby reducing pressure drag.",
};

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
  const project = projectsData.find((p) => p.id === id);
  const isSpeedway = id === "speedway-aerodynamics";

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Portfolio</Button>
        </div>
      </div>
    );
  }

  const methodPlaceholders = project.methodologyPlaceholders || ["CFD Mesh Visualization", "Boundary Conditions Setup"];
  const resPlaceholders = project.resultsPlaceholders || ["Pressure Contour Plot", "Velocity Streamlines", "Before / After Comparison"];

  let figureCount = 0;
  const nextFigure = () => ++figureCount;

  // For speedway, render custom results section
  const renderSpeedwayResults = () => {
    return (
      <>
        {/* Accumulated drag - first */}
        <p className="text-muted-foreground leading-relaxed mt-4">{speedwayResultsText.accumulatedDrag}</p>
        <Figure src={accumulatedDragImg} alt="Accumulated drag" caption="Comparison of accumulated drag forces along the speedway profile." figureNumber={nextFigure()} />

        {/* Pressure coefficient */}
        <p className="text-muted-foreground leading-relaxed">{speedwayResultsText.pressureCoefficient}</p>
        <Figure src={cpContourImg} legendSrc={cpLegendImg} alt="Pressure coefficient contour" caption="Contour of pressure coefficient on mid-plane in flow direction. The mid-plane pressure coefficient contour illustrates pressure variations along the centreline of the speedway motorcycle. It highlights stagnation zones, areas of low pressure, and key separation regions." figureNumber={nextFigure()} />

        {/* Mean velocity */}
        <p className="text-muted-foreground leading-relaxed">{speedwayResultsText.meanVelocity}</p>
        <Figure src={meanVelocityImg} legendSrc={velocityLegendImg} alt="Mean velocity field" caption="Contour of mean velocity on mid-plane in flow direction. It highlights high-velocity regions around the helmet and front fairing, along with low-velocity wake areas behind the rider." figureNumber={nextFigure()} />

        {/* Vorticity */}
        <p className="text-muted-foreground leading-relaxed">{speedwayResultsText.vorticity}</p>
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

        {/* New design */}
        <h3 className="text-lg font-semibold mt-8 mb-3">New Front Design</h3>
        <p className="text-muted-foreground leading-relaxed">{speedwayResultsText.newDesign}</p>

        <Figure src={cpNewDesign} legendSrc={cpLegendImg} alt="Pressure coefficient new design" caption="Streamwise pressure coefficient for the new front design." figureNumber={nextFigure()} />

        <p className="text-muted-foreground leading-relaxed">{speedwayResultsText.newDesignAnalysis}</p>

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
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-8 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>

            {/* Cover image */}
            <div className="rounded-lg overflow-hidden aspect-video mb-8 border border-border">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            {/* Header */}
            <Badge variant="secondary" className="mb-4">{project.tag}</Badge>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-12">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{project.date}</span>
              <span className="flex items-center gap-2"><User className="h-4 w-4" />{project.role}</span>
            </div>

            {/* Content */}
            <div className="space-y-12">
              {/* Overview */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </section>

              {/* Objectives */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Objectives</h2>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              {/* Methodology */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Methodology</h2>
                <p className="text-muted-foreground leading-relaxed">{project.methodology}</p>

                <div className="mt-6 space-y-4">
                  {methodPlaceholders.map((label, i) => {
                    const imgData = isSpeedway ? speedwayMethodologyImages[label] : undefined;
                    if (imgData) {
                      return <Figure key={i} src={imgData.src} alt={label} caption={imgData.caption} figureNumber={nextFigure()} />;
                    }
                    return <ImagePlaceholder key={i} label={label} />;
                  })}
                </div>

                {/* Convergence Studies */}
                {project.supplementary && project.supplementary.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-6">Convergence Studies</h3>
                    <div className="space-y-8">
                      {project.supplementary.map((item, i) => (
                        <div key={i}>
                          <h4 className="text-base font-medium mb-3">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                          <div className="mt-4">
                            {isSpeedway && item.title === "Mesh Convergence: Base Size" ? (
                              <BaseSizeChart figureNumber={nextFigure()} />
                            ) : isSpeedway && item.title === "Mesh Convergence: Prism Layers" ? (
                              <>
                                <PrismLayerChart figureNumber={nextFigure()} />
                                <Figure src={wallYPlusImg} alt="Wall Y+ histogram" caption="Wall Y+ histogram for 8 prism layers." figureNumber={nextFigure()} />
                              </>
                            ) : isSpeedway && item.title === "Time Step Convergence" ? (
                              <TimeStepChart figureNumber={nextFigure()} />
                            ) : (
                              <ImagePlaceholder label={`${item.title} Chart / Figure`} />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Validation */}
              {project.validation && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-primary">Validation</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.validation}</p>
                  {isSpeedway && (
                    <div className="mt-6 space-y-4">
                      <Figure src={windTunnelSetupImg} alt="Wind tunnel test setup" caption="3D-printed model used for wind tunnel testing. The model was printed in PLA plastic and split into four parts for manufacturing feasibility." figureNumber={nextFigure()} />
                      <ValidationTable figureNumber={nextFigure()} />
                    </div>
                  )}
                  {!isSpeedway && project.validationPlaceholders && project.validationPlaceholders.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {project.validationPlaceholders.map((label, i) => (
                        <ImagePlaceholder key={i} label={label} />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Results & Impact */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Results & Impact</h2>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                {isSpeedway ? (
                  <div className="mt-6 space-y-4">
                    {renderSpeedwayResults()}
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    {resPlaceholders.map((label, i) => (
                      <ImagePlaceholder key={i} label={label} />
                    ))}
                  </div>
                )}
              </section>

              {/* Lessons Learned */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Lessons Learned</h2>
                <p className="text-muted-foreground leading-relaxed">{project.lessons}</p>
              </section>

              {/* Future Work */}
              {project.futureWork && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-primary">Future Work</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.futureWork}</p>
                </section>
              )}

              {/* Download PDF */}
              {project.pdfUrl && (
                <div className="pt-4 flex justify-center">
                  <Button asChild size="lg">
                    <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-5 w-5" />
                      Read Full Paper (PDF)
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;
