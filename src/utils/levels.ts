export type SecurityLevelName =
  | "Beginner"
  | "Intermediate"
  | "Advanced"
  | "Expert"
  | "Cyber Guardian";

export type SecurityLevel = {
  name: SecurityLevelName;
  requiredCompleted: number;
};

export const securityLevels: SecurityLevel[] = [
  { name: "Beginner", requiredCompleted: 0 },
  { name: "Intermediate", requiredCompleted: 2 },
  { name: "Advanced", requiredCompleted: 4 },
  { name: "Expert", requiredCompleted: 6 },
  { name: "Cyber Guardian", requiredCompleted: 7 },
];