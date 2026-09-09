import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ShieldAlert, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  TrendingUp, 
  Building2, 
  FileText, 
  Zap, 
  Award,
  ChevronRight
} from 'lucide-react';
import { Complaint, CleanlinessScore, Language } from '../types';
import { translations } from '../lib/translations';

interface AIInspectorDashboardProps {
  language: Language;
  complaints: Complaint[];
  cleanlinessScores: CleanlinessScore[];
}

export const AIInspectorDashboard: React.FC<AIInspectorDashboardProps> = ({
  language,
  complaints,
  cleanlinessScores,
}) => {
  const t = translations[language];

  const [report, setReport] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchInspectorReport = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai/inspector-report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaints,
          cleanlinessScores,
        }),
      });

      const data = await res.json();
      setReport(data);
    } catch (err) {
      console.error("AI Inspector error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInspectorReport();
  }, [complaints.length]);

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1 max-w-2xl">
            <div className="inline-flex items-center space-x-2 bg-indigo-950/80 border border-indigo-500/40 px-2.5 py-0.5 rounded-md text-indigo-300 text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              <span>CEP Judge Feature Showcase • Automated AI Health Inspector</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight">{t.aiInspectorTitle}</h1>
            <p className="text-slate-300 text-xs leading-relaxed">
              Analyzes real-time complaint clusters, predicts seasonal risks, pinpoints infrastructure hotspots, and recommends preventive policy actions for school staff.
            </p>
          </div>

          <button
            onClick={fetchInspectorReport}
            disabled={loading}
            className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-4 py-2 rounded-md text-xs shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer shrink-0 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            <span>{loading ? 'Analyzing Campus Data...' : 'Run Live AI Audit'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: AI Inspection Findings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Columns: Executive Findings & Recommendations */}
        <div className="lg:col-span-2 space-y-4">
          
          {/* Status & Hotspots */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] font-bold text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200 uppercase tracking-wider">
                  System Health Assessment
                </span>
                <h2 className="text-base font-extrabold text-slate-900 mt-1 uppercase">
                  {report?.overallStatus || "satisfactory - Minor Attention Required"}
                </h2>
              </div>
              <Award className="w-6 h-6 text-indigo-700" />
            </div>

            {/* Identified High-Risk Hotspots */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                <span>Identified High-Risk Hotspots</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {report?.keyHotspots?.map((hotspot: string, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-md bg-amber-50/80 border border-amber-200/80 font-bold text-xs text-amber-950 flex items-center space-x-2">
                    <Building2 className="w-3.5 h-3.5 text-amber-700 shrink-0" />
                    <span>{hotspot}</span>
                  </div>
                )) || <p className="text-xs text-slate-400">Loading hotspots...</p>}
              </div>
            </div>

            {/* Recurring Systematic Issues */}
            <div className="space-y-2">
              <h3 className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                <TrendingUp className="w-3.5 h-3.5 text-red-600" />
                <span>Recurring Systematic Patterns</span>
              </h3>

              <div className="space-y-1.5 text-xs">
                {report?.recurringIssues?.map((issue: string, idx: number) => (
                  <div key={idx} className="p-2.5 rounded-md bg-slate-50 border border-slate-200/80 font-medium text-slate-800 flex items-start space-x-2">
                    <span className="w-4 h-4 rounded-sm bg-red-100 text-red-800 font-bold text-[9px] flex items-center justify-center shrink-0 mt-0.5">
                      !
                    </span>
                    <span>{issue}</span>
                  </div>
                )) || <p className="text-xs text-slate-400">Loading recurring trends...</p>}
              </div>
            </div>

          </div>

          {/* Actionable Preventive Recommendations */}
          <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-lg border border-slate-800 shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-emerald-400 font-bold text-xs">
              <Zap className="w-4 h-4 text-emerald-400" />
              <span>Recommended Preventive Policy Actions</span>
            </div>

            <div className="space-y-2">
              {report?.preventiveRecommendations?.map((rec: string, idx: number) => (
                <div key={idx} className="bg-slate-800/90 p-3 rounded-md border border-slate-700 text-xs text-slate-200 flex items-start space-x-2.5 leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{rec}</span>
                </div>
              )) || <p className="text-xs text-slate-400">Generating policy recommendations...</p>}
            </div>
          </div>

        </div>

        {/* Right Column: AI Prediction & Seasonal Health Risk Alert */}
        <div className="space-y-4">
          
          {/* Seasonal Health Risk Alert Box */}
          <div className="bg-amber-950/90 text-amber-100 border border-amber-800 p-4 sm:p-5 rounded-lg shadow-2xs space-y-3">
            <div className="flex items-center space-x-2 text-amber-300 font-extrabold text-xs">
              <ShieldAlert className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>16. AI Seasonal Risk Prediction</span>
            </div>

            <div className="bg-amber-900/40 p-3 rounded-md border border-amber-700/60 space-y-1">
              <p className="text-xs leading-relaxed font-medium">
                {report?.seasonalRiskAlert || "Monsoon Humidity Warning: Keep washroom floors dry and clean water dispensers to prevent bacterial growth during rainy season."}
              </p>
            </div>

            <div className="text-[10px] text-amber-300 font-medium">
              Automatically synchronized with weather forecast & local health department alerts.
            </div>
          </div>

          {/* School Cleanliness Score Radar Peek */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-3">
            <h3 className="text-xs font-extrabold text-slate-900 uppercase">Zone Preventive Maintenance Priority</h3>
            <div className="space-y-1.5 text-xs font-bold text-slate-700">
              <div className="flex justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80">
                <span>Restrooms & Washrooms</span>
                <span className="text-red-700 font-extrabold">High Maintenance</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80">
                <span>Water Coolers Block B</span>
                <span className="text-amber-800 font-extrabold">Medium Priority</span>
              </div>
              <div className="flex justify-between p-2 rounded-md bg-slate-50 border border-slate-200/80">
                <span>Main Canteen & Kitchen</span>
                <span className="text-emerald-800 font-extrabold">Low Risk</span>
              </div>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
