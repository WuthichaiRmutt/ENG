import React, { useState, useEffect } from 'react';
import { Home } from 'lucide-react';
import { ActiveTab, GameMode } from './types';
import { useVocabStore } from './hooks/useVocabStore';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomePortalView } from './components/HomePortalView';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { GamesHubView } from './components/GamesHubView';
import { WordBankView } from './components/WordBankView';
import { MockExamSimulator } from './components/MockExamSimulator';
import { CloudSyncModal } from './components/CloudSyncModal';
import { InstallAppBanner } from './components/InstallAppBanner';
import { getStoredSupabaseConfig } from './lib/supabaseClient';

export function App() {
  // Set root initial view to 'home' card portal
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [flashcardFilter, setFlashcardFilter] = useState<string>('all');
  const [wordbankFilter, setWordbankFilter] = useState<string>('all');
  const [gameInitialMode, setGameInitialMode] = useState<GameMode>('menu');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Dark mode
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return (
        localStorage.getItem('pet_b1_theme') === 'dark' ||
        window.matchMedia('(prefers-color-scheme: dark)').matches
      );
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('pet_b1_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('pet_b1_theme', 'light');
    }
  }, [isDark]);

  const {
    words,
    progressMap,
    profile,
    stats,
    cloudStatus,
    isCloudSyncing,
    setWordStatus,
    recordResult,
    addXP,
    syncWithSupabase,
    setCloudStatus,
  } = useVocabStore();

  const handleNavigateTab = (tab: ActiveTab, filterMode?: string, gameMode?: GameMode) => {
    if (tab === 'flashcards' && filterMode) {
      setFlashcardFilter(filterMode);
    }
    if (tab === 'wordbank' && filterMode) {
      setWordbankFilter(filterMode);
    }
    if (gameMode) {
      setGameInitialMode(gameMode);
    } else if (tab === 'games') {
      setGameInitialMode('menu');
    }
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRefreshCloudStatus = () => {
    const conf = getStoredSupabaseConfig();
    setCloudStatus(conf.isConfigured ? 'connected' : 'offline');
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Sticky Header */}
      <Header
        profile={profile}
        cloudStatus={cloudStatus}
        isCloudSyncing={isCloudSyncing}
        onOpenCloudModal={() => setIsCloudModalOpen(true)}
        onOpenInstallModal={() => setIsInstallModalOpen(true)}
        isDark={isDark}
        onToggleDark={() => setIsDark((d) => !d)}
        onGoHome={() => handleNavigateTab('home')}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24">
        {/* PWA Install Banner */}
        <InstallAppBanner
          isOpenModal={isInstallModalOpen}
          onCloseModal={() => setIsInstallModalOpen(false)}
        />

        {/* Breadcrumb back to root portal if on inner tabs */}
        {activeTab !== 'home' && (
          <div className="mb-3 flex items-center justify-between">
            <button
              onClick={() => handleNavigateTab('home')}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 bg-white/80 dark:bg-slate-900/80 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 px-3 py-1.5 rounded-xl shadow-xs transition active:scale-95"
            >
              <Home className="w-3.5 h-3.5" />
              <span>← กลับหน้าหลัก (เมนูเลือกการ์ด)</span>
            </button>
          </div>
        )}

        {/* 1. Root Landing Page: Card Selection Portal */}
        {activeTab === 'home' && (
          <HomePortalView
            stats={stats}
            profile={profile}
            onNavigateTab={handleNavigateTab}
          />
        )}

        {/* 2. Vocabulary Dashboard */}
        {activeTab === 'dashboard' && (
          <DashboardView stats={stats} profile={profile} onNavigateTab={handleNavigateTab} />
        )}

        {/* 3. Flashcards SRS Mode */}
        {activeTab === 'flashcards' && (
          <FlashcardsView
            words={words}
            progressMap={progressMap}
            onRecordResult={(id, correct) => {
              recordResult(id, correct);
              if (correct) addXP(3);
            }}
            onSetStatus={(id, status) => {
              setWordStatus(id, status);
              if (status === 'mastered') addXP(5);
              else addXP(1);
            }}
            initialFilter={flashcardFilter}
          />
        )}

        {/* 4. Mini Games & Quiz Hub */}
        {(activeTab === 'games' || (activeTab as string) === 'quiz') && (
          <GamesHubView
            key={gameInitialMode}
            words={words}
            profile={profile}
            onAddXP={addXP}
            onRecordResult={recordResult}
            initialMode={gameInitialMode}
          />
        )}

        {/* 5. Full Word Bank Directory */}
        {activeTab === 'wordbank' && (
          <WordBankView
            words={words}
            progressMap={progressMap}
            onSetStatus={setWordStatus}
            initialFilter={wordbankFilter}
          />
        )}

        {/* 6. Mock Exam Simulator (TOEIC & EnglishScore & Cambridge CBT) */}
        {activeTab === 'exam' && (
          <MockExamSimulator
            onBackToHome={() => handleNavigateTab('home')}
            onAddXP={addXP}
            onMarkFocusWord={(wordText) => {
              const matched = words.find((w) => w.word.toLowerCase() === wordText.toLowerCase());
              if (matched) {
                setWordStatus(matched.id, 'focus');
              }
            }}
          />
        )}
      </main>

      {/* Cloud Sync Modal */}
      <CloudSyncModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        cloudStatus={cloudStatus}
        isCloudSyncing={isCloudSyncing}
        onSync={syncWithSupabase}
        onRefreshStatus={handleRefreshCloudStatus}
      />

      {/* Fixed Mobile Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        focusCount={stats.focus}
      />
    </div>
  );
}

export default App;
