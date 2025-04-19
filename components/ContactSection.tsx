"use client";

import type React from "react";
import { useState } from "react";
import { Github, Linkedin, Mail, Send, Instagram } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

export const ContactSection: React.FC<{ className?: string }> = ({
  className,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme } = useTheme();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setIsSubmitting(false);

    // You would typically send this data to your backend or email service
    console.log("Form submitted:", formData);
  };

  // Define input styles with better contrast for both themes
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

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
                >
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
                    // Ensure good text contrast in both themes
                    color: theme === "dark" ? "#ffffff" : "#000000",
                  }}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  required
                  className={inputClasses}
                  style={{
                    // Ensure good text contrast in both themes
                    color: theme === "dark" ? "#ffffff" : "#000000",
                  }}
                />
              </div>
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
                  // Ensure good text contrast in both themes
                  color: theme === "dark" ? "#ffffff" : "#000000",
                  minHeight: "150px",
                }}
              />
            </div>
            <button
              type="submit"
              className="w-full px-8 py-2 bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white rounded-md flex justify-center items-center cursor-pointer transition-colors duration-300"
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
