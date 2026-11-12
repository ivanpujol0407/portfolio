import { useState } from "react";
import { motion } from "framer-motion";
import { projectsData, type ProjectCategory } from "@/data/projectsData";
import ProjectCard from "@/components/ProjectCard";

const filters: ("All" | ProjectCategory)[] = ["All", "Product design", "CFD & research", "Mechanical design"];

const ProjectsSection = () => {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const shown = filter === "All" ? projectsData : projectsData.filter((p) => p.category === filter);

  return (
    <section id="work" className="scroll-mt-16 bg-cream pb-24 md:pb-32">
      <div className="container">
        <div className="flex flex-col gap-6 border-t border-ink/15 pt-10 md:flex-row md:items-end md:justify-between md:pt-14">
          <div>
            <h2 className="display-xl text-[16vw] sm:text-[12vw] lg:text-[128px]">Selected work</h2>
            <p className="mt-4 max-w-md text-[15px] text-ink-soft">
              Lamps I designed and printed, my published CFD research, and university projects.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 lg:shrink-0" role="tablist" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] transition-colors ${
                  filter === f ? "border-ink bg-ink text-cream" : "border-ink/25 text-ink hover:border-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((project, i) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
