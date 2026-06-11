"use client";

import { useState, useEffect } from "react";
import type React from "react";
import type { AnimationProps } from "@/app/interface";
import {
  ExternalLink,
  Github,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  images?: string[];
  video?: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
  workflowSteps?: string[];
}

const devProjects: Project[] = [
  {
    title: "Doorm",
    description:
      "Dorm is an app where users can search for, list, and discover dormitories.",
    image: "/doorm.png",
    githubUrl: "https://github.com/Loweso/doorm",
    tags: ["VueJS", "TailwindCSS", "ExpressJS", "MySQL"],
  },
  {
    title: "Beacon",
    description:
      "Beacon is an AI-powered roadmap app that generates personalized career paths for users.",
    image: "/beacon.png",
    githubUrl: "https://github.com/unravyl/beacon",
    liveUrl: "https://beaconph.site",
    tags: ["Next.js", "TypeScript", "Firebase", "Django"],
  },
  {
    title: "UPokemon",
    description:
      "UPokemon is a game that recreates the classic Pokémon experience with turn-based battles.",
    image: "/upokemon.png",
    githubUrl: "https://github.com/Loweso/UP-okemon",
    tags: ["C++", "SFML"],
  },
  {
    title: "Rain de Luca in Action",
    description:
      "Rain De Luca in Action is a mystery-solving game inspired by Phoenix Wright.",
    image: "/rain.png",
    githubUrl: "https://github.com/Loweso/rain_deLuca",
    tags: ["GDScript", "Godot Engine"],
  },
  {
    title: "Ballpoint",
    description:
      "A note-taking app with AI-powered features including summarization, sentence-level highlight querying, autocomplete, note organization, and tagging.",
    image: "/ballpoint.png",
    githubUrl: "https://github.com/Loweso/ballpoint",
    tags: ["React Native", "Expo", "Mistral OCR", "Google STT", "DeepSeek"],
  },
  {
    title: "YelpCamp",
    description:
      "YelpCamp is a platform where users can find, create, and review campgrounds.",
    image: "/yelpcamp.png",
    githubUrl: "https://github.com/arwin50/YelpCamp",
    liveUrl: "https://yelpcamp-tzu.onrender.com/",
    tags: ["Express", "MongoDB", "EJS"],
  },
];

const automationProjects: Project[] = [
  {
    title: "Email Monitoring Automation",
    description:
      "Reads incoming emails, classifies them by intent, and automatically drafts replies when needed — keeping your inbox handled without manual triage.",
    image: "/email automation.png",
    tags: ["n8n", "Gmail", "AI"],
    workflowSteps: [
      "New email arrives in the inbox and triggers the n8n workflow",
      "AI reads the email body and classifies it by intent — inquiry, complaint, follow-up, etc.",
      "Email is labeled in Gmail according to its detected intent",
      "If a reply is warranted, AI drafts a context-aware response and saves it as a Gmail draft",
    ],
  },
  {
    title: "Social Media Automation",
    description:
      "Accepts a content idea, target platforms, and posting date via Excel, then generates tailored posts and schedules them automatically across channels.",
    image: "/social media automation poster.png",
    images: ["/social media automation poster.png", "/content maker.png"],
    tags: ["n8n", "Excel", "AI", "Content Generation"],
    workflowSteps: [
      "User fills in an Excel sheet with the content idea, target platforms, and desired posting date",
      "n8n monitors the sheet and triggers on new or updated rows",
      "AI generates platform-specific content — adjusting tone, format, and length per channel",
      "Posts are queued and published automatically at the scheduled date and time",
    ],
  },
  {
    title: "Lead Intake & Voice Qualifier",
    description:
      "Captures leads from a GoHighLevel form and triggers a VAPI voice agent that calls to qualify them — asking about business needs and booking discovery calls on the spot.",
    image: "/Lead Intake.png",
    tags: ["n8n", "GoHighLevel", "VAPI", "Voice AI"],
    workflowSteps: [
      "Lead submits their information through a GoHighLevel intake form",
      "n8n detects the new submission and immediately triggers a VAPI voice agent",
      "The AI voice agent calls the lead and runs through qualifying questions — business needs, budget, timeline, and goals",
      "Qualified leads can book a discovery call directly through the voice agent before the call ends",
    ],
  },
  {
    title: "Call Analysis (Pre & Post)",
    description:
      "Prepares structured agendas and talking points before each call, then analyzes the transcript afterward to surface key takeaways and next steps.",
    image: "/ai appointment prep.png",
    images: ["/ai appointment prep.png", "/postcall analysis.png"],
    tags: ["AI", "Transcription", "n8n"],
    workflowSteps: [
      "Pre-call: Upcoming meetings are pulled from the calendar and fed into the workflow",
      "AI generates a structured agenda with relevant talking points and background context for each call",
      "Post-call: The call transcript is received and analyzed by AI",
      "Key takeaways, action items, and next steps are extracted and delivered as a clean summary",
    ],
  },
  {
    title: "Social Media Chatbot",
    description:
      "An AI-powered chatbot for Facebook and Instagram that handles DMs, answers common questions, and keeps followers engaged around the clock.",
    image: "/chatbot.png",
    tags: ["n8n", "Facebook", "Instagram", "AI", "Chatbot"],
    workflowSteps: [
      "A DM is received on Facebook or Instagram and triggers the workflow",
      "AI reads the message and determines the user's intent and context",
      "A relevant, on-brand reply is generated and sent automatically",
      "Handles FAQs, product inquiries, and general engagement 24/7 without manual intervention",
    ],
  },
  {
    title: "Concierge",
    description:
      "A team coordination web app combining the best of Slack and Jira — with an AI assistant that can create and assign tasks, Kanban boards for project tracking, and real-time team messaging.",
    image: "/katcon.png",
    video:
      "https://res.cloudinary.com/dxiuysrao/video/upload/v1781189920/katconvid_dawicm.mp4",
    tags: [
      "n8n",
      "AI Chat",
      "Supabase",
      "Real-time Messaging",
      "Team Coordination",
    ],
    workflowSteps: [
      "Team members send natural language requests to the AI assistant to create or assign tasks",
      "The AI parses intent, sets priorities, and routes task assignments to the right person",
      "Kanban boards give the whole team a live visual overview of project status",
      "Built-in messaging keeps communication and task context in one place",
    ],
  },
];

export const ProjectSection: React.FC<AnimationProps> = ({ className }) => {
  const [activeTab, setActiveTab] = useState<"dev" | "automation">("dev");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const projects = activeTab === "dev" ? devProjects : automationProjects;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedProject(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selectedProject ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject]);

  return (
    <section
      className={`min-h-screen text-foreground ${className} w-full relative py-20 px-4 md:px-8`}
      id="projects"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--muted)_1px,transparent_1px),linear-gradient(to_bottom,var(--muted)_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="w-[80%] mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience.
          </p>
        </div>

        <div className="flex justify-center mb-12">
          <div className="inline-flex items-center bg-muted rounded-full p-1 gap-1">
            <button
              onClick={() => setActiveTab("dev")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "dev"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Developer
            </button>
            <button
              onClick={() => setActiveTab("automation")}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activeTab === "automation"
                  ? "bg-rose-500 text-white shadow-md shadow-rose-500/30"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Automation Specialist
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={`${activeTab}-${index}`}
              project={project}
              onOpen={
                activeTab === "automation"
                  ? () => setSelectedProject(project)
                  : undefined
              }
            />
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project; onOpen?: () => void }> = ({
  project,
  onOpen,
}) => {
  const slides = project.images ?? [project.image];
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultiple = slides.length > 1;

  const prev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i - 1 + slides.length) % slides.length);
  };

  const next = (e: React.MouseEvent) => {
    e.stopPropagation();
    setImgIndex((i) => (i + 1) % slides.length);
  };

  return (
    <div
      onClick={onOpen}
      className={`bg-card-background rounded-lg overflow-hidden border flex flex-col border-card-border hover:border-card-border/80 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 group ${
        onOpen ? "cursor-pointer" : ""
      }`}
    >
      <div className="relative h-48 overflow-hidden">
        <img
          src={slides[imgIndex]}
          alt={`${project.title} screenshot ${imgIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>

        {onOpen && (
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm">
              View Details
            </span>
          </div>
        )}

        {hasMultiple && (
          <>
            <button
              onClick={prev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={next}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10"
              aria-label="Next image"
            >
              <ChevronRight size={16} />
            </button>
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-10">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    setImgIndex(i);
                  }}
                  className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                    i === imgIndex ? "bg-white scale-125" : "bg-white/50"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-muted-foreground mb-4 text-sm text-pretty">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-muted text-foreground px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex justify-between items-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="text-muted-foreground hover:text-foreground transition-colors hover:animate-pulse-scale"
              aria-label={`GitHub repository for ${project.title}`}
            >
              <Github size={20} />
            </a>
          )}

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-sm text-foreground hover:text-rose-400 transition-colors"
              aria-label={`Live demo for ${project.title}`}
            >
              <span>View Project</span>
              <ExternalLink size={16} />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

const ProjectModal: React.FC<{ project: Project; onClose: () => void }> = ({
  project,
  onClose,
}) => {
  const slides = project.images ?? [project.image];
  const [imgIndex, setImgIndex] = useState(0);
  const hasMultiple = slides.length > 1;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="relative bg-card-background border border-card-border rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto shadow-2xl shadow-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-muted hover:bg-muted/80 text-foreground rounded-full p-1.5 transition-colors"
          aria-label="Close modal"
        >
          <X size={18} />
        </button>

        {/* Media */}
        <div className="relative w-full aspect-video bg-black rounded-t-xl overflow-hidden">
          {project.video ? (
            <video
              src={project.video}
              className="w-full h-full object-contain"
              autoPlay
              muted
              loop
              controls
            />
          ) : (
            <>
              <img
                src={slides[imgIndex]}
                alt={`${project.title} screenshot ${imgIndex + 1}`}
                className="w-full h-full object-contain"
              />
              {hasMultiple && (
                <>
                  <button
                    onClick={() =>
                      setImgIndex(
                        (i) => (i - 1 + slides.length) % slides.length,
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={() => setImgIndex((i) => (i + 1) % slides.length)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white rounded-full p-2 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                  <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                    {slides.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setImgIndex(i)}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          i === imgIndex ? "bg-white scale-125" : "bg-white/50"
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          {project.workflowSteps && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-rose-400 mb-4">
                How it works
              </h4>
              <ol className="space-y-3">
                {project.workflowSteps.map((step, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </span>
                    <span className="text-muted-foreground leading-relaxed pt-0.5">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span
                key={i}
                className="text-xs bg-muted text-foreground px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
