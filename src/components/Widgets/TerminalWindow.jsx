
import React, { useState, useEffect, useRef } from 'react';
import { useWindow } from '../../context/WindowContext';
import { config } from '../../data/config';

const TerminalWindow = () => {
    // Standardizing history state to use the new unified format: { text: string, color: string }
    const [history, setHistory] = useState([
        { text: "RajaOS Terminal [Online]", color: "text-slate-300" },
        { text: "Microsoft Windows XP [Version 5.1.2600]", color: "text-slate-500" },
        { text: "(C) Copyright 1985-2001 Microsoft Corp.", color: "text-slate-500" },
        { text: "", color: "" },
        { text: "Type 'help' for utilities.", color: "text-slate-300" },
        { text: "", color: "" },
    ]);
    const [input, setInput] = useState("");
    const [isProcessing, setIsProcessing] = useState(false);
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    // --- COMMAND REGISTRY ---
    const tools = {
        // --- NEW NETWORK TOOLS ---
        nslookup: {
            desc: "Resolve domain IP",
            usage: "nslookup <domain>",
            exec: async (args, pushLine) => {
                if (!args[0]) {
                    pushLine({ text: "Error: Domain required. Usage: nslookup google.com", color: "text-red-400" });
                    return;
                }

                const domain = args[0];
                pushLine({ text: `Server:  cloudflare-dns.com`, color: "text-gray-400" });
                pushLine({ text: `Address:  1.1.1.1`, color: "text-gray-400" });
                pushLine({ text: "", color: "" });

                try {
                    const response = await fetch(`https://cloudflare-dns.com/dns-query?name=${domain}&type=A`, {
                        headers: { 'accept': 'application/dns-json' }
                    });

                    if (!response.ok) throw new Error("Network response was not ok");

                    const data = await response.json();

                    if (data.Status !== 0) {
                        pushLine({ text: `*** cloudflare-dns.com can't find ${domain}: Non-existent domain`, color: "text-yellow-400" });
                        return;
                    }

                    pushLine({ text: `Non-authoritative answer:`, color: "text-gray-300" });
                    pushLine({ text: `Name:    ${data.Question[0].name}`, color: "text-white" });

                    if (data.Answer) {
                        data.Answer.forEach(record => {
                            const type = record.type === 1 ? 'A' : record.type; // 1 is A Record
                            pushLine({ text: `Address: ${record.data}  (Type: ${type})`, color: "text-green-400" });
                        });
                    } else {
                        pushLine({ text: "No A records found.", color: "text-gray-400" });
                    }

                } catch (err) {
                    pushLine({ text: "DNS Request Failed: " + err.message, color: "text-red-500" });
                }
            }
        },

        // --- PREVIOUS COMMANDS ---
        ls: {
            desc: "Lists available sections",
            usage: "ls",
            exec: (args, pushLine) => {
                pushLine({ text: " Volume in drive C is PORTFOLIO_OS", color: "text-gray-400" });
                pushLine({ text: " Volume Serial Number is 1993-2025", color: "text-gray-400" });
                pushLine({ text: "", color: "" });
                pushLine({ text: " Directory of C:\\Users\\Visitor", color: "text-gray-400" });
                pushLine({ text: "", color: "" });

                const dirs = [
                    "About", "Experience", "Projects", "Skills", "Education", "Articles", "Socials"
                ];

                dirs.forEach(dir => {
                    pushLine({ text: `<DIR>          ${dir}`, color: "text-white" });
                });

                pushLine({ text: "", color: "" });
                pushLine({ text: `               ${dirs.length} Dir(s)   267,366,371,9 bytes free`, color: "text-gray-400" });
            }
        },

        whois: {
            desc: "Displays client and network information",
            usage: "whois",
            exec: (args, pushLine) => {
                pushLine({ text: "Client: VISITOR_ADMIN", color: "text-white" });
                pushLine({ text: "IP Address: 192.168.1.1 (Internal)", color: "text-green-400" });
                pushLine({ text: "Location: Philadelphia, PA", color: "text-yellow-400" });
                pushLine({ text: "Connection: Secure (SSL/TLS)", color: "text-blue-400" });
                pushLine({ text: "Role: Authorized User", color: "text-gray-300" });
            }
        },

        shutdown: {
            desc: "Shuts down the system",
            usage: "shutdown",
            exec: (args, pushLine) => {
                pushLine({ text: "System is shutting down...", color: "text-red-500 font-bold" });
                setTimeout(() => {
                    window.location.href = "about:blank";
                }, 2000);
            }
        },

        open: {
            desc: "Open/Read application data (experience, projects, etc)",
            usage: "open <app>",
            exec: (args, pushLine) => {
                if (args.length < 1) {
                    pushLine({ text: "Error: Specify an application to open. Try 'ls' to see options.", color: "text-red-400" });
                    return;
                }
                const target = args[0].toLowerCase();

                if (['experience', 'exp', 'work'].includes(target)) {
                    pushLine({ text: "\n--- EXPERIENCE ---\n", color: "text-yellow-400 font-bold" });
                    config.experience.forEach(e => {
                        pushLine({ text: `[${e.period}] ${e.role} @ ${e.company}`, color: "text-white" });
                        pushLine({ text: e.desc, color: "text-gray-400" });
                        pushLine({ text: "", color: "" });
                    });
                } else if (['projects', 'proj', 'dev'].includes(target)) {
                    pushLine({ text: "\n--- PROJECTS ---\n", color: "text-blue-400 font-bold" });
                    config.projects.forEach(p => {
                        pushLine({ text: `[${p.type}] ${p.title}`, color: "text-white" });
                        pushLine({ text: p.desc, color: "text-gray-400" });
                        pushLine({ text: "", color: "" });
                    });
                } else if (['about', 'me', 'bio'].includes(target)) {
                    pushLine({ text: "\n--- ABOUT ME ---\n", color: "text-green-400 font-bold" });
                    config.about.sections.forEach(section => {
                        pushLine({ text: section, color: "text-gray-300" });
                        pushLine({ text: "", color: "" });
                    });
                } else if (['skills', 'tech', 'arsenal'].includes(target)) {
                    pushLine({ text: "\n--- SKILLS ---\n", color: "text-cyan-400 font-bold" });
                    config.skills.forEach(c => {
                        pushLine({ text: `[${c.category}]`, color: "text-white font-bold" });
                        pushLine({ text: c.items.join(', '), color: "text-gray-400" });
                        pushLine({ text: "", color: "" });
                    });
                } else if (['articles', 'blog', 'news'].includes(target)) {
                    pushLine({ text: "Accessing Intelligence Feed...\n[Secure Link Established]", color: "text-blue-300" });
                    pushLine({ text: "(Check the Blog Widget for full content)", color: "text-gray-500 italic" });
                } else if (['education', 'edu'].includes(target)) {
                    pushLine({ text: "\n--- EDUCATION ---\n", color: "text-purple-400 font-bold" });
                    config.education.forEach(e => {
                        pushLine({ text: `${e.degree}`, color: "text-white" });
                        pushLine({ text: `${e.school}, ${e.year}`, color: "text-gray-400" });
                        pushLine({ text: "", color: "" });
                    });
                } else {
                    pushLine({ text: `Error: Application '${target}' not found.`, color: "text-red-400" });
                }
            }
        },

        // --- UTILITIES ---
        cls: {
            desc: "Clear screen",
            usage: "cls",
            exec: (args, pushLine) => {
                setHistory([]);
            }
        },

        clear: { // Alias for cls
            desc: "Clear screen",
            usage: "clear",
            exec: (args, pushLine) => {
                setHistory([]);
            }
        },

        help: {
            desc: "List commands",
            usage: "help",
            exec: (args, pushLine) => {
                pushLine({ text: "--- AVAILABLE COMMANDS ---", color: "text-blue-400" });
                pushLine({ text: "Standard:", color: "text-gray-500" });

                // Manual list configuration
                const cmdsToDisplay = [
                    { name: 'ls', desc: tools['ls'].desc },
                    { name: 'open', desc: tools['open'].desc },
                    { name: 'shutdown', desc: tools['shutdown'].desc },
                    { name: 'clear/cls', desc: tools['clear'].desc },
                    { name: 'help', desc: tools['help'].desc },
                    { name: 'whois', desc: tools['whois'].desc },
                    { name: 'nslookup', desc: tools['nslookup'].desc }
                ];

                cmdsToDisplay.forEach(item => {
                    // Default to gray-300 unless specified
                    const color = item.color || "text-gray-300";
                    pushLine({ text: `${item.name.padEnd(12)} - ${item.desc}`, color: color });
                });
            }
        }
    };

    const handleCommand = async (e) => {
        if (e.key === 'Enter') {
            const cmdLine = input.trim();
            if (!cmdLine) return;

            const [cmd, ...args] = cmdLine.split(" ");
            const tool = tools[cmd.toLowerCase()];

            setHistory(prev => [...prev, { text: `C:\\Users\\Visitor> ${cmdLine}`, color: "text-white" }]);
            setInput("");

            if (tool) {
                setIsProcessing(true);
                const pushLine = (line) => setHistory(prev => [...prev, line]);
                await tool.exec(args, pushLine);
                setIsProcessing(false);
            } else {
                setHistory(prev => [...prev, { text: `'${cmd}' is not recognized. Type 'help' for commands.`, color: "text-red-400" }]);
            }
        }
    };

    return (
        <div
            className="h-full bg-black p-2 overflow-hidden flex flex-col font-mono text-xs md:text-sm"
            onClick={() => inputRef.current?.focus()}
        >
            <div className="flex-1 overflow-y-auto custom-scrollbar pb-2">
                {history.map((line, i) => (
                    <div key={i} className={`${line.color} whitespace-pre-wrap leading-tight mb-0.5`}>
                        {line.text}
                    </div>
                ))}
                <div ref={bottomRef} />
            </div>

            <div className="flex items-center text-gray-300 border-t border-gray-800 pt-1">
                <span className="mr-2 select-none">C:\Users\Visitor{'>'}</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleCommand}
                    disabled={isProcessing}
                    autoFocus
                    autoComplete="off"
                    className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-600"
                />
            </div>
        </div>
    );
};

export default TerminalWindow;
