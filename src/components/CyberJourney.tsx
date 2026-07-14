import {
  Award,
  BadgeCheck,
  Shield,
  ShieldCheck,
  ShieldPlus,
  type LucideIcon,
} from "lucide-react";

import type { SecurityLevelName } from "../utils/levels";
import { getJourney } from "../utils/journey";

type CyberJourneyProps = {
  completedImprovements: number;
};

const levelIcons: Record<SecurityLevelName, LucideIcon> = {
  Beginner: Shield,
  Intermediate: ShieldCheck,
  Advanced: ShieldPlus,
  Expert: BadgeCheck,
  "Cyber Guardian": Award,
};

function CyberJourney({
  completedImprovements,
}: CyberJourneyProps) {
  const journey = getJourney(completedImprovements);
  const LevelIcon = levelIcons[journey.currentLevel.name];

  return (
    <section className="journey-card">
      <div className="journey-header">
        <div>
          <p className="journey-label">CYBER JOURNEY</p>
          <h2>Security progress</h2>
        </div>

        <span className="journey-completed">
          {completedImprovements} completed
        </span>
      </div>

      <div className="journey-level">
        <div className="journey-icon">
          <LevelIcon size={34} strokeWidth={1.8} />
        </div>

        <div className="journey-level-text">
          <strong>{journey.currentLevel.name}</strong>

          {journey.nextLevel ? (
            <p>
              Complete {journey.remaining} more{" "}
              {journey.remaining === 1
                ? "improvement"
                : "improvements"}{" "}
              to reach {journey.nextLevel.name}.
            </p>
          ) : (
            <p>You have reached the highest Cyber Journey level.</p>
          )}
        </div>
      </div>

      <div
        className="journey-progress"
        role="progressbar"
        aria-label="Cyber Journey progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(journey.progress)}
      >
        <div
          className="journey-progress-fill"
          style={{ width: `${journey.progress}%` }}
        />
      </div>

      <div className="journey-progress-details">
        <span>{journey.currentLevel.name}</span>
        <span>{journey.nextLevel?.name ?? "Complete"}</span>
      </div>
    </section>
  );
}

export default CyberJourney;