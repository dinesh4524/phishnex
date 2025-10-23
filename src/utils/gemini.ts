import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Initializes and returns a configured Gemini model instance.
 */
export async function getGeminiModel() {
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set. Please set it in your environment.");
  }

  // **CRITICAL FIX**: Explicitly set the API endpoint to the stable v1 base path.
  // The environment appears to be defaulting to the 'v1beta' endpoint, which
  // causes a 404 error for the 'gemini-1.5-flash' model. This override
  // forces the SDK to use the correct 'v1' endpoint where the model is available.
  const genAI = new GoogleGenerativeAI(apiKey, {
    apiEndpoint: "https://generativelanguage.googleapis.com",
  });

  // Return a configured model instance, centralizing the configuration.
  return genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: [
      { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_NONE" },
      { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
    ],
  });
}