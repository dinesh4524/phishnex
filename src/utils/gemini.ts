import { GoogleGenerativeAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

if (typeof GoogleGenerativeAI !== 'function') {
  // This is a fallback, but the user will see a more helpful error this way.
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found. This might be due to an issue with the module import.");
}

export const ai = new GoogleGenerativeAI(apiKey);