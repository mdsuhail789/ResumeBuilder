import React, { useState } from 'react';
import { Plus, X, Wrench } from 'lucide-react';

const SUGGESTED_SKILLS = [
  "React.js", "JavaScript", "Node.js", "Express.js", "MongoDB",
  "Tailwind CSS", "TypeScript", "Python", "Java", "Git & GitHub",
  "REST APIs", "SQL", "Postman", "Docker", "HTML5/CSS3"
];

export const SkillsForm = ({ skills = [], onChange }) => {
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = (skillToAdd) => {
    const val = (skillToAdd || skillInput).trim();
    if (val && !skills.includes(val)) {
      onChange([...skills, val]);
      setSkillInput('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 mb-2">
        <h3 className="text-base font-semibold text-slate-900">Skills & Competencies</h3>
        <p className="text-xs text-slate-500">List technical skills, programming languages, and tools.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React.js, Python, Git..."
          className="flex-1 p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={() => handleAddSkill()}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Skill
        </button>
      </div>

      {/* Active Skills Pills */}
      {skills.length > 0 ? (
        <div>
          <label className="block text-xs font-medium text-slate-600 mb-2">
            Added Skills ({skills.length}):
          </label>
          <div className="flex flex-wrap gap-2 p-3 bg-slate-50 rounded-xl border border-slate-200">
            {skills.map((skill, index) => (
              <span
                key={index}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-white text-slate-800 rounded-lg text-xs font-semibold border border-slate-300 shadow-xs"
              >
                {skill}
                <button
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  className="hover:text-red-600 transition"
                  title="Remove Skill"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </span>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Wrench className="w-6 h-6 text-slate-400 mx-auto mb-1" />
          <p className="text-xs text-slate-500">No skills added yet. Type a skill above or click quick suggestions below.</p>
        </div>
      )}

      {/* Quick Suggestions */}
      <div>
        <label className="block text-xs font-medium text-slate-500 mb-2">Quick Add Suggestions:</label>
        <div className="flex flex-wrap gap-1.5">
          {SUGGESTED_SKILLS.filter(s => !skills.includes(s)).map((suggestion, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAddSkill(suggestion)}
              className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-blue-50 hover:text-blue-600 text-slate-600 rounded-md border border-slate-200 transition"
            >
              + {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
