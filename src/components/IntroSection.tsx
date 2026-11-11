import { motion } from "framer-motion";
import { introStats } from "@/data/siteContent";

const IntroSection = () => (
  <section className="bg-cream py-24 md:py-36">
    <div className="container">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[22ch] font-serif text-[40px] leading-[1.02] tracking-[-0.01em] text-ink sm:text-[56px] md:text-[76px] lg:text-[92px]"
      >
        I design machines and objects, test them <em className="italic text-teal">in simulation</em>, and
        build them on the 3D printer on my desk.
      </motion.p>

      <div className="mt-16 grid gap-px overflow-hidden rounded-lg border border-ink/10 bg-ink/10 sm:grid-cols-3 md:mt-24">
        {introStats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 * i }}
            className="flex items-baseline gap-5 bg-cream px-6 py-6 md:flex-col md:gap-3 md:px-8 md:py-8"
          >
            <span className="font-display text-5xl font-black leading-none tracking-[-0.04em] md:text-7xl">{s.value}</span>
            <span className="text-[14px] leading-snug text-ink-soft">{s.label}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IntroSection;
