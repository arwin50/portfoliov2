"use client";
import type React from "react";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import type { AnimationProps } from "@/app/interface";

export const NavigationBar: React.FC<AnimationProps> = ({ className }) => {
  const [activeLink, setActiveLink] = useState("about");
  const [isScrolling, setIsScrolling] = useState(false);

  // Improved scroll detection with debounce
  const handleScroll = useCallback(() => {
    if (isScrolling) return;

    const sections = ["about", "skills", "projects", "contact"];
    const scrollPosition = window.scrollY;

    // Find the section that takes up most of the viewport
    let maxVisibleSection = "";
    let maxVisibleAmount = 0;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Calculate how much of the section is visible in the viewport
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

  // Handle smooth scrolling when clicking navigation links
  const handleNavClick = (e: React.MouseEvent, section: string) => {
    e.preventDefault(); // Prevent default hash navigation
    setActiveLink(section);
    setIsScrolling(true);

    // Manually scroll to the section
    const element = document.getElementById(section);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }

    // Disable scroll detection for longer to ensure animation completes
    setTimeout(() => {
      setIsScrolling(false);
    }, 1200);
  };

  useEffect(() => {
    // Throttle scroll event for better performance
    let scrollTimeout: NodeJS.Timeout;

    const throttledScroll = () => {
      if (scrollTimeout) clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleScroll, 100);
    };

    window.addEventListener("scroll", throttledScroll);
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener("scroll", throttledScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [handleScroll]);

  return (
    <nav
      className={`flex flex-col mr-5 gap-4 justify-evenly items-end p-2 text-gray-500 fixed z-10 top-1/2 right-0 transform -translate-y-1/2 text-sm ${className}`}
    >
      <Link
        href="#about"
        onClick={(e) => handleNavClick(e, "about")}
        className={`transition-all duration-300 ${
          activeLink === "about"
            ? "text-white scale-110 font-medium"
            : "hover:text-gray-300"
        }`}
      >
        About
      </Link>
      <Link
        href="#skills"
        onClick={(e) => handleNavClick(e, "skills")}
        className={`transition-all duration-300 ${
          activeLink === "skills"
            ? "text-white scale-110 font-medium"
            : "hover:text-gray-300"
        }`}
      >
        Skills
      </Link>
      <Link
        href="#projects"
        onClick={(e) => handleNavClick(e, "projects")}
        className={`transition-all duration-300 ${
          activeLink === "projects"
            ? "text-white scale-110 font-medium"
            : "hover:text-gray-300"
        }`}
      >
        Projects
      </Link>
      <Link
        href="#contact"
        onClick={(e) => handleNavClick(e, "contact")}
        className={`transition-all duration-300 ${
          activeLink === "contact"
            ? "text-white scale-110 font-medium"
            : "hover:text-gray-300"
        }`}
      >
        Contact
      </Link>
    </nav>
  );
};
