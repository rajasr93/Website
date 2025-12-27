import React from 'react';
import { useVisitorData } from '../../hooks/useVisitorData';
import { motion } from 'framer-motion';

const VisitorStatus = () => {
    const { ip, isp, city, loading } = useVisitorData();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 py-1 px-4 z-50 flex justify-between items-center text-[10px] md:text-xs font-mono text-slate-500 uppercase tracking-wider overflow-hidden"
        >
            <div className="flex gap-4">
                <span className="text-emerald-500 font-bold hidden md:inline">[ SYSTEM: ONLINE ]</span>
                <span className="flex items-center gap-2">
                    <span className="text-slate-600">CLIENT:</span>
                    <span className={loading ? "animate-pulse" : "text-cyan-600"}>{ip}</span>
                </span>
                <span className="hidden md:flex items-center gap-2">
                    <span className="text-slate-600">ISP:</span>
                    <span className="text-slate-400">{isp}</span>
                </span>
                <span className="hidden md:flex items-center gap-2">
                    <span className="text-slate-600">LOC:</span>
                    <span className="text-slate-400">{city}</span>
                </span>
            </div>

            <div className="text-slate-700">
                SECURE CONNECTION ESTABLISHED
            </div>
        </motion.div>
    );
};

export default VisitorStatus;
