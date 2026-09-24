import React from 'react';
import { ResumeData } from '@/lib/types';
import ModernTemplate from './ModernTemplate';
import MinimalTemplate from './MinimalTemplate';
import CreativeTemplate from './CreativeTemplate';
import StudentTemplate from './StudentTemplate';

interface ResumeRendererProps {
  data: ResumeData;
  templateId: 'modern' | 'minimal' | 'creative' | 'student';
  zoom?: number; // e.g. 0.8, 1, 1.2
}

export default function ResumeRenderer({
  data,
  templateId = 'modern',
  zoom = 1,
}: ResumeRendererProps) {
  const renderTemplate = () => {
    switch (templateId) {
      case 'minimal':
        return <MinimalTemplate data={data} />;
      case 'creative':
        return <CreativeTemplate data={data} />;
      case 'student':
        return <StudentTemplate data={data} />;
      case 'modern':
      default:
        return <ModernTemplate data={data} />;
    }
  };

  return (
    <div className="flex justify-center w-full overflow-auto py-4 print:p-0">
      <div
        id="resume-print-area"
        className="resume-print-wrapper transition-transform origin-top"
        style={{
          transform: `scale(${zoom})`,
          width: '210mm',
          minHeight: '297mm',
        }}
      >
        <div
          id="resume-paper"
          className="resume-paper bg-white text-slate-900 shadow-2xl rounded-sm border border-slate-200 print:border-none print:shadow-none min-h-[297mm] isolate"
          style={{ colorScheme: 'light' }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
}
