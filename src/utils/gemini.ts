import * as genAI from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// The module from the CDN doesn't seem to have a named export.
// Let's try accessing the constructor from the 'default' property of the imported module.
const GoogleGenerativeAI = (genAI as any).default;

// A quick check to make sure we found a constructor.
if (typeof GoogleGenerativeAI !== 'function') {
  // This is a fallback, but the user will see a more helpful error this way.
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found in the '@google/genai' package. This might be due to a package update or a bundling issue.");
}

export const ai = new GoogleGenerativeAI(apiKey);