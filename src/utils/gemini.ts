import { GoogleGenerativeAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// This is the standard, correct way to import the class.
// We rely on a full rebuild to ensure Vite correctly processes the dependency.
const ai = new GoogleGenerativeAI({ apiKey });

export default ai;