interface SkillCategory {
  emoji: string;
  title: string;
  skills: string[];
}

const skillCategories: SkillCategory[] = [
  {
    emoji: "💻",
    title: "Programming Languages",
    skills: ["Python", "C++", "MATLAB"],
  },
  {
    emoji: "📊",
    title: "Monitoring, Observability & Security",
    skills: ["Grafana", "Prometheus", "CloudWatch", "OWASP", "Trivy", "SonarQube"],
  },
  {
    emoji: "🗄️",
    title: "Databases",
    skills: ["MySQL", "DynamoDB", "PostgreSQL"],
  },
  {
    emoji: "🔁",
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

export default skillCategories;