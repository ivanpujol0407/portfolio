import { motion } from "framer-motion";
import { Wind, Cpu, Box, Code, PenTool, Layers, Gauge } from "lucide-react";

const skills = [
  { name: "STAR-CCM+", level: "Advanced", icon: Wind },
  { name: "OpenFOAM", level: "Intermediate", icon: Layers },
  { name: "SolidWorks", level: "Advanced", icon: Box },
  { name: "ANSYS", level: "Proficient", icon: Gauge },
  { name: "3D Printing", level: "Proficient", icon: Cpu },
  { name: "AutoCAD", level: "Proficient", icon: PenTool },
  { name: "CFD", level: "Advanced", icon: Wind },
  { name: "Python", level: "Scripting", icon: Code },
];

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-3xl font-bold mb-12"
      >
        Technical Arsenal
      </motion.h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {skills.map((skill, i) => (
          <motion.div
            key={skill.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="p-4 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors group"
          >
            <skill.icon className="h-6 w-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
            <h3 className="font-semibold text-sm">{skill.name}</h3>
            <p className="text-xs text-muted-foreground">{skill.level}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
