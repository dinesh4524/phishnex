import toast from 'react-hot-toast';

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showWarning = (message: string) => {
  toast(message, {
    icon: '⚠️',
    style: {
      background: '#fef3c7', // yellow-100
      color: '#92400e', // amber-900
      border: '1px solid #f59e0b', // amber-500
    },
  });
};

export const showPhishingAlert = (verdict: 'Suspicious' | 'Phishing') => {
  if (verdict === 'Phishing') {
    toast.error('🚨 PHISHING DETECTED! Do NOT interact with this content.', {
      duration: 6000,
      style: {
        background: '#fee2e2', // red-100
        color: '#991b1b', // red-800
        border: '2px solid #ef4444', // red-500
        fontWeight: 'bold',
      }
    });
  } else if (verdict === 'Suspicious') {
    toast('⚠️ SUSPICIOUS CONTENT. Proceed with extreme caution.', {
      icon: '⚠️',
      duration: 5000,
      style: {
        background: '#fffbeb', // yellow-50
        color: '#b45309', // amber-700
        border: '2px solid #f59e0b', // amber-500
        fontWeight: 'bold',
      }
    });
  } else {
    toast.success('✅ Content analyzed and appears safe.', {
      duration: 3000,
    });
  }
};