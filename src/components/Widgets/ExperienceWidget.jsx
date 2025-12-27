/* src/components/Widgets/ExperienceWidget.jsx */
import React from 'react';

const ExperienceWidget = ({ data }) => {
  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="w-2 h-8 bg-slate-500 rounded-full"></span>
        Professional Experience
      </h2>

      <div className="space-y-12">
        {data.map((job, i) => (
          <div key={i} className="relative pl-6 md:pl-8 border-l border-slate-200 ml-2">
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-slate-900 borderQD border-slate-500 rounded-full shadow-[0_0_10px_rgba(100,116,139,0.5)]"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
              <h3 className="text-xl font-bold text-slate-800">{job.role}</h3>
              <span className="text-sm font-mono text-white bg-slate-600/80 px-2 py-0.5 rounded border border-slate-500/30">
                {job.period}
              </span>
            </div>

            <div className="text-slate-600 font-medium mb-4 flex items-center gap-2">
              {job.company}
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-500">{job.location}</span>
            </div>

            {/* The Smart Summary Paragraph */}
            <p className="text-gray-700 leading-relaxed text-base mb-5 max-w-4xl text-justify">
              {job.desc}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-white bg-slate-600/80 rounded border border-slate-500/30 hover:bg-slate-700 transition-colors">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceWidget;