import React from 'react';
import { useSystem } from '../../context/SystemContext';

const BlackScreen = () => {
    const { turnOn } = useSystem();

    return (
        <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-white overflow-hidden font-mono selection:bg-white selection:text-black">
            <div className="border-4 border-white p-12 max-w-2xl w-full mx-4 flex flex-col items-center gap-8 relative">
                {/* Content Container */}
                <div className="flex flex-col items-center gap-6 text-center z-10">
                    <h1 className="text-xl md:text-2xl tracking-wider">
                        Rajas Ronghe Portfolio
                        <p>Security Engineer</p>
                    </h1>

                    <div className="flex items-center gap-2 text-lg md:text-xl">
                        <span>Click start to begin</span>
                        <span className="animate-pulse">_</span>
                    </div>

                    <button
                        onClick={turnOn}
                        className="mt-8 px-8 py-3 border-4 border-white text-xl hover:bg-white hover:text-black transition-all duration-200 font-bold tracking-widest uppercase focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-black"
                    >
                        START
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlackScreen;
