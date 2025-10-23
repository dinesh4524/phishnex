import * as genAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Using a namespace import and then destructuring. This can be more robust
// with some build tools and module formats.
const { GoogleGenerativeAI } = genAI;

if (!GoogleGenerativeAI) {
  throw new Error("Could not find GoogleGenerativeAI in the @google/genai package. The package structure might have changed.");
}

const ai = new GoogleGenerativeAI({ apiKey });

export default ai;