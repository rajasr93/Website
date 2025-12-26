import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './Header'; // Adjust path if needed
import SearchBar from '../Search/SearchBar';
import ExperienceWidget from '../Widgets/ExperienceWidget';
import ProjectsWidget from '../Widgets/ProjectsWidget';
import EducationWidget from '../Widgets/EducationWidget';
import StartWidget from '../Widgets/StartWidget';
import AboutWidget from '../Widgets/AboutWidget';
import SkillsWidget from '../Widgets/SkillsWidget';
import { config } from '../../data/config';

const MobileLayout = () => {
    const [input, setInput] = useState('');

    const getActiveSection = () => {
        const val = input.toLowerCase().trim();
        if (!val) return null;

        if (val.includes('exp') || val.includes('work')) return 'EXPERIENCE';
        if (val.includes('proj') || val.includes('dev')) return 'PROJECTS';
        if (val.includes('edu') || val.includes('study')) return 'EDUCATION';
        if (val.includes('skill') || val.includes('tech')) return 'SKILLS';
        if (val.includes('about') || val.includes('bio')) return 'ABOUT';
        if (val.includes('start') || val.includes('help') || val.includes('cmd')) return 'START';

        return null;
    };

    const activeSection = getActiveSection();

    return (
        <div className="min-h-screen text-slate-800 font-sans relative overflow-hidden">

            {/* Background FX - Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

            <Header />

            <main className="flex flex-col items-center justify-center min-h-screen w-full relative z-10">

                <SearchBar input={input} setInput={setInput} isActive={!!activeSection} />

                <div className="fixed bottom-0 left-0 right-0 h-[80vh] pointer-events-none flex justify-center">
                    <AnimatePresence mode="wait">
                        {activeSection && (
                            <motion.div
                                key={activeSection}
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: "0%", opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="pointer-events-auto w-full max-w-5xl bg-white/90 backdrop-blur-2xl border-t border-l border-r border-slate-200 rounded-t-3xl shadow-[0_-20px_60px_rgba(0,0,0,0.1)] flex flex-col"
                            >
                                <div className="flex-1 overflow-y-auto p-6 md:p-12 pb-20">
                                    {activeSection === 'EXPERIENCE' && <ExperienceWidget data={config.experience} />}
                                    {activeSection === 'PROJECTS' && <ProjectsWidget data={config.projects} />}
                                    {activeSection === 'EDUCATION' && <EducationWidget data={config.education} />}
                                    {activeSection === 'SKILLS' && <SkillsWidget data={config.skills} />}
                                    {activeSection === 'ABOUT' && <AboutWidget data={config.about} profile={config.profile} />}
                                    {activeSection === 'START' && <StartWidget />}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default MobileLayout;
