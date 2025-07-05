import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import skillCategories from "../constants/skillCategories";

interface SkillsProps {
  visibleElements: Set<string>;
  scrollToSection: (sectionId: string) => void;
}

const Skills: React.FC<SkillsProps> = ({ visibleElements, scrollToSection }) => {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <section
      id="skills"
      className="min-h-screen bg-gray-900 text-white scroll-snap-start snap-start flex flex-col justify-between py-20"
    >
      <div className="max-w-6xl mx-auto px-4">
        <div
          className={`text-center mb-12 transition-all duration-1000 ${
            visibleElements.has("skills-header")
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
          id="skills-header"
        >
          <h2 className="text-4xl font-bold mb-4 text-white">Technical Skills</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto"></div>
        </div>

        <div className="flex flex-wrap -mx-4">
          {skillCategories.map((category, index) => {
            const isOpen = openCard === index;
            const elementId = `skills-card-${index}`;
            const isVisible = visibleElements.has(elementId);

            return (
              <div
                key={index}
                id={elementId}
                className={`w-full sm:w-1/2 lg:w-1/3 px-4 mb-8 transition-all duration-1000 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
              >
                <div className="skill-card glass-card flex flex-col rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
                  <button
                    onClick={() => toggleCard(index)}
                    className="w-full px-6 py-5 flex justify-between items-center focus:outline-none"
                  >
                    <span className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-2xl">{category.emoji}</span>
                      {category.title}
                    </span>
                    <span className={`arrow-icon ${isOpen ? "rotated" : ""}`}>
                      {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </span>
                  </button>

                  <div
                    style={{
                      maxHeight: isOpen ? "500px" : "0px",
                      opacity: isOpen ? 1 : 0,
                      paddingTop: isOpen ? "16px" : "0px",
                      paddingBottom: isOpen ? "24px" : "0px",
                      overflow: "hidden",
                      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                    className="px-6"
                  >
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      {category.skills.map((skill, idx) => (
                        <div
                          key={idx}
                          className="skill-tag rounded-lg text-center py-2 px-3 shadow-md text-white bg-white/10 hover:bg-gradient-to-r from-blue-400 to-emerald-400 hover:text-white transform hover:scale-105 transition-all duration-200"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
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
          onClick={() => scrollToSection("experience")}
        />
      </div>
    </section>
  );
};

export default Skills;
