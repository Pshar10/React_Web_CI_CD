const projectsData = [
  {
    title: "PCOS Clinical Decision Support System",
    subtitle: "AI-Powered PCOS Risk Prediction & Clinical Support",
    description:
      "A full-stack web application for clinical decision support in PCOS. Features ML-based risk prediction, retrieval-augmented generation (RAG) for clinical context, and AI chat using local LLMs. Includes model training, comparison, and a dashboard. Built with React, Flask, scikit-learn, Ollama, and Tailwind CSS.",
    technologies: [
      "React",
      "Flask",
      "scikit-learn",
      "Ollama",
      "Tailwind CSS",
      "RAG",
      "Machine Learning",
      "LLM"
    ],
    github: "https://github.com/Pshar10/PCOS-Clinical-Decision-Support-System",
  },
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
      "Developed a novel DCNN model estimating decay parameters from reverberant speech signals with RMS errors of 2.9‑6 dB.",
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

export default projectsData;
