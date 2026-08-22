import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ResumePreview } from '../components/templates/ResumePreview';
import { initialSampleResume } from '../data/sampleData';
import {
  Sparkles,
  Eye,
  FileCheck,
  Download,
  Share2,
  Zap,
  CheckCircle2,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 border-b border-slate-200 bg-gradient-to-b from-white to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>Next-Gen Professional Resume Builder</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Build a Resume That <span className="text-blue-600 underline decoration-blue-200">Gets You Noticed</span>.
              </h1>

              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Create a professional, ATS-friendly resume in minutes. Build, customize, download, and share your resume from one place.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/register"
                  className="w-full sm:w-auto px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-500/25 transition flex items-center justify-center gap-2 text-sm"
                >
                  Create My Resume <ArrowRight className="w-4 h-4" />
                </Link>
                <a
                  href="#templates"
                  className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-slate-100 text-slate-800 font-bold rounded-xl border border-slate-200 shadow-xs transition flex items-center justify-center text-sm"
                >
                  View Templates
                </a>
              </div>

              {/* Trust Badges */}
              <div className="pt-4 flex items-center justify-center lg:justify-start gap-6 text-xs font-medium text-slate-500">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% ATS Ready</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> A4 PDF Export</span>
                <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-600" /> Free Public Sharing</span>
              </div>
            </div>

            {/* Right Interactive A4 Resume Mockup */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md bg-white p-3 rounded-2xl shadow-2xl border border-slate-200/80 transform rotate-1 hover:rotate-0 transition-transform duration-300">
                <div className="h-[480px] overflow-hidden rounded-xl bg-slate-100 relative">
                  <div className="transform scale-[0.55] origin-top-left w-[200%]">
                    <ResumePreview resumeData={initialSampleResume} zoomScale={1} />
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/80 via-slate-900/40 to-transparent p-4 text-center">
                    <span className="inline-block px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[11px] font-bold text-slate-800 shadow-md">
                      ✨ Live Interactive A4 Preview
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-blue-600 mb-2">Powerful Features</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Everything You Need to Land Your Dream Job</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Live Resume Preview</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                See your resume update instantly in real-time as you type your information. No reload required.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Professional Templates</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Choose among modern, executive, minimal, and creative templates engineered for recruiter clarity.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center mb-4">
                <Download className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">A4 PDF Export</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Download crisp, print-safe A4 PDFs with vector text quality, preserved margins, and zero layout breakage.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4">
                <Zap className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Auto-Save & Easy Editing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Never lose your progress. Automatic cloud synchronization keeps your resumes updated safely.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
                <Share2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">Public Resume Link</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Generate a clean public link to share your live online resume with recruiters and hiring managers.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 hover:shadow-md transition">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-4">
                <span className="text-xl">💬</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">WhatsApp Sharing</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Send your professional resume directly to recruiters and contacts over WhatsApp with one click.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs uppercase font-bold tracking-widest text-blue-600 mb-2">Simple Process</h2>
            <p className="text-3xl font-extrabold text-slate-900 tracking-tight">Build Your Resume in 4 Easy Steps</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">1</div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Enter Information</h4>
              <p className="text-xs text-slate-500">Fill in your contact info, education, skills, projects, and work experience.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">2</div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Customize Resume</h4>
              <p className="text-xs text-slate-500">Select your favorite template layout and accent colors to match your personality.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">3</div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Preview Live</h4>
              <p className="text-xs text-slate-500">Review your clean A4 resume document live on screen before downloading.</p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center mb-4">4</div>
              <h4 className="text-base font-bold text-slate-900 mb-2">Download or Share</h4>
              <p className="text-xs text-slate-500">Export your A4 PDF or generate a public link to share on WhatsApp or LinkedIn.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Banner */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to build your professional resume?
          </h2>
          <p className="text-blue-100 text-base max-w-xl mx-auto">
            Join thousands of job seekers and freshers creating high-converting resumes in minutes.
          </p>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-xl hover:bg-blue-50 transition text-sm"
          >
            Create Your Resume <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};
