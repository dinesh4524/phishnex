import type { LearnCardData, QuizQuestion } from '@/types';

export const LEARN_CARDS: LearnCardData[] = [
  {
    id: 1,
    front: {
      title: 'Email: Urgent Security Alert',
      content: `
From: security-noreply@microsft.com
Subject: Unusual Sign-in Activity

Dear User,

We detected an unusual sign-in attempt on your account from a new location (Moscow, Russia).

If this wasn't you, please secure your account immediately by clicking the link below:

hxxp://microsft-secure-login.com/verify

Sincerely,
The Security Team
      `.trim(),
    },
    back: {
      title: 'Analysis: Why it\'s a scam',
      analysis: [
        'Misspelled Domain: "microsft.com" instead of "microsoft.com". This is a classic red flag.',
        'Suspicious Link: The link doesn\'t go to an official Microsoft domain. Always hover over links to check the destination.',
        'Sense of Urgency: The email uses urgent language ("secure your account immediately") to rush you into making a mistake.',
        'Generic Greeting: "Dear User" is impersonal. Legitimate companies often use your name.',
      ],
    },
  },
  {
    id: 2,
    front: {
      title: 'SMS: Package Delivery Issue',
      content: `
(FedEx) Your package with tracking #78123456 has a delivery issue. Please update your delivery preferences here:

hxxp://fedex-update-shipping.info
      `.trim(),
    },
    back: {
      title: 'Analysis: Why it\'s a scam',
      analysis: [
        'Suspicious Link: The URL is not the official FedEx website (fedex.com). Scammers create lookalike domains.',
        'Unsolicited Message: Did you order anything? Scammers send these to thousands of people hoping someone is expecting a package.',
        'Request for Information: The fake site will likely ask for your address, phone number, and even credit card details to "reschedule".',
      ],
    },
  },
  {
    id: 3,
    front: {
      title: 'Email: You\'ve Received a Payment',
      content: `
From: PayPal <service@paypa1.com>
Subject: You've received a payment of $500.00 USD

Hello,

Good news! You've received a payment of $500.00 USD from "Online Winnings".

To accept this payment and see the details, please log in:

hxxps://paypa1.com/login/secure

Thank you,
PayPal
      `.trim(),
    },
    back: {
      title: 'Analysis: Why it\'s a scam',
      analysis: [
        'Lookalike Domain: The sender is from "paypa1.com" (with a number 1) not "paypal.com".',
        'Unexpected Money: Be wary of unexpected payments or prizes, they are often a trap.',
        'Login Link: The link leads to a fake login page designed to steal your PayPal credentials.',
      ],
    },
  },
  {
    id: 4,
    front: {
      title: 'Fortress Passwords',
      content: `
password123
12345678
qwerty
YourName1!

Are these strong? Let's check.
      `.trim(),
    },
    back: {
      title: 'Analysis: Building a Strong Password',
      analysis: [
        'Length is Key: Aim for at least 12-16 characters. The longer, the better.',
        'Mix It Up: Include a combination of uppercase letters, lowercase letters, numbers, and symbols (e.g., !@#$%).',
        'Be Unique: Use a different password for every important account. A breach on one site won\'t compromise others.',
        'Use a Manager: Use a password manager to securely generate and store complex, unique passwords for you.',
      ],
    },
  },
  {
    id: 5,
    front: {
      title: 'What is 2FA?',
      content: `
You log in with your password... but then your phone buzzes asking for a code.

That's Two-Factor Authentication (2FA). It's like adding a second lock to your digital door.
      `.trim(),
    },
    back: {
      title: 'Analysis: The Power of 2FA',
      analysis: [
        'Why it Matters: Even if a scammer steals your password, they can\'t access your account without your second factor.',
        'Types of 2FA: Common methods include SMS codes, authenticator apps (like Google Authenticator), or physical security keys.',
        'Enable it Everywhere: Turn on 2FA for all critical accounts: email, banking, and social media.',
      ],
    },
  },
  {
    id: 6,
    front: {
      title: 'Dangers of Public Wi-Fi',
      content: `
Free Wi-Fi at a cafe or airport seems convenient, but it can be a hunting ground for cybercriminals.

Your data could be exposed to anyone on the same network.
      `.trim(),
    },
    back: {
      title: 'Analysis: Staying Safe on Public Wi-Fi',
      analysis: [
        'Use a VPN: A Virtual Private Network (VPN) encrypts your internet traffic, making it unreadable to eavesdroppers.',
        'Check for HTTPS: Only enter sensitive information on websites that start with "https" (the \'s\' stands for secure).',
        'Avoid Critical Tasks: Don\'t do online banking or access other sensitive accounts on public networks if you can avoid it.',
        '"Forget" the Network: After you\'re done, tell your device to forget the network so it doesn\'t reconnect automatically.',
      ],
    },
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    content: `
From: Amazon Support <support@amazon-security-alerts.com>
Subject: Action Required: Your Account is On Hold

We have detected suspicious activity on your account. For your safety, we have temporarily placed it on hold. Please verify your identity by clicking here: hxxp://amazon-verify-user.net/login
    `.trim(),
    isPhish: true,
    explanation: 'This is phishing. The sender\'s domain is not official, and the link is suspicious. Amazon would use domains like amazon.com or amazon.co.uk.',
  },
  {
    id: 2,
    content: `
From: Google <no-reply@accounts.google.com>
Subject: Security alert

A new sign-in to your Google Account was detected on a Windows device. If this was you, you don't need to do anything. If not, we'll help you secure your account.
    `.trim(),
    isPhish: false,
    explanation: 'This is likely legitimate. The sender is from an official Google domain. It doesn\'t ask you to click a link, but to check your account activity, which is a safe practice.',
  },
  {
    id: 3,
    content: `
(SMS Message)
Your Apple ID is due to be disabled today. To prevent this, confirm your details at hxxp://apple-id-verify.co.uk - Apple Support
    `.trim(),
    isPhish: true,
    explanation: 'This is phishing. Apple will never threaten to disable your account via text message. The link is also not an official Apple domain.',
  },
  {
    id: 4,
    content: `
From: Netflix <info@service.netflix.com>
Subject: Your subscription is about to expire!

Hi there,
Your membership is expiring soon. To keep watching, please update your payment details here: hxxp://netflix.com/your-account
    `.trim(),
    isPhish: false,
    explanation: 'This is likely legitimate. The link points to the official netflix.com domain. Always double-check by navigating to the website yourself instead of clicking the link.',
  },
  {
    id: 5,
    content: `
(SMS Message)
You've won a $1000 gift card! Claim it now by visiting hxxp://bit.ly/super-prize-win and entering your details. Only 3 left!
    `.trim(),
isPhish: true,
    explanation: 'This is phishing. Unsolicited prize winnings are a huge red flag. The shortened link (bit.ly) hides the true destination, and the sense of urgency ("Only 3 left!") is a common tactic.',
  },
];