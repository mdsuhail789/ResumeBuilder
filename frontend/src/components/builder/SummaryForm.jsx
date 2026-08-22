import React from 'react';
import { Sparkles } from 'lucide-react';

export const SummaryForm = ({ summary = '', onChange }) => {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center border-b border-slate-200 pb-3 mb-2">
        <div>
          <h3 className="text-base font-semibold text-slate-900">Professional Summary</h3>
          <p className="text-xs text-slate-500">Highlight your top achievements, skills, and career focus.</p>
        </div>
        <button
          type="button"
          disabled
          className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-indigo-50 to-blue-50 text-indigo-600 rounded-lg text-xs font-semibold border border-indigo-200 opacity-60 cursor-not-allowed"
          title="AI Assistant feature coming soon"
        >
          <Sparkles className="w-3.5 h-3.5" />
          Improve with AI
        </button>
      </div>

      <div>
        <textarea
          rows={5}
          value={summary}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write a short professional summary about yourself... e.g. Motivated Computer Science graduate with experience building modern web applications using React and Node.js..."
          className="w-full p-3 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none leading-relaxed"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Tip: Keep it between 3–5 concise sentences emphasizing your primary tech stack and experience.
        </p>
      </div>
    </div>
  );
};
