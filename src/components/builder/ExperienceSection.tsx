'use client';

import React, { useState } from 'react';
import { ExperienceItem } from '@/lib/types';
import { Plus, Trash2, Briefcase, Sparkles } from 'lucide-react';
import AIBulletModal from './AIBulletModal';

interface Props {
  items: ExperienceItem[];
  onChange: (items: ExperienceItem[]) => void;
}

export default function ExperienceSection({ items, onChange }: Props) {
  const [activeBulletModal, setActiveBulletModal] = useState<{
    expId: string;
    bulletIndex: number;
    text: string;
    role?: string;
  } | null>(null);

  const handleAddExp = () => {
    const newExp: ExperienceItem = {
      id: 'exp-' + Date.now(),
      position: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      responsibilities: [''],
    };
    onChange([...items, newExp]);
  };

  const handleUpdate = (id: string, field: keyof ExperienceItem, val: any) => {
    onChange(
      items.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  const handleAddBullet = (expId: string) => {
    onChange(
      items.map((it) =>
        it.id === expId ? { ...it, responsibilities: [...it.responsibilities, ''] } : it
      )
    );
  };

  const handleUpdateBullet = (expId: string, idx: number, val: string) => {
    onChange(
      items.map((it) => {
        if (it.id === expId) {
          const resps = [...it.responsibilities];
          resps[idx] = val;
          return { ...it, responsibilities: resps };
        }
        return it;
      })
    );
  };

  const handleDeleteBullet = (expId: string, idx: number) => {
    onChange(
      items.map((it) => {
        if (it.id === expId) {
          const resps = it.responsibilities.filter((_, i) => i !== idx);
          return { ...it, responsibilities: resps.length > 0 ? resps : [''] };
        }
        return it;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Work & Practical Experience</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Full-time jobs, internships, freelance projects, or practical training.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddExp}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Experience
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <Briefcase className="w-8 h-8 mx-auto text-slate-400" />
          <p className="text-xs text-slate-500">No work experience added yet.</p>
          <button
            type="button"
            onClick={handleAddExp}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add experience / internship
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((exp, idx) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  #{idx + 1} {exp.position || 'Role Title'} {exp.company && `at ${exp.company}`}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(exp.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Job Title / Role *</label>
                  <input
                    type="text"
                    placeholder="e.g. Full-Stack Web Intern"
                    value={exp.position}
                    onChange={(e) => handleUpdate(exp.id, 'position', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Company / Organization *</label>
                  <input
                    type="text"
                    placeholder="e.g. TechNovate Labs"
                    value={exp.company}
                    onChange={(e) => handleUpdate(exp.id, 'company', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Start Date</label>
                  <input
                    type="text"
                    placeholder="e.g. May 2025"
                    value={exp.startDate}
                    onChange={(e) => handleUpdate(exp.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">End Date</label>
                    <label className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={exp.current || false}
                        onChange={(e) => handleUpdate(exp.id, 'current', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-0"
                      />
                      Current Job
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Aug 2025"
                    disabled={exp.current}
                    value={exp.current ? 'Present' : exp.endDate}
                    onChange={(e) => handleUpdate(exp.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore (Hybrid)"
                    value={exp.location || ''}
                    onChange={(e) => handleUpdate(exp.id, 'location', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Responsibilities bullets */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Key Achievements & Responsibilities
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddBullet(exp.id)}
                    className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    + Add bullet point
                  </button>
                </div>

                <div className="space-y-2">
                  {exp.responsibilities.map((resp, bIdx) => (
                    <div key={bIdx} className="flex items-start gap-2">
                      <span className="text-slate-400 mt-2 text-xs">•</span>
                      <textarea
                        rows={2}
                        placeholder="Action verb + context + quantified outcome (e.g. Developed dashboard components using React, improving user engagement by 22%)"
                        value={resp}
                        onChange={(e) => handleUpdateBullet(exp.id, bIdx, e.target.value)}
                        className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setActiveBulletModal({
                            expId: exp.id,
                            bulletIndex: bIdx,
                            text: resp,
                            role: exp.position,
                          })
                        }
                        className="p-1.5 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded transition-colors"
                        title="Enhance with AI"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteBullet(exp.id, bIdx)}
                        className="p-1.5 text-slate-400 hover:text-red-500 rounded transition-colors"
                        title="Delete bullet"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeBulletModal && (
        <AIBulletModal
          isOpen={true}
          onClose={() => setActiveBulletModal(null)}
          originalBullet={activeBulletModal.text}
          role={activeBulletModal.role}
          onSelect={(enhanced) => {
            handleUpdateBullet(activeBulletModal.expId, activeBulletModal.bulletIndex, enhanced);
          }}
        />
      )}
    </div>
  );
}
