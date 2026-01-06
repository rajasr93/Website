import React, { useEffect } from 'react';
import { useWindow } from '../../context/WindowContext';
import Draggable from 'react-draggable';
import Taskbar from './Taskbar';
import XPWindow from './XPWindow';
import TerminalWindow from '../Widgets/TerminalWindow';
import ProjectsWidget from '../Widgets/ProjectsWidget';
import AboutWidget from '../Widgets/AboutWidget';
import ExperienceWidget from '../Widgets/ExperienceWidget';
import SocialsWidget from '../Widgets/SocialsWidget';
import EducationWidget from '../Widgets/EducationWidget';
import { config } from '../../data/config';
import wallpaper from '../../assets/xp/wallpaper.webp'; // Optimized WebP

// Icons
import iconTerminal from '../../assets/icons/cmd.png';
import iconAbout from '../../assets/icons/About me.png';
import iconProjects from '../../assets/icons/My projects.ico'; // Browser usually handles ICO, if not we might need to change
import iconExp from '../../assets/icons/Experience.png';
import iconNews from '../../assets/icons/news.png';
import iconResume from '../../assets/icons/resume download.ico';
import iconUserShare from '../../assets/icons/userinfoshare.ico';
import iconControlPanel from '../../assets/icons/Control Panel.png';
import iconListFile from '../../assets/icons/List File.ico';
import iconHearts from '../../assets/icons/Hearts.ico';

import SkillsWidget from '../Widgets/SkillsWidget';
import BlogWidget from '../Widgets/BlogWidget';
import CreditsWidget from '../Widgets/CreditsWidget';
import MalwareTrigger from '../Widgets/MalwareTrigger';


const DesktopIcon = ({ label, icon, isSelected, onClick, onDoubleClick }) => (
    const [lastTap, setLastTap] = React.useState(0);

const handleTouchEnd = (e) => {
    // Prevent default behavior if needed, but be careful with scrolling. 
    // We generally don't want to prevent default on simple taps unless it's the second tap.

    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTap;

    if (tapLength < 300 && tapLength > 0) {
        // Double Tap detected
        e.stopPropagation();
        e.preventDefault(); // Prevent zoom or other native double-tap actions
        onDoubleClick();
    }

    setLastTap(currentTime);
};

return (
    <div
        className={`flex flex-col items-center w-[80px] gap-1 cursor-pointer group mb-6 p-2 rounded border border-transparent 
            ${isSelected ? 'bg-[#0B61FF]/50 border-[#0B61FF]/50' : 'hover:bg-white/10 hover:border-white/10'}`}
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        onDoubleClick={(e) => { e.stopPropagation(); onDoubleClick(); }}
        onTouchEnd={handleTouchEnd}
    >
        <img
            src={icon}
            alt={label}
            draggable="false"
            className={`w-[48px] h-[48px] object-contain drop-shadow-md transition-opacity ${isSelected ? 'opacity-50' : 'group-hover:opacity-90'}`}
            style={isSelected ? { filter: 'brightness(0.7) sepia(1) hue-rotate(200deg) saturate(2)' } : {}}
        />
        <span
            className={`text-white text-[13px] text-center drop-shadow-md px-1 rounded-sm border border-transparent line-clamp-2 leading-tight
                ${isSelected ? 'bg-[#0B61FF] text-white' : 'group-hover:bg-xp-blue-select group-hover:border-white/20'}`}
            style={{ textShadow: '1px 1px 2px black' }}
        >
            {label}
        </span>
    </div>
);
};



const DesktopEnvironment = () => {
    const { windows, openWindow } = useWindow();
    const [selectedIconIdx, setSelectedIconIdx] = React.useState(null);
    const [iconPositions, setIconPositions] = React.useState({});

    // Grid config
    const GRID_X = 96; // 80px width + 16px gap
    const GRID_Y = 96; // ~height + gap



    const desktopIcons = [
        {
            id: 'terminal',
            label: "Terminal",
            icon: iconTerminal,
            action: () => openWindow('terminal', 'Command Prompt', TerminalWindow, iconTerminal, { type: 'terminal' })
        },
        {
            id: 'about',
            label: "My Profile",
            icon: iconAbout,
            action: () => openWindow('about', 'About Me', AboutWidget, iconAbout, { type: 'document' })
        },
        {
            id: 'projects',
            label: "Projects",
            icon: iconProjects,
            action: () => openWindow('projects', 'My Projects', ProjectsWidget, iconProjects, { data: config.projects, type: 'app' })
        },
        {
            id: 'experience',
            label: "Experience",
            icon: iconExp,
            action: () => openWindow('experience', 'Experience', ExperienceWidget, iconExp, { data: config.experience, type: 'document' })
        },
        {
            id: 'blog',
            label: "Articles",
            icon: iconNews,
            action: () => openWindow('blog', 'Articles', BlogWidget, iconNews, { type: 'app' })
        },
        {
            id: 'education',
            label: "Education",
            icon: iconListFile,
            action: () => openWindow('education', 'Education', EducationWidget, iconListFile, { education: config.education, certifications: config.certifications, type: 'document' })
        },
        {
            id: 'skills',
            label: "Skills",
            icon: iconControlPanel,
            action: () => openWindow('skills', 'Skills', SkillsWidget, iconControlPanel, { data: config.skills, type: 'explorer' })
        },
        {
            id: 'thanks',
            label: "Thank You",
            icon: iconHearts,
            action: () => openWindow('thanks', 'Thank You', CreditsWidget, iconHearts, { type: 'document' })
        },
        {
            id: 'resume',
            label: "Resume",
            icon: iconResume,
            action: () => window.open('/Rajas_Ronghe_Resume_F.pdf', '_blank')
        },
        {
            id: 'socials',
            label: "Socials",
            icon: iconUserShare,
            action: () => openWindow('socials', 'Socials', SocialsWidget, iconUserShare, { type: 'document' })
        },
        {
            id: 'malware',
            label: "free_bitcoin.bat",
            icon: iconHearts,
            action: () => openWindow('malware', 'C:\\WINDOWS\\system32\\cmd.exe', MalwareTrigger, iconHearts, { type: 'terminal' })
        },

    ];

    // Initialize positions on mount
    useEffect(() => {
        const initialPos = {};
        const screenWidth = window.innerWidth;
        const screenHeight = window.innerHeight;

        desktopIcons.forEach((icon, idx) => {
            if (icon.id === 'malware') {
                // Place on the right side
                // x = screenWidth - 100 (enough for icon width)
                // y = same as first row or somewhere specific? User said "opposite to other icons"
                // Let's put it top right: x = screenWidth - 100, y = 20
                initialPos[icon.id] = { x: screenWidth - 120, y: 20 };
            } else {
                // Default Column Layout: Top-Down
                // x = 10, y = 10 + idx * GRID_Y
                // We can wrap columns if too many (e.g. > 6)
                const col = Math.floor(idx / 6);
                const row = idx % 6;
                initialPos[icon.id] = { x: 10 + col * GRID_X, y: 10 + row * GRID_Y };
            }
        });
        setIconPositions(initialPos);
    }, []); // Run once on mount

    const snapToGrid = (x, y) => {
        const snappedX = Math.round(x / GRID_X) * GRID_X + 10;
        const snappedY = Math.round(y / GRID_Y) * GRID_Y + 10;
        return { x: snappedX, y: snappedY };
    };

    const handleDragStop = (id, e, data) => {
        const snapped = snapToGrid(data.x, data.y);
        setIconPositions(prev => ({
            ...prev,
            [id]: snapped
        }));
    };

    return (
        <div
            className="fixed inset-0 overflow-hidden bg-[#004E98] select-none font-sans"
            onContextMenu={(e) => e.preventDefault()} // Optional: Disable right click native menu
            onClick={() => setSelectedIconIdx(null)}
        >
            {/* Background */}
            <img
                src={wallpaper}
                alt=""
                className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
            />

            {/* Desktop Icons Area - Full screen container for drag bounds */}
            <div className="absolute inset-0 z-0">
                {desktopIcons.map((icon, idx) => {
                    const pos = iconPositions[icon.id] || { x: 0, y: 0 };
                    // Only render if we have a position to prevent jump
                    // But init effect runs fast, so check existence
                    if (!iconPositions[icon.id]) return null;

                    return (
                        <Draggable
                            key={icon.id}
                            position={pos}
                            onStop={(e, data) => handleDragStop(icon.id, e, data)}
                            bounds="parent"
                        >
                            <div className="absolute">
                                <DesktopIcon
                                    {...icon}
                                    isSelected={selectedIconIdx === idx}
                                    onClick={() => setSelectedIconIdx(idx)}
                                    // Pass action to OnDoubleClick but react-draggable handles clicks well usually
                                    onDoubleClick={icon.action}
                                />
                            </div>
                        </Draggable>
                    );
                })}
            </div>

            {/* Window Layer */}
            <div className="absolute top-0 left-0 right-0 bottom-[30px] z-10 pointer-events-none">
                {windows.map((win) => (
                    <XPWindow
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        icon={win.icon}
                        isMinimized={win.isMinimized}
                        isMaximized={win.isMaximized}
                        zIndex={win.zIndex}
                        position={win.position}
                        type={win.props?.type || 'explorer'}
                    >
                        <win.Component windowId={win.id} {...win.props} />
                    </XPWindow>
                ))}
            </div>

            <Taskbar />
        </div>
    );
};

export default DesktopEnvironment;
