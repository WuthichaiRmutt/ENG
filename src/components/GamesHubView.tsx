import React, { useState } from 'react';
import { Zap, Headphones, Brain, Sparkles, Trophy, Flame, ChevronRight, Award } from 'lucide-react';
import { WordItem, GameMode, UserProfile } from '../types';
import { SpeedMatchGame } from './SpeedMatchGame';
import { ListeningQuizGame } from './ListeningQuizGame';
import { QuizView } from './QuizView';

interface GamesHubViewProps {
  words: WordItem[];
  profile: UserProfile;
  onAddXP: (xp: number) => void;
  onRecordResult: (vocabId: string, isCorrect: boolean) => void;
  initialMode?: GameMode;
}

export const GamesHubView: React.FC<GamesHubViewProps> = ({
  words,
  profile,
  onAddXP,
  onRecordResult,
  initialMode = 'menu',
}) => {
  const [activeMode, setActiveMode] = useState<GameMode>(initialMode);

  if (activeMode === 'speed_match') {
    return (
      <SpeedMatchGame
        words={words}
        onAddXP={onAddXP}
        onBack={() => setActiveMode('menu')}
      />
    );
  }

  if (activeMode === 'listening') {
    return (
      <ListeningQuizGame
        words={words}
        onAddXP={onAddXP}
        onRecordResult={onRecordResult}
        onBack={() => setActiveMode('menu')}
      />
    );
  }

  if (activeMode === 'quiz') {
    return (
      <div className="space-y-4">
        <button
          onClick={() => setActiveMode('menu')}
          className="text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition flex items-center gap-1"
        >
          ← กลับหน้ารวมเกม
        </button>
        <QuizView
          words={words}
          onRecordResult={(id, correct) => {
            onRecordResult(id, correct);
            if (correct) onAddXP(5);
          }}
        />
      </div>
    );
  }

  // Calculate XP Level thresholds
  const currentXP = profile.xp || 0;
  const currentLevel = profile.level || 1;
  const nextLevelXP = currentLevel * 100;
  const currentLevelBaseXP = (currentLevel - 1) * 100;
  const levelProgress = Math.min(
    100,
    Math.max(0, Math.round(((currentXP - currentLevelBaseXP) / (nextLevelXP - currentLevelBaseXP)) * 100))
  );

  const getLevelTitle = (lvl: number) => {
    if (lvl >= 10) return 'Master Legend 👑';
    if (lvl >= 7) return 'Cambridge Expert 🏆';
    if (lvl >= 4) return 'Vocab Scholar 📚';
    if (lvl >= 2) return 'Eager Apprentice ⚡';
    return 'Novice Explorer 🌱';
  };

  return (
    <div className="space-y-4 pb-8 max-w-md mx-auto animate-fade-in">
      {/* Player XP & Level Card */}
      <div className="bg-gradient-to-r from-violet-600 via-indigo-600 to-brand-700 text-white p-4 sm:p-5 rounded-3xl shadow-xl shadow-indigo-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 -mr-6 -mt-6 w-32 h-32 bg-white/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-amber-300 shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-semibold text-indigo-200 block uppercase tracking-wider">
                  ระดับของคุณ
                </span>
                <h3 className="text-base font-black text-white leading-tight">
                  Lv. {currentLevel} • {getLevelTitle(currentLevel)}
                </h3>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-black bg-white/20 px-2.5 py-1 rounded-full text-indigo-100 whitespace-nowrap">
                ⚡ {currentXP} XP
              </span>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-indigo-200 font-semibold">
              <span>ความก้าวหน้าสู่ Lv. {currentLevel + 1}</span>
              <span>{levelProgress}%</span>
            </div>
            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${levelProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mode Selection Header */}
      <div className="px-1 pt-1">
        <h3 className="text-base font-black text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
          <span>🎮</span> ศูนย์รวมเกมและการทดสอบ
        </h3>
        <p className="text-xs text-slate-400 mt-0.5">เลือกโหมดการเรียนรู้ที่ต้องการฝึกฝนเพื่อรับ XP</p>
      </div>

      {/* 3 Game Cards */}
      <div className="space-y-3">
        {/* Game 1: Speed Match */}
        <div
          onClick={() => setActiveMode('speed_match')}
          className="group bg-white dark:bg-slate-900 border border-amber-200/90 dark:border-amber-900/60 hover:border-amber-500 rounded-3xl p-4 shadow-sm transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3 relative overflow-hidden"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 text-white flex items-center justify-center shrink-0 shadow-md shadow-amber-500/30 group-hover:scale-105 transition-transform">
              <Zap className="w-6 h-6 fill-white" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-50">
                  Speed Match (จับคู่ด่วน)
                </h4>
                <span className="text-[10px] font-bold bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                  ยอดฮิต 🔥
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                จับคู่ศัพท์อังกฤษกับความหมาย แข่งกับเวลา 45 วินาที มี Combo!
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-amber-500 group-hover:translate-x-0.5 transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Game 2: Listening Challenge */}
        <div
          onClick={() => setActiveMode('listening')}
          className="group bg-white dark:bg-slate-900 border border-purple-200/90 dark:border-purple-900/60 hover:border-purple-500 rounded-3xl p-4 shadow-sm transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3 relative overflow-hidden"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/30 group-hover:scale-105 transition-transform">
              <Headphones className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-50">
                  Listening Challenge
                </h4>
                <span className="text-[10px] font-bold bg-purple-100 dark:bg-purple-950/60 text-purple-700 dark:text-purple-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                  ฝึกทักษะหู 🎧
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                ฟังเสียงอ่านเจ้าของภาษา ปิดตัวหนังสือแล้วทายคำแปลที่ถูกต้อง
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-500 group-hover:translate-x-0.5 transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>

        {/* Game 3: Multiple Choice Quiz */}
        <div
          onClick={() => setActiveMode('quiz')}
          className="group bg-white dark:bg-slate-900 border border-indigo-200/90 dark:border-indigo-900/60 hover:border-indigo-500 rounded-3xl p-4 shadow-sm transition-all cursor-pointer active:scale-98 flex items-center justify-between gap-3 relative overflow-hidden"
        >
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-brand-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-indigo-500/30 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <h4 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-50">
                  แบบทดสอบ 4 ตัวเลือก
                </h4>
                <span className="text-[10px] font-bold bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 px-2 py-0.5 rounded-full whitespace-nowrap">
                  วัดผลแม่นยำ 🎯
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                แบบทดสอบคำศัพท์ 10 ข้อ คำที่ตอบผิดจะถูกส่งเข้า Focus Zone ทันที
              </p>
            </div>
          </div>

          <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover:text-indigo-500 group-hover:translate-x-0.5 transition-all shrink-0">
            <ChevronRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};
