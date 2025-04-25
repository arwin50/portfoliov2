"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react";
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
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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
      console.error("Form reference is null");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .sendForm(
        `${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`,
        `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`,
        form.current,
        {
          publicKey: `${process.env.NEXT_PUBLIC_EMAILJS_API_KEY}`,
        }
      )
      .then(() => {
        toast.success("Message sent successfully! 🚀");
        setFormData({
          name: "",
          email: "delasanarwin@gmail.com",
          message: "",
        });
        setCaptchaToken(null);
        recaptchaRef.current?.reset();
      })
      .catch((error) => {
        console.error("FAILED...", error.text);
        toast.error("Failed to send message. Please try again.");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const inputClasses = `
    bg-card-background 
    border-2 
    border-input-border 
    text-foreground 
    w-full 
    p-3 
    rounded-md 
    focus:outline-none 
    focus:ring-2 
    focus:ring-input-focus 
    focus:border-transparent 
    transition-all
    placeholder:text-muted-foreground
  `;

  return (
    <section
      className={`min-h-screen text-foreground ${className} flex justify-center w-full items-center`}
      id="contact"
    >
      <div className="container mx-auto px-4 py-8 md:py-16 w-[80%]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Get In Touch
            </h2>
            <p className="text-muted-foreground mb-8">
              Have a project in mind or just want to say hello? Feel free to
              reach out!
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" ref={form}>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-2">
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
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                }}
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your message here..."
                required
                className={inputClasses}
                style={{
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  minHeight: "150px",
                }}
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
              className="w-full px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-md flex justify-center items-center cursor-pointer transition-colors duration-300 hover:animate-pulse-scale"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending...
                </span>
              ) : (
                <span className="flex items-center">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </span>
              )}
            </button>
          </form>

          <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold mb-4">Or connect with me</h3>
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/arwin50"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Github className="h-6 w-6" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/arwin-delasan-8b4333255/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Linkedin className="h-6 w-6" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/powchulis/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="mailto:delasanarwin@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail className="h-6 w-6" />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
