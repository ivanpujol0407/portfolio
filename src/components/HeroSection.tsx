import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { heroSlides } from "@/data/siteContent";

const SLIDE_MS = 6500;

const HeroSection = () => {
  const [index, setIndex] = useState(0);
  const count = heroSlides.length;
  const slide = heroSlides[index];

  useEffect(() => {
    if (count < 2) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const t = setTimeout(() => setIndex((i) => (i + 1) % count), SLIDE_MS);
    return () => clearTimeout(t);
  }, [index, count]);

  const scrollToWork = () => document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative isolate flex h-[calc(100svh-2.25rem)] min-h-[560px] items-center justify-center overflow-hidden bg-ink text-cream">
      {/* Background slides */}
      <AnimatePresence initial={false}>
        <motion.img
          key={slide.image}
          src={slide.image}
          alt={slide.alt}
          className="absolute inset-0 -z-20 h-full w-full object-cover"
          style={{ objectPosition: slide.position ?? "center" }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: SLIDE_MS / 1000 + 1.2, ease: "linear" } }}
        />
      </AnimatePresence>
      {/* Warm shade for legibility */}
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(25,18,12,0.25),rgba(25,18,12,0.65))]" />

      {/* Wordmark */}
      <div className="container text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
          className="display-italic text-[22vw] sm:text-[19vw] lg:text-[15.5vw] 2xl:text-[230px]"
        >
          ivan pujol
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="mt-5 font-serif text-[7vw] md:mt-7 leading-none sm:text-[5vw] lg:text-[3.4vw] 2xl:text-[52px]"
        >
          mechanical engineer &amp; product designer
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          className="mt-10"
        >
          <button onClick={scrollToWork} className="pill-ghost-light px-8 py-3 font-serif text-[22px] font-normal normal-case leading-none tracking-normal">
            See the work
          </button>
        </motion.div>
      </div>

      {/* Caption for the current photo */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="container flex items-end justify-between gap-6 pb-6 md:pb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={slide.caption}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4 }}
              className="max-w-xs"
            >
              {slide.projectId ? (
                <Link
                  to={`/project/${slide.projectId}`}
                  className="group inline-flex items-start gap-2 text-[12px] leading-snug text-cream/80 hover:text-cream"
                >
                  <span>{slide.caption}</span>
                  <ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>
              ) : (
                <span className="text-[12px] leading-snug text-cream/80">{slide.caption}</span>
              )}
            </motion.div>
          </AnimatePresence>

          {count > 1 && (
            <div className="flex items-center gap-3" role="tablist" aria-label="Hero images">
              {heroSlides.map((s, i) => (
                <button
                  key={s.image}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show image ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`h-2.5 w-2.5 rounded-full border border-cream transition-colors ${
                    i === index ? "bg-cream" : "bg-transparent hover:bg-cream/40"
                  }`}
                />
              ))}
            </div>
          )}

          <span className="hidden text-right text-[12px] leading-snug text-cream/80 md:block">
            Copenhagen, DK
          </span>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
