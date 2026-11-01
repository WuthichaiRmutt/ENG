import React, { useState } from 'react';
import { Zap, Headphones, Brain, Sparkles, Trophy, Flame, ChevronRight, Award, FileText } from 'lucide-react';
import { WordItem, GameMode, UserProfile } from '../types';
import { SpeedMatchGame } from './SpeedMatchGame';
import { ListeningQuizGame } from './ListeningQuizGame';
import { QuizView } from './QuizView';
import { ClozeTestGame } from './ClozeTestGame';

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

  if (activeMode === 'cloze') {
    return (
      <ClozeTestGame
        words={words}
        onAddXP={onAddXP}
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

      {/* 🍎 Mode Selection Section */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
          เลือกเกมฝึกคำศัพท์
        </h3>

        {/* Apple Inset Grouped List */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-xs border border-slate-200/70 dark:border-white/[0.08] divide-y divide-slate-100 dark:divide-white/[0.06] overflow-hidden">
          {/* Game 1: Speed Match */}
          <div
            onClick={() => setActiveMode('speed_match')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
                <Zap className="w-5 h-5 fill-current" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  Speed Match (จับคู่ด่วน)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  จับคู่ศัพท์อังกฤษกับความหมาย แข่งเวลา 45 วินาที
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
          </div>

          {/* Game 2: Listening Challenge */}
          <div
            onClick={() => setActiveMode('listening')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  Listening Challenge (ฟังเสียงอ่าน)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  ฟังเสียงอ่านสำเนียงเจ้าของภาษา แล้วทายคำแปลที่ถูกต้อง
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
          </div>

          {/* Game 3: Contextual Cloze Test */}
          <div
            onClick={() => setActiveMode('cloze')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  Contextual Cloze (เติมคำในประโยค)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  เลือกรูปคำศัพท์และ Part of Speech ที่ถูกต้องลงในบริบท
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
          </div>

          {/* Game 4: Multiple Choice Quiz */}
          <div
            onClick={() => setActiveMode('quiz')}
            className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-10 h-10 rounded-2xl bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0">
                <Brain className="w-5 h-5" />
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  แบบทดสอบ 4 ตัวเลือก (Quiz)
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  แบบทดสอบความจำ 10 ข้อ มีจับเวลาและเก็บคะแนน XP
                </p>
              </div>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
          </div>
        </div>
      </div>
    </div>
  );
};
