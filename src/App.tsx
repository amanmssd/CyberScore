import { useState } from "react";

import CyberJourney from "./components/CyberJourney";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/QuestionCard";

import { questions } from "./data/questions";
import {
  buildDashboard,
  type CategoryScore,
} from "./utils/dashboard";

import "./App.css";

type Screen = "home" | "assessment" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [categoryScores, setCategoryScores] = useState<
    Record<string, CategoryScore>
  >({});

  function startAssessment() {
    setScore(0);
    setCategoryScores({});
    setCurrentQuestion(0);
    setScreen("assessment");
  }

  function handleAnswer(points: number) {
    const currentQuestionData = questions[currentQuestion];
    const currentCategory = currentQuestionData.category;

    const maximumPoints = Math.max(
      ...currentQuestionData.options.map((option) => option.points),
    );

    setScore((previousScore) => previousScore + points);

    setCategoryScores((previousScores) => {
      const previousCategoryScore = previousScores[currentCategory] ?? {
        earned: 0,
        possible: 0,
      };

      return {
        ...previousScores,
        [currentCategory]: {
          earned: previousCategoryScore.earned + points,
          possible: previousCategoryScore.possible + maximumPoints,
        },
      };
    });

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      setScreen("results");
      return;
    }

    setCurrentQuestion(
      (previousQuestion) => previousQuestion + 1,
    );
  }

  if (screen === "assessment") {
    const question = questions[currentQuestion];

    return (
      <main className="assessment-page">
        <QuestionCard
          question={question}
          questionNumber={currentQuestion + 1}
          totalQuestions={questions.length}
          onAnswer={handleAnswer}
        />
      </main>
    );
  }

  if (screen === "results") {
    const dashboard = buildDashboard(categoryScores, score);

    /*
      This is temporary.

      Later, the checklist will determine this number based on how
      many security improvements the user marks as completed.
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
              This score reflects your reported security habits. It is
              not a guarantee that your accounts or devices are secure.
            </p>
          </div>

          <div className="dashboard-summary">
            <div className="summary-item">
              <span>Security opportunity</span>

              <strong>
                +{dashboard.improvementPotential} points
              </strong>

              <p>
                Complete your recommended actions to strengthen your
                security posture.
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
              {dashboard.categories.map((categoryResult) => (
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
                        className={`category-status status-${categoryResult.status
                          .toLowerCase()
                          .replace(" ", "-")}`}
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
              ))}
            </div>
          </section>

          <div className="results-actions">
            <button
              className="primary-btn"
              onClick={startAssessment}
            >
              Retake Assessment
            </button>

            <button
              className="text-button"
              onClick={() => setScreen("home")}
            >
              Return home
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <div className="app">
      <Navbar onStartAssessment={startAssessment} />
      <Hero onStartAssessment={startAssessment} />
    </div>
  );
}

export default App;