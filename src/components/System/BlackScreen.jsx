import React from 'react';
import { useSystem } from '../../context/SystemContext';
import { Power } from 'lucide-react';

const BlackScreen = () => {
    const { turnOn } = useSystem();

    return (
        <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-white overflow-hidden">
            <button
                onClick={turnOn}
                className="group flex flex-col items-center gap-4 transition-all duration-500 hover:scale-110"
            >
                <div className="w-20 h-20 rounded-full border-4 border-zinc-800 bg-zinc-900 group-hover:border-blue-500 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.6)] flex items-center justify-center transition-all duration-300">
                    <Power size={40} className="text-zinc-600 group-hover:text-blue-400 transition-colors duration-300" />
                </div>
                <span className="text-zinc-600 font-mono text-sm tracking-widest group-hover:text-blue-400 transition-colors duration-300">
                    POWER ON
                </span>
            </button>
        </div>
    );
};

export default BlackScreen;
