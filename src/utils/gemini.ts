import GoogleGenerativeAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// We assume the default export is the GoogleGenerativeAI class itself
const ai = new GoogleGenerativeAI({ apiKey });

export default ai;