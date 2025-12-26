/* src/components/Layout/Header.jsx */
import React from 'react';
import { useTime } from '../../hooks/useTime';
import { config } from '../../data/config';
import { Github, Linkedin, Mail } from 'lucide-react';

const Header = () => {
  const { timeString, dateString } = useTime();

  return (
    <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none">
      {/* Branding & Socials */}
      <div className="pointer-events-auto">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase">
          {config.profile.name}
        </h1>
        <p className="text-xs text-cyan-600 font-mono mt-1 mb-3">// {config.profile.role}</p>

        <div className="flex gap-4 text-slate-500">
          {/* Mail Icon with Pop-up */}
          <div className="relative group">
            <a href={`mailto:${config.profile.email}`} className="hover:text-cyan-600 transition-colors block">
              <Mail size={18} />
            </a>
            {/* The Pop-up */}
            <div className="absolute top-full left-0 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
              <div className="bg-white border border-slate-200 text-cyan-600 text-xs font-mono py-2 px-3 rounded-lg shadow-xl relative">
                {/* Little triangle arrow */}
                <div className="absolute -top-1 left-2 w-2 h-2 bg-white border-t border-l border-slate-200 rotate-45"></div>
                {config.profile.email}
              </div>
            </div>
          </div>

          <a href={config.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Linkedin size={18} /></a>
          <a href={config.profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors"><Github size={18} /></a>
        </div>
      </div>

      {/* Clock */}
      <div className="text-right font-mono text-sm text-slate-500">
        <div className="text-slate-900 text-lg">{timeString}</div>
        <div className="text-xs opacity-60 uppercase">{dateString}</div>
      </div>
    </header>
  );
};

export default Header;
