'use client';

import React from 'react';
import { CustomSection as CustomSecType, CustomSectionItem } from '@/lib/types';
import { Plus, Trash2, Layers } from 'lucide-react';

interface Props {
  sections: CustomSecType[];
  onChange: (sections: CustomSecType[]) => void;
}

export default function CustomSection({ sections, onChange }: Props) {
  const handleAddSection = () => {
    const newSec: CustomSecType = {
      id: 'cust-' + Date.now(),
      heading: 'Custom Section Heading',
      items: [
        {
          id: 'cust-item-' + Date.now(),
          title: '',
          subtitle: '',
          date: '',
          description: '',
        },
      ],
    };
    onChange([...sections, newSec]);
  };

  const handleRemoveSection = (secId: string) => {
    onChange(sections.filter((s) => s.id !== secId));
  };

  const handleUpdateHeading = (secId: string, heading: string) => {
    onChange(sections.map((s) => (s.id === secId ? { ...s, heading } : s)));
  };

  const handleAddItem = (secId: string) => {
    onChange(
      sections.map((s) => {
        if (s.id === secId) {
          const newItem: CustomSectionItem = {
            id: 'item-' + Date.now(),
            title: '',
            subtitle: '',
            date: '',
            description: '',
          };
          return { ...s, items: [...s.items, newItem] };
        }
        return s;
      })
    );
  };

  const handleUpdateItem = (secId: string, itemId: string, field: keyof CustomSectionItem, val: string) => {
    onChange(
      sections.map((s) => {
        if (s.id === secId) {
          return {
            ...s,
            items: s.items.map((it) => (it.id === itemId ? { ...it, [field]: val } : it)),
          };
        }
        return s;
      })
    );
  };

  const handleDeleteItem = (secId: string, itemId: string) => {
    onChange(
      sections.map((s) => {
        if (s.id === secId) {
          return {
            ...s,
            items: s.items.filter((it) => it.id !== itemId),
          };
        }
        return s;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Custom Sections</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Add custom categories like Volunteer Work, Publications, or Leadership Roles.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddSection}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Section
        </button>
      </div>

      {sections.length === 0 ? (
        <div className="p-5 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl">
          <Layers className="w-6 h-6 mx-auto text-slate-400 mb-1" />
          <p className="text-xs text-slate-500">No custom sections added.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {sections.map((sec) => (
            <div
              key={sec.id}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-3"
            >
              <div className="flex items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2">
                <input
                  type="text"
                  value={sec.heading}
                  onChange={(e) => handleUpdateHeading(sec.id, e.target.value)}
                  placeholder="Section Title (e.g. Volunteer Experience)"
                  className="font-bold text-xs text-slate-800 dark:text-slate-200 bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 px-1 py-0.5 focus:outline-none focus:border-blue-500 flex-1"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSection(sec.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded"
                  title="Remove Section"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                {sec.items.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-lg border border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 space-y-2 relative"
                  >
                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={() => handleDeleteItem(sec.id, item.id)}
                        className="text-slate-400 hover:text-red-500 text-xs"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <div className="space-y-1 sm:col-span-2">
                        <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Title / Role</label>
                        <input
                          type="text"
                          placeholder="e.g. Technical Lead"
                          value={item.title}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, 'title', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Date / Year</label>
                        <input
                          type="text"
                          placeholder="e.g. 2024 - 2025"
                          value={item.date || ''}
                          onChange={(e) => handleUpdateItem(sec.id, item.id, 'date', e.target.value)}
                          className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-semibold text-slate-600 dark:text-slate-400">Description</label>
                      <textarea
                        rows={2}
                        placeholder="Details of your responsibilities or activities..."
                        value={item.description || ''}
                        onChange={(e) => handleUpdateItem(sec.id, item.id, 'description', e.target.value)}
                        className="w-full px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={() => handleAddItem(sec.id)}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3 h-3" /> Add Item to {sec.heading}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
