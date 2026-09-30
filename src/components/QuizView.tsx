import React, { useState, useMemo, useEffect } from 'react';
import { Brain, CheckCircle, XCircle, RotateCcw, Volume2, Trophy, ArrowRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { ttsService } from '../lib/tts';

interface QuizQuestion {
  wordItem: WordItem;
  options: string[]; // Thai meanings
  correctAnswer: string;
}

interface QuizViewProps {
  words: WordItem[];
  onRecordResult: (vocabId: string, isCorrect: boolean) => void;
}

export const QuizView: React.FC<QuizViewProps> = ({ words, onRecordResult }) => {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [wrongWords, setWrongWords] = useState<WordItem[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  // Generate 10 random questions
  const generateQuiz = () => {
    if (words.length < 4) return;
    const shuffled = [...words].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);

    const generatedQuestions: QuizQuestion[] = selected.map((target) => {
      // Pick 3 random distractors
      const distractors = words
        .filter((w) => w.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((w) => w.meaning);

      const options = [...distractors, target.meaning].sort(() => 0.5 - Math.random());

      return {
        wordItem: target,
        options,
        correctAnswer: target.meaning,
      };
    });

    setQuestions(generatedQuestions);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setWrongWords([]);
    setIsFinished(false);
  };

  useEffect(() => {
    generateQuiz();
  }, [words]);

  const currentQ = questions[currentIndex] || null;

  const handleSelectOption = (opt: string) => {
    if (isSubmitted) return;
    setSelectedOption(opt);
  };

  const handleSubmit = () => {
    if (!selectedOption || isSubmitted || !currentQ) return;
    setIsSubmitted(true);

    const isCorrect = selectedOption === currentQ.correctAnswer;
    onRecordResult(currentQ.wordItem.id, isCorrect);

    if (isCorrect) {
      setScore((s) => s + 1);
    } else {
      setWrongWords((prev) => [...prev, currentQ.wordItem]);
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
      if (score >= 7) {
        try {
          confetti({
            particleCount: 80,
            spread: 70,
            origin: { y: 0.6 },
          });
        } catch {
          // ignore if canvas blocked
        }
      }
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center max-w-md mx-auto space-y-5 shadow-lg">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-amber-400 to-amber-500 text-white flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30">
          <Trophy className="w-10 h-10 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {percentage >= 80 ? 'ยอดเยี่ยมมาก! 🎉' : percentage >= 50 ? 'ทำได้ดีมาก! 👍' : 'พยายามอีกนิดนะ! 💪'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">สรุปผลการทดสอบความจำคำศัพท์ Cambridge B1</p>
        </div>

        {/* Score Ring */}
        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl flex items-center justify-around border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">คะแนนที่ได้</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {score} / {questions.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">ความแม่นยำ</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{percentage}%</span>
          </div>
        </div>

        {/* Failed words note */}
        {wrongWords.length > 0 && (
          <div className="text-left bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/60 p-3.5 rounded-2xl">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 block mb-1">
              📌 คำที่ย้ายเข้า Focus Zone ({wrongWords.length} คำ):
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {wrongWords.map((w) => (
                <span
                  key={w.id}
                  className="text-xs bg-white dark:bg-slate-800 px-2 py-0.5 rounded-md font-semibold text-rose-600 dark:text-rose-300 border border-rose-200 dark:border-rose-800"
                >
                  {w.word}
                </span>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={generateQuiz}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm py-3 px-6 rounded-2xl transition flex items-center justify-center gap-2 shadow-md shadow-indigo-600/25 active:scale-95"
        >
          <RotateCcw className="w-4 h-4" />
          <span>เริ่มแบบทดสอบชุดใหม่ (10 ข้อ)</span>
        </button>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto">
      {/* Quiz Progress Header */}
      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold px-1">
        <span className="flex items-center gap-1.5">
          <Brain className="w-4 h-4 text-indigo-500" />
          ข้อที่ {currentIndex + 1} / {questions.length}
        </span>
        <span className="text-indigo-600 dark:text-indigo-400 font-bold">คะแนนปัจจุบัน: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-indigo-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-md text-center space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500">
            {currentQ.wordItem.category}
          </span>
          <button
            onClick={() => ttsService.speak(currentQ.wordItem.word)}
            className="p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-indigo-600 hover:bg-indigo-50 transition"
          >
            <Volume2 className="w-4 h-4" />
          </button>
        </div>

        <div className="py-2">
          <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider block mb-1">
            คำศัพท์นี้มีความหมายว่าอย่างไร?
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
            {currentQ.wordItem.word}
          </h2>
          <p className="text-xs text-slate-400 font-mono mt-0.5">({currentQ.wordItem.pos}) {currentQ.wordItem.ipa}</p>
        </div>
      </div>

      {/* 4 Choices */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';
          const isSelected = selectedOption === opt;

          if (isSubmitted) {
            if (opt === currentQ.correctAnswer) {
              btnStyle = 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
            } else if (isSelected) {
              btnStyle = 'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
            } else {
              btnStyle = 'opacity-40 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
            }
          } else if (isSelected) {
            btnStyle = 'bg-indigo-50 dark:bg-indigo-950/50 border-indigo-600 text-indigo-700 dark:text-indigo-300 font-bold ring-2 ring-indigo-500/20';
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isSubmitted}
              className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
            >
              <span className="leading-snug">{opt}</span>
              {isSubmitted && opt === currentQ.correctAnswer && (
                <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
              )}
              {isSubmitted && isSelected && opt !== currentQ.correctAnswer && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Confirm / Next Button */}
      <div className="pt-2">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={!selectedOption}
            className={`w-full py-3.5 px-4 rounded-2xl font-bold text-sm transition shadow-md ${
              selectedOption
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-600/20 active:scale-95'
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
            }`}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};
