import { CareerGapResult, ResumeData, RoadmapPhase } from './types';
import { extractSkillsFromResume } from './jobMatcher';

export interface RoleBenchmark {
  roleName: string;
  coreSkills: string[];
  niceToHaveSkills: string[];
  roadmap: RoadmapPhase[];
}

export const CAREER_BENCHMARKS: Record<string, RoleBenchmark> = {
  'frontend-developer': {
    roleName: 'Frontend Developer',
    coreSkills: [
      'HTML5', 'CSS3', 'JavaScript (ES6+)', 'TypeScript', 'React.js', 'Next.js',
      'Tailwind CSS', 'Responsive Design', 'Git & GitHub', 'RESTful APIs', 'Web Performance'
    ],
    niceToHaveSkills: ['GraphQL', 'Jest', 'Cypress', 'Figma', 'Redux / Zustand', 'CI/CD Basics'],
    roadmap: [
      {
        phase: 'Phase 1: Foundations & Modern JavaScript',
        duration: 'Weeks 1 - 4',
        focus: 'Master modern ES6+, DOM manipulation, CSS Grid/Flexbox, and TypeScript essentials.',
        topics: ['Closures, Promises, Async/Await', 'Semantic HTML5 & Accessibility (a11y)', 'TypeScript Interfaces, Types, Generics', 'Tailwind CSS utility-first workflows'],
        suggestedProjects: ['Interactive Responsive Dashboard', 'Product Catalog with dynamic filtering & sorting'],
        recommendedResources: [
          { name: 'JavaScript.info', type: 'Documentation', url: 'https://javascript.info' },
          { name: 'TypeScript Handbook', type: 'Official Guide', url: 'https://www.typescriptlang.org/docs/' },
          { name: 'Tailwind CSS Docs', type: 'Docs', url: 'https://tailwindcss.com' },
        ],
      },
      {
        phase: 'Phase 2: React Ecosystem & Next.js App Router',
        duration: 'Weeks 5 - 8',
        focus: 'Component architecture, state management, client vs server components, and API integration.',
        topics: ['React Hooks (useMemo, useCallback, custom hooks)', 'Next.js 14 App Router, Server Actions, SSR & SSG', 'Global State with Zustand or Context API', 'Form handling & Zod validation'],
        suggestedProjects: ['SaaS Landing Page with Authentication', 'Real-time collaborative Kanban / Trello clone'],
        recommendedResources: [
          { name: 'React Official Docs', type: 'Documentation', url: 'https://react.dev' },
          { name: 'Next.js Learn Course', type: 'Interactive Course', url: 'https://nextjs.org/learn' },
        ],
      },
      {
        phase: 'Phase 3: Testing, Performance & Portfolio Showcase',
        duration: 'Weeks 9 - 12',
        focus: 'Production readiness, Lighthouse performance optimization, testing, and interview prep.',
        topics: ['Unit testing with Jest & React Testing Library', 'Core Web Vitals & code splitting', 'End-to-End testing with Playwright', 'Deploying to Vercel with CI/CD'],
        suggestedProjects: ['Polished Personal Portfolio with dynamic project showcase & live demos', 'Open source contributions'],
        recommendedResources: [
          { name: 'web.dev by Google', type: 'Guides', url: 'https://web.dev' },
          { name: 'Testing Library Docs', type: 'Docs', url: 'https://testing-library.com' },
        ],
      },
    ],
  },
  'backend-developer': {
    roleName: 'Backend Developer',
    coreSkills: [
      'Node.js', 'Express.js', 'TypeScript', 'PostgreSQL', 'Prisma ORM',
      'RESTful APIs', 'JWT Authentication', 'Git & GitHub', 'Docker Basics', 'Database Modeling'
    ],
    niceToHaveSkills: ['Redis', 'Microservices', 'Kafka', 'GraphQL', 'AWS / Cloud Deployment', 'Unit Testing'],
    roadmap: [
      {
        phase: 'Phase 1: Backend Fundamentals & Database Modeling',
        duration: 'Weeks 1 - 4',
        focus: 'Asynchronous event-loop, HTTP protocol, relational database normalization, and SQL.',
        topics: ['Node.js Event Loop, Streams, Buffers', 'SQL queries, joins, indexes, foreign keys', 'PostgreSQL with Prisma ORM / pg client', 'Environment configuration & error handling'],
        suggestedProjects: ['CRUD REST API for an E-Commerce or Task Management System', 'Role-Based Authentication Engine with JWT & bcrypt'],
        recommendedResources: [
          { name: 'Node.js Official Documentation', type: 'Documentation', url: 'https://nodejs.org/docs/' },
          { name: 'Prisma Getting Started Guide', type: 'Guide', url: 'https://www.prisma.io/docs' },
        ],
      },
      {
        phase: 'Phase 2: Security, Architecture & Middleware',
        duration: 'Weeks 5 - 8',
        focus: 'Secure APIs, rate limiting, token refresh flows, caching, and background jobs.',
        topics: ['CORS, Helmet, Rate Limiting, SQL injection prevention', 'Redis caching for hot endpoints', 'File uploads and cloud storage (S3/Cloudinary)', 'Logging with Winston / Morgan'],
        suggestedProjects: ['Scalable Blog / Media API with Redis caching & S3 image uploads', 'Real-time WebSocket Chat Server'],
        recommendedResources: [
          { name: 'OWASP Backend Security Checklist', type: 'Security', url: 'https://owasp.org' },
          { name: 'Redis University', type: 'Free Course', url: 'https://university.redis.com' },
        ],
      },
      {
        phase: 'Phase 3: Containerization, Testing & Deployment',
        duration: 'Weeks 9 - 12',
        focus: 'Docker containerization, automated testing with Supertest, and production deployment.',
        topics: ['Dockerizing Node & PostgreSQL with docker-compose', 'Automated integration testing with Supertest and Jest', 'CI/CD pipeline with GitHub Actions', 'Deploying to Render / AWS / DigitalOcean'],
        suggestedProjects: ['Microservices-based payment or notification service with Docker containerization'],
        recommendedResources: [
          { name: 'Docker 101 Tutorial', type: 'Tutorial', url: 'https://www.docker.com/101-tutorial/' },
        ],
      },
    ],
  },
  'full-stack-developer': {
    roleName: 'Full-Stack Developer',
    coreSkills: [
      'React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js',
      'PostgreSQL', 'Tailwind CSS', 'Prisma ORM', 'RESTful APIs', 'Git & GitHub'
    ],
    niceToHaveSkills: ['Docker', 'Redis', 'AWS / Cloud', 'GraphQL', 'NextAuth / Auth.js', 'CI/CD'],
    roadmap: [
      {
        phase: 'Phase 1: Full-Stack Foundations & Modern TypeScript',
        duration: 'Weeks 1 - 4',
        focus: 'Connecting frontend clients to relational backend databases with end-to-end type safety.',
        topics: ['Advanced TypeScript across client and server', 'React 18 & state management', 'REST API design patterns', 'PostgreSQL database modeling & migrations'],
        suggestedProjects: ['End-to-End Note Taking App with user authentication & search'],
        recommendedResources: [
          { name: 'Full Stack Open (University of Helsinki)', type: 'Course', url: 'https://fullstackopen.com/en/' },
        ],
      },
      {
        phase: 'Phase 2: Next.js SaaS Architecture & Payments/Storage',
        duration: 'Weeks 5 - 8',
        focus: 'Production-ready SaaS architecture, Server Actions, ORM optimizations, and user authorization.',
        topics: ['Next.js App Router architecture', 'Prisma relational schema design', 'Role-based access control (RBAC)', 'Zod schema validation on both client and API boundaries'],
        suggestedProjects: ['CV Crafter / SaaS Web App with PDF Export, Live Preview & Public Share'],
        recommendedResources: [
          { name: 'Next.js Documentation', type: 'Documentation', url: 'https://nextjs.org/docs' },
        ],
      },
      {
        phase: 'Phase 3: Deployment, DevOps & Interview Preparation',
        duration: 'Weeks 9 - 12',
        focus: 'Containerization, performance auditing, production deployment, and system design viva prep.',
        topics: ['Docker container orchestration', 'Lighthouse optimization and SEO best practices', 'System Design fundamentals (Load balancers, Caching, Sharding)', 'BCA / College Technical Viva Questions'],
        suggestedProjects: ['Full-stack enterprise project live on Vercel/Render with custom domain and public portfolio'],
        recommendedResources: [
          { name: 'Roadmap.sh Full Stack Guide', type: 'Roadmap', url: 'https://roadmap.sh/full-stack' },
        ],
      },
    ],
  },
  'python-developer': {
    roleName: 'Python Developer',
    coreSkills: [
      'Python 3', 'FastAPI / Django', 'PostgreSQL / SQLite', 'Object-Oriented Programming (OOP)',
      'Data Structures & Algorithms', 'Git & GitHub', 'RESTful APIs', 'Virtual Environments'
    ],
    niceToHaveSkills: ['Docker', 'Pandas', 'Celery', 'Redis', 'Unit Testing (pytest)', 'Asyncio'],
    roadmap: [
      {
        phase: 'Phase 1: Python Core & Data Structures',
        duration: 'Weeks 1 - 4',
        focus: 'Deep dive into Python syntax, generators, decorators, OOP, and data structures.',
        topics: ['Python Data Structures (Lists, Dicts, Sets, Tuples)', 'Decorators, Context Managers, Dunder methods', 'Type Hinting & Pydantic models', 'Virtual environments & pip/poetry management'],
        suggestedProjects: ['CLI File Organizer & Metadata Extractor', 'Algorithm Visualizer or Web Scraper using BeautifulSoup'],
        recommendedResources: [
          { name: 'Real Python Tutorials', type: 'Tutorials', url: 'https://realpython.com' },
        ],
      },
      {
        phase: 'Phase 2: Modern Web APIs with FastAPI & ORM',
        duration: 'Weeks 5 - 8',
        focus: 'Building asynchronous, self-documenting REST APIs with FastAPI and SQLAlchemy / SQLModel.',
        topics: ['FastAPI Routing, Dependency Injection', 'Pydantic v2 schemas and validation', 'SQLAlchemy / Alembic database migrations', 'JWT authentication and password hashing'],
        suggestedProjects: ['Full-featured FastAPI REST API with Swagger documentation and JWT Auth'],
        recommendedResources: [
          { name: 'FastAPI Official Documentation', type: 'Documentation', url: 'https://fastapi.tiangolo.com' },
        ],
      },
      {
        phase: 'Phase 3: Asynchronous Tasks, Testing & Deployment',
        duration: 'Weeks 9 - 12',
        focus: 'Asynchronous workers with Celery/Redis, pytest test suites, and Docker containerization.',
        topics: ['Background job queues with Celery & Redis', 'Pytest unit and integration test suites', 'Dockerizing Python web applications', 'Deploying to cloud hosting (Fly.io / Render / AWS)'],
        suggestedProjects: ['Asynchronous Video / Document Processing API with task status monitoring'],
        recommendedResources: [
          { name: 'TestDriven.io Guides', type: 'Guides', url: 'https://testdriven.io' },
        ],
      },
    ],
  },
  'data-analyst': {
    roleName: 'Data Analyst',
    coreSkills: [
      'SQL (Queries, Joins, Aggregations)', 'Python', 'Pandas & NumPy',
      'Data Visualization (Matplotlib, Seaborn)', 'Excel / Spreadsheets', 'Statistics Basics', 'Data Cleaning'
    ],
    niceToHaveSkills: ['Power BI / Tableau', 'PostgreSQL', 'Git', 'Jupyter Notebooks', 'Exploratory Data Analysis (EDA)'],
    roadmap: [
      {
        phase: 'Phase 1: Advanced SQL & Data Extraction',
        duration: 'Weeks 1 - 4',
        focus: 'Mastering relational databases, complex analytical queries, and window functions.',
        topics: ['SELECT, GROUP BY, HAVING, subqueries', 'Window Functions (RANK, DENSE_RANK, ROW_NUMBER)', 'CTE (Common Table Expressions) and stored procedures', 'Relational data modeling for analytics'],
        suggestedProjects: ['E-Commerce Sales Performance SQL Analysis', 'Customer Retention & Cohort Analysis'],
        recommendedResources: [
          { name: 'Mode Analytics SQL Tutorial', type: 'Tutorial', url: 'https://mode.com/sql-tutorial/' },
        ],
      },
      {
        phase: 'Phase 2: Python for Data Analysis (Pandas & Visualization)',
        duration: 'Weeks 5 - 8',
        focus: 'Handling messy datasets, feature engineering, and high-impact visual storytelling.',
        topics: ['Pandas DataFrames, Series, merging, pivoting', 'Data cleaning: missing values, outliers, data types', 'Data visualization with Matplotlib and Seaborn', 'Exploratory Data Analysis (EDA) methodology'],
        suggestedProjects: ['Global Tech Salary & Job Trends Analysis', 'Healthcare / Covid-19 Dataset Exploration Notebook'],
        recommendedResources: [
          { name: 'Kaggle Learn Data Courses', type: 'Hands-on Course', url: 'https://www.kaggle.com/learn' },
        ],
      },
      {
        phase: 'Phase 3: Business Intelligence & Dashboard Presentation',
        duration: 'Weeks 9 - 12',
        focus: 'Interactive dashboards in Power BI or Streamlit, business metrics, and portfolio presentation.',
        topics: ['Building interactive dashboards (Power BI / Streamlit)', 'KPI formulation (CAC, LTV, Churn, Conversion Rate)', 'Statistical Hypothesis Testing (A/B testing basics)', 'Publishing GitHub portfolio notebooks with executive summaries'],
        suggestedProjects: ['Interactive Executive KPI Dashboard deployed online'],
        recommendedResources: [
          { name: 'DataCamp Tutorials', type: 'Tutorials', url: 'https://www.datacamp.com' },
        ],
      },
    ],
  },
};

export function analyzeCareerGap(resume: ResumeData, targetRoleKey: string): CareerGapResult {
  const benchmark = CAREER_BENCHMARKS[targetRoleKey] || CAREER_BENCHMARKS['full-stack-developer'];
  const userSkills = extractSkillsFromResume(resume);
  const userSkillsLower = userSkills.map((s) => s.toLowerCase());

  const acquiredSkills: string[] = [];
  const missingSkills: string[] = [];

  benchmark.coreSkills.forEach((skill) => {
    const isFound = userSkillsLower.some(
      (uSkill) =>
        uSkill === skill.toLowerCase() ||
        uSkill.includes(skill.toLowerCase()) ||
        skill.toLowerCase().includes(uSkill)
    );
    if (isFound) {
      acquiredSkills.push(skill);
    } else {
      missingSkills.push(skill);
    }
  });

  const coreTotal = benchmark.coreSkills.length;
  const rawRatio = acquiredSkills.length / (coreTotal > 0 ? coreTotal : 1);
  const readinessScore = Math.min(100, Math.max(20, Math.round(rawRatio * 100)));

  const strengths: string[] = [];
  if (acquiredSkills.length > 0) {
    strengths.push(`Solid foundation in ${acquiredSkills.slice(0, 4).join(', ')}.`);
  }
  if (resume.projects && resume.projects.length > 0) {
    strengths.push(`Demonstrated hands-on experience with ${resume.projects.length} real-world project(s).`);
  }
  if (resume.education && resume.education.length > 0) {
    strengths.push(`Formal academic background in ${resume.education[0]?.degree || 'Computer Applications'}.`);
  }

  return {
    roleName: benchmark.roleName,
    readinessScore,
    acquiredSkills,
    missingSkills,
    strengths,
    roadmap: benchmark.roadmap,
  };
}
