"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import type { AnimationProps } from "@/app/interface";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

export const NavigationBar: React.FC<AnimationProps> = ({ className }) => {
  const { theme } = useTheme();
  const [activeLink, setActiveLink] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileControlsTop, setMobileControlsTop] = useState<number | null>(null);

  useEffect(() => {
    // GSAP: 1s first anim + 1s delay + 1s second anim = 3s total. Read after it settles.
    const id = setTimeout(() => {
      const niw = document.getElementById("niw");
      if (!niw) return;
      const rect = niw.getBoundingClientRect();
      if (rect.height > 0) setMobileControlsTop(rect.top + rect.height / 2);
    }, 3200);
    return () => clearTimeout(id);
  }, []);

  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    const sections = ["about", "skills", "experience", "projects", "contact"];

    let maxVisibleSection = "";
    let maxVisibleAmount = 0;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(windowHeight, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);
        if (visibleHeight > maxVisibleAmount) {
          maxVisibleAmount = visibleHeight;
          maxVisibleSection = section;
        }
      }
    }

    if (maxVisibleSection && maxVisibleSection !== activeLink) {
      setActiveLink(maxVisibleSection);
    }
  }, [activeLink, isScrolling]);

  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault();
    setActiveLink(section);
    setIsScrolling(true);
    setMenuOpen(false);

    const element = document.getElementById(section);
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY,
        behavior: "smooth",
      });
    }

    setTimeout(() => setIsScrolling(false), 1200);
  };

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;
    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 20);
    };
    window.addEventListener("scroll", throttledScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  const navLinks = ["about", "skills", "experience", "projects", "contact"];
  const navLabels: Record<string, string> = { skills: "Services" };

  const linkLabel = (link: string) =>
    navLabels[link] ?? link.charAt(0).toUpperCase() + link.slice(1);

  return (
    <>
      {/* ── Desktop top nav ── */}
      <nav
        className={`hidden md:flex items-center fixed top-0 left-0 right-0 z-50 px-8 pt-9 pb-3 text-sm ${className}`}
      >
        {/* Left spacer — keeps {niw} logo clear */}
        <div className="w-24 shrink-0" />

        {/* Centre — section links in glass pill */}
        <div className="flex-1 flex justify-center items-center">
          <div
            className="flex items-center gap-7 text-muted-foreground rounded-full px-6 py-2 backdrop-blur-md border"
            style={{
              backgroundColor:
                theme === "dark"
                  ? "rgba(21,21,21,0.55)"
                  : "rgba(255,255,255,0.65)",
              borderColor:
                theme === "dark"
                  ? "rgba(255,255,255,0.08)"
                  : "rgba(0,0,0,0.07)",
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link}
                href={`#${link}`}
                onClick={(e) => handleNavClick(e, link)}
                className={`relative transition-colors duration-200 pb-0.5 ${
                  activeLink === link
                    ? "text-foreground font-medium after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground"
                    : "hover:text-foreground/80"
                }`}
              >
                {linkLabel(link)}
              </Link>
            ))}
          </div>
        </div>

        {/* Right — resume + theme toggle */}
        <div className="w-24 shrink-0 flex items-center justify-end gap-4">
          <a
            href="/Delasan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-rose-400 hover:text-rose-300 font-medium transition-colors duration-200"
          >
            Resume
          </a>
          <ThemeToggle />
        </div>
      </nav>

      {/* ── Mobile top bar ── */}
      <div
        className={`md:hidden fixed top-0 left-0 right-0 z-50 ${className}`}
      >
        <div
          className="absolute right-5 flex items-center gap-3 -translate-y-1/2"
          style={{ top: mobileControlsTop ?? "calc(5% + 1.5rem)" }}
        >
          <ThemeToggle />
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="text-foreground cursor-pointer"
          >
            {menuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* ── Mobile fullscreen overlay ── */}
      {menuOpen && (
        <div
          className={`md:hidden fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 text-foreground text-2xl ${
            theme === "dark" ? "bg-black" : "bg-white"
          }`}
        >
          {navLinks.map((link) => (
            <Link
              key={link}
              href={`#${link}`}
              onClick={(e) => handleNavClick(e, link)}
              className={`transition-all duration-300 ${
                activeLink === link ? "font-bold underline" : ""
              }`}
            >
              {linkLabel(link)}
            </Link>
          ))}
          <a
            href="/Delasan_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
            className="text-rose-400 font-medium"
          >
            Resume
          </a>
        </div>
      )}
    </>
  );
};
