import * as GenAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Attempting to use the root namespace object as the constructor, which sometimes works for CJS modules that export a class directly.
// This is the last standard import pattern to try for CJS/ESM interop.
const ai = new (GenAI as any)({ apiKey });

export default ai;