import React, { useMemo } from 'react';
import { Quote } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const QUOTES = [
  { text: "Security is not a product, but a process.", author: "Bruce Schneier" },
  { text: "The weakest link in the security chain is the human element.", author: "Cybersecurity Proverb" },
  { text: "Privacy is not something that I’m merely entitled to, it’s an absolute prerequisite.", author: "Marlon Brando" },
  { text: "Passwords are like underwear: don’t let people see it, change it very often, and you shouldn't share it with strangers.", author: "Chris Pirillo" },
  { text: "Cybersecurity is much more than an IT topic — it’s a business survival issue.", author: "Stéphane Nappo" },
  { text: "Think before you click — one careless click can cause massive damage.", author: "Cybersecurity Proverb" },
  { text: "Your data is your digital identity. Protect it like your life depends on it — because it does.", author: "Cybersecurity Proverb" },
  { text: "The biggest threat to security is believing someone else will take care of it.", author: "Cybersecurity Proverb" },
  { text: "An ounce of prevention is worth a terabyte of cure.", author: "Cybersecurity Proverb" },
  { text: "In the digital world, awareness is your strongest firewall.", author: "Cybersecurity Proverb" }
];

const AwarenessQuote: React.FC = () => {
  const { theme } = useTheme();
  
  const randomQuote = useMemo(() => {
    const index = Math.floor(Math.random() * QUOTES.length);
    return QUOTES[index];
  }, []);

  const containerClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/30 text-gray-200 shadow-lg shadow-purple-900/50'
    : 'bg-white border border-indigo-300/50 text-gray-800 shadow-lg shadow-indigo-200';
    
  const iconClasses = theme === 'dark' ? 'text-purple-400' : 'text-indigo-600';

  return (
    <div className={`p-6 rounded-lg flex flex-col items-center text-center ${containerClasses}`}>
      <Quote className={`w-8 h-8 mb-4 ${iconClasses}`} />
      <p className="text-lg italic">"{randomQuote.text}"</p>
      <p className="font-bold mt-4">- {randomQuote.author}</p>
    </div>
  );
};

export default AwarenessQuote;