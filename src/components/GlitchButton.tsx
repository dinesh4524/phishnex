import React from 'react';
import { useTheme } from '@/context/ThemeContext';

interface GlitchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const GlitchButton: React.FC<GlitchButtonProps> = ({ onClick, children, icon }) => {
  const { theme } = useTheme();
  
  const buttonClasses = theme === 'dark'
    ? 'border-cyan-400 text-white hover:bg-cyan-400/10 hover:shadow-[0_0_25px_rgba(0,255,255,0.7)] hover:scale-[1.02]'
    : 'border-blue-600 text-gray-900 hover:bg-blue-600/10 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] hover:scale-[1.02]';
    
  // The base class now includes the transition properties
  const baseClasses = 'btn-glitch relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold tracking-widest uppercase border-2 bg-transparent cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-current';

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${buttonClasses}`}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default GlitchButton;