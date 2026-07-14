import { useState } from "react";

import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import QuestionCard from "./components/QuestionCard";
import ResultsDashboard from "./components/ResultsDashboard";

import { questions } from "./data/questions";
import type { CategoryScore } from "./utils/dashboard";

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
    return (
      <ResultsDashboard
        score={score}
        categoryScores={categoryScores}
        onRestart={startAssessment}
        onHome={() => setScreen("home")}
      />
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