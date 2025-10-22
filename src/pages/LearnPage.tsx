import React, { useState } from 'react';
import { LEARN_CARDS } from '@/constants';
import type { LearnCardData } from '@/types';
import { useTheme } from '@/context/ThemeContext';

const CyberCard: React.FC<{ card: LearnCardData }> = ({ card }) => {
  const { theme } = useTheme();
  const [isFlipped, setIsFlipped] = useState(false);
  
  const frontClasses = theme === 'dark'
    ? 'bg-gray-800/20 backdrop-blur-sm border border-cyan-500/30'
    : 'bg-white/80 backdrop-blur-sm border border-blue-300/50 text-gray-900';
    
  const backClasses = theme === 'dark'
    ? 'bg-gray-900/80 backdrop-blur-md border border-purple-500/50'
    : 'bg-gray-100/90 backdrop-blur-md border border-purple-500/50 text-gray-900';
    
  const frontTitleClasses = theme === 'dark' ? 'text-cyan-300' : 'text-blue-600';
  const backTitleClasses = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';
  const contentClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';
  const bulletClasses = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  return (
    <div 
      className="group w-full max-w-md h-80 [perspective:1000px] cursor-pointer"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className={`relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}>
        {/* Front */}
        <div className={`absolute inset-0 rounded-xl p-6 flex flex-col [backface-visibility:hidden] ${frontClasses}`}>
          <h3 className={`text-2xl font-orbitron mb-4 flex-shrink-0 ${frontTitleClasses}`}>{card.front.title}</h3>
          <div className="overflow-y-auto flex-grow">
            <pre className={`text-sm text-left whitespace-pre-wrap font-sans ${contentClasses}`}>{card.front.content}</pre>
          </div>
        </div>
        
        {/* Back */}
        <div className={`absolute inset-0 rounded-xl p-6 flex flex-col [transform:rotateY(180deg)] [backface-visibility:hidden] ${backClasses}`}>
          <h3 className={`text-2xl font-orbitron mb-4 flex-shrink-0 ${backTitleClasses}`}>{card.back.title}</h3>
          <div className="overflow-y-auto flex-grow">
            <ul className="space-y-3 text-left">
              {card.back.analysis.map((item, index) => (
                <li key={index} className="flex items-start">
                  <span className={`mr-2 ${bulletClasses}`}>»</span>
                  <p className={`${contentClasses}`}>{item}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};


const LearnPage: React.FC = () => {
  const { theme } = useTheme();
  const subtitleClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">Interactive Awareness Zone</h1>
        <p className={`text-xl mt-4 ${subtitleClasses}`}>Click the cards to reveal why they are scams. Learn the signs.</p>
      </div>
      <div className="flex flex-wrap justify-center gap-12">
        {LEARN_CARDS.map(card => (
          <CyberCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default LearnPage;