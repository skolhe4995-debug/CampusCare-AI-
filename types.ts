export type Language = 'en' | 'hi' | 'mr';

export type UserRole = 'student' | 'parent' | 'admin';

export type ComplaintCategory = 
  | 'Dirty Classrooms'
  | 'Dirty Toilets'
  | 'Unsafe Drinking Water'
  | 'Broken Furniture'
  | 'Bullying & Conduct'
  | 'Medical Emergency'
  | 'Playground Hazards';

export type ComplaintStatus = 'pending' | 'in_progress' | 'resolved';

export type PriorityLevel = 'low' | 'medium' | 'high' | 'urgent';

export interface ComplaintFeedback {
  rating: number; // 1-5
  speedRating: number;
  staffRating: number;
  comment: string;
  submittedAt: string;
}

export interface Complaint {
  id: string;
  title: string;
  category: ComplaintCategory | string;
  location: string;
  description: string;
  photoUrl?: string;
  status: ComplaintStatus;
  priority: PriorityLevel;
  assignedDept: string;
  estimatedHours: number;
  submittedBy: string;
  submittedAt: string;
  aiAdvice?: string;
  feedback?: ComplaintFeedback;
}

export interface HabitLog {
  date: string;
  brushedTeeth: boolean;
  washedHands: boolean;
  waterGlasses: number; // target 8
  healthyFood: boolean;
  exercised: boolean;
  sleptWell: boolean;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  pointsRequired: number;
  unlocked: boolean;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  category: 'vaccination' | 'checkup' | 'cleanliness' | 'campaign';
  description: string;
  location: string;
}

export interface CleanlinessScore {
  id: string;
  area: string;
  score: number; // 0-100
  trend: 'up' | 'down' | 'stable';
  lastInspected: string;
  notes: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'complaint' | 'health_tip' | 'announcement' | 'event';
}

export interface HealthLesson {
  id: string;
  title: string;
  category: 'hygiene' | 'nutrition' | 'mental_health' | 'fitness' | 'first_aid';
  summary: string;
  content: string[];
  tips: string[];
  icon: string;
  videoUrl?: string;
}

export interface SchoolPhoto {
  id: string;
  title: string;
  url: string;
  category?: string;
}

export interface SchoolNotification {
  id: string;
  title: string;
  content: string;
  date: string;
  category: 'general' | 'health' | 'event' | 'urgent';
  important?: boolean;
}

export interface SchoolInfo {
  name: string;
  address: string;
  principalName: string;
  studentCount: number;
  phone: string;
  email: string;
  establishedYear: string;
  photos: SchoolPhoto[];
  notifications: SchoolNotification[];
}

export interface MealPlanDay {
  day: string;
  breakfast: string;
  lunch: string;
  snack: string;
  hydrationTip: string;
}
