import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Initializes and returns a configured Gemini model instance.
 */
export async function getGeminiModel() {
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set. Please set it in your environment.");
  }

  // Initialize the client. The latest SDK defaults to the stable v1 endpoint.
  const genAI = new GoogleGenerativeAI(apiKey);

  // --- Debugging Step: List available models ---
  // This step is kept to help diagnose API key issues if they arise.
  try {
    const models = await genAI.listModels();
    console.log("--- Available Gemini Models (v1 API) ---");
    models.models.forEach(model => console.log(model.name));
    console.log("-----------------------------------------");
  } catch (e) {
    console.warn("Could not list models. API key or network issue.", e);
  }
  // ---------------------------------------------

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