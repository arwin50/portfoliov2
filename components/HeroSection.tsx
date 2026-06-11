"use client";

import type React from "react";
import Image from "next/image";
import type { AnimationProps } from "@/app/interface";

export const HeroSection: React.FC<AnimationProps> = ({ className }) => {
  const handleScroll = () => {
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={`h-screen text-foreground ${className} w-full relative flex justify-center items-center pt-16`}
      id="about"
    >
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center gap-10 md:gap-10 lg:gap-24 w-[90%] max-w-[1100px] md:pr-16 lg:pr-0">
        {/* Left — text */}
        <div className="flex flex-col gap-4 w-full md:flex-1 text-center md:text-left items-center md:items-start">
          <p className="text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground font-medium">
            Full Stack Developer &amp; AI Automation Specialist
          </p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
            Hello, I&apos;m{" "}
            <p className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
              Arwin Delasan.
            </p>
          </h1>

          <p className="text-base md:text-lg text-muted-foreground max-w-md">
            I build, learn, and solve real-world problems with code — from
            full-stack web apps to AI-powered automation pipelines.
          </p>

          <button
            onClick={handleScroll}
            className="w-fit mt-2 py-2.5 px-6 text-sm font-semibold border border-foreground text-foreground rounded-md hover:bg-foreground hover:text-background transition-all duration-300 cursor-pointer"
          >
            Connect
          </button>
        </div>

        {/* Right — photo */}
        <div className="flex justify-center shrink-0">
          <div className="relative w-[220px] h-[270px] md:w-[240px] md:h-[295px] lg:w-[320px] lg:h-[390px] rounded-2xl overflow-hidden border border-border">
            <Image
              src="/gradpic.jpeg"
              alt="Arwin Delasan"
              fill
              className="object-cover object-top"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
