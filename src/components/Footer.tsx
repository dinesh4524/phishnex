import React from 'react';
import { useTheme } from '@/context/ThemeContext';

const Footer: React.FC = () => {
  const { theme } = useTheme();
  
  const footerClasses = theme === 'dark'
    ? 'bg-[#010413]/80 border-t border-cyan-500/10'
    : 'bg-gray-200/80 border-t border-gray-300';
    
  const textClasses = theme === 'dark' ? 'text-gray-600' : 'text-gray-500';

  return (
    <footer className={`w-full py-3 text-center flex-shrink-0 ${footerClasses}`}>
      <p className={`text-xs ${textClasses}`}>
        © 2025 Haritha Dinesh and Vijay Reddy. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;