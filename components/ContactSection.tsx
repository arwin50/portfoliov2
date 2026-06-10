"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Mail, Send } from "lucide-react";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { useTheme } from "@/components/theme-provider";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "delasanarwin@gmail.com",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const form = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (!captchaToken) {
      toast.error("Please verify the CAPTCHA");
      setIsSubmitting(false);
      return;
    }

    if (!form.current) {
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        form.current,
        { publicKey: `${process.env.NEXT_PUBLIC_EMAILJS_API_KEY}` }
      )
      .then(() => {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "delasanarwin@gmail.com", message: "" });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error.text);
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => setIsSubmitting(false));
  };

  const inputClasses =
    "bg-card-background border border-border text-foreground w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-rose-500/50 focus:border-rose-500/50 transition-all placeholder:text-muted-foreground/60 text-sm";

  const socials = [
    {
      icon: FaGithub,
      label: "GitHub",
      href: "https://github.com/arwin50",
    },
    {
      icon: FaLinkedinIn,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/arwin-delasan-8b4333255/",
    },
    {
      icon: FaInstagram,
      label: "Instagram",
      href: "https://www.instagram.com/powchulis/",
    },
    {
      icon: Mail,
      label: "delasanarwin@gmail.com",
      href: "mailto:delasanarwin@gmail.com",
    },
  ];

  return (
    <section
      className={`min-h-screen text-foreground ${className} w-full relative flex justify-center items-center py-20 px-4 md:px-8`}
      id="contact"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 w-[90%] xl:w-[80%] max-w-5xl flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

        {/* Left — info */}
        <div className="flex flex-col gap-8 lg:w-[42%] lg:sticky lg:top-1/4">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
              Let&apos;s work<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
                together.
              </span>
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              Whether you have a project in mind, want to discuss automation
              opportunities, or just want to say hi — my inbox is always open.
            </p>
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3">
            {socials.map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 group w-fit"
              >
                <span className="flex items-center justify-center w-9 h-9 rounded-lg border border-border bg-card-background group-hover:border-rose-500/40 group-hover:bg-rose-500/5 transition-all duration-300">
                  <Icon className="h-4 w-4 text-muted-foreground group-hover:text-rose-400 transition-colors duration-300" />
                </span>
                <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  {label}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Right — form */}
        <div className="lg:flex-1 w-full">
          <div className="bg-card-background border border-border rounded-2xl p-6 md:p-8 shadow-xl shadow-black/5">
            <h3 className="text-lg font-semibold mb-6">Send a message</h3>

            <form onSubmit={handleSubmit} className="space-y-5" ref={form}>
              <div>
                <label htmlFor="name" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  required
                  className={inputClasses}
                  style={{ color: theme === "dark" ? "#ffffff" : "#000000" }}
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or idea..."
                  required
                  rows={5}
                  className={inputClasses}
                  style={{ color: theme === "dark" ? "#ffffff" : "#000000", resize: "none" }}
                />
              </div>

              <ReCAPTCHA
                ref={recaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string}
                onChange={(token) => setCaptchaToken(token)}
                theme={theme === "dark" ? "dark" : "light"}
              />

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-6 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-semibold rounded-lg flex justify-center items-center gap-2 cursor-pointer transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Send Message
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
};
