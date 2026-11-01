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
  Compass,
  X,
  LucideIcon,
} from 'lucide-react';
import { ActiveTab, GameMode, UserProfile } from '../types';

export interface HubCardItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  badgeColor?: string;
  icon: LucideIcon;
  gradient: string;
  iconBg: string;
  textColor: string;
  tags: string[];
  status: 'ready' | 'planned';
  action?: () => void;
  plannedNotes?: string;
}

export interface HubCategory {
  id: string;
  title: string;
  description: string;
  emoji: string;
  cards: HubCardItem[];
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
  const [selectedPlannedCard, setSelectedPlannedCard] = useState<HubCardItem | null>(null);

  // Grouped Categories with clear separation
  const categories: HubCategory[] = [
    {
      id: 'vocab',
      title: 'หมวดที่ 1: การเรียนรู้และจดจำคำศัพท์',
      description: 'ระบบท่องจำคำศัพท์ Cambridge B1 พร้อมเทคนิค Spaced Repetition (SRS)',
      emoji: '📚',
      cards: [
        {
          id: 'flashcards',
          title: 'ท่องคำศัพท์ (Flashcards & SRS)',
          subtitle: 'ท่องจำคำศัพท์ 520 คำ พร้อมระบบเว้นระยะทบทวนอัจฉริยะ ฟังเสียงอ่าน และคำแปล',
          badge: 'ระบบพร้อมใช้งาน ✨',
          badgeColor: 'bg-emerald-500 text-white',
          icon: Layers,
          gradient: 'from-indigo-600 via-indigo-500 to-blue-600',
          iconBg: 'bg-white/20 text-white',
          textColor: 'text-indigo-600 dark:text-indigo-400',
          tags: ['520 คำ B1', 'SRS Leitner', 'เสียงอ่านพากย์แท้'],
          status: 'ready',
          action: () => onNavigateTab('flashcards'),
        },
        {
          id: 'wordbank',
          title: 'คลังคำศัพท์และไวยากรณ์ (Word Bank)',
          subtitle: 'ค้นหา A-Z คัดกรองหมวดหมู่ ดู Part of Speech, ตัวอย่างประโยค และคำพ้องความหมาย',
          badge: '520 คำครบ',
          badgeColor: 'bg-blue-500 text-white',
          icon: BookOpen,
          gradient: 'from-blue-600 via-sky-500 to-cyan-500',
          iconBg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400',
          textColor: 'text-blue-600 dark:text-blue-400',
          tags: ['A-Z Search', 'ตัวอย่างประโยค', 'Synonyms / Collocations'],
          status: 'ready',
          action: () => onNavigateTab('wordbank'),
        },
        {
          id: 'dashboard',
          title: 'แดชบอร์ดความก้าวหน้า (Analytics)',
          subtitle: 'ติดตามพัฒนาการ สถิติคำจำได้แล้ว และการกระจายตัวในกล่องความจำ 5 ระดับ',
          badge: 'วิเคราะห์ผล',
          badgeColor: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
          icon: LayoutDashboard,
          gradient: 'from-slate-800 to-indigo-900',
          iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
          textColor: 'text-indigo-600 dark:text-indigo-400',
          tags: ['สถิติแม่นยำ', 'Leitner Box 1-5', 'เป้าหมายรายวัน'],
          status: 'ready',
          action: () => onNavigateTab('dashboard'),
        },
      ],
    },
    {
      id: 'testing',
      title: 'หมวดที่ 2: แบบทดสอบและการประเมินผล',
      description: 'วัดระดับความเข้าใจ ประเมินจุดอ่อน-จุดแข็ง และเตรียมความพร้อมสู่การสอบจริง',
      emoji: '🎯',
      cards: [
        {
          id: 'vocab-quiz',
          title: 'ทำแบบทดสอบ (Vocabulary Quiz)',
          subtitle: 'ทดสอบความเข้าใจคำศัพท์ 4 ตัวเลือก จับเวลา บันทึกสถิติความถูกต้อง และรับ XP',
          badge: 'พร้อมทดสอบ 🎯',
          badgeColor: 'bg-purple-500 text-white',
          icon: Brain,
          gradient: 'from-purple-600 via-fuchsia-600 to-pink-600',
          iconBg: 'bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400',
          textColor: 'text-purple-600 dark:text-purple-400',
          tags: ['4 ตัวเลือก', 'จับเวลา', 'รับ +5 XP ทุกข้อ'],
          status: 'ready',
          action: () => onNavigateTab('games', undefined, 'quiz'),
        },
        {
          id: 'mock-exam',
          title: 'ข้อสอบจำลองเสมือนจริง (PET B1 & EnglishScore)',
          subtitle: 'จำลองการสอบเสมือนจริง ทั้งพาร์ทการฟังเสียงอ่าน (Listening), การอ่านบทความ (Reading) และการใช้คำศัพท์ (Use of English)',
          badge: 'เปิดสอบเสมือนจริง 📝',
          badgeColor: 'bg-emerald-500 text-white',
          icon: FileCheck,
          gradient: 'from-violet-600 via-indigo-600 to-purple-800',
          iconBg: 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
          textColor: 'text-violet-600 dark:text-violet-400',
          tags: ['🎧 พาร์ทฟังเสียง', '📖 พาร์ทอ่านบทความ', 'จับเวลา & CEFR Band'],
          status: 'ready',
          action: () => onNavigateTab('exam'),
        },
      ],
    },
    {
      id: 'games',
      title: 'หมวดที่ 3: มินิเกมและการฝึกฝนทักษะ',
      description: 'ทบทวนคำศัพท์ผ่านเกมสร้างสรรค์ ช่วยให้จำแม่นยำ ไม่น่าเบื่อ',
      emoji: '🎮',
      cards: [
        {
          id: 'games-arena',
          title: 'ศูนย์รวมเกมคำศัพท์ (Games Arena)',
          subtitle: 'จับคู่ Speed Match, ฟังเสียงเลือกคำ Listening Quiz และ Cloze Test เติมคำในช่องว่าง',
          badge: '3 โหมดเกม 🕹️',
          badgeColor: 'bg-orange-500 text-white',
          icon: Gamepad2,
          gradient: 'from-amber-500 via-orange-500 to-rose-500',
          iconBg: 'bg-orange-50 dark:bg-orange-950/60 text-orange-600 dark:text-orange-400',
          textColor: 'text-orange-600 dark:text-orange-400',
          tags: ['Speed Match', 'Listening Quiz', 'Cloze Test'],
          status: 'ready',
          action: () => onNavigateTab('games'),
        },
      ],
    },
    {
      id: 'future',
      title: 'หมวดที่ 4: คอร์สและทักษะต่อยอด (เตรียมพัฒนา)',
      description: 'โมดูลเสริมสำหรับฝึกฝนทักษะภาษาอังกฤษรอบด้าน (รอออกแบบเนื้อหาร่วมกัน)',
      emoji: '🚀',
      cards: [
        {
          id: 'grammar-workshop',
          title: 'ไวยากรณ์และรูปประโยค (Grammar Workshop)',
          subtitle: 'สรุป Tenses, Passive Voice, Conditionals และโครงสร้างประโยคสำคัญสำหรับการสอบ',
          badge: 'รอออกแบบเนื้อหา ⏳',
          badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
          icon: Pencil,
          gradient: 'from-emerald-600 to-teal-700',
          iconBg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
          textColor: 'text-emerald-600 dark:text-emerald-400',
          tags: ['Tenses & Passives', 'Conditionals', 'Sentence Patterns'],
          status: 'planned',
          plannedNotes: 'คอร์สสรุปกฎไวยากรณ์สำคัญ 12 เรื่องที่พบบ่อยในข้อสอบระดับ B1 พร้อมแบบฝึกหัดแต่งประโยค',
        },
        {
          id: 'speaking-lab',
          title: 'แล็บฝึกพูดและออกเสียง (Speaking Lab)',
          subtitle: 'ฝึกฟังสำเนียงต้นฉบับและฝึกออกเสียงคำยากให้ถูกต้องตามหลักสัทศาสตร์ IPA',
          badge: 'รอออกแบบเนื้อหา ⏳',
          badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
          icon: Mic,
          gradient: 'from-rose-500 to-red-600',
          iconBg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
          textColor: 'text-rose-600 dark:text-rose-400',
          tags: ['IPA Practice', 'Accent Listening', 'ฝึกพูดตามเสียง'],
          status: 'planned',
          plannedNotes: 'ห้องแล็บฝึกการออกเสียงแบบ Interactive พร้อมเปรียบเทียบเสียงอ่านของผู้เรียนกับสำเนียงเจ้าของภาษา',
        },
        {
          id: 'reading-practice',
          title: 'บทความและการอ่านจับใจความ (Reading Practice)',
          subtitle: 'บทความสั้นและเรื่องราวฝึกจับใจความ พร้อมคำศัพท์ในบริบทจริงตามมาตรฐาน B1',
          badge: 'รอออกแบบเนื้อหา ⏳',
          badgeColor: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
          icon: Newspaper,
          gradient: 'from-cyan-600 to-blue-700',
          iconBg: 'bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400',
          textColor: 'text-cyan-600 dark:text-cyan-400',
          tags: ['Short Articles', 'Context Vocabulary', 'จับใจความสำคัญ'],
          status: 'planned',
          plannedNotes: 'คลังบทความสั้นจำลองสถานการณ์ชีวิตประจำวัน ข่าวสาร และบทสนทนา พร้อมคำถามทดสอบความเข้าใจ',
        },
      ],
    },
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* 🌟 Academy Portal Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-brand-600 text-white p-5 sm:p-7 shadow-xl shadow-indigo-500/25">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-brand-400/20 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide uppercase">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                LEARNING HUB & PORTAL
              </span>
            </div>
            {/* Streak & XP Pills */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold">
                <Flame className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                <span>{profile.streakDays} วัน</span>
              </div>
              <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold">
                <Zap className="w-3.5 h-3.5 text-yellow-300 fill-yellow-300" />
                <span>{profile.xp || 0} XP</span>
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              ยินดีต้อนรับสู่ Cambridge PET B1 Academy
            </h1>
            <p className="text-xs sm:text-sm text-indigo-100 mt-1 max-w-xl leading-relaxed">
              เลือกการ์ดโหมดที่ต้องการเพื่อเริ่มต้นฝึกฝน หรือคลิกเลือกท่องศัพท์เพื่อเข้าสู่โหมดการเรียนรู้ที่คุณพัฒนาไว้
            </p>
          </div>

          {/* Quick Progress Bar */}
          <div className="pt-2 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div>
                <span className="text-[10px] text-indigo-200 block">คลังศัพท์ทั้งหมด</span>
                <strong className="text-sm font-black">{stats.total} คำ</strong>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-[10px] text-indigo-200 block">จำแม่นยำแล้ว</span>
                <strong className="text-sm font-black text-emerald-300">{stats.mastered} คำ</strong>
              </div>
              <div className="h-6 w-px bg-white/20" />
              <div>
                <span className="text-[10px] text-indigo-200 block">ความก้าวหน้ารวม</span>
                <strong className="text-sm font-black text-amber-300">{stats.completionRate}%</strong>
              </div>
            </div>

            {/* Quick Launch Button */}
            <button
              onClick={() => onNavigateTab('flashcards')}
              className="inline-flex items-center gap-1.5 bg-white text-indigo-700 hover:bg-indigo-50 font-black text-xs px-3.5 py-2 rounded-xl shadow-md active:scale-95 transition-all"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>เข้าสู่โหมดท่องศัพท์ทันที</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 🧭 Categorized Learning Cards */}
      <div className="space-y-8">
        {categories.map((cat, catIdx) => (
          <section key={cat.id} className="space-y-3">
            {/* Category Header */}
            <div className="flex items-baseline justify-between border-b border-slate-200/80 dark:border-slate-800 pb-2">
              <div className="flex items-center gap-2">
                <span className="text-lg">{cat.emoji}</span>
                <h2 className="text-sm sm:text-base font-black text-slate-800 dark:text-slate-100 tracking-tight">
                  {cat.title}
                </h2>
              </div>
              <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                {cat.cards.length} รายการ
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1">
              {cat.description}
            </p>

            {/* Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {cat.cards.map((card) => {
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
                    className={`group relative text-left rounded-2xl p-4 sm:p-5 transition-all duration-200 cursor-pointer border ${
                      isReady
                        ? 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800/80 hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg hover:shadow-indigo-500/10 active:scale-[0.98]'
                        : 'bg-slate-50/70 dark:bg-slate-900/40 border-dashed border-slate-300 dark:border-slate-800 hover:border-slate-400 dark:hover:border-slate-700 hover:bg-white dark:hover:bg-slate-900/80'
                    }`}
                  >
                    {/* Header Row of the Card */}
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm transition-transform duration-200 group-hover:scale-105 ${
                          isReady
                            ? 'bg-gradient-to-tr ' + card.gradient + ' text-white'
                            : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>

                      {/* Status / Badge */}
                      {card.badge && (
                        <span
                          className={`text-[10px] font-black px-2 py-0.5 rounded-full shrink-0 ${card.badgeColor}`}
                        >
                          {card.badge}
                        </span>
                      )}
                    </div>

                    {/* Card Body */}
                    <div className="mt-3.5 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <h3 className="font-black text-sm sm:text-base text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {card.title}
                        </h3>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                        {card.subtitle}
                      </p>
                    </div>

                    {/* Tags row */}
                    {card.tags && card.tags.length > 0 && (
                      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap items-center gap-1.5">
                        {card.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[10px] font-semibold bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-md"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        ))}

        {/* 💡 Future Expansion Card (Ready to design more) */}
        <div className="rounded-2xl border border-dashed border-indigo-200 dark:border-indigo-900/60 bg-indigo-50/50 dark:bg-indigo-950/20 p-4 sm:p-5 flex items-start gap-3.5">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="space-y-1">
            <h4 className="text-xs sm:text-sm font-black text-indigo-950 dark:text-indigo-200">
              พร้อมสำหรับการออกแบบเนื้อหาเพิ่มเติมในขั้นตอนถัดไป
            </h4>
            <p className="text-xs text-indigo-700/80 dark:text-indigo-300/80 leading-relaxed">
              โครงสร้างหน้านี้แยกหมวดหมู่และเตรียมการ์ดตัวเลือกไว้เรียบร้อยแล้ว คุณสามารถแจ้งรูปแบบหรือไอเดียเนื้อหาในแต่ละการ์ด (เช่น ข้อสอบจำลอง, ไวยากรณ์, การออกเสียง) เพื่อร่วมกันพัฒนาต่อได้ทันทีครับ
            </p>
          </div>
        </div>
      </div>

      {/* 🚀 Modal for Planned / In-development Cards */}
      {selectedPlannedCard && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-scale-up">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-gradient-to-tr ${selectedPlannedCard.gradient} text-white shadow-md`}
                >
                  <selectedPlannedCard.icon className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full">
                    เตรียมร่วมออกแบบเร็วๆ นี้
                  </span>
                  <h3 className="text-base font-black text-slate-800 dark:text-slate-100 mt-0.5">
                    {selectedPlannedCard.title}
                  </h3>
                </div>
              </div>
              <button
                onClick={() => setSelectedPlannedCard(null)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {selectedPlannedCard.plannedNotes || selectedPlannedCard.subtitle}
            </p>

            <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl space-y-1.5 border border-slate-200/60 dark:border-slate-700/60">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200">
                <Clock className="w-3.5 h-3.5 text-indigo-500" />
                <span>สถานะโมดูลนี้:</span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                การ์ดนี้ถูกจัดเตรียมในหมวดหมู่เรียบร้อยแล้ว ในขั้นตอนถัดไปคุณสามารถช่วยออกแบบรูปแบบคำถาม เนื้อหา หรือฟีเจอร์ที่ต้องการเพื่อให้ระบบสร้างหน้าจอฉบับสมบูรณ์ได้ทันทีครับ
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedPlannedCard(null)}
                className="px-4 py-2 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
              >
                ปิดหน้าต่าง
              </button>
              <button
                onClick={() => {
                  setSelectedPlannedCard(null);
                  onNavigateTab('flashcards');
                }}
                className="px-4 py-2 text-xs font-black bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl shadow-md active:scale-95 transition flex items-center gap-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>ไปท่องคำศัพท์ก่อน</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
