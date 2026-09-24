'use client';

import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import AISummaryModal from './AISummaryModal';

interface Props {
  summary: string;
  jobTitle: string;
  onChange: (val: string) => void;
}

export default function SummarySection({ summary, jobTitle, onChange }: Props) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Professional Summary</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            A punchy 3-4 sentence elevator pitch showcasing your core strengths.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-sm hover:from-blue-700 hover:to-indigo-700 transition-all self-start sm:self-auto"
        >
          <Sparkles className="w-3.5 h-3.5" />
          AI Summary Writer
        </button>
      </div>

      <div className="relative">
        <textarea
          rows={5}
          placeholder="e.g. Dedicated and detail-oriented BCA graduate with strong foundations in React.js, Next.js, and relational database systems..."
          value={summary || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
        />
        <div className="flex justify-between items-center text-[10.5px] text-slate-500 dark:text-slate-400 mt-1">
          <span>Target: 200 - 400 characters</span>
          <span className={summary.length > 500 ? 'text-amber-500 font-semibold' : ''}>
            {summary.length} characters
          </span>
        </div>
      </div>

      {modalOpen && (
        <AISummaryModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          defaultJobTitle={jobTitle}
          onSelect={(newSummary) => {
            onChange(newSummary);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
}
