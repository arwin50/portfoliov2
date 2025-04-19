"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react"; // icons for open/close
import type { AnimationProps } from "@/app/interface";

export const NavigationBar: React.FC<AnimationProps> = ({ className }) => {
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
      scrollTimeout = setTimeout(handleScroll, 100);
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
        className={`hidden md:flex flex-col mr-5 gap-4 justify-evenly items-end p-2 text-gray-500 fixed z-10 top-1/2 right-0 transform -translate-y-1/2 text-sm ${className}`}
      >
        {navLinks.map((link) => (
          <Link
            key={link}
            href={`#${link}`}
            onClick={(e) => handleNavClick(e, link)}
            className={`transition-all duration-300 ${
              activeLink === link
                ? "text-white scale-110 font-medium"
                : "hover:text-gray-300"
            }`}
          >
            {link.charAt(0).toUpperCase() + link.slice(1)}
          </Link>
        ))}
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden fixed top-[6.5%] right-[40px] z-210 text-white section opacity-0"
        onClick={() => setMenuOpen((prev) => !prev)}
        aria-label="Toggle Menu"
      >
        {menuOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div
          className={`md:hidden fixed inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center space-y-8 text-white text-2xl z-200 transition-all duration-500 ease-in-out transform ${
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
