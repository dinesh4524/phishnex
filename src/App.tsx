
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HomePage from '@/pages/HomePage';
import LearnPage from '@/pages/LearnPage';
import ScanPage from '@/pages/ScanPage';
import PlayPage from '@/pages/PlayPage';
import ToolsPage from '@/pages/ToolsPage'; // Import the new ToolsPage

export type Page = 'home' | 'learn' | 'scan' | 'play' | 'tools';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    // Welcome voice on initial load
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance("Welcome Agent! PhishShield systems online. Ready to test your cyber instincts?");
      utterance.rate = 0.9;
      utterance.pitch = 1.1;
      // Ensure voice is loaded before speaking
      const voices = window.speechSynthesis.getVoices();
      if (voices.length > 0) {
        utterance.voice = voices[0];
        window.speechSynthesis.speak(utterance);
      } else {
        window.speechSynthesis.onvoiceschanged = () => {
          utterance.voice = window.speechSynthesis.getVoices()[0];
          window.speechSynthesis.speak(utterance);
        };
      }
    }
  }, []);

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
        return <ToolsPage />; // Render the new ToolsPage
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-[#010413] text-cyan-300 cyber-grid overflow-x-hidden">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main>
        {renderPage()}
      </main>
    </div>
  );
};

export default App;