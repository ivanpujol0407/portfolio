import { motion } from "framer-motion";
import { Briefcase, GraduationCap, Globe } from "lucide-react";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const timelineItems = [
  { date: "Sep 2024", title: "Mechanical Engineer", place: "Alfa Laval — Copenhagen", icon: Briefcase },
  { date: "Sep 2024", title: "Master's Thesis", place: "DTU — Copenhagen", icon: GraduationCap },
  { date: "Apr 2023", title: "Mechanical Design Engineer", place: "Vadecity — Barcelona", icon: Briefcase },
  { date: "Sep 2022", title: "MSc Industrial Engineering", place: "UPC — Barcelona", icon: GraduationCap },
  { date: "Sep 2022", title: "Quality Engineer Intern", place: "SEAT — Martorell, Spain", icon: Briefcase },
  { date: "Feb 2022", title: "International Exchange", place: "Università di Padova — Italy", icon: Globe },
  { date: "Sep 2018", title: "BSc Industrial Engineering", place: "UPC — Barcelona", icon: GraduationCap },
];

const AboutSection = () => (
  <section id="about" className="py-24">
    <div className="container mx-auto px-4">
      <motion.h2 {...fadeUp} className="text-3xl font-bold mb-12">
        About Me
      </motion.h2>

      <div className="grid md:grid-cols-2 gap-12 mb-16">
        <motion.div {...fadeUp}>
          <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4">Background</h3>
          <p className="text-muted-foreground leading-relaxed">
            Based in Copenhagen, I am a Mechanical Engineer at Alfa Laval, where I design mechanical components and systems for Fresh Water Generators. I hold a Master's Degree in Industrial Engineering with a specialization in Mechanical Engineering from UPC. Additionally, I completed my master's thesis on CFD simulations of speedway motorcycles at DTU.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }}>
          <h3 className="text-sm font-mono text-primary uppercase tracking-wider mb-4">Philosophy</h3>
          <p className="text-muted-foreground leading-relaxed">
            I view engineering not merely as a design process, but as a discipline of rigorous validation and predictability. I believe that the gap between theoretical concepts and physical reality must be bridged by hard data, not intuition. I prioritize using advanced simulation tools to test designs virtually before they ever reach the manufacturing floor. My focus is delivering robust, data-driven solutions that eliminate uncertainty and maximize efficiency.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.h3 {...fadeUp} className="text-sm font-mono text-primary uppercase tracking-wider mb-8">
        Experience & Education
      </motion.h3>
      <div className="relative border-l-2 border-border ml-4">
        {timelineItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative pl-8 pb-8 last:pb-0"
          >
            <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-primary border-2 border-background" />
            <span className="text-xs font-mono text-muted-foreground">{item.date}</span>
            <h4 className="font-semibold text-foreground">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.place}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
