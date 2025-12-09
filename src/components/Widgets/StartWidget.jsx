/* src/components/Widgets/StartWidget.jsx */
import React from 'react';
import { Terminal, ArrowRight, Power } from 'lucide-react';
import { config } from '../../data/config';

const StartWidget = () => {
  const { greeting, bio, instruction, commands } = config.start;

  return (
    <div className="space-y-8 pb-10 animate-fade-in">
      {/* Greeting Block */}
      <div className="flex items-start gap-5 border-b border-white/10 pb-8">
        <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 shrink-0">
          <Power size={32} />
        </div>
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-emerald-400 font-mono">
            {greeting}
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            {bio}
          </p>
          <p className="text-slate-500 text-sm font-mono mt-2">
            // {instruction}
          </p>
        </div>
      </div>

      {/* Command Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {commands.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group cursor-default">
            <div className="p-3 bg-slate-800 rounded-lg text-emerald-400 group-hover:text-white transition-colors">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-400 font-mono">{item.cmd}</span>
                <ArrowRight size={14} className="text-slate-600 group-hover:translate-x-1 transition-transform" />
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