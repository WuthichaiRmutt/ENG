import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import {
  Volume2,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  Sparkles,
  Trophy,
  ArrowRight,
  BookOpen,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem, WordStatus, UserWordProgress } from '../types';
import { ttsService } from '../lib/tts';
import { isDueForReview } from '../lib/srs';
import { soundFx } from '../lib/soundFx';

interface FlashcardsViewProps {
  words: WordItem[];
  progressMap: Record<string, UserWordProgress>;
  onRecordResult: (vocabId: string, isCorrect: boolean) => void;
  onSetStatus?: (vocabId: string, status: WordStatus) => void;
  initialFilter?: string;
}

const STORAGE_KEY_FILTER = 'pet_b1_flashcard_filter_v2';
const STORAGE_KEY_LAST_WORD = 'pet_b1_flashcard_last_word_id_v2';

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  words,
  progressMap,
  onRecordResult,
  onSetStatus,
  initialFilter,
}) => {
  // Load saved filter preference or default to 'learning' (unmastered queue)
  const [filterMode, setFilterMode] = useState<string>(() => {
    if (initialFilter && initialFilter !== 'all') return initialFilter;
    const saved = localStorage.getItem(STORAGE_KEY_FILTER);
    return saved || 'learning';
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const hasLoadedInitialIndex = useRef(false);

  // Sync external filter change (e.g. from Dashboard click)
  useEffect(() => {
    if (initialFilter) {
      setFilterMode(initialFilter);
      setIsFlipped(false);
    }
  }, [initialFilter]);

  // Compute active deck based on filterMode
  const filteredWords = useMemo(() => {
    if (filterMode === 'focus') {
      return words.filter((w) => progressMap[w.id]?.status === 'focus');
    }
    if (filterMode === 'mastered') {
      return words.filter((w) => progressMap[w.id]?.status === 'mastered');
    }
    if (filterMode === 'due') {
      return words.filter((w) => {
        const p = progressMap[w.id];
        return p && isDueForReview(p.nextReviewAt);
      });
    }
    if (filterMode === 'learning') {
      // SMART QUEUE: Exclude words already marked as Mastered!
      // Prioritize words in Focus Zone, then due review, then unstudied words
      const unmastered = words.filter((w) => progressMap[w.id]?.status !== 'mastered');
      return [...unmastered].sort((a, b) => {
        const statA = progressMap[a.id]?.status;
        const statB = progressMap[b.id]?.status;
        if (statA === 'focus' && statB !== 'focus') return -1;
        if (statB === 'focus' && statA !== 'focus') return 1;
        return 0;
      });
    }
    // 'all' mode: show all 520 words
    return words;
  }, [words, progressMap, filterMode]);

  // Restore last studied word position from localStorage on first mount or filter change
  useEffect(() => {
    if (filteredWords.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if (!hasLoadedInitialIndex.current) {
      hasLoadedInitialIndex.current = true;
      const lastWordId = localStorage.getItem(STORAGE_KEY_LAST_WORD);
      if (lastWordId) {
        const foundIndex = filteredWords.findIndex((w) => w.id === lastWordId);
        if (foundIndex >= 0) {
          setCurrentIndex(foundIndex);
          return;
        }
      }
    }

    // Ensure currentIndex is within valid bounds
    if (currentIndex >= filteredWords.length) {
      setCurrentIndex(Math.max(0, filteredWords.length - 1));
    }
  }, [filteredWords, currentIndex]);

  const currentWord = filteredWords[currentIndex] || null;
  const currentProgress = currentWord ? progressMap[currentWord.id] : null;

  // Persist current word ID whenever it changes
  useEffect(() => {
    if (currentWord) {
      localStorage.setItem(STORAGE_KEY_LAST_WORD, currentWord.id);
    }
  }, [currentWord]);

  // TTS audio pronunciation
  const handleSpeak = useCallback(
    async (e?: React.MouseEvent) => {
      if (e) e.stopPropagation();
      if (!currentWord || isSpeaking) return;
      setIsSpeaking(true);
      await ttsService.speak(currentWord.word);
      setIsSpeaking(false);
    },
    [currentWord, isSpeaking]
  );

  const handleNext = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredWords.length ? prev + 1 : 0));
  }, [filteredWords.length]);

  const handlePrev = useCallback(() => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredWords.length - 1));
  }, [filteredWords.length]);

  const handleShuffle = () => {
    setIsFlipped(false);
    if (filteredWords.length > 1) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      setCurrentIndex(randomIndex);
    }
  };

  const handleFilterChange = (mode: string) => {
    setFilterMode(mode);
    localStorage.setItem(STORAGE_KEY_FILTER, mode);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // ACTION 1: Mark as "จำได้แม่นแล้ว" (Mastered)
  const handleMarkMastered = () => {
    if (!currentWord) return;
    soundFx.playCorrect();

    if (onSetStatus) {
      onSetStatus(currentWord.id, 'mastered');
    } else {
      onRecordResult(currentWord.id, true);
    }

    // If currently in 'learning' filter, the card will leave the list.
    // We stay at current index or wrap around.
    setIsFlipped(false);
    if (filterMode === 'learning' || filterMode === 'focus') {
      if (currentIndex >= filteredWords.length - 1) {
        setCurrentIndex(0);
      }
    } else {
      handleNext();
    }
  };

  // ACTION 2: Mark as "ยังไม่แม่น" (Focus Zone)
  const handleMarkFocus = () => {
    if (!currentWord) return;
    soundFx.playWrong();

    if (onSetStatus) {
      onSetStatus(currentWord.id, 'focus');
    } else {
      onRecordResult(currentWord.id, false);
    }

    setIsFlipped(false);
    handleNext();
  };

  // ACTION 3: SRS Step (ทบทวนตามรอบ Leitner Box)
  const handleSrsReview = () => {
    if (!currentWord) return;
    soundFx.playCorrect();
    onRecordResult(currentWord.id, true);
    setIsFlipped(false);
    handleNext();
  };

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        handleMarkMastered();
      } else if (e.code === 'ArrowLeft') {
        handleMarkFocus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord, handleNext]);

  // Counts for top filter badges
  const focusCount = useMemo(() => words.filter((w) => progressMap[w.id]?.status === 'focus').length, [words, progressMap]);
  const masteredCount = useMemo(() => words.filter((w) => progressMap[w.id]?.status === 'mastered').length, [words, progressMap]);
  const dueCount = useMemo(() => words.filter((w) => progressMap[w.id] && isDueForReview(progressMap[w.id].nextReviewAt)).length, [words, progressMap]);
  const unmasteredCount = words.length - masteredCount;

  // Empty state handler
  if (filteredWords.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center my-6 space-y-4 shadow-sm max-w-md mx-auto animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-500 mx-auto flex items-center justify-center text-3xl shadow-sm">
          {filterMode === 'learning' ? '🏆' : filterMode === 'focus' ? '🎉' : '📚'}
        </div>

        <div>
          <h3 className="text-base sm:text-lg font-black text-slate-800 dark:text-slate-100">
            {filterMode === 'learning'
              ? 'ยินดีด้วย! คุณจำศัพท์ได้แม่นครบทุกคำแล้ว 🎉'
              : filterMode === 'focus'
              ? 'ยอดเยี่ยม! ไม่มีคำค้างใน Focus Zone'
              : filterMode === 'due'
              ? 'ยังไม่มีคำศัพท์ที่ถึงรอบทบทวนในตอนนี้'
              : 'ไม่พบคำศัพท์ในหมวดหมู่นี้'}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed mt-1">
            {filterMode === 'learning'
              ? `คุณผ่านการเรียนรู้ทั้ง ${words.length} คำเรียบร้อยแล้ว สามารถทบทวนซ้ำหรือไปทดสอบในศูนย์รวมเกมได้เลย`
              : 'สามารถสลับกลับไปที่โหมดกำลังเรียนรู้หรือคำศัพท์ทั้งหมดเพื่อฝึกฝนต่อได้'}
          </p>
        </div>

        <div className="flex flex-col gap-2 pt-2">
          <button
            onClick={() => handleFilterChange('learning')}
            className="w-full bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-xs py-2.5 px-4 rounded-xl transition shadow-xs"
          >
            🎯 โหมดกำลังเรียนรู้ ({unmasteredCount} คำ)
          </button>
          <button
            onClick={() => handleFilterChange('all')}
            className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs py-2.5 px-4 rounded-xl transition"
          >
            📚 แสดงคำศัพท์ทั้งหมด ({words.length} คำ)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 pb-8 max-w-md mx-auto animate-fade-in">
      {/* Top Filter Chips */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0 text-[11px] sm:text-xs">
          {/* Smart Queue: To Learn */}
          <button
            onClick={() => handleFilterChange('learning')}
            className={`px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              filterMode === 'learning'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-indigo-300'
            }`}
            title="แสดงคำศัพท์ที่ยังไม่ผ่านเกณฑ์จำได้แม่นยำ"
          >
            🎯 กำลังเรียน ({unmasteredCount})
          </button>

          {/* Focus Zone */}
          <button
            onClick={() => handleFilterChange('focus')}
            className={`px-2.5 py-1.5 rounded-full font-bold transition flex items-center gap-1 whitespace-nowrap ${
              filterMode === 'focus'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
            }`}
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>ยังไม่แม่น ({focusCount})</span>
          </button>

          {/* Due Review */}
          <button
            onClick={() => handleFilterChange('due')}
            className={`px-2.5 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              filterMode === 'due'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
            }`}
          >
            ⏰ ถึงรอบ ({dueCount})
          </button>

          {/* Mastered */}
          <button
            onClick={() => handleFilterChange('mastered')}
            className={`px-2.5 py-1.5 rounded-full font-bold transition flex items-center gap-1 whitespace-nowrap ${
              filterMode === 'mastered'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900/50'
            }`}
          >
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span>รู้แล้ว ({masteredCount})</span>
          </button>

          {/* All Words */}
          <button
            onClick={() => handleFilterChange('all')}
            className={`px-2.5 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900 shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-700'
            }`}
          >
            ทั้งหมด ({words.length})
          </button>
        </div>

        <button
          onClick={handleShuffle}
          className="p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition shrink-0 ml-1 shadow-2xs"
          title="สลับการ์ดแบบสุ่ม (Shuffle)"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress & Card Index Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span className="whitespace-nowrap flex items-center gap-1">
          ใบที่ <strong className="text-indigo-600 dark:text-indigo-400 tabular-nums">{currentIndex + 1}</strong> จาก {filteredWords.length} คำ
        </span>

        <div className="flex items-center gap-1.5">
          {currentProgress?.status === 'mastered' && (
            <span className="flex items-center gap-1 text-[10px] bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 px-2 py-0.5 rounded-md font-bold whitespace-nowrap border border-emerald-200/80 dark:border-emerald-800/60">
              <CheckCircle2 className="w-3 h-3" /> จำได้แม่นแล้ว
            </span>
          )}
          {currentProgress?.status === 'focus' && (
            <span className="flex items-center gap-1 text-[10px] bg-rose-50 dark:bg-rose-950/50 text-rose-700 dark:text-rose-400 px-2 py-0.5 rounded-md font-bold whitespace-nowrap border border-rose-200/80 dark:border-rose-800/60">
              <AlertTriangle className="w-3 h-3" /> อยู่ใน Focus Zone
            </span>
          )}
          {currentProgress && currentProgress.boxLevel > 1 && currentProgress.status !== 'mastered' && (
            <span className="text-[10px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md font-semibold whitespace-nowrap">
              SRS Box {currentProgress.boxLevel}/5
            </span>
          )}
        </div>
      </div>

      {/* 3D Flashcard Container */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full min-h-[300px] sm:min-h-[340px] [perspective:1000px] cursor-pointer select-none group"
      >
        <div
          className={`relative w-full min-h-[300px] sm:min-h-[340px] rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] shadow-xl border border-slate-200 dark:border-slate-800 ${
            isFlipped ? '[transform:rotateY(180deg)]' : ''
          }`}
        >
          {/* FRONT OF CARD */}
          <div className="absolute inset-0 w-full h-full bg-white dark:bg-slate-900 rounded-3xl p-5 sm:p-6 flex flex-col justify-between [backface-visibility:hidden]">
            {/* Top Info Bar */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 truncate max-w-[200px]">
                {currentWord?.category}
              </span>

              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded-md uppercase">
                  {currentWord?.pos}
                </span>
                <button
                  onClick={handleSpeak}
                  className={`p-1.5 sm:p-2 rounded-full transition ${
                    isSpeaking
                      ? 'bg-indigo-600 text-white animate-pulse'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 hover:bg-indigo-50'
                  }`}
                  title="ฟังเสียงอ่านเจ้าของภาษา"
                >
                  <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>

            {/* Word Center Display */}
            <div className="text-center my-auto py-4 space-y-1.5">
              <h2 className="text-2xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight break-words px-2">
                {currentWord?.word}
              </h2>
              {currentWord?.ipa && (
                <p className="text-xs sm:text-sm font-mono text-slate-400 dark:text-slate-500 font-medium">
                  {currentWord.ipa}
                </p>
              )}
            </div>

            {/* Bottom Flip Hint */}
            <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium whitespace-nowrap">
              <RotateCw className="w-3 h-3 text-indigo-500 group-hover:rotate-180 transition-transform duration-300 shrink-0" />
              <span>แตะเพื่อดูคำแปลและคำอธิบาย</span>
            </div>
          </div>

          {/* BACK OF CARD */}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-indigo-50/90 to-white dark:from-slate-900 dark:to-slate-900 rounded-3xl p-5 sm:p-6 flex flex-col justify-between [transform:rotateY(180deg)] [backface-visibility:hidden] border-2 border-indigo-200 dark:border-indigo-900/50">
            {/* Top Bar */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 truncate">
                {currentWord?.word} ({currentWord?.pos})
              </span>
              <button
                onClick={handleSpeak}
                className="p-1 rounded-full bg-white dark:bg-slate-800 text-indigo-600 hover:bg-indigo-50 transition shadow-xs shrink-0"
              >
                <Volume2 className="w-4 h-4" />
              </button>
            </div>

            {/* Meaning & Deep Learning Insights */}
            <div className="space-y-2 my-auto py-1.5 overflow-y-auto max-h-[280px] no-scrollbar">
              {/* Thai Meaning */}
              <div className="bg-white dark:bg-slate-800/90 p-2.5 sm:p-3 rounded-2xl shadow-xs border border-indigo-100 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-indigo-500 block mb-0.5">ความหมายภาษาไทย:</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug break-words">
                  {currentWord?.meaning}
                </p>
              </div>

              {/* Word Family Tree */}
              {currentWord?.wordFamily && (
                <div className="bg-indigo-50/80 dark:bg-slate-800/70 p-2.5 rounded-xl border border-indigo-200/60 dark:border-indigo-900/40 text-left text-xs space-y-1">
                  <span className="text-[10px] font-extrabold text-indigo-600 dark:text-indigo-400 block uppercase tracking-wider">
                    🌳 ตระกูลคำ (Word Family):
                  </span>
                  <div className="flex flex-wrap gap-1.5 text-[11px]">
                    {currentWord.wordFamily.noun && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        <span className="text-indigo-500 font-bold">n.</span> {currentWord.wordFamily.noun}
                      </span>
                    )}
                    {currentWord.wordFamily.verb && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        <span className="text-emerald-500 font-bold">v.</span> {currentWord.wordFamily.verb}
                      </span>
                    )}
                    {currentWord.wordFamily.adj && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        <span className="text-amber-500 font-bold">adj.</span> {currentWord.wordFamily.adj}
                      </span>
                    )}
                    {currentWord.wordFamily.adv && (
                      <span className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md font-semibold text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                        <span className="text-purple-500 font-bold">adv.</span> {currentWord.wordFamily.adv}
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Collocations */}
              {currentWord?.collocations && currentWord.collocations.length > 0 && (
                <div className="bg-amber-50/70 dark:bg-slate-800/70 p-2.5 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-left text-xs">
                  <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 block uppercase tracking-wider mb-1">
                    🧩 คำคู่ติดที่ใช้บ่อย (Collocations):
                  </span>
                  <div className="flex flex-wrap gap-1 text-[11px]">
                    {currentWord.collocations.map((col, idx) => (
                      <span
                        key={idx}
                        className="bg-white dark:bg-slate-900 px-2 py-0.5 rounded-md font-medium text-slate-700 dark:text-slate-200 border border-amber-200/60 dark:border-slate-700"
                      >
                        {col}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Synonyms & Antonyms */}
              {((currentWord?.synonyms && currentWord.synonyms.length > 0) ||
                (currentWord?.antonyms && currentWord.antonyms.length > 0)) && (
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 rounded-xl border border-slate-200/60 dark:border-slate-700/50 flex flex-wrap items-center gap-2 text-[10px] text-left">
                  {currentWord.synonyms && currentWord.synonyms.length > 0 && (
                    <span className="text-slate-600 dark:text-slate-400">
                      <strong className="text-emerald-600 dark:text-emerald-400">คำเหมือน:</strong>{' '}
                      {currentWord.synonyms.join(', ')}
                    </span>
                  )}
                  {currentWord.antonyms && currentWord.antonyms.length > 0 && (
                    <span className="text-slate-600 dark:text-slate-400">
                      <strong className="text-rose-600 dark:text-rose-400">คำตรงข้าม:</strong>{' '}
                      {currentWord.antonyms.join(', ')}
                    </span>
                  )}
                </div>
              )}

              {/* Real Context Example */}
              {currentWord?.example && (
                <div className="bg-white/80 dark:bg-slate-800/50 p-2.5 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ตัวอย่างประโยคบริบทจริง:</span>
                  <p className="text-xs text-slate-700 dark:text-slate-300 italic leading-relaxed break-words">
                    "{currentWord.example}"
                  </p>
                </div>
              )}
            </div>

            {/* Back tap hint */}
            <div className="text-center text-[10px] text-slate-400 whitespace-nowrap pt-1">
              แตะเพื่อพลิกกลับด้านหน้า
            </div>
          </div>
        </div>
      </div>

      {/* 3 Thumb-friendly Rating Buttons */}
      <div className="grid grid-cols-3 gap-1.5 pt-1">
        {/* Button 1: Focus */}
        <button
          onClick={handleMarkFocus}
          className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 active:scale-95 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-400 font-bold text-[11px] sm:text-xs py-2.5 px-2 rounded-2xl transition flex flex-col sm:flex-row items-center justify-center gap-1 shadow-xs"
          title="คำนี้ยังไม่แม่น ส่งเข้า Focus Zone เพื่อทบทวนซ้ำ"
        >
          <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-rose-500" />
          <span className="whitespace-nowrap">ยังไม่แม่น</span>
        </button>

        {/* Button 2: SRS Next Review */}
        <button
          onClick={handleSrsReview}
          className="bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 active:scale-95 border border-amber-200 dark:border-amber-800/60 text-amber-700 dark:text-amber-400 font-bold text-[11px] sm:text-xs py-2.5 px-2 rounded-2xl transition flex flex-col sm:flex-row items-center justify-center gap-1 shadow-xs"
          title="พอจำได้ เลื่อนกล่องทบทวน SRS ตามรอบ"
        >
          <RotateCw className="w-3.5 h-3.5 shrink-0 text-amber-500" />
          <span className="whitespace-nowrap">ทบทวนต่อ (SRS)</span>
        </button>

        {/* Button 3: Mastered */}
        <button
          onClick={handleMarkMastered}
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-[11px] sm:text-xs py-2.5 px-2 rounded-2xl transition flex flex-col sm:flex-row items-center justify-center gap-1 shadow-md shadow-emerald-600/20"
          title="จำได้แม่นยำถาวรแล้ว บันทึกลง Mastered Bank และนำออกจากคิวเรียน"
        >
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span className="whitespace-nowrap">จำได้แม่นแล้ว</span>
        </button>
      </div>

      {/* Prev / Next Small Navigation */}
      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 pt-1 px-1">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition py-1 px-2 rounded-lg"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>คำก่อนหน้า</span>
        </button>

        <span className="text-[11px] text-slate-400">
          คำที่ {currentIndex + 1} / {filteredWords.length}
        </span>

        <button
          onClick={handleNext}
          className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition py-1 px-2 rounded-lg"
        >
          <span>คำถัดไป</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
