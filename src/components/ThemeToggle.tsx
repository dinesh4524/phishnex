import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Classes for a professional, slightly 3D button look using shadows and borders
  const buttonClasses = theme === 'dark'
    ? 'text-cyan-400 hover:bg-cyan-900/50 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/30'
    : 'text-indigo-600 hover:bg-indigo-100 border border-indigo-300/50 shadow-md hover:shadow-indigo-300/50';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-full transition-all duration-300 ${buttonClasses}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;