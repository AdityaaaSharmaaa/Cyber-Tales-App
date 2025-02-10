import React from 'react';
import { Home, BookOpen, Brain, Trophy, User } from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navigation = ({ activeTab, setActiveTab }: NavigationProps) => {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'stories', icon: BookOpen, label: 'Stories' },
    { id: 'quiz', icon: Brain, label: 'Quiz' },
    { id: 'rewards', icon: Trophy, label: 'Rewards' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center flex-1 h-full ${
              activeTab === tab.id ? 'text-purple-600' : 'text-gray-500'
            }`}
          >
            <tab.icon className="w-6 h-6" />
            <span className="text-xs mt-1">{tab.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
};