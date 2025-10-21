import React, { useState } from 'react';
import type { Page } from '@/App';
import GlitchButton from '@/components/GlitchButton';
import { Eye } from '@/components/icons/Eye';
import { ScanLine } from '@/components/icons/ScanLine';
import { Swords } from '@/components/icons/Swords';
import { BookOpen } from '@/components/icons/BookOpen';
import { Wrench } from '@/components/icons/Wrench';
import { useTheme } from '@/context/ThemeContext';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  const { theme } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  const handleNav = (page: Page) => {
    setCurrentPage(page);
  };
  
  const eyeClasses = theme === 'dark' ? 'text-cyan-400' : 'text-blue-600';
  const titleClasses = theme === 'dark' ? 'text-white cyber-glow' : 'text-gray-900';
  const subtitleClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-600';

  return (
    <div className="container mx-auto px-6 text-center flex flex-col items-center justify-center w-full">
      <div 
        className="relative w-48 h-48 mb-8 transition-all duration-500 transform"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <Eye className={`w-full h-full transition-all duration-500 ${eyeClasses} ${isHovered ? 'opacity-20 scale-110' : 'opacity-80'}`} />
        <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <div className="w-24 h-24 rounded-full border-2 border-purple-500 animate-spin-slow"></div>
          <div className={`absolute w-20 h-20 rounded-full border-2 ${eyeClasses} animate-ping`}></div>
          <p className={`absolute text-sm font-orbitron ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>ANALYZING</p>
        </div>
      </div>
      
      <h1 className={`text-5xl md:text-7xl font-orbitron font-bold mb-4 ${titleClasses} animate-fade-in-down`}>
        PhishShield
      </h1>
      <p className={`text-xl md:text-2xl mb-12 animate-fade-in-up ${subtitleClasses}`} style={{ animationDelay: '0.5s' }}>
        Your Digital Shield Against Phishing & Online Scams
      </p>
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 animate-fade-in-up" style={{ animationDelay: '1s' }}>
        <GlitchButton onClick={() => handleNav('scan')} icon={<ScanLine />}>
          Scan
        </GlitchButton>
        <GlitchButton onClick={() => handleNav('play')} icon={<Swords />}>
          Play Game
        </GlitchButton>
        <GlitchButton onClick={() => handleNav('learn')} icon={<BookOpen />}>
          Learn
        </GlitchButton>
        <GlitchButton onClick={() => handleNav('tools')} icon={<Wrench />}>
          Cyber Tools
        </GlitchButton>
      </div>

      <footer className="mt-24 pb-6">
        <p className={`text-xs ${theme === 'dark' ? 'text-gray-600' : 'text-gray-500'}`}>
          © 2024 Dinesh Haritha Vijay Reddy. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;