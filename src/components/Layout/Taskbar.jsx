import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../../context/WindowContext';
import startBtn from '../../assets/xp/start.png'; // Make sure this path is correct
import StartMenu from './StartMenu';

const Taskbar = () => {
    const { windows, toggleMinimize, activeWindowId, killMalware } = useWindow();
    const [time, setTime] = useState(new Date());
    const [isStartOpen, setIsStartOpen] = useState(false);
    const startRef = useRef(null);

    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    // Close start menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (startRef.current && !startRef.current.contains(event.target)) {
                setIsStartOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const formatTime = (date) => {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <>
            {/* Helper to close start menu from context if needed, but click outside works */}
            <div ref={startRef} className="z-[9999]" style={{ display: 'contents' }}>
                <StartMenu isOpen={isStartOpen} onClose={() => setIsStartOpen(false)} />

                <div className="fixed bottom-0 left-0 w-full h-[30px] bg-gradient-to-b from-taskbar-start to-taskbar-end border-t border-luna-blue-light z-[9999] flex items-center px-0 select-none">

                    {/* Start Button - Blended Edge */}
                    <button
                        onClick={() => {
                            const hasMalware = windows.some(w => w.id === 'malware' || w.id.startsWith('popup-'));
                            if (hasMalware) {
                                // "Invisible" kill switch - just cleans up silently
                                killMalware();
                                // Optional: You could still open the menu or keep it closed. User said "ui only after malware program is run press on start button to remove"
                                // Implicitly implies 'clearing' is the action. Let's toggle menu ONLY if safe?
                                // Or maybe just clear it and do nothing else to be "invisible".
                                // User said "to refresh the ui", so removing popups is the goal.
                                // Let's NOT open the menu if we just killed malware, to make it feel like a "Reset" button.
                            } else {
                                setIsStartOpen(!isStartOpen);
                            }
                        }}
                        className={`
                        h-full relative overflow-visible group active:brightness-90 transition-all px-0 mr-0 flex items-center justify-start z-[10000]
                        ${isStartOpen ? 'brightness-90' : ''}
                    `}
                        style={{
                            // Fix alignment: button image is taller than bar
                        }}
                    >
                        <img
                            src={startBtn}
                            alt="Start"
                            className="h-[105%] w-auto max-w-none object-contain drop-shadow-md pb-0.5 ml-[-2px]"
                            style={{
                                imageRendering: 'pixelated',
                                transform: 'translateY(2%)' // Minimal vertical adjustment
                            }}
                        />
                    </button>

                    {/* Quick Launch / Divider */}
                    <div className="w-[2px] h-[60%] bg-blue-400/30 mx-1 border-l border-white/20 border-r border-black/20 self-center" />

                    {/* Window Tabs */}
                    <div className="flex-1 flex items-center px-1 gap-1 overflow-x-auto">
                        {windows.map((win) => (
                            <button
                                key={win.id}
                                onClick={() => toggleMinimize(win.id)}
                                className={`
                                h-[22px] min-w-[150px] max-w-[200px] flex items-center px-2 rounded-[3px]
                                border border-black/20 shadow-sm transition-colors text-xs text-white left-align truncate
                                ${activeWindowId === win.id && !win.isMinimized
                                        ? 'bg-blue-800/60 shadow-inner' // Active: Darker/Pressed
                                        : 'bg-[#3c81f3] hover:bg-[#5392f7]' // Inactive: Lighter Blue
                                    }
                            `}
                            >
                                {/* Icon if available */}
                                {win.icon && <img src={win.icon} alt="" className="w-4 h-4 mr-2" />}
                                <span className="truncate drop-shadow-sm">{win.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* System Tray */}
                    <div className="h-full bg-[#0b77e9] border-l border-[#104a8b] shadow-inner px-4 flex items-center gap-2 text-white text-xs font-sans">
                        <span>{formatTime(time)}</span>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Taskbar;
