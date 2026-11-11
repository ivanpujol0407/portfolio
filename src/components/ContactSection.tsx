import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";

const field =
  "w-full border-0 border-b border-ink/25 bg-transparent px-0 py-3 text-[16px] text-ink placeholder:text-ink/35 focus:border-ink focus:outline-none focus:ring-0 transition-colors";
const label = "eyebrow text-ink-soft";

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
    <section id="contact" className="scroll-mt-16 bg-cream py-24 md:py-32">
      <div className="container">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="display-xl text-[22vw] lg:text-[220px]"
        >
          Let&apos;s talk
        </motion.h2>

        <div className="mt-14 grid gap-14 border-t border-ink/15 pt-12 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <div>
            <p className="max-w-md font-serif text-[30px] leading-[1.1] md:text-[38px]">
              Open to roles in <em className="italic text-teal">mechanical design</em>, product development and R&amp;D.
            </p>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-ink-soft">
              Questions about a project, a lamp, or a role? Send a message or an email and I&apos;ll get back to you.
            </p>

            <dl className="mt-10 divide-y divide-ink/15 border-y border-ink/15 text-[15px]">
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className={label}>Email</dt>
                <dd>
                  <a href="mailto:ivanpujol0407@gmail.com" className="underline decoration-ink/30 underline-offset-4 hover:decoration-ink">
                    ivanpujol0407@gmail.com
                  </a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className={label}>Phone</dt>
                <dd>
                  <a href="tel:+4555264952" className="hover:underline">+45 55 26 49 52</a>
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className={label}>Based in</dt>
                <dd>Copenhagen, Denmark</dd>
              </div>
              <div className="flex items-baseline justify-between gap-4 py-4">
                <dt className={label}>LinkedIn</dt>
                <dd>
                  <a
                    href="https://www.linkedin.com/in/ivanpujolvidal/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 hover:underline"
                  >
                    ivanpujolvidal <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </dd>
              </div>
            </dl>
          </div>

          <div>
            {submitted ? (
              <div className="flex h-full flex-col justify-center rounded-lg bg-teal p-10 text-mint">
                <p className="font-serif text-[44px] leading-none text-cream">Message sent.</p>
                <p className="mt-4 text-[15px]">Thanks for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className={label}>Name</label>
                    <input id="name" name="name" placeholder="Your name" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="email" className={label}>Email</label>
                    <input id="email" name="email" type="email" placeholder="you@example.com" required className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="subject" className={label}>Subject</label>
                  <input id="subject" name="subject" placeholder="What is it about?" required className={field} />
                </div>
                <div>
                  <label htmlFor="message" className={label}>Message</label>
                  <textarea id="message" name="message" placeholder="Your message" rows={5} required className={`${field} resize-none`} />
                </div>
                {submitError && <p className="text-sm text-destructive">{submitError}</p>}
                <button type="submit" className="pill-solid px-8 py-4 disabled:opacity-60" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Sending..." : "Send message"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
