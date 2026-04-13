import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { projectsData } from "@/data/projectsData";

const ProjectsSection = () => {
  const navigate = useNavigate();

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12"
        >
          Featured Projects
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {projectsData.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="overflow-hidden group cursor-pointer h-full flex flex-col bg-card border-border hover:border-primary/50 transition-colors">
                <div className="relative overflow-hidden aspect-video">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => { e.currentTarget.src = "/placeholder.svg"; }}
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="secondary" className="text-xs">
                      {project.tag}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4 flex-1">
                    {project.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="w-fit p-0 h-auto text-primary hover:text-primary/80"
                    onClick={() => navigate(`/project/${project.id}`)}
                  >
                    Read Case Study
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
