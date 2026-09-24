import React from 'react';
import { ResumeData } from '@/lib/types';

export default function MinimalTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections } = data;

  const contactItems = [
    personal.email,
    personal.phone,
    personal.location,
    personal.linkedin ? personal.linkedin.replace(/^https?:\/\/(www\.)?/, '') : '',
    personal.github ? personal.github.replace(/^https?:\/\/(www\.)?/, '') : '',
    personal.portfolio ? personal.portfolio.replace(/^https?:\/\/(www\.)?/, '') : '',
  ].filter(Boolean);

  return (
    <div className="w-full bg-white text-slate-900 font-serif p-8 min-h-[297mm] text-xs leading-normal print:text-black">
      {/* Header */}
      <div className="text-center pb-4 border-b border-slate-300 space-y-1">
        <h1 className="text-2xl font-bold uppercase tracking-wider text-slate-900">
          {personal.fullName || 'Your Full Name'}
        </h1>
        <p className="text-xs font-sans tracking-wide text-slate-700 font-semibold uppercase">
          {personal.jobTitle || 'Target Career Title'}
        </p>
        <div className="text-[10px] font-sans text-slate-600 flex flex-wrap justify-center items-center gap-2 pt-1">
          {contactItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <span>{item}</span>
              {idx < contactItems.length - 1 && <span>•</span>}
            </React.Fragment>
          ))}
        </div>
      </div>

      <div className="mt-4 space-y-4 font-sans">
        {/* Summary */}
        {summary && (
          <div className="space-y-1 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              Professional Summary
            </h2>
            <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Work Experience */}
        {experience && experience.length > 0 && (
          <div className="space-y-2.5 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              Professional Experience
            </h2>
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-1">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                    <span>{exp.position} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                    <span className="text-[10px] font-normal text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.location && <div className="text-[10px] text-slate-500 italic">{exp.location}</div>}
                  {exp.responsibilities && exp.responsibilities.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10.5px] text-slate-700">
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

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div className="space-y-2 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              Key Projects
            </h2>
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-[11px] text-slate-900">
                    <span>{proj.title}</span>
                    <span className="text-[9.5px] font-normal text-slate-600">
                      {proj.technologies?.join(', ')}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education && education.length > 0 && (
          <div className="space-y-2 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between font-bold text-xs text-slate-900">
                    <span>{edu.degree} — <span className="font-semibold text-slate-700">{edu.institution}</span></span>
                    <span className="text-[10px] font-normal text-slate-500">
                      {edu.startDate} – {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-600">
                    {edu.description && <span>{edu.description}</span>}
                    {edu.grade && <span className="font-semibold text-slate-800">Grade: {edu.grade}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical & Soft Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-1 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              Skills & Expertise
            </h2>
            <div className="space-y-1 text-[10.5px]">
              {skills.map((cat) => (
                <div key={cat.id} className="flex">
                  <span className="font-bold text-slate-800 w-32 shrink-0">{cat.name}:</span>
                  <span className="text-slate-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Certifications & Languages */}
        {((certifications && certifications.length > 0) || (languages && languages.length > 0)) && (
          <div className="grid grid-cols-2 gap-4 page-break-avoid">
            {certifications && certifications.length > 0 && (
              <div className="space-y-1">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
                  Certifications
                </h2>
                <div className="space-y-1 text-[10px] text-slate-700">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-bold">{c.name}</span> — {c.issuer} ({c.date})
                    </div>
                  ))}
                </div>
              </div>
            )}

            {languages && languages.length > 0 && (
              <div className="space-y-1">
                <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
                  Languages
                </h2>
                <div className="space-y-1 text-[10px] text-slate-700">
                  {languages.map((l) => (
                    <div key={l.id}>
                      <span className="font-bold">{l.name}:</span> {l.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Custom Sections */}
        {customSections && customSections.map((sec) => (
          <div key={sec.id} className="space-y-1 page-break-avoid">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-slate-900 pb-0.5 border-b border-slate-300">
              {sec.heading}
            </h2>
            <div className="space-y-1.5">
              {sec.items.map((item) => (
                <div key={item.id} className="space-y-0.5">
                  <div className="flex justify-between text-[11px] font-bold text-slate-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-[10px] font-normal text-slate-500">{item.date}</span>}
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
