import { useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import profileImg from "@/assets/profile.png";
import FlowField from "@/components/FlowField";

const specs = [
  { label: "Role", value: "Mechanical Engineer · Alfa Laval" },
  { label: "Focus", value: "CFD · FEA · Mechanical Design" },
  { label: "Base", value: "Copenhagen, DK" },
];

const HeroSection = () => {
  const portraitRef = useRef<HTMLDivElement>(null);

  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative min-h-screen flex items-center pt-16 border-b border-border overflow-hidden">
      {/* Live potential-flow field — streamlines deflect around the portrait */}
      <FlowField obstacleRef={portraitRef} />

      <div className="relative z-10 container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="font-mono text-[0.65rem] tracking-[0.24em] uppercase text-primary mb-6">
            Mechanical Engineer &amp; CFD Specialist
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.05] mb-6">
            Optimizing Performance Through{" "}
            <span className="font-serif italic font-medium text-primary">
              Fluid Dynamics
            </span>
          </h1>
          <p className="text-muted-foreground text-lg mb-10 max-w-lg leading-relaxed">
            Bridging the gap between advanced Fluid Dynamics and practical
            Mechanical Design to deliver robust, high-efficiency solutions.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">
            <Button size="lg" onClick={() => scrollTo("#projects")}>
              <ArrowDown className="mr-2 h-4 w-4" />
              View Work
            </Button>
            <Button variant="outline" size="lg" onClick={() => scrollTo("#contact")}>
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>

          {/* Spec readout strip */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-border border border-border max-w-xl">
            {specs.map((s) => (
              <div key={s.label} className="bg-background/90 backdrop-blur-sm px-4 py-3">
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-muted-foreground/70 mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-[0.72rem] text-foreground leading-snug">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.figure
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-col items-center"
        >
          <div ref={portraitRef} className="relative w-72 h-72 md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem]">
            {/* Registration ticks — technical drawing corners */}
            {["top-0 left-0 border-t border-l", "top-0 right-0 border-t border-r",
              "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((pos) => (
              <span
                key={pos}
                aria-hidden="true"
                className={`absolute ${pos} w-5 h-5 border-primary/70 z-10`}
              />
            ))}
            <div className="absolute inset-2 overflow-hidden border border-border bg-card">
              <img
                src={profileImg}
                alt="Ivan Pujol — Mechanical Engineer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <figcaption className="mt-4 font-mono text-[0.65rem] text-muted-foreground/80 tracking-wide">
            <span className="text-primary font-semibold">Fig. 00:</span> Bluff body in uniform stream — Ivan Pujol
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
};

export default HeroSection;
