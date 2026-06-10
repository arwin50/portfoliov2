"use client";

import React, { useEffect, useRef } from "react";
import type { AnimationProps } from "@/app/interface";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Experience {
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

const experiences: Experience[] = [
  {
    role: "Automation Specialist",
    company: "Katalyst CRM",
    period: "Oct 2025 – Mar 2026",
    bullets: [
      "Built an n8n pipeline that monitored inbound emails, extracted HR data, and auto-synced records to the internal project management system; integrated Slack as a time clock for attendance tracking.",
      "Developed AI chatbots for Facebook Messenger and Instagram; built a parallel inbound email classification system routing messages to CRM based on detected intent.",
      "Built a Vapi AI voice agent pipeline that qualified inbound leads from calls and auto-synced confirmed prospects to CRM, eliminating manual lead entry.",
      "Automated a full social media content pipeline: pulled ideas from Google Sheets → generated posts via AI → scheduled and published to Facebook, Instagram, and LinkedIn → tracked engagement metrics via platform APIs.",
    ],
  },
  {
    role: "Freelance Automation Consultant",
    company: "Independent",
    period: "Aug 2025 – Oct 2025",
    bullets: [
      "Built a RAG-based Facebook Messenger chatbot that answered customer queries by retrieving context from a structured knowledge base, orchestrated via n8n.",
      "Designed and built an n8n candidate screening pipeline integrating Slack, Gmail, and Supabase; experimented with fine-tuned OpenAI models and RAG for automated resume scoring.",
    ],
  },
  {
    role: "Software Developer Intern",
    company: "Alliance Software Incorporated",
    period: "Jun 2025 – Jul 2025",
    bullets: [
      "Contributed full-stack features to a knowledge-sharing web application in C# .NET within a 4-person agile team, covering UI/UX implementation, database schema design, and REST API integration.",
    ],
  },
];

export const ExperienceSection: React.FC<AnimationProps> = ({ className }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lineRef.current,
        { scaleY: 0 },
        {
          scaleY: 1,
          transformOrigin: "top center",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 60%",
            scrub: true,
          },
        },
      );

      itemRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          },
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`min-h-screen text-foreground ${className} w-full relative py-20 px-4 md:px-8`}
      id="experience"
    >
      {/* Grid background matching Hero / Projects */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px]" />

      <div className="w-[90%] xl:w-[80%] mx-auto relative z-10 flex flex-col gap-16">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">My Experience</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A timeline of roles where I built automation systems, AI pipelines,
            and full-stack applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative flex flex-col pl-8 md:pl-14">
          {/* Track */}
          <div className="absolute left-0 top-2 bottom-2 w-px bg-border" />
          {/* Animated fill */}
          <div
            ref={lineRef}
            className="absolute left-0 top-2 bottom-2 w-px bg-gradient-to-b from-rose-500 to-orange-500 origin-top"
          />

          {experiences.map((exp, i) => (
            <div
              key={i}
              ref={(el) => {
                itemRefs.current[i] = el;
              }}
              className="relative pb-12 last:pb-0 group"
            >
              {/* Dot */}
              <span className="absolute -left-[calc(2rem+0.5px)] md:-left-[calc(3.5rem+0.5px)] top-2 w-2.5 h-2.5 rounded-full bg-gradient-to-br from-rose-500 to-orange-500 -translate-x-[4px] ring-2 ring-background" />

              {/* Card */}
              <div className="bg-card-background border border-card-border rounded-lg p-5 md:p-6 hover:border-rose-500/30 hover:shadow-lg hover:shadow-rose-500/5 transition-all duration-300">
                {/* Role + Period */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-3">
                  <div>
                    <p className="text-base md:text-lg font-bold leading-tight">
                      {exp.role}
                    </p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {exp.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center self-start text-xs bg-muted text-muted-foreground px-2.5 py-1 rounded-full whitespace-nowrap shrink-0">
                    {exp.period}
                  </span>
                </div>

                {/* Bullets */}
                <ul className="flex flex-col gap-2 mt-3 border-t border-border pt-3">
                  {exp.bullets.map((b, j) => (
                    <li
                      key={j}
                      className="text-sm text-muted-foreground leading-relaxed flex gap-2"
                    >
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-rose-500/60 shrink-0" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
