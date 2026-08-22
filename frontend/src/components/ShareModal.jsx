import React, { useState } from 'react';
import { X, Copy, Share2, Globe, Lock, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const ShareModal = ({ isOpen, onClose, resume, onTogglePublic }) => {
  const toast = useToast();
  const [copied, setCopied] = useState(false);
  const [toggling, setToggling] = useState(false);

  if (!isOpen || !resume) return null;

  const publicUrl = `${window.location.origin}/resume/${resume._id}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    toast.success('Resume link copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(`Hi, please check out my professional resume:\n${publicUrl}`);
    window.open(`https://api.whatsapp.com/send?text=${message}`, '_blank');
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resume.personalInfo?.name || 'Resume'} - ResumeCraft`,
          text: 'Check out my professional resume',
          url: publicUrl
        });
      } catch (err) {
        if (err.name !== 'AbortError') {
          toast.error('Could not open share menu');
        }
      }
    } else {
      handleCopy();
    }
  };

  const handleToggle = async () => {
    setToggling(true);
    try {
      await onTogglePublic(!resume.isPublic);
      toast.success(resume.isPublic ? 'Resume set to Private' : 'Resume is now Public!');
    } catch (err) {
      toast.error('Failed to change privacy setting');
    } finally {
      setToggling(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
            <Share2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">Share Your Resume</h3>
            <p className="text-xs text-slate-500">Generate a public link or share directly.</p>
          </div>
        </div>

        {/* Privacy Status Toggle Card */}
        <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 mb-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {resume.isPublic ? (
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
            ) : (
              <div className="w-8 h-8 rounded-lg bg-slate-200 text-slate-600 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
            )}
            <div>
              <p className="text-xs font-bold text-slate-800">
                {resume.isPublic ? 'Public Resume' : 'Private Resume'}
              </p>
              <p className="text-[11px] text-slate-500">
                {resume.isPublic ? 'Anyone with the link can view' : 'Only you can view and edit'}
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={toggling}
            onClick={handleToggle}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
              resume.isPublic
                ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                : 'bg-emerald-600 text-white hover:bg-emerald-700'
            }`}
          >
            {toggling ? 'Updating...' : resume.isPublic ? 'Make Private' : 'Make Public'}
          </button>
        </div>

        {/* Link Share Options */}
        {resume.isPublic ? (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Public Resume Link</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  readOnly
                  value={publicUrl}
                  className="flex-1 p-2 text-xs border border-slate-300 rounded-lg bg-slate-50 font-mono text-slate-600 select-all outline-none"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-sm transition"
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                type="button"
                onClick={handleWhatsApp}
                className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <span className="font-bold text-sm">💬</span> Share on WhatsApp
              </button>

              <button
                type="button"
                onClick={handleNativeShare}
                className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-900 text-white font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-sm transition"
              >
                <Share2 className="w-4 h-4" /> Native Share
              </button>
            </div>
          </div>
        ) : (
          <div className="text-center py-4 bg-amber-50 rounded-xl border border-amber-200">
            <p className="text-xs text-amber-800 font-medium mb-2">
              This resume is currently Private. Turn on Public mode above to share with recruiters or on WhatsApp.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
