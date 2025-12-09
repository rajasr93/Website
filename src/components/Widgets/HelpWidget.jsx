/* src/components/Widgets/HelpWidget.jsx */
import React from 'react';
import { Terminal, ArrowRight } from 'lucide-react';

const HelpWidget = () => {
  const commands = [
    { cmd: "start", desc: "Go to the main menu (this screen)" },
    { cmd: "about", desc: "Bio, hobbies, and personal info" },
    { cmd: "experience", desc: "View professional history & roles" },
    { cmd: "projects", desc: "Browse cybersecurity payloads & projects" },
    { cmd: "skills", desc: "Technical stacks & tools" },
    { cmd: "education", desc: "Show academic credentials & degrees" },
  ];

  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="w-2 h-8 bg-slate-500 rounded-full"></span>
        System Commands
      </h2>

      <div className="grid gap-3 md:grid-cols-2">
        {commands.map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors group">
            <div className="p-3 bg-slate-800 rounded-lg text-cyber group-hover:text-white transition-colors">
              <Terminal size={20} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-cyan-400 font-mono">{item.cmd}</span>
              </div>
              <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpWidget;
