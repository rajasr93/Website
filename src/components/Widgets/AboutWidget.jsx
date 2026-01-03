import React from 'react';
import { config } from '../../data/config';
import { useWindow } from '../../context/WindowContext';
import xplogo from '../../assets/xp/xplogo.webp';
// We might not have the exact windows banner, so we'll simulate it with CSS
import iconAbout from '../../assets/icons/About me.png'; // Fallback icon
import userPhoto from '../../assets/icons/photo.png';

const AboutWidget = ({ windowId }) => {
  const { closeWindow } = useWindow();

  return (
    <div className="flex flex-col h-full font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Section containing Header and Copyright - Gray Background */}
      <div className="bg-[#ECE9D8]">
        {/* Header Banner - Simulating the XP About Header */}
        <div className="bg-gradient-to-r from-[#003399] via-[#4d86e1] to-[#003399] p-4 flex items-center border-b border-[#003399] shadow-sm relative overflow-hidden h-24">
          {/* User Photo */}
          <div className="flex items-center gap-4 z-10">
            <img src={userPhoto} alt="User" className="h-20 w-20 object-cover border-2 border-white rounded-md shadow-md" />
            <span className="text-white text-2xl font-bold tracking-wide drop-shadow-md">Rajas Ronghe</span>
          </div>

          {/* Background Accent Lines/Shapes */}

          {/* Background Accent Lines/Shapes to mimic the banner style if needed */}
          <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 bg-gradient-to-l from-white to-transparent transform skew-x-12 translate-x-4"></div>
        </div>
      </div>

      {/* Main Content Area - White Background */}
      <div className="flex-1 bg-white p-5 text-sm text-black overflow-y-auto">
        <div className="border-t border-[#A0A0A0] border-b border-white h-[2px] mb-4"></div>

        <div className="space-y-4 leading-relaxed">
          {config.about.sections.map((section, idx) => (
            <p key={idx} className="text-justify indent-6">
              {section}
            </p>
          ))}

          <div className="leading-snug pt-4">
            <p className="font-bold mb-0">This product is licensed to:</p>
            <div className="ml-0">
              <p className="font-bold mb-0">{config.profile.name}</p>
              <p className="mb-0">{config.profile.role}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#A0A0A0] border-b border-white h-[2px] my-4"></div>

        <div className="flex justify-between items-center text-xs pb-1 px-1">
          <span>Physical memory available to Windows:</span>
          <span className="font-bold">267,366,3719 KB</span>
        </div>
      </div>

      {/* Footer - Gray Background */}
      <div className="bg-[#ECE9D8] p-3 flex justify-end shrink-0">
        <button
          onClick={() => closeWindow(windowId)}
          className="px-6 py-1 border border-[#003c74] rounded-[3px] bg-gradient-to-b from-[#f3f8fe] to-[#cedcf3] hover:from-[#e3eefd] hover:to-[#a7c5ed] text-black text-xs shadow-sm active:bg-[#a7c5ed] min-w-[75px]"
        >
          Exit
        </button>
      </div>

    </div>
  );
};

export default AboutWidget;
