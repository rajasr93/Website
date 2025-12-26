import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleNetwork = () => {
    const { mouse, viewport } = useThree();
    const count = 150; // Balanced particle count for performance and aesthetics

    // Initialize positions and velocities
    const [positions, velocities] = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Spread particles across a wide area
            pos[i * 3] = (Math.random() - 0.5) * 25;     // x
            pos[i * 3 + 1] = (Math.random() - 0.5) * 15; // y
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10; // z

            // Give them random initial velocities
            vel[i * 3] = (Math.random() - 0.5) * 0.02;     // vx
            vel[i * 3 + 1] = (Math.random() - 0.5) * 0.02; // vy
            vel[i * 3 + 2] = (Math.random() - 0.5) * 0.01; // vz
        }
        return [pos, vel];
    }, [count]);

    const pointsRef = useRef();

    useFrame((state) => {
        if (!pointsRef.current) return;

        const positionsArray = pointsRef.current.geometry.attributes.position.array;

        // Mouse influence configuration
        // Convert normalized mouse coordinates (-1 to 1) to world coordinates approximate
        const targetX = (mouse.x * viewport.width) / 2;
        const targetY = (mouse.y * viewport.height) / 2;

        for (let i = 0; i < count; i++) {
            const idx = i * 3;

            // Update position based on velocity
            positionsArray[idx] += velocities[idx];
            positionsArray[idx + 1] += velocities[idx + 1];
            positionsArray[idx + 2] += velocities[idx + 2];

            // Boundary check to keep particles on screen (custom wrapping)
            if (positionsArray[idx] > 15) positionsArray[idx] = -15;
            if (positionsArray[idx] < -15) positionsArray[idx] = 15;
            if (positionsArray[idx + 1] > 10) positionsArray[idx + 1] = -10;
            if (positionsArray[idx + 1] < -10) positionsArray[idx + 1] = 10;

            // Mouse interaction: Gentle attraction/repulsion
            const dx = positionsArray[idx] - targetX;
            const dy = positionsArray[idx + 1] - targetY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            // If close to cursor, gently push away or pull towards. 
            // Let's do a gentle pull for a "connected" feel, or push for interaction.
            // User asked for "reactive". A subtle push often feels more interactive.
            if (dist < 4) {
                const angle = Math.atan2(dy, dx);
                const force = (4 - dist) * 0.005; // Strength of interaction

                positionsArray[idx] += Math.cos(angle) * force;
                positionsArray[idx + 1] += Math.sin(angle) * force;
            }
        }

        // Mark geometry attributes as needing update
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        // Slow rotation of the entire system for global movement
        pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.05;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.15}
                color="#cbd5e1" // Slate-300
                transparent
                opacity={0.8}
                sizeAttenuation={true}
                depthWrite={false}
            />
        </points>
    );
};

const Background3D = () => {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none bg-slate-50">
            {/* Added bg-slate-50 to ensure nice fade if generic bg loads first */}
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <ParticleNetwork />
                {/* Subtle fog to blend distant particles */}
                <fog attach="fog" args={['#f8fafc', 5, 25]} />
            </Canvas>
        </div>
    );
};

export default Background3D;
