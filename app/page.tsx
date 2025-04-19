"use client";
import { useEffect } from "react";
import { HeroSection } from "@/components/HeroSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectSection } from "@/components/ProjectSection";
import { ContactSection } from "@/components/ContactSection";
import { NavigationBar } from "@/components/NavigationBar";
import { useRouter } from "next/navigation";
import gsap from "gsap";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    // Animate the "niw" element
    const niwElement = document.getElementById("niw");

    gsap.fromTo(
      niwElement,
      {
        opacity: 0,
        top: "50%",
        left: "50%",
        x: "-50%",
        y: "-50%",
        fontSize: "6rem",
      }, // Start at center
      {
        opacity: 1,
        top: "50%", // Move to center (50% of viewport height)
        left: "50%", // Move to center (50% of viewport width)
        x: "-50%", // Offset by half of the element's width to truly center it
        y: "-50%", // Offset by half of the element's height to truly center it
        duration: 1,
        ease: "power4.out",
        onComplete: () => {
          // After the first animation completes, move back to the original position
          gsap.to(niwElement, {
            top: "5%",
            left: "40px",
            x: "0%",
            y: "0%",
            opacity: 1,
            duration: 1,
            delay: 1, // Wait before moving back
            ease: "power4.in",
            fontSize: "2rem",
          });

          // Fade in other sections after the delay
          gsap.to(".section", {
            opacity: 1,
            duration: 1,
            delay: 2, // Delay before fading sections in
            stagger: 0.3, // Add a slight stagger between section fades
          });
        },
      }
    );
  }, []);

  return (
    <main className="flex flex-col min-h-screen items-center w-full bg-background relative">
      <p
        onClick={() => {
          router.push("/");
        }}
        id="niw"
        className="text-foreground fixed top-1/2 left-1/2 opacity-0 z-50 cursor-pointer hover:animate-pulse-scale" // Centered using Tailwind CSS
      >
        {"{niw}"}
      </p>
      <NavigationBar className="section opacity-0" />
      <HeroSection className="section opacity-0" />
      <SkillsSection className="section opacity-0" />
      <ProjectSection className="section opacity-0" />
      <ContactSection className="section opacity-0" />
    </main>
  );
}
