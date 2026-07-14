import { securityLevels } from "./levels";

export function getJourney(completed: number) {
  let currentLevel = securityLevels[0];

  for (const level of securityLevels) {
    if (completed >= level.requiredCompleted) {
      currentLevel = level;
    }
  }

  const currentIndex = securityLevels.indexOf(currentLevel);
  const nextLevel = securityLevels[currentIndex + 1];

  if (!nextLevel) {
    return {
      currentLevel,
      nextLevel: null,
      remaining: 0,
      progress: 100,
    };
  }

  const completedTowardsNext =
    completed - currentLevel.requiredCompleted;

  const neededForNext =
    nextLevel.requiredCompleted -
    currentLevel.requiredCompleted;

  return {
    currentLevel,
    nextLevel,
    remaining: nextLevel.requiredCompleted - completed,
    progress: (completedTowardsNext / neededForNext) * 100,
  };
}