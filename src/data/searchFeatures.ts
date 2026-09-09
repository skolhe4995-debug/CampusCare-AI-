export interface SearchableFeature {
  id: string;
  title: string;
  description: string;
  category: 'School Info' | 'Health & Hygiene' | 'Learning & Games' | 'Services & Emergency' | 'Portals';
  tabId?: string;
  isEmergency?: boolean;
  keywords: string[];
}

export const APP_FEATURES: SearchableFeature[] = [
  {
    id: 'school-name',
    title: 'School Name & Principal Information',
    description: 'View school address, principal name, student count, phone, email & established year',
    category: 'School Info',
    tabId: 'schoolProfile',
    keywords: ['school name', 'principal', 'principal name', 'address', 'students', 'student count', 'phone', 'email', 'contact', 'location', 'principal office', 'headmaster']
  },
  {
    id: 'school-photos',
    title: 'School Campus Photos & Facility Gallery',
    description: 'Explore campus grounds, science lab, canteen, sports area & health clinic photos',
    category: 'School Info',
    tabId: 'schoolProfile',
    keywords: ['photos', 'photo', 'gallery', 'pictures', 'images', 'campus', 'facilities', 'lab', 'canteen', 'playground', 'building']
  },
  {
    id: 'school-notifications',
    title: 'School Announcements & Circulars',
    description: 'Official announcements regarding medical camps, monsoon health rules, PTA meets',
    category: 'School Info',
    tabId: 'schoolProfile',
    keywords: ['notifications', 'notification', 'announcements', 'circular', 'notice', 'noticeboard', 'updates', 'news', 'alerts']
  },
  {
    id: 'complaint-cell',
    title: 'Hygiene & Sanitation Complaint Cell',
    description: 'Report dirty washrooms, unsafe drinking water, uncollected garbage or broken facilities',
    category: 'Health & Hygiene',
    tabId: 'complaintCell',
    keywords: ['complaint', 'report', 'dirty washroom', 'water', 'garbage', 'broken', 'toilet', 'sanitation issue', 'leakage', 'cleanliness bug', 'issue']
  },
  {
    id: 'ai-assistant',
    title: 'AI Health & Hygiene Assistant',
    description: 'Ask AI questions about symptoms, first aid, monsoon illness protection & personal hygiene',
    category: 'Health & Hygiene',
    tabId: 'aiAssistant',
    keywords: ['ai', 'ai assistant', 'gemini', 'chat', 'ask question', 'symptoms', 'fever', 'first aid', 'doctor', 'health advice', 'guidance']
  },
  {
    id: 'habit-tracker',
    title: 'Daily Habit & Health Tracker',
    description: 'Track 8 glasses of water, 8 hrs sleep, 30 min exercise & handwashing to earn health points',
    category: 'Health & Hygiene',
    tabId: 'habitTracker',
    keywords: ['habit', 'tracker', 'water', 'sleep', 'exercise', 'handwash', 'points', 'health score', 'badges', 'daily checklist', 'routine']
  },
  {
    id: 'emergency-sos',
    title: 'Emergency Contacts & SOS (Ambulance, Police, Fire)',
    description: '1-click SOS button to connect with Ambulance (102/112), Police (100/112), and Fire Station (101)',
    category: 'Services & Emergency',
    isEmergency: true,
    keywords: ['emergency', 'sos', 'ambulance', 'police', 'fire', 'fire station', 'helpline', 'urgent', '102', '100', '101', '112', 'accident', 'medical emergency']
  },
  {
    id: 'crossword-game',
    title: 'Daily Health & Hygiene Crossword Game',
    description: 'Solve interactive health crosswords that refresh every time. Solve across & down clues to earn +100 bonus Health Points!',
    category: 'Learning & Games',
    tabId: 'quizGames',
    keywords: ['crossword', 'puzzle', 'crossword game', 'game', 'words', 'clues', 'solve', 'health puzzle', 'sanitation game', 'quiz']
  },
  {
    id: 'quiz-games',
    title: 'Hygiene Quiz & Educational Games',
    description: 'Test your sanitation knowledge with hygiene quizzes, spot-the-germ challenge & earn points',
    category: 'Learning & Games',
    tabId: 'quizGames',
    keywords: ['quiz', 'game', 'games', 'play', 'trivia', 'spot the germ', 'test', 'challenge', 'education', 'learn']
  },
  {
    id: 'learning-center',
    title: 'Hygiene Learning & Video Center',
    description: 'Watch step-by-step handwashing videos, disease prevention guides & sanitation tutorials',
    category: 'Learning & Games',
    tabId: 'learningCenter',
    keywords: ['learning', 'videos', 'tutorial', 'handwash steps', 'articles', 'prevention', 'dengue', 'malaria', 'menstrual health', 'education']
  },
  {
    id: 'cleanliness-score',
    title: 'Cleanliness Scores & Leaderboards',
    description: 'View real-time cleanliness audit scores for classrooms, canteens & washroom blocks',
    category: 'Health & Hygiene',
    tabId: 'cleanlinessScore',
    keywords: ['score', 'cleanliness score', 'rating', 'audit', 'leaderboard', 'rank', 'washroom score', 'classroom hygiene']
  },
  {
    id: 'ai-inspector',
    title: 'AI School Sanitation Inspector',
    description: 'Upload sanitation photos for automated AI inspection analysis and safety scoring',
    category: 'Health & Hygiene',
    tabId: 'aiInspector',
    keywords: ['inspector', 'ai inspector', 'sanitation check', 'image analysis', 'audit photo', 'ai scoring']
  },
  {
    id: 'health-calendar',
    title: 'Health Calendar & Medical Camps',
    description: 'View upcoming vaccination schedules, free eye screening camps & health checkup dates',
    category: 'Services & Emergency',
    tabId: 'calendar',
    keywords: ['calendar', 'dates', 'vaccination', 'medical camp', 'eye checkup', 'health camp', 'schedule', 'events']
  },
  {
    id: 'meal-planner',
    title: 'Nutritious Meal Planner & Canteen Menu',
    description: 'Browse weekly balanced diet plans, canteen hygiene standards & healthy food tips',
    category: 'Services & Emergency',
    tabId: 'mealPlanner',
    keywords: ['meal', 'food', 'canteen', 'diet', 'nutrition', 'lunch', 'breakfast', 'menu', 'healthy food']
  },
  {
    id: 'parent-portal',
    title: 'Parent & Health Officer Portal',
    description: 'Parent view for student health progress reports, medical records & attendance logs',
    category: 'Portals',
    tabId: 'parentPortal',
    keywords: ['parent', 'parent portal', 'health record', 'vaccination card', 'student report', 'guardian', 'officer']
  },
  {
    id: 'download-center',
    title: 'Download Center & Hygiene Posters',
    description: 'Download printable hygiene posters, handwashing charts & health handbooks',
    category: 'Services & Emergency',
    tabId: 'downloadCenter',
    keywords: ['download', 'posters', 'pdf', 'handbook', 'chart', 'print', 'materials']
  },
  {
    id: 'feedback-ratings',
    title: 'School Facility Feedback & Ratings',
    description: 'Rate school hygiene facilities and provide constructive feedback to management',
    category: 'Services & Emergency',
    tabId: 'feedbackRatings',
    keywords: ['feedback', 'rating', 'reviews', 'rate school', 'suggestion', 'opinion']
  }
];
