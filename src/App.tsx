import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuestionCard from "./components/QuestionCard";

import { questions } from "./data/questions";
import "./App.css";

type Screen = "home" | "assessment" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  const [categoryScores, setCategoryScores] = useState<
    Record<string, number>
  >({});

  function startAssessment() {
    setScore(0);
    setCategoryScores({});
    setCurrentQuestion(0);
    setScreen("assessment");
  }

  function handleAnswer(points: number) {
    const currentCategory = questions[currentQuestion].category;
    const newScore = score + points;

    setScore(newScore);

    setCategoryScores((previousScores) => ({
      ...previousScores,
      [currentCategory]:
        (previousScores[currentCategory] ?? 0) + points,
    }));

    const isLastQuestion = currentQuestion === questions.length - 1;

    if (isLastQuestion) {
      setScreen("results");
      return;
    }

    setCurrentQuestion((previousQuestion) => previousQuestion + 1);
  }

  function getRiskLevel() {
    if (score >= 85) {
      return "Strong security habits";
    }

    if (score >= 65) {
      return "Moderate security risk";
    }

    return "High security risk";
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
    return (
      <main className="results-page">
        <section className="results-card">
          <p className="results-label">YOUR CYBERSCORE</p>

          <div className="results-score">{score}</div>

          <h1>{getRiskLevel()}</h1>

          <p>
            This score reflects your reported security habits. It is not a
            guarantee that your accounts or devices are secure.
          </p>

          <div className="category-results">
            <h2>Category breakdown</h2>

            {Object.entries(categoryScores).map(
              ([category, categoryScore]) => (
                <div className="category-row" key={category}>
                  <span>{category}</span>
                  <strong>{categoryScore} points</strong>
                </div>
              ),
            )}
          </div>

          <button className="primary-btn" onClick={startAssessment}>
            Retake Assessment
          </button>

          <button
            className="text-button"
            onClick={() => setScreen("home")}
          >
            Return home
          </button>
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