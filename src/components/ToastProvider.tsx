import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';

const ToastProvider: React.FC = () => {
  const { theme } = useTheme();
  
  // Base style for all toasts
  const baseStyle = {
    borderRadius: '8px',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: '600',
    padding: '12px 16px',
    minWidth: '250px',
  };

  // Theme-specific styles
  const darkThemeStyle = {
    background: '#1f2937', // Dark gray background
    color: '#00ffff', // Cyan text
    border: '1px solid #00ffff', // Cyan border
    boxShadow: '0 0 10px rgba(0, 255, 255, 0.5)', // Cyan glow
  };

  const lightThemeStyle = {
    background: '#ffffff', // White background
    color: '#1f2937', // Dark text
    border: '1px solid #4f46e5', // Indigo-600 border
    boxShadow: '0 0 10px rgba(79, 70, 229, 0.3)', // Indigo shadow
  };

  const toastOptions = {
    style: {
      ...baseStyle,
      ...(theme === 'dark' ? darkThemeStyle : lightThemeStyle),
    },
    success: {
      iconTheme: { primary: '#10b981', secondary: '#fff' }, // emerald-500
    },
    error: {
      iconTheme: { primary: '#ef4444', secondary: '#fff' }, // red-500
    },
  };

  return (
    <Toaster 
      position="top-right" 
      toastOptions={toastOptions}
    />
  );
};

export default ToastProvider;