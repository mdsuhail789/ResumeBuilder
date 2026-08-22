import React from 'react';
import { Plus, Trash2, GraduationCap } from 'lucide-react';

export const EducationForm = ({ education = [], onChange }) => {
  const handleAdd = () => {
    const newEdu = {
      id: 'edu_' + Date.now(),
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    onChange([...education, newEdu]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...education];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleRemove = (index) => {
    const updated = education.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Education</h3>
          <p className="text-xs text-slate-500">Add your academic background, degrees, and institutions.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Education
        </button>
      </div>

      {education.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <GraduationCap className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No education entries added yet.</p>
          <p className="text-xs text-slate-400 mb-3">Add your degree, university, or high school details.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add Education
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, index) => (
            <div key={edu.id || index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Education #{index + 1}
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Degree / Course</label>
                  <input
                    type="text"
                    value={edu.degree || ''}
                    onChange={(e) => handleUpdate(index, 'degree', e.target.value)}
                    placeholder="e.g. B.Tech in Computer Science"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Institution / School</label>
                  <input
                    type="text"
                    value={edu.institution || ''}
                    onChange={(e) => handleUpdate(index, 'institution', e.target.value)}
                    placeholder="e.g. AKS University"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    value={edu.location || ''}
                    onChange={(e) => handleUpdate(index, 'location', e.target.value)}
                    placeholder="e.g. Satna, MP"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Start Year</label>
                    <input
                      type="text"
                      value={edu.startDate || ''}
                      onChange={(e) => handleUpdate(index, 'startDate', e.target.value)}
                      placeholder="e.g. 2022"
                      className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">End Year</label>
                    <input
                      type="text"
                      value={edu.endDate || ''}
                      onChange={(e) => handleUpdate(index, 'endDate', e.target.value)}
                      placeholder="e.g. 2026"
                      className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                    />
                  </div>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Description / Grade (Optional)</label>
                  <input
                    type="text"
                    value={edu.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="e.g. CGPA: 8.8/10. Specialization in Full Stack Development."
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
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
