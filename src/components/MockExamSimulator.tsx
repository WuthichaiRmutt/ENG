import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  Headphones,
  BookOpen,
  Brain,
  CheckCircle2,
  XCircle,
  Flag,
  RotateCcw,
  ArrowRight,
  ArrowLeft,
  Award,
  Sparkles,
  Check,
  AlertTriangle,
  Home,
  X,
  Play,
  Square,
  Trophy,
  BarChart3,
  Flame,
  Shuffle,
  RefreshCw,
  Layers,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  MOCK_EXAM_SET_1,
  MOCK_EXAM_SET_2,
  MOCK_EXAM_SET_3,
  generateDynamicExam,
  ExamQuestion,
  ExamSection,
} from '../data/mockExamDataset';
import { tts } from '../lib/tts';
import { soundFx } from '../lib/soundFx';

interface MockExamSimulatorProps {
  onBackToHome: () => void;
  onAddXP: (xp: number) => void;
  onMarkFocusWord?: (word: string) => void;
}

type ExamState = 'lobby' | 'in_progress' | 'completed' | 'review';
type FilterSection = 'all' | ExamSection;

export const MockExamSimulator: React.FC<MockExamSimulatorProps> = ({
  onBackToHome,
  onAddXP,
  onMarkFocusWord,
}) => {
  const [examState, setExamState] = useState<ExamState>('lobby');
  const [examTitle, setExamTitle] = useState('Full Mock Exam (ชุดสุ่ม)');
  const [questions, setQuestions] = useState<ExamQuestion[]>(MOCK_EXAM_SET_1);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shuffleChoices, setShuffleChoices] = useState(true);

  // User state
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Record<string, boolean>>({});
  const [timeRemaining, setTimeRemaining] = useState(25 * 60); // 25 minutes default
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isSubmitConfirmOpen, setIsSubmitConfirmOpen] = useState(false);

  // Audio playing & voice state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayCount, setAudioPlayCount] = useState<Record<string, number>>({});
  const [voiceGender, setVoiceGender] = useState<'male' | 'female'>('male');
  const [speechRate, setSpeechRate] = useState<number>(0.82);
  const [showTranscript, setShowTranscript] = useState<boolean>(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Launch Dynamic Exam (from question pool)
  const handleStartDynamicExam = (section: FilterSection = 'all', count: number = 20) => {
    try {
      const dynamicQuestions = generateDynamicExam({
        section,
        totalCount: count,
        shuffleChoices,
      });

      let durationMinutes = 25;
      let title = 'ชุดสุ่มข้อสอบพิเศษ (Dynamic Exam)';
      if (section === 'listening') {
        durationMinutes = 10;
        title = 'ฝึกพาร์ทการฟัง (Listening Focus)';
      } else if (section === 'reading') {
        durationMinutes = 12;
        title = 'ฝึกพาร์ทการอ่าน (Reading Focus)';
      } else if (section === 'use_of_english') {
        durationMinutes = 8;
        title = 'ฝึกคำศัพท์ & ไวยากรณ์ (Vocab Focus)';
      }

      setExamTitle(title);
      setQuestions(dynamicQuestions);
      setCurrentIndex(0);
      setUserAnswers({});
      setFlaggedQuestions({});
      setAudioPlayCount({});
      setTimeRemaining(durationMinutes * 60);
      setExamState('in_progress');
      if (typeof window !== 'undefined') {
        window.history.pushState({ exam: 'in_progress', tab: 'exam' }, '', '#exam-taking');
      }
      soundFx.playCorrect();
    } catch (e) {
      console.error('Error starting dynamic exam:', e);
    }
  };

  // Launch Predefined Static Sets
  const handleStartStaticSet = (setNumber: number) => {
    try {
      let chosenSet = MOCK_EXAM_SET_1;
      if (setNumber === 2) chosenSet = MOCK_EXAM_SET_2;
      if (setNumber === 3) chosenSet = MOCK_EXAM_SET_3;

      setExamTitle(`ชุดข้อสอบมาตรฐาน ชุดที่ ${setNumber}`);
      setQuestions(chosenSet);
      setCurrentIndex(0);
      setUserAnswers({});
      setFlaggedQuestions({});
      setAudioPlayCount({});
      setTimeRemaining(25 * 60);
      setExamState('in_progress');
      if (typeof window !== 'undefined') {
        window.history.pushState({ exam: 'in_progress', tab: 'exam' }, '', '#exam-taking');
      }
      soundFx.playCorrect();
    } catch (e) {
      console.error('Error starting static set:', e);
    }
  };

  // Listen to mobile physical / gesture back button while inside exam
  useEffect(() => {
    const handlePopState = () => {
      if (examState === 'in_progress') {
        setExamState('lobby');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [examState]);

  // Timer countdown
  useEffect(() => {
    if (examState === 'in_progress') {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleSubmitExam();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [examState]);

  // Keyboard navigation & shortcuts (1,2,3,4 or A,B,C,D, Arrows)
  useEffect(() => {
    if (examState !== 'in_progress') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaletteOpen || isSubmitConfirmOpen) return;

      const currentQ = questions[currentIndex];
      if (!currentQ) return;

      // Select option with 1-4 or A-D
      const key = e.key.toUpperCase();
      if (['A', 'B', 'C', 'D'].includes(key)) {
        handleSelectAnswer(currentQ.id, key);
      } else if (['1', '2', '3', '4'].includes(key)) {
        const optionMap: Record<string, string> = { '1': 'A', '2': 'B', '3': 'C', '4': 'D' };
        handleSelectAnswer(currentQ.id, optionMap[key]);
      } else if (e.key === 'ArrowRight' && currentIndex < questions.length - 1) {
        setCurrentIndex((i) => i + 1);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        setCurrentIndex((i) => i - 1);
      } else if (e.key.toLowerCase() === 'f') {
        toggleFlag(currentQ.id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [examState, currentIndex, questions, isPaletteOpen, isSubmitConfirmOpen]);

  const handleSelectAnswer = (questionId: string, optionId: string) => {
    try {
      soundFx.playTap();
    } catch {
      // AudioContext fallback
    }
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const toggleFlag = (questionId: string) => {
    setFlaggedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handlePlayAudio = async (text: string, qId: string) => {
    if (isPlayingAudio) {
      tts.stop();
      setIsPlayingAudio(false);
      return;
    }

    setIsPlayingAudio(true);
    setAudioPlayCount((prev) => ({
      ...prev,
      [qId]: (prev[qId] || 0) + 1,
    }));

    try {
      // Speak with selected gender (default: natural male) and clear articulation rate (0.82)
      await tts.speak(text, speechRate, voiceGender);
    } finally {
      setIsPlayingAudio(false);
    }
  };

  const handleSubmitExam = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsSubmitConfirmOpen(false);
    setIsPaletteOpen(false);
    setExamState('completed');

    // Calculate score & trigger celebratory confetti
    let correctCount = 0;
    questions.forEach((q) => {
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
      }
    });

    const scorePercentage = (correctCount / questions.length) * 100;
    if (scorePercentage >= 60) {
      soundFx.playMastered();
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
      onAddXP(correctCount * 10);
    } else {
      soundFx.playWrong();
      onAddXP(correctCount * 5);
    }
  };

  // Helper stats calculation
  const answeredCount = Object.keys(userAnswers).length;
  const flaggedCount = Object.values(flaggedQuestions).filter(Boolean).length;
  const unansweredCount = questions.length - answeredCount;

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ==========================================
  // VIEW 1: LOBBY & SELECTOR
  // ==========================================
  if (examState === 'lobby') {
    return (
      <div className="space-y-4 pb-20 animate-fade-in text-slate-800 dark:text-slate-100">
        {/* Apple Clean Title */}
        <div className="pt-1 pb-1">
          <span className="text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
            CBT Exam Simulator
          </span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-0.5">
            ข้อสอบจำลอง B1
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            จำลองสอบครบทุกพาร์ท ทั้งฟังเสียง อ่านบทความ และจับเวลาจริง
          </p>
        </div>

        {/* 🍎 1. Single Primary Hero Card (Apple Clean Card) */}
        <button
          type="button"
          onClick={() => handleStartDynamicExam('all', 20)}
          className="w-full text-left bg-gradient-to-br from-purple-600 via-indigo-600 to-indigo-700 text-white rounded-3xl p-5 shadow-lg shadow-indigo-600/20 cursor-pointer ios-spring space-y-3 block active:scale-[0.98] transition"
        >
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-md text-white flex items-center justify-center">
              <Trophy className="w-5 h-5 text-amber-300" />
            </div>
            <div className="flex items-center gap-1 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
              <Clock className="w-3.5 h-3.5 text-amber-300" />
              <span>25 นาที</span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tight text-white">
              ชุดข้อสอบจำลองเต็ม (Full CBT)
            </h2>
            <p className="text-xs text-indigo-100/90 mt-0.5 leading-relaxed">
              สุ่ม 20 ข้อจากคลัง • ฟังเสียง 7 ข้อ + อ่านบทความ 7 ข้อ + ไวยากรณ์ 6 ข้อ
            </p>
          </div>

          <div className="pt-1">
            <div className="w-full bg-white text-indigo-700 font-black text-xs py-3 rounded-2xl shadow-sm flex items-center justify-center gap-1.5">
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>เริ่มสอบจับเวลาทันที</span>
            </div>
          </div>
        </button>

        {/* 🍎 2. Clean Option Toggle Row */}
        <div className="bg-white dark:bg-[#1C1C1E] rounded-2xl p-3.5 border border-slate-200/70 dark:border-white/[0.08] shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Shuffle className="w-4 h-4 text-indigo-500" />
            <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
              สลับตำแหน่งตัวเลือก (A, B, C, D) ทุกรอบ
            </span>
          </div>
          <input
            type="checkbox"
            checked={shuffleChoices}
            onChange={(e) => setShuffleChoices(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-0 cursor-pointer"
          />
        </div>

        {/* 🍎 3. Inset Grouped Section: Skill Focus */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
            ฝึกเฉพาะทักษะ (Skill Focus)
          </h3>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-xs border border-slate-200/70 dark:border-white/[0.08] divide-y divide-slate-100 dark:divide-white/[0.06] overflow-hidden">
            <button
              type="button"
              onClick={() => handleStartDynamicExam('listening', 10)}
              className="w-full text-left flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center shrink-0">
                  <Headphones className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    ฝึกพาร์ทการฟัง (Listening)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    สุ่ม 10 ข้อ • จับเวลา 10 นาที • มีเสียงอ่านสำเนียงมาตรฐาน
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
            </button>

            <button
              type="button"
              onClick={() => handleStartDynamicExam('reading', 10)}
              className="w-full text-left flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    ฝึกพาร์ทการอ่าน (Reading)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    สุ่ม 10 ข้อ • จับเวลา 12 นาที • อ่านจับใจความบทความสั้น
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
            </button>

            <button
              type="button"
              onClick={() => handleStartDynamicExam('use_of_english', 10)}
              className="w-full text-left flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center shrink-0">
                  <Brain className="w-5 h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    ฝึกคำศัพท์ & ไวยากรณ์ (Vocab & Grammar)
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    สุ่ม 10 ข้อ • จับเวลา 8 นาที • โครงสร้างไวยากรณ์ B1
                  </p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
            </button>
          </div>
        </div>

        {/* 🍎 4. Inset Grouped Section: Official Preset Sets */}
        <div className="space-y-2 pt-1">
          <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-1">
            ชุดข้อสอบทางการ (Standard Sets)
          </h3>

          <div className="bg-white dark:bg-[#1C1C1E] rounded-3xl shadow-xs border border-slate-200/70 dark:border-white/[0.08] divide-y divide-slate-100 dark:divide-white/[0.06] overflow-hidden">
            {[1, 2, 3].map((setNum) => (
              <button
                type="button"
                key={setNum}
                onClick={() => handleStartStaticSet(setNum)}
                className="w-full text-left flex items-center justify-between p-3.5 hover:bg-slate-50 dark:hover:bg-white/[0.03] transition-colors cursor-pointer ios-spring"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-white/10 text-slate-700 dark:text-slate-200 flex items-center justify-center font-black text-xs shrink-0">
                    #{setNum}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                      ข้อสอบทางการ ชุดที่ {setNum}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      Cambridge B1 มาตรฐาน • 20 ข้อ
                    </p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 shrink-0 pl-1" />
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Current Question
  const currentQ = questions[currentIndex];
  const isFlagged = currentQ ? !!flaggedQuestions[currentQ.id] : false;
  const currentAnswer = currentQ ? userAnswers[currentQ.id] : undefined;

  // ==========================================
  // VIEW 2: ACTIVE EXAM IN PROGRESS
  // ==========================================
  if (examState === 'in_progress' && currentQ) {
    const isListening = currentQ.section === 'listening';
    const isReading = currentQ.section === 'reading';

    return (
      <div className="space-y-4 pb-20 animate-fade-in relative">
        {/* Sticky Exam Simulator Control Bar */}
        <div className="sticky top-13 sm:top-14 z-30 ios-glass-bar -mx-3.5 px-3.5 py-2.5 border-b shadow-xs flex items-center justify-between gap-2">
          {/* Section & Progress */}
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-black uppercase px-2.5 py-1 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60 flex items-center gap-1.5">
              {isListening && <Headphones className="w-3.5 h-3.5" />}
              {isReading && <BookOpen className="w-3.5 h-3.5" />}
              {!isListening && !isReading && <Brain className="w-3.5 h-3.5" />}
              <span>
                ข้อ {currentIndex + 1}/{questions.length}
              </span>
            </span>
          </div>

          {/* Countdown Timer */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl font-mono text-xs font-black tabular-nums border ${
              timeRemaining < 180
                ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 border-rose-300 animate-pulse'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/80 dark:border-slate-700'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>{formatTimer(timeRemaining)}</span>
          </div>

          {/* Palette & Submit Actions */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleFlag(currentQ.id)}
              className={`p-2 rounded-xl border transition ${
                isFlagged
                  ? 'bg-amber-500 text-white border-amber-500 shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border-slate-200/80 dark:border-slate-700 hover:text-amber-500'
              }`}
              title="ปักหมุดข้อนี้ไว้ทบทวน (Flag)"
            >
              <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
            </button>

            <button
              onClick={() => setIsPaletteOpen(true)}
              className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold px-2.5 py-1.5 rounded-xl border border-slate-200/80 dark:border-slate-700 transition"
            >
              <span>ตารางข้อ</span>
              <span className="text-[10px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full font-black">
                {answeredCount}/{questions.length}
              </span>
            </button>

            <button
              onClick={() => setIsSubmitConfirmOpen(true)}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-black px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95"
            >
              ส่งข้อสอบ
            </button>
          </div>
        </div>

        {/* Current Exam Title Banner */}
        <div className="flex items-center justify-between text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-slate-100/80 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
          <span>📝 {examTitle}</span>
          <span>💡 {currentQ.instructions}</span>
        </div>

        {/* 🎧 LISTENING PLAYER PANEL */}
        {isListening && currentQ.audioText && (
          <div className="bg-gradient-to-r from-purple-900/90 via-indigo-900/90 to-slate-900 text-white p-4.5 rounded-2xl border border-purple-500/30 space-y-3 shadow-md">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center text-purple-300">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] text-purple-200 block">แหล่งเสียง:</span>
                  <strong className="text-xs font-bold">{currentQ.audioSpeaker || 'Audio Track'}</strong>
                </div>
              </div>

              {/* Voice Gender & Speed Controls */}
              <div className="flex items-center gap-1.5 text-xs">
                {/* Voice Gender Switcher */}
                <button
                  type="button"
                  onClick={() => setVoiceGender((prev) => (prev === 'male' ? 'female' : 'male'))}
                  className="bg-white/15 hover:bg-white/25 px-2.5 py-1 rounded-full text-[11px] font-bold text-white transition flex items-center gap-1"
                  title="เปลี่ยนเสียงพากย์"
                >
                  <span>{voiceGender === 'male' ? '👨 เสียงผู้ชาย (แนะนำ)' : '👩 เสียงผู้หญิง'}</span>
                </button>

                {/* Speed Switcher */}
                <button
                  type="button"
                  onClick={() => setSpeechRate((r) => (r === 0.82 ? 0.92 : 0.82))}
                  className="bg-white/15 hover:bg-white/25 px-2 py-1 rounded-full text-[10px] font-black text-amber-300 transition"
                  title="ปรับความเร็วเสียง"
                >
                  {speechRate === 0.82 ? '0.8x (ช้าชัด)' : '1.0x (ปกติ)'}
                </button>

                <span className="text-[10px] bg-white/15 px-2 py-0.5 rounded-full text-purple-200 font-medium">
                  ฟังแล้ว {audioPlayCount[currentQ.id] || 0} ครั้ง
                </span>
              </div>
            </div>

            {/* Audio Button with Waves */}
            <div className="flex items-center gap-3 bg-black/30 p-3 rounded-xl border border-white/10">
              <button
                type="button"
                onClick={() => handlePlayAudio(currentQ.audioText!, currentQ.id)}
                className={`w-11 h-11 rounded-full text-white flex items-center justify-center shadow-md active:scale-95 transition shrink-0 ${
                  isPlayingAudio ? 'bg-rose-500 hover:bg-rose-600' : 'bg-purple-500 hover:bg-purple-600'
                }`}
                title={isPlayingAudio ? 'หยุดเล่น' : 'กดเพื่อฟังเสียงโจทย์'}
              >
                {isPlayingAudio ? (
                  <Square className="w-4 h-4 fill-white" />
                ) : (
                  <Play className="w-5 h-5 fill-white ml-0.5" />
                )}
              </button>

              <div className="flex-1 min-w-0">
                <div className="text-xs font-bold text-white flex items-center justify-between">
                  <span>
                    {isPlayingAudio
                      ? `กำลังเล่นเสียง (${voiceGender === 'male' ? 'เสียงผู้ชาย' : 'เสียงผู้หญิง'})...`
                      : `กดเพื่อฟังเสียง ${voiceGender === 'male' ? 'ผู้ชาย (สำเนียงชัดเจน)' : 'ผู้หญิง'}`}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowTranscript((s) => !s)}
                    className="text-[10px] text-purple-300 hover:text-white underline underline-offset-2 ml-2 shrink-0"
                  >
                    {showTranscript ? 'ซ่อนสคริปต์' : 'เปิดดูบทอ่าน'}
                  </button>
                </div>
                {/* Visual Audio Wave animation */}
                <div className="flex items-center gap-1 mt-1.5 h-4">
                  {[40, 70, 30, 90, 60, 100, 50, 80, 45, 85, 30, 60, 95, 40].map((height, i) => (
                    <span
                      key={i}
                      className={`w-1 rounded-full transition-all duration-300 ${
                        isPlayingAudio
                          ? 'bg-purple-400 animate-pulse'
                          : 'bg-white/20'
                      }`}
                      style={{ height: isPlayingAudio ? `${height}%` : '20%' }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Transcript peek for learners */}
            {showTranscript && (
              <div className="bg-black/40 border border-white/10 p-2.5 rounded-xl text-[11px] text-purple-100 font-serif italic animate-fade-in">
                "{currentQ.audioText}"
              </div>
            )}
          </div>
        )}

        {/* 📖 READING PASSAGE PANEL */}
        {isReading && currentQ.passage && (
          <div className="bg-amber-50/70 dark:bg-slate-900/90 border border-amber-200/80 dark:border-amber-900/40 rounded-2xl p-4.5 space-y-2.5 shadow-xs">
            <div className="flex items-center justify-between border-b border-amber-200/60 dark:border-amber-900/40 pb-2">
              <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                {currentQ.passage.type.toUpperCase()}
              </span>
              <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {currentQ.passage.title}
              </h4>
            </div>
            <div className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line font-serif italic bg-white/70 dark:bg-slate-950/60 p-3.5 rounded-xl border border-amber-100 dark:border-slate-800">
              {currentQ.passage.content}
            </div>
          </div>
        )}

        {/* QUESTION TEXT */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
          <div className="flex items-start gap-2.5">
            <span className="w-6 h-6 rounded-lg bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
              {currentIndex + 1}
            </span>
            <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* 4 CHOICES */}
          <div className="space-y-2.5 pt-1">
            {currentQ.options.map((opt) => {
              const isSelected = currentAnswer === opt.id;

              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleSelectAnswer(currentQ.id, opt.id)}
                  className={`w-full text-left p-3.5 rounded-2xl border transition-all flex items-center justify-between gap-3 cursor-pointer select-none ios-spring ${
                    isSelected
                      ? 'bg-indigo-50/95 dark:bg-indigo-950/60 border-indigo-600 dark:border-indigo-500 shadow-xs ring-1 ring-indigo-500/30'
                      : 'bg-white/80 dark:bg-slate-800/60 border-slate-200/80 dark:border-slate-700/80 hover:bg-white dark:hover:bg-slate-800 hover:border-indigo-300'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition ${
                        isSelected
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-600'
                      }`}
                    >
                      {opt.id}
                    </span>
                    <span
                      className={`text-xs sm:text-sm leading-snug break-words ${
                        isSelected
                          ? 'font-bold text-indigo-950 dark:text-indigo-100'
                          : 'font-medium text-slate-700 dark:text-slate-200'
                      }`}
                    >
                      {opt.text}
                    </span>
                  </div>

                  {isSelected && (
                    <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* BOTTOM NAVIGATION FOOTER */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <button
            onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
            disabled={currentIndex === 0}
            className="flex items-center gap-1 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-800 transition shadow-2xs"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>ข้อก่อนหน้า</span>
          </button>

          <button
            onClick={() => toggleFlag(currentQ.id)}
            className={`flex items-center gap-1.5 text-xs font-bold px-3 py-2.5 rounded-xl border transition ${
              isFlagged
                ? 'bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 border-amber-300'
                : 'text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 border-transparent'
            }`}
          >
            <Flag className={`w-3.5 h-3.5 ${isFlagged ? 'fill-current' : ''}`} />
            <span>{isFlagged ? 'ปักหมุดแล้ว' : 'ปักหมุดทบทวน'}</span>
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
              className="flex items-center gap-1 text-xs font-black px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md active:scale-95 transition"
            >
              <span>ข้อถัดไป</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              onClick={() => setIsSubmitConfirmOpen(true)}
              className="flex items-center gap-1 text-xs font-black px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md active:scale-95 transition"
            >
              <span>ส่งข้อสอบ</span>
              <Check className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* 🔢 QUESTION PALETTE MODAL / DRAWER */}
        {isPaletteOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-5 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-up">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="font-black text-sm text-slate-900 dark:text-white">
                    ตารางเลขข้อ (Question Palette)
                  </h3>
                  <p className="text-[11px] text-slate-500">คลิกที่เลขข้อเพื่อข้ามไปยังข้อนั้นทันที</p>
                </div>
                <button
                  onClick={() => setIsPaletteOpen(false)}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Status Legend */}
              <div className="flex items-center justify-around text-[10px] font-bold py-1 bg-slate-50 dark:bg-slate-800/60 rounded-xl">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-500" />
                  <span>ตอบแล้ว ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-amber-500" />
                  <span>ปักหมุด ({flaggedCount})</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-slate-200 dark:bg-slate-700" />
                  <span>ยังไม่ตอบ ({unansweredCount})</span>
                </div>
              </div>

              {/* Grid of question numbers */}
              <div className="grid grid-cols-5 gap-2 max-h-64 overflow-y-auto p-1">
                {questions.map((q, idx) => {
                  const isAnswered = !!userAnswers[q.id];
                  const isFlag = !!flaggedQuestions[q.id];
                  const isCurrent = idx === currentIndex;

                  let bgClass = 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300';
                  if (isAnswered) bgClass = 'bg-emerald-500 text-white';
                  if (isFlag) bgClass = 'bg-amber-500 text-white';

                  return (
                    <button
                      key={q.id}
                      onClick={() => {
                        setCurrentIndex(idx);
                        setIsPaletteOpen(false);
                      }}
                      className={`h-11 rounded-xl text-xs font-black relative flex items-center justify-center transition-all ${bgClass} ${
                        isCurrent ? 'ring-2 ring-indigo-600 ring-offset-2 dark:ring-offset-slate-900 scale-105' : ''
                      }`}
                    >
                      <span>{idx + 1}</span>
                      {isFlag && (
                        <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-white animate-pulse" />
                      )}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setIsPaletteOpen(false)}
                className="w-full py-2.5 text-xs font-bold bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition text-slate-700 dark:text-slate-200"
              >
                ปิดหน้าต่าง
              </button>
            </div>
          </div>
        )}

        {/* ⚠️ SUBMIT CONFIRMATION MODAL */}
        {isSubmitConfirmOpen && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-sm w-full p-6 space-y-4 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-scale-up">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 mx-auto flex items-center justify-center">
                <AlertTriangle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="font-black text-base text-slate-900 dark:text-white">
                  ยืนยันส่งข้อสอบหรือไม่?
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  เมื่อส่งแล้วระบบจะตรวจคำตอบและประเมินผลคะแนนทันที
                </p>
              </div>

              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl text-xs space-y-1.5 text-left border border-slate-200/60 dark:border-slate-700/60">
                <div className="flex justify-between">
                  <span className="text-slate-500">ตอบแล้ว:</span>
                  <strong className="text-emerald-600 font-bold">{answeredCount} ข้อ</strong>
                </div>
                {unansweredCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">ยังไม่ได้ตอบ:</span>
                    <strong className="text-rose-500 font-bold">{unansweredCount} ข้อ</strong>
                  </div>
                )}
                {flaggedCount > 0 && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">ปักหมุดทบทวน:</span>
                    <strong className="text-amber-500 font-bold">{flaggedCount} ข้อ</strong>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => setIsSubmitConfirmOpen(false)}
                  className="flex-1 py-2.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition"
                >
                  กลับไปทำต่อ
                </button>
                <button
                  onClick={handleSubmitExam}
                  className="flex-1 py-2.5 text-xs font-black bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl shadow-md active:scale-95 transition"
                >
                  ยืนยันส่งข้อสอบ
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ==========================================
  // VIEW 3: COMPLETED SCORE & CEFR REPORT
  // ==========================================
  if (examState === 'completed') {
    let correctCount = 0;
    const sectionStats: Record<ExamSection, { total: number; correct: number }> = {
      listening: { total: 0, correct: 0 },
      reading: { total: 0, correct: 0 },
      use_of_english: { total: 0, correct: 0 },
    };

    const wrongQuestions: ExamQuestion[] = [];

    questions.forEach((q) => {
      sectionStats[q.section].total++;
      if (userAnswers[q.id] === q.correctAnswer) {
        correctCount++;
        sectionStats[q.section].correct++;
      } else {
        wrongQuestions.push(q);
      }
    });

    const percentage = Math.round((correctCount / questions.length) * 100);

    // CEFR Level Mapping
    let cefrBand = 'A2 High';
    let cefrBadgeColor = 'bg-blue-500';
    let cefrDesc = 'ระดับพื้นฐานเทียบเท่า Elementary พร้อมพัฒนาสู่ระดับ B1';
    let estimatedToeic = '400 - 520';

    if (percentage >= 85) {
      cefrBand = 'B2 Independent';
      cefrBadgeColor = 'bg-emerald-500';
      cefrDesc = 'ยอดเยี่ยม! ทักษะการฟังและการอ่านอยู่ในระดับใช้งานคล่องแคล่ว';
      estimatedToeic = '750 - 850';
    } else if (percentage >= 65) {
      cefrBand = 'B1 Preliminary (Pass)';
      cefrBadgeColor = 'bg-indigo-600';
      cefrDesc = 'ผ่านเกณฑ์มาตรฐานระดับ B1 สามารถสื่อสารและจับใจความสำคัญได้แม่นยำ';
      estimatedToeic = '550 - 720';
    }

    return (
      <div className="space-y-6 pb-12 animate-fade-in">
        {/* Top Report Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-800 via-indigo-700 to-violet-900 text-white p-6 sm:p-8 text-center space-y-4 shadow-xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-black tracking-wide uppercase">
            <Trophy className="w-3.5 h-3.5 text-amber-300" />
            OFFICIAL DIAGNOSTIC SCORE REPORT
          </div>

          <div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white tabular-nums">
              {correctCount} <span className="text-xl sm:text-2xl text-indigo-200">/ {questions.length}</span>
            </div>
            <div className="text-xs sm:text-sm font-bold text-indigo-100 mt-1">
              ความแม่นยำรวม {percentage}%
            </div>
          </div>

          {/* CEFR Level Box */}
          <div className="bg-white/10 backdrop-blur-md p-4 rounded-2xl max-w-sm mx-auto border border-white/20 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className={`text-xs font-black px-2.5 py-0.5 rounded-full text-white ${cefrBadgeColor}`}>
                CEFR: {cefrBand}
              </span>
              <span className="text-xs text-amber-300 font-bold">TOEIC ~ {estimatedToeic}</span>
            </div>
            <p className="text-[11px] text-indigo-100 leading-relaxed pt-1">{cefrDesc}</p>
          </div>
        </div>

        {/* 📊 Section-by-Section Breakdown */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 space-y-3.5 shadow-xs">
          <h3 className="font-black text-sm text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <span>ผลประเมินรายทักษะ (Skill Breakdown)</span>
          </h3>

          <div className="space-y-3">
            {/* Listening */}
            {sectionStats.listening.total > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400">
                    <Headphones className="w-3.5 h-3.5" />
                    <span>Part 1: พาร์ทการฟัง (Listening)</span>
                  </span>
                  <span>
                    {sectionStats.listening.correct}/{sectionStats.listening.total} ข้อ (
                    {Math.round((sectionStats.listening.correct / sectionStats.listening.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(sectionStats.listening.correct / sectionStats.listening.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Reading */}
            {sectionStats.reading.total > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Part 2: พาร์ทการอ่าน (Reading)</span>
                  </span>
                  <span>
                    {sectionStats.reading.correct}/{sectionStats.reading.total} ข้อ (
                    {Math.round((sectionStats.reading.correct / sectionStats.reading.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(sectionStats.reading.correct / sectionStats.reading.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}

            {/* Use of English */}
            {sectionStats.use_of_english.total > 0 && (
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-bold">
                  <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                    <Brain className="w-3.5 h-3.5" />
                    <span>Part 3: คำศัพท์ & ไวยากรณ์ (Use of English)</span>
                  </span>
                  <span>
                    {sectionStats.use_of_english.correct}/{sectionStats.use_of_english.total} ข้อ (
                    {Math.round((sectionStats.use_of_english.correct / sectionStats.use_of_english.total) * 100)}%)
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(sectionStats.use_of_english.correct / sectionStats.use_of_english.total) * 100}%`,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <button
            onClick={() => setExamState('review')}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm shadow-md active:scale-98 transition flex items-center justify-center gap-2"
          >
            <span>ดูเฉลยละเอียดและคำอธิบายทุกข้อ ({questions.length} ข้อ)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {wrongQuestions.length > 0 && onMarkFocusWord && (
            <button
              onClick={() => {
                wrongQuestions.forEach((q) => {
                  if (q.relatedVocabWord) onMarkFocusWord(q.relatedVocabWord);
                });
                alert(`เพิ่ม ${wrongQuestions.length} คำศัพท์ที่ควรทบทวนเข้าคลังศัพท์เน้นย้ำเรียบร้อยแล้ว!`);
              }}
              className="w-full py-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-700 dark:text-amber-300 font-bold text-xs hover:bg-amber-100 transition flex items-center justify-center gap-2"
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>ส่งคำศัพท์ที่ตอบผิด ({wrongQuestions.length} ข้อ) ไปยังคลังท่องซ้ำ</span>
            </button>
          )}

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleStartDynamicExam('all', 20)}
              className="flex-1 py-3 rounded-2xl border border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-black text-xs hover:bg-indigo-100 transition flex items-center justify-center gap-1.5"
            >
              <Shuffle className="w-3.5 h-3.5" />
              <span>สุ่มสอบชุดใหม่ทันที</span>
            </button>

            <button
              onClick={() => setExamState('lobby')}
              className="flex-1 py-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>กลับเมนูเลือกชุด</span>
            </button>

            <button
              onClick={onBackToHome}
              className="py-3 px-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-bold text-xs hover:bg-slate-100 transition flex items-center justify-center gap-1.5"
            >
              <Home className="w-3.5 h-3.5" />
              <span>หน้าหลัก</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // VIEW 4: DETAILED EXPLANATION & REVIEW
  // ==========================================
  return (
    <div className="space-y-5 pb-16 animate-fade-in">
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
        <button
          onClick={() => setExamState('completed')}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>กลับไปหน้าสรุปคะแนน</span>
        </button>
        <span className="text-xs font-black text-slate-800 dark:text-slate-100">
          เฉลยละเอียดและคำอธิบาย
        </span>
      </div>

      <div className="space-y-4">
        {questions.map((q, idx) => {
          const userAns = userAnswers[q.id];
          const isCorrect = userAns === q.correctAnswer;

          return (
            <div
              key={q.id}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-4.5 sm:p-5 border space-y-3.5 shadow-xs ${
                isCorrect
                  ? 'border-emerald-300 dark:border-emerald-900/60'
                  : 'border-rose-300 dark:border-rose-900/60'
              }`}
            >
              {/* Question Header */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-6 h-6 rounded-lg text-xs font-black flex items-center justify-center text-white ${
                      isCorrect ? 'bg-emerald-500' : 'bg-rose-500'
                    }`}
                  >
                    {idx + 1}
                  </span>
                  <span className="text-[11px] font-bold text-slate-500">
                    {q.sectionTitle}
                  </span>
                </div>
                <div className="flex items-center gap-1">
                  {isCorrect ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ถูกต้อง
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-black text-rose-600 bg-rose-50 dark:bg-rose-950 px-2 py-0.5 rounded-full">
                      <XCircle className="w-3.5 h-3.5" /> ไม่ถูกต้อง
                    </span>
                  )}
                </div>
              </div>

              {/* Question text */}
              <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                {q.question}
              </h4>

              {/* Options Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                {q.options.map((opt) => {
                  const isUserPick = userAns === opt.id;
                  const isRightAnswer = q.correctAnswer === opt.id;

                  let cardStyle = 'bg-slate-50 dark:bg-slate-800/40 border-slate-200/60 dark:border-slate-800 text-slate-700 dark:text-slate-300';
                  if (isRightAnswer) {
                    cardStyle = 'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-900 dark:text-emerald-100 font-bold';
                  } else if (isUserPick && !isCorrect) {
                    cardStyle = 'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-900 dark:text-rose-100 font-bold line-through';
                  }

                  return (
                    <div
                      key={opt.id}
                      className={`p-2.5 rounded-xl border text-xs flex items-center justify-between gap-2 ${cardStyle}`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="font-black">{opt.id}.</span>
                        <span>{opt.text}</span>
                      </div>
                      {isRightAnswer && <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                      {isUserPick && !isCorrect && <X className="w-3.5 h-3.5 text-rose-600 shrink-0" />}
                    </div>
                  );
                })}
              </div>

              {/* In-depth Thai Explanation */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-2xl border border-slate-200/60 dark:border-slate-700/60 space-y-1">
                <div className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>คำอธิบายเฉลย:</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {q.explanation}
                </p>
                {q.audioText && (
                  <div className="pt-2 text-[11px] text-slate-500 dark:text-slate-400 font-serif italic border-t border-slate-200/60 dark:border-slate-700/60 mt-2">
                    <span className="font-bold font-sans not-italic text-slate-600 dark:text-slate-300 block mb-0.5">
                      บทสนทนา / สคริปต์เสียงอ่าน:
                    </span>
                    "{q.audioText}"
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-center pt-4">
        <button
          onClick={onBackToHome}
          className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs shadow-md transition"
        >
          กลับสู่หน้าหลัก (Portal Hub)
        </button>
      </div>
    </div>
  );
};
