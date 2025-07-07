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
import Chatbot from "./components/Chatbot"; 

const App: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [showMobileScrollTop, setShowMobileScrollTop] = useState(false);
  const [visibleElements, setVisibleElements] = useState(new Set<string>());

  const contactRef = useRef<HTMLElement | null>(null);

  // Track scroll position (for desktop "Back to Top" button visibility)
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for contact section to show "Back to Top" on small screens
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const isSmallScreen = window.innerWidth <= 768;
        setShowMobileScrollTop(entry.isIntersecting && isSmallScreen);
      },
      {
        threshold: 0.4, // Show when ~40% visible
      }
    );

    if (contactRef.current) {
      observer.observe(contactRef.current);
    }

    return () => {
      if (contactRef.current) {
        observer.unobserve(contactRef.current);
      }
    };
  }, []);

  // Intersection Observer for tracking visible sections (all ids)
  useEffect(() => {
    const observerRef = new IntersectionObserver(
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
    elements.forEach((el) => observerRef.observe(el));

    return () => observerRef.disconnect();
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: "smooth" });
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
      <Contact visibleElements={visibleElements} ref={contactRef} />
      <Footer />

      <Chatbot />

      {/* Back to Top Button */}
      {/* Always show on md+ when scrolled down, on small screen only when Contact is in view */}
      {(showMobileScrollTop || (scrollY > 400 && window.innerWidth > 768)) && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </div>
  );
};

export default App;
