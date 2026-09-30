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
    <div className="space-y-4 sm:space-y-5 pb-6">
      {/* 🚀 Deployment Verification Banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-3 sm:p-3.5 rounded-2xl shadow-md flex items-center justify-between gap-2 border border-emerald-400/40">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="flex h-2.5 w-2.5 relative shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white"></span>
          </span>
          <span className="text-xs font-bold leading-tight truncate">
            ✨ อัปเดตระบบ V2.0 (ปรับแก้ตัดคำมือถือแล้ว)
          </span>
        </div>
        <span className="text-[10px] font-extrabold bg-white/20 backdrop-blur-sm px-2 py-0.5 rounded-full shrink-0">
          VERIFIED
        </span>
      </div>

      {/* Hero Learning Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-brand-800 text-white p-4 sm:p-5 shadow-xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-2.5 gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-white/20 backdrop-blur-md text-indigo-50 whitespace-nowrap shrink-0">
              <Sparkles className="w-3 h-3 text-amber-300 shrink-0" />
              เป้าหมาย B1 เคมบริดจ์
            </span>
            <span className="text-[11px] font-bold text-indigo-100 flex items-center gap-1 whitespace-nowrap shrink-0">
              <TrendingUp className="w-3 h-3 shrink-0" />
              สำเร็จ {stats.completionRate}%
            </span>
          </div>

          <h2 className="text-lg sm:text-2xl font-black tracking-tight leading-snug">
            <span className="inline-block">พร้อมอัปเกรดคำศัพท์</span>{' '}
            <span className="inline-block">วันนี้แล้วหรือยัง?</span>
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 leading-relaxed">
            <span className="inline-block">ทบทวนด้วยระบบ SRS</span>{' '}
            <span className="inline-block">จำศัพท์ได้แม่นยำระยะยาว</span>
          </p>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 mt-3.5">
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="bg-white text-indigo-700 hover:bg-indigo-50 active:scale-95 font-bold text-xs sm:text-sm py-2.5 px-2.5 sm:px-3 rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
            >
              <Layers className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">เริ่มท่องการ์ด</span>
              <ArrowRight className="w-3.5 h-3.5 shrink-0 hidden xs:inline" />
            </button>

            <button
              onClick={() => onNavigateTab('quiz')}
              className="bg-indigo-500/40 hover:bg-indigo-500/60 border border-white/30 text-white font-bold text-xs sm:text-sm py-2.5 px-2.5 sm:px-3 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Brain className="w-4 h-4 shrink-0" />
              <span className="whitespace-nowrap">ทำแบบทดสอบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
        {/* Total Words */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-3 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 whitespace-nowrap">ทั้งหมด</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
              <BookOpen className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-slate-800 dark:text-slate-100 mt-1">{stats.total}</div>
          <p className="text-[10px] text-slate-400 mt-0.5 whitespace-nowrap">Cambridge B1</p>
        </div>

        {/* Mastered Bank */}
        <div
          onClick={() => onNavigateTab('wordbank', 'mastered')}
          className="bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/50 p-3 rounded-2xl shadow-xs cursor-pointer hover:border-emerald-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 whitespace-nowrap">รู้แล้ว</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">{stats.mastered}</div>
          <p className="text-[10px] text-emerald-600/70 dark:text-emerald-400/70 mt-0.5 whitespace-nowrap">Mastered Bank</p>
        </div>

        {/* Focus Zone */}
        <div
          onClick={() => onNavigateTab('flashcards', 'focus')}
          className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 p-3 rounded-2xl shadow-xs cursor-pointer hover:border-rose-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400 whitespace-nowrap">ยังไม่แม่น</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-rose-600 dark:text-rose-400 mt-1">{stats.focus}</div>
          <p className="text-[10px] text-rose-500/80 mt-0.5 whitespace-nowrap">Focus Zone</p>
        </div>

        {/* Learning In Progress */}
        <div className="bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/50 p-3 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 whitespace-nowrap">กำลังเรียน</span>
            <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
              <Trophy className="w-3.5 h-3.5" />
            </div>
          </div>
          <div className="text-xl sm:text-2xl font-black text-amber-600 dark:text-amber-400 mt-1">{stats.inProgress}</div>
          <p className="text-[10px] text-amber-600/70 mt-0.5 whitespace-nowrap">In Progress</p>
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
