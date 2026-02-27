import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown, Mail } from "lucide-react";
import profileImg from "@/assets/profile.png";

const HeroSection = () => {
  const scrollTo = (id: string) =>
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="min-h-screen flex items-center pt-16">
      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-primary font-mono text-sm mb-4 tracking-wider uppercase">
            Mechanical Engineer & CFD Specialist
          </p>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
            Optimizing Performance Through{" "}
            <span className="text-primary">Fluid Dynamics</span>
          </h1>
          <p className="text-muted-foreground text-lg mb-8 max-w-lg">
            Bridging the gap between advanced Fluid Dynamics and practical
            Mechanical Design to deliver robust, high-efficiency solutions.
          </p>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" onClick={() => scrollTo("#projects")}>
              <ArrowDown className="mr-2 h-4 w-4" />
              View Work
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollTo("#contact")}
            >
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center"
        >
          <div className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] lg:w-[32rem] lg:h-[32rem] rounded-lg overflow-hidden border border-border">
            <motion.img
              src={profileImg}
              alt="Ivan Pujol - Mechanical Engineer"
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.4 }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
