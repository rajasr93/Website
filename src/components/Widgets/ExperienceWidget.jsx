/* src/components/Widgets/ExperienceWidget.jsx */
import React from 'react';

const ExperienceWidget = ({ data }) => {
  return (
    <div className="bg-white text-black font-sans p-8 min-h-full cursor-text select-text">
      {/* WordPad / Word Document feel */}
      <div className="max-w-3xl mx-auto">

        <h2 className="text-xl font-bold border-b-2 border-black mb-4 uppercase tracking-wider">Professional Experience</h2>

        <div className="space-y-8">
          {data.map((job, i) => (
            <div key={i} className="mb-6">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="text-lg font-bold">{job.role}</h3>
                <span className="text-sm font-bold">{job.period}</span>
              </div>
              <div className="text-sm italic mb-2">
                {job.company} — {job.location}
              </div>
              <p className="text-sm leading-relaxed mb-2 text-justify">
                {job.desc}
              </p>
              <div className="text-xs text-gray-600">
                <span className="font-bold">Technologies:</span> {job.tags.join(', ')}
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