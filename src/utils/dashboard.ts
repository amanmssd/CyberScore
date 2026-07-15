import { recommendations } from "../data/recommendations";

export type CategoryScore = {
  earned: number;
  possible: number;
};

export type CategoryResult = {
  category: string;
  earned: number;
  possible: number;
  percentage: number;
  status: "Critical" | "Needs work" | "Good" | "Excellent";
};

export type Priority = {
  category: string;
  percentage: number;
  title: string;
  description: string;
};

export type DashboardSummary = {
  overallScore: number;
  grade: "A" | "B" | "C" | "D" | "F";
  riskLevel: "Low" | "Moderate" | "High";
  improvementPotential: number;
  categories: CategoryResult[];
  priorities: Priority[];
  recommendations: Priority[];
};

function calculatePercentage(earned: number, possible: number) {
  if (possible === 0) {
    return 0;
  }

  return Math.round((earned / possible) * 100);
}

function getCategoryStatus(
  percentage: number,
): CategoryResult["status"] {
  if (percentage === 100) {
    return "Excellent";
  }

  if (percentage >= 76) {
    return "Good";
  }

  if (percentage >= 26) {
    return "Needs work";
  }

  return "Critical";
}

function getGrade(score: number): DashboardSummary["grade"] {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";

  return "F";
}

function getRiskLevel(
  score: number,
): DashboardSummary["riskLevel"] {
  if (score >= 80) return "Low";
  if (score >= 60) return "Moderate";

  return "High";
}

export function buildDashboard(
  categoryScores: Record<string, CategoryScore>,
  overallScore: number,
): DashboardSummary {
  const categories = Object.entries(categoryScores).map(
    ([category, categoryScore]) => {
      const percentage = calculatePercentage(
        categoryScore.earned,
        categoryScore.possible,
      );

      return {
        category,
        earned: categoryScore.earned,
        possible: categoryScore.possible,
        percentage,
        status: getCategoryStatus(percentage),
      };
    },
  );

  const allRecommendations = [...categories]
  .filter((categoryResult) => categoryResult.percentage < 100)
  .sort(
    (firstCategory, secondCategory) =>
      firstCategory.percentage - secondCategory.percentage,
  )
  .map((categoryResult) => {
    const recommendation = recommendations[categoryResult.category];

    return {
      category: categoryResult.category,
      percentage: categoryResult.percentage,
      title:
        recommendation?.title ??
        `Improve ${categoryResult.category}`,
      description:
        recommendation?.description ??
        "Review this area and strengthen your current security habits.",
    };
  });

const priorities = allRecommendations.slice(0, 3);

  return {
    overallScore,
    grade: getGrade(overallScore),
    riskLevel: getRiskLevel(overallScore),
    improvementPotential: Math.max(0, 100 - overallScore),
    categories,
    priorities,
    recommendations: allRecommendations,
  };
}