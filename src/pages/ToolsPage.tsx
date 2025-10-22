import React, { useState, useMemo } from 'react';
import { useTheme } from '@/context/ThemeContext';

const PasswordStrengthMeter: React.FC = () => {
  const { theme } = useTheme();
  const [password, setPassword] = useState('');

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'Very Weak', color: 'bg-red-700' };

    if (pass.length >= 8) score++;
    if (pass.length >= 12) score++;
    if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    switch (score) {
      case 0:
      case 1:
        return { score: 1, label: 'Very Weak', color: 'bg-red-700' };
      case 2:
        return { score: 2, label: 'Weak', color: 'bg-red-500' };
      case 3:
        return { score: 3, label: 'Medium', color: 'bg-yellow-500' };
      case 4:
        return { score: 4, label: 'Strong', color: 'bg-cyan-500' };
      case 5:
        return { score: 5, label: 'Very Strong', color: 'bg-green-500' };
      default:
        return { score: 0, label: 'Very Weak', color: 'bg-red-700' };
    }
  };

  const strength = useMemo(() => getStrength(password), [password]);
  
  // Enhanced 3D classes for input
  const inputClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/50 text-white placeholder-gray-500 focus:ring-purple-500 shadow-inner shadow-purple-900/50'
    : 'bg-white border border-blue-300/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500 shadow-inner shadow-blue-100';
    
  const titleClasses = theme === 'dark' ? 'text-cyan-300' : 'text-blue-600';

  return (
    <div className="w-full max-w-lg">
      <h3 className={`text-2xl font-orbitron mb-4 text-center ${titleClasses}`}>Password Strength Meter</h3>
      <div className="relative">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to test its strength"
          className={`w-full rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${inputClasses}`}
        />
      </div>
      <div className="mt-4">
        <div className="w-full bg-gray-700 rounded-full h-2.5">
          <div
            className={`h-2.5 rounded-full transition-all duration-300 ${strength.color}`}
            style={{ width: `${(strength.score / 5) * 100}%` }}
          ></div>
        </div>
        <p className={`text-right mt-2 font-bold ${strength.color.replace('bg-', 'text-')}`}>
          {strength.label}
        </p>
      </div>
    </div>
  );
};

const ToolsPage: React.FC = () => {
  const { theme } = useTheme();
  
  // Enhanced 3D classes for container
  const containerClasses = theme === 'dark'
    ? 'bg-black/20 border border-cyan-500/20 shadow-2xl shadow-cyan-900/50'
    : 'bg-white/50 border border-blue-300/50 shadow-xl shadow-blue-200';
    
  const subtitleClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">Cyber Tools</h1>
        <p className={`text-xl mt-4 ${subtitleClasses}`}>Utilities to enhance your digital security.</p>
      </div>
      <div className={`w-full max-w-3xl p-8 rounded-lg ${containerClasses}`}>
        <PasswordStrengthMeter />
      </div>
    </div>
  );
};

export default ToolsPage;