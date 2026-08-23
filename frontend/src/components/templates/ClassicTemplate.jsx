import React from 'react';

export const ClassicTemplate = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    education = [],
    skills = [],
    experience = [],
    projects = [],
    achievements = [],
    certifications = [],
    accentColor = '#1E293B'
  } = data || {};

  return (
    <div className="p-8 text-slate-800 text-sm leading-relaxed font-serif min-h-full bg-white">
      {/* Centered Traditional Header */}
      <header className="text-center pb-4 mb-6">
        <h1 className="text-3xl font-bold tracking-wide uppercase text-slate-900 mb-1">
          {personalInfo.name || 'Your Full Name'}
        </h1>
        <p className="text-sm font-semibold tracking-wider uppercase mb-2" style={{ color: accentColor }}>
          {personalInfo.title || 'Professional Title'}
        </p>

        {/* Contact Links */}
        <div className="flex flex-wrap justify-center items-center gap-x-3 gap-y-1 text-xs text-slate-700 font-sans mb-3">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.email && personalInfo.phone && <span>•</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.phone && personalInfo.location && <span>•</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && (
            <>
              <span>•</span>
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="underline">Portfolio</a>
            </>
          )}
          {personalInfo.linkedin && (
            <>
              <span>•</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="underline">LinkedIn</a>
            </>
          )}
          {personalInfo.github && (
            <>
              <span>•</span>
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="underline">GitHub</a>
            </>
          )}
        </div>

        <div className="w-full h-[2px] bg-slate-900" />
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-5">
          <div className="mb-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
              Summary
            </h2>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <p className="text-xs leading-relaxed text-slate-800 italic pt-1">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-5">
          <div className="mb-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
              Professional Experience
            </h2>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="space-y-3.5 pt-1">
            {experience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                  <span>{exp.role} — {exp.company}</span>
                  <span className="font-normal text-slate-600 font-sans text-[11px]">
                    {exp.startDate} – {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.location && <p className="text-[11px] text-slate-500 italic mb-1">{exp.location}</p>}
                {exp.description && (
                  <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line pl-3 font-sans">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <div className="mb-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
              Projects
            </h2>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="space-y-3 pt-1">
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                  <span>{proj.name}</span>
                  <span className="font-sans text-[10px] text-slate-500 font-normal">
                    {proj.url && <a href={proj.url} className="underline mr-2">Link</a>}
                    {proj.github && <a href={proj.github} className="underline">Code</a>}
                  </span>
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[11px] font-sans text-slate-600 font-medium">
                    {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
                  </p>
                )}
                {proj.description && <p className="text-xs font-sans text-slate-700 mt-0.5">{proj.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-5">
          <div className="mb-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
              Education
            </h2>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <div className="space-y-2.5 pt-1">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline text-xs font-bold text-slate-900">
                  <span>{edu.degree}</span>
                  <span className="font-sans text-[11px] font-normal text-slate-600">{edu.startDate} – {edu.endDate}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">{edu.institution} {edu.location ? `(${edu.location})` : ''}</p>
                {edu.description && <p className="text-xs font-sans text-slate-600">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-5">
          <div className="mb-2">
            <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
              Technical & Professional Skills
            </h2>
            <div className="w-full h-[1px] bg-slate-300" />
          </div>
          <p className="text-xs font-sans text-slate-800 leading-normal pt-1">
            {skills.join(' • ')}
          </p>
        </section>
      )}

      {/* Achievements & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {achievements && achievements.length > 0 && (
          <section>
            <div className="mb-2">
              <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
                Achievements
              </h2>
              <div className="w-full h-[1px] bg-slate-300" />
            </div>
            <ul className="list-disc list-inside text-xs text-slate-700 font-sans space-y-0.5 pt-1">
              {achievements.map((ach, idx) => (
                <li key={idx}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
        {certifications && certifications.length > 0 && (
          <section>
            <div className="mb-2">
              <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 mb-1">
                Certifications
              </h2>
              <div className="w-full h-[1px] bg-slate-300" />
            </div>
            <div className="text-xs font-sans space-y-1 pt-1">
              {certifications.map((cert, idx) => (
                <div key={idx}>
                  <span className="font-bold text-slate-800">{cert.name}</span> — <span className="text-slate-600">{cert.organization}</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
