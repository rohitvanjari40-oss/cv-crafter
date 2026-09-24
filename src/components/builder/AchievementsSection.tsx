'use client';

import React from 'react';
import { AchievementItem } from '@/lib/types';
import { Plus, Trash2, Trophy } from 'lucide-react';

interface Props {
  items: AchievementItem[];
  onChange: (items: AchievementItem[]) => void;
}

export default function AchievementsSection({ items, onChange }: Props) {
  const handleAdd = () => {
    const newItem: AchievementItem = {
      id: 'ach-' + Date.now(),
      title: '',
      description: '',
      date: '',
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (id: string, field: keyof AchievementItem, val: string) => {
    onChange(items.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Achievements & Awards</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Hackathons, academic dean’s list, scholarships, or competition wins.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Achievement
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-5 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Trophy className="w-6 h-6 mx-auto text-slate-400 mb-1" />
          <p className="text-xs text-slate-500">No achievements added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((a) => (
            <div
              key={a.id}
              className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-2.5"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {a.title || 'Achievement Title'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(a.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Award / Honor Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. 1st Place — Inter-College Hackathon 2025"
                    value={a.title}
                    onChange={(e) => handleUpdate(a.id, 'title', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Date / Year</label>
                  <input
                    type="text"
                    placeholder="e.g. March 2025"
                    value={a.date || ''}
                    onChange={(e) => handleUpdate(a.id, 'date', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-3">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Description</label>
                  <input
                    type="text"
                    placeholder="e.g. Led a team of 4 to design and pitch an automated solution within 36 hours."
                    value={a.description}
                    onChange={(e) => handleUpdate(a.id, 'description', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
