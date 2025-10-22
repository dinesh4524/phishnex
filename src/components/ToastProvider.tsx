import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';

const ToastProvider: React.FC = () => {
  const { theme } = useTheme();
  
  const toastOptions = {
    style: {
      borderRadius: '8px',
      background: theme === 'dark' ? '#1f2937' : '#ffffff', // gray-800 or white
      color: theme === 'dark' ? '#00ffff' : '#1f2937', // cyan or gray-800
      border: theme === 'dark' ? '1px solid #00ffff' : '1px solid #3b82f6', // cyan or blue
      boxShadow: theme === 'dark' ? '0 0 10px rgba(0, 255, 255, 0.5)' : '0 0 10px rgba(59, 130, 246, 0.3)',
      fontFamily: 'Poppins, sans-serif',
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