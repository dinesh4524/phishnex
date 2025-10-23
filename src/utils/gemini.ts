import GoogleGenerativeAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Accessing the constructor via the default export, which is a common workaround for CJS/ESM interop issues in Vite.
const ai = new GoogleGenerativeAI({ apiKey });

export default ai;