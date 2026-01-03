/* src/components/Widgets/ExperienceWidget.jsx */
import React from 'react';

const ExperienceWidget = ({ data }) => {
  return (
    <div className="bg-white text-black font-sans p-8 min-h-full cursor-text select-text">
      {/* WordPad / Word Document feel */}
      <div className="max-w-3xl mx-auto">

        <h2 className="text-xl font-bold border-b-2 border-black mb-6 uppercase tracking-wider">Professional Experience</h2>

        <div className="space-y-6">
          {data.map((job, i) => (
            <div key={i} className="mb-6 pl-4 border-l-4 border-[#316AC5] hover:bg-gray-50 transition-colors py-2 rounded-r-md">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold text-[#1D4078]">{job.role}</h3>
                <span className="text-sm font-bold text-gray-500 min-w-fit ml-2">{job.period}</span>
              </div>
              <div className="text-sm font-semibold italic mb-2 text-black">
                {job.company} — {job.location}
              </div>
              <p className="text-sm leading-relaxed mb-3 text-justify text-gray-800">
                {job.desc}
              </p>
              <div className="text-xs text-gray-600 bg-gray-100 p-2 rounded border border-gray-200 inline-block">
                <span className="font-bold text-gray-800">Technologies:</span> {job.tags.join(', ')}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center text-xs text-gray-400">
          Page 1 of 1
        </div>
      </div>
    </div>
  );
};

export default ExperienceWidget;