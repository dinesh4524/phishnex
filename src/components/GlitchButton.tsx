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
    ? 'border-cyan-400 hover:bg-cyan-400/10 focus:ring-cyan-500/50 text-white'
    : 'border-blue-600 text-gray-900 hover:bg-blue-600/10 focus:ring-blue-500/50';
    
  const glitchBackground = theme === 'dark' ? '#010413' : '#f3f4f6'; // Dark background: #010413, Light background: gray-100 (#f3f4f6)

  return (
    <button
      onClick={onClick}
      data-text={children}
      className={`btn-glitch relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold tracking-widest uppercase border-2 bg-transparent cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 ${buttonClasses}`}
      style={{ '--glitch-bg': glitchBackground } as React.CSSProperties}
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default GlitchButton;