import React from 'react';
import { Github, ExternalLink, ShieldAlert, BookOpen, Search } from 'lucide-react';

const ProjectsWidget = ({ data }) => {
  
  // Helper to choose icon based on project type
  const getIcon = (type) => {
    if (type === 'Offensive') return <ShieldAlert size={18} />;
    if (type === 'Education') return <BookOpen size={18} />;
    return <Search size={18} />;
  };

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="w-2 h-8 bg-purple-500 rounded-full"></span>
        Active Payloads & Projects
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((project, i) => (
          <div 
            key={i} 
            className="group flex flex-col p-6 bg-white/5 border border-white/5 hover:border-purple-500/50 rounded-2xl transition-all duration-300 hover:bg-white/10 hover:-translate-y-1"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 px-3 py-1.5 text-xs font-bold text-purple-300 bg-purple-500/20 rounded-lg uppercase tracking-wider border border-purple-500/20">
                {getIcon(project.type)}
                {project.type}
              </div>
              <div className="flex gap-2">
                {/* Simulated Links */}
                <Github className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                <ExternalLink className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-100 mb-2 group-hover:text-purple-300 transition-colors">
              {project.title}
            </h3>
            
            <p className="text-slate-400 text-sm leading-relaxed flex-grow">
              {project.desc}
            </p>
            
            <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-xs text-slate-500 font-mono">
              <span>// ACCESS_LEVEL: PUBLIC</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectsWidget;
