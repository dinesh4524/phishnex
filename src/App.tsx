import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import LearnPage from '@/pages/LearnPage';
import ScanPage from '@/pages/ScanPage';
import PlayPage from '@/pages/PlayPage';
import ToolsPage from '@/pages/ToolsPage';
import HowItWorksPage from '@/pages/HowItWorksPage';
import { useTheme } from './context/ThemeContext';

export type Page = 'home' | 'learn' | 'scan' | 'play' | 'tools' | 'howitworks';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { theme } = useTheme();

  // Define a subtle grid pattern class for the dark theme
  const darkBackgroundClasses = 'bg-gradient-to-br from-[#010413] via-[#050a20] to-[#010413] text-cyan-300 relative overflow-hidden';
  const lightBackgroundClasses = 'bg-gray-100 text-gray-800';

  const themeClasses = theme === 'dark'
    ? darkBackgroundClasses
    : lightBackgroundClasses;

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
      case 'howitworks':
        return <HowItWorksPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  
  // Component for the animated grid effect
  const CyberGrid = () => (
    <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
      <div className="w-full h-full bg-[size:40px_40px] bg-repeat" style={{ backgroundImage: 'linear-gradient(to right, #00ffff1a 1px, transparent 1px), linear-gradient(to bottom, #00ffff1a 1px, transparent 1px)' }}>
      </div>
    </div>
  );

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${themeClasses}`}>
      {theme === 'dark' && <CyberGrid />}
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="flex-grow overflow-y-auto relative z-10">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;