import * as genAI from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// It seems the constructor is nested inside the default export of the module
// due to the custom bundling on the CDN.
const GoogleGenerativeAI = (genAI as any).default.GoogleGenerativeAI;

if (typeof GoogleGenerativeAI !== 'function') {
  // This is a fallback, but the user will see a more helpful error this way.
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found in the '@google/genai' package. This might be due to a package update or a bundling issue.");
}

export const ai = new GoogleGenerativeAI(apiKey);