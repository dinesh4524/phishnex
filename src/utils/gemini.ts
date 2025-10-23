import * as GenAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Due to persistent CJS/ESM interop issues in Vite, we access the constructor
// directly from the imported namespace object, which often holds the default export/constructor.
const ai = new (GenAI as any)({ apiKey });

export default ai;