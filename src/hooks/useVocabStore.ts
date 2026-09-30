import { useState, useEffect, useCallback, useMemo } from 'react';
import { WordItem, WordStatus, UserWordProgress, UserProfile } from '../types';
import { CAMBRIDGE_B1_VOCABULARY } from '../data/cambridgeB1Vocab';
import { calculateNextReview, isDueForReview } from '../lib/srs';
import { getSupabaseClient, getStoredSupabaseConfig } from '../lib/supabaseClient';

const STORAGE_KEY_PROGRESS = 'pet_b1_word_progress_v1';
const STORAGE_KEY_PROFILE = 'pet_b1_user_profile_v1';

export function useVocabStore() {
  const [words] = useState<WordItem[]>(CAMBRIDGE_B1_VOCABULARY);
  const [progressMap, setProgressMap] = useState<Record<string, UserWordProgress>>({});
  const [profile, setProfile] = useState<UserProfile>({
    streakDays: 1,
    lastStudyDate: new Date().toISOString().split('T')[0],
    dailyGoal: 15,
    studiedTodayCount: 0,
  });
  const [isCloudSyncing, setIsCloudSyncing] = useState(false);
  const [cloudStatus, setCloudStatus] = useState<'offline' | 'connected' | 'syncing' | 'error'>('offline');

  // Load initial local data
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem(STORAGE_KEY_PROGRESS);
      if (savedProgress) {
        setProgressMap(JSON.parse(savedProgress));
      }

      const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      const today = new Date().toISOString().split('T')[0];
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        // Check if day changed
        if (parsed.lastStudyDate !== today) {
          const yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1);
          const yesterdayStr = yesterday.toISOString().split('T')[0];

          const isConsecutive = parsed.lastStudyDate === yesterdayStr;
          const updatedProfile: UserProfile = {
            ...parsed,
            lastStudyDate: today,
            studiedTodayCount: 0,
            streakDays: isConsecutive ? parsed.streakDays : Math.max(1, parsed.streakDays),
          };
          setProfile(updatedProfile);
          localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updatedProfile));
        } else {
          setProfile(parsed);
        }
      }
    } catch (e) {
      console.error('Error loading local storage data:', e);
    }
  }, []);

  // Check Supabase connection
  useEffect(() => {
    const conf = getStoredSupabaseConfig();
    if (conf.isConfigured) {
      setCloudStatus('connected');
    } else {
      setCloudStatus('offline');
    }
  }, []);

  // Save to local storage whenever progressMap changes
  const saveProgressMap = useCallback((newMap: Record<string, UserWordProgress>) => {
    setProgressMap(newMap);
    try {
      localStorage.setItem(STORAGE_KEY_PROGRESS, JSON.stringify(newMap));
    } catch (e) {
      console.error('Failed to save to localStorage:', e);
    }
  }, []);

  // Save profile
  const saveProfile = useCallback((newProfile: UserProfile) => {
    setProfile(newProfile);
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(newProfile));
    } catch (e) {
      console.error('Failed to save profile to localStorage:', e);
    }
  }, []);

  // Record studying a word (counts toward daily goal & streak)
  const markAsStudied = useCallback((vocabId: string) => {
    setProfile((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const newCount = prev.studiedTodayCount + 1;
      const updated: UserProfile = {
        ...prev,
        lastStudyDate: today,
        studiedTodayCount: newCount,
      };
      localStorage.setItem(STORAGE_KEY_PROFILE, JSON.stringify(updated));
      return updated;
    });
  }, []);

  // Change Word Status manually ('normal' | 'focus' | 'mastered')
  const setWordStatus = useCallback(
    (vocabId: string, status: WordStatus) => {
      setProgressMap((prev) => {
        const existing = prev[vocabId] || {
          vocabId,
          status: 'normal',
          boxLevel: 1,
          nextReviewAt: new Date().toISOString(),
          correctCount: 0,
          wrongCount: 0,
        };

        const updated: UserWordProgress = {
          ...existing,
          status,
          boxLevel: status === 'mastered' ? 5 : status === 'focus' ? 1 : existing.boxLevel,
          lastReviewedAt: new Date().toISOString(),
        };

        const newMap = { ...prev, [vocabId]: updated };
        saveProgressMap(newMap);
        markAsStudied(vocabId);
        return newMap;
      });
    },
    [saveProgressMap, markAsStudied]
  );

  // Record Flashcard/Quiz Result with SRS Box calculation
  const recordResult = useCallback(
    (vocabId: string, isCorrect: boolean) => {
      setProgressMap((prev) => {
        const existing = prev[vocabId] || {
          vocabId,
          status: 'normal',
          boxLevel: 1,
          nextReviewAt: new Date().toISOString(),
          correctCount: 0,
          wrongCount: 0,
        };

        const { nextBox, nextDate } = calculateNextReview(existing.boxLevel, isCorrect);
        const correctCount = isCorrect ? existing.correctCount + 1 : existing.correctCount;
        const wrongCount = !isCorrect ? existing.wrongCount + 1 : existing.wrongCount;

        // Auto determine status
        let newStatus: WordStatus = existing.status;
        if (!isCorrect) {
          // If wrong, immediately move to Focus Zone
          newStatus = 'focus';
        } else if (nextBox >= 4) {
          // If reached Box 4 or 5, consider Mastered
          newStatus = 'mastered';
        } else if (existing.status === 'focus' && nextBox >= 2) {
          // Promoted out of focus zone
          newStatus = 'normal';
        }

        const updated: UserWordProgress = {
          ...existing,
          status: newStatus,
          boxLevel: nextBox,
          nextReviewAt: nextDate,
          correctCount,
          wrongCount,
          lastReviewedAt: new Date().toISOString(),
        };

        const newMap = { ...prev, [vocabId]: updated };
        saveProgressMap(newMap);
        markAsStudied(vocabId);
        return newMap;
      });
    },
    [saveProgressMap, markAsStudied]
  );

  // Sync with Supabase Cloud
  const syncWithSupabase = useCallback(async () => {
    const client = getSupabaseClient();
    if (!client) {
      setCloudStatus('offline');
      return { success: false, message: 'กรุณากรอก Supabase URL และ Key ก่อนบันทึก' };
    }

    try {
      setIsCloudSyncing(true);
      setCloudStatus('syncing');

      const { data: { user } } = await client.auth.getUser();

      if (!user) {
        // Anonymous or prompt login
        setCloudStatus('connected');
        return {
          success: true,
          message: 'เชื่อมต่อ Supabase สำเร็จ (โหมด Local-Ready บันทึกในเครื่องอัตโนมัติ)',
        };
      }

      // Upsert progress records
      const progressEntries = Object.values(progressMap).map((p) => ({
        user_id: user.id,
        vocab_id: p.vocabId,
        status: p.status,
        box_level: p.boxLevel,
        next_review_at: p.nextReviewAt,
        correct_count: p.correctCount,
        wrong_count: p.wrongCount,
        updated_at: new Date().toISOString(),
      }));

      if (progressEntries.length > 0) {
        const { error: upsertErr } = await client
          .from('user_word_progress')
          .upsert(progressEntries, { onConflict: 'user_id,vocab_id' });

        if (upsertErr) throw upsertErr;
      }

      setCloudStatus('connected');
      return { success: true, message: 'บันทึกข้อมูลขึ้น Supabase Cloud สำเร็จเรียบร้อย!' };
    } catch (err: any) {
      console.error('Supabase Sync Error:', err);
      setCloudStatus('error');
      return { success: false, message: err.message || 'เกิดข้อผิดพลาดในการเชื่อมต่อ' };
    } finally {
      setIsCloudSyncing(false);
    }
  }, [progressMap]);

  // Calculated Statistics
  const stats = useMemo(() => {
    const total = words.length;
    let mastered = 0;
    let focus = 0;
    let dueReview = 0;
    const boxDistribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };

    words.forEach((w) => {
      const p = progressMap[w.id];
      if (p) {
        if (p.status === 'mastered') mastered++;
        if (p.status === 'focus') focus++;
        if (isDueForReview(p.nextReviewAt)) dueReview++;
        if (p.boxLevel >= 1 && p.boxLevel <= 5) {
          boxDistribution[p.boxLevel] = (boxDistribution[p.boxLevel] || 0) + 1;
        }
      } else {
        boxDistribution[1]++;
      }
    });

    const inProgress = total - mastered - focus;

    return {
      total,
      mastered,
      focus,
      inProgress,
      dueReview,
      boxDistribution,
      completionRate: Math.round((mastered / total) * 100),
    };
  }, [words, progressMap]);

  return {
    words,
    progressMap,
    profile,
    stats,
    cloudStatus,
    isCloudSyncing,
    setWordStatus,
    recordResult,
    markAsStudied,
    syncWithSupabase,
    setCloudStatus,
  };
}
