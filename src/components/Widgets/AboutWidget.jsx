/* src/components/Widgets/AboutWidget.jsx */
import React from 'react';
import { User, BadgeCheck, MapPin, Mail, Phone } from 'lucide-react';

const AboutWidget = ({ data, profile }) => {
  return (
    <div className="space-y-8 pb-10">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-3 border-b border-white/10 pb-4">
        <span className="w-2 h-8 bg-blue-500 rounded-full"></span>
        User Profile
      </h2>

      <div className="bg-slate-900/50 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
        {/* Contact Header inside About */}
        <div className="flex flex-wrap gap-4 text-sm text-slate-400 font-mono border-b border-white/5 pb-6">
            <div className="flex items-center gap-2">
                <MapPin size={16} className="text-blue-400" />
                {profile.location}
            </div>
            <div className="flex items-center gap-2">
                <Mail size={16} className="text-blue-400" />
                {profile.email}
            </div>
            <div className="flex items-center gap-2">
                <Phone size={16} className="text-blue-400" />
                {profile.phone}
            </div>
        </div>

        <div className="flex items-start gap-4">
          <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400 mt-1">
            <User size={24} />
          </div>
          <div className="space-y-4">
             <p className="text-slate-300 leading-relaxed text-lg">
               {data.bio}
             </p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/10">
           <div className="flex items-center gap-2 text-slate-400 mb-4">
             <BadgeCheck size={18} className="text-cyber" />
             <span className="text-sm font-bold uppercase tracking-wider">Certifications</span>
           </div>
           <div className="flex flex-wrap gap-3">
             {data.certifications.map((item, i) => (
               <span key={i} className="px-3 py-1.5 bg-blue-900/20 border border-blue-500/20 rounded-lg text-sm text-blue-300">
                 {item}
               </span>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
};

export default AboutWidget;
