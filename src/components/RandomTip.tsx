import React, { useMemo } from 'react';
import { Lightbulb } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

const TIPS = [
  "Never share OTPs or 2FA codes with anyone, even if they claim to be support.",
  "Always hover your mouse over a link to check the true destination URL.",
  "Check for the 'https' and the lock icon before entering sensitive data.",
  "Use a unique, complex password for every important online account.",
  "Be suspicious of any message creating extreme urgency or promising prizes.",
  "If a call is suspicious, hang up and call the company back using their official number.",
  "Keep your software and operating system updated to patch security vulnerabilities.",
  "Avoid sharing sensitive personal information on social media or unverified websites.",
  "Use a VPN (Virtual Private Network) when browsing on public Wi-Fi to encrypt your connection.",
  "Regularly back up your important data to a secure, separate location.",
  "Lock your computer and phone when you are not using them.",
  "Be cautious of phishing messages pretending to be official communications from banks or services.",
  "Continuously educate yourself about new cyber threats and safety practices.",
];

const RandomTip: React.FC = () => {
  const { theme } = useTheme();
  
  const randomTip = useMemo(() => {
    const index = Math.floor(Math.random() * TIPS.length);
    return TIPS[index];
  }, []); // Calculate once on mount

  const containerClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/30 text-gray-200 shadow-lg shadow-purple-900/50'
    : 'bg-white border border-indigo-300/50 text-gray-800 shadow-lg shadow-indigo-200';
    
  const iconClasses = theme === 'dark' ? 'text-purple-400' : 'text-indigo-600';

  return (
    <div className={`p-4 rounded-lg flex items-start space-x-3 ${containerClasses}`}>
      <Lightbulb className={`w-6 h-6 flex-shrink-0 mt-0.5 ${iconClasses}`} />
      <div>
        <p className="font-orbitron font-bold text-sm uppercase">Security Tip of the Day</p>
        <p className="text-sm mt-1">{randomTip}</p>
      </div>
    </div>
  );
};

export default RandomTip;