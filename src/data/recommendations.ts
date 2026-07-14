export type Recommendation = {
  title: string;
  description: string;
};

export const recommendations: Record<string, Recommendation> = {
  Passwords: {
    title: "Improve password security",
    description:
      "Use a password manager and create a unique password for every important account.",
  },

  Authentication: {
    title: "Enable multi-factor authentication",
    description:
      "Start with your primary email, banking, social media, and cloud storage accounts.",
  },

  "Device Security": {
    title: "Strengthen device protection",
    description:
      "Turn on automatic updates and make sure every device uses a PIN, password, or biometric lock.",
  },

  Backups: {
    title: "Create reliable backups",
    description:
      "Back up important files automatically using both cloud storage and an external drive when possible.",
  },

  Phishing: {
    title: "Improve phishing awareness",
    description:
      "Verify senders, inspect links before clicking, and avoid opening unexpected attachments.",
  },

  "Network Security": {
    title: "Secure your home network",
    description:
      "Use a strong Wi-Fi password, update your router, and enable WPA2 or WPA3 encryption.",
  },

  Privacy: {
    title: "Review your privacy settings",
    description:
      "Limit who can view your personal information and review permissions on social media and mobile apps.",
  },
};