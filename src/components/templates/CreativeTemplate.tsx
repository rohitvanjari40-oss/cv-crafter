import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Sparkles, ExternalLink, Award } from 'lucide-react';

export default function CreativeTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, settings } = data;
  const accent = settings?.accentColor || '#7c3aed'; // Purple / Indigo default for creative

  return (
    <div className="w-full bg-white text-slate-800 font-sans min-h-[297mm] text-xs leading-normal print:text-black">
      {/* Header Banner */}
      <div
        className="p-8 text-white relative overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${accent} 0%, #1e1b4b 100%)`,
        }}
      >
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          {personal.photoUrl && (
            <img
              src={personal.photoUrl}
              alt={personal.fullName || 'Avatar'}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-white/30 shadow-lg"
            />
          )}
          <div className="space-y-1.5 text-center md:text-left flex-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-[10px] font-semibold tracking-wide backdrop-blur-sm">
              <Sparkles className="w-3 h-3" /> Creative Portfolio Resume
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">{personal.fullName || 'Your Full Name'}</h1>
            <p className="text-sm font-medium text-white/90">{personal.jobTitle || 'Professional Title'}</p>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-[10px] text-white/80">
              {personal.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3 h-3" /> {personal.email}
                </span>
              )}
              {personal.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3" /> {personal.phone}
                </span>
              )}
              {personal.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" /> {personal.location}
                </span>
              )}
              {personal.github && (
                <span className="flex items-center gap-1">
                  <Github className="w-3 h-3" /> {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
              {personal.portfolio && (
                <span className="flex items-center gap-1">
                  <Globe className="w-3 h-3" /> {personal.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-8 space-y-6">
        {/* Summary Card */}
        {summary && (
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 page-break-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-1" style={{ color: accent }}>
              About & Value Proposition
            </h3>
            <p className="text-[11px] text-slate-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* 2-Column Body Layout */}
        <div className="grid grid-cols-12 gap-6">
          {/* Main Experience & Projects (8 cols) */}
          <div className="col-span-8 space-y-6">
            {/* Experience with timeline */}
            {experience && experience.length > 0 && (
              <div className="space-y-3 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Experience
                </h3>
                <div className="border-l-2 border-slate-200 pl-4 space-y-4">
                  {experience.map((exp) => (
                    <div key={exp.id} className="relative space-y-1">
                      <div
                        className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-white border-2"
                        style={{ borderColor: accent }}
                      />
                      <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                        <span>{exp.position}</span>
                        <span className="text-[10px] text-slate-500 font-normal">
                          {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[10.5px] font-semibold text-slate-600">{exp.company} {exp.location && `• ${exp.location}`}</div>
                      {exp.responsibilities && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[10.5px] text-slate-700 pt-0.5">
                          {exp.responsibilities.map((r, i) => (
                            <li key={i} className="leading-snug">{r}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Featured Projects with modern cards */}
            {projects && projects.length > 0 && (
              <div className="space-y-3 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Featured Works & Projects
                </h3>
                <div className="grid grid-cols-1 gap-3">
                  {projects.map((proj) => (
                    <div key={proj.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[11.5px] text-slate-900">{proj.title}</span>
                        <div className="flex items-center gap-2 text-[10px]">
                          {proj.liveUrl && (
                            <span className="font-semibold text-blue-600 flex items-center gap-0.5">
                              Live <ExternalLink className="w-2.5 h-2.5" />
                            </span>
                          )}
                          {proj.githubUrl && (
                            <span className="font-semibold text-slate-700 flex items-center gap-0.5">
                              Code <Github className="w-2.5 h-2.5" />
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[10.5px] text-slate-700 leading-snug">{proj.description}</p>
                      {proj.technologies && (
                        <div className="flex flex-wrap gap-1 pt-1">
                          {proj.technologies.map((t, i) => (
                            <span
                              key={i}
                              className="text-[9px] font-medium px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar: Skills, Education, Achievements (4 cols) */}
          <div className="col-span-4 space-y-5">
            {/* Skills with colored chips */}
            {skills && skills.length > 0 && (
              <div className="space-y-2.5 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Skills & Tools
                </h3>
                <div className="space-y-3">
                  {skills.map((cat) => (
                    <div key={cat.id} className="space-y-1">
                      <span className="text-[10px] font-bold uppercase text-slate-500 tracking-wider block">
                        {cat.name}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {cat.skills.map((s, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 rounded-md text-[9.5px] font-semibold text-white shadow-xs"
                            style={{ backgroundColor: accent }}
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Education */}
            {education && education.length > 0 && (
              <div className="space-y-2.5 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Education
                </h3>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                      <p className="font-bold text-[11px] text-slate-900">{edu.degree}</p>
                      <p className="text-[10px] text-slate-600 font-medium">{edu.institution}</p>
                      <div className="flex justify-between text-[9.5px] text-slate-500">
                        <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                        {edu.grade && <span className="font-bold text-slate-800">{edu.grade}</span>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements */}
            {achievements && achievements.length > 0 && (
              <div className="space-y-2 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Achievements
                </h3>
                <div className="space-y-1.5">
                  {achievements.map((a) => (
                    <div key={a.id} className="text-[10px] space-y-0.5">
                      <p className="font-bold text-slate-900 flex items-center gap-1">
                        <Award className="w-3 h-3 text-amber-500" />
                        {a.title}
                      </p>
                      <p className="text-slate-600 text-[9.5px]">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <div className="space-y-2 page-break-avoid">
                <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
                  Certifications
                </h3>
                <div className="space-y-1 text-[10px]">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-bold text-slate-900">{c.name}</span>
                      <p className="text-[9.5px] text-slate-500">{c.issuer} ({c.date})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <div key={sec.id} className="space-y-2 page-break-avoid">
            <h3 className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200" style={{ color: accent }}>
              {sec.heading}
            </h3>
            <div className="grid grid-cols-2 gap-3">
              {sec.items.map((item) => (
                <div key={item.id} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 space-y-0.5">
                  <div className="flex justify-between text-[10.5px] font-bold text-slate-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[9.5px] font-normal text-slate-500">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-[10px] text-slate-700">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
