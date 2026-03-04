import projectSpeedway from "@/assets/project-speedway.jpg";
import projectIndustrial from "@/assets/project-industrial.jpg";
import projectMicromobility from "@/assets/project-micromobility.jpg";

export interface Project {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  date: string;
  role: string;
  overview: string;
  objectives: string[];
  methodology: string;
  results: string;
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

export const projectsData: Project[] = [
  {
    id: "speedway-aerodynamics",
    tag: "Research Paper",
    title: "CFD Simulations of Speedway Motorcycles",
    description:
      "First combined CFD and wind tunnel aerodynamic investigation of a speedway motorcycle. Validated simulations with less than 2% deviation, identified rider as dominant drag contributor, and achieved 9% drag reduction with a new front design.",
    image: projectMeanVelocity,
    date: "2025",
    role: "Lead Researcher, Technical University of Denmark (DTU)",
    overview:
      "This study presents a computational and experimental aerodynamic analysis of a speedway motorcycle, focusing on drag reduction strategies to enhance performance. Using CFD simulations in Simcenter STAR-CCM+ and wind tunnel experiments, the aerodynamic characteristics of the motorcycle and rider are investigated. Wind tunnel experiments validated the CFD methodology, showing deviations of 2.0% and 0.2% in drag area at 30 m/s and 40 m/s respectively, confirming the reliability of the numerical model. The rider is identified as the primary drag contributor, accounting for over 50% of the total aerodynamic resistance. A new front fairing and hand cover design is proposed, achieving a 9.0% reduction in total drag. This is the first combined CFD and wind tunnel aerodynamic investigation of a speedway motorcycle, addressing a gap in current literature.",
    objectives: [
      "Conduct the first CFD aerodynamic study of a speedway motorcycle using a 3D-scanned full-scale model",
      "Validate CFD simulations against wind tunnel experiments on a 1:6 scale 3D-printed model",
      "Identify and quantify the main aerodynamic drag contributors on the rider-motorcycle system",
      "Analyse the effect of rotating vs stationary wheels on aerodynamic performance",
      "Propose and evaluate new front fairing and hand cover designs for drag reduction",
    ],
    methodology:
      "The full-scale geometry of the speedway motorcycle and rider was obtained via 3D scanning using a MetraSCAN BLACK+™|Elite scanner, capturing the actual motorcycle provided by Team Denmark. The scanned surfaces were cleaned, repaired, and prepared for meshing in Simcenter STAR-CCM+. The computational domain extended 12.5L x 6H x 7.5W around the motorcycle, with a velocity inlet at the front (freestream velocity of 30 m/s, turbulence intensity 1%), a pressure outlet at the rear, a no-slip ground plane moving at freestream velocity, and symmetry conditions on the top and lateral boundaries. A polyhedral mesh of approximately 21 million cells was generated with volumetric refinement zones around the motorcycle and wake region. Eight prism layers with a total thickness of 2 mm were applied to all solid surfaces, ensuring wall y+ < 5 throughout the viscous sublayer. The simulations used an unsteady RANS approach with the SST k-omega turbulence model and All-y+ wall treatment. A second-order implicit temporal scheme with a time step of 2x10⁻⁴ s was employed, maintaining CFL < 1 across the domain. Simulations were run until statistical convergence of the drag force was achieved.",
    methodologyPlaceholders: [
      "3D Scanned Motorcycle Geometry",
      "Computational Domain and Boundary Conditions",
      "Polyhedral Mesh Detail and Prism Layers",
    ],
    validation:
      "Wind tunnel experiments were conducted at the DTU Climate Centre using a 1:6 scale 3D-printed PLA model of the motorcycle. The wind tunnel test section has a cross-section of 2.6 m x 2.0 m, and the scale model resulted in a blockage ratio of 5.21%. Drag force was measured at freestream velocities of 30 m/s and 40 m/s using a calibrated force balance. Reynolds number independence was verified by comparing results across multiple velocities. To replicate wind tunnel conditions in CFD, a separate simulation was set up matching the tunnel geometry, boundary conditions, and the 1:6 scale model. The CFD wind tunnel simulation used the same mesh settings and turbulence model (SST k-omega) as the full-scale case. Comparison of experimental and numerical drag area values showed a deviation of only 2.0% at 30 m/s and 0.2% at 40 m/s, confirming the reliability of the CFD methodology and the mesh configuration used for all subsequent full-scale analyses.",
    validationPlaceholders: [
      "Wind Tunnel Test Setup",
      "CFD vs Wind Tunnel Drag Area Comparison Chart",
    ],
    results:
      "The total drag force for the full motorcycle-rider configuration is 261.53 N (C_D = 0.69). The rider contributes approximately 52.4% of total drag, with the front fairing, handlebars, and rider's hands accounting for 28% of total drag in the region between 0.20 and 0.30 x/L. Wheel rotation increases total drag area by 1.17%, primarily through intensified low-pressure regions around the front wheel. The proposed new front design, which removes the original fairing, streamlines the front forks and handlebar, and adds aerodynamic hand covers, achieved a 9.0% reduction in total drag area (from C_DA = 0.491 to 0.447) by minimising high-pressure stagnation zones, promoting smoother flow attachment, and reducing wake turbulence.",
    resultsPlaceholders: [
      "Pressure Coefficient Contour (Mid-plane)",
      "Mean Velocity Field",
      "Accumulated Drag Force Along Longitudinal Axis",
      "Vorticity Contours on YZ Planes",
      "Streamwise Pressure Coefficient, New vs Original Design",
      "λ₂ Vortex Structures Comparison",
    ],
    lessons:
      "The mesh quality around the rider geometry proved critical for accurate results. The convergence study confirmed that a base size of 110 mm with 8 prism layers is required to keep all wall-adjacent cells within the viscous sublayer (y+ < 5). The rider's upright posture is the dominant source of drag, creating extensive flow separation and wake formation that cannot be addressed by motorcycle geometry changes alone. Geometric asymmetry in the rider's posture (right leg touching the ground, left leg on foot peg) produces measurable differences in drag under yaw conditions. The front fairing, originally designed for sponsor graphics, contributes significantly to drag. Its removal alone reduced drag by 5.6%. Proper wind tunnel validation with carefully controlled blockage ratios and Reynolds number independence studies is essential for CFD credibility.",
    futureWork:
      "Future research should explore rider posture optimisation as the rider accounts for over 50% of total drag. Advanced turbulence modelling approaches such as Large Eddy Simulation (LES) or hybrid RANS-LES methods could provide higher-fidelity results for the complex separated flows around the rider. The yaw angle study revealed significant asymmetric drag behaviour that warrants further investigation under realistic cornering conditions. Additionally, the interaction between rotating wheels and the rest of the geometry suggests that integrated wheel-fairing designs could yield further drag reductions. Full-scale wind tunnel or on-track validation of the proposed front design modifications would confirm the predicted 9% drag improvement under real racing conditions.",
    pdfUrl: "/CFD_simulations_Speedway_motorcycles.pdf",
    supplementary: [
      {
        title: "Mesh Convergence: Base Size",
        content:
          "Six meshes were generated with base sizes ranging from 80 to 130 mm, keeping all other parameters fixed (6 prism layers, total thickness 2 mm, time step 1×10⁻⁴ s). All simulations ran for 0.5 s (~7.25 tU/L). A fitted regression line extrapolated results towards zero base size, predicting a drag area of 0.51. Coarse meshes (120 to 130 mm) deviated by ~2.5% from the extrapolated ideal. The 110 mm mesh showed only 1.9% deviation, with just 0.25% difference from the finest 80 mm mesh, confirming it as the optimal balance between accuracy and computational cost.",
      },
      {
        title: "Mesh Convergence: Prism Layers",
        content:
          "Five simulations were performed with prism layer counts between 4 and 8, maintaining a constant total thickness of 2 mm. Drag force variation across all cases remained below 2%. However, wall y+ distributions revealed critical differences: with 4 to 5 prism layers, significant cells had y+ > 5 (buffer layer), reducing turbulence model accuracy. Only the 8-layer configuration ensured all wall-adjacent cells remained within the viscous sublayer (y+ < 5). The increase from 7 to 8 layers added only 1.4M cells (19.8M to 21.2M), making 8 layers the selected configuration.",
      },
      {
        title: "Time Step Convergence",
        content:
          "Four time steps were tested: 5×10⁻⁵ s, 1×10⁻⁴ s, 2×10⁻⁴ s, and 4×10⁻⁴ s using the validated mesh (110 mm base, 8 prism layers). At Δt = 4×10⁻⁴ s, large domain regions exceeded CFL = 1, discarding this option. At Δt = 5×10⁻⁵ s, CFL < 1 everywhere but with no improvement in results. At Δt = 2×10⁻⁴ s, CFL remained below unity across most of the domain, with elevated values only in localised regions around the front wheel and helmet due to flow acceleration. Average drag area varied by less than 1% across all valid time steps, confirming Δt = 2×10⁻⁴ s as the optimal compromise between fidelity and computational cost.",
      },
    ],
  },
  {
    id: "industrial-plant-design",
    tag: "Professional",
    title: "Industrial Plant Design",
    description: "Designing mechanical components for Fresh Water Generators at Alfa Laval.",
    image: projectIndustrial,
    date: "September 2024 to Present",
    role: "Mechanical Engineer, Alfa Laval, Copenhagen",
    overview:
      "As a Mechanical Engineer at Alfa Laval, I design and optimize mechanical components and systems for Fresh Water Generators (FWGs). These systems convert seawater into potable water through vacuum distillation, serving maritime and industrial applications worldwide.",
    objectives: [
      "Design mechanical components meeting ASME and PED standards",
      "Optimize heat exchanger plate geometries for thermal efficiency",
      "Reduce manufacturing costs while maintaining quality standards",
      "Develop standardized component libraries for FWG product lines",
    ],
    methodology:
      "The design process follows a systematic approach combining SolidWorks 3D CAD modeling with Finite Element Analysis (FEA) for structural validation. Thermal simulations are conducted to optimize heat transfer surfaces. Design reviews follow stage-gate methodology with cross-functional teams including manufacturing, procurement, and quality assurance. All designs are validated against ISO 17025 testing protocols before production release.",
    results:
      "Successfully redesigned the evaporator plate pack, achieving a 15% improvement in thermal efficiency while reducing material usage by 8%. Standardized the component library across three FWG product lines, reducing engineering lead time by 30%. Implemented design-for-manufacturing principles that decreased assembly time by 20% and reduced quality non-conformances by 40%.",
    lessons:
      "Working in a mature product environment taught me the importance of backward compatibility and standardization. Every design change must consider the installed base of thousands of units worldwide. Close collaboration with manufacturing teams early in the design process prevented costly redesigns and ensured producibility.",
  },
  {
    id: "micromobility-stations",
    tag: "Start-up",
    title: "Micromobility Stations",
    description: "Product development for Vadecity smart bike stations. Optimization of mechanical assemblies.",
    image: projectMicromobility,
    date: "April 2023 to August 2024",
    role: "Mechanical Design Engineer, Vadecity, Barcelona",
    overview:
      "At Vadecity, I led the mechanical design of smart micromobility docking stations for urban environments. The product integrates IoT sensors, locking mechanisms, and modular frames designed for rapid deployment in European cities.",
    objectives: [
      "Design a modular docking station adaptable to various bike-sharing systems",
      "Optimize the locking mechanism for reliability and user experience",
      "Ensure compliance with urban furniture regulations across EU markets",
      "Minimize production costs through design-for-manufacturing optimization",
    ],
    methodology:
      "The development followed an agile product design methodology with rapid prototyping cycles. SolidWorks was used for 3D modeling and assembly design. Stress analysis was performed using SolidWorks Simulation to validate structural integrity under vandalism load cases. Prototypes were manufactured using a combination of sheet metal fabrication and CNC machining. User testing was conducted in Barcelona's urban environment with 50 beta units.",
    results:
      "Delivered a final design that reduced unit manufacturing cost by 35% compared to the initial prototype. The modular architecture allowed a single station to accommodate 4 to 12 bikes with minimal part changes. The locking mechanism achieved a 99.7% reliability rate over 10,000 test cycles. The design was approved for deployment in three European cities.",
    lessons:
      "Start-up environments demand rapid iteration and pragmatic engineering decisions. I learned to balance engineering perfection with time-to-market pressures. The importance of designing for real-world abuse scenarios (vandalism, weather exposure) became clear after early field failures of prototype locking mechanisms.",
  },
];
