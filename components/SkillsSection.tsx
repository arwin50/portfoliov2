"use client";

import React, { useEffect, useRef } from "react";
import type { AnimationProps } from "@/app/interface";
import Image from "next/image";
import gsap from "gsap";
import { FaReact, FaNodeJs, FaHtml5, FaVuejs } from "react-icons/fa";
import { CgFigma } from "react-icons/cg";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql, SiOpenai, SiZapier, SiN8N, SiClaude } from "react-icons/si";
import { TbBrandMongodb } from "react-icons/tb";

// Placeholder for tools not yet in react-icons.
// w/h = 1em so it scales with the parent font-size, matching real icon dimensions.
const LogoPlaceholder = ({
  label,
  className,
}: {
  label: string;
  className: string;
}) => (
  <span
    className={`inline-flex items-center justify-center w-[1em] h-[1em] rounded-[0.12em] border-2 border-current font-black text-[0.26em] tracking-tight leading-none shrink-0 ${className}`}
  >
    {label}
  </span>
);

export const SkillsSection: React.FC<AnimationProps> = ({ className }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const originalContent = marquee.innerHTML;
      marquee.innerHTML = originalContent + originalContent;

      const halfWidth = marquee.scrollWidth / 2;

      const tl = gsap.timeline({ repeat: -1 });
      tl.to(marquee, {
        x: -halfWidth,
        duration: 22,
        ease: "linear",
        onComplete: () => {
          gsap.set(marquee, { x: 0 });
        },
      });
    }

    return () => {
      gsap.killTweensOf(marqueeRef.current);
    };
  }, []);

  return (
    <section
      className={`min-h-screen text-foreground ${className} flex justify-center w-full`}
      id="skills"
    >
      <div className="w-[90%] xl:w-[80%] flex-col py-12 px-4 md:px-12 space-y-10">
        <div className="flex flex-col gap-12 w-full items-center">
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold">{`Services`}</p>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
            {/* Front-End */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex justify-center h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src="/frontend.png"
                  alt="frontend"
                  width={400}
                  height={300}
                  className="h-full w-full scale-90 md:scale-110 lg:scale-150 object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-4 justify-center px-2 text-center">
                <p className="text-xl md:text-2xl font-bold">
                  Front-end Development
                </p>
                <p className="text-muted-foreground text-sm">
                  Crafting responsive and interactive user interfaces using
                  HTML, CSS, JavaScript, and frameworks like React, Typescript,
                  Next, and Vue.
                </p>
              </div>
            </div>

            {/* AI Automation */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center items-center h-[200px] md:h-[250px] lg:h-[300px]">
                <div className="flex justify-center h-[160px] md:h-[200px] lg:h-[240px]">
                  <SiN8N
                    width={200}
                    height={200}
                    className="h-full w-auto scale-90 self-start text-pink-900"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-4 px-2 text-center">
                <p className="text-xl md:text-2xl font-bold">AI Automation</p>
                <p className="text-muted-foreground text-sm">
                  Designing and deploying AI-powered automation pipelines using
                  n8n, LLM APIs, RAG systems, and voice agents to eliminate
                  manual workflows.
                </p>
              </div>
            </div>

            {/* Back-End */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex justify-center h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src="/back.png"
                  alt="backend"
                  width={400}
                  height={300}
                  className="h-full w-full scale-90 md:scale-110 lg:scale-150 object-contain"
                />
              </div>
              <div className="flex flex-col items-center gap-4 px-2 text-center">
                <p className="text-xl md:text-2xl font-bold">
                  Back-end Development
                </p>
                <p className="text-muted-foreground text-sm">
                  I build and maintain server-side logic using Node.js and
                  Express, with MongoDB and MySQL database management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee — font-size on the container so every child (icon or
            placeholder) inherits the same em baseline → uniform gap spacing */}
        <div className="flex items-center mt-8 w-full">
          <div className="relative flex-1 overflow-hidden h-[60px] md:h-[70px] xl:h-[80px]">
            <div
              ref={marqueeRef}
              className="text-3xl md:text-4xl xl:text-5xl whitespace-nowrap flex gap-12 items-center absolute left-0 top-0 h-full"
            >
              {/* Dev stack — real icons */}
              <FaReact className="text-cyan-400 shrink-0" />
              <CgFigma className="text-pink-500 shrink-0" />
              <FaNodeJs className="text-green-500 shrink-0" />
              <RiNextjsFill className="text-foreground shrink-0" />
              <FaHtml5 className="text-orange-500 shrink-0" />
              <FaVuejs className="text-green-400 shrink-0" />
              <TbBrandMongodb className="text-green-500 shrink-0" />
              <BiLogoPostgresql className="text-blue-500 shrink-0" />
              <SiMysql className="text-blue-500 shrink-0" />
              {/* AI tools — real icons where available, placeholders otherwise */}
              <SiClaude className="text-orange-300 shrink-0" />
              <SiOpenai className="text-green-400 shrink-0" />
              <SiN8N className="text-pink-900" />
              <SiZapier className="text-orange-400 shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
