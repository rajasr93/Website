import React from 'react';
import { Github, Linkedin, Mail, MapPin } from 'lucide-react';
import { config } from '../../data/config';

const SocialsWidget = () => {
    return (
        <div className="p-8 h-full bg-white font-sans text-black">
            <div className="flex flex-col gap-6">

                {/* Profile Summary */}
                <div className="flex items-center gap-4 mb-4">
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold">{config.profile.name}</h2>
                        <span className="text-gray-500 text-sm">{config.profile.role}</span>
                        <div className="flex items-center gap-1 text-gray-400 text-xs mt-1">
                            <MapPin size={12} />
                            <span>{config.profile.location}</span>
                        </div>
                    </div>
                </div>

                <div className="h-[1px] bg-gray-200 w-full"></div>

                {/* Links */}
                <div className="space-y-4">
                    <a
                        href={config.profile.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded hover:bg-gray-50 hover:border-black/30 transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-black group-hover:text-white transition-colors">
                            <Github size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">GitHub</span>
                            <span className="text-xs text-gray-500">View code repositories</span>
                        </div>
                    </a>

                    <a
                        href={config.profile.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded hover:bg-gray-50 hover:border-[#0077b5]/50 transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-[#0077b5] group-hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">LinkedIn</span>
                            <span className="text-xs text-gray-500">Connect professionally</span>
                        </div>
                    </a>

                    <a
                        href={`mailto:${config.profile.email}`}
                        className="flex items-center gap-4 p-4 border border-gray-200 rounded hover:bg-gray-50 hover:border-orange-500/50 transition-all group"
                    >
                        <div className="p-2 bg-gray-100 rounded-full group-hover:bg-orange-500 group-hover:text-white transition-colors">
                            <Mail size={20} />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm">Email</span>
                            <span className="text-xs text-gray-500">{config.profile.email}</span>
                        </div>
                    </a>
                </div>

            </div>
        </div>
    );
};

export default SocialsWidget;
