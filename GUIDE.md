# PhishNex: User & Developer Guide

This document provides a comprehensive guide for both end-users interacting with the PhishNex application and developers looking to run, customize, or contribute to the project.

---

## 👤 For Users: How to Use PhishNex

Welcome, Agent! This guide will walk you through your new suite of cyber defense tools.

### 1. Navigating the Dashboard

The main navigation is always available in the header at the top of your screen. You can switch between the five core modules at any time:
-   **Home:** The main landing page.
-   **Scan Zone:** Access the threat analyzer.
-   **Learn:** Study real-world phishing examples and safety tips.
-   **Play Zone:** Test your skills in the awareness game.
-   **Cyber Tools:** Use security utilities like the password meter.

### 2. Using the Scan Zone

1.  **Select a Mode:** Choose whether you want to scan a **URL**, an **Email**, or a **Message**.
2.  **Enter Content:** Paste the suspicious content into the input box.
3.  **Initiate Scan:** Click the "Scan" button.
4.  **Review the Report:** The analysis engine will provide a detailed report including a verdict (`Safe`, `Suspicious`, or `Phishing`), its confidence level, the reasons it found, and actionable security tips.

### 3. Exploring the Learn Zone

Sharpen your instincts by studying the enemy's tactics and core security principles.

1.  **Browse the Cards:** The page displays several cards, each representing a scam scenario or a digital safety topic.
2.  **Hover to Reveal:** Simply move your mouse over any card. It will flip over to reveal a detailed analysis or explanation.

### 4. A Quick Digital Safety Primer

-   **Think Before You Click:** Be wary of unexpected messages, especially those creating a sense of urgency. Hover over links to verify their destination.
-   **Use Strong Passwords:** A strong password is long and complex. Use a password manager to create and store unique passwords for each account.
-   **Enable 2FA:** Two-Factor Authentication is a powerful defense. Enable it on all important accounts like email and banking.
-   **Stay Updated:** Keep your devices and apps updated to protect against the latest threats.
-   **Use Public Wi-Fi Safely:** Avoid sensitive activities like banking on public Wi-Fi. Use a VPN for an encrypted, secure connection.

---

## 👨‍💻 For Developers: How to Run Locally

Follow these simple steps to get the PhishNex project running on your machine. The project is built with Vite, ensuring a fast and modern development experience.

### 1. Prerequisites

-   **Node.js:** Ensure you have a recent version of Node.js installed (which includes npm). Download it from [nodejs.org](https://nodejs.org/).

### 2. Setup

1.  **Download Project Files:** Get all the project files and place them in a new directory.
2.  **Install Dependencies:** Open a terminal in the project's root directory and run:
    ```bash
    npm install
    ```

### 3. API Key Configuration (Required)

The scanner needs a Google API key to function.

1.  **Get an API Key:** Obtain your free API key from [Google AI Studio](https://aistudio.google.com/).
2.  **Create `.env` File:** In the root of the project, create a new file named `.env`.
3.  **Add Your Key:** Inside the `.env` file, add the following line, pasting your key after the `=`:
    ```
    VITE_GEMINI_API_KEY=YOUR_API_KEY_HERE
    ```
    *(The `VITE_` prefix is essential for Vite to make the key available in the app).*

    **That's it!** The application is coded to automatically use this key when running locally. You do not need to make any changes to the source code.

### 4. Running the Application

Start the local development server with this command:
```bash
npm start
```
Your terminal will show a local URL (e.g., `http://localhost:3000`). Open it in your browser to use the app. The server will automatically reload when you make changes to the code.

### 5. Building for Production

To create an optimized build for deployment, run:
```bash
npm run build
```
This command generates a `dist` folder with all the static files needed to host your application on any web server.