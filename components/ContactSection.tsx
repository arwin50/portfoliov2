import React from "react";
import { AnimationProps } from "@/app/interface";

export const ContactSection: React.FC<AnimationProps> = ({ className }) => {
  return (
    <section className={`h-screen text-white ${className}`} id="contact">
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-4xl font-bold">Hello, I'm Arwin Delasan</h1>
        <p>
          A Full Stack Developer who loves building, learning, and solving
          real-world problems with code.
        </p>
      </div>
    </section>
  );
};
