import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, User, FileText } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { projectsData } from "@/data/projectsData";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ImagePlaceholder = ({ label, aspect = "video" }: { label: string; aspect?: "video" | "square" }) => (
  <div
    className={`w-full rounded-lg border border-dashed border-border bg-muted/50 flex items-center justify-center text-sm text-muted-foreground p-6 text-center ${
      aspect === "square" ? "aspect-[4/3]" : "aspect-video"
    }`}
  >
    {label}
  </div>
);

const ProjectPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => { window.scrollTo(0, 0); }, [id]);
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

  const methodPlaceholders = project.methodologyPlaceholders || ["CFD Mesh Visualization", "Boundary Conditions Setup"];
  const resPlaceholders = project.resultsPlaceholders || ["Pressure Contour Plot", "Velocity Streamlines", "Before / After Comparison"];

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
              {/* Overview */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{project.overview}</p>
              </section>

              {/* Objectives */}
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

              {/* Methodology */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Methodology</h2>
                <p className="text-muted-foreground leading-relaxed">{project.methodology}</p>

                {/* Placeholders interspersed after text */}
                <div className="mt-6 space-y-4">
                  {methodPlaceholders.map((label, i) => (
                    <ImagePlaceholder key={i} label={label} />
                  ))}
                </div>

                {/* Convergence Studies as subsection */}
                {project.supplementary && project.supplementary.length > 0 && (
                  <div className="mt-10">
                    <h3 className="text-lg font-semibold mb-6">Convergence Studies</h3>
                    <div className="space-y-8">
                      {project.supplementary.map((item, i) => (
                        <div key={i}>
                          <h4 className="text-base font-medium mb-3">{item.title}</h4>
                          <p className="text-sm text-muted-foreground leading-relaxed">{item.content}</p>
                          <div className="mt-4">
                            <ImagePlaceholder label={`${item.title} Chart / Figure`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>

              {/* Validation */}
              {project.validation && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-primary">Validation</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.validation}</p>
                  {project.validationPlaceholders && project.validationPlaceholders.length > 0 && (
                    <div className="mt-6 space-y-4">
                      {project.validationPlaceholders.map((label, i) => (
                        <ImagePlaceholder key={i} label={label} />
                      ))}
                    </div>
                  )}
                </section>
              )}

              {/* Results & Impact */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Results & Impact</h2>
                <p className="text-muted-foreground leading-relaxed">{project.results}</p>
                <div className="mt-6 space-y-4">
                  {resPlaceholders.map((label, i) => (
                    <ImagePlaceholder key={i} label={label} />
                  ))}
                </div>
              </section>

              {/* Lessons Learned */}
              <section>
                <h2 className="text-xl font-semibold mb-4 text-primary">Lessons Learned</h2>
                <p className="text-muted-foreground leading-relaxed">{project.lessons}</p>
              </section>

              {/* Future Work */}
              {project.futureWork && (
                <section>
                  <h2 className="text-xl font-semibold mb-4 text-primary">Future Work</h2>
                  <p className="text-muted-foreground leading-relaxed">{project.futureWork}</p>
                </section>
              )}

              {/* Download PDF */}
              {project.pdfUrl && (
                <div className="pt-4 flex justify-center">
                  <Button asChild size="lg">
                    <a href={project.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-5 w-5" />
                      Read Full Paper (PDF)
                    </a>
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProjectPage;