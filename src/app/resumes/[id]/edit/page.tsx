'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Save,
  Download,
  Layout,
  Globe,
  Target,
  Compass,
  CheckCircle2,
  Clock,
  User,
  FileText,
  GraduationCap,
  Briefcase,
  Wrench,
  FolderGit2,
  Award,
  Trophy,
  Languages,
  Layers,
  Palette,
  Loader2,
  ZoomIn,
  ZoomOut,
  Eye,
  Edit,
  Printer,
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import ResumeRenderer from '@/components/templates/ResumeRenderer';
import PersonalInfoSection from '@/components/builder/PersonalInfoSection';
import SummarySection from '@/components/builder/SummarySection';
import EducationSection from '@/components/builder/EducationSection';
import ExperienceSection from '@/components/builder/ExperienceSection';
import SkillsSection from '@/components/builder/SkillsSection';
import ProjectsSection from '@/components/builder/ProjectsSection';
import CertificationsSection from '@/components/builder/CertificationsSection';
import AchievementsSection from '@/components/builder/AchievementsSection';
import LanguagesSection from '@/components/builder/LanguagesSection';
import CustomSection from '@/components/builder/CustomSection';
import TemplateSelectorModal from '@/components/builder/TemplateSelectorModal';
import SharePortfolioModal from '@/components/builder/SharePortfolioModal';
import { ResumeData, ResumeRecord } from '@/lib/types';
import { defaultEmptyResume } from '@/lib/sampleData';
import { exportResumeToPdf } from '@/lib/pdfExport';

type TabKey =
  | 'personal'
  | 'summary'
  | 'education'
  | 'experience'
  | 'skills'
  | 'projects'
  | 'certifications'
  | 'achievements'
  | 'languages'
  | 'custom'
  | 'design';

export default function ResumeBuilderPage() {
  const params = useParams();
  const router = useRouter();
  const resumeId = params?.id as string;

  const [resumeRecord, setResumeRecord] = useState<ResumeRecord | null>(null);
  const [resumeData, setResumeData] = useState<ResumeData>(defaultEmptyResume);
  const [title, setTitle] = useState('');
  const [templateId, setTemplateId] = useState<'modern' | 'minimal' | 'creative' | 'student'>('modern');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // UI state
  const [activeTab, setActiveTab] = useState<TabKey>('personal');
  const [mobileMode, setMobileMode] = useState<'edit' | 'preview'>('edit');
  const [zoom, setZoom] = useState(0.85);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'unsaved'>('saved');
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const [exportMessage, setExportMessage] = useState<string | null>(null);

  // Modals
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [shareModalOpen, setShareModalOpen] = useState(false);

  // Autosave timer ref
  const autosaveTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initial fetch
  useEffect(() => {
    async function loadResume() {
      try {
        const res = await fetch(`/api/resumes/${resumeId}`);
        if (!res.ok) {
          if (res.status === 401) router.push('/login');
          else setError('Failed to load resume');
          return;
        }
        const data = await res.json();
        setResumeRecord(data.resume);
        setTitle(data.resume.title);
        setTemplateId(data.resume.templateId);
        setResumeData(data.resume.resumeData || defaultEmptyResume);
      } catch (err) {
        setError('Error loading resume');
      } finally {
        setLoading(false);
      }
    }
    if (resumeId) loadResume();
  }, [resumeId, router]);

  // Save handler
  const saveToBackend = useCallback(
    async (
      dataToSave: ResumeData = resumeData,
      titleToSave: string = title,
      tplToSave: string = templateId
    ) => {
      setSaveStatus('saving');
      try {
        const res = await fetch(`/api/resumes/${resumeId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: titleToSave,
            templateId: tplToSave,
            resumeData: dataToSave,
          }),
        });
        if (res.ok) {
          setSaveStatus('saved');
        } else {
          setSaveStatus('unsaved');
        }
      } catch {
        setSaveStatus('unsaved');
      }
    },
    [resumeId, resumeData, title, templateId]
  );

  // Debounced autosave
  const triggerAutosave = (newData: ResumeData) => {
    setResumeData(newData);
    setSaveStatus('unsaved');
    if (autosaveTimerRef.current) clearTimeout(autosaveTimerRef.current);
    autosaveTimerRef.current = setTimeout(() => {
      saveToBackend(newData, title, templateId);
    }, 1500);
  };

  const handleDownloadPdf = async () => {
    if (isExportingPdf) return;
    setIsExportingPdf(true);
    setExportMessage('Preparing PDF...');
    try {
      const cleanTitle = (title || 'Resume').trim().replace(/[^a-zA-Z0-9_-]/g, '_');
      const result = await exportResumeToPdf('resume-paper', {
        filename: `${cleanTitle}.pdf`,
        onProgress: (stage) => setExportMessage(stage),
      });

      if (!result.success) {
        console.warn('Direct PDF export failed, falling back to print dialog:', result.error);
        alert(`Note: Direct PDF export encountered an issue (${result.error || 'render error'}). Opening print dialog as fallback.`);
        window.print();
      }
    } catch (err: any) {
      console.error('PDF export error:', err);
      alert('An error occurred during PDF generation. Opening print dialog as fallback.');
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
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-1 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        </div>
      </div>
    );
  }

  if (error || !resumeRecord) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-4">
          <p className="text-red-500 font-bold">{error || 'Resume not found'}</p>
          <Link href="/dashboard" className="text-xs font-semibold text-blue-600 underline">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const navTabs: { key: TabKey; label: string; icon: any }[] = [
    { key: 'personal', label: 'Personal Info', icon: User },
    { key: 'summary', label: 'Summary', icon: FileText },
    { key: 'education', label: 'Education', icon: GraduationCap },
    { key: 'experience', label: 'Experience', icon: Briefcase },
    { key: 'skills', label: 'Skills', icon: Wrench },
    { key: 'projects', label: 'Projects', icon: FolderGit2 },
    { key: 'certifications', label: 'Certifications', icon: Award },
    { key: 'achievements', label: 'Achievements', icon: Trophy },
    { key: 'languages', label: 'Languages', icon: Languages },
    { key: 'custom', label: 'Custom Sections', icon: Layers },
    { key: 'design', label: 'Design & Colors', icon: Palette },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="no-print">
        <Navbar />
      </div>

      {/* Top Builder Control Bar */}
      <header className="builder-header no-print sticky top-16 z-40 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 shadow-xs">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard"
            className="p-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>

          {/* Title edit */}
          <input
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setSaveStatus('unsaved');
            }}
            onBlur={() => saveToBackend(resumeData, title, templateId)}
            className="font-bold text-sm text-slate-900 dark:text-white bg-transparent border-b border-transparent hover:border-slate-300 dark:hover:border-slate-700 focus:border-blue-500 px-1 py-0.5 focus:outline-none w-48 sm:w-64 truncate"
            title="Click to rename"
          />

          {/* Autosave badge */}
          <div className="hidden sm:flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
            {saveStatus === 'saved' && (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Saved</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-500" />
                <span>Saving...</span>
              </>
            )}
            {saveStatus === 'unsaved' && (
              <>
                <Clock className="w-3.5 h-3.5 text-amber-500" />
                <span>Unsaved changes</span>
              </>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Quick links to unique features */}
          <Link
            href={`/resumes/${resumeId}/match`}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 hover:bg-blue-100 transition-colors"
          >
            <Target className="w-3.5 h-3.5 text-blue-500" />
            Job Match
          </Link>

          <Link
            href={`/resumes/${resumeId}/gap`}
            className="hidden lg:inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-lg bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300 hover:bg-indigo-100 transition-colors"
          >
            <Compass className="w-3.5 h-3.5 text-indigo-500" />
            Career Gap
          </Link>

          {/* Template Switcher */}
          <button
            type="button"
            onClick={() => setTemplateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Layout className="w-3.5 h-3.5 text-blue-500" />
            <span className="capitalize">{templateId}</span> Template
          </button>

          {/* Share Portfolio & QR */}
          <button
            type="button"
            onClick={() => setShareModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Share Portfolio
          </button>

          {/* Download PDF Button */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            disabled={isExportingPdf}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold rounded-lg bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors disabled:opacity-75 disabled:cursor-not-allowed"
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

          {/* System Print Dialog Fallback */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors hidden sm:inline-flex"
            title="Open Browser Print Dialog (Ctrl+P)"
          >
            <Printer className="w-4 h-4" />
          </button>

          {/* Manual Save Button */}
          <button
            type="button"
            onClick={() => saveToBackend(resumeData, title, templateId)}
            className="p-1.5 text-slate-500 hover:text-slate-800 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Manual Save"
          >
            <Save className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Mobile Toggle Bar (Only on small screens) */}
      <div className="no-print lg:hidden bg-slate-200 dark:bg-slate-800 p-2 flex justify-center gap-2">
        <button
          type="button"
          onClick={() => setMobileMode('edit')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileMode === 'edit'
              ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Edit className="w-3.5 h-3.5" /> Edit Resume
        </button>
        <button
          type="button"
          onClick={() => setMobileMode('preview')}
          className={`flex-1 py-1.5 text-xs font-bold rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
            mobileMode === 'preview'
              ? 'bg-white dark:bg-slate-900 text-blue-600 shadow-xs'
              : 'text-slate-600 dark:text-slate-400'
          }`}
        >
          <Eye className="w-3.5 h-3.5" /> Live Preview
        </button>
      </div>

      {/* Main Split-Screen Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Form Editor Column */}
        <div
          className={`builder-sidebar w-full lg:w-[45%] xl:w-[42%] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-y-auto ${
            mobileMode === 'preview' ? 'hidden lg:flex' : 'flex'
          }`}
        >
          {/* Horizontal Section Navigation Tabs */}
          <div className="sticky top-0 z-10 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 p-2 overflow-x-auto flex gap-1 scrollbar-none">
            {navTabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg shrink-0 transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Form Content Area */}
          <div className="p-5 sm:p-6 space-y-6 flex-1">
            {activeTab === 'personal' && (
              <PersonalInfoSection
                data={resumeData.personal}
                onChange={(updated) => triggerAutosave({ ...resumeData, personal: updated })}
              />
            )}

            {activeTab === 'summary' && (
              <SummarySection
                summary={resumeData.summary}
                jobTitle={resumeData.personal.jobTitle}
                onChange={(updated) => {
                  const newData = { ...resumeData, summary: updated };
                  setResumeData(newData);
                  saveToBackend(newData, title, templateId);
                }}
              />
            )}

            {activeTab === 'education' && (
              <EducationSection
                items={resumeData.education}
                onChange={(updated) => triggerAutosave({ ...resumeData, education: updated })}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection
                items={resumeData.experience}
                onChange={(updated) => triggerAutosave({ ...resumeData, experience: updated })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                categories={resumeData.skills}
                onChange={(updated) => triggerAutosave({ ...resumeData, skills: updated })}
              />
            )}

            {activeTab === 'projects' && (
              <ProjectsSection
                items={resumeData.projects}
                onChange={(updated) => triggerAutosave({ ...resumeData, projects: updated })}
              />
            )}

            {activeTab === 'certifications' && (
              <CertificationsSection
                items={resumeData.certifications}
                onChange={(updated) => triggerAutosave({ ...resumeData, certifications: updated })}
              />
            )}

            {activeTab === 'achievements' && (
              <AchievementsSection
                items={resumeData.achievements}
                onChange={(updated) => triggerAutosave({ ...resumeData, achievements: updated })}
              />
            )}

            {activeTab === 'languages' && (
              <LanguagesSection
                items={resumeData.languages}
                onChange={(updated) => triggerAutosave({ ...resumeData, languages: updated })}
              />
            )}

            {activeTab === 'custom' && (
              <CustomSection
                sections={resumeData.customSections}
                onChange={(updated) => triggerAutosave({ ...resumeData, customSections: updated })}
              />
            )}

            {activeTab === 'design' && (
              <div className="space-y-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">Template Styling & Accent</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Customize the primary accent color used on headers and badges.
                  </p>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Accent Color</label>
                  <div className="flex items-center gap-3">
                    {['#2563eb', '#0f766e', '#7c3aed', '#0284c7', '#0f172a', '#dc2626'].map((color) => (
                      <button
                        key={color}
                        type="button"
                        onClick={() =>
                          triggerAutosave({
                            ...resumeData,
                            settings: { ...resumeData.settings!, accentColor: color },
                          })
                        }
                        className="w-7 h-7 rounded-full border-2 border-white dark:border-slate-800 shadow-sm transition-transform hover:scale-110"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    <input
                      type="color"
                      value={resumeData.settings?.accentColor || '#2563eb'}
                      onChange={(e) =>
                        triggerAutosave({
                          ...resumeData,
                          settings: { ...resumeData.settings!, accentColor: e.target.value },
                        })
                      }
                      className="w-7 h-7 rounded-full cursor-pointer bg-transparent border-0"
                      title="Custom color"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Live Synchronized Preview Column */}
        <div
          className={`flex-1 bg-slate-200/80 dark:bg-slate-950/80 flex-col overflow-y-auto ${
            mobileMode === 'edit' ? 'hidden lg:flex print:flex' : 'flex'
          }`}
        >
          {/* Preview floating controls */}
          <div className="sticky top-0 z-10 flex items-center justify-between p-3 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 no-print">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-blue-500" /> Live Resume Preview (A4 ISO)
            </span>

            {/* Zoom Controls */}
            <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                type="button"
                onClick={() => setZoom((z) => Math.max(0.6, z - 0.1))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
                title="Zoom Out"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="text-[10.5px] font-mono text-slate-600 dark:text-slate-300 w-10 text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                type="button"
                onClick={() => setZoom((z) => Math.min(1.3, z + 0.1))}
                className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white rounded"
                title="Zoom In"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Render A4 Resume */}
          <div className="flex-1 flex justify-center items-start p-4 md:p-8">
            <ResumeRenderer data={resumeData} templateId={templateId} zoom={zoom} />
          </div>
        </div>
      </main>

      {/* Template Selector Modal */}
      {templateModalOpen && (
        <TemplateSelectorModal
          isOpen={templateModalOpen}
          onClose={() => setTemplateModalOpen(false)}
          currentTemplateId={templateId}
          onSelect={(newTpl) => {
            setTemplateId(newTpl);
            saveToBackend(resumeData, title, newTpl);
          }}
        />
      )}

      {/* Share Portfolio Modal */}
      {shareModalOpen && (
        <SharePortfolioModal
          isOpen={shareModalOpen}
          onClose={() => setShareModalOpen(false)}
          resumeId={resumeId}
          title={title}
          isPublic={resumeRecord.isPublic}
          slug={resumeRecord.slug}
          onUpdate={(isPublic, slug) => {
            setResumeRecord({ ...resumeRecord, isPublic, slug });
          }}
        />
      )}
    </div>
  );
}
