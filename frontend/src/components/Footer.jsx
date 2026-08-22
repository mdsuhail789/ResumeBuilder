import React from 'react';
import { FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 border-b border-slate-800 pb-8">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-base">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold text-white tracking-tight">
              Resume<span className="text-blue-400">Craft</span>
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-slate-400 font-medium">
            <a href="#features" className="hover:text-white transition">Features</a>
            <a href="#templates" className="hover:text-white transition">Templates</a>
            <a href="#how-it-works" className="hover:text-white transition">How It Works</a>
            <Link to="/login" className="hover:text-white transition">Sign In</Link>
            <Link to="/register" className="hover:text-white transition">Create Account</Link>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ResumeCraft. Build high-converting, ATS-friendly resumes in minutes.</p>
          <p className="text-[11px]">Crafted for job seekers & freshers worldwide.</p>
        </div>
      </div>
    </footer>
  );
};
