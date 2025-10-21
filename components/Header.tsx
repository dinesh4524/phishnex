import React from 'react';
import type { Page } from '../App';
import { ShieldCheck } from './icons/ShieldCheck';
import { BookOpen } from './icons/BookOpen';
import { ScanLine } from './icons/ScanLine';
import { Swords } from './icons/Swords';
import { Wrench } from './icons/Wrench';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const navItems: { id: Page; label: string, icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <ShieldCheck className="w-5 h-5 mr-2"/> },
    { id: 'scan', label: 'Scan Zone', icon: <ScanLine className="w-5 h-5 mr-2"/> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-5 h-5 mr-2"/> },
    { id: 'play', label: 'Play Zone', icon: <Swords className="w-5 h-5 mr-2"/> },
    { id: 'tools', label: 'Cyber Tools', icon: <Wrench className="w-5 h-5 mr-2"/> },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#010413]/80 backdrop-blur-lg border-b border-cyan-500/20">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => handleNavClick('home')}
        >
          <ShieldCheck className="w-8 h-8 text-cyan-400 cyber-glow" />
          <h1 className="text-2xl font-orbitron font-bold text-white cyber-glow">PhishShield</h1>
        </div>
        <ul className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center font-semibold text-lg transition-all duration-300 relative px-3 py-2 rounded-md ${
                  currentPage === item.id 
                    ? 'text-cyan-400 bg-cyan-900/50' 
                    : 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/30'
                }`}
              >
                {item.icon}
                {item.label}
                {currentPage === item.id && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-cyan-400 rounded-full"></span>
                )}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};

export default Header;