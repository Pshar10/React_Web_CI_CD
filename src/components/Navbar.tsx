import React from "react";
import { Menu, X } from "lucide-react";

interface NavbarProps {
  scrollToTop: () => void;
  scrollToSection: (sectionId: string) => void;
  isMenuOpen: boolean;
  setIsMenuOpen: (open: boolean) => void;
  scrollY: number;
}

const Navbar: React.FC<NavbarProps> = ({
  scrollToTop,
  scrollToSection,
  isMenuOpen,
  setIsMenuOpen,
  scrollY,
}) => {
  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
        scrollY > 50
          ? "bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-800/50"
          : "bg-gray-900 md:bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <button
            onClick={scrollToTop}
            className="text-2xl font-bold text-white transition-all duration-300 hover:scale-105 cursor-pointer hover:text-shadow-glow"
          >
            Pranav Sharma
          </button>

          <div className="hidden md:flex space-x-8">
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="nav-item text-gray-300 hover:text-white transition-all duration-300 font-medium relative px-4 py-2 rounded-lg"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                </button>
              )
            )}
          </div>

          <button
            className="md:hidden transition-transform duration-300 hover:scale-110"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ease-out ${
            isMenuOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="py-4 border-t border-gray-700">
            {["About", "Skills", "Experience", "Projects", "Contact"].map(
              (item, index) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left py-3 text-gray-300 hover:text-white transition-all duration-300 hover:translate-x-2"
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
