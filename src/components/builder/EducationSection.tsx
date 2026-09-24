'use client';

import React from 'react';
import { EducationItem } from '@/lib/types';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

interface Props {
  items: EducationItem[];
  onChange: (items: EducationItem[]) => void;
}

export default function EducationSection({ items, onChange }: Props) {
  const handleAdd = () => {
    const newItem: EducationItem = {
      id: 'edu-' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      grade: '',
      description: '',
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (id: string, field: keyof EducationItem, val: any) => {
    onChange(
      items.map((it) => (it.id === id ? { ...it, [field]: val } : it))
    );
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((it) => it.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Education & Qualifications</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Degrees, academic background, and relevant college coursework.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Degree
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <GraduationCap className="w-8 h-8 mx-auto text-slate-400" />
          <p className="text-xs text-slate-500">No education entries added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add your first education entry
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {items.map((edu, idx) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-3 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  #{idx + 1} {edu.degree || 'Degree Title'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(edu.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Degree / Qualification *</label>
                  <input
                    type="text"
                    placeholder="e.g. Bachelor of Computer Applications (BCA)"
                    value={edu.degree}
                    onChange={(e) => handleUpdate(edu.id, 'degree', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">College / Institution *</label>
                  <input
                    type="text"
                    placeholder="e.g. Apex Institute of Technology & Management"
                    value={edu.institution}
                    onChange={(e) => handleUpdate(edu.id, 'institution', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Start Year/Date</label>
                  <input
                    type="text"
                    placeholder="e.g. 2023"
                    value={edu.startDate}
                    onChange={(e) => handleUpdate(edu.id, 'startDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">End Year/Date</label>
                    <label className="text-[10px] text-slate-500 flex items-center gap-1 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={edu.current || false}
                        onChange={(e) => handleUpdate(edu.id, 'current', e.target.checked)}
                        className="rounded border-slate-300 text-blue-600 focus:ring-0"
                      />
                      Present
                    </label>
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. 2026"
                    disabled={edu.current}
                    value={edu.current ? 'Present' : edu.endDate}
                    onChange={(e) => handleUpdate(edu.id, 'endDate', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:opacity-50"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Grade / CGPA / Percentage</label>
                  <input
                    type="text"
                    placeholder="e.g. 8.8 CGPA or 91%"
                    value={edu.grade || ''}
                    onChange={(e) => handleUpdate(edu.id, 'grade', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Location (City)</label>
                  <input
                    type="text"
                    placeholder="e.g. Bangalore, India"
                    value={edu.location || ''}
                    onChange={(e) => handleUpdate(edu.id, 'location', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Core Coursework & Honors (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Data Structures, DBMS, Web Architectures, Software Engineering."
                    value={edu.description || ''}
                    onChange={(e) => handleUpdate(edu.id, 'description', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
