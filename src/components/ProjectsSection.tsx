import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import SectionHeading from "@/components/SectionHeading";

const ProjectsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-24 border-b border-border">
      <div className="container mx-auto px-4">
        <SectionHeading
          eyebrow="Case Studies"
          title="Featured Projects"
          intro="Documented engineering work — methodology, validation and quantified results."
        />

        <div className="grid md:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              onClick={() => navigate(`/project/${project.id}`)}
              className="group cursor-pointer flex flex-col bg-card border border-border hover:border-primary/40 transition-colors"
            >
              <div className="relative overflow-hidden aspect-video border-b border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-[0.58rem] tracking-[0.1em] uppercase text-muted-foreground border border-border bg-muted/40 px-2 py-[3px]">
                    {project.tag}
                  </span>
                  <span className="font-mono text-[0.68rem] text-muted-foreground/70 tabular-nums">
                    {project.date}
                  </span>
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-2 leading-snug">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-5 flex-1">
                  {project.description}
                </p>
                <span className="inline-flex items-center gap-2 font-mono text-[0.68rem] tracking-[0.12em] uppercase text-primary">
                  Read Case Study
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
