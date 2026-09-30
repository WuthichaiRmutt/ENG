import React, { useState, useEffect } from 'react';
import { FileText, CheckCircle2, XCircle, RotateCcw, Trophy, ArrowRight, ArrowLeft, Lightbulb } from 'lucide-react';
import confetti from 'canvas-confetti';
import { WordItem } from '../types';
import { soundFx } from '../lib/soundFx';

interface ClozeQuestion {
  sentence: string; // with "________"
  targetWord: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

interface ClozeTestGameProps {
  words: WordItem[];
  onAddXP: (xp: number) => void;
  onBack: () => void;
}

// Authentic Cambridge PET B1 Cloze & Word Formation questions
const CLOZE_BANK: ClozeQuestion[] = [
  {
    sentence: "She happily ________ the prestigious university's admission offer.",
    targetWord: "accept",
    options: ["accept", "accepted", "acceptable", "acceptance"],
    correctAnswer: "accepted",
    explanation: "ประโยคเล่าถึงเหตุการณ์ในอดีต (Past Simple) ต้องใช้คำกริยาช่อง 2 'accepted'",
  },
  {
    sentence: "The travel package includes luxury beachfront hotel ________.",
    targetWord: "accommodation",
    options: ["accommodate", "accommodation", "accommodating", "accommodates"],
    correctAnswer: "accommodation",
    explanation: "ตามหลังคำคุณศัพท์ 'luxury hotel' ต้องเป็นคำนาม (Noun) จึงตอบ 'accommodation' (ที่พัก)",
  },
  {
    sentence: "The laboratory thermometer provides highly ________ readings.",
    targetWord: "accurate",
    options: ["accurate", "accurately", "accuracy", "accurating"],
    correctAnswer: "accurate",
    explanation: "อยู่หน้านาม 'readings' และหลัง adverb 'highly' ต้องใช้คำคุณศัพท์ (Adjective) 'accurate'",
  },
  {
    sentence: "Hard work and daily discipline are essential to ________ success.",
    targetWord: "achieve",
    options: ["achieve", "achievement", "achievable", "achieving"],
    correctAnswer: "achieve",
    explanation: "โครงสร้าง Infinitive with to: 'to + V.infinitive' (กริยารูปเดิมไม่ผัน) จึงตอบ 'achieve'",
  },
  {
    sentence: "You must always be ________ for your own decisions and actions.",
    targetWord: "responsible",
    options: ["responsible", "responsibility", "responsibly", "response"],
    correctAnswer: "responsible",
    explanation: "หลัง Verb to be (is/am/are/be) ต้องตามด้วย Adjective 'responsible' คู่กับ 'for'",
  },
  {
    sentence: "The committee finally reached an important ________ after hours of debate.",
    targetWord: "decision",
    options: ["decide", "decision", "decisive", "decisively"],
    correctAnswer: "decision",
    explanation: "Collocation ที่ใช้บ่อย: 'reach a decision' (ได้ข้อสรุป/การตัดสินใจ) ต้องใช้คำนาม (Noun)",
  },
  {
    sentence: "If you practice consistently, passing the B1 exam is a piece of ________.",
    targetWord: "cake",
    options: ["bread", "cake", "candy", "pie"],
    correctAnswer: "cake",
    explanation: "สำนวน Cambridge B1 Idiom: 'a piece of cake' แปลว่า 'ง่ายเหมือนปอกกล้วย'",
  },
  {
    sentence: "We need to ________ the truth before making any accusations.",
    targetWord: "find out",
    options: ["find out", "give up", "break down", "turn down"],
    correctAnswer: "find out",
    explanation: "กริยาวลี (Phrasal Verb): 'find out' แปลว่า ค้นหาความจริง/หาคำตอบให้กระจ่าง",
  },
  {
    sentence: "I am feeling a bit under the ________ today, so I will rest at home.",
    targetWord: "weather",
    options: ["cloud", "rain", "weather", "water"],
    correctAnswer: "weather",
    explanation: "สำนวน B1 Idiom: 'under the weather' แปลว่า 'รู้สึกไม่ค่อยสบาย / ป่วยเล็กน้อย'",
  },
  {
    sentence: "Regular cardiovascular exercise is extremely ________ to your heart.",
    targetWord: "beneficial",
    options: ["benefit", "beneficial", "beneficially", "benefiting"],
    correctAnswer: "beneficial",
    explanation: "หลัง 'is extremely' ต้องตามด้วย Adjective 'beneficial' (มีประโยชน์/ส่งผลดี)",
  },
  {
    sentence: "Never ________ on your dreams, no matter how difficult the journey is.",
    targetWord: "give up",
    options: ["give up", "run out", "look after", "carry on"],
    correctAnswer: "give up",
    explanation: "กริยาวลี: 'give up' แปลว่า ยอมแพ้ หรือ ละทิ้งความตั้งใจ",
  },
  {
    sentence: "I really look ________ to meeting your family in London next month.",
    targetWord: "forward",
    options: ["forward", "front", "ahead", "around"],
    correctAnswer: "forward",
    explanation: "โครงสร้างกริยาวลี: 'look forward to + V.ing/Noun' แปลว่า 'ตั้งตารอคอย'",
  },
];

export const ClozeTestGame: React.FC<ClozeTestGameProps> = ({ onAddXP, onBack }) => {
  const [questions, setQuestions] = useState<ClozeQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const initQuiz = () => {
    const shuffled = [...CLOZE_BANK].sort(() => 0.5 - Math.random()).slice(0, 8);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsFinished(false);
  };

  useEffect(() => {
    initQuiz();
  }, []);

  const currentQ = questions[currentIndex] || null;

  const handleSelectOption = (opt: string) => {
    if (isAnswered || !currentQ) return;
    setSelectedOption(opt);
    setIsAnswered(true);

    const isCorrect = opt === currentQ.correctAnswer;
    if (isCorrect) {
      soundFx.playCorrect();
      setScore((s) => s + 1);
      onAddXP(8); // High XP reward for cloze grammar mastery
    } else {
      soundFx.playWrong();
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsFinished(true);
      soundFx.playLevelUp();
      if (score >= 5) {
        try {
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } });
        } catch {
          // ignore
        }
      }
    }
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <div className="max-w-md mx-auto bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 text-center space-y-5 shadow-xl animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <Trophy className="w-8 h-8 animate-bounce" />
        </div>

        <div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-slate-100">
            {percentage >= 80 ? 'เก่งกาจมาก! แม่นไวยากรณ์ 🎉' : 'ทำได้ดีครับ ทบทวนเพิ่มอีกนิด 👍'}
          </h3>
          <p className="text-xs text-slate-500 mt-1">สรุปผลแบบฝึกหัดเติมคำตามบริบท (Contextual Cloze)</p>
        </div>

        <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-2xl flex items-center justify-around border border-slate-200/60 dark:border-slate-700/60">
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">คะแนนที่ได้</span>
            <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
              {score} / {questions.length}
            </span>
          </div>
          <div className="h-8 w-px bg-slate-200 dark:bg-slate-700" />
          <div>
            <span className="text-[11px] text-slate-400 font-semibold block">ความแม่นยำ</span>
            <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{percentage}%</span>
          </div>
        </div>

        <div className="flex gap-2.5 pt-2">
          <button
            onClick={onBack}
            className="flex-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-bold text-xs py-3 rounded-2xl transition"
          >
            กลับหน้ารวมเกม
          </button>
          <button
            onClick={initQuiz}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 active:scale-95 text-white font-bold text-xs py-3 rounded-2xl transition shadow-md shadow-indigo-600/20 flex items-center justify-center gap-1.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>ทำชุดใหม่ (8 ข้อ)</span>
          </button>
        </div>
      </div>
    );
  }

  if (!currentQ) return null;

  // Split sentence to highlight gap
  const parts = currentQ.sentence.split('________');

  return (
    <div className="max-w-md mx-auto space-y-4 pb-6 animate-fade-in">
      {/* Header Bar */}
      <div className="flex items-center justify-between text-xs font-semibold px-1">
        <button
          onClick={onBack}
          className="flex items-center gap-1 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>ออก</span>
        </button>

        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
          <FileText className="w-4 h-4" />
          ข้อที่ {currentIndex + 1} / {questions.length}
        </span>

        <span className="text-slate-400">คะแนน: {score}</span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
        <div
          className="h-full bg-emerald-500 rounded-full transition-all duration-300"
          style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      {/* Question Sentence Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-5 sm:p-6 shadow-sm space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            Contextual Cloze • เลือกคำเติมในช่องว่าง
          </span>
        </div>

        <p className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-relaxed pt-1">
          {parts[0]}
          <span
            className={`inline-block px-2.5 py-0.5 mx-1 rounded-lg border font-black transition-colors ${
              isAnswered
                ? selectedOption === currentQ.correctAnswer
                  ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-400'
                  : 'bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 border-rose-400'
                : 'bg-slate-100 dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-700 underline decoration-2'
            }`}
          >
            {isAnswered ? selectedOption : '________'}
          </span>
          {parts[1]}
        </p>

        {/* Instant Grammar Explanation Box */}
        {isAnswered && (
          <div className="bg-slate-50 dark:bg-slate-800/70 p-3 rounded-2xl border border-slate-200/80 dark:border-slate-700/60 space-y-1 text-xs animate-fade-in text-left">
            <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-100">
              <Lightbulb className="w-4 h-4 text-amber-500 shrink-0" />
              <span>คำอธิบายไวยากรณ์ & บริบท:</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
              {currentQ.explanation}
            </p>
          </div>
        )}
      </div>

      {/* 4 Choices */}
      <div className="grid grid-cols-2 gap-2.5">
        {currentQ.options.map((opt, idx) => {
          let btnStyle =
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-emerald-400';

          if (isAnswered) {
            if (opt === currentQ.correctAnswer) {
              btnStyle =
                'bg-emerald-50 dark:bg-emerald-950/60 border-emerald-500 text-emerald-800 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/20';
            } else if (selectedOption === opt) {
              btnStyle =
                'bg-rose-50 dark:bg-rose-950/60 border-rose-500 text-rose-800 dark:text-rose-200 font-bold';
            } else {
              btnStyle = 'opacity-40 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelectOption(opt)}
              disabled={isAnswered}
              className={`p-3.5 rounded-2xl border text-center font-bold text-sm transition-all flex items-center justify-between shadow-xs ${btnStyle}`}
            >
              <span className="flex-1 text-center truncate">{opt}</span>
              {isAnswered && opt === currentQ.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              )}
              {isAnswered && selectedOption === opt && opt !== currentQ.correctAnswer && (
                <XCircle className="w-4 h-4 text-rose-600 shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Next Button */}
      {isAnswered && (
        <div className="pt-2 animate-fade-in">
          <button
            onClick={handleNext}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-sm py-3.5 px-4 rounded-2xl transition shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
          >
            <span>{currentIndex + 1 < questions.length ? 'ข้อถัดไป' : 'ดูสรุปผลคะแนน'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
