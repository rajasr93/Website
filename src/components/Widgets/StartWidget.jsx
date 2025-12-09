/* src/components/Widgets/StartWidget.jsx */
import React from 'react';
import { Terminal, ArrowRight, Power } from 'lucide-react';
import { config } from '../../data/config';

const StartWidget = () => {
  const commands = [
    { cmd: "start", desc: "Initialize system & view command menu" },
    { cmd: "about", desc: "User profile, bio & certifications" },
    { cmd: "experience", desc: "Professional history & operations log" },
    { cmd: "projects", desc: "Active payloads & research archives" },
    { cmd: "skills", desc: "Technical arsenal & tool inventory" },
    { cmd: "education", desc: "Academic credentials & degrees" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <div className="flex items-center gap-4 border-b border-white/10 pb-6">
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
          <Power size={32} />
        </div>
        <div>
          <h2 className="text-3xl font-bold text-slate-100">Welcome, User.</h2>
          <p className="text-slate-400 font-mono text-sm mt-1">System ready. Select a vector to begin.</p>
        </div>
      </div>

      <div className="grid gap-3">
        {commands.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <div className="p-3 bg-slate-800 rounded-lg text-cyber group-hover:text-white transition-colors">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-400 font-mono">{item.cmd}</span>
                <ArrowRight size={14} className="text-slate-600" />
              </div>
              <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StartWidget;
