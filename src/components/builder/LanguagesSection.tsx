'use client';

import React from 'react';
import { LanguageItem } from '@/lib/types';
import { Plus, Trash2, Languages } from 'lucide-react';

interface Props {
  items: LanguageItem[];
  onChange: (items: LanguageItem[]) => void;
}

export default function LanguagesSection({ items, onChange }: Props) {
  const handleAdd = () => {
    const newItem: LanguageItem = {
      id: 'lang-' + Date.now(),
      name: '',
      proficiency: 'Fluent',
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (id: string, field: keyof LanguageItem, val: any) => {
    onChange(items.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((l) => l.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Languages</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Languages spoken and level of professional proficiency.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Language
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-5 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Languages className="w-6 h-6 mx-auto text-slate-400 mb-1" />
          <p className="text-xs text-slate-500">No languages added yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {items.map((l) => (
            <div
              key={l.id}
              className="p-3 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 flex items-center gap-2"
            >
              <input
                type="text"
                placeholder="e.g. English"
                value={l.name}
                onChange={(e) => handleUpdate(l.id, 'name', e.target.value)}
                className="flex-1 px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <select
                value={l.proficiency}
                onChange={(e) => handleUpdate(l.id, 'proficiency', e.target.value)}
                className="px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                <option value="Native">Native</option>
                <option value="Fluent">Fluent</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Basic">Basic</option>
              </select>
              <button
                type="button"
                onClick={() => handleDelete(l.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
