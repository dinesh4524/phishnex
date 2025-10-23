const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// This function dynamically imports the AI library from a reliable CDN.
// This bypasses issues with local package bundling and ensures we get a working version.
async function initializeAiClient() {
  try {
    // Directly import from the esm.run CDN, which provides a stable ES Module version.
    const module = await import('https://esm.run/@google/generative-ai');
    
    // The constructor is a named export on the module.
    const GoogleGenerativeAI = module.GoogleGenerativeAI;

    if (typeof GoogleGenerativeAI !== 'function') {
      console.error("Failed to find GoogleGenerativeAI constructor in the loaded module:", module);
      throw new Error("Could not initialize the AI client. The module structure from the CDN is unexpected.");
    }
    
    // Return a new instance of the client.
    return new GoogleGenerativeAI(apiKey);

  } catch (error) {
    console.error("Fatal error during AI client initialization:", error);
    throw new Error("The AI library failed to load from the CDN. The application's scan feature will not work.");
  }
}

// Export the promise. The Scan Page will await this promise to get the client.
export const aiPromise = initializeAiClient();