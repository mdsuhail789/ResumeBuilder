import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, Home } from 'lucide-react';

export const NotFoundPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-slate-200">
        <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
          <FileQuestion className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">404</h1>
        <h2 className="text-lg font-bold text-slate-800 mb-1">Page Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">The page you are looking for does not exist or has been moved.</p>
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
        >
          <Home className="w-4 h-4" /> Return to Homepage
        </Link>
      </div>
    </div>
  );
};
