import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { useWindow } from '../../context/WindowContext';
import minimizeIcon from '../../assets/icons/minimize.png';
import maximizeIcon from '../../assets/icons/maximize.png';
import closeIcon from '../../assets/icons/close.png';

const XPWindow = ({ id, title, children, icon, isMinimized, isMaximized, position, zIndex, type = "explorer" }) => {
    const { closeWindow, focusWindow, minimizeWindow, toggleMaximize } = useWindow();
    const nodeRef = useRef(null);


    // Window body style based on type
    const getBodyStyle = () => {
        switch (type) {
            case 'terminal': return "bg-black text-gray-300 font-dos p-0";
            case 'internet': return "bg-white text-black font-sans";
            case 'document': return "bg-[#ECE9D8] text-black font-sans flex flex-col";
            case 'app': return "bg-[#ECE9D8] text-black font-sans flex flex-col";
            case 'dialog': return "bg-[#ECE9D8] text-black font-sans flex flex-col";
            default: return "bg-white text-black font-sans flex flex-row";
        }
    };

    return (
        <Draggable
            handle=".window-title-bar"
            bounds="parent"
            onStart={() => focusWindow(id)}
            nodeRef={nodeRef}
            disabled={isMaximized}
            defaultPosition={position || { x: 40, y: 40 }}
            position={isMaximized ? { x: 0, y: 0 } : undefined}
        >
            <div
                ref={nodeRef}
                className={`absolute flex flex-col
            bg-xp-beige shadow-xp-window 
            ${isMaximized ? 'w-full h-full top-0 left-0 rounded-none border-0' : (type === 'dialog' ? 'w-fit h-auto rounded-t-lg border-[3px] border-luna-blue-dark rounded-b-none' : 'w-[650px] max-w-[90vw] rounded-t-lg border-[3px] border-luna-blue-dark rounded-b-none')}
            ${isMinimized ? 'invisible pointer-events-none' : 'visible pointer-events-auto'}
          `}
                style={{
                    zIndex,
                    height: isMaximized ? '100%' : (type === 'dialog' ? 'auto' : (type === 'terminal' ? '400px' : '500px')),
                    width: isMaximized ? '100%' : undefined,
                    // Remove top/left styles since Draggable handles transform
                }}
                onMouseDown={() => focusWindow(id)}
            >
                {/* Title Bar */}
                <div
                    className={`window-title-bar h-8 bg-gradient-to-r from-luna-blue-dark via-luna-blue-mid to-luna-blue-light flex items-center justify-between px-2 cursor-default select-none ${isMaximized ? '' : 'rounded-t-[5px]'}`}
                    onDoubleClick={() => toggleMaximize(id)}
                >
                    <div className="flex items-center gap-2">
                        {icon && <img src={icon} alt="" className="w-4 h-4 shadow-sm" />}
                        <span className="text-white font-bold text-sm drop-shadow-md tracking-wide" style={{ textShadow: '1px 1px 1px rgba(0,0,0,0.5)' }}>
                            {title} {type === 'internet' ? '- Internet Explorer' : ''}
                        </span>
                    </div>

                    <div className="flex items-center gap-1">
                        <button
                            onClick={(e) => { e.stopPropagation(); minimizeWindow(id); }}
                            className="w-[21px] h-[21px] flex items-center justify-center active:brightness-90 transition-filter bg-xp-beige/10 rounded-[2px]"
                        >
                            <img src={minimizeIcon} alt="Minimize" className="w-full h-full object-contain" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); toggleMaximize(id); }}
                            className="w-[21px] h-[21px] flex items-center justify-center active:brightness-90 transition-filter bg-xp-beige/10 rounded-[2px] ml-0.5 box-border border-transparent hover:bg-white/10"
                        >
                            <img src={maximizeIcon} alt="Maximize" className="w-full h-full object-contain" />
                        </button>
                        <button
                            onClick={(e) => { e.stopPropagation(); closeWindow(id); }}
                            className="w-[21px] h-[21px] flex items-center justify-center active:brightness-90 transition-filter bg-[#E44C3C] rounded-[2px] ml-0.5 border border-white/20 shadow-sm"
                        >
                            <img src={closeIcon} alt="Close" className="w-full h-full object-contain" />
                        </button>
                    </div>
                </div>

                {/* Common Menubar */}
                {type !== 'terminal' && type !== 'document' && type !== 'app' && type !== 'dialog' && (
                    <div className="bg-[#ECE9D8] border-b border-gray-300 p-0.5 flex items-center text-xs gap-1 pl-2 select-none text-black font-normal cursor-default">
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">File</span>
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">Edit</span>
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">View</span>
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">Favorites</span>
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">Tools</span>
                        <span className="hover:bg-[#1660E8] hover:text-white px-2 py-1 transition-colors">Help</span>
                        {/* XP Throbber */}
                        <div className="ml-auto w-6 h-6 mr-1 bg-gradient-to-br from-gray-100 to-gray-300 border border-gray-400 rounded-sm flex items-center justify-center shadow-inner">
                            {type === 'internet' ? (
                                <div className="w-4 h-4 bg-[#1660E8] opacity-80 rounded-full animate-pulse"></div>
                            ) : (
                                <div className="w-4 h-4 bg-luna-blue-light opacity-50 rounded-sm"></div>
                            )}
                        </div>
                    </div>
                )}

                {/* Toolbar */}
                {type !== 'terminal' && type !== 'document' && type !== 'app' && type !== 'dialog' && (
                    <div className="bg-[#ECE9D8] border-b border-gray-300 p-1 flex items-center gap-1 select-none">
                        <div className="flex items-center gap-0.5 mr-2">
                            <button className="flex items-center gap-1 px-2 py-1 rounded-sm hover:border hover:border-gray-400 hover:bg-white/50 active:translate-y-[1px] disabled:opacity-50">
                                <div className="w-5 h-5 bg-[#3F9C52] rounded-full flex items-center justify-center text-white text-[10px] shadow-sm">←</div>
                                <span className="text-xs">Back</span>
                            </button>
                            <button className="w-5 h-6 flex items-center justify-center hover:bg-white/50 rounded-sm opacity-50">
                                <div className="w-4 h-4 bg-[#3F9C52] rounded-full flex items-center justify-center text-white text-[10px] shadow-sm">→</div>
                            </button>
                        </div>
                        <div className="h-5 w-[1px] bg-gray-400 mx-1"></div>
                        <button className="p-1 hover:border hover:border-gray-400 hover:scale-105 active:scale-95 transition-transform" title="Search">
                            <img src={icon} className="w-5 h-5 opacity-80 grayscale" alt="Search" />
                        </button>
                        {type === 'explorer' && (
                            <button className="p-1 hover:border hover:border-gray-400 hover:scale-105 active:scale-95 transition-transform" title="Folders">
                                <div className="w-5 h-5 bg-yellow-400 border border-yellow-600 rounded-sm shadow-sm flex items-center justify-center text-[9px] font-bold text-yellow-800">F</div>
                            </button>
                        )}
                        {type === 'internet' && (
                            <button className="p-1 hover:border hover:border-gray-400 hover:scale-105 active:scale-95 transition-transform" title="Home">
                                <div className="w-5 h-5 bg-white border border-gray-400 rounded-sm shadow-sm flex items-center justify-center text-[9px]">🏠</div>
                            </button>
                        )}
                    </div>
                )}

                {/* Address Bar */}
                {type !== 'terminal' && type !== 'document' && type !== 'app' && type !== 'dialog' && (
                    <div className="bg-[#ECE9D8] border-b border-gray-300 p-1 flex items-center gap-2 px-2 pb-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]">
                        <span className="text-xs text-gray-500">Address</span>
                        <div className="flex-1 bg-white border border-[#7F9DB9] h-[22px] flex items-center px-1 shadow-[inset_1px_1px_2px_rgba(0,0,0,0.1)]">
                            <img src={icon} className="w-3 h-3 mr-1 opacity-70" alt="" />
                            <span className="text-xs w-full outline-none select-text cursor-text truncate font-sans">
                                {title === 'Experience' ? 'C:\\Documents and Settings\\Owner\\My Documents\\Experience' :
                                    title === 'My Projects' ? 'C:\\Documents and Settings\\Owner\\My Documents\\Projects' :
                                        type === 'internet' ? 'http://www.rajasronghe.com/intelligence' :
                                            'C:\\Documents and Settings\\Owner\\Desktop'}
                            </span>
                        </div>
                        <button className="flex items-center gap-1 bg-[#21A121] active:bg-[#1B891B] text-white text-xs px-2 py-[3px] rounded-sm border border-[#1B891B] shadow-sm hover:brightness-110">
                            Go
                        </button>
                    </div>
                )}

                {/* Window Body */}
                <div className={`flex-1 relative overflow-hidden ${getBodyStyle()}`}>



                    <div className={`h-full w-full custom-scrollbar bg-white flex-1 relative p-0 ${type === 'app' ? 'overflow-hidden' : 'overflow-auto'}`}>
                        {children}
                    </div>
                </div>
            </div>
        </Draggable>
    );
};

export default XPWindow;
