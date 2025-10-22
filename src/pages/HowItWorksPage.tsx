' with '→' in placeholder text.">
import React from 'react';
import { useTheme } from '@/context/ThemeContext';
import { Link, Brain, CheckCircle, Quote, Zap } from 'lucide-react';
import RandomTip from '@/components/RandomTip';

const ProcessStep: React.FC<{ step: number, title: string, description: string, icon: React.ReactNode }> = ({ step, title, description, icon }) => {
  const { theme } = useTheme();
  
  const stepClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-cyan-500/30 shadow-xl shadow-cyan-900/50'
    : 'bg-white border border-indigo-300/50 shadow-lg shadow-indigo-200';
    
  const iconContainerClasses = theme === 'dark'
    ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30'
    : 'bg-indigo-100 text-indigo-600 border border-indigo-300';

  return (
    <div className={`p-6 rounded-lg flex flex-col items-center text-center transition-all duration-500 hover:scale-[1.02] ${stepClasses}`}>
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${iconContainerClasses}`}>
        {icon}
      </div>
      <p className="text-sm font-orbitron font-bold mb-1">STEP {step}</p>
      <h3 className={`text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>{title}</h3>
      <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>{description}</p>
    </div>
  );
};

const HowItWorksPage: React.FC = () => {
  const { theme } = useTheme();
  
  const subtitleClasses = theme === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const sectionTitleClasses = theme === 'dark' ? 'text-cyan-300 border-b border-cyan-500/30' : 'text-indigo-600 border-b border-indigo-300';
  const quoteClasses = theme === 'dark' ? 'bg-gray-900/50 border-l-4 border-purple-500 text-gray-300' : 'bg-gray-100 border-l-4 border-purple-600 text-gray-700';
  const quoteAuthorClasses = theme === 'dark' ? 'text-purple-400' : 'text-purple-700';

  return (
    <div className="container mx-auto px-6 py-16">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">How PhishNex Works</h1>
        <p className={`text-xl mt-4 ${subtitleClasses}`}>The engine behind your digital shield.</p>
      </div>

      {/* Security Tip Widget */}
      <div className="mb-12 max-w-3xl mx-auto">
        <RandomTip />
      </div>

      {/* 1. Process Flow */}
      <div className="mb-16">
        <h2 className={`text-3xl font-orbitron font-bold pb-3 mb-8 text-center ${sectionTitleClasses}`}>
          The 3-Step Scan Process
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <ProcessStep 
            step={1} 
            title="Input & Submission" 
            description="You paste the suspicious URL, email, or message content into the Scan Zone."
            icon={<Link size={32} />}
          />
          <ProcessStep 
            step={2} 
            title="AI Analysis" 
            description="PhishNex sends the content to the Gemini model for deep structural and keyword pattern analysis."
            icon={<Brain size={32} />}
          />
          <ProcessStep 
            step={3} 
            title="Instant Verdict" 
            description="The system returns a clear verdict (Safe, Suspicious, or Phishing) with detailed reasons and tips."
            icon={<CheckCircle size={32} />}
          />
        </div>
      </div>

      {/* 2. Technical Innovation Section */}
      <div className="mb-16 max-w-4xl mx-auto">
        <h2 className={`text-3xl font-orbitron font-bold pb-3 mb-8 text-center ${sectionTitleClasses}`}>
          Technical Innovation Overview
        </h2>
        <div className={`p-8 rounded-lg ${theme === 'dark' ? 'bg-black/20 border border-cyan-500/20 shadow-2xl shadow-cyan-900/50' : 'bg-white/50 border border-indigo-300/50 shadow-xl shadow-indigo-200'}`}>
          <h3 className={`text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-gray-900'}`}>PhishNex Algorithm Overview</h3>
          <p className={`mb-6 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
            PhishNex leverages a multi-layered analysis approach powered by Google Gemini. The model is prompted to focus on key indicators that bypass simple blocklists:
          </p>
          <ul className="space-y-2 mb-8">
            <li className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Zap className={`w-5 h-5 mr-2 flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'}`} />
              **Domain Age & Reputation:** Checking for newly registered or known malicious domains.
            </li>
            <li className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Zap className={`w-5 h-5 mr-2 flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'}`} />
              **URL Structure Analysis:** Identifying deceptive subdomains, homoglyphs, and excessive redirection.
            </li>
            <li className={`flex items-start ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              <Zap className={`w-5 h-5 mr-2 flex-shrink-0 ${theme === 'dark' ? 'text-cyan-400' : 'text-indigo-600'}`} />
              **Keyword Pattern Matching:** Detecting urgent, threatening, or financial language common in scams.
            </li>
          </ul>
          
          <div className="mt-8 p-4 border border-dashed border-gray-500/50 rounded-lg text-center">
            <p className="font-orbitron text-lg mb-2">Workflow Diagram Placeholder</p>
            <p className="text-sm text-gray-500">
              [Diagram showing Input → Gemini Analysis → JSON Output → Verdict Display]
            </p>
          </div>
        </div>
      </div>

      {/* 3. Testimonials/Quotes */}
      <div className="max-w-4xl mx-auto">
        <h2 className={`text-3xl font-orbitron font-bold pb-3 mb-8 text-center ${sectionTitleClasses}`}>
          Community Awareness
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-6 rounded-lg ${quoteClasses}`}>
            <Quote className={`w-8 h-8 mb-3 ${quoteAuthorClasses}`} />
            <p className="italic mb-3">"PhishNex made me realize how easy it is to get fooled online. The Learn Zone is incredibly helpful."</p>
            <p className={`font-bold text-right ${quoteAuthorClasses}`}>— Student User</p>
          </div>
          <div className={`p-6 rounded-lg ${quoteClasses}`}>
            <Quote className={`w-8 h-8 mb-3 ${quoteAuthorClasses}`} />
            <p className="italic mb-3">"Simple, fast, and effective — a great awareness initiative for our entire faculty and student body!"</p>
            <p className={`font-bold text-right ${quoteAuthorClasses}`}>— Faculty Reviewer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPage;