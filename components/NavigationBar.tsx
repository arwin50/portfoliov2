"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icons for open/close
import type { AnimationProps } from "@/app/interface";
import { ThemeToggle } from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";

export const NavigationBar: React.FC<AnimationProps> = ({ className }) => {
  const { theme } = useTheme();
  const [activeLink, setActiveLink] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    const sections = ["about", "skills", "projects", "contact"];
    const scrollPosition = window.scrollY;

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
    setMenuOpen(false); // close menu when clicking

    const element = document.getElementById(section);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }

    setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
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

  const navLinks = ["about", "skills", "projects", "contact"];

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className={`hidden md:flex flex-col mr-5 gap-4 justify-evenly items-end p-2 text-muted-foreground fixed z-10 top-1/2 right-0 transform -translate-y-1/2 text-sm ${className}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link}
            href={`#${link}`}
            onClick={(e) => handleNavClick(e, link)}
            className={`transition-all duration-300 ${
              activeLink === link
                ? "text-foreground scale-110 font-medium"
                : "hover:text-foreground/80"
            }`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Theme Toggle - Desktop */}
      <div className="hidden md:block fixed top-6 right-6 z-50 section opacity-0">
        <ThemeToggle />
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-[6.5%] right-[40px] z-50 flex items-center gap-3 section opacity-0 cursor-pointer">
        <ThemeToggle />
        <button
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label="Toggle Menu"
          className="text-foreground cursor-pointer"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={`md:hidden fixed inset-0 ${
            theme === "dark" ? "bg-black" : "bg-white"
          } flex flex-col items-center justify-center space-y-8 text-foreground text-2xl z-40 transition-all duration-500 ease-in-out transform ${
            menuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-full pointer-events-none"
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
              {link.charAt(0).toUpperCase() + link.slice(1)}
            </Link>
          ))}
        </div>
      )}
    </>
  );
};
