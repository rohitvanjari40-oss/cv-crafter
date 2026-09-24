import React from 'react';
import { ResumeData } from '@/lib/types';
import { Mail, Phone, MapPin, Linkedin, Github, Globe, GraduationCap, Award, ExternalLink, Code2 } from 'lucide-react';

export default function StudentTemplate({ data }: { data: ResumeData }) {
  const { personal, summary, experience, education, skills, projects, certifications, achievements, languages, customSections, settings } = data;
  const accent = settings?.accentColor || '#0284c7'; // Sky / Blue default for student

  return (
    <div className="w-full bg-white text-slate-800 font-sans p-8 min-h-[297mm] text-xs leading-normal print:text-black">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-4 border-b-2" style={{ borderColor: accent }}>
        <div className="space-y-1">
          <h1 className="text-2xl font-black tracking-tight text-slate-900">{personal.fullName || 'Student Name'}</h1>
          <p className="text-xs font-bold uppercase tracking-wider" style={{ color: accent }}>
            {personal.jobTitle || 'BCA Student / Aspiring Software Developer'}
          </p>
        </div>

        {/* Contact info grid */}
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[10px] text-slate-600 mt-2 sm:mt-0">
          {personal.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-slate-400" /> {personal.email}
            </span>
          )}
          {personal.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-slate-400" /> {personal.phone}
            </span>
          )}
          {personal.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-slate-400" /> {personal.location}
            </span>
          )}
          {personal.github && (
            <span className="flex items-center gap-1">
              <Github className="w-3 h-3 text-slate-400" /> {personal.github.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personal.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-slate-400" /> {personal.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
          {personal.portfolio && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-slate-400" /> {personal.portfolio.replace(/^https?:\/\/(www\.)?/, '')}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-4">
        {/* Career Objective / Summary */}
        {summary && (
          <div className="space-y-1 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ color: accent }}>
              Career Objective
            </h3>
            <p className="text-[10.5px] text-slate-700 leading-relaxed text-justify">{summary}</p>
          </div>
        )}

        {/* Education (Placed First for Freshers) */}
        {education && education.length > 0 && (
          <div className="space-y-2 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b border-slate-200" style={{ color: accent }}>
              <GraduationCap className="w-3.5 h-3.5" /> Education & Qualifications
            </h3>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                    <span>{edu.degree}</span>
                    <span className="text-[10px] font-normal text-slate-500">
                      {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                    </span>
                  </div>
                  <div className="flex justify-between text-[10.5px] text-slate-600 font-medium">
                    <span>{edu.institution} {edu.location && `• ${edu.location}`}</span>
                    {edu.grade && <span className="font-bold text-slate-800 bg-slate-100 px-1.5 py-0.5 rounded text-[9.5px]">CGPA/Score: {edu.grade}</span>}
                  </div>
                  {edu.description && (
                    <p className="text-[10px] text-slate-600 italic pt-0.5">{edu.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Technical Skills */}
        {skills && skills.length > 0 && (
          <div className="space-y-1.5 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b border-slate-200" style={{ color: accent }}>
              <Code2 className="w-3.5 h-3.5" /> Technical Strengths
            </h3>
            <div className="grid grid-cols-1 gap-1.5 text-[10.5px]">
              {skills.map((cat) => (
                <div key={cat.id} className="flex items-baseline">
                  <span className="font-bold text-slate-800 w-36 shrink-0">{cat.name}:</span>
                  <div className="flex flex-wrap gap-1">
                    {cat.skills.map((s, idx) => (
                      <span key={idx} className="bg-slate-100 text-slate-700 px-1.5 py-0.2 rounded text-[9.5px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Academic & Personal Projects */}
        {projects && projects.length > 0 && (
          <div className="space-y-2 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b border-slate-200" style={{ color: accent }}>
              Key Academic & Engineering Projects
            </h3>
            <div className="space-y-2.5">
              {projects.map((proj) => (
                <div key={proj.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-[11px] text-slate-900">
                    <span>{proj.title}</span>
                    <div className="flex items-center gap-2 text-[9.5px]">
                      {proj.liveUrl && (
                        <span className="text-blue-600 font-semibold flex items-center gap-0.5">
                          Live Demo <ExternalLink className="w-2.5 h-2.5" />
                        </span>
                      )}
                      {proj.githubUrl && (
                        <span className="text-slate-600 font-semibold flex items-center gap-0.5">
                          Code <Github className="w-2.5 h-2.5" />
                        </span>
                      )}
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-700 leading-snug">{proj.description}</p>
                  {proj.technologies && (
                    <div className="text-[9.5px] text-slate-500 font-medium">
                      <span className="text-slate-700 font-semibold">Tech Stack: </span>
                      {proj.technologies.join(', ')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Experience / Internships */}
        {experience && experience.length > 0 && (
          <div className="space-y-2 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5 pb-0.5 border-b border-slate-200" style={{ color: accent }}>
              Internships & Practical Training
            </h3>
            <div className="space-y-2">
              {experience.map((exp) => (
                <div key={exp.id} className="space-y-0.5">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                    <span>{exp.position} — <span className="font-semibold text-slate-700">{exp.company}</span></span>
                    <span className="text-[10px] font-normal text-slate-500">
                      {exp.startDate} – {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.responsibilities && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[10px] text-slate-700">
                      {exp.responsibilities.map((r, i) => (
                        <li key={i}>{r}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Honors, Achievements & Certifications */}
        {((achievements && achievements.length > 0) || (certifications && certifications.length > 0)) && (
          <div className="grid grid-cols-2 gap-4 page-break-avoid">
            {achievements && achievements.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b border-slate-200 flex items-center gap-1" style={{ color: accent }}>
                  <Award className="w-3 h-3 text-amber-500" /> Honors & Awards
                </h3>
                <div className="space-y-1 text-[10px]">
                  {achievements.map((a) => (
                    <div key={a.id}>
                      <span className="font-bold text-slate-900">{a.title}</span>
                      <p className="text-slate-600 text-[9.5px]">{a.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {certifications && certifications.length > 0 && (
              <div className="space-y-1">
                <h3 className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b border-slate-200" style={{ color: accent }}>
                  Certifications
                </h3>
                <div className="space-y-1 text-[10px]">
                  {certifications.map((c) => (
                    <div key={c.id}>
                      <span className="font-bold text-slate-900">{c.name}</span>
                      <p className="text-slate-500 text-[9.5px]">{c.issuer} ({c.date})</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Languages & Custom Sections */}
        {customSections && customSections.map((sec) => (
          <div key={sec.id} className="space-y-1 page-break-avoid">
            <h3 className="text-[11px] font-bold uppercase tracking-wider pb-0.5 border-b border-slate-200" style={{ color: accent }}>
              {sec.heading}
            </h3>
            <div className="space-y-1">
              {sec.items.map((item) => (
                <div key={item.id} className="text-[10px]">
                  <div className="flex justify-between font-bold text-slate-900">
                    <span>{item.title}</span>
                    {item.date && <span className="text-slate-500 font-normal">{item.date}</span>}
                  </div>
                  {item.description && <p className="text-slate-600">{item.description}</p>}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
