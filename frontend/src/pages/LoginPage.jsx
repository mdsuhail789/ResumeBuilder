import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, FileText, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, loading } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await login({ email, password });
      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.message || 'Login failed. Please check your credentials.';
      setError(msg);
      toast.error(msg);
    }
  };

  const handleDemoLogin = async () => {
    setEmail('muhammad.suhail@example.com');
    setPassword('password123');
    try {
      await login({ email: 'muhammad.suhail@example.com', password: 'password123' });
      toast.success('Logged in with Demo Account!');
      navigate('/dashboard');
    } catch (err) {
      // If demo account doesn't exist yet, attempt register or auto fallback
      try {
        await login({ email: 'muhammad.suhail@example.com', password: 'password123' });
        navigate('/dashboard');
      } catch (e) {
        toast.info('Please register your account to get started!');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md">
            <FileText className="w-6 h-6" />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Resume<span className="text-blue-600">Craft</span>
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900">Welcome Back</h2>
        <p className="mt-1 text-xs text-slate-500">Sign in to your account to manage and edit your resumes.</p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-6 shadow-xl rounded-2xl border border-slate-200/80 sm:px-10">
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold rounded-xl">
              {error}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="name@example.com"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full pl-9 pr-3 py-2.5 text-sm border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs shadow-md transition flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'} <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Demo Account Button */}
          <div className="mt-4 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={handleDemoLogin}
              className="w-full py-2.5 px-4 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold rounded-xl text-xs flex items-center justify-center gap-2 border border-indigo-200 transition"
            >
              <Sparkles className="w-4 h-4" /> Try Quick Demo Login
            </button>
          </div>

          <div className="mt-6 text-center text-xs text-slate-500">
            Don't have an account?{' '}
            <Link to="/register" className="font-bold text-blue-600 hover:underline">
              Create free account
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
