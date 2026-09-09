import React, { useState } from 'react';
import { Apple, Droplet, Sparkles, Utensils, CheckCircle2, ChevronRight } from 'lucide-react';
import { Language } from '../types';
import { MEAL_PLAN_WEEK } from '../data/mockData';
import { translations } from '../lib/translations';

interface MealPlannerProps {
  language: Language;
}

export const MealPlanner: React.FC<MealPlannerProps> = ({ language }) => {
  const t = translations[language];
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);

  // Water calculator state
  const [weightKg, setWeightKg] = useState<number>(35);
  const [activeHours, setActiveHours] = useState<number>(1);

  const calculatedLitres = ((weightKg * 0.033) + (activeHours * 0.35)).toFixed(1);
  const calculatedGlasses = Math.round(Number(calculatedLitres) * 4);

  const activeDay = MEAL_PLAN_WEEK[selectedDayIndex];

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-teal-800 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 text-xs font-bold border border-emerald-400/30">
            <Utensils className="w-4 h-4 text-emerald-300" />
            <span>School Nutrition & Lunchbox Guide</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t.mealPlanner}</h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Nutritious weekly lunchbox plans, immunity-boosting snacks, and customized water requirement calculator.
          </p>
        </div>
      </div>

      {/* Main Grid: Day Selector + Meal Breakdown + Water Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Weekly Menu Selector & Meal Card */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Day Tabs */}
          <div className="flex space-x-2 overflow-x-auto pb-1">
            {MEAL_PLAN_WEEK.map((item, idx) => (
              <button
                key={item.day}
                onClick={() => setSelectedDayIndex(idx)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDayIndex === idx
                    ? 'bg-emerald-600 text-white shadow-md'
                    : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                {item.day}
              </button>
            ))}
          </div>

          {/* Active Day Menu Box */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-xl font-black text-slate-900">{activeDay.day} Healthy Menu</h2>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Balanced Nutrients
              </span>
            </div>

            <div className="space-y-4">
              
              <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
                <div className="text-xs font-bold text-amber-900 flex items-center space-x-2">
                  <Apple className="w-4 h-4 text-amber-600" />
                  <span>Breakfast (Home)</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{activeDay.breakfast}</p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
                <div className="text-xs font-bold text-emerald-900 flex items-center space-x-2">
                  <Utensils className="w-4 h-4 text-emerald-600" />
                  <span>School Lunchbox Idea</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{activeDay.lunch}</p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-200/80 space-y-1">
                <div className="text-xs font-bold text-purple-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-purple-600" />
                  <span>After-School Healthy Snack</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{activeDay.snack}</p>
              </div>

              <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-200/80 space-y-1">
                <div className="text-xs font-bold text-teal-900 flex items-center space-x-2">
                  <Droplet className="w-4 h-4 text-teal-600" />
                  <span>Daily Hydration Tip</span>
                </div>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">{activeDay.hydrationTip}</p>
              </div>

            </div>
          </div>

        </div>

        {/* Right Column: Custom Water Requirement Calculator */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs space-y-6">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-black text-slate-900 tracking-tight flex items-center space-x-2">
              <Droplet className="w-5 h-5 text-teal-600" />
              <span>Smart Water Calculator</span>
            </h2>
            <p className="text-xs text-slate-500">Calculates personalized water intake based on student weight and physical activity.</p>
          </div>

          <div className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 font-bold mb-1">Student Weight: {weightKg} kg</label>
              <input
                type="range"
                min={20}
                max={80}
                value={weightKg}
                onChange={(e) => setWeightKg(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1">Daily Sports / Play Time: {activeHours} Hour(s)</label>
              <input
                type="range"
                min={0}
                max={4}
                value={activeHours}
                onChange={(e) => setActiveHours(Number(e.target.value))}
                className="w-full accent-teal-600 cursor-pointer"
              />
            </div>

            <div className="p-5 rounded-2xl bg-gradient-to-tr from-teal-800 to-emerald-900 text-white text-center space-y-2 shadow-md">
              <div className="text-[11px] font-bold text-teal-200 uppercase tracking-wider">Recommended Daily Water Target</div>
              <div className="text-3xl font-black text-teal-300">{calculatedLitres} Liters</div>
              <div className="text-xs font-bold text-slate-200">Approx. {calculatedGlasses} Standard Glasses (250ml)</div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
