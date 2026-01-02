import React from 'react';

const EducationWidget = ({ education, certifications }) => {
  return (
    <div className="bg-white text-black font-sans p-8 min-h-full cursor-text select-text">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-xl font-bold border-b-2 border-black mb-6 uppercase tracking-wider">Education & Certifications</h2>

        {/* Education Section */}
        <div className="mb-8">
          <h3 className="font-bold underline mb-4">Academic Background</h3>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <div key={i} className="pl-4 border-l-2 border-gray-300">
                <div className="font-bold text-lg">{edu.school}</div>
                <div>{edu.degree}</div>
                <div className="text-sm text-gray-600">{edu.year}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications Section */}
        {certifications && certifications.length > 0 && (
          <div>
            <h3 className="font-bold underline mb-4">Certifications</h3>
            <ul className="list-disc list-inside space-y-2">
              {certifications.map((cert, i) => (
                <li key={i} className="text-sm">
                  <span className="font-bold">{cert.name}</span>
                  {cert.code && <span className="text-gray-500"> ({cert.code})</span>}
                  <span className="text-gray-500"> - {cert.date}</span>
                  {cert.link && (
                    <a href={cert.link} target="_blank" rel="noreferrer" className="ml-2 text-blue-600 underline">
                      View
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationWidget;
