import React, { useState } from 'react';
import type { Page } from '@/App';
import { ShieldCheck } from '@/components/icons/ShieldCheck';
import { BookOpen } from '@/components/icons/BookOpen';
import { ScanLine } from '@/components/icons/ScanLine';
import { Swords } from '@/components/icons/Swords';
import { Wrench } from '@/components/icons/Wrench';
import { useTheme } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import { HelpCircle, Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const Header: React.FC<HeaderProps> = ({ currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const navItems: { id: Page; label: string, icon: React.ReactNode }[] = [
    { id: 'home', label: 'Home', icon: <ShieldCheck className="w-5 h-5 mr-2"/> },
    { id: 'scan', label: 'Scan Zone', icon: <ScanLine className="w-5 h-5 mr-2"/> },
    { id: 'learn', label: 'Learn', icon: <BookOpen className="w-5 h-5 mr-2"/> },
    { id: 'play', label: 'Play Zone', icon: <Swords className="w-5 h-5 mr-2"/> },
    { id: 'tools', label: 'Cyber Tools', icon: <Wrench className="w-5 h-5 mr-2"/> },
    { id: 'howitworks', label: 'How It Works', icon: <HelpCircle className="w-5 h-5 mr-2"/> },
  ];

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsMenuOpen(false); // Close menu on navigation
  };

  const headerClasses = theme === 'dark'
    ? 'bg-[#010413]/80 backdrop-blur-lg border-b border-cyan-500/20'
    : 'bg-gray-200/80 backdrop-blur-lg border-b border-gray-300';
    
  const logoClasses = theme === 'dark'
    ? 'text-cyan-400 cyber-glow'
    : 'text-indigo-600';

  return (
    <>
      <header className={`sticky top-0 z-50 ${headerClasses}`}>
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavClick('home')}
          >
            <ShieldCheck className={`w-8 h-8 ${logoClasses}`} />
            <h1 className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-white cyber-glow' : 'text-gray-900'}`}>PhishNex</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <ul className="hidden md:flex items-center space-x-6">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center font-semibold text-lg transition-all duration-300 relative px-3 py-2 rounded-md ${
                      currentPage === item.id 
                        ? theme === 'dark' ? 'text-cyan-400 bg-cyan-900/50' : 'text-indigo-600 bg-indigo-100'
                        : theme === 'dark' ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-300'
                    }`}
                  >
                    {item.icon}
                    {item.label}
                    {currentPage === item.id && (
                      <span className={`absolute -bottom-1 left-0 w-full h-0.5 rounded-full ${theme === 'dark' ? 'bg-cyan-400' : 'bg-indigo-600'}`}></span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
            <ThemeToggle />
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMenuOpen(true)} aria-label="Open menu">
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:hidden`}>
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/60" onClick={() => setIsMenuOpen(false)}></div>
        
        {/* Menu Panel */}
        <div className={`relative w-64 h-full p-6 ${theme === 'dark' ? 'bg-[#010413]' : 'bg-gray-200'}`}>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-orbitron font-bold">Menu</h2>
            <button onClick={() => setIsMenuOpen(false)} aria-label="Close menu">
              <X className="w-6 h-6" />
            </button>
          </div>
          <ul className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center font-semibold text-lg p-2 rounded-md transition-colors ${
                    currentPage === item.id 
                      ? theme === 'dark' ? 'text-cyan-400 bg-cyan-900/50' : 'text-indigo-600 bg-indigo-100'
                      : theme === 'dark' ? 'text-gray-300 hover:text-cyan-400' : 'text-gray-600 hover:text-indigo-600'
                  }`}
                >
                  {item.icon}
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Header;