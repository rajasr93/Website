import React from 'react';
import { useWindow } from '../../context/WindowContext';
import { useSystem } from '../../context/SystemContext';
import { config } from '../../data/config';
import clippy from '../../assets/xp/clippy.gif';
import userIcon from '../../assets/icons/photo.png'; // Updated profile photo

// Icons
import iconTerminal from '../../assets/icons/cmd.png';
import iconProjects from '../../assets/icons/My projects.ico';
import iconExp from '../../assets/icons/Experience.png';
import iconNews from '../../assets/icons/news.png';
import iconEdu from '../../assets/icons/resume download.ico';
import iconAbout from '../../assets/icons/About me.png';
import iconSkills from '../../assets/icons/Control Panel.png'; // Using Control Panel for Skills
import iconFolder from '../../assets/icons/Folder.ico'; // Using Folder for Education

import TerminalWindow from '../Widgets/TerminalWindow';
import ProjectsWidget from '../Widgets/ProjectsWidget';
import ExperienceWidget from '../Widgets/ExperienceWidget';
import BlogWidget from '../Widgets/BlogWidget';
import EducationWidget from '../Widgets/EducationWidget';
import AboutWidget from '../Widgets/AboutWidget';
import SkillsWidget from '../Widgets/SkillsWidget';

const StartMenuItem = ({ icon, label, subLabel, onClick, bold = false }) => (
    <div
        className="flex items-center p-1 hover:bg-[#316AC5] hover:text-white cursor-pointer group rounded-[3px] mb-[2px]"
        onClick={onClick}
    >
        <img src={icon} alt="" className="w-8 h-8 mr-2 object-contain" />
        <div className="flex flex-col">
            <span className={`text-sm ${bold ? 'font-bold' : ''}`}>{label}</span>
            {subLabel && <span className="text-[10px] text-gray-500 group-hover:text-gray-200">{subLabel}</span>}
        </div>
    </div>
);

const StartMenu = ({ isOpen, onClose }) => {
    const { openWindow } = useWindow();
    const { logout, shutdown } = useSystem();

    if (!isOpen) return null;

    const handleOpen = (id, title, Component, icon, props = {}) => {
        openWindow(id, title, Component, icon, props);
        onClose();
    };

    const handleResume = () => {
        // Placeholder for resume URL - assuming it's in the repo or external
        window.open('/Rajas_Ronghe_Resume_F.pdf', '_blank');
        onClose();
    };

    return (
        <div
            className="fixed bottom-[32px] left-0 w-[400px] h-[500px] rounded-t-lg shadow-2xl z-[30000] flex flex-col font-sans overflow-hidden select-none"
            style={{
                borderTopLeftRadius: '10px',
                borderTopRightRadius: '10px',
                boxShadow: '2px 0px 10px rgba(0,0,0,0.5)'
            }}
        >
            {/* Blue Border Container - Authentic XP Blue */}
            <div className="flex-1 flex flex-col bg-[#245CD3] p-[2px] pt-0 pb-0 rounded-t-lg overflow-hidden">

                {/* Header: User Info - Authentic Gradient */}
                {/* Gradient: Top #1C70D2 -> Bottom #1047A8 */}
                <div className="h-[64px] shrink-0 bg-gradient-to-b from-[#1C70D2] to-[#1047A8] flex items-center px-2 relative overflow-hidden rounded-t-md cursor-pointer border-b border-[#3E80E8] shadow-[inset_0px_2px_2px_rgba(255,255,255,0.3)]">
                    {/* Orange top highlight - Solid #F7A33B */}
                    <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#F7A33B] opacity-90 shadow-[0_1px_2px_rgba(0,0,0,0.3)]"></div>

                    <div className="w-[48px] h-[48px] bg-white rounded-[3px] border-2 border-white/80 flex items-center justify-center mr-3 shadow-md relative z-10 overflow-hidden">
                        <img src={userIcon} alt="User" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-white font-bold text-shadow-md text-[18px] z-10 drop-shadow-md tracking-wide">{config.profile.name}</span>
                </div>

                {/* Body: Two Columns */}
                <div className="flex-1 flex relative border border-white/60 bg-white overflow-hidden">
                    {/* Orange Separator Line */}
                    <div className="absolute top-0 bottom-0 left-[50%] w-[1px] bg-gradient-to-b from-[#D3D3D3] via-transparent to-[#D3D3D3] z-10"></div>

                    {/* Left Column: Apps (White) */}
                    <div className="w-1/2 flex flex-col bg-white py-2 px-1">
                        <StartMenuItem
                            icon={iconAbout}
                            label="About"
                            bold
                            onClick={() => handleOpen('about', 'About', AboutWidget, iconAbout, { type: 'explorer' })}
                        />

                        <div className="my-2 mx-2 border-t border-gray-200" />

                        <StartMenuItem
                            icon={iconProjects}
                            label="My Projects"
                            onClick={() => handleOpen('projects', 'My Projects', ProjectsWidget, iconProjects, { data: config.projects, type: 'explorer' })}
                        />
                        <StartMenuItem
                            icon={iconExp}
                            label="Experience"
                            onClick={() => handleOpen('experience', 'Experience', ExperienceWidget, iconExp, { data: config.experience, type: 'explorer' })}
                        />
                        <StartMenuItem
                            icon={iconFolder}
                            label="Education"
                            onClick={() => handleOpen('education', 'Education', EducationWidget, iconFolder, { education: config.education, certifications: config.certifications, type: 'explorer' })}
                        />
                        <StartMenuItem
                            icon={iconSkills}
                            label="Skills"
                            onClick={() => handleOpen('skills', 'Skills', SkillsWidget, iconSkills, { data: config.skills, type: 'explorer' })}
                        />
                        <StartMenuItem
                            icon={iconEdu}
                            label="Resume"
                            subLabel="Open PDF"
                            onClick={handleResume}
                        />

                        <div className="my-2 mx-2 border-t border-gray-200" />

                        <StartMenuItem
                            icon={iconNews}
                            label="Articles"
                            subLabel="Articlers"
                            bold
                            onClick={() => handleOpen('blog', 'Articles', BlogWidget, iconNews, { type: 'internet' })}
                        />
                        <StartMenuItem
                            icon={iconTerminal}
                            label="Command Prompt"
                            onClick={() => handleOpen('terminal', 'Command Prompt', TerminalWindow, iconTerminal, { type: 'terminal' })}
                        />

                        <div className="flex-1" />
                        {/* All Programs Removed */}
                    </div>

                    {/* Right Column: System & Bio (Blue) - Authentic XP Lighter Blue */}
                    <div className="w-1/2 bg-[#D3E5FA] border-l border-[#95BDE7] py-1 px-1 flex flex-col text-xs text-[#1D4078] items-center justify-center shadow-[inset_1px_0_0_white]">

                        {/* Clippy Section - Reserved Space */}
                        <div className="flex flex-col items-center justify-center h-full w-full px-2">
                            <div className="relative mb-2 w-full max-w-[180px]">
                                <div className="bg-[#FFFFCC] border border-black p-3 rounded-lg text-sm leading-relaxed shadow-[2px_2px_8px_rgba(0,0,0,0.2)] text-center text-black font-medium relative z-10">
                                    <p className="font-bold mb-1 text-[15px]">{config.start.greeting}</p>
                                    <div className="my-1 border-t border-black/20"></div>
                                    <p className="text-xs leading-tight">{config.start.bio}</p>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-[#FFFFCC] border-r border-b border-black rotate-45"></div>
                                </div>
                            </div>
                            <img src={clippy} alt="Clippy" className="w-20 h-20 object-contain mt-2 drop-shadow-xl" />
                        </div>

                    </div>
                </div>

                {/* Footer: Log Off / Turn Off - Authentic Gradient */}
                {/* Gradient: Top #257CE3 -> Bottom #1653B7 */}
                <div className="h-[44px] shrink-0 bg-gradient-to-b from-[#257CE3] to-[#1653B7] flex items-center justify-end px-3 gap-3 shadow-[inset_0px_1px_2px_rgba(255,255,255,0.4)] border-t border-[#468FEA] rounded-b-sm">
                    <button
                        onClick={logout}
                        className="group flex items-center gap-1 text-white hover:text-white/90 active:brightness-90 transition-all text-xs cursor-pointer"
                    >
                        <div className="w-7 h-7 bg-[#E8A232] rounded-[3px] border border-white/40 shadow-sm flex items-center justify-center group-hover:bg-[#F2B958]">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-sm">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 14c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm5.01-9.93l-1.35 1.48C17.47 6.13 15.86 5 14 5c-3.87 0-7 3.13-7 7s3.13 7 7 7c2.18 0 4.12-1.07 5.34-2.68l1.35 1.55C19.12 19.96 16.73 21 14 21c-4.97 0-9-4.03-9-9s4.03-9 9-9c2.51 0 4.81 1.09 6.49 2.8z" />
                            </svg>
                        </div>
                        <span>Log Off</span>
                    </button>

                    <button
                        onClick={shutdown}
                        className="group flex items-center gap-1 text-white hover:text-white/90 active:brightness-90 transition-all text-xs cursor-pointer"
                    >
                        <div className="w-7 h-7 bg-[#E05B35] rounded-[3px] border border-white/40 shadow-sm flex items-center justify-center group-hover:bg-[#E87352]">
                            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-sm">
                                <path d="M13 3h-2v10h2V3zm4.83 2.17l-1.42 1.42C17.99 7.86 19 9.81 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7c0-2.19 1.01-4.14 2.58-5.42L6.17 5.17C4.23 6.82 3 9.26 3 12c0 4.97 4.03 9 9 9s9-4.03 9-9c0-2.74-1.23-5.18-3.17-6.83z" />
                            </svg>
                        </div>
                        <span>Turn Off Computer</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default StartMenu;
