import React, { useState, useEffect, useRef } from 'react';
import { Timer, Zap, RotateCcw, Trophy, ArrowLeft, Sparkles, Volume2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { soundFx } from '../lib/soundFx';
import { ttsService } from '../lib/tts';

interface SpeedMatchGameProps {
  words: WordItem[];
  onAddXP: (xp: number) => void;
  onBack: () => void;
}

interface MatchCard {
  id: string; // unique card id
  pairId: string; // word item id
  text: string;
  type: 'word' | 'meaning';
  isMatched: boolean;
  isSelected: boolean;
}

export const SpeedMatchGame: React.FC<SpeedMatchGameProps> = ({ words, onAddXP, onBack }) => {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedCards, setSelectedCards] = useState<MatchCard[]>([]);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [timeLeft, setTimeLeft] = useState(45);
  const [isGameOver, setIsGameOver] = useState(false);
  const [matchedPairsCount, setMatchedPairsCount] = useState(0);
  const [round, setRound] = useState(1);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize 5 word pairs per round (10 cards)
  const initRound = () => {
    if (words.length < 5) return;
    const shuffledWords = [...words].sort(() => 0.5 - Math.random()).slice(0, 5);

    const generated: MatchCard[] = [];
    shuffledWords.forEach((w) => {
      generated.push({
        id: `${w.id}_word`,
        pairId: w.id,
        text: w.word,
        type: 'word',
        isMatched: false,
        isSelected: false,
      });
      generated.push({
        id: `${w.id}_meaning`,
        pairId: w.id,
        text: w.meaning,
        type: 'meaning',
        isMatched: false,
        isSelected: false,
      });
    });

    // Shuffle the 10 cards
    setCards(generated.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
  };

  const startGame = () => {
    setScore(0);
    setCombo(0);
    setMaxCombo(0);
    setTimeLeft(45);
    setIsGameOver(false);
    setMatchedPairsCount(0);
    setRound(1);
    initRound();
  };

  useEffect(() => {
    startGame();
  }, [words]);

  // Timer countdown
  useEffect(() => {
    if (isGameOver) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          handleFinishGame();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isGameOver]);

  const handleFinishGame = () => {
    setIsGameOver(true);
    soundFx.playLevelUp();
    try {
      confetti({ particleCount: 90, spread: 80, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleCardClick = (card: MatchCard) => {
    if (isGameOver || card.isMatched || card.isSelected || selectedCards.length >= 2) return;

    soundFx.playTap();
    if (card.type === 'word') {
      ttsService.speak(card.text);
    }

    const newSelected = [...selectedCards, card];
    setSelectedCards(newSelected);

    // Update isSelected state
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isSelected: true } : c))
    );

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      const isMatch = first.pairId === second.pairId && first.type !== second.type;

      if (isMatch) {
        // Matched!
        soundFx.playMatch();
        const currentCombo = combo + 1;
        setCombo(currentCombo);
        if (currentCombo > maxCombo) setMaxCombo(currentCombo);

        const earnedPoints = 10 * currentCombo;
        setScore((s) => s + earnedPoints);
        onAddXP(Math.max(2, Math.round(earnedPoints / 5)));

        setTimeout(() => {
          setCards((prev) => {
            const nextCards = prev.map((c) =>
              c.pairId === first.pairId ? { ...c, isMatched: true, isSelected: false } : c
            );
            const remaining = nextCards.filter((c) => !c.isMatched);
            if (remaining.length === 0) {
              // Next round!
              soundFx.playCorrect();
              setMatchedPairsCount((p) => p + 5);
              setTimeLeft((t) => Math.min(60, t + 10)); // +10s bonus!
              setRound((r) => r + 1);
              initRound();
            }
            return nextCards;
          });
          setSelectedCards([]);
        }, 300);
      } else {
        // Wrong match
        soundFx.playWrong();
        setCombo(0);
        setTimeout(() => {
          setCards((prev) =>
            prev.map((c) =>
              c.id === first.id || c.id === second.id ? { ...c, isSelected: false } : c
            )
          );
          setSelectedCards([]);
        }, 500);
      }
    }
  };

  if (isGameOver) {
    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            หมดเวลา! สรุปคะแนน
          </h3>
          <p className="text-xs text-slate-500 mt-1">เกมจับคู่คำศัพท์ Speed Match</p>
        </div>

        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-semibold block">คะแนน</span>
            <span className="text-xl font-black text-indigo-600 dark:text-indigo-400">{score}</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-semibold block">Max Combo</span>
            <span className="text-xl font-black text-amber-500">{maxCombo}x</span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-200/60 dark:border-slate-700/60">
            <span className="text-[10px] text-slate-400 font-semibold block">คู่ที่จับได้</span>
            <span className="text-xl font-black text-emerald-600 dark:text-emerald-400">
              {matchedPairsCount + cards.filter((c) => c.isMatched && c.type === 'word').length}
            </span>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onBack}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs py-3 rounded-2xl transition"
          >
            กลับหน้ารวมเกม
          </button>
          <button
            onClick={startGame}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs py-3 rounded-2xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>เล่นอีกรอบ</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto space-y-3.5 pb-6 animate-fade-in">
      {/* Top Game Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ออก</span>
        </button>

        <div className="flex items-center gap-3">
          {/* Combo Indicator */}
          {combo > 1 && (
            <div className="flex items-center gap-1 bg-amber-500 text-white text-[11px] font-black px-2 py-0.5 rounded-full animate-bounce shadow-xs">
              <Zap className="w-3 h-3 fill-white" />
              <span>{combo}x Combo!</span>
            </div>
          )}

          {/* Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full font-black text-xs border ${
              timeLeft <= 10
                ? 'bg-rose-50 text-rose-600 border-rose-300 animate-pulse'
                : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700'
            }`}
          >
            <Timer className="w-3.5 h-3.5" />
            <span>{timeLeft}s</span>
          </div>

          {/* Score */}
          <div className="bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 px-3 py-1 rounded-full font-black text-xs">
            {score} pts
          </div>
        </div>
      </div>

      {/* Round & Info */}
      <div className="flex items-center justify-between text-[11px] text-slate-400 font-semibold px-1">
        <span>รอบที่ {round} (+10 วิ เมื่อผ่านแต่ละรอบ)</span>
        <span>จับคู่ภาษาอังกฤษ กับความหมายไทย</span>
      </div>

      {/* 10 Cards Grid (5 pairs) */}
      <div className="grid grid-cols-2 gap-2.5">
        {cards.map((card) => {
          let cardStyle =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-100 hover:border-indigo-300 shadow-xs';

          if (card.isMatched) {
            cardStyle =
              'opacity-0 pointer-events-none scale-90 transition-all duration-300';
          } else if (card.isSelected) {
            cardStyle =
              'bg-indigo-50 dark:bg-indigo-950/70 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-black ring-2 ring-indigo-500/20 shadow-md scale-102';
          }

          return (
            <button
              key={card.id}
              onClick={() => handleCardClick(card)}
              disabled={card.isMatched}
              className={`p-3.5 min-h-[72px] rounded-2xl border transition-all text-center flex flex-col items-center justify-center relative active:scale-95 ${cardStyle}`}
            >
              <span
                className={`leading-snug break-words ${
                  card.type === 'word'
                    ? 'font-black text-sm tracking-tight text-indigo-600 dark:text-indigo-400'
                    : 'text-xs font-semibold text-slate-700 dark:text-slate-200'
                }`}
              >
                {card.text}
              </span>
              {card.type === 'word' && (
                <span className="text-[9px] uppercase font-bold text-slate-400 mt-0.5">
                  EN
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
