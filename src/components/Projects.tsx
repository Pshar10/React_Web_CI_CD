import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ExternalLink, ChevronDown } from "lucide-react";

interface Project {
  title: string;
  subtitle: string;
  description: string;
  technologies: string[];
  github: string;
}

interface ProjectsProps {
  visibleElements: Set<string>;
  projects: Project[];
  scrollToSection: (sectionId: string) => void;
}

const initialVisibleCount = 6;

const getShortDesc = (desc: string) =>
  desc.length > 85 ? desc.split(".")[0].slice(0, 80) + "..." : desc;

const Projects: React.FC<ProjectsProps> = ({
  visibleElements,
  projects,
  scrollToSection,
}) => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [openProjects, setOpenProjects] = useState<{ [key: number]: boolean }>(
    {}
  );

  const toggleProjectCard = (index: number) => {
    setOpenProjects((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, initialVisibleCount);

  return (
    <section
      id="projects"
      className="min-h-[clamp(40rem,_100vh,_64rem)] py-[clamp(3rem,_6vw,_5rem)] bg-gray-900 scroll-snap-start snap-start flex flex-col justify-between"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" id="projects-header">
          <h2
            className={`text-4xl font-bold mb-4 text-white transition-all duration-1000 ${
              visibleElements.has("projects-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Featured Projects
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto transition-all duration-1000 delay-200 ${
              visibleElements.has("projects-header")
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div className="flex flex-wrap items-start -mx-4" id="projects-grid">
          {visibleProjects.map((project, index) => {
            const isOpen = !!openProjects[index];
            return (
              <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                <div className="project-card glass-card flex flex-col rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <div className="w-full px-6 py-5 flex flex-col gap-2">
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">
                        {project.title}
                      </h3>
                      <p className="text-blue-400 font-semibold">
                        {project.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    } origin-top transform`}
                  >
                    {isOpen && (
                      <div className="px-6 py-4">
                        <p className="text-gray-300 mb-4">
                          {project.description}
                        </p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {project.technologies.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className="skill-tag flex items-center px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300 hover:bg-gradient-to-r from-blue-400 to-emerald-400 hover:text-white transition-all duration-200"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <a
                          href={project.github}
                          className="glass-button inline-flex items-center gap-2 px-4 py-2 rounded transition-all duration-300 text-white font-semibold shadow-md hover:scale-105"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink size={18} /> View on GitHub
                        </a>
                      </div>
                    )}
                  </div>

                  {!isOpen && (
                    <div className="px-6 pb-2">
                      <p className="text-gray-400 mb-2 text-sm">
                        {getShortDesc(project.description)}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-center pb-4">
                    <button
                      onClick={() => toggleProjectCard(index)}
                      className="mt-2 flex items-center text-blue-400 hover:text-white transition-all duration-300 focus:outline-none transform hover:scale-110"
                      aria-label={isOpen ? "Collapse details" : "Expand details"}
                    >
                      {isOpen ? (
                        <FaChevronUp size={24} />
                      ) : (
                        <FaChevronDown size={24} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center mt-6">
          {!showAllProjects && projects.length > initialVisibleCount && (
            <button
              className="glass-button px-8 py-3 rounded-lg text-white text-lg font-bold shadow-lg transition-all duration-500 flex items-center gap-2 transform hover:scale-105 hover:shadow-2xl"
              onClick={() => setShowAllProjects(true)}
              style={{
                background: "linear-gradient(45deg, #3b82f6, #10b981)",
                backgroundSize: "200% 200%",
                animation: "gradient-x 3s ease infinite",
              }}
            >
              Show All Projects
              <FaChevronDown className="transition-transform duration-300 group-hover:translate-y-1" />
            </button>
          )}
          {showAllProjects && projects.length > initialVisibleCount && (
            <button
              className="glass-button px-8 py-3 rounded-lg text-white text-lg font-bold shadow-lg transition-all duration-500 flex items-center gap-2 transform hover:scale-105 hover:shadow-2xl"
              onClick={() => setShowAllProjects(false)}
              style={{
                background: "linear-gradient(45deg, #10b981, #3b82f6)",
                backgroundSize: "200% 200%",
                animation: "gradient-x 3s ease infinite",
              }}
            >
              Show Less
              <FaChevronUp className="transition-transform duration-300 group-hover:-translate-y-1" />
            </button>
          )}
        </div>
      </div>

      <div className="mt-12 animate-bounce">
        <ChevronDown
          size={40}
          className="mx-auto text-white/50 hover:text-white transition-all duration-500 transform hover:scale-125 hover:translate-y-1 drop-shadow-glow cursor-pointer animate-bounce"
          onClick={() => scrollToSection("contact")}
        />
      </div>
    </section>
  );
};

export default Projects;
