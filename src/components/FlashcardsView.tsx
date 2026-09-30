import React, { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Volume2,
  RotateCw,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Shuffle,
} from 'lucide-react';
import { WordItem, UserWordProgress } from '../types';
import { ttsService } from '../lib/tts';
import { isDueForReview } from '../lib/srs';

interface FlashcardsViewProps {
  words: WordItem[];
  progressMap: Record<string, UserWordProgress>;
  onRecordResult: (vocabId: string, isCorrect: boolean) => void;
  initialFilter?: string;
}

export const FlashcardsView: React.FC<FlashcardsViewProps> = ({
  words,
  progressMap,
  onRecordResult,
  initialFilter = 'all',
}) => {
  const [filterMode, setFilterMode] = useState<string>(initialFilter);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    if (initialFilter) {
      setFilterMode(initialFilter);
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  }, [initialFilter]);

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
    return words;
  }, [words, progressMap, filterMode]);

  useEffect(() => {
    if (currentIndex >= filteredWords.length) {
      setCurrentIndex(Math.max(0, filteredWords.length - 1));
    }
  }, [filteredWords.length, currentIndex]);

  const currentWord = filteredWords[currentIndex] || null;
  const currentProgress = currentWord ? progressMap[currentWord.id] : null;

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

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1 < filteredWords.length ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 >= 0 ? prev - 1 : filteredWords.length - 1));
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (filteredWords.length > 1) {
      const randomIndex = Math.floor(Math.random() * filteredWords.length);
      setCurrentIndex(randomIndex);
    }
  };

  const handleRate = (isCorrect: boolean) => {
    if (!currentWord) return;
    onRecordResult(currentWord.id, isCorrect);
    handleNext();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault();
        setIsFlipped((f) => !f);
      } else if (e.code === 'ArrowRight') {
        handleRate(true);
      } else if (e.code === 'ArrowLeft') {
        handleRate(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentWord]);

  if (filteredWords.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 text-center my-6 space-y-3.5 shadow-sm">
        <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 mx-auto flex items-center justify-center text-2xl">
          🎯
        </div>
        <h3 className="text-base sm:text-lg font-bold text-slate-800 dark:text-slate-100">
          ไม่พบคำศัพท์ในหมวดหมู่นี้
        </h3>
        <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
          {filterMode === 'focus'
            ? 'ยอดเยี่ยมมาก! ไม่มีคำที่ค้างอยู่ใน Focus Zone แล้ว'
            : 'ลองสลับกลับไปที่โหมดแสดงคำศัพท์ทั้งหมดเพื่อเริ่มฝึกฝน'}
        </p>
        <button
          onClick={() => setFilterMode('all')}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs py-2 px-4 rounded-xl transition shadow-xs"
        >
          แสดงคำศัพท์ทั้งหมด (500 คำ)
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-3.5 pb-8 max-w-md mx-auto">
      {/* Top Filter Chips */}
      <div className="flex items-center justify-between gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={() => {
              setFilterMode('all');
              setCurrentIndex(0);
            }}
            className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              filterMode === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
            }`}
          >
            ทั้งหมด ({words.length})
          </button>

          <button
            onClick={() => {
              setFilterMode('focus');
              setCurrentIndex(0);
            }}
            className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 whitespace-nowrap ${
              filterMode === 'focus'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900/50'
            }`}
          >
            <AlertTriangle className="w-3 h-3 shrink-0" />
            <span>ยังไม่แม่น</span>
          </button>

          <button
            onClick={() => {
              setFilterMode('due');
              setCurrentIndex(0);
            }}
            className={`text-[11px] sm:text-xs px-2.5 sm:px-3 py-1.5 rounded-full font-bold transition whitespace-nowrap ${
              filterMode === 'due'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-white dark:bg-slate-800 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-900/50'
            }`}
          >
            ถึงรอบทบทวน
          </button>
        </div>

        <button
          onClick={handleShuffle}
          className="p-1.5 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:text-indigo-600 transition shrink-0"
          title="สุ่มการ์ด"
        >
          <Shuffle className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Progress & Card Index Header */}
      <div className="flex items-center justify-between text-xs text-slate-400 font-semibold px-1">
        <span className="whitespace-nowrap">
          ใบที่ <span className="text-indigo-600 dark:text-indigo-400 font-bold">{currentIndex + 1}</span> / {filteredWords.length}
        </span>

        {currentProgress && (
          <span className="flex items-center gap-1 text-[11px] bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 px-2 py-0.5 rounded-md font-semibold whitespace-nowrap">
            SRS Box {currentProgress.boxLevel}/5
          </span>
        )}
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
              <span>แตะเพื่อดูคำแปลและความหมาย</span>
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

            {/* Meaning & Example */}
            <div className="space-y-2.5 my-auto py-2">
              <div className="bg-white dark:bg-slate-800/90 p-3 rounded-2xl shadow-xs border border-indigo-100 dark:border-slate-700/60">
                <span className="text-[10px] font-bold text-indigo-500 block mb-0.5">ความหมายภาษาไทย:</span>
                <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug break-words">
                  {currentWord?.meaning}
                </p>
              </div>

              {currentWord?.example && (
                <div className="bg-white/80 dark:bg-slate-800/50 p-2.5 sm:p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/50">
                  <span className="text-[10px] font-bold text-slate-400 block mb-0.5">ตัวอย่างประโยคบริบทจริง:</span>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 italic leading-relaxed break-words">
                    "{currentWord.example}"
                  </p>
                </div>
              )}
            </div>

            {/* Back tap hint */}
            <div className="text-center text-[10px] text-slate-400 whitespace-nowrap">
              แตะเพื่อพลิกกลับด้านหน้า
            </div>
          </div>
        </div>
      </div>

      {/* Thumb-friendly SRS Rating Buttons */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          onClick={() => handleRate(false)}
          className="bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 active:scale-95 border border-rose-200 dark:border-rose-800/60 text-rose-700 dark:text-rose-400 font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl transition flex items-center justify-center gap-1.5 shadow-xs whitespace-nowrap"
        >
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>ยังไม่แม่น (Focus)</span>
        </button>

        <button
          onClick={() => handleRate(true)}
          className="bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs sm:text-sm py-2.5 px-3 rounded-2xl transition flex items-center justify-center gap-1.5 shadow-md shadow-emerald-600/20 whitespace-nowrap"
        >
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>จำได้แม่นแล้ว</span>
        </button>
      </div>

      {/* Prev / Next Small Navigation */}
      <div className="flex items-center justify-center gap-4 text-xs font-semibold text-slate-400 pt-0.5">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition p-1"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
          <span>ย้อนกลับ</span>
        </button>
        <span>•</span>
        <button
          onClick={handleNext}
          className="flex items-center gap-1 hover:text-slate-700 dark:hover:text-slate-200 transition p-1"
        >
          <span>คำถัดไป</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
