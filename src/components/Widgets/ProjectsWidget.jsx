import React from 'react';
import iconFolder from '../../assets/icons/Folder.png';
import iconAbout from '../../assets/icons/About me.png'; // Fallback for sidebar
import { config } from '../../data/config';

// Sidebar Item Component
const SidebarGroup = ({ title, open = true, children, color = "blue" }) => ( // color not really used yet but for extending
  <div className="mb-4 rounded-t-sm overflow-hidden shadow-sm">
    <div className={`
            bg-gradient-to-r from-[#225AD8] to-[#1C50B3] 
            px-3 py-1 flex justify-between items-center cursor-pointer border-t border-l border-r border-white/40
        `}>
      <span className="text-white font-bold text-xs">{title}</span>
      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
        <svg viewBox="0 0 24 24" className={`w-3 h-3 fill-white transition-transform ${open ? 'rotate-0' : '-rotate-90'}`}>
          <path d="M7 10l5 5 5-5z" />
        </svg>
      </div>
    </div>
    {open && (
      <div className="bg-[#D3E5FA] border-l border-r border-[#9DBBE3] p-3 text-[11px] text-[#1D4078] space-y-2">
        {children}
      </div>
    )}
  </div>
);

const ProjectsWidget = ({ data }) => {
  return (
    <div className="flex h-full bg-[#ECE9D8] font-sans">

      {/* Sidebar - My Computer Style (Blue gradient headers) */}
      <div className="w-[200px] bg-gradient-to-b from-[#7BA2E7] to-[#6375D6] p-3 flex flex-col overflow-y-auto">

        <SidebarGroup title="System Tasks">
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <img src={iconAbout} className="w-4 h-4" alt="" />
            <span>View system information</span>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            {/* Simulated icon */}
            <div className="w-4 h-4 bg-green-500 rounded-sm"></div>
            <span>Add or remove programs</span>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <div className="w-4 h-4 bg-blue-500 rounded-sm"></div>
            <span>Change a setting</span>
          </div>
        </SidebarGroup>

        <SidebarGroup title="Other Places">
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <span className="w-4 h-4 bg-transparent border border-gray-500 rounded-sm"></span>
            <span>My Network Places</span>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <span className="w-4 h-4 bg-yellow-400 rounded-sm"></span>
            <span>My Documents</span>
          </div>
          <div className="flex items-center gap-2 hover:underline cursor-pointer">
            <span className="w-4 h-4 bg-gray-300 rounded-sm"></span>
            <span>Control Panel</span>
          </div>
        </SidebarGroup>

        <SidebarGroup title="Details">
          <div className="font-bold">My Projects</div>
          <div>System Folder</div>
        </SidebarGroup>

      </div>

      {/* Main Content Area - White background with icons */}
      <div className="flex-1 bg-white border-l border-[#8DA6C9] p-4 overflow-y-auto w-full">

        {/* Grouping Header */}
        <div className="group mb-6">
          <h3 className="text-[#1D4078] font-bold text-sm mb-1 px-2">Project Files</h3>
          <div className="h-[1px] bg-gradient-to-r from-[#D3D3D3] via-[#D3D3D3] to-white mb-4"></div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-2">
            {data.map((project, idx) => (
              <div
                key={idx}
                className="flex gap-2 p-2 hover:bg-[#E8F0FA] border border-transparent hover:border-[#BFD6F6] rounded-[2px] cursor-pointer group/item items-start transition-all"
                onDoubleClick={() => window.open(project.link, '_blank')}
              >
                <img src={iconFolder} alt="Project" className="w-9 h-9 object-contain drop-shadow-sm shrink-0" />
                <div className="flex flex-col min-w-0">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-bold text-xs text-black group-hover/item:text-[#1D4078] truncate w-full mb-0.5 pointer-events-auto hover:underline">
                    {project.title}
                  </a>
                  <span className="text-[9px] text-gray-500 uppercase tracking-wide">{project.type}</span>
                  <span className="text-[10px] text-gray-600 line-clamp-2 mt-0.5 leading-snug">{project.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectsWidget;
