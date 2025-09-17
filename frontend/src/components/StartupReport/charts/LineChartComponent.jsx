import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

export default function LineChartComponent({ data }) {
  return (
    <LineChart width={500} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="month" />
      <YAxis />
      <Tooltip />
      <Legend />
      {Object.keys(data[0]).filter(k => k !== "month" && k !== "year").map((key, i) => (
        <Line
          key={i}
          type="monotone"
          dataKey={key}
          stroke={["#4F46E5", "#14B8A6", "#F59E0B"][i % 3]}
          strokeWidth={2}
        />
      ))}
    </LineChart>
  );
}
