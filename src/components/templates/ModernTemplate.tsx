import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Globe, Github, Award, ExternalLink } from 'lucide-react';

export default function ModernTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, settings } = data;
  const accent = settings?.accentColor || '#2563eb';

  return (
    <div className="w-full bg-white text-slate-800 font-sans text-xs leading-relaxed print:text-black">
      {/* 2-Column Grid */}
      <div className="grid grid-cols-12 min-h-[297mm]">
        {/* Left Sidebar (4 cols) */}
        <div className="col-span-4 bg-slate-50 print:bg-slate-50 p-6 border-r border-slate-200 space-y-6">
          {/* Avatar if exists */}
          {personal.photoUrl && (
            <div className="flex justify-center">
              <img
                src={personal.photoUrl}
                alt={personal.fullName || 'Profile'}
                className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-sm"
              />
            </div>
          )}

          {/* Contact Details */}
          <div className="space-y-2.5">
            <h3
              className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
              style={{ color: accent }}
            >
              Contact
            </h3>
            <div className="space-y-1.5 text-[10.5px] text-slate-600">
              {personal.email && (
                <div className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.email}</span>
                </div>
              )}
              {personal.phone && (
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.phone}</span>
                </div>
              )}
              {personal.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.location}</span>
                </div>
              )}
              {personal.linkedin && (
                <div className="flex items-center gap-2 break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
              {personal.github && (
                <div className="flex items-center gap-2 break-all">
                  <Github className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.github.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
              {personal.portfolio && (
                <div className="flex items-center gap-2 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 text-slate-400" />
                  <span>{personal.portfolio.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </div>
              )}
            </div>
          </div>

          {/* Skills */}
          {skills && skills.length > 0 && (
            <div className="space-y-3">
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Skills
              </h3>
              <div className="space-y-2.5">
                {skills.map((cat) => (
                  <div key={cat.id} className="space-y-1">
                    <span className="font-semibold text-[10px] text-slate-700 uppercase tracking-tight block">
                      {cat.name}
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {cat.skills.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-1.5 py-0.5 rounded bg-white border border-slate-200 text-[9.5px] font-medium text-slate-700"
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

          {/* Education in sidebar */}
          {education && education.length > 0 && (
            <div className="space-y-3 page-break-avoid">
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Education
              </h3>
              <div className="space-y-2.5">
                {education.map((edu) => (
                  <div key={edu.id} className="space-y-0.5">
                    <p className="font-bold text-[10.5px] text-slate-900">{edu.degree}</p>
                    <p className="text-[10px] text-slate-600 font-medium">{edu.institution}</p>
                    <div className="flex justify-between text-[9.5px] text-slate-500">
                      <span>{edu.startDate} - {edu.current ? 'Present' : edu.endDate}</span>
                      {edu.grade && <span className="font-semibold text-slate-700">{edu.grade}</span>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="space-y-2 page-break-avoid">
              <h3
                className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Languages
              </h3>
              <div className="space-y-1 text-[10px]">
                {languages.map((l) => (
                  <div key={l.id} className="flex justify-between text-slate-700">
                    <span className="font-medium">{l.name}</span>
                    <span className="text-slate-500">{l.proficiency}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Main Column (8 cols) */}
        <div className="col-span-8 p-7 space-y-5">
          {/* Header */}
          <div className="space-y-1 pb-4 border-b border-slate-200">
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              {personal.fullName || 'Your Full Name'}
            </h1>
            <p className="text-sm font-semibold tracking-wide" style={{ color: accent }}>
              {personal.jobTitle || 'Professional Job Title'}
            </p>
          </div>

          {/* Professional Summary */}
          {summary && (
            <div className="space-y-1.5 page-break-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Professional Summary
              </h2>
              <p className="text-[11px] text-slate-700 leading-relaxed text-justify">{summary}</p>
            </div>
          )}

          {/* Work Experience */}
          {experience && experience.length > 0 && (
            <div className="space-y-3.5 page-break-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Work Experience
              </h2>
              <div className="space-y-3">
                {experience.map((exp) => (
                  <div key={exp.id} className="space-y-1">
                    <div className="flex justify-between items-baseline">
                      <h4 className="font-bold text-xs text-slate-900">{exp.position}</h4>
                      <span className="text-[10px] text-slate-500 font-medium">
                        {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10.5px] text-slate-600 font-medium">
                      <span>{exp.company}</span>
                      {exp.location && <span>{exp.location}</span>}
                    </div>
                    {exp.responsibilities && exp.responsibilities.length > 0 && (
                      <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[10.5px] text-slate-700 pt-0.5">
                        {exp.responsibilities.map((resp, idx) => (
                          <li key={idx} className="leading-snug">{resp}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <div className="space-y-3 page-break-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                Featured Projects
              </h2>
              <div className="space-y-2.5">
                {projects.map((proj) => (
                  <div key={proj.id} className="space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[11.5px] text-slate-900">{proj.title}</span>
                      <div className="flex items-center gap-2 text-[10px]">
                        {proj.liveUrl && (
                          <span className="text-blue-600 font-medium flex items-center gap-0.5">
                            Demo <ExternalLink className="w-2.5 h-2.5" />
                          </span>
                        )}
                        {proj.githubUrl && (
                          <span className="text-slate-600 font-medium flex items-center gap-0.5">
                            GitHub <Github className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                    <p className="text-[10.5px] text-slate-700 leading-snug">{proj.description}</p>
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((t, idx) => (
                          <span
                            key={idx}
                            className="text-[9px] font-semibold px-1.5 py-0.5 bg-slate-100 rounded text-slate-700"
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

          {/* Achievements & Certifications */}
          {((achievements && achievements.length > 0) || (certifications && certifications.length > 0)) && (
            <div className="grid grid-cols-2 gap-4 pt-1 page-break-avoid">
              {certifications && certifications.length > 0 && (
                <div className="space-y-1.5">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                    style={{ color: accent }}
                  >
                    Certifications
                  </h3>
                  <div className="space-y-1.5">
                    {certifications.map((c) => (
                      <div key={c.id} className="text-[10px]">
                        <p className="font-bold text-slate-900">{c.name}</p>
                        <p className="text-slate-600">{c.issuer} ({c.date})</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {achievements && achievements.length > 0 && (
                <div className="space-y-1.5">
                  <h3
                    className="text-[11px] font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                    style={{ color: accent }}
                  >
                    Achievements
                  </h3>
                  <div className="space-y-1.5">
                    {achievements.map((a) => (
                      <div key={a.id} className="text-[10px]">
                        <p className="font-bold text-slate-900 flex items-center gap-1">
                          <Award className="w-3 h-3 text-amber-500" />
                          {a.title}
                        </p>
                        <p className="text-slate-600 leading-tight">{a.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Custom Sections */}
          {customSections && customSections.map((sec) => (
            <div key={sec.id} className="space-y-2 page-break-avoid">
              <h2
                className="text-xs font-bold uppercase tracking-wider pb-1 border-b border-slate-200"
                style={{ color: accent }}
              >
                {sec.heading}
              </h2>
              <div className="space-y-1.5">
                {sec.items.map((item) => (
                  <div key={item.id} className="space-y-0.5">
                    <div className="flex justify-between text-[11px] font-bold text-slate-900">
                      <span>{item.title}</span>
                      {item.date && <span className="text-[10px] font-normal text-slate-500">{item.date}</span>}
                    </div>
                    {item.subtitle && <p className="text-[10px] font-medium text-slate-600">{item.subtitle}</p>}
                    {item.description && <p className="text-[10.5px] text-slate-700">{item.description}</p>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
