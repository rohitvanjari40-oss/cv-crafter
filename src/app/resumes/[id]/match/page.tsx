'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Target,
  Sparkles,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Plus,
  Check,
  FileText,
  ShieldCheck,
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { JobMatchResult, ResumeRecord, ResumeData } from '@/lib/types';

export default function JobMatchPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.id as string;

  const [resumeRecord, setResumeRecord] = useState<ResumeRecord | null>(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<JobMatchResult | null>(null);
  const [error, setError] = useState('');
  const [addedSkills, setAddedSkills] = useState<string[]>([]);

  useEffect(() => {
    async function loadResume() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (res.ok) {
          const data = await res.json();
          setResumeRecord(data.resume);
        } else {
          router.push('/dashboard');
        }
      } catch {
        router.push('/dashboard');
      }
    }
    if (resumeId) loadResume();
  }, [resumeId, router]);

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobDescription.trim() || jobDescription.trim().length < 20) {
      setError('Please paste a job description of at least 20 characters.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const res = await fetch('/api/ai/job-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeId, jobDescription }),
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data.analysis);
      } else {
        setError(data.error || 'Job match analysis failed');
      }
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddMissingSkill = async (skill: string) => {
    if (!resumeRecord) return;
    const currentData = resumeRecord.resumeData as ResumeData;
    const categories = [...currentData.skills];

    if (categories.length === 0) {
      categories.push({ id: 'cat-tech', name: 'Technical Skills', skills: [skill] });
    } else {
      categories[0] = {
        ...categories[0],
        skills: Array.from(new Set([...categories[0].skills, skill])),
      };
    }

    const updatedData = { ...currentData, skills: categories };

    try {
      const res = await fetch(`/api/resumes/${resumeId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resumeData: updatedData }),
      });
      if (res.ok) {
        setAddedSkills((prev) => [...prev, skill]);
        setResumeRecord({ ...resumeRecord, resumeData: updatedData });
      }
    } catch (err) {
      console.error('Failed to add skill:', err);
    }
  };

  const sampleJd = `We are looking for a Full-Stack Software Developer proficient in React.js, Next.js, Node.js, and TypeScript.
Key Responsibilities:
- Build responsive web applications using React, Tailwind CSS, and RESTful APIs.
- Design database schemas and write efficient SQL queries with PostgreSQL and Prisma ORM.
- Implement automated testing with Jest and containerize applications with Docker.
- Collaborate with cross-functional teams in an Agile/Scrum environment.
Qualifications:
- Bachelor's degree in Computer Applications (BCA) or Computer Science.
- Experience with Git, GitHub, and cloud deployments.`;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href={`/resumes/${resumeId}/edit`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resume Builder
          </Link>
          <span className="text-xs text-slate-400 font-mono truncate max-w-[200px]">
            {resumeRecord?.title}
          </span>
        </div>

        {/* Header banner */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-6 sm:p-8 text-white space-y-2 shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm">
            <Target className="w-3.5 h-3.5" /> Smart Job Match Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">ATS & Recruiter Match Engine</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            Compare your resume against any job description. Identify keyword alignment, pinpoint missing ATS skills, and tailor your resume for maximum interview callbacks.
          </p>
        </div>

        {/* Input Form */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
            <label className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Paste Target Job Description (JD)
            </label>
            <button
              type="button"
              onClick={() => setJobDescription(sampleJd)}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline self-start sm:self-auto"
            >
              + Paste Sample Full-Stack JD
            </button>
          </div>

          <form onSubmit={handleAnalyze} className="space-y-4">
            <textarea
              rows={7}
              placeholder="Paste the requirements, responsibilities, and qualifications section of the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-mono"
            />

            {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

            <button
              type="submit"
              disabled={loading || !jobDescription.trim()}
              className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md shadow-blue-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
              {loading ? 'Evaluating Resume Alignment...' : 'Run Job Match Analysis'}
            </button>
          </form>
        </div>

        {/* Analysis Results View */}
        {result && (
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6 animate-fade-in">
            {/* Score gauge banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80">
              <div className="space-y-1 text-center sm:text-left">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Overall Match Level</span>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                  {result.matchLevel} Alignment
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  {result.matchScore >= 75
                    ? 'Excellent keyword coverage! Your resume aligns very strongly with this job description.'
                    : 'Good start. Adding the missing keywords below will significantly increase your ATS score.'}
                </p>
              </div>

              {/* Circular score */}
              <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-blue-600 bg-white dark:bg-slate-900 shadow-md">
                <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
                  {result.matchScore}%
                </span>
              </div>
            </div>

            {/* Matched vs Missing Skills */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Matched Skills */}
              <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Matching Skills Found ({result.matchedSkills.length})
                  </h4>
                </div>
                <p className="text-[11px] text-emerald-700/80 dark:text-emerald-400">
                  These keywords in your resume directly match requirements in the job description:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.matchedSkills.length === 0 ? (
                    <span className="text-xs text-slate-400 italic">No direct keyword matches found.</span>
                  ) : (
                    result.matchedSkills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 text-xs font-semibold"
                      >
                        ✓ {skill}
                      </span>
                    ))
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="p-5 rounded-xl border border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 space-y-3">
                <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                  <AlertCircle className="w-4 h-4" />
                  <h4 className="text-xs font-bold uppercase tracking-wider">
                    Missing Target Keywords ({result.missingSkills.length})
                  </h4>
                </div>
                <p className="text-[11px] text-amber-700/80 dark:text-amber-400">
                  Present in the job posting but missing from your resume. Click to inject directly:
                </p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {result.missingSkills.length === 0 ? (
                    <span className="text-xs text-emerald-600 font-semibold">Zero missing skills! Outstanding match!</span>
                  ) : (
                    result.missingSkills.map((skill) => {
                      const isAdded = addedSkills.includes(skill);
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => handleAddMissingSkill(skill)}
                          disabled={isAdded}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                            isAdded
                              ? 'bg-emerald-600 text-white cursor-default'
                              : 'bg-white dark:bg-slate-800 text-amber-900 dark:text-amber-200 border border-amber-300 dark:border-amber-800 hover:bg-amber-100'
                          }`}
                        >
                          {isAdded ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3 text-amber-500" />}
                          {skill} {isAdded && '(Added)'}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* Recommendations and ATS Advice */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-blue-500" /> Actionable ATS Optimization Steps
              </h4>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                {result.suggestions.map((sug, i) => (
                  <li key={i} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-blue-500 font-bold">•</span>
                    <span>{sug}</span>
                  </li>
                ))}
                {result.atsAdvice.map((adv, i) => (
                  <li key={`adv-${i}`} className="flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/50">
                    <span className="text-indigo-500 font-bold">ℹ</span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
