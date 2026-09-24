'use client';

import React from 'react';
import { CertificationItem } from '@/lib/types';
import { Plus, Trash2, Award } from 'lucide-react';

interface Props {
  items: CertificationItem[];
  onChange: (items: CertificationItem[]) => void;
}

export default function CertificationsSection({ items, onChange }: Props) {
  const handleAdd = () => {
    const newItem: CertificationItem = {
      id: 'cert-' + Date.now(),
      name: '',
      issuer: '',
      date: '',
      url: '',
    };
    onChange([...items, newItem]);
  };

  const handleUpdate = (id: string, field: keyof CertificationItem, val: string) => {
    onChange(items.map((c) => (c.id === id ? { ...c, [field]: val } : c)));
  };

  const handleDelete = (id: string) => {
    onChange(items.filter((c) => c.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Certifications & Licenses</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Professional qualifications, online course credentials, or technical certificates.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Certification
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-5 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Award className="w-6 h-6 mx-auto text-slate-400 mb-1" />
          <p className="text-xs text-slate-500">No certifications added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((c) => (
            <div
              key={c.id}
              className="p-3.5 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-2.5 relative"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {c.name || 'Certification Name'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(c.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Certificate Name *</label>
                  <input
                    type="text"
                    placeholder="e.g. Meta Front-End Developer Professional"
                    value={c.name}
                    onChange={(e) => handleUpdate(c.id, 'name', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Date Issued</label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 2024"
                    value={c.date}
                    onChange={(e) => handleUpdate(c.id, 'date', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1 sm:col-span-2">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Issuing Organization</label>
                  <input
                    type="text"
                    placeholder="e.g. Meta via Coursera / AWS"
                    value={c.issuer}
                    onChange={(e) => handleUpdate(c.id, 'issuer', e.target.value)}
                    className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10.5px] font-semibold text-slate-600 dark:text-slate-300">Credential URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={c.url || ''}
                    onChange={(e) => handleUpdate(c.id, 'url', e.target.value)}
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
