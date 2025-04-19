import type React from "react";
import type { AnimationProps } from "@/app/interface";
import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  tags: string[];
}

export const ProjectSection: React.FC<AnimationProps> = ({ className }) => {
  const projects: Project[] = [
    {
      title: "Doorm",
      description:
        "Dorm is an app where users can search for, list, and discover dormitories.",
      image: "/doorm.png",
      githubUrl: "https://github.com/Loweso/doorm",
      liveUrl: "https://github.com/Loweso/doorm",
      tags: ["VueJS", "TailwindCSS", "ExpressJS", "MySQL"],
    },
    {
      title: "Beacon",
      description:
        "Beacon is an AI-powered roadmap app that generates personalized career paths for users.",
      image: "/beacon.png",
      githubUrl: "https://github.com/unravyl/beacon",
      liveUrl: "beaconph.site",
      tags: ["Next.js", "TypeScript", "Firebase", "Django"],
    },
    {
      title: "UPokemon",
      description:
        "UPokemon is a game that recreates the classic Pokémon experience with turn-based battles.",
      image: "/upokemon.png",
      githubUrl: "https://github.com/Loweso/UP-okemon",
      liveUrl: "https://github.com/Loweso/UP-okemon",
      tags: ["C++", "SFML"],
    },
    {
      title: "Rain de Luca in Action",
      description:
        "Rain De Luca in Action is a mystery-solving game inspired by Phoenix Wright.",
      image: "/rain.png",
      githubUrl: "https://github.com/Loweso/rain_deLuca",
      liveUrl: "https://github.com/Loweso/rain_deLuca",
      tags: ["GDScript", "Godot Engine"],
    },
    {
      title: "DjangoBNB",
      description:
        "DjangoBNB is a web application that is a clone of Airbnb built with Django.",
      image: "/djangobnb.png",
      githubUrl: "https://github.com/arwin50/DjangoBnbAgain",
      liveUrl: "https://github.com/arwin50/DjangoBnbAgain",
      tags: ["React", "Django", "PostgreSQL"],
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

  return (
    <section
      className={`min-h-screen text-white ${className} w-full relative py-20 px-4 md:px-8 `}
      id="projects"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      <div className="w-[80%] mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">My Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Here are some of the projects I've worked on. Each one represents a
            unique challenge and learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <div className="bg-black/20 rounded-lg overflow-hidden border flex flex-col  border-gray-600 hover:border-gray-400 transition-all duration-300 hover:shadow-xl hover:shadow-rose-500/10 group">
      <div className="relative h-48 overflow-hidden">
        <img
          src={project.image || "/doorm.png"}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-rose-500/10 to-transparent opacity-0 group-hover:opacity-70 transition-opacity duration-300"></div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
        <p className="text-gray-400 mb-4 text-sm text-pretty">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4 mt-auto">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded-full"
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
              className="text-gray-400 hover:text-white transition-colors"
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
              className="flex items-center gap-1 text-sm text-white hover:text-rose-400 transition-colors"
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
