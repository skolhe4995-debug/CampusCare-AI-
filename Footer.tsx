import React from 'react';
import { ShieldAlert, Heart, PhoneCall, Globe } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../lib/translations';

interface FooterProps {
  language: Language;
  setActiveTab: (tab: string) => void;
  onOpenEmergency: () => void;
}

export const Footer: React.FC<FooterProps> = ({ language, setActiveTab, onOpenEmergency }) => {
  const t = translations[language];

  return (
    <footer className="bg-slate-900 text-slate-300 text-xs border-t border-slate-800 pt-6 pb-6 mt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          
          {/* Brand Col */}
          <div className="space-y-2 md:col-span-1">
            <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
              <div className="w-7 h-7 rounded-md bg-emerald-700 flex items-center justify-center text-white shadow-2xs">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">{t.appName}</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              {t.appTagline}. Empowering safer, cleaner, and healthier school environments for students, teachers, and parents.
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-1.5">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider">Quick Navigation</h4>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              <li><button onClick={() => setActiveTab('schoolProfile')} className="hover:text-emerald-400 transition-colors">School Profile & Photos</button></li>
              <li><button onClick={() => setActiveTab('complaintCell')} className="hover:text-emerald-400 transition-colors">{t.complaintCell}</button></li>
              <li><button onClick={() => setActiveTab('aiAssistant')} className="hover:text-emerald-400 transition-colors">{t.aiAssistant}</button></li>
              <li><button onClick={() => setActiveTab('habitTracker')} className="hover:text-emerald-400 transition-colors">{t.habitTracker}</button></li>
              <li><button onClick={() => setActiveTab('learningCenter')} className="hover:text-emerald-400 transition-colors">{t.learningCenter}</button></li>
              <li><button onClick={() => setActiveTab('cleanlinessScore')} className="hover:text-emerald-400 transition-colors">{t.cleanlinessScore}</button></li>
            </ul>
          </div>

          {/* AI Features */}
          <div className="space-y-1.5">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider">Smart AI Tools</h4>
            <ul className="space-y-1 text-slate-400 text-[11px]">
              <li><button onClick={() => setActiveTab('aiInspector')} className="hover:text-emerald-400 transition-colors">AI Health Inspector</button></li>
              <li><button onClick={() => setActiveTab('quizGames')} className="hover:text-emerald-400 transition-colors">Health Quiz & Certificates</button></li>
              <li><button onClick={() => setActiveTab('calendar')} className="hover:text-emerald-400 transition-colors">{t.calendar}</button></li>
              <li><button onClick={() => setActiveTab('mealPlanner')} className="hover:text-emerald-400 transition-colors">{t.mealPlanner}</button></li>
              <li><button onClick={() => setActiveTab('downloadCenter')} className="hover:text-emerald-400 transition-colors">{t.downloadCenter}</button></li>
            </ul>
          </div>

          {/* Emergency SOS */}
          <div className="space-y-2">
            <h4 className="text-white font-extrabold text-[11px] uppercase tracking-wider">Emergency Helplines</h4>
            <div className="space-y-1 text-[11px] text-slate-400">
              <div>Ambulance Helpline: <strong className="text-white">102 / 112</strong></div>
              <div>Police Emergency: <strong className="text-white">100 / 112</strong></div>
              <div>Fire Station: <strong className="text-white">101</strong></div>
            </div>
            <button
              onClick={onOpenEmergency}
              className="bg-red-700 hover:bg-red-800 text-white font-bold px-2.5 py-1 rounded-md text-[11px] transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Open Emergency Call Panel</span>
            </button>
          </div>

        </div>

        <div className="border-t border-slate-800 pt-4 flex flex-col sm:flex-row items-center justify-between text-slate-500 text-[11px] gap-2">
          <div>© {new Date().getFullYear()} CampusCare. Building Safer & Cleaner Schools. All rights reserved.</div>
          <div className="flex items-center space-x-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" />
            <span>for School Community Wellness</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
