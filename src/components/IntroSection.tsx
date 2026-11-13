import { motion } from "framer-motion";

const IntroSection = () => (
  <section className="bg-cream py-24 md:py-36">
    <div className="container">
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="max-w-[26ch] font-serif [text-wrap:balance] text-[40px] leading-[1.02] tracking-[-0.01em] text-ink sm:text-[56px] md:text-[76px] lg:text-[88px]"
      >
        I design mechanical components, simulate <em className="italic text-teal">airflow</em> and{" "}
        <span className="whitespace-nowrap">3D print</span> objects.
      </motion.p>
    </div>
  </section>
);

export default IntroSection;
