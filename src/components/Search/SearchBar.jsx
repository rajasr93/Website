/* src/components/Search/SearchBar.jsx */
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ input, setInput, isActive }) => {
  return (
    <div 
      className={`
        transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.25,1)] w-full max-w-xl px-4
        ${isActive ? '-translate-y-[38vh] opacity-80 blur-[1px]' : 'translate-y-0 opacity-100 blur-0'}
        hover:opacity-100 hover:blur-0
      `}
    >
      <div className="relative group">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
          <Search className={`w-5 h-5 transition-colors ${isActive ? 'text-cyan-500' : 'text-slate-500'}`} />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type 'help', 'projects', or 'exp'..."
          autoFocus
          className={`
            w-full bg-slate-900/60 backdrop-blur-xl border text-lg md:text-xl py-4 pl-12 pr-6 rounded-2xl shadow-2xl 
            focus:outline-none focus:ring-1 transition-all placeholder:text-slate-600 text-slate-200
            ${isActive ? 'border-cyan-500/30 ring-cyan-500/30' : 'border-white/10 focus:border-cyan-500/50 focus:ring-cyan-500/50'}
          `}
        />
        {/* Helper Text - Fades out completely when active */}
        <div className={`text-center mt-4 text-sm text-slate-500 transition-opacity duration-300 ${isActive ? 'opacity-0' : 'opacity-100'}`}>
           <span className="hidden md:inline">Try typing </span><span className="text-cyan-400">help</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
