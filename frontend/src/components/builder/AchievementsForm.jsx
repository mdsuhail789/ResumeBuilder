import React, { useState } from 'react';
import { Plus, Trash2, Award } from 'lucide-react';

export const AchievementsForm = ({ achievements = [], onChange }) => {
  const [achInput, setAchInput] = useState('');

  const handleAdd = () => {
    if (achInput.trim()) {
      onChange([...achievements, achInput.trim()]);
      setAchInput('');
    }
  };

  const handleRemove = (index) => {
    onChange(achievements.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 mb-2">
        <h3 className="text-base font-semibold text-slate-900">Key Achievements</h3>
        <p className="text-xs text-slate-500">Add awards, hackathon recognitions, or coding accomplishments.</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={achInput}
          onChange={(e) => setAchInput(e.target.value)}
          placeholder="e.g. Winner at National Hackathon 2025 (Top 1 out of 100 teams)"
          className="flex-1 p-2.5 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm transition"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      {achievements.length === 0 ? (
        <div className="text-center py-6 bg-slate-50 rounded-xl border border-dashed border-slate-300">
          <Award className="w-6 h-6 text-slate-400 mx-auto mb-1" />
          <p className="text-xs text-slate-500">No achievements added yet.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {achievements.map((ach, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
              <span className="text-xs text-slate-800 font-medium">🏆 {ach}</span>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="text-red-500 hover:text-red-700 p-1"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
