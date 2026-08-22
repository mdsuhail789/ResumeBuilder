import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Download, Share2, Copy, FileText, Lock, Loader2, Sparkles } from 'lucide-react';
import * as resumeService from '../services/resumeService';
import { ResumePreview } from '../components/templates/ResumePreview';
import { generatePDF } from '../utils/pdfGenerator';
import { useToast } from '../context/ToastContext';

export const PublicResumePage = () => {
  const { resumeId } = useParams();
  const toast = useToast();
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPublicResume = async () => {
      try {
        setLoading(true);
        const data = await resumeService.getPublicResume(resumeId);
        setResume(data);
      } catch (err) {
        console.error('Fetch public resume error:', err);
        setError(err.response?.data?.message || 'This resume is private or does not exist.');
      } finally {
        setLoading(false);
      }
    };

    fetchPublicResume();
  }, [resumeId]);

  const handleDownloadPDF = async () => {
    if (!resume) return;
    const filename = `${resume.personalInfo?.name || 'Resume'}-Resume.pdf`.replace(/\s+/g, '-');
    toast.info('Downloading PDF...');
    try {
      await generatePDF('resume-preview-a4', filename);
      toast.success('PDF Downloaded successfully!');
    } catch (err) {
      toast.error('Could not export PDF');
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Resume link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hi, please check out my professional resume: ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs font-semibold text-slate-600">Loading Resume...</p>
        </div>
      </div>
    );
  }

  if (error || !resume) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center shadow-lg border border-slate-200">
          <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">Resume Unavailable</h2>
          <p className="text-xs text-slate-500 mb-6">{error || 'This resume is set to private by its owner.'}</p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
          >
            Build Your Own Resume Free
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Banner Bar */}
      <header className="bg-white border-b border-slate-200 py-3 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-xs">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
            <FileText className="w-4 h-4" />
          </div>
          <span className="text-base font-extrabold text-slate-900 tracking-tight">
            Resume<span className="text-blue-600">Craft</span>
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyLink}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Copy className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Copy Link</span>
          </button>

          <button
            onClick={handleWhatsApp}
            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
          >
            <span>💬</span>
            <span className="hidden sm:inline">WhatsApp</span>
          </button>

          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
        </div>
      </header>

      {/* Main Resume Render */}
      <main className="flex-1 py-10 overflow-auto">
        <ResumePreview resumeData={resume} zoomScale={1} />
      </main>

      {/* Footer Branding Bar */}
      <div className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-blue-600" />
        <span>Built with <strong>ResumeCraft</strong> • Create your professional resume for free</span>
        <Link to="/register" className="text-blue-600 font-bold hover:underline ml-2">
          Build Yours Now →
        </Link>
      </div>
    </div>
  );
};
