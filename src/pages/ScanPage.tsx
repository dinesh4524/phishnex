import React, { useState, useCallback } from 'react';
import { Type } from "@google/genai";
import { ai } from '@/utils/gemini';
import type { ScanResult } from '@/types';
import { useTheme } from '@/context/ThemeContext';

type ScanMode = 'url' | 'email' | 'message';

const ScanPage: React.FC = () => {
  const { theme } = useTheme();
  const [input, setInput] = useState('');
  const [scanMode, setScanMode] = useState<ScanMode>('url');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeContent = useCallback(async () => {
    if (!input) {
      setError('Please enter content to analyze.');
      return;
    }
    setIsLoading(true);
    setResult(null);
    setError(null);

    try {
      const basePrompt = `Analyze the following ${scanMode} content for phishing characteristics. Provide your analysis in a strict JSON format with no additional text or markdown. The JSON object must have four keys: 'verdict' (string: "Safe", "Suspicious", or "Phishing"), 'confidence' (number: 0-100), 'reasons' (array of strings explaining the verdict), and 'tips' (array of strings for user safety).`;

      let specificPrompt = '';
      if (scanMode === 'url') {
        specificPrompt = `Focus on URL structure, domain age/reputation, SSL certificate presence, and if the page content seems deceptive. Content: "${input}"`;
      } else if (scanMode === 'email') {
        specificPrompt = `Focus on the sender's address, subject line, generic greetings (e.g., "Dear Customer"), urgent or threatening language, spelling/grammar mistakes, and any mentioned links or attachments. Content: "${input}"`;
      } else { // message mode
        specificPrompt = `Focus on characteristics of "smishing" (SMS phishing). Analyze for urgent calls to action, shortened links (e.g., bit.ly), claims of prize winnings or delivery issues, and requests for personal information. Content: "${input}"`;
      }
      
      const fullPrompt = `${basePrompt}\n\n${specificPrompt}`;
      
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              verdict: { type: Type.STRING, description: "A single word: 'Safe', 'Suspicious', or 'Phishing'" },
              confidence: { type: Type.NUMBER, description: "A number between 0 and 100" },
              reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
              tips: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ["verdict", "confidence", "reasons", "tips"],
          }
        }
      });
      
      const jsonText = response.text.trim();
      const parsedResult: ScanResult = JSON.parse(jsonText);
      setResult(parsedResult);
      
    } catch (e: any) {
      console.error(e);
      setError('Failed to analyze the content. The AI may be offline or an error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [input, scanMode]);
  
  const handleModeChange = (mode: ScanMode) => {
    setScanMode(mode);
    setResult(null);
    setError(null);
    setInput('');
  }

  const getVerdictColor = (verdict?: string) => {
    switch (verdict) {
      case 'Safe': return 'text-green-400 border-green-400';
      case 'Suspicious': return 'text-yellow-400 border-yellow-400';
      case 'Phishing': return 'text-red-500 border-red-500';
      default: return 'text-gray-400 border-gray-400';
    }
  };
  
  const inputClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/50 text-white placeholder-gray-500 focus:ring-purple-500'
    : 'bg-white border border-blue-300/50 text-gray-900 placeholder-gray-500 focus:ring-blue-500';
    
  const containerClasses = theme === 'dark'
    ? 'bg-black/20 border border-cyan-500/20'
    : 'bg-white/50 border border-blue-300/50 shadow-xl';
    
  const resultContainerClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/30'
    : 'bg-white border border-purple-300/50 shadow-xl';
    
  const buttonActiveClasses = theme === 'dark'
    ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]'
    : 'bg-blue-600 text-white shadow-[0_0_15px_rgba(0,100,255,0.5)]';
    
  const buttonInactiveClasses = theme === 'dark'
    ? 'bg-gray-800 text-gray-400 hover:bg-gray-700'
    : 'bg-gray-300 text-gray-700 hover:bg-gray-400';
    
  const scanButtonClasses = theme === 'dark'
    ? 'bg-cyan-500 text-black hover:bg-cyan-400 disabled:bg-gray-600'
    : 'bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-400';
    
  const reasonTitleClasses = theme === 'dark' ? 'text-cyan-300 border-cyan-500/30' : 'text-blue-600 border-blue-300';
  const tipTitleClasses = theme === 'dark' ? 'text-purple-400 border-purple-500/30' : 'text-purple-700 border-purple-300';
  const listTextClasses = theme === 'dark' ? 'text-gray-300' : 'text-gray-700';


  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-8 w-full max-w-3xl">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">AI Scan Zone</h1>
        <p className={`text-xl mt-4 ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>Enter a URL, email, or message to check for threats.</p>
      </div>

      <div className={`w-full max-w-3xl p-8 rounded-lg ${containerClasses}`}>
        <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
          <button 
            onClick={() => handleModeChange('url')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'url' ? buttonActiveClasses : buttonInactiveClasses}`}>
            URL
          </button>
          <button 
            onClick={() => handleModeChange('email')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'email' ? buttonActiveClasses : buttonInactiveClasses}`}>
            Email
          </button>
          <button 
            onClick={() => handleModeChange('message')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'message' ? buttonActiveClasses : buttonInactiveClasses}`}>
            Message
          </button>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          {scanMode === 'url' ? (
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., http://secure-login-update.com"
              className={`flex-grow rounded-md px-4 py-3 focus:outline-none focus:ring-2 ${inputClasses}`}
              disabled={isLoading}
            />
          ) : (
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                scanMode === 'email' 
                  ? "Paste the full email content here..." 
                  : "Paste the SMS or instant message content here..."
              }
              className={`flex-grow rounded-md px-4 py-3 focus:outline-none focus:ring-2 h-32 resize-none ${inputClasses}`}
              disabled={isLoading}
            />
          )}
          <button
            onClick={analyzeContent}
            disabled={isLoading || !input}
            className={`px-8 py-3 font-bold rounded-md transition-colors flex items-center justify-center ${scanButtonClasses}`}
          >
            {isLoading ? 'Scanning...' : 'Scan'}
          </button>
        </div>
        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>

      {isLoading && (
        <div className="w-full max-w-3xl mt-8">
          <p className="text-center text-cyan-300 font-orbitron tracking-widest animate-pulse">ANALYZING THREAT MATRIX...</p>
          <div className="w-full bg-gray-700/50 rounded-full h-2 mt-4 overflow-hidden border border-cyan-900">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-400 h-full rounded-full animate-scanner"></div>
            <style>{`
              @keyframes scanner {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
              }
              .animate-scanner {
                animation: scanner 2s linear infinite;
              }
            `}</style>
          </div>
        </div>
      )}

      {result && (
        <div className={`w-full max-w-3xl mt-8 p-8 rounded-lg animate-fade-in-up ${resultContainerClasses}`}>
          <h2 className={`text-3xl font-orbitron mb-6 text-center ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>AI Analysis Report</h2>
          <div className="text-center mb-6">
            <span className={`text-4xl font-bold px-6 py-2 border-2 rounded-lg ${getVerdictColor(result.verdict)}`}>{result.verdict.toUpperCase()}</span>
            <p className={`text-lg mt-4 ${listTextClasses}`}>Confidence: {result.confidence}%</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className={`text-xl font-bold border-b pb-2 mb-3 ${reasonTitleClasses}`}>Detection Reasons</h3>
              <ul className="space-y-2">
                {result.reasons.map((reason, i) => <li key={i} className={`list-disc list-inside ${listTextClasses}`}>{reason}</li>)}
              </ul>
            </div>
            <div>
              <h3 className={`text-xl font-bold border-b pb-2 mb-3 ${tipTitleClasses}`}>Security Tips</h3>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => <li key={i} className={`list-disc list-inside ${listTextClasses}`}>{tip}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;