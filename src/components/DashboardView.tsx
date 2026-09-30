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
    <div className="space-y-5 pb-6">
      {/* Hero Learning Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-brand-800 text-white p-5 shadow-xl shadow-indigo-500/20">
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-white/20 backdrop-blur-md text-indigo-50">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              เป้าหมาย B1 เคมบริดจ์
            </span>
            <span className="text-xs font-bold text-indigo-100 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              ความสำเร็จ {stats.completionRate}%
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black tracking-tight leading-tight">
            พร้อมอัปเกรดคำศัพท์วันนี้แล้วหรือยัง?
          </h2>
          <p className="text-xs sm:text-sm text-indigo-100/90 mt-1 max-w-sm">
            ท่องคำศัพท์ด้วยระบบ Spaced Repetition (SRS) เพื่อความจำระยะยาวก่อนสอบจริง
          </p>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-2.5 mt-4">
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="flex-1 min-w-[140px] bg-white text-indigo-700 hover:bg-indigo-50 active:scale-95 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2"
            >
              <Layers className="w-4 h-4" />
              <span>เริ่มท่องการ์ด</span>
              <ArrowRight className="w-4 h-4 ml-0.5" />
            </button>

            <button
              onClick={() => onNavigateTab('quiz')}
              className="bg-indigo-500/40 hover:bg-indigo-500/60 border border-white/30 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl transition flex items-center justify-center gap-1.5 active:scale-95"
            >
              <Brain className="w-4 h-4" />
              <span>ทำแบบทดสอบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Total Words */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">คำศัพท์ทั้งหมด</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 dark:text-slate-100 mt-2">{stats.total}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">มาตรฐาน Cambridge B1</p>
        </div>

        {/* Mastered Bank */}
        <div
          onClick={() => onNavigateTab('wordbank', 'mastered')}
          className="bg-white dark:bg-slate-900 border border-emerald-200/80 dark:border-emerald-900/50 p-3.5 rounded-2xl shadow-xs cursor-pointer hover:border-emerald-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400">รู้แล้ว (Mastered)</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-2">{stats.mastered}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">จำได้แม่นยำถาวร</p>
        </div>

        {/* Focus Zone */}
        <div
          onClick={() => onNavigateTab('flashcards', 'focus')}
          className="bg-white dark:bg-slate-900 border border-rose-200/80 dark:border-rose-900/50 p-3.5 rounded-2xl shadow-xs cursor-pointer hover:border-rose-400 transition"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">ยังไม่แม่น (Focus)</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-600 dark:text-rose-400 mt-2">{stats.focus}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">ต้องทบทวนพิเศษ</p>
        </div>

        {/* Learning In Progress */}
        <div className="bg-white dark:bg-slate-900 border border-amber-200/80 dark:border-amber-900/50 p-3.5 rounded-2xl shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">กำลังเรียนรู้</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Trophy className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-amber-600 dark:text-amber-400 mt-2">{stats.inProgress}</div>
          <p className="text-[11px] text-slate-400 mt-0.5">ในระบบกล่อง SRS</p>
        </div>
      </div>

      {/* Focus Zone Urgent Review Banner (If any) */}
      {stats.focus > 0 && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/60 p-4 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/50 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-rose-900 dark:text-rose-200">
                มี {stats.focus} คำใน Focus Zone ที่รอทบทวน
              </h4>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                คำที่เคยตอบผิดหรือยังจำไม่แม่น ทบทวนซ้ำเพื่อกู้คืนคะแนน
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateTab('flashcards', 'focus')}
            className="shrink-0 bg-rose-600 hover:bg-rose-700 active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-xs"
          >
            ทบทวนทันที
          </button>
        </div>
      )}

      {/* Spaced Repetition Leitner Box Visualizer */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
              <span>🗃️</span> กล่องความจำ Leitner Spaced Repetition (SRS)
            </h3>
            <p className="text-xs text-slate-400">ระบบจำแนกระดับความถี่ในการทบทวนตามความแม่นยำ</p>
          </div>
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-md">
            5 กล่อง
          </span>
        </div>

        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 text-center pt-2">
          {[
            { level: 1, name: 'Box 1', time: 'ทุก 1 วัน', color: 'bg-rose-500' },
            { level: 2, name: 'Box 2', time: 'ทุก 3 วัน', color: 'bg-orange-500' },
            { level: 3, name: 'Box 3', time: 'ทุก 7 วัน', color: 'bg-amber-500' },
            { level: 4, name: 'Box 4', time: 'ทุก 14 วัน', color: 'bg-blue-500' },
            { level: 5, name: 'Box 5', time: 'ทุก 30 วัน', color: 'bg-emerald-500' },
          ].map((b) => {
            const count = stats.boxDistribution[b.level] || 0;
            const pct = Math.max(8, Math.min(100, Math.round((count / stats.total) * 100)));

            return (
              <div
                key={b.level}
                className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-2.5 border border-slate-200/60 dark:border-slate-700/50 flex flex-col justify-between"
              >
                <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300">{b.name}</span>
                <div className="my-2">
                  <div className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">{count}</div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className={`h-full ${b.color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <span className="text-[10px] text-slate-400">{b.time}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
