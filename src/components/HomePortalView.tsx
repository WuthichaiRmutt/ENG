import React from 'react';
import {
  Layers,
  BookOpen,
  Brain,
  Gamepad2,
  FileCheck,
  ChevronRight,
  TrendingUp,
  Flame,
  Zap,
  Play,
  LayoutDashboard,
} from 'lucide-react';
import { ActiveTab, GameMode, UserProfile } from '../types';

interface HomePortalViewProps {
  stats: {
    total: number;
    mastered: number;
    focus: number;
    inProgress: number;
    completionRate: number;
  };
  profile: UserProfile;
  onNavigateTab: (tab: ActiveTab, filterMode?: string, gameMode?: GameMode) => void;
}

export const HomePortalView: React.FC<HomePortalViewProps> = ({
  stats,
  profile,
  onNavigateTab,
}) => {
  const menuItems = [
    {
      id: 'mock-exam',
      title: 'ข้อสอบจำลอง CBT',
      desc: 'ฝึกทำข้อสอบ B1 ฟังเสียง อ่านบทความ และจับเวลาสอบจริง',
      icon: FileCheck,
      iconColor: 'text-purple-500',
      iconBg: 'bg-purple-500/10 dark:bg-purple-500/20',
      action: () => onNavigateTab('exam'),
    },
    {
      id: 'quiz',
      title: 'แบบทดสอบความจำ (Quiz)',
      desc: 'ควิซศัพท์ 4 ตัวเลือก วัดความจำพร้อมสะสม XP',
      icon: Brain,
      iconColor: 'text-pink-500',
      iconBg: 'bg-pink-500/10 dark:bg-pink-500/20',
      action: () => onNavigateTab('games', undefined, 'quiz'),
    },
    {
      id: 'wordbank',
      title: 'คลังคำศัพท์ทั้งหมด',
      desc: 'ค้นหา 520 คำ พร้อมคำแปล ชนิดคำ และตัวอย่างประโยค',
      icon: BookOpen,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-500/10 dark:bg-blue-500/20',
      action: () => onNavigateTab('wordbank'),
    },
    {
      id: 'games',
      title: 'ศูนย์รวมเกมคำศัพท์',
      desc: 'Speed Match จับคู่, ทายเสียงอ่าน, และเติมคำในช่องว่าง',
      icon: Gamepad2,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-500/10 dark:bg-amber-500/20',
      action: () => onNavigateTab('games'),
    },
    {
      id: 'dashboard',
      title: 'สถิติและความก้าวหน้า',
      desc: 'ดูกราฟ SRS กล่องความจำ Leitner 5 ระดับ',
      icon: LayoutDashboard,
      iconColor: 'text-emerald-500',
      iconBg: 'bg-emerald-500/10 dark:bg-emerald-500/20',
      action: () => onNavigateTab('dashboard'),
    },
  ];

  return (
    <div className="space-y-4 pb-20 animate-fade-in text-slate-800 dark:text-slate-100">
      {/* 🍎 1. Clean Apple Title & Daily Rings */}
      <div className="pt-1 pb-1 flex items-end justify-between">
        <div>
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            PET B1 Vocabulary
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            เรียนรู้คำศัพท์
          </h1>
        </div>

        {/* Minimal Apple Status Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 px-2.5 py-1 rounded-full text-xs font-bold">
            <Flame className="w-3.5 h-3.5 fill-current" />
            <span>{profile.streakDays} วัน</span>
          </div>
          <div className="flex items-center gap-1 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-2.5 py-1 rounded-full text-xs font-bold">
            <Zap className="w-3.5 h-3.5 fill-current" />
            <span>{profile.xp || 0} XP</span>
          </div>
        </div>
      </div>

      {/* 🍎 2. Single Hero Learning Card (Apple Clean Card) */}
      <div
        onClick={() => onNavigateTab('flashcards')}
        className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg shadow-indigo-600/20 cursor-pointer ios-spring relative overflow-hidden"
      >
        <div className="relative z-10 space-y-3">
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-xs font-bold text-indigo-100 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>สำเร็จ {stats.completionRate}%</span>
            </span>
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight text-white">
              ท่องจำคำศัพท์วันนี้
            </h2>
            <p className="text-xs text-indigo-100/90 mt-0.5">
              ระบบทบทวน SRS ช่วยให้จำคำศัพท์ได้ระยะยาว
            </p>
          </div>

          {/* Simple Clean Progress Bar */}
          <div className="space-y-1.5 pt-1">
            <div className="w-full bg-black/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-white h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, stats.completionRate)}%` }}
              />
            </div>
            <div className="flex justify-between text-[11px] text-indigo-100 font-semibold">
              <span>จำได้แล้ว {stats.mastered} จาก {stats.total} คำ</span>
              <span>{stats.total - stats.mastered} คำที่รอเรียน</span>
            </div>
          </div>

          <div className="pt-2">
            <button className="w-full bg-white text-indigo-700 font-black text-xs py-3 rounded-2xl shadow-sm flex items-center justify-center gap-1.5 active:scale-98 transition">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>เริ่มท่องศัพท์ต่อทันที</span>
            </button>
          </div>
        </div>
      </div>

      {/* 🍎 3. Inset Grouped Section (iOS Settings / Apple Health Style) */}
      <div className="space-y-2 pt-1">
        <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
          โหมดการเรียนรู้
        </h3>

        {/* Grouped Container */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-xs border border-slate-200/70 dark:border-white/[0.08] divide-y divide-slate-100 dark:divide-white/[0.06] overflow-hidden">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                onClick={item.action}
                className="flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${item.iconBg} ${item.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="shrink-0 text-slate-300 dark:text-slate-600 pl-2">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
