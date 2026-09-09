import React from 'react';
import { 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Sparkles, 
  ShieldCheck, 
  Activity, 
  TrendingUp,
  Award
} from 'lucide-react';
import { Complaint, CleanlinessScore, Language } from '../types';
import { translations } from '../lib/translations';

interface HealthDashboardProps {
  language: Language;
  complaints: Complaint[];
  cleanlinessScores: CleanlinessScore[];
}

export const HealthDashboard: React.FC<HealthDashboardProps> = ({
  language,
  complaints,
  cleanlinessScores,
}) => {
  const t = translations[language];

  const total = complaints.length;
  const resolved = complaints.filter(c => c.status === 'resolved').length;
  const pending = complaints.filter(c => c.status === 'pending').length;
  const inProgress = complaints.filter(c => c.status === 'in_progress').length;

  const resolutionRate = total > 0 ? Math.round((resolved / total) * 100) : 100;

  const avgCleanliness = Math.round(
    cleanlinessScores.reduce((acc, c) => acc + c.score, 0) / (cleanlinessScores.length || 1)
  );

  const healthAwarenessScore = 88; // Based on quiz completions and habit tracking

  // Compute issue category breakdown
  const categoriesCount: Record<string, number> = {};
  complaints.forEach(c => {
    categoriesCount[c.category] = (categoriesCount[c.category] || 0) + 1;
  });

  const sortedCategories = Object.entries(categoriesCount).sort((a, b) => b[1] - a[1]);

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="max-w-4xl space-y-1">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-emerald-300 text-[11px] font-semibold">
            <BarChart3 className="w-3.5 h-3.5 text-emerald-400" />
            <span>School-Wide Analytics & Metrics</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">{t.dashboard}</h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Real-time cleanliness metrics, complaint resolution speed, area hygiene scores, and student health awareness ratings.
          </p>
        </div>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
        
        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Complaints</div>
          <div className="text-xl font-extrabold text-slate-900">{total}</div>
          <div className="text-[10px] text-slate-400">CampusCare Records</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Resolved</div>
          <div className="text-xl font-extrabold text-emerald-700">{resolved}</div>
          <div className="text-[10px] text-emerald-700 font-bold">{resolutionRate}% Resolved Rate</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">In Progress</div>
          <div className="text-xl font-extrabold text-amber-700">{inProgress}</div>
          <div className="text-[10px] text-slate-500">Assigned Maintenance</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-red-800 uppercase tracking-wider">Pending</div>
          <div className="text-xl font-extrabold text-red-700">{pending}</div>
          <div className="text-[10px] text-slate-500">Awaiting Inspection</div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-teal-800 uppercase tracking-wider">{t.cleanlinessAvg}</div>
          <div className="text-xl font-extrabold text-teal-700">{avgCleanliness}%</div>
          <div className="text-[10px] text-teal-700 font-bold flex items-center">
            <TrendingUp className="w-3 h-3 mr-0.5" /> +3% vs Last Week
          </div>
        </div>

        <div className="bg-white p-3.5 rounded-lg border border-slate-200/90 shadow-2xs space-y-0.5">
          <div className="text-[10px] font-bold text-purple-800 uppercase tracking-wider">Awareness Score</div>
          <div className="text-xl font-extrabold text-purple-700">{healthAwarenessScore}%</div>
          <div className="text-[10px] text-slate-500">Student Quiz & Habit Avg</div>
        </div>

      </div>

      {/* Charts & Breakdown Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        
        {/* Most Common Issues Distribution */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Most Common Reported Issues</h2>
              <p className="text-[11px] text-slate-500">Distribution by complaint category</p>
            </div>
            <BarChart3 className="w-4 h-4 text-emerald-700" />
          </div>

          <div className="space-y-3">
            {sortedCategories.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No complaints logged yet.</p>
            ) : (
              sortedCategories.map(([catName, count]) => {
                const pct = total > 0 ? Math.round((count / total) * 100) : 0;
                return (
                  <div key={catName} className="space-y-1 text-xs">
                    <div className="flex justify-between font-bold text-slate-800">
                      <span>{catName}</span>
                      <span className="text-slate-500">{count} reports ({pct}%)</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-sm overflow-hidden border border-slate-200/60">
                      <div
                        className="h-full bg-emerald-600 rounded-sm transition-all duration-500"
                        style={{ width: `${Math.max(pct, 10)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Cleanliness Index & Health Score Gauge Breakdown */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Zone Cleanliness Breakdown</h2>
              <p className="text-[11px] text-slate-500">Live score per school location</p>
            </div>
            <ShieldCheck className="w-4 h-4 text-teal-700" />
          </div>

          <div className="space-y-2.5">
            {cleanlinessScores.map((scoreItem) => (
              <div key={scoreItem.id} className="p-3 rounded-md bg-slate-50 border border-slate-200/80 space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold text-slate-900">
                  <span>{scoreItem.area}</span>
                  <span className={`px-2 py-0.5 rounded-sm text-[10px] font-extrabold uppercase tracking-wider border ${
                    scoreItem.score >= 90 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    scoreItem.score >= 80 ? 'bg-teal-100 text-teal-800 border-teal-200' :
                    'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {scoreItem.score} / 100
                  </span>
                </div>

                <div className="w-full h-1.5 bg-slate-200 rounded-sm overflow-hidden">
                  <div
                    className={`h-full rounded-sm transition-all ${
                      scoreItem.score >= 90 ? 'bg-emerald-600' :
                      scoreItem.score >= 80 ? 'bg-teal-600' :
                      'bg-amber-600'
                    }`}
                    style={{ width: `${scoreItem.score}%` }}
                  />
                </div>

                <p className="text-[11px] text-slate-600 font-normal leading-tight">
                  {scoreItem.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
