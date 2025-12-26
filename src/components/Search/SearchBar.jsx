/* src/components/Search/SearchBar.jsx */
import React from 'react';
import { Search } from 'lucide-react';

const SearchBar = ({ input, setInput, isActive }) => {
  return (
    <div className="w-full max-w-xl px-2">
      <div className="relative group">
        <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-slate-400 group-focus-within:text-cyan-600 transition-colors" />
        </div>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type Start..."
          autoFocus
          className={`
            w-full bg-white/80 backdrop-blur-xl border text-lg md:text-xl py-4 pl-14 pr-6 rounded-2xl shadow-lg
            focus:outline-none focus:ring-2 transition-all placeholder:text-slate-400 text-slate-900 font-medium
            ${isActive ? 'border-cyan-500/30 ring-cyan-500/20' : 'border-slate-200 focus:border-cyan-500/50 focus:ring-cyan-500/20'}
          `}
        />
      </div>
    </div>
  );
};

export default SearchBar;
