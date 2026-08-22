import React from 'react';
import { Plus, Trash2, Briefcase } from 'lucide-react';

export const ExperienceForm = ({ experience = [], onChange }) => {
  const handleAdd = () => {
    const newExp = {
      id: 'exp_' + Date.now(),
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      currentlyWorking: false,
      description: ''
    };
    onChange([...experience, newExp]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...experience];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = experience.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Work Experience & Internships</h3>
          <p className="text-xs text-slate-500">Freshers can leave this section blank or add internship experience.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Experience
        </button>
      </div>

      {experience.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Briefcase className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No work experience added yet.</p>
          <p className="text-xs text-slate-400 mb-3">Freshers can skip this section or add internships.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add Experience
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {experience.map((exp, index) => (
            <div key={exp.id || index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Experience #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 p-1 transition"
                  title="Remove Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Company / Organization</label>
                  <input
                    type="text"
                    value={exp.company || ''}
                    onChange={(e) => handleUpdate(index, 'company', e.target.value)}
                    placeholder="e.g. ABC Tech Solutions"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Role / Job Title</label>
                  <input
                    type="text"
                    value={exp.role || ''}
                    onChange={(e) => handleUpdate(index, 'role', e.target.value)}
                    placeholder="e.g. Frontend Intern"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={exp.location || ''}
                    onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                    placeholder="e.g. Remote / Bhopal, MP"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Start Date</label>
                    <input
                      type="text"
                      value={exp.startDate || ''}
                      onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                      placeholder="e.g. Jan 2026"
                      className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">End Date</label>
                    <input
                      type="text"
                      disabled={exp.currentlyWorking}
                      value={exp.currentlyWorking ? 'Present' : exp.endDate || ''}
                      onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                      placeholder="e.g. Present"
                      className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white disabled:bg-slate-100 disabled:text-slate-400"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2 flex items-center gap-2 py-1">
                  <input
                    type="checkbox"
                    id={`current_${index}`}
                    checked={exp.currentlyWorking || false}
                    onChange={(e) => handleUpdate(index, 'currentlyWorking', e.target.checked)}
                    className="w-4 h-4 text-blue-600 rounded border-slate-300 focus:ring-blue-500"
                  />
                  <label htmlFor={`current_${index}`} className="text-xs text-slate-700 font-medium cursor-pointer">
                    I currently work here
                  </label>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Key Responsibilities & Bullet Points</label>
                  <textarea
                    rows={3}
                    value={exp.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="• Developed React components&#10;• Integrated REST APIs&#10;• Improved page performance by 20%"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
