import { GoogleGenAI } from "@google/genai";

// The API key is injected via Vite's define configuration from VITE_GEMINI_API_KEY in .env.
if (!process.env.API_KEY) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

export const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });