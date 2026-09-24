import { ResumeData } from './types';

export const defaultEmptyResume: ResumeData = {
  personal: {
    fullName: '',
    jobTitle: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    portfolio: '',
    github: '',
    photoUrl: '',
  },
  summary: '',
  education: [],
  experience: [],
  skills: [
    { id: 'skills-tech', name: 'Technical Skills', skills: [] },
    { id: 'skills-soft', name: 'Soft Skills', skills: [] },
  ],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  customSections: [],
  settings: {
    accentColor: '#2563eb',
    fontSize: 'medium',
    fontFamily: 'inter',
    lineSpacing: 'normal',
  },
};

export const sampleStudentResume: ResumeData = {
  personal: {
    fullName: 'Rohit Sharma',
    jobTitle: 'Aspiring Full-Stack Developer & BCA Graduate',
    email: 'rohit.sharma@example.com',
    phone: '+91 98765 43210',
    location: 'Bangalore, India',
    linkedin: 'linkedin.com/in/rohit-sharma-dev',
    portfolio: 'rohitsharma.dev',
    github: 'github.com/rohitsharma-dev',
    photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80',
  },
  summary:
    'Dedicated and detail-oriented BCA graduate (2026) with strong foundations in React.js, Next.js, Node.js, and relational database systems. Passionate about engineering clean, responsive web applications and solving real-world challenges through full-stack architecture. Winner of university hackathon with proven teamwork and problem-solving skills.',
  education: [
    {
      id: 'edu-1',
      degree: 'Bachelor of Computer Applications (BCA)',
      institution: 'Apex Institute of Technology & Management',
      location: 'Bangalore, India',
      startDate: '2023',
      endDate: '2026',
      current: true,
      grade: '8.8 CGPA',
      description: 'Core Coursework: Data Structures & Algorithms, Database Management Systems (DBMS), Web Development, Object-Oriented Programming (Java/C++), Software Engineering.',
    },
    {
      id: 'edu-2',
      degree: 'Higher Secondary School Certificate (Class XII)',
      institution: 'Kendriya Vidyalaya',
      location: 'Bangalore, India',
      startDate: '2021',
      endDate: '2023',
      current: false,
      grade: '91.4%',
      description: 'Science Stream (Physics, Chemistry, Mathematics, Computer Science).',
    },
  ],
  experience: [
    {
      id: 'exp-1',
      position: 'Full-Stack Web Intern',
      company: 'TechNovate Labs',
      location: 'Bangalore (Hybrid)',
      startDate: 'May 2025',
      endDate: 'Aug 2025',
      current: false,
      responsibilities: [
        'Developed interactive dashboard components using React, Tailwind CSS, and REST APIs, improving user engagement by 22%.',
        'Engineered CRUD endpoints using Node.js, Express, and PostgreSQL for customer management modules.',
        'Collaborated in Agile sprints, participated in weekly code reviews, and reduced client-side load times by optimizing images and lazy loading.',
      ],
    },
  ],
  skills: [
    {
      id: 'skills-web',
      name: 'Web & Programming',
      skills: ['JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js', 'HTML5', 'CSS3/Tailwind', 'Node.js', 'Express.js', 'C++', 'Python'],
    },
    {
      id: 'skills-db',
      name: 'Databases & Tools',
      skills: ['PostgreSQL', 'Prisma ORM', 'MongoDB', 'Git & GitHub', 'Postman', 'Docker Basics', 'Vercel'],
    },
    {
      id: 'skills-soft',
      name: 'Soft Skills',
      skills: ['Problem Solving', 'Agile Collaboration', 'Technical Documentation', 'Rapid Prototyping', 'Continuous Learning'],
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'CV Crafter — AI-Powered Professional Resume Builder',
      description:
        'Engineered a complete full-stack SaaS platform featuring live resume preview across 4 templates, job description matching engine, career gap analyzer, and QR-enabled public portfolio generation.',
      technologies: ['Next.js 14', 'TypeScript', 'Tailwind CSS', 'Prisma', 'PostgreSQL', 'Google Gemini AI'],
      liveUrl: 'https://cvcrafter-demo.vercel.app',
      githubUrl: 'https://github.com/rohitsharma-dev/cv-crafter',
    },
    {
      id: 'proj-2',
      title: 'Smart Campus Event Management Portal',
      description:
        'Built a university portal for student club registration, automated QR attendance, and event ticketing with email notifications.',
      technologies: ['React.js', 'Node.js', 'Express', 'MongoDB', 'JWT Auth'],
      liveUrl: 'https://smartcampus.demo.com',
      githubUrl: 'https://github.com/rohitsharma-dev/smart-campus',
    },
  ],
  certifications: [
    {
      id: 'cert-1',
      name: 'Meta Front-End Developer Professional Certificate',
      issuer: 'Meta via Coursera',
      date: 'Dec 2024',
      url: 'https://coursera.org/verify/professional-cert',
    },
    {
      id: 'cert-2',
      name: 'PostgreSQL Database Administration & Design',
      issuer: 'Udemy',
      date: 'Aug 2024',
      url: 'https://udemy.com/certificate/pg-db',
    },
  ],
  achievements: [
    {
      id: 'ach-1',
      title: '1st Place — Inter-College Hackathon 2025',
      description: 'Led a team of 4 to design and pitch an AI-assisted automated exam proctoring solution within 36 hours.',
      date: 'March 2025',
    },
    {
      id: 'ach-2',
      title: 'Dean’s Honor List for Academic Excellence',
      description: 'Recognized for maintaining top 5% GPA across consecutive semesters.',
      date: '2024 - 2025',
    },
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Fluent' },
    { id: 'lang-2', name: 'Hindi', proficiency: 'Native' },
  ],
  customSections: [
    {
      id: 'cust-1',
      heading: 'Co-Curricular & Leadership',
      items: [
        {
          id: 'cust-item-1',
          title: 'Technical Lead — Computer Science Student Association',
          subtitle: 'Apex Institute',
          date: '2024 - 2025',
          description: 'Organized 5 hands-on workshops on Git/GitHub and Web Development for over 150+ junior students.',
        },
      ],
    },
  ],
  settings: {
    accentColor: '#2563eb',
    fontSize: 'medium',
    fontFamily: 'inter',
    lineSpacing: 'normal',
  },
};

export const sampleEngineerResume: ResumeData = {
  personal: {
    fullName: 'Priya Patel',
    jobTitle: 'Senior Full-Stack Software Engineer',
    email: 'priya.patel.dev@example.com',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA (Open to Remote)',
    linkedin: 'linkedin.com/in/priya-patel-swe',
    portfolio: 'priyapatel.tech',
    github: 'github.com/priyapatel',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&auto=format&fit=crop&q=80',
  },
  summary:
    'Results-driven Senior Full-Stack Engineer with 5+ years of experience architecting high-throughput microservices, scalable React/Next.js interfaces, and distributed cloud applications. Proven track record reducing infrastructure costs by 35% and mentoring junior engineers in engineering excellence.',
  education: [
    {
      id: 'edu-eng-1',
      degree: 'B.S. in Computer Science & Engineering',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2017',
      endDate: '2021',
      current: false,
      grade: '3.9 GPA (Magna Cum Laude)',
      description: 'Focus in Distributed Systems, Cloud Architecture, and Database Internals.',
    },
  ],
  experience: [
    {
      id: 'exp-eng-1',
      position: 'Senior Software Engineer',
      company: 'CloudScale Dynamics',
      location: 'San Francisco, CA',
      startDate: '2023',
      endDate: 'Present',
      current: true,
      responsibilities: [
        'Architected and led the development of a real-time collaborative workspace used by 45,000+ enterprise teams.',
        'Engineered event-driven microservices using Node.js, Kafka, and Redis, decreasing API response latency by 48%.',
        'Spearheaded migration from legacy monolith to Next.js with Prisma & PostgreSQL, achieving a 99.98% uptime SLA.',
      ],
    },
    {
      id: 'exp-eng-2',
      position: 'Full-Stack Software Engineer',
      company: 'AcroPulse Technologies',
      location: 'Sunnyvale, CA',
      startDate: '2021',
      endDate: '2023',
      current: false,
      responsibilities: [
        'Designed intuitive customer analytics dashboards with React, TypeScript, and D3.js visual charts.',
        'Built automated CI/CD pipelines using GitHub Actions and Docker, reducing deployment cycle times from 4 hours to 12 minutes.',
        'Authored comprehensive unit and end-to-end test suites reaching 92% code coverage.',
      ],
    },
  ],
  skills: [
    {
      id: 'skills-eng-core',
      name: 'Languages & Frameworks',
      skills: ['TypeScript', 'JavaScript', 'React', 'Next.js', 'Node.js', 'Express', 'Python', 'Go', 'GraphQL'],
    },
    {
      id: 'skills-eng-infra',
      name: 'Cloud & DevOps',
      skills: ['Docker', 'Kubernetes', 'AWS (ECS, S3, RDS)', 'PostgreSQL', 'Redis', 'Kafka', 'Terraform', 'CI/CD'],
    },
  ],
  projects: [
    {
      id: 'proj-eng-1',
      title: 'HyperLog: Distributed Tracing & Telemetry Engine',
      description: 'Open-source distributed logging library designed to capture and index JSON log streams at 100k events/sec.',
      technologies: ['Go', 'ClickHouse', 'React', 'Docker'],
      liveUrl: 'https://hyperlog-telemetry.io',
      githubUrl: 'https://github.com/priyapatel/hyperlog',
    },
  ],
  certifications: [
    {
      id: 'cert-eng-1',
      name: 'AWS Certified Solutions Architect – Associate',
      issuer: 'Amazon Web Services',
      date: '2023',
      url: 'https://aws.amazon.com/verification',
    },
  ],
  achievements: [
    {
      id: 'ach-eng-1',
      title: 'Company Engineering Excellence Award',
      description: 'Awarded for zero-downtime database migration of 12M+ records.',
      date: 'Q3 2024',
    },
  ],
  languages: [
    { id: 'lang-eng-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-eng-2', name: 'Spanish', proficiency: 'Intermediate' },
  ],
  customSections: [],
  settings: {
    accentColor: '#0f766e',
    fontSize: 'medium',
    fontFamily: 'roboto',
    lineSpacing: 'normal',
  },
};

export const TEMPLATES_CONFIG = [
  {
    id: 'modern',
    name: 'Modern Professional',
    description: 'Clean two-column layout with sleek sidebar for skills, contact details, and education. Perfect for tech & business roles.',
    badge: 'Popular',
    accentDefault: '#2563eb',
  },
  {
    id: 'minimal',
    name: 'Minimal ATS-Friendly',
    description: 'Single-column streamlined typography optimized for Application Tracking Systems (ATS) and corporate hiring.',
    badge: 'ATS-Proof',
    accentDefault: '#0f172a',
  },
  {
    id: 'creative',
    name: 'Creative Portfolio',
    description: 'Vibrant modern header, visual tag badges, and timeline accents. Ideal for designers, developers, and product managers.',
    badge: 'Creative',
    accentDefault: '#7c3aed',
  },
  {
    id: 'student',
    name: 'Student / Fresher Resume',
    description: 'Designed specifically for BCA, B.Tech, and college freshers prioritizing Education, Academic Projects, and Hackathons.',
    badge: 'College Special',
    accentDefault: '#0284c7',
  },
];
