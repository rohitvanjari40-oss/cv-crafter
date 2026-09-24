'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  Users,
  FileText,
  Globe,
  Activity,
  ArrowLeft,
  Loader2,
  Server,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/common/Navbar';
import Footer from '@/components/common/Footer';

interface AdminStats {
  totalUsers: number;
  totalResumes: number;
  publicPortfolios: number;
  templates: { templateId: string; count: number }[];
  recentUsers: { id: string; name: string; email: string; role: string; createdAt: string }[];
  recentResumes: {
    id: string;
    title: string;
    templateId: string;
    isPublic: boolean;
    updatedAt: string;
    user: { name: string; email: string };
  }[];
}

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch('/api/admin/stats');
        if (res.status === 401 || res.status === 403) {
          router.push('/dashboard');
          return;
        }
        if (res.ok) {
          const data = await res.json();
          setStats(data);
        } else {
          setError('Failed to load admin statistics.');
        }
      } catch {
        setError('Network error');
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to User Dashboard
          </Link>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-bold">
            <Shield className="w-3.5 h-3.5" /> Admin Portal
          </span>
        </div>

        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-2 shadow-xl border border-slate-800">
          <h1 className="text-2xl sm:text-3xl font-black">CV Crafter Platform Administration</h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
            Real-time telemetry, database metrics, user account audit logs, and template popularity.
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl bg-red-50 text-red-600 text-xs border border-red-200">
            {error}
          </div>
        )}

        {stats && (
          <div className="space-y-8 animate-fade-in">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Total Registered Users</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    {stats.totalUsers}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 flex items-center justify-center">
                  <Users className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Total Resumes Created</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    {stats.totalResumes}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Live Public Portfolios</span>
                  <span className="text-2xl font-black text-slate-900 dark:text-white mt-1 block">
                    {stats.publicPortfolios}
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                  <Globe className="w-5 h-5" />
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-slate-500 block">Database Status</span>
                  <span className="text-xs font-bold text-emerald-600 flex items-center gap-1 mt-2">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Healthy (Prisma Connected)
                  </span>
                </div>
                <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Server className="w-5 h-5" />
                </div>
              </div>
            </div>

            {/* Template Popularity & System Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Templates usage */}
              <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-500" /> Template Adoption Breakdown
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {['modern', 'minimal', 'creative', 'student'].map((tplId) => {
                    const match = stats.templates.find((t) => t.templateId === tplId);
                    const count = match ? match.count : 0;
                    return (
                      <div
                        key={tplId}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-center space-y-1"
                      >
                        <span className="text-xs font-bold capitalize text-slate-800 dark:text-slate-200 block">
                          {tplId}
                        </span>
                        <span className="text-xl font-black text-blue-600 dark:text-blue-400 block">
                          {count}
                        </span>
                        <span className="text-[10px] text-slate-400">resumes</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* System Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-3 text-xs">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-indigo-500" /> College Project Specs
                </h3>
                <div className="space-y-2 text-slate-600 dark:text-slate-400">
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>Full-Stack Framework:</span>
                    <span className="font-bold text-slate-900 dark:text-white">Next.js 14 (App Router)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>Database ORM:</span>
                    <span className="font-bold text-slate-900 dark:text-white">Prisma Client v5</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>AI Engine:</span>
                    <span className="font-bold text-blue-600">Gemini 3.8 Flash / Algorithmic</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                    <span>Authentication:</span>
                    <span className="font-bold text-slate-900 dark:text-white">JWT (HTTP-only Cookies)</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span>Password Security:</span>
                    <span className="font-bold text-emerald-600">bcrypt (Salt rounds 10)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Audit Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Users */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Users</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">Name</th>
                        <th className="pb-2">Email</th>
                        <th className="pb-2">Role</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {stats.recentUsers.map((u) => (
                        <tr key={u.id} className="py-2">
                          <td className="py-2 font-medium text-slate-900 dark:text-white">{u.name}</td>
                          <td className="py-2 text-slate-500">{u.email}</td>
                          <td className="py-2">
                            <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-bold">
                              {u.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Recent Resumes */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Recent Resumes</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-semibold">
                        <th className="pb-2">Title</th>
                        <th className="pb-2">Author</th>
                        <th className="pb-2">Template</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {stats.recentResumes.map((r) => (
                        <tr key={r.id}>
                          <td className="py-2 font-medium text-slate-900 dark:text-white truncate max-w-[150px]">
                            {r.title}
                          </td>
                          <td className="py-2 text-slate-500">{r.user.name}</td>
                          <td className="py-2 capitalize font-semibold text-blue-600">{r.templateId}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
