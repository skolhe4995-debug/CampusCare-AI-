import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight, PhoneCall, Sparkles, Building2, ShieldAlert, Award, Calendar, ChevronRight } from 'lucide-react';
import { APP_FEATURES, SearchableFeature } from '../data/searchFeatures';
import { SchoolInfo } from '../types';

interface AppSearchBarProps {
  setActiveTab: (tab: string) => void;
  onOpenEmergency: () => void;
  schoolInfo?: SchoolInfo;
  placeholder?: string;
}

export const AppSearchBar: React.FC<AppSearchBarProps> = ({
  setActiveTab,
  onOpenEmergency,
  schoolInfo,
  placeholder = "Search app features (e.g. principal name, photos, complaints, ambulance, meal menu)...",
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter features based on query
  const filteredFeatures = query.trim() === '' 
    ? [] 
    : APP_FEATURES.filter(feature => {
        const q = query.toLowerCase().trim();
        const matchTitle = feature.title.toLowerCase().includes(q);
        const matchDesc = feature.description.toLowerCase().includes(q);
        const matchCategory = feature.category.toLowerCase().includes(q);
        const matchKeywords = feature.keywords.some(kw => kw.toLowerCase().includes(q));
        return matchTitle || matchDesc || matchCategory || matchKeywords;
      });

  // Quick preset search tags
  const QUICK_TAGS = [
    { label: "Principal Name", query: "principal" },
    { label: "School Photos", query: "photos" },
    { label: "Notifications", query: "notifications" },
    { label: "Report Complaint", query: "complaint" },
    { label: "Ambulance / Emergency", query: "ambulance" },
    { label: "Health Quiz", query: "quiz" },
    { label: "Meal Menu", query: "meal" },
  ];

  const handleSelectFeature = (feature: SearchableFeature) => {
    if (feature.isEmergency) {
      onOpenEmergency();
    } else if (feature.tabId) {
      setActiveTab(feature.tabId);
    }
    setIsOpen(false);
    setQuery('');
  };

  return (
    <div ref={containerRef} className="relative w-full max-w-xl mx-auto">
      {/* Search Input Box */}
      <div className="relative flex items-center">
        <div className="absolute left-3 text-slate-400 pointer-events-none">
          <Search className="w-4 h-4 text-emerald-700 font-bold" />
        </div>

        <input
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          placeholder={placeholder}
          className="w-full pl-9 pr-9 py-1.5 text-xs font-medium rounded-lg border border-slate-300 bg-slate-50 focus:bg-white focus:border-emerald-600 focus:ring-2 focus:ring-emerald-500/20 text-slate-900 placeholder:text-slate-400 transition-all outline-hidden shadow-2xs"
        />

        {query && (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-2.5 p-0.5 text-slate-400 hover:text-slate-600 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Dropdown Search Results */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 overflow-hidden max-h-[80vh] flex flex-col animate-in fade-in slide-in-from-top-2 duration-150">
          
          {/* Header Bar */}
          <div className="bg-slate-900 px-3.5 py-2 text-white text-xs font-bold flex items-center justify-between border-b border-slate-800">
            <span className="flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>CampusCare Feature Search</span>
            </span>
            <span className="text-[10px] text-slate-400 font-normal">
              {query.trim() === '' ? 'Popular quick links' : `${filteredFeatures.length} feature(s) found`}
            </span>
          </div>

          <div className="overflow-y-auto p-2 space-y-2">
            
            {/* Quick Suggestion Chips when search is empty */}
            {query.trim() === '' && (
              <div className="space-y-2 p-1">
                <div className="text-[10px] font-extrabold uppercase text-slate-400 tracking-wider">
                  Quick Feature Shortcuts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {QUICK_TAGS.map((tag, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setQuery(tag.query);
                      }}
                      className="px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 rounded-md text-[11px] font-bold transition-colors cursor-pointer flex items-center space-x-1"
                    >
                      <span>{tag.label}</span>
                    </button>
                  ))}
                </div>

                {/* Direct preview of School info if loaded */}
                {schoolInfo && (
                  <div className="mt-3 p-2.5 bg-emerald-50/70 border border-emerald-200 rounded-lg space-y-1">
                    <div className="text-[10px] font-extrabold text-emerald-900 uppercase tracking-wide flex items-center justify-between">
                      <span className="flex items-center space-x-1">
                        <Building2 className="w-3 h-3 text-emerald-700" />
                        <span>Current School Details Snapshot</span>
                      </span>
                      <button
                        onClick={() => {
                          setActiveTab('schoolProfile');
                          setIsOpen(false);
                        }}
                        className="text-emerald-800 hover:underline font-bold text-[10px] flex items-center"
                      >
                        Open Profile <ChevronRight className="w-3 h-3 ml-0.5" />
                      </button>
                    </div>
                    <div className="text-xs font-extrabold text-slate-900">{schoolInfo.name}</div>
                    <div className="text-[11px] text-slate-600">Principal: <strong className="text-slate-800">{schoolInfo.principalName}</strong> • {schoolInfo.studentCount.toLocaleString()} Students</div>
                  </div>
                )}
              </div>
            )}

            {/* Empty State */}
            {query.trim() !== '' && filteredFeatures.length === 0 && (
              <div className="p-6 text-center space-y-1">
                <p className="text-xs font-bold text-slate-700">No matching features found for "{query}"</p>
                <p className="text-[11px] text-slate-400">Try searching for keywords like "principal", "photos", "complaint", "ambulance", "quiz", or "meal".</p>
              </div>
            )}

            {/* Filtered Feature Items List */}
            {filteredFeatures.map((item) => (
              <button
                key={item.id}
                onClick={() => handleSelectFeature(item)}
                className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-start justify-between gap-3 group cursor-pointer ${
                  item.isEmergency 
                    ? 'bg-red-50 hover:bg-red-100/80 border-red-200' 
                    : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-emerald-400'
                }`}
              >
                <div className="space-y-0.5 min-w-0">
                  <div className="flex items-center space-x-2 flex-wrap">
                    <span className={`px-1.5 py-0.2 rounded-sm text-[9px] font-extrabold uppercase border ${
                      item.isEmergency 
                        ? 'bg-red-600 text-white border-red-700' 
                        : item.category === 'School Info'
                        ? 'bg-indigo-100 text-indigo-900 border-indigo-200'
                        : item.category === 'Health & Hygiene'
                        ? 'bg-emerald-100 text-emerald-900 border-emerald-200'
                        : 'bg-slate-100 text-slate-800 border-slate-200'
                    }`}>
                      {item.category}
                    </span>
                    <span className="font-extrabold text-xs text-slate-900 group-hover:text-emerald-800 transition-colors truncate">
                      {item.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 leading-snug line-clamp-2">
                    {item.description}
                  </p>
                </div>

                <div className="shrink-0 self-center">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors ${
                    item.isEmergency 
                      ? 'bg-red-600 text-white' 
                      : 'bg-slate-100 group-hover:bg-emerald-700 group-hover:text-white text-slate-600'
                  }`}>
                    {item.isEmergency ? <PhoneCall className="w-3.5 h-3.5" /> : <ArrowRight className="w-3.5 h-3.5" />}
                  </div>
                </div>
              </button>
            ))}

          </div>
          
        </div>
      )}
    </div>
  );
};
