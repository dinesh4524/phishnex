import * as GenAIModule from '@google/genai';

// Check if GoogleGenerativeAI is available directly or nested
const GoogleGenerativeAI = GenAIModule.GoogleGenerativeAI || (GenAIModule as any).default?.GoogleGenerativeAI;

if (!GoogleGenerativeAI) {
  throw new Error("Could not find GoogleGenerativeAI in the @google/genai package. The package structure might have changed.");
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

const ai = new GoogleGenerativeAI({ apiKey });

export default ai;