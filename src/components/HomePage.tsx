import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Sparkles, 
  AlertTriangle, 
  MessageSquare, 
  CheckCircle2, 
  Bot, 
  Calendar, 
  Award, 
  FileDown, 
  PhoneCall, 
  RefreshCw, 
  Activity, 
  ChevronRight,
  TrendingUp,
  Droplet
} from 'lucide-react';
import { Language, Complaint, CleanlinessScore, SchoolInfo } from '../types';
import { translations } from '../lib/translations';
import { HEALTH_QUOTES } from '../data/mockData';
import { Building2, MapPin, UserCheck, Users, Image as ImageIcon, BellRing, ArrowRight } from 'lucide-react';

interface HomePageProps {
  language: Language;
  setActiveTab: (tab: string) => void;
  complaints: Complaint[];
  cleanlinessScores: CleanlinessScore[];
  onOpenEmergency: () => void;
  userPoints: number;
  schoolInfo?: SchoolInfo;
}

export const HomePage: React.FC<HomePageProps> = ({
  language,
  setActiveTab,
  complaints,
  cleanlinessScores,
  onOpenEmergency,
  userPoints,
  schoolInfo,
}) => {
  const t = translations[language];
  const [quoteIndex, setQuoteIndex] = useState(0);

  const nextQuote = () => {
    setQuoteIndex((prev) => (prev + 1) % HEALTH_QUOTES.length);
  };

  const currentQuote = HEALTH_QUOTES[quoteIndex];

  const pendingCount = complaints.filter(c => c.status === 'pending').length;
  const inProgressCount = complaints.filter(c => c.status === 'in_progress').length;
  const resolvedCount = complaints.filter(c => c.status === 'resolved').length;

  const avgCleanliness = Math.round(
    cleanlinessScores.reduce((acc, curr) => acc + curr.score, 0) / (cleanlinessScores.length || 1)
  );

  return (
    <div className="space-y-5 pb-8">
      
      {/* Hero Welcome Banner - High Density Banner */}
      <section className="relative overflow-hidden rounded-xl bg-slate-900 border border-slate-800 text-white p-5 sm:p-7 shadow-sm">
        <div className="relative z-10 max-w-4xl space-y-3">
          <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
            <span>AI-Powered School Health & Hygiene Operations</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            {t.welcomeTitle}
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-normal max-w-3xl">
            {t.welcomeSubtitle}
          </p>

          <div className="pt-1 flex flex-wrap gap-2.5">
            <button
              onClick={() => setActiveTab('complaintCell')}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-md font-semibold text-xs shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>{t.submitComplaint}</span>
            </button>

            <button
              onClick={() => setActiveTab('aiAssistant')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 px-4 py-2 rounded-md font-semibold text-xs transition-all flex items-center space-x-1.5 cursor-pointer"
            >
              <Bot className="w-3.5 h-3.5 text-teal-400" />
              <span>Ask AI Hygiene Assistant</span>
            </button>

            <button
              onClick={() => setActiveTab('aiInspector')}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-semibold text-xs transition-all flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI Health Inspector</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Metric Badges */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-4 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{t.cleanlinessAvg}</div>
            <div className="text-xl font-extrabold text-emerald-400 mt-0.5 flex items-center space-x-1">
              <span>{avgCleanliness}%</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Active Complaints</div>
            <div className="text-xl font-extrabold text-amber-400 mt-0.5">
              {pendingCount + inProgressCount}
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{t.resolvedComplaints}</div>
            <div className="text-xl font-extrabold text-teal-300 mt-0.5">
              {resolvedCount}
            </div>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-lg border border-slate-700">
            <div className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">Health Points</div>
            <div className="text-xl font-extrabold text-amber-300 mt-0.5 flex items-center space-x-1">
              <span>{userPoints}</span>
              <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      {/* School Information Snapshot Card */}
      {schoolInfo && (
        <section className="bg-white rounded-lg border border-slate-200/90 p-4 shadow-2xs space-y-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-100 pb-2.5">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center font-bold">
                <Building2 className="w-4 h-4" />
              </div>
              <div>
                <h2 className="font-extrabold text-sm text-slate-900">{schoolInfo.name}</h2>
                <div className="text-[11px] text-slate-500 flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-slate-400" />
                  <span className="truncate max-w-md">{schoolInfo.address}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('schoolProfile')}
              className="text-xs bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-3 py-1.5 rounded-md border border-indigo-200/80 transition-colors flex items-center space-x-1 cursor-pointer shrink-0"
            >
              <span>Manage School Details & Photos</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">{t.principalName}</div>
              <div className="font-bold text-slate-900 truncate mt-0.5">{schoolInfo.principalName}</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">{t.noOfStudents}</div>
              <div className="font-extrabold text-emerald-800 mt-0.5">{schoolInfo.studentCount.toLocaleString()} Students</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Campus Gallery</div>
              <div className="font-bold text-indigo-800 mt-0.5">{schoolInfo.photos.length} Photos Uploaded</div>
            </div>

            <div className="p-2.5 bg-slate-50 rounded-md border border-slate-200/60">
              <div className="text-[10px] text-slate-500 font-bold uppercase">Active Announcements</div>
              <div className="font-bold text-teal-800 mt-0.5">{schoolInfo.notifications.length} Bulletins</div>
            </div>
          </div>

          {/* Quick Photo Strip Preview */}
          {schoolInfo.photos.length > 0 && (
            <div className="pt-1 flex space-x-2 overflow-x-auto pb-1">
              {schoolInfo.photos.slice(0, 4).map((photo) => (
                <div
                  key={photo.id}
                  onClick={() => setActiveTab('schoolProfile')}
                  className="relative h-16 w-28 shrink-0 rounded-md overflow-hidden border border-slate-200 cursor-pointer group"
                >
                  <img
                    src={photo.url}
                    alt={photo.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-slate-900/30 group-hover:bg-slate-900/10 transition-colors" />
                  <span className="absolute bottom-1 left-1 right-1 text-[9px] font-bold text-white truncate drop-shadow-md">
                    {photo.title}
                  </span>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      {/* Health Quote of the Day & Emergency Quick SOS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Quote Card */}
        <div className="md:col-span-2 bg-white border border-slate-200/90 rounded-lg p-4 relative flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="bg-emerald-100 text-emerald-800 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">
                {t.healthQuote}
              </span>
              <button 
                onClick={nextQuote}
                className="text-slate-600 hover:text-emerald-700 p-1 rounded-md hover:bg-slate-100 transition-colors cursor-pointer flex items-center space-x-1 text-xs font-semibold"
                title="Next Quote"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Next Quote</span>
              </button>
            </div>
            <blockquote className="text-sm sm:text-base font-semibold text-slate-900 leading-snug">
              "{currentQuote.quote}"
            </blockquote>
          </div>
          <p className="text-xs font-bold text-slate-600 mt-3 text-right">— {currentQuote.author}</p>
        </div>

        {/* Emergency SOS Quick Card */}
        <div className="bg-red-50/80 border border-red-200 rounded-lg p-4 flex flex-col justify-between shadow-2xs">
          <div>
            <div className="flex items-center space-x-1.5 text-red-800 font-bold text-xs mb-1.5">
              <PhoneCall className="w-4 h-4 text-red-600" />
              <span>{t.emergencyContacts}</span>
            </div>
            <p className="text-[11px] text-red-900 leading-relaxed font-normal">
              Direct helplines for Ambulance (102/112), Police (100/112), and Fire Station (101).
            </p>
          </div>
          <button
            onClick={onOpenEmergency}
            className="mt-3 w-full bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-3 rounded-md text-xs shadow-2xs transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Open Emergency Panel</span>
          </button>
        </div>

      </div>

      {/* Quick Access Action Tiles */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">{t.quickAccess}</h2>
          <span className="text-xs font-medium text-slate-500">20+ Campus Modules</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5">
          
          <button
            onClick={() => setActiveTab('complaintCell')}
            className="bg-white hover:bg-emerald-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-800 flex items-center justify-center mb-2 font-bold">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-emerald-800">Smart Complaint</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Report & track issues</div>
          </button>

          <button
            onClick={() => setActiveTab('aiAssistant')}
            className="bg-white hover:bg-teal-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-teal-100 text-teal-800 flex items-center justify-center mb-2 font-bold">
              <Bot className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-teal-800">AI Health Bot</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Instant hygiene Q&A</div>
          </button>

          <button
            onClick={() => setActiveTab('habitTracker')}
            className="bg-white hover:bg-amber-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-800 flex items-center justify-center mb-2 font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-amber-800">Habit Tracker</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Earn points & badges</div>
          </button>

          <button
            onClick={() => setActiveTab('quizGames')}
            className="bg-white hover:bg-indigo-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-indigo-100 text-indigo-800 flex items-center justify-center mb-2 font-bold">
              <Award className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-indigo-800">Quiz & Games</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Interactive certificates</div>
          </button>

          <button
            onClick={() => setActiveTab('cleanlinessScore')}
            className="bg-white hover:bg-cyan-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-cyan-100 text-cyan-800 flex items-center justify-center mb-2 font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-cyan-800">Cleanliness Scores</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Area score breakdown</div>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className="bg-white hover:bg-purple-50/40 p-3 rounded-lg border border-slate-200/90 text-left transition-all shadow-2xs group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-md bg-purple-100 text-purple-800 flex items-center justify-center mb-2 font-bold">
              <Calendar className="w-4 h-4" />
            </div>
            <div className="font-bold text-xs text-slate-900 group-hover:text-purple-800">Health Calendar</div>
            <div className="text-[10px] text-slate-500 mt-0.5">Vaccination & drives</div>
          </button>

        </div>
      </section>

      {/* Latest School Health Updates Ticker & Recent Complaints */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Latest School Health News */}
        <div className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-xs text-slate-900 flex items-center space-x-1.5 uppercase tracking-wide">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{t.latestUpdates}</span>
            </h3>
            <button 
              onClick={() => setActiveTab('learningCenter')}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center"
            >
              <span>View All</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200/60 space-y-0.5">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Free Health & Eye Checkup Camp</span>
                <span className="text-[10px] text-emerald-800 bg-emerald-100 border border-emerald-200 px-1.5 py-0.2 rounded-sm font-bold">Aug 10</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Visiting doctor team will conduct general physical screening and vision test in the auditorium.
              </p>
            </div>

            <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200/60 space-y-0.5">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Drinking Water Filters Upgraded</span>
                <span className="text-[10px] text-teal-800 bg-teal-100 border border-teal-200 px-1.5 py-0.2 rounded-sm font-bold">Completed</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                All 6 campus water coolers fitted with new 5-stage UV water purification filters.
              </p>
            </div>

            <div className="p-2.5 rounded-md bg-slate-50 border border-slate-200/60 space-y-0.5">
              <div className="flex items-center justify-between font-bold text-slate-900">
                <span>Weekly Cleanliness Award Winner</span>
                <span className="text-[10px] text-amber-800 bg-amber-100 border border-amber-200 px-1.5 py-0.2 rounded-sm font-bold">Class 7B</span>
              </div>
              <p className="text-slate-600 text-[11px]">
                Classroom 7B awarded 98/100 for immaculate desk organization and waste segregation.
              </p>
            </div>
          </div>
        </div>

        {/* Live Complaint Stream Snapshot */}
        <div className="bg-white p-4 rounded-lg border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="font-bold text-xs text-slate-900 flex items-center space-x-1.5 uppercase tracking-wide">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Recent Complaint Stream</span>
            </h3>
            <button 
              onClick={() => setActiveTab('complaintCell')}
              className="text-xs text-emerald-700 font-bold hover:underline flex items-center"
            >
              <span>{t.trackComplaint}</span>
              <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
            </button>
          </div>

          <div className="space-y-2">
            {complaints.slice(0, 3).map((item) => (
              <div key={item.id} className="p-2.5 rounded-md border border-slate-200/60 bg-slate-50/50 hover:bg-slate-50 transition-colors flex items-start justify-between text-xs">
                <div className="space-y-0.5 max-w-[70%]">
                  <div className="font-bold text-slate-900 truncate">{item.title}</div>
                  <div className="text-[11px] text-slate-500 truncate">{item.location}</div>
                  <span className="inline-block text-[10px] bg-slate-200/70 text-slate-800 font-semibold px-1.5 py-0.2 rounded-sm">
                    {item.category}
                  </span>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-1.5 py-0.2 rounded-sm text-[10px] font-bold border ${
                    item.status === 'resolved' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                    item.status === 'in_progress' ? 'bg-blue-100 text-blue-800 border-blue-200' :
                    'bg-amber-100 text-amber-800 border-amber-200'
                  }`}>
                    {item.status.replace('_', ' ').toUpperCase()}
                  </span>
                  <div className="text-[10px] text-slate-500 mt-1">{item.submittedAt.split(' ')[0]}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
