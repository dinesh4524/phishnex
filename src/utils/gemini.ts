import * as GenAIModule from '@google/genai';

// Access the class from the imported namespace object
const GoogleGenerativeAI = GenAIModule.GoogleGenerativeAI;

if (!GoogleGenerativeAI) {
  throw new Error("Could not find GoogleGenerativeAI in the @google/genai package. Please ensure the package is installed correctly.");
}

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

const ai = new GoogleGenerativeAI({ apiKey });

export default ai;