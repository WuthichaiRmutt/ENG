import React, { useState, useRef, useEffect } from 'react';
import {
  Flame,
  Cloud,
  AlertCircle,
  Sun,
  Moon,
  Sparkles,
  Check,
  Volume2,
  VolumeX,
  Zap,
  Download,
  Settings,
  X,
  Target,
} from 'lucide-react';
import { UserProfile } from '../types';
import { soundFx } from '../lib/soundFx';

interface HeaderProps {
  profile: UserProfile;
  cloudStatus: 'offline' | 'connected' | 'syncing' | 'error';
  isCloudSyncing: boolean;
  onOpenCloudModal: () => void;
  onOpenInstallModal?: () => void;
  isDark: boolean;
  onToggleDark: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  cloudStatus,
  isCloudSyncing,
  onOpenCloudModal,
  onOpenInstallModal,
  isDark,
  onToggleDark,
}) => {
  const [soundOn, setSoundOn] = useState(() => soundFx.isEnabled());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const goalProgress = Math.min(100, Math.round((profile.studiedTodayCount / profile.dailyGoal) * 100));

  const handleToggleSound = () => {
    const newState = soundFx.toggle();
    setSoundOn(newState);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/70 dark:border-slate-800/70 transition-colors">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-5 h-14 sm:h-16 flex items-center justify-between gap-3">
        {/* Sleek Brand Logo (Single-Line, No Ugly Wrapping) */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-brand-500 flex items-center justify-center text-white shadow-sm shadow-indigo-500/30 shrink-0">
            <Sparkles className="w-4 h-4 sm:w-4.5 sm:h-4.5" />
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-black text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
              PET B1
            </span>
            <span className="font-extrabold text-[11px] sm:text-xs text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Academy
            </span>
            <span className="hidden sm:inline-block text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-md">
              520 คำ
            </span>
          </div>
        </div>

        {/* Right Stats & Clean Action Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Daily Goal Badge */}
          <div
            className="flex items-center gap-1.5 bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/70 dark:hover:bg-slate-700/60 border border-slate-200/60 dark:border-slate-700/50 px-2.5 py-1 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            title={`เป้าหมายวันนี้: ${profile.studiedTodayCount}/${profile.dailyGoal} คำ (${goalProgress}%)`}
          >
            <Target className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400 shrink-0" />
            <span className="font-bold text-[11px] tabular-nums">
              {profile.studiedTodayCount}/{profile.dailyGoal}
            </span>
          </div>

          {/* Streak Badge */}
          <div
            className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold shadow-2xs whitespace-nowrap"
            title={`เรียนต่อเนื่อง ${profile.streakDays} วัน`}
          >
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500 animate-pulse shrink-0" />
            <span className="font-black text-[11px] tabular-nums">{profile.streakDays}</span>
          </div>

          {/* Quick Install Button (Visible on tablet/desktop, also in menu) */}
          {onOpenInstallModal && (
            <button
              onClick={onOpenInstallModal}
              className="hidden sm:flex items-center gap-1 bg-gradient-to-r from-indigo-600 to-brand-600 hover:from-indigo-700 hover:to-brand-700 text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs active:scale-95 transition-all whitespace-nowrap"
            >
              <Download className="w-3.5 h-3.5" />
              <span>ติดตั้งแอป</span>
            </button>
          )}

          {/* Settings & Quick Controls Menu Trigger */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setIsMenuOpen((prev) => !prev)}
              className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all ${
                isMenuOpen
                  ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200/80 dark:border-slate-700/80 hover:bg-slate-200/80 dark:hover:bg-slate-700'
              }`}
              title="เมนูตั้งค่าและเครื่องมือ"
            >
              <Settings className={`w-4 h-4 transition-transform duration-200 ${isMenuOpen ? 'rotate-45' : ''}`} />
            </button>

            {/* Premium Slide-Down Settings Popover */}
            {isMenuOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-800 p-3 z-50 space-y-2 animate-fade-in text-xs">
                {/* User Level Header in Menu */}
                <div className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white p-3 rounded-2xl flex items-center justify-between shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center text-amber-300">
                      <Zap className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="text-[10px] text-indigo-200 font-semibold block leading-none">
                        ผู้เรียนระดับ
                      </span>
                      <strong className="text-xs font-black text-white">
                        Lv.{profile.level || 1}
                      </strong>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded-full">
                    {profile.xp || 0} XP
                  </span>
                </div>

                {/* Option 1: Install App */}
                {onOpenInstallModal && (
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      onOpenInstallModal();
                    }}
                    className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/40 text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400 transition group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-105 transition-transform">
                        <Download className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-bold">ติดตั้งแอปลงบนมือถือ</span>
                    </div>
                    <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-full">
                      PWA
                    </span>
                  </button>
                )}

                {/* Option 2: Sound Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      {soundOn ? <Volume2 className="w-3.5 h-3.5 text-indigo-500" /> : <VolumeX className="w-3.5 h-3.5 text-slate-400" />}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">เสียงเอฟเฟกต์</span>
                  </div>
                  <button
                    onClick={handleToggleSound}
                    className={`text-[11px] font-extrabold px-2.5 py-1 rounded-xl transition ${
                      soundOn
                        ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950/80 dark:text-indigo-300'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {soundOn ? 'เปิดอยู่' : 'ปิด'}
                  </button>
                </div>

                {/* Option 3: Theme Toggle */}
                <div className="flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 transition">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center">
                      {isDark ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                    </div>
                    <span className="font-bold text-slate-700 dark:text-slate-200">ธีมหน้าจอ</span>
                  </div>
                  <button
                    onClick={onToggleDark}
                    className="text-[11px] font-extrabold px-2.5 py-1 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 transition"
                  >
                    {isDark ? 'โหมดมืด 🌙' : 'โหมดสว่าง ☀️'}
                  </button>
                </div>

                {/* Option 4: Supabase Cloud Sync */}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    onOpenCloudModal();
                  }}
                  className="w-full flex items-center justify-between p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 transition"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-7 h-7 rounded-xl flex items-center justify-center ${
                        cloudStatus === 'connected'
                          ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400'
                          : cloudStatus === 'syncing'
                          ? 'bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 animate-spin'
                          : cloudStatus === 'error'
                          ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                      }`}
                    >
                      {cloudStatus === 'connected' ? (
                        <Check className="w-3.5 h-3.5 stroke-[3px]" />
                      ) : cloudStatus === 'error' ? (
                        <AlertCircle className="w-3.5 h-3.5" />
                      ) : (
                        <Cloud className="w-3.5 h-3.5" />
                      )}
                    </div>
                    <span className="font-bold">คลาวด์ซิงก์ (Supabase)</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      cloudStatus === 'connected'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400'
                    }`}
                  >
                    {cloudStatus === 'connected' ? 'เชื่อมต่อแล้ว' : 'ออฟไลน์'}
                  </span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
