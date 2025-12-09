import React from 'react';

const StartWidget = () => {
  return (
    <div className="animate-fade-in space-y-6 font-mono text-gray-800 leading-relaxed">
      {/* Greeting Section */}
      <div>
        <p className="mb-4 text-blue-600 font-bold">System initialized. Welcome to the terminal.</p>
        
        <p className="mb-4">
          I’m <span className="font-bold text-black">Rajas Ronghe</span>, a security engineer who believes that the best way to build a secure system is to understand exactly how to break it. I spend my time architecting cloud defenses, researching the vulnerabilities of AI, and occasionally staring at the night sky. This interface is designed to let you query my background directly from the source.
        </p>
      </div>

      {/* Command Menu */}
      <div className="bg-gray-50 border-l-4 border-blue-500 p-4 rounded-r-md shadow-sm">
        <p className="font-bold mb-3 text-gray-900">To navigate, the following commands are available to you:</p>
        <ul className="space-y-2 text-sm">
          <li>
            <span className="text-blue-600 font-bold">about</span> <span className="text-gray-400 mx-2">-</span> 
            My background and philosophy.
          </li>
          <li>
            <span className="text-blue-600 font-bold">experience</span> <span className="text-gray-400 mx-2">-</span> 
            Professional history and technical roles.
          </li>
          <li>
            <span className="text-blue-600 font-bold">projects</span> <span className="text-gray-400 mx-2">-</span> 
            A log of my engineering and research work.
          </li>
          <li>
            <span className="text-blue-600 font-bold">socials</span> <span className="text-gray-400 mx-2">-</span> 
            Links to my GitHub, LinkedIn, and contact info.
          </li>
          <li>
            <span className="text-blue-600 font-bold">help</span> <span className="text-gray-400 mx-2">-</span> 
            Detailed help menu.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default StartWidget;
