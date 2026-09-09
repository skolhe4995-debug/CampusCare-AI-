import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Bell, 
  Globe, 
  UserCheck, 
  Sparkles, 
  PhoneCall, 
  CheckCheck,
  Menu,
  X
} from 'lucide-react';
import { Language, UserRole, NotificationItem, SchoolInfo } from '../types';
import { translations } from '../lib/translations';
import { AppSearchBar } from './AppSearchBar';

interface HeaderProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: NotificationItem[];
  setNotifications: React.Dispatch<React.SetStateAction<NotificationItem[]>>;
  onOpenEmergency: () => void;
  userPoints: number;
  schoolInfo?: SchoolInfo;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  setLanguage,
  userRole,
  setUserRole,
  activeTab,
  setActiveTab,
  notifications,
  setNotifications,
  onOpenEmergency,
  userPoints,
  schoolInfo,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const t = translations[language];

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const navItems = [
    { id: 'home', label: t.home },
    { id: 'schoolProfile', label: t.schoolProfile || "School Info" },
    { id: 'complaintCell', label: t.complaintCell },
    { id: 'aiAssistant', label: t.aiAssistant },
    { id: 'habitTracker', label: t.habitTracker },
    { id: 'quizGames', label: t.quizGames },
    { id: 'learningCenter', label: t.learningCenter },
    { id: 'dashboard', label: t.dashboard },
    { id: 'cleanlinessScore', label: t.cleanlinessScore },
    { id: 'aiInspector', label: "AI Inspector" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-300/80 shadow-2xs">
      {/* Top Banner Alert Bar */}
      <div className="bg-slate-900 text-slate-100 px-3 sm:px-6 py-1 text-xs font-medium flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-2 truncate">
          <span className="bg-emerald-600 text-white px-2 py-0.5 rounded-sm text-[10px] tracking-wider font-bold uppercase">Campus Notice</span>
          <span className="truncate text-slate-200 text-[11px]">Monsoon Hygiene Drive Active! Check vaccination & health checkup dates in calendar.</span>
        </div>
        <div className="flex items-center space-x-3 shrink-0 ml-2">
          <button 
            onClick={onOpenEmergency}
            className="flex items-center space-x-1 bg-red-600 hover:bg-red-700 text-white px-2.5 py-0.5 rounded-md font-bold text-[11px] transition-colors shadow-2xs cursor-pointer"
          >
            <PhoneCall className="w-3 h-3" />
            <span>Emergency SOS</span>
          </button>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-5 lg:px-6">
        <div className="flex items-center justify-between h-14">
          
          {/* Logo & Branding */}
          <div className="flex items-center space-x-2.5 cursor-pointer shrink-0" onClick={() => setActiveTab('home')}>
            <div className="w-9 h-9 rounded-lg bg-emerald-700 flex items-center justify-center text-white shadow-2xs">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-lg font-extrabold text-slate-900 tracking-tight">{t.appName}</span>
                <span className="bg-slate-100 border border-slate-300 text-slate-700 text-[10px] font-bold px-1.5 py-0.5 rounded-md">v2.5</span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden xl:block leading-tight">{t.appTagline}</p>
            </div>
          </div>

          {/* Top Search Bar (Desktop & Tablet) */}
          <div className="hidden md:block flex-1 max-w-xs lg:max-w-sm mx-3">
            <AppSearchBar 
              setActiveTab={setActiveTab} 
              onOpenEmergency={onOpenEmergency} 
              schoolInfo={schoolInfo} 
            />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {navItems.slice(0, 7).map(item => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                  activeTab === item.id
                    ? 'bg-emerald-700 text-white shadow-2xs font-bold'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Controls: Points, Language, Role, Notifications */}
          <div className="flex items-center space-x-2">
            
            {/* Points Badge */}
            <div 
              onClick={() => setActiveTab('habitTracker')}
              className="hidden sm:flex items-center space-x-1 bg-amber-50 border border-amber-300 text-amber-900 px-2 py-0.5 rounded-md text-xs font-bold cursor-pointer hover:bg-amber-100 transition-colors"
              title="Health Points Earned"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600 fill-amber-500" />
              <span>{userPoints} pts</span>
            </div>

            {/* Language Switcher */}
            <div className="relative flex items-center bg-slate-50 px-1 py-0.5 rounded-md border border-slate-300 text-xs">
              <Globe className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent text-xs font-medium text-slate-800 pr-1 py-0.5 outline-hidden cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी (Hindi)</option>
                <option value="mr">मराठी (Marathi)</option>
              </select>
            </div>

            {/* Role Switcher */}
            <div className="hidden md:flex items-center bg-slate-50 px-1 py-0.5 rounded-md border border-slate-300 text-xs font-medium">
              <UserCheck className="w-3.5 h-3.5 text-slate-500 ml-1 mr-1" />
              <select
                value={userRole}
                onChange={(e) => {
                  const role = e.target.value as UserRole;
                  setUserRole(role);
                  if (role === 'admin') setActiveTab('adminDashboard');
                  else if (role === 'parent') setActiveTab('parentPortal');
                }}
                className="bg-transparent text-xs font-medium text-slate-800 pr-1 py-0.5 outline-hidden cursor-pointer"
              >
                <option value="student">{t.studentRole}</option>
                <option value="parent">{t.parentRole}</option>
                <option value="admin">{t.adminRole}</option>
              </select>
            </div>

            {/* Notifications Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-black rounded-full flex items-center justify-center animate-bounce">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-200 p-4 z-50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                    <h4 className="font-bold text-sm text-slate-900">Notifications</h4>
                    {unreadCount > 0 && (
                      <button
                        onClick={markAllRead}
                        className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold flex items-center space-x-1"
                      >
                        <CheckCheck className="w-3.5 h-3.5" />
                        <span>Mark all read</span>
                      </button>
                    )}
                  </div>

                  <div className="mt-3 space-y-2.5 max-h-72 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <p className="text-xs text-slate-400 text-center py-4">No notifications yet</p>
                    ) : (
                      notifications.map(n => (
                        <div
                          key={n.id}
                          className={`p-2.5 rounded-xl text-xs transition-colors border ${
                            !n.read 
                              ? 'bg-emerald-50/60 border-emerald-100 font-medium' 
                              : 'bg-slate-50 border-slate-100 text-slate-600'
                          }`}
                        >
                          <div className="flex items-center justify-between font-bold text-slate-900 mb-1">
                            <span>{n.title}</span>
                            <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                          </div>
                          <p className="text-slate-600 text-[11px] leading-relaxed">{n.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Search Bar Strip */}
      <div className="md:hidden px-3 py-1.5 bg-slate-50 border-t border-slate-200">
        <AppSearchBar 
          setActiveTab={setActiveTab} 
          onOpenEmergency={onOpenEmergency} 
          schoolInfo={schoolInfo} 
          placeholder="Search features (principal, photos, complaints, SOS)..."
        />
      </div>

      {/* Secondary Sub-Bar for remaining links on desktop */}
      <div className="hidden lg:block bg-slate-50/80 border-t border-slate-200/60 py-1.5 px-4 text-xs font-semibold">
        <div className="max-w-7xl mx-auto flex items-center space-x-4 overflow-x-auto text-slate-600">
          <button 
            onClick={() => setActiveTab('quizGames')} 
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
              activeTab === 'quizGames' ? 'bg-amber-600 text-white font-bold' : 'hover:bg-amber-100 text-amber-900 font-bold bg-amber-50 border border-amber-200/80'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>🧩 {t.crosswordGame || "Hygiene Crossword"}</span>
          </button>
          <button 
            onClick={() => setActiveTab('schoolProfile')} 
            className={`flex items-center space-x-1 px-2 py-0.5 rounded-md cursor-pointer transition-colors ${
              activeTab === 'schoolProfile' ? 'bg-emerald-700 text-white font-bold' : 'hover:bg-slate-200 text-slate-700 font-bold'
            }`}
          >
            <span>{t.schoolProfile || "School Profile"}</span>
          </button>
          <button 
            onClick={() => setActiveTab('aiInspector')} 
            className={`flex items-center space-x-1.5 px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
              activeTab === 'aiInspector' ? 'bg-indigo-600 text-white' : 'hover:bg-slate-200 text-slate-700 font-bold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI School Inspector</span>
          </button>
          <button onClick={() => setActiveTab('calendar')} className={activeTab === 'calendar' ? 'text-emerald-700 font-bold' : 'hover:text-slate-900'}>
            {t.calendar}
          </button>
          <button onClick={() => setActiveTab('mealPlanner')} className={activeTab === 'mealPlanner' ? 'text-emerald-700 font-bold' : 'hover:text-slate-900'}>
            {t.mealPlanner}
          </button>
          <button onClick={() => setActiveTab('downloadCenter')} className={activeTab === 'downloadCenter' ? 'text-emerald-700 font-bold' : 'hover:text-slate-900'}>
            {t.downloadCenter}
          </button>
          <button onClick={() => setActiveTab('parentPortal')} className={activeTab === 'parentPortal' ? 'text-emerald-700 font-bold' : 'hover:text-slate-900'}>
            {t.parentPortal}
          </button>
          <button onClick={() => setActiveTab('adminDashboard')} className={activeTab === 'adminDashboard' ? 'text-emerald-700 font-bold' : 'hover:text-slate-900'}>
            {t.adminDashboard}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 py-3 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-100">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`p-2 rounded-lg text-left text-xs font-semibold ${
                  activeTab === item.id ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-semibold text-slate-600">Switch View:</span>
            <select
              value={userRole}
              onChange={(e) => {
                const role = e.target.value as UserRole;
                setUserRole(role);
                if (role === 'admin') setActiveTab('adminDashboard');
                else if (role === 'parent') setActiveTab('parentPortal');
                setMobileMenuOpen(false);
              }}
              className="bg-slate-100 text-xs font-bold text-slate-800 p-1.5 rounded-lg border border-slate-200"
            >
              <option value="student">{t.studentRole}</option>
              <option value="parent">{t.parentRole}</option>
              <option value="admin">{t.adminRole}</option>
            </select>
          </div>
        </div>
      )}
    </header>
  );
};
