import React, { useState, useEffect, useRef } from 'react';
import {
  FileCode,
  Bold,
  Italic,
  Link as LinkIcon,
  Play,
  Code,
  Eye,
  ChevronDown
} from 'lucide-react';
import { resumeToLatex, latexToResume } from '../../utils/latexParser';

export const LatexCodeEditor = ({ resumeData, onChange, onSwitchToForm }) => {
  const [latexCode, setLatexCode] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const compileTimerRef = useRef(null);

  // Initialize LaTeX code once from resumeData on mount
  useEffect(() => {
    const initialLatex = resumeToLatex(resumeData);
    setLatexCode(initialLatex);
  }, []);

  // Recompile handler to parse LaTeX code and update preview
  const compileCode = (codeToCompile) => {
    setIsCompiling(true);
    const parsed = latexToResume(codeToCompile);
    onChange(parsed);
    setTimeout(() => setIsCompiling(false), 200);
  };

  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setLatexCode(newCode); // Instant 60fps typing in textarea!

    // Debounce preview update (500ms) so user can type smoothly without lag
    if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    compileTimerRef.current = setTimeout(() => {
      compileCode(newCode);
    }, 500);
  };

  const handleRecompile = () => {
    if (compileTimerRef.current) clearTimeout(compileTimerRef.current);
    compileCode(latexCode);
  };

  const insertSnippet = (snippet) => {
    setLatexCode(prev => {
      const updated = prev + '\n' + snippet;
      compileCode(updated);
      return updated;
    });
  };

  const lineCount = (latexCode.match(/\n/g) || []).length + 1;

  return (
    <div className="flex flex-col h-full bg-[#1e1e2e] text-slate-200 overflow-hidden rounded-xl border border-slate-800 shadow-2xl">
      {/* Overleaf Top File & Action Bar */}
      <div className="bg-[#181825] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between">
        {/* File Tabs */}
        <div className="flex items-center gap-1">
          <div className="flex items-center gap-2 px-3 py-1 bg-[#1e1e2e] text-white rounded-t-lg border-t-2 border-blue-500 text-xs font-mono font-semibold shadow-xs">
            <FileCode className="w-3.5 h-3.5 text-blue-400" />
            <span>main.tex</span>
            <span className="text-slate-500 hover:text-white cursor-pointer ml-1">×</span>
          </div>
        </div>

        {/* Action Controls & Recompile Trigger */}
        <div className="flex items-center gap-2">
          {/* Recompile Button */}
          <button
            type="button"
            onClick={handleRecompile}
            className="flex items-center gap-1.5 px-3.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition shadow-sm"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            {isCompiling ? 'Compiling...' : 'Recompile'}
            <ChevronDown className="w-3 h-3 text-emerald-200" />
          </button>
        </div>
      </div>

      {/* Overleaf Formatting Toolbar */}
      <div className="bg-[#1e1e2e] px-3 py-1.5 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => insertSnippet('\\textbf{Bold Text}')}
            className="hover:text-white p-1 rounded transition"
            title="Bold"
          >
            <Bold className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('\\textit{Italic Text}')}
            className="hover:text-white p-1 rounded transition"
            title="Italic"
          >
            <Italic className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('\\href{url}{Link Text}')}
            className="hover:text-white p-1 rounded transition"
            title="Link"
          >
            <LinkIcon className="w-3.5 h-3.5" />
          </button>
          <span className="h-4 w-px bg-slate-700 mx-1" />

          {/* Quick Snippet Drops */}
          <button
            type="button"
            onClick={() => insertSnippet('\\section*{Education}')}
            className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
          >
            \section*
          </button>
          <button
            type="button"
            onClick={() => insertSnippet('\\begin{itemize}\n  \\item Point 1\n\\end{itemize}')}
            className="text-[11px] font-mono px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded"
          >
            \itemize
          </button>
        </div>

        {/* Code / Visual Toggle Button */}
        <div className="flex bg-slate-900 p-0.5 rounded-lg border border-slate-800">
          <button
            type="button"
            className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-600 text-white flex items-center gap-1"
          >
            <Code className="w-3 h-3" /> Code
          </button>
          <button
            type="button"
            onClick={onSwitchToForm}
            className="px-2.5 py-0.5 rounded text-[11px] font-semibold text-slate-400 hover:text-white flex items-center gap-1"
          >
            <Eye className="w-3 h-3" /> Visual Form
          </button>
        </div>
      </div>

      {/* Editor Body with Line Numbers */}
      <div className="flex-1 flex font-mono text-xs leading-relaxed overflow-hidden">
        {/* Line Numbers Sidebar */}
        <div className="w-12 bg-[#181825] text-slate-600 p-3 select-none text-right font-mono text-[11px] leading-relaxed border-r border-slate-800/80">
          {Array.from({ length: Math.max(lineCount, 35) }).map((_, i) => (
            <div key={i}>{i + 1}</div>
          ))}
        </div>

        {/* Code Input Textarea */}
        <textarea
          value={latexCode}
          onChange={handleCodeChange}
          onBlur={handleRecompile}
          spellCheck={false}
          className="flex-1 p-3 bg-[#1e1e2e] text-slate-100 outline-none leading-relaxed resize-none font-mono text-xs focus:ring-0 selection:bg-blue-600/40"
          placeholder="\documentclass[10pt,a4paper]{article}&#10;\begin{document}&#10;..."
        />
      </div>
    </div>
  );
};
