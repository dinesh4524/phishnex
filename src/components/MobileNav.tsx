import React, { useState } from 'react';
import { Menu, X, HelpCircle } from 'lucide-react';
import { ShieldCheck } from '@/components/icons/ShieldCheck';
import { BookOpen } from '@/components/icons/BookOpen';
import { ScanLine } from '@/components/icons/ScanLine';
import { Swords } from '@/components/icons/Swords';
import { Wrench } from '@/components/icons/Wrench';
import { useTheme } from '@/context/ThemeContext';
import type { Page } from '@/App';

interface MobileNavProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ currentPage, setCurrentPage }) => {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(false);
  };

  const buttonClasses = theme === 'dark'
    ? 'text-cyan-400 hover:bg-cyan-900/50 border border-cyan-500/30 shadow-lg hover:shadow-cyan-500/30'
    : 'text-indigo-600 hover:bg-indigo-100 border border-indigo-300/50 shadow-md hover:shadow-indigo-300/50';
    
  const sidebarClasses = theme === 'dark'
    ? 'bg-[#010413] border-r border-cyan-500/20'
    : 'bg-white border-r border-gray-300';
    
  const linkActiveClasses = theme === 'dark' ? 'text-cyan-400 bg-cyan-900/50' : 'text-indigo-600 bg-indigo-100';
  const linkInactiveClasses = theme === 'dark' ? 'text-gray-300 hover:text-cyan-400 hover:bg-cyan-900/30' : 'text-gray-600 hover:text-indigo-600 hover:bg-gray-300';

  return (
    <>
      {/* Hamburger Button (Visible on Mobile) */}
      <button
        onClick={() => setIsOpen(true)}
        className={`p-2 rounded-full transition-all duration-300 md:hidden ${buttonClasses}`}
        aria-label="Open menu"
      >
        <Menu className="w-6 h-6" />
      </button>

      {/* Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar Menu */}
      <div 
        className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ease-in-out p-6 md:hidden ${sidebarClasses} ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className={`text-2xl font-orbitron font-bold ${theme === 'dark' ? 'text-white cyber-glow' : 'text-gray-900'}`}>PhishNex</h2>
          <button
            onClick={() => setIsOpen(false)}
            className={`p-2 rounded-full ${buttonClasses}`}
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => handleNavClick(item.id)}
                className={`flex items-center w-full font-semibold text-lg transition-all duration-300 px-4 py-3 rounded-md ${
                  currentPage === item.id 
                    ? linkActiveClasses
                    : linkInactiveClasses
                }`}
              >
                {item.icon}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MobileNav;