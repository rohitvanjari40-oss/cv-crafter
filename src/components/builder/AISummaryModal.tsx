'use client';

import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check, Key, HelpCircle, CheckCircle2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultJobTitle: string;
  onSelect: (summary: string) => void;
}

interface SummaryMeta {
  source?: 'gemini' | 'template';
  isAi?: boolean;
  modelUsed?: string;
  notice?: string;
}

export default function AISummaryModal({ isOpen, onClose, defaultJobTitle, onSelect }: Props) {
  const [jobTitle, setJobTitle] = useState(defaultJobTitle || 'Software Engineer');
  const [level, setLevel] = useState<'student' | 'fresher' | 'mid' | 'senior'>('fresher');
  const [generatedText, setGeneratedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState<SummaryMeta | null>(null);
  const [showConfigHelp, setShowConfigHelp] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    if (loading) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/summary', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobTitle: jobTitle.trim(), experienceLevel: level }),
      });
      const data = await res.json();
      if (res.ok && data.summary) {
        setGeneratedText(data.summary);
        setMeta({
          source: data.source,
          isAi: data.isAi,
          modelUsed: data.modelUsed,
          notice: data.notice,
        });
      } else {
        setError(data.error || 'Failed to generate summary. Please check connection.');
      }
    } catch {
      setError('Network error connecting to API route. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4 text-slate-900 dark:text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                AI Summary Writer
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-blue-100 text-blue-700 dark:bg-blue-900/60 dark:text-blue-300 uppercase">
                  Gemini
                </span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Generate high-converting elevator pitches tailored to your role
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Input Parameters */}
        <div className="space-y-3.5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Target Role / Job Title</label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. BCA Graduate / Full-Stack Developer"
              className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Experience Tier</label>
            <div className="grid grid-cols-4 gap-2">
              {(['student', 'fresher', 'mid', 'senior'] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setLevel(t)}
                  className={`py-1.5 text-xs font-medium rounded-lg border capitalize transition-all ${
                    level === t
                      ? 'bg-blue-50 dark:bg-blue-950/60 border-blue-600 text-blue-700 dark:text-blue-300 font-bold shadow-xs'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Action Button */}
          <button
            type="button"
            onClick={handleGenerate}
            disabled={loading}
            className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Crafting Summary with Gemini AI...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Generate Professional Summary</span>
              </>
            )}
          </button>

          {error && (
            <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-600 dark:text-red-400 font-medium">
              {error}
            </div>
          )}

          {/* Generated Result Card */}
          {generatedText && (
            <div className="space-y-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Generated Summary Preview</label>
                
                {/* Source status badge */}
                {meta?.isAi ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10.5px] font-bold text-emerald-700 dark:text-emerald-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    Gemini AI ({meta.modelUsed || 'gemini-2.5-flash'})
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-[10.5px] font-bold text-amber-800 dark:text-amber-300">
                    <Check className="w-3 h-3 text-amber-500" />
                    Curated Template
                  </span>
                )}
              </div>

              {meta?.notice && (
                <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 leading-normal">
                  💡 {meta.notice}
                </div>
              )}

              <textarea
                rows={4}
                value={generatedText}
                onChange={(e) => setGeneratedText(e.target.value)}
                className="w-full p-3 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 leading-relaxed font-sans"
              />

              <button
                type="button"
                onClick={() => onSelect(generatedText)}
                className="w-full py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
              >
                <Check className="w-4 h-4" /> Use This Summary in Resume
              </button>
            </div>
          )}

          {/* API Key configuration hint */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setShowConfigHelp(!showConfigHelp)}
              className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>How to connect your free Gemini API Key</span>
            </button>

            {showConfigHelp && (
              <div className="mt-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 text-[11px] text-slate-600 dark:text-slate-300 space-y-1.5">
                <p className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                  <Key className="w-3.5 h-3.5 text-blue-500" /> Setup Instructions:
                </p>
                <ol className="list-decimal list-inside space-y-1 pl-1">
                  <li>Get a free key from <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 underline font-semibold">Google AI Studio</a>.</li>
                  <li>Open the <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono text-[10px]">.env</code> file in your CV Crafter project root.</li>
                  <li>Set <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded font-mono text-[10px]">GEMINI_API_KEY=&quot;your_key_here&quot;</code>.</li>
                  <li>Restart the server. All AI summary and bullet features will use live Gemini generation.</li>
                </ol>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
