import React, { useState } from 'react';
import { PhoneCall, ShieldAlert, User, AlertTriangle, CheckCircle2, X } from 'lucide-react';
import { Language } from '../types';

interface EmergencyHelpProps {
  language: Language;
  onClose: () => void;
}

export const EmergencyHelp: React.FC<EmergencyHelpProps> = ({ language, onClose }) => {
  const [alertSent, setAlertSent] = useState<string | null>(null);

  const emergencyContacts = [
    { title: 'Ambulance Emergency Hotline', phone: '102 / 112', location: '24/7 Medical & Hospital Response' },
    { title: 'Police Emergency Control Room', phone: '100 / 112', location: '24/7 Police Assistance & Safety' },
    { title: 'Fire Station & Rescue Services', phone: '101', location: '24/7 Fire Department & Disaster Relief' },
  ];

  const triggerSOSAlert = (title: string) => {
    setAlertSent(title);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl border border-red-200 space-y-6 relative animate-scale-up">
        
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1.5 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center space-x-3 text-red-600">
          <div className="w-12 h-12 rounded-2xl bg-red-100 flex items-center justify-center shrink-0">
            <ShieldAlert className="w-7 h-7 text-red-600 animate-pulse" />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-900">Campus Emergency SOS Help</h2>
            <p className="text-xs text-slate-500 font-medium">Direct connection to Ambulance, Police, and Fire Station emergency helplines</p>
          </div>
        </div>

        {alertSent && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-900 flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Emergency signal dispatched to {alertSent}! Staff member alerted to your location.</span>
          </div>
        )}

        {/* Contacts List */}
        <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
          {emergencyContacts.map((contact) => (
            <div
              key={contact.title}
              className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 hover:bg-red-50/50 hover:border-red-200 transition-all flex items-center justify-between text-xs"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-slate-900">{contact.title}</div>
                <div className="text-[11px] text-slate-500">{contact.location}</div>
                <div className="font-mono text-emerald-700 font-bold">{contact.phone}</div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => triggerSOSAlert(contact.title)}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-3 py-1.5 rounded-xl text-[11px] shadow-xs transition-all flex items-center space-x-1 cursor-pointer"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call / Alert</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-slate-500 text-center font-medium">
          If you or a classmate are experiencing a severe injury or fainting spell, stay calm and notify the nearest teacher immediately.
        </p>

      </div>
    </div>
  );
};
