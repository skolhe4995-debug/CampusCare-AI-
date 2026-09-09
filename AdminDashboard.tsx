import React, { useState } from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  UserCheck, 
  BarChart3, 
  Filter,
  ArrowRight
} from 'lucide-react';
import { Complaint, ComplaintStatus, CleanlinessScore, Language } from '../types';
import { translations } from '../lib/translations';

interface AdminDashboardProps {
  language: Language;
  complaints: Complaint[];
  setComplaints: React.Dispatch<React.SetStateAction<Complaint[]>>;
  cleanlinessScores: CleanlinessScore[];
  setCleanlinessScores: React.Dispatch<React.SetStateAction<CleanlinessScore[]>>;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  language,
  complaints,
  setComplaints,
  cleanlinessScores,
  setCleanlinessScores,
}) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const updateComplaintStatus = (id: string, newStatus: ComplaintStatus) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const updateScore = (id: string, newScore: number) => {
    setCleanlinessScores((prev) =>
      prev.map((s) => (s.id === id ? { ...s, score: newScore, lastInspected: 'Just Now' } : s))
    );
  };

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="max-w-3xl space-y-1">
          <div className="inline-flex items-center space-x-2 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-0.5 rounded-md text-indigo-300 text-[11px] font-semibold">
            <Building2 className="w-3.5 h-3.5 text-indigo-400" />
            <span>School Facilities & Maintenance Control Center</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">{t.adminDashboard}</h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Manage complaint assignments, change maintenance status, inspect zone cleanliness scores, and oversee school safety operations.
          </p>
        </div>
      </div>

      {/* Complaint Management Panel */}
      <section className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-sm font-extrabold text-slate-900 uppercase">Manage Submitted Complaints</h2>
            <p className="text-[11px] text-slate-500">Change task status & assign responsible departments</p>
          </div>

          <div className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
            {complaints.length} Total Complaints Logged
          </div>
        </div>

        <div className="space-y-2.5">
          {complaints.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-md border border-slate-200/90 bg-slate-50/70 space-y-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
            >
              <div className="space-y-0.5 max-w-xl">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[11px] font-bold text-slate-500">{item.id}</span>
                  <span className="font-bold text-xs text-slate-900">{item.title}</span>
                  <span className={`px-1.5 py-0.2 rounded-sm text-[9px] font-extrabold uppercase border ${
                    item.priority === 'urgent' ? 'bg-red-100 text-red-800 border-red-200' : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-xs text-slate-600">{item.description}</p>
                <div className="text-[10px] text-slate-500">Location: {item.location} • Dept: {item.assignedDept}</div>
              </div>

              {/* Status Action Buttons */}
              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={() => updateComplaintStatus(item.id, 'pending')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
                    item.status === 'pending' ? 'bg-amber-600 text-white border-amber-700' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Pending
                </button>

                <button
                  onClick={() => updateComplaintStatus(item.id, 'in_progress')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
                    item.status === 'in_progress' ? 'bg-blue-700 text-white border-blue-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  In Progress
                </button>

                <button
                  onClick={() => updateComplaintStatus(item.id, 'resolved')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-colors cursor-pointer border ${
                    item.status === 'resolved' ? 'bg-emerald-700 text-white border-emerald-800' : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-100'
                  }`}
                >
                  Resolved ✓
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cleanliness Scores Override Control */}
      <section className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-3">
        <div className="border-b border-slate-100 pb-2.5">
          <h2 className="text-sm font-extrabold text-slate-900 uppercase">Update Area Inspection Scores</h2>
          <p className="text-[11px] text-slate-500">Staff inspection score updates reflect live across student & parent dashboards</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {cleanlinessScores.map((scoreItem) => (
            <div key={scoreItem.id} className="p-3 rounded-md bg-slate-50 border border-slate-200 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 flex justify-between">
                <span>{scoreItem.area}</span>
                <span className="text-emerald-800 font-extrabold">{scoreItem.score} / 100</span>
              </div>

              <input
                type="range"
                min={50}
                max={100}
                value={scoreItem.score}
                onChange={(e) => updateScore(scoreItem.id, Number(e.target.value))}
                className="w-full accent-emerald-700 cursor-pointer"
              />

              <div className="text-[10px] text-slate-400">Last updated: {scoreItem.lastInspected}</div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
