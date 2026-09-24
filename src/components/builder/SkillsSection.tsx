'use client';

import React, { useState } from 'react';
import { SkillCategory } from '@/lib/types';
import { Plus, Trash2, X, Sparkles } from 'lucide-react';
import { suggestSkillsForRole } from '@/lib/gemini';

interface Props {
  categories: SkillCategory[];
  onChange: (categories: SkillCategory[]) => void;
}

export default function SkillsSection({ categories, onChange }: Props) {
  const [newSkillInput, setNewSkillInput] = useState<{ [catId: string]: string }>({});

  const handleAddCategory = () => {
    const newCat: SkillCategory = {
      id: 'cat-' + Date.now(),
      name: 'New Skill Category',
      skills: [],
    };
    onChange([...categories, newCat]);
  };

  const handleRemoveCategory = (catId: string) => {
    onChange(categories.filter((c) => c.id !== catId));
  };

  const handleUpdateCatName = (catId: string, name: string) => {
    onChange(categories.map((c) => (c.id === catId ? { ...c, name } : c)));
  };

  const handleAddSkill = (catId: string) => {
    const text = (newSkillInput[catId] || '').trim();
    if (!text) return;

    onChange(
      categories.map((c) => {
        if (c.id === catId) {
          // split commas if entered multiple
          const skillsToAdd = text.split(',').map((s) => s.trim()).filter(Boolean);
          const currentSkills = new Set(c.skills);
          skillsToAdd.forEach((s) => currentSkills.add(s));
          return { ...c, skills: Array.from(currentSkills) };
        }
        return c;
      })
    );
    setNewSkillInput({ ...newSkillInput, [catId]: '' });
  };

  const handleRemoveSkill = (catId: string, skillToRemove: string) => {
    onChange(
      categories.map((c) =>
        c.id === catId ? { ...c, skills: c.skills.filter((s) => s !== skillToRemove) } : c
      )
    );
  };

  const handleQuickAddSuggestions = async (catId: string, role: string) => {
    const suggestions = await suggestSkillsForRole(role);
    onChange(
      categories.map((c) => {
        if (c.id === catId) {
          const combined = new Set([...c.skills, ...suggestions.slice(0, 6)]);
          return { ...c, skills: Array.from(combined) };
        }
        return c;
      })
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Skills & Competencies</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Categorize your technical proficiencies, tools, and interpersonal skills.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAddCategory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Category
        </button>
      </div>

      <div className="space-y-4">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-3"
          >
            <div className="flex items-center justify-between gap-2">
              <input
                type="text"
                value={cat.name}
                onChange={(e) => handleUpdateCatName(cat.id, e.target.value)}
                className="font-bold text-xs text-slate-800 dark:text-slate-200 bg-transparent border-b border-dashed border-slate-300 dark:border-slate-700 px-1 py-0.5 focus:outline-none focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => handleRemoveCategory(cat.id)}
                className="p-1 text-slate-400 hover:text-red-500 rounded"
                title="Remove Category"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Quick Suggestions */}
            <div className="flex flex-wrap items-center gap-1.5 text-[10px] text-slate-500">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Auto-suggest:
              </span>
              <button
                type="button"
                onClick={() => handleQuickAddSuggestions(cat.id, 'Frontend')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 transition-colors"
              >
                + Frontend
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddSuggestions(cat.id, 'Backend')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 transition-colors"
              >
                + Backend
              </button>
              <button
                type="button"
                onClick={() => handleQuickAddSuggestions(cat.id, 'Python')}
                className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 transition-colors"
              >
                + Python
              </button>
            </div>

            {/* Existing Skills Chips */}
            <div className="flex flex-wrap gap-1.5 min-h-[32px] p-2 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-100 dark:border-slate-800">
              {cat.skills.length === 0 ? (
                <span className="text-[10.5px] text-slate-400 italic">No skills added in this group yet.</span>
              ) : (
                cat.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-200 shadow-xs"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(cat.id, skill)}
                      className="text-slate-400 hover:text-red-500 ml-0.5"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))
              )}
            </div>

            {/* Add Skill Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type skill and press Add (e.g. Next.js, Docker, Prisma)"
                value={newSkillInput[cat.id] || ''}
                onChange={(e) => setNewSkillInput({ ...newSkillInput, [cat.id]: e.target.value })}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill(cat.id);
                  }
                }}
                className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => handleAddSkill(cat.id)}
                className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-800 text-white hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
              >
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
