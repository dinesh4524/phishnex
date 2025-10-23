import * as genAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Correctly access the constructor. It's a property on the imported namespace.
const ai = new genAI.GoogleGenerativeAI(apiKey);

export default ai;