import React, { useState } from "react";
import { Calendar, MapPin, ChevronDown } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface ExperienceItem {
  title: string;
  company: string;
  period: string;
  location: string;
  highlights: string[];
}

interface ExperienceProps {
  visibleElements: Set<string>;
  experience: ExperienceItem[];
  scrollToSection: (sectionId: string) => void;
}

const Experience: React.FC<ExperienceProps> = ({
  visibleElements,
  experience,
  scrollToSection,
}) => {
  const [openExperience, setOpenExperience] = useState<{
    [key: number]: boolean;
  }>({});

  const toggleExperienceCard = (index: number) => {
    setOpenExperience((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      id="experience"
      className="min-h-screen py-20 bg-gray-800 scroll-snap-start snap-start flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" id="experience-header">
          <h2
            className={`text-4xl font-bold mb-4 text-white transition-all duration-1000 ${
              visibleElements.has("experience-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Professional Experience
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto transition-all duration-1000 delay-200 ${
              visibleElements.has("experience-header")
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div className="flex flex-wrap -mx-4" id="experience-list">
          {experience.map((exp, index) => {
            const isOpen = !!openExperience[index];
            const topHighlights = exp.highlights.slice(0, 4);
            const remainingHighlights = exp.highlights.slice(4);

            return (
              <div key={index} className="w-full sm:w-1/2 px-4 mb-8">
                <div className="experience-card glass-card flex flex-col rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 px-6 pt-6">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">
                        {exp.title}
                      </h3>
                      <p className="text-blue-400 font-semibold text-lg">
                        {exp.company}
                      </p>
                    </div>
                    <div className="text-gray-400 mt-2 md:mt-0">
                      <div className="flex items-center gap-2 mb-1">
                        <Calendar size={16} />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="px-6 pt-0 pb-2">
                    <div className="space-y-3">
                      {topHighlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                          <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expandable content */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${
                      isOpen ? "opacity-100 scale-y-100" : "opacity-0 scale-y-0"
                    } origin-top transform`}
                  >
                    {isOpen && (
                      <div className="px-6 pt-2 pb-4">
                        <div className="space-y-3">
                          {remainingHighlights.map((highlight, hIndex) => (
                            <div
                              key={hIndex}
                              className="flex items-start gap-3 group"
                            >
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                              <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                                {highlight}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {remainingHighlights.length > 0 && (
                    <div className="flex justify-center pt-2 pb-4">
                      <button
                        onClick={() => toggleExperienceCard(index)}
                        className="mt-2 flex items-center text-blue-400 hover:text-white transition-all duration-300 focus:outline-none transform hover:scale-110"
                        aria-label={isOpen ? "Collapse details" : "Expand details"}
                      >
                        {isOpen ? (
                          <FaChevronUp size={28} />
                        ) : (
                          <FaChevronDown size={28} />
                        )}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-12 animate-bounce">
        <ChevronDown
          size={40}
          className="mx-auto text-white/50 hover:text-white transition-all duration-500 transform hover:scale-125 hover:translate-y-1 drop-shadow-glow cursor-pointer animate-bounce"
          onClick={() => scrollToSection("projects")}
        />
      </div>
    </section>
  );
};

export default Experience;
