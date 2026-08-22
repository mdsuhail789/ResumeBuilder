import React from 'react';
import { AlertTriangle, X } from 'lucide-react';

export const DeleteModal = ({ isOpen, onClose, onConfirm, resumeTitle = 'this resume', deleting = false }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mb-4 mx-auto">
          <AlertTriangle className="w-6 h-6" />
        </div>

        <h3 className="text-base font-bold text-slate-900 text-center mb-1">Delete Resume?</h3>
        <p className="text-xs text-slate-500 text-center mb-6">
          Are you sure you want to delete <span className="font-semibold text-slate-800">"{resumeTitle}"</span>? This action cannot be undone.
        </p>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition shadow-sm"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  );
};
