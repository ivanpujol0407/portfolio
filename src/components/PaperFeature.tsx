import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projectsData } from "@/data/projectsData";
import meanVelocityImg from "@/assets/speedway/mean-velocity.png";

const PaperFeature = () => {
  const project = projectsData.find((p) => p.id === "speedway-aerodynamics");
  const pub = project?.publication;
  if (!project || !pub) return null;

  return (
    <section id="paper" className="scroll-mt-16 overflow-hidden bg-teal py-20 text-mint md:py-28">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow text-mint/70">
            {pub.journal} · {pub.date}
          </p>
          <h2 className="mt-4 flex flex-wrap items-baseline gap-x-5">
            <span className="display-xl text-[19vw] text-cream lg:text-[200px]">Published</span>
            <span className="font-serif text-[9vw] italic leading-none lg:text-[84px]">in {pub.journal}</span>
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={meanVelocityImg}
              alt="Mean velocity field with surface line integral convolution around the speedway rider"
              loading="lazy"
              className="w-full rounded-lg"
            />
            <figcaption className="mt-3 text-[12px] text-mint/60">
              Mean velocity on the mid-plane around the rider. Simcenter STAR-CCM+.
            </figcaption>
          </motion.figure>

          <div className="flex flex-col">
            <p className="font-serif text-[30px] leading-[1.1] text-cream md:text-[40px]">{pub.title}</p>
            <p className="mt-5 text-[14px] leading-relaxed text-mint/75">
              {pub.authors.map((a, i) => (
                <span key={a}>
                  <span className={i === 0 ? "font-semibold text-cream" : ""}>{a}</span>
                  {i < pub.authors.length - 1 ? ", " : ""}
                </span>
              ))}
            </p>

            <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-lg bg-mint/15">
              {pub.highlights.map((h) => (
                <div key={h.label} className="flex flex-col-reverse bg-teal p-5">
                  <dt className="text-[12px] leading-snug text-mint/70">{h.label}</dt>
                  <dd className="mb-2 font-mono text-[32px] font-medium leading-none text-cream md:text-[40px]">{h.value}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={pub.url}
                target="_blank"
                rel="noopener noreferrer"
                className="pill bg-mint text-teal hover:bg-cream"
              >
                Read the article
                <ArrowUpRight className="h-4 w-4" />
              </a>
              <Link to={`/project/${project.id}`} className="pill border border-mint/70 text-mint hover:bg-mint hover:text-teal">
                Case study
              </Link>
            </div>
            <p className="mt-5 font-mono text-[12px] text-mint/60">DOI {pub.doi}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaperFeature;
