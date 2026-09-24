'use client';

import React from 'react';
import { ProjectItem } from '@/lib/types';
import { Plus, Trash2, FolderGit2, Globe, Github } from 'lucide-react';

interface Props {
  items: ProjectItem[];
  onChange: (items: ProjectItem[]) => void;
}

export default function ProjectsSection({ items, onChange }: Props) {
  const handleAdd = () => {
    const newProj: ProjectItem = {
      id: 'proj-' + Date.now(),
      title: '',
      description: '',
      technologies: [],
      liveUrl: '',
      githubUrl: '',
    };
    onChange([...items, newProj]);
  };

  const handleUpdate = (id: string, field: keyof ProjectItem, val: any) => {
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
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Featured Projects</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Showcase technical projects, live demos, open-source repositories, or academic works.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 hover:bg-blue-100 dark:bg-blue-950/50 dark:hover:bg-blue-900/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Project
        </button>
      </div>

      {items.length === 0 ? (
        <div className="p-6 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl space-y-2">
          <FolderGit2 className="w-8 h-8 mx-auto text-slate-400" />
          <p className="text-xs text-slate-500">No projects added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add a project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((proj, idx) => (
            <div
              key={proj.id}
              className="p-4 rounded-xl border border-slate-200/90 dark:border-slate-700/80 bg-slate-50/80 dark:bg-slate-850 space-y-3"
            >
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  #{idx + 1} {proj.title || 'Project Name'}
                </span>
                <button
                  type="button"
                  onClick={() => handleDelete(proj.id)}
                  className="p-1 text-slate-400 hover:text-red-500 rounded"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">Project Title *</label>
                  <input
                    type="text"
                    placeholder="e.g. CV Crafter — AI Resume Builder"
                    value={proj.title}
                    onChange={(e) => handleUpdate(proj.id, 'title', e.target.value)}
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Technologies Used (comma separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Next.js 14, TypeScript, Tailwind, Prisma, PostgreSQL"
                    value={proj.technologies?.join(', ') || ''}
                    onChange={(e) =>
                      handleUpdate(
                        proj.id,
                        'technologies',
                        e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                      )
                    }
                    className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Globe className="w-3 h-3 text-blue-500" /> Live Demo URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://myproject.vercel.app"
                      value={proj.liveUrl || ''}
                      onChange={(e) => handleUpdate(proj.id, 'liveUrl', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <Github className="w-3 h-3 text-slate-700 dark:text-slate-300" /> GitHub Repository URL
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. https://github.com/username/repo"
                      value={proj.githubUrl || ''}
                      onChange={(e) => handleUpdate(proj.id, 'githubUrl', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300">
                    Project Description & Impact *
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what the system does, architectural choices, and key outcomes (e.g. Built a high-performance web app with full database persistence, live A4 preview, and automated scoring)."
                    value={proj.description}
                    onChange={(e) => handleUpdate(proj.id, 'description', e.target.value)}
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
