import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function LineChartComponent({ data }) {
  if (!data || data.length === 0) return null;

  // Dynamically pick X-axis key (either "month" or "year")
  const xKey = Object.keys(data[0]).includes("month") ? "month" : "year";

  // Pick all numeric series keys (exclude xKey)
  const seriesKeys = Object.keys(data[0]).filter(k => k !== xKey);

  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey={xKey} />
      <YAxis />
      <Tooltip />
      <Legend />
      {seriesKeys.map((key, i) => (
        <Line
          key={i}
          type="monotone"
          dataKey={key}
          stroke={["#4F46E5", "#14B8A6", "#F59E0B", "#EF4444"][i % 4]} 
          strokeWidth={2}
        />
      ))}
    </LineChart>
  );
}
