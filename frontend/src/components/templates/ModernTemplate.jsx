import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const ModernTemplate = ({ data }) => {
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
    <div className="p-8 text-slate-800 text-sm leading-relaxed font-sans min-h-full">
      {/* Top Banner Accent */}
      <div 
        className="w-full h-2 rounded-t-sm mb-6" 
        style={{ backgroundColor: accentColor }}
      />

      {/* Header / Personal Information */}
      <header className="border-b border-slate-200 pb-5 mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 mb-1">
              {personalInfo.name || 'Your Full Name'}
            </h1>
            <p className="text-lg font-medium text-slate-600 mb-3" style={{ color: accentColor }}>
              {personalInfo.title || 'Professional Title'}
            </p>
          </div>
          {personalInfo.photo && (
            <img
              src={personalInfo.photo}
              alt={personalInfo.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-slate-200"
            />
          )}
        </div>

        {/* Contact Strip */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-slate-400" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-slate-400" />
              <a href={personalInfo.website} target="_blank" rel="noreferrer" className="hover:underline">
                Portfolio
              </a>
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <LinkedinIcon className="w-3.5 h-3.5 text-slate-400" />
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="hover:underline">
                LinkedIn
              </a>
            </span>
          )}
          {personalInfo.github && (
            <span className="flex items-center gap-1">
              <GithubIcon className="w-3.5 h-3.5 text-slate-400" />
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="hover:underline">
                GitHub
              </a>
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {summary && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Professional Summary
          </h2>
          <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">{summary}</p>
        </section>
      )}

      {/* Experience */}
      {experience && experience.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Work Experience
          </h2>
          <div className="space-y-4">
            {experience.map((exp, index) => (
              <div key={exp.id || index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-xs">{exp.role || 'Job Role'}</h3>
                  <span className="text-[11px] font-medium text-slate-500">
                    {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 font-medium mb-1.5">
                  <span>{exp.company}</span>
                  {exp.location && <span className="text-[11px] text-slate-400">{exp.location}</span>}
                </div>
                {exp.description && (
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line pl-2 border-l-2 border-slate-100">
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
        <section className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Projects
          </h2>
          <div className="space-y-3.5">
            {projects.map((proj, index) => (
              <div key={proj.id || index}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900 text-xs flex items-center gap-2">
                    {proj.name || 'Project Name'}
                    {proj.url && (
                      <a href={proj.url} target="_blank" rel="noreferrer" className="text-[10px] text-blue-600 hover:underline font-normal">
                        Live Demo
                      </a>
                    )}
                  </h3>
                  {proj.github && (
                    <a href={proj.github} target="_blank" rel="noreferrer" className="text-[10px] text-slate-500 hover:underline">
                      GitHub Code
                    </a>
                  )}
                </div>
                {proj.technologies && proj.technologies.length > 0 && (
                  <p className="text-[11px] font-semibold text-slate-500 mb-1">
                    Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(' • ') : proj.technologies}
                  </p>
                )}
                {proj.description && (
                  <p className="text-slate-700 text-xs leading-relaxed whitespace-pre-line">{proj.description}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education && education.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-3 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu, index) => (
              <div key={edu.id || index}>
                <div className="flex justify-between items-baseline">
                  <h3 className="font-bold text-slate-900 text-xs">{edu.degree || 'Degree / Diploma'}</h3>
                  <span className="text-[11px] text-slate-500">{edu.startDate} - {edu.endDate}</span>
                </div>
                <div className="flex justify-between items-center text-xs text-slate-600 mb-1">
                  <span>{edu.institution}</span>
                  {edu.location && <span className="text-[11px] text-slate-400">{edu.location}</span>}
                </div>
                {edu.description && <p className="text-slate-700 text-xs leading-relaxed">{edu.description}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills && skills.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
            Skills & Expertise
          </h2>
          <div className="flex flex-wrap gap-1.5 pt-1">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700 border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Two Column Grid for Achievements & Certifications */}
      <div className="grid grid-cols-2 gap-6">
        {/* Achievements */}
        {achievements && achievements.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
              Achievements
            </h2>
            <ul className="list-disc list-inside space-y-1 text-slate-700 text-xs">
              {achievements.map((ach, index) => (
                <li key={index} className="leading-snug">{ach}</li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {certifications && certifications.length > 0 && (
          <section>
            <h2 className="text-xs uppercase font-bold tracking-wider mb-2 border-b border-slate-200 pb-1" style={{ color: accentColor }}>
              Certifications
            </h2>
            <div className="space-y-2">
              {certifications.map((cert, index) => (
                <div key={cert.id || index} className="text-xs">
                  <p className="font-semibold text-slate-800">{cert.name}</p>
                  <p className="text-[11px] text-slate-500">{cert.organization} {cert.date ? `(${cert.date})` : ''}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
