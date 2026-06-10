import { motion } from "framer-motion";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
}

const SectionHeading = ({ eyebrow, title, intro }: SectionHeadingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className="mb-12"
  >
    <p className="font-mono text-[0.65rem] tracking-[0.24em] uppercase text-primary mb-3">
      {eyebrow}
    </p>
    <div className="flex items-baseline gap-6">
      <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">{title}</h2>
      <div className="hidden sm:block flex-1 h-px bg-border" aria-hidden="true" />
    </div>
    {intro && (
      <p className="text-muted-foreground mt-4 max-w-xl leading-relaxed text-[0.95rem]">{intro}</p>
    )}
  </motion.div>
);

export default SectionHeading;
