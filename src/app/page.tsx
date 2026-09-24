'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  FileCheck,
  Target,
  Compass,
  QrCode,
  Download,
  Eye,
  Shield,
  Layers,
  ChevronDown,
  ExternalLink,
  Laptop,
  Check,
} from 'lucide-react';
import { TEMPLATES_CONFIG } from '@/lib/sampleData';

export default function LandingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [selectedPreviewTemplate, setSelectedPreviewTemplate] = useState('student');

  const faqs = [
    {
      q: 'Is CV Crafter suitable for both college students and experienced professionals?',
      a: 'Yes! CV Crafter includes specially designed templates for both freshers (such as our Student / Fresher template emphasizing coursework, academic projects, and CGPA) and seasoned professionals (such as our Modern Professional and Minimal ATS-friendly templates).',
    },
    {
      q: 'How does the Smart Job Match Engine work?',
      a: 'You can paste any Job Description (JD) text, and our matching engine will analyze your resume against the target requirements. It calculates your match percentage, reveals keywords you already have, pinpoints missing critical ATS skills, and gives specific optimization suggestions.',
    },
    {
      q: 'What is the Career Gap Analyzer?',
      a: 'The Career Gap Analyzer evaluates your current skills against industry benchmarks for target roles like Frontend Developer, Backend Developer, Full-Stack Developer, or Python Developer. It provides a readiness score and a structured 12-week learning roadmap with free recommended learning resources.',
    },
    {
      q: 'Can I really turn my resume into a live personal portfolio website?',
      a: 'Yes! With a single click, any resume can be published to a clean public URL (/p/your-slug). You can customize your URL slug, generate a scannable QR code for physical resumes and business cards, and toggle privacy anytime.',
    },
    {
      q: 'Will the exported PDF match the on-screen preview?',
      a: 'Yes. CV Crafter utilizes pixel-perfect A4 print stylesheets and browser rendering engines so that margins, typography, page breaks, and layout elements print cleanly without cutoffs or misalignments.',
    },
    {
      q: 'Is my data secure?',
      a: 'Absolutely. Passwords are encrypted with bcrypt hashing, user sessions use secure HTTP-only cookies, and multi-tenant authorization prevents any user from accessing or modifying someone else’s resume.',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 md:pt-24 md:pb-28 overflow-hidden">
        {/* Subtle decorative background gradient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/10 via-indigo-500/10 to-sky-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>AI-Powered Full-Stack Resume Builder & Career Suite</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-slate-900 dark:text-white max-w-4xl mx-auto leading-[1.15]">
            Build a Resume That Gets You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-sky-600">Noticed & Hired.</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Craft ATS-optimized resumes in minutes with live preview, AI assistance, 4 professional templates, job description match engine, and 1-click personal portfolio generation.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all group"
            >
              Create Your Resume
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors border border-slate-200 dark:border-slate-800"
            >
              <Laptop className="w-4 h-4 text-blue-500" />
              1-Click Demo Login
            </Link>
          </div>

          {/* Quick trust metrics */}
          <div className="pt-8 flex flex-wrap justify-center items-center gap-6 sm:gap-10 text-xs font-medium text-slate-500 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> 100% ATS-Friendly Layouts
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Print-Ready A4 PDF Export
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> QR-Code Public Portfolios
            </span>
          </div>
        </div>
      </section>

      {/* Templates Showcase Section */}
      <section id="templates" className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
              Professional Resume Templates
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
              Select from 4 expertly crafted formats designed to pass Application Tracking Systems (ATS) and captivate recruiters.
            </p>
          </div>

          {/* Template Selector Tabs */}
          <div className="flex flex-wrap justify-center gap-2">
            {TEMPLATES_CONFIG.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedPreviewTemplate(t.id)}
                className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${
                  selectedPreviewTemplate === t.id
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {t.name}
              </button>
            ))}
          </div>

          {/* Template Preview Card */}
          <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-700 shadow-xl space-y-4">
            {(() => {
              const cur = TEMPLATES_CONFIG.find((x) => x.id === selectedPreviewTemplate) || TEMPLATES_CONFIG[0];
              return (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div>
                      <h3 className="font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                        {cur.name}
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300">
                          {cur.badge}
                        </span>
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{cur.description}</p>
                    </div>
                    <Link
                      href="/register"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-colors shrink-0"
                    >
                      Use This Template <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Mock Paper Visual Preview */}
                  <div className="p-6 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-3 font-sans">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
                      <div>
                        <div className="h-4 w-40 bg-slate-900 dark:bg-slate-200 rounded font-bold text-xs flex items-center px-1 text-white dark:text-slate-900">
                          Rohit Sharma
                        </div>
                        <div className="h-3 w-48 bg-blue-500/20 rounded mt-1 text-[10px] text-blue-600 font-semibold">
                          BCA Graduate • Software Engineer
                        </div>
                      </div>
                      <div className="text-[10px] text-slate-500 flex gap-2">
                        <span>rohit@example.com</span>
                        <span>•</span>
                        <span>+91 98765 43210</span>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                        Summary
                      </div>
                      <div className="text-[10px] text-slate-600 dark:text-slate-400 leading-relaxed">
                        Dedicated BCA graduate with solid foundation in full-stack web engineering, algorithms, and database systems. Experienced with React, Node, and PostgreSQL.
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div className="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Education</span>
                        <p className="text-slate-500">BCA (2026) • Apex Institute • 8.8 CGPA</p>
                      </div>
                      <div className="p-2.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] space-y-1">
                        <span className="font-bold text-slate-800 dark:text-slate-200">Core Skills</span>
                        <p className="text-slate-500">React.js, Next.js, Node.js, PostgreSQL, TypeScript</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Core Features Grid */}
      <section id="features" className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Engineered for Job Search Success
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Every feature you need to write, refine, and present your career credentials professionally.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Eye className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Real-Time Split Preview</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Watch your resume update with every keystroke on desktop split-screen or mobile view. No surprise formatting glitches.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">AI Content Enhancement</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Generate impactful summaries and rewrite bullet points with action verbs and quantifiable business impact using Gemini AI.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 hover:border-blue-500 transition-colors">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white">Print-Ready A4 Export</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              High-resolution vector PDF export configured for standard ISO A4 paper with proper page break handling and no overlapping text.
            </p>
          </div>
        </div>
      </section>

      {/* Unique Feature 1: Smart Job Match Engine */}
      <section id="job-match" className="py-16 bg-gradient-to-b from-blue-50/50 to-white dark:from-slate-900 dark:to-slate-950 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 text-xs font-bold">
                <Target className="w-3.5 h-3.5" /> Unique Feature #1
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Smart Job Match Engine
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Never send an unaligned resume again. Paste any job posting description, and our analyzer matches your skills against recruiter requirements, computing your match score, missing keywords, and concrete ATS optimization steps.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Percentage match score with visual readiness gauge
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> Highlighting matching skills vs missing critical ATS keywords
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-500" /> 1-Click addition of relevant skills to your resume
                </li>
              </ul>
            </div>

            {/* Visual demo box */}
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Analysis: Full-Stack Developer Job Posting</span>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                  85% Match
                </span>
              </div>
              <div className="space-y-2">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Matched Skills Found</span>
                <div className="flex flex-wrap gap-1.5">
                  {['React.js', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript', 'Tailwind CSS'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-[10px] font-semibold">
                      ✓ {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="space-y-2 pt-1">
                <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300 block">Missing ATS Keywords in JD</span>
                <div className="flex flex-wrap gap-1.5">
                  {['Docker', 'Redis', 'Jest'].map((s) => (
                    <span key={s} className="px-2 py-0.5 rounded bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-[10px] font-semibold">
                      + {s}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Feature 2: Career Gap Analyzer */}
      <section id="career-gap" className="py-16 bg-white dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-4 font-sans">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200">Role Benchmark: Frontend Developer</span>
                <span className="text-xs font-extrabold px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                  Readiness: 78%
                </span>
              </div>
              <div className="space-y-2">
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-bold text-blue-600 dark:text-blue-400">Phase 1: Modern JS & TypeScript (Weeks 1-4)</span>
                  <p className="text-slate-500 text-[10.5px]">Master Promises, Async/Await, Generics, and Tailwind CSS utility design.</p>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 text-xs space-y-1">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">Phase 2: Next.js SaaS Architecture (Weeks 5-8)</span>
                  <p className="text-slate-500 text-[10.5px]">App Router, Server Actions, Zustand state, and relational Prisma ORM.</p>
                </div>
              </div>
            </div>

            <div className="order-1 lg:order-2 space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/60 dark:text-indigo-300 text-xs font-bold">
                <Compass className="w-3.5 h-3.5" /> Unique Feature #2
              </div>
              <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Career Gap Analyzer & Phased Roadmap
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                Specially designed for students, freshers, and upskillers. Choose a target role (*Frontend, Backend, Full-Stack, Python, Data Analyst*), and get an instant gap assessment with a structured 12-week learning roadmap and free verified resources.
              </p>
              <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-500" /> Target role benchmarking against industry requirements
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-500" /> 12-Week phased roadmap with actionable projects & topics
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-indigo-500" /> Direct links to free official documentation and courses
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Unique Feature 3: Resume to Portfolio */}
      <section id="portfolio" className="py-16 bg-slate-50 dark:bg-slate-900/50 border-y border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/60 dark:text-emerald-300 text-xs font-bold">
            <QrCode className="w-3.5 h-3.5" /> Unique Feature #3
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white max-w-2xl mx-auto">
            Resume-to-Portfolio Website with QR Code
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            Turn your static resume into a live personal portfolio at <code className="text-blue-600 dark:text-blue-400 font-mono">/p/your-name</code>. Generate a scannable QR code for viva presentations, business cards, or resume headers.
          </p>
          <div className="flex justify-center gap-4 pt-2">
            <Link
              href="/p/rohit-sharma"
              target="_blank"
              className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md shadow-emerald-500/20 transition-all"
            >
              View Live Demo Portfolio <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 md:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            How It Works in 3 Simple Steps
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            From blank page to interview-ready resume in less than 10 minutes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md shadow-blue-500/30">
              1
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Choose a Template</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pick from 4 modern ATS-friendly templates tailored for college freshers or seasoned engineers.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md shadow-indigo-500/30">
              2
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Add Details & AI Polish</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Fill in your education, experience, and projects. Use Gemini AI to enhance summaries and bullet points.
            </p>
          </div>

          <div className="space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-lg flex items-center justify-center mx-auto shadow-md shadow-emerald-500/30">
              3
            </div>
            <h3 className="font-bold text-sm text-slate-900 dark:text-white">Export PDF or Share Portfolio</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Download clean print-ready A4 PDF or publish as an interactive portfolio with a scannable QR code.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Testimonials (clearly marked demo) */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900/50 border-t border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <div className="text-[11px] font-semibold text-blue-600 uppercase tracking-wider">
              College Project Demo Testimonials
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">What Students & Mentors Say</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                “As a final-year BCA student, highlighting academic projects and coursework was my top priority. The Student template and AI bullet polisher helped me land my first internship.”
              </p>
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Aakash Verma</span>
                <span className="text-[10px] text-slate-500">BCA Graduate • Bangalore</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                “The Smart Job Match Engine is brilliant. Pasting the recruiter’s JD showed me that I missed mentioning Redis and Docker, which I added right away to increase my interview callbacks.”
              </p>
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Sneha Rao</span>
                <span className="text-[10px] text-slate-500">Junior Frontend Developer • Pune</span>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 space-y-3">
              <p className="text-xs text-slate-600 dark:text-slate-300 italic">
                “The Resume-to-Portfolio feature with the QR code is incredible for college viva demonstrations. Evaluators can scan the QR code and see the full live website instantly on their phone.”
              </p>
              <div>
                <span className="font-bold text-xs text-slate-900 dark:text-white block">Karan Mehta</span>
                <span className="text-[10px] text-slate-500">Computer Applications Major • Delhi</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section id="faq" className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400">
            Everything you need to know about CV Crafter architecture and features.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900"
            >
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                className="w-full p-4 text-left flex items-center justify-between text-xs font-bold text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-slate-400 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`}
                />
              </button>
              {activeFaq === idx && (
                <div className="px-4 pb-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center space-y-6">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <h2 className="text-3xl font-black">Ready to Craft Your Standout Resume?</h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-xl mx-auto">
            Join students, job seekers, and developers building modern resumes with real-time preview and AI assistance.
          </p>
          <div className="pt-2">
            <Link
              href="/register"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-blue-600 hover:bg-slate-100 font-bold text-xs shadow-lg transition-colors"
            >
              Get Started Free <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
