import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

const EducationWidget = ({ data }) => {
  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-3 border-b border-slate-200 pb-4">
        <span className="w-2 h-8 bg-emerald-500 rounded-full"></span>
        Academic Credentials
      </h2>

      <div className="grid gap-4">
        {data.map((edu, i) => (
          <div
            key={i}
            className="flex flex-col sm:flex-row gap-5 p-6 bg-white/50 border border-slate-200 rounded-2xl hover:border-emerald-500/30 transition-colors shadow-sm"
          >
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                <GraduationCap size={24} />
              </div>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <h3 className="text-xl font-bold text-slate-800">{edu.school}</h3>
                <span className="text-xs font-mono text-emerald-500/80 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/20 whitespace-nowrap ml-2">
                  {edu.year}
                </span>
              </div>
              <div className="text-lg text-emerald-600 font-medium mt-1">{edu.degree}</div>

              {/* Optional: Simulated courses or achievements if you add them to config later */}
              <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                <Award size={14} />
                <span>Verified Institution</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EducationWidget;
