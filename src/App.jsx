import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Header from './components/Layout/Header';
import SearchBar from './components/Search/SearchBar';
import Background3D from './components/Layout/Background3D';
import CustomCursor from './components/Layout/CustomCursor';

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
const WidgetCard = ({ children, title, onClose }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    exit={{ opacity: 0, scale: 0.95, y: 20 }}
    transition={{ duration: 0.3 }}
    className="bg-white/90 backdrop-blur-xl border border-slate-200 p-8 rounded-2xl shadow-2xl w-full max-w-3xl relative"
  >
    {/* Close Button */}
    <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors">
      ✕
    </button>

    {title && <h3 className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-widest border-b border-slate-100 pb-2">{title}</h3>}
    <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
      {children}
    </div>
  </motion.div>
);

const App = () => {
  const [input, setInput] = useState('');
  const [showWelcome, setShowWelcome] = useState(true);

  // Timer to hide welcome message permanently after 10 seconds
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowWelcome(false);
    }, 10000); // 10 seconds

    return () => clearTimeout(timer);
  }, []);

  const getActiveSection = () => {
    const val = input.toLowerCase().trim();
    if (!val) return null;

    if (val.includes('exp') || val.includes('work')) return 'EXPERIENCE';
    if (val.includes('proj') || val.includes('dev')) return 'PROJECTS';
    if (val.includes('edu') || val.includes('study')) return 'EDUCATION';
    if (val.includes('skill') || val.includes('tech')) return 'SKILLS';
    if (val.includes('about') || val.includes('bio')) return 'ABOUT';
    if (val.includes('blog') || val.includes('news') || val.includes('feed')) return 'BLOG';
    if (val.includes('start') || val.includes('help') || val.includes('cmd')) return 'START';

    return null;
  };

  const activeSection = getActiveSection();
  const clearSearch = () => setInput('');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans relative overflow-hidden selection:bg-cyan-500/30 cursor-none">

      {/* 1. Visual Layer */}
      <Background3D />
      <CustomCursor />

      {/* 2. UI Layer */}
      <Header />

      <main className="flex flex-col items-center justify-center min-h-screen w-full relative z-10 px-4 transition-all duration-500">

        {/* Welcome Heading (Fade out after 10s or when active) */}
        <AnimatePresence>
          {!activeSection && showWelcome && (
            <motion.div
              layout
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 relative"
            >
              <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-slate-800 to-slate-400 drop-shadow-2xl tracking-tighter"
                style={{
                  filter: "drop-shadow(0px 4px 6px rgba(0,0,0,0.1))",
                  textShadow: "1px 1px 0 #cbd5e1, 2px 2px 0 #94a3b8, 3px 3px 0 #64748b, 4px 4px 10px rgba(0,0,0,0.2)"
                }}
              >
                WELCOME!
              </h1>
              <p className="mt-4 text-slate-500 text-lg md:text-xl font-medium tracking-wide uppercase animate-[fadeIn_1s_ease-out_0.5s_forwards] opacity-0">
                Use the search box to navigate
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ y: 0 }}
          animate={{
            y: activeSection ? 0 : (showWelcome ? 0 : -100)
          }}
          transition={{ duration: 1.5, ease: [0.76, 0, 0.24, 1] }}
          className={`w-full flex justify-center z-50 ${activeSection ? 'mt-24 mb-12' : 'mb-0'}`}
        >
          <SearchBar input={input} setInput={setInput} isActive={!!activeSection} />
        </motion.div>

        {/* Widget Display Area */}
        <AnimatePresence mode="wait">
          {activeSection && (
            <motion.div
              layout
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="w-full flex justify-center perspective-[1000px]"
            >
              {activeSection === 'EXPERIENCE' && (
                <WidgetCard title="Experience" onClose={clearSearch}>
                  <ExperienceWidget data={config.experience} />
                </WidgetCard>
              )}
              {activeSection === 'PROJECTS' && (
                <WidgetCard title="Deployments" onClose={clearSearch}>
                  <ProjectsWidget data={config.projects} />
                </WidgetCard>
              )}
              {activeSection === 'EDUCATION' && (
                <WidgetCard title="Education" onClose={clearSearch}>
                  <EducationWidget data={config.education} />
                </WidgetCard>
              )}
              {activeSection === 'SKILLS' && (
                <WidgetCard title="Arsenal" onClose={clearSearch}>
                  <SkillsWidget data={config.skills} />
                </WidgetCard>
              )}
              {activeSection === 'ABOUT' && (
                <WidgetCard title="About Me" onClose={clearSearch}>
                  <AboutWidget />
                </WidgetCard>
              )}
              {activeSection === 'BLOG' && (
                <WidgetCard title="Intelligence Feed" onClose={clearSearch}>
                  <BlogWidget />
                </WidgetCard>
              )}
              {activeSection === 'START' && (
                <WidgetCard title="Terminal" onClose={clearSearch}>
                  <StartWidget onNavigate={setInput} />
                </WidgetCard>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;
