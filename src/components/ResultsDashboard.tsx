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

  /*
    Temporary value.

    Later, this will come from the number of priority tasks
    the user has actually completed.
  */
  const completedImprovements = 1;

  return (
    <main className="results-page">
      <section className="results-card">
        <CyberJourney
          completedImprovements={completedImprovements}
        />

        <div className="score-summary">
          <p className="results-label">YOUR CYBERSCORE</p>

          <div className="results-score">
            {dashboard.overallScore}
            <span>/100</span>
          </div>

          <h1>{dashboard.riskLevel} security risk</h1>

          <p className="results-description">
            This score reflects your reported security habits. It is not a
            guarantee that your accounts or devices are secure.
          </p>
        </div>

        <div className="dashboard-summary">
          <div className="summary-item">
            <span>Security opportunity</span>

            <strong>
              +{dashboard.improvementPotential} points
            </strong>

            <p>
              Complete your recommended actions to strengthen your security
              posture.
            </p>
          </div>
        </div>

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
                <div className="priority-number">
                  {index + 1}
                </div>

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

        <section className="category-results">
          <div className="section-title-row">
            <div>
              <p className="section-eyebrow">SECURITY HEALTH</p>
              <h2>Category breakdown</h2>
            </div>
          </div>

          <div className="category-list">
            {dashboard.categories.map((categoryResult) => {
              const statusClass = categoryResult.status
                .toLowerCase()
                .replaceAll(" ", "-");

              return (
                <article
                  className="category-row"
                  key={categoryResult.category}
                >
                  <div className="category-heading">
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

                    <strong>
                      {categoryResult.percentage}%
                    </strong>
                  </div>

                  <div className="category-progress">
                    <div
                      className="category-progress-fill"
                      style={{
                        width: `${categoryResult.percentage}%`,
                      }}
                    />
                  </div>

                  <div className="category-points">
                    {categoryResult.earned} of{" "}
                    {categoryResult.possible} points
                  </div>
                </article>
              );
            })}
          </div>
        </section>

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