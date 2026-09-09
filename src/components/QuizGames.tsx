import React, { useState } from 'react';
import { 
  Award, 
  Sparkles, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  Download, 
  RotateCcw, 
  Printer, 
  Flame, 
  FileCheck
} from 'lucide-react';
import { Language, QuizQuestion } from '../types';
import { QUIZ_QUESTIONS } from '../data/mockData';
import { translations } from '../lib/translations';
import { CrosswordGame } from './CrosswordGame';

interface QuizGamesProps {
  language: Language;
  onAddPoints: (pts: number) => void;
}

export const QuizGames: React.FC<QuizGamesProps> = ({ language, onAddPoints }) => {
  const t = translations[language];

  // Quiz state
  const [activeTab, setActiveTab] = useState<'quiz' | 'matcher' | 'spotter' | 'crossword'>('crossword');
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [studentName, setStudentName] = useState('Ananya Sharma');
  const [showCertificateModal, setShowCertificateModal] = useState(false);

  const currentQ: QuizQuestion = QUIZ_QUESTIONS[currentQIndex];

  const handleSelectAnswer = (index: number) => {
    if (selectedAnswer !== null) return; // Prevent changing after selection
    setSelectedAnswer(index);

    if (index === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNextQ = () => {
    if (currentQIndex + 1 < QUIZ_QUESTIONS.length) {
      setCurrentQIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      setQuizCompleted(true);
      onAddPoints(score * 15); // +15 pts per correct answer
    }
  };

  const handleRestartQuiz = () => {
    setCurrentQIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setQuizCompleted(false);
  };

  // Spot Unhealthy Habit Game State
  const [unhealthyFound, setUnhealthyFound] = useState<string[]>([]);
  const spotHabitsList = [
    { id: 'h1', text: 'Eating open food uncovered near trash bin', isUnhealthy: true },
    { id: 'h2', text: 'Washing hands with soap for 20 seconds', isUnhealthy: false },
    { id: 'h3', text: 'Sharing personal water bottle lip-to-mouth', isUnhealthy: true },
    { id: 'h4', text: 'Throwing fruit peel on the corridor floor', isUnhealthy: true },
    { id: 'h5', text: 'Trimming fingernails regularly', isUnhealthy: false },
  ];

  const toggleSpotHabit = (id: string, isUnhealthy: boolean) => {
    if (isUnhealthy && !unhealthyFound.includes(id)) {
      setUnhealthyFound([...unhealthyFound, id]);
      onAddPoints(10);
    }
  };

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="max-w-4xl space-y-1">
          <div className="inline-flex items-center space-x-2 bg-purple-950/80 border border-purple-500/40 px-2.5 py-0.5 rounded-md text-purple-300 text-[11px] font-semibold">
            <Award className="w-3.5 h-3.5 text-purple-400" />
            <span>Earn Health Points & Printable Certificates</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold">{t.quizGames}</h1>
          <p className="text-slate-300 text-xs leading-relaxed">
            Test your health & hygiene knowledge with interactive quizzes, spot unhealthy habits, and generate verified digital certificates.
          </p>
        </div>

        {/* Game Navigation Tabs */}
        <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-800 pt-3 text-xs font-bold">
          <button
            onClick={() => setActiveTab('crossword')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer flex items-center space-x-1 ${
              activeTab === 'crossword' ? 'bg-emerald-600 text-white shadow-2xs font-extrabold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            <span>🧩 Hygiene Crossword Game</span>
            <span className="bg-amber-400 text-slate-950 text-[9px] px-1.5 py-0.2 rounded-xs font-black uppercase">Updates Daily</span>
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'quiz' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🧠 Health Quiz & Certificate
          </button>
          <button
            onClick={() => setActiveTab('spotter')}
            className={`px-3 py-1.5 rounded-md transition-all cursor-pointer ${
              activeTab === 'spotter' ? 'bg-emerald-700 text-white shadow-2xs' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            🔍 Spot Unhealthy Habit Challenge
          </button>
        </div>
      </div>

      {/* 0. Hygiene Crossword Game */}
      {activeTab === 'crossword' && (
        <CrosswordGame language={language} onAddPoints={onAddPoints} />
      )}

      {/* 1. Health Quiz & Certificate Section */}
      {activeTab === 'quiz' && (
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          {!quizCompleted ? (
            <>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-800 bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-200">
                    Question {currentQIndex + 1} of {QUIZ_QUESTIONS.length}
                  </span>
                  <h2 className="text-sm sm:text-base font-extrabold text-slate-900 mt-1.5">{currentQ.question}</h2>
                </div>
                <div className="text-xs font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-md border border-amber-200">
                  Score: {score}
                </div>
              </div>

              {/* Options List */}
              <div className="space-y-2">
                {currentQ.options.map((optionText, idx) => {
                  const isSelected = selectedAnswer === idx;
                  const isCorrect = idx === currentQ.correctIndex;
                  const showResult = selectedAnswer !== null;

                  let btnStyle = "bg-slate-50 border-slate-300 text-slate-800 hover:bg-slate-100";
                  if (showResult) {
                    if (isCorrect) btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 font-bold shadow-2xs";
                    else if (isSelected) btnStyle = "bg-red-50 border-red-300 text-red-900 font-bold";
                    else btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectAnswer(idx)}
                      disabled={selectedAnswer !== null}
                      className={`w-full p-3 rounded-md border text-left text-xs transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                    >
                      <span>{optionText}</span>
                      {showResult && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />}
                      {showResult && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Box */}
              {selectedAnswer !== null && (
                <div className="p-3 rounded-md bg-indigo-50/80 border border-indigo-200 text-xs text-indigo-950 space-y-1">
                  <div className="font-bold flex items-center space-x-1">
                    <Sparkles className="w-3.5 h-3.5 text-indigo-700" />
                    <span>Explanation:</span>
                  </div>
                  <p className="leading-relaxed font-medium text-[11px]">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {selectedAnswer !== null && (
                <button
                  onClick={handleNextQ}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-md text-xs shadow-2xs transition-all cursor-pointer"
                >
                  {currentQIndex + 1 === QUIZ_QUESTIONS.length ? 'Finish Quiz & View Certificate' : 'Next Question'}
                </button>
              )}
            </>
          ) : (
            /* Quiz Completed View */
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-extrabold text-slate-900">Quiz Completed! 🎉</h2>
                <p className="text-xs text-slate-600">
                  You scored <strong className="text-emerald-700 font-extrabold text-xs">{score} / {QUIZ_QUESTIONS.length}</strong>! You earned <strong className="text-amber-800">{score * 15} Health Points</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-3 rounded-md border border-slate-300 max-w-sm mx-auto space-y-1">
                <label className="block text-[11px] font-bold text-slate-800 text-left">Your Name for Certificate:</label>
                <input
                  type="text"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-white border border-slate-300 rounded-md px-2.5 py-1.5 text-xs font-bold text-slate-900 outline-hidden"
                />
              </div>

              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => setShowCertificateModal(true)}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2 px-4 rounded-md text-xs shadow-2xs transition-all flex items-center space-x-1.5 cursor-pointer"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Generate Printable Certificate</span>
                </button>

                <button
                  onClick={handleRestartQuiz}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold py-2 px-3.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Quiz</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 2. Spot Unhealthy Habit Challenge */}
      {activeTab === 'spotter' && (
        <div className="max-w-3xl mx-auto bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase">Spot the Unhealthy Habits!</h2>
            <p className="text-[11px] text-slate-500">Tap the unhealthy habits from the list below to earn +10 points each.</p>
          </div>

          <div className="space-y-2">
            {spotHabitsList.map((item) => {
              const isFound = unhealthyFound.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => toggleSpotHabit(item.id, item.isUnhealthy)}
                  className={`p-3 rounded-md border text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                    isFound
                      ? 'bg-red-50 border-red-300 text-red-950 shadow-2xs'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.text}</span>
                  {isFound ? (
                    <span className="bg-red-700 text-white text-[9px] px-2 py-0.5 rounded-sm font-black uppercase tracking-wider">
                      Unhealthy Spotted! (+10 pts)
                    </span>
                  ) : (
                    <span className="text-[10px] text-slate-400">Tap to inspect</span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Printable Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-8 shadow-2xl border-4 border-amber-300 space-y-6 relative">
            
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-lg font-bold"
            >
              ✕
            </button>

            {/* Certificate Canvas Frame */}
            <div className="border-2 border-dashed border-amber-400 p-8 rounded-2xl text-center space-y-4 bg-amber-50/30">
              <div className="w-16 h-16 rounded-full bg-amber-500 text-white flex items-center justify-center mx-auto shadow-lg">
                <Award className="w-8 h-8" />
              </div>

              <div className="text-[11px] font-extrabold tracking-widest text-amber-800 uppercase">
                CampusCare School Health & Hygiene Board
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
                CERTIFICATE OF HYGIENE EXCELLENCE
              </h1>

              <p className="text-xs text-slate-600 font-medium">This certificate is proudly awarded to</p>

              <div className="text-xl sm:text-2xl font-black text-emerald-800 border-b-2 border-emerald-600 inline-block px-6 py-1">
                {studentName}
              </div>

              <p className="text-xs text-slate-700 leading-relaxed max-w-md mx-auto">
                for demonstrating outstanding awareness in personal hygiene, school cleanliness, and health safety with a quiz score of <strong>{score} / {QUIZ_QUESTIONS.length}</strong>.
              </p>

              <div className="pt-6 flex items-center justify-between text-[10px] text-slate-500 border-t border-slate-200">
                <div>Date: {new Date().toLocaleDateString()}</div>
                <div>CampusCare Digital Seal: Verified ✓</div>
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => window.print()}
                className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center space-x-1.5 cursor-pointer shadow-md"
              >
                <Printer className="w-4 h-4" />
                <span>Print Certificate</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
