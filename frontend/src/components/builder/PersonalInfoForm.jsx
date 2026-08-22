import React from 'react';
import { User, Briefcase, Mail, Phone, MapPin, Globe, Image } from 'lucide-react';
import { LinkedinIcon, GithubIcon } from '../Icons';

export const PersonalInfoForm = ({ data = {}, onChange }) => {
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-slate-200 pb-3 mb-4">
        <h3 className="text-base font-semibold text-slate-900">Personal Information</h3>
        <p className="text-xs text-slate-500">Enter your basic contact details and headline.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Full Name <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.name || ''}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="e.g. Muhammad Suhail"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Professional Title</label>
          <div className="relative">
            <Briefcase className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="e.g. Frontend Developer / Full Stack Engineer"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Email Address</label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => handleChange('email', e.target.value)}
              placeholder="email@example.com"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.phone || ''}
              onChange={(e) => handleChange('phone', e.target.value)}
              placeholder="+91 98765 43210"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Location</label>
          <div className="relative">
            <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.location || ''}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="e.g. Bhopal, Madhya Pradesh"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">Portfolio / Website</label>
          <div className="relative">
            <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.website || ''}
              onChange={(e) => handleChange('website', e.target.value)}
              placeholder="https://yourportfolio.com"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">LinkedIn Profile</label>
          <div className="relative">
            <LinkedinIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.linkedin || ''}
              onChange={(e) => handleChange('linkedin', e.target.value)}
              placeholder="https://linkedin.com/in/username"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">GitHub Profile</label>
          <div className="relative">
            <GithubIcon className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.github || ''}
              onChange={(e) => handleChange('github', e.target.value)}
              placeholder="https://github.com/username"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-slate-700 mb-1">Profile Photo URL (Optional)</label>
          <div className="relative">
            <Image className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              value={data.photo || ''}
              onChange={(e) => handleChange('photo', e.target.value)}
              placeholder="https://example.com/avatar.jpg"
              className="w-full pl-9 pr-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
