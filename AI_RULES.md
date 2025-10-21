# AI Development Rules for PhishShield

This document outlines the technical guidelines and rules for AI-driven development of the PhishShield application. Adhering to these rules ensures consistency, maintainability, and high-quality code.

---

## 🤖 Core Principles

-   **Simplicity First:** Prioritize simple, elegant solutions. Avoid over-engineering.
-   **Component-Based:** Build small, reusable, single-purpose components.
-   **User-Centric:** All features must directly enhance the user's ability to learn about and defend against phishing.

---

## 🛠️ Tech Stack Overview

The PhishShield application is built on a modern, performant frontend stack:

-   **Framework:** React 19 for building the user interface.
-   **Language:** TypeScript for type safety and improved developer experience.
-   **Build Tool:** Vite for fast development and optimized production builds.
-   **Styling:** Tailwind CSS for all styling, following a utility-first approach.
-   **AI Model:** Google Gemini for content analysis in the Scan Zone.
-   **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`) for managing component state.
-   **Routing:** A simple, custom component-based routing system managed within `App.tsx`.
-   **Icons:** A combination of custom SVG components and the `lucide-react` library.

---

## 📜 Library & Code Conventions

Follow these rules strictly when adding or modifying features.

### UI & Components

-   **Component Library:** **`shadcn/ui` is the preferred component library.** For any new UI elements like buttons, dialogs, inputs, cards, etc., you MUST use a component from `shadcn/ui` if a suitable one exists.
-   **Custom Components:** If a `shadcn/ui` component is not suitable, create a new, small, reusable component inside the `src/components/` directory.
-   **Styling:** All styling **MUST** be done with Tailwind CSS utility classes. Do not write custom CSS files or use inline `style` attributes, except for dynamic values that cannot be handled by Tailwind classes.
-   **Responsiveness:** All components and pages **MUST** be fully responsive and tested on both mobile and desktop viewports.

### Icons

-   **Icon Library:** Use icons from the **`lucide-react`** package. It is available and should be the primary source for all new icons.
-   **Custom Icons:** Only if an icon is not available in `lucide-react`, create a new, optimized SVG component in `src/components/icons/`.

### State Management

-   **Local State:** Use standard React Hooks (`useState`, `useReducer`) for component-level state.
-   **Global State:** For simple global state (like the current page), prop drilling is acceptable. If state needs to be shared across many disconnected components, use the React Context API. **Do not add libraries like Redux or Zustand.**

### AI Integration

-   **Gemini Client:** All interactions with the Google Gemini model **MUST** use the pre-configured client instance exported from `src/utils/gemini.ts`. Do not initialize a new client elsewhere.
-   **API Keys:** The API key is managed via environment variables (`process.env.API_KEY`). Do not hardcode keys in the source code.

### General

-   **File Structure:**
    -   Pages go in `src/pages/`.
    -   Reusable components go in `src/components/`.
    -   Static data (like quiz questions) goes in `src/constants.ts`.
    -   Shared utility functions go in `src/utils/`.
    -   TypeScript types go in `src/types.ts`.
-   **Imports:** Use absolute imports with the `@/` alias (e.g., `import Component from '@/components/Component'`).