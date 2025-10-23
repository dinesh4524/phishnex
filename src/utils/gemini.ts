const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("API key not found. Please set the VITE_GEMINI_API_KEY environment variable in your .env file.");
}

// Access the AI client constructor from the global window object,
// where it was placed by the script tag in index.html.
const GoogleGenerativeAI = (window as any).GoogleGenerativeAI;

if (typeof GoogleGenerativeAI !== 'function') {
  // This error will now be more informative.
  throw new Error("Could not initialize the AI client. The 'GoogleGenerativeAI' constructor was not found on the window object. The library may have failed to load from the CDN. Check the browser console for errors.");
}

// Export a simple, ready-to-use instance of the AI client.
export const ai = new GoogleGenerativeAI(apiKey);