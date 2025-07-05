import React, { useState, useRef } from "react";
import { Calendar, MapPin } from "lucide-react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import smoothScrollTo from "../utils/smoothScrollTo";

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

const Experience: React.FC<ExperienceProps> = ({ visibleElements, experience, scrollToSection }) => {
  const [openExp, setOpenExp] = useState<number | null>(null);
  const arrowRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [collapsingIndex, setCollapsingIndex] = useState<number | null>(null);

  const handleExpToggle = (index: number, isOpen: boolean) => {
    if (isOpen) {
      setCollapsingIndex(index);

      setTimeout(() => {
        setOpenExp(null);
        setCollapsingIndex(null);

        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            const arrowEl = arrowRefs.current[index];
            if (arrowEl) {
              const rect = arrowEl.getBoundingClientRect();
              const scrollTop =
                window.pageYOffset || document.documentElement.scrollTop;
              const offsetTop = rect.top + scrollTop;

              smoothScrollTo(offsetTop - 450, 50);
            }
          });
        });
      }, 300);
    } else {
      setOpenExp(index);
      setTimeout(() => {
        const el = document.getElementById(`exp-card-${index}`);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 310);
    }
  };

  return (
    <section id="experience" className="min-h-screen py-20 bg-gray-800 scroll-snap-start snap-start flex flex-col justify-between">
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
            const isOpen = openExp === index;
            const isCollapsing = collapsingIndex === index;
            const showDropdown = isOpen || isCollapsing;
            const topHighlights = exp.highlights.slice(0, 4);
            const remainingHighlights = exp.highlights.slice(4);

            return (
              <div key={index} className="w-full sm:w-1/2 px-4 mb-8">
                <div
                  id={`exp-card-${index}`}
                  className="experience-card glass-card flex flex-col rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl"
                >
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

                  <div
                    style={{
                      height: showDropdown ? "auto" : "0px",
                      opacity: showDropdown ? 1 : 0,
                      overflow: "hidden",
                      transition: "opacity 0.2s ease, padding 0.4s ease",
                      paddingLeft: showDropdown ? "24px" : "0px",
                      paddingRight: showDropdown ? "24px" : "0px",
                      paddingTop: showDropdown ? "12px" : "0px",
                      paddingBottom: showDropdown ? "12px" : "0px",
                    }}
                  >
                    <div className="space-y-3">
                      {remainingHighlights.map((highlight, hIndex) => (
                        <div key={hIndex} className="flex items-start gap-3 group">
                          <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                          <p className="text-gray-300 group-hover:text-white transition-colors duration-300 leading-relaxed">
                            {highlight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {remainingHighlights.length > 0 && (
                    <div className="flex justify-center pt-2 pb-4">
                      <button
                        ref={(el) => (arrowRefs.current[index] = el)}
                        onClick={() => handleExpToggle(index, isOpen)}
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