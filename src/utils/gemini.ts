const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  // This check is immediate and doesn't need to be in the async function.
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// We use a dynamic import because the AI library from the CDN is causing static import errors.
// This approach allows us to handle the module at runtime and makes the app more resilient
// to unexpected changes in the external library.
async function initializeAiClient() {
  try {
    // Dynamically import the module.
    const module = await import('@google/genai');
    
    // Defensively find the constructor. The module structure seems to have changed.
    // It might be a named export (module.GoogleGenerativeAI) or a default export (module.default).
    const GoogleGenerativeAI = module.GoogleGenerativeAI || module.default;

    if (typeof GoogleGenerativeAI !== 'function') {
      console.error("Failed to find GoogleGenerativeAI constructor in the loaded module:", module);
      throw new Error("Could not initialize the AI client. The module structure is unexpected.");
    }
    
    // Return a new instance of the client.
    return new GoogleGenerativeAI(apiKey);

  } catch (error) {
    console.error("Fatal error during AI client initialization:", error);
    // Re-throw the error to prevent the app from trying to use a non-existent client.
    throw new Error("The AI library failed to load. The application's scan feature will not work.");
  }
}

// Export the promise. Other parts of the app will await this promise to get the client.
export const aiPromise = initializeAiClient();