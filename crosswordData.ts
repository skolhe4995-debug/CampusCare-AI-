export interface CrosswordClue {
  number: number;
  direction: 'across' | 'down';
  clue: string;
  answer: string;
  row: number; // 0-indexed starting row
  col: number; // 0-indexed starting col
}

export interface CrosswordPuzzle {
  id: string;
  title: string;
  category: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  gridSize: { rows: number; cols: number };
  clues: CrosswordClue[];
  themeColor: string;
}

export const CROSSWORD_PUZZLES: CrosswordPuzzle[] = [
  {
    id: 'puzzle-1',
    title: 'Hygiene & Cleanliness Essentials',
    category: 'Daily Health',
    difficulty: 'Easy',
    gridSize: { rows: 8, cols: 8 },
    themeColor: 'emerald',
    clues: [
      {
        number: 1,
        direction: 'across',
        clue: 'Used with water to clean hands and kill bacteria (4 letters)',
        answer: 'SOAP',
        row: 0,
        col: 1,
      },
      {
        number: 3,
        direction: 'across',
        clue: 'Essential liquid needed to stay hydrated every day (5 letters)',
        answer: 'WATER',
        row: 2,
        col: 0,
      },
      {
        number: 5,
        direction: 'across',
        clue: 'Tool used with toothpaste to clean teeth twice daily (5 letters)',
        answer: 'BRUSH',
        row: 4,
        col: 2,
      },
      {
        number: 6,
        direction: 'across',
        clue: 'Tidy and free of dirt or germs (5 letters)',
        answer: 'CLEAN',
        row: 6,
        col: 1,
      },
      {
        number: 1,
        direction: 'down',
        clue: 'Tiny living organism that can cause sickness if not washed away (4 letters)',
        answer: 'GERM',
        row: 0,
        col: 1,
      },
      {
        number: 2,
        direction: 'down',
        clue: 'Resting for 8 hours every night keeps your mind ____ (5 letters)',
        answer: 'FRESH',
        row: 0,
        col: 4,
      },
      {
        number: 4,
        direction: 'down',
        clue: 'Where waste and trash should always be thrown (3 letters)',
        answer: 'BIN',
        row: 2,
        col: 6,
      },
    ],
  },
  {
    id: 'puzzle-2',
    title: 'Monsoon & Disease Prevention',
    category: 'Sanitation & Safety',
    difficulty: 'Medium',
    gridSize: { rows: 9, cols: 9 },
    themeColor: 'teal',
    clues: [
      {
        number: 1,
        direction: 'across',
        clue: 'Insect that spreads Dengue and Malaria in stagnant water (8 letters)',
        answer: 'MOSQUITO',
        row: 1,
        col: 0,
      },
      {
        number: 3,
        direction: 'across',
        clue: 'Body temperature spike during illness or infection (5 letters)',
        answer: 'FEVER',
        row: 4,
        col: 1,
      },
      {
        number: 5,
        direction: 'across',
        clue: 'Protective shot given to build immunity against diseases (7 letters)',
        answer: 'VACCINE',
        row: 7,
        col: 1,
      },
      {
        number: 2,
        direction: 'down',
        clue: 'Waste water channel that must be kept covered and clear (5 letters)',
        answer: 'DRAIN',
        row: 0,
        col: 6,
      },
      {
        number: 4,
        direction: 'down',
        clue: 'Boiling water kills harmful ____ before drinking (5 letters)',
        answer: 'GERMS',
        row: 3,
        col: 3,
      },
    ],
  },
  {
    id: 'puzzle-3',
    title: 'Nutrition & Campus Sanitation',
    category: 'Balanced Diet',
    difficulty: 'Medium',
    gridSize: { rows: 8, cols: 8 },
    themeColor: 'indigo',
    clues: [
      {
        number: 1,
        direction: 'across',
        clue: 'Fresh crunchy natural food packed with vitamins (5 letters)',
        answer: 'FRUIT',
        row: 1,
        col: 1,
      },
      {
        number: 3,
        direction: 'across',
        clue: 'Healthy white drink rich in calcium for strong bones (4 letters)',
        answer: 'MILK',
        row: 3,
        col: 2,
      },
      {
        number: 5,
        direction: 'across',
        clue: 'State of complete physical, mental and social wellbeing (6 letters)',
        answer: 'HEALTH',
        row: 6,
        col: 1,
      },
      {
        number: 2,
        direction: 'down',
        clue: 'Nutritious green plants like spinach, broccoli, and peas (5 letters)',
        answer: 'VEGGY',
        row: 0,
        col: 4,
      },
      {
        number: 4,
        direction: 'down',
        clue: 'Physical activity or sports that keeps the body fit (8 letters)',
        answer: 'EXERCISE',
        row: 0,
        col: 6,
      },
    ],
  },
  {
    id: 'puzzle-4',
    title: 'School Health & First Aid',
    category: 'Safety & Emergency',
    difficulty: 'Hard',
    gridSize: { rows: 9, cols: 9 },
    themeColor: 'purple',
    clues: [
      {
        number: 1,
        direction: 'across',
        clue: 'First aid strip applied to cover small cuts and wounds (7 letters)',
        answer: 'BANDAGE',
        row: 1,
        col: 1,
      },
      {
        number: 3,
        direction: 'across',
        clue: 'Healthcare professional who checks students in school clinic (6 letters)',
        answer: 'DOCTOR',
        row: 4,
        col: 1,
      },
      {
        number: 5,
        direction: 'across',
        clue: 'Safe vehicle that takes injured people to hospital urgently (9 letters)',
        answer: 'AMBULANCE',
        row: 7,
        col: 0,
      },
      {
        number: 2,
        direction: 'down',
        clue: 'Liquid disinfectant used to clean hands when soap is absent (9 letters)',
        answer: 'SANITIZER',
        row: 0,
        col: 5,
      },
      {
        number: 4,
        direction: 'down',
        clue: 'Action of washing hands before eating any ____ (4 letters)',
        answer: 'FOOD',
        row: 4,
        col: 8,
      },
    ],
  }
];
