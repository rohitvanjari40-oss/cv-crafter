'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Compass,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  BookOpen,
  FolderGit2,
  Calendar,
  Sparkles,
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import { CareerGapResult, ResumeRecord, ResumeData } from '@/lib/types';
import { analyzeCareerGap, CAREER_BENCHMARKS } from '@/lib/careerBenchmarks';

export default function CareerGapPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.id as string;

  const [resumeRecord, setResumeRecord] = useState<ResumeRecord | null>(null);
  const [selectedRole, setSelectedRole] = useState<string>('full-stack-developer');
  const [result, setResult] = useState<CareerGapResult | null>(null);

  useEffect(() => {
    async function loadResume() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (res.ok) {
          const data = await res.json();
          setResumeRecord(data.resume);
          // Run initial analysis
          const initialAnalysis = analyzeCareerGap(data.resume.resumeData, 'full-stack-developer');
          setResult(initialAnalysis);
        } else {
          router.push('/dashboard');
        }
      } catch {
        router.push('/dashboard');
      }
    }
    if (resumeId) loadResume();
  }, [resumeId, router]);

  const handleRoleChange = (roleKey: string) => {
    setSelectedRole(roleKey);
    if (resumeRecord) {
      const updatedAnalysis = analyzeCareerGap(resumeRecord.resumeData as ResumeData, roleKey);
      setResult(updatedAnalysis);
    }
  };

  const roles = [
    { key: 'frontend-developer', name: 'Frontend Developer' },
    { key: 'backend-developer', name: 'Backend Developer' },
    { key: 'full-stack-developer', name: 'Full-Stack Developer' },
    { key: 'python-developer', name: 'Python Developer' },
    { key: 'data-analyst', name: 'Data Analyst' },
  ];

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
        <div className="bg-gradient-to-r from-indigo-600 to-purple-700 rounded-2xl p-6 sm:p-8 text-white space-y-2 shadow-lg">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-xs font-semibold backdrop-blur-sm">
            <Compass className="w-3.5 h-3.5" /> Career Gap Analyzer
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">Role Readiness & Learning Roadmap</h1>
          <p className="text-xs sm:text-sm text-white/80 max-w-2xl leading-relaxed">
            Benchmark your resume against target software engineering positions. Discover missing skills and follow a curated 12-week learning roadmap with free verified resources.
          </p>
        </div>

        {/* Target Role Selector */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
            Select Your Target Engineering Role:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
            {roles.map((r) => (
              <button
                key={r.key}
                type="button"
                onClick={() => handleRoleChange(r.key)}
                className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all text-center ${
                  selectedRole === r.key
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-500/20'
                    : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100'
                }`}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>

        {/* Analysis Results */}
        {result && (
          <div className="space-y-6 animate-fade-in">
            {/* Score & Strengths Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-6 rounded-xl bg-slate-50/80 dark:bg-slate-800/80 border border-slate-200/90 dark:border-slate-700/80">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Benchmark Role</span>
                  <h3 className="text-2xl font-black text-slate-900 dark:text-white">
                    {result.roleName}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Calculated against industry requirements for junior/entry-level tech positions.
                  </p>
                </div>

                <div className="relative w-24 h-24 flex items-center justify-center rounded-full border-4 border-indigo-600 bg-white dark:bg-slate-900 shadow-md">
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {result.readinessScore}%
                  </span>
                </div>
              </div>

              {/* Skills Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Acquired */}
                <div className="p-5 rounded-xl border border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
                    <CheckCircle2 className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Acquired Core Skills ({result.acquiredSkills.length})
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.acquiredSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200 text-xs font-semibold"
                      >
                        ✓ {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Missing */}
                <div className="p-5 rounded-xl border border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 space-y-3">
                  <div className="flex items-center gap-2 text-indigo-800 dark:text-indigo-300">
                    <AlertCircle className="w-4 h-4" />
                    <h4 className="text-xs font-bold uppercase tracking-wider">
                      Skills Gap to Bridge ({result.missingSkills.length})
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {result.missingSkills.map((s) => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 text-xs font-semibold"
                      >
                        • {s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Phased 12-Week Roadmap */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-indigo-600" />
                  Structured 12-Week Learning Roadmap
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Step-by-step milestones to acquire the missing skills and build strong portfolio pieces.
                </p>
              </div>

              <div className="space-y-6">
                {result.roadmap.map((phase, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-800/80 space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <div>
                        <span className="text-[10.5px] font-bold px-2 py-0.5 rounded bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 uppercase">
                          {phase.duration}
                        </span>
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                          {phase.phase}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 italic">
                        {phase.focus}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Topics */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
                          Key Topics
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {phase.topics.map((t, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-indigo-500 font-bold">•</span>
                              <span>{t}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Suggested Projects */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block flex items-center gap-1">
                          <FolderGit2 className="w-3.5 h-3.5 text-blue-500" /> Milestone Project
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600 dark:text-slate-400">
                          {phase.suggestedProjects.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5 font-medium text-slate-800 dark:text-slate-200">
                              <span className="text-blue-500 font-bold">★</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Free Resources */}
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block flex items-center gap-1">
                          <BookOpen className="w-3.5 h-3.5 text-emerald-500" /> Free Resources
                        </span>
                        <div className="space-y-1.5">
                          {phase.recommendedResources.map((res, i) => (
                            <a
                              key={i}
                              href={res.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs flex items-center justify-between hover:border-indigo-500 transition-colors group"
                            >
                              <div className="truncate">
                                <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 block truncate">
                                  {res.name}
                                </span>
                                <span className="text-[10px] text-slate-400">{res.type}</span>
                              </div>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                            </a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
