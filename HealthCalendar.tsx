import React, { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Bell, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CalendarEvent, Language } from '../types';
import { CALENDAR_EVENTS } from '../data/mockData';
import { translations } from '../lib/translations';

interface HealthCalendarProps {
  language: Language;
}

export const HealthCalendar: React.FC<HealthCalendarProps> = ({ language }) => {
  const t = translations[language];
  const [reminders, setReminders] = useState<Record<string, boolean>>({});

  const toggleReminder = (id: string) => {
    setReminders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-purple-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-md">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center space-x-2 bg-purple-500/20 px-3 py-1 rounded-full text-purple-200 text-xs font-bold border border-purple-400/30">
            <CalendarIcon className="w-4 h-4 text-purple-300" />
            <span>Campus Health Events & Medical Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">{t.calendar}</h1>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed">
            Never miss annual vision screening, vaccination camps, cleanliness drives, or dengue awareness campaigns.
          </p>
        </div>
      </div>

      {/* Events List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {CALENDAR_EVENTS.map((event) => {
          const isSet = reminders[event.id];
          return (
            <div
              key={event.id}
              className="bg-white p-6 rounded-3xl border border-slate-200 shadow-xs space-y-4 hover:border-slate-300 transition-all flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    event.category === 'vaccination' ? 'bg-red-100 text-red-800' :
                    event.category === 'checkup' ? 'bg-emerald-100 text-emerald-800' :
                    event.category === 'cleanliness' ? 'bg-teal-100 text-teal-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {event.category}
                  </span>

                  <button
                    onClick={() => toggleReminder(event.id)}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-colors flex items-center space-x-1 cursor-pointer ${
                      isSet
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    <Bell className="w-3.5 h-3.5" />
                    <span>{isSet ? 'Reminder Set ✓' : 'Set Reminder'}</span>
                  </button>
                </div>

                <h3 className="text-base font-black text-slate-900 leading-snug">{event.title}</h3>

                <div className="space-y-1 text-xs text-slate-600 font-medium">
                  <div className="flex items-center space-x-1.5">
                    <CalendarIcon className="w-4 h-4 text-emerald-600" />
                    <span>{event.date} • {event.time}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span>{event.location}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed font-normal bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-2">
                  {event.description}
                </p>
              </div>

              <div className="pt-2 text-[10px] text-slate-400 border-t border-slate-100 flex items-center justify-between">
                <span>Verified School Health Event</span>
                {isSet && <span className="text-emerald-600 font-bold">Push notification enabled</span>}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
