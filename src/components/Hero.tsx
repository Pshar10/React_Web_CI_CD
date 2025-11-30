import React from "react";
import { TypeAnimation } from "react-type-animation";
import { Mail, Linkedin, Github, ChevronDown } from "lucide-react";

interface HeroProps {
  scrollToSection: (sectionId: string) => void;
}

const Hero: React.FC<HeroProps> = ({ scrollToSection }) => {
  return (
    <section
      id="hero"
      className="min-h-[clamp(40rem,_100vh,_64rem)] flex items-center justify-center relative overflow-hidden bg-gray-900 pt-[clamp(5rem,_8vw,_8rem)] pb-[clamp(3rem,_6vw,_4rem)] scroll-snap-start snap-start"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="mb-8 animate-fade-in">
          <div className="profile-glow w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3">
            <img
              src="/profile-pic.png"
              alt="Pranav Sharma"
              className="w-full h-full object-cover"
            />
          </div>

          <p
            className="text-xl md:text-2xl text-gray-300 mb-6 animate-slide-up"
            style={{ animationDelay: "0.2s" }}
          >
            <TypeAnimation
              sequence={[
                "AWS Certified Developer | DevOps & Software Engineer | Digital Identity & Trust Services",
              ]}
              wrapper="span"
              speed={60}
              style={{ display: "inline-block" }}
              repeat={0}
            />
          </p>

          <p
            className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Specializing in cloud-native architecture, Kubernetes orchestration, and secure identity service development with a focus on automation and scalable system design.
          </p>
        </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
            href="mailto:pshar416@gmail.com"
            className="hero-button flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <div className="flex gap-4 items-center">
              <a
                href="https://www.linkedin.com/in/pranav1010/"
                className="p-3 border border-gray-600 hover:border-blue-400 rounded-lg transition-all duration-300 hover:bg-blue-400/10 transform hover:scale-110 hover:shadow-lg"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://github.com/Pshar10"
                className="p-3 border border-gray-600 hover:border-emerald-400 rounded-lg transition-all duration-300 hover:bg-emerald-400/10 transform hover:scale-110 hover:shadow-lg"
              >
                <Github size={20} />
              </a>
            </div>
          </div>

        <div
          className="animate-bounce-slow animate-slide-up"
          style={{ animationDelay: "0.8s" }}
        >
          <ChevronDown
            size={40}
            className="mx-auto text-white/50 hover:text-white transition-all duration-500 transform hover:scale-125 hover:translate-y-1 drop-shadow-glow cursor-pointer animate-bounce"
            onClick={() => scrollToSection("about")}
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
