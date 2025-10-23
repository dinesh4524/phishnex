const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

/**
 * Dynamically imports the GoogleGenerativeAI class and initializes the client.
 * This is necessary to bypass module resolution issues with the package's web bundle.
 */
export async function getGeminiClient() {
  const GenAIModule = await import('@google/genai');
  
  // Check for common export patterns after dynamic import
  const GoogleGenerativeAI = 
    (GenAIModule as any).GoogleGenerativeAI || 
    (GenAIModule as any).default?.GoogleGenerativeAI || 
    (GenAIModule as any).default;

  if (typeof GoogleGenerativeAI !== 'function') {
    throw new Error("Failed to initialize GoogleGenerativeAI after dynamic import.");
  }

  return new GoogleGenerativeAI({ apiKey });
}