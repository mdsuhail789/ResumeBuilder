import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  FileText,
  Plus,
  Edit,
  Eye,
  Trash2,
  Share2,
  LayoutDashboard,
  Sparkles,
  User,
  Settings,
  LogOut,
  Globe,
  Lock,
  Clock
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import * as resumeService from '../services/resumeService';
import { calculateCompleteness } from '../utils/completenessCalculator';
import { DeleteModal } from '../components/DeleteModal';
import { ShareModal } from '../components/ShareModal';
import { initialSampleResume } from '../data/sampleData';

export const DashboardPage = () => {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('resumes');

  // Modal states
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [shareTarget, setShareTarget] = useState(null);

  const fetchResumes = async () => {
    setLoading(true);
    try {
      const data = await resumeService.getResumes();
      setResumes(data);
    } catch (err) {
      console.error('Failed to fetch resumes:', err);
      toast.error('Could not load resumes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleCreateNew = async () => {
    try {
      const newResume = await resumeService.createResume({
        title: `${user?.name || 'My'} Resume`,
        personalInfo: {
          name: user?.name || 'Muhammad Suhail',
          email: user?.email || '',
          title: 'Software Developer',
          location: 'Bhopal, Madhya Pradesh'
        },
        ...initialSampleResume
      });
      toast.success('New resume draft created!');
      navigate(`/builder/${newResume._id}`);
    } catch (err) {
      toast.error('Failed to create resume');
    }
  };

  const handleDeleteConfirm = async () => {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await resumeService.deleteResume(deleteTarget._id);
      toast.success('Resume deleted');
      setResumes(prev => prev.filter(r => r._id !== deleteTarget._id));
      setDeleteTarget(null);
    } catch (err) {
      toast.error('Failed to delete resume');
    } finally {
      setDeleting(false);
    }
  };

  const handleTogglePublicInModal = async (newPublicState) => {
    if (!shareTarget) return;
    const updated = await resumeService.togglePublicResume(shareTarget._id, newPublicState);
    setShareTarget(prev => ({ ...prev, isPublic: updated.isPublic }));
    setResumes(prev => prev.map(r => r._id === updated._id ? { ...r, isPublic: updated.isPublic } : r));
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col justify-between p-4 border-r border-slate-800">
        <div>
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 px-3 py-3 mb-6">
            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-base shadow-sm">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-lg font-extrabold text-white tracking-tight">
              Resume<span className="text-blue-400">Craft</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('resumes')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'resumes' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" /> Dashboard / Resumes
            </button>
            <button
              onClick={() => setActiveTab('templates')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'templates' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <Sparkles className="w-4 h-4" /> Resume Templates
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                activeTab === 'profile' ? 'bg-blue-600 text-white' : 'hover:bg-slate-800 text-slate-400'
              }`}
            >
              <User className="w-4 h-4" /> Account Profile
            </button>
          </nav>
        </div>

        {/* Bottom Profile Info */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600/30 text-blue-400 flex items-center justify-center text-xs font-bold border border-blue-500/40">
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'User'}</p>
              <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-800 rounded-lg transition"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 max-w-6xl mx-auto w-full">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-slate-200">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Welcome back, {user?.name?.split(' ')?.[0] || 'User'} 👋
            </h1>
            <p className="text-xs text-slate-500 mt-1">Manage, edit, export and share your professional resumes.</p>
          </div>

          <button
            onClick={handleCreateNew}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" /> Create New Resume
          </button>
        </div>

        {/* Resumes Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-48 bg-slate-200/60 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : resumes.length === 0 ? (
          /* Empty State */
          <div className="bg-white rounded-2xl p-12 border border-slate-200 shadow-sm text-center max-w-lg mx-auto my-12">
            <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 border border-blue-100">
              <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">You haven't created a resume yet</h3>
            <p className="text-xs text-slate-500 mb-6">
              Build your first professional, ATS-friendly resume in under 5 minutes with live A4 preview.
            </p>
            <button
              onClick={handleCreateNew}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition"
            >
              <Plus className="w-4 h-4" /> Create Your First Resume
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((res) => {
              const completeness = calculateCompleteness(res);
              return (
                <div
                  key={res._id}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all flex flex-col justify-between overflow-hidden group"
                >
                  <div className="p-5">
                    {/* Top Info Badge */}
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {res.template || 'Modern'} Template
                      </span>

                      {res.isPublic ? (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <Globe className="w-3 h-3" /> Public
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          <Lock className="w-3 h-3" /> Private
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-bold text-slate-900 truncate mb-1 group-hover:text-blue-600 transition">
                      {res.title || 'My Resume'}
                    </h3>

                    <p className="text-xs text-slate-500 font-medium mb-4 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" /> Updated {formatDate(res.updatedAt)}
                    </p>

                    {/* Progress Completeness Bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[11px] font-semibold text-slate-600">
                        <span>Completeness</span>
                        <span className={completeness >= 80 ? 'text-emerald-600' : 'text-blue-600'}>
                          {completeness}%
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${completeness}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card Actions Footer */}
                  <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-1">
                    <button
                      onClick={() => navigate(`/builder/${res._id}`)}
                      className="flex-1 py-2 px-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1 shadow-xs transition"
                    >
                      <Edit className="w-3.5 h-3.5" /> Edit
                    </button>

                    <button
                      onClick={() => setShareTarget(res)}
                      className="p-2 text-slate-600 hover:text-blue-600 hover:bg-white rounded-lg border border-slate-200 transition"
                      title="Share Resume"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setDeleteTarget(res)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-white rounded-lg border border-slate-200 transition"
                      title="Delete Resume"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDeleteConfirm}
        resumeTitle={deleteTarget?.title}
        deleting={deleting}
      />

      {/* Share Modal */}
      <ShareModal
        isOpen={!!shareTarget}
        onClose={() => setShareTarget(null)}
        resume={shareTarget}
        onTogglePublic={handleTogglePublicInModal}
      />
    </div>
  );
};
