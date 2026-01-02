import React from 'react';
import clippyGif from '../../assets/xp/clippy.gif';
import { useWindow } from '../../context/WindowContext';

const ClippyPopup = ({ message, windowId }) => {
    const { closeWindow } = useWindow();

    return (
        <div className="h-full w-full bg-[#ECE9D8] flex flex-col p-4 select-none items-center justify-center">
            <div className="flex flex-row items-start gap-4 mb-4">
                {/* Clippy Image */}
                <img
                    src={clippyGif}
                    alt="Clippy"
                    draggable="false"
                    className="w-[80px] h-[80px] object-contain"
                />

                {/* Speech Bubble / Message Area */}
                <div className="bg-[#FFFFE1] border border-black rounded-lg p-3 max-w-[300px] min-w-[200px] relative text-black text-sm font-sans shadow-md flex items-center">
                    <p className="leading-snug">{message}</p>
                    {/* Bubble Tail pointing left to Clippy */}
                    <div className="absolute top-6 -left-2 w-4 h-4 bg-[#FFFFE1] border-b border-l border-black transform rotate-45"></div>
                </div>
            </div>

            <div className="mt-2 flex justify-center">
                <button
                    className="min-w-[75px] px-3 py-1 bg-gradient-to-b from-[#f8f8f8] to-[#d6d6ce] border border-[#d6d6ce] border-r-gray-600 border-b-gray-600 shadow-[1px_1px_0px_#fff_inset] active:shadow-[1px_1px_0px_#000_inset] active:translate-y-[1px] text-black text-xs font-sans"
                    onClick={() => closeWindow && closeWindow(windowId)}
                >
                    OK
                </button>
            </div>
        </div>
    );
};

export default ClippyPopup;
