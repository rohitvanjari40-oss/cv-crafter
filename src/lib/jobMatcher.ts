import { ResumeData, JobMatchResult } from './types';

// Standard comprehensive tech and domain skill vocabulary for matching
const TECH_KEYWORDS = [
  'javascript', 'typescript', 'react', 'react.js', 'next.js', 'vue', 'vue.js', 'angular',
  'node.js', 'node', 'express', 'express.js', 'nest.js', 'python', 'django', 'fastapi',
  'java', 'spring', 'spring boot', 'c++', 'c#', '.net', 'golang', 'go', 'php', 'laravel',
  'html', 'html5', 'css', 'css3', 'tailwind', 'tailwind css', 'bootstrap', 'sass',
  'postgresql', 'postgres', 'mysql', 'sqlite', 'mongodb', 'redis', 'prisma', 'typeorm',
  'rest', 'restful api', 'graphql', 'grpc', 'microservices', 'websocket',
  'git', 'github', 'gitlab', 'docker', 'kubernetes', 'aws', 'amazon web services', 'azure',
  'gcp', 'google cloud', 'ci/cd', 'github actions', 'jenkins', 'linux', 'bash',
  'unit testing', 'jest', 'cypress', 'playwright', 'tdd',
  'agile', 'scrum', 'jira', 'figma', 'responsive design', 'web performance', 'seo',
  'machine learning', 'data structures', 'algorithms', 'system design', 'problem solving'
];

export function extractSkillsFromText(text: string): string[] {
  const normalized = text.toLowerCase();
  const matched = new Set<string>();

  for (const keyword of TECH_KEYWORDS) {
    // Exact word or boundary match
    const regex = new RegExp(`\\b${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i');
    if (regex.test(normalized)) {
      // Capitalize nicely
      matched.add(formatSkillName(keyword));
    }
  }

  return Array.from(matched);
}

function formatSkillName(kw: string): string {
  const map: Record<string, string> = {
    'react': 'React.js',
    'react.js': 'React.js',
    'next.js': 'Next.js',
    'node.js': 'Node.js',
    'node': 'Node.js',
    'express.js': 'Express.js',
    'express': 'Express.js',
    'typescript': 'TypeScript',
    'javascript': 'JavaScript',
    'postgresql': 'PostgreSQL',
    'postgres': 'PostgreSQL',
    'mongodb': 'MongoDB',
    'tailwind': 'Tailwind CSS',
    'tailwind css': 'Tailwind CSS',
    'html': 'HTML5',
    'html5': 'HTML5',
    'css': 'CSS3',
    'css3': 'CSS3',
    'aws': 'AWS',
    'ci/cd': 'CI/CD',
    'rest': 'RESTful APIs',
    'restful api': 'RESTful APIs',
    'prisma': 'Prisma ORM',
  };
  return map[kw.toLowerCase()] || kw.charAt(0).toUpperCase() + kw.slice(1);
}

export function extractSkillsFromResume(resume: ResumeData): string[] {
  const skills = new Set<string>();

  // From skills section
  resume.skills?.forEach((cat) => {
    cat.skills?.forEach((s) => {
      if (s.trim()) skills.add(s.trim());
    });
  });

  // From projects technologies
  resume.projects?.forEach((proj) => {
    proj.technologies?.forEach((tech) => {
      if (tech.trim()) skills.add(tech.trim());
    });
  });

  // From summary and experience descriptions
  const corpus = [
    resume.summary || '',
    ...resume.experience.flatMap((e) => e.responsibilities || []),
    ...resume.education.map((ed) => ed.description || ''),
  ].join(' ');

  const textSkills = extractSkillsFromText(corpus);
  textSkills.forEach((s) => skills.add(s));

  return Array.from(skills);
}

export function analyzeJobMatch(resume: ResumeData, jobDescription: string): JobMatchResult {
  const jdSkills = extractSkillsFromText(jobDescription);
  const resumeSkills = extractSkillsFromResume(resume);

  const resumeSkillsLower = resumeSkills.map((s) => s.toLowerCase());

  const matchedSkills: string[] = [];
  const missingSkills: string[] = [];

  jdSkills.forEach((jdSkill) => {
    const isFound = resumeSkillsLower.some(
      (rSkill) =>
        rSkill === jdSkill.toLowerCase() ||
        rSkill.includes(jdSkill.toLowerCase()) ||
        jdSkill.toLowerCase().includes(rSkill)
    );
    if (isFound) {
      matchedSkills.push(jdSkill);
    } else {
      missingSkills.push(jdSkill);
    }
  });

  const totalEvaluated = jdSkills.length > 0 ? jdSkills.length : 1;
  const matchRatio = matchedSkills.length / totalEvaluated;
  const matchScore = Math.min(100, Math.max(15, Math.round(matchRatio * 100)));

  let matchLevel: JobMatchResult['matchLevel'] = 'Low';
  if (matchScore >= 80) matchLevel = 'Strong';
  else if (matchScore >= 60) matchLevel = 'High';
  else if (matchScore >= 40) matchLevel = 'Moderate';

  const suggestions: string[] = [];
  if (missingSkills.length > 0) {
    suggestions.push(
      `Consider adding these high-priority keywords from the JD into your skills or projects: ${missingSkills.slice(0, 5).join(', ')}.`
    );
  }
  if (matchedSkills.length < 3) {
    suggestions.push('Tailor your professional summary to explicitly state alignment with the core responsibilities in this job posting.');
  }
  suggestions.push('Incorporate quantified impact metrics (e.g. % performance increase, team size, users served) in your experience bullet points.');
  suggestions.push('Ensure your job title on the resume closely mirrors or compliments the job title in the target job posting.');

  const atsAdvice: string[] = [
    'Use standard section headings (Experience, Education, Skills) to ensure parsing fidelity in ATS systems like Workday, Greenhouse, and Lever.',
    'Avoid placing vital contact info in complex graphical headers or canvas elements.',
    'Ensure all dates follow standard formats (e.g. Month Year or Year - Year) without missing end dates.',
  ];

  return {
    matchScore,
    matchedSkills,
    missingSkills,
    matchLevel,
    suggestions,
    atsAdvice,
  };
}
