import React from 'react';
import { useTime } from '../../hooks/useTime'; // reusing the hook
import { config } from '../../data/config';

const Header = () => {
  const { timeString, dateString } = useTime();

  return (
    <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex justify-between items-start z-50 pointer-events-none">
      {/* Branding */}
      <div className="pointer-events-auto">
        <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-100 uppercase">
          {config.profile.name}
        </h1>
        <p className="text-xs text-cyan-400 font-mono mt-1">// {config.profile.role}</p>
      </div>

      {/* Clock */}
      <div className="text-right font-mono text-sm text-slate-400">
        <div className="text-slate-200 text-lg">{timeString}</div>
        <div className="text-xs opacity-60 uppercase">{dateString}</div>
      </div>
    </header>
  );
};

export default Header;
