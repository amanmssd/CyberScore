export type AnswerOption = {
  label: string;
  points: number;
};

export type Question = {
  id: number;
  question: string;
  category: string;
  options: AnswerOption[];
};

export const questions: Question[] = [
  {
    id: 1,
    question: "Do you use a unique password for each important account?",
    category: "Passwords",
    options: [
      { label: "Yes", points: 10 },
      { label: "Sometimes", points: 5 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 2,
    question: "Do you use multi-factor authentication on your email account?",
    category: "Authentication",
    options: [
      { label: "Yes", points: 10 },
      { label: "No", points: 0 },
      { label: "I’m not sure", points: 2 },
    ],
  },
  {
    id: 3,
    question: "Do your phone and computer install security updates automatically?",
    category: "Device Security",
    options: [
      { label: "Yes", points: 10 },
      { label: "On some devices", points: 5 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 4,
    question: "Do you use a password manager?",
    category: "Passwords",
    options: [
      { label: "Yes", points: 10 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 5,
    question: "Do you regularly back up important files?",
    category: "Backups",
    options: [
      { label: "Yes", points: 10 },
      { label: "Sometimes", points: 5 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 6,
    question: "Do you verify links and senders before opening unexpected messages?",
    category: "Phishing",
    options: [
      { label: "Usually", points: 10 },
      { label: "Sometimes", points: 5 },
      { label: "Rarely", points: 0 },
    ],
  },
  {
    id: 7,
    question: "Is your home Wi-Fi protected with a strong password?",
    category: "Network Security",
    options: [
      { label: "Yes", points: 10 },
      { label: "I’m not sure", points: 3 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 8,
    question: "Do you lock your devices with a PIN, password, or biometric login?",
    category: "Device Security",
    options: [
      { label: "Yes", points: 10 },
      { label: "Some devices", points: 5 },
      { label: "No", points: 0 },
    ],
  },
  {
    id: 9,
    question: "Do you review privacy settings on social media accounts?",
    category: "Privacy",
    options: [
      { label: "Regularly", points: 10 },
      { label: "Occasionally", points: 5 },
      { label: "Never", points: 0 },
    ],
  },
  {
    id: 10,
    question: "Would you recognize common signs of a phishing website?",
    category: "Phishing",
    options: [
      { label: "Yes", points: 10 },
      { label: "Maybe", points: 5 },
      { label: "No", points: 0 },
    ],
  },
];