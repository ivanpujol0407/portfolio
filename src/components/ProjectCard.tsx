import { Link } from "react-router-dom";
import type { Project } from "@/data/projectsData";

const badgeTone = {
  flame: "bg-flame text-cream",
  ink: "bg-ink text-cream",
  teal: "bg-teal text-mint",
};

/** Product-style card: big image, small badge, name, one line, meta row. */
const ProjectCard = ({ project }: { project: Project }) => {
  const isRender = project.cardStyle === "render";

  return (
    <Link to={`/project/${project.id}`} className="group block focus-visible:outline-none">
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-lg ${
          isRender ? "bg-sand" : "bg-ink"
        } ring-offset-4 ring-offset-cream transition group-focus-visible:ring-2 group-focus-visible:ring-teal`}
      >
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            loading="lazy"
            className={`h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.04] ${
              isRender ? "object-contain p-8 mix-blend-multiply" : "object-cover"
            }`}
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center p-8 text-center font-serif text-2xl text-ink/40">
            Photo coming soon
          </div>
        )}

        {project.badge && (
          <span className={`tag absolute left-3 top-3 ${badgeTone[project.badge.tone]}`}>{project.badge.label}</span>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[15px] font-semibold uppercase tracking-[0.04em] text-ink">{project.title}</h3>
          {project.subtitle && <p className="mt-1 text-[14px] leading-snug text-ink-soft">{project.subtitle}</p>}
        </div>
        <span className="shrink-0 pt-0.5 font-mono text-[12px] text-ink-soft">{project.date.match(/\d{4}(?!.*\d{4})/)?.[0]}</span>
      </div>
      <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/50">{project.category}</p>
    </Link>
  );
};

export default ProjectCard;
