import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FileText, LogOut, LayoutDashboard, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAuthPage = ['/login', '/register'].includes(location.pathname);

  return (
    <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-lg shadow-md group-hover:bg-blue-700 transition">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xl font-extrabold text-slate-900 tracking-tight">
            Resume<span className="text-blue-600">Craft</span>
          </span>
        </Link>

        {/* Center Nav Links (Hidden on builder & auth pages) */}
        {!isAuthPage && (
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition">Features</a>
            <a href="#templates" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition">Templates</a>
            <a href="#how-it-works" className="text-xs font-semibold text-slate-600 hover:text-blue-600 transition">How It Works</a>
          </nav>
        )}

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-800 transition"
              >
                <LayoutDashboard className="w-4 h-4 text-blue-600" />
                Dashboard
              </Link>
              <div className="flex items-center gap-2 border-l border-slate-200 pl-3">
                <span className="text-xs font-medium text-slate-700 hidden sm:inline">
                  {user?.name || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-red-600 transition rounded-lg hover:bg-red-50"
                  title="Logout"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 text-xs font-semibold text-slate-700 hover:text-blue-600 transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-sm transition"
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
