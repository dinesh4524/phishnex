import genAI from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Let's assume the default export is the module's exports object,
// which is common for CJS/ESM compatibility.
const GoogleGenerativeAI = (genAI as any).GoogleGenerativeAI;

if (typeof GoogleGenerativeAI !== 'function') {
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found. This might be due to an issue with the module import.");
}

export const ai = new GoogleGenerativeAI(apiKey);