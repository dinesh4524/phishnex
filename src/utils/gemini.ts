import * as genAI from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// This is a complex module interop issue. The CDN might be serving a module
// that Vite wraps in a specific way. Let's try accessing the constructor
// directly from the 'default' property on the namespace import. This is a
// common pattern for CommonJS/ESM compatibility.
const GoogleGenerativeAI = (genAI as any).default;

if (typeof GoogleGenerativeAI !== 'function') {
  console.error("The imported 'genAI' object is:", genAI);
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found. The module structure seems to be unexpected.");
}

export const ai = new GoogleGenerativeAI(apiKey);