import React, { useState, useEffect } from 'react';
import { ActiveTab } from './types';
import { useVocabStore } from './hooks/useVocabStore';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { FlashcardsView } from './components/FlashcardsView';
import { GamesHubView } from './components/GamesHubView';
import { WordBankView } from './components/WordBankView';
import { CloudSyncModal } from './components/CloudSyncModal';
import { InstallAppBanner } from './components/InstallAppBanner';
import { getStoredSupabaseConfig } from './lib/supabaseClient';

export function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [flashcardFilter, setFlashcardFilter] = useState<string>('all');
  const [wordbankFilter, setWordbankFilter] = useState<string>('all');
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

  const handleNavigateTab = (tab: ActiveTab, filterMode?: string) => {
    if (tab === 'flashcards' && filterMode) {
      setFlashcardFilter(filterMode);
    }
    if (tab === 'wordbank' && filterMode) {
      setWordbankFilter(filterMode);
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
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-2xl w-full mx-auto px-4 pt-4 pb-24">
        {/* PWA Install Banner */}
        <InstallAppBanner
          isOpenModal={isInstallModalOpen}
          onCloseModal={() => setIsInstallModalOpen(false)}
        />

        {activeTab === 'dashboard' && (
          <DashboardView stats={stats} profile={profile} onNavigateTab={handleNavigateTab} />
        )}

        {activeTab === 'flashcards' && (
          <FlashcardsView
            words={words}
            progressMap={progressMap}
            onRecordResult={(id, correct) => {
              recordResult(id, correct);
              if (correct) addXP(3);
            }}
            initialFilter={flashcardFilter}
          />
        )}

        {(activeTab === 'games' || (activeTab as string) === 'quiz') && (
          <GamesHubView
            words={words}
            profile={profile}
            onAddXP={addXP}
            onRecordResult={recordResult}
          />
        )}

        {activeTab === 'wordbank' && (
          <WordBankView
            words={words}
            progressMap={progressMap}
            onSetStatus={setWordStatus}
            initialFilter={wordbankFilter}
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
