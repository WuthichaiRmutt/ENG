import React, { useState } from 'react';
import {
  Layers,
  BookOpen,
  Brain,
  Gamepad2,
  FileCheck,
  Pencil,
  Mic,
  Newspaper,
  Sparkles,
  ArrowRight,
  Zap,
  Flame,
  Target,
  ChevronRight,
  LayoutDashboard,
  Clock,
  X,
  LucideIcon,
  CheckCircle2,
} from 'lucide-react';
import { ActiveTab, GameMode, UserProfile } from '../types';

export interface MobileCardItem {
  id: string;
  category: 'vocab' | 'exam' | 'game' | 'future';
  categoryLabel: string;
  title: string;
  shortDesc: string;
  badge?: string;
  badgeColor?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  status: 'ready' | 'planned';
  action?: () => void;
  plannedNotes?: string;
}

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
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'vocab' | 'exam' | 'game' | 'future'>('all');
  const [selectedPlannedCard, setSelectedPlannedCard] = useState<MobileCardItem | null>(null);

  // Clean Mobile Cards Dataset
  const cards: MobileCardItem[] = [
    // --- 1. CORE VOCAB & FLASHCARDS ---
    {
      id: 'flashcards',
      category: 'vocab',
      categoryLabel: 'คำศัพท์',
      title: 'ท่องคำศัพท์ (Flashcards)',
      shortDesc: 'ท่องศัพท์ 520 คำ พร้อมระบบช่วยจำ SRS & ฟังเสียงอ่าน',
      badge: 'พร้อมใช้งาน',
      badgeColor: 'bg-emerald-500 text-white',
      icon: Layers,
      iconBg: 'bg-indigo-600 text-white',
      iconColor: 'text-white',
      status: 'ready',
      action: () => onNavigateTab('flashcards'),
    },
    // --- 2. MOCK EXAM ---
    {
      id: 'mock-exam',
      category: 'exam',
      categoryLabel: 'ข้อสอบ',
      title: 'ข้อสอบจำลอง (PET & TOEIC)',
      shortDesc: 'จำลองสอบ CBT ครบทั้งฟังเสียง อ่านบทความ และวัดระดับ CEFR',
      badge: 'ยอดนิยม 🔥',
      badgeColor: 'bg-rose-500 text-white',
      icon: FileCheck,
      iconBg: 'bg-gradient-to-tr from-purple-600 to-pink-600 text-white',
      iconColor: 'text-white',
      status: 'ready',
      action: () => onNavigateTab('exam'),
    },
    // --- 3. VOCAB QUIZ ---
    {
      id: 'vocab-quiz',
      category: 'exam',
      categoryLabel: 'ข้อสอบ',
      title: 'ทำแบบทดสอบ (Quiz)',
      shortDesc: 'ควิซความจำ 4 ตัวเลือก จับเวลา และรับ XP เลเวลอัป',
      badge: 'พร้อมใช้งาน',
      badgeColor: 'bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300',
      icon: Brain,
      iconBg: 'bg-purple-100 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400',
      iconColor: 'text-purple-600 dark:text-purple-400',
      status: 'ready',
      action: () => onNavigateTab('games', undefined, 'quiz'),
    },
    // --- 4. WORD BANK ---
    {
      id: 'wordbank',
      category: 'vocab',
      categoryLabel: 'คำศัพท์',
      title: 'คลังคำศัพท์ (Word Bank)',
      shortDesc: 'ค้นหา 520 คำ A-Z ดู Part of Speech และตัวอย่างประโยค',
      badge: '520 คำ',
      badgeColor: 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300',
      icon: BookOpen,
      iconBg: 'bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400',
      iconColor: 'text-blue-600 dark:text-blue-400',
      status: 'ready',
      action: () => onNavigateTab('wordbank'),
    },
    // --- 5. GAMES ARENA ---
    {
      id: 'games',
      category: 'game',
      categoryLabel: 'มินิเกม',
      title: 'ศูนย์รวมเกมฝึกศัพท์ (Games)',
      shortDesc: 'เกมจับคู่ Speed Match, ฟังเสียงทายคำ และเติมคำในช่องว่าง',
      badge: '3 มินิเกม',
      badgeColor: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300',
      icon: Gamepad2,
      iconBg: 'bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400',
      iconColor: 'text-amber-600 dark:text-amber-400',
      status: 'ready',
      action: () => onNavigateTab('games'),
    },
    // --- 6. DASHBOARD ---
    {
      id: 'dashboard',
      category: 'vocab',
      categoryLabel: 'คำศัพท์',
      title: 'แดชบอร์ดสถิติ (Analytics)',
      shortDesc: 'ดูกราฟความก้าวหน้า และสถิติคำในกล่องความจำ 5 ระดับ',
      icon: LayoutDashboard,
      iconBg: 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      iconColor: 'text-slate-700 dark:text-slate-300',
      status: 'ready',
      action: () => onNavigateTab('dashboard'),
    },
    // --- 7. FUTURE: GRAMMAR ---
    {
      id: 'grammar',
      category: 'future',
      categoryLabel: 'เร็วๆ นี้',
      title: 'คอร์สไวยากรณ์ B1 (Grammar)',
      shortDesc: 'สรุป Tenses, Passives และโครงสร้างประโยคสำคัญสำหรับการสอบ',
      badge: 'เร็วๆ นี้ ⏳',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
      icon: Pencil,
      iconBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400',
      iconColor: 'text-emerald-600',
      status: 'planned',
      plannedNotes: 'คอร์สสรุปกฎไวยากรณ์ B1 พร้อมแบบฝึกหัดแต่งประโยค (เตรียมเปิดให้ร่วมออกแบบเนื้อหา)',
    },
    // --- 8. FUTURE: SPEAKING ---
    {
      id: 'speaking',
      category: 'future',
      categoryLabel: 'เร็วๆ นี้',
      title: 'แล็บฝึกออกเสียง (Speaking Lab)',
      shortDesc: 'ฝึกฟังสำเนียงต้นฉบับและฝึกออกเสียงคำยากตามหลักสัทศาสตร์ IPA',
      badge: 'เร็วๆ นี้ ⏳',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
      icon: Mic,
      iconBg: 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400',
      iconColor: 'text-rose-600',
      status: 'planned',
      plannedNotes: 'ห้องแล็บฝึกออกเสียงคำศัพท์และเปรียบเทียบคลื่นเสียงกับสำเนียงเจ้าของภาษา',
    },
    // --- 9. FUTURE: READING ---
    {
      id: 'reading',
      category: 'future',
      categoryLabel: 'เร็วๆ นี้',
      title: 'บทความและการอ่าน (Reading)',
      shortDesc: 'บทความสั้นและเรื่องราวฝึกจับใจความ พร้อมคำศัพท์ในบริบทจริง',
      badge: 'เร็วๆ นี้ ⏳',
      badgeColor: 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400',
      icon: Newspaper,
      iconBg: 'bg-cyan-50 dark:bg-cyan-950/40 text-cyan-600 dark:text-cyan-400',
      iconColor: 'text-cyan-600',
      status: 'planned',
      plannedNotes: 'คลังบทความสั้นจำลองสถานการณ์จริงและข่าวสาร พร้อมแบบฝึกหัดคำถามจับใจความ',
    },
  ];

  // Filter cards
  const filteredCards = selectedFilter === 'all'
    ? cards
    : cards.filter((c) => c.category === selectedFilter);

  return (
    <div className="space-y-4 pb-20 animate-fade-in">
      {/* 📱 1. COMPACT iOS GLASS USER SUMMARY */}
      <div className="ios-glass rounded-[24px] p-3.5 shadow-sm flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-black text-slate-900 dark:text-white truncate">
              Cambridge PET B1
            </span>
            <span className="text-[10px] font-black bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-lg">
              Academy
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
            เรียนรู้แล้ว <strong className="text-indigo-600 dark:text-indigo-400">{stats.mastered}</strong> จาก {stats.total} คำ ({stats.completionRate}%)
          </p>
        </div>

        {/* Quick Compact Stats Pills */}
        <div className="flex items-center gap-1.5 shrink-0">
          <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-xl text-xs font-bold text-amber-600 dark:text-amber-400">
            <Flame className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            <span>{profile.streakDays}ว.</span>
          </div>
          <div className="flex items-center gap-1 bg-indigo-500/10 border border-indigo-500/20 px-2 py-1 rounded-xl text-xs font-bold text-indigo-600 dark:text-indigo-400">
            <Zap className="w-3.5 h-3.5 text-indigo-600 fill-indigo-600" />
            <span>{profile.xp || 0} XP</span>
          </div>
        </div>
      </div>

      {/* 🚀 2. TWO PRIMARY FEATURED CARDS (iOS Squircle & Spring Haptics) */}
      <div className="grid grid-cols-2 gap-2.5">
        {/* Card A: ท่องศัพท์ */}
        <div
          onClick={() => onNavigateTab('flashcards')}
          className="bg-gradient-to-br from-indigo-600 via-indigo-600 to-blue-600 text-white rounded-[24px] p-3.5 shadow-lg shadow-indigo-500/20 cursor-pointer ios-spring flex flex-col justify-between min-h-[115px] border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <Layers className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase bg-white/20 backdrop-blur-md px-2 py-0.5 rounded-full">
              หลัก ⭐
            </span>
          </div>
          <div>
            <h3 className="font-black text-sm text-white leading-tight mt-2">
              ท่องคำศัพท์
            </h3>
            <p className="text-[10px] text-indigo-100 line-clamp-1 mt-0.5">
              520 คำ • ระบบ SRS ช่วยจำ
            </p>
          </div>
        </div>

        {/* Card B: ข้อสอบจำลอง */}
        <div
          onClick={() => onNavigateTab('exam')}
          className="bg-gradient-to-br from-purple-600 via-purple-600 to-pink-600 text-white rounded-[24px] p-3.5 shadow-lg shadow-purple-500/20 cursor-pointer ios-spring flex flex-col justify-between min-h-[115px] border border-white/20"
        >
          <div className="flex items-center justify-between">
            <div className="w-9 h-9 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
              <FileCheck className="w-5 h-5" />
            </div>
            <span className="text-[9px] font-black uppercase bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-sans">
              HOT 🔥
            </span>
          </div>
          <div>
            <h3 className="font-black text-sm text-white leading-tight mt-2">
              ข้อสอบจำลอง
            </h3>
            <p className="text-[10px] text-purple-100 line-clamp-1 mt-0.5">
              ฟังเสียง • อ่านบทความ • สุ่มข้อ
            </p>
          </div>
        </div>
      </div>

      {/* 🧭 3. iOS SEGMENTED CONTROL FILTER CHIPS */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {[
          { id: 'all', label: 'ทั้งหมด' },
          { id: 'vocab', label: '📚 คำศัพท์' },
          { id: 'exam', label: '🎯 ข้อสอบ' },
          { id: 'game', label: '🎮 มินิเกม' },
          { id: 'future', label: '⏳ เร็วๆ นี้' },
        ].map((tab) => {
          const isActive = selectedFilter === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all ios-spring cursor-pointer ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
                  : 'ios-glass text-slate-600 dark:text-slate-300 hover:bg-slate-100/80 dark:hover:bg-slate-800/80'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* 📋 4. CLEAN iOS GROUPED TILES (Easy to read & tap!) */}
      <div className="space-y-2">
        {filteredCards.map((card) => {
          const IconComponent = card.icon;
          const isReady = card.status === 'ready';

          return (
            <div
              key={card.id}
              onClick={() => {
                if (isReady && card.action) {
                  card.action();
                } else {
                  setSelectedPlannedCard(card);
                }
              }}
              className={`flex items-center justify-between gap-3 p-3 sm:p-3.5 rounded-[22px] transition-all cursor-pointer ios-spring ${
                isReady
                  ? 'ios-glass shadow-xs hover:border-indigo-400'
                  : 'bg-slate-50/50 dark:bg-slate-900/30 border border-dashed border-slate-200 dark:border-slate-800'
              }`}
            >
              {/* Left: Rounded Icon */}
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${card.iconBg}`}
              >
                <IconComponent className="w-5 h-5" />
              </div>

              {/* Middle: Title & 1-line description */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                    {card.title}
                  </h4>
                  {card.badge && (
                    <span
                      className={`text-[9px] font-black px-1.5 py-0.2 rounded-md shrink-0 ${card.badgeColor}`}
                    >
                      {card.badge}
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {card.shortDesc}
                </p>
              </div>

              {/* Right: Touch Arrow Chevron */}
              <div className="shrink-0 text-slate-400 dark:text-slate-500 pl-1">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 APPLE iOS BOTTOM SHEET FOR PLANNED CARDS */}
      {selectedPlannedCard && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-md flex items-end sm:items-center justify-center animate-fade-in">
          <div className="ios-glass-bar border-t sm:border rounded-t-[32px] sm:rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl animate-slide-up pb-safe text-center">
            {/* iOS Drag Handle */}
            <div className="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full mx-auto -mt-1 mb-2 sm:hidden" />

            <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center shadow-xs">
              <selectedPlannedCard.icon className="w-6 h-6" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full">
                เตรียมร่วมออกแบบเร็วๆ นี้
              </span>
              <h3 className="font-black text-base text-slate-900 dark:text-white mt-1.5">
                {selectedPlannedCard.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                {selectedPlannedCard.plannedNotes || selectedPlannedCard.shortDesc}
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                onClick={() => setSelectedPlannedCard(null)}
                className="flex-1 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-2xl transition ios-spring"
              >
                ปิดหน้าต่าง
              </button>
              <button
                onClick={() => {
                  setSelectedPlannedCard(null);
                  onNavigateTab('flashcards');
                }}
                className="flex-1 py-3 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl shadow-md shadow-indigo-600/25 active:scale-95 transition ios-spring"
              >
                ไปท่องศัพท์ก่อน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
