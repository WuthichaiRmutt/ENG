import React, { useState, useEffect } from 'react';
import { Volume2, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, ArrowLeft, Headphones } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { ttsService } from '../lib/tts';
import { soundFx } from '../lib/soundFx';

interface ListeningQuizGameProps {
  words: WordItem[];
  onAddXP: (xp: number) => void;
  onRecordResult: (vocabId: string, isCorrect: boolean) => void;
  onBack: () => void;
}

interface ListeningQuestion {
  wordItem: WordItem;
  options: string[];
  correctAnswer: string;
}

export const ListeningQuizGame: React.FC<ListeningQuizGameProps> = ({
  words,
  onAddXP,
  onRecordResult,
  onBack,
}) => {
  const [questions, setQuestions] = useState<ListeningQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const generateQuiz = () => {
    if (words.length < 4) return;
    const shuffled = [...words].sort(() => 0.5 - Math.random()).slice(0, 10);

    const generated: ListeningQuestion[] = shuffled.map((target) => {
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

    setQuestions(generated);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  useEffect(() => {
    generateQuiz();
  }, [words]);

  const currentQ = questions[currentIndex] || null;

  // Auto-play audio when question changes
  useEffect(() => {
    if (currentQ && !isFinished) {
      const timer = setTimeout(() => {
        ttsService.speak(currentQ.wordItem.word);
      }, 250);
      return () => clearTimeout(timer);
    }
  }, [currentIndex, currentQ, isFinished]);

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    onRecordResult(currentQ.wordItem.id, isCorrect);

    if (isCorrect) {
      soundFx.playCorrect();
      setScore((s) => s + 1);
      onAddXP(5);
    } else {
      soundFx.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundFx.playLevelUp();
      if (score >= 6) {
        try {
          confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/30">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {percentage >= 80 ? 'หูทองคำ! ยอดเยี่ยมมาก 🎉' : 'ทำได้ดีมากครับ! 👍'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">สรุปคะแนนทักษะการฟัง (Listening Challenge)</p>
        </div>

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

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onBack}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs py-3 rounded-2xl transition"
          >
            กลับหน้ารวมเกม
          </button>
          <button
            onClick={generateQuiz}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs py-3 rounded-2xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ฟังชุดใหม่ (10 ข้อ)</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  return (
    <div className="max-w-md mx-auto space-y-4 pb-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ออก</span>
        </button>

        <span className="flex items-center gap-1 text-indigo-600 dark:text-indigo-400 font-bold">
          <Headphones className="w-4 h-4" />
          ข้อที่ {currentIndex + 1} / {questions.length}
        </span>

        <span className="text-slate-400">คะแนน: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-600 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Audio Speaker Hero Card */}
      <div className="bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white rounded-3xl p-6 text-center shadow-lg shadow-indigo-500/20 space-y-3">
        <span className="text-[11px] font-bold uppercase tracking-wider text-purple-200 block">
          ฟังเสียงอ่านแล้วเลือกคำแปลที่ถูกต้อง
        </span>

        <button
          onClick={() => ttsService.speak(currentQ.wordItem.word)}
          className="w-20 h-20 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md text-white flex items-center justify-center mx-auto shadow-md active:scale-90 transition-transform"
          title="แตะเพื่อฟังเสียงอีกครั้ง"
        >
          <Volume2 className="w-10 h-10 animate-pulse" />
        </button>

        <p className="text-xs text-purple-100 font-medium">แตะที่ลำโพงเพื่อฟังซ้ำอีกครั้ง</p>

        {/* Revealed word after answer */}
        {isAnswered && (
          <div className="pt-2 animate-fade-in">
            <span className="text-2xl font-black block tracking-tight">
              {currentQ.wordItem.word}
            </span>
            <span className="text-xs text-purple-200 font-mono">
              ({currentQ.wordItem.pos}) {currentQ.wordItem.ipa}
            </span>
          </div>
        )}
      </div>

      {/* 4 Choices */}
      <div className="space-y-2.5">
        {currentQ.options.map((opt, idx) => {
          let btnStyle =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400';

          if (isAnswered) {
            if (opt === currentQ.correctAnswer) {
              btnStyle =
                'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold';
            } else if (selectedOption === opt) {
              btnStyle =
                'bg-rose-50 dark:bg-rose-950/50 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
            } else {
              btnStyle = 'opacity-40 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`w-full p-3.5 rounded-2xl border text-left text-sm transition-all flex items-center justify-between gap-2 shadow-xs ${btnStyle}`}
            >
              <span className="flex-1 min-w-0 leading-relaxed text-left break-words">{opt}</span>
              {isAnswered && opt === currentQ.correctAnswer && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-1.5" />
              )}
              {isAnswered && selectedOption === opt && opt !== currentQ.correctAnswer && (
                <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-1.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={handleNext}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
