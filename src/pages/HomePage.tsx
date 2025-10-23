import React, { useState } from 'react';
import type { Page } from '@/App';
import GlitchButton from '@/components/GlitchButton';
import { Eye } from '@/components/icons/Eye';
import { ScanLine } from '@/components/icons/ScanLine';
import { Swords } from '@/components/icons/Swords';
import { BookOpen } from '@/components/icons/BookOpen';
import { Wrench } from '@/components/icons/Wrench';
import { useTheme } from '@/context/ThemeContext';
import RandomTip from '@/components/RandomTip';
import { HelpCircle } from 'lucide-react';

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
    // Use h-full and flex to center content vertically and prevent scrolling
    <div className="container mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
      
      <div className="w-full">
        <div 
          className="relative w-40 h-40 md:w-44 md:h-44 mx-auto mb-6 transition-all duration-500 transform"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Eye className={`w-full h-full transition-all duration-500 ${eyeClasses} ${isHovered ? 'opacity-20 scale-110' : 'opacity-80'}`} />
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-2 border-purple-500 animate-spin-slow"></div>
            <div className={`absolute w-16 h-16 md:w-20 md:h-20 rounded-full border-2 ${eyeClasses} animate-ping`}></div>
            <p className={`absolute text-xs md:text-sm font-orbitron ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PROTECTING</p>
          </div>
        </div>
        
        <h1 className={`text-5xl md:text-6xl font-orbitron font-bold mb-3 ${titleClasses} animate-fade-in-down`}>
          PhishNex
        </h1>
        <p className={`text-lg md:text-xl mb-10 max-w-2xl mx-auto ${subtitleClasses} animate-fade-in-up`} style={{ animationDelay: '0.3s' }}>
          Your Digital Shield Against Phishing & Online Scams
        </p>
        <div className="flex flex-wrap items-center justify-center gap-6 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
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
          <GlitchButton onClick={() => handleNav('howitworks')} icon={<HelpCircle />}>
            How It Works
          </GlitchButton>
        </div>
      </div>

      <div className="mt-12 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
        <RandomTip />
      </div>
    </div>
  );
};

export default HomePage;