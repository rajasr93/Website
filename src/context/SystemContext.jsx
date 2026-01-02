import React, { createContext, useContext, useState, useEffect } from 'react';
import bootSound from '../assets/bootup.mp3';

const SystemContext = createContext();

export const useSystem = () => useContext(SystemContext);

export const SystemProvider = ({ children }) => {
    // States: 'OFF', 'BOOTING', 'LOGIN', 'DESKTOP'
    const [systemState, setSystemState] = useState('OFF');

    // Load sound effects
    const playSound = (type) => {
        if (type === 'startup') {
            const audio = new Audio(bootSound);
            audio.volume = 0.5;
            audio.play().catch(e => console.error("Audio play failed", e));
        }
    };

    const turnOn = () => {
        if (systemState === 'OFF') {
            setSystemState('BOOTING');
        }
    };

    const login = () => {
        playSound('login');
        setSystemState('DESKTOP');
    };

    const logout = () => {
        setSystemState('LOGIN');
    };

    const shutdown = () => {
        setSystemState('OFF');
    };

    // Play startup sound when entering DESKTOP from BOOTING
    useEffect(() => {
        if (systemState === 'DESKTOP') {
            playSound('startup');
        }
    }, [systemState]);

    return (
        <SystemContext.Provider value={{ systemState, setSystemState, turnOn, login, logout, shutdown }}>
            {children}
        </SystemContext.Provider>
    );
};
