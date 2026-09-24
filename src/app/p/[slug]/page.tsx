'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Github,
  Globe,
  Download,
  QrCode,
  GraduationCap,
  Briefcase,
  ExternalLink,
  Award,
  Sparkles,
  Lock,
  Loader2,
  Check,
  Printer,
} from 'lucide-react';
import QRCodeModal from '@/components/common/QRCodeModal';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import { ResumeData } from '@/lib/types';
import { exportResumeToPdf } from '@/lib/pdfExport';

interface PortfolioData {
  title: string;
  templateId: 'modern' | 'minimal' | 'creative' | 'student';
  targetRole?: string | null;
  authorName: string;
  updatedAt: string;
  resumeData: ResumeData;
}

export default function PublicPortfolioPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [qrModalOpen, setQrModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'portfolio' | 'resume'>('portfolio');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const res = await fetch(`/api/portfolio/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setPortfolio(data);
        } else {
          setError('This portfolio is private or does not exist.');
        }
      } catch {
        setError('Failed to load portfolio.');
      } finally {
        setLoading(false);
      }
    }
    if (slug) loadPortfolio();
  }, [slug]);

  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setExportMessage('Generating PDF...');
    try {
      const cleanTitle = (portfolio?.title || 'Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const result = await exportResumeToPdf('resume-paper', {
        filename: `${cleanTitle}.pdf`,
        onProgress: (stage) => setExportMessage(stage),
      });
      if (!result.success) {
        window.print();
      }
    } catch {
      window.print();
    } finally {
      setIsExportingPdf(false);
      setExportMessage(null);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  if (error || !portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-6 text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center mx-auto">
          <Lock className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black">Portfolio Unavailable</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
          {error || 'This portfolio is either private or the URL is invalid.'}
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-bold"
        >
          Create Your Own with CV Crafter
        </Link>
      </div>
    );
  }

  const { resumeData, templateId, title, authorName } = portfolio;
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = resumeData;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Portfolio Top Bar */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-3 flex items-center justify-between no-print">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <span className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
            CV Crafter <span className="text-[10px] text-blue-600 font-semibold uppercase">Portfolio</span>
          </span>
        </Link>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* View Mode Toggle: Interactive Web View vs Print-ready Resume */}
          <div className="bg-slate-100 dark:bg-slate-800 p-1 rounded-lg flex items-center text-xs">
            <button
              type="button"
              onClick={() => setViewMode('portfolio')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                viewMode === 'portfolio'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Portfolio View
            </button>
            <button
              type="button"
              onClick={() => setViewMode('resume')}
              className={`px-3 py-1 rounded-md font-semibold transition-colors ${
                viewMode === 'resume'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
                  : 'text-slate-500'
              }`}
            >
              Resume (A4)
            </button>
          </div>

          <button
            type="button"
            onClick={() => setQrModalOpen(true)}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
            title="Scan QR Code"
          >
            <QrCode className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
            title="Download high-resolution A4 PDF"
          >
            {isExportingPdf ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>{exportMessage || 'Exporting...'}</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download PDF</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            className="p-2 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors hidden sm:inline-flex"
            title="Open Browser Print Dialog (Ctrl+P)"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Traditional A4 Resume container: visible on screen if viewMode === 'resume', or used for print / PDF export */}
      <div className={viewMode === 'resume' ? 'flex-1 flex justify-center items-start py-8 px-4 overflow-auto' : 'hidden print:block'}>
        <ResumeRenderer data={resumeData} templateId={templateId} zoom={1} />
      </div>

      {viewMode === 'portfolio' && (
        /* View Mode: Modern Interactive Portfolio Website */
        <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 no-print">
          {/* Hero Section */}
          <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-center gap-8">
            {personal.photoUrl ? (
              <img
                src={personal.photoUrl}
                alt={personal.fullName || authorName}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl object-cover ring-4 ring-blue-500/20 shadow-xl shrink-0"
              />
            ) : (
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-3xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black text-4xl flex items-center justify-center shadow-xl shrink-0">
                {personal.fullName?.charAt(0) || authorName.charAt(0)}
              </div>
            )}

            <div className="space-y-3 text-center md:text-left flex-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-bold border border-blue-200 dark:border-blue-900">
                <Sparkles className="w-3 h-3" /> Available for Opportunities
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white">
                {personal.fullName || authorName}
              </h1>
              <p className="text-base font-semibold text-blue-600 dark:text-blue-400">
                {personal.jobTitle || 'Software Engineer'}
              </p>

              {/* Social / Contact links */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-xs text-slate-600 dark:text-slate-300">
                {personal.email && (
                  <a
                    href={`mailto:${personal.email}`}
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-500" /> {personal.email}
                  </a>
                )}
                {personal.phone && (
                  <span className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-blue-500" /> {personal.phone}
                  </span>
                )}
                {personal.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-500" /> {personal.location}
                  </span>
                )}
                {personal.github && (
                  <a
                    href={personal.github.startsWith('http') ? personal.github : `https://${personal.github}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" /> GitHub
                  </a>
                )}
                {personal.linkedin && (
                  <a
                    href={personal.linkedin.startsWith('http') ? personal.linkedin : `https://${personal.linkedin}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                  >
                    <Linkedin className="w-3.5 h-3.5 text-blue-600" /> LinkedIn
                  </a>
                )}
                {personal.portfolio && (
                  <a
                    href={personal.portfolio.startsWith('http') ? personal.portfolio : `https://${personal.portfolio}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                  >
                    <Globe className="w-3.5 h-3.5 text-emerald-500" /> Website
                  </a>
                )}
              </div>
            </div>
          </section>

          {/* About Me Section */}
          {summary && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
              <h2 className="text-base font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                About & Overview
              </h2>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed text-justify">
                {summary}
              </p>
            </section>
          )}

          {/* Featured Projects Showcase */}
          {projects && projects.length > 0 && (
            <section className="space-y-5">
              <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 dark:text-white">Featured Projects</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Engineering works, live demonstrations, and public code repositories.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div
                    key={proj.id}
                    className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col justify-between space-y-4 hover:border-blue-500 transition-colors"
                  >
                    <div className="space-y-2">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white">{proj.title}</h3>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                        {proj.description}
                      </p>
                    </div>

                    <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1.5">
                          {proj.technologies.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10.5px] font-semibold text-slate-700 dark:text-slate-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-3 pt-1">
                        {proj.liveUrl && (
                          <a
                            href={proj.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                          >
                            Live Demo <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                        {proj.githubUrl && (
                          <a
                            href={proj.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-bold text-slate-700 dark:text-slate-300 hover:underline"
                          >
                            <Github className="w-3.5 h-3.5" /> Source Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Cloud */}
          {skills && skills.length > 0 && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white">Skills & Competencies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
                      {cat.name}
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200/50 dark:border-slate-700"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Experience & Education Timelines */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Experience */}
            {experience && experience.length > 0 && (
              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-blue-600" /> Experience
                </h2>
                <div className="space-y-4 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">{exp.position}</h3>
                        <span className="text-[10px] text-slate-400">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">{exp.company}</p>
                      {exp.responsibilities && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
                          {exp.responsibilities.map((r, idx) => (
                            <li key={idx}>{r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
                <h2 className="text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-indigo-600" /> Education
                </h2>
                <div className="space-y-4 border-l-2 border-slate-200 dark:border-slate-800 pl-4">
                  {education.map((edu) => (
                    <div key={edu.id} className="space-y-1">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                        <span className="text-[10px] text-slate-400">
                          {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                        </span>
                      </div>
                      <div className="flex justify-between text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                        <span>{edu.institution}</span>
                        {edu.grade && <span className="font-bold text-slate-800 dark:text-slate-200">{edu.grade}</span>}
                      </div>
                      {edu.description && (
                        <p className="text-xs text-slate-500 pt-0.5">{edu.description}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Certifications & Achievements */}
          {((certifications && certifications.length > 0) || (achievements && achievements.length > 0)) && (
            <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
              <h2 className="text-2xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-500" /> Certifications & Achievements
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {certifications?.map((c) => (
                  <div key={c.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white block">{c.name}</span>
                    <p className="text-[11px] text-slate-500">{c.issuer} • {c.date}</p>
                    {c.url && (
                      <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-[11px] text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 pt-1">
                        View Credential <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                ))}
                {achievements?.map((a) => (
                  <div key={a.id} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-1">
                    <span className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-amber-500" /> {a.title}
                    </span>
                    <p className="text-xs text-slate-600 dark:text-slate-300">{a.description}</p>
                    {a.date && <p className="text-[10px] text-slate-400">{a.date}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Footer with QR Code action */}
          <footer className="text-center py-8 space-y-3 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-400">
              Live Personal Portfolio generated with{' '}
              <Link href="/" className="font-bold text-blue-600 dark:text-blue-400 hover:underline">
                CV Crafter
              </Link>
            </p>
          </footer>
        </main>
      )}

      {/* Scannable QR Code Modal */}
      {qrModalOpen && (
        <QRCodeModal
          isOpen={qrModalOpen}
          onClose={() => setQrModalOpen(false)}
          title={title}
          url={currentUrl}
        />
      )}
    </div>
  );
}
