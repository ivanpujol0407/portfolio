import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Wind, Layers } from "lucide-react";

const tools = [
  {
    icon: Layers,
    tag: "CFD Pre-Processing",
    title: "y⁺ Wall Calculator",
    description:
      "Compute first cell height and boundary layer mesh parameters for accurate wall-resolved and wall-modelled CFD simulations. Supports both internal and external flow domains with multiple empirical correlations.",
    href: "https://yplus-calculator.vercel.app/",
    features: ["External & Internal Flow", "Wall-resolved & Wall-modelled", "Prism Layer Sizing"],
  },
  {
    icon: Wind,
    tag: "CFD Post-Processing",
    title: "GCI Mesh Convergence Calculator",
    description:
      "Quantify numerical discretisation error following Celik et al. (2008). Computes Richardson extrapolation, observed order of accuracy, GCI uncertainty bands and asymptotic convergence verification for multiple quantities of interest simultaneously.",
    href: "https://gci-calculator.vercel.app/",
    features: ["Richardson Extrapolation", "Mesh Convergence", "Multi-Quantity Support"],
  },
];

const ToolsSection = () => (
  <section id="tools" className="py-24">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-4"
      >
        Tools
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-muted-foreground mb-12 max-w-xl"
      >
        Engineering utilities I built to support CFD and simulation workflows.
      </motion.p>

      <div className="grid md:grid-cols-3 gap-6">
        {tools.map((tool, i) => (
          <motion.div
            key={tool.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
          >
            <Card className="h-full flex flex-col bg-card border-border hover:border-primary/50 transition-colors group">
              <CardContent className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
                    <tool.icon className="h-5 w-5 text-primary" />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {tool.tag}
                  </Badge>
                </div>

                <h3 className="text-xl font-semibold mb-2">{tool.title}</h3>
                <p className="text-sm text-muted-foreground mb-5 flex-1 leading-relaxed">
                  {tool.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {tool.features.map((f) => (
                    <span
                      key={f}
                      className="text-xs font-mono px-2 py-1 rounded bg-muted text-muted-foreground border border-border"
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <Button
                  variant="ghost"
                  className="w-fit p-0 h-auto text-primary hover:text-primary/80"
                  asChild
                >
                  <a href={tool.href} target="_blank" rel="noopener noreferrer">
                    Open Tool
                    <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ToolsSection;
