import { Link } from "react-router-dom";
import { projectsData } from "@/data/projectsData";
import { tools } from "@/data/siteContent";

const Footer = () => (
  <footer className="overflow-hidden bg-ink text-cream">
    <div className="container pt-16 md:pt-20">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="eyebrow text-cream/50">Work</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            {projectsData.map((p) => (
              <li key={p.id}>
                <Link to={`/project/${p.id}`} className="text-cream/80 hover:text-cream">
                  {p.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Tools</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            {tools.map((t) => (
              <li key={t.href}>
                <a href={t.href} target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-cream">
                  {t.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Elsewhere</p>
          <ul className="mt-4 space-y-2 text-[14px]">
            <li>
              <a href="https://www.linkedin.com/in/ivanpujolvidal/" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-cream">
                LinkedIn
              </a>
            </li>
            <li>
              <a href="https://github.com/ivanpujol0407" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-cream">
                GitHub
              </a>
            </li>
            <li>
              <a href="/CV_Ivan_Pujol.pdf" target="_blank" rel="noopener noreferrer" className="text-cream/80 hover:text-cream">
                CV (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-cream/50">Contact</p>
          <a href="mailto:ivanpujol0407@gmail.com" className="mt-4 block text-[14px] text-cream/80 hover:text-cream">
            ivanpujol0407@gmail.com
          </a>
          <p className="mt-2 text-[14px] text-cream/50">Copenhagen, Denmark</p>
        </div>
      </div>

      <p
        aria-hidden="true"
        className="display-xl mt-20 select-none whitespace-nowrap text-[16.6vw] leading-[0.78] text-cream 2xl:text-[236px]"
      >
        Ivan Pujol
      </p>
      <div className="flex flex-col justify-between gap-2 border-t border-cream/15 py-6 text-[12px] text-cream/50 sm:flex-row">
        <span>© {new Date().getFullYear()} Ivan Pujol Vidal</span>
        <span>Designed and built in Copenhagen</span>
      </div>
    </div>
  </footer>
);

export default Footer;
