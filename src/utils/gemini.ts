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
    const genAIModule = await import("@google/genai");
    
    // Handle various export patterns:
    if (typeof genAIModule === 'function') {
      // Case 1: Module root is the constructor (e.g., default export is the class)
      GoogleGenerativeAI = genAIModule;
    } else if (genAIModule.GoogleGenerativeAI) {
      // Case 2: Named export 'GoogleGenerativeAI' exists directly on the module object
      GoogleGenerativeAI = genAIModule.GoogleGenerativeAI;
    } else if ((genAIModule as any).default && (genAIModule as any).default.GoogleGenerativeAI) {
      // Case 3: Named export is nested under the default export
      GoogleGenerativeAI = (genAIModule as any).default.GoogleGenerativeAI;
    } else if ((genAIModule as any).default && typeof (genAIModule as any).default === 'function') {
      // Case 4: Default export itself is the constructor (common fallback)
      GoogleGenerativeAI = (genAIModule as any).default;
    }
    
  } catch (e) {
    console.error("Failed to import @google/genai", e);
    throw new Error("Could not import the @google/genai package.");
  }

  if (typeof GoogleGenerativeAI !== 'function') {
    throw new Error("Could not find a valid GoogleGenerativeAI constructor in the @google/genai package.");
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