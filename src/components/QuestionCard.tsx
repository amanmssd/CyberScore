import type { Question } from "../data/questions";

type QuestionCardProps = {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (points: number) => void;
};

function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  const progress = (questionNumber / totalQuestions) * 100;

  return (
    <section className="assessment-card">
      <div className="assessment-top">
        <span>{question.category}</span>

        <span>
          Question {questionNumber} of {totalQuestions}
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
            onClick={() => onAnswer(option.points)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </section>
  );
}

export default QuestionCard;