'use client';

import React, { useState } from 'react';
import { X, Globe, Copy, Check, QrCode, ExternalLink, ShieldCheck, Lock } from 'lucide-react';
import QRCodeModal from '@/components/common/QRCodeModal';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  resumeId: string;
  title: string;
  isPublic: boolean;
  slug?: string | null;
  onUpdate: (isPublic: boolean, slug: string) => void;
}

export default function SharePortfolioModal({
  isOpen,
  onClose,
  resumeId,
  title,
  isPublic: initialIsPublic,
  slug: initialSlug,
  onUpdate,
}: Props) {
  const [isPublic, setIsPublic] = useState(initialIsPublic);
  const [slug, setSlug] = useState(initialSlug || '');
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [qrOpen, setQrOpen] = useState(false);

  if (!isOpen) return null;

  const appUrl = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';
  const fullUrl = `${appUrl}/p/${slug || 'your-slug'}`;

  const handleSave = async (togglePublic?: boolean) => {
    setLoading(true);
    setError('');
    setSuccessMsg('');
    const targetPublic = togglePublic !== undefined ? togglePublic : isPublic;

    try {
      const res = await fetch(`/api/resumes/${resumeId}/share`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublic: targetPublic, slug: slug.trim() }),
      });
      const data = await res.json();
      if (res.ok) {
        setIsPublic(data.isPublic);
        setSlug(data.slug);
        onUpdate(data.isPublic, data.slug);
        setSuccessMsg(data.message);
      } else {
        setError(data.error || 'Failed to update sharing settings');
      }
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">Resume-to-Portfolio</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">Share as a live interactive portfolio website</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Public / Private Toggle */}
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              {isPublic ? (
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
              ) : (
                <Lock className="w-5 h-5 text-slate-400" />
              )}
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  {isPublic ? 'Portfolio is Public' : 'Portfolio is Private'}
                </span>
                <span className="text-[10.5px] text-slate-500">
                  {isPublic ? 'Anyone with the link or QR code can view' : 'Only you can view this in your dashboard'}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                const nextState = !isPublic;
                setIsPublic(nextState);
                handleSave(nextState);
              }}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                isPublic ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
              }`}
            >
              <span
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  isPublic ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Custom Slug & Link Box */}
          {isPublic && (
            <div className="space-y-3 pt-2">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Custom URL Slug</label>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 select-none">/p/</span>
                  <input
                    type="text"
                    value={slug}
                    onChange={(e) => setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-'))}
                    placeholder="my-portfolio-name"
                    className="flex-1 px-3 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => handleSave()}
                    disabled={loading}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                  >
                    Save Slug
                  </button>
                </div>
              </div>

              {/* Share URL copy bar */}
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                <span className="text-xs text-slate-700 dark:text-slate-300 font-mono truncate flex-1 select-all">
                  {fullUrl}
                </span>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-xs hover:bg-slate-50 transition-colors"
                >
                  {copied ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>

              {/* View QR Code & Live Link Buttons */}
              <div className="flex items-center justify-between pt-2">
                <a
                  href={fullUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  View Live Website <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setQrOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-900 text-white dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  View & Download QR
                </button>
              </div>
            </div>
          )}

          {error && <p className="text-xs text-red-500 font-medium">{error}</p>}
          {successMsg && <p className="text-xs text-emerald-600 font-medium">{successMsg}</p>}
        </div>
      </div>

      {qrOpen && (
        <QRCodeModal
          isOpen={qrOpen}
          onClose={() => setQrOpen(false)}
          title={title}
          url={fullUrl}
        />
      )}
    </>
  );
}
