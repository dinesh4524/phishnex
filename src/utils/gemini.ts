import * as genAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// This robustly finds the constructor, handling different module bundling scenarios.
const GoogleGenerativeAI = (genAI as any).GoogleGenerativeAI || (genAI as any).default.GoogleGenerativeAI;

if (!GoogleGenerativeAI) {
  throw new Error("Could not find GoogleGenerativeAI constructor. The @google/genai package may have updated its export structure.");
}

const ai = new GoogleGenerativeAI(apiKey);

export default ai;