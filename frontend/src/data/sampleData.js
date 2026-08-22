export const initialSampleResume = {
  title: "Software Engineer Resume",
  personalInfo: {
    name: "Muhammad Suhail",
    title: "Full Stack Developer",
    email: "muhammad.suhail@example.com",
    phone: "+91 98765 43210",
    location: "Bhopal, Madhya Pradesh",
    website: "https://muhammadsuhail.dev",
    linkedin: "https://linkedin.com/in/muhammad-suhail",
    github: "https://github.com/muhammad-suhail",
    photo: ""
  },
  summary: "Motivated Computer Science graduate with hands-on experience building modern, scalable web applications using React.js, Node.js, Express, and MongoDB. Passionate about clean code, UI/UX design excellence, and developing responsive SaaS products.",
  education: [
    {
      id: "edu_1",
      degree: "B.Tech in Computer Science & Engineering",
      institution: "AKS University",
      location: "Satna, MP",
      startDate: "2022",
      endDate: "2026",
      description: "CGPA: 8.8/10. Relevant Coursework: Data Structures & Algorithms, Web Engineering, Database Systems, Software Engineering."
    }
  ],
  skills: [
    "React.js",
    "JavaScript (ES6+)",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "RESTful APIs",
    "Git & GitHub",
    "HTML5 / CSS3",
    "Postman"
  ],
  experience: [
    {
      id: "exp_1",
      company: "TechNova Solutions",
      role: "Frontend Developer Intern",
      location: "Remote",
      startDate: "Jan 2026",
      endDate: "Present",
      currentlyWorking: true,
      description: "• Developed modular React components using Tailwind CSS, boosting render speed by 25%.\n• Integrated REST APIs for user profile dashboards and real-time data sync.\n• Collaboration with UI/UX designers to implement pixel-perfect responsive layouts."
    }
  ],
  projects: [
    {
      id: "proj_1",
      name: "Library Management System",
      technologies: ["React.js", "Node.js", "MongoDB", "Express"],
      description: "Architected a full-stack digital book catalogue and circulation system. Enabled book reservations, user fine tracking, and admin catalog management.",
      url: "https://library-demo.example.com",
      github: "https://github.com/muhammad-suhail/library-system"
    },
    {
      id: "proj_2",
      name: "Smart ResumeCraft SaaS",
      technologies: ["Vite", "React", "Tailwind CSS", "PDF Engine"],
      description: "Built an interactive resume creation platform with live A4 preview, dynamic PDF download, public URL sharing, and multi-template engine.",
      url: "https://resumecraft.example.com",
      github: "https://github.com/muhammad-suhail/resume-builder"
    }
  ],
  achievements: [
    "Finalist at National University Hackathon 2025 (Top 5 out of 120 teams)",
    "Solved 250+ DSA problems across LeetCode and HackerRank",
    "Active Open Source Contributor with 50+ GitHub commits"
  ],
  certifications: [
    {
      id: "cert_1",
      name: "Meta Front-End Developer Specialization",
      organization: "Coursera",
      date: "2025",
      url: "https://coursera.org/verify/example"
    },
    {
      id: "cert_2",
      name: "JavaScript Algorithms & Data Structures",
      organization: "freeCodeCamp",
      date: "2024",
      url: "https://freecodecamp.org/certification/example"
    }
  ],
  template: "modern",
  accentColor: "#2563EB",
  isPublic: false
};
