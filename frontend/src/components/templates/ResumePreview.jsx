import React from 'react';
import { ModernTemplate } from './ModernTemplate';
import { ClassicTemplate } from './ClassicTemplate';
import { MinimalTemplate } from './MinimalTemplate';
import { CreativeTemplate } from './CreativeTemplate';

export const ResumePreview = ({ resumeData, zoomScale = 1 }) => {
  if (!resumeData) return null;

  const renderTemplate = () => {
    switch (resumeData.template) {
      case 'classic':
        return <ClassicTemplate data={resumeData} />;
      case 'minimal':
        return <MinimalTemplate data={resumeData} />;
      case 'creative':
        return <CreativeTemplate data={resumeData} />;
      case 'modern':
      default:
        return <ModernTemplate data={resumeData} />;
    }
  };

  return (
    <div className="flex justify-center items-start overflow-auto p-4 w-full">
      <div
        className="transition-transform duration-200 origin-top"
        style={{ transform: `scale(${zoomScale})` }}
      >
        <div
          id="resume-preview-a4"
          className="resume-a4-page bg-white shadow-2xl rounded-sm border border-slate-200 text-slate-800"
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
