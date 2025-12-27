import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Layout/Header';
import SearchBar from './components/Search/SearchBar';
import Background3D from './components/Layout/Background3D';
import VisitorStatus from './components/Layout/VisitorStatus';

// Widgets
import ExperienceWidget from './components/Widgets/ExperienceWidget';
import ProjectsWidget from './components/Widgets/ProjectsWidget';
import EducationWidget from './components/Widgets/EducationWidget';
import StartWidget from './components/Widgets/StartWidget';
import AboutWidget from './components/Widgets/AboutWidget';
import SkillsWidget from './components/Widgets/SkillsWidget';
import BlogWidget from './components/Widgets/BlogWidget';
import { config } from './data/config';

// Card Wrapper for consistent look (but static now)
const WidgetCard = ({ children, title, onClose, isHome = false }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3 }}
    className="bg-white/90 backdrop-blur-xl border border-slate-200 p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative"
  >
    {/* Close Button - Hide if isHome */}
    {!isHome && (
      <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
        ✕
      </button>
    )}

    {title && <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest border-b border-slate-100 pb-2">{title}</h3>}
    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {children}
    </div>
  </motion.div>
);

const App = () => {
  const [input, setInput] = useState('');

  // Determine Active Section
  const getActiveSection = () => {
    const val = input.toLowerCase().trim();

    // Default to START (Full Greeting) if empty
    if (!val) return 'START';

    // Explicit return to Menu (Simplified)
    if (val === 'menu') return 'MENU';

    if (val.includes('exp') || val.includes('work')) return 'EXPERIENCE';
    if (val.includes('proj') || val.includes('dev')) return 'PROJECTS';
    if (val.includes('edu') || val.includes('study')) return 'EDUCATION';
    if (val.includes('skill') || val.includes('tech')) return 'SKILLS';
    if (val.includes('about') || val.includes('bio')) return 'ABOUT';
    if (val.includes('blog') || val.includes('news') || val.includes('intel')) return 'BLOG';

    // CMD/Help also maps to full start if typed
    if (val.includes('start') || val.includes('help') || val.includes('cmd')) return 'START';

    // If typing but no match, show nothing (or could show search results, but for now null)
    return null;
  };

  const activeSection = getActiveSection();

  // Close Logic: Return to Menu (Simplified Start)
  const handleClose = () => setInput('menu');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-x-hidden overflow-y-auto selection:bg-cyan-500/30 flex flex-col">

      {/* 1. Visual Layer */}
      <Background3D />

      {/* 2. UI Layer */}
      <Header />

      <main className="flex-grow flex flex-col items-center justify-center relative z-10 px-4 w-full max-w-5xl mx-auto transition-all duration-500 gap-8 pt-44 pb-24 md:pt-0 md:pb-0">

        {/* 3. Main Widget Display (Dashboard) */}
        <div className="w-full flex justify-center perspective-[1000px] min-h-[400px] items-center">
          <AnimatePresence mode="wait">
            {activeSection && (
              <motion.div
                key={activeSection} // Key ensures remounting for transition
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="w-full flex justify-center"
              >
                {/* Dashboard / Start / Menu */}
                {(activeSection === 'START' || activeSection === 'MENU') && (
                  <WidgetCard
                    title="System Dashboard"
                    onClose={() => setInput('')} // Close on Start/Menu just clears input (redundant but safe)
                    isHome={true} // Hide close button if home
                  >
                    <StartWidget
                      onNavigate={setInput}
                      showGreeting={activeSection === 'START'}
                    />
                  </WidgetCard>
                )}

                {/* Content Widgets */}
                {activeSection === 'EXPERIENCE' && (
                  <WidgetCard title="Experience" onClose={handleClose}>
                    <ExperienceWidget data={config.experience} />
                  </WidgetCard>
                )}
                {activeSection === 'PROJECTS' && (
                  <WidgetCard title="Deployments" onClose={handleClose}>
                    <ProjectsWidget data={config.projects} />
                  </WidgetCard>
                )}
                {activeSection === 'EDUCATION' && (
                  <WidgetCard title="Education" onClose={handleClose}>
                    <EducationWidget
                      education={config.education}
                      certifications={config.certifications}
                    />
                  </WidgetCard>
                )}
                {activeSection === 'SKILLS' && (
                  <WidgetCard title="Arsenal" onClose={handleClose}>
                    <SkillsWidget data={config.skills} />
                  </WidgetCard>
                )}
                {activeSection === 'ABOUT' && (
                  <WidgetCard title="About Me" onClose={handleClose}>
                    <AboutWidget />
                  </WidgetCard>
                )}
                {activeSection === 'BLOG' && (
                  <WidgetCard title="Intelligence Feed" onClose={handleClose}>
                    <BlogWidget />
                  </WidgetCard>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. Search Bar (Below Main Window) */}
        <motion.div
          layout
          className="w-full flex justify-center z-50 pt-4"
        >
          <SearchBar input={input} setInput={setInput} isActive={activeSection !== 'START' && activeSection !== 'MENU'} />
        </motion.div>

        <VisitorStatus />

      </main>
    </div>
  );
};

export default App;
