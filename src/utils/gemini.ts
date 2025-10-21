import { GoogleGenAI } from "@google/genai";

// Fix: Per coding guidelines, the API key must be obtained exclusively from `process.env.API_KEY`.
// The logic for falling back to `import.meta.env` has been removed to resolve the TypeScript error and align with guidelines.
if (!process.env.API_KEY) {
  throw new Error("API key not found. Please set the API_KEY environment variable.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
