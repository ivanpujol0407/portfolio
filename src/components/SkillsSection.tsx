import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

type Level = "Advanced" | "Proficient" | "Beginner";

const levelValue: Record<Level, number> = { Advanced: 3, Proficient: 2, Beginner: 1 };

const skills: { name: string; level: Level; domain: string }[] = [
  { name: "STAR-CCM+", level: "Advanced", domain: "CFD" },
  { name: "SolidWorks", level: "Proficient", domain: "CAD" },
  { name: "ANSYS", level: "Proficient", domain: "Simulation" },
  { name: "3D Printing", level: "Proficient", domain: "Prototyping" },
  { name: "AutoCAD", level: "Proficient", domain: "CAD" },
  { name: "CFD", level: "Proficient", domain: "Simulation" },
  { name: "OpenFOAM", level: "Beginner", domain: "CFD" },
  { name: "FEA", level: "Beginner", domain: "Simulation" },
];

const LevelMeter = ({ level }: { level: Level }) => (
  <div className="flex items-center gap-1" aria-label={`Level: ${level}`}>
    {[1, 2, 3].map((n) => (
      <span
        key={n}
        className={`h-[3px] w-5 ${n <= levelValue[level] ? "bg-primary" : "bg-border"}`}
      />
    ))}
  </div>
);

const SkillsSection = () => (
  <section id="skills" className="py-24 border-b border-border">
    <div className="container mx-auto px-4">
      <SectionHeading eyebrow="Capabilities" title="Technical Arsenal" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border border border-border">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.04 }}
            className="bg-card p-5 hover:bg-[hsl(0_0%_6%)] transition-colors"
          >
            <div className="font-mono text-[0.56rem] tracking-[0.16em] uppercase text-muted-foreground/60 mb-2">
              {skill.domain}
            </div>
            <h3 className="font-semibold text-sm mb-3">{skill.name}</h3>
            <div className="flex items-center justify-between">
              <LevelMeter level={skill.level} />
              <span className="font-mono text-[0.6rem] text-muted-foreground/70">
                {skill.level}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
