import React from "react";
import LineChartComponent from "../charts/LineChartComponent";

export default function ProductValidation({ data }) {
  return (
    <div>
      <h2 className="text-3xl font-bold mb-6">Product Validation</h2>

      {/* Summary */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Overview</h3>
        <p className="text-neutral-300">
          {data.summary ||
            "Your product addresses a real customer pain point with clear demand signals. Preliminary validation shows a 75% positive response rate in surveys. However, feature prioritization and MVP clarity will be critical."}
        </p>
      </section>

      {/* Validation Metrics */}
      <section className="grid grid-cols-3 gap-4 mb-8">
        {(
          data.metrics || [
            { label: "Survey Positive", value: "75%" },
            { label: "Waitlist Signups", value: "1,200" },
            { label: "Retention Prediction", value: "68%" },
          ]
        ).map((m, i) => (
          <div
            key={i}
            className="bg-white/10 rounded-xl p-4 flex flex-col items-center"
          >
            <p className="text-lg font-bold">{m.value}</p>
            <p className="text-sm text-neutral-400">{m.label}</p>
          </div>
        ))}
      </section>

      {/* Feature Priority Chart */}
      <section className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Feature Interest Over Time</h3>
        <LineChartComponent
          data={data.trends || [
            { month: "Jan", MVP: 20, Advanced: 10 },
            { month: "Feb", MVP: 30, Advanced: 15 },
            { month: "Mar", MVP: 45, Advanced: 25 },
          ]}
        />
      </section>

      {/* User Feedback */}
      <section className="bg-green-900/40 p-6 rounded-xl">
        <h3 className="text-xl font-semibold mb-2">User Feedback Highlights</h3>
        <ul className="list-disc list-inside text-neutral-200 space-y-1">
          <li>Users value simplicity and intuitive UX.</li>
          <li>Demand is high for integrations with existing tools.</li>
          <li>Some concern around initial pricing tiers.</li>
        </ul>
      </section>
    </div>
  );
}
