import { motion } from "framer-motion";
import portraitImg from "@/assets/hero/portrait.jpg";
import { timeline } from "@/data/siteContent";

const languages = ["Catalan", "Spanish", "English (C1)", "Italian (intermediate)"];

const AboutSection = () => (
  <section id="about" className="scroll-mt-16 bg-cream py-24 md:py-32">
    <div className="container grid gap-12 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="lg:sticky lg:top-28 lg:self-start"
      >
        <img
          src={portraitImg}
          alt="Portrait of Ivan Pujol"
          loading="lazy"
          className="aspect-[4/5] w-full rounded-lg object-cover object-[50%_35%]"
        />
        <p className="mt-3 text-[12px] text-ink-soft">Copenhagen, Denmark</p>
      </motion.div>

      <div>
        <p className="eyebrow text-ink-soft">About</p>
        <h2 className="mt-4 font-serif text-[56px] leading-[0.95] tracking-[-0.01em] md:text-[88px]">
          Hola, I&apos;m <em className="italic text-teal">Ivan</em>.
        </h2>

        <div className="mt-10 space-y-5 text-[17px] leading-[1.7] text-ink/80">
          <p>
            I&apos;m a mechanical engineer at Alfa Laval in Copenhagen, where I design mechanical components and
            systems for fresh water generators on offshore platforms.
          </p>
          <p>
            I came to Denmark for my master&apos;s thesis at DTU: a CFD and wind tunnel study of speedway motorcycle
            aerodynamics, now published in Scientific Reports. I liked the city enough to stay. Before that I studied
            industrial engineering at UPC in Barcelona, with an exchange in Padova, and worked on micromobility
            products at Vadecity and on quality at SEAT.
          </p>
          <p>
            In my free time I design lamps and print them at home on a Creality Ender-3 S1 Pro.
          </p>
        </div>

        <h3 className="eyebrow mt-16 text-ink-soft">Experience &amp; education</h3>
        <ol className="mt-4 border-b border-ink/15">
          {timeline.map((item, i) => (
            <motion.li
              key={`${item.title}-${item.date}`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="grid grid-cols-[84px_1fr] items-baseline gap-4 border-t border-ink/15 py-4 sm:grid-cols-[110px_1fr_auto]"
            >
              <span className="font-mono text-[12px] text-ink-soft">{item.date}</span>
              <span className="text-[16px] font-semibold">{item.title}</span>
              <span className="col-start-2 text-[14px] text-ink-soft sm:col-start-auto sm:text-right">
                {item.place}
              </span>
            </motion.li>
          ))}
        </ol>

        <h3 className="eyebrow mt-12 text-ink-soft">Languages</h3>
        <ul className="mt-4 flex flex-wrap gap-2">
          {languages.map((l) => (
            <li key={l} className="rounded-full border border-ink/20 px-4 py-1.5 text-[13px]">
              {l}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </section>
);

export default AboutSection;
