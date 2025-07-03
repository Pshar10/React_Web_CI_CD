import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Calendar,
  Award,
  Code,
  Cloud,
  Database,
  GitBranch,
  Server,
  Shield,
  CheckCircle,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleElements, setVisibleElements] = useState(new Set());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Intersection Observer for fade-up animations
  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleElements((prev) => {
              if (prev.has(entry.target.id)) return prev;
              const updated = new Set(prev);
              updated.add(entry.target.id);
              return updated;
            });
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    // Wait for DOM to be ready and observe elements
    const timer = setTimeout(() => {
      const elements = document.querySelectorAll("[id]");
      elements.forEach((el) => {
        if (observerRef.current && el.id) {
          observerRef.current.observe(el);
        }
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  const skillCategories = [
    {
      emoji: "🐍",
      title: "Programming Languages",
      skills: ["Python", "C++", "MATLAB"],
    },
    {
      emoji: "🛡️",
      title: "Monitoring, Observability & Security",
      skills: [
        "Grafana",
        "Prometheus",
        "CloudWatch",
        "OWASP",
        "Trivy",
        "SonarQube",
      ],
    },
    {
      emoji: "🗄️",
      title: "Databases",
      skills: ["MySQL", "DynamoDB", "PostgreSQL"],
    },
    {
      emoji: "🔀",
      title: "Version Control & CI/CD",
      skills: ["GitHub", "ArgoCD", "Jenkins"],
    },
    {
      emoji: "☁️",
      title: "Cloud & Infrastructure",
      skills: ["AWS", "Terraform", "Docker", "Kubernetes", "Ansible"],
    },
    {
      emoji: "🌐",
      title: "Networking",
      skills: [
        "VPC",
        "Subnets",
        "CIDR Blocks",
        "Internet Gateway",
        "Route 53",
        "Load Balancers (ALB/NLB)",
      ],
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleCategory = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [dropdownHeights, setDropdownHeights] = useState<number[]>([]);
  const [openCard, setOpenCard] = useState<number | null>(null);

  useEffect(() => {
    const heights = dropdownRefs.current.map((ref) =>
      ref ? ref.scrollHeight : 0
    );
    setDropdownHeights(heights);
  }, [skillCategories.length]);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80; // Account for fixed navbar
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set());

  const toggleCard = (index: number) => {
    if (openCard === index) {
      setOpenCard(null);
      setTimeout(() => {
        setExpandedCards((prev) => {
          const copy = new Set(prev);
          copy.delete(index);
          return copy;
        });
      }, 400);
    } else {
      setOpenCard(index);
      setTimeout(() => {
        setExpandedCards((prev) => new Set(prev).add(index));
      }, 250); // slight delay to allow dropdown to open first
    }
  };

  const experience = [
    {
      title: "Graduate Researcher",
      company: "Fraunhofer IIS",
      period: "Jan 2022 - Sep 2024",
      location: "Erlangen, Germany",
      highlights: [
        "Developed and deployed the CINGO spatial audio system in Unity 3D, enhancing the user experience in virtual environments by creating modular software for real-time spatial audio rendering",
        "Conducted a comparative analysis of loudspeaker and headphone recordings using sine sweep, analyzing Room Impulse Responses (RIRs) and correlating acoustic measures with perceptual audio quality",
        "Recorded loudspeaker/headphones using sweeps for multiple source-receiver configurations to improve and enhance the RIR dataset",
        "Designed Acoustic Visualization tools using Qt/C++, enabling room acoustics visualization and analysis of large datasets",
        "Enhanced Binaural Room Impulse Responses (BRIRs) and assessed innovative spatial audio plugins, optimizing data-driven audio systems for improved localization, timbre, and envelopment",
        "Played a pivotal role in the Mobile Audio Rendering team, enhancing overall user experience in spatial audio using signal processing",
        "Executed MUSHRA tests to assess spatial audio perceptual effects with HRTF across diverse populations, achieving a 30% improvement in audio quality",
        "Designed and implemented an analysis framework for comparing various spatial binaural renderers, enabling comprehensive comparison and optimization of spatial audio tools",
        "Created a RIR similarity matching algorithm using unsupervised machine learning, automating the comparison of Frequency Domain Network (FDN)-based RIRs with real-world RIRs, improving system efficiency by streamlining data processing",
      ],
    },
    {
      title: "Associate Engineer",
      company: "Tata Consultancy Services",
      period: "Sep 2018 - Jun 2020",
      location: "Pune, India",
      highlights: [
        "Designed and deployed a three-tier web application using Docker, Kubernetes, Jenkins, and AWS EC2, improving deployment efficiency by 40%",
        "Deployed a complete environment, including VPC, EC2 instances, RDS, and S3 buckets, with version-controlled templates",
        "Implemented a CI/CD pipeline using AWS CodePipeline and CodeBuild, automating the deployment of a serverless application with AWS Lambda and S3, reducing deployment time by 30%",
        "Maintained and optimized the Model Data Repository for offshore banking operations with the Bank of Montreal, ensuring high data integrity and performance",
        "Designed data models and implemented complex SQL queries for data extraction, reporting, and analytics, reducing query execution time by 20%",
        "Developed a RESTful API for managing database interactions, integrating DynamoDB for highly available data processing",
        "Standardized infrastructure deployment using AWS CDK and CloudFormation templates, reducing manual configuration errors by 80%",
        "Deployed a production-grade Kubernetes application on AWS EKS, optimizing resource allocation and scaling by 50%",
        "Created Helm charts to streamline deployments and manage versioned updates, achieving seamless rollouts with zero downtime",
        "Automated cluster provisioning and scaling through CI/CD pipelines using GitHub Actions and Terraform, reducing deployment cycles by 60%",
        "Ensured high availability with 99.95% uptime and improved operational efficiency by cutting manual intervention by 45%",
      ],
    },
  ];

  const projects = [
    {
      title: "CryptoChat AI",
      subtitle: "AI-powered Ethereum Transaction Agent",
      description:
        "Built and Dockerized an AI chat agent enabling Ethereum Sepolia transactions. Deployed dockerized web app on AWS EC2 with automated Node.js and PNPM setup.",
      technologies: ["AI", "Blockchain", "Docker", "AWS EC2"],
      github: "https://github.com/Pshar10/CryptoChat-AI",
    },
    {
      title: "Bill Dekho",
      subtitle: "Automated Smart Meter Tracker",
      description:
        "Web app for electricity usage analytics via data scraping with Selenium. Deployed with Django API, Docker, reverse proxy (NGINX), and ArgoCD.",
      technologies: ["Django", "Docker", "NGINX", "ArgoCD"],
      github: "https://github.com/Pshar10/smart-bill-tracker",
    },
    {
      title: "SnakeOps",
      subtitle: "CI/CD-Powered Browser Game with Real-Time Monitoring",
      description:
        "Developed a web-based Snake game with a modern interface. Integrated Datadog for performance and user behavior monitoring. Implemented CI/CD pipeline using GitHub Actions for automated builds and deployments. Deployed the game on GitHub Pages with live version control. Monitored key metrics and user interactions in real-time.",
      technologies: [
        "CI/CD",
        "Gradle",
        "Automated Monitoring",
        "GitHub Actions",
        "GitHub Pages",
        "Datadog",
      ],
      github: "https://github.com/Pshar10/Snake-Game",
    },

    {
      title: "AI-Based Decay Parameter Estimation",
      subtitle: "Master's Thesis",
      description:
        "Developed a novel DCNN model estimating decay parameters from reverberant speech signals with RMS errors of 2.9‑6 dB.",
      technologies: ["Deep Learning", "Audio Processing", "Python"],
      github:
        "https://github.com/Pshar10/Blind-Estimation-of-EDC-from-Live-Signals",
    },

    {
      title: "Spotify Trendz",
      subtitle: "Real-Time Music Trend Analysis & DevOps Automation",
      description:
        "This project automates real-time music trend analysis using Kubernetes and Terraform. Leveraged EKS for orchestration and Docker Swarm for container management, reducing deployment time by 40%. Integrated Prometheus and Grafana for monitoring.",
      technologies: [
        "Kubernetes",
        "Terraform",
        "Docker",
        "Prometheus",
        "Grafana",
      ],
      github: "https://github.com/Pshar10/Spotify_trendz_Rest_API",
    },
    {
      title: "Spring Boot CI/CD Pipeline",
      subtitle: "Automated Deployment Pipeline",
      description:
        "A robust CI/CD pipeline for automating Spring Boot app deployment with Jenkins, Docker, Kubernetes, and ArgoCD, integrated with SonarQube for static code analysis.",
      technologies: ["Jenkins", "Docker", "Kubernetes", "SonarQube", "ArgoCD"],
      github: "https://github.com/Pshar10/spring-boot-app-cicd-pipeline",
    },
    {
      title: "Three-Tier Web Application",
      subtitle: "Digital Resume Application",
      description:
        "A Dockerized microservice-based three-tier web app with a frontend (HTML, CSS, JS) and backend (Django), deployed on Kubernetes.",
      technologies: ["Django", "Docker", "Microservices", "Kubernetes"],
      github: "https://github.com/Pshar10/Three-Tier-Web-Application",
    },
    {
      title: "AI/ML Pipeline",
      subtitle: "Automated Machine Learning Pipeline",
      description:
        "Developed and deployed an automated machine learning pipeline on AWS Elastic Beanstalk, integrating AWS CodePipeline and GitHub for CI/CD.",
      technologies: ["AWS Elastic Beanstalk", "CI/CD", "Machine Learning"],
      github: "https://github.com/Pshar10/AI-ML-pipeline",
    },
    {
      title: "Real-Time Contour Detection",
      subtitle: "Real-Time Contour Detection App",
      description:
        "Two-tier web app for real-time contour detection and sensor control using Raspberry Pi and OpenCV, deployed with AWS Elastic Beanstalk and Docker.",
      technologies: [
        "Python",
        "OpenCV",
        "Raspberry Pi",
        "AWS Elastic Beanstalk",
        "Docker",
      ],
      github:
        "https://github.com/Pshar10/Web_Application_Countour_Detection_Using_Raspberrypi_And_Sensor_Controls",
    },
    {
      title: "Video Processing",
      subtitle: "Video Processing Utility",
      description:
        "Python programs for video processing tasks including channel segregation, quantization, DCT, kernel filters, object detection, and pickling.",
      technologies: ["Python", "Video Processing", "Computer Vision"],
      github: "https://github.com/Pshar10/SimpleVideoCodec",
    },
    {
      title: "Context-Based Image Retrieval",
      subtitle: "Content-Based Image Retrieval System",
      description:
        "Implemented image retrieval from a large database based on visual content using machine learning.",
      technologies: ["Machine Learning", "Image Retrieval", "Python"],
      github: "https://github.com/Pshar10/Content_Based_Image_Retrieval",
    },
    {
      title: "VR Game Development",
      subtitle: "VR Locomotion Game",
      description:
        "Developed an arm-swinging locomotion game using HTC Vive, reducing dizziness by 60% to enhance VR user experience.",
      technologies: ["Unity", "VR", "HTC Vive"],
      github: "https://github.com/Pshar10/VR_Game",
    },
    {
      title: "Loudspeakers to Go",
      subtitle: "Mobile Virtual Loudspeaker",
      description:
        "Mobile virtual loudspeaker using Binaural Room Impulse Response database and Intel RealSense depth camera, enhancing spatial audio on portable devices.",
      technologies: ["Spatial Audio", "Intel RealSense", "Audio Processing"],
      github: "https://github.com/Pshar10/Loudspeakers_2_GO",
    },
    {
      title: "Audio Processing",
      subtitle: "Audio Processing Utilities",
      description:
        "Python programs for advanced audio processing tasks: down/up sampling, filtering, quantization, low-delay filter-banks, pitch/speed enhancement, DCT, MDCT, and QMF.",
      technologies: ["Python", "Audio Processing", "Signal Processing"],
      github: "https://github.com/Pshar10/Audio_Video_Processing",
    },
  ];

  const certifications = [
    { name: "AWS Certified Developer", date: "January 2025", icon: Award },
    { name: "AWS Educate Networking", date: "March 2025", icon: Award },
    { name: "Agile Working", date: "November 2018", icon: Award },
    { name: "Internet of Things", date: "November 2018", icon: Award },
  ];

  const [openExp, setOpenExp] = useState<number | null>(null);
  const arrowRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // const handleExpToggle = (isOpen: boolean, index: number) => {
  //   if (isOpen) {
  //     setOpenExp(null);
  //     setTimeout(() => {
  //       const btn = arrowRefs.current[index];
  //       if (btn) {
  //         btn.scrollIntoView({ behavior: "smooth", block: "center" });
  //       }
  //     }, 200); // was 800, now 400 for more responsive feel
  //   } else {
  //     setOpenExp(index);
  //   }
  // };

  const handleExpToggle = (index: number, isOpen: boolean) => {
    if (isOpen) {
      setOpenExp(null);
      setTimeout(() => {
        const btn = arrowRefs.current[index];
        if (btn) {
          btn.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 0); // Should match your collapse animation (400ms)
    } else {
      setOpenExp(index);
    }
  };

  const initialVisibleCount = 6; // Show this many cards initially

  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectsDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [openProjects, setOpenProjects] = useState<{ [key: number]: boolean }>(
    {}
  );

  useEffect(() => {
    const heights = (
      showAllProjects ? projects : projects.slice(0, initialVisibleCount)
    ).map((_, idx) => {
      const el = projectsDropdownRefs.current[idx];
      return el && el.scrollHeight ? el.scrollHeight : 0;
    });
    setDropdownHeights(heights);
    // remove openProjects from the dependencies
  }, [showAllProjects]);

  const toggleProjectCard = (index: number) => {
    setOpenProjects((prev) => {
      const next = {
        ...prev,
        [index]: !prev[index],
      };

      // Use requestAnimationFrame for more robust "after DOM paint"
      requestAnimationFrame(() => {
        const heights = (
          showAllProjects ? projects : projects.slice(0, initialVisibleCount)
        ).map((_, idx) => {
          const el = projectsDropdownRefs.current[idx];
          return el && el.scrollHeight ? el.scrollHeight : 0;
        });
        setDropdownHeights(heights);
      });

      return next;
    });
  };

  const getShortDesc = (desc: string) =>
    desc.length > 85 ? desc.split(".")[0].slice(0, 80) + "..." : desc;

  const visibleProjects = showAllProjects
    ? projects
    : projects.slice(0, initialVisibleCount);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Navigation */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ease-out ${
          scrollY > 50
            ? "bg-gray-900/95 backdrop-blur-md shadow-2xl border-b border-gray-800/50"
            : "bg-gray-900 md:bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent transition-all duration-300 hover:scale-105">
              Pranav Sharma
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["About", "Skills", "Experience", "Projects", "Contact"].map(
                (item) => (
                  <button
                    key={item}
                    onClick={() => scrollToSection(item.toLowerCase())}
                    className="text-gray-300 hover:text-white transition-all duration-300 font-medium relative group"
                  >
                    {item}
                    <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-emerald-400 transition-all duration-300 group-hover:w-full"></span>
                  </button>
                )
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden transition-transform duration-300 hover:scale-110"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
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

      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-900">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-emerald-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.1),transparent_50%)]"></div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="mb-8 animate-fade-in">
            <div className="w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden shadow-2xl transform transition-all duration-500 hover:scale-110 hover:rotate-3">
              <img
                src="/profile-pic.png"
                alt="Pranav Sharma"
                className="w-full h-full object-cover"
              />
            </div>

            {/* <h1 className="text-5xl md:text-7xl font-bold mb-4 animate-slide-up">
              <span className="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Pranav Sharma
              </span>
            </h1> */}
            <p
              className="text-xl md:text-2xl text-gray-300 mb-6 animate-slide-up"
              style={{ animationDelay: "0.2s" }}
            >
              AWS Certified Developer | DevOps Engineer | Audio Technology
              Expert
            </p>
            <p
              className="text-lg text-gray-400 max-w-2xl mx-auto mb-8 animate-slide-up"
              style={{ animationDelay: "0.4s" }}
            >
              Master's graduate bridging acoustic science and cloud engineering
              to drive innovation in scalable, efficient systems with
              specialized expertise in spatial audio and DevOps automation.
            </p>
          </div>

          <div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 animate-slide-up"
            style={{ animationDelay: "0.6s" }}
          >
            <a
              href="mailto:pshar416@gmail.com"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
            >
              <Mail size={20} />
              Get In Touch
            </a>
            <div className="flex gap-4">
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
              <a
                href="/Pranav_Sharma_CV.pdf"
                download
                className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  width={20}
                  height={20}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4"
                  />
                </svg>
                Download My CV
              </a>
            </div>
          </div>

          <div
            className="animate-bounce-slow animate-slide-up"
            style={{ animationDelay: "0.8s" }}
          >
            <ChevronDown
              size={32}
              className="mx-auto text-gray-400 cursor-pointer hover:text-white transition-colors duration-300"
              onClick={() => scrollToSection("about")}
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-800">
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
            {/* Left: About Content */}
            <div id="about-content">
              <div
                className={`transition-all duration-1000 delay-300 ${
                  visibleElements.has("about-content")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Master's graduate in Media Technology with specialized
                  expertise in spatial acoustics and cloud computing. I bring a
                  unique perspective combining acoustic science with modern
                  DevOps practices.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  With hands-on experience in building CI/CD pipelines,
                  containerized deployments, and cloud-native systems, I'm
                  passionate about automating infrastructure and optimizing
                  performance for scalable solutions.
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

            {/* Right: Certifications */}
            <div className="grid grid-cols-2 gap-6" id="about-certs">
              {certifications.map((cert, index) => {
                // Determine if this cert should have a verified badge and link
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
                    className={`
                relative
                bg-gray-700 p-6 rounded-lg hover:bg-gray-600
                transition-all duration-200 transform
                hover:scale-105
                hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.45)]
                hover:shadow-blue-400/60
                hover:ring-1 hover:ring-blue-400/20
                ${
                  visibleElements.has("about-certs")
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }
              `}
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
                    <h3 className="font-semibold mb-2 text-white">
                      {cert.name}
                    </h3>
                    <p className="text-gray-400 text-sm">{cert.date}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section id="skills" className="py-20 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-white">
              Technical Skills
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-400 to-emerald-400 mx-auto"></div>
          </div>

          <div className="flex flex-wrap -mx-4">
            {skillCategories.map((category, index) => {
              const isOpen = openCard === index;

              return (
                <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 mb-8">
                  <div
                    className="
                flex flex-col rounded-2xl bg-white/10 backdrop-blur-lg shadow-lg
                transition-all duration-200
                hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.45)]
                hover:shadow-blue-400/60
                hover:scale-[1.03]
                transform
              "
                  >
                    {/* Card Header */}
                    <button
                      onClick={() => toggleCard(index)}
                      className="w-full px-6 py-5 flex justify-between items-center focus:outline-none"
                    >
                      <span className="text-lg font-semibold text-white flex items-center gap-2">
                        <span className="text-2xl">{category.emoji}</span>
                        {category.title}
                      </span>
                      <span className="text-white">
                        {isOpen ? <FaChevronUp /> : <FaChevronDown />}
                      </span>
                    </button>

                    {/* Dropdown Content */}
                    <div
                      ref={(el) => (dropdownRefs.current[index] = el)}
                      style={{
                        maxHeight: isOpen ? 1000 : 0,
                        opacity: isOpen ? 1 : 0,
                        paddingTop: isOpen ? "16px" : "0px",
                        paddingBottom: isOpen ? "16px" : "0px",
                        overflow: "hidden",
                        transition:
                          "max-height 1s cubic-bezier(.25,.8,.25,1), opacity 0.7s, padding 0.7s",
                      }}
                      className="px-6"
                    >
                      {isOpen && (
                        <div className="grid grid-cols-2 gap-3 text-sm">
                          {category.skills.map((skill, idx) => (
                            <div
                              key={idx}
                              className="rounded-lg text-center py-2 px-3 shadow-md text-white bg-white/10 hover:bg-gradient-to-r from-blue-400 to-emerald-400 hover:text-white transform hover:scale-105 transition-all duration-200"
                              style={{
                                animation: "fadeUp 0.25s ease-out forwards",
                                animationDelay: `${idx * 30}ms`,
                                opacity: 0,
                              }}
                            >
                              {skill}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="experience" className="py-20 bg-gray-800">
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
              return (
                <div key={index} className="w-full sm:w-1/2 px-4 mb-8">
                  <div
                    className="
                flex flex-col rounded-2xl bg-gray-700 shadow-lg
                transition-all duration-200
                hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.45)]
                hover:shadow-blue-400/60
                hover:scale-[1.03]
                transform
              "
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

                    {/* Dropdown Content: Only show when open */}
                    <div
                      style={{
                        maxHeight: isOpen ? 1000 : 0,
                        opacity: isOpen ? 1 : 0,
                        paddingTop: isOpen ? "16px" : "0px",
                        paddingBottom: isOpen ? "16px" : "0px",
                        overflow: "hidden",
                        transition:
                          "max-height 1.2s cubic-bezier(.25,.8,.25,1), opacity 0.7s, padding 0.7s",
                      }}
                      className="px-6"
                    >
                      <div className="space-y-3">
                        {isOpen &&
                          exp.highlights.map((highlight, hIndex) => (
                            <div
                              key={hIndex}
                              className="flex items-start gap-3 group"
                            >
                              <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                              <p className="text-gray-300 transition-colors duration-300 group-hover:text-white leading-relaxed">
                                {highlight}
                              </p>
                            </div>
                          ))}
                      </div>
                    </div>

                    {/* Show top 4 points always, even when closed */}
                    {!isOpen && (
                      <div className="px-6 pb-2">
                        <div className="space-y-3">
                          {exp.highlights
                            .slice(0, 4)
                            .map((highlight, hIndex) => (
                              <div
                                key={hIndex}
                                className="flex items-start gap-3 group"
                              >
                                <div className="w-2 h-2 bg-emerald-400 rounded-full mt-2 flex-shrink-0 group-hover:scale-150 transition-transform duration-300"></div>
                                <p className="text-gray-300 transition-colors duration-300 group-hover:text-white leading-relaxed">
                                  {highlight}
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    )}

                    {/* Arrow button at bottom */}
                    <div className="flex justify-center pb-4">
                      <button
                        ref={(el) => (arrowRefs.current[index] = el)}
                        onClick={() => handleExpToggle(index, isOpen)}
                        className="mt-2 flex items-center text-blue-400 hover:text-white transition-all duration-300 focus:outline-none"
                        aria-label={
                          isOpen ? "Collapse details" : "Expand details"
                        }
                      >
                        {isOpen ? (
                          <FaChevronUp size={28} />
                        ) : (
                          <FaChevronDown size={28} />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section id="projects" className="py-20 bg-gray-900">
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
                  <div
                    className="
                flex flex-col rounded-2xl bg-gray-800 shadow-lg
                transition-all duration-200
                hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.45)]
                hover:shadow-blue-400/60
                hover:scale-[1.03]
                transform
              "
                  >
                    {/* Card Header */}
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

                    {/* Dropdown Content */}
                    <div
                      ref={(el) => (projectsDropdownRefs.current[index] = el)}
                      style={{
                        maxHeight: isOpen ? 1000 : 0,
                        opacity: isOpen ? 1 : 0,
                        overflow: "hidden",
                        transition:
                          "max-height 0.35s cubic-bezier(.25,.8,.25,1), opacity 0.3s",
                      }}
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
                                className="flex items-center px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                          <a
                            href={project.github}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded bg-blue-600 hover:bg-emerald-500 transition-all duration-300 text-white font-semibold shadow-md"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink size={18} /> View on GitHub
                          </a>
                        </div>
                      )}
                    </div>

                    {/* Collapsed short description (if not expanded) */}
                    {!isOpen && (
                      <div className="px-6 pb-2">
                        <p className="text-gray-400 mb-2 text-sm">
                          {getShortDesc(project.description)}
                        </p>
                      </div>
                    )}

                    {/* Arrow button at bottom */}
                    <div className="flex justify-center pb-4">
                      <button
                        onClick={() => toggleProjectCard(index)}
                        className="mt-2 flex items-center text-blue-400 hover:text-white transition-all duration-300 focus:outline-none"
                        aria-label={
                          isOpen ? "Collapse details" : "Expand details"
                        }
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

          {/* Show More / Show Less Button for the grid */}
          <div className="flex justify-center mt-6">
            {!showAllProjects && projects.length > initialVisibleCount && (
              <button
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-emerald-500 hover:from-blue-600 hover:to-emerald-600 text-white text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowAllProjects(true)}
              >
                Show All Projects <FaChevronDown />
              </button>
            )}
            {showAllProjects && projects.length > initialVisibleCount && (
              <button
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg font-bold shadow-lg transition-all duration-300 flex items-center gap-2"
                onClick={() => setShowAllProjects(false)}
              >
                Show Less <FaChevronUp />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      {/* Contact Section */}
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
            {[
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
            ].map((contact, index) => (
              <a
                key={index}
                href={contact.href}
                className={`
            flex flex-col items-center p-6 bg-gray-700 rounded-lg
            transition-all duration-100 group transform
            hover:scale-105
            hover:shadow-[0_0_24px_8px_rgba(34,211,238,0.45)]
            hover:shadow-blue-400/60
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
                  className={`text-${contact.color}-400 group-hover:text-${contact.color}-300 mb-3 transition-all duration-100 transform group-hover:scale-110`}
                  size={32}
                />
                <h3 className="font-semibold mb-2 text-white group-hover:text-white transition-colors duration-100">
                  {contact.title}
                </h3>
                <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-100">
                  {contact.subtitle}
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-700 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400 transition-colors duration-300 hover:text-gray-300">
            © 2025 Pranav Sharma. Crafted with passion for innovation and
            excellence.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
