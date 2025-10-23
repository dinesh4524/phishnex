import * as GenAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Due to persistent CJS/ESM interop issues in Vite, we use a namespace import
// and access the class constructor as a property of the imported object.
const ai = new (GenAI as any).GoogleGenerativeAI({ apiKey });

export default ai;