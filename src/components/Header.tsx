import React from 'react';
import { Flame, Cloud, CloudOff, AlertCircle, Sun, Moon, Sparkles, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface HeaderProps {
  profile: UserProfile;
  cloudStatus: 'offline' | 'connected' | 'syncing' | 'error';
  isCloudSyncing: boolean;
  onOpenCloudModal: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  cloudStatus,
  isCloudSyncing,
  onOpenCloudModal,
  isDark,
  onToggleDark,
}) => {
  const goalProgress = Math.min(100, Math.round((profile.studiedTodayCount / profile.dailyGoal) * 100));

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-brand-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg bg-gradient-to-r from-indigo-600 to-brand-500 bg-clip-text text-transparent leading-none">
              PET B1 Academy
            </h1>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Cambridge 500+ Words</p>
          </div>
        </div>

        {/* Right Badges & Controls */}
        <div className="flex items-center gap-2">
          {/* Daily Goal Chip */}
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200">
            <span className="text-indigo-600 dark:text-indigo-400">🎯</span>
            <span>
              {profile.studiedTodayCount}/{profile.dailyGoal}
            </span>
            <div className="w-8 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden ml-0.5">
              <div
                className="h-full bg-gradient-to-r from-indigo-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: `${goalProgress}%` }}
              />
            </div>
          </div>

          {/* Streak Flame */}
          <div className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold shadow-xs">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse" />
            <span>{profile.streakDays} วัน</span>
          </div>

          {/* Supabase Status Button */}
          <button
            onClick={onOpenCloudModal}
            className={`p-1.5 rounded-full border transition-all ${
              cloudStatus === 'connected'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100'
                : cloudStatus === 'syncing'
                ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800 animate-spin'
                : cloudStatus === 'error'
                ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:text-slate-700'
            }`}
            title="ตั้งค่าเชื่อมต่อ Supabase Database"
          >
            {cloudStatus === 'connected' ? (
              <Check className="w-4 h-4 stroke-[3px]" />
            ) : cloudStatus === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <Cloud className="w-4 h-4" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleDark}
            className="p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            title="สลับโหมดมืด/สว่าง"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
};
