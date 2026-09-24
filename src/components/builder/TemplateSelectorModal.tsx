'use client';

import React from 'react';
import { X, Check, Layout } from 'lucide-react';
import { TEMPLATES_CONFIG } from '@/lib/sampleData';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  currentTemplateId: string;
  onSelect: (id: 'modern' | 'minimal' | 'creative' | 'student') => void;
}

export default function TemplateSelectorModal({
  isOpen,
  onClose,
  currentTemplateId,
  onSelect,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Layout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">Choose Resume Template</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Switch templates anytime. Your content is 100% preserved.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
          {TEMPLATES_CONFIG.map((tpl) => {
            const isSelected = currentTemplateId === tpl.id;
            return (
              <div
                key={tpl.id}
                onClick={() => {
                  onSelect(tpl.id as any);
                  onClose();
                }}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all space-y-2 relative ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-slate-600 bg-slate-50/70 dark:bg-slate-800/80'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white">{tpl.name}</span>
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                    {tpl.badge}
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                  {tpl.description}
                </p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[10px] text-slate-400">Standard A4 Layout</span>
                  {isSelected && (
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Selected
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
