/* src/components/Widgets/SkillsWidget.jsx */
import React from 'react';
import { Cpu, Code2, ShieldCheck, Cloud, TerminalSquare } from 'lucide-react';

const SkillsWidget = ({ data }) => {
  
  const getCategoryIcon = (category) => {
    if (category.includes('Cloud')) return <Cloud size={18} />;
    if (category.includes('Security') || category.includes('Tools')) return <ShieldCheck size={18} />;
    if (category.includes('Programming')) return <Code2 size={18} />;
    if (category.includes('Frameworks')) return <TerminalSquare size={18} />;
    return <Cpu size={18} />;
  };

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="w-2 h-8 bg-orange-500 rounded-full"></span>
        Technical Arsenal
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((skillGroup, i) => (
          <div key={i} className="bg-white/5 border border-white/5 rounded-2xl p-6 hover:bg-white/10 transition-colors group">
            <div className="flex items-center gap-3 mb-4 text-orange-400 group-hover:text-orange-300 transition-colors">
              {getCategoryIcon(skillGroup.category)}
              <h3 className="font-bold text-slate-200">{skillGroup.category}</h3>
            </div>
            
            <div className="flex flex-wrap gap-2">
              {skillGroup.items.map((skill, idx) => (
                <span 
                  key={idx} 
                  className="px-2.5 py-1 text-xs font-mono text-slate-300 bg-slate-900 rounded border border-white/10 hover:border-orange-500/50 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWidget;
