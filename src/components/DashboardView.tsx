import React from 'react';
import {
  Trophy,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ArrowRight,
  Sparkles,
  Layers,
  Brain,
  TrendingUp,
  Gamepad2,
  Zap,
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface DashboardViewProps {
  stats: {
    total: number;
    mastered: number;
    focus: number;
    inProgress: number;
    dueReview: number;
    boxDistribution: Record<number, number>;
    completionRate: number;
  };
  profile: UserProfile;
  onNavigateTab: (tab: ActiveTab, filterMode?: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ stats, profile, onNavigateTab }) => {
  return (
    <div className="space-y-4 pb-20 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* Apple Clean Title */}
      <div className="pt-1 pb-1">
        <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
          Learning Analytics
        </span>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
          สถิติภาพรวม
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
          จำได้แล้ว {stats.mastered} จาก {stats.total} คำ ({stats.completionRate}%)
        </p>
      </div>

      {/* 4 Core Stat Cards in Clean Apple Style */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Total Words */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-slate-200/70 dark:border-white/[0.08] p-4 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">คำศัพท์ทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-2">{stats.total}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">Cambridge B1</p>
        </div>

        {/* Mastered Bank */}
        <div
          onClick={() => onNavigateTab('wordbank', 'mastered')}
          className="bg-white dark:bg-[#1C1C1E] border border-slate-200/70 dark:border-white/[0.08] p-4 rounded-3xl shadow-xs cursor-pointer hover:border-emerald-400 transition ios-spring"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">จำได้แม่นแล้ว</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">{stats.mastered}</div>
          <p className="text-[11px] text-emerald-600/70 dark:text-emerald-400/70 mt-0.5">Mastered Bank</p>
        </div>

        {/* Focus Zone */}
        <div
          onClick={() => onNavigateTab('flashcards', 'focus')}
          className="bg-white dark:bg-[#1C1C1E] border border-slate-200/70 dark:border-white/[0.08] p-4 rounded-3xl shadow-xs cursor-pointer hover:border-rose-400 transition ios-spring"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-600 dark:text-rose-400">ยังไม่แม่น</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 text-rose-500 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-2">{stats.focus}</div>
          <p className="text-[11px] text-rose-500/80 mt-0.5">Focus Zone (รอทบทวน)</p>
        </div>

        {/* Learning In Progress */}
        <div className="bg-white dark:bg-[#1C1C1E] border border-slate-200/70 dark:border-white/[0.08] p-4 rounded-3xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">กำลังเรียน</span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center shrink-0">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">{stats.inProgress}</div>
          <p className="text-[11px] text-amber-600/70 mt-0.5">In Progress</p>
        </div>
      </div>

      {/* Focus Zone Urgent Review Banner (If any) */}
      {stats.focus > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 p-3.5 sm:p-4 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
          <div className="flex items-start sm:items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0 mt-0.5 sm:mt-0">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-rose-900 dark:text-rose-200 leading-tight">
                <span className="inline-block">มี {stats.focus} คำใน Focus Zone</span>{' '}
                <span className="inline-block">ที่รอทบทวน</span>
              </h4>
              <p className="text-[11px] text-rose-700 dark:text-rose-300 mt-0.5 leading-snug">
                <span className="inline-block">ทบทวนคำที่ยังไม่แม่น</span>{' '}
                <span className="inline-block">เพื่อความแม่นยำก่อนสอบ</span>
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('flashcards', 'focus')}
            className="self-end sm:self-center shrink-0 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-[11px] font-bold px-3 py-1.5 rounded-xl transition shadow-xs whitespace-nowrap"
          >
            ทบทวนทันที
          </button>
        </div>
      )}

      {/* Spaced Repetition Leitner Box Visualizer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-3 sm:p-4 shadow-xs">
        <div className="flex items-center justify-between mb-2.5 gap-2">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5 whitespace-nowrap">
              <span>🗃️</span> กล่องความจำ Leitner SRS
            </h3>
            <p className="text-[10px] sm:text-xs text-slate-400 mt-0.5">
              <span className="inline-block">ระบบรอบทบทวน</span>{' '}
              <span className="inline-block">ตามความแม่นยำ</span>
            </p>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md whitespace-nowrap shrink-0">
            5 ระดับ
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1 sm:gap-2 text-center pt-1">
          {[
            { level: 1, name: 'Box 1', time: '1 วัน', color: 'bg-rose-500' },
            { level: 2, name: 'Box 2', time: '3 วัน', color: 'bg-orange-500' },
            { level: 3, name: 'Box 3', time: '7 วัน', color: 'bg-amber-500' },
            { level: 4, name: 'Box 4', time: '14 วัน', color: 'bg-blue-500' },
            { level: 5, name: 'Box 5', time: '30 วัน', color: 'bg-emerald-500' },
          ].map((b) => {
            const count = stats.boxDistribution[b.level] || 0;
            const pct = Math.max(8, Math.min(100, Math.round((count / stats.total) * 100)));

            return (
              <div
                key={b.level}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-xl py-1.5 px-1 sm:p-2 border border-slate-200/60 dark:border-slate-700/50 flex flex-col justify-between"
              >
                <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                  {b.name}
                </span>
                <div className="my-1 sm:my-1.5">
                  <div className="text-xs sm:text-base font-black text-slate-800 dark:text-slate-100">{count}</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1 sm:h-1.5 rounded-full overflow-hidden mt-0.5">
                    <div className={`h-full ${b.color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] text-slate-400 whitespace-nowrap">{b.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
