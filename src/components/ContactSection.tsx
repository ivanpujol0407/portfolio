import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Linkedin, Send, CheckCircle } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";

const inputCls =
  "w-full bg-transparent border-0 border-b border-border rounded-none px-0.5 py-2.5 font-mono text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:border-primary transition-colors";

const labelCls =
  "font-mono text-[0.62rem] tracking-[0.18em] uppercase text-muted-foreground";

const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const name = String(formData.get("name") || "").trim().slice(0, 100);
    const email = String(formData.get("email") || "").trim().slice(0, 255);
    const subject = String(formData.get("subject") || "").trim().slice(0, 150);
    const message = String(formData.get("message") || "").trim().slice(0, 2000);

    if (!name || !email || !subject || !message) {
      setSubmitError("Please complete all fields before sending.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("https://formsubmit.co/ajax/ivanpujol0407@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          subject,
          message,
          _captcha: "false",
          _template: "table",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit form");
      }

      setSubmitted(true);
      form.reset();
    } catch {
      setSubmitError("Something went wrong while sending your message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-4">
        <SectionHeading eyebrow="Contact" title="Get in Touch" />

        <div className="grid md:grid-cols-2 gap-px bg-border border border-border">
          {/* Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-card p-8"
          >
            <h3 className="text-xl font-bold tracking-tight mb-4">
              Let's build something great together.
            </h3>
            <p className="text-muted-foreground mb-8 leading-relaxed text-[0.95rem]">
              Have a question about my portfolio or want to discuss a potential collaboration? I am currently available for roles in R&D and Mechanical Engineering. Drop me a message below or send me an email, and I'll get back to you shortly.
            </p>

            <div className="space-y-4 mb-10">
              <a href="mailto:ivanpujol0407@gmail.com" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Mail className="h-4 w-4 text-primary" />
                <span className="font-mono text-[0.78rem]">ivanpujol0407@gmail.com</span>
              </a>
              <a href="tel:+4555264952" className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors">
                <Phone className="h-4 w-4 text-primary" />
                <span className="font-mono text-[0.78rem]">+45 55 26 49 52</span>
              </a>
              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="font-mono text-[0.78rem]">Copenhagen, Denmark</span>
              </div>
              <a
                href="https://www.linkedin.com/in/ivanpujolvidal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-4 w-4 text-primary" />
                <span className="font-mono text-[0.78rem]">LinkedIn Profile</span>
              </a>
            </div>

            <div className="inline-flex items-center gap-2.5 border border-primary/30 bg-primary/10 px-3 py-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="font-mono text-[0.65rem] tracking-[0.14em] uppercase text-primary">
                Open to Opportunities
              </span>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-card p-8"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4">
                <CheckCircle className="h-12 w-12 text-primary" />
                <h3 className="text-xl font-bold tracking-tight">Message Sent!</h3>
                <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className={labelCls}>Name</label>
                    <input id="name" name="name" placeholder="Your name" required className={`${inputCls} mt-1.5`} />
                  </div>
                  <div>
                    <label htmlFor="email" className={labelCls}>Email</label>
                    <input id="email" name="email" type="email" placeholder="your@email.com" required className={`${inputCls} mt-1.5`} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={labelCls}>Subject</label>
                  <input id="subject" name="subject" placeholder="Subject" required className={`${inputCls} mt-1.5`} />
                </div>
                <div>
                  <label htmlFor="message" className={labelCls}>Message</label>
                  <textarea id="message" name="message" placeholder="Your message..." rows={5} required className={`${inputCls} mt-1.5 resize-y`} />
                </div>
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
                  <Send className="mr-2 h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
