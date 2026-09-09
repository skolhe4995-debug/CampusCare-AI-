import React from 'react';
import { UserCheck, ShieldCheck, HeartHandshake, CheckCircle2, AlertTriangle, Sparkles } from 'lucide-react';
import { Complaint, Language } from '../types';
import { translations } from '../lib/translations';

interface ParentPortalProps {
  language: Language;
  complaints: Complaint[];
  userPoints: number;
}

export const ParentPortal: React.FC<ParentPortalProps> = ({ language, complaints, userPoints }) => {
  const t = translations[language];

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-teal-950/80 border border-teal-500/40 px-2.5 py-0.5 rounded-md text-teal-300 text-[11px] font-semibold">
              <UserCheck className="w-3.5 h-3.5 text-teal-400" />
              <span>Family Health Synchronization</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">{t.parentPortal}</h1>
            <p className="text-slate-300 text-xs leading-relaxed">
              Monitor your child's daily school hygiene habit adherence, review submitted campus complaint statuses, and receive real-time school health alerts.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-md text-center shrink-0">
            <div className="text-[10px] text-teal-300 font-bold uppercase">Child's Wellness Points</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-0.5 flex items-center justify-center space-x-1">
              <span>{userPoints}</span>
              <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Child Health & Habit Summary */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase">Child's Daily Hygiene Adherence</h2>
            <p className="text-[11px] text-slate-500">Student: Ananya Sharma (Class 8A)</p>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 rounded-md bg-emerald-50/80 border border-emerald-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-emerald-950">
                <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                <span>Brushed Teeth & Handwashed</span>
              </div>
              <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded-sm font-bold uppercase">100% Completed</span>
            </div>

            <div className="p-3 rounded-md bg-teal-50/80 border border-teal-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-teal-950">
                <CheckCircle2 className="w-4 h-4 text-teal-700" />
                <span>Hydration Level (Water Intake)</span>
              </div>
              <span className="text-[10px] bg-teal-700 text-white px-2 py-0.5 rounded-md font-bold uppercase">6 / 8 Glasses</span>
            </div>

            <div className="p-3 rounded-md bg-amber-50/80 border border-amber-200 flex items-center justify-between">
              <div className="flex items-center space-x-2 font-bold text-amber-950">
                <CheckCircle2 className="w-4 h-4 text-amber-700" />
                <span>Healthy Lunchbox Consumed</span>
              </div>
              <span className="text-[10px] bg-amber-700 text-white px-2 py-0.5 rounded-md font-bold uppercase">Verified</span>
            </div>
          </div>
        </div>

        {/* Complaints Submitted by Child */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase">Submitted Complaints Tracking</h2>
            <p className="text-[11px] text-slate-500">Track resolution of issues reported by your child</p>
          </div>

          <div className="space-y-2">
            {complaints.slice(0, 3).map((item) => (
              <div key={item.id} className="p-3 rounded-md border border-slate-200/90 bg-slate-50 text-xs space-y-1">
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>{item.title}</span>
                  <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1.5 py-0.2 rounded-sm uppercase font-extrabold border border-emerald-200">
                    {item.status.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{item.description}</p>
                <div className="text-[10px] text-slate-400">Assigned: {item.assignedDept}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
