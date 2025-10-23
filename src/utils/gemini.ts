import * as GenAI from '@google/genai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Accessing the constructor via the 'default' property of the namespace import object.
// This is a common pattern for CJS modules that export a class directly when other methods fail.
const ai = new GenAI.default({ apiKey });

export default ai;