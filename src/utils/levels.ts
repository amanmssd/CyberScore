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
  {
    name: "Beginner",
    requiredCompleted: 0,
  },
  {
    name: "Intermediate",
    requiredCompleted: 3,
  },
  {
    name: "Advanced",
    requiredCompleted: 7,
  },
  {
    name: "Expert",
    requiredCompleted: 12,
  },
  {
    name: "Cyber Guardian",
    requiredCompleted: 18,
  },
];