import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const tools = [
  {
    tag: "CFD Pre-Processing",
    title: "y⁺ Wall Calculator",
    description:
      "Compute first cell height and boundary layer mesh parameters for accurate wall-resolved and wall-modelled CFD simulations. Supports both internal and external flow domains with multiple empirical correlations.",
    href: "https://yplus-calculator.vercel.app/",
    features: ["External & Internal Flow", "Wall-resolved & Wall-modelled", "Prism Layer Sizing"],
  },
  {
    tag: "CFD Post-Processing",
    title: "GCI Mesh Convergence Calculator",
    description:
      "Quantify numerical discretisation error following Celik et al. (2008). Computes Richardson extrapolation, observed order of accuracy, GCI uncertainty bands and asymptotic convergence verification for multiple quantities of interest simultaneously.",
    href: "https://gci-calculator.vercel.app/",
    features: ["Richardson Extrapolation", "Mesh Convergence", "Multi-Quantity Support"],
  },
];

const ToolsSection = () => (
  <section id="tools" className="py-24 border-b border-border">
    <div className="container mx-auto px-4">
      <SectionHeading
        eyebrow="Free Engineering Tools"
        title="Tools"
        intro="Engineering utilities I built to support CFD and simulation workflows — free, browser-based, no sign-up."
      />

      <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
        {tools.map((tool, i) => (
          <motion.a
            key={tool.title}
            href={tool.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="group flex flex-col bg-card border border-border border-t-2 border-t-border hover:border-t-primary hover:border-primary/40 transition-colors p-7"
          >
            <div className="flex items-center justify-between mb-5">
              <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-primary border border-primary/30 bg-primary/10 px-2 py-[3px]">
                {tool.tag}
              </span>
              <ExternalLink className="h-4 w-4 text-muted-foreground/60 transition-colors group-hover:text-primary" />
            </div>

            <h3 className="text-xl font-bold tracking-tight mb-3">{tool.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
              {tool.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {tool.features.map((f) => (
                <span
                  key={f}
                  className="font-mono text-[0.62rem] px-2 py-1 bg-muted/50 text-muted-foreground border border-border"
                >
                  {f}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-primary">
              Open Tool
            </span>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection;
