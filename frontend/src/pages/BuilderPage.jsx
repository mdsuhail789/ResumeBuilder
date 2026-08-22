import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  ArrowLeft,
  Download,
  Share2,
  Palette,
  CheckCircle2,
  Loader2,
  Eye,
  Edit,
  Globe,
  Lock,
  ZoomIn,
  ZoomOut,
  User,
  GraduationCap,
  Briefcase,
  FolderKanban,
  Wrench,
  Award,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as resumeService from '../services/resumeService';
import { initialSampleResume } from '../data/sampleData';
import { generatePDF } from '../utils/pdfGenerator';
import { calculateCompleteness } from '../utils/completenessCalculator';
import { ResumePreview } from '../components/templates/ResumePreview';
import { PersonalInfoForm } from '../components/builder/PersonalInfoForm';
import { SummaryForm } from '../components/builder/SummaryForm';
import { EducationForm } from '../components/builder/EducationForm';
import { ExperienceForm } from '../components/builder/ExperienceForm';
import { ProjectsForm } from '../components/builder/ProjectsForm';
import { SkillsForm } from '../components/builder/SkillsForm';
import { AchievementsForm } from '../components/builder/AchievementsForm';
import { CertificationsForm } from '../components/builder/CertificationsForm';
import { TemplateSelector } from '../components/builder/TemplateSelector';
import { LatexCodeEditor } from '../components/builder/LatexCodeEditor';
import { ShareModal } from '../components/ShareModal';
import { Code, LayoutList } from 'lucide-react';

export const BuilderPage = () => {
  const { resumeId } = useParams();
  const navigate = useNavigate();
  const toast = useToast();
  const { isAuthenticated } = useAuth();

  const [resume, setResume] = useState(initialSampleResume);
  const [loading, setLoading] = useState(true);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved', 'saving', 'unsaved'
  const [activeSection, setActiveSection] = useState('personal');
  const [zoomScale, setZoomScale] = useState(0.85);
  const [mobileTab, setMobileTab] = useState('editor'); // 'editor' | 'preview'
  const [editorMode, setEditorMode] = useState('form'); // 'form' | 'latex'
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // Auto Save debouncer ref
  const saveTimeoutRef = useRef(null);

  // Load Resume Data
  useEffect(() => {
    const loadResume = async () => {
      if (!resumeId || resumeId === 'new') {
        setResume(initialSampleResume);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const data = await resumeService.getResumeById(resumeId);
        setResume(data);
      } catch (err) {
        console.error('Failed to load resume:', err);
        toast.error('Resume not found or access denied');
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    loadResume();
  }, [resumeId, navigate]);

  // Save changes to backend with debouncing
  const saveToBackend = useCallback(async (updatedResumeData) => {
    if (!resumeId || resumeId === 'new' || !isAuthenticated) return;

    setSaveStatus('saving');
    try {
      await resumeService.updateResume(resumeId, updatedResumeData);
      setSaveStatus('saved');
    } catch (err) {
      console.error('Auto save failed:', err);
      setSaveStatus('unsaved');
    }
  }, [resumeId, isAuthenticated]);

  const handleUpdateResume = (updater) => {
    setResume(prev => {
      const nextState = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setSaveStatus('unsaved');

      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
      saveTimeoutRef.current = setTimeout(() => {
        saveToBackend(nextState);
      }, 1500);

      return nextState;
    });
  };

  const handleDownloadPDF = async () => {
    const filename = `${resume.personalInfo?.name || 'Resume'}-Resume.pdf`.replace(/\s+/g, '-');
    toast.info('Preparing your PDF download...');
    try {
      await generatePDF('resume-preview-a4', filename);
      toast.success('PDF Downloaded successfully!');
    } catch (err) {
      toast.error('Failed to export PDF');
    }
  };

  const handleTogglePublic = async (newPublicState) => {
    if (resume._id) {
      const updated = await resumeService.togglePublicResume(resume._id, newPublicState);
      setResume(prev => ({ ...prev, isPublic: updated.isPublic }));
    } else {
      setResume(prev => ({ ...prev, isPublic: newPublicState }));
    }
  };

  const completeness = calculateCompleteness(resume);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          <p className="text-xs font-semibold text-slate-600">Loading Resume Builder...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-slate-100 overflow-hidden">
      {/* Top Builder Toolbar */}
      <header className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between z-30 flex-shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/dashboard')}
            className="p-1.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Editable Title */}
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={resume.title || 'My Resume'}
              onChange={(e) => handleUpdateResume({ title: e.target.value })}
              className="text-sm font-bold text-slate-900 bg-transparent border border-transparent hover:border-slate-300 focus:border-blue-500 rounded px-1.5 py-0.5 outline-none max-w-[160px] sm:max-w-[240px]"
            />
            
            {/* Auto-save badge */}
            <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-slate-500">
              {saveStatus === 'saved' && <span className="text-emerald-600 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Saved ✓</span>}
              {saveStatus === 'saving' && <span className="text-blue-600 animate-pulse flex items-center gap-1"><Loader2 className="w-3.5 h-3.5 animate-spin" /> Saving...</span>}
              {saveStatus === 'unsaved' && <span className="text-amber-600">• Unsaved changes</span>}
            </div>
          </div>
        </div>

        {/* Center Completeness Pill */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full border border-slate-200 text-xs">
          <span className="text-slate-500 font-medium">Completeness:</span>
          <span className="font-bold text-blue-600">{completeness}%</span>
        </div>

        {/* Right Toolbar Actions */}
        <div className="flex items-center gap-2">
          {/* Template Picker Toggle */}
          <button
            onClick={() => setShowTemplateModal(!showTemplateModal)}
            className="px-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg flex items-center gap-1.5 transition"
          >
            <Palette className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Template</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPDF}
            className="px-3.5 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold shadow-xs flex items-center gap-1.5 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Download PDF</span>
          </button>

          {/* Share Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>
      </header>

      {/* Mobile Tab Switcher (Editor vs Preview) */}
      <div className="md:hidden flex border-b border-slate-200 bg-white">
        <button
          onClick={() => setMobileTab('editor')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 ${
            mobileTab === 'editor' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          <Edit className="w-4 h-4" /> Form Editor
        </button>
        <button
          onClick={() => setMobileTab('preview')}
          className={`flex-1 py-2.5 text-xs font-bold flex items-center justify-center gap-1.5 border-b-2 ${
            mobileTab === 'preview' ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-500'
          }`}
        >
          <Eye className="w-4 h-4" /> A4 Live Preview
        </button>
      </div>

      {/* Main Split Layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Form Editor Panel (42% width on Desktop) */}
        <div className={`w-full md:w-[42%] bg-white border-r border-slate-200 flex flex-col h-full ${
          mobileTab === 'preview' ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Mode Switcher Header: Form GUI vs LaTeX Code Editor */}
          <div className="px-4 py-2 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <span className="text-xs font-bold tracking-tight text-slate-300">Editor Mode:</span>
            <div className="flex bg-slate-800 p-0.5 rounded-lg border border-slate-700">
              <button
                type="button"
                onClick={() => setEditorMode('form')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                  editorMode === 'form' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <LayoutList className="w-3.5 h-3.5" /> GUI Form
              </button>
              <button
                type="button"
                onClick={() => setEditorMode('latex')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition ${
                  editorMode === 'latex' ? 'bg-blue-600 text-white shadow-xs' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Code className="w-3.5 h-3.5 text-blue-300" /> 404Team Editor
              </button>
            </div>
          </div>

          {editorMode === 'form' ? (
            <>
              {/* Section Navigation Tabs */}
              <div className="flex items-center gap-1 p-2 bg-slate-50 border-b border-slate-200 overflow-x-auto">
                <button
                  onClick={() => setActiveSection('personal')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'personal' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5" /> Personal
                </button>
                <button
                  onClick={() => setActiveSection('summary')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'summary' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5" /> Summary
                </button>
                <button
                  onClick={() => setActiveSection('education')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'education' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Education
                </button>
                <button
                  onClick={() => setActiveSection('experience')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'experience' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" /> Experience
                </button>
                <button
                  onClick={() => setActiveSection('projects')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'projects' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <FolderKanban className="w-3.5 h-3.5" /> Projects
                </button>
                <button
                  onClick={() => setActiveSection('skills')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'skills' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Wrench className="w-3.5 h-3.5" /> Skills
                </button>
                <button
                  onClick={() => setActiveSection('achievements')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'achievements' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" /> Achievements
                </button>
                <button
                  onClick={() => setActiveSection('certifications')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1 ${
                    activeSection === 'certifications' ? 'bg-white text-blue-600 shadow-xs' : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" /> Certifications
                </button>
              </div>

              {/* Active Section Form Input Panel */}
              <div className="flex-1 overflow-y-auto p-6">
                {activeSection === 'personal' && (
                  <PersonalInfoForm
                    data={resume.personalInfo}
                    onChange={(personalInfo) => handleUpdateResume({ personalInfo })}
                  />
                )}
                {activeSection === 'summary' && (
                  <SummaryForm
                    summary={resume.summary}
                    onChange={(summary) => handleUpdateResume({ summary })}
                  />
                )}
                {activeSection === 'education' && (
                  <EducationForm
                    education={resume.education}
                    onChange={(education) => handleUpdateResume({ education })}
                  />
                )}
                {activeSection === 'experience' && (
                  <ExperienceForm
                    experience={resume.experience}
                    onChange={(experience) => handleUpdateResume({ experience })}
                  />
                )}
                {activeSection === 'projects' && (
                  <ProjectsForm
                    projects={resume.projects}
                    onChange={(projects) => handleUpdateResume({ projects })}
                  />
                )}
                {activeSection === 'skills' && (
                  <SkillsForm
                    skills={resume.skills}
                    onChange={(skills) => handleUpdateResume({ skills })}
                  />
                )}
                {activeSection === 'achievements' && (
                  <AchievementsForm
                    achievements={resume.achievements}
                    onChange={(achievements) => handleUpdateResume({ achievements })}
                  />
                )}
                {activeSection === 'certifications' && (
                  <CertificationsForm
                    certifications={resume.certifications}
                    onChange={(certifications) => handleUpdateResume({ certifications })}
                  />
                )}
              </div>
            </>
          ) : (
            /* LaTeX Code Editor Panel */
            <div className="flex-1 overflow-hidden p-3 bg-[#11111b]">
              <LatexCodeEditor
                resumeData={resume}
                onChange={(updatedFromLatex) => handleUpdateResume(updatedFromLatex)}
                onSwitchToForm={() => setEditorMode('form')}
              />
            </div>
          )}
        </div>

        {/* Right Live Preview Panel (58% width on Desktop) */}
        <div className={`w-full md:w-[58%] bg-slate-200/70 flex flex-col h-full relative ${
          mobileTab === 'editor' ? 'hidden md:flex' : 'flex'
        }`}>
          {/* Zoom Control Strip */}
          <div className="absolute top-4 right-6 z-20 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full border border-slate-300 shadow-sm flex items-center gap-2">
            <button
              onClick={() => setZoomScale(s => Math.max(0.4, s - 0.1))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-xs font-semibold text-slate-700 w-10 text-center">
              {Math.round(zoomScale * 100)}%
            </span>
            <button
              onClick={() => setZoomScale(s => Math.min(1.2, s + 0.1))}
              className="p-1 text-slate-600 hover:text-slate-900"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          {/* Live A4 Resume Container */}
          <div className="flex-1 overflow-auto py-8">
            <ResumePreview resumeData={resume} zoomScale={zoomScale} />
          </div>
        </div>
      </div>

      {/* Template Selector Modal Drawer */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 relative">
            <button
              onClick={() => setShowTemplateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1"
            >
              ✕
            </button>

            <TemplateSelector
              currentTemplate={resume.template}
              currentAccent={resume.accentColor}
              onSelectTemplate={(template) => handleUpdateResume({ template })}
              onSelectAccent={(accentColor) => handleUpdateResume({ accentColor })}
            />

            <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setShowTemplateModal(false)}
                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-sm transition"
              >
                Apply Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        resume={resume}
        onTogglePublic={handleTogglePublic}
      />
    </div>
  );
};
