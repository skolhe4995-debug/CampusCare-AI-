import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Droplet, 
  ShowerHead, 
  Apple, 
  Dumbbell, 
  Moon, 
  Award, 
  Crown, 
  Flame, 
  Lock, 
  Plus, 
  Minus 
} from 'lucide-react';
import { Badge, HabitLog, Language } from '../types';
import { translations } from '../lib/translations';
import { INITIAL_BADGES } from '../data/mockData';

interface HabitTrackerProps {
  language: Language;
  userPoints: number;
  onAddPoints: (pts: number) => void;
}

export const HabitTracker: React.FC<HabitTrackerProps> = ({
  language,
  userPoints,
  onAddPoints,
}) => {
  const t = translations[language];

  const [habits, setHabits] = useState<HabitLog>({
    date: new Date().toISOString().split('T')[0],
    brushedTeeth: false,
    washedHands: false,
    waterGlasses: 2,
    healthyFood: false,
    exercised: false,
    sleptWell: false,
  });

  const [streakDays, setStreakDays] = useState(5);
  const [badges, setBadges] = useState<Badge[]>(INITIAL_BADGES);
  const [lastLogged, setLastLogged] = useState(false);

  const toggleHabit = (key: keyof HabitLog) => {
    if (typeof habits[key] === 'boolean') {
      const newValue = !habits[key];
      setHabits((prev) => ({ ...prev, [key]: newValue }));

      if (newValue) {
        onAddPoints(10); // +10 points for completing habit
      }
    }
  };

  const adjustWater = (delta: number) => {
    setHabits((prev) => {
      const current = prev.waterGlasses;
      const nextVal = Math.max(0, Math.min(12, current + delta));
      if (nextVal > current) onAddPoints(5); // +5 per glass
      return { ...prev, waterGlasses: nextVal };
    });
  };

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-amber-950/80 border border-amber-500/40 px-2.5 py-0.5 rounded-md text-amber-300 text-[11px] font-semibold">
              <Flame className="w-3.5 h-3.5 text-amber-400" />
              <span>{streakDays} Day Active Streak!</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold">{t.habitTracker}</h1>
            <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
              Track your daily water intake, teeth brushing, healthy lunchbox, handwashing, and exercise routines to earn health points & unlock cool badges!
            </p>
          </div>

          <div className="bg-slate-800/90 border border-slate-700 p-3 rounded-md text-center shrink-0">
            <div className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Total Health Points</div>
            <div className="text-2xl font-extrabold text-amber-400 mt-0.5 flex items-center justify-center space-x-1">
              <span>{userPoints}</span>
              <Sparkles className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Checklist & Water Counter Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Left 2 Columns: Daily Habits Checklist */}
        <div className="lg:col-span-2 bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase">Today's Healthy Habits Checklist</h2>
              <p className="text-[11px] text-slate-500">Tap to mark habit as completed & earn points</p>
            </div>
            <div className="text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200">
              {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            
            {/* 1. Brushed Teeth */}
            <div
              onClick={() => toggleHabit('brushedTeeth')}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                habits.brushedTeeth
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-md ${habits.brushedTeeth ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.brushed}</div>
                  <div className="text-[10px] text-slate-500">Morning & bedtime</div>
                </div>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${habits.brushedTeeth ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'}`} />
            </div>

            {/* 2. Washed Hands */}
            <div
              onClick={() => toggleHabit('washedHands')}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                habits.washedHands
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-md ${habits.washedHands ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <ShowerHead className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.washedHands}</div>
                  <div className="text-[10px] text-slate-500">Before meals & after PE</div>
                </div>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${habits.washedHands ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'}`} />
            </div>

            {/* 3. Ate Healthy Food */}
            <div
              onClick={() => toggleHabit('healthyFood')}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                habits.healthyFood
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-md ${habits.healthyFood ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Apple className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.healthyMeal}</div>
                  <div className="text-[10px] text-slate-500">Fruit, salad, or home lunchbox</div>
                </div>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${habits.healthyFood ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'}`} />
            </div>

            {/* 4. Exercised */}
            <div
              onClick={() => toggleHabit('exercised')}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between ${
                habits.exercised
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-md ${habits.exercised ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.exercise}</div>
                  <div className="text-[10px] text-slate-500">Sports, outdoor play, or yoga</div>
                </div>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${habits.exercised ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'}`} />
            </div>

            {/* 5. Slept Well */}
            <div
              onClick={() => toggleHabit('sleptWell')}
              className={`p-3 rounded-md border transition-all cursor-pointer flex items-center justify-between sm:col-span-2 ${
                habits.sleptWell
                  ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 shadow-2xs'
                  : 'bg-slate-50 border-slate-200/90 text-slate-800 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center space-x-2.5">
                <div className={`p-2 rounded-md ${habits.sleptWell ? 'bg-emerald-700 text-white' : 'bg-slate-200 text-slate-600'}`}>
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-bold text-xs">{t.goodSleep}</div>
                  <div className="text-[10px] text-slate-500">8 to 9 hours uninterrupted sleep</div>
                </div>
              </div>
              <CheckCircle2 className={`w-5 h-5 ${habits.sleptWell ? 'text-emerald-700 fill-emerald-100' : 'text-slate-300'}`} />
            </div>

          </div>

          {/* Daily Water Intake Counter Widget */}
          <div className="bg-slate-50 border border-teal-200 p-3.5 rounded-md space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-1.5 text-teal-900 font-bold text-xs">
                <Droplet className="w-3.5 h-3.5 text-teal-700 fill-teal-200" />
                <span>Daily Hydration Goal Tracker (8 Glasses Goal)</span>
              </div>
              <span className="text-xs font-black text-teal-800">{habits.waterGlasses} / 8 Glasses</span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-1 overflow-x-auto">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <div
                    key={idx}
                    className={`w-6 h-8 rounded-md border flex items-center justify-center transition-colors ${
                      idx < habits.waterGlasses
                        ? 'bg-teal-600 border-teal-700 text-white shadow-2xs'
                        : 'bg-white border-slate-300 text-slate-300'
                    }`}
                  >
                    <Droplet className="w-3.5 h-3.5 fill-current" />
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-1.5 shrink-0">
                <button
                  onClick={() => adjustWater(-1)}
                  className="w-7 h-7 rounded-md bg-white border border-slate-300 text-slate-800 font-bold hover:bg-slate-100 flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => adjustWater(1)}
                  className="w-7 h-7 rounded-md bg-teal-700 text-white font-bold hover:bg-teal-800 flex items-center justify-center cursor-pointer shadow-2xs"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Unlockable Badges & Level Progress */}
        <div className="bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h2 className="text-sm font-extrabold text-slate-900 tracking-tight uppercase flex items-center space-x-1.5">
              <Award className="w-4 h-4 text-amber-600" />
              <span>Unlockable Badges</span>
            </h2>
            <span className="text-[10px] font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              {badges.filter(b => userPoints >= b.pointsRequired).length} / {badges.length} Unlocked
            </span>
          </div>

          <div className="space-y-2">
            {badges.map((b) => {
              const isUnlocked = userPoints >= b.pointsRequired;
              return (
                <div
                  key={b.id}
                  className={`p-2.5 rounded-md border transition-all flex items-start space-x-2.5 ${
                    isUnlocked
                      ? 'bg-amber-50/50 border-amber-200 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 opacity-60'
                  }`}
                >
                  <div className={`p-2 rounded-md shrink-0 ${
                    isUnlocked ? 'bg-amber-600 text-white shadow-2xs' : 'bg-slate-200 text-slate-500'
                  }`}>
                    {isUnlocked ? <Crown className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                  </div>

                  <div className="space-y-0.5 text-xs">
                    <div className="font-bold text-slate-900 flex items-center space-x-1">
                      <span>{b.name}</span>
                      {isUnlocked && <span className="text-[9px] bg-emerald-100 text-emerald-800 px-1 py-0.2 rounded-sm font-bold uppercase">UNLOCKED</span>}
                    </div>
                    <p className="text-[11px] text-slate-600 leading-snug">{b.desc}</p>
                    <div className="text-[10px] font-bold text-amber-800 pt-0.5">
                      {b.pointsRequired} pts needed
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
};
