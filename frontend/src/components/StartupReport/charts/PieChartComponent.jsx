import React from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
  "#4F46E5", // Indigo
  "#9333EA", // Purple
  "#14B8A6", // Teal
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#3B82F6", // Blue
  "#22C55E", // Green
];

export default function PieChartComponent({ data }) {
  if (!data || data.length === 0) return null;

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius="70%"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip formatter={(value) => `${value}`} />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
