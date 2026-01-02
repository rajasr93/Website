import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { config } from '../../data/config';
import xplogo from '../../assets/xp/xplogo.webp';
import userIcon from '../../assets/icons/About me.png'; // Fallback
import userPhoto from '../../assets/icons/photo.png';
import { Power } from 'lucide-react';

const LoginScreen = () => {
    const { login, shutdown } = useSystem();

    return (
        <div className="h-screen w-screen bg-[#003399] flex flex-col font-sans overflow-hidden select-none relative">
            {/* Top Bar (Deco) */}
            <div className="bg-gradient-to-r from-[#003399] via-[#8CB5F7] to-[#003399] h-[2px] w-full absolute top-0 opacity-50"></div>
            <div className="bg-gradient-to-r from-[#003399] via-[#8CB5F7] to-[#003399] h-[2px] w-full absolute bottom-0 opacity-50"></div>


            {/* Main Split Layout */}
            <div className="flex-1 flex items-center justify-center relative">
                {/* Visual Vertical Split Line */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1px] h-2/3 bg-gradient-to-b from-transparent via-white/30 to-transparent"></div>

                <div className="flex w-full max-w-4xl px-8 z-10">

                    {/* Left Side: Logo */}
                    <div className="flex-1 flex flex-col items-end justify-center pr-12">
                        <img src={xplogo} alt="Windows XP" className="w-48 object-contain mb-4 drop-shadow-[0_4px_4px_rgba(0,0,0,0.2)]" />
                        <h1 className="text-white text-xl font-medium drop-shadow-md">
                            To begin, click your user name
                        </h1>
                    </div>

                    {/* Right Side: Users */}
                    <div className="flex-1 flex flex-col items-start justify-center pl-12 space-y-6">

                        {/* User Item */}
                        <div
                            onClick={login}
                            className="group flex items-center gap-4 cursor-pointer p-2 -ml-2 rounded hover:bg-white/10 transition-colors duration-200"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 rounded border-2 border-[#FFE888] bg-orange-400 overflow-hidden shadow-lg group-hover:brightness-110 transition-all">
                                    <img src={userPhoto || userIcon} alt="User" className="w-full h-full object-cover" />
                                </div>
                            </div>
                            <div className="flex flex-col">
                                <span className="text-white text-xl font-medium drop-shadow-sm group-hover:underline decoration-white/50 underline-offset-2">
                                    {config.profile.name.split(' ')[0]}
                                </span>
                                <span className="text-blue-200 text-xs italic">
                                    {config.profile.role}
                                </span>
                            </div>
                        </div>



                    </div>
                </div>
            </div>

            {/* Bottom Panel */}
            <div className="bg-gradient-to-r from-[#003399] via-[#004EBB] to-[#003399] h-16 flex items-center justify-between px-8 border-t border-white/20">
                <button
                    onClick={shutdown}
                    className="flex items-center gap-2 px-3 py-1.5 rounded hover:bg-white/10 active:bg-white/20 transition text-white/90 hover:text-white"
                >
                    <div className="bg-[#E75B3D] p-1 rounded-sm shadow-sm border border-[#A9331C]">
                        <Power size={16} className="text-white" />
                    </div>
                    <span className="text-sm font-bold tracking-wide drop-shadow-sm">Turn off computer</span>
                </button>

                <div className="text-white/50 text-xs italic">
                    After you log on, you can add or change accounts. Just go to Control Panel and click User Accounts.
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;
