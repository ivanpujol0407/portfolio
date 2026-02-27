import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projectsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projectsData.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project Not Found</h1>
          <Button onClick={() => navigate("/")}>Back to Portfolio</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Button variant="ghost" onClick={() => navigate("/")} className="mb-8 text-muted-foreground">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Portfolio
            </Button>

            {/* Cover image */}
            <div className="rounded-lg overflow-hidden aspect-video mb-8 border border-border">
              <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
            </div>

            {/* Header */}
            <Badge variant="secondary" className="mb-4">{project.tag}</Badge>
            <h1 className="text-4xl font-bold mb-4">{project.title}</h1>
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground mb-12">
              <span className="flex items-center gap-2"><Calendar className="h-4 w-4" />{project.date}</span>
              <span className="flex items-center gap-2"><User className="h-4 w-4" />{project.role}</span>
            </div>

            {/* Content */}
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Objectives</h2>
                <ul className="space-y-2">
                  {project.objectives.map((obj, i) => (
                    <li key={i} className="flex items-start gap-3 text-muted-foreground">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-primary flex-shrink-0" />
                      {obj}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Methodology</h2>
                <p className="text-muted-foreground leading-relaxed">{project.methodology}</p>
                {/* Placeholder for 3D viewer / CFD images */}
                <div className="mt-6 grid md:grid-cols-2 gap-4">
                  <div className="aspect-video rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
                    CFD Mesh Visualization
                  </div>
                  <div className="aspect-video rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground">
                    Boundary Conditions Setup
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Results & Impact</h2>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                <div className="mt-6 grid md:grid-cols-3 gap-4">
                  <div className="aspect-square rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground text-center p-4">
                    Pressure Contour Plot
                  </div>
                  <div className="aspect-square rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground text-center p-4">
                    Velocity Streamlines
                  </div>
                  <div className="aspect-square rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground text-center p-4">
                    Before / After Comparison
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Lessons Learned</h2>
                <p className="text-muted-foreground leading-relaxed">{project.lessons}</p>
              </section>
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;
