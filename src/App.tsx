import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LearnPage from '@/pages/LearnPage';
import ScanPage from '@/pages/ScanPage';
import PlayPage from '@/pages/PlayPage';
import ToolsPage from '@/pages/ToolsPage';
import { useTheme } from './context/ThemeContext';

export type Page = 'home' | 'learn' | 'scan' | 'play' | 'tools';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme } = useTheme();

  const themeClasses = theme === 'dark'
    ? 'bg-[#010413] text-cyan-300 cyber-grid'
    : 'bg-gray-100 text-gray-800';

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'learn':
        return <LearnPage />;
      case 'scan':
        return <ScanPage />;
      case 'play':
        return <PlayPage />;
      case 'tools':
        return <ToolsPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${themeClasses}`}>
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow overflow-y-auto">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;