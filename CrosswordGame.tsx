import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  RotateCcw, 
  CheckCircle, 
  HelpCircle, 
  Award, 
  Shuffle, 
  Check, 
  X, 
  Flame, 
  Trophy, 
  Clock,
  Eye,
  Zap,
  ChevronRight
} from 'lucide-react';
import { CROSSWORD_PUZZLES, CrosswordPuzzle, CrosswordClue } from '../data/crosswordData';
import { Language } from '../types';

interface CrosswordGameProps {
  language: Language;
  onAddPoints: (pts: number) => void;
}

export const CrosswordGame: React.FC<CrosswordGameProps> = ({ language, onAddPoints }) => {
  // Puzzle index state - allows cycling & random refreshing
  const [puzzleIndex, setPuzzleIndex] = useState(0);
  const currentPuzzle: CrosswordPuzzle = CROSSWORD_PUZZLES[puzzleIndex % CROSSWORD_PUZZLES.length];

  // User input grid: matrix of strings [row][col]
  const [gridValues, setGridValues] = useState<string[][]>([]);
  // Active selected cell: { row, col }
  const [activeCell, setActiveCell] = useState<{ row: number; col: number } | null>(null);
  // Current direction: 'across' | 'down'
  const [direction, setDirection] = useState<'across' | 'down'>('across');
  // Selected clue
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  
  // Checking & Validation status
  const [isChecked, setIsChecked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [solvedWords, setSolvedWords] = useState<string[]>([]);
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [streak, setStreak] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  // Auto-fill all correct answers into the crossword matrix
  const handleFillAllAnswers = () => {
    const newGrid = gridValues.map(row => [...row]);
    currentPuzzle.clues.forEach(clue => {
      const len = clue.answer.length;
      for (let i = 0; i < len; i++) {
        const r = clue.direction === 'across' ? clue.row : clue.row + i;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        newGrid[r][c] = clue.answer[i];
      }
    });
    setGridValues(newGrid);
    setIsCompleted(true);
    setShowAnswerKey(true);
    setMessage('All answers filled into the crossword grid successfully!');
    setTimeout(() => setMessage(null), 3000);
  };

  // References for inputs
  const inputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  // Initialize grid matrix when puzzle changes
  useEffect(() => {
    const { rows, cols } = currentPuzzle.gridSize;
    const initialGrid: string[][] = Array(rows).fill(null).map(() => Array(cols).fill(''));
    setGridValues(initialGrid);
    setIsChecked(false);
    setIsCompleted(false);
    setSolvedWords([]);
    setTimerSeconds(0);

    // Set default active clue to the first across clue
    const firstClue = currentPuzzle.clues.find(c => c.direction === 'across') || currentPuzzle.clues[0];
    if (firstClue) {
      setSelectedClue(firstClue);
      setActiveCell({ row: firstClue.row, col: firstClue.col });
      setDirection(firstClue.direction);
    }
  }, [puzzleIndex]);

  // Timer interval
  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setTimerSeconds(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  // Build a helper map to check which cells belong to which clues & cell numbers
  const cellInfoMap = useRef<{ [key: string]: { number?: number; clues: CrosswordClue[]; letter: string } }>({});

  // Re-calculate cellInfoMap whenever currentPuzzle changes
  const buildCellMap = () => {
    const map: { [key: string]: { number?: number; clues: CrosswordClue[]; letter: string } } = {};
    
    currentPuzzle.clues.forEach(clue => {
      const len = clue.answer.length;
      for (let i = 0; i < len; i++) {
        const r = clue.direction === 'across' ? clue.row : clue.row + i;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        const key = `${r}-${c}`;
        
        if (!map[key]) {
          map[key] = { clues: [], letter: clue.answer[i] };
        }
        map[key].clues.push(clue);
        
        if (i === 0) {
          map[key].number = clue.number;
        }
      }
    });

    return map;
  };

  const cellMap = buildCellMap();

  // Handle Refreshing to a NEW Puzzle
  const handleNextPuzzle = () => {
    const nextIdx = (puzzleIndex + 1) % CROSSWORD_PUZZLES.length;
    setPuzzleIndex(nextIdx);
    setMessage(`Switched to new crossword: "${CROSSWORD_PUZZLES[nextIdx].title}"!`);
    setTimeout(() => setMessage(null), 3000);
  };

  const handleRandomPuzzle = () => {
    let nextIdx = Math.floor(Math.random() * CROSSWORD_PUZZLES.length);
    if (nextIdx === puzzleIndex) {
      nextIdx = (nextIdx + 1) % CROSSWORD_PUZZLES.length;
    }
    setPuzzleIndex(nextIdx);
    setMessage(`Loaded new random puzzle: "${CROSSWORD_PUZZLES[nextIdx].title}"!`);
    setTimeout(() => setMessage(null), 3000);
  };

  // Handle cell selection
  const handleCellClick = (r: number, c: number) => {
    const key = `${r}-${c}`;
    const info = cellMap[key];
    if (!info) return; // Black cell

    if (activeCell?.row === r && activeCell?.col === c) {
      // Toggle direction if clicking same cell
      const newDir = direction === 'across' ? 'down' : 'across';
      setDirection(newDir);
      // Find clue in new direction
      const clue = info.clues.find(cl => cl.direction === newDir) || info.clues[0];
      setSelectedClue(clue);
    } else {
      setActiveCell({ row: r, col: c });
      // Find clue matching current direction or first clue
      const clue = info.clues.find(cl => cl.direction === direction) || info.clues[0];
      if (clue) {
        setDirection(clue.direction);
        setSelectedClue(clue);
      }
    }
  };

  // Handle selecting clue directly from list
  const handleClueClick = (clue: CrosswordClue) => {
    setSelectedClue(clue);
    setDirection(clue.direction);
    setActiveCell({ row: clue.row, col: clue.col });
    const refKey = `${clue.row}-${clue.col}`;
    inputRefs.current[refKey]?.focus();
  };

  // Move to next cell along current direction
  const moveToNextCell = (r: number, c: number) => {
    let nextR = r;
    let nextC = c;
    if (direction === 'across') {
      nextC += 1;
    } else {
      nextR += 1;
    }

    const nextKey = `${nextR}-${nextC}`;
    if (cellMap[nextKey]) {
      setActiveCell({ row: nextR, col: nextC });
      inputRefs.current[nextKey]?.focus();
    }
  };

  // Move to previous cell
  const moveToPrevCell = (r: number, c: number) => {
    let prevR = r;
    let prevC = c;
    if (direction === 'across') {
      prevC -= 1;
    } else {
      prevR -= 1;
    }

    const prevKey = `${prevR}-${prevC}`;
    if (cellMap[prevKey]) {
      setActiveCell({ row: prevR, col: prevC });
      inputRefs.current[prevKey]?.focus();
    }
  };

  // Handle cell typing input
  const handleCellInputChange = (r: number, c: number, val: string) => {
    const char = val.slice(-1).toUpperCase();
    if (char && !/^[A-Z]$/.test(char)) return;

    const newGrid = gridValues.map(row => [...row]);
    newGrid[r][c] = char;
    setGridValues(newGrid);
    setIsChecked(false);

    // Auto-advance
    if (char !== '') {
      moveToNextCell(r, c);
    }

    // Check if whole puzzle is solved
    checkPuzzleCompletion(newGrid);
  };

  // Keydown navigation (Backspace, Arrow keys)
  const handleKeyDown = (r: number, c: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace') {
      if (gridValues[r][c] === '') {
        moveToPrevCell(r, c);
      } else {
        const newGrid = gridValues.map(row => [...row]);
        newGrid[r][c] = '';
        setGridValues(newGrid);
      }
    } else if (e.key === 'ArrowRight') {
      setDirection('across');
      moveToNextCell(r, c);
    } else if (e.key === 'ArrowLeft') {
      setDirection('across');
      moveToPrevCell(r, c);
    } else if (e.key === 'ArrowDown') {
      setDirection('down');
      moveToNextCell(r, c);
    } else if (e.key === 'ArrowUp') {
      setDirection('down');
      moveToPrevCell(r, c);
    }
  };

  // Check if current grid completes the crossword
  const checkPuzzleCompletion = (grid: string[][]) => {
    let allCorrect = true;
    currentPuzzle.clues.forEach(clue => {
      const len = clue.answer.length;
      let wordAnswer = '';
      for (let i = 0; i < len; i++) {
        const r = clue.direction === 'across' ? clue.row : clue.row + i;
        const c = clue.direction === 'across' ? clue.col + i : clue.col;
        wordAnswer += (grid[r]?.[c] || '').toUpperCase();
      }

      if (wordAnswer !== clue.answer) {
        allCorrect = false;
      }
    });

    if (allCorrect && !isCompleted) {
      setIsCompleted(true);
      onAddPoints(100); // +100 bonus health points for completion
      setMessage('🎉 Congratulations! You solved the Crossword! +100 Health Points earned!');
    }
  };

  // Check Answers action
  const handleCheckAnswers = () => {
    setIsChecked(true);
    let correctCount = 0;
    let totalCells = 0;

    Object.keys(cellMap).forEach(key => {
      totalCells++;
      const [r, c] = key.split('-').map(Number);
      if (gridValues[r]?.[c]?.toUpperCase() === cellMap[key].letter) {
        correctCount++;
      }
    });

    if (correctCount === totalCells) {
      setIsCompleted(true);
      onAddPoints(100);
      setMessage('✨ Perfect Score! All letters are correct! +100 Points!');
    } else {
      setMessage(`Checked! ${correctCount} of ${totalCells} letters are correct. Keep going!`);
    }

    setTimeout(() => setMessage(null), 4000);
  };

  // Reveal Hint / Single Cell
  const handleRevealCell = () => {
    if (!activeCell) return;
    const key = `${activeCell.row}-${activeCell.col}`;
    const info = cellMap[key];
    if (!info) return;

    const newGrid = gridValues.map(row => [...row]);
    newGrid[activeCell.row][activeCell.col] = info.letter;
    setGridValues(newGrid);

    setMessage(`Revealed letter "${info.letter}"!`);
    setTimeout(() => setMessage(null), 2500);
    checkPuzzleCompletion(newGrid);
  };

  // Reveal Active Word
  const handleRevealWord = () => {
    if (!selectedClue) return;
    const newGrid = gridValues.map(row => [...row]);
    const len = selectedClue.answer.length;
    for (let i = 0; i < len; i++) {
      const r = selectedClue.direction === 'across' ? selectedClue.row : selectedClue.row + i;
      const c = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
      newGrid[r][c] = selectedClue.answer[i];
    }
    setGridValues(newGrid);
    setMessage(`Revealed word: "${selectedClue.answer}"!`);
    setTimeout(() => setMessage(null), 2500);
    checkPuzzleCompletion(newGrid);
  };

  // Reset current grid
  const handleResetGrid = () => {
    const { rows, cols } = currentPuzzle.gridSize;
    setGridValues(Array(rows).fill(null).map(() => Array(cols).fill('')));
    setIsChecked(false);
    setIsCompleted(false);
    setMessage('Grid reset successfully!');
    setTimeout(() => setMessage(null), 2000);
  };

  // Format timer into MM:SS
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Check if a cell is highlighted (part of active clue)
  const isCellInActiveClue = (r: number, c: number) => {
    if (!selectedClue) return false;
    const len = selectedClue.answer.length;
    for (let i = 0; i < len; i++) {
      const cr = selectedClue.direction === 'across' ? selectedClue.row : selectedClue.row + i;
      const cc = selectedClue.direction === 'across' ? selectedClue.col + i : selectedClue.col;
      if (cr === r && cc === c) return true;
    }
    return false;
  };

  return (
    <div className="space-y-4 pb-8">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 text-white p-4 sm:p-5 rounded-lg shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="space-y-1">
            <div className="inline-flex items-center space-x-2 bg-emerald-950/80 border border-emerald-500/40 px-2.5 py-0.5 rounded-md text-emerald-300 text-[11px] font-semibold">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Interactive Health & Sanitation Crossword</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold flex items-center space-x-2">
              <span>{currentPuzzle.title}</span>
              <span className="text-xs bg-emerald-800/80 border border-emerald-600 text-emerald-200 px-2 py-0.5 rounded-md">
                {currentPuzzle.difficulty}
              </span>
            </h1>
            <p className="text-slate-300 text-xs leading-relaxed max-w-2xl">
              Solve hygiene clues across and down. Crosswords dynamically refresh with new puzzles every time!
            </p>
          </div>

          {/* Action Buttons: Next Puzzle / Refresh */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={handleNextPuzzle}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              title="Loads a brand new crossword puzzle"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Next Crossword</span>
            </button>

            <button
              onClick={handleRandomPuzzle}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 shadow-2xs cursor-pointer"
              title="Pick a random puzzle theme"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>Random Theme</span>
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-4 pt-3 border-t border-slate-800 text-xs">
          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Time Elapsed</span>
            <span className="font-extrabold text-white text-xs flex items-center space-x-1">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span>{formatTime(timerSeconds)}</span>
            </span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Total Clues</span>
            <span className="font-extrabold text-emerald-400 text-xs">
              {currentPuzzle.clues.length} Words
            </span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Category</span>
            <span className="font-bold text-indigo-300 text-xs truncate max-w-[100px]">
              {currentPuzzle.category}
            </span>
          </div>

          <div className="bg-slate-800/80 p-2.5 rounded-md border border-slate-700 flex items-center justify-between">
            <span className="text-slate-400 text-[10px] uppercase font-bold">Puzzle Pack</span>
            <span className="font-bold text-amber-300 text-xs">
              {(puzzleIndex % CROSSWORD_PUZZLES.length) + 1} of {CROSSWORD_PUZZLES.length}
            </span>
          </div>
        </div>
      </div>

      {/* Message notification popup banner */}
      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-lg text-emerald-950 font-bold text-xs flex items-center justify-between animate-in fade-in duration-200 shadow-2xs">
          <span className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>{message}</span>
          </span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Game Interface: Grid + Clues */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        
        {/* Left Column: Interactive Crossword Grid */}
        <div className="lg:col-span-7 bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
            <div>
              <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide">
                Crossword Matrix
              </h2>
              <p className="text-[11px] text-slate-500">Click a cell or clue to start typing</p>
            </div>

            <div className="flex items-center space-x-1.5 text-xs font-bold">
              <button
                onClick={() => setDirection(direction === 'across' ? 'down' : 'across')}
                className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-md border border-slate-300 text-[11px] flex items-center space-x-1 cursor-pointer"
              >
                <span>Direction: <strong className="text-emerald-700 uppercase">{direction}</strong></span>
              </button>
            </div>
          </div>

          {/* Grid Render */}
          <div className="overflow-x-auto flex justify-center py-2">
            <div 
              className="grid gap-1 bg-slate-800 p-2 rounded-lg shadow-inner select-none"
              style={{
                gridTemplateRows: `repeat(${currentPuzzle.gridSize.rows}, minmax(0, 1fr))`,
                gridTemplateColumns: `repeat(${currentPuzzle.gridSize.cols}, minmax(0, 1fr))`
              }}
            >
              {Array.from({ length: currentPuzzle.gridSize.rows }).map((_, r) => (
                Array.from({ length: currentPuzzle.gridSize.cols }).map((_, c) => {
                  const key = `${r}-${c}`;
                  const info = cellMap[key];
                  const isBlack = !info;
                  const isActive = activeCell?.row === r && activeCell?.col === c;
                  const isHighlighted = isCellInActiveClue(r, c);
                  const userVal = gridValues[r]?.[c] || '';

                  // Validation check visual style
                  let checkStyle = "bg-white text-slate-900 border-slate-300";
                  if (isBlack) {
                    checkStyle = "bg-slate-900 border-slate-950 opacity-90";
                  } else if (isActive) {
                    checkStyle = "bg-amber-100 border-amber-500 ring-2 ring-amber-400 font-extrabold text-amber-950";
                  } else if (isHighlighted) {
                    checkStyle = "bg-emerald-50 border-emerald-400 font-bold text-emerald-950";
                  }

                  if (isChecked && !isBlack && userVal !== '') {
                    if (userVal.toUpperCase() === info.letter) {
                      checkStyle = "bg-emerald-100 border-emerald-600 text-emerald-900 font-black";
                    } else {
                      checkStyle = "bg-red-100 border-red-400 text-red-900 font-bold";
                    }
                  }

                  return (
                    <div
                      key={key}
                      onClick={() => !isBlack && handleCellClick(r, c)}
                      className={`relative w-8 h-8 sm:w-10 sm:h-10 rounded-md border transition-all flex items-center justify-center font-bold text-xs sm:text-sm ${
                        isBlack ? 'cursor-default' : 'cursor-pointer hover:border-emerald-500'
                      } ${checkStyle}`}
                    >
                      {/* Cell number label */}
                      {info?.number && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] font-extrabold text-slate-500 leading-none">
                          {info.number}
                        </span>
                      )}

                      {!isBlack && (
                        <input
                          ref={(el) => (inputRefs.current[key] = el)}
                          type="text"
                          maxLength={1}
                          value={userVal}
                          onFocus={() => handleCellClick(r, c)}
                          onChange={(e) => handleCellInputChange(r, c, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(r, c, e)}
                          className="w-full h-full text-center bg-transparent outline-hidden font-extrabold text-sm uppercase cursor-pointer"
                        />
                      )}
                    </div>
                  );
                })
              ))}
            </div>
          </div>

          {/* Crossword Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-100 text-xs">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleCheckAnswers}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-md flex items-center space-x-1 cursor-pointer transition-colors"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Check Answers</span>
              </button>

              <button
                onClick={handleRevealCell}
                className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-bold px-2.5 py-1.5 rounded-md flex items-center space-x-1 cursor-pointer transition-colors"
                title="Reveal currently active letter"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Reveal Letter</span>
              </button>

              <button
                onClick={handleRevealWord}
                className="bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 font-bold px-2.5 py-1.5 rounded-md flex items-center space-x-1 cursor-pointer transition-colors"
                title="Reveal full selected word"
              >
                <HelpCircle className="w-3.5 h-3.5" />
                <span>Reveal Word</span>
              </button>
            </div>

            <button
              onClick={handleResetGrid}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold px-2.5 py-1.5 rounded-md border border-slate-300 flex items-center space-x-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Clear Grid</span>
            </button>
          </div>

        </div>

        {/* Right Column: Clues List (Across & Down) */}
        <div className="lg:col-span-5 bg-white p-4 sm:p-5 rounded-lg border border-slate-200/90 shadow-2xs space-y-4">
          <div className="border-b border-slate-100 pb-2.5">
            <h2 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center justify-between">
              <span>Crossword Clues</span>
              {selectedClue && (
                <span className="text-[10px] bg-emerald-100 text-emerald-900 px-2 py-0.5 rounded-md font-bold">
                  Active: #{selectedClue.number} ({selectedClue.direction.toUpperCase()})
                </span>
              )}
            </h2>
            <p className="text-[11px] text-slate-500">Select any clue to highlight its target word on the grid</p>
          </div>

          {/* Across Clues List */}
          <div className="space-y-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1 border-b border-slate-100 pb-1">
              <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
              <span>Across Clues</span>
            </h3>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {currentPuzzle.clues.filter(c => c.direction === 'across').map((clue) => {
                const isSelected = selectedClue?.number === clue.number && selectedClue?.direction === 'across';

                return (
                  <button
                    key={`across-${clue.number}`}
                    onClick={() => handleClueClick(clue)}
                    className={`w-full text-left p-2 rounded-md border transition-all text-xs flex items-start space-x-2 cursor-pointer ${
                      isSelected
                        ? 'bg-emerald-50 border-emerald-500 font-bold text-emerald-950 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-emerald-700 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {clue.number}
                    </span>
                    <span className="leading-snug">{clue.clue}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Down Clues List */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-wider flex items-center space-x-1 border-b border-slate-100 pb-1">
              <ChevronRight className="w-3.5 h-3.5 text-indigo-700" />
              <span>Down Clues</span>
            </h3>

            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {currentPuzzle.clues.filter(c => c.direction === 'down').map((clue) => {
                const isSelected = selectedClue?.number === clue.number && selectedClue?.direction === 'down';

                return (
                  <button
                    key={`down-${clue.number}`}
                    onClick={() => handleClueClick(clue)}
                    className={`w-full text-left p-2 rounded-md border transition-all text-xs flex items-start space-x-2 cursor-pointer ${
                      isSelected
                        ? 'bg-indigo-50 border-indigo-500 font-bold text-indigo-950 shadow-2xs'
                        : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-md bg-indigo-700 text-white font-black text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      {clue.number}
                    </span>
                    <span className="leading-snug">{clue.clue}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Educational Health Tip Box */}
          <div className="p-3 bg-slate-900 text-white rounded-lg text-xs space-y-1">
            <div className="text-[10px] text-amber-400 font-extrabold uppercase flex items-center space-x-1">
              <Zap className="w-3 h-3 text-amber-400" />
              <span>Campus Health Tip</span>
            </div>
            <p className="text-slate-300 text-[11px] leading-relaxed">
              Completing daily health crosswords sharpens your memory, builds hygiene awareness, and earns verifiable Health Points!
            </p>
          </div>

        </div>

      </div>

      {/* Answer Key & Full Solution Sheet (At Last) */}
      <div className="bg-white border border-slate-200/90 rounded-lg p-4 sm:p-5 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div className="space-y-0.5">
            <h3 className="text-sm font-extrabold text-slate-900 uppercase tracking-wide flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>Crossword Answer Key & Solution Sheet</span>
            </h3>
            <p className="text-xs text-slate-500">
              Review correct answers for "{currentPuzzle.title}" ({currentPuzzle.clues.length} total words) or auto-fill the grid.
            </p>
          </div>

          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Eye className="w-3.5 h-3.5 text-amber-400" />
              <span>{showAnswerKey ? 'Hide Answer Key' : 'Show Answer Key'}</span>
            </button>

            <button
              onClick={handleFillAllAnswers}
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-3 py-1.5 rounded-md text-xs transition-colors flex items-center space-x-1.5 cursor-pointer shadow-2xs"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Auto-Fill All Answers</span>
            </button>
          </div>
        </div>

        {showAnswerKey ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1 animate-in fade-in duration-150">
            {/* Across Answers */}
            <div className="bg-emerald-50/70 border border-emerald-200 rounded-lg p-3.5 space-y-2.5">
              <h4 className="text-xs font-black text-emerald-950 uppercase tracking-wider flex items-center space-x-1 border-b border-emerald-200/80 pb-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-700" />
                <span>Across Answers ({currentPuzzle.clues.filter(c => c.direction === 'across').length})</span>
              </h4>
              <div className="space-y-2">
                {currentPuzzle.clues.filter(c => c.direction === 'across').map((clue) => (
                  <div key={`ans-across-${clue.number}`} className="bg-white p-2.5 rounded-md border border-emerald-200/80 text-xs flex items-center justify-between gap-3 shadow-2xs">
                    <div className="min-w-0">
                      <span className="font-extrabold text-emerald-800 mr-1.5">#{clue.number}.</span>
                      <span className="text-slate-700 font-medium">{clue.clue}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-700 text-white font-black text-xs rounded-md uppercase tracking-wider shrink-0 shadow-2xs">
                      {clue.answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Down Answers */}
            <div className="bg-indigo-50/70 border border-indigo-200 rounded-lg p-3.5 space-y-2.5">
              <h4 className="text-xs font-black text-indigo-950 uppercase tracking-wider flex items-center space-x-1 border-b border-indigo-200/80 pb-1.5">
                <ChevronRight className="w-3.5 h-3.5 text-indigo-700" />
                <span>Down Answers ({currentPuzzle.clues.filter(c => c.direction === 'down').length})</span>
              </h4>
              <div className="space-y-2">
                {currentPuzzle.clues.filter(c => c.direction === 'down').map((clue) => (
                  <div key={`ans-down-${clue.number}`} className="bg-white p-2.5 rounded-md border border-indigo-200/80 text-xs flex items-center justify-between gap-3 shadow-2xs">
                    <div className="min-w-0">
                      <span className="font-extrabold text-indigo-800 mr-1.5">#{clue.number}.</span>
                      <span className="text-slate-700 font-medium">{clue.clue}</span>
                    </div>
                    <span className="px-2.5 py-1 bg-indigo-700 text-white font-black text-xs rounded-md uppercase tracking-wider shrink-0 shadow-2xs">
                      {clue.answer}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-slate-50 border border-slate-200 border-dashed rounded-lg p-4 text-center text-xs text-slate-600 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>Click <strong>"Show Answer Key"</strong> to view the full answer solution sheet for all Across & Down clues.</span>
            <button
              onClick={() => setShowAnswerKey(true)}
              className="px-3 py-1 bg-slate-900 text-white font-bold rounded-md hover:bg-slate-800 text-xs transition-colors shrink-0 cursor-pointer"
            >
              Reveal Answers Key
            </button>
          </div>
        )}
      </div>

    </div>
  );
};
