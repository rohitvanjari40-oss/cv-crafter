import { GoogleGenAI } from '@google/genai';

/**
 * Result structure returned by summary generation
 */
export interface SummaryGenerationResult {
  summary: string;
  source: 'gemini' | 'template';
  isAi: boolean;
  modelUsed?: string;
  notice?: string;
  error?: string;
}

/**
 * Dynamically resolves the Gemini API client based on current process.env.
 * This avoids caching an empty client if .env is populated or changed at runtime.
 */
function getGeminiClient(): { client: GoogleGenAI | null; hasKey: boolean } {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey.trim() === '' || apiKey.trim() === 'your_gemini_api_key_here') {
    return { client: null, hasKey: false };
  }
  try {
    return { client: new GoogleGenAI({ apiKey: apiKey.trim() }), hasKey: true };
  } catch (err) {
    console.warn('Gemini client initialization failed:', err);
    return { client: null, hasKey: true };
  }
}

/**
 * Curated high-converting resume summaries for various career levels
 */
function getCuratedSummary(
  jobTitle: string,
  experienceLevel: 'student' | 'fresher' | 'mid' | 'senior',
  skillsStr: string
): string {
  if (experienceLevel === 'student' || experienceLevel === 'fresher') {
    return `Motivated and detail-oriented ${jobTitle || 'Computer Applications Graduate'}${skillsStr} with a strong academic foundation in software development, data structures, and modern web architectures. Demonstrated capability in building scalable, user-centric projects and working collaboratively in team-driven environments. Eager to contribute technical skills and rapid learning aptitude to a dynamic engineering team.`;
  } else if (experienceLevel === 'senior') {
    return `Accomplished ${jobTitle || 'Senior Software Engineer'} with extensive experience architecting high-performance distributed systems, leading engineering initiatives, and optimizing cloud infrastructure${skillsStr}. Proven track record of accelerating development cycles, mentoring high-performing teams, and translating complex business requirements into resilient technical solutions.`;
  } else {
    return `Results-oriented ${jobTitle || 'Full-Stack Software Engineer'} with hands-on experience developing responsive web applications, robust REST APIs, and scalable database schemas${skillsStr}. Adept at writing clean, maintainable code and solving complex technical challenges while adhering to modern industry best practices and Agile methodologies.`;
  }
}

/**
 * Generate a high-impact professional summary using Gemini API or curated fallback
 */
export async function generateProfessionalSummary(
  jobTitle: string,
  experienceLevel: 'student' | 'fresher' | 'mid' | 'senior' = 'fresher',
  keySkills: string[] = []
): Promise<SummaryGenerationResult> {
  const skillsStr = keySkills.length > 0 ? ` proficient in ${keySkills.slice(0, 5).join(', ')}` : '';
  const { client, hasKey } = getGeminiClient();

  // 1. If a valid API client exists, query Gemini using official models.generateContent
  if (client) {
    try {
      const prompt = `Write a concise, high-converting 3-4 sentence professional resume summary for a ${experienceLevel} ${jobTitle}${skillsStr}. Highlight problem-solving, technical aptitude, and enthusiasm for driving software excellence. Output only the summary paragraph without bullet points, markdown formatting, or conversational text.`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response && response.text && response.text.trim().length > 0) {
        return {
          summary: response.text.trim(),
          source: 'gemini',
          isAi: true,
          modelUsed: 'gemini-2.5-flash',
        };
      }
    } catch (err: any) {
      console.warn('Gemini API generateContent failed, falling back to curated template:', err?.message || err);
      const fallbackSummary = getCuratedSummary(jobTitle, experienceLevel, skillsStr);
      return {
        summary: fallbackSummary,
        source: 'template',
        isAi: false,
        notice: `Gemini API call failed (${err?.message || 'Check API key or quota'}). Using high-impact curated template.`,
        error: err?.message,
      };
    }
  }

  // 2. Local curated template fallback when GEMINI_API_KEY is not configured
  const fallbackSummary = getCuratedSummary(jobTitle, experienceLevel, skillsStr);
  return {
    summary: fallbackSummary,
    source: 'template',
    isAi: false,
    notice: hasKey
      ? 'Gemini client failed to initialize. Displaying curated industry template.'
      : 'GEMINI_API_KEY is not configured in .env. Displaying curated industry template. Add your free key to unlock live AI generation.',
  };
}

/**
 * Polish and enhance a resume bullet point using active action verbs and quantified impact
 */
export async function enhanceBulletPoint(originalBullet: string, role?: string): Promise<string> {
  if (!originalBullet || originalBullet.trim().length === 0) return '';
  const { client } = getGeminiClient();

  if (client) {
    try {
      const prompt = `Rewrite the following resume bullet point for a ${role || 'Software Engineer'} to make it more impactful, professional, and results-oriented. Use a strong action verb at the start and quantify results or business impact where logical. Return only the single enhanced bullet point without quotes:
"${originalBullet}"`;

      const response = await client.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      if (response && response.text) {
        return response.text.trim().replace(/^[-*•]\s*/, '');
      }
    } catch (err) {
      console.warn('Gemini API bullet enhance failed, falling back to rule engine:', err);
    }
  }

  // Smart algorithmic enhancement fallback
  let polished = originalBullet.trim().replace(/^[-*•]\s*/, '');
  const lower = polished.toLowerCase();

  if (lower.startsWith('worked on') || lower.startsWith('working on')) {
    polished = 'Engineered and deployed' + polished.substring(9);
  } else if (lower.startsWith('made') || lower.startsWith('did')) {
    polished = 'Architected and implemented' + polished.substring(4);
  } else if (lower.startsWith('helped') || lower.startsWith('assisted')) {
    polished = 'Collaborated with cross-functional teams to deliver' + polished.substring(6);
  } else if (lower.startsWith('responsible for')) {
    polished = 'Spearheaded end-to-end development of' + polished.substring(15);
  } else if (!/^[A-Z][a-z]+ed\b/.test(polished)) {
    polished = 'Successfully delivered ' + polished.charAt(0).toLowerCase() + polished.slice(1);
  }

  if (!polished.includes('%') && !polished.includes('performance') && !polished.includes('efficiency')) {
    polished += ', enhancing system reliability and user efficiency.';
  }

  return polished;
}

/**
 * Suggest industry-relevant skills for a given job title
 */
export async function suggestSkillsForRole(roleTitle: string): Promise<string[]> {
  const norm = roleTitle.toLowerCase();

  if (norm.includes('front')) {
    return ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'JavaScript (ES6+)', 'Redux Toolkit', 'HTML5/CSS3', 'RESTful APIs', 'Jest', 'Git'];
  }
  if (norm.includes('back')) {
    return ['Node.js', 'Express.js', 'PostgreSQL', 'Prisma ORM', 'TypeScript', 'RESTful APIs', 'Redis', 'Docker', 'JWT Auth', 'MongoDB'];
  }
  if (norm.includes('python')) {
    return ['Python 3', 'FastAPI', 'Django', 'PostgreSQL', 'Docker', 'Pandas', 'NumPy', 'Git & GitHub', 'REST APIs', 'Pytest'];
  }
  if (norm.includes('data') || norm.includes('analyst')) {
    return ['SQL', 'Python', 'Pandas', 'Data Visualization', 'Power BI', 'Excel', 'PostgreSQL', 'Statistics', 'Tableau', 'EDA'];
  }
  return ['TypeScript', 'React.js', 'Next.js', 'Node.js', 'Express.js', 'PostgreSQL', 'Prisma', 'Tailwind CSS', 'Docker', 'Git & GitHub'];
}
