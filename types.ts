
export interface ScanResult {
  verdict: 'Safe' | 'Suspicious' | 'Phishing';
  confidence: number;
  reasons: string[];
  tips: string[];
}

export interface QuizQuestion {
  id: number;
  content: string;
  isPhish: boolean;
  explanation: string;
}

export interface LearnCardData {
  id: number;
  front: {
    title: string;
    content: string;
  };
  back: {
    title: string;
    analysis: string[];
  };
}
