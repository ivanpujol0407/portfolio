import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowDownToLine } from "lucide-react";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "Paper", href: "#paper" },
  { label: "About", href: "#about" },
  { label: "Tools", href: "#tools" },
  { label: "Contact", href: "#contact" },
];

interface NavbarProps {
  /** Transparent with light text until the user scrolls (used over the homepage hero) */
  overlay?: boolean;
}

const Navbar = ({ overlay = false }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Highlight the section currently in view
  useEffect(() => {
    if (!onHome) return;
    const observers: IntersectionObserver[] = [];
    navLinks.forEach(({ href }) => {
      const el = document.getElementById(href.slice(1));
      if (!el) return;
      const io = new IntersectionObserver(
        ([entry]) => entry.isIntersecting && setActive(href.slice(1)),
        { rootMargin: "-45% 0px -50% 0px" },
      );
      io.observe(el);
      observers.push(io);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [onHome]);

  const go = (href: string) => {
    setOpen(false);
    if (!onHome) {
      navigate("/" + href);
      return;
    }
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  const goHome = () => {
    setOpen(false);
    if (onHome) window.scrollTo({ top: 0, behavior: "smooth" });
    else navigate("/");
  };

  const light = overlay && !scrolled && !open;

  return (
    <>
      <header
        className={`sticky top-0 z-50 -mb-16 h-16 transition-colors duration-300 md:-mb-20 md:h-20 ${
          light ? "bg-transparent text-cream" : "border-b border-ink/10 bg-cream/90 text-ink backdrop-blur-md"
        }`}
      >
        <div className="container grid h-full grid-cols-[1fr_auto_1fr] items-center">
          {/* Left: links on desktop, menu button on mobile */}
          <nav className="flex items-center gap-7">
            <button
              className="-ml-1 p-1 md:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              {open ? <X className="h-6 w-6" strokeWidth={1.5} /> : <Menu className="h-6 w-6" strokeWidth={1.5} />}
            </button>
            {navLinks.map((l) => {
              const isActive = onHome && active === l.href.slice(1);
              return (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className={`relative hidden text-[12px] font-semibold uppercase tracking-[0.14em] transition-opacity md:block ${
                    isActive ? "opacity-100" : "opacity-70 hover:opacity-100"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-current transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}
          </nav>

          {/* Centre: wordmark */}
          <button
            onClick={goHome}
            className="font-display text-[22px] font-black uppercase leading-none tracking-[-0.03em] md:text-[26px]"
            aria-label="Ivan Pujol, home"
          >
            Ivan Pujol
          </button>

          {/* Right: CV */}
          <div className="flex justify-end">
            <a
              href="/CV_Ivan_Pujol.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden items-center gap-2 rounded-full border px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] transition-colors md:inline-flex ${
                light
                  ? "border-cream/80 hover:bg-cream hover:text-ink"
                  : "border-ink/80 hover:bg-ink hover:text-cream"
              }`}
            >
              <ArrowDownToLine className="h-3.5 w-3.5" />
              CV
            </a>
            <a
              href="/CV_Ivan_Pujol.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 md:hidden"
              aria-label="Download CV"
            >
              <ArrowDownToLine className="h-5 w-5" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={`fixed inset-0 z-40 bg-cream pt-28 transition-opacity duration-300 md:hidden ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        <nav className="container flex flex-col gap-2">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="display-xl text-left text-[15vw] text-ink"
            >
              {l.label}
            </button>
          ))}
          <a href="/CV_Ivan_Pujol.pdf" target="_blank" rel="noopener noreferrer" className="pill-solid mt-8 w-fit">
            <ArrowDownToLine className="h-4 w-4" />
            Download CV
          </a>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
