import React from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export const CertificationsForm = ({ certifications = [], onChange }) => {
  const handleAdd = () => {
    const newCert = {
      id: 'cert_' + Date.now(),
      name: '',
      organization: '',
      date: '',
      url: ''
    };
    onChange([...certifications, newCert]);
  };

  const handleUpdate = (index, field, value) => {
    const updated = [...certifications];
    updated[index] = {
      ...updated[index],
      [field]: value
    };
    onChange(updated);
  };

  const handleRemove = (index) => {
    onChange(certifications.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Certifications</h3>
          <p className="text-xs text-slate-500">Add course certificates, licenses, or professional credentials.</p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add Certification
        </button>
      </div>

      {certifications.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Award className="w-6 h-6 text-slate-400 mx-auto mb-1" />
          <p className="text-xs text-slate-500">No certifications added yet.</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 text-xs font-semibold text-blue-600 hover:underline"
          >
            + Add Certification
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {certifications.map((cert, index) => (
            <div key={cert.id || index} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="flex justify-between items-center mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                  Certification #{index + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleRemove(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name || ''}
                    onChange={(e) => handleUpdate(index, 'name', e.target.value)}
                    placeholder="e.g. Meta Front-End Developer"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.organization || ''}
                    onChange={(e) => handleUpdate(index, 'organization', e.target.value)}
                    placeholder="e.g. Coursera / AWS / Meta"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Date Issued</label>
                  <input
                    type="text"
                    value={cert.date || ''}
                    onChange={(e) => handleUpdate(index, 'date', e.target.value)}
                    placeholder="e.g. 2025"
                    className="w-full p-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Credential Link (URL)</label>
                  <input
                    type="text"
                    value={cert.url || ''}
                    onChange={(e) => handleUpdate(index, 'url', e.target.value)}
                    placeholder="https://credential-verify.com"
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
