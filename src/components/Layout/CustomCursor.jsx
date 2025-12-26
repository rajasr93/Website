import React, { useEffect, useRef } from 'react';

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const cursorOuterRef = useRef(null);

    useEffect(() => {
        const cursor = cursorRef.current;
        const cursorOuter = cursorOuterRef.current;

        // Hide default cursor
        document.body.style.cursor = 'none';

        const moveCursor = (e) => {
            const { clientXRef, clientYRef } = { clientXRef: e.clientX, clientYRef: e.clientY };

            // Immediate dot
            if (cursor) {
                cursor.style.transform = `translate3d(${clientXRef}px, ${clientYRef}px, 0)`;
            }

            // Lagging circle
            if (cursorOuter) {
                // We can use requestAnimationFrame for smooth trailing here, 
                // but for simplicity via direct DOM:
                cursorOuter.animate({
                    transform: `translate3d(${clientXRef - 16}px, ${clientYRef - 16}px, 0)`
                }, {
                    duration: 400,
                    fill: 'forwards'
                });
            }
        };

        window.addEventListener('mousemove', moveCursor);

        // Click feedback
        const handleMouseDown = () => {
            if (cursorOuter) cursorOuter.classList.add('scale-75');
        };
        const handleMouseUp = () => {
            if (cursorOuter) cursorOuter.classList.remove('scale-75');
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', moveCursor);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <>
            {/* The visible Layout is 'fixed' so these can float on top */}
            {/* 1. The visible Dot */}
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-slate-900 rounded-full pointer-events-none z-[9999] mix-blend-difference"
                style={{ willChange: 'transform' }}
            />
            {/* 2. The Trailing Circle (Slightly larger outline) */}
            <div
                ref={cursorOuterRef}
                className="fixed top-0 left-0 w-10 h-10 border border-slate-400/50 rounded-full pointer-events-none z-[9998] transition-transform duration-100 ease-out"
                style={{ willChange: 'transform' }}
            />
        </>
    );
};

export default CustomCursor;
