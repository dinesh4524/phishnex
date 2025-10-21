import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '@/constants';
import { useTheme } from '@/context/ThemeContext';

type GameState = 'start' | 'playing' | 'finished';

const PlayPage: React.FC = () => {
  const { theme } = useTheme();
  const [gameState, setGameState] = useState<GameState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ message: string; correct: boolean } | null>(null);

  const question = QUIZ_QUESTIONS[currentQuestionIndex];

  const handleStart = () => {
    setGameState('playing');
  };

  const handleAnswer = (isPhishGuess: boolean) => {
    if (feedback) return; // Prevent multiple answers

    const isCorrect = isPhishGuess === question.isPhish;
    if (isCorrect) {
      setScore(s => s + 1);
    }
    setFeedback({ message: question.explanation, correct: isCorrect });

    setTimeout(() => {
      setFeedback(null);
      if (currentQuestionIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentQuestionIndex(i => i + 1);
      } else {
        setGameState('finished');
      }
    }, 4000);
  };

  const restartGame = () => {
    setGameState('playing');
    setCurrentQuestionIndex(0);
    setScore(0);
    setFeedback(null);
  };
  
  const getBadge = () => {
      const percentage = (score / QUIZ_QUESTIONS.length) * 100;
      if (percentage < 50) return { title: 'Cyber Rookie', color: theme === 'dark' ? 'text-gray-400' : 'text-gray-600' };
      if (percentage < 80) return { title: 'Scam Slayer', color: theme === 'dark' ? 'text-cyan-400' : 'text-blue-600' };
      return { title: 'Phish Terminator 🏅', color: theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700' };
  }
  
  const containerClasses = theme === 'dark'
    ? 'bg-gray-900/50 border border-purple-500/30'
    : 'bg-white border border-blue-300/50 shadow-lg';
    
  const questionBoxClasses = theme === 'dark'
    ? 'bg-black/30 border border-cyan-700/50 text-gray-200'
    : 'bg-gray-100 border border-gray-300 text-gray-800';
    
  const startButtonClasses = theme === 'dark'
    ? 'bg-cyan-500 text-black hover:bg-cyan-400'
    : 'bg-blue-600 text-white hover:bg-blue-500';

  return (
    <div className="container mx-auto px-6 py-16 flex flex-col items-center">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-orbitron font-bold text-white cyber-glow">Awareness Arcade</h1>
        <p className="text-xl text-gray-400 mt-4">Test your skills and spot the phish!</p>
      </div>

      <div className={`w-full max-w-3xl min-h-[400px] rounded-lg p-8 flex flex-col justify-center items-center ${containerClasses}`}>
        {gameState === 'start' && (
          <div className="text-center animate-fade-in">
            <h2 className={`text-3xl font-orbitron mb-4 ${theme === 'dark' ? 'text-cyan-300' : 'text-gray-800'}`}>Spot the Phish</h2>
            <p className={`mb-8 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>You will be shown {QUIZ_QUESTIONS.length} messages. Decide if they are legitimate or a phishing attempt.</p>
            <button onClick={handleStart} className={`px-8 py-3 font-bold rounded-md transition-colors ${startButtonClasses}`}>Start Game</button>
          </div>
        )}

        {gameState === 'playing' && question && (
          <div className="w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <p className="font-orbitron text-lg">Question {currentQuestionIndex + 1}/{QUIZ_QUESTIONS.length}</p>
              <p className="font-orbitron text-lg">Score: {score}</p>
            </div>
            <div className={`p-6 rounded-md mb-6 ${questionBoxClasses}`}>
              <pre className="text-left whitespace-pre-wrap font-sans">{question.content}</pre>
            </div>
            {!feedback ? (
              <div className="flex justify-center gap-6">
                <button onClick={() => handleAnswer(true)} className="px-10 py-4 bg-red-600 hover:bg-red-500 text-white font-bold rounded-md transition-colors">Phishing</button>
                <button onClick={() => handleAnswer(false)} className="px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-bold rounded-md transition-colors">Legitimate</button>
              </div>
            ) : (
              <div className={`p-4 rounded-md text-center ${feedback.correct ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'}`}>
                <p className="font-bold text-xl mb-2">{feedback.correct ? 'Correct!' : 'Incorrect!'}</p>
                <p>{feedback.message}</p>
              </div>
            )}
          </div>
        )}

        {gameState === 'finished' && (
          <div className="text-center animate-fade-in">
            <h2 className={`text-3xl font-orbitron mb-4 ${theme === 'dark' ? 'text-cyan-300' : 'text-gray-800'}`}>Game Over!</h2>
            <p className={`text-2xl mb-4 ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'}`}>Your final score is: {score} / {QUIZ_QUESTIONS.length}</p>
            <div className="mb-8">
              <p className="text-xl">Your Rank:</p>
              <p className={`text-4xl font-orbitron font-bold ${getBadge().color}`}>{getBadge().title}</p>
            </div>
            <button onClick={restartGame} className={`px-8 py-3 font-bold rounded-md transition-colors ${startButtonClasses}`}>Play Again</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlayPage;