/* src/components/Layout/Header.jsx */
import React from 'react';
import { useTime } from '../../hooks/useTime';
import { config } from '../../data/config';
import { Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const { timeString, dateString } = useTime();

  return (
    <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none">

      {/* LEFT SIDE: Identity & System Time Widget */}
      <div className="flex flex-col gap-6 pointer-events-auto">
        {/* Branding */}
        <div>
          <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase">
            {config.profile.name}
          </h1>
          <p className="text-xs text-cyan-600 font-mono mt-1 mb-3">// {config.profile.role}</p>

          <div className="flex gap-4 text-slate-500">
            <a href={`mailto:${config.profile.email}`} className="hover:text-cyan-600 transition-colors block"><Mail size={18} /></a>
            <a href={config.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Linkedin size={18} /></a>
            <a href={config.profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Github size={18} /></a>
          </div>
        </div>

        {/* System Time Widget (Symmetrical Square) */}
        <div className="bg-white/80 backdrop-blur-md border border-slate-200 rounded-xl p-4 shadow-sm w-64 h-64 flex flex-col justify-between">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest border-b border-slate-100 pb-2">
            System Time
          </h3>
          <div className="flex-1 flex flex-col justify-center items-center font-mono">
            <div className="text-4xl text-slate-800 font-light tracking-tighter">{timeString}</div>
            <div className="text-xs text-slate-400 uppercase mt-2 tracking-widest">{dateString}</div>
          </div>
          <div className="text-[10px] text-slate-300 font-mono text-center">
            SYNC: AUTOMATIC
          </div>
        </div>
      </div>


      {/* RIGHT SIDE: Security Widget (Threat Intel) */}
      <div className="flex flex-col items-end gap-6 pointer-events-auto">

        {/* Threat Intel Widget (Red, Square) */}
        <div className="bg-white/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-5 shadow-sm text-left w-64 h-64 flex flex-col">
          <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 border-b border-red-100 pb-2 flex items-center justify-between">
            <span>Threat Intel</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </h3>

          <div className="space-y-3 flex-1 overflow-y-auto pr-1 custom-scrollbar">
            <div className="group">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Breach Status</div>
              <div className="flex gap-2 text-xs font-mono">
                <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-red-600 transition-colors bg-slate-50 px-2 py-1 rounded border border-slate-100 w-full text-center hover:border-red-200">
                  HIBP
                </a>
                <a href="https://monitor.mozilla.org" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-red-600 transition-colors bg-slate-50 px-2 py-1 rounded border border-slate-100 w-full text-center hover:border-red-200">
                  Mozilla
                </a>
              </div>
            </div>

            <div className="group">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Deep Search</div>
              <a href="https://dehashed.com" target="_blank" rel="noreferrer" className="block text-xs font-mono text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 px-2 py-1 rounded border border-slate-100 hover:border-cyan-200">
                DeHashed Database
              </a>
            </div>

            <div className="group">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Analysis</div>
              <div className="flex gap-2 text-xs font-mono">
                <a href="https://virustotal.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 px-2 py-1 rounded border border-slate-100 w-full text-center hover:border-emerald-200">
                  VirusTotal
                </a>
                <a href="https://urlscan.io" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 px-2 py-1 rounded border border-slate-100 w-full text-center hover:border-cyan-200">
                  Urlscan
                </a>
              </div>
            </div>

            <div className="group border-t border-slate-100 pt-2 mt-1">
              <a href="https://coveryourtracks.eff.org" target="_blank" rel="noreferrer" className="flex justify-between items-center text-xs font-mono text-slate-500 hover:text-amber-600 transition-colors px-1">
                <span>Browser Privacy</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
