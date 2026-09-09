import React from 'react';
import { Activity, ShieldCheck, TrendingUp, TrendingDown, Minus, CheckCircle2 } from 'lucide-react';
import { CleanlinessScore, Language } from '../types';
import { translations } from '../lib/translations';

interface CleanlinessScoresProps {
  language: Language;
  cleanlinessScores: CleanlinessScore[];
}

export const CleanlinessScores: React.FC<CleanlinessScoresProps> = ({ language, cleanlinessScores }) => {
  const t = translations[language];

  const overallAvg = Math.round(
    cleanlinessScores.reduce((acc, c) => acc + c.score, 0) / (cleanlinessScores.length || 1)
  );

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-teal-950/80 border border-teal-500/40 px-2.5 py-0.5 rounded-md text-teal-300 text-[11px] font-semibold">
              <Activity className="w-3.5 h-3.5 text-teal-400" />
              <span>Campus Zone Ratings & Audit Logs</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">{t.cleanlinessScore}</h1>
            <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
              Every area of the school (classrooms, toilets, playground, canteen) receives a score based on complaint logs & daily inspections.
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-md text-center shrink-0">
            <div className="text-[10px] text-teal-300 font-bold uppercase tracking-wider">Campus Overall Index</div>
            <div className="text-2xl font-extrabold text-teal-400 mt-0.5">{overallAvg} / 100</div>
          </div>
        </div>
      </div>

      {/* Scores Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {cleanlinessScores.map((item) => (
          <div
            key={item.id}
            className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-2xs space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-extrabold text-slate-900 text-sm">{item.area}</span>
                <span className={`px-2 py-0.5 rounded-sm text-[10px] font-extrabold border ${
                  item.score >= 90 ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                  item.score >= 80 ? 'bg-teal-100 text-teal-800 border-teal-200' :
                  'bg-amber-100 text-amber-800 border-amber-200'
                }`}>
                  {item.score} / 100
                </span>
              </div>

              <div className="w-full h-1.5 bg-slate-100 rounded-sm overflow-hidden">
                <div
                  className={`h-full rounded-sm transition-all duration-500 ${
                    item.score >= 90 ? 'bg-emerald-600' :
                    item.score >= 80 ? 'bg-teal-600' :
                    'bg-amber-600'
                  }`}
                  style={{ width: `${item.score}%` }}
                />
              </div>

              <p className="text-xs text-slate-700 leading-relaxed font-normal bg-slate-50 p-2.5 rounded-md border border-slate-200/80">
                {item.notes}
              </p>
            </div>

            <div className="pt-1.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
              <div>Last inspected: {item.lastInspected}</div>
              <div className="flex items-center space-x-1 font-bold text-slate-700">
                {item.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-emerald-700" />}
                {item.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-red-600" />}
                {item.trend === 'stable' && <Minus className="w-3.5 h-3.5 text-slate-400" />}
                <span className="capitalize">{item.trend} Trend</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
