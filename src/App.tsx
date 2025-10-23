import React, { useState, useEffect } from 'react';
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
  // Helper to determine the current page from the browser's URL path
  const getPageFromPath = (): Page => {
    const path = window.location.pathname.substring(1);
    const validPages: Page[] = ['home', 'learn', 'scan', 'play', 'tools', 'howitworks'];
    if (validPages.includes(path as Page)) {
      return path as Page;
    }
    // 'home' is represented by the root path '/'
    if (path === '') return 'home';
    // Default to home for any invalid path
    return 'home';
  };

  const [currentPage, setCurrentPage] = useState<Page>(getPageFromPath());
  const { theme } = useTheme();

  // This function now handles both setting the state and updating the browser's history
  const handleNavigation = (page: Page) => {
    const path = page === 'home' ? '/' : `/${page}`;
    // Only push a new state if the path is actually changing
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, ``, path);
    }
    setCurrentPage(page);
  };

  // This effect listens for the browser's back/forward buttons
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPage(getPageFromPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const darkBackgroundClasses = 'bg-gradient-to-br from-[#010413] via-[#050a20] to-[#010413] text-cyan-300';
  const lightBackgroundClasses = 'bg-gray-100 text-gray-800';

  const themeClasses = theme === 'dark'
    ? darkBackgroundClasses
    : lightBackgroundClasses;

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={handleNavigation} />;
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
        return <HomePage setCurrentPage={handleNavigation} />;
    }
  };

  return (
    <div className={`h-screen overflow-hidden flex flex-col ${themeClasses}`}>
      <Header currentPage={currentPage} setCurrentPage={handleNavigation} />
      <main className="flex-grow overflow-y-auto relative z-10">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
};

export default App;