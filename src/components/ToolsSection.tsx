import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { tools } from "@/data/siteContent";

const ToolsSection = () => (
  <section id="tools" className="scroll-mt-16 bg-paper py-24 md:py-32">
    <div className="container">
      <div className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
        <div>
          <h2 className="display-xl text-[18vw] sm:text-[12vw] lg:text-[120px]">Free tools</h2>
          <p className="mt-6 max-w-sm text-[15px] leading-relaxed text-ink-soft">
            Small calculators I built for my own CFD work and put online for anyone to use. Single-page, no sign-up.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool, i) => (
            <motion.a
              key={tool.title}
              href={tool.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group flex flex-col rounded-lg border border-ink/10 bg-cream p-7 transition-colors hover:border-ink"
            >
              <div className="flex items-center justify-between">
                <span className="tag bg-ink text-cream">{tool.tag}</span>
                <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
              <h3 className="mt-12 font-display text-[32px] font-black leading-[0.95] tracking-[-0.025em]">
                {tool.title}
              </h3>
              <p className="mt-4 text-[14px] leading-relaxed text-ink-soft">{tool.description}</p>
              <ul className="mt-6 flex flex-wrap gap-1.5">
                {tool.features.map((f) => (
                  <li key={f} className="rounded-full border border-ink/15 px-3 py-1 font-mono text-[11px] text-ink-soft">
                    {f}
                  </li>
                ))}
              </ul>
              <span className="mt-8 text-[12px] font-semibold uppercase tracking-[0.14em] underline decoration-ink/30 underline-offset-4 group-hover:decoration-ink">
                Open tool
              </span>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default ToolsSection;
