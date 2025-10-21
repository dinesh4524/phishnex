# PhishShield: The Future of Safe Surfing

> 🔐 “Spot. Stop. Secure — One Click at a Time.”

---

## 🚀 Overview

PhishShield is not just a tool; it's an interactive cyber defense simulator. Built with a futuristic, cyber-lab aesthetic, its mission is to educate and empower users to effectively identify, avoid, and report phishing attempts and online scams. By combining AI-powered analysis with gamified learning, PhishShield transforms cybersecurity awareness from a passive chore into an engaging and empowering experience.

The interface is designed to be immersive, using a dark neon palette, glowing animations, and a cohesive design language that makes users feel like they are operators in a high-tech security operations center.

## ✨ Key Features

PhishShield is divided into several core modules, each serving a unique purpose in the user's journey to becoming a "Phish Terminator."

### 🤖 AI Scan Zone

The heart of PhishShield's defensive capabilities. The AI Scan Zone leverages the power of the Google Gemini model to perform real-time threat analysis on user-submitted content.

-   **Multi-Mode Analysis:** Users can switch between three distinct modes for targeted analysis:
    -   **URL Scan:** Analyzes web addresses for suspicious domains, SSL certificate issues, and deceptive structures.
    -   **Email Scan:** Scrutinizes email content for common phishing indicators like spoofed sender addresses, generic greetings, urgent language, and malicious links.
    -   **Message Scan:** Focuses on "smishing" (SMS phishing) tactics, such as URL shorteners, fake delivery notices, and prize scams.
-   **Detailed Reporting:** The AI returns a clear verdict (`Safe`, `Suspicious`, or `Phishing`), a confidence score, a list of specific reasons for its conclusion, and actionable security tips.

### 🧠 Interactive Awareness Zone (Learn)

A hands-on educational module where users can learn about phishing tactics and essential digital safety concepts in a safe environment.

-   **Flippable Case-Study Cards:** Users are presented with realistic examples of scam emails and messages, as well as cards covering topics like password security, 2FA, and Wi-Fi safety.
-   **Instant Analysis:** Hovering over a card "flips" it to reveal a detailed breakdown of the red flags or key safety principles, providing immediate learning feedback.

### 🎮 Awareness Arcade (Play)

A gamified testing ground to put the user's knowledge into practice.

-   **"Spot the Phish" Quiz:** A challenging quiz where users must quickly decide if a given message is legitimate or a phishing attempt.
-   **Scoring & Ranking System:** Users earn points for correct answers and receive a final score and a "Cyber Rank"—from `Cyber Rookie` to `Scam Slayer` to `Phish Terminator`.

### 🧰 Cyber Tools Corner

A utility belt of essential security tools to help users in their daily digital lives.

-   **Password Strength Meter:** A real-time analyzer that gives instant visual feedback on the strength of a password as the user types.

## 🛡️ Digital Safety Best Practices

-   **Think Before You Click:** Be suspicious of unsolicited emails, texts, or social media messages, especially those with urgent requests or amazing offers. Always hover over links to see the true destination before clicking.
-   **Create Strong, Unique Passwords:** Use a password manager to generate and store complex passwords for each of your accounts. A strong password is long (12+ characters) and includes a mix of letters, numbers, and symbols.
-   **Enable Two-Factor Authentication (2FA):** 2FA adds a critical second layer of security. Even if someone steals your password, they won't be able to log in without access to your phone or other second factor.
-   **Keep Software Updated:** Regularly update your operating system, web browser, and other applications. Updates often contain crucial security patches that protect you from known vulnerabilities.
-   **Be Wary of Public Wi-Fi:** Avoid accessing sensitive information (like banking) on public Wi-Fi. If you must use it, use a trusted VPN to encrypt your connection.

## 🛠️ Tech Stack

PhishShield is built with a modern, performant, and scalable frontend technology stack.

-   **Core Framework:** **React 19** with **Vite**
-   **Language:** **TypeScript**
-   **AI Integration:** **Google Gemini API** (`@google/genai`)
-   **Styling:** **Tailwind CSS** for rapid and responsive UI development.
-   **Fonts:** **Google Fonts** (Orbitron for headers, Poppins for body text).

## 📂 Project Structure

The codebase is organized logically to ensure maintainability and scalability. For detailed setup instructions, please see the `GUIDE.md` file.

```
/
├── public/
├── src/
│   ├── components/     # Reusable UI components (Header, Buttons, Icons)
│   ├── pages/          # Top-level page components (HomePage, ScanPage, etc.)
│   ├── utils/          # Gemini AI client initialization
│   ├── App.tsx         # Main application component, handles routing
│   ├── constants.ts    # Centralized data for Learn/Play sections
│   ├── index.tsx       # React application entry point
│   └── types.ts        # Shared TypeScript type definitions
├── .env.example        # Example environment file
├── GUIDE.md            # User and developer guide
├── package.json        # Project dependencies and scripts
└── vite.config.js      # Vite configuration
```

## 🌐 Live Demo

A live version of this application is available for you to interact with. All features are fully functional. For instructions on how to run the project on your own machine, please refer to the `GUIDE.md` file.