import React from 'react';
import { useWindow } from '../../context/WindowContext';
import errorIcon from '../../assets/icons/close.png'; // Using generic icon or we could use specific error icon if available.
// For a true "msg *" look, it's just a gray box with text and OK.

const MESSAGES = [
    "System Error: ID-10T User Detected",
    "Deleting System32... Please wait.",
    "You have won a free iPod!",
    "Message from Administrator: HELLO",
    "Windows has encountered a critical fun error.",
    "Your trial of 'Living' has expired.",
    "Keyboard not found. Press F1 to continue.",
    "Trojan.Horse.exe successfully installed.",
    "Download Complete: 100% Virus Free"
];

const PopupAd = ({ closeWindow: propCloseWindow, windowId, message: customMessage }) => {
    const { closeWindow: contextCloseWindow } = useWindow();
    const closeWindow = propCloseWindow || contextCloseWindow;
    const message = customMessage || MESSAGES[Math.floor(Math.random() * MESSAGES.length)];

    return (
        <div className="h-full w-full bg-[#ECE9D8] flex flex-col p-4 select-none">
            <div className="flex flex-row items-center gap-4 mb-6">
                {/* Simulated Error Icon */}
                <div className="w-8 h-8 rounded-full bg-red-600 border-2 border-red-800 flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xl">X</span>
                </div>

                <p className="text-black text-sm font-sans">
                    {message}
                </p>
            </div>

            <div className="mt-auto flex justify-center">
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

export default PopupAd;
