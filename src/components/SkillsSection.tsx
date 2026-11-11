import { motion } from "framer-motion";
import { disciplines } from "@/data/siteContent";

const SkillsSection = () => (
  <section id="skills" className="bg-cream py-24 md:py-32">
    <div className="container">
      <p className="eyebrow text-ink-soft">What I do</p>
      <h2 className="mt-4 max-w-4xl font-serif text-[44px] leading-[1] tracking-[-0.01em] md:text-[72px]">
        From first sketch <em className="italic text-teal">to finished part</em>
      </h2>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {disciplines.map((d, i) => (
          <motion.article
            key={d.name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="group flex flex-col rounded-lg bg-paper p-6 transition-colors duration-300 hover:bg-teal hover:text-mint md:p-7"
          >
            <span className="font-mono text-[12px] text-flame group-hover:text-mint/70">0{i + 1}</span>
            <h3 className="mt-10 font-display text-[28px] font-black uppercase leading-[0.95] tracking-[-0.02em] group-hover:text-cream">
              {d.name}
            </h3>
            <p className="mt-3 text-[14px] leading-relaxed text-ink-soft group-hover:text-mint/80">{d.line}</p>

            <ul className="mt-auto pt-8">
              {d.tools.map((t) => (
                <li
                  key={t.name}
                  className="flex items-baseline justify-between gap-3 border-t border-ink/10 py-2.5 text-[13px] group-hover:border-mint/20"
                >
                  <span className="font-medium">{t.name}</span>
                  <span className="font-mono text-[11px] text-ink-soft group-hover:text-mint/70">{t.level}</span>
                </li>
              ))}
            </ul>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default SkillsSection;
