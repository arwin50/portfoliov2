"use client";

import type React from "react";
import type { AnimationProps } from "@/app/interface";

export const HeroSection: React.FC<AnimationProps> = ({ className }) => {
  const handleScroll = () => {
    console.log("Scroll to contact section");
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      className={`h-screen text-foreground ${className} w-full relative flex justify-center items-center`}
      id="about"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="flex flex-col justify-center items-center gap-2 w-[80%] max-w-[1200px] text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6">
          Hello, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            Arwin Delasan.
          </span>
        </h1>
        <p className="text-xl md:text-2xl lg:text-3xl">
          A Full Stack Developer who loves{" "}
          <span className="text-red-400">building</span>,{" "}
          <span className="italic">learning</span>, and{" "}
          <span className="font-bold">solving</span> real-world problems with
          code.
        </p>  
        {/* Connect Button */}
        <button
          onClick={handleScroll}
          className="w-fit mt-4 py-3 px-6 text-xl font-semibold text-white bg-gradient-to-r from-rose-500 to-orange-500 rounded-full hover:bg-gradient-to-l transition-all duration-500 cursor-pointer z-10 hover:animate-pulse-scale"
        >
          Connect
        </button>
      </div>
    </section>
  );
};
