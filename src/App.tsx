import { useState } from "react";
import "./App.css";
import { questions } from "./data/questions";

type Screen = "home" | "assessment" | "results";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);

  function startAssessment() {
    setScore(0);
    setCurrentQuestion(0);
    setScreen("assessment");
  }

  function handleAnswer(points: number) {
    const newScore = score + points;
    setScore(newScore);

    if (currentQuestion === questions.length - 1) {
      setScreen("results");
      return;
    }

    setCurrentQuestion(currentQuestion + 1);
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
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    return (
      <main className="assessment-page">
        <section className="assessment-card">
          <div className="assessment-top">
            <span>{question.category}</span>
            <span>
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>

          <div className="progress-track">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>

          <h1>{question.question}</h1>

          <div className="answer-list">
            {question.options.map((option) => (
              <button
                key={option.label}
                className="answer-button"
                onClick={() => handleAnswer(option.points)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </section>
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

          <button className="primary-btn" onClick={startAssessment}>
            Retake Assessment
          </button>

          <button className="text-button" onClick={() => setScreen("home")}>
            Return home
          </button>
        </section>
      </main>
    );
  }

  return (
    <div className="app">
      <nav className="navbar">
        <h2>CyberScore</h2>

        <button className="nav-button" onClick={startAssessment}>
          Start Assessment
        </button>
      </nav>

      <section className="hero">
        <div className="hero-text">
          <h1>Know Your Cybersecurity Score.</h1>

          <p>
            Discover weaknesses in your online security and receive
            personalized recommendations to better protect your digital life.
          </p>

          <button className="primary-btn" onClick={startAssessment}>
            Take Assessment
          </button>
        </div>

        <div className="score-card">
          <h3>Example CyberScore</h3>

          <div className="circle">72</div>

          <p className="risk">Moderate Risk</p>

          <ul>
            <li>Enable multi-factor authentication</li>
            <li>Update devices automatically</li>
            <li>Use unique passwords</li>
          </ul>
        </div>
      </section>
    </div>
  );
}

export default App;