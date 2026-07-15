import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import type { CategoryResult } from "../utils/dashboard";

type CategoryChartProps = {
  categories: CategoryResult[];
};

const chartColors = [
  "#3dd9ff",
  "#7c8cff",
  "#45d6a8",
  "#f5c85b",
  "#ff8f70",
  "#c084fc",
  "#4fa3ff",
];

function CategoryChart({
  categories,
}: CategoryChartProps) {
  const chartData = categories.map((category) => ({
    name: category.category,
    value: category.percentage,
    status: category.status,
  }));

  const averageScore =
    categories.length === 0
      ? 0
      : Math.round(
          categories.reduce(
            (total, category) =>
              total + category.percentage,
            0,
          ) / categories.length,
        );

  return (
    <section className="category-chart-card">
      <div className="section-title-row">
        <div>
          <p className="section-eyebrow">
            SECURITY HEALTH
          </p>

          <h2>Category overview</h2>
        </div>
      </div>

      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              innerRadius="62%"
              outerRadius="88%"
              paddingAngle={3}
              stroke="none"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={
                    chartColors[
                      index % chartColors.length
                    ]
                  }
                />
              ))}
            </Pie>

            <Tooltip
              formatter={(value, _name, item) => [
                `${value}%`,
                item.payload.name,
              ]}
              contentStyle={{
                background: "#10233d",
                border: "1px solid #2d4a68",
                borderRadius: "12px",
                color: "#ffffff",
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="chart-center">
          <strong>{averageScore}%</strong>
          <span>Average</span>
        </div>
      </div>

      <div className="chart-legend">
        {categories.map((category, index) => (
          <div
            className="chart-legend-item"
            key={category.category}
          >
            <span
              className="chart-color"
              style={{
                backgroundColor:
                  chartColors[
                    index % chartColors.length
                  ],
              }}
            />

            <div>
              <strong>{category.category}</strong>

              <span>
                {category.percentage}% ·{" "}
                {category.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CategoryChart;