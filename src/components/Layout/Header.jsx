/* src/components/Layout/Header.jsx */
import React from 'react';
import { useTime } from '../../hooks/useTime';
import { config } from '../../data/config';
import { Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const { timeString, dateString } = useTime();

  return (
    <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none">

      {/* LEFT SIDE: Identity & Socials (Original Layout) */}
      <div className="pointer-events-auto">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {config.profile.name}
        </h1>
        <p className="text-xs text-cyan-600 font-mono mt-1 mb-3">// {config.profile.role}</p>

        <div className="flex gap-4 text-slate-500">
          <div className="relative group">
            <a href={`mailto:${config.profile.email}`} className="hover:text-cyan-600 transition-colors block">
              <Mail size={18} />
            </a>
            <div className="absolute top-full left-0 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
              <div className="bg-white border border-slate-200 text-cyan-600 text-xs font-mono py-2 px-3 rounded-lg shadow-xl relative">
                <div className="absolute -top-1 left-2 w-2 h-2 bg-white border-t border-l border-slate-200 rotate-45"></div>
                {config.profile.email}
              </div>
            </div>
          </div>

          <a href={config.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Linkedin size={18} /></a>
          <a href={config.profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Github size={18} /></a>
        </div>
      </div>


      {/* RIGHT SIDE: Clock & Security Widget */}
      <div className="flex flex-col items-end gap-6 pointer-events-auto">

        {/* Original Clock Layout */}
        <div className="text-right font-mono text-sm text-slate-500">
          <div className="text-slate-900 text-lg">{timeString}</div>
          <div className="text-xs opacity-60 uppercase">{dateString}</div>
        </div>

        {/* Threat Intel Widget (Refined Symmetry) */}
        <div className="bg-white/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-5 shadow-sm text-center w-72 flex flex-col pointer-events-auto">
          <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 border-b border-red-100 pb-2 flex items-center justify-between">
            <span>Threat Intel</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
          </h3>

          <div className="space-y-4">
            {/* Row 1: Breach Status */}
            <div className="group">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest text-left">Breach Status</div>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-red-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-red-200 uppercase font-bold">
                  HIBP
                </a>
                <a href="https://monitor.mozilla.org" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-red-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-red-200 uppercase font-bold">
                  MOZILLA
                </a>
              </div>
            </div>

            {/* Row 2: Deep Search & Analysis */}
            <div className="group">
              <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest text-left">Deep Search</div>
              <a href="https://dehashed.com/search#breachCheck" target="_blank" rel="noreferrer" className="block text-xs font-mono text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-cyan-200 uppercase font-bold mb-2">
                DEHASHED DB
              </a>
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <a href="https://virustotal.com" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-emerald-200 uppercase font-bold">
                  VIRUSTOTAL
                </a>
                <a href="https://urlscan.io" target="_blank" rel="noreferrer" className="text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-cyan-200 uppercase font-bold">
                  URLSCAN
                </a>
              </div>
            </div>

            {/* Row 3: Privacy */}
            <div className="group border-t border-slate-100 pt-2 mt-1">
              <a href="https://coveryourtracks.eff.org" target="_blank" rel="noreferrer" className="flex justify-between items-center text-xs font-mono text-slate-500 hover:text-amber-600 transition-colors px-1 uppercase font-bold">
                <span>BROWSER PRIVACY</span>
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
