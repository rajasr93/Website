/* src/components/Widgets/StartWidget.jsx */
import React from 'react';
import { Terminal, ArrowRight, Power } from 'lucide-react';
import { config } from '../../data/config';

const StartWidget = ({ onNavigate, showGreeting = true }) => {
  const { greeting, bio, instruction, commands } = config.start;

  return (
    <div className="space-y-8 pb-10 animate-fade-in text-left">
      {/* Greeting Block - Only show if showGreeting is true */}
      {showGreeting ? (
        <div className="flex items-start gap-5 border-b border-white/10 pb-8">
          <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400 shrink-0">
            <Power size={32} />
          </div>
          <div className="space-y-3">
            <h2 className="text-xl md:text-2xl font-bold text-emerald-400 font-mono">
              {greeting}
            </h2>
            <p className="text-slate-500 leading-relaxed text-lg">
              {bio}
            </p>
            <div className="mt-4 space-y-2">
              <p className="text-slate-500 text-sm font-mono">
                // {instruction}
              </p>
              <p className="text-slate-400 text-sm font-medium border-t border-slate-200/50 pt-2 mt-2">
                These are the commands that can be used in the searchbox:
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* Menu Mode Header */
        <div className="border-b border-slate-100 pb-4 mb-6">
          <h2 className="text-lg font-bold text-slate-700 font-mono flex items-center gap-2">
            <Terminal size={18} className="text-cyan-500" />
            Command Menu
          </h2>
          <p className="text-slate-400 text-xs mt-1">Select a module to launch or type in the search box below.</p>
        </div>
      )}

      {/* Command Grid */}
      <div className="grid gap-3 md:grid-cols-2">
        {commands.map((item, i) => (
          <button
            key={i}
            onClick={() => onNavigate(item.cmd)}
            className="flex items-center gap-4 p-4 bg-white/50 border border-slate-200 rounded-xl hover:bg-white hover:shadow-md hover:border-cyan-500/30 transition-all group text-left w-full"
          >
            <div className="p-3 bg-slate-100 rounded-lg text-slate-600 group-hover:text-cyan-600 transition-colors">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-slate-800 font-mono group-hover:text-cyan-600 transition-colors capitalize">{item.cmd}</span>
                <ArrowRight size={14} className="text-slate-400 group-hover:translate-x-1 transition-transform group-hover:text-cyan-500" />
              </div>
              <p className="text-slate-500 text-sm mt-1">{item.desc}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default StartWidget;