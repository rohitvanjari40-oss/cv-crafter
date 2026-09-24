'use client';

import React from 'react';
import { PersonalDetails } from '@/lib/types';
import { User, Briefcase, Mail, Phone, MapPin, Linkedin, Github, Globe, Image as ImageIcon } from 'lucide-react';

interface Props {
  data: PersonalDetails;
  onChange: (updated: PersonalDetails) => void;
}

export default function PersonalInfoSection({ data, onChange }: Props) {
  const handleChange = (field: keyof PersonalDetails, val: string) => {
    onChange({ ...data, [field]: val });
  };

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Personal Information</h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Recruiters and hiring managers use this information to contact you.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <User className="w-3.5 h-3.5 text-blue-500" /> Full Name *
          </label>
          <input
            type="text"
            placeholder="e.g. Rohit Sharma"
            value={data.fullName || ''}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Professional Title */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-blue-500" /> Job Title / Target Role *
          </label>
          <input
            type="text"
            placeholder="e.g. Full-Stack Software Developer"
            value={data.jobTitle || ''}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-blue-500" /> Email Address *
          </label>
          <input
            type="email"
            placeholder="e.g. rohit.sharma@example.com"
            value={data.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Phone */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-blue-500" /> Phone Number
          </label>
          <input
            type="text"
            placeholder="e.g. +91 98765 43210"
            value={data.phone || ''}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Location */}
        <div className="space-y-1 sm:col-span-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-500" /> Location (City, Country)
          </label>
          <input
            type="text"
            placeholder="e.g. Bangalore, Karnataka, India"
            value={data.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* LinkedIn */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-blue-500" /> LinkedIn Profile URL
          </label>
          <input
            type="text"
            placeholder="e.g. linkedin.com/in/rohit-sharma"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* GitHub */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Github className="w-3.5 h-3.5 text-blue-500" /> GitHub URL
          </label>
          <input
            type="text"
            placeholder="e.g. github.com/rohitsharma"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Portfolio Website */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-blue-500" /> Personal Portfolio URL
          </label>
          <input
            type="text"
            placeholder="e.g. rohitsharma.dev"
            value={data.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Profile Photo URL */}
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-blue-500" /> Photo URL (Optional)
          </label>
          <input
            type="text"
            placeholder="e.g. https://... or leave empty"
            value={data.photoUrl || ''}
            onChange={(e) => handleChange('photoUrl', e.target.value)}
            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>
    </div>
  );
}
