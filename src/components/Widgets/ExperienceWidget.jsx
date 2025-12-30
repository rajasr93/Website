/* src/components/Widgets/ExperienceWidget.jsx */
import React from 'react';

const ExperienceWidget = ({ data }) => {
  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b border-teal-100 pb-4">
        <span className="w-2 h-8 bg-teal-500 rounded-full shadow-lg shadow-teal-500/30"></span>
        Professional Experience
      </h2>

      <div className="space-y-12">
        {data.map((job, i) => (
          <div key={i} className="relative pl-6 md:pl-8 border-l border-teal-100 ml-2">
            {/* Timeline Dot */}
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-white border-[3px] border-teal-500 rounded-full shadow-[0_0_15px_rgba(20,184,166,0.5)]"></div>

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
              <h3 className="text-xl font-bold text-slate-800">{job.role}</h3>
              <span className="text-sm font-mono text-white bg-teal-500 px-2 py-0.5 rounded shadow-sm">
                {job.period}
              </span>
            </div>

            <div className="text-slate-600 font-medium mb-4 flex items-center gap-2">
              <span className="text-teal-700 font-bold">{job.company}</span>
              <span className="text-teal-300">•</span>
              <span className="text-xs text-slate-500">{job.location}</span>
            </div>

            {/* The Smart Summary paragraph */}
            <p className="text-slate-600 leading-relaxed text-base mb-5 max-w-4xl text-justify">
              {job.desc}
            </p>

            {/* Tags - Hover removed as requested */}
            <div className="flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <span key={tag} className="px-2.5 py-1 text-[10px] uppercase tracking-wider font-bold text-teal-700 bg-teal-50 rounded border border-teal-200">
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