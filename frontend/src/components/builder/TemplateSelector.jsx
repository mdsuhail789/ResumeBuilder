import React from 'react';
import { Check } from 'lucide-react';

const TEMPLATES = [
  {
    id: 'modern',
    name: 'Modern SaaS',
    desc: 'Clean 2-column header with vibrant top accent bar',
    badge: 'Popular'
  },
  {
    id: 'classic',
    name: 'Executive Classic',
    desc: 'Traditional serif layout with centered formal headers'
  },
  {
    id: 'minimal',
    name: 'Minimal Clean',
    desc: 'Ultra-sleek single column with focus on whitespace'
  },
  {
    id: 'creative',
    name: 'Creative Sidebar',
    desc: 'Modern 2-column design with accent colored sidebar'
  }
];

const ACCENT_COLORS = [
  { name: 'Royal Blue', hex: '#2563EB' },
  { name: 'Emerald', hex: '#059669' },
  { name: 'Violet', hex: '#7C3AED' },
  { name: 'Crimson', hex: '#DC2626' },
  { name: 'Slate Dark', hex: '#0F172A' },
  { name: 'Amber Gold', hex: '#D97706' }
];

export const TemplateSelector = ({ currentTemplate = 'modern', currentAccent = '#2563EB', onSelectTemplate, onSelectAccent }) => {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Choose Resume Template</h3>
        <p className="text-xs text-slate-500 mb-4">Select a layout designed for high ATS readability and recruiter engagement.</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = currentTemplate === tmpl.id;
            return (
              <div
                key={tmpl.id}
                onClick={() => onSelectTemplate(tmpl.id)}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition-all ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                    : 'border-slate-200 hover:border-slate-300 bg-white'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className="text-xs font-bold text-slate-900">{tmpl.name}</h4>
                  {tmpl.badge && (
                    <span className="text-[10px] font-semibold px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full">
                      {tmpl.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500">{tmpl.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-slate-900 mb-1">Accent Theme Color</h3>
        <p className="text-xs text-slate-500 mb-3">Choose a professional color for headings and highlights.</p>
        
        <div className="flex flex-wrap items-center gap-3">
          {ACCENT_COLORS.map((color) => {
            const isSelected = currentAccent.toLowerCase() === color.hex.toLowerCase();
            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onSelectAccent(color.hex)}
                className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform ${
                  isSelected ? 'scale-110 ring-2 ring-offset-2 ring-slate-400' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: color.hex }}
                title={color.name}
              >
                {isSelected && <Check className="w-5 h-5 text-white" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
