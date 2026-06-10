import { motion } from "framer-motion";
import SectionHeading from "@/components/SectionHeading";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

const timelineItems = [
  { date: "Sep 2024", title: "Mechanical Engineer", place: "Alfa Laval — Copenhagen", kind: "Work" },
  { date: "Sep 2024", title: "Master's Thesis", place: "DTU — Copenhagen", kind: "Education" },
  { date: "Apr 2023", title: "Mechanical Design Engineer", place: "Vadecity — Barcelona", kind: "Work" },
  { date: "Sep 2022", title: "MSc Industrial Engineering", place: "UPC — Barcelona", kind: "Education" },
  { date: "Sep 2022", title: "Quality Engineer Intern", place: "SEAT — Martorell, Spain", kind: "Work" },
  { date: "Feb 2022", title: "International Exchange", place: "Università di Padova — Italy", kind: "Exchange" },
  { date: "Sep 2018", title: "BSc Industrial Engineering", place: "UPC — Barcelona", kind: "Education" },
];

const AboutSection = () => (
  <section id="about" className="py-24 border-b border-border">
    <div className="container mx-auto px-4">
      <SectionHeading eyebrow="Profile" title="About Me" />

      <div className="grid md:grid-cols-2 gap-px bg-border border border-border mb-16">
        <motion.div {...fadeUp} className="bg-card p-7">
          <h3 className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-primary mb-4">
            Background
          </h3>
          <p className="text-muted-foreground leading-[1.8] text-[0.95rem]">
            Based in Copenhagen, I am a Mechanical Engineer at Alfa Laval, where I design mechanical components and systems for Fresh Water Generators. I hold a Master's Degree in Industrial Engineering with a specialization in Mechanical Engineering from UPC. Additionally, I completed my master's thesis on CFD simulations of speedway motorcycles at DTU.
          </p>
        </motion.div>
        <motion.div {...fadeUp} transition={{ duration: 0.5, delay: 0.1 }} className="bg-card p-7">
          <h3 className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-primary mb-4">
            Philosophy
          </h3>
          <p className="text-muted-foreground leading-[1.8] text-[0.95rem]">
            I view engineering not merely as a design process, but as a discipline of rigorous validation and predictability. I believe that the gap between theoretical concepts and physical reality must be bridged by hard data, not intuition. I prioritize using advanced simulation tools to test designs virtually before they ever reach the manufacturing floor. My focus is delivering robust, data-driven solutions that eliminate uncertainty and maximize efficiency.
          </p>
        </motion.div>
      </div>

      {/* Timeline */}
      <motion.h3
        {...fadeUp}
        className="font-mono text-[0.62rem] tracking-[0.22em] uppercase text-primary mb-8"
      >
        Experience &amp; Education
      </motion.h3>
      <div className="relative border-l border-border ml-2">
        {timelineItems.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
            className="relative pl-8 pb-9 last:pb-0"
          >
            <span className="absolute -left-[4.5px] top-[5px] w-2 h-2 bg-background border border-primary rotate-45" />
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <span className="font-mono text-[0.68rem] text-muted-foreground/80 tabular-nums">
                {item.date}
              </span>
              <span className="font-mono text-[0.58rem] tracking-[0.14em] uppercase text-muted-foreground/50">
                {item.kind}
              </span>
            </div>
            <h4 className="font-semibold text-foreground mt-1">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.place}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default AboutSection;
