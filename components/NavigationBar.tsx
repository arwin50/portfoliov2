"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { AnimationProps } from "@/app/interface";

export const NavigationBar: React.FC<AnimationProps> = ({ className }) => {
  const [activeLink, setActiveLink] = useState("about");

  const handleScroll = () => {
    const sections = ["about", "skills", "projects", "contact"];
    const scrollPosition = window.scrollY;

    // Check each section and update the active link
    sections.forEach((section) => {
      const element = document.getElementById(section);
      if (element) {
        const top = element.offsetTop - 100; // Adjust if needed
        const bottom = top + element.offsetHeight;
        console.log(element);

        if (scrollPosition >= top && scrollPosition < bottom) {
          setActiveLink(section);
        }
      }
    });
  };

  useEffect(() => {
    // Set initial active link based on the current scroll position
    handleScroll();

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    return () => {
      // Clean up event listener on component unmount
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex flex-col mr-5 gap-4 justify-evenly items-end p-2 text-gray-500 fixed z-10 top-1/2 right-0 transform -translate-y-1/2 text-sm  ${className}`}
    >
      <Link
        href="#about"
        className={activeLink === "about" ? "text-white scale-110" : ""}
      >
        About
      </Link>
      <Link
        href="#skills"
        className={activeLink === "skills" ? "text-white scale-110" : ""}
      >
        Skills
      </Link>
      <Link
        href="#projects"
        className={activeLink === "projects" ? "text-white scale-110" : ""}
      >
        Projects
      </Link>
      <Link
        href="#contact"
        className={activeLink === "contact" ? "text-white scale-110" : ""}
      >
        Contact
      </Link>
    </nav>
  );
};
