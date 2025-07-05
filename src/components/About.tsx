import React from "react";
import { MapPin, Mail, CheckCircle, Award } from "lucide-react";
import { ChevronDown } from "lucide-react";

interface Certification {
  name: string;
  date: string;
  icon: typeof Award;
}

interface AboutProps {
  visibleElements: Set<string>;
  scrollToSection: (sectionId: string) => void;
}

const certifications: Certification[] = [
  { name: "AWS Certified Developer", date: "January 2025", icon: Award },
  { name: "AWS Educate Networking", date: "March 2025", icon: Award },
  { name: "Agile Working", date: "November 2018", icon: Award },
  { name: "Internet of Things", date: "November 2018", icon: Award },
];

const About: React.FC<AboutProps> = ({ visibleElements, scrollToSection }) => {
  return (
    <section
      id="about"
      className="min-h-screen bg-gray-800 py-20 scroll-snap-start snap-start flex flex-col justify-between"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12" id="about-header">
          <h2
            className={`text-4xl font-bold mb-4 text-white transition-all duration-1000 ${
              visibleElements.has("about-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            About Me
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto transition-all duration-1000 delay-200 ${
              visibleElements.has("about-header")
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          ></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div id="about-content">
            <div
              className={`transition-all duration-1000 delay-300 ${
                visibleElements.has("about-content")
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Master's graduate in Media Technology with specialized expertise in spatial acoustics and cloud computing. I bring a unique perspective combining acoustic science with modern DevOps practices.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                With hands-on experience in building CI/CD pipelines, containerized deployments, and cloud-native systems, I'm passionate about automating infrastructure and optimizing performance for scalable solutions.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-gray-400">
                  <MapPin size={18} />
                  <span>Erlangen, Germany</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail size={18} />
                  <span>pshar416@gmail.com</span>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6" id="about-certs">
            {certifications.map((cert, index) => {
              let badgeLink = "";
              if (cert.name === "AWS Certified Developer") {
                badgeLink =
                  "https://www.credly.com/badges/e666b1fd-275c-466d-9a81-42e666ae4763";
              } else if (cert.name === "AWS Educate Networking") {
                badgeLink =
                  "https://www.credly.com/badges/1aa0b9a6-81ff-4d1f-83f6-eadab6fc5735";
              }

              return (
                <div
                  key={index}
                  className={`relative glass-card p-6 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
                    visibleElements.has("about-certs")
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                >
                  {badgeLink && (
                    <a
                      href={badgeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-3 right-3 text-emerald-400 hover:text-emerald-300 transition-colors"
                      aria-label={`Verified ${cert.name} Certification Badge`}
                    >
                      <CheckCircle size={20} />
                    </a>
                  )}

                  <cert.icon
                    className="text-blue-400 mb-3 transition-transform duration-200 hover:scale-110"
                    size={24}
                  />
                  <h3 className="font-semibold mb-2 text-white">{cert.name}</h3>
                  <p className="text-gray-400 text-sm">{cert.date}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mt-12 animate-bounce">
        <ChevronDown
          size={40}
          className="mx-auto text-white/50 hover:text-white transition-all duration-500 transform hover:scale-125 hover:translate-y-1 drop-shadow-glow cursor-pointer animate-bounce"
          onClick={() => scrollToSection("skills")}
        />
      </div>
    </section>
  );
};

export default About;
