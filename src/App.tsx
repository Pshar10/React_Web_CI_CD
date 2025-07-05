// App.tsx
import React, { useState, useEffect, useRef } from "react";
import { ArrowUp } from "lucide-react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import experienceData from "./constants/experience";
import projectData from "./constants/projects";

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      setShowScrollTop(window.scrollY > 400); // Show button after scrolling
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.target.id) {
            setVisibleElements((prev) => {
              if (prev.has(entry.target.id)) return prev;
              const updated = new Set(prev);
              updated.add(entry.target.id);
              return updated;
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll("[id]");
    elements.forEach((el) => {
      if (observerRef.current) observerRef.current.observe(el);
    });

    return () => observerRef.current?.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white scroll-smooth">
      <Navbar
        scrollToTop={scrollToTop}
        scrollToSection={scrollToSection}
        isMenuOpen={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        scrollY={scrollY}
      />
      <Hero scrollToSection={scrollToSection} />
      <About visibleElements={visibleElements} scrollToSection={scrollToSection} />
      <Skills visibleElements={visibleElements} scrollToSection={scrollToSection} />
      <Experience
        visibleElements={visibleElements}
        experience={experienceData}
        scrollToSection={scrollToSection}
      />
      <Projects
        visibleElements={visibleElements}
        projects={projectData}
        scrollToSection={scrollToSection}
      />
      <Contact visibleElements={visibleElements} />
      <Footer />

      {/* Scroll to Top Button - hidden on small screens */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="hidden md:block fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default App;
