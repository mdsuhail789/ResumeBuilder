import React from 'react';

export const CreativeTemplate = ({ data }) => {
  const {
    personalInfo = {},
    summary = '',
    education = [],
    skills = [],
    experience = [],
    projects = [],
    achievements = [],
    certifications = [],
    accentColor = '#2563EB'
  } = data || {};

  return (
    <div className="flex min-h-full font-sans text-xs text-slate-800">
      {/* Left Sidebar Accent Column */}
      <div 
        className="w-1/3 p-6 text-white flex flex-col justify-between"
        style={{ backgroundColor: accentColor }}
      >
        <div>
          {/* Header in Sidebar */}
          <div className="mb-6">
            {personalInfo.photo && (
              <img
                src={personalInfo.photo}
                alt={personalInfo.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white/20 mb-4 shadow-md"
              />
            )}
            <h1 className="text-2xl font-bold tracking-tight text-white mb-1">
              {personalInfo.name || 'Your Name'}
            </h1>
            <p className="text-xs font-medium text-white/80 uppercase tracking-wide">
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>

          {/* Contact Details */}
          <div className="space-y-2 mb-8 text-[11px] text-white/90">
            <p className="font-semibold text-white uppercase text-[10px] tracking-wider border-b border-white/20 pb-1 mb-2">
              Contact
            </p>
            {personalInfo.email && <div className="break-all">{personalInfo.email}</div>}
            {personalInfo.phone && <div>{personalInfo.phone}</div>}
            {personalInfo.location && <div>{personalInfo.location}</div>}
            {personalInfo.website && <div className="break-all">{personalInfo.website}</div>}
            {personalInfo.linkedin && <div className="break-all">{personalInfo.linkedin}</div>}
            {personalInfo.github && <div className="break-all">{personalInfo.github}</div>}
          </div>

          {/* Skills Pill Column */}
          {skills && skills.length > 0 && (
            <div className="mb-8">
              <p className="font-semibold text-white uppercase text-[10px] tracking-wider border-b border-white/20 pb-1 mb-2">
                Skills
              </p>
              <div className="flex flex-wrap gap-1">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 rounded text-[10px] font-medium bg-white/15 text-white backdrop-blur-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div>
              <p className="font-semibold text-white uppercase text-[10px] tracking-wider border-b border-white/20 pb-1 mb-2">
                Certifications
              </p>
              <div className="space-y-2 text-[10px] text-white/90">
                {certifications.map((cert, index) => (
                  <div key={index}>
                    <p className="font-medium text-white">{cert.name}</p>
                    <p className="text-white/70">{cert.organization}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Right Content Area */}
      <div className="w-2/3 p-6 bg-white space-y-5">
        {/* Summary */}
        {summary && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              About Me
            </h2>
            <p className="text-slate-600 text-xs leading-relaxed">{summary}</p>
          </section>
        )}

        {/* Experience */}
        {experience && experience.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              Work Experience
            </h2>
            <div className="space-y-3.5">
              {experience.map((exp, index) => (
                <div key={exp.id || index}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-xs">{exp.role}</h3>
                    <span className="text-[10px] text-slate-400 font-medium">
                      {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 font-medium mb-1">{exp.company} {exp.location ? `• ${exp.location}` : ''}</div>
                  {exp.description && (
                    <p className="text-slate-600 text-xs leading-relaxed whitespace-pre-line">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              Featured Projects
            </h2>
            <div className="space-y-3">
              {projects.map((proj, index) => (
                <div key={proj.id || index}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="font-bold text-slate-900 text-xs">{proj.name}</h3>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {proj.url && <a href={proj.url} className="text-blue-600 hover:underline mr-2">Demo</a>}
                      {proj.github && <a href={proj.github} className="text-slate-600 hover:underline">Code</a>}
                    </span>
                  </div>
                  {proj.technologies && (
                    <p className="text-[10px] text-slate-500 font-medium mb-1">
                      {Array.isArray(proj.technologies) ? proj.technologies.join(' • ') : proj.technologies}
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
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Education
            </h2>
            <div className="space-y-2">
              {education.map((edu, index) => (
                <div key={edu.id || index}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-900 text-xs">{edu.degree}</h3>
                    <span className="text-[10px] text-slate-400">{edu.startDate} - {edu.endDate}</span>
                  </div>
                  <p className="text-xs text-slate-600">{edu.institution} {edu.location ? `(${edu.location})` : ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              Key Achievements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-slate-600 text-xs">
              {achievements.map((ach, index) => (
                <li key={index}>{ach}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};
