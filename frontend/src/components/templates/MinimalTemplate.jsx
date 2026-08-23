import React from 'react';

export const MinimalTemplate = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    education = [],
    skills = [],
    experience = [],
    projects = [],
    achievements = [],
    certifications = [],
    accentColor = '#0F172A'
  } = data || {};

  return (
    <div className="p-8 text-slate-800 text-xs leading-relaxed font-sans min-h-full">
      {/* Clean Left-Aligned Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-light tracking-tight text-slate-900 mb-0.5">
          {personalInfo.name || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold tracking-wide uppercase mb-3" style={{ color: accentColor }}>
          {personalInfo.title || 'Professional Title'}
        </p>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-slate-500 text-[11px]">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <a href={personalInfo.website} target="_blank" rel="noreferrer" className="text-slate-800 font-medium hover:underline">
              {personalInfo.website.replace('https://', '')}
            </a>
          )}
          {personalInfo.github && (
            <a href={personalInfo.github} target="_blank" rel="noreferrer" className="text-slate-800 font-medium hover:underline">
              GitHub
            </a>
          )}
          {personalInfo.linkedin && (
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="text-slate-800 font-medium hover:underline">
              LinkedIn
            </a>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <p className="text-slate-600 leading-relaxed text-xs border-l-2 pl-3" style={{ borderColor: accentColor }}>
            {summary}
          </p>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-2">
            Skills & Competencies
          </h2>
          <div className="flex flex-wrap gap-1.5">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2.5 py-1 rounded-md text-[11px] font-semibold border"
                style={{ backgroundColor: '#f1f5f9', color: '#1e293b', borderColor: '#cbd5e1' }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Work Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-3">
            Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-slate-900">{exp.role}</span>
                  <span className="text-[11px] text-slate-400">
                    {exp.startDate} — {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="text-slate-600 font-medium text-[11px] mb-1">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                {exp.description && (
                  <p className="text-slate-600 leading-relaxed whitespace-pre-line text-xs">{exp.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-3">
            Key Projects
          </h2>
          <div className="space-y-3">
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <span className="font-bold text-slate-900">{proj.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {proj.url && <a href={proj.url} className="underline mr-2">Demo</a>}
                    {proj.github && <a href={proj.github} className="underline">Code</a>}
                  </span>
                </div>
                {proj.technologies && (
                  <p className="text-[10px] text-slate-500 font-medium mb-0.5">
                    {Array.isArray(proj.technologies) ? proj.technologies.join(' / ') : proj.technologies}
                  </p>
                )}
                {proj.description && <p className="text-slate-600 text-xs">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-2">
            Education
          </h2>
          <div className="space-y-2">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline">
                  <span className="font-bold text-slate-900">{edu.degree}</span>
                  <span className="text-[11px] text-slate-400">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-slate-600 text-[11px]">{edu.institution} {edu.location ? `(${edu.location})` : ''}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-2">Achievements</h2>
            <ul className="space-y-1 text-slate-600 text-xs">
              {achievements.map((ach, idx) => (
                <li key={idx}>• {ach}</li>
              ))}
            </ul>
          </section>
        )}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-[11px] uppercase font-bold tracking-widest text-slate-400 mb-2">Certifications</h2>
            <div className="space-y-1 text-slate-600 text-xs">
              {certifications.map((cert, idx) => (
                <div key={idx}><span className="font-medium text-slate-900">{cert.name}</span> ({cert.organization})</div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
