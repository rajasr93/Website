import React from 'react';
import { config } from '../../data/config';
import xpLogo from '../../assets/xp/xplogo.webp';

const CreditsWidget = () => {
    return (
        <div className="h-full flex flex-col bg-white overflow-hidden font-sans">
            {/* Header / Gradient Strip - Matching AboutWidget */}
            <div className="h-[70px] bg-gradient-to-r from-white to-[#F0F5FD] flex items-center px-6 shrink-0 border-b border-[#D7D7D7]">
                <div className="flex flex-col">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-[#003399] to-[#0066CC] bg-clip-text text-transparent drop-shadow-sm">
                        Windows XP
                    </h1>
                    <span className="text-gray-500 text-sm italic">Professional</span>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 overflow-auto p-4 bg-[#ECE9D8]/20 flex flex-col items-center justify-center text-center">
                <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200/50 flex flex-col items-center gap-6 max-w-sm">
                    {/* Windows Logo */}
                    <img
                        src={xpLogo}
                        alt="Windows XP"
                        className="w-32 object-contain drop-shadow-sm"
                    />

                    {/* Message */}
                    <div className="flex flex-col gap-2">
                        <p className="text-lg text-[#003399] font-medium">
                            {config.thanks.message}
                        </p>
                    </div>
                </div>
            </div>
            {/* Footer - Consistent with general XP dialogs */}
            <div className="bg-[#ECE9D8] p-3 flex justify-end border-t border-[#D7D7D7]">
                <div className="text-xs text-gray-500">
                    Microsoft Corporation. All rights reserved.
                </div>
            </div>
        </div>
    );
};

export default CreditsWidget;
