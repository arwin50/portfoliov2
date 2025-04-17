import React from "react";
import { AnimationProps } from "@/app/interface";

export const HeroSection: React.FC<AnimationProps> = ({ className }) => {
  return (
    <section
      className={`h-screen text-white ${className} w-full relative flex justify-center`}
      id="about"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="flex flex-col  justify-center h-full gap-2 w-[80%]">
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
          Hello, I'm{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-500">
            Arwin <br />
            Delasan.
          </span>
        </h1>
        <p className="text-3xl">
          A Full Stack Developer who loves{" "}
          <span className="text-red-400">building</span>,{" "}
          <span className="italic">learning</span>, and{" "}
          <span className="font-bold">solving</span> real-world problems with
          code.
        </p>
      </div>
    </section>
  );
};
