import * as GenAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Accessing the constructor via the module object property, which is necessary when default and named imports fail due to CJS/ESM interop.
const ai = new GenAI.GoogleGenerativeAI({ apiKey });

export default ai;