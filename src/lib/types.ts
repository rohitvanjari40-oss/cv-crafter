export interface PersonalDetails {
  fullName: string;
  jobTitle: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  portfolio: string;
  github: string;
  photoUrl?: string;
}

export interface EducationItem {
  id: string;
  degree: string;
  institution: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  grade?: string; // CGPA / Percentage
  description?: string;
}

export interface ExperienceItem {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string;
  endDate: string;
  current?: boolean;
  responsibilities: string[];
}

export interface SkillCategory {
  id: string;
  name: string; // e.g., "Frontend", "Backend", "Tools", "Soft Skills"
  skills: string[];
}

export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
}

export interface CertificationItem {
  id: string;
  name: string;
  issuer: string;
  date: string;
  url?: string;
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  date?: string;
}

export interface LanguageItem {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Intermediate' | 'Basic';
}

export interface CustomSectionItem {
  id: string;
  title: string;
  subtitle?: string;
  date?: string;
  description?: string;
}

export interface CustomSection {
  id: string;
  heading: string;
  items: CustomSectionItem[];
}

export interface ResumeSettings {
  accentColor: string;
  fontSize: 'small' | 'medium' | 'large';
  fontFamily: 'inter' | 'roboto' | 'merriweather' | 'playfair';
  lineSpacing: 'compact' | 'normal' | 'relaxed';
}

export interface ResumeData {
  personal: PersonalDetails;
  summary: string;
  education: EducationItem[];
  experience: ExperienceItem[];
  skills: SkillCategory[];
  projects: ProjectItem[];
  certifications: CertificationItem[];
  achievements: AchievementItem[];
  languages: LanguageItem[];
  customSections: CustomSection[];
  settings?: ResumeSettings;
}

export interface UserSession {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'ADMIN';
}

export interface ResumeRecord {
  id: string;
  userId: string;
  title: string;
  templateId: 'modern' | 'minimal' | 'creative' | 'student';
  isPublic: boolean;
  slug?: string | null;
  targetRole?: string | null;
  resumeData: ResumeData;
  createdAt: string;
  updatedAt: string;
}

export interface JobMatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  matchLevel: 'Low' | 'Moderate' | 'High' | 'Strong';
  suggestions: string[];
  atsAdvice: string[];
}

export interface RoadmapPhase {
  phase: string;
  duration: string;
  focus: string;
  topics: string[];
  suggestedProjects: string[];
  recommendedResources: { name: string; type: string; url: string }[];
}

export interface CareerGapResult {
  roleName: string;
  readinessScore: number;
  acquiredSkills: string[];
  missingSkills: string[];
  strengths: string[];
  roadmap: RoadmapPhase[];
}
