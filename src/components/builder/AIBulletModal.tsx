'use client';

import React, { useState } from 'react';
import { X, Sparkles, Loader2, Check } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  originalBullet: string;
  role?: string;
  onSelect: (enhanced: string) => void;
}

export default function AIBulletModal({ isOpen, onClose, originalBullet, role, onSelect }: Props) {
  const [bullet, setBullet] = useState(originalBullet);
  const [enhanced, setEnhanced] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleEnhance = async () => {
    if (!bullet.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/ai/enhance-bullet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bullet, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setEnhanced(data.enhanced);
      } else {
        setError(data.error || 'Enhancement failed');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">AI Bullet Polisher</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Rewrites with active verbs & quantified impact</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Original Responsibility</label>
            <textarea
              rows={3}
              value={bullet}
              onChange={(e) => setBullet(e.target.value)}
              placeholder="e.g. Worked on the frontend using React and fixed bugs"
              className="w-full p-2.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <button
            type="button"
            onClick={handleEnhance}
            disabled={loading || !bullet.trim()}
            className="w-full py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-sm transition-colors disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Sparkles className="w-4 h-4" />}
            {loading ? 'Polishing with Gemini AI...' : 'Polish Bullet Point'}
          </button>

          {error && <p className="text-xs text-red-500">{error}</p>}

          {enhanced && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
              <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Polished Result</label>
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
                {enhanced}
              </div>
              <button
                type="button"
                onClick={() => {
                  onSelect(enhanced);
                  onClose();
                }}
                className="w-full py-2 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <Check className="w-4 h-4" /> Apply to Resume
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
