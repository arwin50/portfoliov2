"use client";

import React, { useEffect, useRef } from "react";
import type { AnimationProps } from "@/app/interface";
import Image from "next/image";
import gsap from "gsap";
import { FaReact, FaNodeJs, FaHtml5, FaVuejs } from "react-icons/fa";
import { CgFigma } from "react-icons/cg";
import { RiNextjsFill } from "react-icons/ri";
import { BiLogoPostgresql } from "react-icons/bi";
import { SiMysql } from "react-icons/si";
import { TbBrandMongodb } from "react-icons/tb";

export const SkillsSection: React.FC<AnimationProps> = ({ className }) => {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const marquee = marqueeRef.current;
    if (marquee) {
      const originalIcons = marquee.innerHTML;
      marquee.innerHTML = originalIcons + originalIcons;

      const halfWidth = marquee.scrollWidth / 2;

      const tl = gsap.timeline({ repeat: -1 });
      tl.to(marquee, {
        x: -halfWidth,
        duration: 20,
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
          <p className="text-4xl md:text-5xl xl:text-6xl font-bold">{`{Skills}`}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 w-full">
            {/* Front-End */}
            <div className="flex flex-col items-center gap-4">
              <div className="relative flex justify-center h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src="/Monitor_white.svg"
                  alt="monitor"
                  width={300}
                  height={300}
                  className="h-full w-auto "
                />
                <Image
                  src="/carbon-2.png"
                  alt="frontend-code"
                  width={282}
                  height={300}
                  className="absolute top-2 h-[60%] w-[94%] lg:h-[185px]"
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

            {/* Coding Approach */}
            <div className="flex flex-col items-center gap-4">
              <div className="flex justify-center h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src="/jigsaw.png"
                  alt="others"
                  width={280}
                  height={280}
                  className="h-full w-auto scale-90 self-start "
                />
              </div>
              <div className="flex flex-col items-center gap-4 px-2 text-center">
                <p className="text-xl md:text-2xl font-bold">Coding Approach</p>
                <p className="text-muted-foreground text-sm">
                  I'm comfortable working in agile environments and adapting
                  quickly to changes. I focus on writing responsive and clean,
                  efficient code.
                </p>
              </div>
            </div>

            {/* Back-End */}
            <div className="md:col-span-2 md:flex md:justify-center xl:col-span-1 flex flex-col items-center gap-4">
              <div className="relative flex justify-center h-[200px] md:h-[250px] lg:h-[300px]">
                <Image
                  src="/Monitor_white.svg"
                  alt="monitor"
                  width={300}
                  height={300}
                  className="h-full w-auto "
                />
                <Image
                  src="/backend.png"
                  alt="backend-code"
                  width={282}
                  height={300}
                  className="absolute top-2 h-[60%] w-[94%] lg:h-[185px]"
                />
              </div>
              <div className="flex flex-col items-center gap-4 px-2 text-center">
                <p className="text-xl md:text-2xl font-bold">
                  Back-end Development
                </p>
                <p className="text-muted-foreground text-sm md:w-[65%] lg:w-auto">
                  I build and maintain server-side logic using Node.js and
                  Express, with MongoDB and MySQL database management.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="flex items-center mt-8 w-full gap-6">
          <div className="relative flex-1 overflow-hidden h-[60px] md:h-[70px] xl:h-[80px]">
            <div
              ref={marqueeRef}
              className="tech-icons whitespace-nowrap flex gap-12 text-3xl md:text-4xl xl:text-5xl absolute left-0 top-0"
            >
              {[...Array(4)].map((_, i) => (
                <React.Fragment key={i}>
                  <FaReact className="text-cyan-400" />
                  <CgFigma className="text-pink-500" />
                  <FaNodeJs className="text-green-500" />
                  <RiNextjsFill className="text-foreground" />
                  <FaHtml5 className="text-orange-500" />
                  <FaVuejs className="text-green-400" />
                  <TbBrandMongodb className="text-green-500" />
                  <BiLogoPostgresql className="text-blue-500" />
                  <SiMysql className="text-blue-500" />
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
