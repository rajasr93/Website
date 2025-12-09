import React from 'react';

const ExperienceWidget = ({ data }) => {
  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="w-2 h-8 bg-cyan-500 rounded-full"></span>
        Professional Experience
      </h2>
      
      <div className="space-y-12">
        {data.map((job, i) => (
          <div key={i} className="relative pl-6 md:pl-8 border-l border-white/10 ml-2">
            <div className="absolute left-[-5px] top-2 w-2.5 h-2.5 bg-slate-900 border border-cyan-500 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]"></div>
            
            <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-1">
              <h3 className="text-xl font-bold text-slate-100">{job.role}</h3>
              <span className="text-sm font-mono text-cyan-400/80">{job.period}</span>
            </div>
            
            <div className="text-slate-400 font-medium mb-3">{job.company}</div>
            <p className="text-slate-300 leading-relaxed text-sm mb-4 max-w-3xl">{job.desc}</p>
            
            <div className="flex flex-wrap gap-2">
              {job.tags.map(tag => (
                <span key={tag} className="px-2 py-1 text-[10px] uppercase tracking-wider font-bold text-cyan-300 bg-cyan-950/30 rounded border border-cyan-500/20">
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
