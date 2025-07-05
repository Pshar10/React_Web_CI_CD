import React from "react";
import { Mail, Linkedin, Github } from "lucide-react";

interface ContactCard {
  icon: React.ElementType;
  title: string;
  subtitle: string;
  href: string;
  color: string;
}

interface ContactProps {
  visibleElements: Set<string>;
}

const contactItems: ContactCard[] = [
  {
    icon: Mail,
    title: "Email",
    subtitle: "pshar416@gmail.com",
    href: "mailto:pshar416@gmail.com",
    color: "blue",
  },
  {
    icon: Linkedin,
    title: "LinkedIn",
    subtitle: "Connect with me",
    href: "https://www.linkedin.com/in/pranav1010/",
    color: "blue",
  },
  {
    icon: Github,
    title: "GitHub",
    subtitle: "View my code",
    href: "https://github.com/Pshar10",
    color: "emerald",
  },
];

const Contact: React.FC<ContactProps> = ({ visibleElements }) => {
  return (
    <section id="contact" className="py-20 bg-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-12" id="contact-header">
          <h2
            className={`text-4xl font-bold mb-4 text-white transition-all duration-1000 ${
              visibleElements.has("contact-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            Let's Connect
          </h2>
          <div
            className={`w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto mb-6 transition-all duration-1000 delay-200 ${
              visibleElements.has("contact-header")
                ? "opacity-100 scale-x-100"
                : "opacity-0 scale-x-0"
            }`}
          ></div>
          <p
            className={`text-gray-300 text-lg max-w-2xl mx-auto transition-all duration-1000 delay-400 ${
              visibleElements.has("contact-header")
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            I'm always interested in discussing new opportunities, innovative
            projects, and collaborations in DevOps, cloud computing, and audio
            technology.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12" id="contact-cards">
          {contactItems.map((contact, index) => (
            <a
              key={index}
              href={contact.href}
              className={`
                glass-card flex flex-col items-center p-6 rounded-lg
                transition-all duration-300 group transform
                hover:scale-105 hover:shadow-2xl
                ${
                  visibleElements.has("contact-cards")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
              style={{ transitionDelay: `${50}ms` }}
              target="_blank"
              rel="noopener noreferrer"
            >
              <contact.icon
                className={`text-${contact.color}-400 group-hover:text-${contact.color}-300 mb-3 transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-12`}
                size={32}
              />
              <h3 className="font-semibold mb-2 text-white group-hover:text-white transition-colors duration-300">
                {contact.title}
              </h3>
              <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                {contact.subtitle}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Contact;