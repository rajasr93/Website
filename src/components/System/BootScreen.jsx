import React, { useEffect } from 'react';
import { useSystem } from '../../context/SystemContext';
import bootGif from '../../assets/boot screen.gif';

const BootScreen = () => {
    const { setSystemState } = useSystem();

    useEffect(() => {
        const timer = setTimeout(() => {
            setSystemState('DESKTOP');
        }, 5000); // 5 seconds boot time

        return () => clearTimeout(timer);
    }, [setSystemState]);

    return (
        <div className="bg-black h-screen w-screen flex flex-col items-center justify-center text-white cursor-none overflow-hidden font-sans">
            {/* Full screen boot GIF or centered GIF? 
                User said "use the windows icon foir boot up screen rescale it" then "instead of the boot animation check the boiot animation file gif"
                Usually these GIFs include the logo and the bar. Let's assume it replaces the main content.
             */}
            <img src={bootGif} alt="Starting Windows..." className="w-full h-full object-cover" />

            <div className="absolute bottom-4 right-6 text-gray-500/50 font-bold italic text-sm">
                Microsoft <span className="text-white/60">Corporation</span>
            </div>
        </div>
    );
};

export default BootScreen;
