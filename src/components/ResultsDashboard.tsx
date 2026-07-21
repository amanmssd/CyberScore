import { useEffect, useState } from "react";

import CategoryChart from "./CategoryChart";
import CyberJourney from "./CyberJourney";

import {
  buildDashboard,
  type CategoryScore,
} from "../utils/dashboard";

type ResultsDashboardProps = {
  score: number;
  categoryScores: Record<string, CategoryScore>;
  onRestart: () => void;
  onHome: () => void;
};

function ResultsDashboard({
  score,
  categoryScores,
  onRestart,
  onHome,
}: ResultsDashboardProps) {
  const dashboard = buildDashboard(categoryScores, score);

  const [displayedScore, setDisplayedScore] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? dashboard.overallScore
      : 0,
  );

  const [completedPriorities, setCompletedPriorities] = useState<string[]>([]);
  const [openCategory, setOpenCategory] = useState<string | null>(null);

  const completedImprovements = completedPriorities.length;

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );
    let animationFrame = 0;

    function updateScore() {
      cancelAnimationFrame(animationFrame);

      if (reducedMotionQuery.matches) {
        setDisplayedScore(dashboard.overallScore);
        return;
      }

      const animationDuration = 900;
      const animationStart = performance.now();

      function animateScore(currentTime: number) {
        const elapsed = currentTime - animationStart;
        const progress = Math.min(elapsed / animationDuration, 1);
        const easedProgress = 1 - Math.pow(1 - progress, 3);

        setDisplayedScore(
          Math.round(dashboard.overallScore * easedProgress),
        );

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animateScore);
        }
      }

      animationFrame = requestAnimationFrame(animateScore);
    }

    updateScore();
    reducedMotionQuery.addEventListener("change", updateScore);

    return () => {
      cancelAnimationFrame(animationFrame);
      reducedMotionQuery.removeEventListener("change", updateScore);
    };
  }, [dashboard.overallScore]);

  function togglePriority(category: string) {
    setCompletedPriorities((previousPriorities) => {
      const isAlreadyCompleted = previousPriorities.includes(category);

      if (isAlreadyCompleted) {
        return previousPriorities.filter(
          (completedCategory) => completedCategory !== category,
        );
      }

      return [...previousPriorities, category];
    });
  }

  function toggleCategory(category: string) {
    setOpenCategory((currentCategory) =>
      currentCategory === category ? null : category,
    );
  }

  return (
    <main className="results-page">
      <section className="results-card">
        <div className="results-top-grid">
          <CyberJourney
            completedImprovements={completedImprovements}
          />

          <div className="score-summary">
            <p className="results-label">YOUR CYBERSCORE</p>

            <div
              className="results-score"
              aria-label={`CyberScore ${dashboard.overallScore} out of 100`}
            >
              {displayedScore}
              <span>/100</span>
            </div>

            <h1>{dashboard.riskLevel} security risk</h1>

            <div className="score-opportunity">
              <strong>+{dashboard.improvementPotential} points available</strong>
            </div>

            <p className="results-description">
              Complete your recommended actions to improve your CyberScore and
              strengthen your overall security posture.
            </p>
          </div>
        </div>


        <div className="dashboard-content-grid">
          <div className="dashboard-main-column">
            <section className="priority-section">
              <div className="section-title-row">
                <div>
                  <p className="section-eyebrow">ACTION PLAN</p>
                  <h2>Top priorities</h2>
                </div>

                <span className="priority-count">
                  {dashboard.priorities.length} actions
                </span>
              </div>

              <div className="priority-list">
                {dashboard.priorities.map((priority, index) => (
                  <article
                    className="priority-card"
                    key={priority.category}
                  >
                    <div className="priority-number">{index + 1}</div>

                    <div className="priority-content">
                      <div className="priority-heading">
                        <div>
                          <span className="priority-category">
                            {priority.category}
                          </span>

                          <h3>{priority.title}</h3>
                        </div>

                        <span className="priority-score">
                          {priority.percentage}%
                        </span>
                      </div>

                      <p>{priority.description}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="checklist-section">
              <div className="section-title-row">
                <div>
                  <p className="section-eyebrow">CYBER JOURNEY</p>
                  <h2>Improvement checklist</h2>
                </div>

                <span className="priority-count">
                  {completedImprovements} of{" "}
                  {dashboard.recommendations.length} completed
                </span>
              </div>

              <div className="checklist-list">
                {dashboard.recommendations.map((recommendation) => {
                  const isCompleted = completedPriorities.includes(
                    recommendation.category,
                  );

                  return (
                    <label
                      className={`checklist-item ${
                        isCompleted ? "checklist-item-completed" : ""
                      }`}
                      key={recommendation.category}
                    >
                      <input
                        type="checkbox"
                        checked={isCompleted}
                        onChange={() =>
                          togglePriority(recommendation.category)
                        }
                      />

                      <div>
                        <strong>{recommendation.title}</strong>
                        <span>{recommendation.category}</span>
                      </div>

                      <span className="checklist-percentage">
                        {recommendation.percentage}%
                      </span>
                    </label>
                  );
                })}
              </div>
            </section>
          </div>

          <aside className="dashboard-side-column">
            <section className="security-health-card">
              <CategoryChart categories={dashboard.categories} />

              <div className="security-health-divider" />

              <div className="security-health-breakdown">
                <div className="section-title-row">
                  <div>
                    <p className="section-eyebrow">CATEGORY DETAILS</p>
                    <h2>Category breakdown</h2>
                  </div>
                </div>

                <div className="category-accordion">
                  {dashboard.categories.map((categoryResult) => {
                    const isOpen =
                      openCategory === categoryResult.category;

                    const statusClass = categoryResult.status
                      .toLowerCase()
                      .replaceAll(" ", "-");

                    const matchingRecommendation =
                      dashboard.recommendations.find(
                        (recommendation) =>
                          recommendation.category ===
                          categoryResult.category,
                      );

                    return (
                      <article
                        className={`category-accordion-item ${
                          isOpen
                            ? "category-accordion-item-open"
                            : ""
                        }`}
                        key={categoryResult.category}
                      >
                        <button
                          className="category-accordion-trigger"
                          type="button"
                          onClick={() =>
                            toggleCategory(categoryResult.category)
                          }
                          aria-expanded={isOpen}
                        >
                          <div className="category-accordion-heading">
                            <div>
                              <span className="category-name">
                                {categoryResult.category}
                              </span>

                              <span
                                className={`category-status status-${statusClass}`}
                              >
                                {categoryResult.status}
                              </span>
                            </div>

                            <div className="category-accordion-score">
                              <strong>
                                {categoryResult.percentage}%
                              </strong>

                              <span aria-hidden="true">
                                {isOpen ? "−" : "+"}
                              </span>
                            </div>
                          </div>

                          <div className="category-progress">
                            <div
                              className="category-progress-fill"
                              style={{
                                width: `${categoryResult.percentage}%`,
                              }}
                            />
                          </div>
                        </button>

                        {isOpen && (
                          <div className="category-accordion-content">
                            <div className="category-detail-row">
                              <span>Points earned</span>

                              <strong>
                                {categoryResult.earned} of{" "}
                                {categoryResult.possible}
                              </strong>
                            </div>

                            <div className="category-detail-row">
                              <span>Status</span>
                              <strong>{categoryResult.status}</strong>
                            </div>

                            {matchingRecommendation && (
                              <div className="category-recommendation">
                                <span>Recommended action</span>

                                <strong>
                                  {matchingRecommendation.title}
                                </strong>

                                <p>
                                  {matchingRecommendation.description}
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                      </article>
                    );
                  })}
                </div>
              </div>
            </section>
          </aside>
        </div>

        <div className="results-actions">
          <button
            className="primary-btn"
            onClick={onRestart}
          >
            Retake Assessment
          </button>

          <button
            className="text-button"
            onClick={onHome}
          >
            Return home
          </button>
        </div>
      </section>
    </main>
  );
}

export default ResultsDashboard;
