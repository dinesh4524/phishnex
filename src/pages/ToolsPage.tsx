
import React, { useState, useMemo } from 'react';

const PasswordStrengthMeter: React.FC = () => {
  const [password, setPassword] = useState('');

  const getStrength = (pass: string) => {
    let score = 0;
    if (!pass) return { score: 0, label: 'Very Weak', color: 'bg-red-500' };

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

  return (
    <div className="w-full max-w-lg">
      <h3 className="text-2xl font-orbitron text-cyan-300 mb-4 text-center">Password Strength Meter</h3>
      <div className="relative">
        <input
          type="text"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter a password to test its strength"
          className="w-full bg-gray-900/50 border border-purple-500/50 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">Cyber Tools</h1>
        <p className="text-xl text-gray-400 mt-4">Utilities to enhance your digital security.</p>
      </div>
      <div className="w-full max-w-3xl bg-black/20 p-8 rounded-lg border border-cyan-500/20">
        <PasswordStrengthMeter />
      </div>
    </div>
  );
};

export default ToolsPage;