import { GoogleGenerativeAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// This is the standard and correct way to import the AI client.
// If this fails, it indicates an issue with the library file being provided by the CDN,
// as the module is not exporting its components in a standard way.
if (typeof GoogleGenerativeAI !== 'function') {
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found in the imported module.");
}

export const ai = new GoogleGenerativeAI(apiKey);