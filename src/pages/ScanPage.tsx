
import React, { useState, useCallback } from 'react';
import { Type } from "@google/genai";
import { ai } from '@/utils/gemini';
import type { ScanResult } from '@/types';

type ScanMode = 'url' | 'email' | 'message';

const ScanPage: React.FC = () => {
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
      
      if (parsedResult.verdict === 'Phishing') {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance("Alert! High probability of phishing detected.");
            window.speechSynthesis.speak(utterance);
        }
      }

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

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-8 w-full max-w-3xl">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">AI Scan Zone</h1>
        <p className="text-xl text-gray-400 mt-4">Enter a URL, email, or message to check for threats.</p>
      </div>

      <div className="w-full max-w-3xl bg-black/20 p-8 rounded-lg border border-cyan-500/20">
        <div className="flex justify-center mb-6 space-x-2 sm:space-x-4">
          <button 
            onClick={() => handleModeChange('url')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'url' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            URL
          </button>
          <button 
            onClick={() => handleModeChange('email')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'email' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
            Email
          </button>
          <button 
            onClick={() => handleModeChange('message')}
            className={`px-4 py-2 text-sm sm:px-6 sm:text-base font-orbitron rounded-md transition-all duration-300 ${scanMode === 'message' ? 'bg-cyan-500 text-black shadow-[0_0_15px_rgba(0,255,255,0.5)]' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'}`}>
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
              className="flex-grow bg-gray-900/50 border border-purple-500/50 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
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
              className="flex-grow bg-gray-900/50 border border-purple-500/50 rounded-md px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 h-32 resize-none"
              disabled={isLoading}
            />
          )}
          <button
            onClick={analyzeContent}
            disabled={isLoading || !input}
            className="px-8 py-3 bg-cyan-500 text-black font-bold rounded-md hover:bg-cyan-400 transition-colors disabled:bg-gray-600 disabled:cursor-not-allowed flex items-center justify-center"
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
        <div className="w-full max-w-3xl mt-8 p-8 bg-gray-900/50 border border-purple-500/30 rounded-lg animate-fade-in-up">
          <h2 className="text-3xl font-orbitron mb-6 text-center">AI Analysis Report</h2>
          <div className="text-center mb-6">
            <span className={`text-4xl font-bold px-6 py-2 border-2 rounded-lg ${getVerdictColor(result.verdict)}`}>{result.verdict.toUpperCase()}</span>
            <p className="text-lg text-gray-300 mt-4">Confidence: {result.confidence}%</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-cyan-300 border-b border-cyan-500/30 pb-2 mb-3">Detection Reasons</h3>
              <ul className="space-y-2">
                {result.reasons.map((reason, i) => <li key={i} className="text-gray-300 list-disc list-inside">{reason}</li>)}
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold text-purple-400 border-b border-purple-500/30 pb-2 mb-3">Security Tips</h3>
              <ul className="space-y-2">
                {result.tips.map((tip, i) => <li key={i} className="text-gray-300 list-disc list-inside">{tip}</li>)}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScanPage;