const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

/**
 * Dynamically and safely imports the GoogleGenerativeAI class, handling
 * different module export patterns in Vite environments.
 * Initializes and returns a configured Gemini model instance.
 */
export async function getGeminiModel() {
  if (!apiKey) {
    throw new Error("VITE_GEMINI_API_KEY is not set. Please set it in your environment.");
  }

  let GoogleGenerativeAI: any;

  try {
    // Attempt to import the module.
    const genAIModule = await import("@google/generative-ai");
    
    // Handle common export patterns for the official SDK
    GoogleGenerativeAI = genAIModule.GoogleGenerativeAI || (genAIModule as any).default;
    
  } catch (e) {
    console.error("Failed to import @google/generative-ai", e);
    throw new Error("Could not import the @google/generative-ai package.");
  }

  if (typeof GoogleGenerativeAI !== 'function') {
    throw new Error("Could not find a valid GoogleGenerativeAI constructor in the @google/generative-ai package.");
  }

  const genAI = new GoogleGenerativeAI(apiKey);

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