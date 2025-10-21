

import React from 'react';
import { LEARN_CARDS } from '@/constants';
import type { LearnCardData } from '@/types';

const CyberCard: React.FC<{ card: LearnCardData }> = ({ card }) => {
  return (
    <div className="group w-full max-w-lg h-80 [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front */}
        <div className="absolute inset-0 bg-gray-800/20 backdrop-blur-sm border border-cyan-500/30 rounded-xl p-6 flex flex-col justify-center">
          <h3 className="text-2xl font-orbitron text-cyan-300 mb-4">{card.front.title}</h3>
          <pre className="text-sm text-left whitespace-pre-wrap font-sans text-gray-300">{card.front.content}</pre>
        </div>
        
        {/* Back */}
        <div className="absolute inset-0 bg-gray-900/80 backdrop-blur-md border border-purple-500/50 rounded-xl p-6 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <h3 className="text-2xl font-orbitron text-purple-400 mb-4">{card.back.title}</h3>
          <ul className="space-y-3 text-left">
            {card.back.analysis.map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-purple-400 mr-2">»</span>
                <p className="text-gray-300">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};


const LearnPage: React.FC = () => {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">Interactive Awareness Zone</h1>
        <p className="text-xl text-gray-400 mt-4">Hover over the cards to learn about phishing tactics and digital safety essentials.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12 place-items-center">
        {LEARN_CARDS.map(card => (
          <CyberCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
};

export default LearnPage;