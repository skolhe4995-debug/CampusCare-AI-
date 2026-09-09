import React, { useState } from 'react';
import { 
  ShowerHead, 
  Apple, 
  Brain, 
  Cross, 
  Dumbbell, 
  Sparkles, 
  BookOpen, 
  CheckCircle, 
  Search,
  PlayCircle
} from 'lucide-react';
import { HealthLesson, Language } from '../types';
import { HEALTH_LESSONS } from '../data/mockData';
import { translations } from '../lib/translations';

interface LearningCenterProps {
  language: Language;
}

export const LearningCenter: React.FC<LearningCenterProps> = ({ language }) => {
  const t = translations[language];
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeLesson, setActiveLesson] = useState<HealthLesson | null>(HEALTH_LESSONS[0]);

  const categories = [
    { id: 'all', label: 'All Topics', icon: BookOpen },
    { id: 'hygiene', label: 'Personal Hygiene', icon: ShowerHead },
    { id: 'nutrition', label: 'Healthy Eating', icon: Apple },
    { id: 'mental_health', label: 'Mental Wellness', icon: Brain },
    { id: 'first_aid', label: 'First-Aid Basics', icon: Cross },
  ];

  const filteredLessons = HEALTH_LESSONS.filter(lesson => {
    const matchesCategory = selectedCategory === 'all' || lesson.category === selectedCategory;
    const matchesQuery = lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-teal-800 to-emerald-800 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-emerald-500/20 px-3 py-1 rounded-full text-emerald-200 text-xs font-bold">
            <BookOpen className="w-4 h-4 text-emerald-300" />
            <span>Interactive Health Education</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-black">{t.learningCenter}</h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Master essential daily hygiene habits, nutritious eating guides, stress relief tools, and life-saving first-aid techniques.
          </p>
        </div>

        {/* Search Bar & Category Filters */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search hygiene lessons, first-aid, nutrition..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-slate-900 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-xl text-xs font-medium outline-hidden shadow-xs"
            />
          </div>

          <div className="flex space-x-1 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center space-x-1.5 cursor-pointer ${
                    selectedCategory === cat.id
                      ? 'bg-white text-teal-900 shadow-md'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Grid: Lessons Explorer & Detail Reader */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Lesson Cards List */}
        <div className="space-y-4">
          <h2 className="text-sm font-black text-slate-900 uppercase tracking-wider">Available Modules ({filteredLessons.length})</h2>
          
          <div className="space-y-3">
            {filteredLessons.map((lesson) => {
              const isSelected = activeLesson?.id === lesson.id;
              return (
                <div
                  key={lesson.id}
                  onClick={() => setActiveLesson(lesson)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-50 border-emerald-300 shadow-md ring-2 ring-emerald-500/20'
                      : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`p-2.5 rounded-xl shrink-0 ${
                      isSelected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {lesson.category === 'hygiene' && <ShowerHead className="w-5 h-5" />}
                      {lesson.category === 'nutrition' && <Apple className="w-5 h-5" />}
                      {lesson.category === 'mental_health' && <Brain className="w-5 h-5" />}
                      {lesson.category === 'first_aid' && <Cross className="w-5 h-5" />}
                      {lesson.category === 'fitness' && <Dumbbell className="w-5 h-5" />}
                    </div>

                    <div className="space-y-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {lesson.category.replace('_', ' ')}
                      </span>
                      <h3 className="font-bold text-xs text-slate-900 leading-snug">{lesson.title}</h3>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{lesson.summary}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Active Module View & Visual Infographic Simulator */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
          {activeLesson ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-xs font-bold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-lg">
                    {activeLesson.category.replace('_', ' ')}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mt-2">{activeLesson.title}</h2>
                </div>
                <div className="hidden sm:flex items-center space-x-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
                  <Sparkles className="w-4 h-4" />
                  <span>Verified Health Curriculum</span>
                </div>
              </div>

              {/* Lesson Summary */}
              <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100">
                {activeLesson.summary}
              </p>

              {/* Key Scientific Facts */}
              <div className="space-y-3">
                <h3 className="text-sm font-bold text-slate-900 flex items-center space-x-2">
                  <BookOpen className="w-4 h-4 text-emerald-600" />
                  <span>Core Learning Points</span>
                </h3>

                <ul className="space-y-2">
                  {activeLesson.content.map((point, idx) => (
                    <li key={idx} className="flex items-start space-x-2.5 text-xs text-slate-700 leading-relaxed">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Practical Action Tips */}
              <div className="space-y-3 bg-amber-50/70 border border-amber-200/80 p-5 rounded-2xl">
                <h3 className="text-xs font-bold text-amber-900 flex items-center space-x-2">
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>Daily Actionable Habits</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {activeLesson.tips.map((tip, idx) => (
                    <div key={idx} className="flex items-start space-x-2 bg-white/80 p-2.5 rounded-xl border border-amber-200/60 font-medium text-slate-800">
                      <CheckCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                      <span>{tip}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Interactive Infographic Visualizer */}
              <div className="bg-gradient-to-tr from-slate-900 to-teal-950 text-white p-6 rounded-2xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <PlayCircle className="w-5 h-5 text-teal-400" />
                    <span className="font-bold text-xs uppercase tracking-wider text-teal-300">Infographic & Visual Simulation</span>
                  </div>
                  <span className="text-[10px] bg-teal-500/20 text-teal-200 px-2.5 py-0.5 rounded-full border border-teal-400/30 font-bold">Interactive</span>
                </div>

                <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10 text-center space-y-2">
                  <p className="text-xs text-slate-200">
                    💡 <strong className="text-white">Hygiene Tip:</strong> Wash your hands before eating snacks, after using washrooms, and immediately after playing on the playground!
                  </p>
                  <div className="pt-2 flex justify-center space-x-3 text-[11px]">
                    <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded-md border border-emerald-400/30">1. Wet Hands</span>
                    <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded-md border border-emerald-400/30">2. Lather Soap (20s)</span>
                    <span className="bg-emerald-500/30 text-emerald-200 px-2 py-1 rounded-md border border-emerald-400/30">3. Rinse & Dry</span>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-12 text-slate-400">Select a module to read lessons</div>
          )}
        </div>

      </div>

    </div>
  );
};
