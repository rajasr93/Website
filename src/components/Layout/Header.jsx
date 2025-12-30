/* src/components/Layout/Header.jsx */
import React, { useState } from 'react';
import { useTime } from '../../hooks/useTime';
import { config } from '../../data/config';
import { Github, Linkedin, Mail, FileText, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tooltip from '../Shared/Tooltip';

const Header = () => {
  const { timeString, dateString } = useTime();
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 p-6 md:p-8 flex flex-col md:flex-row justify-between items-center md:items-start z-50 pointer-events-none transition-all duration-300 bg-white/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none">

      {/* LEFT SIDE: Identity & Socials (Original Layout) */}
      {/* CENTER MOBILE CONTROLS: Toggle Buttons (Between Name and Time) */}
      {/* MOBILE: Top Row Wrapper (Name & Clock) */}
      {/* On Desktop: 'contents' makes this div disappear from layout flow, so children become direct flex children of header */}
      <div className="w-full flex justify-between items-start md:contents pointer-events-none">

        {/* LEFT SIDE: Identity & Socials & Resume Widget */}
        <div className="flex flex-col items-start gap-6 pointer-events-auto relative">

          {/* Identity Block */}
          <div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tight text-slate-900 uppercase">
              {config.profile.name}
            </h1>
            <p className="text-xs text-cyan-700 font-mono mt-1 mb-3 font-medium">// {config.profile.role}</p>

            <div className="flex gap-4 text-slate-500 items-center">
              <div className="relative group">
                <a href={`mailto:${config.profile.email}`} aria-label="Email Me" className="hover:text-cyan-700 transition-colors block">
                  <Mail size={20} />
                </a>
                <div className="absolute top-full left-0 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                  <div className="bg-white border border-slate-200 text-cyan-700 text-xs font-mono py-2 px-3 rounded-lg shadow-xl relative">
                    <div className="absolute -top-1 left-2 w-2 h-2 bg-white border-t border-l border-slate-200 rotate-45"></div>
                    {config.profile.email}
                  </div>
                </div>
              </div>

              <Tooltip text="LinkedIn Profile">
                <a href={config.profile.linkedin} aria-label="LinkedIn Profile" target="_blank" rel="noreferrer" className="hover:text-cyan-700 transition-colors block"><Linkedin size={20} /></a>
              </Tooltip>

              <Tooltip text="GitHub Profile">
                <a href={config.profile.github} aria-label="GitHub Profile" target="_blank" rel="noreferrer" className="hover:text-cyan-700 transition-colors block"><Github size={20} /></a>
              </Tooltip>
            </div>
          </div>





          {/* Resume Preview Widget */}
          <AnimatePresence>
            {(isResumeOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                className={`
                    bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl p-5 shadow-sm text-left w-72 flex flex-col pointer-events-auto
                    ${isResumeOpen ? 'fixed top-44 left-4 right-4 mx-auto w-auto max-w-sm z-[70] shadow-2xl md:static md:w-72 md:mx-0 md:shadow-sm' : 'hidden md:flex'}
                `}
              >
                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsResumeOpen(false)}
                  aria-label="Close Resume Widget"
                  className="absolute -top-3 -right-3 md:hidden bg-white text-slate-500 border border-slate-200 p-1.5 rounded-full shadow-md z-50 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <FileText size={14} className="text-cyan-600" />
                    <span>Resume</span>
                  </h3>
                  <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-100">
                    HIRE ME
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="text-sm text-slate-600 leading-relaxed">
                    Specialized in Cloud Security, Offensive Security, and AI Risk Management.
                  </div>

                  <a
                    href="/Rajas_Ronghe_Resume_F.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-center items-center gap-2 w-full bg-slate-900 text-white font-bold text-xs py-3 rounded-lg hover:bg-cyan-600 transition-colors shadow-lg hover:shadow-cyan-500/30"
                  >
                    <span>DOWNLOAD FULL RESUME</span>
                    <span className="opacity-70 text-[10px] font-normal">(PDF)</span>
                  </a>

                  <p className="text-[10px] text-center text-slate-400">
                    Last Updated: Dec 2024
                  </p>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>


        {/* RIGHT SIDE: Clock & Security Widget */}
        <div className="flex flex-col items-end gap-6 pointer-events-auto relative">

          {/* Original Clock Layout */}
          <div className="text-right font-mono text-sm text-slate-500 font-medium">
            <div className="text-slate-900 text-lg font-semibold">{timeString}</div>
            <div className="text-xs text-slate-500 uppercase font-medium">{dateString}</div>
          </div>



          {/* Threat Intel Widget (Refined Symmetry & Mobile Logic) */}
          <AnimatePresence>
            {(isWidgetOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className={`
                                bg-white/90 backdrop-blur-xl border border-slate-200 rounded-xl p-5 shadow-sm text-center w-72 flex flex-col pointer-events-auto
                                ${isWidgetOpen ? 'fixed top-44 left-4 right-4 mx-auto w-auto max-w-sm z-[70] shadow-2xl md:static md:w-72 md:mx-0 md:shadow-sm' : 'hidden md:flex'}
                            `}
              >
                {/* Mobile Close Button */}
                <button
                  onClick={() => setIsWidgetOpen(false)}
                  aria-label="Close Threat Widget"
                  className="absolute -top-3 -right-3 md:hidden bg-white text-slate-500 border border-slate-200 p-1.5 rounded-full shadow-md z-50 hover:text-red-500 hover:border-red-200 transition-colors"
                >
                  <X size={16} />
                </button>

                <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
                  <h3 className="text-xs font-bold text-slate-700 uppercase tracking-widest flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span>System Status</span>
                  </h3>
                  <span className="text-[10px] font-mono text-slate-400">v2.0.4</span>
                </div>

                <div className="space-y-4 text-left">
                  {/* Status Item 1 */}
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">Global Threat Level</span>
                    <span className="text-amber-500 font-bold">MODERATE</span>
                  </div>

                  {/* Status Item 2 */}
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-slate-500">Connection</span>
                    <span className="text-emerald-600 font-bold">SECURE (TLS 1.3)</span>
                  </div>

                  <div className="border-t border-slate-100 my-2"></div>

                  {/* Quick Tools */}
                  <div>
                    <div className="text-[10px] uppercase text-slate-400 font-bold mb-2 tracking-widest">Toolkit</div>
                    <div className="grid grid-cols-2 gap-2">
                      <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer" className="text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-red-300 rounded p-2 transition-colors">
                        <div className="text-[10px] font-bold text-slate-600">BREACH CHECK</div>
                      </a>
                      <a href="https://virustotal.com" target="_blank" rel="noreferrer" className="text-center bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-emerald-300 rounded p-2 transition-colors">
                        <div className="text-[10px] font-bold text-slate-600">FILE SCAN</div>
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* MOBILE CONTROLS: Center Bottom (Stacked) */}
      <div className="md:hidden flex gap-4 pointer-events-auto z-[60] mt-4">
        {/* Resume Toggle (Blue) */}
        <button
          onClick={() => {
            if (isResumeOpen) {
              setIsResumeOpen(false);
            } else {
              setIsResumeOpen(true);
              setIsWidgetOpen(false); // Exclusive open
            }
          }}
          aria-label="Toggle Resume Widget"
          className="flex h-10 w-10 items-center justify-center bg-white border border-cyan-500/30 rounded-xl shadow-sm"
        >
          {isResumeOpen ? (
            <X size={20} className="text-cyan-600" />
          ) : (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
          )}
        </button>

        {/* Threat Toggle (Red) */}
        <button
          onClick={() => {
            if (isWidgetOpen) {
              setIsWidgetOpen(false);
            } else {
              setIsWidgetOpen(true);
              setIsResumeOpen(false); // Exclusive open
            }
          }}
          aria-label="Toggle Threat Widget"
          className="flex h-10 w-10 items-center justify-center bg-white border border-red-500/30 rounded-xl shadow-sm"
        >
          {isWidgetOpen ? (
            <X size={20} className="text-red-500" />
          ) : (
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          )}
        </button>
      </div>

      {/* FIXED BACKDROP: Closes widgets when clicking outside */}
      {/* Visible only when a widget is open on mobile */}
      {(isResumeOpen || isWidgetOpen) && (
        <div
          className="md:hidden fixed inset-0 z-[55] bg-slate-900/10 backdrop-blur-[1px]"
          onClick={() => {
            setIsResumeOpen(false);
            setIsWidgetOpen(false);
          }}
        />
      )}
    </header>
  );
};

export default Header;
