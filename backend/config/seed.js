import User from '../models/User.js';
import Resume from '../models/Resume.js';

export const seedDatabase = async () => {
  try {
    const demoEmail = 'muhammad.suhail@example.com';
    let user = await User.findOne({ email: demoEmail });

    if (!user) {
      user = await User.create({
        name: 'Muhammad Suhail',
        email: demoEmail,
        password: 'password123'
      });
      console.log('Demo user seeded: muhammad.suhail@example.com / password123');
    }

    const existingResume = await Resume.findOne({ userId: user._id });
    if (!existingResume) {
      await Resume.create({
        userId: user._id,
        title: 'Muhammad Suhail - Software Developer',
        personalInfo: {
          name: 'Muhammad Suhail',
          title: 'Full Stack Developer',
          email: 'muhammad.suhail@example.com',
          phone: '+91 98765 43210',
          location: 'Bhopal, Madhya Pradesh',
          website: 'https://muhammadsuhail.dev',
          linkedin: 'https://linkedin.com/in/muhammad-suhail',
          github: 'https://github.com/muhammad-suhail'
        },
        summary: 'Motivated Computer Science graduate with hands-on experience building modern, scalable web applications using React.js, Node.js, Express, and MongoDB. Passionate about clean code, UI/UX design excellence, and developing responsive SaaS products.',
        education: [
          {
            degree: 'B.Tech in Computer Science & Engineering',
            institution: 'AKS University',
            location: 'Satna, MP',
            startDate: '2022',
            endDate: '2026',
            description: 'CGPA: 8.8/10. Specialization in Web Technologies & Software Systems.'
          }
        ],
        skills: [
          'React.js', 'JavaScript', 'Node.js', 'Express.js', 'MongoDB',
          'Tailwind CSS', 'RESTful APIs', 'Git & GitHub', 'HTML5/CSS3'
        ],
        experience: [
          {
            company: 'TechNova Solutions',
            role: 'Frontend Developer Intern',
            location: 'Remote',
            startDate: 'Jan 2026',
            endDate: 'Present',
            currentlyWorking: true,
            description: '• Developed modular React components using Tailwind CSS.\n• Integrated REST APIs for user profile dashboards and real-time data sync.\n• Improved mobile UI responsiveness.'
          }
        ],
        projects: [
          {
            name: 'Library Management System',
            technologies: ['React.js', 'Node.js', 'MongoDB'],
            description: 'Architected a full-stack digital book catalogue and circulation system.',
            url: 'https://library-demo.example.com',
            github: 'https://github.com/muhammad-suhail/library-system'
          }
        ],
        achievements: [
          'Finalist at National University Hackathon 2025 (Top 5 out of 120 teams)'
        ],
        certifications: [
          {
            name: 'Meta Front-End Developer Specialization',
            organization: 'Coursera',
            date: '2025'
          }
        ],
        template: 'modern',
        accentColor: '#2563EB',
        isPublic: true
      });
      console.log('Demo resume seeded for Muhammad Suhail');
    }
  } catch (err) {
    console.error('Seed Database Error:', err.message);
  }
};
