import React from "react";
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Tooltip,
  Legend,
} from "recharts";

export default function RadarChartComponent({ data }) {
  return (
    <RadarChart width={400} height={250} data={data}>
      <PolarGrid />
      <PolarAngleAxis dataKey="aspect" />
      <Radar
        name="You"
        dataKey="You"
        stroke="#4F46E5"
        fill="#4F46E5"
        fillOpacity={0.6}
      />
      <Radar
        name="Competitors"
        dataKey="Competitors"
        stroke="#9333EA"
        fill="#9333EA"
        fillOpacity={0.3}
      />
      <Tooltip />
      <Legend />
    </RadarChart>
  );
}
