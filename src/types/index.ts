export interface WordItem {
  id: string;
  word: string;
  pos: string;
  ipa: string;
  meaning: string;
  example: string;
  category: string;
}

export type WordStatus = 'normal' | 'focus' | 'mastered';

export interface UserWordProgress {
  vocabId: string;
  status: WordStatus;
  boxLevel: number; // 1 to 5 (Leitner SRS)
  nextReviewAt: string;
  correctCount: number;
  wrongCount: number;
  lastReviewedAt?: string;
}

export interface UserProfile {
  userId?: string;
  streakDays: number;
  lastStudyDate: string; // YYYY-MM-DD
  dailyGoal: number; // e.g. 15 words
  studiedTodayCount: number;
}

export type ActiveTab = 'dashboard' | 'flashcards' | 'quiz' | 'wordbank';
