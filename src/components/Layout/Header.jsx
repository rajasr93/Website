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
            <p className="text-xs text-cyan-600 font-mono mt-1 mb-3">// {config.profile.role}</p>

            <div className="flex gap-4 text-slate-500 items-center">
              <div className="relative group">
                <a href={`mailto:${config.profile.email}`} className="hover:text-cyan-600 transition-colors block">
                  <Mail size={18} />
                </a>
                <div className="absolute top-full left-0 mt-3 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 pointer-events-none whitespace-nowrap z-50">
                  <div className="bg-white border border-slate-200 text-cyan-600 text-xs font-mono py-2 px-3 rounded-lg shadow-xl relative">
                    <div className="absolute -top-1 left-2 w-2 h-2 bg-white border-t border-l border-slate-200 rotate-45"></div>
                    {config.profile.email}
                  </div>
                </div>
              </div>

              <Tooltip text="LinkedIn Profile">
                <a href={config.profile.linkedin} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors block"><Linkedin size={18} /></a>
              </Tooltip>

              <Tooltip text="GitHub Profile">
                <a href={config.profile.github} target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition-colors block"><Github size={18} /></a>
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
                    bg-white/90 backdrop-blur-xl border border-cyan-500/30 rounded-xl p-5 shadow-sm text-left w-72 flex flex-col pointer-events-auto
                    ${isResumeOpen ? 'fixed top-44 left-4 right-4 mx-auto w-auto max-w-sm z-[70] shadow-2xl md:static md:w-72 md:mx-0 md:shadow-sm' : 'hidden md:flex'}
                `}
              >
                <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-4 border-b border-cyan-100 pb-2 flex items-center justify-between">
                  <span>Resume Preview</span>
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                  </span>
                </h3>

                {/* CSS Mini Document Visual */}
                <a
                  href="/Rajas_Ronghe_Resume_F.pdf"
                  target="_blank"
                  rel="noreferrer"
                  className="group relative block w-full bg-slate-50 border border-slate-200 rounded-lg p-3 hover:border-cyan-400 hover:shadow-md transition-all duration-300"
                >
                  {/* Paper Header */}
                  <div className="flex justify-between items-center mb-3">
                    <div className="w-8 h-8 rounded-full bg-slate-200 group-hover:bg-cyan-100 transition-colors flex items-center justify-center">
                      <FileText size={14} className="text-slate-400 group-hover:text-cyan-600" />
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">PDF • 1.2MB</div>
                  </div>

                  {/* Fake Text Lines */}
                  <div className="space-y-1.5 opacity-60">
                    <div className="h-1.5 bg-slate-200 rounded-full w-3/4 group-hover:bg-cyan-100 transition-colors"></div>
                    <div className="h-1.5 bg-slate-200 rounded-full w-full group-hover:bg-cyan-100/70 transition-colors"></div>
                    <div className="h-1.5 bg-slate-200 rounded-full w-5/6 group-hover:bg-cyan-100/50 transition-colors"></div>
                    <div className="h-1.5 bg-slate-200 rounded-full w-2/3 group-hover:bg-cyan-100/30 transition-colors"></div>
                  </div>

                  {/* View Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/50 backdrop-blur-[1px] rounded-lg">
                    <span className="bg-cyan-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform">
                      OPEN RESUME
                    </span>
                  </div>
                </a>

                <div className="mt-3 flex justify-between items-center">
                  <span className="text-[10px] text-slate-400 font-mono">UPDATED: DEC 2024</span>
                  <span className="text-cyan-500 text-[10px] uppercase font-bold tracking-wider">Public Access</span>
                </div>

              </motion.div>
            )}
          </AnimatePresence>

        </div>


        {/* RIGHT SIDE: Clock & Security Widget */}
        <div className="flex flex-col items-end gap-6 pointer-events-auto relative">

          {/* Original Clock Layout */}
          <div className="text-right font-mono text-sm text-slate-500">
            <div className="text-slate-900 text-lg">{timeString}</div>
            <div className="text-xs opacity-60 uppercase">{dateString}</div>
          </div>



          {/* Threat Intel Widget (Refined Symmetry & Mobile Logic) */}
          <AnimatePresence>
            {(isWidgetOpen || window.innerWidth >= 768) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                className={`
                                bg-white/90 backdrop-blur-xl border border-red-500/30 rounded-xl p-5 shadow-sm text-center w-72 flex flex-col pointer-events-auto
                                ${isWidgetOpen ? 'fixed top-44 left-4 right-4 mx-auto w-auto max-w-sm z-[70] shadow-2xl md:static md:w-72 md:mx-0 md:shadow-sm' : 'hidden md:flex'}
                            `}
              >
                <h3 className="text-xs font-bold text-red-500 uppercase tracking-widest mb-4 border-b border-red-100 pb-2 flex items-center justify-between">
                  <span>Threat Scanning</span>
                  {/* Pulse separate from close button on Desktop */}
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                  </span>
                </h3>

                <div className="space-y-4">
                  {/* Row 1: Breach Status */}
                  <div className="group">
                    <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest text-left">Breach Status</div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <Tooltip text="Check Email Compromise">
                        <a href="https://haveibeenpwned.com" target="_blank" rel="noreferrer" className="block text-slate-600 hover:text-red-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-red-200 uppercase font-bold w-full">
                          HIBP
                        </a>
                      </Tooltip>
                      <Tooltip text="Monitor Personal Data">
                        <a href="https://monitor.mozilla.org" target="_blank" rel="noreferrer" className="block text-slate-600 hover:text-red-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-red-200 uppercase font-bold w-full">
                          MOZILLA
                        </a>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Row 2: Deep Search & Analysis */}
                  <div className="group">
                    <div className="text-[10px] uppercase text-slate-400 font-bold mb-1 tracking-widest text-left">Deep Search</div>
                    <Tooltip text="Search Hacked Databases">
                      <a href="https://dehashed.com/search#breachCheck" target="_blank" rel="noreferrer" className="block text-xs font-mono text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-cyan-200 uppercase font-bold mb-2">
                        DEHASHED DB
                      </a>
                    </Tooltip>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                      <Tooltip text="Analyze Suspicious Files/URLs">
                        <a href="https://virustotal.com" target="_blank" rel="noreferrer" className="block text-slate-600 hover:text-emerald-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-emerald-200 uppercase font-bold w-full">
                          VIRUSTOTAL
                        </a>
                      </Tooltip>
                      <Tooltip text="Website Scanner & Forensics">
                        <a href="https://urlscan.io" target="_blank" rel="noreferrer" className="block text-slate-600 hover:text-cyan-600 transition-colors bg-slate-50 py-2 rounded border border-slate-100 hover:border-cyan-200 uppercase font-bold w-full">
                          URLSCAN
                        </a>
                      </Tooltip>
                    </div>
                  </div>

                  {/* Row 3: Privacy */}
                  <div className="group border-t border-slate-100 pt-2 mt-1">
                    <Tooltip text="Test Browser Fingerprinting">
                      <a href="https://coveryourtracks.eff.org" target="_blank" rel="noreferrer" className="flex justify-between items-center text-xs font-mono text-slate-500 hover:text-amber-600 transition-colors px-1 uppercase font-bold w-full">
                        <span>BROWSER PRIVACY</span>
                        <span>↗</span>
                      </a>
                    </Tooltip>
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
          className="flex h-10 w-10 items-center justify-center bg-white border border-cyan-500/30 rounded-xl shadow-sm"
        >
          {isResumeOpen ? (
            <X size={20} className="text-cyan-500" />
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-20 scale-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-cyan-500"></span>
            </>
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
          className="flex h-10 w-10 items-center justify-center bg-white border border-red-500/30 rounded-xl shadow-sm"
        >
          {isWidgetOpen ? (
            <X size={20} className="text-red-500" />
          ) : (
            <>
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-20 scale-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
            </>
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
