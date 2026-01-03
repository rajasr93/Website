import React, { createContext, useContext, useState, useCallback } from 'react';

const WindowContext = createContext();

export const useWindow = () => useContext(WindowContext);

export const WindowProvider = ({ children }) => {
    const [windows, setWindows] = useState([]);
    const [activeWindowId, setActiveWindowId] = useState(null);

    // Z-Index Management
    // Focused window: 100 + n (where n is strict order or just high number)
    // Unfocused: 10
    // Taskbar: 9999 (handled in CSS)

    const focusWindow = useCallback((id) => {
        setActiveWindowId(id);
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id
                    ? { ...win, zIndex: 200, isMinimized: false } // Bring to very front
                    : { ...win, zIndex: win.zIndex < 100 ? win.zIndex : 10 } // Drop others
            )
        );
    }, []);

    const [cascadeOffset, setCascadeOffset] = useState(0);

    const cascadeIndex = React.useRef(0);

    const openWindow = useCallback((id, title, Component, icon = null, initProps = {}) => {
        setWindows((prev) => {
            const existing = prev.find((w) => w.id === id);
            if (existing) {
                // If minimized, restore it
                if (existing.isMinimized) {
                    // handled recursively or by state update
                }
                return prev.map(w => w.id === id ? { ...w, isMinimized: false, zIndex: 200 } : { ...w, zIndex: 10 });
            }

            // Reset cascade if all windows are closed
            if (prev.length === 0) {
                cascadeIndex.current = 0;
            }

            // Calculate Cascade Position with wrapping
            const step = 30; // 30px step
            const maxOffset = 300; // Reset after 10 windows (approx)

            let currentStep = cascadeIndex.current;
            const offset = currentStep * step;

            // Increment for next window, wrap if too far
            cascadeIndex.current = (offset + step > maxOffset) ? 0 : cascadeIndex.current + 1;

            const baseX = 250;
            const baseY = 40;

            const newWin = {
                id,
                title,
                icon,
                Component,
                props: initProps,
                isMinimized: false,
                zIndex: 200, // Start focused
                isMaximized: false,
                position: initProps.position || { x: baseX + offset, y: baseY + offset }
            };

            // Demote others
            const demoted = prev.map(w => ({ ...w, zIndex: 10 }));
            return [...demoted, newWin];
        });
        setActiveWindowId(id);
    }, []);

    const closeWindow = useCallback((id) => {
        setWindows((prev) => prev.filter((w) => w.id !== id));
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const minimizeWindow = useCallback((id) => {
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id ? { ...win, isMinimized: true, zIndex: 1 } : win
            )
        );
        if (activeWindowId === id) {
            setActiveWindowId(null);
        }
    }, [activeWindowId]);

    const killMalware = useCallback(() => {
        setWindows((prev) => prev.filter(w => !w.id.startsWith('popup-') && w.id !== 'malware'));
        setActiveWindowId(null);
    }, []);

    const toggleMinimize = useCallback((id) => {
        setWindows(prev => {
            const win = prev.find(w => w.id === id);
            if (!win) return prev;

            if (win.isMinimized) {
                // Restore
                return prev.map(w =>
                    w.id === id
                        ? { ...w, isMinimized: false, zIndex: 200 }
                        : { ...w, zIndex: 10 }
                );
            } else {
                // If it IS open, check if it's focused. 
                if (win.zIndex >= 100) {
                    // It is active/focused -> Minimize
                    return prev.map(w => w.id === id ? { ...w, isMinimized: true, zIndex: 1 } : w);
                } else {
                    // It is visible but background -> Focus
                    return prev.map(w =>
                        w.id === id
                            ? { ...w, isMinimized: false, zIndex: 200 }
                            : { ...w, zIndex: 10 }
                    );
                }
            }
        });
    }, []);

    const toggleMaximize = useCallback((id) => {
        setWindows((prev) =>
            prev.map((win) =>
                win.id === id ? { ...win, isMaximized: !win.isMaximized } : win
            )
        );
        focusWindow(id);
    }, [focusWindow]);

    return (
        <WindowContext.Provider
            value={{
                windows,
                activeWindowId,
                openWindow,
                closeWindow,
                focusWindow,
                minimizeWindow,
                killMalware,
                toggleMinimize,
                toggleMaximize
            }}
        >
            {children}
        </WindowContext.Provider>
    );
};
