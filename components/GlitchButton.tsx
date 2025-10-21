
import React from 'react';

interface GlitchButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const GlitchButton: React.FC<GlitchButtonProps> = ({ onClick, children, icon }) => {
  return (
    <button
      onClick={onClick}
      data-text={children}
      className="btn-glitch relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-bold tracking-widest text-white uppercase border-2 border-cyan-400 bg-transparent cursor-pointer transition-all duration-300 hover:bg-cyan-400/10 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
    >
      {icon}
      <span>{children}</span>
    </button>
  );
};

export default GlitchButton;
