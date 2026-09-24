import Link from 'next/link';
import { FileText, Heart, Shield, Sparkles } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 py-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <FileText className="w-4 h-4" />
              </div>
              <span className="font-bold text-lg text-slate-900 dark:text-white">CV Crafter</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              AI-Powered Professional Resume Builder & Career Suite designed for students, freshers, and professionals.
            </p>
            <div className="inline-flex items-center gap-1 px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 text-[11px] font-medium border border-blue-200 dark:border-blue-900">
              <Sparkles className="w-3 h-3" />
              BCA Major Project 2026
            </div>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Core Capabilities
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>
                <Link href="/#templates" className="hover:text-blue-600 dark:hover:text-blue-400">
                  4 Distinct Resume Templates
                </Link>
              </li>
              <li>
                <Link href="/#features" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Live Split-Screen Preview
                </Link>
              </li>
              <li>
                <Link href="/#job-match" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Smart Job Match Engine
                </Link>
              </li>
              <li>
                <Link href="/#career-gap" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Career Gap Analyzer & Roadmap
                </Link>
              </li>
              <li>
                <Link href="/#portfolio" className="hover:text-blue-600 dark:hover:text-blue-400">
                  Resume-to-Portfolio & QR Code
                </Link>
              </li>
            </ul>
          </div>

          {/* Templates */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Templates
            </h4>
            <ul className="space-y-2 text-xs text-slate-600 dark:text-slate-400">
              <li>Modern Professional (2-Column)</li>
              <li>Minimal ATS-Friendly</li>
              <li>Creative Portfolio Design</li>
              <li>Student / Fresher Resume</li>
              <li>High-Resolution A4 PDF Export</li>
            </ul>
          </div>

          {/* College Viva & Info */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Project Details
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-2">
              Technology Stack: Next.js 14, React 18, TypeScript, Tailwind CSS, Prisma ORM, PostgreSQL / SQLite, Google Gemini AI.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Architecture: Microservice-ready REST API with JWT Auth, Role-Based Access Control, and multi-tenant data isolation.
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© {new Date().getFullYear()} CV Crafter. Built with academic excellence for BCA Degree Project.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              Engineered with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> for job seekers
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
