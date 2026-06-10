import { Linkedin, Github } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-7">
    <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
      <p className="font-mono text-[0.7rem] text-muted-foreground/80">
        © 2026 Ivan Pujol Vidal · Copenhagen, DK
      </p>
      <div className="flex items-center gap-5">
        <a
          href="https://www.linkedin.com/in/ivanpujolvidal/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Linkedin className="h-[18px] w-[18px]" />
        </a>
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="text-muted-foreground hover:text-primary transition-colors"
        >
          <Github className="h-[18px] w-[18px]" />
        </a>
      </div>
    </div>
  </footer>
);

export default Footer;
