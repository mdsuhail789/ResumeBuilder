import React from 'react';
import { Plus, Trash2, FolderKanban } from 'lucide-react';

export const ProjectsForm = ({ projects = [], onChange }) => {
  const handleAdd = () => {
    const newProj = {
      id: 'proj_' + Date.now(),
      name: '',
      description: '',
      technologies: [],
      url: '',
      github: ''
    };
    onChange([...projects, newProj]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...projects];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleTechChange = (index, textValue) => {
    const techArray = textValue.split(',').map(t => t.trim());
    handleUpdate(index, 'technologies', techArray);
  };

  const handleRemove = (index) => {
    const updated = projects.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Key Projects</h3>
          <p className="text-xs text-slate-500">Showcase your personal, academic, or open-source projects.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-8 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <FolderKanban className="w-8 h-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-medium text-slate-700">No projects added yet.</p>
          <p className="text-xs text-slate-400 mb-3">Projects are crucial for freshers to stand out.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add Project
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((proj, index) => (
            <div key={proj.id || index} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Project #{index + 1}
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
                  <label className="block text-xs font-medium text-slate-700 mb-1">Project Name <span className="text-red-500">*</span></label>
                  <input
                    type="text"
                    value={proj.name || ''}
                    onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                    placeholder="e.g. Library Management System"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Technologies Used (Comma Separated)</label>
                  <input
                    type="text"
                    value={Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies || ''}
                    onChange={(e) => handleTechChange(index, e.target.value)}
                    placeholder="e.g. React.js, Node.js, MongoDB"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Live Project Demo URL</label>
                  <input
                    type="text"
                    value={proj.url || ''}
                    onChange={(e) => handleUpdate(index, 'url', e.target.value)}
                    placeholder="https://project-demo.com"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={proj.github || ''}
                    onChange={(e) => handleUpdate(index, 'github', e.target.value)}
                    placeholder="https://github.com/user/project"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-slate-700 mb-1">Description & Impact</label>
                  <textarea
                    rows={3}
                    value={proj.description || ''}
                    onChange={(e) => handleUpdate(index, 'description', e.target.value)}
                    placeholder="Developed a web application for managing books and users. Integrated authentication and book search filter."
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
