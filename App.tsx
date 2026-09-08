import React, { useState } from 'react';
import { Language, UserRole, Complaint, CleanlinessScore, NotificationItem, SchoolInfo } from './types';
import { 
  INITIAL_COMPLAINTS, 
  INITIAL_CLEANLINESS_SCORES, 
  INITIAL_NOTIFICATIONS,
  INITIAL_SCHOOL_INFO
} from './data/mockData';

import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import { LearningCenter } from './components/LearningCenter';
import { AIAssistant } from './components/AIAssistant';
import { ComplaintCell } from './components/ComplaintCell';
import { HealthDashboard } from './components/HealthDashboard';
import { HabitTracker } from './components/HabitTracker';
import { QuizGames } from './components/QuizGames';
import { HealthCalendar } from './components/HealthCalendar';
import { MealPlanner } from './components/MealPlanner';
import { EmergencyHelp } from './components/EmergencyHelp';
import { FeedbackRatings } from './components/FeedbackRatings';
import { DownloadCenter } from './components/DownloadCenter';
import { CleanlinessScores } from './components/CleanlinessScores';
import { AIInspectorDashboard } from './components/AIInspectorDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ParentPortal } from './components/ParentPortal';
import { SchoolProfile } from './components/SchoolProfile';
import { Footer } from './components/Footer';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [activeTab, setActiveTab] = useState<string>('home');

  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [cleanlinessScores, setCleanlinessScores] = useState<CleanlinessScore[]>(INITIAL_CLEANLINESS_SCORES);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo>(INITIAL_SCHOOL_INFO);

  const [userPoints, setUserPoints] = useState<number>(180);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);

  const handleAddPoints = (pts: number) => {
    setUserPoints((prev) => prev + pts);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/70 text-slate-900 font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* Header */}
      <Header
        language={language}
        setLanguage={setLanguage}
        userRole={userRole}
        setUserRole={setUserRole}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        notifications={notifications}
        setNotifications={setNotifications}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
        userPoints={userPoints}
        schoolInfo={schoolInfo}
      />

      {/* Main View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-3 sm:px-5 lg:px-6 py-4">
        {activeTab === 'home' && (
          <HomePage
            language={language}
            setActiveTab={setActiveTab}
            complaints={complaints}
            cleanlinessScores={cleanlinessScores}
            onOpenEmergency={() => setEmergencyModalOpen(true)}
            userPoints={userPoints}
            schoolInfo={schoolInfo}
          />
        )}

        {activeTab === 'schoolProfile' && (
          <SchoolProfile
            language={language}
            schoolInfo={schoolInfo}
            setSchoolInfo={setSchoolInfo}
          />
        )}

        {activeTab === 'learningCenter' && (
          <LearningCenter language={language} />
        )}

        {activeTab === 'aiAssistant' && (
          <AIAssistant
            language={language}
            onOpenEmergency={() => setEmergencyModalOpen(true)}
          />
        )}

        {activeTab === 'complaintCell' && (
          <ComplaintCell
            language={language}
            complaints={complaints}
            setComplaints={setComplaints}
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'dashboard' && (
          <HealthDashboard
            language={language}
            complaints={complaints}
            cleanlinessScores={cleanlinessScores}
          />
        )}

        {activeTab === 'habitTracker' && (
          <HabitTracker
            language={language}
            userPoints={userPoints}
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'quizGames' && (
          <QuizGames
            language={language}
            onAddPoints={handleAddPoints}
          />
        )}

        {activeTab === 'calendar' && (
          <HealthCalendar language={language} />
        )}

        {activeTab === 'mealPlanner' && (
          <MealPlanner language={language} />
        )}

        {activeTab === 'feedback' && (
          <FeedbackRatings
            language={language}
            complaints={complaints}
            setComplaints={setComplaints}
          />
        )}

        {activeTab === 'downloadCenter' && (
          <DownloadCenter language={language} />
        )}

        {activeTab === 'cleanlinessScore' && (
          <CleanlinessScores
            language={language}
            cleanlinessScores={cleanlinessScores}
          />
        )}

        {activeTab === 'aiInspector' && (
          <AIInspectorDashboard
            language={language}
            complaints={complaints}
            cleanlinessScores={cleanlinessScores}
          />
        )}

        {activeTab === 'adminDashboard' && (
          <AdminDashboard
            language={language}
            complaints={complaints}
            setComplaints={setComplaints}
            cleanlinessScores={cleanlinessScores}
            setCleanlinessScores={setCleanlinessScores}
          />
        )}

        {activeTab === 'parentPortal' && (
          <ParentPortal
            language={language}
            complaints={complaints}
            userPoints={userPoints}
          />
        )}
      </main>

      {/* Emergency Help Modal */}
      {emergencyModalOpen && (
        <EmergencyHelp
          language={language}
          onClose={() => setEmergencyModalOpen(false)}
        />
      )}

      {/* Footer */}
      <Footer
        language={language}
        setActiveTab={setActiveTab}
        onOpenEmergency={() => setEmergencyModalOpen(true)}
      />

    </div>
  );
}
