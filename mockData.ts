import { 
  Complaint, 
  CleanlinessScore, 
  HealthLesson, 
  QuizQuestion, 
  CalendarEvent, 
  Badge, 
  NotificationItem,
  MealPlanDay,
  SchoolInfo
} from '../types';

export const HEALTH_QUOTES = [
  { quote: "Cleanliness is the foundation of good health and bright minds.", author: "CampusCare Wisdom" },
  { quote: "Washing your hands for 20 seconds saves countless sick days!", author: "School Health Association" },
  { quote: "A healthy mind lives in a clean and active body.", author: "Student Wellness Board" },
  { quote: "Small daily habits lead to lifelong health and happiness.", author: "CampusCare Nurse" },
];

export const INITIAL_COMPLAINTS: Complaint[] = [
  {
    id: "CC-101",
    title: "Leaking Water Cooler Filter",
    category: "Unsafe Drinking Water",
    location: "Main Building, 2nd Floor Corridor",
    description: "Water filter unit #2 is leaking on the floor and taste is slightly unusual. Puddle creating a slip hazard.",
    status: "in_progress",
    priority: "high",
    assignedDept: "Sanitation & Plumbing",
    estimatedHours: 4,
    submittedBy: "Rahul Sharma (Class 8A)",
    submittedAt: "2026-08-03 09:30 AM",
    aiAdvice: "Do not drink from water filter #2 until serviced. Use the Ground Floor purified dispenser instead. Wipe floor water to prevent slipping.",
  },
  {
    id: "CC-102",
    title: "Unclean Restroom Mirror & Wet Floor",
    category: "Dirty Toilets",
    location: "Boys Washroom, West Wing",
    description: "Soap dispensers empty and water accumulation near wash basins.",
    status: "pending",
    priority: "medium",
    assignedDept: "Facilities & Sanitation",
    estimatedHours: 2,
    submittedBy: "Ananya Patel (Class 9B)",
    submittedAt: "2026-08-03 11:15 AM",
    aiAdvice: "Maintain caution on wet floor. Request janitorial team for immediate soap refill and mopping.",
  },
  {
    id: "CC-103",
    title: "Broken Bench with Sharp Metal Edge",
    category: "Playground Hazards",
    location: "Basketball Court Bleachers",
    description: "Corner bench iron frame is bent with sharp exposed metal edge.",
    status: "resolved",
    priority: "urgent",
    assignedDept: "Infrastructure & Repair",
    estimatedHours: 1,
    submittedBy: "Aditya Verma (Class 10C)",
    submittedAt: "2026-08-02 02:20 PM",
    aiAdvice: "Block access to the bleacher immediately. Alert physical education instructor.",
    feedback: {
      rating: 5,
      speedRating: 5,
      staffRating: 5,
      comment: "Fixed within 45 minutes! Metal edge taped and welded securely. Excellent work!",
      submittedAt: "2026-08-02 04:00 PM",
    },
  },
  {
    id: "CC-104",
    title: "Flickering Light & Loose Wire in Class 6A",
    category: "Broken Furniture",
    location: "Classroom 6A",
    description: "Ceiling tube light fixture is flickering continuously and switch box cover is loose.",
    status: "resolved",
    priority: "medium",
    assignedDept: "Electrical Maintenance",
    estimatedHours: 6,
    submittedBy: "Priya Kulkarni (Class 6A)",
    submittedAt: "2026-08-01 10:00 AM",
    aiAdvice: "Do not touch switch box. Teacher informed to switch off main circuit if buzzing occurs.",
    feedback: {
      rating: 4,
      speedRating: 4,
      staffRating: 5,
      comment: "Tube light replaced and switch board secured.",
      submittedAt: "2026-08-01 03:30 PM",
    },
  }
];

export const INITIAL_CLEANLINESS_SCORES: CleanlinessScore[] = [
  { id: "1", area: "Classrooms & Corridors", score: 92, trend: "up", lastInspected: "Today, 08:00 AM", notes: "All desks sanitized, trash bins emptied twice daily." },
  { id: "2", area: "Washrooms & Restrooms", score: 76, trend: "down", lastInspected: "Today, 10:30 AM", notes: "Requires frequent soap refilling during lunch break." },
  { id: "3", area: "Playground & Sports Field", score: 88, trend: "stable", lastInspected: "Yesterday", notes: "Grass trimmed, drainage clear of debris." },
  { id: "4", area: "School Canteen & Kitchen", score: 95, trend: "up", lastInspected: "Today, 07:30 AM", notes: "100% compliance on food handler gloves & hairnets." },
  { id: "5", area: "Drinking Water Stations", score: 81, trend: "down", lastInspected: "Today, 09:00 AM", notes: "UV Filter check scheduled for 2 units." },
  { id: "6", area: "Science Labs & Library", score: 94, trend: "stable", lastInspected: "Yesterday", notes: "Chemical storage verified, excellent ventilation." },
];

export const HEALTH_LESSONS: HealthLesson[] = [
  {
    id: "l1",
    title: "Mastering Personal Hygiene: The 20-Second Rule",
    category: "hygiene",
    summary: "Learn proper handwashing steps, nail cleanliness, and daily hygiene rituals to protect yourself from germs.",
    content: [
      "Germs spread rapidly through hand contact with eyes, nose, and mouth.",
      "Proper handwashing requires soap, clean running water, and 20 seconds of thorough scrubbing.",
      "Don't forget the backs of your hands, between fingers, and under your fingernails!"
    ],
    tips: [
      "Sing 'Happy Birthday' twice while scrubbing your hands.",
      "Use clean personal handkerchiefs instead of sharing towels.",
      "Keep fingernails trimmed neatly to avoid bacterial buildup."
    ],
    icon: "ShowerHead",
  },
  {
    id: "l2",
    title: "Fueling Your Brain: Rainbow Nutrition on Your Plate",
    category: "nutrition",
    summary: "How colorful fruits, vegetables, proteins, and whole grains keep your brain energized for learning.",
    content: [
      "Your brain consumes 20% of your daily energy. High quality nutrients keep you sharp.",
      "Include at least 3 different natural colors in your lunch box every single day.",
      "Hydrate continuously — mild dehydration drops concentration by up to 15%."
    ],
    tips: [
      "Pack crunchy vegetables like cucumber & carrot sticks.",
      "Swap sugary soft drinks for fresh buttermilk, lemon water, or coconut water.",
      "Eat a protein-rich breakfast before morning exams."
    ],
    icon: "Apple",
  },
  {
    id: "l3",
    title: "Mental Wellness & Exam Stress Busters",
    category: "mental_health",
    summary: "Simple breathing exercises, positive self-talk, and knowing when to ask a teacher or counselor for support.",
    content: [
      "Feeling anxious before a test or speech is completely normal.",
      "Deep abdominal breathing resets your nervous system in less than two minutes.",
      "Sharing your worries with a trusted teacher or school counselor eases emotional pressure."
    ],
    tips: [
      "Try the 4-7-8 breathing technique when feeling overwhelmed.",
      "Take 5-minute study breaks every 25 minutes (Pomodoro technique).",
      "Get 8 to 9 hours of restorative sleep before big school events."
    ],
    icon: "Brain",
  },
  {
    id: "l4",
    title: "First-Aid Basics for Common School Injuries",
    category: "first_aid",
    summary: "What to do immediately when someone gets a minor cut, nosebleed, or ankle sprain before the nurse arrives.",
    content: [
      "For minor scrapes: Clean with gentle water, apply pressure with a clean cloth, and inform teacher.",
      "For nosebleeds: Lean slightly FORWARD (never backward), pinch soft part of nose for 5-10 mins.",
      "For heat exhaustion: Move to a shaded cool area, loosen collar, sip water slowly."
    ],
    tips: [
      "Never run with sharp scissors or pencils.",
      "Know where the school first-aid kits are located on each floor.",
      "Call the school nurse immediately if an injury involves severe bleeding or head impact."
    ],
    icon: "Cross",
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: "q1",
    question: "How long should you scrub your hands with soap to effectively kill germs?",
    options: ["5 seconds", "10 seconds", "At least 20 seconds", "1 minute"],
    correctIndex: 2,
    explanation: "Scrubbing for at least 20 seconds allows soap molecules to break down viral & bacterial cell walls effectively."
  },
  {
    id: "q2",
    question: "What is the correct posture when dealing with a nosebleed?",
    options: ["Tilt your head backward", "Lean forward slightly and pinch nose", "Lie down flat on your back", "Blow your nose hard"],
    correctIndex: 1,
    explanation: "Leaning forward prevents blood from swallowing or entering the airway, while pinching compresses nasal blood vessels."
  },
  {
    id: "q3",
    question: "Which of the following is the healthiest choice for school hydration?",
    options: ["Caffeinated energy drink", "Plain clean water or buttermilk", "Carbonated soda", "Sweetened artificial juice"],
    correctIndex: 1,
    explanation: "Water and plain buttermilk hydrate without causing blood sugar spikes or energy crashes."
  },
  {
    id: "q4",
    question: "What should you do if you notice a wet slip hazard near the classroom stairs?",
    options: ["Ignore it", "Report it on CampusCare Smart Complaint Cell & inform nearby teacher", "Step over it fast", "Wait for someone to fall"],
    correctIndex: 1,
    explanation: "Promptly reporting hazards prevents painful slip injuries and helps custodians clean it quickly!"
  },
  {
    id: "q5",
    question: "How many hours of sleep are recommended for school-aged students every night?",
    options: ["4 to 5 hours", "6 hours", "8 to 10 hours", "12 hours"],
    correctIndex: 2,
    explanation: "8 to 10 hours of quality sleep enhances memory consolidation, mood regulation, and immune strength."
  }
];

export const CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: "e1",
    title: "Annual School Health & Vision Checkup Drive",
    date: "2026-08-10",
    time: "09:00 AM - 02:00 PM",
    category: "checkup",
    description: "Doctor team visiting campus for dental, vision, and general health screening for all grades.",
    location: "Auditorium & Medical Room",
  },
  {
    id: "e2",
    title: "Campus Cleanliness & Recycling Drive",
    date: "2026-08-15",
    time: "10:30 AM - 12:30 PM",
    category: "cleanliness",
    description: "Student green council organizing campus audit, tree planting, and waste segregation contest.",
    location: "School Garden & Playground",
  },
  {
    id: "e3",
    title: "Monsoon Dengue & Malaria Prevention Campaign",
    date: "2026-08-20",
    time: "11:00 AM",
    category: "campaign",
    description: "Interactive session on mosquito breeding prevention, full-sleeve uniform guidelines, and repellent usage.",
    location: "Main Assembly Hall",
  },
  {
    id: "e4",
    title: "Deworming & Tetanus Booster Vaccination Camp",
    date: "2026-08-28",
    time: "09:30 AM",
    category: "vaccination",
    description: "Government health officer-guided voluntary vaccination & health supplement distribution.",
    location: "School Health Clinic",
  }
];

export const INITIAL_BADGES: Badge[] = [
  { id: "b1", name: "Hygiene Hero", desc: "Log handwashing & brushing for 7 consecutive days", icon: "Sparkles", pointsRequired: 100, unlocked: true },
  { id: "b2", name: "Hydration Master", desc: "Reach 8 glasses of water daily goal 5 times", icon: "Droplets", pointsRequired: 150, unlocked: true },
  { id: "b3", name: "Clean Campus Champ", desc: "Report 1 genuine campus hazard or complaint", icon: "ShieldCheck", pointsRequired: 200, unlocked: true },
  { id: "b4", name: "Quiz Whiz", desc: "Score 100% on the CampusCare Health Quiz", icon: "Award", pointsRequired: 250, unlocked: false },
  { id: "b5", name: "Wellness Ambassador", desc: "Accumulate 500 total CampusCare Health Points", icon: "Crown", pointsRequired: 500, unlocked: false },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "n1",
    title: "Complaint Status Updated!",
    message: "Complaint #CC-101 (Leaking Water Cooler Filter) is now In Progress by Sanitation Dept.",
    time: "10 mins ago",
    read: false,
    type: "complaint"
  },
  {
    id: "n2",
    title: "Monsoon Hygiene Alert",
    message: "Remember to wash hands before eating and avoid eating uncovered street food during rainy weather.",
    time: "2 hours ago",
    read: false,
    type: "health_tip"
  },
  {
    id: "n3",
    title: "Health Checkup Drive Reminder",
    message: "Annual School Health & Vision screening is scheduled for Aug 10. Bring your health card!",
    time: "1 day ago",
    read: true,
    type: "event"
  }
];

export const MEAL_PLAN_WEEK: MealPlanDay[] = [
  {
    day: "Monday",
    breakfast: "Whole wheat vegetable paratha + Curd + Handful of almonds",
    lunch: "Dal tadka + Brown rice + Spinach sabzi + Cucumber salad",
    snack: "Roasted chana (chickpeas) + Fresh orange slice",
    hydrationTip: "Carry a 1-liter water bottle; sip 2 glasses during morning break."
  },
  {
    day: "Tuesday",
    breakfast: "Vegetable poha with peanuts & lemon + Boiled egg / sprouts",
    lunch: "Roti (2) + Paneer bhurji / Rajma + Mixed salad + Buttermilk",
    snack: "Apple slices with peanut butter / roasted makhana",
    hydrationTip: "Add a mint leaf or cucumber slice to your water for fresh taste."
  },
  {
    day: "Wednesday",
    breakfast: "Oats porridge with banana & chia seeds",
    lunch: "Vegetable khichdi + Kadhi + Beetroot salad + Papad",
    snack: "Handful of walnuts, raisins, and pumpkin seeds",
    hydrationTip: "Drink a full glass of water 20 minutes before lunch."
  },
  {
    day: "Thursday",
    breakfast: "Idli / Dosa with coconut chutney & vegetable sambar",
    lunch: "Roti (2) + Chana masala + Steamed broccoli / cauliflower sabzi",
    snack: "Guava or watermelon bowl with mint",
    hydrationTip: "Rehydrate right after physical education (PE) class."
  },
  {
    day: "Friday",
    breakfast: "Multigrain vegetable sandwich with mint chutney + Milk",
    lunch: "Lemon rice / Pulav + Sprouted moong curry + Tomato slices",
    snack: "Homemade fruit smoothie or coconut water",
    hydrationTip: "Complete at least 6 glasses before going home from school."
  }
];

export const DOWNLOAD_ITEMS = [
  {
    id: "d1",
    title: "Hand Hygiene Step-by-Step Poster",
    format: "PDF (Printable A3/A4)",
    category: "Poster",
    desc: "Colorful infographic showing 6 proper handwashing steps for classrooms & washrooms.",
    fileSize: "1.2 MB",
  },
  {
    id: "d2",
    title: "Daily Classroom Cleanliness Checklist",
    format: "PDF (Printable Sheet)",
    category: "Checklist",
    desc: "Daily morning inspector checklist for class monitors & facility staff.",
    fileSize: "850 KB",
  },
  {
    id: "d3",
    title: "First-Aid Emergency Action Guide",
    format: "PDF (Color Chart)",
    category: "Guide",
    desc: "Quick emergency response procedures for minor burns, cuts, nosebleeds, and fainting.",
    fileSize: "2.1 MB",
  },
  {
    id: "d4",
    title: "Healthy Lunchbox & Nutrition Brochure",
    format: "PDF (Flyer)",
    category: "Brochure",
    desc: "Parent guide for balanced meals, immunity boosters, and hydration tips.",
    fileSize: "1.5 MB",
  }
];

export const INITIAL_SCHOOL_INFO: SchoolInfo = {
  name: "St. Xavier's Model High School",
  address: "42 Knowledge Park Road, Model Town, Sector 14, Mumbai, Maharashtra 400001",
  principalName: "Dr. Sunita Deshmukh, M.Ed., Ph.D.",
  studentCount: 1450,
  phone: "+91 22 2847 9000",
  email: "info@stxaviersmodel.edu.in",
  establishedYear: "1988",
  photos: [
    {
      id: "p1",
      title: "Main Campus & Assembly Square",
      url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80",
      category: "Campus Grounds"
    },
    {
      id: "p2",
      title: "Modern Science & Computer Lab",
      url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=80",
      category: "Academic Facilities"
    },
    {
      id: "p3",
      title: "Hygienic Clean Dining & Canteen Area",
      url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80",
      category: "Nutrition & Food"
    },
    {
      id: "p4",
      title: "Sports Playground & Athletics Track",
      url: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80",
      category: "Sports & Fitness"
    }
  ],
  notifications: [
    {
      id: "sn1",
      title: "Annual Health & Eye Screening Camp",
      content: "All students from Grade 1 to 10 are invited for free medical, eye, and dental checkup in the school auditorium on August 10th.",
      date: "2026-08-03",
      category: "health",
      important: true
    },
    {
      id: "sn2",
      title: "Monsoon Hygiene & Water Safety Guidelines",
      content: "Parents and students are advised to carry personal water bottles and wear full-sleeve uniforms to protect against mosquito-borne illness.",
      date: "2026-08-01",
      category: "urgent",
      important: true
    },
    {
      id: "sn3",
      title: "Parent-Teacher Association Meeting",
      content: "Quarterly PTA meet scheduled for August 18th to discuss campus hygiene ratings and student wellness progress.",
      date: "2026-07-28",
      category: "event",
      important: false
    }
  ]
};
