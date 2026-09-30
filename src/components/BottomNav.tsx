import React from 'react';
import { LayoutDashboard, Layers, Brain, BookOpen } from 'lucide-react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  focusCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange, focusCount }) => {
  const tabs = [
    { id: 'dashboard' as ActiveTab, label: 'แดชบอร์ด', icon: LayoutDashboard },
    { id: 'flashcards' as ActiveTab, label: 'แฟลชการ์ด', icon: Layers },
    { id: 'quiz' as ActiveTab, label: 'แบบทดสอบ', icon: Brain },
    { id: 'wordbank' as ActiveTab, label: 'คลังคำศัพท์', icon: BookOpen },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 pb-safe shadow-lg">
      <div className="max-w-md mx-auto px-2 flex items-center justify-around h-16">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center justify-center flex-1 h-full py-1 transition-all relative ${
                isActive
                  ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon
                  className={`w-5 h-5 transition-transform duration-200 ${
                    isActive ? 'scale-110 stroke-[2.5px]' : 'stroke-[1.8px]'
                  }`}
                />
                {tab.id === 'flashcards' && focusCount > 0 && (
                  <span className="absolute -top-1 -right-2.5 min-w-4 h-4 px-1 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                    {focusCount > 99 ? '99+' : focusCount}
                  </span>
                )}
              </div>
              <span className={`text-[11px] mt-1 tracking-tight ${isActive ? 'font-bold' : 'font-medium'}`}>
                {tab.label}
              </span>

              {/* Active Indicator Bar */}
              {isActive && (
                <span className="absolute bottom-1 w-6 h-0.5 rounded-full bg-indigo-600 dark:bg-indigo-400 animate-fade-in" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
