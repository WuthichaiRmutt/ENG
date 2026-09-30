import React, { useState, useMemo } from 'react';
import { Search, Volume2, CheckCircle2, AlertTriangle, ChevronDown, ChevronUp, BookOpen, Filter } from 'lucide-react';
import { WordItem, WordStatus, UserWordProgress } from '../types';
import { ttsService } from '../lib/tts';

interface WordBankViewProps {
  words: WordItem[];
  progressMap: Record<string, UserWordProgress>;
  onSetStatus: (vocabId: string, status: WordStatus) => void;
  initialFilter?: string;
}

export const WordBankView: React.FC<WordBankViewProps> = ({
  words,
  progressMap,
  onSetStatus,
  initialFilter = 'all',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>(initialFilter);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Extract categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    words.forEach((w) => {
      if (w.category) set.add(w.category);
    });
    return Array.from(set).sort();
  }, [words]);

  // Filtered words
  const filteredWords = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return words.filter((w) => {
      // Search
      const matchesSearch =
        !q ||
        w.word.toLowerCase().includes(q) ||
        w.meaning.toLowerCase().includes(q) ||
        w.category.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Status
      const status = progressMap[w.id]?.status || 'normal';
      if (selectedStatus === 'mastered' && status !== 'mastered') return false;
      if (selectedStatus === 'focus' && status !== 'focus') return false;
      if (selectedStatus === 'normal' && status !== 'normal') return false;

      // Category
      if (selectedCategory !== 'all' && w.category !== selectedCategory) return false;

      return true;
    });
  }, [words, progressMap, searchQuery, selectedStatus, selectedCategory]);

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-4 pb-8 max-w-2xl mx-auto">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ค้นหาคำศัพท์ภาษาอังกฤษ หรือความหมายภาษาไทย..."
          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition shadow-xs text-slate-800 dark:text-slate-100 placeholder:text-slate-400"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-1.5 py-0.5"
          >
            ล้าง
          </button>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs font-semibold">
        {[
          { id: 'all', label: 'ทั้งหมด' },
          { id: 'mastered', label: 'รู้แล้ว' },
          { id: 'focus', label: 'ยังไม่แม่น' },
          { id: 'normal', label: 'ยังไม่ได้จัดหมวด' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedStatus(f.id)}
            className={`px-3 py-1.5 rounded-full transition shrink-0 ${
              selectedStatus === f.id
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:border-slate-300'
            }`}
          >
            {f.label}
          </button>
        ))}

        {/* Category selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 rounded-full px-3 py-1.5 text-xs font-semibold focus:outline-none shrink-0"
        >
          <option value="all">ทุกหมวดหมู่ ({categories.length})</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-medium px-1">
        <span>พบ {filteredWords.length} รายการ</span>
        <span>แตะที่แถวเพื่อดูตัวอย่างประโยค</span>
      </div>

      {/* Word List */}
      <div className="space-y-2">
        {filteredWords.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-xs">
            ไม่พบคำศัพท์ที่ตรงกับการค้นหา
          </div>
        ) : (
          filteredWords.slice(0, 100).map((w) => {
            const progress = progressMap[w.id];
            const status = progress?.status || 'normal';
            const isExpanded = expandedId === w.id;

            return (
              <div
                key={w.id}
                onClick={() => toggleExpand(w.id)}
                className={`bg-white dark:bg-slate-900 border rounded-2xl p-3.5 transition-all cursor-pointer shadow-xs ${
                  isExpanded
                    ? 'border-indigo-500/50 dark:border-indigo-500/50 shadow-sm'
                    : 'border-slate-200/80 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  {/* Left: Word and Meaning */}
                  <div className="flex items-center gap-2.5 min-w-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        ttsService.speak(w.word);
                      }}
                      className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 flex items-center justify-center shrink-0 transition"
                      title="ฟังเสียงอ่าน"
                    >
                      <Volume2 className="w-4 h-4" />
                    </button>

                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-slate-50">
                          {w.word}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded">
                          {w.pos}
                        </span>
                        {w.ipa && <span className="text-xs font-mono text-slate-400 hidden sm:inline">{w.ipa}</span>}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 truncate mt-0.5">{w.meaning}</p>
                    </div>
                  </div>

                  {/* Right: Status Pill & Toggle */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const nextStatus: WordStatus =
                          status === 'normal' ? 'mastered' : status === 'mastered' ? 'focus' : 'normal';
                        onSetStatus(w.id, nextStatus);
                      }}
                      className={`text-[11px] font-bold px-2.5 py-1 rounded-full border transition flex items-center gap-1 ${
                        status === 'mastered'
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800'
                          : status === 'focus'
                          ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-200 dark:border-slate-700'
                      }`}
                      title="แตะเพื่อเปลี่ยนสถานะคำนี้"
                    >
                      {status === 'mastered' ? (
                        <>
                          <CheckCircle2 className="w-3 h-3" />
                          <span>รู้แล้ว</span>
                        </>
                      ) : status === 'focus' ? (
                        <>
                          <AlertTriangle className="w-3 h-3" />
                          <span>Focus</span>
                        </>
                      ) : (
                        <span>ทั่วไป</span>
                      )}
                    </button>

                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs space-y-2 animate-fade-in">
                    <div className="flex flex-wrap items-center gap-2 text-slate-500">
                      <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        หมวดหมู่: {w.category}
                      </span>
                      {progress && (
                        <span className="bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 px-2 py-0.5 rounded-md font-semibold">
                          Leitner Box {progress.boxLevel} (ตอบถูก {progress.correctCount} / ผิด {progress.wrongCount})
                        </span>
                      )}
                    </div>
                    {w.example && (
                      <div className="bg-slate-50 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/50">
                        <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ตัวอย่างประโยค:</span>
                        <p className="italic text-slate-700 dark:text-slate-300">"{w.example}"</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}

        {filteredWords.length > 100 && (
          <div className="text-center py-4 text-xs text-slate-400">
            แสดง 100 คำแรก (พิมพ์ในช่องค้นหาเพื่อเจาะจงคำที่ต้องการ)
          </div>
        )}
      </div>
    </div>
  );
};
